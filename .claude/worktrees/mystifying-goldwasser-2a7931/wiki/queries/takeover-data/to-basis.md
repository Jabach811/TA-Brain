---
title: "Query: TO_BASIS — Takeover Basis Verification"
type: query
tags: [query, sql, takeover, basis, roth]
used-by-role: [lm-dc, qa]
used-in-process: [[final-takeover-audit]]
aqt-parameters: [CASE_NO, EE_BEG_BAL_DT]
tables: [CORP.EMPLOYEE, CORP.EE_BASIS]
systems: [aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Query: TO_BASIS — Takeover Basis Verification

Pulls `EE_BASIS` rows for a plan after a basis load and confirms Roth first-contribution-year (`RTH_CTRB_FST_YR`) is populated for everyone who has Roth basis.

## Purpose

Verifies basis data loaded correctly: pre-87/post-86 after-tax basis, Roth basis buckets (taxfree, hardship, rollover), Type 3/6 amounts, deemed loan amounts. Catches the common failure where Roth basis loads but `RTH_CTRB_FST_YR` is not populated — that breaks downstream Roth qualified distribution logic.

## When to Run

Before a basis load, to verify the target SSNs exist in `CORP.EMPLOYEE`. After the load, to verify every participant with basis has a first-Roth-contribution year populated.

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| CASE_NO | `QK63283   00053` | Plan case number |
| EE_BEG_BAL_DT | `20251231` | Beginning-balance date matching the basis load |

## Tables Used
- `CORP.EMPLOYEE` — participant master (verify SSNs exist before loading)
- `CORP.EE_BASIS` — basis table (Roth, after-tax, Type 3/6 buckets)

## SQL

```sql

--RUN AND EXPORT TO TO_BASIS REPORT.  USE TO VERIFY EVERYONE THAT YOU ARE LOADING BASIS FOR IS IN THE SYSTEM.
SELECT CASE_NO , SOC_SEC_NO 
FROM CORP.EMPLOYEE
WHERE CASE_NO = 'QK63283   00053'

;

--**** AFTER LOADING PULLS IN BASIS AND ROTH 1ST DATE

SELECT A.CASE_NO , A.SOC_SEC_NO , RTH_CTRB_FST_YR, RTH_HRDSHP_CTRB_A, RTH_TAXFREE_CTRB_A, RTH_TAXFREE_ROLL_A, PRE87_TAX_BAS_AMT , POST86_TAX_BAS_AMT , TYP6_TOT_WD_AMT , TYP234_TOT_WD_AMT , CORP_TYP6_CTRB_AMT, PRE89_TYP3_BAS_AMT, POST88TYP3_BAS_AMT, DEEMED_LOAN_AMT, EE_BEG_BAL_DT
FROM CORP.EE_BASIS A, CORP.EMPLOYEE B
WHERE A.CASE_NO = 'QK63283   00053'
AND A.SOC_SEC_NO NOT LIKE '%T%'
AND A.CASE_NO = B.CASE_NO
AND A.SOC_SEC_NO = B.SOC_SEC_NO
AND A.EE_BEG_BAL_DT = '20251231'

;

--IF Roth Basis is loaded, Verfiy the Roth 1st Date Loaded.  If there is output that means ppts with basis is missing a first roth date.
SELECT CASE_NO , SOC_SEC_NO , RTH_CTRB_FST_YR 
FROM CORP.EMPLOYEE
WHERE CASE_NO = 'QK63283   00053'
AND RTH_CTRB_FST_YR = '0'
AND SOC_SEC_NO IN (SELECT SOC_SEC_NO
			       FROM CORP.EE_BASIS
				   WHERE CASE_NO = 'QK63283   00053')
--			       AND RTH_HRDSHP_CTRB_A > 0.00)

;
--PULLS THE FULL TABLE DATA
SELECT *
FROM CORP.EE_BASIS
WHERE CASE_NO LIKE 'QK63283_  00053%'
AND SOC_SEC_NO NOT LIKE '%T%'
--AND SOC_SEC_NO IN ()
;
```

## Output / What to Look For

- SSN count from pre-load verification should equal the basis file count. Anyone missing means a census / employee-load gap before basis loads.
- Post-load: every participant with Roth basis (`RTH_HRDSHP_CTRB_A > 0` or `RTH_TAXFREE_CTRB_A > 0`) must have `RTH_CTRB_FST_YR` populated in `CORP.EMPLOYEE`. The third query should return zero rows.
- `EE_BEG_BAL_DT` should match the takeover date.
- SSNs with `%T%` pattern are excluded (temporary / test accounts).

## Related Queries
- [[to-ytd-contrib]]
- [[to-balances]]
- [[basis-internal-conversion]]

## See Also
- [[final-takeover-audit]]
- [[conv-file]]
