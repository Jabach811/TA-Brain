---
title: "Source Mapping"
type: concept
tags: [mapping, sources, aqt, test-files, conversion]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Source Mapping

The process of mapping prior record keeper contribution source codes to TransAmerica source IDs. Required for all conversions that carry over source-level data.

## Overview

Every retirement plan has contribution sources (e.g., employee deferrals, employer match, profit sharing, etc.). The prior record keeper uses their own source codes; TransAmerica has its own source IDs. Source mapping creates the translation table between them.

Only map sources that actually have money — sourced from test file summaries. Mapping empty sources wastes everyone's time.

## When to Do It

**As soon as test files arrive from the prior record keeper.** Unlike [[fund-mapping]], source mapping requires test files because you need to know which sources actually have balances.

> Get source mapping done ASAP after test files arrive. This is a blocking dependency for QA and TC to do their part. Don't sit on it.

## Process

1. Test files received from prior record keeper
2. DC runs **source summaries** on the test files — produces totals by source code
3. DC filters: only sources with money (non-zero totals)
4. DC queries **AQT** (internal database tool) to pull TransAmerica **Source IDs** for each source type
5. DC builds source mapping table: prior vendor source code + description + TA source ID + totals
6. DC sends mapping to COM, TC, QA for approval
7. Approvals received → source mapping complete

## Mapping Table Structure

| Field | Source |
|-------|--------|
| Prior vendor source code | Test file |
| Prior vendor source description/name | Test file |
| TA Source ID | AQT query |
| Total balance | Test file summary |

## AQT

[[aqt]] is the internal database query tool used to pull source IDs. It is a **standalone app** — not integrated into P3 or EDS. The DC runs a query to retrieve TA source IDs for each prior vendor source type.

The specific AQT query for source IDs is too complex to document here — it will be documented separately with all DC queries.

## Relationship to Fund Mapping

| | Fund Mapping | Source Mapping |
|--|-------------|----------------|
| Maps | Investment funds | Contribution sources |
| Requires test files | No | Yes |
| Source of data | TOA | Test file summaries + AQT |
| Timing | As soon as TOA signed | As soon as test files arrive |

## Key Clarifications

**Typical number of sources:** About 10. Varies widely by plan.

**No clear TA equivalent for a source?** Map as best as you can. No official process — use judgment.

**Does approved source mapping get loaded to the system?** No. Same as fund mapping — it's a reference document. Once approved, it's added to the Informatica workflows. Not a system import.

**Does source mapping apply to both balance and contribution sources?** Yes — both.

## See Also

- [[fund-mapping]]
- [[aqt]]
- [[toa]]
- [[prior-record-keeper]]
- [[conversion-types]]
- [[dc-onboarding-workflow]]
- [[internal-teams]]
