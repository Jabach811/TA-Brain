---
title: "Gamble Report — Fund-Level Detail"
type: query
tags: [query, reporting, gamble, fund, balances, tickers, business-days]
used-by-role: [lm-dc, reporting, sda]
used-in-process: [gamble-quarterly-report]
aqt-parameters: [CASE, Business_line, Quarter2]
tables:
  - CORP.HELPER2
  - PENSION.PLAN_FUND
  - PENSION.CO_FUND_REV_SHR
  - TDA.EE_PART_BAL_HEADER
  - TDA.EE_PART_BALANCE
systems: [db2, aqt, tda]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Gamble Report — Fund-Level Detail

Fund-level balances, participant counts, and tickers as of the last open business day on or before `$Quarter2`. Used in the Gamble quarterly report alongside [[counts-and-totals-gamble]] and [[gamble-source-level]].

## Purpose

Returns, for each fund in the plan:

- The fund description code and fund name (with report names concatenated)
- The fund ticker from `CO_FUND_REV_SHR`
- Total balance in the fund
- Plan's grand-total balance
- Fund's share of plan balance (as a decimal)
- Number of investors (distinct SSNs) in the fund

The business-day logic uses `CORP.HELPER2` with `HLP_CODE='BUSDAYS'` and rows beginning `OPEN%` to find the most recent open business day on or before `$Quarter2`.

## When to Run

Quarterly, for the Gamble report. Forfeiture SSNs (containing `F`) and system SSNs (containing `S`) are excluded.

## Parameters

| Parameter | Example | Notes |
|-----------|---------|-------|
| CASE | `'TA068919  00001'` | Plan case number — note the quotes are part of the SETPARM value |
| Business_line | `TDA` | Schema prefix for balance tables |
| Quarter2 | `2022-03-31` | Quarter-end date (YYYY-MM-DD) |

## Tables

- **CORP.HELPER2** — business-day calendar (`HLP_CODE='BUSDAYS'`)
- **$Business_line.EE_PART_BAL_HEADER / EE_PART_BALANCE** — balance header and detail
- **PENSION.PLAN_FUND** — fund-lineup master
- **PENSION.CO_FUND_REV_SHR** — fund revenue-share table (carries `FUND_SYMBOL_C` ticker)

## SQL

```sql

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
select eff_d, fd_descr_cd,fd_prov_i,sum(total_a) as tot_amt, count(distinct soc_Sec_no) as investors
FROM $Business_line.ee_part_bal_header a, $Business_line.ee_part_balance b
 


where  case_no in ($CASE)
and a.transact_i=b.transact_i
and a.enrl_prov_grp_i=b.enrl_prov_grp_i
and a.eff_d=(select max(current_day) from bus_days where current_day<='$Quarter2')
--and fd_descr_cd^='PCRA'
and not soc_Sec_no like '%F%'
and not soc_Sec_no like '%S%'
group by  A.EFF_D, fd_descr_cd, fd_prov_i
)
,
tickers as

(
select c.FD_DESCR_CD , c.FUND_SYMBOL_C 
from pension.co_fund_rev_shr c where fd_descr_cd in (select fd_Descr_cd from end_balances)
and CREATE_TS in (select max(CREATE_TS) from pension.CO_FUND_REV_SHR e where c.FD_DESCR_CD=e.FD_DESCR_CD)
)

select 'As of '||substring('$Quarter2',6,2)||'/'||right('$Quarter2',2)||'/'||left('$Quarter2',4) as period, a.fd_Descr_cd, trim(c.REPORT_1_FD_NM)||' '||trim( REPORT_2_FD_NM) as fund_name, coalesce(fund_symbol_c,'') as ticker ,a.tot_amt, sum(b.tot_amt) as Plan_amt, round(float(float(a.tot_amt)/float(sum(b.tot_amt))),4) as percent, a.investors 
 from end_balances a, end_balances b, pension.plan_fund c
left join tickers d on d.FD_DESCR_CD=a.fd_descr_cd 
where a.fd_prov_i=c.fd_prov_i


group by  a.fd_Descr_cd, a.tot_amt, a.investors, trim(c.REPORT_1_FD_NM)||' '||trim( REPORT_2_FD_NM), coalesce(fund_symbol_c,'')
```

## Output

One row per fund. Columns: `period`, `fd_descr_cd`, `fund_name`, `ticker`, `tot_amt`, `Plan_amt`, `percent`, `investors`.

## Related Queries

- [[counts-and-totals-gamble]] — plan-level counts and totals companion
- [[gamble-source-level]] — source-level detail companion
- [[interest-rates-gamble]] — guaranteed/credited rates for fixed-fund buckets
- [[get-plan-fund]] — underlying fund lineup

## See Also

- [[gamble-report]]
- [[co-fund-rev-shr]]
- [[ee-part-balance]]
- [[business-day-calendar]]
- [[pcra]]
