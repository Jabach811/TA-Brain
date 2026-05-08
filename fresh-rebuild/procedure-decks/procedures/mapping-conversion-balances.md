# Mapping Conversion Balances

Mapping conversions use day-of-wire workflows and CONV files to post fund-level balances to the dummy participant. Final participant balances are later loaded through CIT balance, and the dummy participant is reversed through ROC.

## Inputs
- CONV file
- Fund mapping file
- P3 ref numbers
- Dummy participant
- Final participant balance records
- CIT balance parameter file

## Systems
- Informatica day-of-wire workflow
- P3
- ROC
- CIT balance workflow

## Procedure Steps
1. Create the dummy participant before running the mapping workflow.
2. Build the CONV file with case number, prior fund code, TA fund code, ref number, amount, and TIK indicator N.
3. Run the day-of-wire workflow to load fund-level detail to the dummy participant.
4. Process in P3 using batch no-hold and process immediate so trades go out.
5. When final files arrive, run CIT balance with cash conversion wire set to N.
6. Reverse the dummy participant in P3 ROC so only real participant balances remain.

## Decisions
- Is the dummy participant loaded before workflow execution?
- Are ref numbers present in fund mapping?
- Is the cash-conversion parameter set to N?
- Do participant balances match the original fund-level purchases?

## Outputs
- Dummy participant fund-level balances
- Real participant balance records
- ROC dummy reversal
- Final transaction detail

## Watchouts
- The dummy participant SSN is 999-00-0000.
- If the dummy participant is missing, the workflow can be painful to untangle.
- Mapping uses the ref numbers from the fund mapping file, not a single cash wire ref number.

## Closeout Checks
- Dummy loaded
- Day-of-wire workflow processed
- CIT balance processed
- Dummy reversed
- Transaction detail verified
