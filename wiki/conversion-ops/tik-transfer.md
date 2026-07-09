---
title: "Transfer In Kind (TIK) Process"
type: conversion-ops
tags: [process, tik, reregistration, conversion, fidelity, shares]
created: 2026-04-16
updated: 2026-07-08
sources: 2
status: current
---

# Transfer In Kind (TIK) Process

How specific investment funds move as shares — not cash — from the prior record keeper to Transamerica's Fidelity pooled accounts during a plan conversion.

## Overview

TIK (also called re-registration) is a per-fund conversion method. Instead of selling shares and wiring cash, the actual shares are transferred directly from the prior custodian to Transamerica's Fidelity pooled accounts. Because shares never leave the market, there are no trades and no market-timing risk during the transfer.

A single conversion can mix TIK, mapping, and cash funds — each fund's row in the [[toa]] specifies which method applies via the **Re-registering** column.

## Fidelity Pooled Account Setup

The receiving accounts at Fidelity are set up by the Fidelity TIK coordination team (currently led by Matt O'Connell). Key facts about how they work:

- Accounts are **pooled** — shared per fund, not per-participant.
- Incoming shares are identified by **expected share amounts per fund**, not by account numbers. This is why the DC's share estimates must be accurate and current.
- Setup takes approximately **10 business days**.
- The team begins monitoring and reporting on expected vs. received shares **immediately** upon setup — this is why timing the handoff matters (see Step 3).
- Once shares are matched to expected amounts, the team pulls them into the plan accounts.

Goal: accounts should be complete approximately 1–1.5 weeks before liquidation.

## Trigger

The [[toa]] is signed and Column T (Re-registering) contains at least one `Y`. The DC identifies the TIK funds and begins the re-registration workflow in parallel with the rest of the conversion.

## Steps

### 1. Identify TIK Funds — DC
Review the signed [[toa]]. Any fund row with Column T = `Y` is TIK. The remainder are N (liquidated — mapping or cash).

### 2. Fill Out Re-registration Form — DC
- Template lives in the front folder of the DC folder.
- One row per TIK fund. Required fields: prior vendor name, contact info, effective dates, QSIP, fund name, prior vendor ticker, Transamerica ticker, estimated dollar amount.
- Initial estimate: use TOA current values (may be stale by months).

### 3. Time the Handoff to the Fidelity TIK Team — DC
**Do not send early.** Once the Fidelity TIK team sets up the pooled accounts, they begin monitoring immediately. Starting too early produces weeks of false negatives.

Timing formula:
```
Fidelity setup complete = Liquidation Date − 10 business days
Send re-registration form = setup complete − 2 days (buffer)
                         ≈ 12 business days before liquidation
```

### 4. Deliver Form to Prior Vendor — DC
The DC provides the completed form — **including Transamerica account information** — to the prior vendor. Without this, the vendor does not know where to route the shares.

### 5. Update Share Estimates — DC
- First update: after test files arrive.
- Final update: **immediately** when final files arrive. Time-sensitive — the Fidelity TIK team uses the expected amount to claim shares as they land in the pooled account.
- Estimates flow in three stages: TOA current values (initial, may be stale), test files (first update), final files (final update).

### 6. Day of Wire — DC via Informatica
The Day of Wire workflow creates a **placeholder** in P3 for each TIK fund. No trades fire. Bill Remit detail has a ref number but no participant data yet. See [[liquidation-day]].

### 7. Post Participant Balances (TIK mode) — DC
After final files, the CIT balance workflow fills the placeholder.
- P3 processing mode: **Online + No Hold** (never Process Immediate).
- No trades — shares already sit at Fidelity. Posting only updates the books.
See [[final-files-processing]] for the full balance-posting flow.

### 8. Monitor the TIK Tracker Spreadsheet — DC + Fidelity TIK team
Separate from the re-registration form: the re-reg form is the setup document; the tracker is the monitoring tool during the transfer period. The DC fills in expected share amounts per fund when final files arrive; the Fidelity TIK team updates the sheet as shares are received at Fidelity. When every row is populated, all shares have landed and the DC can process.

**Share amount mismatch:** if received shares don't match expected amounts, the DC investigates and contacts the prior vendor directly.

## Handoff Points

| # | From → To | What Moves | Risk |
|---|-----------|------------|------|
| 1 | DC → Fidelity TIK team | Re-registration form | Sent too early → weeks of false monitoring |
| 2 | DC → Prior vendor | Re-registration form with TA account info | Vendor cannot route shares without it |
| 3 | Prior vendor → Fidelity pooled accounts | Actual shares | Amount mismatch → DC investigates, contacts vendor |
| 4 | Fidelity TIK team → DC | "Shares received" signal via shared spreadsheet | Late signal → delayed participant posting |
| 5 | DC → P3 | Online + No Hold posting | Wrong mode (Process Immediate) → duplicate trades |

## Timing / Deadlines

- **~12 business days before liquidation:** DC sends re-registration form to the Fidelity TIK team.
- **~10 business days before liquidation:** Fidelity accounts are set up and monitoring starts.
- **Final files arrive:** DC updates share estimates immediately.
- **Liquidation Day:** Placeholder created in P3 by Day of Wire workflow.
- **After final files processed:** Balances posted in Online + No Hold mode; reconcile against TIK tracker.

## Failure Modes

- **Sent too early.** The Fidelity TIK team spins up monitoring weeks before shares arrive → wasted effort, false negatives.
- **Missing account info.** Prior vendor has no routing target; shares don't arrive or arrive at the wrong account.
- **Stale share estimates.** The Fidelity TIK team cannot match incoming shares to the expected amount; shares sit unclaimed.
- **Wrong P3 processing mode.** Process Immediate fires trades even though shares are already at Fidelity → duplicate trades and reversal work.
- **TIK fund mistakenly processed as dummy participant.** TIK does not use a [[dummy-participant]] — the Day of Wire placeholder fills directly.

## See Also

- [[toa]]
- [[informatica]]
- [[liquidation-day]]
- [[final-files-processing]]
- [[conversion-types]]
- [[plan-conversion-handoffs]]
- [[dummy-participant]]
- [[roles/lm-dc]]
