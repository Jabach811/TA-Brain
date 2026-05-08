---
type: non-plan
title: "Informatica Election Load Troubleshooting"
case_id: lesson/05
status: Complete
updated: 2026-05-08
sources: 1
---

# Informatica Election Load Troubleshooting `lesson/05`

<aside class="metadata-card">
<div class="metadata-row"><span class="metadata-key">Type</span><span class="metadata-value">Lesson / one-off</span></div>
<div class="metadata-row"><span class="metadata-key">Status</span><span class="metadata-value"><span class="status-tag status-complete">Complete</span></span></div>
<div class="metadata-row"><span class="metadata-key">Updated</span><span class="metadata-value">2026-05-08</span></div>
<div class="metadata-row"><span class="metadata-key">Sources</span><span class="metadata-value">1</span></div>
<div class="metadata-row"><span class="metadata-key">Linked from</span><span class="metadata-value">Work Brain lessons</span></div>
</aside>

## Description

When an Informatica elections load kicks out because participants exist in the plan but not on the import file, pause and diagnose before switching tools.

## Current Updates

### Why It Matters

On 2026-04-28 Joel hit an elections load blocker. If Informatica cannot be made to work, EDS may be the fallback, but the root issue should be understood first.

### Checklist

- [ ] Identify participants in the plan but missing from the import file.
- [ ] Confirm whether those participants should be excluded or added.
- [ ] Ask Dave Shloat or another Informatica SME if override behavior exists.
- [ ] Decide whether Informatica can still be used.
- [ ] If not, switch to EDS and document the reason.

## Daily Updates

| Date | Note |
|---|---|
| 2026-04-28 | Created after Informatica elections load blocker |

## Open Items

## Lessons Learned / One-offs

### Related

- [[dave-shloat]]
