---
title: "Query: Internal Conversion — Hours"
type: query
tags: [query, sql, internal-conversion]
used-by-role: [lm-dc]
used-in-process: [[internal-conversion]]
aqt-parameters: [CASE, Business_line, NOT_THESE_AFFILIATES]
tables: [CORP.EMPLOYEE, CORP.EE_HRS_WORKED, CORP.CASE_DATA, CORP.HELPER2, PENSION.PLAN_PROV_GRP, PENSION.PLAN_PROVISION, PENSION.OUTSRC_SERVICE, PENSION.OUTSRC_TPA_CHOICE_DET, PENSION.GEN_VESTING_DATA]
systems: [aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---
# Query: Internal Conversion — Hours

Standalone hours extract for an internal conversion. Produces four result sets covering hours worked in the current/prior plan year windows, plus years-of-service metadata.

## When to Run

- Run during internal conversion prep to build the hours section of the [[conv-file]]
- After eligibility is settled and before [[liquidation-day]]
- Re-run if hours data changes late in the prep cycle

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| CASE | "932339" | Parent case number |
| Business_line | "CORP" | Business line (CORP or TDA) |
| NOT_THESE_AFFILIATES | "'ABCDE'" | Sub-ids to exclude |

## Notes (from header comments)

- `AQT SETPARM,PARM=CASE,VALUE="932339"`
- `AQT SETPARM,PARM=Business_line,VALUE="CORP"`
- `AQT SETPARM,PARM=NOT_THESE_AFFILIATES,VALUE="'ABCDE'"`

## Tables Used

- `$Business_line.EMPLOYEE` — hire / term / rehire dates
- `$Business_line.EE_HRS_WORKED` — period-end hours (YTD employment vs plan)
- `$Business_line.CASE_DATA` — plan year end (PYE_DT) for anniversary math
- `$Business_line.HELPER2` — vesting-computation-period codes
- `PENSION.PLAN_PROV_GRP`, `PENSION.PLAN_PROVISION`, `PENSION.OUTSRC_SERVICE`, `PENSION.OUTSRC_TPA_CHOICE_DET` — detect TPA Choice plans (excluded)
- `PENSION.GEN_VESTING_DATA` — vest computation period

## SQL

```sql

--AQT SETPARM,PARM=CASE,VALUE="932339"
--AQT SETPARM,PARM=Business_line,VALUE="CORP"
--AQT SETPARM,PARM=NOT_THESE_AFFILIATES,VALUE="'ABCDE'"
with current_hours as(
with
 last_ann as
( with hire_date as
(select case_no, soc_Sec_no, case
when substr(ee_hire_dt,5,4)='0229' then substr(ee_hire_dt,1,4)||'0228' else ee_hire_dt end as ee_hire_dt
from $Business_line.employee where case_no like '$CASE %')

select a.case_no, a.soc_Sec_no,a.ee_hire_dt,ee_term_dt,ee_rehire_dt,
case when cast(year(current_Date)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) <current date then cast(year(current_Date)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date)
else cast((year(current_Date)-1)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) end as last_anniversary
,cast(cast(year(current_Date)-1 as varchar)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) as prior_yr_ann

from $Business_line.EMPLOYEE a
join hire_date b on b.case_no=a.case_no and b.soc_Sec_no=a.soc_Sec_no
where a.case_no like '$CASE%'
),

last_plan_ann as
(
select case_no, cast(cast(year(current date)-1 as varchar)||'-'||substr(pye_dt,1,2)||'-'||substr(pye_dt,3,2)as date) as last_plan_anniversary
from $Business_line.case_data 
where case_no like '$CASE %'),

	TPA_CHOICE
AS (
	SELECT 
	A.ACCOUNT_NO
	FROM PENSION.PLAN_PROV_GRP A
	JOIN PENSION.PLAN_PROVISION C ON A.ENRL_PROV_GRP_I = C.ENRL_PROV_GRP_I
	JOIN PENSION.OUTSRC_SERVICE D ON C.PROVISION_I = D.OUTSRC_I
		AND SERV_TYP_C = 25
		AND SERV_OFFERING_C = 1
	JOIN PENSION.OUTSRC_TPA_CHOICE_DET E ON D.OUTSRC_I = E.OUTSRC_I
		AND TPA_TYP_C = 1
		AND ALLOW_IND_C = '1'
where a.account_no like '$CASE %'),

Vest_comp_period as
(
select account_no, compute_per_yr_c, related_grp_typ_c, hlp_text
from pension.GEN_VESTING_DATA c,pension.plan_provision a, pension.plan_prov_grp  b, $Business_line.helper2 d
where vest_i =provision_i
and account_no like '$CASE%'
 and a.enrl_prov_grp_i=b.enrl_prov_grp_i 
and hlp_code='VCOMPCD'
and hlp_value=compute_per_yr_c)


select b.case_no, g.hlp_text,b.soc_Sec_no, ee_hire_dt, ee_term_dt,ee_rehire_dt,last_anniversary, 
case
when last_anniversary>last_plan_anniversary then coalesce(a.YTD_EMPL_HRS,0)
else coalesce(a.YTD_plan_HRS,0) end as load_asof

from  last_ann b, last_plan_ann h 
left join $Business_line.EE_HRS_WORKED a on a.case_no=b.case_no and a.soc_Sec_no=b.soc_Sec_no
and a.PERIOD_END_DT in (select max(period_end_dt) from $Business_line.ee_hrs_worked c where c.case_no=a.case_no and c.soc_Sec_no=a.soc_Sec_no and period_end_dt>last_anniversary  and period_end_dt>last_plan_anniversary)



left join vest_comp_period g on account_no=b.case_no
where b.case_no not in (select account_no from TPA_CHOICE)
and b.case_no=h.case_no)
select case_no, soc_Sec_no, load_asof as hours, current date as load_date

 from current_hours
where load_asof>0

------------
;

with current_hours as(
with
 last_ann as
( with hire_date as
(select case_no, soc_Sec_no, case
when substr(ee_hire_dt,5,4)='0229' then substr(ee_hire_dt,1,4)||'0228' else ee_hire_dt end as ee_hire_dt
from $Business_line.employee where case_no like '$CASE %')

select a.case_no, a.soc_Sec_no,a.ee_hire_dt,ee_term_dt,ee_rehire_dt,
case when cast(year(current_Date)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) <current date then cast(year(current_Date)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date)
else cast((year(current_Date)-1)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) end as last_anniversary
,cast(cast(year(current_Date)-1 as varchar)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) as prior_yr_ann

from $Business_line.EMPLOYEE a
join hire_date b on b.case_no=a.case_no and b.soc_Sec_no=a.soc_Sec_no
where a.case_no like '$CASE%'
),

last_plan_ann as
(
select case_no, cast(cast(year(current date)-1 as varchar)||'-'||substr(pye_dt,1,2)||'-'||substr(pye_dt,3,2)as date) as last_plan_anniversary
from $Business_line.case_data 
where case_no like '$CASE %'),

	TPA_CHOICE
AS (
	SELECT 
	A.ACCOUNT_NO
	FROM PENSION.PLAN_PROV_GRP A
	JOIN PENSION.PLAN_PROVISION C ON A.ENRL_PROV_GRP_I = C.ENRL_PROV_GRP_I
	JOIN PENSION.OUTSRC_SERVICE D ON C.PROVISION_I = D.OUTSRC_I
		AND SERV_TYP_C = 25
		AND SERV_OFFERING_C = 1
	JOIN PENSION.OUTSRC_TPA_CHOICE_DET E ON D.OUTSRC_I = E.OUTSRC_I
		AND TPA_TYP_C = 1
		AND ALLOW_IND_C = '1'
where a.account_no like '$CASE %'),

Vest_comp_period as
(
select account_no, compute_per_yr_c, related_grp_typ_c, hlp_text
from pension.GEN_VESTING_DATA c,pension.plan_provision a, pension.plan_prov_grp  b, $Business_line.helper2 d
where vest_i =provision_i
and account_no like '$CASE%'
 and a.enrl_prov_grp_i=b.enrl_prov_grp_i 
and hlp_code='VCOMPCD'
and hlp_value=compute_per_yr_c)


select b.case_no, g.hlp_text,b.soc_Sec_no, ee_hire_dt, ee_term_dt,ee_rehire_dt,last_anniversary, last_plan_anniversary,

case 
when last_anniversary>last_plan_anniversary then coalesce(i.YTD_plan_hrs,0)
else 0 end as hours

from  last_ann b, last_plan_ann h 

left join $Business_line.EE_HRS_WORKED i on i.case_no=b.case_no and i.soc_Sec_no=b.soc_Sec_no
and i.PERIOD_END_DT in (select max(period_end_dt) from $Business_line.ee_hrs_worked c where c.case_no=i.case_no and c.soc_Sec_no=i.soc_Sec_no and period_end_dt<last_anniversary and period_end_dt>last_plan_anniversary)



left join vest_comp_period g on account_no=b.case_no
where b.case_no not in (select account_no from TPA_CHOICE)
and b.case_no=h.case_no)
select case_no, soc_Sec_no,  hours, last_plan_anniversary+1 as load_date

 from current_hours
where hours>0
;
-------------------------

with current_hours as(
with
 last_ann as
( with hire_date as
(select case_no, soc_Sec_no, case
when substr(ee_hire_dt,5,4)='0229' then substr(ee_hire_dt,1,4)||'0228' else ee_hire_dt end as ee_hire_dt
from $Business_line.employee where case_no like '$CASE %')

select a.case_no, a.soc_Sec_no,a.ee_hire_dt,ee_term_dt,ee_rehire_dt,
case when cast(year(current_Date)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) <current date then cast(year(current_Date)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date)
else cast((year(current_Date)-1)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) end as last_anniversary
,cast(cast(year(current_Date)-1 as varchar)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) as prior_yr_ann

from $Business_line.EMPLOYEE a
join hire_date b on b.case_no=a.case_no and b.soc_Sec_no=a.soc_Sec_no
where a.case_no like '$CASE%'
),

last_plan_ann as
(
select case_no, cast(cast(year(current date)-1 as varchar)||'-'||substr(pye_dt,1,2)||'-'||substr(pye_dt,3,2)as date) as last_plan_anniversary
from $Business_line.case_data 
where case_no like '$CASE %'),

	TPA_CHOICE
AS (
	SELECT 
	A.ACCOUNT_NO
	FROM PENSION.PLAN_PROV_GRP A
	JOIN PENSION.PLAN_PROVISION C ON A.ENRL_PROV_GRP_I = C.ENRL_PROV_GRP_I
	JOIN PENSION.OUTSRC_SERVICE D ON C.PROVISION_I = D.OUTSRC_I
		AND SERV_TYP_C = 25
		AND SERV_OFFERING_C = 1
	JOIN PENSION.OUTSRC_TPA_CHOICE_DET E ON D.OUTSRC_I = E.OUTSRC_I
		AND TPA_TYP_C = 1
		AND ALLOW_IND_C = '1'
where a.account_no like '$CASE %'),

Vest_comp_period as
(
select account_no, compute_per_yr_c, related_grp_typ_c, hlp_text
from pension.GEN_VESTING_DATA c,pension.plan_provision a, pension.plan_prov_grp  b, $Business_line.helper2 d
where vest_i =provision_i
and account_no like '$CASE%'
 and a.enrl_prov_grp_i=b.enrl_prov_grp_i 
and hlp_code='VCOMPCD'
and hlp_value=compute_per_yr_c)


select b.case_no, g.hlp_text,b.soc_Sec_no, ee_hire_dt, ee_term_dt,ee_rehire_dt,last_anniversary, last_plan_anniversary,

coalesce(j.ytd_empl_hrs,0) as hours

from  last_ann b, last_plan_ann h 

left join $Business_line.EE_HRS_WORKED j on j.case_no=b.case_no and j.soc_Sec_no=b.soc_Sec_no
and j.PERIOD_END_DT in (select max(period_end_dt) from $Business_line.ee_hrs_worked c where c.case_no=j.case_no and c.soc_Sec_no=j.soc_Sec_no  and period_end_dt<last_plan_anniversary and period_end_dt>prior_yr_ann)



left join vest_comp_period g on account_no=b.case_no
where b.case_no not in (select account_no from TPA_CHOICE)
and b.case_no=h.case_no)
select case_no, soc_Sec_no,  hours, last_plan_anniversary as load_date 
 from current_hours
where hours>0
;
-----------------------------
with current_hours as(
with
 last_ann as
( with hire_date as
(select case_no, soc_Sec_no, case
when substr(ee_hire_dt,5,4)='0229' then substr(ee_hire_dt,1,4)||'0228' else ee_hire_dt end as ee_hire_dt
from $Business_line.employee where case_no like '$CASE %')

select a.case_no, a.soc_Sec_no,a.ee_hire_dt,ee_term_dt,ee_rehire_dt,
case when cast(year(current_Date)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) <current date then cast(year(current_Date)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date)
else cast((year(current_Date)-1)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) end as last_anniversary
,cast(cast(year(current_Date)-1 as varchar)||'-'||substr(b.ee_hire_dt,5,2)||'-'||substr(b.ee_hire_dt,7,2) as date) as prior_yr_ann

from $Business_line.EMPLOYEE a
join hire_date b on b.case_no=a.case_no and b.soc_Sec_no=a.soc_Sec_no
where a.case_no like '$CASE%'
),

last_plan_ann as
(
select case_no, cast(cast(year(current date)-1 as varchar)||'-'||substr(pye_dt,1,2)||'-'||substr(pye_dt,3,2)as date) as last_plan_anniversary
from $Business_line.case_data 
where case_no like '$CASE %'),

	TPA_CHOICE
AS (
	SELECT 
	A.ACCOUNT_NO
	FROM PENSION.PLAN_PROV_GRP A
	JOIN PENSION.PLAN_PROVISION C ON A.ENRL_PROV_GRP_I = C.ENRL_PROV_GRP_I
	JOIN PENSION.OUTSRC_SERVICE D ON C.PROVISION_I = D.OUTSRC_I
		AND SERV_TYP_C = 25
		AND SERV_OFFERING_C = 1
	JOIN PENSION.OUTSRC_TPA_CHOICE_DET E ON D.OUTSRC_I = E.OUTSRC_I
		AND TPA_TYP_C = 1
		AND ALLOW_IND_C = '1'
where a.account_no like '$CASE %'),

Vest_comp_period as
(
select account_no, compute_per_yr_c, related_grp_typ_c, hlp_text
from pension.GEN_VESTING_DATA c,pension.plan_provision a, pension.plan_prov_grp  b, $Business_line.helper2 d
where vest_i =provision_i
and account_no like '$CASE%'
 and a.enrl_prov_grp_i=b.enrl_prov_grp_i 
and hlp_code='VCOMPCD'
and hlp_value=compute_per_yr_c)


select b.case_no, g.hlp_text,b.soc_Sec_no, ee_hire_dt, ee_term_dt,ee_rehire_dt,last_anniversary, last_plan_anniversary,

coalesce(d.ytd_plan_hrs,0) as hours
from  last_ann b, last_plan_ann h 

--
left join $Business_line.EE_HRS_WORKED d on d.case_no=b.case_no and d.soc_Sec_no=b.soc_Sec_no
and d.PERIOD_END_DT in (select max(period_end_dt) from $Business_line.ee_hrs_worked c where c.case_no=d.case_no and c.soc_Sec_no=d.soc_Sec_no and period_end_dt>last_plan_anniversary-1 year and period_end_dt<prior_yr_ann) 



left join vest_comp_period g on account_no=b.case_no
where b.case_no not in (select account_no from TPA_CHOICE)
and b.case_no=h.case_no)
select case_no, soc_Sec_no,  hours, last_plan_anniversary-1 year +1 as load_date  
 from current_hours
where hours>0
```

## Output / What to Look For

- Four result sets, each keyed to a different load date: current date, last plan anniversary +1, last plan anniversary, last plan anniversary -1 year +1
- Skips plans using TPA Choice (hours not maintained by TA for these)
- `hlp_text` in the output indicates the plan's vesting computation period (hours vs elapsed time)

## Related Queries

- [[internal-conversion-base]] — hours logic is identical to statements 12–15 of the base extract
- [[day-of-liquidation-v1]] / [[day-of-liquidation-v2]] — include same hours logic

## See Also

- [[internal-conversion]]
- [[conv-file]]
- [[lm-dc]]
- [[aqt]]
- [[p3]]
