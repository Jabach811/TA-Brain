---
title: "Loan Re-Amortization"
type: process
tags: [process, loan, reamortization, paris-iii]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Loan Re-Amortization

Adjusting the amortization schedule of an existing participant loan in [[paris-iii]].

## Overview

Loan re-amortization updates a loan's remaining payment schedule — e.g. after a missed-payment cure, a frequency change (bi-weekly → monthly), or a conversion event. The procedure runs entirely in [[paris-iii]] via the Plan Sponsor view.

## Trigger

- Participant or plan sponsor request (missed payments, frequency change)
- Conversion-related loan movement (see [[pre-conversion-loan-analysis]], [[post-conversion-loan-analysis]])

## Steps

1. **Locate the loan** — operator ([[lm-dc]] / [[psc]] / [[qa]] depending on context)
   - Navigate to the loan in PARIS III **Plan Sponsor view**
2. **Select reason and frequency** — operator
   - Choose the re-amortization reason (e.g., missed payments, frequency change)
   - Choose the new repayment frequency
3. **Submit the re-amortization request** — operator
   - Submit via PARIS III; the system applies the new schedule

## Handoff Points

- Single-operator procedure in most cases — no cross-team handoff required once the request is submitted
- Conversion context: DC may re-amortize as part of [[pre-conversion-loan-analysis]] cleanup before a plan converts

## Timing / Deadlines

- Source (Loan Re-Amortization Procedures.md.txt) does not specify. In practice, loans should be re-amortized before the next scheduled payment so the new schedule applies cleanly.

## Failure Modes

| Failure | Impact |
|---------|--------|
| Wrong reason code selected | Re-am reason audit trail is misleading; downstream reporting may flag |
| Wrong frequency selected | Loan payments come out on wrong schedule; participant-facing error |
| Submitting against the wrong loan | Adjusts an unrelated loan — requires reversal |

## See Also

- [[paris-iii]]
- [[loan-coupon-process]]
- [[pre-conversion-loan-analysis]]
- [[post-conversion-loan-analysis]]
- [[lm-dc]]
- [[psc]]
