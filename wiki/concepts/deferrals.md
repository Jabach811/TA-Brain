---
title: "Deferral Processing"
type: concept
tags: [deferrals, auto-enrollment, p3, processing, final-files, adp]
created: 2026-04-14
updated: 2026-04-14
sources: 3
---

# Deferral Processing

The process of loading participant contribution elections into P3 during the final files phase. More complex and exception-heavy than [[eligibility]]. Must be loaded and verified before eligibility is enabled.

## Core Rule

> **Deferrals fill the system state. Eligibility triggers system actions.**

Deferrals define what elections are already in place. When eligibility runs, the system reads those elections before deciding whether to auto-enroll. If the state is wrong, the triggered actions will be wrong — and they're harder to unwind than eligibility errors.

## What Deferrals Are

Per-participant, per-source contribution elections:
- **Deferral rate** — dollar amount or percentage
- **Auto-enrollment start date (trigger date)** — when auto-enrollment began for each participant enrolled under default settings
- One election per source the participant contributes to

## Data Sources (Preferred Order)

1. **Client data** — preferred; most accurate for auto-enrollment details
2. **Vendor data** — acceptable for most elections; unreliable for auto-enroll dates (see ADP note below)
3. **Payroll data** — sometimes required; especially useful when client payroll systems have current contribution rates

The client decides which source to use. Confirm this before final files arrive.

## The Auto-Enrollment Problem

This is the most critical and error-prone part of deferral processing.

### What You Need to Capture

For every participant who is enrolled under auto-enrollment defaults:
- Their **current deferral rate**
- Their **auto-enrollment start date** (the date they were initially defaulted in)

### Why the Start Date Matters

Many plans have **escalation logic** (also called auto-escalation or step-up):
> Example: "Automatically increase the deferral rate by 1% each year, up to a cap of 10%."

To apply escalation correctly, P3 needs to know when auto-enrollment began. Without the start date, the system can't calculate how many escalation steps have already occurred, and participants may end up at the wrong rate.

### The ADP Problem

> **ADP does NOT reliably provide auto-enrollment dates.**

If the prior record keeper is ADP, you cannot trust their data to include accurate auto-enrollment start dates. The only reliable source is the **client**.

**What to do when ADP is the prior RK:**
1. Identify all participants who are in the auto-enrollment default
2. Request the auto-enrollment start dates from the **client** directly
3. If the client cannot provide them: assume those participants are **NOT in auto-enrollment default** (conservative assumption — avoids incorrect escalation)
4. Identify the impacted participants
5. **Notify the client** so they can communicate the correct election to their participants manually

This is a known limitation. Don't wait on ADP to provide it — go to the client first.

## Workflow

1. **Load deferrals FIRST** — before any eligibility action
2. **Identify auto-enrollment participants** — flag them separately
3. **Capture deferral rate and auto-enroll start date** for each auto-enrolled participant
4. **Handle ADP or missing start dates** per the process above
5. **Load through [[eds]]** — check output for warnings/errors
6. **Post to [[p3]]** and verify
7. **Ensure all elections and auto-enroll data is correct** before proceeding
8. **THEN proceed to [[eligibility]]** — only after deferrals are verified clean

## What Can Go Wrong

| Issue | Consequence | Recoverability |
|-------|-------------|----------------|
| Load eligibility before deferrals | Auto-enrollment fires and overwrites elections | Painful reversal — possible but messy |
| Missing auto-enroll start dates | Escalation logic runs incorrectly; wrong rates over time | Requires correction and client communication |
| Wrong deferral rates from vendor | Participants have incorrect elections in the new system | Discovered at next payroll; requires correction |
| ADP auto-enroll date trusted | Incorrect or missing start dates propagate | Go to client, not ADP |

> **Deferral errors are harder to unwind than eligibility errors. Prioritize accuracy upfront.**

## Characteristics

- **Data-driven and exception-heavy** — each plan has its own auto-enrollment rules, escalation logic, and vendor limitations
- More complex than [[eligibility]] in practice
- The difficulty is not the mechanics (loading through EDS is standard) — it's getting the right data, especially auto-enrollment dates

## See Also

- [[eligibility]] — must run after deferrals
- [[eligibility-and-deferrals]] — overview of the relationship and sequence
- [[final-files-processing]] — broader final files context
- [[p3]] — where deferrals are posted
- [[eds]] — how the deferral file is validated and loaded
- [[prior-record-keeper]] — source of vendor data (including ADP limitations)
- [[dc-onboarding-workflow]]
