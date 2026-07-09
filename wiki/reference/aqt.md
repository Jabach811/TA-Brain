---
title: "AQT"
type: reference
tags: [system, aqt, sql, query]
created: 2026-04-14
updated: 2026-05-03
sources: 2
status: current
---

# AQT

Standalone SQL query application used by DCs throughout the conversion lifecycle. Read-only — cannot modify data.

## Overview

AQT is an internal database query tool. DCs use it for SQL queries against TransAmerica's databases — every interaction is a query. It is a standalone desktop application, not integrated into P3 or EDS.

![AQT main window — query editor on top, results grid below.](SS/AQT - Main.jpg)

## Key Facts

- **Type:** Standalone desktop application
- **Access:** Not within P3 — separate app
- **Permissions:** Read-only (view-only). DCs cannot make table changes through AQT.
- **Full name:** Unknown — acronym not yet expanded

## How DCs Use It

AQT is the DC's SQL query surface. Common queries include:

- **Source mapping** — pulling TransAmerica source IDs for each prior vendor source type during [[source-mapping]]. The specific query is complex and will be documented separately as part of the DC query library.
- **Isolating queries for [[prod-support]] AWD tickets** — building a query that returns exactly the records that need to be modified (not the full table) and pasting it into the ticket comments.
- **Lookups during conversion work** — confirming record state, verifying loaded data, checking source IDs and balances.

> Get the actual query that holds exactly the data you need. Don't pull the entire table.

![AQT toolbar — run, stop, export, and connection controls.](SS/AQT - Toolbar.jpg)

The full query library will be documented separately.

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
