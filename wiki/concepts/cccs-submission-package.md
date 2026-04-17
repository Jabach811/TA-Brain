---
title: "CCCS Submission Package"
type: concept
tags: [subpack, cccs, plan-setup, conversion, document]
created: 2026-04-16
updated: 2026-04-16
sources: 1
---

# CCCS Submission Package

The CCCS (Client Conversion Configuration Sheet) is Part 1 of the New Plan Submission Package — a standardized form completed once per plan at the start of a new conversion to capture all plan-level configuration decisions.

## Definition

The CCCS is the master configuration intake document for a new plan. It records the plan type, trustee structure, payroll setup, services included, conversion strategy, auto-enrollment settings, and all key contacts (executive, administrator, TPA, advisor). One CCCS is completed per plan before setup work begins. It is the primary reference for how the plan is configured.

## Why It Matters

The CCCS establishes the plan's parameters before any system setup occurs. Decisions captured here — such as payroll submission method (PSD vs. FTP), asset transfer strategy (plan level vs. participant directed vs. hybrid), and whether auto-increase is enabled — flow downstream into every subsequent step of the DC workflow. Errors or gaps in the CCCS can cause rework across multiple teams.

## Key Configuration Decisions Captured

| Section | Key Decision |
|---------|-------------|
| Plan Type | 401(k), 401(a), 403(b), 457(b), 457(f), NQDC, MEP/PEP, Taft-Hartley |
| Document Type | Volume Submitter vs. IDP (all 457(f) = IDP; TA does not draft) |
| Trustee | SSBT, Self-Trust, or Other (trust agreement required) |
| Payroll | In-house vs. vendor; PSD or FTP; ACH or Wire; frequency |
| Services | Enrollments, deferrals, allocations, beneficiary data |
| Conversion Strategy | Plan Level, Participant Directed, or Hybrid |
| Auto-Enrollment | Being added vs. existing; auto-increase (not for NQDC/457) |
| QDIA | Default fund; PX re-enrollment options |
| Loans | Online withdrawal types; takeover loan method |

## Notes on Specific Fields

- **System Effective Date**: Should generally be one month before the plan effective date.
- **Auto-Increase**: Must not be offered for NQDC or 457 plans.
- **457(f) Plans**: Always use IDP document type; Transamerica does not draft these documents.
- **Limited Access Period**: A start/end window configured in plan setup — not yet separately documented in this wiki.

## Evidence / Examples

Raw CCCS template is in `raw/new mds/Sub_Pack_Raw_CCCS.txt`. Full section breakdown is in [[sources/subpack-cccs]].

## Related Concepts

- [[subpack]] — the full submission package of which the CCCS is Part 1
- [[conversion-types]] — asset transfer strategy selected in the CCCS
- [[ftp-connection]] — payroll FTP setup decided at CCCS stage
- [[eligibility]] — services enabled in the CCCS drive eligibility rules
- [[deferrals]] — auto-enrollment settings in the CCCS affect deferral processing

## See Also
- [[subpack]]
- [[sources/subpack-cccs]]
- [[conversion-types]]
- [[ftp-connection]]
- [[eligibility]]
- [[eds]]
