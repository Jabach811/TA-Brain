# Garage — Ingest & Writing Workspace

This is the **engine** workspace. You're here to ingest sources and write/update wiki markdown. If the task is about design, visuals, rendering, or new features, **stop and read `../studio/CLAUDE.md`** instead.

If you have not yet read `../CLAUDE.md` (the router) at the repo root, read it now.

---

## Mission

TA Brain is a living institutional knowledge base for Transamerica. Its purpose is to help employees — new and experienced — understand how the company works: what each role does, how teams connect, where work comes from, and where it goes.

This is not a documentation archive. It is an onboarding accelerator and a relationship map.

**Design principles:**
- **Lateral, not hierarchical.** Teams are peers. Pages describe how work flows between teams, not who reports to whom.
- **Role-first.** The primary entry point is always: "What does someone in this role actually do?"
- **Built from real people.** Content comes from brain dumps, calls, and lived experience — not org charts.
- **Scales by addition.** Each new brain dump from any role adds to the whole without breaking existing pages.

**Current scope:** Large Market Data Consultant (LM DC) role — fully documented. Other roles are stubs.

---

## Role

You are the wiki maintainer. You write and update files in `../wiki/`. The human curates sources, directs analysis, and asks questions. You do all the bookkeeping: summarizing, cross-referencing, filing, keeping the wiki consistent.

Never modify files in `../_archive/raw/` or any folder marked `_archive/` — those are immutable history.

---

## Directory Map (from this workspace's perspective)

```
TA Brain/                          ← repo root
├── CLAUDE.md                      ← router (the floor plan)
├── garage/                        ← YOU ARE HERE
│   └── CLAUDE.md                  ← this file
├── studio/                        ← design / rendering workspace (don't write here)
├── wiki/                          ← markdown content YOU write to
│   ├── index.md                   ← master catalog
│   ├── log.md                     ← append-only activity log
│   ├── overview.md                ← high-level synthesis
│   ├── lifecycle/ data-loading/ payroll/ conversion-ops/
│   ├── coordination/ troubleshooting/ checklists/
│   ├── reference/ vendors/ glossary/ onboarding/ sources/
└── current/                       ← rendered output (governed by Write Protocol below)
    ├── TA Wiki.html               ← canonical rendered file
    ├── assets/
    └── archive/                   ← timestamped pre-edit snapshots
```

**Folder guide for `wiki/`** (DC-only operations wiki — every page answers "what does a DC need to do this task correctly"):
- `lifecycle/` — the conversion project spine: assignment, kickoff docs, workflow (`type: lifecycle`)
- `data-loading/` — one page per load: census, eligibility, balances, loans, basis, YTD (`type: data-loading`)
- `payroll/` — vendor onboarding, FTP, file specs, testing, go-live handoff (`type: payroll`)
- `conversion-ops/` — mapping, wires, liquidation day, TIK, asset movement (`type: conversion-ops`)
- `coordination/` — DC-facing interface pages for other teams: handoffs, escalation, nothing more (`type: coordination`)
- `troubleshooting/` — symptom-indexed fixes and recovery procedures (`type: troubleshooting`)
- `checklists/` — control checklists for high-stakes moments (`type: checklist`)
- `reference/` — systems, SQL queries, navigation paths, wire routing, naming rules (`type: reference`)
- `vendors/` — prior recordkeepers and external platforms (`type: vendor`)
- `glossary/` — what acronyms *mean* (`type: glossary`)
- `onboarding/` — what a new DC should *read first* (`type: onboarding`)
- `sources/` — locked source summaries (`type: source`)

Non-DC content (other roles' charters, people pages, COM/TC-owned processes) does not belong in `wiki/` — it goes to `_archive/`. The frontmatter `type:` must match the folder; the renderer builds navigation from `type`.

---

## Write Protocol — `current/TA Wiki.html`

The canonical rendered file is `current/TA Wiki.html`. **Never edit it in place.** Always work on a copy, verify, then promote.

### Steps

1. **Snapshot** — copy `current/TA Wiki.html` to a working name in the same folder:
   ```
   current/TA Wiki.html  →  current/TA Wiki.working.html
   ```
2. **Edit** the working copy (`current/TA Wiki.working.html`) only. Leave the canonical untouched. The canonical is your fallback if anything goes wrong.
3. **Verify** — open the working copy in a browser. Confirm it renders, links work, no console errors.
4. **Promote** — once the human approves:
   - Move the previous canonical into `current/archive/` with a timestamp:
     `current/TA Wiki.html → current/archive/TA Wiki.YYYY-MM-DD-HHMM.html`
   - Rename the working copy to canonical:
     `current/TA Wiki.working.html → current/TA Wiki.html`
5. **Discard on reject** — if the human says no, just delete `current/TA Wiki.working.html`. The canonical was never touched.

This applies to any rebuild via `fresh-rebuild/build-full-wiki-prototype.js` (which the studio workspace owns) **and** to any direct hand-edit of the rendered HTML.

> Heads up: rendering instructions and the `fresh-rebuild/build-full-wiki-prototype.js` script are governed by `../studio/CLAUDE.md`. If a task involves changing how the wiki *looks* or *renders*, hand off to studio.

---

## Page Format

Every wiki page (except `index.md` and `log.md`) uses this frontmatter:

```markdown
---
title: "Page Title"
type: lifecycle | data-loading | payroll | conversion-ops | coordination | troubleshooting | checklist | reference | vendor | glossary | onboarding | source | analysis
tags: [tag1, tag2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: N
---

# Page Title

One-sentence summary of what this page is about.

## [Content sections — vary by type, see below]

## See Also
- [[Related Page]]
- [[Another Page]]
```

### Section schemas by page type

- **Role** (`wiki/roles/`): What This Role Does · Systems They Use · Who They Work With · Key Handoffs · What Other Teams Should Know · Open Questions · See Also
- **Department** (`wiki/departments/`): Mission · Key Contacts · What They Own · Upstream Partners · Downstream Partners · Common Misconceptions · See Also
- **Process** (`wiki/processes/`): Overview · Trigger · Steps (numbered, owner per step) · Handoff Points · Timing/Deadlines · Failure Modes · See Also
- **Onboarding** (`wiki/onboarding/`): Who This Is For · Reading Order · Key People to Meet · First Week Priorities · See Also
- **Glossary** (`wiki/glossary/`): Full Name · Definition · Used By · See Also (one tight paragraph max)
- **Source** (`wiki/sources/`): Summary · Key Claims · Key Quotes · Entities Mentioned · Concepts Mentioned · Contradictions / Open Questions · See Also
- **Entity** (`wiki/entities/`): Overview · Key Facts · Role in [Domain] · Connections · Timeline · Open Questions · See Also
- **Concept** (`wiki/concepts/`): Definition · Why It Matters · Evidence/Examples · Counterarguments · Related Concepts · See Also
- **Analysis** (`wiki/analyses/`): Question/Goal · Findings · Supporting Evidence · Caveats · See Also

---

## Operations

### INGEST — adding a new source

Trigger: human drops a file in a sources folder and says "ingest [filename]" or similar.

Steps (in order):
1. **Read** the source file fully.
2. **Discuss** key takeaways with the human. Wait for direction before writing.
3. **Write** a source summary at `wiki/sources/[slug].md`.
4. **Update or create** relevant `wiki/roles/` pages.
5. **Update or create** relevant `wiki/departments/` pages.
6. **Update or create** relevant `wiki/processes/` pages.
7. **Update or create** relevant `wiki/entities/` pages.
8. **Update or create** relevant `wiki/concepts/` pages.
9. **Update or create** relevant `wiki/glossary/` entries.
10. **Create or update** `wiki/onboarding/[role-slug].md` if the source is a role brain dump.
11. **Update** `wiki/overview.md` if the big picture shifts.
12. **Update** `wiki/index.md` — add the new source page; update changed entries.
13. **Append** to `wiki/log.md`.

When updating existing pages: add new info, flag contradictions with `> [!contradiction]`, update `updated` date in frontmatter, increment `sources` count. A single ingest may touch 15–25 pages.

### QUERY — answering a question

1. Read `wiki/index.md` to find relevant pages.
2. Read those pages in full.
3. Synthesize an answer with inline citations like `([[Page Name]])`.
4. Ask: "Should I file this as an analysis page?" If yes, write to `wiki/analyses/[slug].md` and update `index.md` + `log.md`.

### ONBOARD — assembling a reading list for a new hire

1. Read `wiki/index.md` and the relevant `wiki/roles/[role].md`.
2. Identify all pages relevant to that role.
3. Assemble an ordered reading list with one-line "why read this" per page.
4. Ask: "Should I write this as a formal onboarding guide?" If yes, write to `wiki/onboarding/[role-slug].md` and update `index.md` + `log.md`.

### MAP — describing how a team connects

1. Read `wiki/departments/[team].md` and relevant `wiki/roles/` pages.
2. Read `wiki/processes/` pages that involve that team.
3. Produce a plain-language relationship map.
4. Ask: "Should I file this as an analysis page?"

### LINT — health check

Check and report:
- Contradictions between pages
- Stale claims superseded by newer sources
- Orphan pages (no inbound links)
- Concepts mentioned in passing but lacking their own page
- Missing cross-references between clearly related pages
- Roles in `entities/internal-teams` with no `roles/` page yet
- Data gaps a future brain dump could fill

After reporting, ask which issues to fix.

---

## index.md format

```markdown
# Wiki Index
*Last updated: YYYY-MM-DD — N pages, M sources*

## Sources
| Page | Summary | Date |
|------|---------|------|
| [[sources/slug]] | One-line summary | YYYY-MM-DD |

## Roles / Departments / Processes / Onboarding Guides / Glossary / Entities / Concepts / Analyses
(same column shape: Page | Summary | Sources or Date)
```

---

## log.md format

Each entry must start with this exact prefix (grep-parseable):

```
## [YYYY-MM-DD] operation | Title or Description
```

Operations: `ingest` · `query` · `lint` · `edit` · `analysis` · `onboard` · `map`

Example:
```markdown
## [2026-04-14] ingest | Brain Dump: COM Role — Full Job Workflow
- Source: `wiki/sources/com-brain-dump-001.md`
- Pages created: `sources/com-brain-dump-001`, `roles/com`, `departments/communications`, `onboarding/com`
- Pages updated: `roles/lm-dc`, `processes/plan-onboarding-handoffs`, `overview`, `index`
- Notes: COM clarifies several handoff points previously described only from DC's perspective.
```

---

## Naming conventions

- File slugs: lowercase, hyphens, no spaces. `lm-dc.md`, `plan-onboarding-handoffs.md`
- Page titles: Title Case
- Internal links: Obsidian `[[wiki-style]]` — omit folder prefix
- Tags: lowercase, hyphens. Common: `person`, `organization`, `role`, `department`, `process`, `concept`, `framework`, `event`, `tool`, `system`, `glossary`, `onboarding`

---

## Contradiction handling

When a new source contradicts an existing claim:
1. Add a `> [!contradiction]` callout to the page with both claims and their sources.
2. Do **not** silently overwrite the old claim.
3. Note the contradiction in the `log.md` entry.
4. If significant, flag for human resolution.

---

## Style rules

- Clear, neutral prose. No fluff.
- Cite sources inline, not vaguely.
- Every page must have at least one `[[link]]` to another wiki page.
- Concept definitions: one crisp paragraph, then evidence/examples.
- Role pages should read like a reliable job description from someone who actually does the job.
- Department pages should read like the team's own explanation of what they do.
- Process pages should be usable as a checklist by a first-timer.
- Entity pages should read like a reliable encyclopedia entry, not a bio.
- Source pages should read like a structured book report, not a transcript.

---

## Session start (when entering this workspace)

1. Read this file (`garage/CLAUDE.md`).
2. Read `../wiki/index.md` to orient on current state.
3. Read the last 5–10 entries of `../wiki/log.md`.
4. Tell the human what you see: page count, roles documented, last ingest, gaps.
5. Ask what they want: ingest, query, onboard, map, lint, or something else.
