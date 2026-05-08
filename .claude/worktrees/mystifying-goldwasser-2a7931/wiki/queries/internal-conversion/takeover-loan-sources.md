---
title: "Takeover Loan Sources Query Build"
type: analysis
tags: [query, sql, internal-conversion, loan, takeover, loan-source, source-split]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion, loan-takeover]
aqt-parameters: []
tables: [PENSION.LOAN_DETAIL_SRC, PENSION.LOAN_REPAY_SRC, PENSION.LOAN_DETAIL_SRC_HISTORY, PENSION.PLAN_PROV_GRP, PENSION.PLAN_SRC_DETAIL, PENSION.GET_PLAN_SRC, CORP.LOAN_DETAIL]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Takeover Loan Sources Query Build

Companion to [[takeover-loan-query-build]] — breaks each takeover-eligible loan down by money source and returns the remaining principal per source.

## Purpose

A single loan is typically collateralized from multiple money sources (EE pre-tax, Roth, employer match, rollover, etc.). The loan header carries one amount but the payoff balance is distributed across sources in proportion to the originating balances. This query pulls that per-source split so the new-case loan setup can reconstruct the correct source-level collateral for each migrated loan.

## When to Run

Same timing as [[takeover-loan-query-build]] — pre-liquidation, after the outgoing loan portfolio is stable.

## Parameters

Hardcoded: `B.ACCOUNT_NO like '932339%'` — update to the old case.

Unlike the header query, this one does not use `$Business_line` / SETPARM because it pulls entirely from the `PENSION` schema tables (which are business-line-neutral). The `CORP.LOAN_DETAIL` filter on the EXISTS clause may need to be swapped to `TDA.LOAN_DETAIL` depending on plan line.

## Notes

- CTE `LOAN_DATA` joins `LOAN_DETAIL_SRC` with `LOAN_DETAIL_SRC_HISTORY` at SEQ_NO=0 to pick the original source-level loan amount — if history exists use that, otherwise fall back to the current detail amount.
- `source_bal` = original source amount minus total paid-to-date from `LOAN_REPAY_SRC`.
- EXISTS-filter on `CORP.LOAN_DETAIL` ensures we only return sources for loans whose header is not in terminal status (`LN_TR_STAT_CD NOT IN ('4','E','3','7','5','1')`).
- Output columns include placeholder `case_no` / `sub_id` and several blank columns for downstream loan-setup fields.
- `RELATED_GRP_TYP_C = 361` filters to EE-money provision group.

## Tables Used

- `PENSION.LOAN_DETAIL_SRC` — per-source loan origination amounts.
- `PENSION.LOAN_DETAIL_SRC_HISTORY` — SEQ_NO=0 history row for the very first source detail.
- `PENSION.LOAN_REPAY_SRC` — per-source repayment aggregates.
- `PENSION.PLAN_PROV_GRP` — case scope.
- `PENSION.PLAN_SRC_DETAIL` / `PENSION.GET_PLAN_SRC` — source type + name decode.
- `CORP.LOAN_DETAIL` — status filter (swap to TDA for TDA plans).

## SQL

```sql
WITH
LOAN_DATA	AS
	(
SELECT B.ACCOUNT_NO, A.SOC_SEC_NO, A.LOAN_NO, A.SRC_I, A.SRC_S,SRC_TYP_C, COALESCE(C.ORIG_LN_A,A.ORIG_LN_A) AS ORIG_LN_A
FROM PENSION.LOAN_DETAIL_SRC A, pension.plan_src_detail d

JOIN 
PENSION.PLAN_PROV_GRP B
ON A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
AND B.ACCOUNT_NO like '932339%'
AND B.RELATED_GRP_TYP_C = 361

LEFT JOIN PENSION.LOAN_detail_Src_HISTORY C
ON C.LOAN_NO=A.LOAN_NO AND C.SRC_I=A.SRC_I AND C.SOC_SEC_NO=A.SOc_sEC_NO and SEQ_NO=0

WHERE EXISTS	(SELECT '' FROM CORP.LOAN_DETAIL C
 WHERE A.LOAN_NO = C.LOAN_NO
AND C.LN_TR_STAT_CD NOT IN ('4', 'E','3','7','5','1'))
and a.src_i=d.src_i
	)


SELECT 
 ' ' as case_no, ' ' as sub_id , 
a.SOC_SEC_NO, 
a.LOAN_NO, 
 a.SRC_TYP_C,
a.ORIG_LN_A-coalesce(LN_PRNC_A,0) as source_bal,' ',' ', ' ',' ',
substr(a.ACCOUNT_NO,1,instr(a.ACCOUNT_no,' ')-1) as old_cont,SUBSTR(a.ACCOUNT_NO,11,5) as old_sub_id
FROM LOAN_DATA a
--
LEFT JOIN
	(
SELECT 
SOC_SEC_NO,
LOAN_NO,
SRC_S,
SRC_I,
SUM(LN_PRNC_A) LN_PRNC_A
FROM PENSION.LOAN_REPAY_SRC 
WHERE LOAN_NO IN (SELECT LOAN_NO
				  FROM LOAN_DATA)

GROUP BY
SOC_SEC_NO,
LOAN_NO,
SRC_S,
SRC_I
	) B
ON A.LOAN_NO = B.LOAN_NO
AND A.SRC_I = B.SRC_I
AND A.SOC_SEC_NO = B.SOC_SEC_NO

LEFT JOIN
PENSION.GET_PLAN_SRC C
ON A.SRC_I = C.SRC_I
```

## Output / What to Look For

One row per (loan, source). Sum of `source_bal` per loan should equal the loan's `principal_due` from [[takeover-loan-query-build]].

## Related Queries

- [[takeover-loan-query-build]] — header row per loan
- [[highest-loan-balance]]

## See Also

- [[internal-conversion]]
- [[loan-takeover]]
- [[loan-source]]
