---
title: "Census"
type: concept
tags: [concept, census, data, takeover, participant, demographics]
created: 2026-04-18
updated: 2026-04-18
sources: 3
---

# Census

The employee-demographic data that identifies every participant on a plan — SSN, name, DOB, hire/term/rehire dates, address, phone, gender, payroll frequency, division, class code, employee number.

> [!needs-review]
> First pass of this concept page. Human flagged this for close review during the next lint pass — source material is extensive and the definition, data elements, and dependency notes need a careful eye before this is considered authoritative.

## Definition

Census is the master list of who a plan covers. On takeover it comes from the prior recordkeeper (the base file / census file); on ongoing plans it is refreshed from client payroll feeds. At Transamerica it lands in `CORP.EMPLOYEE` with the address row split out into `CORP.EE_BEN_ADDRESS` (payee type `'1'`). Every other participant-level data domain — basis, balances, allocations, deferrals, loans — is keyed by (CASE_NO, SOC_SEC_NO) and requires a census row to exist first.

## Why It Matters

Census is the **floor** of every data load. If a participant is not on census, the basis load fails, the deferral load fails, the allocation load fails. On a takeover, census is loaded immediately after [[base-file]] delivery from the prior RK; on an internal conversion, census typically carries over from the surviving-case `EMPLOYEE` table plus any new entrants from the outgoing case.

Census also carries fields that other processes depend on downstream:

- **Term date (`EE_TERM_DT`)** drives eligibility exclusions, force-out distribution eligibility ([[concepts/fod-status]] — see wiki-v2 queries), and the terminated-with-active-deferral audit.
- **Hire / rehire date** drives [[ltpt-eligibility]] and 1,000-hour eligibility calculations.
- **Payroll frequency (`EE_PAYROLL_FREQ_CD`)**, **division (`EE_DIV_NO`)**, **class code**, and **employee number** are used by the QA gap-audit queries; missing any of these on more than a handful of participants is a red flag that needs to go back to the client or prior RK.
- **Gender code (`EE_SEX_CD`)** is required for annuity and RMD calculations.

## Data Elements

Minimum acceptable census row:

| Field | Column (CORP.EMPLOYEE) | Notes |
|-------|------------------------|-------|
| SSN | `SOC_SEC_NO` | Formatted with dashes on output, stored without |
| Last name | `EE_LAST_NM` | |
| First / middle name | `EE_FST_MID_NM`, `MIDDLE_NM` | |
| Suffix | `SUFFIX_NM` | |
| DOB | `EE_BRTH_DT` | `YYYYMMDD`; `00000000` = missing |
| Hire date | `EE_HIRE_DT` | |
| Term date | `EE_TERM_DT` | `00000000` = active |
| Rehire date | `EE_REHIRE_DT` | |
| Payroll freq | `EE_PAYROLL_FREQ_CD` | W / B / S / M etc. |
| Gender | `EE_SEX_CD` | |
| Division | `EE_DIV_NO` | |
| Class code | Custom per plan | |
| Employee # | Custom per plan | |
| Term reason | From `PENSION.PE_DIV_EMPL_DATA` / `PENSION.GET_PART_ENRL` lookup | Required for terminated participants |

Address is a separate row in `CORP.EE_BEN_ADDRESS` with `PAYEE_TYP_CD = '1'`.

## Evidence / Examples

- The TO Census extract query (`queries/to-census` in wiki-v2.html) is the canonical post-load verification: it left-joins `EMPLOYEE` to `EE_BEN_ADDRESS` and formats all dates as `MM/DD/YYYY`.
- Rehire handling relies on `ROW_NUMBER() OVER (PARTITION BY SOC_SEC_NO ORDER BY EE_TERM_DT DESC NULLS LAST, EE_HIRE_DT DESC)` — a participant who was rehired will have multiple `EMPLOYEE` rows and the audit queries return only the most recent.
- Gap audits flag participants missing class code, division, employee number, gender code, payroll frequency, or termination reason.

## Counterarguments / Edge Cases

- **Dummy participants** ([[dummy-participant]], SSN `999-00-0000`) are census rows that exist only to unblock mapping conversions — they are not real people.
- A census row with no matching row in `PART_ENRL` means the participant is on the plan's employee list but has never enrolled. This is normal for LTPT-eligible-but-not-participating employees.
- Multi-division plans may legitimately have 2+ active rows per SSN if the person works multiple divisions. These do **not** collapse in the gap audit — use the `ROW_NUMBER()` pattern above.

## Related Concepts

- [[base-file]] — the census template given to clients to seed the system
- [[data-discovery-document]] — intake form used to identify all required participant data from prior RK
- [[basis]] — cost basis, depends on census
- [[investment-elections]] — elections, depend on census
- [[loans]] — loan data, depends on census
- [[deferrals]]

## Open Questions

- Exact mapping of class code and employee number columns across TDA vs. CORP schemas.
- Authoritative list of acceptable `EE_PAYROLL_FREQ_CD` values and their meanings.
- When census arrives incomplete from prior RK, what is the escalation / fill-in workflow?

## See Also

- [[processes/census-load]]
- [[entities/aqt]]
- [[entities/eds]]
- [[concepts/faa-dc-data-requirements]]
- [[roles/lm-dc]]
