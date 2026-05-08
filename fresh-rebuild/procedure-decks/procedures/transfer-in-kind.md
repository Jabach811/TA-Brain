# Transfer In Kind

TIK workflows reuse parts of the mapping structure but mark re-registered funds differently. Shares are accepted into Fidelity accounts set up by Matt O'Connell's team, then final files complete participant-level detail without trades going out.

## Inputs
- TOA TIK indicator
- Share detail spreadsheet
- Matt O'Connell confirmation
- Vendor share instructions
- Final share amounts
- CONV file with TIK flag Y

## Systems
- TOA
- Matt O'Connell team
- Fidelity pooled accounts
- Informatica day-of-wire workflow
- CIT balance workflow

## Procedure Steps
1. Identify re-registering funds from the TOA TIK column.
2. Send fund/share details to Matt O'Connell and wait for account setup confirmation.
3. Send Fidelity account instructions to the vendor.
4. Check in before wire/liquidation day and keep the tracking spreadsheet current.
5. Update final-file share amounts so Matt's team knows exactly what to locate.
6. Run day-of-wire and CIT balance workflows with no trades going out, then confirm with Matt's team.

## Decisions
- Which funds are marked for re-registration?
- Has Matt's team confirmed receiving-account readiness?
- Do final shares match expected shares?
- Is any discrepancy more than a tiny tolerance?

## Outputs
- Fidelity receiving accounts
- Updated share tracking spreadsheet
- Participant-level share records
- Matt/team confirmation

## Watchouts
- Matt's team may only have the email to identify shares, so accurate share amounts matter.
- A discrepancy above roughly one share needs escalation.
- No trades go out for TIK once participant balances are whole.

## Closeout Checks
- Accounts confirmed
- Vendor instructed
- Final shares updated
- CIT balance complete
- Matt confirmation received
