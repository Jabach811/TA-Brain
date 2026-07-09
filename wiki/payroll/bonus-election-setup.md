---
title: "Bonus Election Setup"
type: payroll
tags: [concept, deferrals, bonus, p3, outbound-file]
created: 2026-05-13
updated: 2026-05-13
sources: 1
status: current
---

# Bonus Election Setup

Plan setup pattern for allowing participants to make separate regular and bonus deferral elections.

## Definition

Bonus election setup separates regular deferrals from bonus deferrals so each group can have its own minimum and maximum election behavior.

## Why It Matters

If regular and bonus deferrals are not grouped correctly, participants may be blocked from making a valid bonus election or may exceed expected limits in ways the plan did not intend. The source emphasizes source order, deduction type, and outbound-file display-name limits.

## Evidence / Examples

- Regular deferral sources should come first.
- Bonus deferral sources should follow regular deferral sources.
- Regular pre-tax and regular Roth deferrals are combined together.
- Bonus pre-tax and bonus Roth deferrals are combined together.
- Combined min/max on pre-tax sources should be N/A.
- Separate groups allow a participant to elect normal deferrals and a separate bonus deferral up to the plan limit for each group.

## Setup Notes

- Use special deduction types only for bonus deferrals:
  - Pre tax - Special Deduction
  - Roth 401K - Special Deduction
  - After Tax - Special Deduction
- Regular and bonus pre-tax should map to pre-tax deferral.
- Regular and bonus Roth should map to Roth 401(k).
- Payroll deduction display names have a 20-character OBF limit.
- A longer display name may require a customized outbound file and system work.

## Related Concepts

- [[deferrals]]
- [[payroll-template]]
- [[source-mapping]]
- [[p3]]

## See Also

- [[tc-stuff]]
- [[roles/lm-dc]]
- [[tc]]
