---
title: "ROC Tool"
type: entity
tags: [system, stored-procedures, ta-ui, roc]
created: 2026-04-17
updated: 2026-04-17
sources: 4
---

# ROC Tool

Interface for executing stored procedures against Transamerica plan administration databases. Accessed via the TA UI (Process Request Screen).

## Overview

The ROC Tool is the front-end for running stored procedures — the only sanctioned way for operations staff to make direct, controlled changes to the administration database. Where [[aqt]] is read-only, ROC executes packaged write operations. It is reachable from the [[p3]] menu bar.

Per the TA UI User Guide, each ROC action follows a four-step pattern:

1. **Input** on the Process Request Screen (PRS)
2. **Validation**
3. **Analysis**
4. **Execution** (with audit logging)

## Key Facts

- Accessed via the TA UI (see TA UI User Guide.md.txt)
- Process Request Screen is the input surface for each stored procedure
- Every execution is audit-logged
- Has session-state behavior (status states, navigation flow)
- Stored procedures are parameter-driven (case number, SSN, region, etc.)

## Stored Procedures Documented

| Stored Procedure | Purpose | Source |
|------------------|---------|--------|
| `ROC No Reversal` | Reverse [[dummy-participant]] records after mapping conversion | [[lm-dc]] workflow |
| `ROC_DUPLICATE_SSN_DISABLE` | Disable DDOL/VRU access for true duplicate SSNs (run in CORP and TDA) | Dup SSN Process – DISABLE |
| `ROC_DUPLICATE_SSN_ENABLE` | Restore DDOL/VRU access after resolution | Dup SSN Process – ENABLE |
| `ROC_REMOVING_LEGAL_HOLD` | Remove legal holds applied during disable step | Dup SSN Process – ENABLE |
| Welcome Kit confirm generation | Generate/release Welcome Kit confirms | Welcome Confirm Samples |

## Role in Operations

ROC is the controlled-write counterpart to read-only tools. When a DC needs to reverse a dummy participant, when [[prod-support]] needs to apply a legal hold, or when duplicate-SSN investigation requires disabling participant access, the action runs through ROC — not raw SQL.

## Connections

- [[p3]] — ROC is launched from the P3 menu bar
- [[aqt]] — read-only complement to ROC's write capability
- [[odsp]] — database region ROC operates against (for dup-SSN procedures)
- [[duplicate-ssn-cycle]] — the process most reliant on ROC
- [[dummy-participant]] — reversed via `ROC No Reversal`

## Open Questions

- Full inventory of ROC stored procedures available to DCs vs. [[prod-support]] only
- Audit log retention and review cadence
- Who can grant ROC access

## See Also

- [[p3]]
- [[aqt]]
- [[odsp]]
- [[duplicate-ssn-cycle]]
- [[dummy-participant]]
- [[prod-support]]
