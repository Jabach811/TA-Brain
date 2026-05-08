---
title: "FAA for Allocations"
type: concept
tags: [concept, audit, qa, faa, allocations, informatica]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# FAA for Allocations

The Final Audit Analyzer run that compares participant investment elections to prior-vendor allocation data.

## Definition

FAA for Allocations is a [[qa]]-owned record-load audit executed through [[informatica]] (the Allocation module). It compares participant-level investment elections to the prior-vendor allocation file and produces exception reports for discrepancies (sources: `FAA for Allocations.md.txt`, `FAA Allocation Procedures.md.txt`).

## Why It Matters

Election mismaps are silent: participants see a working account but with investment splits that do not reflect what they actually elected with the prior vendor. FAA for Allocations catches those before the client, or the participant, does.

## Evidence / Examples

Inputs (source: `FAA for Allocations.md.txt`):

- Census data
- [[fund-mapping]]
- Prior vendor allocation file

Operationally (source: `FAA Allocation Procedures.md.txt`):

- **Parameter file setup** — defines the run
- **Allocation and FAA modules** — the [[informatica-allocation-module]] is the platform
- **Error reports and default analysis outputs** — feed the [[default-allocation-analysis]]

The audit sits upstream of [[default-allocation-analysis]]: participants flagged as being on default allocations need different handling than participants with custom elections, and FAA output makes that distinction visible.

## Counterarguments

FAA for Allocations requires the [[fund-mapping-audit]] to have passed. A bad mapping will mechanically translate every prior-vendor election into the wrong TA fund, producing zero exceptions — a clean run on a bad mapping is worse than a messy run on a good one.

## Related Concepts

- [[faa-balances]]
- [[informatica]]
- [[informatica-allocation-module]]
- [[fund-mapping]]
- [[default-allocation-analysis]]
- [[fund-mapping-audit]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[cit-takeover-audit]]
- [[final-takeover-audit]]
