---
title: "FAA for Balances"
type: concept
tags: [concept, audit, qa, faa, balances, informatica]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# FAA for Balances

The Final Audit Analyzer run that compares loaded participant balances — by fund and by source — against prior-vendor balance data.

## Definition

FAA for Balances is a [[qa]]-owned record-load audit executed through [[informatica]] (the Balance module). It compares participant-level balances by fund and source against the prior vendor's balance file, using the approved [[fund-mapping]] and [[source-mapping]] as the translation layer (source: `FAA for Balances.md.txt`).

## Why It Matters

Plan-level wire totals reconciling (via the [[day-after-wire-audit]]) does not guarantee that every participant has the right dollars in the right fund and the right source. FAA for Balances is the participant-level check that catches mismappings, rounding issues, and fund-split allocation errors that plan-level totals hide.

## Evidence / Examples

Inputs to the audit (source: `FAA for Balances.md.txt`):

- [[fund-mapping]]
- [[source-mapping]]
- Prior vendor balance file

Notes from the procedure: fund splits may generate expected errors. Those are resolved via the [[fund-split-worksheet]] rather than being chased as true discrepancies.

The Balance module of [[informatica]] ([[informatica-balance-module]]) is the operational platform — parameter files, the balance module, and error/exception outputs are the main artifacts.

## Counterarguments

FAA for Balances depends entirely on the quality of the prior-vendor balance file. Poor-quality vendor data produces noisy exception reports that QA must triage manually; this is not a failure of the audit but a limit of it.

## Related Concepts

- [[faa-allocations]]
- [[informatica]]
- [[informatica-balance-module]]
- [[fund-mapping]]
- [[source-mapping]]
- [[fund-split-worksheet]]
- [[day-after-wire-audit]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[cit-takeover-audit]]
- [[final-takeover-audit]]
