---
title: "DC Brain Dump 001 — Full Job Workflow"
type: source
tags: [dc, workflow, retirement-plans, onboarding, conversion]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# DC Brain Dump 001 — Full Job Workflow

Voice transcript brain dump covering the complete end-to-end workflow of a Data Consultant (DC) at TransAmerica, from new plan assignment through final files posting.

## Summary

A DC handles all data-related work for onboarding new retirement plans. The workflow spans from initial assignment through liquidation day and final files posting. Three conversion types — cash, mapping, and transfer in kind — each have distinct processing paths. The DC coordinates with multiple internal teams and external vendors throughout.

## Key Claims

- DCs receive plan assignments via NBI, doled out by managers based on caseload and conversion type.
- P3 system setup can happen before or after assignment; earlier is better for specs and details.
- COMs (communications coordinators) manage project timelines and meetings; DCs attend external calls only when data topics are explicitly on the agenda.
- PRDs or Onboarding Packages detail all plan provisions; DCs focus on eligibility, vesting, sources, and special strategies.
- Sub-packs (submission packages) define exactly what TransAmerica will do; supposed to be completed by COMs but are inconsistently done.
- Base files seed the system with participant census data; only include people with balances plus imminent eligibles.
- Payroll templates mirror the base file census section (~75%) plus contribution/payroll details.
- FTP connections for payroll vendors must be requested early due to FTP team's large caseload.
- Prior record keeper contact is established early; questionnaire covers liquidity, TIK, and test file timelines.
- TOA (Transfer of Assets) is the client-signed fund map; column T (re-registering Y/N) determines if TIK applies.
- Fund mapping can be done as soon as TOA is available — no test files needed.
- Source mapping requires test files to identify which sources actually have money.
- Matt O'Connell's team sets up Fidelity accounts for TIK; takes ~10 business days; do NOT start too early (they begin reporting immediately).
- Day-of-wire Informatica workflow cannot be tested; participant balance workflow can be tested.
- Dummy participant (SSN 999-00-00) must exist in census before running day-of-wire for mapping plans.
- Deferrals must be posted before eligibility to prevent auto-enrollment conflicts.
- Eligibility requires internal notification to QA/TC/COM before enabling in P3.
- EDS outputs (warnings/errors) must be carefully reviewed after every file upload.

## Key Quotes

> "A single ingest may touch 10–20 wiki pages. That is expected and correct." *(from schema)*

> "We don't want to blow out the system with too many unnecessary people."

> "Too early is bad. As crazy as it sounds in this case here." *(re: Matt O'Connell's team timing)*

> "We can't test [day of wire], unfortunately. Not yet at least."

> "Deferrals first, then eligibility."

## Entities Mentioned

- [[ellen-miller]] — manages plan assignment from NBI side
- [[matt-oconnell]] — leads TIK/re-registration Fidelity account setup
- [[p3]] — main plan administration system
- [[eds]] — file validation and processing system
- [[informatica]] — ETL workflow tool
- [[nbi]] — plan assignment tracking system
- [[internal-teams]] — DC, COM, Doc Ops, QA, TC, Cashiering, FTP Team, Payroll Support

## Concepts Mentioned

- [[dc-onboarding-workflow]] — full end-to-end process
- [[conversion-types]] — cash, mapping, transfer in kind
- [[prd]] — Plan Review Document
- [[onboarding-package]] — alternative to PRD (PEP plans etc.)
- [[subpack]] — Submission Package
- [[toa]] — Transfer of Assets
- [[base-file]] — census seeding template
- [[payroll-template]] — payroll file format
- [[fund-mapping]] — mapping prior funds to TA funds
- [[source-mapping]] — mapping prior sources to TA source IDs
- [[transfer-in-kind]] — re-registration process
- [[liquidation-day]] — the main event
- [[final-files-processing]] — post-liquidation balance/data posting
- [[eligibility-and-deferrals]] — enabling plan eligibility in P3
- [[wire-instructions]] — sent to prior record keeper
- [[ftp-connection]] — payroll vendor upload setup
- [[prior-record-keeper]] — prior vendor coordination
- [[dummy-participant]] — SSN 999-00-00, required for mapping conversions
- [[plan-classes]] — class types and DC's limited role in managing them

## Contradictions / Open Questions

- Sub-pack completion is inconsistent — supposed to be COMs' responsibility but frequently not done. Unclear what current process is.
- Wire instructions: using default P3 account vs. plan-specific account — money arrives either way but routes differently. Low severity but worth clarifying.
- Whether DC/TIK dummy participant reversal logic applies the same way as mapping — needs clarification.
- EDS layout setup timing — needs to be done before test files arrive but exact trigger is unclear.

## See Also
- [[dc-onboarding-workflow]]
- [[conversion-types]]
- [[liquidation-day]]
