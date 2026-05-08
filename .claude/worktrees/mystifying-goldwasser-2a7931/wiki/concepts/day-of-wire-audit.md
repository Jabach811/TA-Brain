---
title: "Day of Wire Audit"
type: concept
tags: [concept, audit, qa, wire, liquidation, conversion]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# Day of Wire Audit

The QA audit that compares prior-vendor wire amounts to the DC's fund mapping on the day the wire arrives.

## Definition

The Day of Wire Audit is performed by [[qa]] on [[liquidation-day]]. It compares the prior-vendor wire breakdown (by fund) to the DC's [[fund-mapping]] sheet to confirm that what arrived matches what is about to be booked, using prior fund codes or fund names as applicable (sources: `Day of Wire Audit.md.txt`, `Completing the Day of AND Day After Wire Audit.md.txt`).

## Why It Matters

This is the last chance to catch a mapping or wire-composition mismatch before assets land in participant accounts. A discrepancy caught on day-of is a phone call to [[cashiering]] or the prior record keeper; a discrepancy caught day-after is a reversal.

## Evidence / Examples

Procedure summary:

1. Pull the prior-vendor wire summary (fund-by-fund breakdown and totals).
2. Open the DC's fund mapping sheet.
3. Compare line by line — fund codes or fund names depending on what the vendor provided.
4. Flag any fund where the wire amount does not match the mapping expectation.

The audit depends on the [[fund-mapping-audit]] having already been completed and approved — without that, the comparison has no trustworthy baseline.

## Counterarguments

Day of Wire cannot be tested in a sandbox on the [[informatica]] side, which is one reason the paired [[day-after-wire-audit]] exists: it verifies what actually posted, after the fact, independent of the day-of estimate.

## Related Concepts

- [[liquidation-day]]
- [[day-after-wire-audit]]
- [[fund-mapping-audit]]
- [[fund-mapping]]
- [[cashiering]]
- [[cit-takeover-audit]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[audit-pack]]
