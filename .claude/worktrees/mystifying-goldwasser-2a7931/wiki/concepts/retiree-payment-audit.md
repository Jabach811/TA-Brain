---
title: "Retiree Payment Audit"
type: concept
tags: [concept, qa, awd, retiree-payments, comments]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Retiree Payment Audit

The QA procedure for accessing and applying saved comments within AWD work items during retiree payment processing.

## Definition

The Retiree Payment Audit procedure documents how [[qa]] accesses and applies saved comments on AWD work items during retiree payment load and audit — creating the AWD work item, right-clicking to select **Add Comments**, using the folder icon to select from saved comments, and reviewing/editing before saving (source: `Retiree_Payment_Load-Audit_Process_Plus_v2.md.txt`).

## Why It Matters

Retiree payment processing generates repeated, audit-relevant comment patterns. The "saved comments" library exists so QA doesn't rewrite the same narrative every time a work item touches a recurring scenario — it standardizes comment content for audit traceability and reduces error.

## Evidence / Examples

**Process** (source: `Retiree_Payment_Load-Audit_Process_Plus_v2.md.txt`):

1. Create AWD work item.
2. Right-click the item and select **Add Comments**.
3. Use the folder icon to select saved comments.
4. Review and edit comments as needed before saving.

The procedure is narrow in scope — it is a mechanical how-to, not a full audit methodology. The broader retiree-payment audit logic lives elsewhere in the DB plan setup material referenced by the [[qa]] Team Project Charter.

## Counterarguments

Saved comments are useful for repeat scenarios but can mask bespoke issues if applied thoughtlessly. Editing the pulled template — not just saving as-is — is the discipline the procedure names explicitly.

## Related Concepts

- [[awd]]

## See Also

- [[qa]]
