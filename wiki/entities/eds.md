---
title: "EDS"
type: entity
tags: [system, file-processing, validation]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# EDS

File validation and processing system used to test and run data file uploads (payroll, balance, census, etc.) before and during conversions.

## Overview

EDS sits between the raw files coming from clients/vendors and [[p3]]. DCs use EDS to validate file layouts, catch errors and warnings, and process files into the system. It is the primary tool for ingesting all structured data files.

## Full Name

**Electronic Data System**

## Access

Open [[p3]] → select EDS from the **P3 menu bar**. It is not a separate application — it is accessed directly through P3.

## Key Functions

- **File layout configuration** — DC sets up the column/field layout for each plan's files before testing begins
- **File validation** — runs uploaded files against the configured layout, produces output with warnings and errors
- **File processing** — runs validated files through to post data into P3

## Layout Setup

Before any file (payroll test, base file, balance file) can be tested through EDS, the DC must set up the layout in EDS via the **P3 to EDS** module. This must be done ahead of receiving test files — do not wait until files arrive.

> All layouts you'll need can be set up well in advance. Do it early.

## Output — Warnings and Errors

Every EDS run produces output emails and/or logs. These **must be read carefully**:
- **Errors** — records that failed to process; require fix and resubmit
- **Warnings** — records that processed but had issues; may or may not require action

> "Very, very, very important to check those out." Reading EDS output is non-negotiable.

## Payroll File Testing Flow

1. DC sets up payroll layout in EDS
2. DC receives test file from payroll vendor
3. DC validates file in EDS — reviews output
4. If issues: feedback to vendor → new test file → repeat
5. Once clean: DC sends file to [[internal-teams|Payroll Support Team]] for deeper validation
6. Payroll Support runs in live-equivalent environment, catches different errors
7. Green light from Payroll Support → payroll setup complete

## Limitations

- EDS provides internal validation only; Payroll Support's validation is a deeper, production-equivalent run
- Not used for the Day of Wire Informatica workflow (that uses [[informatica]] directly)

## Accepted File Formats

EDS accepts **all formats** — CSV, Excel, fixed-width. No format restrictions.

## Multiple Layouts Per Plan

Yes — **many layouts can be set up per plan simultaneously**. Each data type (balance, YTD, deferrals, eligibility, payroll, census) gets its own layout. Set them all up early.

## See Also

- [[p3]]
- [[informatica]]
- [[payroll-template]]
- [[base-file]]
- [[final-files-processing]]
- [[internal-teams]]
