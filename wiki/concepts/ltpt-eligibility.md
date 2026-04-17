---
title: "LTPT Eligibility (Long-Term Part-Time)"
type: concept
tags: [eligibility, ltpt, secure-act-2, part-time, deferrals, concept]
created: 2026-04-15
updated: 2026-04-15
sources: 1
---

# LTPT Eligibility (Long-Term Part-Time)

A Secure Act 2.0 eligibility requirement that entitles long-term part-time employees to make elective deferrals, even if they have not met the plan's standard eligibility rules. Effective January 1, 2025, the threshold is two consecutive 12-month periods with 500+ hours worked.

## Definition

LTPT (Long-Term Part-Time) eligibility is a federal mandate under the **Secure Act 2.0** that requires plan sponsors to allow certain part-time employees to participate in elective deferrals. It applies regardless of the plan's standard eligibility rules.

The key threshold: **500 hours in two consecutive 12-month eligibility computation periods** (age 21 minimum also applies).

## Why It Matters

Prior to this rule, many part-time employees were excluded from 401(k) and 403(b) plans by standard eligibility requirements (e.g., 1,000 hours/year). LTPT eligibility closes that gap. For the DC, this means:
- New data to track and load
- New participant status codes in EDS
- Hours data must be requested and loaded going back to the start of the computation periods
- Even excluded-class employees (e.g., union workers) may need hours tracked in case they switch to a covered class

## Current Rule (As of January 1, 2025)

| Item | Rule |
|------|------|
| Hours threshold | 500 hours per computation period |
| Consecutive periods required | **2** (reduced from 3 for 401(k) as of Jan 1, 2025) |
| Applies to | 401(k) and 403(b) plans |
| Minimum age | 21 |
| What they can do | Make elective deferrals only |
| What they cannot do | Receive employer contributions (unless they meet standard eligibility) |

## What Changed January 1, 2025

The Secure Act 2.0 reduced the required consecutive computation periods from **three to two** for both 401(k) and 403(b). This change means more part-time employees qualify sooner.

For plans converting to Transamerica after January 1, 2025: request **two years** of historic hours data (2023 and 2024 minimum). For plans converting earlier, the three-year requirement may still apply to some participants.

## Historic Hours Data to Request

For participants who have not met the plan's regular eligibility requirements:

| Plan Type | Computation Periods to Request |
|-----------|-------------------------------|
| 401(k) | 2023 and 2024 (two consecutive periods) |
| 403(b) | 2023 and 2024 (two consecutive periods) |

Hours should be requested **by pay period** from the client or prior record keeper.

## Who Is Exempt

LTPT eligibility rules **do not apply** to:
- Employees whose eligibility is based on **elapsed time** (not hours)
- Employees in an **excluded class** — such as collectively bargained employees or non-resident aliens — *while they remain in that class*

**Important:** Even exempt employees (excluded classes) should have hours tracked. If they move from an excluded class to a covered class, the LTPT clock should already have been running.

## EDS Status Codes

Two new eligibility status codes were introduced for LTPT:

| Code | Meaning |
|------|---------|
| **5** | Not eligible; kit mailed due to LTPT eligibility |
| **6** | Eligible, LTPT |

These codes are passed in from the payroll/census file. The client must be able to provide these codes or the data to derive them.

## Loading LTPT Data

When loading participants under LTPT eligibility:

**For Status 5 (not yet eligible, LTPT-tracked):**
- Client does not provide a consecutive-year counter
- Create pending records to true participants up due to LTPT (long-term part-time)
- Create pending records for when the participant will become fully eligible

**For Status 6 (LTPT eligible):**
- Load the LTPT entry date if provided
- If no date provided, the load job calculates it as the start of the third computation period (under old rules) or appropriate period under new rules
- Create rows on PES to indicate LTPT eligibility has been met
- Create pending records for when the participant next becomes eligible to become fully eligible (i.e., meets standard eligibility)

## Interaction with Standard Eligibility

LTPT is a **floor**, not a replacement for standard eligibility:
- A participant who qualifies via LTPT can only defer — no employer contributions
- Once the participant meets standard eligibility, they become fully eligible including employer contributions
- The system must track both LTPT status and standard eligibility status simultaneously

## Evidence / Examples

From the DC Training Notebook (June 10, 2024 / January 1, 2025 effective):
- Plans are updated in NBI with conversion steps for LTPT handling
- Training presentations available: `LTPT - Training Presentation 3.24.24.pptx` and `LTPT Regulatory Project_01.25.2024.pptx`

## Related Concepts

- [[eligibility]] — Standard eligibility processing
- [[deferrals]] — Deferral loading (LTPT participants can only defer)
- [[eds]] — EDS layout must support status codes 5 and 6
- [[plan-classes]] — Class-based eligibility; excluded classes and the LTPT tracking exception

## See Also

- [[eligibility]]
- [[deferrals]]
- [[eligibility-and-deferrals]]
- [[eds]]
- [[plan-classes]]
- [[lm-dc]]
