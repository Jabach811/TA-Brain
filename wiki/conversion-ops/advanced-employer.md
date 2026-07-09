---
title: "Advanced Employer Account"
type: conversion-ops
tags: [advanced-employer, cash-conversion, liquidation, balances, p3]
created: 2026-04-14
updated: 2026-05-03
sources: 3
status: current
---

# Advanced Employer Account

A temporary holding account in P3 used during cash conversions to park the incoming wire until participant-level balance posting can occur.

## Definition

On liquidation day for a cash conversion, the prior record keeper wires all plan assets as pooled cash. That money cannot be allocated to participant accounts immediately — final files haven't arrived yet. The Advanced Employer (AE) account holds the lump sum in P3 as a temporary placeholder until the DC can run the participant balance workflow.

## Why It Exists

In a cash conversion, assets arrive as undifferentiated cash with no per-fund or per-participant breakdown. The AE account is the system's way of acknowledging that the money has arrived and is parked safely while the DC waits for the authoritative final data.

## Lifecycle

1. **Liquidation Day:** Wire received → DC verifies total matches vendor breakdown → DC moves money to AE account in [[p3]] (via [[p2]] ref number)
2. **Notification:** DC emails QA, COM, and PC confirming wire received and posted to Advanced Employer. Standard wording: *"Wire has been booked and transferred to the Advanced Employer account, where it will be liquidated when final records are available."*
3. **Waiting period:** DC waits for final files from the prior record keeper. AE accrues a small interest while sitting.
4. **Final Files Arrive:** DC emails [[stacey-fortune]] or [[nick-lister]] requesting AE liquidation
5. **After liquidation:** DC creates the **AE liquidation ref number** and attaches it to the CIT balance workflow parameter file → runs CIT balance workflow in [[informatica]] → posts participant balances → P3 processes with Immediate + Batch mode (trades go out)
6. **Reverse [[dummy-participant]]** via ROC tool in P3
7. **Next business day:** DC distributes the accrued AE interest pro-rata to participants — see [[subsequent-cash-imports]]

## Requesting AE Liquidation

A simple email to [[stacey-fortune]] and/or [[nick-lister]]:
> "Please liquidate the Advanced Employer account for [Plan Name] so I can proceed with balance posting."

Either contact can handle the request. No complex process — just the email.

## Cash Conversion Only

The Advanced Employer account is used **only in cash conversions**. Mapping conversions use a dummy participant account instead. TIK conversions do not require either mechanism.

## P2 Involvement

Setting up the AE account transfer reference number is done in [[p2]] — the same back-end ref number creation process used for fund-level ref numbers in mapping conversions, applied to the AE account here.

## See Also

- [[conversion-types]]
- [[liquidation-day]]
- [[final-files-processing]]
- [[p2]]
- [[p3]]
- [[informatica]]
- [[stacey-fortune]]
- [[nick-lister]]
- [[dummy-participant]]
- [[subsequent-cash-imports]]
