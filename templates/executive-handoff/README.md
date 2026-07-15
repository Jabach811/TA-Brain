# Executive Handoff Summary — PowerPoint Templates

Five template decks for the Executive Handoff Summary, intended as reference/style
files to upload to Copilot when assembling a real plan summary. All decks share
the same 11-slide shell; only the art style differs.

## Slide shell (identical in all five decks)

1. **Title** — "Executive Handoff Summary" / [Plan Name] / Overview of the Corporate Retirement Plan Process
2. **Executive Overview** — executive summary
3. **Project Status** — current status
4. **Project Scope** — scope of the work
5. **Milestones** — key milestones
6. **Work Stream Status**
7. **Major Decisions**
8. **Risk Overview**
9. **Stakeholder Review**
10. **Immediate Priorities**
11. **Lessons Learned**

All body text is bracketed placeholder copy (e.g. `[Current status: On Track / At
Risk / Off Track]`) ready to be replaced with real content. No stock photos and
no people — each slide carries an abstract or hand-drawn motif tied to its
section (gauge for status, timeline for milestones, 2x2 matrix for risk, etc.).

## The five styles

| File | Style | Look |
|------|-------|------|
| `...-1-boardroom-blue.pptx` | Boardroom Blue | Classic corporate navy/steel blue, clean geometric line art |
| `...-2-hand-drawn.pptx` | Hand-Drawn Sketch | Ivory paper, ink-sketch diagrams with wobbly strokes and hatch shading |
| `...-3-executive-dark.pptx` | Executive Dark | Charcoal background with gold accents, thin-line motifs |
| `...-4-horizon-teal.pptx` | Horizon Teal | Soft teal gradient background, deep-teal geometric art |
| `...-5-minimal-editorial.pptx` | Minimal Editorial | Warm ivory, serif headlines, terracotta accent, hairline rules |

## Regenerating

`generate_templates.py` rebuilds all five decks (requires `python-pptx` and
`Pillow`):

```bash
pip install python-pptx pillow
python3 generate_templates.py   # writes .pptx files next to the script
```

Edit the `SECTIONS` list to change slide titles/placeholders, or the `STYLES`
dict to adjust palettes and fonts.
