---
title: "Quality Assurance (QA)"
type: coordination
tags: [role, qa, qc, validation, conversion, audit]
created: 2026-04-14
updated: 2026-07-08
sources: 2
status: current
---

# Quality Assurance (QA)

Audits conversion data, setup, defaults, and participant records so the plan can go live without silent setup errors.

## What they own

- Validation of imported conversion records and participant assets in [[p3]]
- Approval of your fund and source mapping (jointly with [[tc]], routed via COM)
- The go-ahead on the eligibility gate (jointly with TC)
- Default allocation / default deferral / QDIA checks, loan analysis, duplicate-SSN checks
- The CSR / go-live quality summary that COM sends to the client

## What you hand them

- **Fund/source mapping documents for approval** — routed through COM
- **Eligibility notification email** — to QA + TC + COM, only after deferrals are posted and data is in good order
- **Conversion records, assets, and audit evidence** — imported data, census details, [[audit-pack]] materials for their review

## What they hand you

- **Mapping and default validation** — approval back via COM
- **Eligibility go-ahead** — jointly with TC; required before you enable eligibility in P3
- **Audit findings and corrections** — issues in imported data, mapping, duplicates, or source/fund setup that you fix before go-live

## When to contact them / escalation

- Loop QA in early on conversion strategy — QDIA, defaults, loans, divisions, duplicate SSNs. The later they see it, the less room they have to catch problems before access turns on
- QA validates; TC sets up. Send setup questions to TC, validation questions and audit evidence to QA
- Corrections QA can't make through standard tools go to [[prod-support]]

## Common issues

- Mapping approval delayed because QA wasn't looped in promptly — pushes liquidation prep
- Eligibility enabled before QA's go-ahead
- Audit evidence delivered late, compressing the review window before access is turned on

## See Also

- [[tc]]
- [[go-live-checklist]]
- [[audit-pack]]
- [[source-mapping]]
- [[fund-mapping]]
- [[eligibility-and-deferrals]]
- [[plan-conversion-handoffs]]
