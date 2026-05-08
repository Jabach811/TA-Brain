---
title: "Base File"
type: concept
tags: [document, census, data, client, seeding]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Base File

The census template provided to the client that seeds the TransAmerica system with participant data. This is the foundation of all participant-level data at conversion.

## Overview

The base file is a structured template that TransAmerica provides to the plan sponsor (client). The client fills it out with data about their participants and returns it. The DC uses this data to seed [[p3]] with census information before the conversion.

## Who's Included

Priority order for who should appear on the base file:

1. **Participants with balances** — active or termed — always include
2. **Currently eligible participants** — even if no balance yet
3. **Soon-to-be-eligible participants** — anyone approaching eligibility in the near future
4. **Employment records going back a few years** — good practice for rehire scenarios
5. **Termed participants without balances** — lower priority but useful for rehire history

> The goal: don't over-populate with unnecessary records (terms without balances), but don't under-populate and miss anyone who matters.

## Data Fields

### Participant Demographics
- Name, SSN, date of birth, date of hire, date of termination (if applicable)
- Address
- Employee ID

### Status & Eligibility
- Employment status (active / termed)
- Eligibility date
- Entry date

### Year-to-Date Data
- YTD contributions by source
- YTD compensation
- Prior year compensation (if needed by plan)
- Current year hours (if plan tracks hours)
- Prior year hours (if applicable)

### Deferral Information
- Deferral elections per source
- Dollar amount or percentage flag

### Other
- Plan-specific fields as needed (varies by plan)

## Process

1. DC builds the template based on PRD/OB plan provisions
2. DC schedules meeting with client to walk through every field
3. Meeting covers: required fields, date formats, number formats, what each column means
4. Client fills out and returns
5. DC reviews — may take several back-and-forth rounds
6. Large plans or clients with multiple payroll sources = expect more iterations

> Clients vary widely in technical expertise. Read them early and plan accordingly.

## Format and Template

- **Format:** Excel
- **Template:** Standard TA template. DC does not build from scratch — trims and tailors it to the client's specific plan details (relevant fields, plan-specific sources, etc.)

## A Note on "Sources"

In the context of the base file, **sources** means plan-specific contribution sources — things like EE Deferrals, ER Match, profit sharing. Not payroll vendors or payroll systems. The base file handles one set of sources per plan.

## Data Quality: Client's Responsibility

When a client returns a base file with data quality issues:
- DC reviews the file and identifies the problems
- DC sends **feedback and specific instructions** to the client explaining what needs to change
- **The client fixes it and returns a clean file** — the DC does not modify client data themselves

This loop repeats until the file is clean.

## Loading Timing

- **Census data** (participant population) → loaded as soon as the population is confirmed
- **Everything else** (YTD, deferrals, etc.) → typically loaded at the time of conversion, to ensure data is current and accurate rather than stale from months earlier

## Relationship to Payroll Template

The base file and [[payroll-template]] share the same ~75% census section. The payroll template extends it with contribution and payroll-specific fields.

## See Also

- [[payroll-template]]
- [[final-files-processing]]
- [[p3]]
- [[eds]]
- [[dc-onboarding-workflow]]
