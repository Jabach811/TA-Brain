---
title: "Cashiering"
type: coordination
tags: [team, cashiering, wire, liquidation]
created: 2026-04-14
updated: 2026-07-08
sources: 2
status: current
---

# Cashiering

Receives, books, and confirms incoming wires from prior record keepers on liquidation day — their confirmation is your green light for Day of Wire processing.

**Contact:** TA Ops Cashiering — Incoming: `SHTAOPSCASHIERINGINC@transamerica.com`

## What they own

- Receiving incoming wires via State Street Bank & Trust (SSBT)
- Booking wires to the plan as **4 = Remit** (distinct from AEDA disbursement bookings, 3 = Rebook — see [[booking-assets]])
- Verifying wire amounts against expected totals
- Issuing the transfer reference number to the DC
- Wire pulls at **7:00 AM, 9:00 AM, 1:00 PM, 3:00 PM CST**. Wires received after 3:00 PM CST are deposited the next business day — hard cutoff

## What you hand them

- **Day-before heads-up** — expected wire amount and plan number, sent the day before liquidation. Send it even if Cashiering already has a daily wire list; redundancy beats being missed
- **Wire-sent notification** — morning of liquidation day, when the vendor confirms the wire went out, with expected total
- **NY Recon email** — when booking wires, also email NY Recon so they can identify variances

## What they hand you

- **Wire confirmation + transfer reference number** — by **3:45 PM CST** if the wire arrived that day. This email is the green light to run the Day of Wire workflow in [[informatica]]. Do not proceed without it
- **Delay acknowledgments** — if State Street processing runs long, Cashiering replies to the wire notification thread and confirms when daily notifications are complete

## When to contact them / escalation

- Follow up if confirmation hasn't arrived by 3:45 PM
- If the wire misses the 4:00 PM SSBT cutoff: update the [[fund-management-calendar]] to the next business day and send the FMC follow-up notification email

## Common issues

- DC forgets the day-before heads-up and Cashiering isn't watching for the wire
- Starting Day of Wire processing without the reference number
- Wire lands after 3:00 PM CST — plan on next-business-day deposit, not a same-day exception

## See Also

- [[liquidation-day]]
- [[wire-instructions]]
- [[booking-assets]]
- [[fund-management-calendar]]
- [[informatica]]
