---
title: "Vesting Override Decision"
type: process
tags: [work-brain, process]
created: 2026-05-08
updated: 2026-05-08
sources: 1
source_file: "05-processes/vesting-override-decision.md"
---

# Vesting Override Decision

A decision rule for choosing between a broad years-of-service override and a surgical EDS source-by-source override.

## Source Link
- Operational source: [[05-processes/vesting-override-decision]]

## Wiki Summary
This page is the personal-wiki view of `05-processes/vesting-override-decision.md`. The operational file remains the source of truth; this wiki page gives the item a stable catalog entry, metadata, and cross-links.

## Source Snapshot
```markdown
# Vesting Override Decision

## Definition

A decision rule for choosing between a broad years-of-service override and a surgical EDS source-by-source override.

## Path 1: Catch-All 55 Years of Service

Use this when every non-100% vested source has the same vesting rule.

Operational pattern: enter a standout value such as `55 years of service` so the override satisfies the largest common vesting requirement and remains visibly unusual later.

Benefits:

- faster
- simple
- broad
- the weird `55 years` value stands out later

Risk:

- it overrides everything that depends on years of service, so it is not precise enough when sources differ.

## Path 2: Surgical EDS Layout by Source ID

Use this when sources have different vesting rules or only selected sources should be overridden.

Operational pattern: build an EDS layout by source ID. For a five-year cliff or graded pattern, create the needed year columns and set the override to `100` for the relevant years/source rows so even one day of service can be made 100% vested for that source.

Benefits:

- precise
- source-specific
- better control

Cost:

- slower setup
- requires a line for each source ID
- requires schedule columns by year
- takes longer than the catch-all method

## Decision Rule

If all non-100% vested sources share the same rule, consider the 55 YOS catch-all.

If sources differ or only some sources should be overridden, use EDS by source ID.

## Mention History

| Date | Note |
|---|---|
| 2026-05-05 | Captured from Joel's vesting override discovery; transcript clarified 55 YOS catch-all vs surgical EDS by source ID |
| 2026-05-06 | Joel confirmed the catch-all 55 YOS override was applied, the vesting report came back clean, and the issue is resolved |
```

## See Also
- [[overview]]
- [[plans/calliditas]]
- [[reports/daily/2026-05-07-daily-rundown]]
- [[05-processes/vesting-override-decision]]
