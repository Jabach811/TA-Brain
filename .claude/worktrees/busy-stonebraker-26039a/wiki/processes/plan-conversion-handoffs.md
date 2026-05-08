---
title: "Plan Conversion Handoffs"
type: process
tags: [process, conversion, handoffs, cross-team, onboarding]
created: 2026-04-14
updated: 2026-04-15
sources: 3
---

# Plan Conversion Handoffs

How work moves between teams during a retirement plan conversion at Transamerica, from assignment through go-live.

## Overview

A plan conversion involves at minimum six internal teams (DC, COM, QA, TC, Doc Ops, Cashiering) plus external parties (prior record keeper, payroll vendor). Each team has a distinct ownership zone; the risks live at the handoff points between them.

This page documents the handoffs — what moves, between whom, and when.

## Trigger

Two parallel triggers start a conversion:
- **COM trigger:** [[ellen-miller]] (or sales) issues an [[nsa]] (New Sale Announcement) → COM receives it → COM creates project plan and schedules kickoffs
- **DC trigger:** [[ellen-miller]] notifies a manager that a plan slot is open in NBI → manager assigns a DC → DC enters active pipeline

Both triggers happen around the same time; COM and DC are assigned to the same plan and should connect early.

## Handoff Map

### 1. Assignment → DC
- **From:** [[ellen-miller]] → manager → [[lm-dc]]
- **What moves:** Plan ID, NBI assignment
- **DC action:** Confirms assignment in NBI; reviews PRD or onboarding package

### 2. PRD / Onboarding Package → DC
- **From:** [[com]] → [[lm-dc]]
- **What moves:** Plan Review Document or Onboarding Package (eligibility, vesting, sources, classes)
- **DC action:** Reviews sections relevant to data setup; notes conversion type

### 3. Fund Mapping Approval
- **From:** [[lm-dc]] → [[com]] → [[qa]] + [[tc]]
- **Trigger:** TOA signed by client
- **What moves:** Fund mapping document
- **Approvers action:** Review and approve; return approval to DC via COM
- **Risk:** Delay here pushes back source mapping and CONV file prep

### 4. Source Mapping Approval
- **From:** [[lm-dc]] → [[com]] → [[qa]] + [[tc]]
- **Trigger:** Test files received from prior record keeper
- **What moves:** Source mapping document
- **Approvers action:** Review and approve
- **Risk:** If test files arrive late, this phase compresses everything downstream

### 5. Re-Registration Form (TIK only)
- **From:** [[lm-dc]] → [[matt-oconnell]]
- **Trigger:** TOA reviewed; any fund with column T = Y
- **What moves:** Re-registration form (DC fills out)
- **Timing:** Target ~10–12 business days before liquidation
- **Risk:** Too early = premature action; too late = liquidation can't proceed

### 6. Liquidation Day — Cashiering Loop
- **From:** [[lm-dc]] → [[cashiering]] (heads-up, day before)
- **From:** Prior record keeper → wire → [[cashiering]]
- **From:** [[cashiering]] → [[lm-dc]] (wire receipt + ref number)
- **What moves:** Wire confirmation, transfer reference number
- **DC action:** Cannot proceed with Day of Wire workflow until ref number received

### 7. Eligibility Gate
- **From:** [[lm-dc]] → [[qa]] + [[tc]] + [[com]] (notification)
- **Trigger:** Deferrals posted, all data in good order
- **What moves:** Eligibility notification email
- **Approvers action:** Review setup; send go-ahead email
- **DC action:** Enables eligibility in P3 only after go-ahead received
- **Rule:** Deferrals must be posted BEFORE this notification is sent

### 8. Special Plan Classes
- **From:** [[lm-dc]] → [[doc-ops]]
- **Trigger:** Plan requires a new special class not already in P3
- **What moves:** Request (presumably via ticket or email — method not yet documented)
- **Doc Ops action:** Adds class to P3
- **Risk:** DC cannot add these themselves; timing dependency on Doc Ops queue

### 9. Prod Support Corrections
- **From:** [[lm-dc]] → [[prod-support]]
- **Trigger:** Data error that can't be corrected through P3, ROC tool, or standard DC methods
- **What moves:** AWD ticket (isolating query + thorough description)
- **Prod Support action:** Direct database table correction
- **DC action:** Verifies correction, closes ticket

---

## COM-Perspective Handoffs

*The following handoffs are primarily owned or coordinated by COM. Added from [[com-main-checklist]].*

### 10. NSA → COM Kickoff
- **From:** Sales / business development → [[com]]
- **What moves:** [[nsa]] (New Sale Announcement)
- **COM action:** Creates [[project-plan-com]], schedules internal and external kickoffs, uploads project plan to NBI, sends to conversion team
- **Risk:** Delayed NSA receipt pushes back the entire COM timeline; conversion team may start without COM's project plan in hand

### 11. Prior Plan Documents Routing
- **From:** Plan Services → [[com]] → [[ellen-miller]] → docs team
- **Trigger:** COM initiates prior plan documents request early in the conversion
- **What moves:** Prior plan documents package
- **Risk:** Slow turnaround from prior carrier or Plan Services delays the review; COM must track and follow up actively

### 12. Prior Carrier Letter
- **From:** [[com]] → plan sponsor + prior carrier
- **Trigger:** Shortly after conversion kickoff
- **What moves:** [[prior-carrier-letter]] formally notifying prior RK of transition
- **Risk:** If delayed, prior carrier is unaware and will not initiate document or blackout coordination

### 13. Participant Notices Mailing
- **From:** [[com]] → plan sponsor (approval) → [[ellen-miller]] (mailing)
- **Trigger:** All notices drafted and compiled (blackout, cover letter, mapping notice, QDIA, fee disclosure, privacy notice)
- **What moves:** [[blackout-notice]] and accompanying notice package; notice mailing file
- **Timing:** Legally required; blackout notices must reach participants well before blackout starts
- **Risk:** Missing plan sponsor approval, or late routing to Ellen, causes regulatory exposure

### 14. Payroll Questionnaire Loop
- **From:** [[com]] → client → [[com]] → [[lm-dc]]
- **Trigger:** Payroll setup phase
- **What moves:** Payroll Questionnaire
- **Risk:** Client delays returning the questionnaire; DC cannot begin payroll setup without it

### 15. Contribution Monitoring Form + AWD Flip
- **From:** [[com]] → client → [[com]] → [[tc]]
- **Trigger:** TFS plans requiring contribution monitoring
- **What moves:** [[contribution-monitoring-form]]; TC AWD setting change
- **Risk:** If COM doesn't follow up on the TC confirmation, the AWD setting may not be flipped — monitoring doesn't activate at go-live

### 16. RDD Form Loop
- **From:** [[tc]] → [[com]] → client → [[com]] → [[tc]]
- **Trigger:** Payroll setup phase
- **What moves:** [[rdd-form]]
- **Risk:** Client slow to return; COM must track and follow up; TC cannot proceed without it

### 17. Early Access Activation
- **From:** [[com]] → [[lm-dc]] (template request) → client (file completion) → [[lm-dc]] (file load) → [[tc]] (activation)
- **Trigger:** Plan offers early access; day before early access start
- **What moves:** Early access file; TC system activation
- **Timing:** TC must be notified the day before; file must be loaded before that
- **Risk:** Client returns file late → TC cannot be notified in time → early access cannot open as scheduled

### 18. Assets Received Notification
- **From:** [[lm-dc]] → [[com]] → client
- **Trigger:** Liquidation day — DC confirms assets received and deposited
- **What moves:** Asset receipt confirmation and amount
- **Risk:** COM must stay in contact with DC on liquidation day to send this email promptly

### 19. CSR Delivery
- **From:** Quality Consultant → [[com]] → client
- **Trigger:** Go-live
- **What moves:** [[csr]] (Conversion Summary Report)
- **Risk:** COM cannot complete go-live close-out until CSR is received; if QC delays, COM must follow up

### 20. Go-Live Close-Out
- **From:** [[com]] → internal team + client + [[ellen-miller]] + [[nbi]]
- **Trigger:** Plan is confirmed live
- **What moves:** Go-live email to client; Auto Delivery Form (non-PEP); survey spreadsheet entry; NBI audit checklist; NBI transition date; Ellen Miller notification
- **Risk:** Items missed here (especially NBI audit checklist and Ellen notification) leave the plan in an incomplete state in the system

### 21. Payroll Handoff at Go-Live (if payroll not complete)
- **From:** [[lm-dc]] → Fiduciary Services; [[com]] → Account Manager
- **Trigger:** Go-live date reached with payroll testing still incomplete
- **Effective:** February 26, 2026
- **What moves:** FILESPECRQ AWD ticket (payroll contact, client contact, file layout, testing status summary); DC updates NBI; COM notifies AM
- **Fiduciary Services action:** Takes over payroll testing using Inforce Payroll Projects process
- **Risk:** If DC fails to submit the FILESPECRQ ticket or omits required fields, Fiduciary Services cannot pick up the project cleanly; payroll testing stalls
- **See:** [[payroll-handoff-at-go-live]]

## Failure Modes

| Handoff | Common Failure |
|---------|---------------|
| Fund/source mapping approval | Approvers not looped in promptly; approval delayed past liquidation prep window |
| Re-registration timing | DC sends re-reg form too early or too late for Matt O'Connell's team |
| Cashiering heads-up | DC forgets day-before notification; Cashiering unprepared for wire arrival |
| Eligibility gate | DC enables eligibility before receiving go-ahead; or posts eligibility before deferrals |
| Doc Ops class addition | DC attempts to add special class directly in P3 (will fail) |
| Subpack | COM creates it but TC must take over after review — if handoff never happens, subpack is orphaned |
| Participant notices | COM misses legal timing window for blackout notice; regulatory exposure |
| Contribution monitoring AWD flip | COM sends form to TC but never confirms the AWD flip happened; monitoring doesn't activate |
| Early access file timing | Client returns file late; TC can't be notified in time; early access window missed |
| NSA to project plan | COM receives NSA but delays project plan upload; conversion team starts without shared timeline |
| Go-live close-out | COM misses NBI audit checklist or Ellen notification; plan sits in incomplete state in system |
| Payroll handoff at go-live | DC doesn't submit FILESPECRQ ticket, or submits without required fields; Fiduciary Services can't pick up project |

## See Also

- [[dc-onboarding-workflow]] — DC's view of the full 7-phase process
- [[lm-dc]] — DC role reference
- [[com]] — COM role reference (full 18-phase checklist breakdown)
- [[liquidation-day]] — detail on the Day of Wire sequence
- [[eligibility-and-deferrals]] — the eligibility gate detail
- [[nsa]] — the trigger that starts COM's workflow
- [[blackout-notice]] — legally required participant communication
- [[early-access]] — pre-go-live participant window
- [[csr]] — Quality Consultant's go-live deliverable
- [[payroll-handoff-at-go-live]] — new procedure (Feb 26, 2026) when payroll testing is incomplete at go-live
