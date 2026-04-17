---
title: "Prior Record Keeper"
type: concept
tags: [prior-record-keeper, vendor, liquidation, test-files, coordination]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Prior Record Keeper

The outgoing retirement plan administrator from whom TransAmerica is taking over the plan. A critical external relationship that must be established early.

## Overview

The prior record keeper (prior RK) holds all current participant data, balances, and investment positions. They will:
- Provide test files to the DC for validation
- Provide final files after liquidation
- Execute the liquidation or transfer of assets on liquidation day
- Receive and act on wire instructions

This relationship must be initiated early in the workflow. Delays in establishing contact = delays in everything downstream.

## Not Applicable For

- **Startup plans** — no prior record keeper; no conversion of existing assets
- Verify plan type before looking for a prior RK contact

## Identifying the Prior RK

The prior RK contact is known **from the moment the plan is received**. DC doesn't need to research or discover it — it comes with the assignment.

## Relationship Ownership

The prior RK relationship is **shared across the whole team** — DC, COM, TC, and others all interact with them as needed. It's not DC-exclusive.

## Initial Outreach

As soon as the plan is in the DC's queue:
1. Make initial contact — introduce the DC and the project
2. Send the **questionnaire** via the "hello email" — there is a **standard questionnaire template** included
3. Begin coordinating on test file and data delivery timelines

## Questionnaire Topics

Standard questions sent to the prior RK:
- **Liquidity issues:** Are any funds frozen, restricted, or otherwise illiquid?
- **Transfer in kind availability:** Which funds can be transferred in kind vs. must be liquidated?
- **Test file delivery:** When can test files be provided? In what format?
- **Final file delivery:** What format will final files be in? When will they be available?
- **Wire coordination:** Who handles wire transfers on their end?
- Any other plan-specific concerns

## Test Files

Test files are the prior RK's data files delivered before liquidation for DC to validate. The DC uses them to:
- Verify data format compatibility with EDS layouts
- Run source summaries → identify which sources have money → build [[source-mapping]]
- Check population counts and balance totals
- Set up [[informatica]] CONV file structure in advance

> Test files are a major milestone. Everything downstream (source mapping, CONV prep) depends on them.

## Final Files

Final files are delivered after liquidation and contain authoritative as-of-liquidation data. See [[final-files-processing]].

## Wire Instructions

DC sends wire instructions to prior RK as early as possible. See [[wire-instructions]].

## Day-Of Communication

On liquidation day:
- DC emails prior RK to confirm everything on track (day before)
- DC emails prior RK in the morning to request wire confirmation + fund breakdown
- DC stays in contact until wire is confirmed received by [[internal-teams|Cashiering]]

## Unresponsive Prior RKs

This happens a lot. The approach: **keep pushing**. There's no special escalation — persistence is the tool.

## Common Prior RK Workflows

DC has built custom workflows for the most common prior record keepers (e.g., Fidelity, Vanguard, Empower). These workflows exist in the main DC folder and are being tuned — will be documented here once finalized.

## See Also

- [[wire-instructions]]
- [[source-mapping]]
- [[toa]]
- [[liquidation-day]]
- [[final-files-processing]]
- [[dc-onboarding-workflow]]
