---
title: "Post-Conversion Loan Analysis"
type: concept
tags: [concept, audit, qa, loans, conversion, informatica]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Post-Conversion Loan Analysis

The QA analysis that validates participant loans after they have been loaded onto TA's system, executed in two phases and currently migrating off a legacy Access tool onto Informatica.

## Definition

Post-Conversion Loan Analysis is a [[qa]]-owned audit run after loan data has been loaded. Phase I runs a loan census query and exports results; Phase II imports the data into an Access tool, runs the loan analysis, and saves outputs (source: `Post_Conversion_Loan_Analysis_Tool.md.txt`).

## Why It Matters

Pre-conversion analysis ([[pre-conversion-loan-analysis]]) validates what the prior vendor said about loans. Post-conversion analysis validates what actually loaded — amortization schedules, interest rates, maturity dates, and repayment amounts as TA now has them. Discrepancies here are real loan-booking errors, not vendor data quality artifacts.

## Evidence / Examples

**Phase I** (source: `Post_Conversion_Loan_Analysis_Tool.md.txt`):
- Run loan census query
- Export results

**Phase II:**
- Import data into Access tool
- Run loan analysis
- Save outputs

The Access tool is being retired in favor of the [[informatica-loan-module]]. The `Informatica Loan Module` and `Informatica Loan Module Functional Documentation` files in the main dump describe the replacement.

## Counterarguments

During the migration period, parallel runs (Access + Informatica) may be required to build confidence in the new module. Findings from one tool cannot be assumed to hold in the other without explicit parity testing.

## Related Concepts

- [[pre-conversion-loan-analysis]]
- [[informatica-loan-module]]
- [[loan-coupon-process]]
- [[aqt]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[cit-takeover-audit]]
- [[final-takeover-audit]]
