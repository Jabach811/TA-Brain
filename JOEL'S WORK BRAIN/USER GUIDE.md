# User Guide

This guide explains how to run Joel's Work Brain without overthinking it.

## What This Is

This is your personal work tracker. It is built for the messy real stuff:

- plan status
- effective dates
- wire dates
- test file dates
- final file dates
- client, payroll, vendor, COM, and TC contacts
- open items
- follow-ups
- side projects
- lessons learned
- reminders when something has gone quiet

## The Daily Workflow

1. Give Codex a brain dump.
2. Say: `ingest this into Joel's Work Brain`.
3. Codex should update the relevant files.
4. Codex should summarize what changed.
5. Codex should flag anything stale, urgent, or unclear.
6. Ask for a whiteboard brief sheet when you want a visual breakdown.

## Where Things Go

`01-daily-dumps/`

Use this for source material from a specific day. These are not perfect docs. They are captured context.

`02-plans/`

Use this for real client plans. Each plan gets one markdown file with status, dates, contacts, open items, and reminder history.

`03-projects/`

Use this for side projects like TA Brain, onboarding, workflow pages, automations, and internal tools.

`04-people/`

Use this for contacts and relationship notes. Keep it operational: who they are, what they help with, and what plans/projects they touch.

`05-processes/`

Use this for reusable work patterns, lessons, and decision rules.

`06-reminders/`

Use this to see what needs attention because it is urgent, stale, blocked, or unresolved.

`07-brief-sheets/`

Use this for the tall Excalidraw-style daily visual breakdowns.

`08-reports/`

Use this for generated reports: daily briefs, weekly plans, current snapshots, profile exports, and leadership/demo packs.

`00-system/skills/`

Use this for local workflow skills. These are the instruction files that tell Codex how to ingest dumps, build reports, run weekly reviews, and create the hand-drawn brief sheets.

## Plan File Rule

Every active plan file should answer:

- What is the current status?
- What are the key dates?
- Who is involved?
- What files are expected?
- What is blocked?
- What open items exist?
- When was each open item last mentioned?
- How severe is each open item?
- What should Codex remind me about?

## Severity Guide

Use simple weights:

- `S1 Critical`: money movement, wire, go-live, deadline today, client-blocking issue
- `S2 High`: due in 1-2 business days, final files, deferrals, plan setup blocker
- `S3 Medium`: needs follow-up this week, waiting on contact, meeting prep
- `S4 Low`: useful cleanup, documentation, nice-to-have

## Reminder Rule

Open items should get attention when:

- `S1`: same day if unresolved or not mentioned again
- `S2`: next business day if quiet
- `S3`: after 2-3 business days if quiet
- `S4`: weekly review

If an item is explicitly resolved, move it to the resolved section in that plan file.

## Whiteboard Brief Sheet Rule

When you want the cool visual:

1. Ask for a tall hand-drawn work map.
2. Use the style guide in `07-brief-sheets/style-guide.md`.
3. Include:
   - The Brief
   - Checklist
   - Important Reminders
   - Process Notes
   - Fun Stuff

## Best Prompt

Use this:

```text
Here is my work brain dump for today. Ingest it into Joel's Work Brain, update plan/project/person/process/reminder files, then give me a concise status summary. After that, create the tall Excalidraw-style brief sheet.
```

## Best Report Prompts

```text
Build me a current caseload snapshot from Joel's Work Brain.
```

```text
Run a weekly review and give me my Monday launch list.
```

```text
Create a boss-ready one-pager from my projects and recent wins.
```

```text
Export a profile for Pella with status, contacts, dates, open items, and next actions.
```

## Local Skill Map

- `ingest-dump`: use for daily dumps and voice memo transcripts.
- `build-report`: use for reports, exports, snapshots, and leadership briefs.
- `create-brief-sheet`: use for the tall hand-drawn image style.
- `weekly-review`: use for weekly planning and stale reminder review.
