---
title: "Division Code Update"
type: concept
tags: [concept, p3-maintenance, division-code, corp-employee]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Division Code Update

A P3 maintenance operation that updates the `EE_DIV_NO` (employee division number) in `CORP.EMPLOYEE` for a targeted plan/population.

## Definition

Per `Division%20Code%20Update.md.txt`, the Division Code Update is a SQL-driven maintenance task that populates or corrects division codes for a subset of participants. It is scoped by `case_no` and typically filtered to records where the current division code is blank.

## Why It Matters

Division codes drive class-based logic throughout P3: [[plan-classes]] assignment, reporting segmentation, eligibility subsets, and contribution routing. A blank or wrong division code can misroute contributions, mis-classify eligibility, or break class-specific deferral rules.

## Process

1. Identify the target population with a select query (filter by `case_no`, blank `ee_div_no`)
2. Update `EE_DIV_NO` in `CORP.EMPLOYEE` for the filtered set
3. Verify the update

## Evidence / Examples

- Source file is brief but specific about the exact field (`ee_div_no`) and table (`corp.employee`)
- Typical trigger: a client provides division assignments late, or a mid-year restructuring moves participants between divisions

## Related Concepts

- [[plan-classes]] — division codes often map to classes
- [[participant-notes]] — a related P3 maintenance pattern

## See Also

- [[p3]]
- [[qa]]
- [[lm-dc]]
