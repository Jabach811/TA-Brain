---
name: create-brief-sheet
description: Create Work Brain or TA Brain hand-drawn poster PNGs in the locked report-sheet style. Use when Joel asks for a visual explainer, daily brief sheet, report factory poster, onboarding sheet, system depiction, profile-builder poster, TA Brain sell sheet, TA Brain how-to sheet, or any other generated image that must match the approved Work Brain poster format.
---

# Create Brief Sheet

Use this local project skill to create Joel's preferred poster-style PNG reports and explainers.

## Required Reads

Read these first:

- `00-system/IMAGE-STYLE-LOCK.md`
- `00-system/BRIEF-SHEET-STYLE.md`
- `00-system/IMAGE-SHEET-PROMPT.md`
- `00-system/skills/create-brief-sheet/references/poster-workflow.md`

Then read only the project content that matters for the requested poster:

- For daily sheets: `06-reminders/open-reminders.md`, the relevant daily dump, and active plan pages.
- For report posters: the report markdown source in `08-reports/`.
- For TA Brain posters: the relevant TA Brain source pages or pitch copy.
- For profile-builder posters: the relevant Work Brain docs, examples, or user-provided copy.

## Visual Rules

- Tall portrait or long-scroll format. Prefer more vertical room when the content needs it.
- Bright white or off-white background, depending on the current style lock.
- Black hand-drawn marker lines.
- No blue filled panels.
- Empty checklist boxes unless the user asks for completed items.
- Huge all-caps hand-lettered title.
- Yellow highlight swashes behind section headings.
- Red circles around important phrases.
- Green dots or green circles for status/emphasis.
- Conversational wording.
- Real work content.
- Small useful doodles only when they help explain the content.
- No default hearts.
- No decorative stars at the top, bottom, or corners.
- No tape strips or taped top corners.
- No HTML/CSS imitation posters.

## Output Rules

- Generate a raster PNG, not a fake poster built in HTML/CSS or SVG.
- Treat `C:\Users\mabac\.codex\generated_images\019df9f9-d220-7ed1-99dd-7c24f4bc3321` as the canonical style reference set when the style lock says to use it.
- After generation, copy the selected PNG into the relevant workspace folder with a friendly descriptive filename.
- Put current-run deliverables in `08-reports/outbox/` unless the user names a different destination.
- If Joel explicitly approves a new poster as a style reference, also copy it into the long-term reference area named in `00-system/IMAGE-STYLE-LOCK.md`.

## Standard Sections

- Header
- The Brief
- Checklist
- Important Reminders
- Process Notes
- Fun Stuff

## Workflow

1. Identify the visual purpose.
2. Read the minimum source material needed for accurate text.
3. Choose the closest poster pattern from the canonical reference set.
4. Build the prompt using the locked prompt anchor and exact text where needed.
5. Generate a new PNG with the image generation tool.
6. Locate the newest generated PNG and copy it into the workspace with a clean name.
7. If the first output violates the style lock, tighten the prompt and regenerate.
8. Do not over-explain after generation unless Joel asks for saved paths or variants.

## Save Naming

Use short friendly filenames that describe the deliverable, for example:

- `how-to-use-ta-brain.png`
- `ta-brain-sell-sheet.png`
- `build-your-profile.png`
- `profile-builder-overview.png`

Add a date prefix only when the folder already contains multiple versions that need to coexist.
