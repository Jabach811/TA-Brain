---
title: "AWD"
type: system
tags: [system, workflow, tickets, testing, conversion]
created: 2026-04-15
updated: 2026-05-03
sources: 2
status: current
---

# AWD

**Full Name:** Automatic Work Distribution

## Definition

AWD is Transamerica's internal work-ticketing and routing system. Teams submit AWD tickets to request actions from other departments — data corrections, payroll handoffs, rebooking requests — and tickets route automatically based on type and target department. AWD is also where new plan packages go for **testing** as part of conversion setup, before the base file and payroll templates can be finalized.

![AWD main page — ticket list with type, priority, and assignment columns.](SS/AWD - Main Page.jpg)

## Two Roles in a Conversion

### 1. Pre-Base-File Testing

Before the [[base-file]] and [[payroll-template]] can be tailored to a plan, the [[prd]] or [[onboarding-package]] is sent to AWD for testing. Typical turnaround is **a couple of days**. AWD returns:

- **Term reason codes** (when applicable to the plan design)
- Verification of testing and eligibility setup
- Resolution of open items the PRD/onboarding package didn't fully answer

Once the AWD results land, the DC tailors the standard base + payroll templates to this plan's specifics and schedules the client walkthrough meeting.

### 2. Ongoing Ticket Routing

Throughout the conversion, internal teams submit AWD tickets to request specific actions:

| Submitter | Common Ticket Types | Target |
|-----------|---------------------|--------|
| [[roles/lm-dc]] | Data corrections | [[prod-support]] |
| [[roles/lm-dc]] | Payroll handoffs (FILESPECRQ) | Payroll Support |
| [[roles/lm-dc]] | Rebook requests for AEDA disbursements | [[booking-assets]] flow |
| [[roles/com]] | Various lifecycle tickets | Multiple departments |
| [[tc]] | Settings flips (e.g., contribution monitoring) | Receiving teams |

Most internal teams touch AWD at some point in a conversion. It is the connective tissue for cross-team work requests.

![AWD landing screen after login — work queues and ticket counts.](SS/AWD - After Login.jpg)

## Procedure

> *(Full step-by-step procedure for submitting and tracking AWD tickets to be documented in a follow-up pass — placeholder section.)*

![Completed AWD ticket with comments — what a fully-worked ticket looks like before close.](SS/AWD_Complete with Comments.jpg)

## Used By

- [[roles/lm-dc]] — submits tickets to [[prod-support]] for data corrections, to initiate payroll handoffs (FILESPECRQ type), and for rebook actions
- [[roles/com]] — submits and receives tickets throughout the conversion lifecycle
- [[tc]] — receives and flips AWD settings (e.g., contribution monitoring)
- Most internal teams touch AWD at some point in a conversion

## See Also

- [[payroll-handoff-at-go-live]] — uses FILESPECRQ ticket type
- [[processes/reversal-submission|reversal-process]] — AWD ticket submitted after Reversal Form response
- [[booking-assets]] — rebook AWD ticket for AEDA disbursements
- [[prod-support]]
- [[prd]]
- [[onboarding-package]]
- [[base-file]]
- [[census-data]]

