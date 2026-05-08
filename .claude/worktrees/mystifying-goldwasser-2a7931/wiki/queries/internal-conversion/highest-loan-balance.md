---
title: "Highest Outstanding Loan Balance"
type: analysis
tags: [query, sql, internal-conversion, loan, highest-outstanding-balance, holb]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [CORP.VLOAN_REPAYMENT, CORP.EMPLOYEE]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Highest Outstanding Loan Balance

12-month rolling scan of loan principal-due-amount by participant to find the high-water-mark per month — used for IRS loan-limit HOLB (Highest Outstanding Loan Balance) calculations in the 12-month look-back window.

## Purpose

IRS loan rules cap new-loan issuance at 50% of the vested balance or $50,000, whichever is smaller, reduced by the highest outstanding loan balance (HOLB) over the prior 12 months. This query scans `CORP.VLOAN_REPAYMENT` over the configured 12-month window and returns the minimum positive principal-due per (SSN, year-month) — that's the month's HOLB snapshot.

## When to Run

Pre-liquidation alongside the loan data extract. The HOLB per participant for the 12 months ending on the liquidation date is required so loans being migrated carry correct HOLB history for post-conversion loan-limit calculations.

## Parameters

Hardcoded:
- `A.CASE_NO = 'QK62132   00001'` — old case
- `EFF_DT BETWEEN '20080101' AND '20081231'` — 12-month look-back window; adjust to `(liquidation-date - 12 months)` through `liquidation-date`

## Notes

- Inner aggregate: per (SSN, EFF_DT) take the minimum positive `PRNC_BAL_DUE_AMT`. This captures the lowest point each day.
- Outer aggregate: collapse to per (SSN, year-month) using `SUBSTR(EFF_DT, 1, 6)`.
- `PRNC_BAL_DUE_AMT > 0` filter excludes paid-off days.
- Commented-out `EE_DIV_NO = 'COGS'` shows the typical division-filter pattern when HOLB is needed for a subset of participants.

## Tables Used

- `CORP.VLOAN_REPAYMENT` — per-loan-per-day repayment snapshot view.
- `CORP.EMPLOYEE` — used for optional division filter.

## SQL

```sql
select soc_Sec_no, Yearmonth, min(due)
from
(SELECT A.SOC_SEC_NO,substr(eff_dt,1,6) as yearmonth ,min(PRNC_BAL_DUE_AMT) as due

                                                                              
FROM CORP.VLOAN_REPAYMENT A, CORP.EMPLOYEE B                                                  
                                                                              
WHERE A.CASE_NO= 'QK62132   00001'
AND A.CASE_NO = B.CASE_NO
AND A.SOC_sEC_NO = B.SOC_sEC_NO
--AND B.EE_DIV_NO = 'COGS'                                                       
AND EFF_DT BETWEEN '20080101' AND '20081231'  
--and a.soc_Sec_no='014-48-4402'                            
AND PRNC_BAL_DUE_AMT>0                                                        
GROUP BY A.SOC_SEC_NO, eff_dt) as A

group by a.soc_Sec_no, yearmonth
ORDER BY A.SOC_SEC_NO
```

## Output / What to Look For

- One row per (SSN, yearmonth) for the 12-month window.
- Pivot / group to produce each participant's single HOLB value = MAX across the 12 monthly minimums.
- Send to the loan setup team at CTS for migrated loan records.

## Related Queries

- [[takeover-loan-query-build]] — new-case loan query for takeover migration
- [[takeover-loan-sources]] — source breakdown
- [[internal-conversion-base]] — section 11 pulls loan info per participant

## See Also

- [[internal-conversion]]
- [[loan]]
- [[highest-outstanding-loan-balance]]
