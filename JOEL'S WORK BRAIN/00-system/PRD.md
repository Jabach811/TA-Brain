# Joel's Work Brain PRD

*Created: 2026-05-05*
*Status: Version 1 starter system*

## 1. Product Goal

Joel's Work Brain is a personal work operating system for capturing messy daily work context and turning it into organized, useful markdown files.

It should help Joel:

- remember plan details
- track deadlines and file status
- keep contacts straight
- notice stale open items
- preserve process lessons
- keep side projects alive
- generate useful visual daily briefs

## 2. Product Shape

This is not the TA Brain wiki. It is a companion vault.

TA Brain answers:

> How does the work/company/process function?

Joel's Work Brain answers:

> Where am I right now, what is open, what changed, and what should I do next?

## 3. Core Objects

### Plans

Client plan work. Each plan should track:

- current status
- conversion type if known
- effective date
- wire date
- test file dates
- final file dates
- deadlines
- client contact
- payroll contact
- vendor/prior RK contact
- COM
- TC
- QA or other internal partners
- open items
- resolved items
- mention history
- reminder status
- plan-specific quirks

### Projects

Side projects and internal improvement work, such as TA Brain, onboarding, procedure pages, automations, and tools.

### People

Operational contacts. These are not biographies. They should explain:

- who the person is
- what they help with
- plans or projects they are tied to
- last relevant interaction
- open asks

### Processes

Reusable ways of working. These include lessons learned, checklists, decision rules, and things Joel wants to standardize.

### Daily Dumps

Raw-ish daily context converted into a structured summary. Daily dump pages are the source layer for later updates.

### Reminders

Generated from unresolved open items, stale plan mentions, looming dates, or repeated process risks.

### Brief Sheets

Tall hand-drawn visual summaries of the current work state.

## 4. Ingest Behavior

When Joel gives a brain dump, Codex should:

1. Create or update the daily dump page.
2. Extract plan updates.
3. Extract project updates.
4. Extract people/contact updates.
5. Extract process lessons.
6. Extract open items.
7. Attach severity and reminder timing.
8. Update the index.
9. Append to the log.
10. Offer or create a brief sheet.

## 5. Open Item Model

Each open item should include:

- item
- owner
- plan/project
- severity
- first mentioned date
- last mentioned date
- due date if known
- status
- reminder rule
- notes

## 6. Reminder Model

Severity levels:

- `S1 Critical`: remind same day until resolved
- `S2 High`: remind next business day if quiet
- `S3 Medium`: remind after 2-3 business days if quiet
- `S4 Low`: remind during weekly review

Reminder logic should be practical, not annoying. It should surface forgotten risk.

## 7. Visual Brief Sheet

The preferred visual output is a tall Excalidraw-style work map:

- off-white background
- black sketch marker outlines
- no blue filled panels
- empty checklist boxes
- conversational brief section
- actionable checklist
- important reminders
- process notes
- fun side project section

The brief sheet should feel like something worth pinning on a monitor.

## 8. Non-Goals

This system should not:

- replace NBI, P3, EDS, or official plan records
- store sensitive private data beyond what Joel intentionally provides
- become a formal company system of record
- mix personal work status into the official TA Brain wiki
- overcomplicate simple follow-ups

## 9. Success Criteria

This system is working when:

- Joel can dump messy context and get organized files back.
- Active plans have one clear page each.
- Open items do not disappear.
- Stale risks get surfaced.
- Process lessons become reusable.
- Side projects stay visible.
- The daily visual sheet is fast to regenerate.

