---
title: "Informatica Loan Module"
type: concept
tags: [informatica, loans, system]
created: 2026-04-16
updated: 2026-04-16
sources: 0
---

# Informatica Loan Module

Loads participant loan data (header and source balances) from the prior vendor into P3.

## Current Documentation

Content for this module is currently documented in the **Informatica hub page** under the Loan Module section:

> **[[informatica]] → Section 3: Loan Module**

Key points documented there:
- Targets: `PENSION.CONV_LOAN` (header) and `PENSION.CONV_LOAN_PRIN` (source balance)
- P3 prerequisites: loans must be set up on P3 before running (Plan tab → Conversions → add recordkeeper)
- Parameter file requires: prior vendor name (must match `censuslookupfile.xls` exactly), plan name, user ID, effective date
- **NPER rounding logic (effective April 2015):** decimal ≤ 0.10 → round down; 0.11–0.89 → round up if result × repayment > $10, else round down; > 0.89 → round up
- After module runs: check Loan Compare file (all differences must = 0), check Loan BEE detail for errors, then run Loan Load Job in P3

**Common error causes:**
- "Conversion number not found" → loans not set up on P3
- "Nper is null or zero" → loan frequency missing from censuslookupfile, or vendor name mismatch
- "SSN not found on system for plan" → census not yet loaded (OK if preliminary)
- "Source I does not exist on plan" → source mapping incomplete or bad data

## Full Documentation

When the functional documentation source is ingested, this page will be expanded with complete step-by-step workflow, full parameter file settings, and additional error recovery scenarios.

## See Also
- [[informatica]]
- [[informatica-training-manual]]
- [[informatica-balance-module]]
- [[informatica-troubleshooting-guide]]
- [[final-files-processing]]
