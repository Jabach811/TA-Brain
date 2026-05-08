---
title: "Payroll Handoff at Go-Live"
type: concept
tags: [payroll, go-live, handoff, fiduciary-services, filespecrq, process]
created: 2026-04-15
updated: 2026-04-15
sources: 1
---

# Payroll Handoff at Go-Live

The formal procedure for transferring an incomplete payroll testing project to the Fiduciary Services team at go-live. Effective February 26, 2026. When payroll testing is not finished by the conversion go-live date, the DC submits a FILESPECRQ AWD ticket and the COM notifies the Account Manager.

## Definition

If a plan reaches go-live before payroll testing is complete, the project does not stop — it is formally handed off to an internal team (Fiduciary Services) that handles inforce payroll projects. The DC and COM have specific responsibilities to document and transfer the project cleanly.

## Why It Matters

Plans go live regardless of whether payroll is ready. Payroll testing delays are common (vendor responsiveness, client data issues, format problems). Without a formal handoff process, the payroll project would be orphaned at go-live with no team assigned. This procedure ensures continuity and documents who is responsible.

## When This Applies

This procedure activates **only when payroll testing is still underway at go-live**. If testing is complete before go-live, no action is needed.

## Process

### COM's Role (Before and During Go-Live)
- COM communicates during the conversion process that if payroll is not completed by go-live, testing will continue with a different internal Transamerica team
- Payroll status is a standard **discussion topic at go-live meetings**

### If Testing Is Not Complete at Go-Live

**DC Actions:**
1. **Submit an AWD ticket** — Ticket type: **FILESPECRQ**
   - Include in ticket: payroll contact info, client contact info, payroll file layout, summary of current testing status, details of prior test file results (link to shared drive documents)
2. **Coordinate with any internal DC team members** who have been assisting with payroll testing — notify them the project is being passed to Fiduciary Services
3. **Update NBI** to reflect:
   - Testing is not complete
   - The FILESPECRQ AWD ticket was submitted

**COM Actions:**
1. **Notify the Account Manager (AM)** that payroll testing was not completed during transition and the AWD ticket was submitted for completion by Fiduciary Services

**Client/Vendor Notification:**
1. The client and payroll vendor are notified that the payroll project is being moved to a new team
2. **If testing is underway:** COM and DC coordinate to introduce the AM who will be picking up the project
3. **If testing has not yet started:** The AM will initiate contact directly

### After Handoff
- Fiduciary Services receives the FILESPECRQ AWD ticket and follows the **Inforce Payroll Projects** process to complete payroll for the installation
- The DC's active involvement in payroll ends once the ticket is submitted and NBI is updated

## Ticket Content Checklist

When submitting the FILESPECRQ ticket, include:

- [ ] Payroll vendor contact name and email
- [ ] Client contact name and email
- [ ] Payroll file layout (attach or link)
- [ ] Summary of testing status (where in the process, what's been done)
- [ ] Details of prior test file results (pass/fail, outstanding issues)
- [ ] Link to shared drive folder with test files and layouts

## Evidence / Examples

From the DC Training Notebook (February 26, 2026):

> "Going forward, the COMs will communicate during the conversion process that if payroll is not completed prior to go live, payroll testing will continue with a different internal Transamerica Team."

> "LM DC will submit Ticket type = FILESPECRQ. Ticket to include payroll contact info, client contact info, payroll file layout and summary of current testing status including details of prior test file results."

## Related Concepts

- [[payroll-template]] — the file format being tested
- [[ftp-connection]] — the upload channel being set up alongside testing
- [[payroll-support]] — the One Payroll team involved in pre-go-live testing
- [[nbi]] — must be updated with testing status and ticket number
- [[plan-conversion-handoffs]] — the broader go-live handoff context

## See Also

- [[plan-conversion-handoffs]]
- [[payroll-template]]
- [[ftp-connection]]
- [[payroll-support]]
- [[nbi]]
- [[lm-dc]]
- [[com]]
