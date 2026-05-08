---
title: "Query: Day of Rebook"
type: query
tags: [query, sql, liquidation, internal-conversion, rebook]
used-by-role: [lm-dc]
used-in-process: [[internal-conversion]]
aqt-parameters: [CASE, Business_line, NOT_THESE_AFFILIATES, PLANS_TO_MOVE, LIQUIDATION]
tables: [CORP.TRANSACT_DETAIL, CORP.EMPLOYEE, PENSION.PLAN_FUND, PENSION.PLAN_PROV_GRP, PENSION.PLAN_SRC_DETAIL]
systems: [aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Query: Day of Rebook

Rebook extract run after [[liquidation-day]] settles. Pulls settled liquidation transactions (TR_NO 3030/4000) effective on/after the liquidation date, so receiving-plan booking can be done against the exact cash amount that hit.

## Purpose

After liquidation transactions settle, this script replaces the estimated balances from the [[day-of-liquidation-v1]] / [[day-of-liquidation-v2]] extracts with actual settled `TRANSACT_DETAIL` amounts. The temp table is built from transaction rows keyed by `TR_REF_NO` — enabling per-reference reconciliation on the receiving side.

Compared to the liquidation-day scripts, this rebook version:
- Pulls from `CORP.TRANSACT_DETAIL` (not `EE_PART_BAL_HEADER/BALANCE`) — so it reflects settled cash, not overnight balances
- Filters by `A.EFF_DT >= '$LIQUIDATION'` using the `LIQUIDATION` parameter
- Adds `tr_ref_no` to the temp-table schema for wire-level matching

## When to Run

- After [[liquidation-day]] settles (T+1 or later depending on the fund)
- Output drives [[booking-assets]] on the receiving plan
- Used as the input to [[fund-mapping-audit]] and [[day-of-wire-audit]]

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| CASE | "809054" | Parent case number |
| Business_line | "CORP" | Business line (CORP or TDA) |
| NOT_THESE_AFFILIATES | "'ABCDE'" | Sub-ids to exclude |
| PLANS_TO_MOVE | "'00000'" | Sub-ids being rebooked on this run |
| LIQUIDATION | "20211231" | Liquidation date floor for EFF_DT filter |

## Notes (from header comments)

- `AQT SETPARM,PARM=CASE,VALUE="809054"`
- `AQT SETPARM,PARM=Business_line,VALUE="CORP"`
- `AQT SETPARM,PARM=NOT_THESE_AFFILIATES,VALUE="'ABCDE'"`
- `AQT SETPARM,PARM=PLANS_TO_MOVE,VALUE="'00000'"`
- `AQT SETPARM,PARM=LIQUIDATION, VALUE="20211231"`

## Tables Used

- `CORP.TRANSACT_DETAIL` — settled liquidation transactions filtered to TR_NO 3030/4000
- `PENSION.PLAN_FUND` — fund name translation
- `PENSION.PLAN_PROV_GRP` — maps account_no to enrl_prov_grp_i (RELATED_GRP_TYP_C = 361)
- `CORP.EMPLOYEE` — participant lookup
- `PENSION.PLAN_SRC_DETAIL` — source translation

## SQL

Statements in order:

1. SETPARM header comments
2. Declare and populate `SESSION.terminating_sub_ids` (from TRANSACT_DETAIL, filtered by `$LIQUIDATION` floor and `$PLANS_TO_MOVE`)
3. Fund balance rollup
4. Source balance rollup
5. PPT balance by fund and source (with `tr_ref_no`)

```sql
--AQT SETPARM,PARM=CASE,VALUE="809054"
--AQT SETPARM,PARM=Business_line,VALUE="CORP"
--AQT SETPARM,PARM=NOT_THESE_AFFILIATES,VALUE="'ABCDE'"
--AQT SETPARM,PARM=PLANS_TO_MOVE,VALUE="'00000'"
--AQT SETPARM,PARM=LIQUIDATION, VALUE="20211231"
;


DECLARE GLOBAL TEMPORARY TABLE SESSION.terminating_sub_ids
(
case_NO VARCHAR(20) NOT NULL,
tr_ref_no varchar(14),
eff_dt VARCHAR(8),
fd_Desc_cd VARCHAR(4),
fund_name VARCHAR(80),
Conversion_amt decimal(12,2)

	)WITH REPLACE ON COMMIT PRESERVE ROWS NOT LOGGED;


insert into session.terminating_sub_ids

SELECT

coalesce(c.CASE_NO,a.case_no),tr_ref_no,
A.EFF_DT,
A.FD_DESC_CD,
STRIP(STRIP(B.REPORT_1_FD_NM)||' '||STRIP(B.REPORT_2_FD_NM)) FD_FUND_NAME,
SUM(A.TR_AMT *-1) AMOUNT

FROM CORP.TRANSACT_DETAIL A
JOIN PENSION.PLAN_FUND B ON A.FD_PROV_I = B.FD_PROV_I
LEFT JOIN
		(
	SELECT A.CASE_NO, A.SOC_SEC_NO, A.EE_DIV_NO
	FROM CORP.EMPLOYEE A
	JOIN PENSION.PLAN_PROV_GRP B ON A.CASE_NO = B.ACCOUNT_NO
		AND B.RELATED_GRP_TYP_C = 361
		AND B.ACCOUNT_NO  like '$CASE%'
		) C ON SUBSTR(A.CASE_NO,11,5) = SUBSTR(C.CASE_NO,11,5)
	AND A.SOC_SEC_NO = C.SOC_SEC_NO

WHERE A.CASE_NO like '$CASE%'
--AND A.TR_REVSL_DISP_CD = '0'
AND A.EFF_DT >= '$LIQUIDATION'
AND A.TR_NO IN ('3030','4000')
AND substr(a.case_no,11,5)  in ($PLANS_TO_MOVE)   

--AND (A.SOC_SEC_NO NOT LIKE '%-%-%' OR C.EE_DIV_NO = 'ZZZZ') --FOR ZZZZ DIVISION ONLY
--AND A.TR_NO = '3030'
GROUP BY
coalesce(c.CASE_NO,a.case_no),tr_ref_no,
A.EFF_DT,
A.FD_DESC_CD,
STRIP(STRIP(B.REPORT_1_FD_NM)||' '||STRIP(B.REPORT_2_FD_NM))

;

-- FUND BALANCE
select fd_desc_cd,SUM(CONVERSION_AMT) AS CONVERSION_AMT, $CASE, '0'
FROM SESSION.terminating_sub_ids
GROUP BY  FD_DESC_CD,FUND_NAME

;

--- SOURCE BALANCE
SELECT

SUM(A.AMOUNT),src_typ_C,
STRIP(STRIP(C.REPORT_1_NM)||' '||STRIP(C.REPORT_2_NM)) SOURCE_NM

FROM
	(
SELECT
SUBSTR(CASE_NO,11,5) CASE_NO, SOC_SEC_NO, TR_REF_NO, SRC_I, FD_PROV_I, SUM(TR_AMT * -1) AMOUNT
FROM CORP.TRANSACT_DETAIL
WHERE  CASE_NO like '$CASE%'
AND substr(case_no,11,5)  in ($PLANS_TO_MOVE)
AND TR_REVSL_DISP_CD = '0'
AND EFF_DT >= '$LIQUIDATION'
AND TR_NO IN ('3030','4000')
GROUP BY SUBSTR(CASE_NO,11,5), SOC_SEC_NO, TR_REF_NO, SRC_I, FD_PROV_I
	) A
JOIN
	(
SELECT SUBSTR(A.CASE_NO,11,5) CASE_NO, account_no,A.SOC_SEC_NO, A.EE_DIV_NO, A.EE_LAST_NM, A.EE_FST_MID_NM
FROM CORP.EMPLOYEE A
JOIN PENSION.PLAN_PROV_GRP B ON A.CASE_NO = B.ACCOUNT_NO
	AND B.RELATED_GRP_TYP_C = 361
	AND B.ACCOUNT_NO in (select case_no from session.terminating_sub_ids)
--WHERE A.EE_DIV_NO = 'ZZZZ'
	) B
ON A.CASE_NO = B.CASE_NO
	AND A.SOC_SEC_NO = B.SOC_SEC_NO
JOIN PENSION.PLAN_SRC_DETAIL C ON A.SRC_I = C.SRC_I
JOIN PENSION.PLAN_FUND D ON A.FD_PROV_I = D.FD_PROV_I

GROUP BY 
STRIP(STRIP(C.REPORT_1_NM)||' '||STRIP(C.REPORT_2_NM)) , src_typ_C 


;

--PPT BAL BY FUND AND SOURCE

SELECT
'' as New_case_no, '' as new_sub_id,
substr(A.SOC_SEC_NO,1,3)||substr(A.SOC_SEC_NO,5,2)||substr(A.SOC_SEC_NO,8,4) as SSN,
' ' as "new fund desc maps here, delete for cash conv",
' ' as "new translation code maps here",
A.AMOUNT,substr(ACCOUNT_NO,1,instr(account_no,' ')-1)as old_contract,A.CASE_NO as old_sub_id,
src_typ_C,
STRIP(STRIP(C.REPORT_1_NM)||' '||STRIP(C.REPORT_2_NM)) SOURCE_NM,
D.FD_DESC_CD, tr_ref_no

FROM
	(
SELECT
SUBSTR(CASE_NO,11,5) CASE_NO, case
when SOC_SEC_NO like '%F%' then '888-00-0000' else soc_Sec_no end as soc_Sec_no, TR_REF_NO, SRC_I, FD_PROV_I, SUM(TR_AMT * -1) AMOUNT
FROM CORP.TRANSACT_DETAIL
WHERE CASE_NO like '$CASE%'
AND TR_REVSL_DISP_CD = '0'
AND EFF_DT >= '$LIQUIDATION'
AND TR_NO IN ('3030','4000')
AND substr(case_no,11,5)  in ($PLANS_TO_MOVE)
GROUP BY SUBSTR(CASE_NO,11,5), SOC_SEC_NO, TR_REF_NO, SRC_I, FD_PROV_I
	) A
JOIN
	

 PENSION.PLAN_PROV_GRP B on A.CASE_NO = substr(B.ACCOUNT_NO,11,5)
	AND B.RELATED_GRP_TYP_C = 361
	AND B.ACCOUNT_NO like '$CASE%'

	

JOIN PENSION.PLAN_SRC_DETAIL C ON A.SRC_I = C.SRC_I
JOIN PENSION.PLAN_FUND D ON A.FD_PROV_I = D.FD_PROV_I

order by soc_Sec_no
```

## Output / What to Look For

- Totals should match the settled wire amounts (see [[day-of-wire-audit]])
- Each `tr_ref_no` corresponds to a settled trade — useful for per-reference reconciliation
- If amounts differ from the liquidation-day estimate, the delta is price movement between liquidation and settlement

## Related Queries

- [[day-of-liquidation-v1]] — paired liquidation-day extract
- [[day-of-liquidation-v2]] — paired liquidation-day extract (v2)
- [[day-of-rebook-split-mapping]] — variant for split-mapping scenarios
- [[internal-conversion-base]] — pre-liquidation baseline

## See Also

- [[internal-conversion]]
- [[liquidation-day]]
- [[booking-assets]]
- [[fund-mapping]]
- [[source-mapping]]
- [[fund-mapping-audit]]
- [[day-of-wire-audit]]
- [[day-after-wire-audit]]
- [[lm-dc]]
- [[aqt]]
- [[p3]]
