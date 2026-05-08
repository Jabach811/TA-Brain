---
title: "Plan Consultant (PLC)"
type: role
tags: [role, plc, new-business, plan-setup, conversion]
created: 2026-04-17
updated: 2026-04-17
sources: 3
---

# Plan Consultant (PLC)

Owns plan-level setup during New Business onboarding — PPR prep, PARIS III configuration, Plan Service Checklist completion, and funding document processing.

## What This Role Does

The PLC is the plan-configuration counterpart to the [[lm-dc]] during New Business setup. Where the DC owns participant-level data conversion, the PLC owns plan-level build work: installing the plan's rules and mechanics in the administration systems before the data lands on top of them.

Core activities (from New Business Set-Up Process Flow.md.txt):
- **Prior Plan Review (PPR) preparation and review** — assembles the PPR using documents gathered by [[com]] from the prior carrier
- **PARIS III system setup** — configures the plan in [[paris-iii]] (see also [[p3]])
- **Plan Service Checklist completion and sign-off** — the plan-level checklist that captures setup decisions and approvals
- **Funding document processing and authorization** — preparing and routing documents required to fund the plan

## Systems They Use

| System | Purpose |
|--------|---------|
| [[paris-iii]] | Plan administration setup |
| [[p3]] | Plan configuration (related platform) |
| [[nbi]] | Project tracking and plan milestones |

## Who They Work With

| Team / Person | Nature of Relationship |
|---------------|----------------------|
| [[com]] | Transition Manager (TM) who routes plan docs, owns meeting cadence, and distributes submission packages |
| [[lm-dc]] / [[lm-dc]] | Data-side counterpart; PLC sets the plan up, DC loads data into it |
| [[sales-consultant]] | Upstream handoff — PLC inherits the plan context created during sales/TOA |
| [[pricing-consultant]] | Pricing decisions reviewed during PPR |
| [[tc]] | Transition Consultant; coordinates on funding and checklist items |

## Key Handoffs

**Comes in:**
- PPR source documents via [[com]] (from prior carrier / Plan Services)
- Signed [[toa]] and [[cccs-submission-package]] from sales
- Funding instructions from the plan sponsor

**Goes out:**
- Completed PPR to the internal project team
- PARIS III plan build (signals DC that plan is ready for data setup)
- Signed Plan Service Checklist
- Authorized funding documents

## What Other Teams Should Know

- The PLC is distinct from the [[psc]] (Plan Services Consultant). PLC works during New Business setup; PSC takes the plan over after go-live.
- PLC owns plan-level configuration. Participant-level data questions go to the [[lm-dc]], not the PLC.
- The Plan Service Checklist is the PLC's primary control document — a missing or unsigned checklist is a red flag.

## Open Questions

- PLC's exact ownership boundaries vs. [[doc-ops]] for P3 special class setup
- Whether PLC carries a portfolio of plans or is assigned per-conversion
- PLC's touchpoints with [[qa]] and [[qa]] during setup audit

## See Also

- [[psc]]
- [[com]]
- [[lm-dc]]
- [[lm-dc]]
- [[pricing-consultant]]
- [[sales-consultant]]
- [[new-business-setup]]
- [[paris-iii]]
- [[plan-conversion-handoffs]]
