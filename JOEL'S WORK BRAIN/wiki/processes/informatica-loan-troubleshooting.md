---
title: "Informatica Loan Troubleshooting"
type: process
tags: [work-brain, process]
created: 2026-05-08
updated: 2026-05-08
sources: 1
source_file: "05-processes/informatica-loan-troubleshooting.md"
---

# Informatica Loan Troubleshooting

If Informatica says a loan load succeeded but P3 does not show the expected result, do not stop at the success message.

## Source Link
- Operational source: [[05-processes/informatica-loan-troubleshooting]]

## Wiki Summary
This page is the personal-wiki view of `05-processes/informatica-loan-troubleshooting.md`. The operational file remains the source of truth; this wiki page gives the item a stable catalog entry, metadata, and cross-links.

## Source Snapshot
```markdown
# Informatica Loan Troubleshooting

## Rule

If Informatica says a loan load succeeded but P3 does not show the expected result, do not stop at the success message.

## Why It Matters

Calliditas showed a silent-style failure where the workflow appeared fine, but the P3 step did not show the expected load because the parameter file referenced the wrong input file.

## Checklist

- [ ] Confirm the parameter file points to the right input file.
- [ ] Confirm the input file header/source matches expectations.
- [ ] Check case number / plan references.
- [ ] Check totals after the workflow.
- [ ] Confirm P3 shows the expected load before calling it done.
- [ ] Separate live and working files before rerun.

## Mention History

| Date | Note |
|---|---|
| 2026-04-26 | Initial issue: successful Informatica upload but not visible in P3 final step |
| 2026-04-27 | Root cause: wrong input file referenced in parameter file |

## Related

- [[calliditas]]
- [[informatica-file-separation]]
```

## See Also
- [[plans/calliditas]]
- [[processes/informatica-file-separation]]
- [[overview]]
- [[reports/daily/2026-05-07-daily-rundown]]
- [[05-processes/informatica-loan-troubleshooting]]
