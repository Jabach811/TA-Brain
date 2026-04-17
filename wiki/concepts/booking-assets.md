---
title: "Booking Assets"
type: concept
tags: [booking, wire, aeda, remit, rebook, cashiering, liquidation]
created: 2026-04-15
updated: 2026-04-15
sources: 1
---

# Booking Assets

The process of posting wire receipts and balance disbursements to plan accounts in P3. As of August 13, 2025, two distinct booking types apply depending on the source of funds: incoming wires from State Street are booked as a Remit (4), while disbursements from the Advanced Employer Deposit Account are booked as a Rebook (3) with an accompanying AWD ticket.

## Definition

"Booking assets" refers to creating the transaction records in P3 that reflect money received (wires in from State Street) or money being credited to participant accounts (withdrawn from the AEDA). The booking type code determines how the system treats the transaction.

## Why It Matters

Using the wrong booking type causes reconciliation errors, mismatches in P3, and may trigger incorrect trade activity. The August 2025 update formalized a distinction that was previously informal or handled ad hoc.

## Two Booking Scenarios

### Scenario 1 — Wire Hits State Street

When the prior record keeper's liquidation wire arrives at State Street Bank & Trust (SSBT):

- **Book as: `4 = Remit`**
- Process using the same steps as normal
- Still email NY Recon so they can identify variances and piece together the components

This is the same logical process as before; the booking code (4=Remit) is explicitly confirmed by the August 2025 update.

### Scenario 2 — Withdrawing from AEDA

When posting participant account balances by withdrawing from the **AEDA (Advanced Employer Deposit Account)** — the holding account where cash conversion wire funds sit until participant-level processing:

- **Book as: `3 = Rebook`**
- After booking, **submit a Rebook AWD ticket**
- Fill in the required fields on the AWD ticket
- Change status to **"COMPLETED"** before hitting Update — this ticket does not need to go to any other team; it just needs to be submitted

## AEDA Context

The AEDA is the P3 holding account used for cash conversions (also called the Advanced Employer account). Wire proceeds sit in this account until the DC builds and runs the participant-level balance workflow. When those balances are posted, the money moves out of the AEDA to individual accounts. That withdrawal-and-rebook action is what requires the 3=Rebook type and the AWD ticket.

See [[advanced-employer]] for the AEDA concept.

## Rebook AWD Ticket — Required Fields

When submitting the rebook AWD ticket after a 3=Rebook booking:
- Fill in all required fields in the ticket
- Add input in the comments field
- **Set status to "COMPLETED" before hitting Update**
- No routing to another team is needed — submit and complete in the same step

## Evidence / Examples

From the DC Training Notebook (August 13, 2025):

> "Booking assets when they hit State Street and not using the tr-ref-no that cashiering used to book, you will follow the same process. Book as a 4=Remit whether mapping/booking to holding account. You will still need to send an email to NY Recon so they can identify any variances quickly and piece the components together."

> "When booking assets to process to ppt accounts off a w/d from AEDA you will now book as a 3=Rebook. Once that is complete, you'll need to submit a rebook AWD ticket."

## Related Concepts

- [[advanced-employer]] — the AEDA / Advanced Employer account
- [[liquidation-day]] — when the wire arrives from State Street
- [[final-files-processing]] — when AEDA funds are disbursed to participant accounts
- [[cashiering]] — confirms wire receipt; emails NY Recon
- [[reversal-process]] — when a booking is made in error

## See Also

- [[advanced-employer]]
- [[liquidation-day]]
- [[final-files-processing]]
- [[cashiering]]
- [[reversal-process]]
- [[lm-dc]]
