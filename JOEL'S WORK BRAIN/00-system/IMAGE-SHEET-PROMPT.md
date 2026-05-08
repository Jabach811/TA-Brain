# Image Sheet Prompt Recipe

> Permanent rule: all Work Brain generated images must follow `[[IMAGE-STYLE-LOCK]]`.
> Use `00-system/image-style-lock/reference-samples/` as the approved visual reference set.

Use this to recreate the visual style Joel liked.

## Style

- tall portrait whiteboard poster
- long-scroll format is allowed and preferred for dense reports
- generated poster style from `C:\Users\mabac\.codex\generated_images\019df9f9-d220-7ed1-99dd-7c24f4bc3321`
- bright white paper / whiteboard background
- black hand-drawn marker outlines
- huge chunky hand-lettered headline
- numbered rounded panels
- yellow highlighter swashes behind headings
- red marker circles/underlines around key phrases
- small green status marks
- no blue filled panels
- empty checklist boxes
- subtle gray shadows
- muted yellow, red, and green accents only
- readable large handwritten text
- conversational, useful, not decorative fluff
- no default hearts, decorative stars, top tape strips, or taped top corners
- no script-rendered text overlays
- no HTML/CSS, Python/Pillow, SVG, dashboard, or card-layout approximations

## Required Sections

1. Header
2. The Brief
3. Checklist
4. Important Reminders
5. Process Notes
6. Fun Stuff

## Prompt Skeleton

```text
Use the generated PNG reference set at C:\Users\mabac\.codex\generated_images\019df9f9-d220-7ed1-99dd-7c24f4bc3321. Create a raster PNG poster in that same generated Work Brain style. Use a tall portrait whiteboard poster format with more vertical room when needed. Bright white paper background, thick black marker outer border, huge chunky handwritten all-caps title, numbered rounded panels, yellow highlighter swashes behind panel headings, red marker circles/underlines for key phrases, small green status marks, and simple content-focused doodle icons. Casual but readable. This must look like the approved generated poster PNGs, not a software-rendered template.

Top header:
Title: "[DATE] WORK MAP"
Date/fun line: "[DATE RELATED LINE]"
Operating motto: "[SHORT MOTTO]"

Large section titled "THE BRIEF":
[Conversational summary with the real current situation.]

Section titled "CHECKLIST":
Important: show EMPTY checkbox squares only. Do not put checks in them.
[Action items.]

Section titled "IMPORTANT REMINDERS":
[Rules, takeaways, warnings.]

Section titled "PROCESS NOTES":
[Reusable process lesson or decision rule.]

Bottom section titled "FUN STUFF :)":
[Side projects, creative work, standards, future building.]

Constraints: no corporate template look, no photorealism, no logos, no watermark, no checked boxes, no tiny dense text, no hearts, no decorative stars, no top tape strips, no taped top corners, no app UI, no dashboard panels, no script-rendered text overlay, no HTML/CSS approximation.
```
