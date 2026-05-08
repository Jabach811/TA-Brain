# Concept Page Animation — Design Spec
*2026-04-19*

## Goal

Add inline, auto-playing, looping animations to concept pages in `wiki.html`. Animations visualize the concept described on the page and play automatically when the page loads. Pages without an assigned animation display the existing single-column layout unchanged.

---

## Target File

`C:\Users\mabac\OneDrive\Desktop\TA Brain\wiki.html`

All changes are made to this single file. No new HTML files are created.

---

## Animation Inventory (7 sets ready)

| Folder | Slug candidate |
|--------|---------------|
| `animations/balance-import/` | `balance-import` |
| `animations/balance-import-cash/` | `balance-import-cash` |
| `animations/balance-import-mapping/` | `balance-import-mapping` |
| `animations/balance-import-tik/` | `balance-import-tik` |
| `animations/data-pipeline/` | `data-pipeline` |
| `animations/loan-setup/` | `loan-setup` |
| `animations/ta-brain-constellation/` | `ta-brain-constellation` |

Each folder contains `animations.jsx` (runtime helpers + MiniStage) and one or more `*_scenes.jsx` files (the actual animation component).

---

## Page Layout

### Concept pages WITH an animation

```
┌─────────────────────────────────────────────────────────────┐
│  Topbar                                                      │
├──────────────┬──────────────────────────────┬───────────────┤
│              │  Breadcrumb                  │               │
│  Left        │  Page Title                  │  Right        │
│  Sidebar     │  Tags                        │  Sidebar      │
│  (nav tree,  │  One-line description        │  (TOC,        │
│  unchanged)  │                              │  Backlinks,   │
│              │  ┌──────────────────────┐   │  Outgoing     │
│              │  │  Animation  (16:9)   │   │  Links,       │
│              │  │  auto-play · ↻ loop  │   │  Tags —       │
│              │  └──────────────────────┘   │  ALL          │
│              │                              │  UNCHANGED)   │
│              │  ## Section Heading          │               │
│              │  Body text…                  │               │
│              │  …continues normally…        │               │
└──────────────┴──────────────────────────────┴───────────────┘
```

**Key rules:**
- Animation sits between the opening summary text (everything before the first `##` section heading) and that first heading
- Animation is full content-column width, 16:9 aspect ratio (no fixed pixel height — scales with column width)
- Animation auto-plays on page load with no user interaction required
- Animation loops continuously
- Animation has a subtle progress bar at the bottom and a `↻ Loop` badge (top-right corner)
- Right sidebar (TOC, Backlinks, Outgoing Links, Tags) is completely unchanged

### Concept pages WITHOUT an animation

Render exactly as they do today — single column, no animation block inserted.

---

## Technical Architecture

### Runtime dependencies (already in wiki.html or to be added once)

- **React 18** via CDN (`esm.sh` or `unpkg`)
- **Babel standalone** for JSX transpilation in-browser (`<script type="text/babel">`)
- **`animations.jsx` runtime** — provides `Easing`, `useTime`, `clamp`, `MiniStage`, `TimelineContext`, etc. Added once as a `<script type="text/babel">` block near the bottom of `<body>`
- **`MiniStage`** — the React component that manages the animation canvas (width=1920, height=1080, scales via CSS transform to fit container)

### Animation registry

```js
const CONCEPT_ANIMS = {
  'balance-import-cash':    { component: 'BalanceImportCashScene',    duration: 18 },  // confirm duration from TIMING in scenes.jsx
  'balance-import-mapping': { component: 'BalanceImportMappingScene', duration: 18 },  // confirm duration
  'balance-import-tik':     { component: 'BalanceImportTikScene',     duration: 18 },  // confirm duration
  'data-pipeline':          { component: 'DataPipelineScene',         duration: 18 },  // confirm duration
  'loan-setup':             { component: 'LoanSetupScene',            duration: 18 },  // confirm duration
  // add more as animations are built
};
```

Keys are concept page slugs (matching the page's `slug` field in the wiki data). Values specify the `window.X` component name and duration in seconds. **Duration values must be confirmed by reading each animation's `TIMING` or `duration` constant in its scenes JSX file before implementation.**

The `balance-import` (base) and `ta-brain-constellation` / `ta-brain-loading` sets are excluded from this registry — their target page slugs are unclear or they serve a different purpose. Confirm mappings before adding.

### Rendering

In the `navigate()` function (or equivalent page-render handler), after rendering the page content:

1. Check `CONCEPT_ANIMS[page.slug]` — if no entry, skip
2. Inject `.cp-anim-wrap` div immediately after the description paragraph and before the first `##` heading in the rendered HTML
3. Mount a React root on `.cp-anim-wrap` with `MiniStage` + the registered component
4. Unmount and clean up on navigation away from the page (`window.__wikiAnimRoot?.unmount()`)

### Animation block HTML (injected)

```html
<div class="cp-anim-wrap">
  <!-- React mounts MiniStage here -->
</div>
```

### CSS for the animation block

```css
.cp-anim-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(162, 119, 255, 0.2);
  margin: 0 0 24px 0;
  position: relative;
}
```

MiniStage already handles scaling the 1920×1080 canvas to fit any container width via CSS transform.

### Loop behaviour

The existing `inject-animation` skill mounts MiniStage with `{ width: 1920, height: 1080, duration: N, zoom: 1 }` — no `loop` prop is documented. **Before implementing, verify whether MiniStage supports a `loop` prop or whether looping must be achieved by resetting `useTime()` manually (e.g. via `t % duration`) inside the scene component itself.**

### Script block injection order (bottom of `<body>`)

1. React + ReactDOM CDN scripts
2. Babel standalone CDN script
3. `<script type="text/babel">` — `animations.jsx` runtime (MiniStage, useTime, Easing, etc.)
4. `<script type="text/babel">` — each animation scenes file, one block per animation set
5. Each block ends with `window.ComponentName = ComponentName`

---

## What Does NOT Change

- Left sidebar navigation
- Right sidebar (TOC, Backlinks, Outgoing Links, Tags)
- All non-concept page types (roles, processes, glossary, entities, sources, analyses)
- Concept pages with no animation entry in `CONCEPT_ANIMS`
- The wiki markdown files in `wiki/`
- `build-wiki.py` — the Python build script is not modified; all animation logic lives in `wiki.html`

---

## Out of Scope

- Progress bar scrubbing / user-controlled playback
- Pause on hover
- Mobile responsive animation sizing (deferred — animations designed for desktop)
- Adding animations to non-concept page types
- Building new animations (7 existing sets are the initial batch)
