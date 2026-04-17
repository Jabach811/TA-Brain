---
title: "Loading YTD Contributions through EDS"
type: concept
tags: [eds, ytd, contributions, process, system]
created: 2026-04-16
updated: 2026-04-16
sources: 0
---

# Loading YTD Contributions through EDS

Procedure for loading year-to-date contribution data through EDS during plan conversion.

## Current Documentation

The EDS hub page covers the general framework applicable to YTD loading:

> **[[eds]] — see Key Functions, Layout Setup, and Output sections**

YTD contribution loading context from other wiki pages:
- YTD data is part of the final files processing phase — loaded after liquidation day
- DC builds YTD data from final files provided by the prior vendor
- Source mapping is required before YTD data can be loaded (each contribution source must be mapped to a TA Source ID)
- One layout per data type applies — the YTD layout is set up independently of other EDS layouts

> **[[final-files-processing]] — see YTD data loading context**

The source document (`raw/new mds/Loading YTD Contributions through EDS.md.txt`) exists but is currently empty. Full step-by-step documentation pending.

## Full Documentation

When the source is populated and ingested, this page will cover: layout configuration for YTD data, required fields and formatting, source ID mapping requirements, processing order relative to other final files, and error handling.

## See Also
- [[eds]]
- [[loading-eligibility-eds]]
- [[loading-basis-eds]]
- [[final-files-processing]]
- [[source-mapping]]
