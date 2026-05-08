---
title: "Informatica Basis Module"
type: concept
tags: [informatica, basis, system]
created: 2026-04-16
updated: 2026-04-17
sources: 1
---

# Informatica Basis Module

Processes cost basis data for plan participants during conversion.

## Definition

The Basis Module is the Informatica workflow that loads participant-level cost basis information (after-tax and Roth basis tracking) from prior-vendor files into P3. The source file (`Using Informatica Basis Module.md.txt`) in the main dump is title-only — the full procedure exists elsewhere and has not yet been ingested. The `[[informatica]]` hub page references this module as one of Informatica's workflows but does not yet document it in detail.

## Why It Matters

Basis drives participant taxation: when a Roth or after-tax participant takes a distribution, the portion that's return-of-basis (non-taxable) depends on the loaded basis figures. Wrong basis means wrong 1099-R reporting.

## Related Load Path

Basis can also be loaded through `[[loading-basis-eds]]` (EDS) as an alternative to the Informatica module. Which path is used depends on how the prior vendor delivers the data and which format the DC is working with.

## Evidence / Examples

- Source: `Using Informatica Basis Module.md.txt` — title-only placeholder

When the full source is ingested, this page will expand to include parameter file settings, input file structure, step-by-step workflow, and post-run validation.

## Related Concepts

- [[informatica]] — hub
- [[loading-basis-eds]] — alternative load path via EDS
- [[informatica-balance-module]]
- [[final-files-processing]]

## See Also
- [[informatica]]
- [[loading-basis-eds]]
- [[main-dump-batch-2026-04-17]]
