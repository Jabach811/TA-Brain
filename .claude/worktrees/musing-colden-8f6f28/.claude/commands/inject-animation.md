---
name: inject-animation
description: Wire a new JSX animation into wiki-v2.html for one or more process page slugs. Injects the script block, updates PROCESS_ANIMS registry, and verifies. Usage: /inject-animation <path-to-jsx> <slug1> [slug2 ...]
version: 1.0
updated: 2026-04-18
---

# inject-animation

Wire a new animation JSX file into the TA Brain wiki-v2.html so it plays in the hero of one or more process pages.

## How animations work in wiki-v2.html

Every animation is:
1. A `<script type="text/babel">` block containing a React component that exposes itself via `window.ComponentName = ComponentName`
2. Registered in the `PROCESS_ANIMS` object inside `renderProcess()`: `'slug': 'ComponentName'`
3. Rendered by `MiniStage` (width=1920, height=1080, duration=<N>, zoom=1) inside `.cp-hero-anim-wrap`

The `animations.jsx` runtime (Easing, useTime, TimelineContext, clamp, etc.) and `MiniStage` are already loaded — new animation files just need to use them.

## Required conventions for animation JSX files

Before running this skill, confirm the JSX file meets these requirements:

- Exports exactly one root component to `window`: `window.MyScene = MyScene`
- Uses `useTime()` for the playhead (already available globally from animations.jsx)
- Designed for a 1920×1080 canvas; all absolute positions are in that coordinate space
- Has a finite duration (in seconds) — note it in the file or tell Claude what it is

If the file does not export to `window`, Claude will add the export automatically.

## Steps Claude must follow

### Step 1 — Parse arguments

The user invokes this skill as:
```
/inject-animation <path-to-jsx> <slug1> [slug2 ...]
```

Parse:
- `jsx_path` — absolute path to the animation JSX file
- `slugs` — one or more process page slugs to attach it to (e.g. `balance-import-cash`)

If arguments are missing or unclear, ask the user to clarify before proceeding.

### Step 2 — Read the JSX file

Read the full JSX file at `jsx_path`.

Extract:
- **Component name**: look for `window.X = X` or `window.X=X` pattern near the end of the file. If not found, identify the last top-level function component defined and plan to add the export.
- **Duration**: look for a `duration` constant or TIMING object to infer the animation length in seconds. If not obvious, ask the user.
- **Any new dependencies**: check if the file imports anything beyond what `animations.jsx` already provides (Easing, clamp, useTime, useTimeline, TimelineContext, Stage, Sprite, TextSprite, etc.). Flag any missing deps.

### Step 3 — Confirm with the user

Before making changes, tell the user:
- The component name you found (or plan to add)
- The duration you'll set in the MiniStage call (default 18 if not found)
- Which slugs will be wired
- Whether you need to add a `window.X = X` export

Ask: "Looks good — should I inject?" and wait for confirmation.

### Step 4 — Inject into wiki-v2.html

The target file is always:
`C:/Users/mabac/OneDrive/Desktop/TA Brain/wiki-v2.html`

Write a Python script (to a temp file, then run it) that does ALL of the following atomically:

#### 4a. Add the JSX script block

Find the closing tag of the last existing `<script type="text/babel">` block (the MiniStage block). Insert a new `<script type="text/babel">` block immediately after it containing the full JSX file content.

If the JSX file does not already have `window.ComponentName = ComponentName`, append it inside the script block.

Use this exact insertion pattern:
```python
marker = 'window.MiniStage = MiniStage;\n</script>'
new_block = f'{marker}\n<script type="text/babel">\n{jsx_content}\n</script>'
assert marker in html, 'MiniStage block not found'
html = html.replace(marker, new_block, 1)
```

#### 4b. Update PROCESS_ANIMS registry

Find the existing PROCESS_ANIMS line:
```js
const PROCESS_ANIMS = { 'census-load': 'CensusScene' };
```

For each new slug, add an entry. The result should look like:
```js
const PROCESS_ANIMS = { 'census-load': 'CensusScene', 'new-slug': 'NewComponent' };
```

Use Python string replacement. Build the new dict string by parsing the existing one and adding the new key-value pairs. Assert the original string exists before replacing.

#### 4c. Update MiniStage duration (if different from 18)

If the animation duration is not 18 seconds, the `ReactDOM.createRoot` call passes a fixed `duration: 18`. That value must become dynamic.

The navigate() mount block currently reads:
```js
reactRoot.render(React.createElement(window.MiniStage,
  { width: 1920, height: 1080, duration: 18, zoom: 1 },
  React.createElement(AnimComp)
));
```

If the new animation has a different duration, change the approach: look up duration from a registry instead of hardcoding. Add a `PROCESS_ANIM_DURATION` object alongside `PROCESS_ANIMS`:

```js
const PROCESS_ANIMS = { 'census-load': 'CensusScene', 'new-slug': 'NewComp' };
const PROCESS_ANIM_DURATION = { 'census-load': 18, 'new-slug': 24 };
```

And update the mount call to:
```js
const animDuration = PROCESS_ANIM_DURATION[p.slug] || 18;
reactRoot.render(React.createElement(window.MiniStage,
  { width: 1920, height: 1080, duration: animDuration, zoom: 1 },
  React.createElement(AnimComp)
));
```

Only make this change if:
- The new animation has a duration different from 18, OR
- `PROCESS_ANIM_DURATION` does not already exist in the file (i.e., this is the first non-18-second animation being added)

If `PROCESS_ANIM_DURATION` already exists, just add the new slug to it.

### Step 5 — Verify

After writing the file, verify all of the following by reading or grepping wiki-v2.html:

- [ ] The component name appears in a `<script type="text/babel">` block
- [ ] `window.ComponentName = ComponentName` is present in that block
- [ ] The slug appears in `PROCESS_ANIMS`
- [ ] The component name appears in `PROCESS_ANIMS` paired with the correct slug
- [ ] No duplicate `PROCESS_ANIMS` declarations exist (should be exactly one)

If any check fails, report the specific failure and propose a fix before stopping.

### Step 6 — Report

Tell the user:
- Which slugs now have the animation
- The component name registered
- The duration
- How many total entries are now in PROCESS_ANIMS
- Any warnings (missing exports, duration assumptions, etc.)

---

## Maintaining PROCESS_ANIMS over time

As more animations are added, `PROCESS_ANIMS` grows. When adding a new entry, always preserve existing entries — never overwrite the whole dict. The Python replacement must parse the existing entries and merge the new ones in.

Current registry at time of skill creation:
```js
{ 'census-load': 'CensusScene' }
```

Each animation added updates this registry. The skill is the single source of truth for how to do it correctly.

---

## Troubleshooting

**"MiniStage block not found"** — The anchor string for insertion has drifted. Read wiki-v2.html around the MiniStage component to find the new anchor and update the Python script.

**"PROCESS_ANIMS not found"** — The registry may have been moved or renamed. Grep for `PROCESS_ANIMS` and update the match string.

**Animation renders blank** — The component name in PROCESS_ANIMS doesn't match the `window.X` export. Grep both and confirm they're identical.

**Animation runs at wrong speed** — Duration mismatch. Check `PROCESS_ANIM_DURATION` entry vs. the animation's internal TIMING constants.

**"Cannot read properties of undefined (reading 'mount')"** — A previous React root was not cleaned up. This is a pre-existing issue in the unmount block — check that `window.__wikiAnimRoot` is being set correctly after the new animation mounts.
