---
title: "File Naming Conventions"
type: reference
tags: [reference, file-naming, payroll, eds, conventions]
created: 2026-07-08
updated: 2026-07-08
sources: 4
status: active
---

# File Naming Conventions

The naming and identifier conventions used across DC file exchanges — payroll files, Financial Guide uploads, and the stand-out conventions inside data files.

## Payroll Vendor Files

Format: `<case#>_<contract>_<affiliate>.xls` (brain dump 002).

A received timestamp is appended when the file actually arrives, so there is never a duplicate. In the DC's words: "All the files have the case number underscore contract underscore affiliate. And then dot XLS or whatever. Time stamp comes in once the files actually do arrive, so there's never a duplicate." (brain dump 002)

## Financial Guide Mass Subscription

Mass subscription uses a `mass_sub_` prefixed file uploaded to Platform File Service (training notebook). The Consistency/Sweep Batch job runs hourly on business days to pick up participants with successful subscriptions but pending TPA allocations.

## EDS Files

- One EDS layout exists per data type — layouts are not combined (extra questions).
- **Specific EDS file naming rules (how the files themselves must be named) are not documented in the sources.** If a naming rule exists, it needs to be captured.

## Transfer Reference Numbers

Not a file name, but a related identifier convention: trans ref numbers are **YYYYMMDD + 7-8 random alphanumeric characters** (extra questions).

## Stand-Out Conventions Inside Files

- **Forfeiture entries** in balance files use the vendor's name convention — often year-based — plus the stand-out date convention: DOB **12/25/1955**, DOH **12/25/1985** (balances/census/loans dump).
- **Dummy participant** uses SSN **999-00-0000**; one per plan, mapping conversions only (balances/census/loans dump; extra questions).
- The point of the stand-out dates: "Anytime you ever see one of those, it's just an extra way of making sure that these people stand out and are not treated as normal." (balances/census/loans dump)

## See Also

- [[payroll-template]]
- [[eds]]
- [[balance-import]]
- [[source-mapping]]
- [[loan-setup]]
