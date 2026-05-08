---
title: "Liquidation Day"
type: concept
tags: [liquidation, day-of-wire, wire, cashiering, critical]
created: 2026-04-14
updated: 2026-04-15
sources: 3
---

# Liquidation Day

The day the prior record keeper liquidates (or transfers) plan assets and sends them to TransAmerica. The highest-stakes day in the conversion.

## Overview

Liquidation Day is when money (or shares) moves. Every action this day is time-sensitive and sequential. The DC orchestrates communications between the prior record keeper, Cashiering, and internal systems. Processing cannot begin until the wire is confirmed received.

## Day Before

**Email Cashiering:**
> "Hey, I have a wire coming in for [Plan Name]. Expecting approximately $[amount]. Just a heads up."

Send to: `shtaopscashieringinc@transamerica.com`

Cashiering may already have a daily wire list with DC assignments, but send the email anyway. Better to be redundant than missed.

**Email Prior Record Keeper:**
> "Just confirming we're good for tomorrow. Let me know if anything has changed."

Keep everyone on notice. This is a big day.

## Morning of Liquidation Day

**Email Prior Record Keeper:**
> "Good morning — today's the day. Please send the wire and provide a fund breakdown and total as soon as possible. I can't move forward until I have the breakdown."

Once vendor confirms wire sent:
- Notify Cashiering: "Vendor says wire is sent. Expected total: $[X]. Let me know when you see it."

## Wire Confirmation

Cashiering's wire pull schedule: **7 AM, 9 AM, 1 PM, and 3 PM CST**.

Cashiering will notify the DC by **3:45 PM** if the wire was received that day. If there is a delay, they reply to the DC's wire notification email acknowledging it and confirming when the daily notifications are complete.

> **Wires received after 3:00 PM CST are deposited the next business day.**

When confirmed, Cashiering emails:
> "Wire received for [Plan Name]. Amount: $X. Transfer Reference Number: [XXXX]."

The **Transfer Reference Number** (trans ref number) is the unique ID for this wire transaction in the system.

## Processing by Conversion Type

### Cash Conversion

After wire confirmed and total matches breakdown:
1. **Book as `4 = Remit`** — wire hits State Street, book using same process as normal
2. Email NY Recon (so they can identify variances and piece together components)
3. Move money to the **Advanced Employer (AEDA) account** in P3
4. Email all parties: "Wire received for [Plan Name], $[X]. Posted to Advanced Employer."
5. Parties do their checks; they'll confirm or flag issues

> Do NOT process participant balances on liquidation day for cash conversions. Wait for final files.

See [[booking-assets]] for the distinction between booking wires vs. AEDA disbursements.

### Mapping Conversion

After wire confirmed and total matches breakdown:
1. Create trans ref numbers in P2/P3 — **one per fund** in the CONV file
2. Fill totals into pre-prepared CONV file (fund amounts from vendor breakdown)
3. Verify [[dummy-participant]] (SSN 999-00-00) is in the census — **do this now if not already confirmed**
4. Import CONV file → run **Day of Wire workflow** in [[informatica]]
5. Check P3: dummy participant should have balances; trades should be out
6. Run queries to verify

### Transfer In Kind

Same as mapping for CONV file setup, except:
- CONV file has **re-reg = Y** for TIK funds
- Day of Wire creates placeholder (no details, no trades)
- Notify [[matt-oconnell]]'s team that assets are moving
- Shares will arrive at Fidelity — Matt's team will identify and apply

## Wire Total Mismatch

If the wire total doesn't match the vendor's fund breakdown total:
1. **Do not process.** Hold everything.
2. Contact the prior record keeper vendor and ask for an explanation of the discrepancy.
3. Do not proceed until the totals are reconciled and everything is in good order.

> "We don't process unless it's in good order."

## Pre-Checks Before Running Day of Wire

Before importing CONV file to Informatica, verify:
- [ ] Plan is fully set up in P3
- [ ] Trans ref numbers created (one per fund)
- [ ] CONV file totals match vendor breakdown
- [ ] Dummy participant exists in census (mapping only)
- [ ] Fund mapping is approved and loaded
- [ ] Source mapping is approved and loaded

## Key Rule: Day of Wire Cannot Be Tested

> "We can't test this, unfortunately."

You can preview/debug in Informatica but cannot do a full test run. Double-check everything before executing.

## Totals Must Match

Before any Day of Wire action: wire total must match the vendor's fund breakdown total. If they don't match, hold. Investigate discrepancy before proceeding.

## Trans Ref Number

The transfer reference number is the unique identifier for the wire transaction. It is:
- Provided by Cashiering when they confirm the wire
- Used to create corresponding ref numbers in [[p2]] for each fund (reflected in P3)
- Referenced in the CONV file for each fund
- Used to track the transaction throughout processing

**Format:** Date in `YYYYMMDD` format followed by ~7–8 random alphanumeric characters.

## P2 Navigation — Creating Trans Ref Numbers

Exact steps:
1. Login screen → enter **CORP07** (for CORP plans) or **tdatest** (for TDA plans)
2. Job # → **2001**
3. Enter **contract number** and **affiliate number**
4. Select **Option 4** to add a ref number
5. Trans code: **1006**
6. Proc code: **3**

One ref number per fund in the CONV file.

## Cutoff Time — Critical

**The SSBT (State Street Bank & Trust) cut-off is 4:00 PM EST. The [[fund-management-calendar]] must be updated AND the notification email sent to four distribution addresses before this time on any day trades go out.**

Wire confirmation from Cashiering is expected by 4:45 PM EST. If the wire is not confirmed by 4:00 PM, update the FMC to the next business day and send a follow-up notification email.

See [[fund-management-calendar]] for the full new procedure, email distribution list, and per-conversion-type details.

> Entering estimates is fine. Not entering anything is a problem.

### Common Remitter Plans

If the plan is coded as a "common remitter," the standard **Pre-Process** option in P3's Remit Action dropdown will be absent. Use **"Verify Batch After Funding"** instead. See [[common-remitter-plans]] for the full alternative flow.

## Open Questions

- What queries should be run in P3 after Day of Wire to verify? *(Many — will be documented separately)*

## See Also

- [[conversion-types]]
- [[informatica]]
- [[dummy-participant]]
- [[wire-instructions]]
- [[internal-teams]]
- [[final-files-processing]]
- [[p3]]
- [[booking-assets]]
- [[common-remitter-plans]]
- [[fund-management-calendar]]
