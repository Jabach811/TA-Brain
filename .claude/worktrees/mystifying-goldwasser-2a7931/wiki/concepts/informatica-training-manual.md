---
title: "Informatica Training Manual"
type: concept
tags: [informatica, training, system]
created: 2026-04-16
updated: 2026-04-17
sources: 1
---

# Informatica Training Manual

The canonical training reference for the Informatica ETL environment used by DC during plan conversion.

## Definition

The Informatica Training Manual is a standalone training document (likely a OneNote notebook or SharePoint export) covering end-to-end use of the Informatica modules. The source file exists in the main dump (`Informatica Training Manual.md.txt`) as a title-only placeholder, indicating the original content lives elsewhere (probably a OneNote notebook, internal wiki, or training portal) and has not yet been exported in full.

## Why It Matters

Informatica is the ETL backbone for conversion data loads — participant balances, loans, allocations, and basis. A new DC cannot run a conversion without training on it. Until the full manual is ingested, the `[[informatica]]` hub page is the working substitute and documents every module DC currently uses.

## Evidence / Examples

The `[[informatica]]` hub page, assembled from the LMDC training notebook and brain dump, already covers what the manual would teach:

- Parameter file settings per module
- CONV file structure
- 11-step SQL audit used on Day of Wire
- NPER rounding logic in the Loan Module (effective April 2015)
- Allocation Module pre-run checks (withdrawal sequence must be numeric; no spaces in prior fund names)
- Source mapping SQL
- Connection setup (ODSP → DIVRDIVP switchover)

When the full training manual is ingested, this page will consolidate:
- Step-by-step new-session setup
- Navigation of the standalone Informatica desktop client
- Parameter walkthrough for each module
- Pre-run checklists and post-run audits
- Common mistakes and how to avoid them
- How to copy existing-workflow sessions

## Related Concepts

- [[informatica]] — hub page with current working documentation
- [[informatica-allocation-module]]
- [[informatica-balance-module]]
- [[informatica-loan-module]]
- [[informatica-basis-module]]
- [[informatica-troubleshooting-guide]]

## See Also
- [[informatica]]
- [[lmdc-training-notebook]]
- [[main-dump-batch-2026-04-17]]
