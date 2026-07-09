---
title: "Census Data"
type: data-loading
tags: [eds, census, process, data, conversion]
created: 2026-04-20
updated: 2026-05-03
sources: 2
status: current
---

# Census Data

Information gathering and loading of all active and terminated participants (within the last two years) into the system at the start of a plan conversion.

## Definition

Census data is the participant-level data set that seeds a new plan in P3. It includes all active employees and terminated employees with activity within the last two years. The DC receives this data from the client (or the prior record keeper in certain cases), validates it through EDS, and loads it using the **Address Standard** and **Enrollments** data types.

## Why It Matters

Without census data loaded, the system has no participants. Every subsequent step — eligibility, deferrals, payroll testing, go-live — depends on accurate participant records in P3. Errors in census data (wrong DOB, duplicate SSNs, mismatched hire/rehire dates) propagate through every downstream process.

## Three Input Paths

Census data reaches the DC through one of three paths:

| Path | Frequency | Notes |
|------|-----------|-------|
| **Base file** (from client) | Vast majority | Standard TA template; client fills it out and returns. See [[base-file]]. |
| **Limited access file** (from client) | Cash conversions with an open period before blackout | Lets participants update allocations themselves before liquidation. See [[limited-access-file]]. |
| **Vendor census** (from prior RK) | Rare | Used when the client requests it, or when a termed participant has an incoming balance. Notify client, COM, TC before loading. |

## Pre-Base-File Chain

Before the base file can be finalized, a chain of upstream work has to complete:

1. **PRD or onboarding package complete** — plan provisions locked. See [[prd]] / [[onboarding-package]].
2. **AWD testing** — the package goes to [[awd]] for testing; results come back in a couple of days. AWD returns term reason codes (if applicable) and verification of testing/eligibility.
3. **Tailor templates** — DC takes the standard base + payroll templates and tailors them to this plan's specific provisions and sources.
4. **Client walkthrough meeting** — once the client contact is identified, schedule a meeting to walk through how to fill out the file. This step matters more than it looks; some clients are not text/data-savvy and need significant hand-holding. Give them ~10 days from the meeting.
5. **Validation and load** — file returns, validate through EDS, load.

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

## Adding Participants from Balance Files

Sometimes the balance file contains participants the client never put on the census. When that happens:

- Reach out to the **client** to get the demographic details, even if the vendor file already has them
- Vendor records can be stale — never assume they're current
- Don't load until the client confirms; missing or wrong census data on a participant who has a balance is a clean-up nightmare later

This is also the moment to handle [[forfeiture-loading|forfeiture entries]] that show up in balance files — those get loaded as census-shaped records using the dummy date convention.

## Queries

- `TO Census.sql` — referenced query for census verification (exact path in source documentation)

## Rules and Notes

- Client test files may be used to load employees into the system
- If DOH and DOR both exist with no Date of Term, do not request Date of Term
- Always reconcile test files against live files when live is received
- Specific error codes and resolutions not yet documented

## Related Concepts

- [[base-file]] — the census template DC sends to the client to collect this data
- [[processes/eligibility-loading|loading-eligibility-eds]] — eligibility is loaded after census is in the system
- [[loading-basis-eds]] — basis loaded during final files processing
- [[prior-record-keeper]] — source of vendor census data when applicable
- [[eds]] — the system used to validate and load census data

## See Also

- [[base-file]]
- [[limited-access-file]]
- [[defaulting-elections-eds]]
- [[forfeiture-loading]]
- [[eds]]
- [[awd]]
- [[prior-record-keeper]]
- [[final-files-processing]]
- [[processes/eligibility-loading|loading-eligibility-eds]]
- [[loading-basis-eds]]

