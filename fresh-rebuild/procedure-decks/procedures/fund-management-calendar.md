# Fund Management Calendar

The fund management calendar documents trade intent for large conversion-related trades. It varies by conversion type and has strict timing expectations around SSBT cut-off and trade-notification groups.

## Inputs
- Conversion type
- Trade date
- Expected trade amount
- Fund details
- Calendar access
- Email distribution list

## Systems
- Fund management calendar
- Email
- Cashiering
- Trading groups
- SSBT

## Procedure Steps
1. Determine whether the trade type requires calendar notification.
2. Identify the conversion type and which trade event is occurring.
3. Enter trade details before the cut-off window whenever the file is accessible.
4. Send the required notification email to the distribution list.
5. If the calendar file is locked, send the email anyway and keep trying to update the file.
6. For cash conversions, track the wire, Advanced Employer, and participant balance events separately.
7. Exclude small-money trailing dividends when the procedure says calendar entry is not needed.
8. Confirm the intended trade is documented before downstream processing.

## Decisions
- Does this event require FMC entry?
- Is this mapping, cash, participant balance, or TIK?
- Is the calendar file accessible?
- Is the trade before SSBT cut-off?
- Is this small trailing money that can be excluded?

## Outputs
- Calendar entry
- Notification email
- Locked-file evidence if applicable
- Trade timing record

## Watchouts
- The 4 PM EST SSBT cut-off matters.
- Vanguard and other timing exceptions can be stricter.
- TIK shares are generally outside the cash-trade calendar logic.
- Locked files do not remove the email-notification requirement.
- Cash conversions can have three separate trading events.

## Closeout Checks
- Applicability checked
- Calendar updated or lock documented
- Email sent
- Trade timing confirmed
- Exceptions noted
