---
title: "Informatica Troubleshooting Guide"
type: concept
tags: [informatica, troubleshooting, system]
created: 2026-04-16
updated: 2026-04-17
sources: 1
---

# Informatica Troubleshooting Guide

The reference for common Informatica errors, their causes, and how to resolve them during a conversion load.

## Definition

The Informatica Troubleshooting Guide is a cross-module error reference used by DC when an Informatica session fails or produces unexpected output. The source file (`Informatica Troubleshooting Guide.md.txt`) in the main dump is title-only — the canonical guide exists elsewhere (likely a OneNote notebook) and has not yet been fully ingested. The `[[informatica]]` hub page carries the working error catalog in the interim.

## Why It Matters

Informatica runs are time-sensitive — the balance load must complete before the FMC deadline, and the loan load gates the Loan Load Job in P3. An unfamiliar error without a quick resolution path can push a conversion off schedule.

## Documented Errors (from `[[informatica]]`)

### Connection Errors

**"Failed to get the connections"**
- Cause: DIVRDIVP connection not set up
- Fix: Edit Session → Mapping → Connections → change from ODSP to DIVRDIVP; set all SQLs to relational and DIVRDIVP
- Alternative: copy a working TRS module session from an existing workflow (carries its connections and parameters), then link your vendor-specific session to it

### Loan Module Errors

| Error | Cause |
|-------|-------|
| "Conversion number not found" | Loans not set up on P3 first |
| "Nper is null or zero" | Loan frequency not in `censuslookupfile.xls`, or vendor name spelled differently than lookup file |
| "SSN not found on system for plan" | Census not yet loaded — acceptable for preliminary runs |
| "Source I does not exist on plan" | Source mapping incomplete or bad data |

## Related Concepts

- [[informatica]] — hub page; the working troubleshooting reference
- [[informatica-loan-module]]
- [[informatica-balance-module]]
- [[informatica-allocation-module]]
- [[odsp]] — default connection that must be overridden to DIVRDIVP

## See Also
- [[informatica]]
- [[informatica-loan-module]]
- [[main-dump-batch-2026-04-17]]
