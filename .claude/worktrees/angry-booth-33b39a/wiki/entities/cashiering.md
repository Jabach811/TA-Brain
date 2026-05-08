---
title: "Cashiering"
type: entity
tags: [team, cashiering, wire, liquidation]
created: 2026-04-14
updated: 2026-04-15
sources: 2
---

# Cashiering

The internal team responsible for receiving, booking, and confirming incoming wires from prior record keepers on liquidation day.

## Overview

Cashiering is the financial operations team that handles wire receipt on liquidation day. Once the prior record keeper sends the wire, Cashiering books it, officially applies the funds to the plan, and issues a transfer reference number to the DC. That confirmation email is the DC's green light to begin Day of Wire processing in Informatica.

## Contact

**Email:** `shtaopscashieringinc@transamerica.com`

## Wire Pull Schedule

Cashiering pulls wires at the following times (CST):
- 7:00 AM
- 9:00 AM
- 1:00 PM
- 3:00 PM

**Wires received after 3:00 PM CST are deposited the next business day.** This is a hard cutoff.

## DC Notification Timing

Cashiering notifies the DC by **3:45 PM** if the wire was received that day. If there is a delay (e.g., State Street processing takes longer), Cashiering replies to the wire notification emails acknowledging the delay and confirms when daily notifications are complete.

## Responsibilities

- Receiving incoming wires from prior record keepers via State Street Bank & Trust (SSBT)
- Booking wires to the plan (**4 = Remit** booking type)
- Verifying wire amounts against expected totals
- Providing the transfer reference number to the DC once confirmed
- Tracking expected wires via a daily wire schedule
- Sending confirmation to the DC when the wire is received and booked

## DC Interaction

| DC Action | Timing | Details |
|-----------|--------|---------|
| Send advance notice with expected wire amount | Day before liquidation | Send to `shtaopscashieringinc@transamerica.com`; include plan number and expected amount |
| Notify Cashiering when vendor confirms wire sent | Morning of liquidation day | Include expected total |
| Wait for wire confirmation email + ref number | After 3 PM CST pull at the latest | Confirmation will arrive by 3:45 PM if received that day |

**Best practices:**
- Always send the day-before heads-up even if Cashiering already has a daily wire list — redundancy is better than being missed
- Follow up if wire confirmation has not arrived by 3:45 PM
- Cashiering's email with the transfer reference number = the green light to run the Day of Wire workflow in Informatica. Do not proceed without it.
- If wire does not arrive by the 4:00 PM SSBT cut-off: update the Fund Management Calendar to the next business day and send the FMC follow-up notification email

## Wire Booking Type

When Cashiering books an incoming wire from State Street:
- **Books as `4 = Remit`**
- DC should also email NY Recon when booking wires (so they can identify variances)

This is distinct from AEDA disbursement bookings (3 = Rebook). See [[booking-assets]].

## Internal Tracking

Cashiering maintains a daily wire schedule that likely already includes DC plan assignments with expected amounts. The DC's advance notification provides additional context and confirmation, but Cashiering may already have visibility into the incoming wire.

## See Also

- [[liquidation-day]]
- [[wire-instructions]]
- [[booking-assets]]
- [[fund-management-calendar]]
- [[informatica]]
- [[p2]]
- [[internal-teams]]
- [[dc-onboarding-workflow]]
