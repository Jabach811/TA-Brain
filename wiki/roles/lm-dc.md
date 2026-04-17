---
title: "Large Market Data Consultant (LM DC)"
type: role
tags: [role, data, large-market, conversion, onboarding]
created: 2026-04-14
updated: 2026-04-15
sources: 2
---

# Large Market Data Consultant (LM DC)

The person responsible for all data-related work when onboarding a new retirement plan onto Transamerica's platform.

## What This Role Does

The DC owns everything that touches data in a plan conversion — from the initial census file to the final balance posting. The job has two modes that alternate throughout a conversion:

- **Preparation mode** (weeks to months before liquidation): building templates, establishing vendor relationships, getting mappings approved, setting up file layouts in EDS
- **Execution mode** (liquidation day through final files): time-sensitive, sequential processing that must go right the first time

The DC is not client-facing by default. They attend external meetings only when data topics (base file, payroll) are explicitly on the agenda. Most DC work happens internally or directly with external vendors (prior record keeper, payroll vendor).

## Systems They Use

| System | Purpose |
|--------|---------|
| [[p3]] | Main plan administration platform — setup, processing, queries |
| [[p2]] | Back-end region for creating transfer reference numbers |
| [[eds]] | File layout, validation, and processing |
| [[informatica]] | Day of Wire and Participant Balance workflows |
| [[nbi]] | Plan assignment tracking — universal checklist per plan |
| [[aqt]] | SQL query tool (read-only) — used to look up source IDs and build isolating queries |

## Who They Work With

| Team / Person | Nature of Relationship |
|---------------|----------------------|
| [[com]] | COM sets meetings, manages PRD/subpack, routes approvals; DC sends mappings through COM |
| [[qa]] | DC sends source and fund mappings to QA for approval; QA clears eligibility |
| [[tc]] | Transition Consultant; CC'd on key communications alongside QA |
| [[doc-ops]] | DC requests special plan class additions; Doc Ops sets up P3 |
| [[cashiering]] | DC notifies Cashiering before and on liquidation day; Cashiering provides wire ref numbers |
| [[ftp-team]] | DC requests FTP account setup for payroll vendors |
| [[payroll-support]] | DC sends validated payroll test files for final green-light |
| [[prod-support]] | DC submits AWD tickets for data corrections that can't be made through standard tools |
| [[ellen-miller]] | Manages assignment pipeline; notifies managers of open DC slots in NBI |
| [[matt-oconnell]] | Leads TIK re-registration; DC fills out re-reg form and coordinates timing |
| [[stacey-fortune]] | Cross-department manager; contact for AE liquidation requests and major approvals |
| [[nick-lister]] | DC's direct manager; escalation contact |

## Key Handoffs

**Comes in:**
- Plan assignment notification via [[ellen-miller]] → manager → DC tagged in [[nbi]]
- PRD / onboarding package from [[com]]
- TOA (client-signed fund map) — triggers fund mapping phase
- Test files from prior record keeper
- Payroll test files from payroll vendor
- Wire receipt confirmation + ref number from [[cashiering]]
- Final files from prior record keeper

**Goes out:**
- Base file template → client
- Payroll template → client + payroll vendor
- Fund mapping → [[com]], [[qa]], [[tc]] for approval
- Source mapping → [[com]], [[qa]], [[tc]] for approval
- Wire instructions → prior record keeper
- Re-registration form → [[matt-oconnell]]
- Test payroll files → [[payroll-support]] for final validation
- Liquidation day heads-up → [[cashiering]]
- Eligibility notification → [[qa]], [[tc]], [[com]] (waits for go-ahead before enabling)
- Audit pack → stored in client folder; reviewed by QA
- NBI updates → continuous throughout conversion

## What Other Teams Should Know

- DC does not control meeting scheduling — that's COM's job. Looping DC into an external call without flagging data topics wastes DC time.
- DC owns the re-registration form for TIK conversions — not Matt O'Connell's team. DC fills it out and sends it to Matt.
- DC cannot add new special plan classes in P3 — that requires Doc Ops. DC can update existing class names and codes.
- Timing matters. Matt O'Connell's team needs lead time (~10–12 business days before liquidation). FTP team has a large caseload — engage early. Do not wait.
- "Day of Wire" in Informatica cannot be tested in a sandbox. Triple-check the CONV file before running.
- When a reversal is needed: submit the Reversal Form to `slasrever@transamerica.com` first (as of 03/06/2026), then submit the AWD ticket with the response text pasted into comments. The old Plan Correction Checklist is retired. See [[reversal-process]].

## Updated Procedures (2025–2026)

### Payroll Handoff at Go-Live
If payroll testing is not complete at go-live, the DC submits a **FILESPECRQ** AWD ticket transferring the project to Fiduciary Services. The ticket must include payroll contact info, client contact info, file layout, and a summary of testing status. DC also updates NBI. COM notifies the Account Manager. See [[payroll-handoff-at-go-live]].

### Booking Assets
Two distinct booking types as of August 2025:
- Wire arrives at State Street → book as **4=Remit**, email NY Recon
- Disbursing from AEDA to participant accounts → book as **3=Rebook** + submit rebook AWD ticket
See [[booking-assets]].

### Fund Management Calendar
The FMC now requires an email to four distribution addresses whenever it is updated with fund balances, in addition to updating the file itself. The SSBT cut-off is 4:00 PM EST. Estimates must be entered at least five business days before TOA. See [[fund-management-calendar]].

### Reversals (as of March 6, 2026)
The Plan Correction Checklist is retired. New process uses the Reversal Form at `slasrever@transamerica.com`. See [[reversal-process]].

### LTPT Eligibility (effective January 1, 2025)
Employees with 500+ hours in two consecutive 12-month periods are eligible for elective deferrals. Two new EDS status codes (5 and 6). Hours must be tracked even for excluded-class employees. See [[ltpt-eligibility]].

### Common Remitter Plans
Plans coded "common remitter" require "Verify Batch After Funding" instead of standard Pre-Process in P3 on Day of Wire. See [[common-remitter-plans]].

## Open Questions

- Prior RK-specific workflows (Fidelity, Vanguard, Empower) — being built, not yet documented

## See Also

- [[dc-onboarding-workflow]] — the full 7-phase process reference
- [[conversion-types]] — cash vs. mapping vs. transfer in kind
- [[liquidation-day]] — execution day detail
- [[final-files-processing]] — post-liquidation data posting
- [[plan-conversion-handoffs]] — cross-team handoff map for plan conversions
- [[onboarding/lm-dc]] — reading list for new DCs
