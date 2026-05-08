---
title: "Participant Notes"
type: concept
tags: [concept, p3-maintenance, participant-notes]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Participant Notes

A P3 maintenance operation for inserting, updating, or deactivating participant-level notes in the `PARTICIPANT_NOTES` table.

## Definition

Per `Insert-Delete%20Ppt%20Note.md.txt`, participant notes are free-form annotations attached to a participant record in P3. They are used by call-center and operations staff to flag special handling, document one-off decisions, or leave context for future servicing interactions.

## Why It Matters

Notes are how institutional knowledge survives across shifts and handoffs. A missing note can cause a call-center rep to miss a legal hold, a compliance restriction, or a prior agreement with the participant. Deactivating stale notes keeps the view clean so critical flags don't get buried.

## Process

1. Insert new note into `PARTICIPANT_NOTES`
2. Update or deactivate existing notes as needed
3. Verify via select query

## Evidence / Examples

- Source specifies the table (`PARTICIPANT_NOTES`) as the single point of truth
- Operations supports insert, update, and deactivate flows — no hard delete

## Related Concepts

- [[division-code-update]] — similar targeted P3 maintenance pattern
- [[deferral-term-to-zero]] — another participant-row maintenance task

## See Also

- [[p3]]
- [[qa]]
