---
title: "CIT Audit Control"
type: concept
tags: [concept, audit, qa, governance, cit]
created: 2026-04-17
updated: 2026-04-17
sources: 3
---

# CIT Audit Control

The governance layer over the CIT conversion-audit catalog — a checklist of common conversion risks, the controls that mitigate each, and the management walkthroughs that test those controls.

## Definition

CIT Audit Control is the risk-and-control framework applied to every plan conversion. It identifies the common failure modes (TOA accuracy, system setup, allocation accuracy, data scrubbing), names the control that prevents each failure, and is tested via recurring management walkthroughs against a defined list of audits (sources: `CIT Audit Control Root Causes and Controls.md.txt`, `CIT Management Walkthrough Questions.md.txt`, `List_of_All_CIT_Audits.md.txt`).

## Why It Matters

Individual audits ([[fund-mapping-audit]], [[day-of-wire-audit]], [[faa-balances]], etc.) catch specific errors. CIT Audit Control is the meta-layer that ensures every conversion gets every required audit — it is the reason the catalog is a checklist and not a suggestion. It is also the artifact management and external auditors use to evidence that the conversion operation is controlled.

## Evidence / Examples

**Root-cause categories** (source: `CIT Audit Control Root Causes and Controls.md.txt`):

- TOA accuracy
- System setup
- Allocation accuracy
- Data scrubbing

**Management walkthrough topics** (source: `CIT Management Walkthrough Questions.md.txt`):

- Project plans
- Submission packages
- Access controls

**Audit catalog** (source: `List_of_All_CIT_Audits.md.txt`):

- **Conversion audits:** [[fund-mapping-audit]], [[source-mapping-audit]], [[day-of-wire-audit]], [[day-after-wire-audit]], [[final-takeover-audit]]
- **Additional audits:** DDOL Audits, PSD Audit ([[psd-rebalance]] is the downstream remediation), Statement Audits, [[post-conversion-loan-analysis]]

## Counterarguments

A checklist-based framework is only as strong as the rigor applied to each item. "Checkbox audits" — where a control is formally exercised but not meaningfully performed — are a known failure mode; the management walkthroughs exist specifically to detect that, but only work if the walkthroughs themselves are taken seriously.

## Related Concepts

- [[cit-takeover-audit]]
- [[audit-pack]]
- [[diversified-client-integration-audit]]
- [[fund-mapping-audit]]
- [[source-mapping-audit]]
- [[day-of-wire-audit]]
- [[day-after-wire-audit]]
- [[final-takeover-audit]]
- [[post-conversion-loan-analysis]]
- [[psd-rebalance]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[tc]]
