---
title: "Loading Basis through EDS"
type: concept
tags: [eds, basis, process, system]
created: 2026-04-16
updated: 2026-04-20
sources: 1
---

# Loading Basis through EDS

Procedure for loading cost basis data for plan participants through EDS during a plan conversion.

## Definition

EE Basis determines the amount available for hardship withdrawals and tracks after-tax and Roth contributions for special tax considerations upon withdrawal. It is loaded via EDS in P3 using the **Basis** data type.

## Process

1. Vendor provides **test files** and **live files**
2. For all files (test, refresh, live): run **Validate Only** in EDS first
3. Review EDS output — communicate all errors and warnings to client, COM, and TC
4. Verify whether basis rows already exist in tables before and after loading

## File Preparation

- Required fields: SSN, hardship amount
- For Roth loads: also include First Roth Contribution Year
- Basis should be loaded **as of the last plan year** — typically 12/31 of the prior calendar year
- For **mid-year conversions**: load basis to both current year and prior year basis sets

## Basis Fields

| Field | Description |
|-------|-------------|
| PRE-87 TAX BASIS AMT | Pre-1987 after-tax basis |
| POST86_TAX_BAS_AMT | Post-1986 after-tax basis |
| CORP_TYP6_CTRB_AMT | Corporate Type 6 contribution amount |
| POST88TYP3_BAS_AMT | Post-1988 Type 3 basis |
| PRE89_TYP3_BAS_AMT | Pre-1989 Type 3 basis |
| EE_BEG_BAL_DAT | Employee beginning balance date |
| RTH_HRDSHP_CTRB_A | Roth hardship contribution amount |
| RTH_TAXFREE_CTRB_A | Roth tax-free contribution amount |
| RTH_TAXFREE_ROLL_A | Roth tax-free rollover amount |
| EMPLOYER_BAS_AMT | Employer basis amount |
| RTH_CTRB_FST_YR | First Roth Contribution Year |

## Tables Affected

- `Region.EE_BASIS`
- `Region.WITHDRAWAL_DETAIL`
- `Region.TRANSACT_DETAIL`
- `Region.EE_COST_BASIS` (plans with ER stock basis only)

## Transactions That Adjust Basis

- Contributions
- Negative contributions
- Withdrawals
- Loan defaults

## Transactions That Do NOT Adjust Basis

- Loan payments
- Rollovers
- Takeovers
- Loans

## Rules and Notes

- **Do not load basis for 457 plans**
- Only load Cost Basis for stock funds and NQ plan re-registrations
- Roth did not start until 2006 — load Roth basis for all participants with Roth balances
- Roth hardship amount is assumed equal to Roth basis unless otherwise specified
- Even if hardship withdrawals are not allowed, load basis if it is provided
- Only one takeover (T row) can exist per plan
- Hardship suspension dates: load only end or re-entry dates via SQL
- Distinguish stale dated checks from true after-tax basis when applicable

## Basis Verification

After loading, verify by summing contributions by source and plan year, then subtracting withdrawals, negative contributions, and loan defaults. Reference tables:
- `transact_detail` (current and archived)
- `withdrawal_detail`

## Queries

- `TO_BASIS.sql` — referenced query for basis verification (exact path in source documentation)

## See Also

- [[eds]]
- [[loading-eligibility-eds]]
- [[loading-ytd-contributions-eds]]
- [[informatica-basis-module]]
- [[final-files-processing]]
- [[census-data]]
