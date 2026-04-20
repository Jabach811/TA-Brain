---
title: "Loan Setup — Overview"
type: concept
tags: [loans, conversion, p3, informatica, takeover-loans]
created: 2026-04-18
updated: 2026-04-18
sources: 1
---

# Loan Setup (Conversion)

The conversion-time activity of standing up a plan's outstanding participant loans on P3 so they continue repaying without interruption.

## Definition

Loan setup is the work that happens **before any participant balances post** to make P3 ready to receive loan data: building the conversion record, validating the loan import file (Header = Source), running the Informatica Loan Module, and submitting Takeover Loans in P3. Until this is done, nothing else loan-related can post correctly.

The full step-by-step workflow lives in [[loan-setup|the Loan Setup & Processing process page]].

## Why It Matters

A converting plan often arrives with hundreds of active loans, each with its own outstanding balance, source allocations, and remaining repayment schedule. If the setup is wrong, every loan-touching subsystem downstream is wrong too:

- **Source balances** include outstanding loan principal — if loan principal is wrong, source balances are wrong.
- **Loan repayment processing** depends on correct NPER (remaining periods) — incorrect setup causes participants to over- or under-pay.
- **Deemed loan tax reporting** depends on the Deemed Date / Deemed Amount fields being correctly populated at setup.
- **Takeover Loans** is a one-shot system action — reversing it requires manual intervention from the Loan team.

Because every later step assumes loan setup is correct, a small mistake at setup compounds.

## Three Phases

The process is grouped into three color-coded phases that match the source flow's phase bands:

1. **Phase I — Setup in P3** (blue, 7 steps) — open the plan, add the Record Keeper, create the conversion, set the dates, capture the conversion number.
2. **Phase II — Validation + Informatica Load** (yellow, 3 steps) — confirm Header = Source, check the Deemed fields, run the [[informatica-loan-module]].
3. **Phase III — Takeover Loans + Confirmation** (green, 4 steps) — Submit, Upload, wait for the confirmation email, run verification queries.

## The Critical Validation

Step 8 — **Loan Header outstanding balance must equal Loan Source totals exactly** — is the single most important check in the whole process. The two values come from different parts of the prior RK's file. Any mismatch means one of:

- The file was exported mid-cycle and is internally inconsistent.
- A repayment landed at the prior RK between the cuts.
- A deemed loan was reclassified between the cuts.
- The file is partial.

Whatever the cause, the only correct response is to stop, contact the prior RK, and pull a fresh file. **Do not patch the variance manually** — it will cascade.

## The Deemed Fields Trap

Step 9 hides a small but bite-y rule:
- **Deemed Date** — leave blank if the loan is not deemed.
- **Deemed Amount** — enter `0` if the loan is not deemed. **Never leave blank.**

A blank Deemed Amount produces a non-obvious Informatica error (`Nper is null or zero` masquerading as a frequency problem). Always default to `0`.

## Record Keeper Name Discipline

Step 3 — adding the Record Keeper — looks trivial but governs whether Informatica can find the loan source mappings later. Two rules:

1. Enter the **Name field only**. Other fields are looked up elsewhere; filling them creates duplicate-vendor situations.
2. The name must match the entry in `censuslookupfile.xls` **character-for-character**. Spelling, casing, punctuation. If it does not, Informatica's Loan Module raises "Nper is null or zero" because it cannot resolve the loan frequency for the vendor.

## Sequencing With Other Conversion Work

Loan setup must finish **before** participant balances post (see [[final-files-posting]]). Loan principal is a component of source balance — if balances land while loans are still missing or wrong, the source totals will not reconcile and the posting must be reversed.

In practice, the [[lm-dc]] runs loan setup in parallel with file validation but holds off on Takeover Loans submit until loan-touching balances are confirmed clean.

## Evidence / Examples

The full live workflow lives in the Data Consultant Site as `flow-loans-ix` (Loan Import Workflow). It tracks 14 numbered steps across 3 phases with a date calculator, a Record Keeper name display, a deemed-loan branching dialog, and a phase-completion checklist.

## Counterarguments

A common shortcut: when Step 8 shows a tiny variance (a few cents), some operators try to enter a manual offset rather than re-requesting the file. This works exactly long enough to make later reconciliation impossible to debug. The discipline is: **no variance, no proceed**.

## Related Concepts

- [[informatica-loan-module]]
- [[informatica]]
- [[final-files-processing]]
- [[final-files-posting]]
- [[plan-conversion-handoffs]]

## See Also

- [[loan-setup|Loan Setup & Processing (process page with full steps)]]
- [[informatica-loan-module]]
- [[informatica-troubleshooting-guide]]
- [[lm-dc]]
- [[toa]]
