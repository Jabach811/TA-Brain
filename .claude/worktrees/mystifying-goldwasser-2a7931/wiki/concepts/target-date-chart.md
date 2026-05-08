---
title: "Target Date Chart"
type: concept
tags: [concept, tdf, target-date, p3, aqt, qdia]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# Target Date Chart

The P3 data structure that maps participant birth-year ranges to Target Date Fund vintages for a plan's TDF family — typically the plan's QDIA default.

## Definition

A Target Date Chart tells P3 which TDF vintage to assign a participant based on their date of birth and the plan's retirement age. Loaded at the database level, it consists of portfolio, mix, and detail records and is validated through [[aqt]].

## Why It Matters

TDFs are the default investment for most participants who never make an election. A miscoded or missing chart means participants land in the wrong vintage (or no fund at all), which is a QDIA compliance failure and a direct fiduciary issue for the plan sponsor.

## Process

Per `Inserting%20Target%20Date%20Chart.md.txt` and `Inserting%20a%20Target%20Date%20Chart.md.txt`:

1. **Verify Plan Default setup** — confirm the plan is pointed at the correct TDF family and QDIA
2. **Enter fund family and retirement years** — configure in P3
3. **Insert portfolio, mix, and detail records** at the database level
4. **Populate retirement years** matching the plan's configured retirement age (see [[tdf-retirement-age-update]])
5. **Validate via AQT Target Date query** — confirm the loaded chart resolves correctly

## Evidence / Examples

- Both source files describe a three-tier record structure (portfolio / mix / detail)
- Retirement years must align with `PORTF_RETIRE_AGE` in `CASE_DATA` or assignments go wrong

## Related Concepts

- [[tdf-retirement-age-update]] — paired maintenance operation
- [[default-allocation-analysis]] — audit that validates QDIA/TDF assignments
- [[fund-mapping]] — related mapping concept

## See Also

- [[p3]]
- [[aqt]]
- [[qa]]
- [[lm-dc]]
