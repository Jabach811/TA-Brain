---
title: "Balance Import — Cash Conversion"
type: process
tags: ["concept", "balance", "cash", "conversion", "informatica", "cits"]
created: 2026-04-19
updated: 2026-05-03
sources: 2
status: current
---

# Balance Import — Cash Conversion

The simplest balance import method. Used when the prior record keeper sends a single cash wire rather than a fund-mapped wire or in-kind share transfer.

## Key Characteristics

- **Wire triggers the import** — process starts when cashiering confirms wire received and booked
- **Blank fund mapping file** — unlike Mapping and TIK, the .txt fund mapping file must be blank (not populated); the workflow needs it present but empty
- **CITS Balances workflow** — runs in Informatica; the only balance import workflow with a test mode (test modes: P = preliminary SSNs not on system yet, Y = test SSNs on system, N = live)
- **Process Immediate** — unlike TIK, cash conversion uses Process Immediate in P3
- **No CONV file** — cash conversion skips Phase III entirely

## Step-by-Step

**Day Before Wire:**
Step 01 — Email vendor that wire is coming; request breakdown

**Morning of Wire Day:**
Step 02 — Follow up if no confirmation; optionally notify cashiering via their spreadsheet

**Wire Confirmed:**
Step 03 — Cashiering confirms wire received and booked → send to advance employer (Cash path)

**File Prep:**
Step 04 — Confirm source mapping complete
Step 05 — Create blank fund mapping .txt file (empty is intentional)
Step 07 — Set Cash Conversion = Yes in parameter file; confirm ALL participants have investment elections

**Informatica:**
Step 11 — Run CITS Balances workflow (test run available first)
Step 13 — Run all balance import queries to confirm clean load

**P3:**
Step 14 — Send to advance employer → process (No Hold · Batch · Process Immediate)
Step 17 — Apply balances to participant accounts
Step 18 — Run all associated queries for backup

## Critical Requirement

All participants must have investment elections before running Cash Conversion. The workflow cannot distribute cash to participants without elections on file.

If newly-added participants show up on the final files, check their election status. If they don't have elections, default them via [[defaulting-elections-eds]] before running the workflow.

## AE Liquidation Ref Number

After cashiering confirms the wire and AE liquidation completes, the DC must:

1. **Create a ref number** for the AE liquidation amount (in [[p2]])
2. **Attach that ref number to the parameter file** alongside `Cash Conversion = Y`

The CITS Balances workflow uses this ref number to tie the cash distribution back to the wire that funded it. Without it, the workflow has no anchor for the disbursement.

This is the cash-conversion equivalent of how mapping uses per-fund ref numbers in the [[fund-mapping|fund mapping file]] — same idea, different file location.

## See Also
- [[balance-import]]
- [[informatica-balance-module]]
- [[informatica-training-manual]]
- [[dummy-participant]]
- [[conv-file]]
