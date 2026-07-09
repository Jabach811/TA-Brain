---
title: "Subsequent Cash Imports"
type: conversion-ops
tags: [advanced-employer, interest, dividends, uncashed-checks, post-conversion, dc-triggered]
created: 2026-05-03
updated: 2026-05-03
sources: 1
status: current
---

# Subsequent Cash Imports

The family of small DC-triggered cash applications that land in participant accounts **after** the main conversion balances post. All of these follow the same pattern: extra cash arrives at the plan, and the DC pushes it out to participants pro-rata or per the source rules.

## What Falls Into This Family

| Type | Origin | Typical Timing |
|------|--------|----------------|
| **Advanced Employer interest** | Interest accrued by the [[advanced-employer]] account while it held the wire | Day after AE liquidation |
| **Dividends** | Late dividend payments from prior-RK funds | Days to weeks after conversion |
| **Uncashed checks** | Stale uncashed distribution checks reissued back to the plan | Anytime post-conversion |
| **Other extra cash** | Any other late-arriving amounts the plan receives | Anytime post-conversion |

All of these are **DC-triggered** — none of them are automated. The DC sees the cash arrive (typically via Cashiering or a vendor email), runs the appropriate workflow, and pushes the amount to participants.

## Advanced Employer Interest — The Common Case

The clearest example. Walks through the full sequence:

1. **Liquidation Day:** Wire hits → moved to [[advanced-employer]] account → accrues a small interest while sitting there
2. **Final files arrive:** DC requests AE liquidation → balances post to participant accounts
3. **Next business day:** DC takes the accrued interest amount and applies it **pro-rata to participants** as a small bonus — proportional to each participant's share of the total balance that just posted

The interest is small but real. Participants see a tiny additional credit the day after their main balance lands.

## Why It Matters

These small late amounts are easy to miss. If they don't get pushed out:

- Participants are short by the amount owed
- The cash sits in a plan-level holding spot indefinitely, becoming a reconciliation problem later
- Audit trails get murky because the prior-RK records show the amount left their books but TA records don't show it landing in any participant account

## Out of Scope for FMC

These small distributions do **not** require [[fund-management-calendar|FMC]] entries. The big-money rule from FMC applies in reverse: interest, dividends, and small late amounts are below the threshold that needs advance notice to fund companies.

## See Also

- [[advanced-employer]]
- [[balance-import]]
- [[final-files-processing]]
- [[fund-management-calendar]]
- [[cashiering]]
