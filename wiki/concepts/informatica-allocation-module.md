---
title: "Informatica Allocation Module"
type: process
tags: [informatica, allocation, system]
created: 2026-04-16
updated: 2026-06-25
sources: 1
status: needs-review
---

# Informatica Allocation Module

Maps prior fund allocations to TA funds for participant investment elections during conversion.

## Current Documentation

Content for this module is currently documented in the **Informatica hub page** under the Allocation Module section:

> **[[informatica]] → Section 4: Allocation Module (`wf_mp_CIT_Elections_Module`)**

Key points documented there:
- Maps prior fund allocations to TA funds for participant investment elections
- Pre-run check: withdrawal sequence in fund map must be a number (not blank or text) — rows with non-number sequences are thrown out
- Pre-run check: spaces on prior fund names cause errors with fund splits

## Source Notes

Current content is derived from [[informatica]] and [[sources/lmdc-training-notebook]]. A dedicated module procedure is still needed before this can be marked current.

## Full Documentation

When a dedicated functional documentation source is ingested, this page will be expanded with complete parameter file settings, step-by-step workflow, error handling, and validation steps.

## See Also
- [[informatica]]
- [[informatica-training-manual]]
- [[informatica-balance-module]]
- [[informatica-loan-module]]
- [[fund-mapping]]
- [[final-files-processing]]
