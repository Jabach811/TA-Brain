---
title: "Informatica Balance Module"
type: data-loading
tags: [informatica, balance, system]
created: 2026-04-16
updated: 2026-07-08
sources: 1
status: needs-review
---

# Informatica Balance Module

Posts individual participant balances from final files into the plan in P3.

## Current Documentation

Content for this module is currently documented in the **Informatica hub page** under the Participant Balance Workflow section:

> **[[informatica]] → Section 2: Participant Balance Workflow (CIT Balance / `mp_part_balance`)**

Key points documented there:
- Input: CIT balance file built by DC from final files (participant-specific; one row per participant per source per fund)
- **Can be tested** — run a test pass before production
- Parameter file test modes: `P` (preliminary — SSNs not yet on system), `Y` (test — SSNs on system), `N` (live)
- Fund and source maps saved as text tab-delimited; keep leading zeros; case sensitive
- After running: DC reviews P3, then reverses dummy participant if applicable (mapping conversions)
- Loan funds in prior vendor balances must be filtered out; load loan data via the Loan Module instead
- FMC must be updated with FMC Estimate output by 4:00 PM (or 2:00 PM for Vanguard funds — see Rich Lippoth)

## CIT Balance File — Fields and Save Rules

From the balance import guide:

The CIT balance file has 5 fields per line:

| Field | Notes |
|---|---|
| Case number | Must use the proper spacing the workflow expects |
| Region | Corp or TDA |
| Prior source ID | Must align to the approved source mapping |
| Prior fund ID | Prior RK fund identifier used to match participant dollars to the mapped fund |
| Total | Total dollar amount for that source/fund line |

**Save rule:** the file is fixed-width. Save as **PRN first, then change the extension to `.txt`** — this preserves column width. Working template widths: `15, 4, 11, 30, 30, 14`.

## Testing Discipline

The participant balance workflow is testable, so test it every time (from the balance import guide):

- Run CIT in test first and **review the output**, not just the success/fail status. Confirm totals, participant counts, and penny-level rounding.
- If totals are off by a penny or two from rounding, decide whether to adjust the file or document the expected variance **before** the production run.
- CIT testing is not a substitute for day-of-wire validation — the day-of-wire workflow still cannot be tested end-to-end.

## Parameter File — cash-conv Flag

- **Cash conversion:** `cash-conv = Y`; the AE liquidation ref number is created in P2 and attached to the parameter file.
- **Mapping conversion:** `cash-conv = N`; the ref numbers live in the fund mapping file — the workflow finds them there.
- **TIK:** its own parameter file, activated only after Matt O'Connell's team confirms account setup — never before.

## Source Notes

Current content is derived from [[informatica]] and [[sources/lmdc-training-notebook]]. A dedicated module procedure is still needed before this can be marked current.

## Full Documentation

When the functional documentation source is ingested, this page will be expanded with complete parameter file settings, error handling, and post-run validation steps.

## See Also
- [[informatica]]
- Informatica Training Manual
- [[informatica-allocation-module]]
- [[informatica-loan-module]]
- [[final-files-processing]]
- [[fund-management-calendar]]
- Rich Lippoth
