---
title: "Prod Support Ticket (AWD)"
type: process
tags: [process, awd, prod-support, correction, ticket, data-fix]
created: 2026-04-18
updated: 2026-04-18
sources: 2
---

# Prod Support Ticket (AWD)

How to open an AWD ticket for [[prod-support]] when production data needs to be corrected and the DC does not have write access to do it directly.

> [!needs-review]
> First pass of this process page. Human flagged this for close review during the next lint pass — the exact work-type names, urgent-ticket flagging, and SLA tiers need SME verification before this is considered authoritative.

## Overview

Many production tables cannot be edited by DCs directly — corrections to `CORP.EMPLOYEE`, `CORP.EE_BASIS`, `PENSION.PART_ELECT_DETAIL`, `CORP.LOAN_DETAIL`, and similar domains are routed through Prod Support via an AWD ticket. The ticket is both the request and the audit trail. The single strongest predictor of how fast a ticket is resolved is ticket quality — specifically, whether the DC has included an **isolating query** that returns exactly the rows to be changed, plus a clear **end-state** description.

## Trigger

Any of the following, discovered at any phase of a conversion or ongoing plan administration:

- A data load populated the wrong value (wrong amount, wrong date, wrong source code).
- A participant record needs to be de-duplicated, split, or merged.
- A field cannot be updated through normal application flows.
- A query reveals orphan rows or dangling references that cannot be cleaned by re-running a standard load.

## Steps

| # | Step | Owner |
|---|------|-------|
| 1 | Run a query in [[entities/aqt]] that returns **exactly** the rows needing change — not the whole table | [[roles/lm-dc]] |
| 2 | Confirm the query count matches expectations; screenshot / export results | [[roles/lm-dc]] |
| 3 | Log into the **AWD site** (web portal) | [[roles/lm-dc]] |
| 4 | Click **Create Work** | [[roles/lm-dc]] |
| 5 | Enter **case number** (preserve spaces, case-sensitive) | [[roles/lm-dc]] |
| 6 | Select the appropriate **ticket type** (work type drives routing — pick the Prod Support correction type) | [[roles/lm-dc]] |
| 7 | Fill the **Comments** block with: (a) business context, (b) the isolating query verbatim, (c) the desired end state, (d) any participant-impact notes | [[roles/lm-dc]] |
| 8 | Attach supporting data (query results export, source email, etc.) if needed | [[roles/lm-dc]] |
| 9 | Flag as **urgent** if this is liquidation day or a same-day-required fix | [[roles/lm-dc]] |
| 10 | Click **Send** — ticket routes to Prod Support queue | [[roles/lm-dc]] |
| 11 | Wait for response in your queue. Prod Support may reply with clarification requests — answer promptly | [[prod-support]] |
| 12 | When Prod Support marks the ticket done, re-run the isolating query | [[roles/lm-dc]] |
| 13 | Confirm the data matches the desired end state | [[roles/lm-dc]] |
| 14 | Set ticket to **Complete** and clear from your queue | [[roles/lm-dc]] |

## Handoff Points

- **DC → Prod Support:** via AWD queue; SLA begins at submit.
- **Prod Support → DC:** comments posted to DC's queue when work is complete or when clarification is needed.
- **DC → audit trail:** Complete status + verification note in the ticket is the permanent record.

## Timing / Deadlines

- **Standard tickets:** 1–2 business days.
- **Urgent tickets:** same day — flag as urgent when submitting, and on liquidation day give a verbal heads-up to Prod Support so they pull it from queue quickly.
- **Do not close** until verified. A ticket closed before verification hides any failed or partial fix.

## Comments Block — Template

```
CONTEXT:
Plan <CASE_NO> — <plain-English description of what's wrong and why>.
Participant impact: <what the participant sees / would see if uncorrected>.

ISOLATING QUERY:
<paste the AQT query that returns exactly the rows to change>

DESIRED END STATE:
<describe field-by-field what the rows should look like after the fix>

NOTES:
<anything unusual — urgency reason, related tickets, prior attempts>
```

## Failure Modes

- **Isolating query too broad.** Returns rows that should not be modified. Prod Support will either (a) return for clarification or (b) modify rows beyond the intent — both are bad. Always scope to exact (CASE_NO, SOC_SEC_NO, and any other disambiguators).
- **End state ambiguous.** If the ticket says "fix the basis" without stating which bucket and what value, Prod Support cannot proceed without clarification. State the exact field and exact value.
- **Missing urgency flag on liquidation day.** Standard SLA applies — your same-day ask becomes a next-day delivery.
- **Verify step skipped.** DC closes on faith; the fix turns out to be partial; defect surfaces post-go-live when it is much more expensive to unwind.
- **Related Prod Support work overlaps.** If two DCs open tickets touching the same rows, they can clobber each other. Search your team queue for prior tickets on the same case before submitting.

## See Also

- [[awd]]
- [[entities/prod-support]]
- [[entities/aqt]]
- [[processes/reversal-submission]]
- [[concepts/reversal-process]]
- [[glossary/awd]]
