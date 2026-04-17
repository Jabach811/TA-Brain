---
title: "Informatica Troubleshooting Guide"
type: concept
tags: [informatica, troubleshooting, system]
created: 2026-04-16
updated: 2026-04-16
sources: 0
---

# Informatica Troubleshooting Guide

Common Informatica errors, their causes, and how to resolve them.

## Current Documentation

Known errors and fixes are currently documented in the **Informatica hub page**:

> **[[informatica]] → Connection Setup section and Loan Module error causes**

Key errors documented there:

**Connection error:**
- "Failed to get the connections" → DIVRDIVP connection not set up
- Fix: Edit Session → Mapping → Connections → change from ODSP to DIVRDIVP; set all SQLs to relational and DIVRDIVP
- Alternative fix: copy a working TRS module session from an existing workflow (carries its connections and parameters), then link your vendor-specific session to it

**Loan Module errors:**
- "Conversion number not found" → loans not set up on P3 first
- "Nper is null or zero" → loan frequency not in censuslookupfile, or vendor name spelled differently than lookup file
- "SSN not found on system for plan" → census not yet loaded (acceptable if preliminary run)
- "Source I does not exist on plan" → source mapping incomplete or bad data

## Full Documentation

When the troubleshooting guide source is ingested, this page will be expanded with errors across all modules (Day of Wire, Balance, Allocation, Basis), parameter file issues, and post-run audit failures.

## See Also
- [[informatica]]
- [[informatica-training-manual]]
- [[informatica-loan-module]]
- [[informatica-balance-module]]
- [[informatica-allocation-module]]
