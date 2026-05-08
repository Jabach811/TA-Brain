---
title: "Query: Day of Rebook — Split Mapping"
type: query
tags: [query, sql, liquidation, internal-conversion, rebook, split-mapping]
used-by-role: [lm-dc]
used-in-process: [[internal-conversion]]
aqt-parameters: [CASE, Business_line, NOT_THESE_AFFILIATES, PLANS_TO_MOVE, LIQUIDATION]
tables: [CORP.TRANSACT_DETAIL, CORP.EMPLOYEE, PENSION.PLAN_FUND, PENSION.PLAN_PROV_GRP, PENSION.PLAN_SRC_DETAIL]
systems: [aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Query: Day of Rebook — Split Mapping

Rebook variant for conversions where a single source fund maps to multiple target funds (split mapping). Differs from the standard [[day-of-rebook]] by preserving `src_i` on the participant-level output so a downstream `plan_map_i` column can drive the split.

## Purpose

Identical temp-table + rollup logic to [[day-of-rebook]], but the final participant-level SELECT emits:

- `a.src_i` (source identifier)
- `D.FD_DESC_CD` (fund description code)
- `A.AMOUNT`
- a placeholder `' ' as place_holder_plan_map_i`

...so the map_i column can be filled in manually or by Informatica to split a source balance across multiple target funds. Used when [[fund-mapping]] is not 1:1.

## When to Run

- After [[liquidation-day]] settles, when the conversion uses split [[fund-mapping]]
- In place of [[day-of-rebook]] for the affected funds/sources
- Output feeds [[booking-assets]] via [[informatica]] with a completed plan_map_i

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| CASE | "809054" | Parent case number |
| Business_line | "CORP" | Business line (CORP or TDA) |
| NOT_THESE_AFFILIATES | "'ABCDE'" | Sub-ids to exclude |
| PLANS_TO_MOVE | "'00000'" | Sub-ids being rebooked |
| LIQUIDATION | "20211231" | Liquidation date floor |

## Notes (from header comments)

- `AQT SETPARM,PARM=CASE,VALUE="809054"`
- `AQT SETPARM,PARM=Business_line,VALUE="CORP"`
- `AQT SETPARM,PARM=NOT_THESE_AFFILIATES,VALUE="'ABCDE'"`
- `AQT SETPARM,PARM=PLANS_TO_MOVE,VALUE="'00000'"`
- `AQT SETPARM,PARM=LIQUIDATION, VALUE="20211231"`

## Tables Used

- `CORP.TRANSACT_DETAIL` — settled liquidation transactions
- `PENSION.PLAN_FUND` — fund translation
- `PENSION.PLAN_PROV_GRP` — enrl group lookup
- `CORP.EMPLOYEE` — participant lookup
- `PENSION.PLAN_SRC_DETAIL` — source translation

## SQL

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
substr(A.SOC_SEC_NO,1,3)||substr(A.SOC_SEC_NO,5,2)||substr(A.SOC_SEC_NO,8,4) as SSN,a.src_i,
D.FD_DESC_CD,A.AMOUNT,' ' as place_holder_plan_map_i,substr(ACCOUNT_NO,1,instr(account_no,' ')-1)as old_contract,A.CASE_NO as old_sub_id 
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

- Participant-level output includes `src_i` — manual / automated mapping fills `plan_map_i` to drive the split
- Sum across all splits per source should match the source rollup total
- Use [[fund-mapping-audit]] after booking to confirm no leakage

## Related Queries

- [[day-of-rebook]] — standard 1:1 rebook
- [[day-of-liquidation-v1]] / [[day-of-liquidation-v2]] — paired liquidation-day extracts

## See Also

- [[internal-conversion]]
- [[liquidation-day]]
- [[fund-mapping]]
- [[source-mapping]]
- [[booking-assets]]
- [[fund-mapping-audit]]
- [[informatica]]
- [[lm-dc]]
- [[aqt]]
- [[p3]]
