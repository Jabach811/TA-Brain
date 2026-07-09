---
title: "Eligibility Loading Through EDS"
type: data-loading
tags: [process, eligibility, eds, cit, loading]
created: 2026-04-16
updated: 2026-06-25
sources: 1
status: current
---

# Eligibility Loading Through EDS

How eligibility data for plan participants is loaded into [[p3]] using [[eds]] — replacing the legacy AQT path into `Part_Elig_src`.

## Overview

The EDS eligibility data type handles both eligible participants (direct insert) and non-eligible participants (routed through the nightly batch). It uses a fixed, pre-defined layout with automatic data elements. Sources can load independently — they do not need to arrive together.

This process is a subprocess of [[final-files-processing]] but also runs on its own whenever eligibility data needs to be refreshed.

## Trigger

Any of the following:
- Final files include eligibility data that needs to be posted.
- A client sends updated eligibility mid-plan.
- A previously errored load has been corrected and needs re-posting.

**Pre-requisite:** Participant enrollment data must already be loaded. Eligibility loading cannot proceed without it.

## Steps

### 1. Confirm Layout and File Type — DC
The eligibility layout is pre-defined and fixed — all data elements auto-included, none removable. Supported file types: flat file, comma-delimited, or Excel. Standard EDS formatting functions apply to SSNs and dates.

### 2. Prepare Normalized File — DC
Data must be normalized. **One row per participant per source.** Never combine multiple sources per row.

### 3. Validate Required Fields — DC
Per participant row:

| Field | Rules |
|-------|-------|
| SSN | With or without dashes |
| Source ID | Individual Source IDs, or `0` for "all sources" when eligibility rules match across sources. May mix `0` and specific IDs in one file — but not for the same participant |
| Eligibility Status | 0 (unknown), 1 (not eligible, kit needed), 2 (not eligible, no kit), 3 (eligible), 4 (excluded) |
| Eligibility Date | Optional. Valid with status 1/2/3. If provided, Plan Entry Date must also be provided |
| Plan Entry Date | Optional. Valid with status 1/2/3. If provided, Eligibility Date must also be provided |
| Kit Mail Date | Optional. Only if Eligibility Date and Plan Entry Date both included |
| Rehire Code | Y or N. Mixed values allowed in one file |

Use `N` for non-rehires or eligible participants. Use `Y` only when rehire logic is enabled, the participant is not eligible, and rehire events exist.

### 4. Choose Processing Type — DC
Replaces the standard Validate Only flag:

| Type | When to Use |
|------|-------------|
| **Validate** | Test data. Validates against plan rules without posting |
| **Validate/Commit** | Default for live data. Validates and posts |
| **Commit Only** | Small populations that previously errored and have been corrected. Posts with limited validation |

### 5. Decide When CIT Eligibility Job Runs — DC
At load time, tick the **Run Eligibility** checkbox to trigger the CIT Eligibility job immediately after the EDS load. If left unchecked, the job can be launched later from the Work Queue.

> EDS Eligibility and CIT Eligibility are functionally the same process but are separate jobs.

### 6. Submit the Load — DC
EDS validates that eligibility is enabled on the plan and that the specified Source IDs exist. Standard formatting edits (dates, SSNs) run first.

### 7. Wait for the Job Completion Email — DC
When the CIT Eligibility job completes, an automated email arrives with load details and links to the error/warning reports.

### 8. Review and Handle Warnings — DC
CIT Eligibility edits vary by processing type. Example: in Validate/Commit, if a provided date doesn't match plan-rule calculation, a warning is issued. In Commit Only mode, that same mismatch produces no warning.

Full edit list lives in the Functional Requirements document. Review every warning; re-submit corrections using Commit Only if appropriate.

## Handoff Points

| # | From → To | What Moves | Risk |
|---|-----------|------------|------|
| 1 | DC → EDS | Normalized eligibility file | Mixed `0` and specific Source IDs for same participant → EDS error |
| 2 | EDS → CIT Eligibility job | Validated load | If "Run Eligibility" not checked, job waits indefinitely until manually triggered |
| 3 | CIT Eligibility → DC inbox | Job completion email with error report links | Email ignored → silent data problems persist into go-live |

## Timing / Deadlines

- **Deferrals must load first.** See [[eligibility-and-deferrals]] — posting eligibility before deferrals breaks the enrollment logic.
- **Enrollment data loaded first.** Hard pre-requisite.
- **Balance posting loaded first.** Part of the final-files sequence — see [[final-files-processing]].

## Failure Modes

- **Missing enrollment data.** Load aborts; eligibility cannot attach to non-existent participants.
- **Eligibility Date without Plan Entry Date (or vice versa).** EDS rejects the row.
- **Mixed Source IDs per participant.** Using `0` and a specific Source ID on the same SSN causes an EDS error.
- **Wrong Rehire Code.** `Y` only applies when rehire logic is enabled, participant is not eligible, and rehire events exist. Otherwise use `N`.
- **Processing type mismatch.** Commit Only skips the rule-match check — use only for pre-validated corrections.
- **"Run Eligibility" not checked and never launched.** Data sits in the Work Queue; nobody notices until downstream breakage.

## See Also

- [[eds]]
- [[eligibility]]
- [[eligibility-and-deferrals]]
- [[final-files-processing]]
- [[loading-basis-eds]]
- [[loading-ytd-contributions-eds]]
- [[roles/lm-dc]]
