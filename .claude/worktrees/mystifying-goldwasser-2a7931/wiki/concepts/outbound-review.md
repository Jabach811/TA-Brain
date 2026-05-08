---
title: "Outbound Review"
type: concept
tags: [concept, qa, post-go-live, obf, odsp]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Outbound Review

The QA procedure that ensures Outbound Files (OBFs) are released post go-live, identifying any plans still stuck in "Review" status.

## Definition

Outbound Review is a [[qa]]-owned post-go-live procedure that runs the OBF Review SQL against [[odsp]], pivots and filters the results, identifies plans still marked as "Review", notifies [[tc]], and documents findings (source: `Outbound Review Procedure 3-25-2024.md.txt`).

## Why It Matters

Outbound files are the mechanism by which TA transmits participant and plan data to external systems and partners. A plan whose OBFs are stuck in "Review" is a plan whose downstream data flow is silently broken — statements, feeds to recordkeeping partners, commission feeds, and other interfaces can all be affected. Catching and releasing them is a post-go-live hygiene step with real downstream consequences.

## Evidence / Examples

**Procedure** (source: `Outbound Review Procedure 3-25-2024.md.txt`):

1. Run OBF Review SQL from [[odsp]].
2. Pivot and filter results.
3. Identify plans still marked as "Review".
4. Notify [[tc]] and document findings.

The DIA Licensing and Commission process ([[diversified-client-integration-audit]]) is one specific place where stuck OBFs cause visible downstream impact.

## Counterarguments

Not every "Review" status is a problem — some plans legitimately sit in review until a manual sign-off occurs. The procedure is about surfacing them, not automatically releasing them.

## Related Concepts

- [[odsp]]
- [[diversified-client-integration-audit]]

## See Also

- [[qa]]
- [[tc]]
- [[lm-dc]]
