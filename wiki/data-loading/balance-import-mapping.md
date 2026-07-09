---
title: "Balance Import — Mapping"
type: data-loading
tags: ["concept", "balance", "mapping", "conversion", "informatica", "day-of-wire"]
created: 2026-04-19
updated: 2026-07-08
sources: 2
status: current
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

## Fund Splits

Roughly **1 in 25 mapping plans** involves a fund split: one prior fund maps to **two** TA funds at a set ratio (50/50, 75/25, etc.). The split ratio comes from the TOA, same as the rest of the mapping.

Two things to watch:

- Build the split into the fund mapping file so the workflow divides the prior fund's balance at the stated ratio — it is not a manual post-load adjustment.
- Sometimes the prior fund codes on the actual balance files don't match what the TOA shows. When that happens, document how you resolved each mismatch — show your work rather than silently reconciling.

## Post-Wire: Mapping Reversal, Then Re-Apply

Fund mapping applies **twice**, and they're not the same run (from the balance import guide):

1. **Wire day** — the Day of Wire workflow applies fund mapping to the incoming assets (CONV file fed in, booked to the dummy participant).
2. **Post-wire** — once final files arrive and completeness is confirmed, process the **mapping reversal** (reverses the day-of-wire booking so balances are ready to be re-mapped), then run the CIT balance workflow to apply fund mapping against the final-file participant data.

Skipping the reversal before applying fund mapping to final files is a known high-severity failure mode. After participant balances post and reconcile, reverse the dummy participant: **P3 → ROC → "ROC No Reversal"**.

## Forfeiture Entries

Forfeiture entries in balance files use the vendor's naming convention (often year-based, e.g. "Forfeiture Account 2024") and the same stand-out date convention as the [[dummy-participant]] — an extra signal that the row isn't a normal participant. (from the balance import guide)

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
