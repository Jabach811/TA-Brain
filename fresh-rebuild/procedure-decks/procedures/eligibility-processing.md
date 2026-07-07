# Eligibility Processing

Eligibility turns on P3 rule logic for who qualifies, when participants enter, and when auto-enrollment can trigger. It should only run after deferrals have filled the participant election state.

## Inputs
- Eligibility file
- Deferral verification evidence
- Client source-policy decision
- P3 eligibility rules
- Contributing source list
- Internal approval email

## Systems
- P3
- EDS
- AQT
- QA
- TC
- COM

## Procedure Steps
1. Prepare the eligibility file from the approved data source.
2. Confirm deferrals are loaded and verified before eligibility work starts.
3. Send the internal approval email to QA, TC, and COM.
4. Wait for the go-ahead before enabling eligibility.
5. In P3, navigate to Outsourcing Summary and the Eligibility enable screen.
6. Enable only sources that will receive contributions.
7. Load and process eligibility through EDS and the CIT Eligibility job.
8. Run queries and confirm eligibility results.

## Decisions
- Are deferrals verified clean?
- Did QA, TC, and COM give the go-ahead?
- Which sources actually receive contributions?
- Are class, service, and entry-date rules configured correctly?
- Do results match the expected eligible population?

## Outputs
- Enabled eligibility rules
- CIT Eligibility job result
- Verified eligible population
- Query evidence
- Exception list if needed

## Watchouts
- Eligibility triggers actions; it is not just a passive load.
- Do not enable non-contributing sources.
- Auto-enrollment can fire if no deferral is on file.
- Class-based rules need careful review.
- LTPT status requires hours discipline.

## Closeout Checks
- Deferrals checked
- Approval received
- Contributing sources enabled
- Job completion email reviewed
- Queries verified
