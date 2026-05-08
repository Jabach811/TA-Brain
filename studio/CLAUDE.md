# Studio — Design & Rendering Workspace

This is the **design** workspace. You're here to build features, redesigns, visuals, and to maintain how the wiki gets rendered. If the task is about ingesting a source or writing wiki markdown content, **stop and read `../garage/CLAUDE.md`** instead.

If you have not yet read `../CLAUDE.md` (the router) at the repo root, read it now.

---

## Mission

Studio owns everything you can *see*. That includes:

- The look and feel of the rendered wiki (`current/wiki.html`).
- The HTML/CSS/JS of the renderer (`build-wiki.py` at the repo root) and any themes/skins.
- New features layered on top: search, navigation, graph view, theme switcher, mobile, animations, anything visual.
- Prototypes and mocks for proposed features.
- Reference material — design systems, cloned repos, screenshots, inspiration.

Studio does **not** edit wiki content (`../wiki/*.md`). That's garage. Studio changes how that content is presented.

---

## Directory map (from this workspace's perspective)

```
TA Brain/                          ← repo root
├── CLAUDE.md                      ← router (the floor plan)
├── garage/                        ← ingest workspace (don't write here)
├── studio/                        ← YOU ARE HERE
│   ├── CLAUDE.md                  ← this file
│   ├── DESIGN.md                  ← Cursor-inspired design system spec
│   └── resources/                 ← cloned repos, skill files, reference images
│       └── awesome-design-md/     ← curated design-system READMEs (Apple, Linear, Stripe, …)
├── build-wiki.py                  ← renderer (lives at root; runs from there)
├── wiki/                          ← markdown content (read-only from studio)
└── current/                       ← rendered output area
    ├── wiki.html                  ← canonical rendered file
    ├── assets/
    └── archive/                   ← timestamped pre-edit snapshots
```

---

## Skills — how to invoke design help

When asked to redesign, restyle, lay out, or build a visual feature:

1. **Always pull inspiration from `studio/resources/`** — even when the human doesn't explicitly point you there. Browse `studio/DESIGN.md` for the in-house design system, then `studio/resources/awesome-design-md/` for what mature companies do (Apple, Linear, Stripe, Vercel, Notion, etc.). Drop anything new the human gives you (cloned repos, skill files, reference images) into `studio/resources/`.

2. **If the human names a specific skill, use that one.** Examples: "use the typography-tokens skill", "use the animation-easing skill".

3. **If no skill is named, fall back to the global `frontend-design` skill** for any design task. Invoke it via the Skill tool. Don't wing it.

4. **Front-end-design covers:** color tokens, type scale, spacing, layout systems, component design rules, accessibility heuristics, micro-interactions. If a question lands inside that surface area, the skill speaks first.

---

## Rendering pipeline — how the wiki gets built

The wiki is a single self-contained HTML file generated from `wiki/*.md` files by a Python script.

### Inputs

- `wiki/**/*.md` — all wiki markdown content (governed by `garage/`).
- `themes/*.json` — optional theme files (drop a JSON shaped like a built-in theme entry, filename becomes the theme ID).
- Built-in themes in `build-wiki.py`: Obsidian Dark, Apple Light, Apple Dark.

### The script: `build-wiki.py` (at repo root)

```bash
# from the repo root
python build-wiki.py
```

It does:
1. Walks `wiki/`, parses frontmatter + body + `[[wiki-links]]`.
2. Resolves links across folders (Obsidian-style; folder prefix optional).
3. Builds an in-page graph (force-directed, pan/zoom/draggable nodes).
4. Encrypts the `sources/` folder at build time using the password defined in the script — readers need that password to decrypt source pages in-browser.
5. Emits a single self-contained file at `current/wiki.html`.

### Output

`current/wiki.html` — the canonical rendered file. Don't write to it directly except via the Write Protocol below.

### What lives in studio when you change rendering

- HTML structure, CSS, JS, theme JSON → studio territory. Change `build-wiki.py` and/or theme files here, rebuild, verify.
- Content (`wiki/*.md`) → garage territory. Don't touch it from studio.

---

## Write Protocol — `current/wiki.html`

Same protocol as garage. Never edit the canonical in place. Always:

1. **Snapshot** — `current/wiki.html → current/wiki.working.html`.
2. **Edit** the working copy (or rebuild via `python build-wiki.py` to a working name — see note below).
3. **Verify** — open `current/wiki.working.html` in a browser. Confirm rendering, links, console.
4. **Promote** — on human approval:
   - `current/wiki.html → current/archive/wiki.YYYY-MM-DD-HHMM.html`
   - `current/wiki.working.html → current/wiki.html`
5. **Discard on reject** — delete `current/wiki.working.html`. Canonical untouched.

> **Note on `build-wiki.py`:** it writes directly to `current/wiki.html`. To respect the protocol, snapshot first (step 1), then either:
> - run the script and immediately rename the new output to `wiki.working.html` (the snapshot is your fallback), OR
> - temporarily change the script's `OUTPUT` constant to `current/wiki.working.html` for the run.
>
> Either way, the previous canonical is preserved as `wiki.working.html` is built, and we promote on approval.

---

## Adding a new feature

Default flow when the human says "add a search feature" / "redesign the sidebar" / "add a new theme":

1. **Read `studio/DESIGN.md`** for the in-house system.
2. **Browse `studio/resources/`** for relevant inspiration (e.g., for search UI, look at how Linear, Notion, or Apple docs do it inside `awesome-design-md/`).
3. **Invoke the relevant skill.** Named one if specified, else `frontend-design`.
4. **Prototype** — build the feature in a separate file inside studio first (e.g., `studio/prototypes/search-mock.html`) before wiring it into `build-wiki.py`. Mockups are cheap; rebuilds are not.
5. **Integrate** — once the prototype is approved, wire it into `build-wiki.py` and follow the Write Protocol above to update `current/wiki.html`.
6. **Document** — if the feature introduces new design tokens, conventions, or components, add a short note to `studio/DESIGN.md`.

---

## resources/ — what goes in there

This is your inspiration library. Anything the human (or you) gathers as design reference belongs here:

- Cloned repos of design systems or component libraries.
- Skill files the human pulled from elsewhere and wants to keep handy.
- Screenshots, image references, palette swatches, type specimens.
- Notes on patterns from other products.

Naming inside `resources/`: lowercase, hyphens. Group by source (`apple/`, `linear/`, `awesome-design-md/`) — not by topic.

If a resource has its own README or LICENSE, leave it in place; don't strip metadata.

---

## Style rules for studio output

- **Earn every visual element through type and rhythm, not chrome.** No decorative borders, no badge headers, no kicker labels stacked on subhead labels stacked on labels. Push back on yourself if you reach for ornament.
- **Match the in-house system in `studio/DESIGN.md` unless the human explicitly says otherwise.**
- **Color and motion are accents, not the foundation.** Hierarchy comes from typography first.
- **Test in the actual browser** before claiming a UI change works. Type-checks and console silence are not the same as it looking right.

---

## Session start (when entering this workspace)

1. Read this file (`studio/CLAUDE.md`).
2. Skim `studio/DESIGN.md` for the in-house design system.
3. List what's in `studio/resources/` so you know what reference material is available.
4. Ask what the human wants: a new feature, a redesign, a render fix, or a theme change.
