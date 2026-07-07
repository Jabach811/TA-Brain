---
title: "Source: Census Data Documentation"
type: source
tags: [eds, census, process, data]
created: 2026-04-20
updated: 2026-04-20
sources: 1
---

# Source: Census Data Documentation

Structured documentation file covering census data loading procedures, audit checks, and error handling for plan conversions.

## Summary

Internal documentation describing the census data loading process. Covers participant data fields, EDS loading procedure (Address Standard and Enrollments data types), audit/edit checks, vendor data rules, and date-handling edge cases.

## Key Claims

- Census data includes both active and terminated participants within the last two years
- Data loaded via EDS in P3 using the **Address Standard** and **Enrollments** data types
- Always run Validate Only first; communicate errors to client, COM (TM), and TC
- One row per employee is a hard requirement
- Client provides both test files and live files; reconcile test against live when live is received
- Vendor (prior RK) census data is allowed in specific circumstances: client request, or terminated participant with incoming balance
- If DOH and DOR both exist with no Date of Term, do not request Date of Term
- Date of Hire must not match Date of Rehire — if they match, request original DOH from client

## Key Quotes

- "Vendor census data may be used when: Client requests vendor data, or a terminated participant has a balance coming over from the PRK"
- "Enroll participant using PRK data. Notify client, TM, and TC prior to loading."

## Entities Mentioned

- [[eds]] — file validation and loading system
- [[p3]] — main plan administration platform

## Concepts Mentioned

- [[census-data]] — this source's primary concept
- [[base-file]] — the census template DC gives to the client to collect this data
- [[prior-record-keeper]] — source of vendor census data in applicable cases

## Contradictions / Open Questions

- "Errors / Resolutions" section marked as unclear in source — specific error codes and resolutions not documented
- `TO Census.sql` query referenced but path not specified

## See Also

- [[census-data]]
- [[loading-eligibility-eds]]
- [[base-file]]
- [[eds]]
