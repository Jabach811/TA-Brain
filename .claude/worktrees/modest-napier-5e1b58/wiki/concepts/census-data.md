---
title: "Census Data"
type: concept
tags: [eds, census, process, data, conversion]
created: 2026-04-20
updated: 2026-04-20
sources: 1
---

# Census Data

Information gathering and loading of all active and terminated participants (within the last two years) into the system at the start of a plan conversion.

## Definition

Census data is the participant-level data set that seeds a new plan in P3. It includes all active employees and terminated employees with activity within the last two years. The DC receives this data from the client (or the prior record keeper in certain cases), validates it through EDS, and loads it using the **Address Standard** and **Enrollments** data types.

## Why It Matters

Without census data loaded, the system has no participants. Every subsequent step — eligibility, deferrals, payroll testing, go-live — depends on accurate participant records in P3. Errors in census data (wrong DOB, duplicate SSNs, mismatched hire/rehire dates) propagate through every downstream process.

## Data Fields

| Field | Notes |
|-------|-------|
| SSN | Primary key — duplicate SSNs must be reported to TC |
| First name | |
| Last name | |
| Date of birth | EDS warning if DOB differs from another plan; forward warning report to TC |
| Date of hire | Must not match Date of Rehire |
| Date of term | Only request if DOH and DOR do not both already exist without it |
| Date of rehire | Must differ from Date of Hire |
| Gender | |
| Marital status | |
| Payroll frequency | |
| Address information | Foreign addresses: forward to TC for handling and system updates |

## Process

1. Client provides **test files** and **live files**
2. Run all files through EDS using **Validate Only** — never skip this step
3. Review all errors and warnings in EDS output
4. Communicate issues to the client, COM, and TC depending on error type
5. Reconcile test files against live files when live is received — review participant count and class codes (new hires may appear in live that weren't in test)
6. Load using data types: **Address Standard** and **Enrollments**

## Audit and Edit Checks

- **One row per employee** — hard requirement
- Verify participant count in file matches count loaded into the system
- If loading class codes, ensure all participants have a class code in the system
- If loading divisions, ensure all participants have a division in the system
- Participants on another plan with a different DOB appear on EDS warning report — provide to TC
- **Date of Hire must not match Date of Rehire** — if they match, request original DOH from client
- Foreign addresses → TC
- Duplicate SSNs → report to TC

## Vendor Census Data

In some cases, vendor (prior RK) census data is used instead of client-provided data:

- Client explicitly requests vendor data
- A terminated participant has a balance coming over from the prior record keeper

When using vendor data:
1. Enroll participant using prior RK data
2. **Notify client, COM, and TC prior to loading**

## Queries

- `TO Census.sql` — referenced query for census verification (exact path in source documentation)

## Rules and Notes

- Client test files may be used to load employees into the system
- If DOH and DOR both exist with no Date of Term, do not request Date of Term
- Always reconcile test files against live files when live is received
- Specific error codes and resolutions not yet documented

## Related Concepts

- [[base-file]] — the census template DC sends to the client to collect this data
- [[loading-eligibility-eds]] — eligibility is loaded after census is in the system
- [[loading-basis-eds]] — basis loaded during final files processing
- [[prior-record-keeper]] — source of vendor census data when applicable
- [[eds]] — the system used to validate and load census data

## See Also

- [[base-file]]
- [[eds]]
- [[prior-record-keeper]]
- [[final-files-processing]]
- [[loading-eligibility-eds]]
- [[loading-basis-eds]]
