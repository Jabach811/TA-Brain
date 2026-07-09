---
title: "Prod Support"
type: coordination
tags: [team, prod-support, awd, tables, corrections]
created: 2026-04-14
updated: 2026-07-08
sources: 2
status: current
---

# Prod Support

Makes direct database table corrections that DCs cannot perform themselves. Engaged via AWD ticket.

## What they own

- Modifying table entries, deleting incorrect records, changing field values
- Any data correction that can't be done through [[p3]], the ROC tool, or standard DC tools

## When to engage

- Incorrect file import (wrong data loaded into the system)
- Data needs to be deleted or adjusted after posting
- Any table-level change beyond your tools

## How to submit an AWD ticket

Log into the AWD site (web portal):

1. **Create Work** — select "Create Work" to open a new ticket
2. **Enter case number** and **ticket type**
3. **Enter Comments** — this is where the isolating query and description go
4. **Send** — ticket goes to Prod Support's queue

Prod Support responds back to your queue with comments or a completion confirmation. Review it, verify the fix, then close.

### Writing the Comments field

The quality of the ticket determines how fast and accurately it resolves.

**Step 1 — Isolate the data first.** Run a query in AQT that returns exactly the records to change. Don't reference the whole table.

**Step 2 — Write a thorough description.** Include:
- What happened and what needs to be done
- The isolating query (paste it in)
- The action needed: delete / modify / update a specific value
- All relevant identifiers (case number, SSN, plan name, ref number, etc.)

Thorough tickets mean fewer back-and-forth exchanges and faster resolution.

**Step 3 — Verify when done.** Run the isolating query again and confirm results look right.

**Step 4 — Close it.** Set to **Complete**, clear from your queue.

## Turnaround

- **Standard tickets:** 1–2 business days
- **Urgent tickets (e.g., liquidation day):** same day — flag as urgent when submitting

## Common issues

- Vague comments or no isolating query → back-and-forth and slow resolution
- Ticket marked done but never verified in the system — always re-run the query before closing
- Urgent work not flagged as urgent, so it sits in the standard queue

## See Also

- [[p3]]
- [[eds]]
- [[final-files-processing]]
- [[plan-conversion-handoffs]]
