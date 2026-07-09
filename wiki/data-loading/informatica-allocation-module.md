---
title: "Informatica Allocation Module"
type: data-loading
tags: [informatica, allocation, system]
created: 2026-04-16
updated: 2026-07-08
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

## Elections File — Fields and Save Rules

From the balance import guide:

The elections input file has 5 fields and stays **comma-delimited (CSV)** — unlike the CONV (tab), CIT balance (fixed-width), and loan (pipe) files:

| Field | Rule |
|---|---|
| SSN | Participant identifier |
| Prior fund ID | Prior RK fund identifier for the election line |
| Prior source ID | Prior RK source identifier for the election line |
| Percent | **Whole number** — do not enter as a decimal unless the workflow layout specifically changes |
| Default | `N` for all entries |

Source handling can vary: the election can be copied across all sources or tied to a representative source depending on the workflow setup — confirm the current layout before loading.

## Reconcile the Election Population Explicitly

Never infer or assume the election population ties out. State it explicitly: "150 participants, 140 elections, 10 defaulted = 150." (from the balance import guide)

## Source Notes

Current content is derived from [[informatica]] and [[sources/lmdc-training-notebook]]. A dedicated module procedure is still needed before this can be marked current.

## Full Documentation

When a dedicated functional documentation source is ingested, this page will be expanded with complete parameter file settings, step-by-step workflow, error handling, and validation steps.

## See Also
- [[informatica]]
- Informatica Training Manual
- [[informatica-balance-module]]
- [[informatica-loan-module]]
- [[fund-mapping]]
- [[final-files-processing]]
