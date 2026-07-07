# Studio — Design & Rendering Workspace

This is the **design** workspace. You're here to build features, redesigns, visuals, and to maintain how the wiki gets rendered. If the task is about ingesting a source or writing wiki markdown content, **stop and read `../garage/CLAUDE.md`** instead.

If you have not yet read `../CLAUDE.md` (the router) at the repo root, read it now.

---

## Mission

Studio owns everything you can *see*. That includes:

- The look and feel of the rendered wiki (`current/TA Wiki.html`).
- The HTML/CSS/JS of the renderer (`fresh-rebuild/build-full-wiki-prototype.js` at the repo root) and the built-in theme skins it defines.
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
├── fresh-rebuild/build-full-wiki-prototype.js  ← renderer (lives at root; runs from there)
├── wiki/                          ← markdown content (read-only from studio)
└── current/                       ← rendered output area
    ├── TA Wiki.html               ← canonical rendered file
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

The wiki is a single self-contained HTML file generated from `wiki/*.md` files by a Node script.

### Inputs

- `wiki/**/*.md` — all wiki markdown content (governed by `garage/`).
- Built-in themes in `fresh-rebuild/build-full-wiki-prototype.js`: Obsidian Dark, Apple Light, Apple Dark.
- There is no active `themes/` input folder right now. Add one only if the renderer is updated to load external theme files.

### The script: `fresh-rebuild/build-full-wiki-prototype.js` (at repo root)

```bash
# from the repo root
node fresh-rebuild/build-full-wiki-prototype.js
```

It does:
1. Walks `wiki/`, parses frontmatter + body + `[[wiki-links]]`.
2. Resolves links across folders (Obsidian-style; folder prefix optional).
3. Builds an in-page graph (force-directed, pan/zoom/draggable nodes).
4. Embeds the parsed wiki payload, styles, and client-side behavior into the output HTML.
5. Emits a single self-contained working file at `current/TA Wiki.working.html`.

### Output

`current/TA Wiki.working.html` — the renderer output. Promote it to `current/TA Wiki.html` only through the Write Protocol below.

### What lives in studio when you change rendering

- HTML structure, CSS, JS, and built-in theme definitions → studio territory. Change `fresh-rebuild/build-full-wiki-prototype.js`, rebuild, verify.
- Content (`wiki/*.md`) → garage territory. Don't touch it from studio.

---

## Write Protocol — `current/TA Wiki.html`

Same protocol as garage. Never edit the canonical in place. Always:

1. **Snapshot** — `current/TA Wiki.html → current/TA Wiki.working.html`.
2. **Edit** the working copy (or rebuild via `node fresh-rebuild/build-full-wiki-prototype.js` to refresh the working output — see note below).
3. **Verify** — open `current/TA Wiki.working.html` in a browser. Confirm rendering, links, console.
4. **Promote** — on human approval:
   - `current/TA Wiki.html → current/archive/TA Wiki.YYYY-MM-DD-HHMM.html`
   - `current/TA Wiki.working.html → current/TA Wiki.html`
5. **Discard on reject** — delete `current/TA Wiki.working.html`. Canonical untouched.

> **Note on `fresh-rebuild/build-full-wiki-prototype.js`:** by default it writes to `current/TA Wiki.working.html`. To publish, verify the working output first, then promote it only after human approval.

---

## Adding a new feature

Default flow when the human says "add a search feature" / "redesign the sidebar" / "add a new theme":

1. **Read `studio/DESIGN.md`** for the in-house system.
2. **Browse `studio/resources/`** for relevant inspiration (e.g., for search UI, look at how Linear, Notion, or Apple docs do it inside `awesome-design-md/`).
3. **Invoke the relevant skill.** Named one if specified, else `frontend-design`.
4. **Prototype** — build the feature in a separate file inside studio first (e.g., `studio/prototypes/search-mock.html`) before wiring it into `fresh-rebuild/build-full-wiki-prototype.js`. Mockups are cheap; rebuilds are not.
5. **Integrate** — once the prototype is approved, wire it into `fresh-rebuild/build-full-wiki-prototype.js` and follow the Write Protocol above to update `current/TA Wiki.html`.
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

### Hand-drawn art diagrams — `studio/resources/Hand Drawn Images/`

When the task is to generate any **hand-drawn diagram, brief sheet, whiteboard poster, sketch-style explainer, or marker-and-highlighter visual** (as opposed to web UI), pull inspiration from `studio/resources/Hand Drawn Images/`. Joel uses that art form a lot — treat it as the canonical reference set for the look (linework, color discipline, composition, doodle vocabulary).

- Use it as the visual source when generating new raster PNGs in that style.
- Don't overlay text on or copy-and-relabel reference images — generate new art using them as the style anchor.
- The web design system in `studio/DESIGN.md` (Cursor-inspired) governs UI rendering, not these diagrams. Different surface, different rules.

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
