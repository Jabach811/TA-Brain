---
title: "Copy E-Statement Elections"
type: analysis
tags: [query, sql, internal-conversion, e-statement, election, service-data]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [PENSION.PART_SERVICE_DATA, PENSION.PLAN_PROV_GRP, PENSION.PART_ENRL, PENSION.PERSON_SEARCH, estatement]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Copy E-Statement Elections

Scratch-table procedure to copy e-statement elections (SERV_TYP_C 7001) from the old case to the new case.

> [!warning]
> Creates and populates a local `estatement` table, then INSERTs into `PENSION.PART_SERVICE_DATA`. Step order matters — run the UPDATEs to point at the new case before the final INSERT.

## Purpose

E-statement preference (paperless statements) is stored in `PENSION.PART_SERVICE_DATA` with `SERV_TYP_C = 7001`. When a case internally converts, the participant's e-statement opt-in doesn't automatically carry over. This script:

1. Pulls old-case e-statement rows into a scratch table `estatement`.
2. Rewrites `ACCOUNT_NO` to the new case.
3. Rewrites `PART_ENRL_I` and `ENRL_PROV_GRP_I` using the new-case enrolment.
4. Inserts into `PART_SERVICE_DATA` with `EFF_D = '2009-01-01'` and a hardcoded user ID.

## When to Run

Post-load, after new-case enrolment records exist (so `PART_ENRL_I` lookups resolve). Before statement-generation cycle.

## Parameters

Hardcoded:
- **Old case**: `TT069217  00001`
- **New case**: `TT069215  00001`
- `EFF_D = '2009-01-01'` — set to the contract effective date of the new case
- `USER_I = 'UYC019'` — replace with running user's RACF ID
- `ENRL_GRP_TYP_C = 361` — EE-money enrolment group

Update all four fields before running.

## Notes

- `SERV_TYP_C = 7001` is the e-statement service-type code.
- `SERV_STAT_C` carries the opt-in status (typically 1 = opted in, 0 = opted out).
- Final `MOD_TS` uses `current timestamp` so audit trail shows the conversion date.
- The scratch table is dropped at the start — safe to re-run.

## Tables Used

- `PENSION.PART_SERVICE_DATA` — destination.
- `estatement` — local scratch table created inline.
- `PENSION.PLAN_PROV_GRP` / `PENSION.PART_ENRL` / `PENSION.PERSON_SEARCH` — used in the enrolment-ID lookup UPDATE.

## SQL

```sql
select *
from pension.part_service_data
where account_no='TT069217  00001'
and Serv_typ_c =7001 

drop table estatement;

create table estatement
(part_enrl_i dec(17), ENRL_PROV_GRP_I dec (17), ACCOUNT_NO char(20), SOC_SEC_NO char(11), SERV_TYP_C smallint, SERV_STAT_C smallint, EFF_D date, USER_I char (10))

insert into estatement
( ACCOUNT_NO,SOC_SEC_NO, SERV_TYP_C, SERV_STAT_C)
select ACCOUNT_NO,SOC_SEC_NO, SERV_TYP_C, SERV_STAT_C
from pension.part_service_data
where account_no='TT069217  00001'
and Serv_typ_c =7001 

select * from estatement

update estatement set account_no='TT069215  00001'

update estatement se
set PART_ENRL_I = (SELECT PART_ENRL_I
                   FROM   pension.PLAN_PROV_GRP A,
                          pension.PART_ENRL B,
                          pension.PERSON_SEARCH C
                    WHERE ACCOUNT_NO = 'TT069215  00001'
                      AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
                      AND B.PART_I = PERSON_I and enrl_grp_typ_c=361
                      AND C.SOC_SEC_NO = SE.SOC_SEC_NO
                    ),
     enrl_prov_grp_i= (select enrl_prov_grp_i from pension.plan_prov_grp b where b.account_no=se.account_no)

insert into pension.part_service_data
      (PART_ENRL_I, ENRL_PROV_GRP_I, ACCOUNT_NO, SOC_SEC_NO, SERV_TYP_C, SERV_STAT_C, EFF_D,         USER_I, MOD_TS)
select PART_ENRL_I, ENRL_PROV_GRP_I, ACCOUNT_NO, SOC_SEC_NO, SERV_TYP_C, SERV_STAT_C, '2009-01-01', 'UYC019', current timestamp
from estatement


--where part_enrl_i is null
```

## Output / What to Look For

Final SELECT on `PART_SERVICE_DATA` for the new case with `SERV_TYP_C = 7001` should equal the old-case pre-load row count.

## Related Queries

- [[saveexpress-copy]] — similar pattern for Save Express elections
- [[email-copy]] — similar pattern for email / security data

## See Also

- [[internal-conversion]]
- [[e-statement-election]]
