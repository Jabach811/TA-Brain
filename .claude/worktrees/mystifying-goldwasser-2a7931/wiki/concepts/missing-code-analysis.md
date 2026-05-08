---
title: "Missing Code Analysis"
type: concept
tags: [concept, qa, data-scrubbing, faa-census, codes]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Missing Code Analysis

The QA data-scrubbing audit that identifies missing division, marital-status, or sub-location codes on participant records and reports them to the Transition Consultant.

## Definition

Missing Code Analysis is a [[qa]]-owned audit that runs FAA Census queries, exports and reviews the results to identify missing division, marital-status, or sub-location codes, and provides the resulting reports to [[tc]] (source: `Missing Code Analysis.md.txt`).

## Why It Matters

Missing codes at participant level cascade into downstream problems: default analyses that don't split cleanly by division, statements that can't compute spousal-consent language correctly, sub-location-driven reporting that omits participants. This audit surfaces them early so [[tc]] can drive remediation with the client before they become bigger problems.

## Evidence / Examples

**Process** (source: `Missing Code Analysis.md.txt`):

1. Run FAA Census queries.
2. Export and review results.
3. Provide reports to [[tc]].

The audit complements [[source-mapping-audit]] and [[fund-mapping-audit]] — those validate that codes in place are correct; Missing Code Analysis validates that codes exist at all.

## Counterarguments

Not every missing code is a defect in the census — some plans legitimately don't use all code dimensions. The output report is a worklist for [[tc]] to triage, not an automatic remediation list.

## Related Concepts

- [[source-mapping-audit]]
- [[fund-mapping-audit]]
- [[default-allocation-analysis]]
- [[default-deferral-analysis]]

## See Also

- [[qa]]
- [[tc]]
- [[lm-dc]]
