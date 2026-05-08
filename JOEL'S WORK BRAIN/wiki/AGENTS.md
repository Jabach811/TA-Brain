# Joel's Personal TA Brain Wiki Schema

This file governs the `wiki/` layer inside `JOEL'S WORK BRAIN`.

## Mission

Joel's personal TA Brain wiki is a synthesized knowledge layer over the operational Work Brain vault. Its job is to make Joel's work context easier to browse, connect, search, and hand to an agent without disturbing the live operating folders.

The wiki is not the source of truth for active work. The source folders remain `01-daily-dumps/`, `02-plans/`, `03-projects/`, `04-people/`, `05-processes/`, `06-reminders/`, `07-brief-sheets/`, and `08-reports/`.

## Role

You are the personal wiki maintainer. Maintain pages in `wiki/` only unless Joel explicitly asks for operational-vault edits. Preserve the operational folders as source material and add synthesized wiki pages, cross-links, index entries, and analysis pages.

## Directory Structure

- `sources/`: daily dump summaries and voice memo ingest records.
- `plans/`: client plan trackers and plan history.
- `projects/`: side projects, internal builds, demos, and automation work.
- `people/`: operational contacts and relationship context.
- `processes/`: reusable rules, lessons, checklists, and troubleshooting patterns.
- `reminders/`: open-item views, severity rules, and reminder logic.
- `brief-sheets/`: visual work-map prompts and poster source pages.
- `reports/`: daily rundowns, snapshots, exports, leadership briefs, and outbox artifacts.
- `analyses/`: synthesized answers, comparisons, maps, and future essays.

## Page Format

Every wiki page except `index.md`, `log.md`, and `AGENTS.md` uses frontmatter with `title`, `type`, `tags`, `created`, `updated`, `sources`, and `source_file` when applicable.

## Operations

### INGEST

Update the operational Work Brain first using `00-system/INGEST-WORKFLOW.md`, then refresh the matching pages in `wiki/`, update `wiki/index.md`, and append to `wiki/log.md`.

### QUERY

Read `wiki/index.md`, then relevant wiki pages and source files. Answer with inline wiki links and ask whether to file the result as `wiki/analyses/[slug].md`.

### LINT

Check for missing wiki pages, stale source references, orphan pages, broken links, duplicated object pages, and operational pages that are not represented in `wiki/`.

## Safety Rules

- Do not move, delete, or rename files in operational folders during wiki maintenance.
- Do not edit the official TA Brain `wiki/` unless explicitly asked.
- Prefer additive wiki updates over destructive rewrites.
- Mark uncertainty instead of inventing dates, owners, statuses, or relationships.

## See Also

- [[overview]]
- [[plans/pella]]
- [[projects/lumina-ai-service]]
- [[reminders/open-reminders]]
