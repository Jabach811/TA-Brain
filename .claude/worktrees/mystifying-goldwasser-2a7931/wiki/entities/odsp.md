---
title: "ODSP"
type: entity
tags: [system, database, region]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# ODSP

Database region / system hosting Outbound File (OBF) review and duplicate-SSN reporting.

## Overview

ODSP is a database region that stores data used for operational reviews — specifically Outbound File review and Duplicate SSN identification. [[aqt]] queries against ODSP produce the dup-SSN reports and outbound reviews that drive downstream work.

## Key Facts

- Queried via [[aqt]] (per Duplicate SSN Process.md.txt: "Run Duplicate SSN report in AQT (ODSP)")
- Hosts data for outbound review workflows
- Hosts data for duplicate-SSN identification

## Role in Operations

ODSP is the data side of two recurring operations:

1. **Duplicate SSN identification** — Step 1 of the [[duplicate-ssn-cycle]] runs a Dup SSN report in AQT pointed at ODSP. All disable / investigate / enable activity that follows starts here.
2. **Outbound review** — ODSP hosts the data backing the Outbound Review procedure.

## Connections

- [[aqt]] — query tool that points at ODSP
- [[duplicate-ssn-cycle]] — starts with a Dup SSN report against ODSP
- [[roc-tool]] — writes back to the database after ODSP-based investigation

## Open Questions

- Relationship between ODSP and the CORP / TDA regions referenced in ROC procedures — is ODSP a separate reporting region, or an alias?
- Refresh cadence of ODSP data
- Which teams own ODSP

## See Also

- [[aqt]]
- [[duplicate-ssn-cycle]]
- [[roc-tool]]
