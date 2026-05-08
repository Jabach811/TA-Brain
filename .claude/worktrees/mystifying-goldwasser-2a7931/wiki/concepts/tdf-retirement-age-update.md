---
title: "TDF Retirement Age Update"
type: concept
tags: [concept, tdf, target-date, p3-maintenance, case-data]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# TDF Retirement Age Update

A P3 maintenance operation that changes the retirement age used by a plan's default Target Date Fund chart.

## Definition

Per `TDF%20Retirement%20Age%20Update.md.txt`, the update modifies `PORTF_RETIRE_AGE` in `CASE_DATA`. The retirement age drives the mapping of a participant's date of birth to the appropriate target date fund vintage inside the plan's [[target-date-chart]].

## Why It Matters

If a plan's demographic or regulatory assumption changes (e.g., moves from age 65 to age 67 normal retirement), every participant's auto-assigned TDF vintage may shift. Running this update incorrectly — or failing to rerun assignments afterward — leaves participants in the wrong vintage, which is a fiduciary concern.

## Process

1. Update `PORTF_RETIRE_AGE` in `CASE_DATA` for the target case
2. Verify with a select query
3. Validate downstream TDF assignments

## Evidence / Examples

- Source file names the exact column and table
- Typically paired with a [[target-date-chart]] refresh

## Related Concepts

- [[target-date-chart]] — the chart that uses the updated age
- [[division-code-update]] — another P3 maintenance pattern

## See Also

- [[p3]]
- [[qa]]
- [[aqt]]
