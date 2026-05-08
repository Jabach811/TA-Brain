# Crisp Sidebar Redesign — `current/wiki.html`

**Date:** 2026-04-20
**Scope:** Left sidebar of `current/wiki.html`
**Goal:** Replace the current hazy, low-contrast sidebar with a single crisp, high-contrast style ("B1") across all themes.

---

## Problem

The sidebar in `current/wiki.html` looks hazy and hard to read. Root causes:

- Folder headers use `var(--fg-dim)` at reduced opacity
- Active/hover backgrounds use `color-mix(in srgb, … N%, transparent)` — semi-transparent washes that blend into the panel bg
- Accent bars, glow rings, and `transform: translateX` on hover add perceptual noise
- Search input and dropdown inherit the same low-alpha treatment
- Five sidebar variants (`classic | pill | flat | tracked | neon`) all share the hazy DNA; switching themes doesn't fix it

## Solution: single "B1" style, opaque and crisp

Replace the five variants with one baseline style. Themes keep control over color palette and typography, but the sidebar structure is uniform.

### Core rules

**Text contrast**
- Folder headers: solid `var(--fg)` white (not `--fg-dim`)
- List items at rest: `var(--fg)` with no opacity adjustment (not `--fg-dim`)
- Active items: solid white, `font-weight: 600`
- Counts and meta: keep muted (`var(--fg-muted)`) — the only dim text in the sidebar

**Backgrounds**
- Sidebar bg: `var(--bg-2)` (unchanged)
- Hover row bg: opaque `var(--bg-3)` (not color-mix)
- Active row bg: opaque `var(--bg-3)` (same as hover)
- Search input: opaque `var(--bg-3)` at rest, `var(--bg)` on focus
- No `color-mix(... , transparent)` anywhere in the sidebar

**Folder headers**
- Plain uppercase text, no icon tile (drop the colored emoji squares entirely)
- Bottom border: `1px solid var(--border)` as a separator
- Count at right, muted, tabular-nums
- Chevron retained on the right for collapse/expand affordance

**List items**
- Left border: `2px solid transparent` at rest
- Hover/active: `border-left-color: var(--type-color)`
- Active additionally: small 4px colored dot prefix before the text, bold weight
- Remove `translateX` hover shift, remove `::before` scaleY accent bar, remove `::after` arrow, remove glow ring shadows

**Search**
- Input: opaque bg, solid border, focus state uses a solid `var(--accent)` border (no transparent glow ring)

### What gets removed

- `body[data-sidebar-style="pill|flat|tracked|neon"]` rule blocks (CSS lines ~349–416)
- The `classic` default's dependence on `color-mix` transparent washes
- `.folder > .head .icon` colored tile — hide via CSS `display: none` (keep DOM element for backward compat with JS)
- `.folder > ul li::before` and `::after` pseudo-element decorations
- `transform: translateX(2px)` on item hover
- Active-state `box-shadow` glow/inset rings

### What stays

- Per-type colors (`--type-color`) — now used only for the left rail and active dot
- Per-folder colors (`--folder-color`) — currently only used on the folder icon tile; becomes unused, document as deprecated
- Search input position + sticky behavior
- Folder collapse/expand behavior and chevron rotation
- Search dropdown result list (but its internal hover uses opaque bg too)

### Theme compatibility

- All CSS values are expressed via existing CSS variables (`--bg-2`, `--bg-3`, `--fg`, `--border`, `--type-color`, `--accent`)
- Light themes work automatically as long as `--bg-3` has adequate contrast against `--bg-2` — verify on each theme during implementation
- The `data-sidebar-style` attribute on `<body>` is kept (no JS change needed) but has no CSS effect anymore

## File impact

- **Modified:** `current/wiki.html` — CSS only (no HTML structure changes, no JS logic changes other than optionally stripping icon emoji from sidebar render)
- **No other files touched**

## Success criteria

1. Folder headers are immediately legible as solid white (or theme equivalent) — no washed-out gray
2. Active row is obvious at a glance: opaque darker bg + colored left rail + dot
3. Hover feels responsive without the row physically moving
4. Search bar reads as a solid element, not a frosted overlay
5. All existing themes (dark + light) still look good; no theme reveals a regression
6. No `color-mix(... , transparent)` remains in the sidebar CSS block

## Out of scope

- Right sidebar (backlinks / outline)
- Topbar styling
- Main content area
- Theme palette changes
- Adding new sidebar features (filters, pin, drag)
- JavaScript refactoring beyond optional icon-emoji strip

## Non-changes explicitly preserved

- 280px sidebar width
- Folder ordering
- Search behavior and keyboard shortcuts
- Per-type and per-folder color tokens (even if some become unused)
