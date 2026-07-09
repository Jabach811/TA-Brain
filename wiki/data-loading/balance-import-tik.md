---
title: "Balance Import — Transfer In-Kind"
type: data-loading
tags: ["concept", "balance", "tik", "conversion", "informatica", "re-registration", "day-of-wire"]
created: 2026-04-19
updated: 2026-07-08
sources: 2
status: current
---

# Balance Import — Transfer In-Kind

Balance import method used when the prior record keeper transfers shares directly rather than liquidating and sending cash. Requires re-registration of fund shares and coordination with Matt O'Connell's team starting 4 weeks before liquidation.

## Key Characteristics

- **Shares trigger the import** — not the wire; import waits until shares arrive and are confirmed on the in-kind spreadsheet
- **Re-registration required** — must be identified from TOA early; submit to Matt O'Connell's team approximately 4 weeks before liquidation
- **Re-Reg field = Y** — critical CONV file setting; changes the transaction type; opposite of Mapping (N)
- **Do NOT use Process Immediate** — TIK uses the Online method in P3 with backdated ref numbers; using Process Immediate would be incorrect
- **Day of Wire workflow** — same Informatica workflow as Mapping but triggered by share arrival, not wire
- **Dummy participant required** — must exist before any import

## Re-Registration Pre-Work (Phase I — Separate from Import)

Must be started weeks in advance:

Step 01 — Review TOA; identify every fund marked Yes for Reregistration (include ALL flagged funds)
Step 02 — Fill out re-registration template for all flagged funds (macro available — fills template fast)
Step 03 — Send completed template to Matt O'Connell's team **~4 weeks before liquidation**
Step 04 — Receive results from Matt O'Connell's team
Step 05 — Forward results to prior record keeper for verification
Step 06 — Receive all-clear from prior record keeper

Field best practice: Build the request early but send in the actual window (~3 weeks before liquidation), while making the send date hard to miss.

Additional working rules (from the balance import guide):

- **SLA on Matt O'Connell's team: ~14 business days** (D1 + 22 days from form submission). They're the bottleneck — submit early and **confirm receipt explicitly**; don't assume the form landed.
- **Don't open the Fidelity receiving accounts too early.** They begin reporting immediately, and stale open-account time is noise. But they must exist before transfer day — receiving accounts missing on transfer day is a multi-week recovery.
- Once accounts are confirmed, **forward the re-registered account details to the vendor** — they need them to direct the in-kind transfer.

## Balance Import Steps

**File Prep:**
Step 04 — Confirm source mapping complete
Step 06 — Complete fund mapping file from TOA (macro available in VBA Repo)
Step 07 — Create ref # in P2, set effective date → parameter file (these ref numbers are backdated)

**CONV File:**
Step 08 — Wait for final records (not wire — shares, not cash)
Step 09 — Create CONV ref # per fund, enter totals; **Re-Reg = Y** (changes transaction type)
Step 10 — Confirm dummy participant exists (Critical Check)

**Informatica:**
Step 12 — Wait for shares to arrive → confirm on in-kind spreadsheet → run Day of Wire workflow (no test mode)
Step 13 — Run all balance import queries to confirm clean load

**P3:**
Step 16 — Wait for shares → confirm in-kind spreadsheet (Matt O'Connell's team) → process
Settings: **No Hold · Online · Do NOT Process Immediate**
Ref numbers are backdated in parameter file

Step 17 — Apply balances to participant accounts
Step 18 — Run all associated queries for backup

## Critical Traps

1. **Re-Reg = Y is mandatory** — setting Re-Reg = N would run as Mapping, not TIK; wrong transaction type
2. **Never use Process Immediate** — TIK is Online, backdated; Process Immediate would apply incorrectly
3. **Wait for in-kind spreadsheet confirmation** — do not run Day of Wire until Matt O'Connell's team confirms shares arrived
4. **4-week lead time** — if the re-registration template is submitted late, the whole TIK path may fail

## Expected Share Tracker

On final file receipt, **update the expected share tracker immediately** — it's the trigger action, not a cleanup task (from the balance import guide). Final files include share counts; tie them against the tracker. Matt O'Connell's team may populate the initial numbers, but from final-file receipt onward the tracker is the DC's working record.

## Share-Count Tolerance

Once the CIT balance file runs and participant balances are whole, compare the actual shares received against the expected shares from the in-kind spreadsheet:

- **Off by a tiny amount** (fractional shares) — acceptable; close out and move on
- **Off by more than one full share** — escalate. Run it up to the prior record keeper, and loop in the chain of command. Don't paper over it.

## See Also
- [[balance-import]]
- [[balance-import-mapping]]
- [[processes/tik-transfer|transfer-in-kind]]
- Matt O'Connell
- [[informatica-balance-module]]
- [[conv-file]]
- [[dummy-participant]]
- [[processes/tik-transfer|re-registration]]

