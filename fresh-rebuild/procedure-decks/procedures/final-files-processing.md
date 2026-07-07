# Final Files Processing

Final files are the authoritative post-liquidation records. The DC confirms the source policy, posts participant balances by conversion type, then loads deferrals, eligibility, and YTD data in a strict order.

## Inputs
- Final files from the prior record keeper
- Client source-policy decision
- Prepared EDS layouts
- CIT balance file
- Conversion type
- Audit query set

## Systems
- EDS
- Informatica
- P3
- ROC
- AQT
- NBI

## Procedure Steps
1. Confirm whether final-file data, base-file data, or a hybrid source policy governs each load.
2. Build the participant-level CIT balance file by case, region, SSN, source, fund, and total.
3. Run the CIT balance workflow in test mode and correct mapping or layout errors before production.
4. Post balances using the correct conversion-type path: cash, mapping, or transfer in kind.
5. Load deferral elections before any eligibility action.
6. Enable and load eligibility only after deferrals are verified clean.
7. Load YTD contributions, compensation, and hours through separate EDS layouts.
8. Run verification queries, review EDS outputs, build the audit pack, and update NBI.

## Decisions
- Which data source did the client approve for each record type?
- Is this cash, mapping, or transfer in kind?
- Has the balance workflow passed test mode?
- Are deferrals verified before eligibility starts?
- Did verification prove counts, totals, and sources?

## Outputs
- Posted participant balances
- Loaded deferrals
- Enabled eligibility
- Loaded YTD data
- Audit pack evidence
- Updated NBI status

## Watchouts
- Do not run eligibility before deferrals.
- Wrong P3 processing mode can fire duplicate trades.
- Cash and mapping paths need dummy-participant cleanup.
- TIK needs fresh final-share estimates for Matt O'Connell's team.
- EDS layouts should be ready before final files arrive.

## Closeout Checks
- Balances posted
- Deferrals verified
- Eligibility enabled
- YTD loads complete
- Audit pack complete
- NBI updated
