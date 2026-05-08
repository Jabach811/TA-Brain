# Daily Voice Memo Automation

Use this runbook for the daily Work Brain automation that turns Joel's voice memo dumps into updated vault pages, daily reports, and outbound brief material.

## Purpose

Every day, collect any new voice memo/transcript files from the configured Google Drive intake folder, ingest them into Joel's Work Brain, build the daily rundown, create the visual brief-sheet prompt/output, and place outbound files where Joel's Gmail automation can send them onward.

## Current Setup Status

Status: `local-drive-paths-configured`

Required before the automation can run end-to-end:

- `local_drive_intake_path` or `drive_intake_folder_url` in `00-system/daily-voice-memo-config.json`
- `drive_outbox_folder_url` or `local_drive_outbox_path` in `00-system/daily-voice-memo-config.json`
- A transcript source for voice memos

Important limitation: raw audio files must be transcribed before the Work Brain digest can be written. If the intake folder receives only `.m4a`, `.mp3`, or `.wav` files, the automation should save them under `00-inbox/raw-voice-memos/` and add a needs-transcript note instead of inventing content.

## Folder Contract

Local folders:

- `00-inbox/raw-voice-memos/` - untouched audio files collected from Drive
- `00-inbox/to-digest/` - readable transcript/source files ready to ingest
- `00-inbox/processed/` - copied source files after successful ingest
- `00-inbox/needs-transcript/` - notes for audio files that need transcription
- `08-reports/daily/` - daily markdown report outputs
- `08-reports/visual/` - visual report HTML outputs
- `08-reports/outbox/` - files ready to sync or send externally

Drive folders:

- Intake folder: where Gmail or a mail rule saves new voice memo attachments/transcripts
- Outbox folder: where completed daily rundown / brief files should land for the Gmail send automation

## Naming Convention

Incoming voice memo or transcript:

`YYYY-MM-DD_HHMM_work-brain_voice-memo_###.ext`

Examples:

- `2026-05-06_1730_work-brain_voice-memo_001.m4a`
- `2026-05-06_1730_work-brain_voice-memo_001.txt`
- `2026-05-06_1730_work-brain_voice-memo_001.md`

Generated local source:

`00-inbox/to-digest/YYYY-MM-DD_HHMM_work-brain_voice-memo_###.md`

Daily dump:

`01-daily-dumps/YYYY-MM-DD.md`

Daily rundown:

`08-reports/daily/YYYY-MM-DD-daily-rundown.md`

Visual brief source:

`07-brief-sheets/YYYY-MM-DD-work-map.md`

Outbound bundle:

`08-reports/outbox/YYYY-MM-DD-work-brain-daily-rundown.md`

## Automation Steps

1. Read `00-system/daily-voice-memo-config.json`.
2. Read `00-system/daily-voice-memo-state.json`.
3. List the configured intake folder. Prefer `local_drive_intake_path` when present because it is the synced Google Drive folder on Joel's machine. Use `drive_intake_folder_url` only when a local path is not configured.
4. Identify all files whose Drive file id is not in `processed_drive_file_ids`, `captured_audio_file_ids`, or `failed_file_ids`.
5. Process every new readable file in oldest-first order:
   - Google Docs, `.txt`, and `.md`: fetch text content and save a normalized markdown source under `00-inbox/to-digest/`.
   - Audio/video files: save raw metadata or raw file under `00-inbox/raw-voice-memos/`, create a note under `00-inbox/needs-transcript/`, and do not run ingest until transcript text exists.
6. For every readable source, run the local `ingest-dump` workflow:
   - update or create the daily dump
   - update mentioned plans, projects, people, processes, and reminders
   - update `index.md`
   - append to `log.md`
7. Build the daily rundown using the current markdown network:
   - what changed
   - what matters now
   - open reminders
   - blocked/waiting items
   - next-workday priority list
8. Build the open items snapshot from `06-reminders/open-reminders.md`.
9. Generate exactly two new raster PNG posters from the current run's ingested content:
   - `daily-rundown.png` content must come from the updated daily rundown / work map.
   - `open-items.png` content must come directly from `06-reminders/open-reminders.md` after ingest cleanup.
   - Both images must use the canonical generated-images folder as the visual reference source.
   - Never satisfy a current run by copying an old/static reference poster.
   - Never satisfy a current run with HTML/CSS, Python/Pillow, SVG, dashboards, cards, panels, or code-drawn poster approximations.
10. The canonical visual reference folder is:
   - `C:\Users\mabac\.codex\generated_images\019df9f9-d220-7ed1-99dd-7c24f4bc3321`
11. The two configured reference PNGs are examples only:
   - `ig_04da2c11e31614000169fa68cd9ce88198bbaa05d1b98495dc.png` (friendly label: `daily-work-map.png`)
   - `ig_04da2c11e31614000169fa6b012a2881989624dad99798fb75.png` (friendly label: `open-reminder-snapshot.png`)
12. Do not draw text overlays on top of a reference image. Do not blur/wash a poster and redraw it as a dashboard. Do not render boxes, cards, app panels, or any fake poster approximation. For a current daily run, create two new raster image-generation outputs in that exact generated-poster style.
13. Package the two generated PNG files by running:
   - `00-system/package-automation-visual-pngs.ps1 -RunDate YYYY-MM-DD -GeneratedDailyRundownPng <path-to-new-daily-poster.png> -GeneratedOpenItemsPng <path-to-new-open-items-poster.png>`
14. The packaging script must fail if either current-run generated PNG path is missing.
15. Copy both stable PNG files and dated copies to the configured output folder:
   - `daily-rundown.png`
   - `open-items.png`
   - `YYYY-MM-DD-daily-rundown.png`
   - `YYYY-MM-DD-open-items.png`
16. Create or update the brief-sheet source using `00-system/IMAGE-SHEET-PROMPT.md` when a new raster poster needs to be generated.
17. If image generation is not available in the scheduled environment, stop and report a blocker. Do not fall back to old copied reference posters or code-made approximations.
18. Update `00-system/daily-voice-memo-state.json` with processed, captured, failed, and last-run details.
19. End with a short status:
   - files processed
   - pages updated
   - reminders surfaced
   - outputs created, including the two PNG visual files
   - blockers, if any

## Success Criteria

- No source file is processed twice.
- Multiple memos in one day are all handled.
- Raw audio is preserved, not guessed from.
- The Work Brain markdown network is updated before the report is written.
- The daily rundown PNG and open items PNG are placed in the outbox every successful run.
- The job clearly says what is missing when it cannot complete.
