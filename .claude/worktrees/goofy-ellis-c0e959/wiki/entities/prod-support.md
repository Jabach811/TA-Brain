---
title: "Prod Support"
type: entity
tags: [team, prod-support, awd, tables, corrections]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Prod Support

The team that makes direct database table modifications when something goes wrong or needs correction. Engaged via AWD (All Working Data) ticket.

## Overview

Prod Support handles back-end database corrections that DCs cannot perform themselves. When a file is imported incorrectly, data needs to be deleted or changed, or a table value needs to be adjusted, the DC submits an AWD ticket and Prod Support makes the change.

## What They Do

- Modify table entries
- Delete incorrect records
- Change field values in the database
- Handle any kind of data correction that can't be done through standard DC tools

## When to Engage

- Incorrect file import (wrong data loaded into the system)
- Data needs to be deleted or adjusted after posting
- Any table-level change that cannot be made via P3 or the ROC tool

## How to Submit an AWD Ticket

Log into the **AWD site** (web portal). The submission flow:

1. **Create Work** — select "Create Work" to open a new ticket
2. **Enter case number** and **ticket type**
3. **Enter Comments** — this is where the isolating query and description go
4. **Send** — ticket goes to Prod Support's queue

Prod Support responds back to your queue with comments or a completion confirmation. Review it, verify the fix, then close.

### Best Practices for the Comments Field

The quality of the ticket determines how fast and accurately Prod Support resolves it.

**Step 1 — Isolate the data first.** Run a query in AQT that returns **exactly** the records that need to be changed. Do not reference the whole table.

> "Get the actual query that holds exactly the data that you want to be modified. Don't do the entire table, the whole gigantic thing."

**Step 2 — Write a thorough description.** Include:
- What happened and what needs to be done
- The isolating query (paste it in)
- The action needed: delete / modify / update a specific value
- All relevant identifiers (case number, SSN, plan name, ref number, etc.)

> "Get a thorough description in your comment and make sure that it's all out there so they don't have to go back and forth."

Thorough tickets = fewer back-and-forth exchanges = faster resolution.

**Step 3 — Verify when done.** Once Prod Support marks the ticket done, go verify in the system. Run the isolating query again and confirm results look right.

**Step 4 — Close it.** Set to **Complete**, clear from your queue.

## Turnaround Times

- **Standard tickets:** 1–2 business days
- **Urgent tickets (e.g., liquidation day):** Same day — flag as urgent when submitting

## See Also

- [[internal-teams]]
- [[p3]]
- [[eds]]
- [[final-files-processing]]
- [[dc-onboarding-workflow]]
