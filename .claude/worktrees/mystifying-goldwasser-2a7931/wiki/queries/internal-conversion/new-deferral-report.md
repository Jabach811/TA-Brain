---
title: "New Deferral Report (Post-Conversion)"
type: analysis
tags: [query, sql, internal-conversion, deferrals, verification]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [PENSION.PART_DEF_DATA, PENSION.PART_PPA_DEFAULT, PENSION.PLAN_PROV_GRP, TDA.VEMPLOYEE]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# New Deferral Report (Post-Conversion)

Simple post-load verification showing every active deferral on the new/surviving case plus the participant's term date and current PPA default status.

## Purpose

After the internal-conversion load, confirm that deferrals copied over correctly by listing them on the **new** case. Cross-check against the pre-load deferral pull from [[internal-conversion-deferrals]] — counts and amounts should match (excluding terminated-and-zeroed participants).

## When to Run

Day-after conversion, once deferrals have been applied on the surviving case. Run first, fix discrepancies, then hand off to communications for confirmation statements.

## Parameters

Hardcoded new case: `'TT069215  00001'` (both in the inner provision-group subquery and in the outer WHERE). Update before running.

## Notes

- `STAT_C = 'A'` filters to active deferrals only.
- Pulls `EE_TERM_DT` so terminated participants show up flagged — they typically should not have active deferrals.
- The commented-out `--and (DEF_A>0 or DEF_P>0)` is the filter for dollar-and-percent-nonzero; uncomment to hide zero-deferral rows.
- `default_ind` derived the same way as [[internal-conversion-deferrals]] via `PART_PPA_DEFAULT` where `ENRL_SERV_TYP_C = 1`.

## Tables Used

- `PENSION.PART_DEF_DATA` — active deferral rows on the new case.
- `PENSION.PLAN_PROV_GRP` — scope by new-case provision group.
- `PENSION.PART_PPA_DEFAULT` — default status.
- `TDA.VEMPLOYEE` — participant name and term date.

## SQL

```sql
select case_no,  a.SOC_SEC_NO,  a.DEF_A,  a.DEF_P,  a.DEF_GRP_I,  a.EFF_D,  a.SRC_I
, ee_term_dt,
COALESCE(
  (case 
   when c.DEFAULT_STAT_C=0  and ENRL_SERV_TYP_C=1 then 'Not in Default'
   when c.default_stat_c=1 and ENRL_SERV_TYP_C=1 then 'In Default'
   else 'NULL' end), 'NULL') as default_ind
from pension.part_Def_data a, TDA.vemployee b
left outer join pension.part_ppa_default as c on c.account_no=case_no and b.soc_sec_no=c.soc_sec_no and ENRL_SERV_TYP_C=1
where a.enrl_prov_grp_i in (select enrl_prov_grp_i from pension.plan_prov_grp where account_no='TT069215  00001')
and a.stat_c='A'
and case_no='TT069215  00001'
and a.soc_Sec_no=b.soc_Sec_no

--and (DEF_A>0 or DEF_P>0)
```

## Output / What to Look For

- Row count should equal active-deferral row count from pre-load pull (minus any known exclusions).
- Participants with a populated `EE_TERM_DT` but still-active `DEF_A`/`DEF_P` — investigate (should typically be zeroed for terms).
- `default_ind` column: post-conversion defaulted participants should match the pre-load default population.

## Related Queries

- [[internal-conversion-deferrals]] — pre-load version
- [[current-elections]]

## See Also

- [[internal-conversion]]
- [[deferral-election]]
