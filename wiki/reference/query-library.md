---
title: "SQL Query Library"
type: reference
tags: [reference, sql, queries, verification, informatica]
created: 2026-07-08
updated: 2026-07-08
sources: 6
status: active
---

# SQL Query Library

Every SQL query and named .sql file the DC sources mention, with verbatim SQL where a source actually contains it.

A full DC query library was flagged as "to be documented separately" — many verification queries are referenced across sources but not yet captured (extra questions). This page collects what exists so far.

## Source Mapping Query

Pulls source setup for a plan. From the training notebook, verbatim:

```sql
select a.SRC_I, a.SRC_S, a.REPORT_1_NM, a.REPORT_2_NM, a.SP_REPORT_1_NM, a.SP_REPORT_2_NM, doc_nm
from corp.plan_src_detail a, pension.plan_provision b, pension.plan_prov_grp c
where A.SRC_I = B.RELATED_I
  AND B.PROV_TYP_C = 1019
  and b.enrl_prov_grp_i = c.enrl_prov_grp_i
  and account_no = '[ACCOUNT_NO]'
```

## TO_BASIS.sql

Verifies that everyone you are loading basis for exists in the system, then checks the loaded basis and Roth first dates (loading-basis doc; official file path unconfirmed). Verbatim SQL preserved in the archived main dump (`_archive/main dump/TO_BASIS.md.txt`) — case number and date are per-plan placeholders:

```sql
--RUN AND EXPORT TO TO_BASIS REPORT.  USE TO VERIFY EVERYONE THAT YOU ARE LOADING BASIS FOR IS IN THE SYSTEM.
SELECT CASE_NO , SOC_SEC_NO
FROM CORP.EMPLOYEE
WHERE CASE_NO = 'QK63283   00053'
;

--**** AFTER LOADING PULLS IN BASIS AND ROTH 1ST DATE
SELECT A.CASE_NO , A.SOC_SEC_NO , RTH_CTRB_FST_YR, RTH_HRDSHP_CTRB_A, RTH_TAXFREE_CTRB_A,
       RTH_TAXFREE_ROLL_A, PRE87_TAX_BAS_AMT , POST86_TAX_BAS_AMT , TYP6_TOT_WD_AMT ,
       TYP234_TOT_WD_AMT , CORP_TYP6_CTRB_AMT, PRE89_TYP3_BAS_AMT, POST88TYP3_BAS_AMT,
       DEEMED_LOAN_AMT, EE_BEG_BAL_DT
FROM CORP.EE_BASIS A, CORP.EMPLOYEE B
WHERE A.CASE_NO = 'QK63283   00053'
  AND A.SOC_SEC_NO NOT LIKE '%T%'
  AND A.CASE_NO = B.CASE_NO
  AND A.SOC_SEC_NO = B.SOC_SEC_NO
  AND A.EE_BEG_BAL_DT = '20251231'
;

--IF Roth Basis is loaded, Verfiy the Roth 1st Date Loaded.
--If there is output that means ppts with basis is missing a first roth date.
SELECT CASE_NO , SOC_SEC_NO , RTH_CTRB_FST_YR
FROM CORP.EMPLOYEE
WHERE CASE_NO = 'QK63283   00053'
  AND RTH_CTRB_FST_YR = '0'
  AND SOC_SEC_NO IN (SELECT SOC_SEC_NO
                     FROM CORP.EE_BASIS
                     WHERE CASE_NO = 'QK63283   00053')
;

--PULLS THE FULL TABLE DATA
SELECT *
FROM CORP.EE_BASIS
WHERE CASE_NO LIKE 'QK63283_  00053%'
  AND SOC_SEC_NO NOT LIKE '%T%'
;
```

## TO Census.sql

Verifies whether census data already exists before loading, and supports individual participant research (census-data doc; official file path unconfirmed). The primary query, verbatim from the archived main dump (`_archive/main dump/TO CENSUS.md.txt`):

```sql
-- VERIFY IF DATA EXISTS IN TABLE BEFORE LOADING; USE TO DO INDIVIDUAL PPT RESEARCH TOO.
SELECT *
FROM CORP.EMPLOYEE
WHERE CASE_NO LIKE 'QK63283_  00073%'
```

The same dump file contains the full census demographic pull (CORP.EMPLOYEE joined to CORP.EE_BEN_ADDRESS on PAYEE_TYP_CD = '1', with date fields reformatted from YYYYMMDD) plus missing-data checks for: class codes (CLASS_I = 0), divisions (EE_DIV_NO = ''), employee numbers (EE_NO = ''), term dates missing a term reason code (via PENSION.PE_DIV_EMPL_DATA / PENSION.GET_PART_ENRL), gender codes (EE_SEX_CD = ''), and payroll frequency (EE_PAYROLL_FREQ_CD = ''). See the dump file for the full verbatim text.

## Hardship Suspension Query

Hardship suspension dates are loaded via SQL — load only end or re-entry dates (loading-basis doc). **The actual SQL is referenced but not documented in any source; location unconfirmed.**

## Day-of-Wire SQL Insert Sequence

The Informatica Day of Wire workflow (updated April 8, 2020) has a documented 11-step SQL verification process. It inserts into, in sequence: **CASE_REMIT, FIN_ACT_PEND, FIN_ACT_ELEC, BILL_REMIT_DETAIL** (training notebook). The full 11-step SQL text is in the training notebook, not reproduced in the wiki sources.

## MM-Enhanced Plans (ROC Won't Work)

Plans coded as "MM Enhanced" (Extended Model) cannot use the standard ROC process for dummy account reversal. They require specific SQL updates to `CORP.transact_detail` plus a separate INSERT statement, submitted via a Production Support ticket (training notebook). The specific UPDATE/INSERT statements are not reproduced in the sources.

## Informatica Audit SQL

Informatica audits cover balance audits (plan and participant level), allocation audits, and vesting comparisons (main dump: Informatica Audits summary). **No audit SQL text is present in the sources; location unconfirmed.**

## See Also

- [[source-mapping]]
- [[informatica]]
- [[liquidation-day]]
- [[balance-import]]
- [[p2]]
- [[p3]]
