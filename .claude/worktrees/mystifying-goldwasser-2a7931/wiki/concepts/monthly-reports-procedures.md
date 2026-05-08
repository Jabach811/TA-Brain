---
title: "Monthly Reports Procedures"
type: concept
tags: [concept, qa, reporting, nbi, csr]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Monthly Reports Procedures

The QA procedure for producing the recurring monthly reports — PRS, CSR Stats, and CCC Plan — from NBI with standard data-cleanup and VLOOKUP steps.

## Definition

Monthly Reports Procedures is a [[qa]]-owned recurring reporting routine. The standard flow is to generate [[nbi]] reports, clean and normalize the data, apply VLOOKUPs and date validation, and save/distribute the output to stakeholders (source: `Monthly Reports Procedures 9-22-23.md.txt`).

## Why It Matters

These reports are not produced during conversions — they are the steady-state visibility layer for the conversion operation: how many conversions are in flight (PRS), how the CSR pipeline looks (CSR Stats), and plan-level CCC metrics. Management and downstream teams depend on them; their timeliness and accuracy are a QA deliverable.

## Evidence / Examples

**Reports covered** (source: `Monthly Reports Procedures 9-22-23.md.txt`):

- **PRS Report** — conversion pipeline metrics
- **CSR Stats Report** — [[csr]] production and distribution statistics
- **CCC Plan Report** — CCC plan-level reporting

**Common steps:**

- Generate [[nbi]] reports
- Clean and normalize data
- Apply VLOOKUPs and date validation
- Save and distribute to stakeholders

## Counterarguments

The reliance on manual VLOOKUPs and data cleanup means these reports are sensitive to input quirks and operator consistency. The procedure is necessary because the source systems don't produce the final shape the stakeholders want; automation would reduce variance.

## Related Concepts

- [[nbi]]
- [[csr]]

## See Also

- [[qa]]
- [[com]]
- [[tc]]
