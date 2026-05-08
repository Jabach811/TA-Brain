---
title: "Plan Services Consultant (PSC)"
type: role
tags: [role, psc, plan-services, post-conversion, steady-state]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# Plan Services Consultant (PSC)

Owns the plan after go-live — takes the hand-off from [[com]] once conversion is complete and runs the plan day-to-day in steady state.

## What This Role Does

The PSC is the steady-state counterpart to the conversion-side roles. Where [[lm-dc]], [[com]], [[plc]], and [[tc]] get a plan stood up and over the finish line, the PSC inherits the live plan and becomes its ongoing point of contact. Plan Services Consultants are one of the internal roles regularly evaluated by [[qa]] (per the NB CIT Transition Account Consultants process flow).

Primary responsibilities (inferred from NB CIT Transition Acct Consultants.md.txt):
- Post-conversion audits and verification of setup
- Ongoing loan and asset reviews
- Participant communications and access enablement
- Day-to-day plan administration issues escalated from service teams

## Systems They Use

| System | Purpose |
|--------|---------|
| [[p3]] | Core plan administration |
| [[paris-iii]] | Plan sponsor view, loan re-amortization, participant views |
| [[aqt]] | Read-only queries for investigation |

## Who They Work With

| Team | Nature of Relationship |
|------|----------------------|
| [[com]] | Transition Manager hands the plan off to PSC at go-live |
| [[qa]] / [[qa]] | PSCs are routinely audited; [[qa]] reviews their ongoing work quality |
| [[tc]] | Residual transition items cleared with TC |
| [[lm-dc]] | Occasional handback for data corrections after go-live |

## Key Handoffs

**Comes in:**
- Plan ownership handoff from [[com]] at go-live (Audit Checklist complete in [[nbi]])
- [[csr]] (Conversion Summary Report) as the plan's setup record
- Any open items listed on the final go-live call

**Goes out:**
- Ongoing participant service
- Escalations back to [[prod-support]] or [[lm-dc]] for post-conversion corrections
- Responses to [[qa]] audit findings

## What Other Teams Should Know

- PSC is the owner of the live plan. Questions about a post-conversion plan that show up on the DC or COM's desk should generally be routed to the PSC.
- PSCs are audited by [[qa]]/[[qa]] — the Quality Assessment of Internal Team Members process evaluates their work, not just conversion-side work.
- The [[plc]] (Plan Consultant) is a different role: PLC sets up new plans; PSC runs existing ones.

## Open Questions

- Size of a typical PSC book of business
- Exact triggers for escalation from PSC back to conversion-side teams
- How PSCs are assigned at go-live (by region, by client, by COM?)

## See Also

- [[com]]
- [[plc]]
- [[qa]]
- [[qa]]
- [[tc]]
- [[lm-dc]]
- [[csr]]
- [[plan-conversion-handoffs]]
