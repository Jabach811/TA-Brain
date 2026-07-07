---
title: "Forfeiture Loading"
type: process
tags: [forfeitures, balance-import, census, dummy-participant, conversion]
created: 2026-05-03
updated: 2026-05-03
sources: 1
status: current
---

# Forfeiture Loading

When a balance file from the prior record keeper includes forfeiture entries, the DC loads them as participant-shaped records using a **stand-out date convention** so they're never mistaken for real participants.

## Why Forfeitures Show Up

Forfeitures are amounts that left a participant's account when they terminated without being fully vested — they sit in a plan-level pool until the plan sponsor uses them (to offset employer contributions, pay plan expenses, etc.). When a plan converts, the prior record keeper often delivers these balances as separate line items in the balance file, named for the year they belong to or the source they came from.

## Naming Convention

Match the vendor's naming. Common patterns:

- `2023 FORFEITURE` (year-based — most common)
- `MATCH FORFEITURE` (source-based)
- Whatever string the vendor used

Keeping the vendor's name makes the audit trail easy to reconcile back to the original file.

## Stand-Out Dates

Use the same date convention as the [[dummy-participant]] so forfeiture entries are visually obvious in any participant list:

| Field | Value |
|-------|-------|
| Date of Birth | **12/25/1955** |
| Date of Hire | **12/25/1985** |

Anytime one of these shows up in a query result or a P3 screen, it's an immediate signal: **this is not a real participant — handle it differently.**

## Loading

Load through the standard [[census-data]] flow alongside (or just before) the balance import. The forfeiture record needs to exist in the system before the [[balance-import]] runs so the balance has somewhere to land.

## See Also

- [[dummy-participant]] — same date convention; same "this is not a real person" pattern
- [[balance-import]]
- [[census-data]]
- [[source-mapping]]
