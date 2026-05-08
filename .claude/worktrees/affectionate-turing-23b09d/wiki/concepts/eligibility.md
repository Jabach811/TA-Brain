---
title: "Eligibility Processing"
type: concept
tags: [eligibility, p3, processing, auto-enrollment, final-files, ltpt]
created: 2026-04-14
updated: 2026-04-15
sources: 4
---

# Eligibility Processing

The process of enabling plan eligibility rules in P3 so the system begins applying them to participants. Always runs after [[deferrals]] — eligibility triggers system actions; deferrals must already be in place first.

## Core Rule

> **Eligibility triggers system actions. Deferrals must fill the system state first.**

Once eligibility is enabled, P3 begins running auto-enrollment logic, entry date calculations, and other automated processes. If deferrals aren't already posted, those actions will override or conflict with participant elections. Enable eligibility only when the system state is ready.

## What Eligibility Does

Enables the plan's eligibility rules in P3 per source. Once enabled:
- The system applies eligibility logic to participants (who qualifies, when they enter)
- Auto-enrollment triggers for participants without a deferral on file
- Eligibility dates and entry dates are calculated based on P3 rule configuration

## Data Sources (Preferred Order)

1. **Full client population data** — best case; most accurate and comprehensive
2. **Vendor data** — acceptable; may require validation
3. **Manual calculation** — least ideal; use only when client and vendor data are unavailable

The client decides which source to use. This decision must be confirmed before final files arrive.

## P3 Rule Engine

Eligibility in P3 is rules-driven and structured. Key rule types:

- **Class-based eligibility** — different classes (union, part-time, special groups) can have different eligibility rules. See [[plan-classes]].
- **Service requirements** — hours worked, months of service, or both; configured per source
- **Eligibility date vs. Entry date** — when a participant *becomes* eligible vs. when they *enter* the plan (may differ by plan design)
- **"ALL" class** — if the plan uses a single "ALL" class, eligibility is the simplest possible: minimal restrictions, everyone eligible on the same terms

## Which Sources to Process

**Only enable eligibility for sources that will receive contributions.** Never enable non-contributing sources — it creates unnecessary batch jobs and orphaned eligibility records.

The list of contributing sources comes from the [[source-mapping]] and the [[prd]] or [[onboarding-package]].

## Workflow

1. **Prepare the eligibility file** (from final files via [[eds]] layout)
2. **Send internal approval email** to QA, TC, and COM — use the standard template
   > Essence: "I'm about to start working. Go do your thing first."
   - Standard email template exists — do not write from scratch
   - Turnaround: same day, within the hour
3. **Wait for go-ahead** from QA/TC/COM before proceeding
4. **Enable in P3** — navigation: Plan → top left dropdown → Outsourcing Summary → Eligibility → Enable screen
   - Enable only contributing sources
5. **Load and process** eligibility
6. **Verify** — run queries, confirm results

## P3 Navigation

> Plan → top left dropdown → Outsourcing Summary → click Eligibility → Enable screen

## Auto-Enrollment Interaction

If a plan has auto-enrollment and a participant has **no deferral on file** when eligibility runs:
- The system auto-enrolls them at the default rate (e.g., 1%)
- This overrides what may be the participant's actual election

**Prevention:** [[deferrals]] must be loaded before eligibility. The auto-enrollment logic checks for an existing deferral — if one is present, the participant is skipped.

If auto-enrollment fires before deferrals are posted: technically reversible, but it's a pain. Don't let it happen.

## Eligibility Dates

Determined by one of three sources — client decides in advance:
- Straight from the client's records
- Straight from the prior vendor
- Calculated by the eligibility rules configured in P3

Eligibility cannot be pre-active in P3 before the DC enables it. It runs plan by plan.

## LTPT — Long-Term Part-Time Eligibility (Secure Act 2.0)

As of **January 1, 2025**, a new federal eligibility category applies to all 401(k) and 403(b) plans: **LTPT (Long-Term Part-Time) eligibility**.

**Rule:** Employees who work at least **500 hours in two consecutive 12-month eligibility computation periods** (age 21 minimum) become eligible to make elective deferrals — regardless of the plan's standard eligibility requirements.

**Key points for the DC:**
- LTPT employees can only make **elective deferrals** — not eligible for employer contributions unless they also meet standard eligibility
- New EDS status codes: **5** = Not eligible, kit mailed due to LTPT; **6** = Eligible, LTPT
- **Even excluded-class employees** (collectively bargained, non-resident aliens) should have hours tracked — in case they move to a covered class
- Hours data must be requested going back through the relevant computation periods; request **by pay period**
- The previous threshold was three consecutive years for 401(k); reduced to two as of January 1, 2025

See [[ltpt-eligibility]] for the full concept reference.

## SME

**[[scott-vrba]]** is the primary eligibility resource. Go to him for complex eligibility questions, unusual rule configurations, or anything outside standard class/service patterns.

## Characteristics

- **Rules-driven and structured** — consistent, predictable, driven by P3 configuration
- **Errors are recoverable** but reversals are painful — do it right the first time
- Much simpler than [[deferrals]] in terms of data complexity; the complexity lives in the P3 rule setup

## See Also

- [[deferrals]] — must be processed before eligibility
- [[eligibility-and-deferrals]] — overview of the relationship and sequence
- [[ltpt-eligibility]] — Long-Term Part-Time eligibility (Secure Act 2.0)
- [[final-files-processing]] — broader final files context
- [[plan-classes]] — class-based eligibility rules
- [[p3]] — system where eligibility is enabled
- [[scott-vrba]] — eligibility SME
- [[dc-onboarding-workflow]]
