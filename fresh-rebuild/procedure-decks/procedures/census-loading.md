# Census Loading

Census data usually comes from the plan-specific base file, sometimes from a limited access file, the client, or the vendor. The load is successful only when mandatory fields, data types, default elections, warning reports, and missing participant exceptions are all accounted for.

## Inputs
- Completed PRD or onboarding package
- Testing results from AWD
- Plan-specific base file
- Limited access file when open period applies
- Client or vendor missing participant details
- Forfeiture entries from balance files when present

## Systems
- EDS
- AQT
- AWD
- Base file template
- Payroll template

## Procedure Steps
1. Confirm the source of census data: base file, limited access file, client file, or vendor file.
2. Use AWD testing results to tailor the base and payroll templates for the plan.
3. Meet with the client contact and walk through exactly how the file should be filled out.
4. Validate returned data for mandatory fields, data types, term reason code needs, and column placement.
5. Add forfeiture participants when balance files include them, preserving vendor naming and using standout DOB/DOH conventions.
6. Load the census through EDS and read every warning and error output.
7. Use AQT and EDS output files to verify who loaded, who failed, and what needs client follow-up.

## Decisions
- Is this a limited access or cash conversion plan?
- Are elections being defaulted during the census load?
- Are extra participants present on balance files but absent from census?
- Do warning reports indicate fixable data issues or true rejects?

## Outputs
- Loaded participant census
- Warning and error report notes
- Client follow-up list
- Verified population count

## Watchouts
- Most census files come from the base file, not the vendor.
- Do not ignore EDS output files; they are the import story.
- Extra participants from balance files should be reviewed with the client when possible.
- Forfeiture participants should stand out; use 12/25/1955 as date of birth and 12/25/1985 as date of hire.
- Favorite EDS output folders while imports are active so email reports surface quickly.

## Closeout Checks
- Population count reconciled
- Warnings reviewed
- Errors cleared or documented
- Client follow-ups sent
