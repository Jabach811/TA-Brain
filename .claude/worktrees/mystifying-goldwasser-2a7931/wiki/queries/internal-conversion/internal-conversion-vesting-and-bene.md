---
title: "Internal Conversion — Vesting and Bene"
type: analysis
tags: [query, sql, internal-conversion, vesting, beneficiary]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [CORP.EE_PART_VESTED_BAL, CORP.EE_PART_BAL_HEADER, CORP.EE_PART_BALANCE, CORP.EMPLOYEE, CORP.HELPER2, PENSION.GET_PLAN_SRC, PENSION.BENE_HIST, PENSION.PERSON_SEARCH, PENSION.ORG_SEARCH, PENSION.LE_ADDRESS, PENSION.BENE_TRST_EXECUTOR]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Internal Conversion — Vesting and Bene

Two standalone extracts that pull the vested-percentage table and the beneficiary designations from the outgoing case so vesting overrides and bene records can be reapplied on the surviving case.

## Purpose

The **vesting query** returns every participant's vested-percentage row per source as of the last month-end business day — this is what gets loaded into the new plan as opening vested balances.

The **bene query** returns every active beneficiary designation on the old case (primary, contingent, trust, executor), including name, relationship, share percentage, effective date, and mailing address — everything needed to recreate bene records on the surviving case without forcing participants to re-enroll their beneficiaries.

## When to Run

Run both queries during internal-conversion prep, **after** the base extract has the participant list but **before** the surviving-case load. The bene query is usually run close to the liquidation date so designations captured are current.

## Parameters

Hardcoded to the old case; update the `CASE_NO LIKE '932365%'` filter in both queries to the outgoing case for your conversion.

The vesting query uses two CTEs — `BUS_DAYS` (business-day lookup from `CORP.HELPER2` HLP_CODE `BUSDAYS` with text `OPEN%`) and `MONTH_END` (resolves prior-month business-day month-end, skipping weekends).

## Notes

- The vesting query joins `EE_PART_BAL_HEADER` to `EE_PART_VESTED_BAL` by `(ENRL_PROV_GRP_I, TRANSACT_I)` and enriches with participant name via `CORP.EMPLOYEE`, source name via `PENSION.GET_PLAN_SRC`, and total balance via `EE_PART_BALANCE` (SRC_CD = 1 employee money).
- Effective date for the vested row is hard-coded to `1/1/1950` in the output because the vested percentage is a participant-level attribute — not tied to a transaction date.
- The bene query filters `STATUS_C = 'A'` (active) and can optionally be restricted to `DATA_CH_ORIG_C = 'I'` for only internally-entered designations.
- Bene address joins `PENSION.LE_ADDRESS` on `ADDRESS_I = CP_I`.

## Tables Used

- `CORP.EE_PART_VESTED_BAL` — vested-percent-per-source-per-participant.
- `CORP.EE_PART_BAL_HEADER` — snapshot header keyed by case + effective date.
- `CORP.EE_PART_BALANCE` — detail rows (TOTAL_A per source).
- `PENSION.GET_PLAN_SRC` — source metadata lookup.
- `PENSION.BENE_HIST` — beneficiary history (active rows only via `STATUS_C = 'A'`).
- `PENSION.PERSON_SEARCH` / `PENSION.ORG_SEARCH` — names for beneficiaries that are people vs. organizations.
- `PENSION.LE_ADDRESS` — beneficiary mailing address.
- `CORP.HELPER2` — two lookups: `157108` for relationship, `BENETYP` for primary/contingent type, `SRC_CODE` for data-change origin.

## SQL

```sql
--vesting query
WITH		
BUS_DAYS	AS	
	(	
SELECT DATE(SUBSTR(HLP_VALUE,1,4)||'-'||SUBSTR(HLP_VALUE,5,2)||'-'||SUBSTR(HLP_VALUE,7,2)) CURRENT_DAY,
LAG(DATE(SUBSTR(HLP_VALUE,1,4)||'-'||SUBSTR(HLP_VALUE,5,2)||'-'||SUBSTR(HLP_VALUE,7,2))) OVER(ORDER BY HLP_VALUE) PRIOR_DAY
FROM CORP.HELPER2
WHERE HLP_CODE = 'BUSDAYS'
AND HLP_TEXT LIKE 'OPEN%'
AND HLP_VALUE >= '20131231'
	),	
		
MONTH_END	AS	
	(	
SELECT		
CASE		
WHEN DAYOFWEEK(LAST_DAY(CURRENT DATE - 1 MONTH)) NOT IN (1,7) AND LAST_DAY(CURRENT DATE - 1 MONTH) NOT IN (SELECT CURRENT_DAY FROM BUS_DAYS)
THEN (SELECT MAX(CURRENT_DAY)
	  FROM BUS_DAYS
	  WHERE MONTH(CURRENT_DAY) = MONTH(CURRENT DATE - 1 MONTH)
	  AND YEAR(CURRENT_DAY) = YEAR(CURRENT DATE - 1 MONTH))
WHEN DAYOFWEEK(LAST_DAY(CURRENT DATE - 1 MONTH)) IN (1,7)
THEN (SELECT MAX(CURRENT_DAY)
  	FROM BUS_DAYS
  	WHERE MONTH(CURRENT_DAY) = MONTH(CURRENT DATE - 1 MONTH)
	  AND YEAR(CURRENT_DAY) = YEAR(CURRENT DATE - 1 MONTH))
WHEN DAYOFWEEK(LAST_DAY(CURRENT DATE - 1 MONTH)) NOT IN (1,7) AND LAST_DAY(CURRENT DATE - 1 MONTH) IN (SELECT CURRENT_DAY FROM BUS_DAYS)
THEN LAST_DAY(CURRENT DATE - 1 MONTH)
END MONTH_END_D
FROM SYSIBM.SYSDUMMY1
	)	
		
SELECT		
SUBSTR(B.CASE_NO,11,5) CASE_NO
,A.SOC_SEC_NO	
,A.VESTED_P	
,'1/1/1950' EFF_D	
,A.SRC_I		
		
FROM CORP.EE_PART_VESTED_BAL A
		
JOIN CORP.EE_PART_BAL_HEADER B
ON A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
AND A.TRANSACT_I = B.TRANSACT_I
		
LEFT JOIN CORP.EMPLOYEE C
ON B.CASE_NO = C.CASE_NO
AND A.SOC_SEC_NO = C.SOC_SEC_NO
		
LEFT JOIN PENSION.GET_PLAN_SRC D
ON A.SRC_I = D.SRC_I
		
LEFT JOIN		
	(	
SELECT		
A.CASE_NO	
,B.SOC_SEC_NO	
,B. SRC_I		
,SUM(TOTAL_A) TOTAL_A
		
FROM CORP.EE_PART_BAL_HEADER A
		
JOIN CORP.EE_PART_BALANCE B
ON A.TRANSACT_I = B.TRANSACT_I
AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
AND B.SOC_SEC_NO LIKE '%-%-%'
		
WHERE A.CASE_NO LIKE '932365%'
AND A.EFF_D = (SELECT MONTH_END_D FROM MONTH_END)
AND A.SRC_CD = 1	
		
GROUP BY	
A.CASE_NO	
,B.SOC_SEC_NO	
,B. SRC_I		
	) E	
ON A.SOC_SEC_NO = E.SOC_SEC_NO
AND A.SRC_I = E.SRC_I
		
WHERE B.CASE_NO LIKE '932365%'
AND B.EFF_D = (SELECT MONTH_END_D FROM MONTH_END)
AND A.SOC_SEC_NO LIKE '%-%-%'
		
GROUP BY	
SUBSTR(B.CASE_NO,11,5)
,A.SOC_SEC_NO	
,A.VESTED_P	
,A.SRC_I		
		
ORDER BY SOC_SEC_NO, SRC_I

;

--bene query
SELECT SUBSTR(A.ACCOUNT_NO,11,5) SUB_ID
	,A.SOC_SEC_NO
	,COALESCE(D.LAST_NM, '') BENE_LAST_NM
	,COALESCE(D.FST_MID_NM, '') BENE_FST_MID_NM
	,C.HLP_TEXT BENE_TYPE
	,B.HLP_TEXT BENE_RELATE
	,A.BENE_PRCDS_SHR_P
	,A.BENE_DESIG_EFF_D
,COALESCE(G.ADDR_LINE_1_T, '') ADDR_LINE_1_T
	,COALESCE(G.ADDR_LINE_2_T, '') ADDR_LINE_2_T
	,COALESCE(G.ST_C, '') ST_C
	,COALESCE(G.CITY_NM, '') CITY_NM
	,COALESCE(G.ZIP_C, '') ZIP_C
	,D.SOC_SEC_NO BENE_SSN
	,D.BIRTH_D BENE_DOB
	,D.GENDER_C
,'' BENE_PHONE,'' BENE_EMAIL
FROM PENSION.BENE_HIST A
LEFT JOIN CORP.HELPER2 B ON A.BENE_RELAT_C = B.HLP_VALUE
	AND B.HLP_CODE = '157108'
LEFT JOIN CORP.HELPER2 C ON A.BENE_TYP_C = C.HLP_VALUE
	AND C.HLP_CODE = 'BENETYP'
LEFT JOIN PENSION.PERSON_SEARCH D ON A.PERSON_I = D.PERSON_I
LEFT JOIN CORP.EMPLOYEE E ON A.ACCOUNT_NO = E.CASE_NO
	AND A.SOC_SEC_NO = E.SOC_SEC_NO
LEFT JOIN PENSION.ORG_SEARCH F ON A.PERSON_I = F.ORG_I
	AND F.ROLE_C = 2
LEFT JOIN PENSION.LE_ADDRESS G ON A.ADDRESS_I = G.CP_I
LEFT JOIN PENSION.BENE_TRST_EXECUTOR H ON A.PERSON_I = H.PERSON_I
LEFT JOIN CORP.HELPER2 I ON A.DATA_CH_ORIG_C = I.HLP_VALUE
	AND I.HLP_CODE = 'SRC_CODE'
WHERE A.ACCOUNT_NO like '932365%'
	AND A.STATUS_C = 'A'
--AND A.DATA_CH_ORIG_C = 'I'
ORDER BY SUB_ID, SOC_SEC_NO, BENE_TYPE DESC, BENE_PRCDS_SHR_P
WITH UR		
;
```

## Output / What to Look For

- Vesting query: one row per (SOC_SEC_NO, SRC_I) showing vested percent. Cross-check against the old-case vesting override page for anyone listed there.
- Bene query: ordered by sub_id, SSN, bene type (primary first), share percent. Verify share percentages sum to 100 per participant-per-bene-type.

## Related Queries

- [[vesting-overrides]] — manually-set vesting overrides to carry forward separately
- [[internal-conversion-base]] — base participant extract

## See Also

- [[internal-conversion]]
- [[vesting-override]]
- [[beneficiary-record]]
