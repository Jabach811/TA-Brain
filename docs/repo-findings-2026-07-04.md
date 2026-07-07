# TA Brain — Repo Health Findings

*Date: 2026-07-04 · Surveyed: workspace CLAUDE.mds, wiki/index.md, wiki/log.md, renderer, current/, fresh-rebuild/, git state, validator run*

**Overall:** the machine is healthy — 133 pages, 0 broken links, 0 duplicate slugs, index fully synced, clean log discipline. The issues below are repo hygiene and doc drift, not content rot.

---

## 1. Repo state (urgent)

### 1.1 Canonical file is missing
- `current/TA Wiki.html` does not exist. Only `current/TA Wiki.working.html` is present (rebuilt 2026-07-01 10:40, after the TC ingest — it's fresh).
- The old canonical sits at `current/archive/TA Wiki.html` with no timestamp in the name, breaking the `TA Wiki.YYYY-MM-DD-HHMM.html` convention.
- Diagnosis: the Write Protocol got stuck halfway — canonical was archived, working copy never promoted.
- **Fix:** rename the archived file with a timestamp, promote working → canonical.

### 1.2 Validator is half-blind (caused by 1.1)
- `node scripts/validate-wiki.js` reports "Rendered pages: unknown" and "Markdown missing from rendered output: 133" because it compares markdown against the missing canonical.
- **Fix:** resolved automatically by fixing 1.1.

### 1.3 235 uncommitted changes
- Branch `codex/personal-work-brain-wiki`: 145 modified, 85 untracked, 4 deleted, 1 rename. The garage/studio restructure and recent ingests are all uncommitted.
- Repo lives in OneDrive — a sync hiccup could eat real work.
- **Fix:** commit a checkpoint.

---

## 2. Docs vs reality drift

### 2.1 Phantom encryption feature
- `studio/CLAUDE.md` says the build "encrypts the sources/ folder using the password defined in the script." No encryption code exists anywhere in `fresh-rebuild/build-full-wiki-prototype.js`.
- **Fix:** delete the claim (or build the feature, if it's still wanted).

### 2.2 Phantom themes folder
- `studio/CLAUDE.md` references `themes/*.json` as a renderer input. No `themes/` folder exists.
- Same file also calls the renderer a "Python script" in one spot — it's Node.
- **Fix:** update the doc.

### 2.3 Prototypes in the wrong place
- Convention: `studio/prototypes/[feature]-mock.html`. Reality: mocks (`icon-picker.html`, `sidebar-mocks.html`, `icon-program-mocks.html`, `liquidation-day-featured.html`) live in `fresh-rebuild/`.
- `fresh-rebuild/` is described by the router as "scratch space" yet permanently houses the renderer itself.
- **Fix:** either move mocks into `studio/prototypes/` or update the router's description of `fresh-rebuild/`.

---

## 3. Clutter

- `fresh-rebuild/ta-brain-lifecycle-app - Copy.html` and `- Copy (2).html` — ~1.4 MB of manual dupes.
- `current/archive/` strays that ignore the timestamp convention: `wiki.html`, `ta-brain-lifecycle-app1.html`, `TA Wiki.html` (see 1.1).
- **Fix:** confirm dupes are dead, delete; rename archive strays.

---

## 4. Wiki content gaps (ongoing garage work)

- **18 pages flagged `status: needs-review`** — mostly Informatica module and EDS loading placeholders waiting on dedicated procedure sources, plus `roles/doc-ops` (no direct Doc Ops source yet). Full list: alteryx, tc-stuff, creative-planning-managed-accounts, divisions-and-affiliates, eds-load-beneficiary-requirements, doc-ops, day-of-wire-audit, informatica-balance-module, informatica-allocation-module, tc-conversion-timeline, source-mapping-tc, hours-procedure, go-live-checklist, informatica-training-manual, loading-ytd-contributions-eds, informatica-troubleshooting-guide, payroll-file-automation, team-charters.
- **No department pages** at all.
- **No onboarding guides for TC or QA** — both roles are documented well enough to build them now.
- **Zero analysis pages.**
- **Three superseded pointer pages** still listed in the index (`concepts/transfer-in-kind`, `concepts/reversal-process`, `concepts/loading-eligibility-eds`) — they work as aliases but read as dead ends when browsing.

---

## Suggested order

1. Restore the canonical (1.1) — five minutes, unblocks the promote/validate loop.
2. Commit the branch (1.3).
3. Fix the CLAUDE.md drift (2.1–2.3).
4. Clean clutter (3).
5. Content gaps (4) — ongoing, source-dependent.
