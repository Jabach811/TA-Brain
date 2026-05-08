---
title: "Pella ADP Deferral Handling"
type: process
tags: [work-brain, process]
created: 2026-05-08
updated: 2026-05-08
sources: 1
source_file: "05-processes/pella-adp-deferral-handling.md"
---

# Pella ADP Deferral Handling

For Pella ADP data, chase the deferral report early and assume the default-election status may be ambiguous.

## Source Link
- Operational source: [[05-processes/pella-adp-deferral-handling]]

## Wiki Summary
This page is the personal-wiki view of `05-processes/pella-adp-deferral-handling.md`. The operational file remains the source of truth; this wiki page gives the item a stable catalog entry, metadata, and cross-links.

## Source Snapshot
```markdown
# Pella ADP Deferral Handling

## Rule

For Pella ADP data, chase the deferral report early and assume the default-election status may be ambiguous.

## Why It Matters

ADP records may not allow full confidence about whether participants are truly in default and still within the auto-escalation window. Waiting too long for the report created pain in the prior Pella work.

## Working Approach

- Load participants out of default with their current percentage.
- Identify the ambiguous default-window group.
- Give that group to the client.
- Client communicates that participants may need to make their own changes because auto-escalation may not continue.

## Checklist

- [ ] Identify the real client/vendor contact early.
- [ ] Request the deferral report early.
- [ ] Confirm liquidation/wire timing.
- [ ] Identify ambiguous default-window participants.
- [ ] Prepare client communication list if needed.

## Mention History

| Date | Note |
|---|---|
| 2026-04-22 | Created from Pella ADP deferral discussion |
| 2026-04-26 | Pella needed contact and deferral report before liquidation |

## Related

- [[pella]]
- [[kimberly-morrissey]]
```

## See Also
- [[plans/pella]]
- [[people/kimberly-morrissey]]
- [[overview]]
- [[plans/calliditas]]
- [[05-processes/pella-adp-deferral-handling]]
