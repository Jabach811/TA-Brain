---
title: "Transfer In Kind (TIK) Process"
type: process
tags: [process, tik, reregistration, conversion, fidelity, shares]
created: 2026-04-16
updated: 2026-04-16
sources: 2
---

# Transfer In Kind (TIK) Process

How specific investment funds move as shares — not cash — from the prior record keeper to Transamerica's Fidelity pooled accounts during a plan conversion.

## Overview

TIK (also called re-registration) is a per-fund conversion method. Instead of selling shares and wiring cash, the actual shares are transferred directly from the prior custodian to Transamerica's Fidelity pooled accounts. Because shares never leave the market, there are no trades and no market-timing risk during the transfer.

A single conversion can mix TIK, mapping, and cash funds — each fund's row in the [[toa]] specifies which method applies via the **Re-registering** column.

## Trigger

The [[toa]] is signed and Column T (Re-registering) contains at least one `Y`. The DC identifies the TIK funds and begins the re-registration workflow in parallel with the rest of the conversion.

## Steps

### 1. Identify TIK Funds — DC
Review the signed [[toa]]. Any fund row with Column T = `Y` is TIK. The remainder are N (liquidated — mapping or cash).

### 2. Fill Out Re-registration Form — DC
- Template lives in the front folder of the DC folder.
- One row per TIK fund. Required fields: prior vendor name, contact info, effective dates, QSIP, fund name, prior vendor ticker, Transamerica ticker, estimated dollar amount.
- Initial estimate: use TOA current values (may be stale by months).

### 3. Time the Handoff to Matt O'Connell's Team — DC
**Do not send early.** Once [[matt-oconnell]]'s team sets up Fidelity accounts, they begin monitoring immediately. Starting too early produces weeks of false negatives.

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
- Final update: **immediately** when final files arrive. Time-sensitive — Matt's team uses the expected amount to claim shares as they land in the pooled account.

### 6. Day of Wire — DC via Informatica
The Day of Wire workflow creates a **placeholder** in P3 for each TIK fund. No trades fire. Bill Remit detail has a ref number but no participant data yet. See [[liquidation-day]].

### 7. Post Participant Balances (TIK mode) — DC
After final files, the CIT balance workflow fills the placeholder.
- P3 processing mode: **Online + No Hold** (never Process Immediate).
- No trades — shares already sit at Fidelity. Posting only updates the books.
See [[final-files-posting]] for the full balance-posting flow.

### 8. Monitor the TIK Tracker Spreadsheet — DC + Matt O'Connell's team
Separate from the re-registration form. The DC maintains expected share amounts per fund; Matt's team updates the sheet as shares arrive. When every row is populated, all shares have landed and the DC can process.

## Handoff Points

| # | From → To | What Moves | Risk |
|---|-----------|------------|------|
| 1 | DC → Matt O'Connell's team | Re-registration form | Sent too early → weeks of false monitoring |
| 2 | DC → Prior vendor | Re-registration form with TA account info | Vendor cannot route shares without it |
| 3 | Prior vendor → Fidelity pooled accounts | Actual shares | Amount mismatch → DC investigates, contacts vendor |
| 4 | Matt O'Connell's team → DC | "Shares received" signal via shared spreadsheet | Late signal → delayed participant posting |
| 5 | DC → P3 | Online + No Hold posting | Wrong mode (Process Immediate) → duplicate trades |

## Timing / Deadlines

- **~12 business days before liquidation:** DC sends re-registration form to Matt's team.
- **~10 business days before liquidation:** Fidelity accounts are set up and monitoring starts.
- **Final files arrive:** DC updates share estimates immediately.
- **Liquidation Day:** Placeholder created in P3 by Day of Wire workflow.
- **After final files processed:** Balances posted in Online + No Hold mode; reconcile against TIK tracker.

## Failure Modes

- **Sent too early.** Matt's team spins up Fidelity monitoring weeks before shares arrive → wasted effort, false negatives.
- **Missing account info.** Prior vendor has no routing target; shares don't arrive or arrive at the wrong account.
- **Stale share estimates.** Matt's team cannot match incoming shares to the expected amount; shares sit unclaimed.
- **Wrong P3 processing mode.** Process Immediate fires trades even though shares are already at Fidelity → duplicate trades and reversal work.
- **TIK fund mistakenly processed as dummy participant.** TIK does not use a [[dummy-participant]] — the Day of Wire placeholder fills directly.

## See Also

- [[toa]]
- [[matt-oconnell]]
- [[liquidation-day]]
- [[final-files-posting]]
- [[conversion-types]]
- [[plan-conversion-handoffs]]
- [[lm-dc]]
