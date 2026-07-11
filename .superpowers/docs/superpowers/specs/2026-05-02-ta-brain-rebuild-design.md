# TA Brain - Wikipedia-Style Rebuild PRD

*Original draft: 2026-05-02*
*Rewritten: 2026-05-03*
*Status: Corrected PRD for implementation*

---

## 0. Hard Direction Change

The prior "conversion lifecycle operating system" direction is rejected.

Do not build TA Brain as:

- a dashboard
- a workflow command center
- a lifecycle map-first product
- a conversion spine with every page orbiting phases
- a task app with cards, stage panels, or operational modules

That structure is wrong for this project.

TA Brain should be a **Wikipedia-style internal knowledge site**: article-first, browseable, calm, searchable, cross-linked, and built for reading. It can still document workflows, teams, systems, documents, and risks, but the site experience should feel like an internal encyclopedia, not a product dashboard.

The correct mental model is:

> "I can browse and read a living TA encyclopedia."

Not:

> "I can run a conversion from this screen."

---

## 1. Product Goal

TA Brain is a local Wikipedia-style knowledge base for Transamerica operational knowledge.

The rebuilt site should help employees:

- look up a role, team, system, document, person, process, or acronym
- browse related topics naturally
- understand how work connects across teams
- read long-form pages without visual noise
- discover nearby knowledge through links, categories, backlinks, and search
- trust what is known, what is sourced, and what is still incomplete

The site should feel like a serious internal wiki with good taste: clean, dense enough to be useful, calm enough to read, and structured enough to scale.

---

## 2. User Experience Principle

The page is the product.

Every design decision should make article reading, browsing, searching, and cross-referencing better. The app shell should stay quiet and supportive. The site should not try to turn every workflow into a visual journey.

Good TA Brain pages should feel like Wikipedia pages adapted for internal company knowledge:

- clear title
- concise summary
- optional infobox
- table of contents
- readable sections
- category breadcrumbs
- internal links everywhere they help
- backlinks / "Referenced by"
- See Also
- source visibility
- last updated date
- clear open questions

---

## 3. Non-Goals

Out of scope:

- building a dashboard-first app
- making a lifecycle map the home page
- replacing the markdown wiki with a database
- changing `raw/` source handling
- adding authentication or hosting
- adding a complex task-management layer
- creating big marketing-style landing pages
- forcing every topic into a conversion phase

The rebuild should improve the existing local wiki builder model, not replace the wiki with a new product metaphor.

---

## 4. Core Experience

### 4.1 Home Page

The home page should behave like a Wikipedia main page for TA Brain.

It should include:

- site title and short purpose
- prominent search
- "Start browsing" category links
- recently updated pages
- featured or cornerstone articles
- current knowledge gaps
- source/archive link area

It should not include:

- lifecycle timeline as the main visual
- operational dashboard stats as the main concept
- hero-scale marketing layout
- card-heavy command center design

### 4.2 Article Page

Article pages are the main experience.

Each page should render with:

- page title
- one-sentence summary if available
- frontmatter-derived metadata
- optional right-side infobox on desktop
- table of contents for longer pages
- clean markdown body
- styled callouts
- See Also
- backlinks / pages that reference this page
- source count and updated date

The article layout should prioritize reading. Use a reasonable line length, strong heading hierarchy, readable tables, and a quiet left navigation.

### 4.3 Browsing

Browsing should work like an encyclopedia:

- category pages list all pages in a topic group
- sidebar exposes major namespaces
- each page shows related pages
- backlinks make discovery bidirectional
- search is always available
- page aliases help acronym lookup

Readers should not need to understand the folder schema before finding a topic.

---

## 5. Information Architecture

The IA should be Wikipedia-like namespaces, not workflow modules.

### 5.1 Main Namespaces

Use these reader-facing buckets:

| Namespace | Purpose |
|---|---|
| Home | Main wiki entry point |
| Roles | Job role articles |
| Departments | Team / department articles |
| Systems | Tools, platforms, applications |
| Documents | Forms, packages, notices, templates, reports, files |
| Processes | Cross-team workflows and operational procedures |
| People | Curated operational people / SMEs |
| Glossary | Short acronym and term pages |
| Reference | Concepts that are not cleanly documents, systems, roles, people, or processes |
| Sources | Locked source summaries / archive |
| Analyses | Filed synthesis pages |

This is not a lifecycle hierarchy. It is an encyclopedia taxonomy.

### 5.2 Folder Layout

```text
wiki/
  index.md
  log.md
  overview.md
  roles/
  departments/
  systems/
  documents/
  processes/
  people/
  glossary/
  reference/
  onboarding/
  sources/
  analyses/
```

`onboarding/` can remain as a specialized namespace because reading guides are useful, but it should not dominate the main wiki structure.

### 5.3 Page Types

Valid page types:

```text
role | department | system | document | process | person | glossary | reference | onboarding | source | analysis
```

Do not add `lifecycle-phase` as a page type.

---

## 6. Navigation Model

### 6.1 Left Sidebar

The left sidebar should be a wiki table of contents.

Preferred behavior:

- grouped by namespace
- collapsible sections
- alphabetical page lists inside each namespace
- counts per namespace
- source/archive sections collapsed by default

The sidebar should not be a task menu. It should not start with "Conversion Lifecycle."

### 6.2 Search

Search is a primary navigation method.

Search should support:

- title
- slug
- aliases
- summary
- headings
- body text
- tags
- page type

Search results should show:

- title
- namespace/type
- short snippet
- updated date or source count if useful

### 6.3 Category Browsing

Every page can have `tags` and optional `categories`.

Category pages can be generated from metadata. Examples:

- conversion
- payroll
- eligibility
- plan-setup
- data-loading
- communications
- p3
- eds
- informatica
- risk
- recent-change

Categories are browse aids. They should not replace namespaces.

### 6.4 Backlinks

Every article should show "Referenced By" or "Backlinks" when other pages link to it.

This is critical for a Wikipedia-style site because it lets a reader discover context from any article.

---

## 7. Article Design

### 7.1 Layout

Desktop article layout:

```text
left sidebar | article content | optional infobox / page tools
```

Mobile article layout:

```text
top search/nav
article content
infobox collapses near top
toc collapses into details/accordion
```

Keep the article calm:

- no giant cards inside article pages
- no decorative page sections
- no dashboard widgets in the main reading flow
- no lifecycle map as default page chrome

### 7.2 Infobox

Infoboxes should feel like Wikipedia infoboxes: compact, factual, and optional.

Common fields:

- Type
- Namespace
- Updated
- Sources
- Tags
- Owner department, if relevant
- Related departments, if relevant

Type-specific examples:

For a person:

- Role / team
- Key knowledge
- Connected systems
- Connected processes

For a system:

- Used by
- Related procedures
- Known SMEs
- Failure modes

For a document:

- Created by
- Used by
- When it appears
- Related process

For a process:

- Trigger
- Owner
- Involved teams
- Related systems/documents

### 7.3 Table of Contents

Generate a table of contents from headings for medium and long pages.

The TOC should:

- sit near the top of the article or in the right rail
- highlight current section if feasible
- collapse on mobile

### 7.4 Callouts

Support Obsidian-style callouts:

```markdown
> [!key] Important fact.
> [!warning] Common failure mode.
> [!contradiction] Conflicting source claims.
> [!question] Open question.
```

Callouts should look like article annotations, not app alerts.

### 7.5 See Also

Every normal page should keep a `## See Also` section.

The builder can add backlinks automatically, but authored See Also links remain valuable.

---

## 8. Content Rules

### 8.1 Keep Pages Article-First

Each page should answer:

- What is this?
- Why does it matter?
- Who uses it or owns it?
- What does it connect to?
- What should a reader know before leaving?

The page can include steps or workflows when needed, but it should still read like an article.

### 8.2 Processes Are Articles Too

Process pages should not become task-app screens.

They should include:

- overview
- trigger
- step-by-step section
- timing / deadlines
- handoff points
- failure modes
- related pages

### 8.3 Glossary Pages Stay Short

Glossary pages should be short lookup entries.

If a glossary term needs depth, the glossary page should link to the full article in systems, documents, processes, or reference.

### 8.4 People Pages Are Curated

People pages are not an employee directory.

A person page is justified only when the person is operationally meaningful:

- SME
- recurring approval gate
- handoff point
- routing node
- important training/escalation contact

### 8.5 Open Questions Are Visible

Do not hide gaps behind polished prose.

Use:

- `## Open Questions`
- `[!question]` callouts
- category/tag `knowledge-gap`

---

## 9. Migration Guidance

### 9.1 What To Change

Reclassify existing pages into clearer wiki namespaces:

- system pages from `entities/` to `systems/`
- person pages from `entities/` to `people/`
- team pages from `entities/` to `departments/`
- document pages from `concepts/` to `documents/`
- operational concepts from `concepts/` to `reference/`
- workflows and procedures to `processes/`

This is a wiki cleanup, not a product redesign.

### 9.2 What Not To Do

Do not:

- build a lifecycle-first app
- create a conversion phase namespace
- force pages to attach to phases
- replace article browsing with card dashboards
- make the home page a workflow map
- collapse the wiki into one "Run the conversion" experience

### 9.3 Slug Safety

The current builder resolves pages by bare slug, so filename stems must be globally unique unless routing is deliberately changed.

Add build preflight checks for:

- duplicate slugs
- unresolved wikilinks
- missing frontmatter
- invalid page type

### 9.4 Merge Before Remove

Do not delete useful facts.

If a page is removed or merged:

- move unique content into the correct article
- update links
- add redirect/alias support if possible
- note the merge in `wiki/log.md`

---

## 10. Build Script Requirements

`build-wiki.py` should support the Wikipedia-style experience.

Required changes:

- namespace/sidebar labels for the new folder layout
- duplicate slug preflight
- unresolved wikilink report
- backlinks generation
- aliases support from frontmatter
- article table of contents
- optional infobox rendering
- reader-mode typography
- styled callouts
- improved search indexing
- category/tag browsing
- source pages collapsed/locked as archive material

Do not prioritize dashboard components, lifecycle visualizations, or phase-based aggregation.

---

## 11. Frontmatter

Use simple frontmatter that the current parser can support.

Base template:

```markdown
---
title: "Page Title"
type: role | department | system | document | process | person | glossary | reference | onboarding | source | analysis
tags: [tag-one, tag-two]
aliases: [Alternate Name, Acronym]
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: N
owner_department: department-slug
departments: [department-one, department-two]
---
```

Only use `owner_department` and `departments` when relevant. Glossary, source, and analysis pages may not need them.

---

## 12. Index Format

`wiki/index.md` should become a wiki catalog, not a product sitemap.

Recommended format:

```markdown
# Wiki Index
*Last updated: YYYY-MM-DD - N pages, M sources*

## Roles
| Page | Summary | Sources | Updated |

## Departments
| Page | Summary | Sources | Updated |

## Systems
| Page | Summary | Sources | Updated |

## Documents
| Page | Summary | Sources | Updated |

## Processes
| Page | Summary | Sources | Updated |

## People
| Page | Summary | Sources | Updated |

## Glossary
| Page | Definition | Sources |

## Reference
| Page | Summary | Sources | Updated |

## Onboarding
| Page | For Role | Updated |

## Sources
| Page | Summary | Date |

## Analyses
| Page | Summary | Date |
```

---

## 13. Visual Direction

The visual direction should be internal-wiki polished:

- calm article reading surface
- light neutral background
- restrained accent color
- compact typography
- clear blue or teal internal links
- table and callout styling
- sidebar that feels like a wiki navigator
- no oversized hero treatment
- no dashboard cards as the dominant layout
- no dramatic gradient product shell

Good inspiration:

- Wikipedia article structure
- Apple support docs restraint
- Obsidian publish-style knowledge base
- internal enterprise wiki with better typography

Bad inspiration:

- SaaS dashboard
- product launch page
- workflow cockpit
- lifecycle timeline app
- card-heavy landing page

---

## 14. Acceptance Criteria

The rebuild is successful when:

- [ ] The site feels like a Wikipedia-style internal knowledge base.
- [ ] Home provides search, category browsing, recent pages, and cornerstone articles.
- [ ] Articles are the primary experience.
- [ ] Sidebar is namespace-based and browseable.
- [ ] Search works across titles, aliases, tags, summaries, and body text.
- [ ] Pages show backlinks / referenced-by links.
- [ ] Longer pages have a table of contents.
- [ ] Infoboxes render where useful without overwhelming the article.
- [ ] New namespaces exist: systems, documents, people, reference.
- [ ] Old `entities` and overloaded `concepts` pages are migrated or clearly mapped.
- [ ] There are no duplicate slugs.
- [ ] There are no unresolved internal links unless explicitly documented.
- [ ] `wiki/index.md` is regenerated accurately.
- [ ] `wiki/log.md` records the migration.
- [ ] Source pages remain locked/archive-like.
- [ ] No lifecycle-map-first UI is introduced.

---

## 15. Implementation Order

1. Add build preflight checks: duplicate slugs, unresolved links, invalid frontmatter.
2. Add namespace labels and sidebar support for systems, documents, people, and reference.
3. Add backlinks, aliases, table of contents, and infobox rendering.
4. Improve article CSS for a calm Wikipedia-style reading experience.
5. Update `AGENTS.md` and `CLAUDE.md` to remove entity/concept-first guidance and add the new wiki namespace rules.
6. Create migration map for current `entities/` and `concepts/`.
7. Move/merge pages in batches, preserving unique facts.
8. Regenerate `wiki/index.md`.
9. Rebuild `current/wiki.html`.
10. Run final validation and append one migration entry to `wiki/log.md`.

---

## 16. Bottom Line

Build TA Brain as a great internal Wikipedia.

The site should make people want to search, browse, read, and follow links. It should preserve the richness of the wiki instead of flattening it into a workflow product.

The lifecycle-first structure is permanently rejected for this rebuild.
