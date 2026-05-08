# Ingest Workflow

Use this workflow whenever Joel provides a work brain dump.

## Step 1: Capture the Source

Create or update the daily dump page:

`01-daily-dumps/YYYY-MM-DD.md`

Include:

- date
- raw context summary
- plans mentioned
- projects mentioned
- people mentioned
- process lessons
- open items
- decisions
- brief sheet candidates

## Step 2: Extract Plans

For each plan mentioned:

- create the file if missing
- update status
- update important dates
- update contacts
- add plan-specific notes
- add open items
- move resolved items when appropriate
- update mention history

## Step 3: Extract Projects

For each project mentioned:

- update status
- update next action
- update stale risks
- add new ideas or standards

## Step 4: Extract People

For each person mentioned:

- update relationship/context
- note latest interaction
- connect to plans/projects
- capture open asks

## Step 5: Extract Processes

If Joel says "lesson learned," "rule," "takeaway," or repeats a work pattern, update or create a process page.

Good process pages are short and usable.

## Step 6: Update Reminders

For every unresolved open item:

- assign severity
- set reminder rule
- include last mentioned date
- include due date if known

## Step 7: Update Index and Log

Update `index.md` if new pages were created or statuses changed.

Append one log entry with:

```markdown
## [YYYY-MM-DD] ingest | Short description
- Daily dump: `01-daily-dumps/YYYY-MM-DD.md`
- Plans updated:
- Projects updated:
- People updated:
- Processes updated:
- Reminders updated:
- Notes:
```

## Step 8: Create Brief Sheet

If Joel asks for the visual sheet, use `00-system/IMAGE-SHEET-PROMPT.md` and the current daily dump.

