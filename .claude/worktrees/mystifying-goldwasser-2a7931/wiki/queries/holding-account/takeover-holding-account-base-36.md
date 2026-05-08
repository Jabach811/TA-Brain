---
title: "Takeover Holding Account — Base 36 (Pension Assets)"
type: analysis
tags: [query, sql, takeover, holding-account, base-36, case-remit, fin-act-pend, bill-remit, p3, 1006]
used-by-role: [lm-dc, cts]
used-in-process: [takeover-holding-account, conversion-booking]
aqt-parameters: []
tables: [CONV_QK62881, CORP.CASE_REMIT, CORP.BILL_REMIT_DETAIL, CORP.EMPLOYEE, CORP.VCASE_REMIT, CORP.VCASE_FUND_DATA, CORP.CONTRACT_FUND_DATA, CORP.PLAN_SRC_DETAIL, CORP.TRANSACT_DET_REM, PENSION.PLAN_PROV_GRP, PENSION.PLAN_PROVISION, PENSION.PLAN_FUND, PENSION.FIN_ACT_PEND, PENSION.FIN_ACT_ELEC, PENSION.PART_ENRL, PENSION.PERSON_SEARCH]
systems: [p3, aqt, data-loader]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Takeover Holding Account — Base 36 (Pension Assets)

15-step procedural conversion-book script to stage incoming takeover assets on a dummy SSN (`999-00-0000`) before they are allocated to real participants. CORP / pension-assets (base 36) flavor.

> [!warning]
> This script issues production INSERTs against `CORP.CASE_REMIT`, `PENSION.FIN_ACT_PEND`, `PENSION.FIN_ACT_ELEC`, and `CORP.BILL_REMIT_DETAIL`. Each step must be run and verified before the next. Change lists (ID, CASE FULL, REG, EFF / CYC DATE, DATE STRING) are documented inline — substitute all before executing.

## Purpose

When takeover assets arrive on the day of conversion, they can't be booked directly to participant accounts until the participant-level data has been loaded. Base 36 holding-account setup gives CTS a landing pad: a conversion-assets table keyed by fund + dummy trans-ref number, with matching rows in `CASE_REMIT`, `FIN_ACT_PEND` / `FIN_ACT_ELEC`, and `BILL_REMIT_DETAIL`. Once participant data arrives, CTS reallocates from dummy SSN `999-00-0000` to real SSNs.

TR_NO `1006` is the "conversion assets in" transaction code.

## When to Run

Day of conversion, on the plan's incoming-wire day, after the trans-ref numbers have been generated in P3.

## Steps (preserved narrative)

1. **Step 1** — Use P3 "Trans Ref Number Generator" in Transactions menu to obtain a trans-ref number for each fund.
2. **Step 2** — Update load template with the trans-ref numbers from step 1.
3. **Step 3** — Drop and create table `CONV_<casefull>` with columns: CASE_NO, PRIOR_FUND_DESC, PRIOR_FUND_NAME, DIA_FUND_DESC, DIA_FUND_NM, ASSETS, DUMMY_TR_REF_NO, SRC_I, FD_PROV_I.
4. **Step 4** — Use Data Loader to upload trans-ref numbers into `CONV_<casefull>` — uncheck `FD_PROV_I` on the mapping tab. Then `DELETE FROM CONV_<casefull> WHERE CASE_NO IS NULL` to clean null rows.
5. **Step 5** — INSERT into `CORP.CASE_REMIT` with TR_NO='1006', STAT_CD='0', the effective / cycle / book dates from the change list, PLAN_YR_DT of the conversion year, and SERVICER_CD copied through.
6. **Verify** — SELECT on `CORP.EMPLOYEE` for the dummy SSN to confirm `999-00-0000` exists.
7. **Step 6** — UPDATE `CONV_<casefull>` setting `FD_PROV_I` via join through `PLAN_PROV_GRP` (RELATED_GRP_TYP_C = 361) and `PLAN_PROVISION` / `PLAN_FUND` (PROV_TYP_C = 15, matched on DIA_FUND_DESC). Also handles RELATED_GRP_TYP_C = 362 sub-group.
8. **Verify** — SELECT for NULL `FD_PROV_I`.
9. **Select sources** — pull available `SRC_I` / `SRC_S` / report names from `PLAN_SRC_DETAIL` / `PLAN_PROVISION` (PROV_TYP_C = 1019) to pick the source for the holding account.
10. **UPDATE** `CONV_<casefull>` `SET SRC_I =` the chosen source's ID.
11. **Step 7** — Verify all `DUMMY_TR_REF_NO` values exist in `VCASE_REMIT`.
12. **Step 8** — INSERT into `PENSION.FIN_ACT_PEND` with `FIN_ACT_TYP_C = 1006`, `CONFIRM_TYP_C = 1006`, `FIN_ACT_STAT_C = 0` (pending), user ID, and `ENRL_PROV_GRP_I` from `PLAN_PROV_GRP`.
13. **Step 9** — INSERT into `PENSION.FIN_ACT_ELEC` with ELEC_P = 100, AMT_TYP_C = '2', joining the previous step's FIN_ACT_PEND rows by TR_REF_NO.
14. **Step 10** — INSERT into `CORP.BILL_REMIT_DETAIL` to dummy SSN `999-00-0000`, with `CTRB_TYP_CD = '5'` (change per plan-source, usually matches SRC_S), sourcing `ENRL_PROV_GRP_I` / `PART_ENRL_I` from `PLAN_PROV_GRP` + `PART_ENRL` + `PERSON_SEARCH` (ENRL_GRP_TYP_C = 361).
15. **Step 11** — Verify SSN `999-00-0000` exists on the plan and CTRB_TYP_CD matches a valid source.
16. **Step 12** — Verify all funds are active and contributions allowed via `VCASE_FUND_DATA` + `CONTRACT_FUND_DATA` — CORP uses SUBSTR(CASE_NO,1,7), NFP uses SUBSTR(CASE_NO,1,8).
17. **Step 13** — Sum-match verification: `CASE_REMIT.REMIT_AMT` = `CONV_<casefull>.ASSETS` = `BILL_REMIT_DETAIL.BILL_SUBM_AMT` per TR_REF_NO. Discrepancies returned are defects.
18. **Step 14** — Verify `SUM(REMIT_AMT)` for TR_NO '1006' on the case matches the actual wire total.
19. **Step 15** — After processing in P3 via "Process Immediately," verify `TRANSACT_DET_REM` amounts match per (TR_REF_NO, FD_DESC_CD).

## Parameters (change list)

| Field | Default in script | Swap for your conversion |
|---|---|---|
| Table suffix | `CONV_QK62881` | `CONV_<casefull-trimmed>` |
| Case full | `QK62881   00001` | Your new case number (13 chars, 3 spaces between case and sub-id) |
| Case stem | `TA080339` | 8-char case stem |
| Region | `CORP` | `CORP` or `TDA` |
| EFF / CYC date | `2008-08-01` / `20140101` | Plan effective date (or current date for rebooked cash) |
| User ID | `H99871` / `UYN024` | Your RACF ID |
| Plan year | `2014` | Current plan year |

## Tables Used

- `CONV_<casefull>` — scratch conversion-assets table (plan-specific, created by this script).
- `CORP.CASE_REMIT` / `CORP.VCASE_REMIT` — case-level remittance rows.
- `CORP.BILL_REMIT_DETAIL` — participant-level remittance rows (to dummy SSN).
- `PENSION.FIN_ACT_PEND` / `PENSION.FIN_ACT_ELEC` — pending financial activities + elections.
- `CORP.EMPLOYEE` — verify dummy SSN exists.
- `CORP.VCASE_FUND_DATA` / `CORP.CONTRACT_FUND_DATA` — fund-active verification.
- `CORP.PLAN_SRC_DETAIL` / `CORP.TRANSACT_DET_REM` — source pick + post-processing verification.
- `PENSION.PLAN_PROV_GRP` / `PENSION.PLAN_PROVISION` / `PENSION.PLAN_FUND` — ID lookups (361, 362, 15, 1019, 13 provision types).
- `PENSION.PART_ENRL` / `PENSION.PERSON_SEARCH` — participant enrolment lookup for dummy SSN.

## SQL

```sql
--STEP 1 - USE P3 "TRANS REF NUMBER GENERATOR" IN TRANSACTIONS MENU TO OBTAIN TRANSREF NUMBER FOR EACH FUND

--STEP 2 - UPDATE LOAD TEMPLATE WITH TRANSREF NUMBERS OBTAINED IN STEP 1

--STEP 3 - CREATE CONVERSION TABLE

DROP TABLE CONV_QK62881;

CREATE TABLE CONV_QK62881
(CASE_NO CHAR(20),
PRIOR_FUND_DESC CHAR(50),
PRIOR_FUND_NAME CHAR(80),
DIA_FUND_DESC CHAR(4),
DIA_FUND_NM CHAR(80),
ASSETS DEC(13,2),
DUMMY_TR_REF_NO CHAR(14),
SRC_I DEC(17),
FD_PROV_I DEC(17))

--STEP 4 - INSERT TRANSREF NUMBERS (USING DATA LOADER) INTO YOUR LOAD TEMPLATE AND UPLOAD TO CONVERSION TABLE CREATED IN STEP 1 - UNCHECK FD_PROV_I ON MAPPING TAB

---REMOVES NULL RECORDS FROM TABLE
DELETE FROM CONV_QK62881
WHERE CASE_NO IS NULL

--STEP 5 - INSERT INTO CASE REMIT TABLE

--CHANGE LIST---
--ID->  UYN024
--CASE FULL->    QK62682   00001
--CASE->  TA080339
--REG-> CORP
--EFF AND CYC DATE -> 2008-08-01
--USER ID ->  H99871
--DATE STRING -> 20140101


-------------------------------------
 INSERT INTO CORP.CASE_REMIT 
 (PKG_ID, CASE_NO, TR_REF_NO, REMIT_AMT, PD_ADD_EXP_AMT, DED_EXP_AMT, APPLD_FF_CR_AMT,
  APPLD_AER_DEP_AMT, APPLD_XS415_AMT, PROC_AMT, OVER_UNDER_AMT, DISAB_PREM_AMT, DEP_BOOK_DT,
   CYC_DT, PAYROLL_DT, DEP_EFF_DT, P_L_DT, DEP_ALLOC_DT, DRCT_ELEC_CD, ELEC_OVRD_CD,
    ORIG_TR_REF_NO, SERVICER_CD, TR_NO, STAT_CD, COMM_CHECK_CD, JRNL_ENTRY_CD, PROFIT_LOSS_CD,
     F_E_LOAD_CD, REM_TAX_YR_CD, CONF_CD, REM_TYP_CD, TR_REF_CD, COMM_PYBL_CD,
      UNREM_OVRD_STAT_CD, PLAN_YR_DT, F_E_LOAD_PRCSS_CD, CASH_PERIOD_END_DT, 
      OUTSIDE_FD_AMT, OUTSDE_FD_PROC_AMT, OUTFD_SUS_AMT, OUTFD_SUS_PROC_AMT, OUTFD_UNAL_AMT,
       OUTFD_UNAL_REF_AMT, CASH_PER_BEGIN_DT, SHORTFALL_Q_AMT, SHORTFALL_NQ_AMT, ACCT_PROC_CD, 
       CATCH_UP_CD, PRCSS_C, PRE_PRCSS_STAT_C, PORTF_FIN_ACT_I)
       
       
        SELECT 'CORP', CASE_NO, DUMMY_TR_REF_NO,
               ASSETS, 0, 0, 0, 0, 0, 0, 0, 0, 
               '20140101' AS DEP_BOOK_DT, '20140101' AS CYC_DT, 
               '' AS PAYROLL_DT, '20140101' AS DEP_EFF_DT, '', '',
               '2', '0', '', SERVICER_CD, '1006' AS TR_NO, '0' AS STAT_CD, '', '0', '1', 
               '1', '0', '9', '2', '0', '1', '0', '2014' AS PLAN_YR_DT, 'X', '', 0, 0, 0, 
                0, 0, 0, '', 0, 0, '4', '', '', '', 0
 
       FROM CONV_QK62881
	   WHERE CASE_NO = 'QK62881   00001'

--------------------------------------

--CHECK EMPLOYEE TABLE
--------------------------------------
SELECT *                                       
FROM CORP.EMPLOYEE                             
WHERE                            
CASE_NO='QK62881   00001' 
AND SOC_SEC_NO ='999-00-0000'

------------------------------

--STEP 6 -- UPDATE THE FD_PROV_I  & SRC_I IN THE CONVERSION_ASSETS TABLE. 
 
UPDATE CONV_QK62881
SET 
 FD_PROV_I = (SELECT FD_PROV_I
                FROM PENSION.PLAN_PROV_GRP A,
                     PENSION.PLAN_PROVISION B,
                     PENSION.PLAN_FUND C
               WHERE (ACCOUNT_NO = 'QK62881   00001'
                 AND A.RELATED_GRP_TYP_C = 361 
                  OR (RELATED_GRP_I = (SELECT ENRL_PROV_GRP_I 
                                         FROM PENSION.PLAN_PROV_GRP  
                                        WHERE ACCOUNT_NO ='QK62881   00001'
                                          AND RELATED_GRP_TYP_C = 361) 
                      AND A.RELATED_GRP_TYP_C = 362))
                 AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
                 AND PROVISION_I = FD_PROV_I
                 AND PROV_TYP_C = 15
                 AND DIA_FUND_DESC = C.FD_DESC_CD)
WHERE CASE_NO='QK62881   00001';

--CHECKS FOR "NULL" VALUES FOR FD_PROV_I
 
SELECT *
FROM CONV_QK62881
WHERE FD_PROV_I IS  NULL

------------------------------
SELECT DISTINCT A.SRC_I,  A.SRC_S, A.REPORT_1_NM, A.REPORT_2_NM, DOC_NM
FROM CORP.PLAN_SRC_DETAIL A, PENSION.PLAN_PROVISION B, PENSION.PLAN_PROV_GRP C
WHERE A.SRC_I  = B.RELATED_I AND B.PROV_TYP_C = 1019 AND B.ENRL_PROV_GRP_I=C.ENRL_PROV_GRP_I
AND ACCOUNT_NO='QK62881   00001'

------------------------------
--UPDATE USING THE APPROPRIATE SRC_I FROM PLAN
UPDATE CONV_QK62881
SET SRC_I = 63183866761998200
            
 ---------------------------------------------------------------------------------------------------------  
-- STEP 7 - CHECKS TO MAKE SURE ALL TR_REF_NO'S ON THE CONVERSION_ASSET TABLE EXIST IN CASE_REMIT
 
SELECT *
FROM CONV_QK62881  
WHERE CASE_NO='QK62881   00001'
AND DUMMY_TR_REF_NO  NOT IN (SELECT TR_REF_NO
                            FROM CORP.VCASE_REMIT
                            WHERE CASE_NO='QK62881   00001')  
   
 ----------------------------------------------------------------------------------------------  
--STEP 8 -INSERT ROWS INTO FIN_ACT_PEND   
 
INSERT INTO PENSION.FIN_ACT_PEND
(FIN_ACT_I, FIN_ACT_TYP_C, EFF_D, CYC_D, TR_REF_NO,
 TR_TYPE_CD , FIN_ACT_STAT_C, CONFIRM_C , 
 CONFIRM_TYP_C ,LE_I, LE_ROLE_C, ENRL_I, ENRL_TYP_C,
  ENRL_PROV_GRP_I,PROV_I, PROV_TYP_C,
   USER_I, FIN_ACT_GRP_C)
 
SELECT 
 
PENSION.FUUID(),  --FIN_ACT_I
1006,              --FIN_ACT_TYP_C
'2014-01-02',      --EFF_D
'2014-01-02',      --CYC_D
DUMMY_TR_REF_NO,   -- FROM CONVERSION_ASSETS TABLE  
'1',               -- TR_TYPE_C  ALWAYS 1
0,                 --FIN_ACT_STAT_CD  PENDING 
'0',               --CONFIRM_C
1006,              --CONFIRM_TYP_C
0,                 --LE_I
0,                 --LE_ROLE_C
0,                 --ENRL_I
0,                 --ENRL_TYP_C
A.ENRL_PROV_GRP_I,   -- FROM PLAN_PROV_GRP 
0,                 --PROV_I
0,                 --PROV_TYP_C
'H99871',         -- USER ID
'1'                --FIN_ACT_GRP_C
 
FROM PENSION.PLAN_PROV_GRP A,CONV_QK62881 B
WHERE A.ACCOUNT_NO='QK62881   00001'
AND A.ACCOUNT_NO=B.CASE_NO
--and dummy_tr_ref_no in ('20140117923304',
--'20140117923303',
--'20140117923302',
--'20140117923301',
--'20140117923300',
--'20140117923299',
--'20140117923298',
--'20140117923297',
--'20140117923296')

 
---------------------------------------------------------------------------------
-- STEP 9 - INSERT ROWS INTO FIN_ACT_ELECT
 
INSERT INTO PENSION.FIN_ACT_ELEC
(FIN_ACT_I, FIN_ACT_TYP_C, FD_PROV_I, ELEC_P,
  AMT_TYP_C, USER_I)
SELECT
FIN_ACT_I,         --FIN ACT_I FROM FIN_ACT_PEND
FIN_ACT_TYP_C,
FD_PROV_I,
100,
'2',
'H99871'	      --YOUR RACF ID
FROM PENSION.PLAN_PROV_GRP A, CONV_QK62881 B,PENSION.FIN_ACT_PEND C
WHERE A.ACCOUNT_NO='QK62881   00001'
AND A.ACCOUNT_NO=B.CASE_NO
AND A.ENRL_PROV_GRP_I=C.ENRL_PROV_GRP_I
AND C.TR_REF_NO=B.DUMMY_TR_REF_NO
AND FD_PROV_I IS NOT NULL
--and dummy_tr_ref_no in ('20140117923304',
--'20140117923303',
--'20140117923302',
--'20140117923301',
--'20140117923300',
--'20140117923299',
--'20140117923298',
--'20140117923297',
--'20140117923296')
----------------------------------------------------------------------------------------

--STEP 10 - INSERT INTO BILL_REMIT DETAIL TO DUMMY SS#
---****CHANGE THE SOURCE BELOW TO SHOW SOURCE CURRENTLY SET AT '5'****

 
INSERT INTO CORP.BILL_REMIT_DETAIL
(PKG_ID, CASE_NO, SOC_SEC_NO, TR_REF_NO, BILL_SUBM_AMT, BILL_EXP_AMT, 
BILL_EXT_ADJ_AMT, BILL_APPLD_AMT, BILL_INT_CR_AMT, EXP_AMT_PRV_AMT, 
EXT_ADJ_PRV_AMT, BILL_APPLD_PRV_AMT, INT_CR_PRV_AMT, BILL_DT, CYC_DT,
 BILL_DUE_DT, STAT_CD, INTL_LN_NO, TAX_YR_NO, CTRB_TYP_CD, STKHR_CD, 
 TR_TYP_CD, DEP_TYP_CD, BILL_VER_NO, XS415_CD, FILE_INPUT_SRC_CD, 
 ER_SITE_CD, IRA_CONF_CD, TH_ER_SITE_CD, SRC_I,  ENRL_PROV_GRP_I, PART_ENRL_I)
 
SELECT  'CORP',CASE_NO,'999-00-0000' ,DUMMY_TR_REF_NO,ASSETS,0.00,0.00,0.00
,0.00,0.00,0.00,0.00,0.00,SUBSTR(DUMMY_TR_REF_NO,1,8),SUBSTR(DUMMY_TR_REF_NO,1,8)
,SUBSTR(DUMMY_TR_REF_NO,1,8),'0',' ',' '
,'5',--CORRESPONDS TO SCR_I USED IN STEP 5
' ',' ','2','01',' ','CONV INSERT',' ',' ',' ', SRC_I, PPG.ENRL_PROV_GRP_I, PART_ENRL_I
FROM CONV_QK62881 A,
PENSION.PLAN_PROV_GRP PPG,
PENSION.PART_ENRL PE,
PENSION.PERSON_SEARCH PS
WHERE ACCOUNT_NO = CASE_NO
AND PPG.ENRL_PROV_GRP_I = PE.ENRL_PROV_GRP_I
AND PART_I = PERSON_I 
AND ENRL_GRP_TYP_C = 361 
AND SOC_SEC_NO = '999-00-0000'
AND CASE_NO = 'QK62881   00001'
and FD_PROV_I is not null


----------------------------------------------------------------------------- 
-- STEP 11 - CHECK TO VERIFY SS# AND CTRB TYPE EXIST ON PLAN
 
SELECT *
FROM CORP.BILL_REMIT_DETAIL A, CONV_QK62881 B
WHERE A.TR_REF_NO=B.DUMMY_TR_REF_NO
AND A.CASE_NO=B.CASE_NO
AND A.CASE_NO='QK62881   00001'
AND (A.SOC_SEC_NO  NOT IN (SELECT SOC_SEC_NO
       FROM PENSION.PERSON_SEARCH C,PENSION.PART_ENRL D,PENSION.PLAN_PROV_GRP E
       WHERE A.SOC_SEC_NO=C.SOC_SEC_NO
       AND C.PERSON_I=D.PART_I
       AND D.ENRL_PROV_GRP_I=E.ENRL_PROV_GRP_I
       AND E.ACCOUNT_NO=B.CASE_NO)       
       
       OR
     CTRB_TYP_CD NOT IN (SELECT CHAR(C.SRC_S)
                FROM PENSION.PLAN_PROV_GRP D,
                     PENSION.PLAN_PROVISION B,
                     PENSION.PLAN_SRC_DETAIL C
               WHERE ACCOUNT_NO = 'QK62881   00001'
                 AND D.RELATED_GRP_TYP_C = 361 
                 AND D.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
                 AND PROVISION_I = SRC_I
                 AND PROV_TYP_C = 13))
                 
                 
  
--------------------------------------------------------------------
-- STEP 12 -CHECK TO VERIFY ALL FUNDS ARE SET TO ACTIVE, CONTRIBUTIONS ALLOWED

SELECT DISTINCT  A.CASE_NO, A.DIA_FUND_DESC, A.DUMMY_TR_REF_NO, B.STAT_CD, C.STAT_CD
FROM CONV_QK62881 A, CORP.VCASE_FUND_DATA B, CORP.CONTRACT_FUND_DATA C
WHERE SUBSTR(A.CASE_NO,1,7) = SUBSTR(B.CASE_NO,1,7)   AND CONT_NO=SUBSTR(B.CASE_NO,1,7)---CORP
--WHERE SUBSTR(A.CASE_NO,1,8) = SUBSTR(B.CASE_NO,1,8)   AND CONT_NO=SUBSTR(B.CASE_NO,1,8)---N F P

AND B.FD_NO=C.FD_NO
AND (B.STAT_CD^='0' OR C.STAT_CD^='0')

      
 ------------------------------------------------------------------------------------      
--STEP 13 - VERIFY THAT CASE_REMIT, BILL_REMIT_DETAIL AND CONVERSION TABLE ALL MATCH
                  
                  
SELECT A.TR_REF_NO, SUM(ASSETS), SUM(REMIT_AMT), SUM(BILL_SUBM_AMT)
FROM CORP.CASE_REMIT A, CONV_QK62881 B, CORP.BILL_REMIT_DETAIL C


WHERE A.CASE_NO = 'QK62881   00001'
AND A.CASE_NO = B.CASE_NO
AND B.CASE_NO = C.CASE_NO
AND A.CASE_NO = C.CASE_NO
AND DUMMY_TR_REF_NO = A.TR_REF_NO
AND A.TR_REF_NO = C.TR_REF_NO
AND DUMMY_TR_REF_NO = C.TR_REF_NO
AND SOC_SEC_NO = '999-00-0000'
AND (ASSETS <> REMIT_AMT OR ASSETS <> BILL_SUBM_AMT)
GROUP BY A.TR_REF_NO

---------------------------------------------
--STEP 14 - VERIFY THAT WIRE FUND TOTALS MATCH WIRE AMOUNT RECEIVED (IF PROCESSING DAY OF WIRE OR DIVIDENDS, ETC.)

SELECT CASE_NO, SUM(REMIT_AMT) AS TOTAL
FROM CORP.CASE_REMIT
WHERE CASE_NO = 'QK62881   00001'
AND TR_NO = '1006'
--AND DEP_EFF_DT = '20080116'
AND TR_REF_NO IN (SELECT DUMMY_TR_REF_NO
                  FROM CONV_QK62881)
GROUP BY CASE_NO

---------------------------------------------                  
--STEP 15 - IF PROCESSING IN BATCH, AFTER YOU HAVE PROCESSED THE AMOUNTS USING "PROCESS IMMEDIATELY" IN P3, CHECK TRANSACT_DET_REM TO MAKE SURE YOU FUNDS AND AMOUNTS MATCH                  

SELECT TR_REF_NO , FD_DESC_CD, SUM(TR_AMT)
FROM CORP.TRANSACT_DET_REM
WHERE CASE_NO LIKE 'TT069373%'
AND TR_REF_NO IN (SELECT DUMMY_TR_REF_NO
FROM CONV_QK62881)
GROUP BY TR_REF_NO, FD_DESC_CD
```

## Output / What to Look For

- Step 13 must return **no rows** — all three totals must match.
- Step 14 must match the received wire amount exactly.
- Step 15 after P3 "Process Immediately" should show TR_AMT per fund equal to the CONV table ASSETS.

## Related Queries

- [[takeover-holding-account-base-36-v2]] — TDA / updated version with CAPS LOCK note, STAT_CD='5', current-date logic
- [[day-of-rebook]] — post-liquidation rebook after the holding account settles

## See Also

- [[takeover-holding-account]]
- [[conversion-booking]]
- [[internal-conversion]]
