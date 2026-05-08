# Concept Page Animations — Finalized Pattern

> Companion to `2026-04-19-concept-animation-design.md`. Captures the pattern as it stands after the 2026-04-20 sizing fix, dead-code cleanup, and bundling pass.

## Where animations appear

- **File:** `current/wiki.html` (single-file SPA)
- **Page type:** any page whose slug appears in the `CONCEPT_ANIMS` registry. Type-agnostic — works for `concept`, `process`, etc.
- **DOM placement:** between the page's first paragraph (the description) and the first `<h2>`. The render function inserts `#cp-anim-panel` (the React mount point) and `#cp-anim-bar` (controls) into the article column.
- **Width:** `min(1700px, calc(100vw - 240px))` — breaks out of the 820px article column and uses essentially the full viewport minus the left sidebar (the right sidebar is hidden via `.app.has-anim`). Resolves: 1280→1040 (54%), 1440→1200 (63%), 1593→1353 (70%), 1920→1680 (88%).
- **Aspect ratio:** locked at 16:9.
- **Controls:** `▾ hide / ▴ show animation` and `⤢ fullscreen` in the bar below the panel.

## Architecture (one file, three pieces)

1. **Runtime** (`Stage`, `Sprite`, `useTime`, `Easing`, `clamp`, `interpolate`, `animate`, `useSprite`) — defined once near the top of the script section. Stage scales contents to fit its container; the same scene file works at any Stage size (1280×720 source coords render correctly inside a 1920×1080 stage and vice versa).
2. **Scene components** — each animation is an IIFE-wrapped `<script type="text/babel">` block. Each block has its own scope so `FM`, `Scene1`, `METHODS`, etc. can be redefined without colliding. End each block with `window.MyScene = MyScene;`.
3. **Registry** (`CONCEPT_ANIMS`) — slug → `{ component: 'WindowGlobalName' }`. The render function looks up the slug, mounts via `ReactDOM.createRoot(panel).render(<Scene/>)`, unmounts on navigation away.

## Currently registered (as of 2026-04-20)

| Slug | Component | Source folder |
|---|---|---|
| `balance-import` | `BalanceImportOverviewScene` | `animations/balance-import/` |
| `balance-import-cash` | `BalanceImportCashScene` | `animations/balance-import-cash/` |
| `balance-import-mapping` | `BalanceImportMappingScene` | `animations/balance-import-mapping/` |
| `balance-import-tik` | `BalanceImportTikScene` | `animations/balance-import-tik/` |
| `loan-setup` / `loan-setup-overview` | `LoanSetupScene` | `animations/loan-setup/` |

**Bundled but unregistered:** `DataPipelineScene` (from `animations/data-pipeline/`) — waiting on a target page (`census-data` exists in `wiki/concepts/` but isn't in the wiki-data JSON yet).

## How to add a new concept animation

### Path A — animation already prototyped under `animations/<slug>/`

The folder structure is: `animations.jsx` (runtime — already in wiki.html, ignore), `fm_shared.jsx` (FM tokens + helpers), `*_scenes.jsx` (the actual scenes), `index.html` (standalone wrapper).

1. **Find the insertion point.** Open `current/wiki.html`, search for the last `window.<Something>Scene = ...; })();</script>` block and insert after it.
2. **Wrap in IIFE.** Open with `<script type="text/babel">` then `(function() {`. Close with `window.MyScene = MyScene; })();</script>`.
3. **Inline `fm_shared.jsx` first.** Copy the `FM` const and any helpers the scenes use (`FMGlow`, `SceneCaption`, `FMArc`, etc.). Skip helpers the scene doesn't reference.
4. **Inline `*_scenes.jsx` next.** Copy `Scene1..N` and any module-level constants (`METHODS`, `TOTAL`, etc.).
5. **Add a wrapper Scene.** Mirror the App from `index.html`:
   ```jsx
   function MyOverviewScene() {
     return (
       <Stage width={1280} height={720} duration={30} loop={true} background="#08090C" autoplay={true}>
         <Sprite start={0} end={5}><Scene1 /></Sprite>
         {/* ... */}
       </Stage>
     );
   }
   window.MyOverviewScene = MyOverviewScene;
   ```
   Keep the source file's Stage size (1280×720 or 1920×1080) — coordinates inside the scenes are tied to it.
6. **Register the slug.** Add one line to `CONCEPT_ANIMS` (~line 7691):
   ```js
   'page-slug': { component: 'MyOverviewScene' },
   ```
7. **Hard-refresh** and navigate to the page.

### Path B — building a new scene from scratch

Mirror `BalanceImportMappingScene` (~line 3979). Use the existing runtime: `Stage`, `Sprite`, `useTime`, `useSprite`, `Easing`, `clamp`, `interpolate`, `animate`. Wrap in an IIFE. Register.

## Sizing principles

- Scenes are authored at 1280×720 or 1920×1080 (16:9). At ~70% panel scale (1353×761 on a 1593-wide viewport), 10pt design text becomes ~7px — small but legible. Fullscreen remains the path for fine detail.
- The `240px` subtraction in `calc(100vw - 240px)` accounts for: 280px left sidebar minus a small negative margin so the panel can extend slightly past the content area, plus breathing room.
- The `1700px` cap prevents absurd widths on ultrawide monitors.
- Media queries at 1100px and 820px adjust the calc and disable the centering breakout for narrow viewports.

## Lessons learned (2026-04-20 pass)

- **Worktree vs main repo:** when the user is on a worktree, the served file is in the worktree path, not `current/wiki.html` in the main repo. Always check `git status` first and confirm by file size if there's any doubt.
- **Screenshots time out:** the continuous RAF loop in Stage causes headless screenshot to hang. Use `preview_eval` to query DOM measurements (`getBoundingClientRect`, `children.length`, registered window globals) instead.
- **Page must be in build:** registering an animation for a slug that isn't in `wiki-data` JSON is harmless but the animation never shows. Verify with `Object.keys(JSON.parse(document.getElementById('wiki-data').textContent).pages)` before assuming a registration "doesn't work."
- **IIFE scope is your friend:** each scene block redefines `FM`, `Scene1`, `METHODS`, etc. Don't try to share helpers across blocks via `window.` — just inline what each block needs.
- **Stage dimensions don't constrain the panel:** the panel is `aspect-ratio: 16/9`; the Stage scales its own contents to fit. So 1280×720 and 1920×1080 stages render at the same physical size, just with different internal scale factors.

## Removed in this pass

- The legacy `p.animationPath` iframe-based panel.
- The unused `duration` field on registry entries. Scenes own their own duration via the `Stage` `duration` prop.

## Open follow-ups

- **Build step for scene injection.** Hand-pasting fm_shared + scenes into wiki.html for each new animation is error-prone. A small Node script that takes `animations/<slug>/` and emits an IIFE-wrapped script block would make additions safer.
- **`census-data` page wiring.** The page exists in `wiki/concepts/` but not in the wiki-data JSON. Once the build picks it up, register `'census-data': { component: 'DataPipelineScene' }`.
- **`ta-brain-constellation` and `ta-brain-loading`** scenes exist under `animations/` but are wiki-self-presentation, not concept animations. Not bundled.
- Pre-rendered video fallback for very long scenes or low-end devices (the "Option C" from the brainstorm).
