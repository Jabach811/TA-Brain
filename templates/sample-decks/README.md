# Sample Decks — Copilot Reference Files

Five fully designed 10-slide PowerPoint decks, built as style/structure reference
files to upload to Copilot. Each deck is a complete, realistic corporate
presentation in a distinct design system — no stock photos, no people, no
placeholder brackets. Artwork is custom SVG rendered to high-res PNG; charts,
timelines, stat cards, and status pills are native PowerPoint objects.

| File | Style | Content | Look |
|------|-------|---------|------|
| `deck-1-midnight-executive.pptx` | Midnight Executive | Executive handoff summary (401(k) transition) | Navy + ice blue, Georgia serif, concentric-arc motif, dark title/closer sandwich |
| `deck-2-charcoal-swiss.pptx` | Charcoal Swiss | Quarterly business review | Monochrome charcoal/off-white, Arial Black, giant ghost numerals, single red accent |
| `deck-3-coral-energy.pptx` | Coral Energy | Product launch plan | Navy base with coral/gold circles, Trebuchet MS, rounded cards |
| `deck-4-forest-moss.pptx` | Forest & Moss | Client onboarding playbook | Forest green + moss, Cambria serif, organic wave motif |
| `deck-5-berry-editorial.pptx` | Berry Editorial | Annual strategy outlook | Berry + cream, Georgia, magazine-editorial layouts with hairline frames |

Each deck mixes layouts across its 10 slides: full-bleed title, KPI stat grids,
styled bar/line/doughnut charts, milestone timelines, status tables with pills,
icon rows, comparison columns, risk cards, and a dark closing slide.

## Rebuilding

Source generators live in `src/` (Node + [pptxgenjs](https://gitbrent.github.io/PptxGenJS/),
`sharp` for SVG/icon rasterization, `react-icons` for iconography):

```bash
npm install pptxgenjs react-icons react react-dom sharp
mkdir -p decks2 && node src/deck1.js && node src/deck2.js && node src/deck3.js && node src/deck4.js && node src/deck5.js
```

Output lands in `decks2/`. Palettes, fonts, and content are defined at the top
of each `deckN.js`; shared building blocks (stat cards, timelines, pills,
icon circles, SVG backgrounds) are in `src/lib.js`.

Design approach follows Anthropic's public [pptx skill](https://github.com/anthropics/skills/tree/main/skills/pptx):
content-informed palettes with one dominant color, a repeated visual motif per
deck, varied layouts, big stat callouts, and a render-inspect-fix QA loop.
