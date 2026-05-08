---
title: "Informatica Allocation Module"
type: concept
tags: [informatica, allocation, system, audit]
created: 2026-04-16
updated: 2026-04-17
sources: 2
---

# Informatica Allocation Module

Maps prior fund allocations to TA funds for participant investment elections during conversion, and audits those elections by fund and source.

## Definition

The Allocation Module (Informatica workflow `wf_mp_CIT_Elections_Module`) has two roles:

1. **Load**: map each participant's prior-vendor allocation percentages into TA fund/source slots so the elections appear correctly in P3 after conversion.
2. **Audit**: verify that the loaded elections match the source file and that mappings resolved cleanly.

The allocation audit sits beside the balance audit and loan audit as one of the three primary Informatica audit outputs used to validate a conversion before sign-off.

## Why It Matters

If allocations are loaded wrong, participants see the wrong default investment mix on day one — a visible, customer-impacting error. Audit findings here block conversion sign-off until resolved.

## Common Audit Checks

Per the Allocations Audit source:

| Check | What It Catches |
|-------|-----------------|
| Fund-and-source mapping errors | Rows where the prior fund or source didn't map to a TA fund/source |
| Allocation mismatches | Participant percentages that don't reconcile to 100% or don't match the source file |
| Default status validation | Whether participants flagged as default-allocated really should be |
| Control totals | Sum of allocations by fund/source across the plan tied to the input file |

## Pre-Run Requirements

From the `[[informatica]]` hub:
- Withdrawal sequence in the fund map must be numeric (blank or text rows are thrown out silently)
- Prior fund names must not have leading or trailing spaces — spaces break fund splits

## Evidence / Examples

- Source: `Informatica Allocation Module Functional Documentation.md.txt` (title-only placeholder — functional documentation lives elsewhere)
- Source: `Informatica - Allocations Audit.md.txt` — documents audit purpose and checks above

## Related Concepts

- [[informatica]] — hub
- [[faa-allocations]] — the upstream FAA allocation data this module consumes
- [[fund-mapping]] — TA-to-prior fund map the module relies on
- [[source-mapping]] — source ID map the module relies on
- [[informatica-balance-module]] — parallel audit for balances

## See Also
- [[informatica]]
- [[faa-allocations]]
- [[faa-dc-data-requirements]]
- [[fund-mapping]]
- [[source-mapping]]
- [[main-dump-batch-2026-04-17]]
