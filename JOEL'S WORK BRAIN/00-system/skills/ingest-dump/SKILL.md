---
name: ingest-dump
description: Use when Joel provides a work brain dump, daily update, voice memo transcript, or files to ingest into Joel's Work Brain. Updates daily dumps, plans, projects, people, processes, reminders, indexes, and log files inside JOEL'S WORK BRAIN.
---

# Ingest Dump

Use this local project skill for Joel's Work Brain.

## Required Reads

Read these first:

- `00-system/AGENTS.md`
- `00-system/SCHEMA.md`
- `00-system/OPERATING-RULES.md`

## Workflow

1. Determine the source date.
2. Create or update `01-daily-dumps/YYYY-MM-DD.md`.
3. Extract plans, projects, people, processes, open items, resolved items, and decisions.
4. Update one page per mentioned object.
5. Preserve unknowns as `Unknown`.
6. Assign severity to open items.
7. Update `06-reminders/open-reminders.md`.
8. Update relevant folder indexes.
9. Update root `index.md`.
10. Append to `log.md`.
11. Report what changed and what still needs attention.

## Extraction Rules

- Treat "wrapped", "done", "loaded", "sent", "QC'd", "passed", and "all set" as possible resolved signals.
- Treat "waiting", "need", "follow up", "check", "figure out", "ask", and "make sure" as possible open-item signals.
- Treat repeated lessons as process candidates.
- Treat names tied to plans, files, or asks as people candidates.

## Output Summary

End with:

- pages created
- pages updated
- biggest reminders
- unresolved unknowns

