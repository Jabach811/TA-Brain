---
title: "FOD (Force-Out Distribution) Status Carry-Forward"
type: analysis
tags: [query, sql, internal-conversion, fod, disability, ee-disb-stat-cd, update]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [CORP.EMPLOYEE]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# FOD (Force-Out Distribution) Status Carry-Forward

Two-step read-then-write: identify all participants on the old case flagged `EE_DISB_STAT_CD = '1'` and propagate that flag to the surviving case.

> [!warning]
> Step 2 is a live UPDATE on `CORP.EMPLOYEE`. Run step 1 only first to review the list.

## Purpose

`EE_DISB_STAT_CD` (employee disability status code) controls whether a participant is in Force-Out-Distribution / disability status on the plan. When the plan converts internally, the flag does not automatically flow to the new case — this query re-applies `'1'` (active FOD) on the surviving case for every SSN flagged on the old case.

## When to Run

Post-load, before the first cycle that could trigger a disability / force-out distribution on the surviving case.

## Parameters

Hardcoded — update before running:

| Placeholder | Meaning |
|---|---|
| `GP61992   00001` | **Old case** (source of truth) |
| `QK62519   00001` | **New / surviving case** (update target) |

## Notes

- `EE_DISB_STAT_CD = '1'` = in disability / FOD.
- The UPDATE is scoped by SSN intersection, so it cannot accidentally touch participants who are disabled on the new case for reasons unrelated to the old case.
- Does not update any related tables — only `CORP.EMPLOYEE.EE_DISB_STAT_CD`.

## Tables Used

- `CORP.EMPLOYEE` — participant indicative table (case_no, soc_sec_no, ee_disb_stat_cd).

## SQL

```sql
select soC_sec_no, ee_last_nm, ee_fst_mid_nm, ee_hire_dt, ee_term_dt,ee_disb_stat_cd
from corp.employee
where case_no='GP61992   00001' ---(old case)
and ee_disb_stat_cd='1'


-----------------------------

update corp.employee
set ee_disb_stat_cd='1'
where case_no='QK62519   00001'  ---(new case)
and soc_Sec_no in (select soC_sec_no
from corp.employee
where case_no='GP61992   00001'  ---(old case)
and ee_disb_stat_cd='1')
```

## Output / What to Look For

- Step 1 should return the full list of currently-disabled participants on the old case.
- After step 2 runs, re-query on the new case with the same filter to confirm the expected row count.

## Related Queries

- [[vesting-overrides]] — similar pattern for vesting
- [[internal-conversion-base]]

## See Also

- [[internal-conversion]]
- [[force-out-distribution]]
