# TA Brain Repo Health Checkpoint Actions

Date: 2026-07-07
Branch: `codex/personal-work-brain-wiki`
Checkpoint commit: `ddd6bb2 Checkpoint TA Brain wiki health`

## Summary

This note records the repo-health work performed after the 2026-07-04 findings review. The main outcome was restoring the canonical rendered wiki file, fixing workspace documentation drift, preserving/moving files into clearer locations, validating the wiki, and committing a checkpoint so the large uncommitted working tree was no longer at risk in OneDrive.

Important distinction: the checkpoint commit captured a large set of pre-existing uncommitted work in the repo. The sections below separate the actions I performed from the broader files that were captured by the checkpoint.

## Actions Performed

### Restored the canonical rendered wiki

- Promoted the fresh working build from:
  - `current/TA Wiki.working.html`
- To the canonical rendered file:
  - `current/TA Wiki.html`
- Result: `scripts/validate-wiki.js` can again compare markdown pages against the rendered canonical file.

### Renamed the old canonical archive with a timestamp

- Renamed:
  - `current/archive/TA Wiki.html`
- To:
  - `current/archive/TA Wiki.2026-06-12-0720.html`
- Reason: the old archive lacked the required `TA Wiki.YYYY-MM-DD-HHMM.html` timestamp convention.

### Fixed workspace documentation drift

Updated:

- `CLAUDE.md`
- `AGENTS.md`
- `studio/CLAUDE.md`

Corrections made:

- Replaced stale `current/wiki.html` references with `current/TA Wiki.html`.
- Replaced stale `build-wiki.py` renderer references with `fresh-rebuild/build-full-wiki-prototype.js`.
- Corrected the renderer description from Python to Node.
- Removed the claim that the renderer encrypts the `sources/` folder.
- Removed the claim that `themes/*.json` is an active input folder.
- Clarified that `fresh-rebuild/` is the renderer/rebuild area and that new visual prototypes belong in `studio/prototypes/`.

### Moved visual mock files into the studio prototype area

Moved from `fresh-rebuild/` to `studio/prototypes/`:

- `fresh-rebuild/icon-picker.html` -> `studio/prototypes/icon-picker.html`
- `fresh-rebuild/sidebar-mocks.html` -> `studio/prototypes/sidebar-mocks.html`
- `fresh-rebuild/icon-program-mocks.html` -> `studio/prototypes/icon-program-mocks.html`
- `fresh-rebuild/liquidation-day-featured.html` -> `studio/prototypes/liquidation-day-featured.html`

Reason: router convention says visual prototypes belong under `studio/prototypes/`, not in the renderer/rebuild folder.

### Renamed archive strays without deleting them

Renamed:

- `current/archive/wiki.html`
- To:
  - `current/archive/wiki.2026-05-13-1251.html`

Renamed:

- `current/archive/ta-brain-lifecycle-app1.html`
- To:
  - `current/archive/ta-brain-lifecycle-app.2026-05-13-1253.current-copy.html`

Reason: these files ignored the archive naming convention. I preserved them instead of deleting them.

### Checked but did not delete lifecycle duplicate files

Inspected these files:

- `fresh-rebuild/ta-brain-lifecycle-app.html`
- `fresh-rebuild/ta-brain-lifecycle-app - Copy.html`
- `fresh-rebuild/ta-brain-lifecycle-app - Copy (2).html`

Result:

- The two `Copy` files were not byte-identical to the current lifecycle app.
- I left them in place because they may be manual variants, not disposable duplicates.

### Validated the wiki

Ran:

```powershell
node scripts/validate-wiki.js
```

Final result:

- Markdown pages: 133
- Rendered pages: 133
- Broken links: 0
- Duplicate page IDs: 0
- Unexpected duplicate bare slugs: 0
- Allowed duplicate bare slugs: 5
- Stale allowed duplicate rules: 0
- Unindexed pages: 0
- Markdown missing from rendered output: 0
- Rendered pages missing from markdown: 0

### Attempted browser smoke test

Attempted to open `current/TA Wiki.html` through Playwright.

Result:

- Playwright was installed, but the Chromium browser binary was missing.
- I did not download browser binaries during the pass.
- Browser smoke was therefore not completed.

### Created the checkpoint commit

Committed:

- Commit: `ddd6bb2 Checkpoint TA Brain wiki health`
- Scope: 431 files changed, 53,484 insertions, 709 deletions

This checkpoint intentionally captured the large existing uncommitted repo state to reduce OneDrive/sync risk.

Excluded from the checkpoint:

- `.superpowers/docs/`
- `AGENTS (1).md`
- `AGENTS (2).md`
- `CLAUDE (1).md`
- `studio/resources/cinematic-site-components/`

Reason:

- The numbered AGENTS/CLAUDE files looked like local duplicate copies.
- `.superpowers/docs/` looked like local tooling output.
- `studio/resources/cinematic-site-components/` is a nested Git checkout, and Git refused to add it as a normal folder.

## Files Created Or Restored By My Actions

### Created by this follow-up documentation request

- `docs/repo-health-checkpoint-actions-2026-07-07.md`

### Restored/promoted during repo-health pass

- `current/TA Wiki.html`

This file came from `current/TA Wiki.working.html`; it was not hand-authored. It is the canonical rendered wiki output.

### Created by archive renames during repo-health pass

- `current/archive/TA Wiki.2026-06-12-0720.html`
- `current/archive/wiki.2026-05-13-1251.html`
- `current/archive/ta-brain-lifecycle-app.2026-05-13-1253.current-copy.html`

These were renamed/preserved archive files, not newly authored content.

### Created by moving existing prototype files

- `studio/prototypes/icon-picker.html`
- `studio/prototypes/sidebar-mocks.html`
- `studio/prototypes/icon-program-mocks.html`
- `studio/prototypes/liquidation-day-featured.html`

These were moved from `fresh-rebuild/`, not newly authored.

## Broader New Files Captured In The Checkpoint Commit

The commit also captured many pre-existing untracked files that were already present before this repo-health pass. Major locations included:

- `current/SS/`
- `current/diagrams/`
- `current/assets/`
- `current/archive/`
- `docs/`
- `fresh-rebuild/procedure-decks/`
- `scripts/validate-wiki.js`
- `scripts/wiki-validation-rules.js`
- `studio/prototypes/`
- `v2/`
- `wiki/concepts/`
- `wiki/entities/`
- `wiki/processes/`
- `wiki/sources/`

Notable new wiki/source files captured by the checkpoint included:

- `wiki/sources/tc-details-from-dan.md`
- `wiki/sources/tc-stuff.md`
- `wiki/processes/tc-conversion-timeline.md`
- `wiki/processes/source-mapping-tc.md`
- `wiki/processes/day-of-wire-audit.md`
- `wiki/processes/plan-sponsor-website-user-setup.md`
- `wiki/concepts/bonus-election-setup.md`
- `wiki/concepts/case-notes-template.md`
- `wiki/concepts/creative-planning-managed-accounts.md`
- `wiki/concepts/divisions-and-affiliates.md`
- `wiki/concepts/go-live-checklist.md`
- `wiki/concepts/payroll-file-automation.md`
- `wiki/concepts/team-charters.md`
- `wiki/entities/alteryx.md`
- `wiki/entities/eric-leytem.md`

## Current Remaining Loose Items

After the checkpoint commit, the only untracked items left were:

- `.superpowers/docs/`
- `AGENTS (1).md`
- `AGENTS (2).md`
- `CLAUDE (1).md`
- `studio/resources/cinematic-site-components/`

Recommended next cleanup decision:

- Delete or ignore the numbered AGENTS/CLAUDE duplicates if confirmed as local copies.
- Decide whether `.superpowers/docs/` should be ignored.
- Decide whether `studio/resources/cinematic-site-components/` should be treated as a submodule, copied as plain files, or left untracked.
- Confirm whether the two lifecycle app copy files are obsolete before deleting them:
  - `fresh-rebuild/ta-brain-lifecycle-app - Copy.html`
  - `fresh-rebuild/ta-brain-lifecycle-app - Copy (2).html`

