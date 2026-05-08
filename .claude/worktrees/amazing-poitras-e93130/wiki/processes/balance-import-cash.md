---
title: "Balance Import — Cash Conversion"
type: process
tags: [process, balance, final-files, cash, informatica, p3, conversion]
created: 2026-04-18
updated: 2026-04-18
sources: 4
---

# Balance Import — Cash Conversion

How participant balances are posted after a cash conversion, where all prior-RK assets were liquidated and wired to TA as cash.

> [!needs-review]
> First pass synthesized from training notebook, brain dump, and extra-questions source. Step details need SME verification before this is considered authoritative.

## Overview

In a cash conversion, the prior record keeper liquidates all participant assets and sends a single wire to Transamerica. That cash lands in the [[concepts/advanced-employer|Advanced Employer (AE) account]] — a holding account. When participant balances are posted, P3 sends trades to invest each participant's cash into their current investment elections. This is the only balance import type where trades go out at the posting step.

## Trigger

- Prior RK final files received and validated
- Wire confirmed received by [[entities/cashiering]]
- Participant census, elections, and sources already loaded in P3
- [[concepts/dummy-participant|Dummy participant]] (SSN 999-00-0000) in place from Day of Wire

## Steps

| # | Step | Owner |
|---|------|-------|
| 1 | Request AE liquidation — email [[entities/stacey-fortune]] or [[entities/nick-lister]]: "Please liquidate the AE for case [CASE_NO]." | [[roles/lm-dc]] |
| 2 | Build the **CIT balance file** from prior RK final files: `Case Number | Region | SSN | Source | Fund | Total` — one row per participant per source per fund | [[roles/lm-dc]] |
| 3 | Set up EDS layout for the balance file if not already done | [[roles/lm-dc]] |
| 4 | Run Informatica participant balance workflow in test mode (`$$Test_File = P`) — verify row counts and totals match final files | [[roles/lm-dc]] |
| 5 | Run Informatica participant balance workflow in production (`$$Test_File = N`) | [[roles/lm-dc]] |
| 6 | In P3: set processing mode to **Process Immediate + Batch** — this sends trades to invest the cash per participant elections | [[roles/lm-dc]] |
| 7 | Reverse the dummy participant using the **ROC tool** in P3 | [[roles/lm-dc]] |
| 8 | Run verification queries to confirm participant balances match final files totals | [[roles/lm-dc]] |
| 9 | Confirm trades went out — check fund management calendar and verify with trading desk if needed | [[roles/lm-dc]] |
| 10 | Proceed to deferral elections load; then eligibility; then YTD | [[roles/lm-dc]] |

## Handoff Points

- **Cashiering → DC:** wire confirmation email triggers balance build
- **DC → Stacey/Nick:** AE liquidation request before balance posting
- **DC → QA:** verification of posted balances (QA reviews audit pack post-conversion)

## Timing / Deadlines

- AE liquidation request should go out as soon as final files are in hand and confirmed — don't wait
- Balance posting drives all downstream final-files steps; nothing else can run until it completes
- Trades sent at posting must clear before participant accounts are "live" — confirm with trading desk on timeline

## Failure Modes

- **AE not liquidated before posting.** Cash stays in holding; trades will fail or post incorrectly. Always request AE liquidation first.
- **Process Immediate not selected.** If Online + No Hold is used instead, cash is booked but not invested — participants have zero in their elected funds. Must redo with correct mode.
- **Dummy participant not reversed.** SSN 999-00-0000 holds a residual balance in the plan forever. Reverse it via ROC tool immediately after posting.
- **Election data missing or stale.** Trades go out to wrong funds if elections weren't loaded or were loaded from an outdated source. Verify elections are current before running Informatica.
- **CIT file totals don't match final files.** Run does not reconcile. Stop, find discrepancy, correct CIT file, re-run.

## See Also

- [[concepts/balance-import]]
- [[concepts/conversion-types]]
- [[concepts/final-files-processing]]
- [[concepts/advanced-employer]]
- [[concepts/dummy-participant]]
- [[concepts/informatica-balance-module]]
- [[processes/balance-import-mapping]]
- [[processes/balance-import-tik]]
