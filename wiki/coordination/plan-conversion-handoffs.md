---
title: "Plan Conversion Handoffs"
type: coordination
tags: [process, conversion, handoffs, cross-team, onboarding]
created: 2026-04-14
updated: 2026-07-08
sources: 5
status: current
---

# Plan Conversion Handoffs

The handoffs where the DC is on one end during a plan conversion — what moves, between whom, and when.

## Trigger

Two parallel triggers start a conversion: new business intake issues an Nsa to COM, and separately notifies a manager that a plan slot is open in NBI → the manager assigns a DC. COM and DC land on the same plan around the same time — connect early.

## Your handoffs

### 1. Assignment → DC
- **From:** new business intake → manager → you
- **What moves:** Plan ID, NBI assignment
- **You:** Confirm assignment in [[nbi]]; review PRD or onboarding package

### 2. PRD / Onboarding Package → DC
- **From:** COM → you
- **What moves:** Plan Review Document or Onboarding Package (eligibility, vesting, sources, classes)
- **You:** Review sections relevant to data setup; note conversion type

### 3. Fund Mapping Approval
- **From:** you → COM → [[qa]] + [[tc]]
- **Trigger:** TOA signed by client
- **What moves:** Fund mapping document; approval returns to you via COM
- **Risk:** Delay pushes back source mapping and CONV file prep

### 4. Source Mapping Approval
- **From:** you → COM → [[qa]] + [[tc]]
- **Trigger:** Test files received from prior record keeper
- **What moves:** Source mapping document
- **Risk:** Late test files compress everything downstream

### 5. Source Mapping Attribute Completion
- **From:** you → [[tc]] → COM/TM
- **Trigger:** You've identified all prior-vendor sources with balances and saved the working spreadsheet
- **What moves:** Source list, balances, prior-plan review attributes, contribution type codes, contribution frequency, withdrawal provisions, vesting, unresolved frozen-source questions
- **TC:** Completes administrative attributes; may ask you to obtain missing prior-vendor details
- **Risk:** Frozen/legacy sources mapped without verified attributes → wrong downstream setup and participant rules
- **See:** Source Mapping TC

### 6. Payroll Questionnaire → DC
- **From:** COM → client → COM → you
- **Trigger:** Payroll setup phase
- **What moves:** Completed Payroll Questionnaire
- **Risk:** Client delays returning it; you can't begin payroll setup without it

### 7. Re-Registration Form (TIK only)
- **From:** you → re-registration team (currently Matt O'Connell)
- **Trigger:** TOA reviewed; any fund with column T = Y
- **What moves:** Re-registration form (you fill it out)
- **Timing:** Target ~10–12 business days before liquidation
- **Risk:** Too early = premature action; too late = liquidation can't proceed

### 8. Liquidation Day — Cashiering Loop
- **From:** you → [[cashiering]] (heads-up, day before); prior record keeper → wire → Cashiering; Cashiering → you (wire receipt + ref number)
- **What moves:** Wire confirmation, transfer reference number
- **You:** Cannot start the Day of Wire workflow until the ref number arrives (by 3:45 PM CST if received that day)

### 9. Assets Received Notification
- **From:** you → COM → client
- **Trigger:** Liquidation day — you confirm assets received and deposited
- **What moves:** Asset receipt confirmation and amount
- **Risk:** COM needs it same-day to email the client — stay in contact on liquidation day

### 10. Eligibility Gate
- **From:** you → [[qa]] + [[tc]] + COM (notification)
- **Trigger:** Deferrals posted, all data in good order
- **What moves:** Eligibility notification email; go-ahead email back
- **You:** Enable eligibility in [[p3]] only after the go-ahead
- **Rule:** Deferrals must be posted BEFORE the notification goes out

### 11. Early Access Loop
- **From:** COM requests the template from you → client completes → you load the file → TC activates (via COM, day before early access starts)
- **What moves:** Early access file; TC system activation
- **Risk:** Client returns the file late → TC can't be notified in time → early access misses its window

### 12. Special Plan Classes
- **From:** you → [[doc-ops]]
- **Trigger:** Plan requires a new special class not already in P3
- **What moves:** Class addition request (channel not yet documented)
- **Risk:** You cannot add these yourself; timing dependency on the Doc Ops queue

### 13. Prod Support Corrections
- **From:** you → [[prod-support]]
- **Trigger:** Data error not correctable via P3, ROC tool, or standard DC methods
- **What moves:** AWD ticket (isolating query + thorough description)
- **You:** Verify the correction, close the ticket

### 14. Payroll Handoff at Go-Live (if payroll not complete)
- **From:** you → Fiduciary Services; COM → Account Manager
- **Trigger:** Go-live reached with payroll testing still incomplete (effective February 26, 2026)
- **What moves:** FILESPECRQ AWD ticket (payroll contact, client contact, file layout, testing status summary); you update NBI
- **Risk:** Missing ticket or omitted fields → Fiduciary Services can't pick up the project; payroll testing stalls
- **See:** [[payroll-handoff-at-go-live]]

## Failure modes

| Handoff | Common failure |
|---------|---------------|
| Fund/source mapping approval | Approvers not looped in promptly; approval delayed past liquidation prep window |
| Re-registration timing | Form sent too early or too late |
| Cashiering heads-up | Day-before notification forgotten; Cashiering unprepared for the wire |
| Eligibility gate | Eligibility enabled before go-ahead; or notification sent before deferrals posted |
| Doc Ops class addition | DC attempts to add a special class directly in P3 (will fail) |
| Early access file timing | Client returns file late; TC can't be notified in time |
| Payroll handoff at go-live | FILESPECRQ ticket not submitted or missing required fields |

## Around you (not your handoffs)

Handoffs running in parallel that don't touch the DC — useful for knowing why COM/TC are busy:

- **NSA → COM kickoff:** sales issues the Nsa; COM builds the project plan and schedules kickoffs
- **Prior plan documents routing:** Plan Services → COM → docs team for review
- **Prior carrier letter:** COM notifies the prior record keeper and plan sponsor of the transition
- **Participant notices mailing:** COM drafts blackout/QDIA/fee/privacy notices, gets sponsor approval, routes for mailing — legal timing windows apply
- **Contribution Monitoring Form + AWD flip (TFS plans):** COM ↔ client ↔ TC
- **RDD form loop:** TC → COM → client → COM → TC
- **CSR delivery:** Quality Consultant → COM → client at go-live
- **Go-live close-out:** COM's go-live email, NBI audit checklist, and internal notifications
- **TC administrative readiness gate:** TC + QA confirm case notes, access settings, and admin documentation before activation and handoff to the ongoing team — see TC Conversion Timeline, [[go-live-checklist]]

## See Also

- [[dc-onboarding-workflow]] — the DC's view of the full process
- [[roles/lm-dc]]
- [[liquidation-day]] — Day of Wire sequence detail
- [[eligibility-and-deferrals]] — eligibility gate detail
- Early Access
- [[payroll-handoff-at-go-live]]
