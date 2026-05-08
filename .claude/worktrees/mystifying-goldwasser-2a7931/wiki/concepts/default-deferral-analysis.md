---
title: "Default Deferral Analysis"
type: concept
tags: [concept, audit, qa, default-deferral, auto-enrollment, transmit-codes]
created: 2026-04-17
updated: 2026-04-17
sources: 4
---

# Default Deferral Analysis

The QA analysis that identifies participants in default for deferrals on auto-enroll plans and validates deferral rate, transmit code, and hire-date-vs-strategy alignment.

## Definition

Default Deferral Analysis is a [[qa]]-owned audit on auto-enroll plans that identifies participants in default for [[deferrals]], checks the deferral percentage, reviews transmit codes (A, T, S), and validates hire dates against conversion strategy (sources: `Default Deferral Analysis.md.txt`, `Default Deferral Analysis Description.md.txt`, `Default_Deferral_Analysis_by_Division_Code.md.txt`, `Default_Deferral_Analysis_pre-tax_only.md.txt`).

## Why It Matters

An auto-enroll plan with the wrong default-deferral population, rate, or transmit code will silently transmit the wrong payroll instruction to the employer at the first remittance cycle. The analysis is a pre-go-live check that prevents that — prerequisites include eligibility and auto-enroll setup being complete (source: `Default Deferral Analysis.md.txt`).

## Evidence / Examples

**Key fields** (sources: `Default Deferral Analysis.md.txt`, `Default Deferral Analysis Description.md.txt`):

- **Deferral percent** — does the defaulted rate match plan design?
- **Transmit code** — A, T, or S; drives how the deferral is transmitted to payroll ([[transmit-codes]] will have full definitions)
- **Hire dates vs. conversion strategy** — ensures the default population respects the cutoff rules for who is and isn't swept

**Variants:**

- Base (`Default Deferral Analysis.md.txt`) and Description (`Default Deferral Analysis Description.md.txt`) — core audit.
- **Pre-Tax Only** (`Default_Deferral_Analysis_pre-tax_only.md.txt`) — identifies defaults for pre-tax deferrals only; outputs default status, deferral %, transmit code, balances, and plan entry dates. Used to validate default population prior to go-live.
- **By Division Code** (`Default_Deferral_Analysis_by_Division_Code.md.txt`) — for mergers and segmented populations; outputs default status, rates, and transmit codes by division.

**Remedy:** adjust default flags or transmit codes as needed.

## Counterarguments

Transmit code correctness depends on payroll-vendor compatibility, which is a [[lm-dc]] concern as much as a QA concern. A clean Default Deferral Analysis with a transmit code the payroll vendor cannot honor still produces incorrect behavior downstream.

## Related Concepts

- [[default-allocation-analysis]]
- [[deferrals]]
- [[transmit-codes]]
- [[auto-enrollment-setup]]
- [[eligibility]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[cit-takeover-audit]]
