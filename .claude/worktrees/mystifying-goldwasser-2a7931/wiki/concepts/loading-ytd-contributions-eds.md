---
title: "Loading YTD Contributions through EDS"
type: concept
tags: [eds, ytd, contributions, process, system]
created: 2026-04-16
updated: 2026-04-17
sources: 1
---

# Loading YTD Contributions through EDS

Procedure for loading year-to-date contribution data through EDS during plan conversion.

## Definition

YTD (year-to-date) contribution loading is the EDS process that brings in each participant's current-year contribution totals by source — needed so that 402(g), catch-up, and match limits apply correctly from day one on TA. The source file (`Loading YTD Contributions through EDS.md.txt`) in the main dump is title-only; the full procedure exists elsewhere.

## Why It Matters

If YTD contributions are not loaded, every participant appears to TA as if they had contributed nothing this year — which breaks IRS contribution-limit enforcement and can allow over-contributions. YTD data is a required component of `[[final-files-processing]]`.

## Current Working Framework

Per the `[[eds]]` hub and adjacent wiki context:
- YTD loading is part of the final-files phase, after liquidation day
- DC builds YTD data from final files provided by the prior vendor
- Source mapping must be complete before loading — each contribution source maps to a TA Source ID
- YTD has its own EDS layout, independent of other layouts

## Related SQL Queries

The main-dump batch includes `TO_YTD_CONTRIB.md.txt` — an internal-conversion takeover-data SQL query that produces YTD contribution data. For internal (TA-to-TA) conversions, this query is likely the direct input to the YTD EDS load.

## Evidence / Examples

- Source: `Loading YTD Contributions through EDS.md.txt` (title-only placeholder)

## Related Concepts

- [[eds]] — hub
- [[loading-eligibility-eds]]
- [[loading-basis-eds]]
- [[final-files-processing]]
- [[source-mapping]]

## See Also
- [[eds]]
- [[final-files-processing]]
- [[main-dump-batch-2026-04-17]]
