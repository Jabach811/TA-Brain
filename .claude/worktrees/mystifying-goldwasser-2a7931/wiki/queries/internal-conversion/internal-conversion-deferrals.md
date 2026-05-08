---
title: "Internal Conversion — Deferrals Extract"
type: analysis
tags: [query, sql, internal-conversion, deferrals, default-status]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [TDA.EMPLOYEE, TDA.EE_BEN_ADDRESS, TDA.EE_BALANCE, TDA.HELPER2, PENSION.PART_DEF_DATA, PENSION.PLAN_PROV_GRP, PENSION.PLAN_SRC_DETAIL, PENSION.PART_PPA_DEFAULT]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Internal Conversion — Deferrals Extract

Large composite extract joining participant indicatives, address deliverability, balance, active deferrals, and PPA default status — the deferral-focused companion to the participant base.

## Purpose

Pulls one row per participant showing their current deferral election (percent or amount, effective date), address status, most recent balance, participant status, and whether they are currently in auto-enroll default (QDIA). Used to decide which deferrals carry forward and which participants need re-election letters on the surviving case.

## When to Run

Pre-liquidation, alongside [[internal-conversion-base]]. Re-run right before the load to catch last-minute deferral changes.

## Parameters

Hardcoded to old case `TT069303  00001`. Update:
- Outer `WHERE CASE_NO = 'TT069303  00001'` in the participant extract
- `B.ACCOUNT_NO = 'TT069303  00001'` in the deferral join
- `CASE_NO LIKE 'TT069303_  00001%'` in the balance subquery
- Balance snapshot date `EFF_DT = '20081130'` — bump to the appropriate prior month-end

## Notes

- SSN filter `LIKE '%-%-%'` excludes placeholder / dummy SSNs and `NOT LIKE '%P%'` excludes participants flagged with 'P' markers.
- `B.RELATED_GRP_TYP_C = 361` is the EE-money provision group (standard filter across internal-conversion queries).
- `C.SRC_S = 6` filters the deferral join to a specific source schedule — adjust per plan.
- `HELPER2` lookups: `HLP_CODE = '150211'` decodes participant status; `HLP_CODE = '158101'` decodes address deliverability (USPS / non-deliverable).
- `default_ind` derived from `PART_PPA_DEFAULT.DEFAULT_STAT_C` where `ENRL_SERV_TYP_C = 1` (deferral service, not election).

## Tables Used

- `TDA.EMPLOYEE` — participant indicatives (hire, term, status).
- `PENSION.PART_DEF_DATA` — active deferral rows (STAT_C = 'A').
- `PENSION.PLAN_PROV_GRP` — provision-group anchor (RELATED_GRP_TYP_C = 361).
- `PENSION.PLAN_SRC_DETAIL` — source schedule filter (SRC_S = 6).
- `TDA.EE_BEN_ADDRESS` — current mailing address (PAYEE_TYP_CD = '1').
- `TDA.EE_BALANCE` — month-end balance snapshot, summed per participant.
- `PENSION.PART_PPA_DEFAULT` — PPA / auto-enroll default status flag.

## SQL

```sql
SELECT  A.CASE_NO, A.SOC_SEC_NO, A.EE_LAST_NM, A.EE_FST_MID_NM,
   A.EE_HIRE_DT, A.EE_TERM_DT, 
   A.PPT_STATUS,
   COALESCE(E.HLP_TEXT, 'NON-DELIVERABLE') AS ADDRESS_STATUS,
   COALESCE(C.STREET_NM, '') AS STREET_NM,
   COALESCE(C.ADDR_LINE_2_T, '') AS ADDR_LINE_2_T,
   COALESCE(C.CITY_NM, '') AS CITY_NM,
   COALESCE(C.ST_CD, '') AS ST_CD,
   COALESCE(C.ZIP_CD, '') AS ZIP_CD,
   COALESCE(D.BALANCE, 0.00) AS BALANCE,
   COALESCE(B.EFF_D, '') AS DEF_DEFF_DT,
   COALESCE(B.DEF_P, 0.00) AS DEF_PCT,
   COALESCE(B.DEF_A, 0.00) AS DEF_AMT,
   COALESCE(
  (case 
   when F.DEFAULT_STAT_C=0  and ENRL_SERV_TYP_C=1 then 'Not in Default'
   when F.default_stat_c=1 and ENRL_SERV_TYP_C=1 then 'In Default'
   else 'NULL' end), 'NULL') as default_ind
FROM
   (
SELECT  A.CASE_NO, A.SOC_SEC_NO, A.EE_LAST_NM, A.EE_FST_MID_NM,
   A.EE_HIRE_DT, A.EE_TERM_DT, 
   COALESCE(B.HLP_TEXT, '') AS PPT_STATUS
FROM
   (
SELECT    CASE_NO, 
      SOC_SEC_NO,
      EE_LAST_NM, 
      EE_FST_MID_NM,
      EE_HIRE_DT, 
      EE_TERM_DT,
      PART_STAT_CD
FROM    TDA.EMPLOYEE
WHERE    CASE_NO = 'TT069303  00001'
AND   SOC_SEC_NO LIKE '%-%-%'
AND   SOC_SEC_NO NOT LIKE '%P%'
   ) AS A
LEFT JOIN
   TDA.HELPER2 AS B
ON   A.PART_STAT_CD = B.HLP_VALUE
AND   B.HLP_CODE = '150211'
   ) AS A
LEFT JOIN
   (
SELECT    B.ACCOUNT_NO AS CASE_NO, 
      D.SOC_SEC_NO,
      D.EE_LAST_NM, 
      D.EE_FST_MID_NM,
      D.EE_HIRE_DT, 
      D.EE_TERM_DT,
      CAST(A.EFF_D AS CHAR(10)) AS EFF_D, 
      A.DEF_P,
      A.DEF_A
FROM    PENSION.PART_DEF_DATA A,
      PENSION.PLAN_PROV_GRP B,
      PENSION.PLAN_SRC_DETAIL C,
      TDA.EMPLOYEE D
WHERE    A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
AND     A.SRC_I = C.SRC_I
AND     A.SOC_SEC_NO = D.SOC_SEC_NO
AND     B.ACCOUNT_NO = D.CASE_NO
AND     B.ACCOUNT_NO = 'TT069303  00001'
AND     B.RELATED_GRP_TYP_C = 361
AND     A.STAT_C = 'A'
AND     C.SRC_S = 6
   ) AS B
ON   A.CASE_NO = B.CASE_NO
AND   A.SOC_SEC_NO = B.SOC_SEC_NO
LEFT JOIN
   TDA.EE_BEN_ADDRESS AS C
ON   A.CASE_NO = C.CASE_NO
AND   A.SOC_SEC_NO = C.SOC_SEC_NO
AND   C.PAYEE_TYP_CD = '1'
LEFT JOIN
      (
SELECT   SOC_SEC_NO, SUM(BAL_AMT) AS BALANCE
FROM    TDA.EE_BALANCE
WHERE    CASE_NO LIKE 'TT069303_  00001%'
AND     EFF_DT = '20081130'
AND     SOC_SEC_NO LIKE '%-%-%'
GROUP BY  SOC_SEC_NO
      ) AS D
ON     A.SOC_SEC_NO = D.SOC_SEC_NO
LEFT JOIN
   TDA.HELPER2 AS E
ON   C.ADDRESS_FLAG_CD = E.HLP_VALUE
AND   E.HLP_CODE = '158101'
left join
pension.part_ppa_default as F
on a.CASE_no=F.account_no and a.soc_Sec_no=F.soc_Sec_no
and ENRL_SERV_TYP_C=1
FOR FETCH ONLY WITH UR;
```

## Output / What to Look For

- `DEF_DEFF_DT`, `DEF_PCT`, `DEF_AMT` — the currently active deferral; blank/zero means the participant has no active deferral and will need fresh enrollment.
- `ADDRESS_STATUS` — flag non-deliverable addresses for the communications / re-enrollment kit team.
- `default_ind` — 'In Default' means the participant is currently being defaulted per QDIA; these need special handling on the new case.

## Related Queries

- [[internal-conversion-base]]
- [[new-deferral-report]] — post-load verification report
- [[current-elections]]

## See Also

- [[internal-conversion]]
- [[deferral-election]]
- [[ppa-default-status]]
