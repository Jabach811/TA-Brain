---
title: "AWD"
type: concept
tags: [concept, awd, tickets, workflow, prod-support, correction, filespecrq, reversal]
created: 2026-04-18
updated: 2026-04-18
sources: 3
---

# AWD

Automatic Work Distribution — Transamerica's internal work-ticketing and routing system. The queue-based channel teams use to request work from each other when an automated workflow doesn't already exist.

> [!needs-review]
> First pass of this concept page. Human flagged this for close review during the next lint pass — the exhaustive list of work types, queue names, and SLA tiers needs SME verification before this is considered authoritative.

## Definition

AWD is the ticketing system that wires Transamerica's back-office teams together. A ticket has a **work type** (which determines routing), a **case number** (which determines the plan context), a **comments** block (which is where the actual instructions go), and an optional **attachments** folder. Tickets move between team queues by routing rules, and each team's queue is the inbox they work from.

From the LM DC seat, the four tickets that matter most are:

| Work type | Purpose | Destination | Detail page |
|-----------|---------|-------------|-------------|
| **Prod Support correction** | Direct DB edit when DC cannot change data themselves | [[prod-support]] | [[processes/prod-support-ticket]] |
| **FILESPECRQ** | Hand off incomplete payroll to Fiduciary Services at go-live | Fiduciary Services / [[ftp-team]] | [[concepts/payroll-handoff-at-go-live]] |
| **Reversal** | Reverse an erroneous transaction (paired with Reversal Form) | Reversal team | [[processes/reversal-submission]] |
| **Rebook** | AEDA disbursement vs. wire rebooking | [[cashiering]] | [[concepts/booking-assets]] |

Other teams use AWD for their own work (COM for client-doc routing, TC for contribution-monitoring flips, Doc Ops for plan-document updates, etc.) — the system is cross-team by design.

## Why It Matters

AWD is the **only** sanctioned channel for several high-stakes actions: direct table edits, reversals, payroll handoffs. Email requests for these actions get refused — the ticket is the audit trail, the SLA clock, and the routing mechanism all at once.

Ticket quality determines resolution speed. A good ticket includes:

1. The **isolating query** that returns exactly the rows being acted on.
2. The **desired end state** (what the data should look like after the fix).
3. The **business context** (why this change is needed — what broke, what the participant experience is).

A bad ticket gets returned to queue with a clarification request, adding a day or more to the cycle. This matters enormously on liquidation day, when SLA is same-day.

## Data Elements

Ticket fields that matter:

| Field | Notes |
|-------|-------|
| Work type | Determines routing; cannot be changed after submission |
| Case number | Plan context; format `ABC12345  00001` (case-sensitive, preserve spaces) |
| Priority / urgency | Flag as urgent on liquidation day |
| Comments | Instructions + isolating query + end state |
| Attachments | Supplementary data (spreadsheets, form emails) |
| Assignee | Can be targeted to a specific team member if known |

## Evidence / Examples

- `entities/prod-support.md` documents the Create Work → case number + type → Comments → Send flow, plus the best-practice isolating-query + end-state format.
- `processes/reversal-submission.md` documents the specific two-part flow (Reversal Form first, AWD ticket second, paste the form's email block verbatim into the ticket comments).
- `concepts/payroll-handoff-at-go-live.md` documents the FILESPECRQ ticket submitted when payroll testing is incomplete at go-live.
- `concepts/booking-assets.md` documents the Rebook ticket for AEDA disbursements (booking type 3) vs. wire remits (booking type 4).

## Counterarguments / Edge Cases

- **Not every cross-team request is an AWD ticket.** Early in a conversion, COM and DC coordinate via email and NBI. AWD is used when (a) a specific back-office team must take action on production data, or (b) an audit trail is required.
- **Reversal tickets require the Reversal Form first.** Submitting a Reversal AWD without the form gets the ticket returned unworked — the form generates the email block that belongs in the ticket comments.
- **Standard SLA is 1–2 business days. Urgent SLA is same-day** but must be flagged as urgent when submitting and typically requires a verbal heads-up to the receiving team on liquidation day.
- **Verify and close.** Tickets are not complete when the action is done — they are complete when the DC verifies the end state matches and sets the ticket to Complete. A done-but-unverified ticket is a pending defect.

## Related Concepts

- [[loans]], [[basis]], [[census]] — common sources of Prod Support correction tickets
- [[concepts/reversal-process]]
- [[concepts/payroll-handoff-at-go-live]]
- [[concepts/booking-assets]]

## Open Questions

- Full list of AWD work types used by LM DCs and their routing destinations.
- Standard SLA per work type — is 1–2 business days universal or does it vary?
- Is there a documented "ticket template" per work type, or is the Comments format team-by-team convention?
- Interaction between AWD tickets and the legacy Plan Correction Checklist retired on 2026-03-06 — any residual work types still use the legacy path?

## See Also

- [[processes/prod-support-ticket]]
- [[processes/reversal-submission]]
- [[glossary/awd]]
- [[entities/prod-support]]
- [[glossary/filespecrq]]
