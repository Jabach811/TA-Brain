---
title: "FAA — DC Data Requirements"
type: concept
tags: [faa, fund-asset-allocation, data, requirements, dc, process]
created: 2026-04-16
updated: 2026-04-17
sources: 1
---

# FAA — DC Data Requirements

The data requirements the DC must satisfy for Fund Asset Allocation (FAA) processing — specifying what fields the prior record keeper must provide for both allocation-level and balance-level FAA data.

## Definition

FAA (Fund Asset Allocation) DC Data Requirements is the specification defining exactly what fund-level data is needed from the prior vendor to support both allocation processing and balance reconciliation in Informatica. It covers required fields, formats, and delivery standards for two related but distinct inputs:

- **FAA for Allocations** — the election-level fund percentages per participant per source, consumed by `[[informatica-allocation-module]]`
- **FAA for Balances** — the balance-level fund positions per participant per source, consumed by `[[informatica-balance-module]]`

The main-dump source (`FAA - DC Data Requirements(Final).md.txt`) is title-only; the full specification exists elsewhere.

## Why It Matters

If the FAA data doesn't match what the Informatica modules expect — field formats, required columns, fund code format — the load fails or silently discards rows. Both the Balance Module and the Allocation Module build their audit outputs from FAA data, so a spec mismatch breaks the conversion's primary reconciliation control.

## Expected Requirements

Drawing from the Allocation Module, Balance Module, and `[[fund-mapping]]` constraints:

| Requirement | Notes |
|-------------|-------|
| Prior fund codes | Must match the fund map |
| Prior fund names | No leading or trailing spaces — spaces break fund splits |
| Withdrawal sequence | Must be numeric (blank or text rows are dropped) |
| Participant-level allocation % | Per fund per participant (for FAA Allocations) |
| Participant-level balance | Per fund per source per participant (for FAA Balances) |
| Source-level breakdown | Whether data is provided per source or rolled up |
| Cash positions | Handled via the Balance Module's cash-conversion strategies |
| Loan funds | Must be separable — loan balances load through the Loan Module, not the Balance Module |

## Evidence / Examples

- Source: `FAA - DC Data Requirements(Final).md.txt` — title-only
- Related source: `Initial Design Specs for Informatica Balances.md.txt` — documents the balance audit/FAA comparison design

## Related Concepts

- [[faa-allocations]] — allocation-side FAA data
- [[faa-balances]] — balance-side FAA data
- [[informatica-allocation-module]]
- [[informatica-balance-module]]
- [[fund-mapping]]
- [[source-mapping]]
- [[data-discovery-document]] — the upstream discovery step

## See Also
- [[faa-allocations]]
- [[faa-balances]]
- [[informatica]]
- [[fund-mapping]]
- [[main-dump-batch-2026-04-17]]
