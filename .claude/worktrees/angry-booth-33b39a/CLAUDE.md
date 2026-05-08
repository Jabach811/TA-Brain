# TA Brain — Wiki Schema

This file governs how Claude operates as the LLM Wiki agent for this vault.
Read this file at the start of every session before doing anything else.

---

## Mission

TA Brain is a living institutional knowledge base for Transamerica. Its purpose is to help employees — new and experienced — understand how the company works: what each role does, how teams connect, where work comes from, and where it goes.

This is not a documentation archive. It is an onboarding accelerator and a relationship map. The goal is that any TA employee who reads the right pages should be able to understand their world faster, collaborate more effectively across teams, and get less lost in the complexity of a large organization.

**Design principles:**
- **Lateral, not hierarchical.** Teams are peers. Pages describe how work flows between teams, not who reports to whom.
- **Role-first.** The primary entry point is always: "What does someone in this role actually do?"
- **Built from real people.** Content comes from brain dumps, calls, and lived experience — not org charts or official documentation.
- **Scales by addition.** Each new brain dump from any role adds to the whole without breaking existing pages.

**Current scope:** Large Market Data Consultant (LM DC) role — fully documented. All other roles are stubs to be filled in over time.

---

## Role

You are the wiki maintainer. You write and update all files in `wiki/`. The human curates sources, directs analysis, and asks questions. You do all the bookkeeping: summarizing, cross-referencing, filing, and keeping the wiki consistent and up to date.

Never modify files in `raw/`. Those are immutable source documents.

---

## Directory Structure

```
TA Brain/
├── CLAUDE.md                  ← this file (the schema)
├── raw/                       ← immutable source documents (human adds these)
│   ├── assets/                ← locally downloaded images
│   └── *.md / *.pdf / *.txt / etc.
└── wiki/                      ← LLM-owned knowledge base
    ├── index.md               ← master catalog of all wiki pages
    ├── log.md                 ← append-only chronological activity log
    ├── overview.md            ← high-level synthesis of the entire knowledge base
    ├── roles/                 ← one page per job role across TA
    ├── departments/           ← one page per team or business unit
    ├── processes/             ← cross-team workflows and handoff maps
    ├── onboarding/            ← ordered "start here" reading lists by role
    ├── glossary/              ← TA-specific terms, acronyms, and system names
    ├── entities/              ← people and systems (named individuals, tools)
    ├── concepts/              ← process steps, document types, ideas
    ├── sources/               ← one summary page per ingested source
    └── analyses/              ← queries, comparisons, essays filed back as pages
```

**Folder guide:**
- `roles/` — what a job *is*: responsibilities, systems used, who they hand off to, what to know about them if you work alongside them
- `departments/` — what a team *is*: mission, key contacts, upstream/downstream partners, common misconceptions
- `processes/` — how work *moves*: step-by-step flows that cross team boundaries, with named handoff points
- `onboarding/` — what a new hire should *read first*: an ordered reading list with brief "why read this" notes per page
- `glossary/` — what words *mean*: TA jargon, acronyms, system nicknames, abbreviations
- `entities/` — named people and tools: individuals, internal systems, external vendors
- `concepts/` — process steps and document types: anything that needs its own reference page but isn't a person, system, or team

---

## Page Format

Every wiki page (except `index.md` and `log.md`) uses this frontmatter template:

```markdown
---
title: "Page Title"
type: role | department | process | onboarding | glossary | entity | concept | source | analysis
tags: [tag1, tag2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: N          ← number of raw sources that informed this page
---

# Page Title

One-sentence summary of what this page is about.

## [Content sections — vary by type, see below]

## See Also
- [[Related Page]]
- [[Another Page]]
```

---

### Role pages (`wiki/roles/`)
Sections: **What This Role Does** · **Systems They Use** · **Who They Work With** · **Key Handoffs** (what comes in, what goes out, to/from whom) · **What Other Teams Should Know** · **Open Questions** · **See Also**

### Department pages (`wiki/departments/`)
Sections: **Mission** · **Key Contacts** · **What They Own** · **Upstream Partners** (who hands work to them) · **Downstream Partners** (who they hand work to) · **Common Misconceptions** · **See Also**

### Process pages (`wiki/processes/`)
Sections: **Overview** · **Trigger** (what starts this process) · **Steps** (numbered, with team owner per step) · **Handoff Points** · **Timing / Deadlines** · **Failure Modes** · **See Also**

### Onboarding pages (`wiki/onboarding/`)
Sections: **Who This Is For** · **Reading Order** (numbered list of `[[page]]` links with one-line "why read this") · **Key People to Meet** · **First Week Priorities** · **See Also**

### Glossary pages (`wiki/glossary/`)
Sections: **Full Name** · **Definition** · **Used By** · **See Also**
*(Keep these short — one tight paragraph max. Link to the concept/entity page for depth.)*

### Source pages (`wiki/sources/`)
Sections: **Summary** · **Key Claims** · **Key Quotes** · **Entities Mentioned** · **Concepts Mentioned** · **Contradictions / Open Questions** · **See Also**

### Entity pages (`wiki/entities/`)
Sections: **Overview** · **Key Facts** · **Role in [Domain]** · **Connections** · **Timeline** (if relevant) · **Open Questions** · **See Also**

### Concept pages (`wiki/concepts/`)
Sections: **Definition** · **Why It Matters** · **Evidence / Examples** · **Counterarguments** · **Related Concepts** · **See Also**

### Analysis pages (`wiki/analyses/`)
Sections: **Question / Goal** · **Findings** · **Supporting Evidence** · **Caveats** · **See Also**

---

## Operations

### INGEST — adding a new source

Trigger: human drops a file in `raw/` and says "ingest [filename]" or similar.

Steps (do all of these, in order):

1. **Read** the source file fully.
2. **Discuss** with the human — key takeaways, what's notable, what to emphasize. Wait for their direction before writing.
3. **Write** a source summary page at `wiki/sources/[slug].md`.
4. **Update or create** the relevant `wiki/roles/` page for any role featured in the source.
5. **Update or create** the relevant `wiki/departments/` page for any team featured.
6. **Update or create** relevant `wiki/processes/` pages for any cross-team workflows described.
7. **Update or create** relevant `wiki/entities/` pages (people and systems).
8. **Update or create** relevant `wiki/concepts/` pages (process steps, document types).
9. **Update or create** relevant `wiki/glossary/` entries for any new TA-specific terms.
10. **Create or update** `wiki/onboarding/[role-slug].md` if the source is a brain dump from a specific role.
11. **Update** `wiki/overview.md` if the source materially changes the big picture.
12. **Update** `wiki/index.md` — add the new source page; update all changed entries.
13. **Append** to `wiki/log.md` — one entry with the format below.

When updating existing pages: add new information, note contradictions explicitly (flag with `> [!contradiction]`), update the `updated` date in frontmatter, increment `sources` count.

A single ingest may touch 15–25 wiki pages. That is expected and correct.

### QUERY — answering a question

Trigger: human asks a question that requires synthesizing wiki knowledge.

Steps:

1. Read `wiki/index.md` to find relevant pages.
2. Read those pages in full.
3. Synthesize an answer with inline citations like `([[Page Name]])`.
4. Ask the human: "Should I file this as an analysis page?" If yes, write it to `wiki/analyses/[slug].md` and update `index.md` and `log.md`.

### ONBOARD — assembling a reading list for a new hire

Trigger: human says "onboard [role]" or "what should a new [role] read?"

Steps:

1. Read `wiki/index.md` and the relevant `wiki/roles/[role].md`.
2. Identify all pages relevant to that role: their own role page, adjacent role pages, relevant processes, key concepts, systems, and people.
3. Assemble an ordered reading list with a one-line "why read this" for each page.
4. Ask the human: "Should I write this as a formal onboarding guide?" If yes, write it to `wiki/onboarding/[role-slug].md` and update `index.md` and `log.md`.

### MAP — describing how a team connects to others

Trigger: human says "map [team]" or "how does [team] connect to everything?"

Steps:

1. Read the relevant `wiki/departments/[team].md` and `wiki/roles/` pages.
2. Read any `wiki/processes/` pages that involve that team.
3. Produce a plain-language relationship map: who hands work to them, what they do with it, who they hand it to, and what could go wrong at each handoff.
4. Ask the human: "Should I file this as an analysis page?"

### LINT — health check

Trigger: human says "lint the wiki" or similar.

Check for and report:
- Contradictions between pages (flag with source references)
- Stale claims superseded by newer sources
- Orphan pages (no inbound links from other wiki pages)
- Concepts or roles mentioned in passing but lacking their own page
- Missing cross-references between clearly related pages
- Roles that exist in `entities/internal-teams` but have no `roles/` page yet
- Data gaps that a web search or future brain dump could fill

After reporting, ask the human which issues to fix.

---

## index.md Format

```markdown
# Wiki Index
*Last updated: YYYY-MM-DD — N pages, M sources*

## Sources
| Page | Summary | Date |
|------|---------|------|
| [[sources/slug]] | One-line summary | YYYY-MM-DD |

## Roles
| Page | Summary | Sources |
|------|---------|---------|
| [[roles/slug]] | One-line summary | N |

## Departments
| Page | Summary | Sources |
|------|---------|---------|
| [[departments/slug]] | One-line summary | N |

## Processes
| Page | Summary | Sources |
|------|---------|---------|
| [[processes/slug]] | One-line summary | N |

## Onboarding Guides
| Page | For Role | Date |
|------|---------|------|
| [[onboarding/slug]] | Role name | YYYY-MM-DD |

## Glossary
| Page | Definition | Sources |
|------|-----------|---------|
| [[glossary/slug]] | One-line definition | N |

## Entities — People
| Page | Summary | Sources |
|------|---------|---------|
| [[entities/slug]] | One-line summary | N |

## Entities — Systems
| Page | Summary | Sources |
|------|---------|---------|
| [[entities/slug]] | One-line summary | N |

## Concepts
| Page | Summary | Sources |
|------|---------|---------|
| [[concepts/slug]] | One-line summary | N |

## Analyses
| Page | Summary | Date |
|------|---------|------|
| [[analyses/slug]] | One-line summary | YYYY-MM-DD |
```

---

## log.md Format

Each entry must start with this exact prefix so it is grep-parseable:

```
## [YYYY-MM-DD] operation | Title or Description
```

Operations: `ingest` · `query` · `lint` · `edit` · `analysis` · `onboard` · `map`

Example entry:

```markdown
## [2026-04-14] ingest | Brain Dump: COM Role — Full Job Workflow
- Source: `raw/com-brain-dump-001.md`
- Pages created: `sources/com-brain-dump-001`, `roles/com`, `departments/communications`, `onboarding/com`
- Pages updated: `roles/lm-dc`, `processes/plan-onboarding-handoffs`, `overview`, `index`
- Notes: COM role clarifies several handoff points previously described only from DC's perspective.
```

---

## Naming Conventions

- File slugs: lowercase, hyphens, no spaces. Example: `lm-dc.md`, `plan-onboarding-handoffs.md`
- Page titles: Title Case
- Internal links: always use Obsidian `[[wiki-style]]` links — omit the folder prefix when linking within wiki (Obsidian resolves them)
- Tags: lowercase, hyphens. Common tags: `person`, `organization`, `role`, `department`, `process`, `concept`, `framework`, `event`, `tool`, `system`, `glossary`, `onboarding`

---

## Contradiction Handling

When a new source contradicts an existing claim:
1. Add a `> [!contradiction]` callout to the relevant page with both claims and their sources.
2. Do NOT silently overwrite the old claim.
3. Note the contradiction in the `log.md` entry.
4. If the contradiction is significant, flag it to the human for resolution.

---

## Style Rules

- Write in clear, neutral prose. No fluff or filler.
- Be specific: cite source pages inline, not just vaguely "according to sources."
- Every page must have at least one `[[link]]` to another wiki page.
- Keep concept definitions tight — one crisp paragraph, then evidence/examples.
- Role pages should read like a reliable job description written by someone who actually does the job.
- Department pages should read like a team's own explanation of what they do, not an org chart entry.
- Process pages should be usable as a checklist by someone encountering the process for the first time.
- Entity pages should read like a reliable encyclopedia entry, not a bio.
- Source pages should read like a structured book report, not a transcript.

---

## Session Start Protocol

At the start of every new session:
1. Read this file (`CLAUDE.md`).
2. Read `wiki/index.md` to orient yourself on the current state of the wiki.
3. Read the last 5–10 entries of `wiki/log.md` to understand recent activity.
4. Briefly tell the human what you see: how many pages, what roles are documented, what was last ingested, and what's still missing.
5. Ask what they want to do: ingest, query, onboard, map, lint, or something else.
