# Basis Loading

Basis loading captures employee basis values such as Roth or after-tax contributions. It requires the right data elements, correct restrictions by plan type, and careful transaction adjustment checks.

## Inputs
- Basis source file
- EE basis fields
- Plan type
- Roth start dates
- After-tax values
- TO_BASIS query/reference

## Systems
- EDS
- P3
- AQT
- Basis tables

## Procedure Steps
1. Confirm whether the plan type and source setup allow the basis data being loaded.
2. Prepare basis fields and validate required participant identifiers.
3. Check Roth, after-tax, and other employee-basis values against the source file.
4. Validate the file through EDS before loading.
5. Load basis data and review EDS output for warnings or rejects.
6. Run queries to confirm basis rows landed in the expected tables.
7. Review transaction adjustments when mid-year conversion data affects basis.
8. Document any exclusions or plan-type restrictions.

## Decisions
- Is basis allowed for this plan type?
- Are Roth or after-tax sources present?
- Do participant identifiers match the loaded census?
- Did EDS report warnings that affect tax history?
- Are transaction adjustments needed?

## Outputs
- Loaded basis records
- EDS output notes
- Query verification
- Restriction notes
- Adjustment evidence

## Watchouts
- Do not load basis blindly on restricted plan types.
- Basis errors create downstream tax-reporting pain.
- Mid-year conversions may need special adjustment review.
- Participant matching depends on clean census data.
- The source document references TO_BASIS but the exact path is not captured here.

## Closeout Checks
- Plan restrictions checked
- EDS validation complete
- Basis rows verified
- Adjustments reviewed
- Exceptions documented
