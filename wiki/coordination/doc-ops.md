---
title: "Document Operations (Doc Ops)"
type: coordination
tags: [role, doc-ops, documents, p3, plan-setup, pep]
created: 2026-04-14
updated: 2026-07-08
sources: 2
status: needs-review
---

# Document Operations (Doc Ops)

Sets up plan details in [[p3]] and adds new special plan classes — the one setup change a DC cannot make directly.

## What they own

- Plan setup / P3 configuration, including plan-class rules from the [[prd]] or [[onboarding-package]]
- Adding **new** special plan classes in P3 (DC-only boundary: you can update existing class names and codes, but only Doc Ops can add new classes — see [[plan-classes]])
- PEP plan document handling (OBP, AAA, Secure 2.0, SPD) — routed by COM, doesn't touch you

## What you hand them

- **Special class addition request** — when the plan design requires a class that doesn't exist in P3. Exact request channel (email vs. ticket vs. AWD) is not yet documented; ask your team lead
- **Setup discrepancy flags** — if P3 setup doesn't match the PRD/onboarding package, flag it; COM and Doc Ops coordinate the fix

## What they hand you

- **P3 setup readiness** — plan structure, classes, sources, eligibility, vesting, divisions available in P3. You review and verify before finalizing specs and downstream files. Setup can land before or after your assignment; earlier is better for starting specs

## When to contact them / escalation

- As soon as you identify the need for a new special class — Doc Ops has its own queue and waiting on them is a timing dependency
- P3 setup blocking your specs — chase readiness through COM if the setup lane is unclear

## Common issues

- DC tries to add a special class directly in P3 — this will fail; only Doc Ops can
- Class addition sits in the Doc Ops queue while your spec work is blocked — request early
- P3 not ready when you need to validate plan rules — you're blocked on specs until it is

## See Also

- [[plan-classes]]
- [[p3]]
- [[roles/lm-dc]]
- [[prd]]
- [[onboarding-package]]
- [[plan-conversion-handoffs]]
