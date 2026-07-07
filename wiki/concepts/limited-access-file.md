---
title: "Limited Access File"
type: document
tags: [census, elections, blackout, cash-conversion, client-input]
created: 2026-05-03
updated: 2026-05-03
sources: 1
status: current
---

# Limited Access File

A census variant the client provides during an **open period** right before the plan goes into blackout. Lets participants update their allocations (and occasionally other elections) immediately before liquidation. Used on **cash conversions**.

## Why It Exists

On a cash conversion, the prior record keeper liquidates everything to cash, wires it, and the money is reinvested at TransAmerica based on whatever each participant's current elections say on liquidation day. If a participant's elections are stale, the money lands in the wrong place and the participant has to file transfers afterward to fix it.

The limited access file gives participants one last chance to set elections cleanly **before** the wire arrives, so balances land where they want them on day one. No follow-up transfers needed.

## When It Applies

- **Cash conversions only.** Mapping conversions don't need it — money flows fund-to-fund per the [[fund-mapping]] regardless of participant elections.
- The client must have an open period built into their conversion timeline, before blackout starts.

## What It Contains

Primarily updated **allocations** (where future contributions go). Sometimes additional election changes — varies by client and plan design.

## Process

1. Client opens the limited access window for participants
2. Participants log in (at the prior record keeper or via a TA-provided portal, depending on plan setup) and update their allocations
3. At the end of the window, the client compiles the file and sends it to the DC
4. DC loads the elections — typically alongside or just after the [[census-data]] load, before liquidation day
5. On liquidation day, the wire arrives; the [[advanced-employer]] holds it; final files post and balances invest at the just-updated elections

## Relationship to the Base File

The [[base-file]] is the broad census/eligibility/YTD seed for every conversion. The limited access file is a narrower election-update file layered on top, only on cash conversions where the client opened the window. Most conversions never use one.

## See Also

- [[census-data]]
- [[base-file]]
- [[balance-import-cash]]
- [[blackout-notice]]
- [[defaulting-elections-eds]]
