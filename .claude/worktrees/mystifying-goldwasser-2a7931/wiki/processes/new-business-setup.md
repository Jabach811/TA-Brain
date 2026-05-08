---
title: "New Business Setup Process Flow"
type: process
tags: [process, new-business, onboarding, conversion, setup]
created: 2026-04-17
updated: 2026-04-17
sources: 4
---

# New Business Setup Process Flow

End-to-end lifecycle for onboarding a new retirement plan onto Transamerica's platform — from sales hand-off through system setup and post-conversion audit.

## Overview

New Business Setup is the umbrella workflow that the [[plan-conversion-handoffs]] process runs inside. Where plan-conversion-handoffs focuses on the hand-off graph between teams, this page sequences the setup lifecycle and names each role's contribution.

Sources: New Business Process Summary.md.txt, New Business Set-Up Process Flow.md.txt, NB CIT Transition Acct Consultants.md.txt, TOA_Procedures.md.txt.

## Trigger

A TOA ([[toa]]) is initiated by the [[sales-consultant]], which activates the New Business pipeline. This begins the chain of role engagements documented below.

## Steps

1. **TOA initiation** — [[sales-consultant]]
   - Creates the initial TOA using information gathered during sales
2. **Pricing review** — [[pricing-consultant]]
   - Reviews pricing in the TOA and clears for continuation
3. **Transition Manager kickoff** — [[com]] (Transition Manager / Communications Consultant)
   - Receives [[nsa]], schedules internal and external kickoffs
   - Creates project plan ([[project-plan-com]])
   - Distributes submission package ([[cccs-submission-package]] or [[subpack]])
4. **Plan Consultant setup** — [[plc]]
   - Prior Plan Review (PPR) preparation and review
   - PARIS III system setup ([[paris-iii]])
   - Plan Service Checklist completion and sign-off
   - Funding document processing and authorization
5. **Data setup** — [[lm-dc]] / [[lm-dc]]
   - Base file and payroll templates
   - Fund mapping from [[toa]]; source mapping from test files
   - EDS layout setup ([[eds]])
   - TIK re-registration form if Column T = Y
   - Audit pack assembly ([[audit-pack]])
6. **Transition Consultant work** — [[tc]]
   - QDIA notice, fee disclosure, enrollment guide, RDD form
   - AWD flips for contribution monitoring
   - Early access activation
   - Map key requests via [[serena]] for DB plans
7. **Conversion execution** — [[lm-dc]] + [[cashiering]] + [[com]]
   - Liquidation day ([[liquidation-day]])
   - Wire receipt, Day of Wire workflow in [[informatica]]
   - Balance posting and rebook
8. **Post-conversion audit** — [[qa]] / [[qa]]
   - Fund/source mapping audits ([[fund-mapping-audit]], [[source-mapping-audit]])
   - Wire-day audits ([[day-of-wire-audit]], [[day-after-wire-audit]])
   - FAA balance and allocation audits ([[faa-balances]], [[faa-allocations]])
   - Loan analyses ([[pre-conversion-loan-analysis]], [[post-conversion-loan-analysis]])
   - [[csr]] generation and delivery to [[com]]
9. **Go-live and transition to steady state** — [[com]] → [[psc]]
   - COM completes Audit Checklist in [[nbi]]
   - Plan is transitioned out of CIT (Conversion In Transition); [[psc]] assumes ownership

## Handoff Points

- [[sales-consultant]] → [[pricing-consultant]] → [[com]] → [[plc]] → [[lm-dc]] / [[lm-dc]] → [[tc]] → [[qa]] → [[psc]]
- Parallel engagement of [[qa]] / [[qa]] throughout for mapping approvals and audits
- [[com]] acts as routing hub across the full lifecycle

## Timing / Deadlines

- TOA signature gates the [[fund-mapping]] and [[transfer-in-kind]] steps
- Test file receipt gates [[source-mapping]]
- Re-registration form target: ~10–12 business days before liquidation
- Liquidation date is the spine of the execution sequence
- Go-live close-out: Audit Checklist in [[nbi]], Transition out of CIT date logged

## Failure Modes

| Failure | Impact |
|---------|--------|
| TOA stuck at any role before COM | Entire pipeline stalls; no downstream work can begin |
| PLC's Plan Service Checklist incomplete | Plan not properly configured before data load |
| PPR not completed in time | DC / PLC proceed on incomplete plan knowledge |
| Funding documents unauthorized | Plan cannot receive wire at liquidation |
| Audit pack missing pieces | QC cannot complete review; [[csr]] delayed |
| CIT transition date not logged | Plan sits in incomplete state in [[nbi]] |

## See Also

- [[plan-conversion-handoffs]]
- [[toa]]
- [[cccs-submission-package]]
- [[subpack]]
- [[audit-pack]]
- [[sales-consultant]]
- [[pricing-consultant]]
- [[com]]
- [[plc]]
- [[lm-dc]]
- [[lm-dc]]
- [[tc]]
- [[qa]]
- [[qa]]
- [[psc]]
- [[paris-iii]]
- [[liquidation-day]]
- [[csr]]
