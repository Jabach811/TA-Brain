---
title: "PARIS III"
type: entity
tags: [system, plan-administration, legacy-name]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# PARIS III

Plan administration system used for loan re-amortization, Plan Sponsor view, and participant views. Likely the legacy full name of [[p3]].

## Overview

PARIS III appears in source material (Loan Re-Amortization Procedures.md.txt, New Business Set-Up Process Flow.md.txt) as a plan administration system. Based on naming conventions, PARIS III is likely the full legacy name of the system referred to elsewhere in the wiki as [[p3]]. This needs confirmation.

## Key Facts

- Supports a **Plan Sponsor view** for navigating plan and participant data
- Supports participant-level views
- Used to re-amortize loans: locate the loan via Plan Sponsor view, select a reason and repayment frequency, and submit
- Referenced as a plan setup target in the [[plc]]'s New Business workflow (PARIS III system setup is one of the PLC's four core activities)

## Role in Plan Administration

PARIS III is where plan-level configuration and participant-level transactions meet. The [[plc]] sets up the plan in PARIS III during New Business onboarding. Steady-state operations — loan re-amortizations, participant views — continue in PARIS III after go-live.

## Connections

- [[p3]] — likely the shorthand/successor name for the same system (needs confirmation)
- [[plc]] — sets up plans in PARIS III
- [[psc]] — uses PARIS III for steady-state plan administration
- [[loan-reamortization]] — primary documented procedure performed in PARIS III
- [[pre-conversion-loan-analysis]] / [[post-conversion-loan-analysis]] — loan-data work that may cross into PARIS III views

## Open Questions

- **Is PARIS III the same system as [[p3]]?** Sources use both names. PARIS III sounds like a legacy full name; P3 like a shorthand. Confirm with the Systems team.
- What other procedures live in PARIS III vs. other TA systems?
- Which regions / plan types does PARIS III cover?

## See Also

- [[p3]]
- [[plc]]
- [[psc]]
- [[loan-reamortization]]
- [[pre-conversion-loan-analysis]]
- [[post-conversion-loan-analysis]]
