---
title: "Source Mapping Audit"
type: concept
tags: [concept, audit, qa, source-mapping, conversion]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Source Mapping Audit

The QA audit that validates prior-vendor-to-TA source mappings against the approved source grids before participant balances and deferrals are loaded.

## Definition

The Source Mapping Audit is a [[qa]]-owned mapping-validation audit that verifies every source on the DC's source map matches the approved source grid for the plan — covering source names, codes, vesting/withdrawal provisions, SRC_I flags, and contribution types (source: `Source Mapping Audit.md.txt`).

## Why It Matters

Source mapping governs how money is categorized inside a participant account: which dollars are pre-tax, which are Roth, which are employer match, which are subject to vesting, which can be withdrawn hardship or in-service, and which flow through which SRC_I. An error here does not look like a fund-level discrepancy at go-live — it looks like a compliance problem months later when a participant requests a distribution.

## Evidence / Examples

Review items enumerated by QA (source: `Source Mapping Audit.md.txt`):

- **Source names and codes** — prior-vendor source to TA source
- **Vesting and withdrawal provisions** — confirm provisions attached to the TA source match the plan document
- **SRC_I** — internal source identifier flag
- **Contribution types** — pre-tax, Roth, match, profit-sharing, QNEC/QMAC, rollover, etc.

The audit feeds directly into the [[faa-balances]] audit (which splits balances by fund and source) and into ongoing lookups such as the `[[get-plan-source]]` query used to resolve source IDs during DC work.

## Counterarguments

Source mapping can look clean structurally and still be wrong semantically — for example, a vendor's "ER Match" source may map to a TA source whose withdrawal provisions differ subtly. This audit can only catch what is on the grid; plan-document-level discrepancies require QA plus DC plus [[tc]] review.

## Related Concepts

- [[source-mapping]]
- [[fund-mapping-audit]]
- [[faa-balances]]
- [[get-plan-source]]
- [[missing-code-analysis]]
- [[audit-pack]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[cit-takeover-audit]]
