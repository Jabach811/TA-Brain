---
title: "Loading Basis through EDS"
type: concept
tags: [eds, basis, process, system]
created: 2026-04-16
updated: 2026-04-17
sources: 1
---

# Loading Basis through EDS

Procedure for loading participant cost basis data through EDS as an alternative to the Informatica Basis Module.

## Definition

One of two load paths for participant cost basis data (the other being the `[[informatica-basis-module]]`). EDS basis loading follows the standard EDS pattern: DC builds a layout, the prior-vendor file is mapped to it, EDS validates, and output errors/warnings are reviewed before commit.

The source file (`Loading Basis through EDS 03-26-2026.md.txt`) is dated **March 26, 2026** — a recent procedure update — but contains only the title. The full step-by-step document exists elsewhere and has not yet been ingested.

## Why It Matters

The recent date (2026) on the source file name suggests this is the current, updated procedure. Any prior basis loading notes (including the existing `[[informatica-basis-module]]` page) may be outdated relative to it.

## Current Working Framework

Per the `[[eds]]` hub:
- DC sets up the basis layout in EDS (P3 menu bar → EDS) before files arrive
- Files can be CSV, Excel, or fixed-width
- EDS output (errors and warnings) must be reviewed after every run
- Multiple layouts can be active simultaneously — basis can coexist with other data-type layouts

## Related SQL Queries

The main-dump batch includes `TO_BASIS.md.txt` — a takeover-data SQL query that produces basis data during an internal conversion. This query likely produces the file that gets loaded via this EDS procedure for internal (TA-to-TA) conversions.

Corresponding internal-conversion query: `Basis for internal Conversions.md.txt`.

## Evidence / Examples

- Source: `Loading Basis through EDS 03-26-2026.md.txt` (title-only, date suggests recent update)

## Related Concepts

- [[eds]] — hub
- [[informatica-basis-module]] — alternative load path
- [[loading-eligibility-eds]]
- [[loading-ytd-contributions-eds]]
- [[final-files-processing]]

## See Also
- [[eds]]
- [[informatica-basis-module]]
- [[main-dump-batch-2026-04-17]]
