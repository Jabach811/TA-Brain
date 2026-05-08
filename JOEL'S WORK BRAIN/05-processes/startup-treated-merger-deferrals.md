---
type: non-plan
title: "Startup-Treated Merger Deferrals"
case_id: lesson/14
status: Complete
updated: 2026-05-08
sources: 1
---

# Startup-Treated Merger Deferrals `lesson/14`

<aside class="metadata-card">
<div class="metadata-row"><span class="metadata-key">Type</span><span class="metadata-value">Lesson / one-off</span></div>
<div class="metadata-row"><span class="metadata-key">Status</span><span class="metadata-value"><span class="status-tag status-complete">Complete</span></span></div>
<div class="metadata-row"><span class="metadata-key">Updated</span><span class="metadata-value">2026-05-08</span></div>
<div class="metadata-row"><span class="metadata-key">Sources</span><span class="metadata-value">1</span></div>
<div class="metadata-row"><span class="metadata-key">Linked from</span><span class="metadata-value">Work Brain lessons</span></div>
</aside>

## Description

When an existing plan is treated like a startup, deferral loading may need special handling so participants can be live without un-QC'd elections showing.

## Current Updates

### Why It Matters

International School of Denver raised a tricky pattern: the plan behaves like a startup, but participants may already have existing payroll/election context. Loading elections on live date could create a QC delay or visible bad data.

### Current Working Theory

One approach is:

- do not load deferrals before live date
- let participants enter changes after access opens
- later load the client-provided deferral file with the live effective date
- participant-entered changes should override the blanket load if already present

### Open Question

Should the client provide the deferral file before live date instead of after? If they already have the data, waiting may not be necessary.

## Daily Updates

| Date | Note |
|---|---|
| 2026-04-22 | Created from ISD limited-access / no-limited-access deferral discussion |

## Open Items

## Lessons Learned / One-offs

### Related

- [[international-school-of-denver]]
