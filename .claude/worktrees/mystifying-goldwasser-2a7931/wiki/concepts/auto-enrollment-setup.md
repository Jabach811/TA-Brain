---
title: "Auto-Enrollment Setup"
type: concept
tags: [concept, auto-enrollment, p3, deferrals, setup, enrollment-kits]
created: 2026-04-17
updated: 2026-04-17
sources: 4
---

# Auto-Enrollment Setup

The P3 configuration that enables a plan to automatically enroll newly eligible participants at a default deferral rate, with optional annual escalation, when no affirmative election is on file.

## Definition

Auto-enrollment setup is the combination of P3 configuration tabs and effective dates that govern default deferral behavior for new entrants. It is configured alongside [[eligibility]] and [[enrollment-kit-outsourcing]] and is one of the most error-prone areas of conversion setup because it interacts with [[deferrals]] processing and timing.

## Components in P3

Auto-enrollment spans three P3 tabs (per `AUTO%20ENROLLMENT.md.txt`):

- **Sources Tab** — identifies which sources receive default deferrals under auto-enrollment
- **Payroll Deduction / Outsourcing Tab** — configures how the default rate flows to payroll
- **Auto-Escalation Setup** — annual step-up logic (e.g., +1%/year up to a 10% cap)

## Key Dates

- **Auto-Enroll Effective Date** — the date auto-enrollment eligibility logic starts firing in P3
- **Auto-Escalation Effective Date** — the date annual step-ups begin
- **Auto-Escalation Increase Date** — the month/day each year that step-ups post

## The Four Setup Scenarios

Per `System_Set_up_for_Eligibility_Auto_Enroll_Enrollment_kit_services.md.txt`, every plan falls into one of four combinations that determine setup steps:

1. **No Auto-Enroll / Client mails kits** — client retains kit distribution; only eligibility configured
2. **No Auto-Enroll / TRS mails kits** — [[trs]] mails kits; no default election logic
3. **Auto-Enroll / TRS mails kits** — full P3 auto-enroll + TRS fulfillment
4. **Auto-Enroll / Client mails kits** — full P3 auto-enroll + client-side fulfillment

Each scenario has a distinct P3 setup sequence.

## Why It Matters

- Misconfigured auto-enrollment fires *before* deferrals are loaded, overwriting participant elections at the default rate (see [[deferrals]] ADP problem).
- Wrong auto-escalation dates put participants at the wrong rate year after year.
- Missing kit mail dates mean participants learn about the plan too late to opt out.

The **6-week lead time** (see [[enrollment-kit-outsourcing]]) is the anchor: kits must mail 6 weeks before plan entry so participants can opt out before auto-deferrals begin.

## Evidence / Examples

- `AUTO%20ENROLLMENT.md.txt` lists the three component tabs and two key-date types.
- `Auto_Enroll_and_Enroll_Kit_Analysis.md.txt` describes validating the auto-enrolled population by running the Default Status query, isolating deferral defaults only, and comparing against the Eligible query.
- `Eligibility_Auto%20Enroll_Enrollment%20kit%20services%20setup.md.txt` confirms the **6-week lead time** and **PoD On Hold** posture during setup.

## Validation

Per `Auto_Enroll_and_Enroll_Kit_Analysis.md.txt`, confirm:
- Correct hire, eligibility, entry, and kit mail dates
- Population aligns with the auto-enroll strategy agreed with the client
- Defaulted deferrals isolated and reconciled against the eligible universe

See also [[default-deferral-analysis]] for the downstream audit.

## Related Concepts

- [[enrollment-kit-outsourcing]] — kit distribution arm of the same setup
- [[deferrals]] — must be loaded before eligibility to avoid overwrite
- [[eligibility]] — runs after deferrals are clean
- [[default-deferral-analysis]] — post-setup validation
- [[pod-plan-of-distribution]] — On Hold status during setup

## See Also

- [[trs]]
- [[p3]]
- [[lm-dc]]
- [[scott-vrba]]
