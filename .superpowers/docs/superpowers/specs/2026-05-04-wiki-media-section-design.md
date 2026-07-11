# Wiki Media Section — Design

**Date:** 2026-05-04
**Scope:** `fresh-rebuild/ta-brain-lifecycle-app.html` (and `build-wiki.py` if it feeds page payloads).
**Status:** Approved, ready for implementation plan.

---

## Goal

Add first-class support for visual media on wiki pages — screenshots, diagrams, animations, and external visual references — without cluttering the article body or losing items in the shuffle.

The wiki's value is "quick-hit info." Visual references should ride alongside the prose where they support reading, and collect in one obvious place where they don't.

## Non-goals

- No lightbox modal in v1. External and non-inline items open in a new tab.
- No video player in v1. Reserved as a `type` value for later.
- No edits to the existing `extras` row (the chip buttons under the article title or in the topbar). Those stay as-is.
- No changes to sidebar/topbar/search.

---

## Surfaces

Three places media appears, with intentional overlap so nothing gets lost:

1. **Existing extras-row buttons** — unchanged. Authors keep using `extras` for any high-value chip-style action button.
2. **Inline figures** in article body — markdown `![caption](path)` renders as a styled `<figure>` with caption and a stable `id="fig-N"` anchor.
3. **Right-rail "Media" block** — new. Minimal link list of every media item attached to the page, regardless of whether it lives inline.

The rail block is a *media table-of-contents* for the page.

---

## Data model

New optional `media` array on each page's JSON payload (the structure consumed by `renderRightRail` and friends in `ta-brain-lifecycle-app.html`):

```json
"media": [
  { "type": "screenshot", "label": "TIK upload screen",   "src": "assets/tik-upload.png",     "inline": true },
  { "type": "diagram",    "label": "TIK workflow",        "src": "assets/tik-workflow.svg" },
  { "type": "animation",  "label": "Column mapping",      "src": "assets/col-mapping.gif" },
  { "type": "external",   "label": "Lucid: TIK data flow","href": "https://lucid.app/..." }
]
```

**Field reference:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `type` | enum | yes | `screenshot` \| `diagram` \| `animation` \| `external` \| `video` (`video` reserved for later) |
| `label` | string | yes | Short, link-shaped. Shown in the rail row. |
| `src` | string | one of `src`/`href` | Relative path within the wiki repo. Used for local media. |
| `href` | string | one of `src`/`href` | Full URL. Used for `type: "external"`. |
| `inline` | boolean | optional | `true` → the build inserts a `<figure>` in the article body and the rail row anchors to it. Default `false`. |

Authors don't write JSON directly. They add a `media:` frontmatter block to the markdown page; `build-wiki.py` reads it and emits this array on the page payload.

```yaml
---
title: "Balance Import — TIK"
type: concept
media:
  - type: screenshot
    label: TIK upload screen
    src: assets/tik-upload.png
    inline: true
  - type: diagram
    label: TIK workflow
    src: assets/tik-workflow.svg
  - type: external
    label: "Lucid: TIK data flow"
    href: https://lucid.app/lucidchart/...
---
```

For inline screenshots, the markdown body keeps the standard `![caption](src)` syntax. The build script ensures every image in the body gets an `id="fig-N"` anchor (counting top-down) and that any `media` entry with `inline: true` whose `src` matches an image in the body picks up that anchor for the rail link.

---

## Right-rail Media block

Lives between the existing `Categories` and `Referenced By` blocks (or wherever fits cleanest in `renderRightRail`). Hidden when `page.media` is empty or absent.

**Markup pattern:**

```html
<section class="rail-box rail-media">
  <h3>Media</h3>
  <ul class="media-list">
    <li class="media-item" data-type="screenshot">
      <a href="#fig-1">
        <span class="media-icon icon-shot"><!-- svg --></span>
        <span class="media-label">TIK upload screen</span>
        <span class="media-tag">Screenshot</span>
      </a>
    </li>
    ...
  </ul>
</section>
```

**Visual treatment:**

- Same shell as other rail boxes (1px border, teal-tinted header bar, serif `<h3>`).
- Row layout: 14px icon · label (link blue) · small uppercase type tag (faint gray, right-aligned).
- Hover: faint background tint (`#f8fbfb`), label underlines.
- Icons: 14px outlined SVGs, color-coded by type:
  - `screenshot` → `var(--muted)` (gray)
  - `diagram` → `var(--accent)` (teal)
  - `animation` → `var(--warning)` (amber)
  - `external` → `var(--question)` (violet)
  - `video` → reuse animation amber for now

Icon set:
- screenshot: image/photo glyph (rect + small circle + mountain line)
- diagram: three nodes connected (two small circles up top, one bottom, lines)
- animation: filmstrip / play-in-square
- external: arrow-out-of-box (existing pattern from extras-row)
- video: play triangle in rounded square

---

## Click behavior

| Type | Click target |
|---|---|
| Screenshot, `inline: true` | `href="#fig-N"` — scroll to inline figure on the page. |
| Screenshot, `inline: false` | Open `src` in a new tab (`target="_blank" rel="noopener"`). |
| Diagram | Open `src` in a new tab. |
| Animation | Open `src` in a new tab. |
| External | Open `href` in a new tab. |
| Video | Reserved — open `src` in a new tab if implemented. |

No lightbox. Lightbox/modal can be added later as an enhancement; the data model and rail markup don't need to change to support it.

---

## Inline figure rendering

Inline images already render via `renderMarkdown(...)` in the existing pipeline. Two small additions:

1. Wrap each top-level `<img>` in the rendered article in a `<figure>` with the alt text as `<figcaption>`. (Or equivalent: extend the markdown renderer to recognize `![cap](src)` as a figure.)
2. Assign `id="fig-N"` to each figure in document order so the rail rows can anchor to it.

**Figure styling** (new CSS, modeled on the mockups):

- Bordered card (1px `--line-soft`), white background.
- Image fills width, sensible `max-height`.
- Caption strip below the image: 12px, muted color, faint top border.

---

## Empty state

If a page's payload has no `media` (or an empty array), `renderRightRail` skips the block entirely. No "No media" placeholder. Same convention as `Categories` (hidden when no tags) and `Referenced By` (shows "No backlinks" only because backlinks are computed, not authored).

---

## Build pipeline (`build-wiki.py`)

The build script needs to:

1. Parse the new optional `media:` frontmatter block from each wiki markdown page.
2. Validate each entry has `type` + `label` + (`src` xor `href`).
3. For each entry with `inline: true`, ensure the markdown body contains an `<img>` with matching `src`. If yes, the rail entry gets an anchor; if no, log a warning during build (don't fail the build) and treat as non-inline.
4. Number figures top-down so anchors are stable across builds.
5. Emit `media` on the page payload object.

If `build-wiki.py` doesn't currently produce the inline JSON used by `ta-brain-lifecycle-app.html`, treat that as a separate plumbing question for the implementation plan; for the prototype, hand-edited fixture data on a couple of pages is acceptable to validate the rendering before doing the build-pipeline work.

---

## Out of scope (explicit)

- Lightbox / modal viewer.
- Reordering or sorting media (display order = author order in frontmatter).
- Per-section media (media is page-scoped, not section-scoped).
- Author UI for adding media.
- Image optimization / responsive `srcset`.
- Video embedding (YouTube/Loom). Reserved for a follow-up.

---

## Acceptance

- A wiki page with no `media` renders identically to today.
- A wiki page with `media` shows a "Media" block in the right rail with one row per item, type-icon visible, type tag visible, hover state working.
- Inline screenshots render as captioned `<figure>` blocks with stable IDs.
- Clicking an inline screenshot row in the rail scrolls to the figure on the page.
- Clicking a non-inline item opens the asset in a new tab.
- Block disappears when there's no media; no broken layout.
- Existing extras-row chips, topbar extras, TOC, Categories, and Referenced By blocks are untouched.

---

## Files likely touched

- `fresh-rebuild/ta-brain-lifecycle-app.html` — CSS for `.rail-media`, `.media-list`, `.media-item`, `.media-icon`, `.figure`, `.figure figcaption`; rendering branch in `renderRightRail`; figure-wrapping pass over rendered markdown.
- `build-wiki.py` — frontmatter parsing for `media:`, figure ID assignment, payload emission.
- A handful of wiki markdown pages — sample `media:` frontmatter for verification.
