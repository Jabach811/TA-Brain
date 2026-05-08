---
title: "Default Allocation Analysis"
type: concept
tags: [concept, audit, qa, default-allocation, auto-enrollment]
created: 2026-04-17
updated: 2026-04-17
sources: 4
---

# Default Allocation Analysis

The QA analysis that identifies participants in default for investment allocations and validates the default population, fund, and percentages before remittance and participant access.

## Definition

Default Allocation Analysis is a [[qa]]-owned audit that reports participants in default for allocations — with their balances, elections, default status, allocation percentages, and fund descriptors — and validates that the default population aligns with the conversion strategy, that the default fund is correct, and that percentages are appropriate (for example, 100% to a TDF) (sources: `Default Allocation Analysis.md.txt`, `Default Allocation Analysis Description.md.txt`, `Default_Allocation_Analysis.md.txt`, `Default_Allocation_Analysis_by_Division_Code.md.txt`).

## Why It Matters

The analysis must be completed **prior to first remittance and before DDOL/VRU access** (source: `Default Allocation Analysis Description.md.txt`). If a participant hits the system in default to the wrong fund or at the wrong percentage, remediation after first remittance is messy — money has already moved.

## Evidence / Examples

**Variants:**

- Base analysis (`Default Allocation Analysis.md.txt`) — core audit against default population and allocation strategy.
- Description (`Default Allocation Analysis Description.md.txt`) — the framing doc, including the timing rule.
- Standalone (`Default_Allocation_Analysis.md.txt`) — the participant-level report with default status, allocation %, fund descriptor, and balances.
- By Division Code (`Default_Allocation_Analysis_by_Division_Code.md.txt`) — used for mergers and plans with multiple divisions, filtering allocation defaults by division.

**Prerequisites** (`Default Allocation Analysis.md.txt`): allocations must be loaded and default setup must be complete.

**Remedy:** remove or add participants to the default population as needed.

The by-division variant is the tell that this analysis is often used on complex multi-entity plans — the simple version cannot distinguish between populations that are supposed to default differently.

## Counterarguments

A participant being "in default" is not inherently a problem — defaults are the designed behavior for auto-enroll plans. The analysis is validating the *correct* default population, not flagging defaults themselves as errors.

## Related Concepts

- [[default-deferral-analysis]]
- [[auto-enrollment-setup]]
- [[faa-allocations]]
- [[eligibility]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[cit-takeover-audit]]
