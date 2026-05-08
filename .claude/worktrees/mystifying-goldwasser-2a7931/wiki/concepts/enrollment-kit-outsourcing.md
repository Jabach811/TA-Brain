---
title: "Enrollment Kit Outsourcing"
type: concept
tags: [concept, enrollment-kits, trs, pod, setup, mailings]
created: 2026-04-17
updated: 2026-04-17
sources: 4
---

# Enrollment Kit Outsourcing

The configuration decision for each plan about who mails enrollment kits to newly eligible participants — Transamerica's [[trs]] fulfillment team, or the client themselves.

## Definition

Enrollment kit outsourcing is the P3 setup that controls whether kits are mailed by [[trs]] (TA-outsourced) or retained by the client for self-distribution. It pairs with [[auto-enrollment-setup]] and [[eligibility]] to form the trio of services configured together during final setup.

## Why It Matters

Participants receive their first detailed plan materials via the enrollment kit. Kits must arrive **6 weeks before the plan entry date** (per `Eligibility_Auto%20Enroll_Enrollment%20kit%20services%20setup.md.txt` and `System_Set_up_for_Eligibility_Auto_Enroll_Enrollment_kit_services.md.txt`) so participants can make an affirmative election or opt out before auto-enrollment begins.

Miss the 6-week window and:
- Kits go out late (or not at all)
- Participants may be auto-enrolled before they see the materials
- Client escalation follows

## PoD On Hold

During setup, the [[pod-plan-of-distribution]] is typically held at **On Hold** status. This prevents kit and confirm output from flowing to production while eligibility, deferrals, and auto-enrollment are still being validated. PoD flips to active only when the DC confirms setup is complete.

## Mailing Paths

| Path | Mailer | Typical Trigger |
|------|--------|-----------------|
| TRS-outsourced | [[trs]] | Client wants hands-off fulfillment |
| Client self-mailed | Client | Client has their own fulfillment infrastructure |

## Pending Enrollment Kit Analysis

Per `Pending%20Enrollment%20Kit%20Analysis.md.txt`, once eligibility and kit outsourcing are configured and batch has run, the DC runs the Pending Enrollment Kit Analysis to:
- Surface participants scheduled to receive kits while PoD is still On Hold
- Show real and projected kit mail dates
- Validate the target population against the conversion strategy
- Remove incorrect kit rows if the population is wrong

This is how the DC catches setup errors before kits start leaving the building.

## Evidence / Examples

- The 6-week lead-time rule appears in both setup files
- PoD On Hold posture called out as the default during configuration
- Pending Kit Analysis is the go-to validation tool before flipping PoD active

## Related Concepts

- [[auto-enrollment-setup]] — sister configuration
- [[pod-plan-of-distribution]] — status that gates kit output
- [[trs]] — outsourced mailing fulfillment
- [[welcome-confirm-samples]] — adjacent mailing deliverable

## See Also

- [[eligibility]]
- [[p3]]
- [[lm-dc]]
