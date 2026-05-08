# Cash Conversion Balances

Cash conversions revolve around wire readiness, cashiering confirmation, Advanced Employer handling, current elections, final records, fund management calendar entries, and status emails to QA, COM, and PC.

## Inputs
- Wire instructions
- Wire date and effective date
- Cashiering estimate and final amount
- P2 booking confirmation or email
- Final records
- Current elections

## Systems
- P2
- P3
- Advanced Employer account
- Fund management calendar
- Informatica CIT balance workflow

## Procedure Steps
1. Send wire instructions early and re-send them the week before liquidation for confirmation.
2. Keep vendor and cashiering communication open as the wire date approaches.
3. Confirm the booked wire by cashiering email or by searching ref numbers in P2.
4. If final records are not ready, move money to the Advanced Employer account.
5. Send status email to QA, COM, and PC that the wire was booked and moved to Advanced Employer.
6. When final records are ready, liquidate Advanced Employer, create the liquidation ref number, run CIT balance, and apply interest pro rata the next day.

## Decisions
- Are final records ready early enough to bypass Advanced Employer?
- Are all participant elections present or defaulted?
- Is the trade on the fund management calendar?
- Did the booked amount match the expected amount?

## Outputs
- Booked wire confirmation
- Advanced Employer purchase and liquidation records
- CIT balance posting
- Participant purchases
- Pro rata interest allocation

## Watchouts
- Cash conversions do not need fund mapping, but they do need source mapping.
- Fund management calendar entries are mandatory for big trades.
- Trailing dividends do not need the calendar; main trades and AE liquidation do.
- If the calendar is wrong or locked, notify the trade email groups immediately.

## Closeout Checks
- Wire booked
- AE status email sent
- Calendar updated
- Final records processed
- Interest handled next day
