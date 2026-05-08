---
title: "CIT Takeover Audit"
type: concept
tags: [concept, audit, qa, cit, takeover, governance]
created: 2026-04-17
updated: 2026-04-17
sources: 3
---

# CIT Takeover Audit

The standardized, phased audit process applied to every CIT (Client Integration Team) takeover — in both an internal (proactive, pre-asset-transfer) variant and an external (FAA / default / loan phase) variant.

## Definition

The CIT Takeover Audit is the umbrella audit process for plan takeovers, documented in both internal and external variants (sources: `CIT Takeover Audit Process - External.md.txt`, `Takeover Audit Process - Internal.md.txt`, `CTS Takeover Audit Process.md.txt`).

- **Internal variant** — proactive asset and data audits *against prior vendor information* before assets transfer, paired with day-of and day-after wire audits and record-load audits. Governed by the [[cit-audit-control]] checklist and by pre-go-live and post-go-live meetings (source: `Takeover Audit Process - Internal.md.txt`).
- **External variant** — the standardized phase catalog: asset transfer audits, FAA participant audits, and default and loan analysis (source: `CIT Takeover Audit Process - External.md.txt`).
- **CTS variant** — names the participating roles (Transition Manager, [[tc]], QC Consultant, Data Consultant) and the audit phases (pre-asset transfer, [[day-of-wire-audit]], [[day-after-wire-audit]], [[final-takeover-audit]]), plus additional audits for default analysis, vesting override, and loan analysis (source: `CTS Takeover Audit Process.md.txt`).

## Why It Matters

The internal/external framing captures a real shift in QA philosophy: the historic model audited data *after* loads; the current model audits data *against the prior vendor* before and during loads. The explicit objectives are to **reduce P/L exposure** and **increase audit coverage and efficiency** (source: `Takeover Audit - Process Review.md.txt`). This framing is why the catalog is the shape it is.

## Evidence / Examples

**Standard audit phases (across variants):**

- Pre-asset transfer audits — [[fund-mapping-audit]], [[source-mapping-audit]]
- [[day-of-wire-audit]]
- [[day-after-wire-audit]]
- Record load audits — [[faa-balances]], [[faa-allocations]]
- [[final-takeover-audit]]
- Additional: [[default-allocation-analysis]], [[default-deferral-analysis]], vesting override, [[pre-conversion-loan-analysis]], [[post-conversion-loan-analysis]]

**Governance:**

- [[cit-audit-control]] checklist
- Pre Go-Live and Post Go-Live meetings
- [[diversified-client-integration-audit]] as the wider framework

**Participating roles** (from `CTS Takeover Audit Process.md.txt`):

- Transition Manager (legacy name for [[com]])
- [[tc]]
- Quality Control Consultant ([[qa]])
- Data Consultant ([[lm-dc]])

## Counterarguments

The internal and external variants are complementary, not alternatives: the internal audits catch issues before they cost money; the external audits produce the standardized artifacts the audit team and external auditors need. Both are required.

## Related Concepts

- [[cit-audit-control]]
- [[final-takeover-audit]]
- [[fund-mapping-audit]]
- [[source-mapping-audit]]
- [[day-of-wire-audit]]
- [[day-after-wire-audit]]
- [[faa-balances]]
- [[faa-allocations]]
- [[pre-conversion-loan-analysis]]
- [[post-conversion-loan-analysis]]
- [[default-allocation-analysis]]
- [[default-deferral-analysis]]
- [[diversified-client-integration-audit]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[com]]
- [[tc]]
