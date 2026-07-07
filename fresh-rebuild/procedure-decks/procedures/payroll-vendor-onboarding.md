# Payroll Vendor Onboarding

Payroll vendor onboarding identifies vendor and client contacts, sets up FTP, walks the vendor through the TA template, validates test files, demos the process, and hands off at go-live whether testing is complete or not.

## Inputs
- Payroll vendor contact
- Client uploader contact
- TA payroll template
- FTP setup request
- Vendor test file
- Validation results

## Systems
- FTP
- EDS
- Payroll template
- OnePayroll
- NBI
- AWD

## Procedure Steps
1. Identify the payroll vendor contact and the client uploader who needs FTP credentials.
2. Send the vendor intro email and fire off the FTP setup request early.
3. Hold the kickoff meeting and walk through the TA payroll template field by field.
4. Have the vendor re-tool their output and return a test file.
5. Test the FTP connection independently from the file content.
6. Run the validation chain and send issues back to the vendor until the file is clean.
7. Demo the client-facing process and prepare for go-live.
8. At go-live, hand off to Fiduciary Services through the formal process if testing is not complete.

## Decisions
- Who owns vendor file generation?
- Who owns client upload access?
- Is FTP ready before test-file validation?
- Did the test file pass EDS and OnePayroll review?
- Is payroll testing complete by go-live?

## Outputs
- Vendor contact chain
- FTP access
- Validated payroll test file
- Client demo
- Go-live handoff package

## Watchouts
- FTP setup should start early because access delays are common.
- Testing the connection is separate from validating file content.
- Multiple payroll vendors need separate tracks.
- Auto-sweep is later and requires several good runs.
- DC still hands off at live even if payroll testing is incomplete.

## Closeout Checks
- Contacts confirmed
- FTP tested
- Template walkthrough complete
- Validation chain complete or handed off
- NBI updated
