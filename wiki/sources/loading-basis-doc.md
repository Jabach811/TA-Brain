---
title: "Source: Loading Basis through EDS Documentation"
type: source
tags: [eds, basis, process, data]
created: 2026-04-20
updated: 2026-04-20
sources: 1
status: current
---

# Source: Loading Basis through EDS Documentation

Structured documentation file covering basis data loading procedures, field definitions, tables, and special rules for plan conversions.

## Summary

Internal documentation describing the basis loading process through EDS. Covers EE basis purpose (hardship withdrawals, Roth tracking), required file fields, all basis field names, affected database tables, transaction types that do and do not adjust basis, and special rules (457 plans, cost basis, Roth timing, mid-year conversions).

## Key Claims

- EE Basis determines the amount available for hardship withdrawals
- Tracks after-tax and Roth contributions for special tax considerations upon withdrawal
- Loaded via EDS in P3 using the **Basis** data type
- Basis should be loaded as of the last plan year (12/31 of prior calendar year)
- For mid-year conversions: load basis to both current year and prior year basis sets
- Do not load basis for 457 plans
- Only load Cost Basis for stock funds and NQ plan re-registrations
- Roth did not start until 2006 — load Roth basis for all participants with Roth balances
- Only one takeover (T row) can exist per plan
- Hardship suspension dates: load only end or re-entry dates via SQL

## Key Quotes

- "EE Basis determines the amount available for hardship withdrawals."
- "Basis should be loaded as of the last plan year (typically 12/31 of prior calendar year)."
- "Do not load basis for 457 plans."
- "Even if hardship withdrawals are not allowed, load basis if provided."

## Entities Mentioned

- [[eds]] — file validation and loading system
- [[p3]] — main plan administration platform

## Concepts Mentioned

- [[loading-basis-eds]] — this source's primary concept
- [[final-files-processing]] — basis is loaded during the final files phase

## Contradictions / Open Questions

- `TO_BASIS.sql` query referenced but exact path not specified
- Hardship suspension date loading via SQL referenced but SQL not documented

## See Also

- [[loading-basis-eds]]
- [[processes/eligibility-loading|loading-eligibility-eds]]
- [[final-files-processing]]
- [[eds]]

