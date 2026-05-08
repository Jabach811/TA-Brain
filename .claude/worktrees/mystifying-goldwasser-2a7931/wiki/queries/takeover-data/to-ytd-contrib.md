---
title: "Query: TO_YTD_CONTRIB — Year-to-Date Contribution Audit"
type: query
tags: [query, sql, takeover, ytd-contributions, basis]
used-by-role: [lm-dc, qa]
used-in-process: [[final-takeover-audit]]
aqt-parameters: [CASE_NO]
tables: [PENSION.GET_PLAN_SRC, CORP.CONTRIB_CALENDAR, CORP.CONTRIB_PLAN, PENSION.PART_CONTRIB]
systems: [aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Query: TO_YTD_CONTRIB — Year-to-Date Contribution Audit

Validates year-to-date contribution loads across the three YTD tables: calendar-year (`CONTRIB_CALENDAR`), plan-year (`CONTRIB_PLAN`), and the participant roll-up (`PART_CONTRIB`).

## Purpose

After a YTD contribution file is loaded, confirm: (1) the SSN count and dollar totals on `CONTRIB_CALENDAR` match the file (calendar year); (2) same for `CONTRIB_PLAN` (plan year); (3) every participant has exactly two rows in `PART_CONTRIB` (one CONTRIB_TYP_C=1 calendar, one =2 plan). Also retrieves the plan's source list via `GET_PLAN_SRC` for cross-reference.

## When to Run

Immediately after the YTD contribution file load. Part of the [[final-takeover-audit]].

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| CASE_NO pattern | `PF62026%` | Plan case number prefix |
| REC_DT | `20140929` | Record date — for mergers where participants already exist, filter to only rows loaded today |
| DATE(MOD_TS) | `2014-09-29` | Modification timestamp — same purpose, for `PART_CONTRIB` |

## Tables Used
- `PENSION.GET_PLAN_SRC` — plan source list
- `CORP.CONTRIB_CALENDAR` — YTD by calendar year
- `CORP.CONTRIB_PLAN` — YTD by plan year
- `PENSION.PART_CONTRIB` — participant YTD roll-up (one row per calendar, one per plan)

## SQL

```sql
--YTD CONTRIBUTION AUDIT

-- UPDATE:
	--CASE_NO LIKE 'PF62026%'
	--REGION = CORP
    --UPDATE REC_DT = '20140929' -- IF MERGER
    --UPDATE DATE(MOD_TS) = '2014-09-29' -- use in mergers where ppts already exist on plan


-- USE TO GET SRC_I'S
SELECT ACCOUNT_NO , SRC_I , SRC_S, DOC_NM , REPORT_1_NM , REPORT_2_NM 
FROM PENSION.GET_PLAN_SRC
WHERE ACCOUNT_NO LIKE 'PF62026%'

;
--VERIFY THE PPT COUNT MATCHES YOUR FILE, AND THE AMOUNT
SELECT CASE_NO , COUNT(SOC_SEC_NO)AS SSN_COUNT, SUM (YTD_EXCS_DEF_AMT) AS EXCS_DEF_AMT, SUM (YTD_RFND_INT_AMT) AS RFND_INT_AMT, SUM (TYP1_YTD_CTRB_AMT) AS TYP1_AMT, SUM (TYP2_YTD_CTRB_AMT)AS TYP2_AMT, SUM (TYP3_YTD_CTRB_AMT)AS TYP3_AMT, SUM (TYP4_YTD_CTRB_AMT) AS TYP4_AMT, SUM (TYP5_YTD_CTRB_AMT) AS TYP5_AMT, SUM (TYP6_YTD_CTRB_AMT)AS TYP6_AMT, SUM (TYP7_YTD_CTRB_AMT)AS TYP7_AMT, SUM (TYP8_YTD_CTRB_AMT)AS TYP8_AMT 
FROM CORP.CONTRIB_CALENDAR
WHERE CASE_NO LIKE 'PF62026%'
--AND REC_DT = '20140929' -- use in mergers where ppts already exist on plan
GROUP BY CASE_NO


;
--VERIFY THE PPT COUNT MATCHES YOUR FILE, AND THE AMOUNT
SELECT CASE_NO , COUNT(SOC_SEC_NO)AS SSN_COUNT, SUM(PLAN_YTD_EXCS_AMT) AS EXCS_AMT, SUM(PLAN_YTD_INT_AMT)AS INT_AMT, SUM(TYP1_YTD_PLAN_AMT)AS TYP1_AMT, SUM (TYP2_YTD_PLAN_AMT)AS TYP2_AMT, SUM(TYP3_YTD_PLAN_AMT)AS TYP3_AMT, SUM(TYP4_YTD_PLAN_AMT)AS TYP4_AMT, SUM(TYP5_YTD_PLAN_AMT)AS TYP5_AMT, SUM(TYP6_YTD_PLAN_AMT)AS TYP6_AMT, SUM (TYP7_YTD_PLAN_AMT)AS TYP7_AMT, SUM(TYP8_YTD_PLAN_AMT)AS TYP8_AMT
FROM CORP.CONTRIB_PLAN
WHERE CASE_NO LIKE 'PF62026%'
--AND REC_DT = '20140929'-- use in mergers where ppts already exist on plan
GROUP BY CASE_NO

;
--VERIFY THE PPT COUNT MATCHES YOUR FILE AND AMOUNT.  ALSO VERIFY THERE IS 2 ROWS FOR EACH RECORD ONE FOR CALENDAR AND ONE FOR PLAN
SELECT ACCOUNT_NO,COUNT(SOC_SEC_NO), 
CASE WHEN CONTRIB_TYP_C = 1  THEN 'CALENDAR'
	 WHEN CONTRIB_TYP_C = 2  THEN 'PLAN' END AS CONTRIB_TYP, SUM(CONTRIB_A) AS AMT  
FROM PENSION.PART_CONTRIB
WHERE ACCOUNT_NO LIKE 'PF62026%'
--AND DATE(MOD_TS) = '2014-09-29' -- use in mergers where ppts already exist on plan
GROUP BY ACCOUNT_NO, CONTRIB_TYP_C


-- EXPORT TO FILE THAT WAS LAODED, VERIFY YEAR, AMT
SELECT *
FROM CORP.CONTRIB_CALENDAR
WHERE CASE_NO LIKE 'PF62026%'
--AND REC_DT = '20140929'  -- use in mergers where ppts already exist on plan

;
 --EXPORT TO FILE THAT WAS LAODED, VERIFY YEAR, AMT
SELECT *
FROM CORP.CONTRIB_PLAN
WHERE CASE_NO LIKE 'PF62026%'
--AND REC_DT = '20140929'  -- use in mergers where ppts already exist on plan


;
-- EXPORT TO FILE THAT WAS LAODED, VERIFY YEAR, AMT
SELECT *
FROM PENSION.PART_CONTRIB
WHERE ACCOUNT_NO LIKE 'PF62026%'
--AND DATE(MOD_TS) = '2014-09-29'  -- use in mergers where ppts already exist on plan
```

## Output / What to Look For

- Count from `CONTRIB_CALENDAR` = count from `CONTRIB_PLAN` = distinct SSN count in file.
- `CONTRIB_CALENDAR` `TYPn_YTD_CTRB_AMT` totals tie to the file's contribution-type breakouts.
- `PART_CONTRIB` should show exactly 2 rows per participant: CALENDAR (CONTRIB_TYP_C=1) + PLAN (CONTRIB_TYP_C=2). A single row is a load failure.

## Related Queries
- [[to-basis]]
- [[to-balances]]
- [[get-plan-source]]

## See Also
- [[final-takeover-audit]]
- [[conv-file]]
