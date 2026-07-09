---
title: "Wire Routing & Cutoff Times"
type: reference
tags: [reference, wires, cashiering, liquidation, state-street]
created: 2026-07-08
updated: 2026-07-08
sources: 3
status: active
---

# Wire Routing & Cutoff Times

Where incoming conversion wires land at State Street, when Cashiering pulls them, and the daily cutoffs that decide whether money books today or tomorrow.

## State Street Routing by Reinsurance Code

Incoming wires go to one of five State Street Bank & Trust accounts. Which account depends on the plan's Reinsurance Code (training notebook). The Assurance Code on P3 — found at Plan → General Plan → Assurance Codes — determines which account goes on the wire instructions (extra questions).

| Reinsurance Code(s) | State Street Account |
|---|---|
| 2, 3, A, B | 00457358 |
| 5, 6, 9 | 00457366 |
| 4, 7, 8, C | 00457374 |
| I | 00457424 |
| J | 00457440 |

- **ABA:** 011000028
- **Bank:** State Street Bank & Trust Company, 200 Clarendon Street, Boston, MA 02116 (training notebook)

Wire instructions use a standard template. They are sent to the prior record keeper first thing, then re-sent about one week before liquidation as a confirmation reset (balances/census/loans dump).

## Cashiering Wire Pulls

Cashiering pulls wires four times a day: **7am, 9am, 1pm, and 3pm CST** (training notebook).

## Cutoffs

- **3:00 PM CST** — wires received after this time are deposited the **next business day** (training notebook).
- **3:45 PM** — Cashiering notifies the DC by this time if the wire was received that day. If they are delayed, they reply to acknowledge and confirm when complete (training notebook).

Related banking cutoff: the SSBT (State Street) cut-off for the Fund Management Calendar is **4:00 PM EST**, with wire confirmation received by 4:45 PM EST. If the wire is not received by cut-off, update the FMC to the next business day and send a follow-up email (training notebook).

## Notifying Cashiering

- Cashiering email: `shtaopscashieringinc@transamerica.com` (training notebook).
- Wire confirmation has two paths: wait for Cashiering's email, or the DC searches the ref numbers in P2 directly and matches the amount (balances/census/loans dump).

## Booking Assets (August 2025 update)

- Wire hits State Street: book as **4=Remit**; still email NY Recon (training notebook).
- Withdrawing from AEDA (Advanced Employer Deposit Account): book as **3=Rebook** AND submit a rebook AWD ticket (training notebook).

## See Also

- [[wire-instructions]]
- [[liquidation-day]]
- [[cashiering]]
- [[fund-management-calendar]]
- [[p2]]
- [[p3]]
