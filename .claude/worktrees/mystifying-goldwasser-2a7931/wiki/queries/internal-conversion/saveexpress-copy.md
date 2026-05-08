---
title: "Copy Save Express Elections"
type: analysis
tags: [query, sql, internal-conversion, save-express, auto-increase, auto-def]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [PENSION.PART_AUTO_DEF, PENSION.PLAN_DEFERRAL_GRP, PENSION.PLAN_PROV_GRP, PENSION.PART_ENRL, PENSION.PERSON_SEARCH, PENSION.P2_DIV_XREF, CORP.VEMPLOYEE, SAVEXPRESSCOPY]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Copy Save Express Elections

Excel-driven scratch-table procedure to migrate Save Express (auto-increase) deferral elections across cases. Broken into pull → upload → rewrite IDs → insert.

> [!warning]
> Requires intermediate Excel export and re-upload. Performs real INSERT into `PENSION.PART_AUTO_DEF`. Verify the final SELECT row count before closing the session.

## Purpose

Save Express is Transamerica's auto-increase / scheduled-deferral-step-up feature, stored in `PENSION.PART_AUTO_DEF`. When plans internally convert, auto-increase schedules don't copy automatically — this is the workaround.

Steps:

1. **Extract** current auto-increase elections from the old case with division and source context.
2. **Export to Excel**, manually update the account number and src_i to new-case values.
3. **Re-upload** into scratch table `SAVEXPRESSCOPY`.
4. **UPDATE** the scratch table with new-case `ENRL_PROV_GRP_I`, `PART_ENRL_I`, `DEF_GRP_I`, `DIV_I`, and a per-conversion `EFF_D`.
5. **INSERT** into `PENSION.PART_AUTO_DEF` with `STAT_C = 0` (active), `UPD_REASON_C = 'B'`, user ID, and current timestamp.
6. **Verify** by re-selecting active auto-def rows on the new case.

## When to Run

After new-case enrolment records exist. Before the first payroll cycle where auto-increase could trigger.

## Parameters

Hardcoded:
- **Old case**: `QK62132   00001`
- **New case**: populated from the Excel re-upload (manual step)
- `EFF_D = '2009-01-01'` — set to contract effective date
- `USER_I = 'UYN024'` — replace with running user's RACF ID
- `UPD_REASON_C = 'B'` — batch / conversion reason code
- `RELATED_GRP_TYP_C = 361` — EE-money provision group

## Notes

- `STAT_C = 0` filters active auto-def rows; terminated or cancelled schedules have STAT_C > 0 and won't be migrated.
- `DEF_GRP_I` is resolved through `PLAN_DEFERRAL_GRP` joined by the target `SRC_I` — this is the election-group anchor on the new case.
- `DIV_I` / `ORG_I` come from `P2_DIV_XREF` via the participant's employer-supplied division code.
- The scratch table is dropped at the start — safe to re-run.

## Tables Used

- `PENSION.PART_AUTO_DEF` — destination auto-increase elections.
- `SAVEXPRESSCOPY` — local scratch table (created inline).
- `PENSION.PLAN_DEFERRAL_GRP`, `PENSION.PLAN_PROV_GRP`, `PENSION.PART_ENRL`, `PENSION.PERSON_SEARCH` — ID lookups.
- `PENSION.P2_DIV_XREF` — division-to-org mapping.
- `CORP.VEMPLOYEE` — participant division.

## SQL

```sql
---Download the following into excel, update the case and src_i 

SELECT   a.part_enrl_i,a.enrl_prov_grp_i,  a.ACCOUNT_NO, a.SOC_SEC_NO, a.DEF_ADJ_P, a.DEF_ADJ_A, 
         a.SRC_C, a.DEF_GRP_I, b.SRC_I, a.DIV_I, 
         COALESCE (Div.ORG_I,0)  AS org_i, 
         coalesce (Div.DIV_NO,'0')  AS div_no 
FROM     (SELECT case_no, org_i, div_no
			FROM Pension.p2_div_xref
 			WHERE CASE_NO='QK62132   00001' 
			GROUP BY case_no, org_i, div_no) Div
         LEFT OUTER JOIN PENSION.PART_AUTO_DEF a ON Div.CASE_NO=a.ACCOUNT_NO
         LEFT OUTER JOIN CORP.VEMPLOYEE ee ON Div.DIV_NO=ee.EE_DIV_NO, 
         PENSION.PLAN_DEFERRAL_GRP b 
WHERE    ee.case_no=a.account_no
AND      ee.SOC_SEC_NO=a.SOC_SEC_NO 
AND      a.ENRL_PROV_GRP_I=b.ENRL_PROV_GRP_I 
AND      a.DEF_GRP_I=b.DEF_GRP_I 
AND      a.ACCOUNT_NO = 'QK62132   00001' 
AND      a.STAT_C = 0

---------------------------------------------------------------

drop table SAVEXPRESSCOPY;
--
CREATE TABLE SAVEXPRESSCOPY
(PART_ENRL_I DEC(17), ENRL_PROV_GRP_I DEC(17),ACCOUNT_NO CHAR(20), SOC_sEC_NO CHAR(11), EFF_D DATE, DEF_ADJ_P DEC(6,3), DEF_ADJ_A DEC(15,2), SRC_C CHAR(1), DEF_GRP_I DEC(17), DIV_I DEC(17) , ee_div_no char(4),src_i dec(17))
--
--upload to SAVEXPRESSCOPY the following fields:
--
--NEW account number, soc_Sec_no, def_adj_p,def_adj_a and src_i

------------------------------------------------------------------------------

select * from savexpresscopy

update savexpresscopy a 
set ee_div_no= (select ee_div_no from corp.vemployee b where case_no=account_no and a.soc_sec_no=b.soc_sec_no)


update savexpresscopy a
set enrl_prov_grp_i = (select distinct enrl_prov_grp_i from pension.plan_prov_grp b where a.account_no=b.account_no and RELATED_GRP_TYP_C = 361),

part_enrl_i= (select part_enrl_i from pension.part_enrl b, pension.person_search c, pension.plan_prov_grp d
where d.account_no=a.account_no and part_i=person_i and d.enrl_prov_grp_i=b.enrl_prov_grp_i and a.soc_Sec_no=c.soc_Sec_no
and RELATED_GRP_TYP_C = 361),

eff_d='2009-01-01', -- set this date to the contact effective date

def_grp_i = (select def_grp_i from pension.plan_deferral_grp b, pension.plan_prov_grp c
where b.enrl_prov_grp_i=c.enrl_prov_grp_i and b.src_i=a.src_i),

div_i = (select org_i from pension.p2_div_xref b
where b.case_no=a.account_no and a.ee_div_no=b.div_no)

----------------------------------------------------------------------------------

insert into pension.part_auto_def
( PART_ENRL_I, ENRL_PROV_GRP_I, ACCOUNT_NO, SOC_SEC_NO, EFF_D, DEF_ADJ_P, DEF_ADJ_A, STAT_C, SRC_C, DEF_GRP_I, UPD_REASON_C, USER_I, MOD_TS, DIV_I)

select PART_ENRL_I, ENRL_PROV_GRP_I, ACCOUNT_NO, SOC_SEC_NO, EFF_D, DEF_ADJ_P, DEF_ADJ_A, 0, SRC_C, DEF_GRP_I, 'B', 'UYN024', current timestamp, DIV_I

from savexpresscopy

-------------------------------------------------------------------------
select *
from pension.part_auto_def
where account_no='QK62132   00001'
and stat_c=0
```

## Output / What to Look For

Final SELECT on new case `PART_AUTO_DEF` with `STAT_C = 0` should match the pre-load row count from the initial extract.

## Related Queries

- [[estatement-copy]]
- [[email-copy]]
- [[internal-conversion-deferrals]]

## See Also

- [[internal-conversion]]
- [[save-express]]
- [[auto-increase]]
