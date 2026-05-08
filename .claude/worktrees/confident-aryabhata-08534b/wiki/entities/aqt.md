---
title: "AQT"
type: entity
tags: [system, aqt, sql, query, source-mapping]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# AQT

Standalone SQL query application used by DCs to look up TransAmerica source IDs and run isolating queries. Read-only — cannot modify data.

## Overview

AQT is an internal database query tool that DCs use throughout the conversion lifecycle. Its primary use is pulling TransAmerica's internal source IDs during [[source-mapping]], but it is also used to build the isolating queries required before submitting [[prod-support]] AWD tickets. AQT operates as a standalone desktop application — it is not integrated into P3 or EDS.

## Key Facts

- **Type:** Standalone desktop application
- **Access:** Not within P3 — separate app
- **Permissions:** Read-only (view-only). DCs cannot make table changes through AQT.
- **Primary use:** Pulling TA source IDs for [[source-mapping]]
- **Full name:** Unknown — acronym not yet expanded

## Primary Use Case — Source Mapping

During [[source-mapping]], the DC runs a query in AQT to retrieve TransAmerica's internal source ID for each prior vendor source type. The specific query is complex and will be documented separately as part of the DC query library.

> Get the actual query that holds exactly the data you need. Don't pull the entire table.

## Secondary Use — Prod Support Tickets

Before submitting an AWD ticket to [[prod-support]], the DC must use AQT to build an **isolating query** — a query that returns exactly the records that need to be modified, not the full table. This query is pasted into the AWD ticket comments.

## Limitations

AQT is read-only. The only place DCs can make direct table modifications is the ROC tool within [[p3]]. For any write operation, a [[prod-support]] AWD ticket is required.

## Open Questions

- Full name / acronym expansion for "AQT"
- Complete query library for all DC use cases (to be documented separately once finalized)

## See Also

- [[source-mapping]]
- [[prod-support]]
- [[p3]]
- [[dc-onboarding-workflow]]
