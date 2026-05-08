---
title: "Day After Wire Audit"
type: concept
tags: [concept, audit, qa, wire, conversion]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# Day After Wire Audit

The QA audit that confirms assets posted to participant accounts match the prior-vendor wire totals, run the business day after [[liquidation-day]].

## Definition

The Day After Wire Audit is performed by [[qa]] the day after the wire posts. It runs the appropriate takeover audit SQL queries against the loaded data, compares [[aqt]] totals to the DC's wire totals, documents any differences, and saves results to the audit folder (sources: `Day After Wire Audit.md.txt`, `Completing the Day of AND Day After Wire Audit.md.txt`).

## Why It Matters

The [[day-of-wire-audit]] confirms that the correct amounts were received and planned for. The Day After Wire Audit confirms that the correct amounts actually posted — catching issues introduced during booking, fund splits, or Advanced Employer handling that only show up once data has landed in the system.

## Evidence / Examples

Procedure summary:

1. Run takeover audit queries (the standard [[aqt]] query set used post-wire).
2. Pivot and total the query output by fund and source.
3. Compare AQT totals to the DC's wire totals from the day before.
4. Document and resolve any differences.
5. Save results to the audit folder.

Output from this audit feeds the [[audit-pack]] and the downstream `[[to-balances]]` query used during final audit work.

## Counterarguments

A clean Day After audit is necessary but not sufficient — participant-level discrepancies can still exist even when plan-level totals reconcile. The [[faa-balances]] audit exists specifically to catch those.

## Related Concepts

- [[day-of-wire-audit]]
- [[liquidation-day]]
- [[aqt]]
- [[to-balances]]
- [[faa-balances]]
- [[audit-pack]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[cit-takeover-audit]]
