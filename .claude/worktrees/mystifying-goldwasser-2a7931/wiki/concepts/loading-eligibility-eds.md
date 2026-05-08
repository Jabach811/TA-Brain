---
title: "Loading Eligibility through EDS"
type: concept
tags: [eds, eligibility, process, system]
created: 2026-04-16
updated: 2026-04-16
sources: 1
---

# Loading Eligibility through EDS

How to load eligibility data for plan participants using EDS — including layout requirements, data elements, processing types, and post-load job behavior.

## Definition

The EDS eligibility data type replaces the legacy AQT process for inserting data into `Part_Elig_src`. It handles both eligible participants (direct insert) and non-eligible participants (routed through the nightly batch). Sources can be set up and loaded independently — they do not need to be loaded simultaneously. Participant enrollment data must already be loaded before eligibility loading can proceed.

## EDS Layout

Eligibility uses a **pre-defined / fixed layout**. When the eligibility data type is selected, all data elements are automatically included and cannot be removed. Standard EDS formatting functions apply to SSNs and dates. Supported file types include flat file, comma-delimited, and Excel.

## Loading Format

Data is always normalized. **One row per participant per source** is required.

## Required Data Elements

### Social Security Number
May be provided with or without dashes.

### Source ID
Load individual Source IDs, or use `0` for all sources when eligibility rules are the same across all sources. A single file may contain both `0` and specific Source IDs — but not for the same participant. Mixing `0` and specific Source IDs for the same participant will cause an EDS error.

### Eligibility Status

| Value | Description |
|-------|-------------|
| 0 | Status unknown — calculate based on plan rules |
| 1 | Not eligible; kit needs to be mailed |
| 2 | Not eligible; no kit needed or kit service not active |
| 3 | Eligible |
| 4 | Excluded |

### Eligibility Date
Date the participant was or will become eligible. Valid with status codes 1, 2, and 3. May be included or omitted.

### Plan Entry Date
Date the participant entered or will enter the plan. Valid with status codes 1, 2, and 3.

> **Important:** If either Eligibility Date or Plan Entry Date is provided, **both must be provided**. Supplying only one will cause an error.

### Kit Mail Date
Optional. If provided, both Eligibility Date and Plan Entry Date must also be included.

### Rehire Code
Indicates whether rehire logic should be applied. Values: `Y` or `N`. A file may mix both values.
- Use `N` for non-rehires or eligible participants (status code 3).
- Use `Y` only when rehire logic is enabled, the participant is not eligible, and rehire events exist.

*Note: As of the September 2013 release, rehire logic was not yet available.*

## Eligibility Processing Types

The standard **Validate Only** option is replaced in eligibility loading with **Eligibility Processing Type**:

| Type | Description |
|------|-------------|
| Validate | Validates data against plan rules without posting. Use for test data. |
| Validate/Commit | Validates and posts data. Default for live data. |
| Commit Only | Posts with limited validation. Use for small populations that previously errored and have been corrected. |

## Run Eligibility

A **Run Eligibility** checkbox is available at load time. When selected, the CIT Eligibility job triggers immediately after the EDS load completes. If not selected, the job can be run later from the Work Queue by selecting the file and enabling **Run Eligibility**.

EDS Eligibility and CIT Eligibility are functionally the same process but are separate jobs.

## Edits and Validation

Edits and warnings exist in EDS, CIT Eligibility, or both. Standard EDS formatting edits apply (dates, SSNs). EDS validates that eligibility is enabled on the plan and that the specified Source IDs exist.

CIT Eligibility edits vary by processing type. Example: in Validate/Commit mode, if an eligible participant's provided date does not match plan rule calculations, a warning is issued. In Commit Only mode, no warning is issued for the same condition.

Full edit details are in the Functional Requirements document.

## Job Completion Email

An email is sent when the CIT Eligibility job completes. It includes load details and links to reports listing all errors and warnings.

## See Also
- [[eds]]
- [[eligibility]]
- [[loading-basis-eds]]
- [[loading-ytd-contributions-eds]]
- [[eligibility-and-deferrals]]
