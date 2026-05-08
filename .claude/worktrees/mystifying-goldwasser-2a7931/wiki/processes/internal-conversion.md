---
title: "Internal Conversion / Internal Merger"
type: process
tags: [process, conversion, internal, merger, liquidation, rebook]
created: 2026-04-17
updated: 2026-04-17
sources: 3
---

# Internal Conversion / Internal Merger

Workflow for moving assets and participants between plans **inside** Transamerica — distinct from the external plan conversion documented in [[plan-conversion-handoffs]].

## Overview

An internal conversion (sometimes called internal merger) occurs when participant assets and records are moved between two Transamerica-administered plans rather than coming from an external prior carrier. Common triggers include:

- Client-driven plan terminations where remaining assets fold into another plan
- MEP (Multiple Employer Plan) / PEP (Pooled Employer Plan) transitions between sponsors
- Affiliated plan consolidations (e.g., a company restructuring affecting related plans)
- Plan mergers after M&A

Internal conversions reuse much of the DC toolkit but have their own liquidation, rebook, and record-load sequence. A large family of SQL queries under `queries/internal-conversion/` and `queries/liquidation/` supports this workflow.

## Trigger

- **Operations or client side:** [[com]] receives notice that a plan is terminating or merging; operations flags the event for the DC
- **Parameter:** Each query in the internal-conversion family takes a `LIQUIDATION` parameter — the liquidation date is the pivot around which the entire process is sequenced

## Steps

1. **Pre-liquidation data extract** — DC (`[[lm-dc]]` / `[[lm-dc]]`)
   - Run [[internal-conversion-hours]], [[internal-conversion-vesting-and-bene]], [[internal-conversion-deferrals]]
   - Pull current elections via [[current-elections]] (single case) or [[current-elections-multi-case]]
   - Pull [[basis-internal-conversion]], [[fod-status]], [[vesting-overrides]]
   - Pull [[highest-loan-balance]] and [[new-deferral-report]]
   - Extract communication preferences: [[estatement-copy]], [[saveexpress-copy]], [[email-copy]]
   - Build takeover loan data via [[takeover-loan-query-build]] and [[takeover-loan-sources]]
2. **Liquidation day** — DC transacts the day-of-liquidation queries
   - Run [[day-of-liquidation-v1]] first; [[day-of-liquidation-v2]] as the updated pass
   - Base selection query: [[internal-conversion-base]]
3. **Rebook** — DC
   - Run [[day-of-rebook]] to rebook assets into the destination plan
   - Apply [[day-of-rebook-split-mapping]] when split-ratio mappings apply
4. **Record load** — DC + [[qa]] / [[qa]]
   - Merge basis using [[basis-internal-conversion]]
   - Copy elections forward (current-elections queries)
   - Apply vesting overrides, FOD status, deferral history
5. **Audit** — [[qa]] / [[qa]]
   - Post-conversion reviews similar to external conversion audits (allocations, balances, loans)
6. **Holding account cleanup** — [[prod-support]] assists where required

## Handoff Points

- **DC ↔ [[qa]] / [[qa]]** — audit of loaded records, exception handling
- **DC ↔ [[com]]** — status updates on liquidation and completion; client-facing messaging
- **DC ↔ [[prod-support]]** — holding account setup, corrections to data that internal queries cannot handle
- **DC ↔ [[cashiering]]** — less prominent than external conversion because assets do not move via external wire, but still engaged for internal booking

## Timing / Deadlines

- Sequenced around a liquidation date (query parameter `LIQUIDATION`)
- Pre-liquidation extracts must run before liquidation-day transactions
- Rebook follows liquidation; record load follows rebook
- Audits run on a lag to verify that extracts and rebook agree

## Failure Modes

| Failure | Cause |
|---------|-------|
| Wrong SUBSTR positions in `CASE_NO` | Queries carry region-specific substring logic (CORP vs. TDA); running the wrong variant against the wrong region silently mis-scopes the query |
| Missing affiliate exclusions | Internal conversions often touch affiliated plans; failing to exclude the correct affiliate pulls unrelated data |
| Dummy SSNs left with balances | Dummy participants carrying balances after rebook indicate a record-load step missed a reversal |
| Liquidation date parameter mismatch | Using the wrong `LIQUIDATION` date parameter against extracts produces inconsistent source and target data |
| Split-ratio mapping errors | [[day-of-rebook-split-mapping]] errors leave participants mapped to the wrong destination sources |

## See Also

- [[plan-conversion-handoffs]] — the external-conversion counterpart
- [[lm-dc]]
- [[lm-dc]]
- [[qa]]
- [[qa]]
- [[prod-support]]
- [[internal-conversion-base]]
- [[day-of-liquidation-v1]]
- [[day-of-liquidation-v2]]
- [[day-of-rebook]]
- [[day-of-rebook-split-mapping]]
- [[internal-conversion-hours]]
- [[internal-conversion-vesting-and-bene]]
- [[internal-conversion-deferrals]]
- [[current-elections]]
- [[current-elections-multi-case]]
- [[basis-internal-conversion]]
- [[fod-status]]
- [[vesting-overrides]]
- [[highest-loan-balance]]
- [[new-deferral-report]]
- [[estatement-copy]]
- [[saveexpress-copy]]
- [[email-copy]]
- [[takeover-loan-query-build]]
- [[takeover-loan-sources]]
- [[liquidation-day]]
