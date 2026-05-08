---
title: "Hours Procedure"
type: concept
tags: [hours, eligibility, ltpt, process, eds]
created: 2026-04-16
updated: 2026-04-17
sources: 2
---

# Hours Procedure

The procedure for loading or tracking participant hours data — used in eligibility processing to determine whether participants meet service-hour thresholds.

## Definition

Hours data drives two eligibility thresholds at TA:

1. **Standard eligibility** — 1,000 hours per year (traditional plan eligibility)
2. **LTPT eligibility** — 500 hours × 2 consecutive years (Long-Term Part-Time; Secure Act 2.0; effective January 1, 2025)

The Hours Procedure covers how hours data is sourced, formatted, and loaded so that the eligibility engine in P3 calculates correctly. There are two operational variants:

- **Hours Procedure** (`Hours procedure.md.txt`) — title-only source; the general hours-loading procedure
- **Internal conversion hours** (`Internal conversion hours.md.txt`) — a specific SQL query (now filed at `[[internal-conversion-hours]]`) used when converting one TA plan into another, pulling hours from TA's own employee / EE_HRS_WORKED tables

## Why It Matters

If hours data is wrong or missing, the eligibility engine in P3 calculates incorrectly — resulting in participants being marked eligible when they shouldn't be, or vice versa. LTPT specifically requires tracking hours across two consecutive years, adding complexity for plans with part-time employees.

## LTPT Hours Tracking (Secure Act 2.0)

Per `[[ltpt-eligibility]]`:
- EDS codes **5** and **6** are used for LTPT eligibility data
- Hours must be tracked for employees excluded from the plan's main class who are still accruing LTPT service hours
- Two years of consecutive 500-hour service → triggers LTPT eligibility effective January 1, 2025

## Internal Conversion Variant

For internal conversions, hours data does not come from a prior vendor — it already lives in TA's own tables. The internal-conversion hours query joins `$Business_line.EMPLOYEE`, `$Business_line.EE_HRS_WORKED`, and `$Business_line.CASE_DATA` against `PENSION.PLAN_PROV_GRP` and related provision tables, computing `last_anniversary`, `last_plan_anniversary`, and a `TPA_CHOICE` exclusion for plans that outsource. The query emits four flavors (current-year employee, current-year plan, prior-year employee, prior-year plan) so hours can be loaded against the correct reference year. See `[[internal-conversion-hours]]` for the full SQL.

## Loading Hours Through EDS (External Conversions)

For external takeovers, hours arrive from the prior vendor and load through EDS following the standard pattern:
- DC sets up the hours layout in EDS (P3 menu bar → EDS) before files arrive
- Each plan may have a unique hours format from the prior vendor — confirm via `[[data-discovery-document]]`
- EDS output must be reviewed for errors and warnings after every run

## Evidence / Examples

- Source: `Hours procedure.md.txt` — title-only
- Source: `Internal conversion hours.md.txt` (11KB) — full SQL for the internal-conversion hours pull; filed as `[[internal-conversion-hours]]`

## Related Concepts

- [[eligibility]]
- [[ltpt-eligibility]]
- [[loading-eligibility-eds]]
- [[eds]]
- [[internal-conversion-hours]]
- [[internal-conversion]]

## See Also
- [[eligibility]]
- [[ltpt-eligibility]]
- [[loading-eligibility-eds]]
- [[internal-conversion-hours]]
- [[main-dump-batch-2026-04-17]]
