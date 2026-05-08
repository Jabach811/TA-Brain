---
title: "Hours Procedure"
type: concept
tags: [hours, eligibility, ltpt, process, eds]
created: 2026-04-16
updated: 2026-04-16
sources: 0
---

# Hours Procedure

The procedure for loading or tracking participant hours data — used in eligibility processing to determine whether participants meet service-hour thresholds.

## Definition

Hours data drives two eligibility thresholds at TA:
1. **Standard eligibility:** 1,000 hours per year (traditional plan eligibility)
2. **LTPT eligibility:** 500 hours × 2 consecutive years (Long-Term Part-Time; Secure Act 2.0; effective Jan 1, 2025)

The Hours Procedure covers how hours data is sourced, formatted, and loaded so that eligibility rules can be correctly applied in P3.

## Why It Matters

If hours data is wrong or missing, the eligibility engine in P3 calculates incorrectly — resulting in participants being marked eligible when they shouldn't be, or vice versa. LTPT specifically requires tracking hours across two years, which adds complexity for plans with part-time employees.

## LTPT Hours Tracking (Secure Act 2.0)

Per [[ltpt-eligibility]]:
- EDS codes **5** and **6** are used for LTPT eligibility data
- Hours must be tracked for employees excluded from the plan's main class who are still accruing LTPT service hours
- Two years of consecutive 500-hour service → triggers LTPT eligibility effective January 1, 2025

## Loading Hours Through EDS

Hours data is loaded via EDS following the same general process as other data types:
- DC sets up the hours layout in EDS (P3 menu bar → EDS) before files arrive
- Each plan may have a unique hours data format from the prior vendor — confirm via data discovery
- EDS output must be reviewed for errors and warnings after every run

## Related Concepts

- [[eligibility]] — hours data feeds directly into eligibility rule processing
- [[ltpt-eligibility]] — LTPT-specific hours tracking requirements
- [[loading-eligibility-eds]] — eligibility EDS loading; hours often loaded alongside or before eligibility
- [[eds]] — the system through which hours data is loaded

## See Also
- [[eligibility]]
- [[ltpt-eligibility]]
- [[loading-eligibility-eds]]
- [[eds]]
