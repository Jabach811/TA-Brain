---
title: "Gamble Report — Source-Level Detail"
type: query
tags: [query, reporting, gamble, source, balances, business-days]
used-by-role: [lm-dc, reporting, sda]
used-in-process: [gamble-quarterly-report]
aqt-parameters: [CASE, Business_line, Quarter2]
tables:
  - CORP.HELPER2
  - PENSION.PLAN_SRC_DETAIL
  - TDA.EE_PART_BAL_HEADER
  - TDA.EE_PART_BALANCE
systems: [db2, aqt, tda]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Gamble Report — Source-Level Detail

Source-level balances and participant counts as of the last open business day on or before `$Quarter2`, for the Gamble quarterly report.

## Purpose

Like [[gamble-fund-level]], but pivots by `SRC_I` instead of by fund. For each contribution source on the plan, returns:

- The 17-digit `SRC_I`
- The decoded source name (concatenation of `REPORT_1_NM` and `REPORT_2_NM` from `PLAN_SRC_DETAIL`)
- Total balance in that source
- The plan's grand-total balance
- Source's share of plan balance (decimal)
- Number of investors (distinct SSNs) in that source

Uses the same business-day calendar pattern as [[gamble-fund-level]].

## When to Run

Quarterly for the Gamble report. Forfeiture (`%F%`) and system (`%S%`) SSNs are excluded.

## Parameters

| Parameter | Example | Notes |
|-----------|---------|-------|
| CASE | `'TA068919  00001'` | Plan case number (quotes part of SETPARM value) |
| Business_line | `TDA` | Schema prefix |
| Quarter2 | `2022-03-31` | Quarter-end date |

## Tables

- **CORP.HELPER2** — business-day calendar
- **$Business_line.EE_PART_BAL_HEADER / EE_PART_BALANCE** — balance header and detail
- **PENSION.PLAN_SRC_DETAIL** — source-name lookup

## SQL

```sql
--DC Asset Allocation - Use for Single or Multiple Plans


--AQT SETPARM,PARM=CASE,VALUE="'TA068919  00001'"
--AQT SETPARM,PARM=Business_line,VALUE="TDA"

--AQT SETPARM,PARM=Quarter2,VALUE="2022-03-31"


with

BUS_DAYS	AS	
	(	
SELECT DATE(SUBSTR(HLP_VALUE,1,4)||'-'||SUBSTR(HLP_VALUE,5,2)||'-'||SUBSTR(HLP_VALUE,7,2)) CURRENT_DAY,
LAG(DATE(SUBSTR(HLP_VALUE,1,4)||'-'||SUBSTR(HLP_VALUE,5,2)||'-'||SUBSTR(HLP_VALUE,7,2))) OVER(ORDER BY HLP_VALUE) PRIOR_DAY
FROM CORP.HELPER2
WHERE HLP_CODE = 'BUSDAYS'
AND HLP_TEXT LIKE 'OPEN%'
AND HLP_VALUE >= '20191231')
,

end_balances as
(
select case_no,eff_d, src_i,sum(total_a) as tot_amt, count(distinct soc_Sec_no) as investors
FROM $Business_line.ee_part_bal_header a, $Business_line.ee_part_balance b
 


where  case_no in ($CASE)
and a.transact_i=b.transact_i
and soc_Sec_no not like '%F%'
and soc_Sec_no not like '%S%'
and a.enrl_prov_grp_i=b.enrl_prov_grp_i
and a.eff_d=(select max(current_day) from bus_days where current_day<='$Quarter2')
group by  case_no,A.EFF_D, src_i
)
,
tot_end_bal as
(
select case_no,eff_d,sum(total_a) as total_amt, count(distinct soc_Sec_no) as tot_investors
FROM $Business_line.ee_part_bal_header a, $Business_line.ee_part_balance b
 where  case_no in ($CASE)
and a.transact_i=b.transact_i
and a.enrl_prov_grp_i=b.enrl_prov_grp_i
and soc_Sec_no not like '%F%'
and soc_Sec_no not like '%S%'
and a.eff_d=(select max(current_day) from bus_days where current_day<='$Quarter2')
group by  case_no,A.EFF_d
)
--select eff_d, src_i,tot_amt, investors
--from end_balances

select 'As of '||substring('$Quarter2',6,2)||'/'||right('$Quarter2',2)||'/'||left('$Quarter2',4) as period, a.src_i,trim(REPORT_1_NM)||' '||trim(REPORT_2_NM) as source , a.tot_amt, total_amt, round(float(float(a.tot_amt)/float(total_amt)),4) as percent, a.investors
from end_balances a,tot_end_bal b, pension.plan_src_detail c
where a.eff_d=b.eff_d
and a.case_no=b.case_no
and c.src_i=a.src_i
```

## Output

One row per source. Columns: `period`, `src_i`, `source`, `tot_amt`, `total_amt`, `percent`, `investors`.

> **Excel warning:** `src_i` is a 17-digit integer — format the column as Text before pasting or Excel will silently coerce it to scientific notation.

## Related Queries

- [[counts-and-totals-gamble]] — plan-level companion
- [[gamble-fund-level]] — fund-level companion
- [[get-plan-source]] — underlying source lineup (maps `SRC_I` to source name)
- [[interest-rates-gamble]] — rate-level detail for fixed-fund buckets

## See Also

- [[gamble-report]]
- [[plan-src-detail]]
- [[src-i]]
- [[business-day-calendar]]
