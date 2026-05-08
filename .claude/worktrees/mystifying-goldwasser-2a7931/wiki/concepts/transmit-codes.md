---
title: "Transmit Codes"
type: concept
tags: [concept, deferrals, payroll, transmit-codes, default-deferral]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Transmit Codes

The single-letter indicators attached to participant deferral rows that tell payroll how to transmit (or not transmit) the deferral this cycle.

## Definition

Transmit codes are the state flags on a [[deferrals]] record that govern payroll transmission. The three values in use:

- **A — Active** — transmit the deferral this cycle
- **T — Terminate** — stop transmitting; the deferral is ending
- **S — Stop** — suspend transmitting; temporary halt

These codes are referenced in the Default Deferral Analysis (see [[default-deferral-analysis]]) to distinguish active defaulted deferrals from those that have been terminated or suspended.

## Why It Matters

Transmit codes are the contract between P3's deferral state and the payroll system's cycle behavior. Wrong codes mean payroll transmits when it shouldn't (double contributions, compliance risk) or fails to transmit when it should (missed contributions, participant complaints).

## Related Concepts

- [[deferrals]] — parent concept
- [[deferral-term-to-zero]] — operation that flips rows to zero and often updates the transmit code
- [[default-deferral-analysis]] — audit that uses transmit codes to segment populations

## See Also

- [[p3]]
- [[lm-dc]]
