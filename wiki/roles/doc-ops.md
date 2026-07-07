---
title: "Document Operations (Doc Ops)"
type: role
tags: [role, doc-ops, documents, p3, plan-setup, pep]
created: 2026-04-14
updated: 2026-06-25
sources: 2
status: needs-review
---

# Document Operations (Doc Ops)

Document Operations supports plan setup, plan document handling, and special plan class setup during a conversion. Current documentation is mostly from DC and COM perspective, so this page should be treated as a working role map until a direct Doc Ops source is ingested.

## What This Role Does

Doc Ops appears in the wiki in two operating lanes:

1. **Plan setup / P3 configuration**
   - Sets up plan details in [[p3]].
   - Adds new special plan classes when the plan design requires classes that do not already exist.
   - Supports plan-class rules that come from the [[prd]] or [[onboarding-package]].

2. **Plan documents / communications support**
   - Receives document workflow inputs from [[roles/com]].
   - For PEP plans, provides or supports OBP, AAA, Secure 2.0 amendment, and SPD document handling.
   - Includes a Communication Consultant function tied to conversion newsletter coordination.

## Boundaries

| Work Area | Doc Ops Role | DC / COM Boundary |
|---|---|---|
| New special classes | Adds the class in P3 | [[roles/lm-dc]] identifies need and requests the addition |
| Existing class names/codes | Not the primary owner in current notes | DC can update existing class names and codes |
| PRD / onboarding package conflicts | Coordinates with COM when setup does not match documents | DC flags discrepancy; COM and Doc Ops coordinate fix |
| PEP plan documents | Provides or supports OBP, AAA, Secure 2.0, SPD | COM routes and tracks document execution |
| Conversion newsletter | Communication Consultant role participates | COM coordinates the checklist and collects address/email files |

## Key Handoffs

### Special Plan Classes

- **From:** [[roles/lm-dc]] to Doc Ops
- **Trigger:** Plan requires a new special class not already available in P3
- **What moves:** Request for class addition
- **Doc Ops action:** Adds the class in P3
- **Risk:** DC cannot add these directly; waiting on Doc Ops can become a timing dependency

### P3 Setup Readiness

- **From:** Doc Ops / setup workflow to [[roles/lm-dc]]
- **Trigger:** Plan setup becomes available in P3
- **What moves:** P3 plan structure, classes, sources, eligibility setup, vesting, divisions
- **DC action:** Reviews and verifies setup before specs and downstream files are finalized
- **Risk:** If P3 is not ready, the DC may be blocked from completing specs or validating plan rules

### PEP Plan Documents

- **From:** Doc Ops / docs team to [[roles/com]]
- **Trigger:** PEP plan document workflow
- **What moves:** OBP, AAA, Secure 2.0 amendment, SPD, and related plan document materials
- **COM action:** Routes documents for review, signature, and client-facing execution

## Known References

- [[plan-classes]] documents the clearest Doc Ops boundary: new special classes are Doc Ops only.
- [[p3]] notes that P3 setup can happen before or after DC assignment, and earlier setup helps the DC begin specs.
- [[roles/com]] documents Doc Ops interactions in the PEP plan document workflow and conversion newsletter workflow.
- [[plan-conversion-handoffs]] captures Doc Ops as part of the conversion handoff model.

## Source Notes

This page is assembled from [[sources/com-main-checklist]], [[plan-classes]], [[p3]], [[roles/lm-dc]], and [[plan-conversion-handoffs]]. It is still `needs-review` because there is no direct Doc Ops procedure source or role interview yet.

## Open Questions

- What is the exact request channel for special class additions: email, ticket, AWD, or another queue?
- What fields does Doc Ops require when a new special class is requested?
- Which P3 setup steps are owned by Doc Ops versus another setup team?
- What does the Communication Consultant function own inside Doc Ops?
- What Doc Ops tasks are PEP-only versus applicable to all plans?
- What systems does Doc Ops use beyond P3, DocuSign-adjacent document routing, and internal document queues?

## See Also

- [[roles/lm-dc]]
- [[roles/com]]
- [[plan-classes]]
- [[p3]]
- [[plan-conversion-handoffs]]
- [[prd]]
- [[onboarding-package]]
