# Elections

Election handling is either a defaulting path or a mapping path. The cleanest approach is to default elections during the census load when possible; second-pass EDS defaulting is available but should not be the preferred route.

## Inputs
- Census population
- Limited access elections when applicable
- Mapped election file
- AQT query for missing-election population

## Systems
- EDS
- AQT
- Election mapping layout

## Procedure Steps
1. Decide whether participants are being defaulted or mapped from existing elections.
2. If defaulting during census, include the default instruction in the EDS census load.
3. If defaulting later, use one row per participant with Fund Descriptor blank, Percentage blank, and default indicator D.
4. If mapping elections, load the mapped election layout and verify coverage.
5. Query the plan population for participants who have no elections.
6. Document explicit counts: mapped, defaulted, missing, and intentionally ignored.

## Decisions
- Default everyone or map elections?
- Are no-election participants termed or still action-worthy?
- Does the client need to confirm deferral/election details through payroll?
- Can missing election records be explained instead of assumed?

## Outputs
- Defaulted election population
- Mapped election population
- No-election exception list
- AQT verification evidence

## Watchouts
- Do not rely on inference. If 150 participants are in the plan, account for all 150.
- Second-pass defaulting works, but doing it during census is cleaner.
- For default-only EDS rows, Fund Descriptor and Percentage are blank and the default indicator is D.

## Closeout Checks
- Mapped/defaulted counts match population
- No-election population reviewed
- AQT evidence retained
- Client or payroll gaps noted
