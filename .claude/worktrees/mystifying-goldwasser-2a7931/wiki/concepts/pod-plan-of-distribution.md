---
title: "PoD — Plan of Distribution"
type: concept
tags: [concept, p3, pod, status, setup, enrollment-kits]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# PoD — Plan of Distribution

A P3 status state that controls whether automated mailings — enrollment kits, confirms — flow to production output for a plan.

## Definition

PoD (Plan of Distribution) is the gating switch in P3 for plan-level mailing output. While a plan is being configured, PoD is typically set to **On Hold**, which suppresses kit and confirm generation. Once setup is validated, the DC flips PoD to active and production mailings resume.

## Why It Matters

PoD is the last line of defense against mis-mailings during setup. If eligibility, deferrals, or auto-enrollment is wrong, PoD On Hold prevents thousands of incorrect kits from leaving the building while the DC investigates. Flipping PoD active prematurely — before [[pending-enrollment-kit-analysis]] is clean — can trigger mass mis-mailings that the client will escalate immediately.

## Evidence / Examples

- `Eligibility_Auto%20Enroll_Enrollment%20kit%20services%20setup.md.txt` notes **"PoD initially set to On Hold"** as the standard posture during setup
- `Pending%20Enrollment%20Kit%20Analysis.md.txt` identifies participants scheduled to receive kits *while PoD is On Hold* — the analysis validates the population before the DC releases the hold

## Related Concepts

- [[enrollment-kit-outsourcing]] — PoD governs kit output
- [[auto-enrollment-setup]] — same configuration phase
- [[welcome-confirm-samples]] — confirms also subject to PoD state

## See Also

- [[p3]]
- [[trs]]
- [[lm-dc]]
