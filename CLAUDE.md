# TA Brain — Router

This file is the **floor plan**. Read it first, then go to the workspace that fits the task. Don't operate from here.

The TA Brain repo holds two kinds of work:

| If the task is about… | Go to | Read |
|---|---|---|
| Ingesting a source, writing/updating wiki markdown, running a query, building an onboarding list, mapping a team, linting the wiki | **`garage/`** | `garage/CLAUDE.md` |
| Designing or redesigning the wiki UI, building new features (search, themes, navigation, animations), updating how the wiki renders, prototyping visuals | **`studio/`** | `studio/CLAUDE.md` |

If you're not sure: ask the human one short question to pick. Don't guess and start writing.

---

## Top-level layout

```
TA Brain/
├── CLAUDE.md                ← this file (router) — also AGENTS.md mirrors it
├── garage/                  ← ingest workspace
│   └── CLAUDE.md
├── studio/                  ← design workspace
│   ├── CLAUDE.md
│   ├── DESIGN.md            ← in-house design system
│   └── resources/           ← cloned repos, skill files, reference images
├── wiki/                    ← markdown content (garage writes here)
│   ├── index.md log.md overview.md
│   ├── roles/ departments/ processes/ onboarding/
│   └── glossary/ entities/ concepts/ sources/ analyses/
├── current/                 ← rendered output area
│   ├── TA Wiki.html         ← canonical rendered file
│   ├── assets/
│   └── archive/             ← timestamped pre-edit snapshots
├── fresh-rebuild/build-full-wiki-prototype.js            ← renderer (governed by studio/)
├── animations/              ← animation prototypes (visual; reference from studio)
├── studio/prototypes/       ← HTML mocks and visual prototypes
├── pitches/                 ← decks and pitch material
├── guides/                  ← user-facing guides and walk-throughs
├── docs/                    ← project plans and specs
├── scripts/                 ← utility scripts (Gmail bridge, setup notes)
├── fresh-rebuild/           ← renderer home plus rebuild experiments; new mocks belong in studio/prototypes/
├── _archive/                ← parked older material — do not edit
└── extra questions.txt      ← scratch
```

---

## Write Protocol — `current/TA Wiki.html`

Both workspaces follow the same rule: **never edit the canonical in place**.

1. **Snapshot**: copy `current/TA Wiki.html` → `current/TA Wiki.working.html`.
2. **Edit** the working copy.
3. **Verify** in a browser.
4. **Promote** on human approval:
   - `current/TA Wiki.html` → `current/archive/TA Wiki.YYYY-MM-DD-HHMM.html`
   - `current/TA Wiki.working.html` → `current/TA Wiki.html`
5. **Discard on reject**: delete the working copy; canonical was never touched.

Full details live in each workspace's CLAUDE.md.

---

## Naming conventions

- **Wiki page slugs**: lowercase, hyphens, no spaces. `lm-dc.md`, `plan-onboarding-handoffs.md`.
- **Page titles**: Title Case.
- **Internal wiki links**: Obsidian `[[wiki-style]]` — folder prefix optional.
- **Archive snapshots**: `TA Wiki.YYYY-MM-DD-HHMM.html`.
- **Prototypes**: `studio/prototypes/[feature]-mock.html`, versioned with `-v2`, `-v3` etc. when needed.
- **Resources**: lowercase, hyphens. Group by source, not topic.

---

## Session start

Whatever workspace you end up in, the routine is:

1. Read this file.
2. Read the workspace's `CLAUDE.md`.
3. Read `wiki/index.md` and the last entries of `wiki/log.md` if the task touches wiki content.
4. Tell the human what you see.
5. Ask what they want.

---

## Why this is split

Garage and studio handle different work, hold different context, and benefit from different skills. Splitting them keeps the engine (ingest + write) clean, and lets the visual side (design + render) evolve without polluting how content is captured. New features land in studio. New knowledge lands in garage. They meet at `current/TA Wiki.html`.
