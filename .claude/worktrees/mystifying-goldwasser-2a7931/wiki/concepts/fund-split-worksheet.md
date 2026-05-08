---
title: "Fund Split Worksheet"
type: concept
tags: [concept, qa, fund-splits, faa, tool]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Fund Split Worksheet

A QA tool that balances fund splits during a conversion without forcing manual FAA review of every split.

## Definition

The Fund Split Worksheet is a [[qa]] tool that takes source mapping, fund mapping, prior-vendor balances, and [[trs]] balances as inputs and produces a balanced fund-split view — allowing fund splits (one prior-vendor fund mapping to multiple TA funds) to be reconciled without a manual, line-by-line pass through the [[faa-balances]] exception report (source: `Fund Split Worksheet Instructions.md.txt`).

## Why It Matters

Fund splits generate expected errors in [[faa-balances]] runs. Without the worksheet, QA has to manually triage every split-driven exception — slow, error-prone, and noisy. The worksheet separates legitimate split mechanics from real discrepancies.

## Evidence / Examples

**Inputs** (source: `Fund Split Worksheet Instructions.md.txt`):

- [[source-mapping]]
- [[fund-mapping]]
- Prior vendor balances
- [[trs]] balances

**Key rules:**

- Sort prior-vendor balances by Identifier.
- Enter split funds alphabetically.

**Common errors to watch for:**

- Identifier not sorted
- Source name mismatches
- Rounding issues

## Counterarguments

The worksheet's rules (sort by Identifier, alphabetical split entry) are strict because its math depends on consistent ordering. Rule violations do not produce obvious errors — they produce subtly wrong totals, which is worse. Worksheet discipline is a real constraint, not optional.

## Related Concepts

- [[faa-balances]]
- [[fund-mapping-audit]]
- [[fund-mapping]]
- [[source-mapping]]
- [[trs]]

## See Also

- [[qa]]
- [[lm-dc]]
