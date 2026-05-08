---
title: "Balance Import — Mapping"
type: process
tags: ["concept", "balance", "mapping", "conversion", "informatica", "day-of-wire"]
created: 2026-04-19
updated: 2026-05-03
sources: 2
---

# Balance Import — Mapping

Balance import method where prior-record-keeper funds map directly to corresponding TA funds. The wire is received and balances are applied the same day using a fully populated fund mapping file and the Day of Wire Informatica workflow.

## Key Characteristics

- **Wire triggers the import** — process starts same day as wire confirmation
- **Fully populated fund mapping file** — unlike Cash, Mapping requires a complete fund-to-fund mapping file built from the TOA; VBA macro available to auto-generate it
- **Re-Reg field = N** — critical CONV file setting; distinguishes Mapping from TIK
- **Day of Wire workflow** — production only, no test mode; runs immediately when wire confirmed
- **Process Immediate** — same as Cash; applied as a batch with Process Immediate on P3
- **Dummy participant required** — must exist in the plan before any import

## Step-by-Step

**Day Before Wire:**
Step 01 — Email vendor that wire is coming; request breakdown

**Morning of Wire Day:**
Step 02 — Follow up; optionally notify cashiering

**Wire Confirmed:**
Step 03 — Cashiering confirms wire booked → apply Mapping immediately

**File Prep:**
Step 04 — Confirm source mapping complete
Step 06 — Complete fund mapping file from TOA (macro available in VBA Repo)
Step 07 — Create ref # in P2, set effective date → parameter file

**CONV File:**
Step 08 — Wait for final records + wire breakdown
Step 09 — Create CONV ref # per fund, enter totals by fund; **Re-Reg = N**
Step 10 — Confirm dummy participant exists (Critical Check)

**Informatica:**
Step 12 — Run Day of Wire workflow (production only — no test mode)
Step 13 — Run all balance import queries to confirm clean load

**P3:**
Step 15 — Apply balances once wire confirmed (No Hold · Batch · Process Immediate)
Step 17 — Apply balances to participant accounts
Step 18 — Run all associated queries for backup

## Where the Ref Number Lives

The CITS Balances workflow needs to find the per-fund ref numbers somewhere. Mapping puts them in the **fund mapping file** — one ref per fund, alongside the prior fund code and TA fund code. The workflow looks them up there and matches against the participant balances on the CIT balance file.

This is different from cash conversion: cash puts the (single) AE liquidation ref number on the **parameter file** because there's only one number to track. Mapping has many, so they live alongside the fund rows where each one logically belongs.

The parameter file for mapping has `Cash Conversion = N` and **does not** carry a ref number.

## See Also
- [[balance-import]]
- [[balance-import-tik]]
- [[balance-import-cash]]
- [[informatica-balance-module]]
- [[conv-file]]
- [[fund-mapping]]
- [[dummy-participant]]
- [[day-of-wire-audit]]
