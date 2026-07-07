# Deferral Processing

Deferrals fill the system state. They capture participant elections, auto-enrollment status, and auto-enrollment start dates so eligibility does not trigger the wrong default actions later.

## Inputs
- Client deferral data
- Vendor election data
- Payroll election data when needed
- Auto-enrollment start dates
- Plan escalation rules
- EDS deferral layout

## Systems
- EDS
- P3
- AQT
- Client payroll system

## Procedure Steps
1. Confirm which data source the client chose for deferral elections.
2. Identify participants enrolled under auto-enrollment defaults.
3. Capture each participant's deferral rate and auto-enrollment start date.
4. If ADP or another source cannot provide start dates, request them directly from the client.
5. If start dates still cannot be provided, use the conservative assumption and notify the client of impacted participants.
6. Load deferrals through EDS and review all warning and error outputs.
7. Post to P3 and verify elections before eligibility begins.
8. Proceed to eligibility only after deferrals and auto-enroll data are clean.

## Decisions
- Did the client choose vendor, client, payroll, or hybrid data?
- Which participants are auto-enrollment defaults?
- Are auto-enrollment start dates present and reliable?
- Is the prior record keeper ADP or another weak source for dates?
- Are all elections verified before eligibility runs?

## Outputs
- Loaded deferral elections
- Auto-enroll participant list
- Client notice list for missing date risk
- EDS output review
- P3 verification evidence

## Watchouts
- Eligibility before deferrals can cause auto-enrollment to overwrite elections.
- ADP does not reliably provide auto-enrollment dates.
- Missing start dates can break escalation logic.
- Wrong elections may not surface until payroll starts.
- Deferral cleanup is usually harder than eligibility cleanup.

## Closeout Checks
- Source policy confirmed
- Auto-enroll population identified
- Start-date gaps handled
- EDS warnings reviewed
- P3 elections verified
