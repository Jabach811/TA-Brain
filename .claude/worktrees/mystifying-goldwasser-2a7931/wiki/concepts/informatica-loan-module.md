---
title: "Informatica Loan Module"
type: concept
tags: [informatica, loans, system, audit]
created: 2026-04-16
updated: 2026-04-17
sources: 2
---

# Informatica Loan Module

Loads participant loan data from the prior vendor into P3 and replaces the legacy Access-based loan audit process.

## Definition

The Loan Module loads loan header data into `PENSION.CONV_LOAN` and source-level balances into `PENSION.CONV_LOAN_PRIN`, then produces the loan audit comparing loaded loans to the prior-vendor file. It replaced a legacy Microsoft Access-based loan audit — the new module generates the same findings inside Informatica with consistent output.

## Why It Matters

Loans are the single most error-prone piece of a conversion: wrong amortization numbers mean wrong payroll deductions, missed maturity dates mean defaults, and loans to terminated participants have specific regulatory treatment. A single bad loan can generate a participant complaint and a compliance issue simultaneously.

## Key Audits Produced

| Audit | What It Flags |
|-------|---------------|
| Loans past maturity | Loans where the maturity date is in the past |
| Loans behind | Loans behind on payments — split by whether they are subject to default or not |
| Loans to terminated participants | Active loans held by participants no longer employed |

## Audit Output Fields

- Participant identifiers
- Loan terms (principal, rate, term)
- Current balances
- Maturity date
- Default indicators

## P3 Prerequisites

Before the module will run cleanly, loans must be set up on P3:
- Plan tab → Conversions → add recordkeeper

## Parameter File

- Prior vendor name must match `censuslookupfile.xls` exactly
- Plan name
- User ID
- Effective date

## NPER Rounding Logic

Effective April 2015, the module uses this rule to compute number of remaining payments:

| Decimal | Rule |
|---------|------|
| ≤ 0.10 | Round down |
| 0.11 – 0.89 | Round up if result × repayment > $10; else round down |
| > 0.89 | Round up |

## Post-Run Procedure

1. Check Loan Compare file — all differences must be 0
2. Check Loan BEE detail file for errors
3. Run Loan Load Job in P3

## Common Errors

| Error | Cause |
|-------|-------|
| "Conversion number not found" | Loans not set up on P3 first |
| "Nper is null or zero" | Loan frequency missing from `censuslookupfile.xls`, or vendor name spelled differently than in the lookup |
| "SSN not found on system for plan" | Census not yet loaded (OK in preliminary runs) |
| "Source I does not exist on plan" | Source mapping incomplete or bad data |

## Evidence / Examples

- Source: `Informatica Loan Module Functional Documentation.md.txt` (title-only placeholder)
- Source: `Informatica Loan Module.md.txt` — audit list, output fields, legacy Access replacement

## Related Concepts

- [[informatica]] — hub
- [[pre-conversion-loan-analysis]]
- [[post-conversion-loan-analysis]]
- [[loan-coupon-process]]
- [[informatica-balance-module]] — parallel module for balances
- [[informatica-allocation-module]] — parallel module for elections

## See Also
- [[informatica]]
- [[pre-conversion-loan-analysis]]
- [[post-conversion-loan-analysis]]
- [[loan-coupon-process]]
- [[main-dump-batch-2026-04-17]]
