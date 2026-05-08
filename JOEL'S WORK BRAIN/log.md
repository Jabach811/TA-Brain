# Activity Log

## [2026-05-05] setup | Joel's Work Brain initialized
- Created starter folder structure.
- Added system PRD, agent instructions, ingest workflow, templates, plan files, project files, process files, reminder files, and user guide.
- Seeded current work context from the May 5 brain dump.
- Notes: This vault is separate from the TA Brain institutional wiki. It tracks Joel's personal operating status.

## [2026-05-05] ingest | Late-April caseload dumps imported
- Source files: `2026-04-22-caseload-first-dump.txt`, `2026-04-26-morning-memo.txt`, `2026-04-26-voice-memo.txt`, `2026-04-27-monday-update.txt`, `2026-04-27-monday-pm-update.txt`, `2026-04-28-tuesday-update.txt`, `2026-04-29-wednesday-update.txt`
- Daily dumps created: `2026-04-22`, `2026-04-26-morning`, `2026-04-26-voice`, `2026-04-27-monday`, `2026-04-27-monday-pm`, `2026-04-28`, `2026-04-29`
- Plans created/updated: `calliditas`, `pella`, `international-school-of-denver`, `havern-school`, `cocc`, `tmg`, `cutting-edge-staffing`, `leibys-dairy`, `central-maine-healthcare-prime-healthcare`, `can-am-bridges`, `can-am-buildings`, `stout-co`, `bonnier-corporation`, `episcopal`
- People created: `beth`, `paul`, `jessica`, `kimberly-morrissey`, `dave-shloat`, `damien`, `michelle`, `anthony`, `selena`, `julie`, `earl`, `stacey`, `ruby`, `joe`
- Processes created: `informatica-file-separation`, `informatica-loan-troubleshooting`, `informatica-election-load-troubleshooting`, `nbi-update-after-load`, `pella-adp-deferral-handling`, `startup-treated-merger-deferrals`, `coverage-planning`, `advanced-employer-wire-coverage`, `reference-number-cleanup`
- Notes: `calliditas` is now the canonical spelling/page for the plan originally seeded as `calliditas`.

## [2026-05-05] edit | Operating layer and local skills added
- System docs created: `SCHEMA`, `OPERATING-RULES`, `REPORT-CATALOG`, `BRIEF-SHEET-STYLE`
- Local skills created: `ingest-dump`, `build-report`, `create-brief-sheet`, `weekly-review`
- Report folders created: `daily`, `weekly`, `snapshots`, `exports`, `leadership`
- Pages updated: `README`, `USER GUIDE`, `index`
- Notes: These are local project skills inside Joel's Work Brain, not globally installed Codex skills.

## [2026-05-05] report | Sample report suite generated
- Reports created: `08-reports/daily/2026-05-05-daily-work-map`, `08-reports/daily/2026-05-05-daily-text-brief`, `08-reports/weekly/2026-05-11-weekly-plan`, `08-reports/weekly/2026-05-08-friday-wrap`, `08-reports/snapshots/2026-05-05-current-caseload-snapshot`, `08-reports/snapshots/2026-05-05-open-reminder-snapshot`, `08-reports/exports/2026-05-05-plan-profile-pella`, `08-reports/exports/2026-05-05-person-profile-sally`, `08-reports/exports/2026-05-05-process-profile-base-file-first`, `08-reports/exports/2026-05-05-project-profile-ta-brain-onboarding-program`, `08-reports/leadership/2026-05-05-boss-ready-one-pager`, `08-reports/leadership/2026-05-05-leadership-demo-pack`
- Indexes updated: `08-reports/daily/_daily-index`, `08-reports/weekly/_weekly-index`, `08-reports/snapshots/_snapshots-index`, `08-reports/exports/_exports-index`, `08-reports/leadership/_leadership-index`
- Notes: These are sample outputs built from the current markdown network so Joel can see the full report shapes in practice. `REPORT-CATALOG` was also updated to explicitly include `Project Profile Export` so the catalog matches the report README.

## [2026-05-06] edit | Image style lock cleaned up
- Pages updated: `00-system/IMAGE-STYLE-LOCK`, `00-system/BRIEF-SHEET-STYLE`, `00-system/IMAGE-SHEET-PROMPT`, `00-system/skills/create-brief-sheet/SKILL`, `00-system/image-style-lock/README`, `07-brief-sheets/style-guide`, `08-reports/visual/visual-report-style.css`, `08-reports/visual/*.html`, `08-reports/visual/image-samples/index.html`
- Notes: Future Work Brain visuals should use a taller long-scroll report-sheet format when useful and should not include bottom hearts, decorative stars, top tape strips, or taped top corners.

## [2026-05-05] report | Visual report suite added
- Visual files created: `08-reports/visual/visual-index.html`, `08-reports/visual/daily-work-map.html`, `08-reports/visual/daily-text-brief.html`, `08-reports/visual/weekly-plan.html`, `08-reports/visual/friday-wrap.html`, `08-reports/visual/current-caseload-snapshot.html`, `08-reports/visual/open-reminder-snapshot.html`, `08-reports/visual/plan-profile-pella.html`, `08-reports/visual/person-profile-sally.html`, `08-reports/visual/process-profile-base-file-first.html`, `08-reports/visual/project-profile-ta-brain-onboarding-program.html`, `08-reports/visual/boss-ready-one-pager.html`, `08-reports/visual/leadership-demo-pack.html`
- Shared style created: `08-reports/visual/visual-report-style.css`
- Pages updated: `08-reports/README`
- Notes: All visual reports use the same off-white hand-drawn whiteboard style with marker outlines, highlighted labels, and real current vault content.

## [2026-05-05] edit | Visual report style reset to poster reference
- Shared style updated: `08-reports/visual/visual-report-style.css`
- Style docs updated: `00-system/BRIEF-SHEET-STYLE`, `07-brief-sheets/style-guide`
- Visual gallery updated: `08-reports/visual/visual-index.html`
- Notes: Replaced the beige dashboard-like visual language with the clean bright-white poster style used in Joel's attached report-factory reference.

## [2026-05-05] edit | Daily voice memo automation scaffold added
- System docs created: `00-system/DAILY-VOICE-MEMO-AUTOMATION`, `00-system/daily-voice-memo-config.json`, `00-system/daily-voice-memo-state.json`
- Folders created: `00-inbox/raw-voice-memos`, `00-inbox/to-digest`, `00-inbox/processed`, `00-inbox/needs-transcript`, `08-reports/outbox`
- Pages updated: `index`
- Notes: Automation is configured as a runbook and ledger but still needs Drive intake/outbox values. Raw audio requires transcription before digesting.

## [2026-05-05] edit | Daily voice memo automation paths configured
- Config updated: `00-system/daily-voice-memo-config.json`
- Intake path: `G:\My Drive\Codex Brain Dumps`
- Output path: `G:\My Drive\Codex Output`
- Automation created: `daily-work-brain-voice-memo-intake`
- Test files created: `G:\My Drive\Codex Brain Dumps\2026-05-06_1830_work-brain_voice-memo_001_TEST.txt`, `G:\My Drive\Codex Output\2026-05-06-work-brain-output-folder-test.txt`
- Visual created: `08-reports/visual/automation-setup-checklist.html`
- Notes: Local Google Drive synced folders exist and accepted test writes. Voice memo audio still needs readable transcript text before ingest.

## [2026-05-05] edit | Automation setup visual corrected to Profile Builder style
- Visual replaced: `08-reports/visual/automation-setup-checklist.html`
- Output overwritten: `G:\My Drive\Codex Output\2026-05-06-automation-setup-checklist.html`
- Style docs updated: `00-system/IMAGE-STYLE-LOCK`, `00-system/BRIEF-SHEET-STYLE`, `07-brief-sheets/style-guide`
- Notes: The old visual report/gallery-card style is now explicitly banned for Work Brain visuals. The canonical reference is the attached Profile Builder poster style.

## [2026-05-05] edit | Correct automation poster PNG installed
- Canonical reference copied: `00-system/image-style-lock/reference-samples/profile-builder-canonical.png`
- Visual PNG copied: `08-reports/visual/image-samples/automation-setup-checklist.png`
- Output copied: `08-reports/outbox/2026-05-06-automation-setup-checklist.png`, `G:\My Drive\Codex Output\2026-05-06-automation-setup-checklist.png`
- Browser wrapper updated: `08-reports/visual/automation-setup-checklist.html`
- Notes: The page now displays the generated raster poster that matches the Profile Builder style instead of an HTML/CSS approximation.

## [2026-05-05] ingest | First Gmail automation brain dump processed
- Source: `G:\My Drive\Codex Brain Dumps\20260505_221827_Brain Dump - May 5 2026 at 1018 PM.txt`
- Daily dump updated: `01-daily-dumps/2026-05-05`
- Pages updated: `02-plans/calliditas`, `02-plans/international-school-of-denver`, `02-plans/pella`, `05-processes/loan-review-discipline`, `05-processes/vesting-override-decision`, `05-processes/base-file-first`, `00-system/daily-voice-memo-state.json`, `index`
- Report created: `08-reports/daily/2026-05-05-gmail-automation-rundown`
- Output copied: `G:\My Drive\Codex Output\2026-05-05-gmail-automation-rundown.md`
- Notes: Gmail-to-Drive intake produced readable `.txt` transcript. This proves the intake side is working; next proof point is the scheduled 6:30 PM run without manual intervention.

## [2026-05-05] report | Daily automation PNG package enforced
- PNG outputs created from canonical generated image folder: `08-reports/outbox/daily-rundown.png`, `08-reports/outbox/open-items.png`
- Output copied: `G:\My Drive\Codex Output\daily-rundown.png`, `G:\My Drive\Codex Output\open-items.png`
- Removed HTML/CSS visual files and synced HTML outputs from the automation package.
- Automation docs updated: `00-system/DAILY-VOICE-MEMO-AUTOMATION`, `00-system/daily-voice-memo-config.json`, `00-system/IMAGE-STYLE-LOCK`, `00-system/BRIEF-SHEET-STYLE`, `07-brief-sheets/style-guide`
- Notes: Future scheduled runs must use raster PNG visuals from `C:\Users\mabac\.codex\generated_images\019df9f9-d220-7ed1-99dd-7c24f4bc3321`.

## [2026-05-06] ingest | May 6 Gmail brain dump processed
- Source: `G:\My Drive\Codex Brain Dumps\20260506_065258_Brain Dump - May 6 2026 at 652 AM.txt`
- Daily dump created: `01-daily-dumps/2026-05-06`
- Pages updated: `02-plans/cocc`, `02-plans/international-school-of-denver`, `02-plans/pella`, `02-plans/leibys-dairy`, `02-plans/havern-school`, `02-plans/central-maine-healthcare-prime-healthcare`, `03-projects/dynamic-brain-dump-workflow`, `04-people/damien`, indexes, reminders, automation state
- Pages created: `04-people/tonya`, `04-people/jocelyn`, `04-people/sarah`, `04-people/matt`, `05-processes/dc-p3-checklist`, `03-projects/email-mover-vba`, `03-projects/balance-query-export-automation`, `03-projects/daily-summary-automation`
- Reports created: `08-reports/daily/2026-05-06-daily-rundown`, `08-reports/snapshots/2026-05-06-open-items`
- Output copied: `G:\My Drive\Codex Output\daily-rundown.png`, `G:\My Drive\Codex Output\open-items.png`, `G:\My Drive\Codex Output\2026-05-06_0715-work-brain-daily-rundown.png`, `G:\My Drive\Codex Output\2026-05-06_0715-work-brain-open-items.png`, `G:\My Drive\Codex Output\2026-05-06-daily-rundown.md`, `G:\My Drive\Codex Output\2026-05-06-open-items.md`
- Notes: Manual flow run confirmed new Gmail dump can be processed and output files created in Codex Output.

## [2026-05-06] ingest | May 6 Drive brain dump (1:39 PM) processed
- Source: `G:\My Drive\Codex Brain Dumps\20260506_133918_Brain_Dump_-_May_6_2026_at_139_PM.txt`
- Daily dump updated: `01-daily-dumps/2026-05-06`
- Pages created: `05-processes/p2-ref-number-fund-link`, `03-projects/lumina-ai-service`, `04-people/nick`, `04-people/danny`, `04-people/brian-browning`, `00-inbox/to-digest/2026-05-06_1339_work-brain_voice-memo_002`
- Pages updated: `02-plans/cocc`, `02-plans/international-school-of-denver`, `02-plans/pella`, `02-plans/leibys-dairy`, `02-plans/havern-school`, `02-plans/calliditas`, `02-plans/banayn`, `04-people/anthony`, `04-people/selena`, `04-people/jessica`, `06-reminders/open-reminders`, `index`, folder indexes, automation state
- Reports updated: `08-reports/daily/2026-05-06-daily-rundown`, `08-reports/outbox/2026-05-06-daily-rundown`, `08-reports/outbox/2026-05-06-open-items`
- PNG outputs created: `08-reports/outbox/daily-rundown.png`, `08-reports/outbox/open-items.png`, `08-reports/outbox/2026-05-06-daily-rundown.png`, `08-reports/outbox/2026-05-06-open-items.png`
- Output copied: `G:\My Drive\Codex Output\daily-rundown.png`, `G:\My Drive\Codex Output\open-items.png`, `G:\My Drive\Codex Output\2026-05-06-daily-rundown.png`, `G:\My Drive\Codex Output\2026-05-06-open-items.png`, `G:\My Drive\Codex Output\2026-05-06-daily-rundown.md`, `G:\My Drive\Codex Output\2026-05-06-open-items.md`
- Notes: This dump confirmed the P2→P3 fund-link gotcha and confirmed Pella wire coverage is resolved; it also refreshed the open-reminder severity on Havern payroll pad (S3).

## [2026-05-06] edit | Automation visual packaging locked to generated posters
- Script created: `00-system/package-automation-visual-pngs.ps1`
- Specs updated: `00-system/DAILY-VOICE-MEMO-AUTOMATION`, `00-system/IMAGE-STYLE-LOCK`, `00-system/BRIEF-SHEET-STYLE`, `00-system/IMAGE-SHEET-PROMPT`, `00-system/daily-voice-memo-config.json`
- PNG outputs replaced: `08-reports/outbox/daily-rundown.png`, `08-reports/outbox/open-items.png`, `08-reports/outbox/2026-05-06-daily-rundown.png`, `08-reports/outbox/2026-05-06-open-items.png`
- Output copied: `G:\My Drive\Codex Output\daily-rundown.png`, `G:\My Drive\Codex Output\open-items.png`, `G:\My Drive\Codex Output\2026-05-06-daily-rundown.png`, `G:\My Drive\Codex Output\2026-05-06-open-items.png`
- Notes: Automation visual packaging now copies exact canonical generated poster PNGs from `visual_reference_folder` by generated image id. Script-rendered text overlays, washed poster templates, dashboards, cards, and fake poster approximations are explicitly forbidden.

## [2026-05-06] report | Daily voice memo automation run (no new intake)
- Run at: 2026-05-06T15:28:15-07:00
- Intake scanned: 0 new files (local_drive_intake_path)
- Markdown outputs refreshed: 08-reports/outbox/2026-05-06-open-items.md, 08-reports/outbox/2026-05-06-work-brain-daily-rundown.md, 08-reports/outbox/2026-05-06-work-map.md, 08-reports/snapshots/2026-05-06-open-items.md
- PNG outputs packaged (canonical poster copy): 08-reports/outbox/daily-rundown.png, 08-reports/outbox/open-items.png, plus dated copies 2026-05-06-daily-rundown.png and 2026-05-06-open-items.png
- Outputs copied to Drive outbox: G:\My Drive\Codex Output (PNGs + markdown)
- State ledger updated: 00-system/daily-voice-memo-state.json
- Moved sources: 0 (no ingest this run)
- Blockers: none

## [2026-05-06] report | Daily work map and open items PNGs forced to Drive
- Run at: 2026-05-06T15:35:45-07:00
- PNG outputs refreshed in Drive outbox: G:\My Drive\Codex Output\daily-rundown.png, G:\My Drive\Codex Output\open-items.png, G:\My Drive\Codex Output\2026-05-06-daily-rundown.png, G:\My Drive\Codex Output\2026-05-06-open-items.png
- PNG source: canonical generated image folder from daily-voice-memo-config.json; no HTML/CSS/dashboard substitutes created
- Open items report source: 06-reminders/open-reminders.md
- Drive intake cleanup: moved 3 already-processed transcript files into G:\My Drive\Codex Brain Dumps\Ingested
- State ledger updated after successful copy and move
- Blockers: none

## [2026-05-06] ingest | May 6 Drive transcripts corrected and PNG reports rebuilt
- Run at: 2026-05-06T15:43:51-07:00
- Sources processed: G:\My Drive\Codex Brain Dumps\20260506_065258_Brain_Dump_-_May_6_2026_at_652_AM.txt; G:\My Drive\Codex Brain Dumps\20260506_133918_Brain_Dump_-_May_6_2026_at_139_PM.txt
- Local ingest copies: 00-inbox/to-digest/2026-05-06_0652_work-brain_voice-memo_001.txt; 00-inbox/to-digest/2026-05-06_1339_work-brain_voice-memo_002.txt
- Pages updated: 01-daily-dumps/2026-05-06; 02-plans/pella; 02-plans/calliditas; 04-people/anthony; 05-processes/vesting-override-decision; 06-reminders/open-reminders
- Reports updated: 08-reports/daily/2026-05-06-daily-rundown; 08-reports/outbox/2026-05-06-daily-rundown; 08-reports/outbox/2026-05-06-open-items; 07-brief-sheets/2026-05-06-work-map
- PNG outputs rebuilt from updated May 6 content: 08-reports/outbox/daily-rundown.png; 08-reports/outbox/open-items.png; 08-reports/outbox/2026-05-06-daily-rundown.png; 08-reports/outbox/2026-05-06-open-items.png
- Output copied to Drive: G:\My Drive\Codex Output markdown + PNGs
- Drive intake moved: 3 files moved to G:\My Drive\Codex Brain Dumps\Ingested
- Notes: Corrected stale open report items; removed Pella/Kimberly wire handoff, Calliditas vesting override, and Calliditas loan issue from active open work.

## [2026-05-06] report | Generated updated Work Brain PNG posters
- Run at: 2026-05-06T15:54:17-07:00
- Generated source folder: C:\Users\mabac\.codex\generated_images\019dff60-e4a9-77e2-b96f-f68ec9315fb8
- Daily work map generated PNG: ig_0d9e52dd9cdddc2c0169fbc5565488819a8fa91c3e507113e1.png
- Open items generated PNG: ig_0d9e52dd9cdddc2c0169fbc596fce0819a98173cfc2452b3a6.png
- Output copied: G:\My Drive\Codex Output\daily-rundown.png; G:\My Drive\Codex Output\open-items.png; G:\My Drive\Codex Output\2026-05-06-daily-rundown.png; G:\My Drive\Codex Output\2026-05-06-open-items.png
- Notes: This run used image generation for new raster posters rather than copy-only canonical references or code/Pillow imitation panels.

## [2026-05-06] edit | Poster-creation skill upgraded and tested
- Skill updated: `00-system/skills/create-brief-sheet/SKILL`
- Reference added: `00-system/skills/create-brief-sheet/references/poster-workflow`
- Validation: `quick_validate.py` passed
- Test output created: `08-reports/outbox/2026-05-06-how-to-use-ta-brain.png`
- Notes: The skill now documents the locked poster workflow, required reads, save naming, canonical PNG reference usage, and the no-hearts / no-stars / no-top-tape rules.

## [2026-05-06] report | Reddit skills and plugins field-notes poster
- Research file created: `08-reports/outbox/2026-05-06-reddit-skills-plugins-research.md`
- Poster created: `08-reports/outbox/2026-05-06-reddit-skills-plugins-field-notes.png`
- Sources scanned: r/ClaudeCode, r/codex, r/ClaudeAI, r/OpenAI, r/ChatGPT
- Notes: Used the `create-brief-sheet` skill workflow and regenerated until the poster avoided hearts, decorative stars, top tape, and brand logos.

## [2026-05-07] report | Daily voice memo automation refresh
- Run at: 2026-05-07T05:08:58-07:00
- Intake scanned: `G:\My Drive\Codex Brain Dumps`
- Files processed: 0 new readable files
- Files skipped: 3 already-processed transcript root copies
- Pages updated: `06-reminders/open-reminders`, `08-reports/daily/_daily-index`, `index`, `00-system/daily-voice-memo-state`
- Reports created: `08-reports/daily/2026-05-07-daily-rundown`, `08-reports/outbox/2026-05-07-daily-rundown`, `08-reports/outbox/daily-rundown`, `08-reports/outbox/2026-05-07-open-items`, `08-reports/outbox/open-reminders`, `07-brief-sheets/2026-05-07-work-map`, `08-reports/outbox/2026-05-07-work-map`
- PNG outputs created from current-run generated posters: `08-reports/outbox/daily-rundown.png`, `08-reports/outbox/open-items.png`, `08-reports/outbox/2026-05-07-daily-rundown.png`, `08-reports/outbox/2026-05-07-open-items.png`
- Visual QA: daily poster was regenerated as a tall portrait PNG; final `daily-rundown.png` and `open-items.png` both verified at 1024x1536
- Output copied: `G:\My Drive\Codex Output\daily-rundown.png`, `G:\My Drive\Codex Output\open-items.png`, `G:\My Drive\Codex Output\2026-05-07-daily-rundown.png`, `G:\My Drive\Codex Output\2026-05-07-open-items.png`, plus May 7 markdown reports
- Drive intake moved: 3 already-processed root copies moved into `G:\My Drive\Codex Brain Dumps\Ingested` with `rootcopy-20260507T0508` suffixes to avoid overwriting existing ingested files
- Blockers: none

## [2026-05-07] ingest | May 7 Drive brain dump processed
- Run at: 2026-05-07T15:40:05-07:00
- Source: `G:\My Drive\Codex Brain Dumps\20260507_144248_Brain_Dump_-_May_7_2026_at_242_PM.txt`
- Local ingest copy: `00-inbox/to-digest/2026-05-07_1442_work-brain_voice-memo_001.txt`
- Daily dump created: `01-daily-dumps/2026-05-07`
- Pages created: `04-people/anita`, `05-processes/payroll-file-delivery-troubleshooting`
- Pages updated: `02-plans/cocc`, `02-plans/international-school-of-denver`, `02-plans/havern-school`, `02-plans/pella`, `02-plans/leibys-dairy`, `02-plans/banayn`, `02-plans/calliditas`, `03-projects/lumina-ai-service`, `03-projects/ta-brain-onboarding-program`, `03-projects/profile-builder`, `03-projects/visual-deliverables-and-pitch-decks`, `04-people/nick`, `04-people/sally`, `04-people/tonya`, `04-people/sarah`, `04-people/damien`, `04-people/matt`, `06-reminders/open-reminders`, `index`
- Reports updated: `08-reports/daily/2026-05-07-daily-rundown`, `08-reports/outbox/2026-05-07-daily-rundown`, `08-reports/outbox/2026-05-07-open-items`, `07-brief-sheets/2026-05-07-work-map`
- PNG outputs created from current-run generated posters: `08-reports/outbox/daily-rundown.png`, `08-reports/outbox/open-items.png`, `08-reports/outbox/2026-05-07-daily-rundown.png`, `08-reports/outbox/2026-05-07-open-items.png`
- Output copied: `G:\My Drive\Codex Output\daily-rundown.png`, `G:\My Drive\Codex Output\open-items.png`, `G:\My Drive\Codex Output\2026-05-07-daily-rundown.png`, `G:\My Drive\Codex Output\2026-05-07-open-items.png`, plus May 7 markdown reports
- Drive intake moved: 4 root files moved into `G:\My Drive\Codex Brain Dumps\Ingested`; duplicate root copies received `rootcopy-20260507T153930` suffixes
- Notes: COCC posting moved to resolved/watch; Havern setup is done with payroll file delivery still open; Pella remains a Sally/final-file follow-up; AI presentation prep is tomorrow's high-visibility work.

## [2026-05-08] report | Daily voice memo automation refresh
- Run at: 2026-05-08T05:03:38-07:00
- Intake scanned: `G:\My Drive\Codex Brain Dumps`
- Files processed: 0 new readable files
- Files skipped: 4 already-processed transcript root copies
- Pages updated: `06-reminders/open-reminders`, `08-reports/daily/_daily-index`, `log`
- Reports created: `08-reports/daily/2026-05-08-daily-rundown`, `08-reports/outbox/2026-05-08-daily-rundown`, `08-reports/outbox/2026-05-08-work-brain-daily-rundown`, `08-reports/outbox/2026-05-08-open-items`, `08-reports/outbox/daily-rundown`, `08-reports/outbox/open-reminders`, `07-brief-sheets/2026-05-08-work-map`, `08-reports/outbox/2026-05-08-work-map`
- PNG outputs created from current-run generated posters: `08-reports/outbox/daily-rundown.png`, `08-reports/outbox/open-items.png`, `08-reports/outbox/2026-05-08-daily-rundown.png`, `08-reports/outbox/2026-05-08-open-items.png`
- Output copied: `G:\My Drive\Codex Output\daily-rundown.png`, `G:\My Drive\Codex Output\open-items.png`, `G:\My Drive\Codex Output\2026-05-08-daily-rundown.png`, `G:\My Drive\Codex Output\2026-05-08-open-items.png`, plus May 8 markdown reports
- Drive intake moved: 4 already-processed root copies moved into `G:\My Drive\Codex Brain Dumps\Ingested` with `rootcopy-20260508T051112` suffixes
- State ledger updated after successful report, PNG package, Drive copy, and intake move
- Notes: No new transcript content was ingested. Refresh uses the current reminder network, with S1 clear and 26 active S2/S3 reminders surfaced.

## [2026-05-08] ingest | Archive plan profiles and lessons
- Plans added: 23 archival plan profiles.
- Lessons added: 22 lesson records.
- Canonical names: Calliditas, Bonnier Corporation, Can Am Bridges, Can Am Buildings, Banayn.
- Notes: Calliditas was moved to `_calliditas-alias.md` so the active app uses Calliditas only.
