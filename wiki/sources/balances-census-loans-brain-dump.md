---
title: "Source: Balances, Census, Loans Brain Dump"
type: source
tags: [census, elections, balances, cash-conversion, mapping, tik, fund-mapping, source-mapping, loans, dummy-participant, forfeitures, fmc, advanced-employer]
created: 2026-05-03
updated: 2026-05-03
sources: 1
status: current
---

# Source: Balances, Census, Loans Brain Dump

LM-DC voice-memo brain dump captured as a single text file in `new TA Brain/Balances, Census, Loans.txt`. Intended by the author as the "all, end-all" reference for census, elections, balance import, fund/source mapping, and loan setup procedures.

## Summary

Long-form narrative covering the full census-to-balances-to-loans pipeline from the LM-DC perspective. Walks through how the census enters the system (client direct, vendor, or base file), how elections get loaded (mapped or defaulted via EDS), how balances flow on liquidation day for cash / mapping / TIK conversions, the role of the CONV file and the dummy participant, the FMC discipline around any trading event, advanced-employer interest distribution, and the full P3 + Informatica loan setup sequence including HOLB handling.

## Key Claims

- Census arrives via three paths: client direct (limited access file), vendor (rare), or base file (vast majority). Base file becomes possible after PRD/onboarding completion → AWD testing → tailored template → client walkthrough → return.
- Limited access files exist so participants can update allocations during an open period before blackout; mostly used on cash conversions.
- Defaulting elections is a single-step EDS load — same layout as map-elections, but Fund Descriptor and Percentage are blank and the default flag is **D** instead of **N**, one row per participant. Best done at the same time as census, not as a separate pass.
- Forfeiture entries in balance files use the vendor's name convention (often year-based) and the same stand-out date convention as the dummy participant: DOB **12/25/1955**, DOH **12/25/1985**.
- Election population reconciliation should be explicit: "150 participants, 140 elections, 10 defaulted = 150" — never inferred.
- Wire instructions are sent first thing and re-sent ~1 week before liquidation as a confirmation reset.
- Wire confirmation has two paths: cashiering's email, OR the DC searches ref numbers in P2 themselves and matches the amount.
- For cash conversions, wire goes to the **Advanced Employer (AE)** account; AE accrues a small interest while waiting for final files. After AE is liquidated and balances post, **the next day** the accrued interest is taken and applied **pro-rata to participants** as a small bonus. This is DC-triggered, as are dividends, uncashed checks, and any other extra cash that lands after conversion.
- Source mapping starts with whatever sources have balances on test files; finalized against final files; any new source on final files needs to be added immediately.
- Fund mapping is built from the TOA. ~1 in 25 mapping plans involves a **fund split** (one prior fund maps to two TA funds with a ratio like 50/50 or 75/25). Sometimes prior fund codes on the actual files don't match the TOA — show your work.
- CONV file is the Informatica Day-of-Wire input. **Re-Reg = Y** for TIK funds, **N** for mapping. Cash conversions don't use a CONV file.
- For cash-conversion CIT balance workflow: parameter file has cash-conv = **Y**, and the **AE liquidation ref number** must be created and attached to the parameter file.
- For mapping CIT balance workflow: parameter file cash-conv = **N**; the ref number lives in the **fund mapping file** (workflow finds it there) and is matched against participant balances.
- Dummy participant (SSN 999-00-0000) is required for mapping conversions. After participant balances post, reverse via P3 → ROC → "ROC No Reversal".
- TIK share-count tolerance: tiny variance is OK; **anything more than one share** must be escalated.
- FMC must capture any trading event for the conversion — for cash conversions that's the AE purchase, the AE liquidation, AND the subsequent fund purchases. Interest distributions and trailing dividends do **not** require FMC entries.
- Loans are set up in P3 first: Conversions dropdown → Add Record Keeper (Name only) → Conversions tab → New Conversion → enter case number, No Affiliate → set Conversion Date and Assign Date to effective date − 3 months → save → capture Conversion Number.
- Loan import file has two parts: Loan Header (one row per loan) and Loan Source (one row per source per loan). **Outstanding balance in Loan Header must equal Loan Source totals exactly.**
- Loan Informatica workflow has a test mode: run with test = Y first; if clean, flip to test = N for production.
- Loan upload in P3: Conversions dropdown → Existing Plan → search by case number or conversion number → Takeover Loans → Submit. If **HOLB** (Highest Outstanding Loan Balance) file exists, upload it; if not, click **Upload and Create**.
- Loan Header file feeds into the audit pack for QA.

## Key Quotes

- "We don't process unless it's in good order."
- "It's okay to have an entry on the FMC and have trades NOT go out. It is not okay to have trades go out without an entry on the FMC."
- "Anytime you ever see one of those [stand-out dates], it's just an extra way of making sure that these people stand out and are not treated as normal."
- "Be explicit and acknowledge it that way. It's not inferred or assumed or anything."
- "If the data won't load correctly [without dummy] it'll need to be cleared by Prod Support. It's a nightmare. Don't do it."

## Entities Mentioned

- [[eds]] — census, elections, and final-file validation/loading
- [[p2]] — ref number creation back-end
- [[p3]] — plan administration; conversions dropdown; ROC; Takeover Loans
- [[informatica]] — Day-of-Wire and CIT balance workflows; loan workflow
- [[awd]] — testing leg between PRD/onboarding and base file finalization
- [[cashiering]] — wire pulls and confirmation
- [[matt-oconnell]] — TIK / Fidelity pooled accounts
- [[ssbt]] — 4 PM EST cutoff context

## Concepts Mentioned

- [[census-data]], [[base-file]], [[payroll-template]], [[limited-access-file]] (new)
- [[defaulting-elections-eds]] (new), [[forfeiture-loading]] (new)
- [[balance-import]], [[balance-import-cash]], [[balance-import-mapping]], [[balance-import-tik]]
- [[advanced-employer]], [[subsequent-cash-imports]] (new)
- [[fund-mapping]], [[source-mapping]], [[conv-file]], [[processes/tik-transfer|transfer-in-kind]]
- [[dummy-participant]], [[fund-management-calendar]], [[wire-instructions]]
- [[liquidation-day]], [[final-files-processing]]
- [[loan-setup]], [[informatica-loan-module]]
- [[holb]] (new glossary)

## Notes

This source contains the first explicit mention in the wiki corpus of: limited access files, defaulted-election EDS rows, forfeiture date conventions, AE interest pro-rat, the one-share TIK escalation threshold, fund-split ratio handling, the loan workflow test toggle, and HOLB. Several existing pages are expanded against this source; see the per-page `sources` count for traceability.

