---
title: "Deferral Term-to-Zero"
type: concept
tags: [concept, deferrals, p3-maintenance, termination, transmit-codes]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Deferral Term-to-Zero

A P3 maintenance operation that deactivates active deferral rows for terminated participants and inserts zero-percent replacement rows.

## Definition

Per `Updating%20Deferrals%20for%20Term%20to%20Zero.md.txt`, the term-to-zero process handles participants whose employment has ended but whose active [[deferrals]] rows are still on file. Leaving active non-zero rows in place can cause P3 or a downstream payroll integration to attempt to continue deducting when the participant has no paycheck.

## Process

1. Temporarily flag target participants (by termination status)
2. Move active deferral rows to history
3. Insert zero-percent deferral rows
4. Verify
5. Remove temporary flags

## Why It Matters

Terminated participants with active non-zero deferrals create payroll exceptions, contribution-report noise, and audit flags. Cleaning them to zero is a routine hygiene operation, especially after a conversion go-live when the terminated population is being reconciled.

## Related Concepts

- [[deferrals]] — parent concept
- [[transmit-codes]] — A/T/S indicators that drive payroll transmission state
- [[participant-notes]] — adjacent maintenance pattern

## See Also

- [[p3]]
- [[qa]]
- [[lm-dc]]
