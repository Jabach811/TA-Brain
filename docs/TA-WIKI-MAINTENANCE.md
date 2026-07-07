# TA Wiki Maintenance Guide

TA Wiki is a source-driven internal encyclopedia. The markdown in `wiki/` is the source of truth, and the visible rendered artifact is `current/TA Wiki.html`.

## Operating Model

- `garage/` owns ingest, wiki writing, page cleanup, link integrity, and content health.
- `studio/` owns the rendered experience, navigation, visual design, and builder behavior.
- `fresh-rebuild/build-full-wiki-prototype.js` is the namespace-aware builder base for the rebuilt wiki.
- Do not hand-edit the final rendered HTML except for emergency recovery. Rebuild it from markdown.

## Canonical Output

The canonical visible file is:

```text
current/TA Wiki.html
```

During rebuild work, generate and review a working copy first. Do not overwrite the canonical output until it has been visually checked.

## Validation

Run this before publishing:

```bash
node scripts/validate-wiki.js
node scripts/validate-wiki.js --json
```

The validator checks broken internal links, duplicate page IDs, unexpected duplicate bare slugs, stale rendered output, unindexed pages, missing frontmatter, missing status fields, source-zero pages, stub-like pages, and pages with no backlinks.

## Duplicate Slugs

Bare slug collisions are usually a problem because `[[slug]]` links become ambiguous. A few collisions are intentional namespace pairs, such as a role page plus its onboarding guide, or a concept page plus its glossary acronym.

The shared allowlist lives in `scripts/wiki-validation-rules.js`. Update it only when both pages should intentionally keep the same bare slug, and include the exact page IDs plus a short reason.

## Namespaces

Use these namespaces in the rendered UI:

- Roles
- Departments
- People
- Systems
- Processes
- Documents
- Reference
- Glossary
- Sources
- Onboarding
- Analyses
- Admin

Prefer frontmatter classification before physically moving files. Physical moves should happen only after the page model is stable and approved.

## Page Status

Use `status:` when content maturity matters:

- `current` - usable as normal reference
- `stub` - intentionally incomplete
- `legacy` - historically useful but not guaranteed current
- `needs-review` - needs human/source validation
- `superseded` - retained for history but replaced by a newer page

## Growth Rules

- Add source summaries under `wiki/sources/`.
- Add role pages under `wiki/roles/`.
- Add operational workflows as `type: process`.
- Add forms, files, templates, and packets as `type: document`.
- Add systems/tools/platforms as `type: system`.
- Add named individuals as `type: person`.
- Keep glossary entries short and acronym-focused.
- Every page should link laterally to related roles, systems, processes, documents, and sources.
