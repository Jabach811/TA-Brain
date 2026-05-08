---
title: "Balance Import"
type: concept
tags: [concept, balance, final-files, informatica, cit, conversion, cash, mapping, tik]
created: 2026-04-18
updated: 2026-04-18
sources: 4
---

# Balance Import

Posting participant-level balances into P3 after liquidation — the step that puts real money on real accounts.

> [!needs-review]
> First pass synthesized from training notebook, brain dump, and extra-questions source. CIT file exact column order and Informatica parameter values need SME verification.

## Definition

Balance import is the process of loading participant account balances — by source and by fund — into P3 after the prior record keeper's assets have settled at Transamerica. It is performed during [[concepts/final-files-processing]] and is the financial heart of every conversion: until balances post, participants have no assets in the new plan.

The input is the **CIT balance file**, built by the DC from the prior RK's final files. The engine is the **Informatica participant balance workflow** (`mp_part_balance` map). The output is funded participant accounts in P3, ready for trading.

## Three Types

There are three balance import types, one per [[concepts/conversion-types|conversion type]]. The type determines how assets arrived at TA and therefore how P3 must process them.

| Type | How Assets Arrived | P3 Mode at Posting | Trades at Posting? |
|------|--------------------|-------------------|-------------------|
| **Cash** | Wire of liquidated cash | Process Immediate + Batch | Yes — invests the cash |
| **Mapping** | Cash wire already invested via dummy account on Day of Wire | Online + No Hold | No — books only |
| **TIK** | Shares physically transferred; already at Fidelity | Online + No Hold | No — books only |

**The golden rule:** trades should go out exactly once per fund. Before choosing a P3 processing mode, confirm which step already sent trades (if any).

## CIT Balance File

The CIT balance file is participant-specific — one row per participant per source per fund. Built by the DC from the prior RK's final files immediately after liquidation.

**Structure:** `Case Number | Region | SSN | Source | Fund | Total`

This is distinct from the [[concepts/conv-file|CONV file]] used on Day of Wire, which is fund-specific (one row per fund, no participant breakdown).

## Informatica Balance Module

- Map: `mp_part_balance`
- Fund and source maps saved as text tab-delimited files
- Parameter `$$Test_File`:
  - `P` = preliminary run (pre-load test)
  - `Y` = test SSNs loaded
  - `N` = live production run

Test the workflow before going live. It can be tested and should be.

## Processing Order Within Final Files

The balance import must happen in this sequence within final files processing. Do not reorder:

1. **Post participant balances** ← this step
2. Post deferral elections
3. Enable eligibility
4. Post YTD data (comp, contributions, hours)

Enabling eligibility before deferrals are posted risks auto-enrollment firing prematurely — reversing that is painful.

## What Comes In (Final Files)

The prior RK's final files include:
- Participant balances by source and fund (as of liquidation date)
- YTD contributions by source
- YTD compensation (and prior year if applicable)
- Hours (current year and prior year if applicable)
- Deferral elections by source (dollar or percent)
- Eligibility data

Whether to use vendor data vs. client data for any field is decided by the client in advance. Know this before files arrive — don't assume.

## EDS Layouts

Each data type requires its own EDS layout. There is no combined layout. Set up all layouts well before final files arrive — when files land, you want to run immediately, not build layouts.

## See Also

- [[concepts/conversion-types]]
- [[concepts/final-files-processing]]
- [[concepts/informatica-balance-module]]
- [[concepts/conv-file]]
- [[processes/balance-import-cash]]
- [[processes/balance-import-mapping]]
- [[processes/balance-import-tik]]
- [[entities/informatica]]
- [[concepts/dummy-participant]]
