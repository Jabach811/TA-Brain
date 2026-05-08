# Fund Mapping

Fund mapping is used for mapping conversions. The TOA provides old-to-new fund relationships, but the working fund mapping file adds prior fund codes, amounts, ref numbers, and split-fund indicators.

## Inputs
- Finalized TOA
- Prior record keeper fund codes
- Fund totals
- Split-fund percentages
- Ref numbers once processing begins

## Systems
- TOA
- Fund mapping workbook
- P3 ref numbers
- QA review

## Procedure Steps
1. Copy the fund mapping section from the finalized TOA.
2. Add the DC working header: prior fund code, total amount, ref number, and split indicator.
3. Fill Transamerica fund descriptor details from the TOA.
4. Document split funds with the correct allocation percentages.
5. Resolve mismatches where vendor fund codes do not line up cleanly with the TOA.
6. Send fund mapping to QA and update ref numbers when processing begins.

## Decisions
- Does the vendor fund code match the TOA fund code?
- Is any fund split across two TA funds?
- Are ref numbers ready yet or pending processing?
- Can QA follow the work from prior fund to TA fund?

## Outputs
- QA-ready fund mapping file
- Split-fund instructions
- Ref-number-ready purchase file

## Watchouts
- Fund mapping is only for mapping conversions, not cash conversions.
- Some vendor fund codes require two-step explanation; show the work.
- The mapping cannot be fully complete until ref numbers exist.

## Closeout Checks
- TOA mapping copied
- Prior fund codes and totals filled
- Split funds documented
- QA review sent
