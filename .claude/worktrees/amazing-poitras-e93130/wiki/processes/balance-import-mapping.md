---
title: "Balance Import — Mapping Conversion"
type: process
tags: [process, balance, final-files, mapping, informatica, p3, conversion, fund-mapping]
created: 2026-04-18
updated: 2026-04-18
sources: 4
---

# Balance Import — Mapping Conversion

How participant balances are posted after a mapping conversion, where prior-RK funds were already invested into TA funds via the dummy account on Day of Wire.

> [!needs-review]
> First pass synthesized from training notebook, brain dump, and extra-questions source. Step details need SME verification before this is considered authoritative.

## Overview

In a mapping conversion, the prior RK liquidates assets and the wire arrives at TA. On Day of Wire, those funds are immediately invested via the [[concepts/dummy-participant|dummy participant]] account using the approved [[concepts/fund-mapping|fund mapping]] — so trades have already gone out. When participant balances are posted during final files processing, P3 is only booking the participant-level detail on top of trades that are already done. **No new trades are sent at the posting step.** Using Process Immediate here would send duplicate trades — a serious error.

## Trigger

- Prior RK final files received and validated
- Day of Wire complete — dummy account invested, trades already out
- Participant census, elections, and sources already loaded in P3
- Dummy participant (SSN 999-00-0000) still in place from Day of Wire

## Steps

| # | Step | Owner |
|---|------|-------|
| 1 | Build the **CIT balance file** from prior RK final files: `Case Number | Region | SSN | Source | Fund | Total` — one row per participant per source per fund | [[roles/lm-dc]] |
| 2 | Set up EDS layout for the balance file if not already done | [[roles/lm-dc]] |
| 3 | Run Informatica participant balance workflow in test mode (`$$Test_File = P`) — verify row counts and totals | [[roles/lm-dc]] |
| 4 | Run Informatica participant balance workflow in production (`$$Test_File = N`) | [[roles/lm-dc]] |
| 5 | In P3: set processing mode to **Online + No Hold** — this books participant-level detail without sending new trades | [[roles/lm-dc]] |
| 6 | Reverse the dummy participant using the **ROC tool** in P3 | [[roles/lm-dc]] |
| 7 | Run verification queries to confirm participant balances match final files totals | [[roles/lm-dc]] |
| 8 | Proceed to deferral elections load; then eligibility; then YTD | [[roles/lm-dc]] |

## Handoff Points

- **DC → QA:** verification of posted balances (QA reviews audit pack post-conversion)

## Timing / Deadlines

- Balance posting should happen as soon as final files are confirmed — typically the business day after liquidation
- Day of Wire must be fully complete before balance posting; confirm dummy account ran correctly before proceeding

## Failure Modes

- **Process Immediate used instead of Online + No Hold.** Sends duplicate trades on top of trades already executed on Day of Wire. Participant accounts will have double the correct balance in the destination funds. This is a critical error requiring Prod Support correction — open a [[processes/prod-support-ticket|Prod Support ticket]] immediately.
- **Dummy participant not reversed.** Residual balance stays in the plan permanently. Reverse via ROC tool immediately after posting.
- **Fund mapping mismatch between CONV file and CIT file.** If the CIT file uses different prior fund codes than the CONV file used on Day of Wire, funds won't align. Reconcile source mapping before running.
- **Source not mapped.** CIT file rows with unmapped source codes will fail to load. Verify all sources in the CIT file have a corresponding TA source ID in [[entities/aqt|AQT]] before running.
- **CIT file totals don't match final files.** Find the discrepancy, correct, and re-run — do not post incorrect balances.

## See Also

- [[concepts/balance-import]]
- [[concepts/conversion-types]]
- [[concepts/final-files-processing]]
- [[concepts/fund-mapping]]
- [[concepts/conv-file]]
- [[concepts/dummy-participant]]
- [[concepts/informatica-balance-module]]
- [[processes/balance-import-cash]]
- [[processes/balance-import-tik]]
- [[processes/prod-support-ticket]]
