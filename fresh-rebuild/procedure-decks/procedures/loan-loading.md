# Loan Loading

Loan loading starts in P3 with vendor/conversion setup, moves through Informatica test and production runs using loan header and loan source files, and ends with P3 takeover, HOLB handling, email confirmation, and query verification.

## Inputs
- Vendor name
- Case number
- Effective date
- Loan header file
- Loan source file
- Loan workflow parameter file
- HOLB file if available

## Systems
- P3
- Informatica loans workflow
- HOLB process
- AQT verification queries
- Audit pack

## Procedure Steps
1. In P3, open the plan, choose Conversions, add record keeper, enter vendor name, apply, and save.
2. Create a new conversion with the case number, no affiliate, conversion date and assigned date three months before effective date, and effective date.
3. Save and capture the generated conversion number.
4. Validate loan header and loan source: outstanding balance in header must match source breakout.
5. Run the Informatica loans workflow in test mode, then flip test to N and run production if clean.
6. In P3, find the existing conversion, take over loans, handle HOLB upload/create, wait for email confirmation, and run verification queries.

## Decisions
- Did P3 generate the conversion number?
- Do loan header and loan source balances match?
- Did the test run clear without errors?
- Is there an HOLB file or should P3 create one?

## Outputs
- P3 conversion number
- Loaded loan records
- HOLB upload/create confirmation
- Email confirmation
- Loan audit evidence

## Watchouts
- Conversion and assigned dates are largely irrelevant but required; use three months prior to effective date.
- Header/source balance mismatch must be fixed before loading.
- Do not skip the test run before production.
- The audit pack needs loan evidence, often close to the loan header detail.

## Closeout Checks
- Conversion number captured
- Test and production clean
- Loans taken over
- HOLB handled
- Queries verified
