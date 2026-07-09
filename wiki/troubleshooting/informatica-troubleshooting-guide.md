---
title: "Informatica Troubleshooting Guide"
type: troubleshooting
tags: [informatica, troubleshooting, system]
created: 2026-04-16
updated: 2026-07-08
sources: 1
status: needs-review
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

## Parameter File Errors

By far the most common failures trace back to the parameter file — incorrectly named files and incorrect folders (from the Informatica quick-start guide):

| What you see | Why | Fix |
|---|---|---|
| "No such file exists" | The parameter file's file name doesn't match the actual file — an extra space or wrong upper/lowercase. It's **case-sensitive** and must be perfect. | Match the file name exactly, character for character. |
| File not found, but the name looks right | The folder in the parameter file is wrong — the file isn't in the folder it's pointed at. | Confirm the folder path points where the file actually lives. |
| Column-count error | The file has the wrong number of columns. | Compare the file against the expected layout. |

### The silent one — wrong spacing

If the case number has the wrong spacing (say three spaces where it needs two), you may get **no error at all — but nothing happens**. It's still a failure, just a quiet one that's hard to nail down. Check the parameter file's spacing before every run.

## Silent Failure Modes

These produce runs that look clean but aren't (from the balance import guide):

- **Wrong active parameter file** — you edited a working/raw file but didn't save it as the active named parameter file the workflow calls. Before running, confirm the file name open on screen is the exact file the workflow will use.
- **Wrong test flag** — running live with test = Y (or test with test = N) produces results that look correct but aren't. Verify the flag every run.
- **Wrong source folder** — use case/affiliate-specific input file names so a wrong-folder run fails by not finding the file rather than finding another plan's file.
- **Workflow fails on a file that looks clean in Excel** — almost always hidden metadata or structural issues. Run it in **developer mode** to see what Informatica actually sees, not the Excel view.

## Source Notes

Current content is derived from the [[informatica]] hub page. A dedicated troubleshooting source is still needed before this can be marked current.

## Full Documentation

When the troubleshooting guide source is ingested, this page will be expanded with errors across all modules (Day of Wire, Balance, Allocation, Basis), parameter file issues, and post-run audit failures.

## See Also
- [[informatica]]
- Informatica Training Manual
- [[informatica-loan-module]]
- [[informatica-balance-module]]
- [[informatica-allocation-module]]
