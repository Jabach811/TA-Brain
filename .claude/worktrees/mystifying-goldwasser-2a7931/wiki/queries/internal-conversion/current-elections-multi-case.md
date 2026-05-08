---
title: "Current Elections With Default Code — Multi-Case"
type: analysis
tags: [query, sql, internal-conversion, elections, multi-case]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [PENSION.PART_ELECT_DETAIL, PENSION.PART_PPA_DEFAULT, PENSION.PLAN_SRC_DETAIL, PENSION.PERSON_SEARCH, PENSION.PART_ENRL, PENSION.PLAN_PROV_GRP]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Current Elections With Default Code — Multi-Case

Multi-old-case variant of [[current-elections]] that pulls elections across several outgoing cases at once, while excluding any participant already enrolled in the target case.

## Purpose

When multiple plans are rolling into one surviving plan, the election pull must cover all source cases. This version lists the old cases in the `IN` clause and uses an anti-join on the target case to avoid duplicating elections for people who are already in the destination plan from a prior wave.

## When to Run

Use instead of [[current-elections]] when the conversion involves more than one outgoing case (typical for affiliated-plan mergers).

## Parameters

Hardcoded old-case list: `'TT069214  00001','TT069216  00001','TT069217  00001'`. Target / already-loaded case: `'TT069215  00001'`. Update both.

## Notes

- The `NOT IN` subquery joins `PERSON_SEARCH`, `PART_ENRL`, `PART_ELECT_DETAIL`, and `PLAN_PROV_GRP` on the target case to determine which SSNs are already enrolled — they are excluded so the pull only returns new elections needing migration.
- Same filter logic as the single-case version: latest `EFF_D` per enrolment, `ELEC_TYP_C = '0'`.
- No explicit SSN filter — returns all participants across the three cases.

## Tables Used

- `PENSION.PART_ELECT_DETAIL` — elections.
- `PENSION.PART_PPA_DEFAULT` — default status (service type 2).
- `PENSION.PLAN_SRC_DETAIL` — source name decode.
- `PENSION.PERSON_SEARCH` / `PENSION.PART_ENRL` / `PENSION.PLAN_PROV_GRP` — used in the target-case exclusion subquery.

## SQL

```sql
select account_no, soc_Sec_no, a.SRC_I,  a.ELEC_TYP_C,  a.FD_DESC_C,  a.ELEC_P,  eff_d, 
   COALESCE((case 
   when b.DEFAULT_STAT_C=0  and ENRL_SERV_TYP_C=2 then 'Not in Default'
   when b.default_stat_c=1 and ENRL_SERV_TYP_C=2 then 'In Default'
   else 'NULL' end), 'NULL') as default_ind,
   case 
   when a.src_i=0 then 'ALL SOURCES'
   else (select REPORT_1_NM||REPORT_2_NM from pension.plan_src_Detail c
   where c.src_i=a.src_i) end as src_txt
from pension.part_elect_detail a 
left join
pension.part_ppa_default as b
on a.enrl_prov_grp_i=b.enrl_prov_grp_i and a.part_enrl_i=b.part_enrl_i
and ENRL_SERV_TYP_C=2
where account_no in ('TT069214  00001','TT069216  00001','TT069217  00001')
and soc_sec_no not in (select soc_SeC_no from pension.person_search e, pension.part_enrl f, pension.part_elect_Detail g, pension.plan_prov_grp h
where h.accouNT_NO='TT069215  00001' AND F.PART_I=E.PERSON_I AND G.PART_ENRL_I=F.PART_ENRL_I
AND G.ENRL_PROV_GRP_I=H.ENRL_PROV_GRP_I)
and EFF_D in (select max(eff_d) from pension.part_elect_detail c
where c.ENRL_PROV_GRP_I=a.ENRL_PROV_GRP_I and c.PART_ENRL_I=a.PART_ENRL_I)
and ELEC_TYP_C='0'
```

## Output / What to Look For

Same columns as single-case version. Verify row counts by old-case to catch any outgoing case with suspiciously low returns.

## Related Queries

- [[current-elections]] — single-case version
- [[internal-conversion-deferrals]]

## See Also

- [[internal-conversion]]
- [[investment-election]]
