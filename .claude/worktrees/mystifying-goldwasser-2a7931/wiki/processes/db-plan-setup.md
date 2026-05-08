---
title: "DB Plan Setup (Deduction Codes / Map Keys / EFT Confirms / DB Reports)"
type: process
tags: [process, defined-benefit, deduction-codes, map-keys, eft-confirms]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# DB Plan Setup — Deduction Codes / Map Keys / EFT Confirms / DB Reports

Post-conversion setup coordination for Defined Benefit plans: deduction codes, map keys, optional EFT Confirms, and ongoing DB reporting.

## Overview

Defined Benefit plans require a cluster of post-conversion setup steps that span [[com]] (TM), [[lm-dc]], [[tc]], and Funding/Ops. The work is sequential: TM distributes the submission package, DC confirms deductions, TC requests map keys via a [[serena]] ticket, and Funding/Ops complete the map-key side and DB reporting setup. EFT Confirms are an opt-in add-on that requires manager approval and a separate Serena ticket.

Sources: ETF Confirms for DB Plans.md.txt, Procedures for DB Deduction Codes_Map Keys_EFT Confirms_DB Report setup.md.txt.

## Trigger

DB plan conversion has reached the stage where recurring retiree payments must be set up — typically shortly before go-live.

## Steps

1. **Distribute submission package** — [[com]] (Transition Manager)
   - Packages the DB setup instructions and distributes to the project team
2. **Confirm deductions** — [[lm-dc]]
   - Confirms deduction codes that will apply to retiree payments
   - Updates the submission package with confirmed deductions
3. **Request map keys** — [[tc]]
   - Opens a [[serena]] ticket (Project: Database Change, Application: Plus) requesting map keys from Funding
4. **Provide map keys and complete setup** — Funding / Ops
   - Returns map keys
   - Completes DB report and EFT Confirm setup as applicable
5. **(Optional) Enable EFT Confirms** — [[tc]]
   - Only if client has requested EFT Confirms and manager has approved
   - Submit a **separate** Serena ticket: Project: Database Change, Application: Plus, enable EFT Confirms effective with first payment
   - EFT Confirms are **not** mailed by default

## Handoff Points

- [[com]] → project team (package distribution)
- [[lm-dc]] → [[tc]] (deductions confirmed; ready for map-key request)
- [[tc]] → Funding / Ops (via Serena)
- Funding / Ops → setup complete; plan ready for first payment

## Timing / Deadlines

- Complete before the first retiree payment cycle
- EFT Confirms must be enabled "effective with first payment" if opted in

## Failure Modes

| Failure | Impact |
|---------|--------|
| Deduction codes incorrect on first payment | Retirees receive wrong net amounts |
| Serena ticket submitted without manager approval for EFT Confirms | Ticket bounced back; delay |
| Map keys missing at first payment cycle | Payments cannot process |
| EFT Confirms enabled late | Default (no confirm) applies to early payments; cannot retroactively send |

## See Also

- [[serena]]
- [[tc]]
- [[lm-dc]]
- [[com]]
- [[new-business-setup]]
- [[plan-conversion-handoffs]]
