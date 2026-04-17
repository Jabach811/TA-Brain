---
title: "Transfer In Kind (TIK / Re-registration)"
type: concept
tags: [tik, reregistration, fidelity, shares, conversion]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Transfer In Kind (TIK / Re-registration)

A conversion method where specific investment funds are transferred as shares directly — no liquidation, no re-purchase. Also called re-registration.

## Overview

Instead of selling shares and wiring cash, a TIK transfer moves the actual shares from the prior custodian's accounts to TransAmerica's Fidelity pooled accounts. Because shares never leave the market, there are no trades and no market timing risk during the transfer.

TIK applies per-fund. A single plan conversion can have some funds TIK and others mapping or cash.

## Identifying TIK Funds

Source: [[toa]], Column T (Re-registering)
- **N** = fund will be liquidated (mapping or cash)
- **Y** = fund will be transferred in kind

## DC Actions When TIK Is Present

### 1. Fill Out Re-registration Form
After TOA is signed and TIK funds are identified:
- Fill out the re-registration form with fund details and estimated share amounts (use TOA current values as initial estimates)
- Send to [[matt-oconnell]]'s team

### 2. Timing Matt O'Connell's Team
**Do not send too early.** Once Matt's team sets up Fidelity accounts, they immediately start monitoring and reporting. Starting too early creates weeks of false negatives.

Timing calculation:
```
Target setup complete date = Liquidation Date - 10 business days
Send re-registration form = Target setup complete date - 2 days (buffer)
= ~12 business days before liquidation
```

### 3. Update Share Estimates
- Initial estimate: TOA current values (may be stale/months old)
- Update: after test files arrive
- Final update: **immediately** when final files arrive — time-sensitive

### 4. Day of Wire (TIK)
CONV file with **re-reg = Y** for TIK funds.

When Informatica Day of Wire workflow runs:
- Creates a **placeholder** in P3 for each TIK fund
- No details populated
- No trades — shares are being transferred, not traded
- Bill Remit detail table has ref number but no participant data yet

### 5. Posting Participant Balances (TIK)
After final files:
- CIT balance workflow fills in Bill Remit detail (populates the placeholder)
- Process mode: **Online + No Hold** — no trades, books only
- Do NOT click Process Immediate

## How Matt O'Connell's Team Identifies Shares

The Fidelity accounts are pooled (not per-participant, not per-plan-account). When shares arrive:
- Matt's team looks at the expected share count for each fund
- Matches arriving shares to the expected amount
- Claims them and applies to the plan

This is why keeping expected amounts updated is critical — especially final files.

## No Dummy Participant Needed

Unlike [[dummy-participant|mapping conversions]], TIK does not use a dummy participant. The Day of Wire just creates the placeholder; participant balances fill it directly.

## Re-Registration Form — Fields

The re-registration form is simple. Fields include:
- Prior vendor name
- Contact name and contact information
- Effective dates
- Fund details (one row per TIK fund):
  - QSIP
  - Fund name
  - Prior vendor ticker
  - TransAmerica ticker
  - Estimated dollar amount (use TOA current values initially)

**The DC owns the re-registration form entirely.** Process:

1. DC creates the re-registration form after reviewing the [[toa]] (if column T has any "Y")
2. DC coordinates with [[matt-oconnell]]'s team and the prior vendor (if needed)
3. DC provides the **completed form including account information** to the prior vendor so they know exactly where to send the shares
4. This is what enables the prior vendor to deliver the shares to the correct Fidelity pooled account

The vendor needs the account info from this form — without it, they don't know where to route the shares.

## TIK Tracker Spreadsheet

Separate from the re-registration form, there is a **TIK tracker spreadsheet** that the DC maintains:
- DC fills in **expected share amounts** per fund when final files arrive
- Matt's team monitors the spreadsheet and communicates back via it when shares are received
- When all expected shares have arrived, the spreadsheet is fully populated — DC knows it's time to process

## Key Clarifications

**Re-registration form template location:** Front folder of the DC folder.

**Matt's team communication method:** Shared spreadsheet — Matt's team updates it when shares arrive; DC checks it.

**Share amount mismatch:** DC investigates and contacts the vendor.

**TIK and mapping in the same CONV file:** Yes. Each row has its own ReReg field (Y or N). Mixed conversions are handled by setting the appropriate value per fund row.

**Processing timeline:** Process all TIK shares at once when possible. If shares arrive in batches, process in chunks. When Matt's team indicates it's time, DC jumps in immediately.

**How DC knows all shares arrived:** Spreadsheet is fully filled out. DC also knows what to expect from the final files.

## See Also

- [[toa]]
- [[matt-oconnell]]
- [[conversion-types]]
- [[liquidation-day]]
- [[final-files-processing]]
- [[informatica]]
- [[dummy-participant]]
