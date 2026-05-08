# TA Brain Wiki — UI Makeover

**Date:** 2026-05-03
**File touched:** `ta-brain-lifecycle-app.html`
**Direction:** Light seasoning. Just salt. No badges, no kicker labels, no decorative chrome.

---

## What was bothering us

| Zone | Problem |
|---|---|
| Brand | Just text. No icon. |
| Sidebar namespace headers | 11px, faint gray. Disappeared. |
| Sidebar nav items | 14px. Hard to read. |
| Expanded sub-items | Blended into the namespace headers. No "these belong to that branch" relationship. |
| Hover | Plain background fill. Felt dead. |
| Right rail boxes (Contents / Categories / Referenced By) | Bland white cards with thin gray border. No rhythm. The infobox was the only one with character. |
| Tag pills | Tiny and washed out. |

---

## Changes

### Brand
- Added 32px rounded-square placeholder icon (teal gradient, "TA" in white serif). Sits left of the title.
- Title: 22 → 24px.
- HTML hook for swapping the placeholder later: drop an `<img>` inside `.brand-icon` — it inherits the rounded corners and fills the box.

### Sidebar — namespaces
- Headers: 11 → 12.5px, color changed from `--faint` (gray) to `--accent` (teal).
- Disclosure caret also teal.
- Hover gets a subtle background tint + slightly darker teal.

### Sidebar — nav items (sub-pages)
- Font size: 14 → 15px.
- Default color: muted gray; hover/active: ink.
- Hover adds a **3px teal accent bar** that slides in from the left (transform-based, not layout-shifting).
- Active state uses the same bar plus a soft teal background tint (`#eaf2f3`).
- Smooth 150ms transitions on color/background, 180ms on the bar.

### Sidebar — expanded list grouping
- Each `.nav-list` now has a soft 1px vertical guide line on the left, with the items indented 12px past it.
- Visually says "this group of items belongs to that namespace."

### Right rail — all boxes match the infobox pattern
- Outer box: 1px border, no internal padding (overflow hidden so the header strip clips clean).
- Header (`<h3>`): light teal strip (`#e8f0f2`), serif 15px, centered, separator line below.
- Body padding lives on the lists, not the box.
- Result: every rail card has the same rhythm — header strip + content — so the eye knows what to expect.

### Right rail — link hover (Contents + Referenced By)
- Hover slides the link 8px to the right and shows a 3px teal accent bar in the gap. No underline.
- Same accent vocabulary as the sidebar — feels intentional.

### Right rail — tag pills
- Border + bg upgraded for actual presence.
- Padding bumped to `4px 10px`.
- Hover: background → light teal, text → accent, border → mid teal.

---

## Design constraints we held to

- No new colors introduced. Everything uses existing tokens (`--accent`, `--surface-2`, `--ink`, `--muted`, plus the `#e8f0f2` already used by the infobox).
- The teal accent bar is the **only** new ornament. It earns its keep by doing triple duty: hover indicator, active state, and link hover.
- Wikipedia-style density and serif headings preserved.
- No layout shift on hover (transforms only).

---

## How to swap the placeholder icon

```html
<span class="brand-icon" aria-hidden="true">
  <img src="path/to/your-icon.png" alt="">
</span>
```

The wrapper keeps the rounded corner and gradient as a fallback while the image loads.
