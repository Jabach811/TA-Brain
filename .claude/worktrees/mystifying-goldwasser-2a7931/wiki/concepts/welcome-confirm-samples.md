---
title: "Welcome Confirm Samples"
type: concept
tags: [concept, qa, enrollment, welcome-kit, p3, roc, jira]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# Welcome Confirm Samples

The QA procedure that generates and reviews enrollment confirmation samples before they are released to participants — holding confirms in P3, running ROC stored procedures, and triggering a batch release job via JIRA.

## Definition

Welcome Confirm Samples is a [[qa]]-owned procedure that produces sample enrollment confirms for review before mass release. Confirms are held in [[p3]], [[roc-tool]] stored procedures are run to generate them, and a batch job is triggered via [[jira]] to release them; sample PDFs are then retrieved and saved (sources: `Welcome Confirm Samples.md.txt`, `Welcome Kit Sample Process.md.txt`).

## Why It Matters

Enrollment confirms go out to every participant at plan launch. An error in the template, the data, or the routing becomes a participant-visible problem at scale. The sample process is the checkpoint that catches those before thousands of confirms print and mail.

## Evidence / Examples

**Process summary** (source: `Welcome Confirm Samples.md.txt`):

- Hold confirms in [[p3]].
- Run [[roc-tool]] stored procedures.
- Trigger batch job via [[jira]].
- Retrieve and save sample PDFs.

**Welcome Kit variant** (source: `Welcome Kit Sample Process.md.txt`):

- Insert sample participants.
- Run confirm jobs.
- Review, approve, or correct confirms before release.

This audit intersects with `[[enrollment-kit-outsourcing]]` (an upcoming concept), where confirm production is outsourced to an external print/mail vendor.

## Counterarguments

Sample-based review cannot catch data errors specific to participants outside the sample. It is a template and process check, not a full-population audit.

## Related Concepts

- [[p3]]
- [[roc-tool]]
- [[jira]]
- [[enrollment-kit-outsourcing]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[com]]
