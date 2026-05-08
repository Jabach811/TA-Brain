# Image Style Lock

This file is the permanent image style rule for Joel's Work Brain.

## Non-Negotiable Rule

All Work Brain visuals must use real generated PNG poster files created from or visually matched to the canonical generated-images folder.

Do not rebuild Work Brain visuals with HTML/CSS, dashboards, cards, app layouts, SVG diagrams, corporate flowcharts, glossy SaaS graphics, blue panels, gradients, photorealistic mockups, or generic infographic layouts.

If the visual is for Joel's Work Brain, use the canonical generated PNG set as the visual reference source. Do not approximate the style in code.

Canonical generated-images folder:

`C:\Users\mabac\.codex\generated_images\019df9f9-d220-7ed1-99dd-7c24f4bc3321`

## Approved Reference Folder

Use these generated PNGs as the only visual reference set:

`C:\Users\mabac\.codex\generated_images\019df9f9-d220-7ed1-99dd-7c24f4bc3321`

Important: the approved live reference is the actual generated PNG set in that folder. Future visuals must be copied from that folder or generated using that folder's PNGs as the reference set.

These are the approved examples:

- `profile-builder-canonical.png` - canonical attached style reference
- `automation-setup-checklist.png` - correct automation setup poster in the canonical style
- `daily-work-map.png`
- `daily-text-brief.png`
- `weekly-plan.png`
- `friday-wrap.png`
- `current-caseload-snapshot.png`
- `open-reminder-snapshot.png`
- `plan-profile-pella.png`
- `person-profile-sally.png`
- `process-profile-base-file-first.png`
- `project-profile-ta-brain-onboarding-program.png`
- `boss-ready-one-pager.png`
- `leadership-demo-pack.png`

## Required Workflow

- Choose the closest existing PNG from `C:\Users\mabac\.codex\generated_images\019df9f9-d220-7ed1-99dd-7c24f4bc3321` as the reference.
- For current-run reports with updated content, generate a new raster PNG using that reference style.
- Copy-only is allowed only when the user explicitly wants a static/reference visual with no current-run text changes.
- If a wrapper is needed, make it a plain image wrapper only. Do not style a fake poster in HTML/CSS.
- For new visuals, generate a raster PNG using the canonical folder as the reference source.
- Copy final PNGs to `08-reports/outbox/` and `G:\My Drive\Codex Output`.

## Automation Packaging Lock

The daily voice memo automation must use image generation first, then `00-system/package-automation-visual-pngs.ps1` for its required visual package.

Reference examples:

- `daily-rundown.png` uses canonical generated image `ig_04da2c11e31614000169fa68cd9ce88198bbaa05d1b98495dc.png` (friendly label: `daily-work-map.png`)
- `open-items.png` uses canonical generated image `ig_04da2c11e31614000169fa6b012a2881989624dad99798fb75.png` (friendly label: `open-reminder-snapshot.png`)

These files are style references, not acceptable substitutes for a current run with updated content. Do not overlay live markdown text on top of a reference poster. Do not generate a Python/Pillow, HTML/CSS, SVG, dashboard, card, wireframe, or app-screen approximation. For every daily run, create new raster image-generation outputs using the canonical reference folder, then package those new generated PNGs. If image generation is unavailable, stop and report a blocker.

## Required Look

- Tall portrait poster or long scroll sheet, like the attached Profile Builder reference.
- Bright white paper / whiteboard background.
- Thick, loose black marker outlines.
- Huge chunky handwritten all-caps title.
- Numbered panels with circle numbers.
- Two-column poster grid when there are multiple sections.
- Imperfect rounded section boxes with roomy padding.
- Yellow highlighter swashes behind section titles.
- Red marker circles around important phrases.
- Green marker circles/status marks.
- Simple useful doodles: folders, calendars, checklists, bells, charts, arrows, sticky notes, people cards, document pages.
- Sketchy arrows showing flow.
- Large readable text.
- Conversational wording.
- Bottom flow strip when the concept has a clear pipeline.
- Useful poster structure, not decoration.

## Forbidden Look

- No slick corporate PowerPoint style.
- No clean vector-flowchart look.
- No blue filled panels.
- No glossy gradients.
- No photorealism.
- No tiny dense text.
- No logos.
- No watermark.
- No sterile SaaS aesthetic.
- No fake technical circuit-board background.
- No abstract shapes unless they are tiny hand-drawn doodles.
- No heart doodles at the bottom or anywhere else unless explicitly requested.
- No decorative star doodles at the top, bottom, or corners.
- No tape strips or taped corners at the top of the sheet.
- No cutesy decoration that does not explain the content.
- No app-screen topbar, crumbs, chips, dashboard panels, or nested UI cards for Work Brain visuals.
- No CSS imitation of the poster style.
- No standalone HTML visual design pretending to be the poster.

## Standard Prompt Anchor

Use this block at the start of every Work Brain image prompt:

```text
Use the generated PNG reference set at C:\Users\mabac\.codex\generated_images\019df9f9-d220-7ed1-99dd-7c24f4bc3321 as the visual source. Create a raster PNG in the same hand-drawn poster style as those files: bright white paper background, thick loose black marker border, huge chunky handwritten all-caps title, subtitle under the title, yellow highlighter motto strip, numbered rounded panels in a clean two-column grid, yellow highlighter swashes behind panel headings, red marker circles around key phrases, green marker circles/status marks, simple content-focused doodle icons, sketchy arrows, large readable marker text, and a bottom "How it flows" strip when useful.

No HTML/CSS imitation, no app topbar, no chips, no dashboard panels, no slick vector style, no corporate PowerPoint look, no blue filled panels, no gradients, no photorealism, no tiny dense text, no logos, no watermark, no hearts, no decorative stars, no top tape strips, no taped top corners.
```

## Standard Structure

Most Work Brain images should use this format:

1. Huge hand-lettered title.
2. One plain subtitle.
3. Yellow highlighted motto/banner.
4. Numbered panels.
5. Short bullets.
6. Red circles around the most important phrase.
7. Green dots for status.
8. Doodle icons that explain the content.
9. Bottom motto or flow strip only when useful; do not add hearts or decorative stars.

## Copy Rule

When creating new image samples for the project, save final PNGs into the relevant project folder and keep durable reference copies when the style is approved.

Preferred style reference folder:

`00-system/image-style-lock/reference-samples/`

Preferred report image output folder:

`08-reports/visual/image-samples/`

## Quality Bar

A successful Work Brain image should feel like:

- a smart person drew it on a clean whiteboard,
- a report someone can understand in 20 seconds,
- energetic but still organized,
- hand-made and human,
- pitch-ready without looking like corporate clip art.

If an image looks like a normal flowchart or generic infographic, it failed.
