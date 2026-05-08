---
title: "Legal Holds"
type: concept
tags: [concept, compliance, legal-hold, roc-tool, duplicate-ssn]
created: 2026-04-17
updated: 2026-04-17
sources: 3
---

# Legal Holds

A compliance restriction applied to a participant record — most commonly in the [[duplicate-ssn-cycle]] — that blocks activity until the underlying issue is resolved.

## Definition

A legal hold is a flag set on a participant record that prevents processing while a compliance or identity question is open. It is set and cleared via ROC procedures in both the CORP and TDA regions. In the duplicate-SSN workflow, legal holds are applied only to the **converting** plan's copy of the record, not to every plan carrying the SSN.

## Why It Matters

Legal holds are a control, not a punishment. They buy the operations team time to investigate whether a record truly represents a distinct participant or a data error, without letting money move in the meantime. Lifting the hold prematurely — or failing to lift it once the issue resolves — both create serious problems.

## How They're Set and Cleared

Per `Dup%20SSN%20Process%20-%20DISABLE.md.txt` and `Dup%20SSN%20Process%20-%20ENABLE.md.txt`:

- **Set:** as part of `ROC_DUPLICATE_SSN_DISABLE` in CORP and TDA, alongside disabling [[ddol-vru]]
- **Cleared:** via `ROC_REMOVING_LEGAL_HOLD`, after the duplicate is resolved

Per `Duplicate%20SSN%20Process.md.txt`, the hold is applied "to converting plan only" — a key scoping rule that prevents the hold from contaminating unrelated plans where the SSN appears.

## Evidence / Examples

- Both disable and enable procedures explicitly name legal-hold ROC procedures as part of the sequence
- Scoping rule (converting plan only) appears in the master duplicate-SSN summary

## Related Concepts

- [[duplicate-ssn-cycle]] — the primary operational trigger
- [[ddol-vru]] — paired disablement
- [[roc-tool]] — the set/clear mechanism

## See Also

- [[tc]]
- [[qa]]
- [[p3]]
