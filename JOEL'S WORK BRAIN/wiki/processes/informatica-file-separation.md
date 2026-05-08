---
title: "Informatica File Separation"
type: process
tags: [work-brain, process]
created: 2026-05-08
updated: 2026-05-08
sources: 1
source_file: "05-processes/informatica-file-separation.md"
---

# Informatica File Separation

Keep live files and working files in separate folders when running Informatica loads.

## Source Link
- Operational source: [[05-processes/informatica-file-separation]]

## Wiki Summary
This page is the personal-wiki view of `05-processes/informatica-file-separation.md`. The operational file remains the source of truth; this wiki page gives the item a stable catalog entry, metadata, and cross-links.

## Source Snapshot
```markdown
# Informatica File Separation

## Rule

Keep live files and working files in separate folders when running Informatica loads.

## Why It Matters

Calliditas showed that a parameter file can reference the wrong input file when multiple similar files sit in the same folder. The workflow may appear successful while nothing expected lands in P3.

## Trigger

Use this process when:

- editing input files
- rerunning a corrected Informatica load
- keeping old and new versions of a file
- troubleshooting a successful workflow with missing P3 output

## Checklist

- [ ] Put live input files in a clean folder.
- [ ] Move drafts/working files somewhere else.
- [ ] Confirm the parameter file points to the intended input file.
- [ ] Run the workflow.
- [ ] Check totals.
- [ ] Confirm the expected item appears in P3.

## Mention History

| Date | Note |
|---|---|
| 2026-04-27 | Created from Calliditas loan parameter-file issue |

## Related

- [[calliditas]]
- [[informatica-loan-troubleshooting]]
```

## See Also
- [[plans/calliditas]]
- [[processes/informatica-loan-troubleshooting]]
- [[overview]]
- [[reports/daily/2026-05-07-daily-rundown]]
- [[05-processes/informatica-file-separation]]
