---
title: "Interest Rates — Gamble Report"
type: query
tags: [query, reporting, gamble, interest-rate, guaranteed-rate, credited-rate, fixed-fund]
used-by-role: [lm-dc, reporting]
used-in-process: [gamble-quarterly-report]
aqt-parameters: [CASE, Business_line, Quarter2]
tables:
  - TDA.EE_PART_BAL_HEADER
  - TDA.EE_PART_BALANCE
  - TDA.GUAR_CR_INT_RATES
systems: [db2, aqt, tda]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Interest Rates — Gamble Report

Pulls credited and guaranteed rates for every fixed-fund bucket the plan participates in, as of a specific effective date. Used in the Gamble quarterly report.

## Purpose

Fixed funds (guaranteed accounts, pooled-separate accounts) carry a per-bucket interest rate that changes periodically. The join `ee_part_balance.bkt_no = guar_cr_int_rates.bkt_no` plus `fd_descr_cd` plus `eff_d` resolves each participant's balance to the rate in effect for that bucket on that date.

The query then aggregates to the fund level, returning:

- `fd_descr_cd` — the fund descriptor
- `tot_amt` — total dollars in the fund across all buckets for the plan
- `CREDITED_RATE_P` — the credited rate (what participants earn)
- `GUAR_RATE_P` — the guaranteed minimum rate

## When to Run

Quarterly for the Gamble report, and any time a client asks for current rate detail. System SSNs (containing `S`) are excluded.

## Parameters

| Parameter | Example | Notes |
|-----------|---------|-------|
| CASE | `'TA068919  00001'` | Plan case number |
| Business_line | `TDA` | Schema prefix |
| Quarter2 | `'2022-06-09'` | Balance effective date (note: quoted) |

## Tables

- **$Business_line.EE_PART_BAL_HEADER / EE_PART_BALANCE** — balance header and detail
- **$Business_line.GUAR_CR_INT_RATES** — per-bucket rate table with `CREDITED_RATE_P`, `GUAR_RATE_P`, `CREDITED_RATE_END_D`, `GUAR_RATE_END_D`

## SQL

```sql

--AQT SETPARM,PARM=CASE,VALUE="'TA068919  00001'"
--AQT SETPARM,PARM=Business_line,VALUE="TDA"

--AQT SETPARM,PARM=Quarter2,VALUE="'2022-06-09'"



select fd_descr_cd, sum(total_a) as tot_amt,CREDITED_RATE_P, GUAR_RATE_P

FROM $Business_line.ee_part_bal_header a, $Business_line.ee_part_balance b
 join $Business_line.guar_Cr_int_rates c on account_no=case_no and b.bkt_no=c.bkt_no and fd_descr_cd= FD_DESC_CD and a.eff_d=c.eff_d

where  a.case_no in ($CASE)
and a.transact_i=b.transact_i
and a.enrl_prov_grp_i=b.enrl_prov_grp_i
and a.eff_d=$Quarter2

--and not soc_Sec_no like '%F%'
and not soc_Sec_no like '%S%'
group by  A.EFF_D, fd_descr_cd,  CREDITED_RATE_END_D, GUAR_RATE_END_D, CREDITED_RATE_P, GUAR_RATE_P

order by 1 desc


--select *
--from tda.BUCKET_DATA
--where  case_no in ($CASE)


--from tda.guar_Cr_int_rates
```

## Output

One row per fund / rate combination. Funds without an associated bucket in `GUAR_CR_INT_RATES` are excluded (inner join).

## Related Queries

- [[counts-and-totals-gamble]]
- [[gamble-fund-level]]
- [[gamble-source-level]]

## See Also

- [[gamble-report]]
- [[guar-cr-int-rates]]
- [[fixed-fund]]
- [[credited-rate]]
- [[guaranteed-rate]]
