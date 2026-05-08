---
title: "Informatica Balance Module"
type: concept
tags: [informatica, balance, system]
created: 2026-04-16
updated: 2026-04-16
sources: 0
---

# Informatica Balance Module

Posts individual participant balances from final files into the plan in P3.

## Current Documentation

Content for this module is currently documented in the **Informatica hub page** under the Participant Balance Workflow section:

> **[[informatica]] → Section 2: Participant Balance Workflow (CIT Balance / `mp_part_balance`)**

Key points documented there:
- Input: CIT balance file built by DC from final files (participant-specific; one row per participant per source per fund)
- **Can be tested** — run a test pass before production
- Parameter file test modes: `P` (preliminary — SSNs not yet on system), `Y` (test — SSNs on system), `N` (live)
- Fund and source maps saved as text tab-delimited; keep leading zeros; case sensitive
- After running: DC reviews P3, then reverses dummy participant if applicable (mapping conversions)
- Loan funds in prior vendor balances must be filtered out; load loan data via the Loan Module instead
- FMC must be updated with FMC Estimate output by 4:00 PM (or 2:00 PM for Vanguard funds — see [[rich-lippoth]])

## Full Documentation

When the functional documentation source is ingested, this page will be expanded with complete parameter file settings, error handling, and post-run validation steps.

## See Also
- [[informatica]]
- [[informatica-training-manual]]
- [[informatica-allocation-module]]
- [[informatica-loan-module]]
- [[final-files-processing]]
- [[fund-management-calendar]]
- [[rich-lippoth]]
