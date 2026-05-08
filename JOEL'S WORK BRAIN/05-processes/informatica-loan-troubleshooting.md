---
type: non-plan
title: "Informatica Loan Troubleshooting"
case_id: lesson/07
status: Complete
updated: 2026-05-08
sources: 1
---

# Informatica Loan Troubleshooting `lesson/07`

<aside class="metadata-card">
<div class="metadata-row"><span class="metadata-key">Type</span><span class="metadata-value">Lesson / one-off</span></div>
<div class="metadata-row"><span class="metadata-key">Status</span><span class="metadata-value"><span class="status-tag status-complete">Complete</span></span></div>
<div class="metadata-row"><span class="metadata-key">Updated</span><span class="metadata-value">2026-05-08</span></div>
<div class="metadata-row"><span class="metadata-key">Sources</span><span class="metadata-value">1</span></div>
<div class="metadata-row"><span class="metadata-key">Linked from</span><span class="metadata-value">Work Brain lessons</span></div>
</aside>

## Description

If Informatica says a loan load succeeded but P3 does not show the expected result, do not stop at the success message.

## Current Updates

### Why It Matters

Calliditas showed a silent-style failure where the workflow appeared fine, but the P3 step did not show the expected load because the parameter file referenced the wrong input file.

### Checklist

- [ ] Confirm the parameter file points to the right input file.
- [ ] Confirm the input file header/source matches expectations.
- [ ] Check case number / plan references.
- [ ] Check totals after the workflow.
- [ ] Confirm P3 shows the expected load before calling it done.
- [ ] Separate live and working files before rerun.

## Daily Updates

| Date | Note |
|---|---|
| 2026-04-26 | Initial issue: successful Informatica upload but not visible in P3 final step |
| 2026-04-27 | Root cause: wrong input file referenced in parameter file |

## Open Items

## Lessons Learned / One-offs

### Related

- [[calliditas]]
- [[informatica-file-separation]]
