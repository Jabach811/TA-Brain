---
title: "Startup-Treated Merger Deferrals"
type: process
tags: [work-brain, process]
created: 2026-05-08
updated: 2026-05-08
sources: 1
source_file: "05-processes/startup-treated-merger-deferrals.md"
---

# Startup-Treated Merger Deferrals

When an existing plan is treated like a startup, deferral loading may need special handling so participants can be live without un-QC'd elections showing.

## Source Link
- Operational source: [[05-processes/startup-treated-merger-deferrals]]

## Wiki Summary
This page is the personal-wiki view of `05-processes/startup-treated-merger-deferrals.md`. The operational file remains the source of truth; this wiki page gives the item a stable catalog entry, metadata, and cross-links.

## Source Snapshot
```markdown
# Startup-Treated Merger Deferrals

## Rule

When an existing plan is treated like a startup, deferral loading may need special handling so participants can be live without un-QC'd elections showing.

## Why It Matters

International School of Denver raised a tricky pattern: the plan behaves like a startup, but participants may already have existing payroll/election context. Loading elections on live date could create a QC delay or visible bad data.

## Current Working Theory

One approach is:

- do not load deferrals before live date
- let participants enter changes after access opens
- later load the client-provided deferral file with the live effective date
- participant-entered changes should override the blanket load if already present

## Open Question

Should the client provide the deferral file before live date instead of after? If they already have the data, waiting may not be necessary.

## Mention History

| Date | Note |
|---|---|
| 2026-04-22 | Created from ISD limited-access / no-limited-access deferral discussion |

## Related

- [[international-school-of-denver]]
```

## See Also
- [[plans/international-school-of-denver]]
- [[overview]]
- [[plans/calliditas]]
- [[reports/daily/2026-05-07-daily-rundown]]
- [[05-processes/startup-treated-merger-deferrals]]
