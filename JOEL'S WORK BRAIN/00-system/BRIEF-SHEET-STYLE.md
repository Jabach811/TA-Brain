# Brief Sheet Style

This file locks in the visual language Joel corrected and approved.

## Current Canonical Reference

Use the generated PNG files in:

`C:\Users\mabac\.codex\generated_images\019df9f9-d220-7ed1-99dd-7c24f4bc3321`

Do not recreate this style with HTML/CSS. Use or generate raster PNG poster files only.

## Core Look

- Bright white paper, not beige or moody paper.
- Thick black hand-drawn marker outlines everywhere.
- Very large all-caps headline treatment.
- Clean tall poster layout with roomy numbered sections.
- Two-column rounded panel grid for multi-section explainers.
- Circle number badges for each panel.
- Yellow marker highlight swashes behind labels and important phrases.
- Small red hand-drawn circles and underlines for emphasis.
- Green hand-drawn circles/status marks used sparingly.
- Minimal color palette: black, white, yellow highlight, red, green, light blue only as a tiny accent.
- Taller long-scroll layouts are preferred when the content needs breathing room.

## Do

- Make the page feel like a polished hand-drawn poster, not an app screen.
- Keep checklist boxes empty.
- Use real current work, not generic filler.
- Use large readable handwritten text with lots of breathing room.
- Use highlight swashes instead of filled cards.
- Use little poster-style callouts, doodles, icons, circles, and arrows only when they help structure.
- Let one page feel like one organized command center.
- Use more vertical space instead of cramming dense panels.

## Do Not

- Do not use beige dashboard styling, gradients, blur, glass, or app chrome.
- Do not use big filled color cards.
- Do not use checked checklist boxes unless the report is explicitly a completed-items view.
- Do not make it look like corporate PowerPoint or a SaaS UI.
- Do not use tiny dense text.
- Do not add logos or watermarks.
- Do not make photorealistic objects.
- Do not add hearts as a default bottom doodle.
- Do not add decorative stars at the top, bottom, or corners.
- Do not add tape strips or taped corners at the top of the sheet.
- Do not use cutesy decoration that does not explain the work.
- Do not use app topbars, breadcrumb chips, dashboard cards, nested cards, or UI chrome for the visual sheet.
- Do not make HTML/CSS approximations of the poster style.
- Do not use script-rendered text panels over a generated poster background.
- Do not wash, blur, crop, or repurpose a generated poster as a blank template.

## Automation Visual Package

For the daily voice memo automation, use the fixed package script:

`00-system/package-automation-visual-pngs.ps1`

It copies the approved generated poster files into the required automation output names:

- `ig_04da2c11e31614000169fa68cd9ce88198bbaa05d1b98495dc.png` (`daily-work-map.png`) -> `daily-rundown.png`
- `ig_04da2c11e31614000169fa6b012a2881989624dad99798fb75.png` (`open-reminder-snapshot.png`) -> `open-items.png`

Only replace those source images with newly generated raster PNG posters that visibly match this style.

## Standard Sections

- Header
- The Brief
- Checklist
- Important Reminders
- Process Notes
- Fun Stuff

## Standard Prompt Anchor

```text
Use the generated PNG reference set at C:\Users\mabac\.codex\generated_images\019df9f9-d220-7ed1-99dd-7c24f4bc3321. Create a raster PNG poster, not an HTML/CSS imitation. Match the generated reference files: bright white hand-drawn poster, thick black outer border, oversized all-caps marker headline, subtitle, yellow highlighted motto strip, numbered rounded panels in a two-column grid, yellow highlight swashes behind panel labels, small red hand-drawn circles/underlines for emphasis, green hand-drawn status marks, simple content-focused doodle icons, and a bottom flow strip when useful. Do not add hearts, decorative stars, top tape strips, or taped top corners.
```
