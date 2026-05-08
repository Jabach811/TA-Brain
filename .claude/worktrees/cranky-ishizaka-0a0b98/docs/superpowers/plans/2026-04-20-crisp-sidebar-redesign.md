# Crisp Sidebar Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hazy multi-variant sidebar in `current/wiki.html` with a single crisp, high-contrast "B1" style.

**Architecture:** Pure CSS change, single file. Delete the five per-theme sidebar variant CSS blocks. Rewrite the baseline styles for `.sidebar`, `.search`, `.search-results`, and `.folder` to use opaque backgrounds and solid text colors via existing CSS variables. No HTML structure changes. No JS changes.

**Tech Stack:** Vanilla CSS inside a single static HTML file. Verification via the Claude Code preview tools (serves `current/wiki.html` and supports snapshot/screenshot).

**Spec:** [docs/superpowers/specs/2026-04-20-crisp-sidebar-design.md](../specs/2026-04-20-crisp-sidebar-design.md)

---

## File Structure

**Modified:**
- `current/wiki.html` — CSS block only, lines ~101–416

**CSS regions touched:**
- `.sidebar` / `.sidebar.right` (lines ~102–113) — unchanged but reviewed
- `.search` input + `::before` (lines ~115–150) — rewrite
- `.search-results` hover styling (lines ~173–175) — rewrite
- `.folder > .head` + `.icon` + `.chev` + `.count` (lines ~183–234) — rewrite
- `.folder > ul li` + `::before` + `::after` + `.dot` (lines ~236–310) — rewrite
- `body[data-sidebar-style="pill|flat|tracked|neon"]` blocks (lines ~349–416) — **delete entirely**

All five tasks below touch a single file. Each task is a focused, atomic edit that can be committed independently.

---

## Task 1: Delete the five hazy sidebar variant blocks

**Files:**
- Modify: `current/wiki.html` lines ~344–416

**Why first:** These are the source of the "switching themes doesn't fix it" problem. Removing them is subtractive and proves nothing else breaks.

- [ ] **Step 1: Read the exact current region**

Read `current/wiki.html` lines 344–420 to confirm the block boundaries before editing.

- [ ] **Step 2: Delete the variant blocks**

Edit `current/wiki.html`. Replace this entire region:

```css
/* =========================================
   Per-theme sidebar style variants
   body[data-sidebar-style="classic|pill|flat|tracked|neon"]
   ========================================= */

/* PILL — rounded chip active, soft hover, no accent bar */
body[data-sidebar-style="pill"] .folder > ul li { ... }
... (all of PILL, FLAT, TRACKED, NEON rules) ...
body[data-sidebar-style="neon"] .folder > .head .icon {
  text-shadow: 0 0 8px color-mix(in srgb, var(--folder-color, var(--accent)) 60%, transparent);
}
```

With a single comment:

```css
/* Sidebar style variants removed — unified "crisp" baseline applies to all themes.
   body[data-sidebar-style="..."] attribute is retained by JS but has no CSS effect. */
```

- [ ] **Step 3: Visual check — variants gone, baseline still works**

Start the preview (`preview_start` targeting `current/wiki.html`). Take a `preview_snapshot`. Expected: sidebar still renders (using its un-variant-overridden baseline), possibly still hazy — that's fine for this task.

- [ ] **Step 4: Commit**

```bash
git add current/wiki.html
git commit -m "sidebar: remove 5 per-theme style variants (pill/flat/tracked/neon classic override)"
```

---

## Task 2: Rewrite folder header styling

**Files:**
- Modify: `current/wiki.html` lines ~183–234 (`.folder > .head` rule group)

- [ ] **Step 1: Edit `.folder > .head` and related rules**

Replace the current `.folder > .head` through `.folder > .head .lock-ico` block with:

```css
.folder { margin: 10px 0 4px; }
.folder > .head {
  display: flex; align-items: center; gap: 8px;
  cursor: pointer;
  padding: 9px 14px 5px;
  color: var(--fg);
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.1px;
  user-select: none;
  border-bottom: 1px solid var(--border);
  margin-bottom: 4px;
  transition: color .18s var(--ease), background-color .18s var(--ease);
  position: relative;
}
.folder > .head:hover {
  color: var(--fg);
  background: var(--bg-3);
}
/* Folder icon tile hidden per crisp redesign. Element retained in DOM. */
.folder > .head .icon { display: none; }
.folder > .head .chev {
  transition: transform .22s var(--ease);
  display: inline-block; margin-left: 4px;
  font-size: 9px; opacity: .6;
}
.folder.collapsed > .head .chev { transform: rotate(-90deg); }
.folder > .head .count {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
  color: var(--fg-muted);
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0;
}
.folder > .head .lock-ico {
  margin-left: auto;
  font-size: 12px;
  color: var(--accent);
  opacity: 1;
}
.folder.collapsed > ul { display: none; }
```

Key deltas from the original: `color: var(--fg)` (was `--fg-dim`), `font-weight: 700` (was 600), `border-bottom` replaces `background + border-radius`, `.icon { display: none }`, count pill loses its bg chip.

- [ ] **Step 2: Visual check**

`preview_snapshot` the sidebar region. Expected: headers now solid white (or theme-equivalent), no colored icon tile, thin divider under each header, count reads as muted plain text at right.

- [ ] **Step 3: Commit**

```bash
git add current/wiki.html
git commit -m "sidebar: crisp folder headers (solid fg, hide icon tile, divider)"
```

---

## Task 3: Rewrite list item styling (rail + dot active, opaque hover)

**Files:**
- Modify: `current/wiki.html` lines ~236–310 (`.folder > ul`, `.folder > ul li`, `::before`, `::after`, `.dot`, `.folder.locked > .head`)

- [ ] **Step 1: Edit the list item block**

Replace `.folder > ul` through `.folder.locked > .head:hover` with:

```css
.folder > ul {
  list-style: none;
  margin: 0;
  padding: 0 0 8px 0;
  position: relative;
}
/* remove vertical tree line — no longer needed without folder icon */
.folder > ul li {
  position: relative;
  padding: 7px 14px 7px 14px;
  border-left: 2px solid transparent;
  cursor: pointer;
  color: var(--fg);
  font-size: 13px;
  font-weight: 500;
  display: flex; align-items: center; gap: 8px;
  transition: background-color .15s var(--ease), border-color .15s var(--ease), color .15s var(--ease);
}
.folder > ul li:hover {
  background: var(--bg-3);
  border-left-color: var(--type-color, var(--accent));
  color: var(--fg);
}
.folder > ul li.active {
  background: var(--bg-3);
  border-left-color: var(--type-color, var(--accent));
  color: var(--fg);
  font-weight: 600;
}
.folder > ul li.active::before {
  content: '';
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--type-color, var(--accent));
  flex: 0 0 auto;
  margin-right: 2px;
}
.folder > ul li .dot {
  display: none;
}
.folder.locked > .head {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
}
.folder.locked > .head:hover {
  background: var(--bg-3);
  border-color: var(--border);
  border-bottom-color: var(--border);
}
```

Key deltas: no `::before` scaleY accent bar, no `::after` arrow, no `transform: translateX`, no `box-shadow` glow, no `.folder > ul::before` tree line, `.dot` hidden (replaced by smaller active-only `::before` dot). Opaque `var(--bg-3)` backgrounds everywhere.

- [ ] **Step 2: Visual check — hover and active**

`preview_snapshot` the sidebar. Then use `preview_click` to click a sidebar item and `preview_snapshot` again. Expected: clicked row has opaque darker bg, 2px colored left rail, small colored dot prefix before the text, bold weight. No row shift on hover. Compare against the Task 1 baseline screenshot — the change should be obvious.

- [ ] **Step 3: Commit**

```bash
git add current/wiki.html
git commit -m "sidebar: crisp list items (rail + dot active, opaque hover, drop decorations)"
```

---

## Task 4: Rewrite search input styling

**Files:**
- Modify: `current/wiki.html` lines ~115–150 (`.search`, `.search input`, `::before`)

- [ ] **Step 1: Edit the search block**

Replace the `.search` through `.search { position: sticky; }` block with:

```css
.search {
  position: sticky; top: 0;
  background: var(--bg-2);
  padding: 10px 10px 12px;
  z-index: 5;
}
.search input {
  width: 100%;
  background: var(--bg-3);
  border: 1px solid var(--border);
  color: var(--fg);
  padding: 9px 14px 9px 34px;
  border-radius: 8px;
  font-size: 13px;
  font-family: var(--font);
  outline: none;
  transition: border-color .15s var(--ease), background-color .15s var(--ease);
}
.search input::placeholder { color: var(--fg-muted); }
.search input:focus {
  border-color: var(--accent);
  background: var(--bg);
}
.search::before {
  content: '⌕';
  position: absolute;
  left: 21px; top: 50%;
  transform: translateY(-50%);
  color: var(--fg-muted);
  font-size: 16px;
  pointer-events: none;
  z-index: 2;
}
```

Key deltas: focus state drops the 3px translucent `box-shadow` glow ring. Padding tightened. Icon position adjusted for new padding.

- [ ] **Step 2: Visual check — focus state**

`preview_click` the search input. `preview_snapshot`. Expected: solid accent-colored border on focus, no soft glow halo.

- [ ] **Step 3: Commit**

```bash
git add current/wiki.html
git commit -m "sidebar: crisp search input (drop focus glow ring, opaque bg)"
```

---

## Task 5: Rewrite search dropdown hover

**Files:**
- Modify: `current/wiki.html` lines ~173–175 (`.search-results .result:hover`)

- [ ] **Step 1: Edit the dropdown result hover rule**

Find:

```css
.search-results .result:hover, .search-results .result.hl {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}
```

Replace with:

```css
.search-results .result:hover, .search-results .result.hl {
  background: var(--bg-3);
}
```

- [ ] **Step 2: Visual check**

With search focused, `preview_fill` the search input with a short query (e.g., `"plan"`). `preview_snapshot`. Hover a result by using `preview_eval` to set `.hl` class, or accept mouse-over behavior in screenshot. Expected: highlighted result uses opaque `--bg-3`, not a translucent accent wash.

- [ ] **Step 3: Commit**

```bash
git add current/wiki.html
git commit -m "sidebar: opaque search-result hover (remove color-mix wash)"
```

---

## Task 6: Cross-theme regression check

**Files:** none modified — verification only

- [ ] **Step 1: Enumerate themes available in the wiki**

Use `preview_eval` to run `Object.keys(THEMES)` in the page console and capture the list. Expected: an array of theme names (e.g., `["default","aura","nord","solar",...]`).

- [ ] **Step 2: Cycle each theme and snapshot the sidebar**

For each theme name, run via `preview_eval`:

```js
applyTheme('<theme-name>');
```

Then `preview_snapshot`. Look for:
- Folder header text readable (not gray-on-gray)
- Active row bg visibly distinct from sidebar bg
- Type-color rail visible on active and hover
- No leftover decorations from removed rules

- [ ] **Step 3: Document findings**

If any theme reveals a regression (e.g., `--bg-3` equals `--bg-2` in a particular theme, making hover invisible), fix it by adjusting the CSS in the relevant earlier task (most likely Task 3's `background: var(--bg-3)` — candidate fix: `background: color-mix(in srgb, var(--fg) 8%, var(--bg-2))` as a contrast-guaranteed fallback, but only if needed). Re-commit into the offending task's message scope with a follow-up commit.

- [ ] **Step 4: Final commit (if any fixes applied, else skip)**

```bash
git add current/wiki.html
git commit -m "sidebar: fix [theme-name] hover/active contrast after crisp rewrite"
```

- [ ] **Step 5: Final screenshot for PR**

`preview_screenshot` of the fully-loaded wiki with a row active. Save as the visual proof for the handoff summary.

---

## Success Criteria Checklist (run after Task 6)

- [ ] No `color-mix(..., transparent)` remains anywhere in lines ~100–330 of `current/wiki.html`
- [ ] Folder headers read as solid `--fg`, not `--fg-dim`
- [ ] Active row: opaque darker bg + colored 2px rail + colored 4px dot + bold text
- [ ] Hover row: opaque darker bg + colored 2px rail, no translate
- [ ] Search input focus: solid accent border, no glow
- [ ] All themes (cycled via `applyTheme`) render legibly — no washed-out or invisible hover states
- [ ] The `data-sidebar-style` attribute is still set by JS but has no CSS effect (five variant blocks deleted)
