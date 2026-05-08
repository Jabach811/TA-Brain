---
title: "Informatica Balance Module"
type: concept
tags: [informatica, balance, system, audit]
created: 2026-04-16
updated: 2026-04-17
sources: 2
---

# Informatica Balance Module

Posts individual participant balances from final files into P3 and produces the balance audit comparing loaded balances to the FAA.

## Definition

The Balance Module (Informatica workflow `mp_part_balance`, also called CIT Balance) takes the DC-built CIT balance file — one row per participant per source per fund — and loads balances into P3. The module also supports a test mode that lets DC validate the file before committing it. The same module powers the balance audit that compares loaded balances to the Fund Asset Allocation (FAA) totals.

## Why It Matters

Every dollar in the plan flows through this module. If balances are wrong, every subsequent process — distributions, statements, loan re-amortization, vesting — is built on bad data. The FAA-vs-loaded comparison is the primary control that proves the conversion reconciles.

## Design of the Balance Audit

Per the Initial Design Specs for Informatica Balances source, the audit covers:

| Area | Detail |
|------|--------|
| Mapping strategies | How prior-vendor funds map to TA funds when one-to-one, one-to-many, or many-to-one |
| Cash conversion strategies | How prior cash positions convert into TA equivalents |
| Error conditions | Hard errors that block the load |
| Warning conditions | Soft flags that require DC review but don't block |
| Control totals | Plan-level and source-level reconciliation outputs |

## Test vs Live Modes

From the `[[informatica]]` hub, the balance module parameter file supports three modes:

| Mode | Meaning |
|------|---------|
| `P` | Preliminary — SSNs not yet on system; for early test runs |
| `Y` | Test — SSNs are on system but balances should not post; validation only |
| `N` | Live — commit balances to P3 |

## Operational Notes

- Fund and source maps saved as text tab-delimited; keep leading zeros; **case sensitive**
- After running: DC reviews P3, then reverses any dummy participant used for mapping conversions
- Loan funds in prior-vendor balances must be filtered out — loan data loads via the Loan Module instead
- FMC must be updated with FMC Estimate output by 4:00 PM (2:00 PM for Vanguard funds — see [[rich-lippoth]])

## Evidence / Examples

- Source: `Informatica Balance Module Functional Documentation v2.md.txt` (title-only placeholder)
- Source: `Initial Design Specs for Informatica Balances.md.txt` — audit/FAA-comparison design

## Related Concepts

- [[informatica]] — hub
- [[faa-balances]] — upstream balance data consumed by this module
- [[informatica-allocation-module]] — parallel module for elections
- [[informatica-loan-module]] — parallel module for loans
- [[final-files-processing]] — the broader DC phase this module lives in
- [[fund-management-calendar]] — FMC deadline coupling
- [[rich-lippoth]]

## See Also
- [[informatica]]
- [[faa-balances]]
- [[faa-dc-data-requirements]]
- [[main-dump-batch-2026-04-17]]
