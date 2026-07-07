---
title: "Quality Assurance (QA)"
type: role
tags: [role, qa, qc, validation, conversion, audit]
created: 2026-04-14
updated: 2026-05-13
sources: 2
---

# Quality Assurance (QA)

Audits conversion data, setup, defaults, participant records, and financial-risk items so the plan can go live without silent setup errors.

## What This Role Does

QA/QC is the conversion control partner. The role validates the accuracy of conversion records and participant assets, reviews mapping and setup decisions, checks default allocations and default deferrals, supports participant website testing, reviews statement-related work, and helps catch financial-risk issues in recordkeeping setup.

The earlier wiki page captured QA mostly from the DC perspective: mapping approval, eligibility clearance, and audit pack review. [[tc-stuff]] adds the setup-control view: QC also checks TC's recordkeeping audit, works with TC on statements and website testing, loads or supports target-date/default setup, and documents findings for TC/DC.

## Systems They Use

| System / Artifact | How QA/QC Uses It |
|---|---|
| [[p3]] | Reviews recordkeeping setup, defaults, participant data, loans, divisions, and participant access behavior. |
| [[aqt]] | Supports ad hoc reporting and validation when query-based evidence is needed. |
| [[wx]] / DDOL | Supports test participant website audits and participant-facing access validation. |
| Audit Control Checklists | Documents signoff and evidence for system and conversion controls. |
| Conversion Summary / CSR | Provides or supports go-live summary information. |

## Key People

| Name | Notes |
|---|---|
| **Paul** | QA/QC team member; last name unknown. |
| **Danny** | QA/QC team member; last name unknown. |

## Who They Work With

| Team | Nature of Relationship |
|---|---|
| [[tc]] | Quality-checks TC system audit items, supports DDOL/PSD testing, statements, enrollment kits, and go-live controls. |
| [[lm-dc]] | Reviews imported data, mapping, census details, duplicate SSNs, conversion records/assets, and source/fund setup impacts. |
| [[com]] | Provides audit/CSR information that COM may route to the client at go-live. |
| [[prod-support]] | May support system corrections, loan PoG setup, participant notes, or special service setup. |

## Key Handoffs

**Comes in:**
- Conversion records/assets and audit evidence from DC.
- TC system setup package, DDOL/VRU/PSD readiness, statements, and participant website test needs.
- Conversion strategy, QDIA/default setup, and plan-specific provisions.

**Goes out:**
- Audit findings and corrections.
- Mapping and default validation.
- Loan analysis and participant-note setup support.
- Website/statement audit feedback.
- CSR or go-live quality summary support.

## What Other Teams Should Know

- QA/QC is not only a final reviewer. They participate in control design during setup, especially where financial risk or participant-facing errors can appear.
- QC review is strongest when they know the conversion strategy early: QDIA, default allocation, default deferral, loans, divisions, duplicate SSNs, and statement handling.
- TC and QA/QC are paired but not interchangeable. TC prepares/administers; QA/QC validates and documents risk.
- If participant test IDs, enrollment kits, statement audits, or default setup are late, QA/QC has less room to catch problems before access is turned on.

## Open Questions

- Should the wiki standardize the page title as QA or QC for this role?
- What are Paul and Danny's last names and current responsibilities?
- Which QC checklist is current for system audit, participant website audit, and go-live?
- Which tasks listed in the legacy source have moved to other teams?

## See Also

- [[tc-stuff]]
- [[tc]]
- [[go-live-checklist]]
- [[audit-pack]]
- [[source-mapping]]
- [[fund-mapping]]
- [[eligibility-and-deferrals]]
- [[plan-conversion-handoffs]]
