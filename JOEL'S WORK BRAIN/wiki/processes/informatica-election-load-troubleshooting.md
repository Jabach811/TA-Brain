---
title: "Informatica Election Load Troubleshooting"
type: process
tags: [work-brain, process]
created: 2026-05-08
updated: 2026-05-08
sources: 1
source_file: "05-processes/informatica-election-load-troubleshooting.md"
---

# Informatica Election Load Troubleshooting

When an Informatica elections load kicks out because participants exist in the plan but not on the import file, pause and diagnose before switching tools.

## Source Link
- Operational source: [[05-processes/informatica-election-load-troubleshooting]]

## Wiki Summary
This page is the personal-wiki view of `05-processes/informatica-election-load-troubleshooting.md`. The operational file remains the source of truth; this wiki page gives the item a stable catalog entry, metadata, and cross-links.

## Source Snapshot
```markdown
# Informatica Election Load Troubleshooting

## Rule

When an Informatica elections load kicks out because participants exist in the plan but not on the import file, pause and diagnose before switching tools.

## Why It Matters

On 2026-04-28 Joel hit an elections load blocker. If Informatica cannot be made to work, EDS may be the fallback, but the root issue should be understood first.

## Checklist

- [ ] Identify participants in the plan but missing from the import file.
- [ ] Confirm whether those participants should be excluded or added.
- [ ] Ask Dave Shloat or another Informatica SME if override behavior exists.
- [ ] Decide whether Informatica can still be used.
- [ ] If not, switch to EDS and document the reason.

## Mention History

| Date | Note |
|---|---|
| 2026-04-28 | Created after Informatica elections load blocker |

## Related

- [[dave-shloat]]
```

## See Also
- [[people/dave-shloat]]
- [[overview]]
- [[plans/calliditas]]
- [[reports/daily/2026-05-07-daily-rundown]]
- [[05-processes/informatica-election-load-troubleshooting]]
