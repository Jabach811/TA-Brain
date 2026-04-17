---
title: "FAA — DC Data Requirements"
type: concept
tags: [faa, fund-asset-allocation, data, requirements, dc, process]
created: 2026-04-16
updated: 2026-04-16
sources: 0
---

# FAA — DC Data Requirements

The data requirements the DC must satisfy for Fund Asset Allocation (FAA) processing — specifying what fields the prior record keeper must provide for fund-level allocation data.

## Definition

FAA (Fund Asset Allocation) DC Data Requirements is the specification document defining exactly what fund-level data is needed from the prior vendor to support allocation processing in Informatica. It covers required fields, formats, and delivery standards for allocation input data.

## Why It Matters

The Allocation Module in Informatica (`wf_mp_CIT_Elections_Module`) maps prior fund allocations to TA funds for participant investment elections. For this to work correctly, the prior vendor's allocation data must conform to expected formats. The FAA DC Data Requirements document tells the DC — and the prior RK — what those requirements are.

## Expected Data Requirements

Based on the context of the Allocation Module and fund mapping process, FAA data requirements likely cover:

| Requirement | Notes |
|-------------|-------|
| Prior fund codes | Must match what is in the fund map |
| Participant-level allocation percentages | Per fund, per participant |
| Withdrawal sequence | Must be a number — not blank or text |
| Prior fund names | No leading/trailing spaces (causes split errors) |
| Source-level breakdown | Whether allocations are provided per source |

## Related Processes

- [[informatica-allocation-module]] — the Informatica workflow that consumes this data
- [[fund-mapping]] — TA funds are mapped to prior funds; the FAA data must align with this map
- [[source-mapping]] — source IDs used alongside allocation data
- [[eds]] — allocation data may also be loaded via EDS layouts depending on format

## See Also
- [[glossary/faa]]
- [[fund-mapping]]
- [[informatica-allocation-module]]
- [[informatica]]
- [[eds]]
