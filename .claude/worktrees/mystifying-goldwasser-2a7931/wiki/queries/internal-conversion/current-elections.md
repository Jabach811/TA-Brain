---
title: "Current Elections With Default Code"
type: analysis
tags: [query, sql, internal-conversion, elections, investment-elections, default-status]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [PENSION.PART_ELECT_DETAIL, PENSION.PART_PPA_DEFAULT, PENSION.PLAN_SRC_DETAIL]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Current Elections With Default Code

Pulls each participant's current (latest-effective) investment elections by source and fund, tagged with whether the participant is being defaulted per QDIA.

## Purpose

Investment elections are the fund-allocation percentages participants have set per money source. This query returns the latest election row per (ENRL_PROV_GRP_I, PART_ENRL_I) combination with a derived `src_txt` column — either 'ALL SOURCES' when src_i=0 or the actual source name — and a `default_ind` flag showing whether the participant is still in QDIA default for the election service.

## When to Run

Pre-liquidation to capture the elections to copy over. For single-case pulls (one old case), use this query. For multi-case aggregates (several old cases rolling into one new), use [[current-elections-multi-case]].

## Parameters

Hardcoded single case `UN62203   00001` and a specific participant SSN (`283-66-4214`). The commented-out line `--AND SOC_SEC_NO IN (SELECT SSN FROM COOPER_UN62514)` shows the typical pattern for list-driven pulls using a temporary uploaded table.

The second SELECT in the file (`PENSION.PART_PPA_DEFAULT WHERE ACCOUNT_NO = 'JK62202   00001'`) is a separate diagnostic pulling raw default-status rows for an explicit SSN list.

## Notes

- `ELEC_TYP_C = '0'` selects the ongoing-deferral investment election (the default money-in election). Other `ELEC_TYP_C` values represent transfer / rollover / rebalance elections.
- Latest effective date per enrolment: `EFF_D IN (SELECT MAX(eff_d) ...)` correlated subquery to `PART_ELECT_DETAIL`.
- `default_ind` pulled from `PART_PPA_DEFAULT` joined by `(ENRL_PROV_GRP_I, PART_ENRL_I)` with `ENRL_SERV_TYP_C = 2` (election service).
- Source name is decoded inline: `REPORT_1_NM || REPORT_2_NM` from `PLAN_SRC_DETAIL`.
- Participant list is typically uploaded to a scratch table (e.g., `COOPER_UN62514` above) containing SSNs for the specific population being converted.

## Tables Used

- `PENSION.PART_ELECT_DETAIL` — core election table (elect_typ_c, fd_desc_c, elec_p per source and effective date).
- `PENSION.PART_PPA_DEFAULT` — default-status flag per service type (1 = deferral, 2 = election).
- `PENSION.PLAN_SRC_DETAIL` — source name lookup.

## SQL

```sql
select account_no, soc_Sec_no, a.SRC_I,  a.ELEC_TYP_C,  a.FD_DESC_C,  a.ELEC_P,  eff_d, a.SRC_S, a.SRC_C, a.INPUT_SRC_C, a.USER_I,
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
--and eff_d < '2009-11-20'
where account_no='UN62203   00001'
and EFF_D in (select max(eff_d) from pension.part_elect_detail c
where c.ENRL_PROV_GRP_I=a.ENRL_PROV_GRP_I and c.PART_ENRL_I=a.PART_ENRL_I)
--AND SOC_SEC_NO IN (SELECT SSN FROM COOPER_UN62514)
AND SOC_SEC_NO = '283-66-4214'

and ELEC_TYP_C='0'



SELECT *
FROM PENSION.PART_PPA_DEFAULT
WHERE ACCOUNT_NO = 'JK62202   00001'
AND SOC_SEC_NO IN ('373-23-3126',
'036-50-2754',
'040-78-4779',
'113-60-5609',
'182-58-7599',
'207-36-7741',
'214-08-8358',
'231-15-0819',
'233-11-8812',
'235-19-1937',
'237-11-1544',
'237-41-7735',
'237-76-9579',
'238-51-3095',
'239-15-2239',
'239-21-3433',
'239-37-8994',
'240-70-9221',
'250-53-1251',
'254-43-5718',
'343-74-8506',
'380-62-4306',
'386-68-2007',
'560-66-1244',
'599-14-9105',
'270-78-7022',
'274-52-9340',
'279-40-7182',
'279-58-2696',
'281-70-1811',
'304-04-6518',
'272-88-2395',
'291-66-4690',
'309-62-8779',
'126-64-2050',
'128-70-0517',
'134-70-9086',
'148-50-2078',
'171-58-7350',
'243-98-3151',
'247-04-9613',
'247-47-1135',
'247-69-9874',
'248-80-2548',
'248-86-4745',
'248-94-1562',
'249-19-2144',
'249-41-0088',
'250-33-0655',
'444-48-8690',
'450-49-1395',
'519-96-4520',
'079-56-3725',
'247-08-2027',
'249-47-5740',
'249-63-1477',
'249-77-4323',
'249-90-0050',
'255-72-4205',
'165-56-2733',
'175-66-0120',
'181-52-3034',
'198-42-7096',
'205-50-6862')
```

## Output / What to Look For

- `ELEC_P` should sum to 100 per participant per source.
- `default_ind = 'In Default'` means the participant is still receiving the plan's default allocation — these are candidates for auto-allocation on the new case rather than carrying a real election.
- Participants with no rows returned have no current election on file.

## Related Queries

- [[current-elections-multi-case]] — multi-old-case variant with exclusion logic
- [[internal-conversion-deferrals]]
- [[internal-conversion-base]]

## See Also

- [[internal-conversion]]
- [[investment-election]]
- [[qdia-default]]
