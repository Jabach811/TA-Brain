---
title: "Fund Management Calendar"
type: conversion-ops
tags: [fund-management-calendar, trades, cutoff, liquidation, critical, fmc]
created: 2026-04-14
updated: 2026-07-08
sources: 4
status: current
---

# Fund Management Calendar

A daily trade log that must be updated — and a distribution email sent — before the 4:00 PM EST SSBT (State Street Bank & Trust) cut-off on any day trades go out. One of the most time-critical steps in a conversion. Failure to update it risks fund companies declining trades, requiring reversal and reprocessing.

## Overview

The Fund Management Calendar (FMC) tracks every trade being sent out across all plans on a given day. When a conversion involves trades — whether from a mapping Day of Wire or a cash conversion balance posting — the DC must enter the plan's expected trade information into the FMC and send a notification email to four distribution addresses.

> "The FMC calendar is a critical step for the DC Team to ensure that our internal partners can effectively communicate nightly trade expectations with the fund companies that Transamerica is partnering with. If Transamerica does not communicate these trades to our external partners, we risk the fund companies declining our trades and may have to reverse and reprocess our files."

The procedure below supersedes the old FMC process. The original FMC page in the DC Training Notebook is explicitly marked **"DO NOT USE."**

## Why It Matters

Without an FMC entry, a large unexpected transaction ($10–20 million or more) has no advance notice and will trigger questions. An entry — even an estimate — communicates intent. Absent entries are the problem; estimates are always acceptable.

> "If you don't put it in, all of a sudden there's a $10, $20 million transaction. People are gonna question it. It's on the fund management calendar, even if it's not exact, it'll be fine."

## Cut-Off Time

| Trigger | Time |
|---------|------|
| **SSBT Cut-off** | 4:00 PM EST |
| **Wire confirmation expected** | 4:45 PM EST (Cashiering confirms by this time if wire received that day) |

If the wire is not received by the 4:00 PM SSBT cut-off, the FMC must be updated to the **next business day** and a follow-up email sent.

## Email Distribution List

Whenever the FMC is updated with fund balances or an expected wire amount, **also send an email** to all four addresses below. This is mandatory — not optional — per the February 2026 procedure update.

| Address |
|---------|
| TRSCFUNDCALENDAR@transamerica.com |
| TRSCIM.Operations@transamerica.com |
| TRSCIM.Operations.Members@transamerica.com |
| TRSCIM.PARISIIIRemittanceBatchNotificationList@transamerica.com |

**Email Subject:** `[Case Number and Affiliate] / FMC Update`

**Email body must include:**
- Plan Number / Affiliate
- Plan Name
- Fund Name / Fund Code / Amount per Fund
- Expected processing date

If the wire does not arrive by cut-off and the FMC is moved to the next business day, send a follow-up email to the same list with subject: `FMC Date Change Notification`.

> The email is also critical when unable to access the FMC file — it provides the information to internal teams even if the file cannot be updated.

## When It Applies

| Scenario | Calendar Entry + Email Required? |
|----------|----------------------------------|
| AC1 Mapping — Day of Wire | Yes |
| AC1 Cash — balance posting | Yes |
| Participant Balance Processing | No (see note below) |
| Transfer In Kind — Day of Wire | No (shares only, no trades) |
| Transfer In Kind — balance posting | No |
| AE interest distribution, dividends, uncashed checks, other small late cash | No — small-money exclusion (see below) |

## Cash Conversion: Three Trading Events

For a cash conversion, the FMC has to capture **three separate trading events** across different days — not just one. Forgetting any of them is the same problem as not entering anything at all.

| Event | Trades? | Day | FMC Entry Required |
|-------|---------|-----|--------------------|
| Wire booked → Advanced Employer purchase | Yes (AE buy) | Liquidation Day | Yes |
| AE liquidation (final files arrive) | Yes (AE sell) | Final Files Day | Yes |
| Subsequent fund purchases (participant balances post) | Yes (fund buys) | Same as AE liquidation, or shortly after | Yes |

Each event is a real trade hitting fund companies. Each one needs its own FMC entry on the right day.

## Small-Money Exclusion

Not every cash movement requires an FMC entry. The rule is **big money only**. The following do **not** need FMC entries:

- AE interest distributions (see [[subsequent-cash-imports]])
- Trailing dividends from prior-RK funds
- Uncashed check reissues
- Any other small late-arriving cash applied to participants

The threshold is judgment-based, not a hard dollar number. If it would make a fund company raise an eyebrow when the trade hit, it goes on the FMC.

**Participant Balance Processing (special case):** No FMC action for the Day of Wire / initial wire step. However, when participant balance posting is run via the Informatica Balance Workflow, the FMC **must be updated with the FMC Estimate from the Informatica Balance Workflow output by 4:00 PM** on the day of processing. If Vanguard (VG) funds are involved, this must be done by **2:00 PM EST** — or approval must be obtained from the fund trade approver (see below).

## Procedure by Conversion Type

### AC1 Mapping Conversions

**Preparing estimates (before liquidation day):**
- Update FMC with test file balances using the expected TOA date
- If a date range is provided by the prior RK, use the first date in the range; update if wires are not received on that date
- If no test files received: request fund/source balances from prior RK or client for estimates
- If none available: use TOA balances
- **Deadline for entering estimates: no later than TOA minus five business days**

**Day before / Day of Wire:**
- Update FMC if actual fund balances are provided before wire receipt
- When updating with actual fund balances, send the FMC notification email to all four addresses

### AC1 Cash Conversions

**Preparing estimates (before liquidation day):**
- Same process as mapping: use test file balances with expected TOA date
- If test files not received: request fund/source balances from prior RK or client
- If none available: use TOA balances
- **Deadline: no later than TOA minus five business days**

**Day before / Day of Wire:**
- Update FMC if actual wire amount is provided before wire receipt
- When updating with actual expected wire amount, send the FMC notification email

### Participant Balance Processing (Cash Conversions)

- Update FMC with the **FMC Estimate from the Informatica Balance Workflow output** by 4:00 PM on the day of balance processing
- If Vanguard funds involved: update by **2:00 PM EST** or get approval from the fund trade approver
- Send the FMC notification email when updating

## Estimate Ladder

Use the best available number, then keep updating it as better data arrives. Early and directionally useful beats late and perfect.

1. **TOA estimate** — fallback if nothing better exists yet. May be stale by the time assets move, but better than leaving the calendar blank.
2. **Test file balances** — use as soon as available; usually stronger than the TOA.
3. **Refresh files / PRK updates** — if refreshed balances or PRK/client fund details arrive, update the FMC rather than leaving the old number in place.
4. **Informatica test output** — when test output gives better fund-level detail, use it to tighten the entry.
5. **Final files / actuals** — should replace estimates when available before wire/trade timing. Do not leave stale estimates when better data is in hand.

## Trade Approval Beyond the Cutoff

When a trade needs approval or coordination beyond the normal processing window, escalate to the fund trade approver (currently Rich Lippoth) — the go-to contact for incoming share activity and regular fund trades.

Most common trigger: participant balance posting where **Vanguard funds are involved and the 2:00 PM EST FMC update deadline was missed**. In that case, trades cannot proceed until the approver signs off.

Escalation flow:
1. Email the fund trade approver describing the plan, funds, and amounts
2. Follow up by IM or phone — email alone is not enough for same-day approval
3. Proceed with trades only after approval

The same escalation path applies to any trade-related issue requiring approval beyond the standard cutoff window, not just Vanguard.

## If the FMC File Is Locked

The FMC is a shared file and gets locked when multiple people access it simultaneously. This is a known pain point.

**Mitigation:** Enter estimates as early as possible. Do not wait until you have exact numbers — early estimates are better than late exact figures.

**If locked at cut-off time:**
1. Send the FMC notification email to all four distribution list addresses (this documents your trade intent even without file access)
2. Keep trying to access the file throughout the day
3. Update the file as soon as access is restored

> The email provides the information to internal teams even when the file cannot be updated.

## Trade-Slip Notification Groups

Separate from the four FMC update addresses above, there are **three internal email groups** used to notify when trades are not going as planned — for example, when the FMC couldn't be updated in time, when a wire didn't arrive that was expected, or when something has to push to the next day.

> **Placeholder — fill in actual addresses:**
> - `<TRADE-SLIP-LIST-1@transamerica.com>`
> - `<TRADE-SLIP-LIST-2@transamerica.com>`
> - `<TRADE-SLIP-LIST-3@transamerica.com>`

Standard wording is short:

> "Heads up — I had trades for [Plan Name] expected today but [the wire didn't arrive / I couldn't access the FMC / etc.]. I'll handle it tomorrow when [condition] is resolved. Will update FMC then."

This is distinct from the FMC update emails — those announce trades; the trade-slip emails announce *non-trades* or *delayed* trades.

## Core Rule on Timing

> It is **okay** to have an entry on the FMC and have trades **NOT** go out.
> It is **not okay** to have trades go out **without** an entry on the FMC.

When in doubt: put it on early.

## TIK and the FMC

Transfer In Kind conversions are full share transfers — no trading occurs. Therefore, TIK funds do **not** require FMC entries. Only funds that actually trade (cash and mapping conversions) need entries.

## Open Questions

- ~~Exact shared drive path for the FMC~~ — *Confirmed: shared drive path exists (see `\\yydafs-data1\department\` prefix — exact FMC path still not documented; may be migrating)*

## See Also

- [[liquidation-day]]
- [[conversion-types]]
- [[final-files-processing]]
- [[informatica]]
- [[cashiering]]
- [[booking-assets]]
- [[dc-onboarding-workflow]]
