---
title: "Informatica Loan Module"
type: process
tags: [informatica, loans, system, conversion]
created: 2026-04-16
updated: 2026-04-18
sources: 1
status: current
---

# Informatica Loan Module

The Informatica module that loads participant loan header records and source-balance allocations from a prior record keeper into P3.

## Definition

One of the core Informatica modules used during a plan conversion, alongside the [[informatica-balance-module|Balance]] and [[informatica-allocation-module|Allocation]] modules. The Loan Module reads a normalized loan import file plus a parameter file, applies frequency lookups and NPER rounding rules, and writes:

- **`PENSION.CONV_LOAN`** — one row per loan (header: outstanding balance, frequency, NPER, deemed status).
- **`PENSION.CONV_LOAN_PRIN`** — one row per source per loan (allocation of outstanding principal across money sources).

It is invoked at **Step 10** of [[loan-setup]], after the [[roles/lm-dc]] has confirmed Header = Source totals and verified the Deemed fields.

## Why It Matters

The Loan Module is the only path by which prior-vendor loans become repayable loans inside P3. Everything downstream — repayment schedules, source-balance reconciliation, deemed-loan tax reporting — depends on what this module writes. It is also the most error-prone module because it depends on three separate correctness conditions:

1. The loan file is internally consistent (Header = Source).
2. The Deemed Date / Amount fields follow the blank-vs-zero rules.
3. The vendor name in the parameter file matches `censuslookupfile.xls` exactly.

Any one of these wrong throws an error. Wrong vendor name is the most common culprit and the least obvious from the error message.

## Pre-Run Requirements

Before invoking the module, the [[roles/lm-dc]] must have:

- **P3 conversion record created** (Plan tab → Conversions → Add Record Keeper → New Conversion). Without this, the module raises "Conversion number not found." See [[loan-setup]] Steps 1–7.
- **Conversion Number** captured from P3.
- **Loan import file** validated: Header outstanding = Source totals, exactly to the cent.
- **Deemed fields** verified: Deemed Date blank or populated; Deemed Amount **never blank** (use `0` if no deemed amount).
- **Record Keeper Name** matches `censuslookupfile.xls` character-for-character.

## Parameter File

The parameter file requires:

- **Prior vendor name** (must match `censuslookupfile.xls` exactly — casing, spacing, punctuation)
- **Plan name**
- **User ID**
- **Effective date** (matches the P3 conversion record's Effective Date)

A mismatch in vendor name surfaces as `Nper is null or zero` because the module cannot resolve the loan frequency for an unknown vendor.

## NPER Rounding (effective April 2015)

`NPER` (number of remaining periods) often arrives as a decimal. The module applies these rules:

- decimal ≤ 0.10 → **round down**
- 0.11 – 0.89 → **round up if** result × repayment > $10, **else round down**
- decimal > 0.89 → **round up**

The "× repayment > $10" carve-out exists to avoid rounding up into a partial period that would generate a sub-$10 last payment.

## Targets

| Table | Purpose | One row per |
|-------|---------|-------------|
| `PENSION.CONV_LOAN` | Loan header (outstanding, frequency, NPER, deemed status) | Loan |
| `PENSION.CONV_LOAN_PRIN` | Source allocation of principal | Source × loan |

## Post-Run Validation

After the module finishes, the DC checks:

1. **Loan Compare file** — generated diff between source totals and loaded totals. **All differences must equal `0`.** Any non-zero is reconciled before continuing.
2. **Loan BEE detail** — error log. Investigate every error before moving on.
3. **Loan Load Job in P3** — only run after Loan Compare is clean. This is what surfaces the loaded loans inside P3 ready for Takeover Loans submit.

## Common Errors and Causes

| Error | Likely Cause |
|-------|--------------|
| `Conversion number not found` | Loans not set up on P3 — Steps 1–7 of [[loan-setup]] not completed. |
| `Nper is null or zero` | Loan frequency missing from `censuslookupfile.xls`, **or** vendor name in parameter file does not match the lookup file exactly. |
| `SSN not found on system for plan` | Census not yet loaded for the plan. OK if running preliminary; fix before final files. |
| `Source I does not exist on plan` | [[source-mapping]] incomplete or vendor sent loan principal allocated to a source that does not exist on the destination plan. |
| Blank `Deemed Amount` rejection | Step 9 of [[loan-setup]] not followed — Deemed Amount must be `0` (never blank) for non-deemed loans. |

## Sequencing in the Conversion

The Loan Module runs **once per plan, mid-conversion** — after P3 setup is complete and before participant balances post. It is the gate between "loans are file data" and "loans live in P3." See [[loan-setup]] for the full 14-step process and [[plan-conversion-handoffs]] for where this fits in the wider conversion timeline.

## Counterarguments and Edge Cases

- **Multi-vendor conversions.** A plan with loans from two prior vendors (rare but happens during M&A) requires running the module once per vendor, with each parameter file pointing at its own vendor name. Both runs feed the same Conversion Number.
- **Loans-only conversion.** Some takeovers move only loans (balances stay at the prior RK temporarily). The module runs the same way; only the downstream balance steps are skipped.
- **Re-running after error.** Safe to re-run after fixing the source error — the module is idempotent against `CONV_LOAN` / `CONV_LOAN_PRIN` for the same Conversion Number.

## See Also

- [[loan-setup|Loan Setup & Processing (process page)]]
- [[loan-setup|Loan Setup (concept)]]
- [[informatica]]
- [[informatica-training-manual]]
- [[informatica-balance-module]]
- [[informatica-troubleshooting-guide]]
- [[final-files-processing]]
- [[plan-conversion-handoffs]]
