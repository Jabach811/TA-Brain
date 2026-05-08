---
type: non-plan
title: "Informatica File Separation"
case_id: lesson/06
status: Complete
updated: 2026-05-08
sources: 1
---

# Informatica File Separation `lesson/06`

<aside class="metadata-card">
<div class="metadata-row"><span class="metadata-key">Type</span><span class="metadata-value">Lesson / one-off</span></div>
<div class="metadata-row"><span class="metadata-key">Status</span><span class="metadata-value"><span class="status-tag status-complete">Complete</span></span></div>
<div class="metadata-row"><span class="metadata-key">Updated</span><span class="metadata-value">2026-05-08</span></div>
<div class="metadata-row"><span class="metadata-key">Sources</span><span class="metadata-value">1</span></div>
<div class="metadata-row"><span class="metadata-key">Linked from</span><span class="metadata-value">Work Brain lessons</span></div>
</aside>

## Description

Keep live files and working files in separate folders when running Informatica loads.

## Current Updates

### Why It Matters

Calliditas showed that a parameter file can reference the wrong input file when multiple similar files sit in the same folder. The workflow may appear successful while nothing expected lands in P3.

### Trigger

Use this process when:

- editing input files
- rerunning a corrected Informatica load
- keeping old and new versions of a file
- troubleshooting a successful workflow with missing P3 output

### Checklist

- [ ] Put live input files in a clean folder.
- [ ] Move drafts/working files somewhere else.
- [ ] Confirm the parameter file points to the intended input file.
- [ ] Run the workflow.
- [ ] Check totals.
- [ ] Confirm the expected item appears in P3.

## Daily Updates

| Date | Note |
|---|---|
| 2026-04-27 | Created from Calliditas loan parameter-file issue |

## Open Items

## Lessons Learned / One-offs

### Related

- [[calliditas]]
- [[informatica-loan-troubleshooting]]
