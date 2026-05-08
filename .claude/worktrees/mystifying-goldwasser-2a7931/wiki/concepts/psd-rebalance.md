---
title: "PSD Rebalance"
type: concept
tags: [concept, qa, prod-support, post-conversion, audit]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# PSD Rebalance

The Plan Sponsor Data rebalance request submitted after the final takeover audit to reconcile PSD balances with audited totals.

## Definition

PSD Rebalance is a [[qa]]-initiated, [[prod-support]]-executed procedure requested after the [[final-takeover-audit]] is complete. QA creates an AWD work item; Prod Support schedules the rebalance; and both teams then validate PSD balances against the final audit totals, ensuring variance falls within the acceptable range (source: `PSD ReBalance.md.txt`).

## Why It Matters

Plan Sponsor Data is the authoritative plan-level balance record used for plan-sponsor reporting. After a conversion, PSD and audited actuals can drift — because of fund splits, rounding, or late-posting adjustments. The rebalance reconciles the two, producing a clean plan-level baseline for downstream statements and reports. Without it, plan-level reporting shows a discrepancy against participant-level reality.

## Evidence / Examples

**Trigger:** completion of the [[final-takeover-audit]] (source: `PSD ReBalance.md.txt`).

**Process:**

1. QA creates an AWD work item requesting the rebalance.
2. [[prod-support]] schedules the rebalance.
3. Validation compares PSD balances to final audit totals.
4. Variance must fall within the acceptable range.

The PSD Audit (referenced in `List_of_All_CIT_Audits.md.txt`) is the companion audit that detects when a rebalance is needed.

## Counterarguments

A rebalance is a remediation, not a validation — running it silently papers over discrepancies whose root cause should be understood. The variance check is the safeguard against that, but only if variance thresholds are set meaningfully.

## Related Concepts

- [[final-takeover-audit]]
- [[audit-pack]]
- [[cit-audit-control]]

## See Also

- [[qa]]
- [[prod-support]]
- [[lm-dc]]
