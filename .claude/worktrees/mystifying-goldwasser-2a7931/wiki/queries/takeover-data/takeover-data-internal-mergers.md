---
title: "Takeover Data — Internal Mergers"
type: query
tags: [query, takeover, internal-merger, tda, balances, loans, basis, indicative, fod, outsrc]
used-by-role: [lm-dc, takeover-coordinator, plan-installer]
used-in-process: [internal-merger, takeover, plan-conversion]
aqt-parameters: [CASE_NO, EFF_DT, CONT_YR, SYS_WD_DT, HIGH_LN_DT1, HIGH_LN_DT2, CONT_NO, EE_DIV_NO]
tables:
  - TDA.VTRANSACT_DETAIL
  - TDA.VCONTRACT_FUNDDATA
  - TDA.VCASE_DATA
  - TDA.VFUNDDESC
  - TDA.TRANSACT_DETAIL
  - TDA.EMPLOYEE
  - TDA.VEMPLOYEE
  - TDA.VSYS_WITHDRAW_DATA
  - TDA.VPAYEE_ADDRESS
  - TDA.VLOAN_DETAIL
  - TDA.VLOAN_REPAYMENT
  - TDA.VEE_BASIS
  - TDA.VEE_BALANCE
  - TDA.EE_BEN_ADDRESS
  - TDA.HELPER2
  - TDA.CONTRACT_FUND_DATA
  - TDA.WITHDRAWAL_DETAIL
  - PENSION.PART_DEF_DATA
  - PENSION.PLAN_PROV_GRP
  - PENSION.PLAN_SRC_DETAIL
  - PENSION.PART_ENRL
  - PENSION.PERSON_SEARCH
  - PENSION.OUTSRC_ACT_PEND
  - PENSION.OUTSRC_ELIG_PEND
  - PENSION.PART_ELIG_SRC
  - PENSION.PART_PPA_DEFAULT
  - UYC082.COPYOAP6
  - COPYOEP
  - COPYPES
systems: [db2, aqt, p3, tda, prk]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Takeover Data — Internal Mergers

Consolidated query set for pulling takeover data when a plan is being merged from one internal region into another (typically TDA-to-P3), including balances, loans, basis, indicative data, FOD status, and the OUTSRC table-copy workflow for migrating eligibility and termination-kit pending activity across contracts.

## Purpose

Internal mergers move a TA-sourced plan's data from one contract / region to another (for example, TDA → P3, or between two P3 contracts). Unlike an external takeover — where data comes from a prior recordkeeper — an internal merger re-uses existing TDA tables as the source, so the queries mostly hit `TDA.V*` views filtered on the originating `CASE_NO` / `CONT_NO`. The final subsections are different in character: they download pending OUTSRC rows into scratch tables (`COPYOAP6`, `COPYOEP`, `COPYPES`), mutate them, and re-insert them under the destination plan so eligibility and termination kits continue mid-flight.

The 12 queries cover:

1. **Balance by source** (TERMCC) — pivots by contribution type
2. **Balance by fund** (FUND_BAL) — joins fund descriptors, handles the `01`-`09` vs `0`-`9` fund-number mapping
3. **Participant-level balance by fund and source** (QPAYOUT) — pivot by fund after running
4. **YTD contribution** (YTDCONT) — pivot by source after running
5. **Systematic withdrawals** (QSYSWD) — active systematics still firing past the effective date
6. **Loan balances consolidated** (QLOANBAL_CONSOL) — active or deemed loans for participants in active status; UNION ALL of with-and-without-repayments
7. **High loan balance for date range** (HIGH_LN_BAL) — max principal outstanding during lookback window
8. **Fund listing with descriptor and numbers** — contract-level fund roster for the source contract
9. **EE basis** — three-UNION-ALL pattern covering (a) active participants, (b) participants with no EE_BALANCE but recent activity, (c) participants with no balance and no activity but at least one active loan
10. **Indicative data with deferrals** — joins `PART_DEF_DATA` + `PLAN_PROV_GRP` + `PLAN_SRC_DETAIL` + `TDA.EMPLOYEE` + `EE_BEN_ADDRESS` + `HELPER2` + `PART_PPA_DEFAULT`
11. **Fixed-fund bucket balance by plan and by participant** (QPAYOUT bucket pivot) — only `FD_NO='01'`
12. **FOD status** — who has been processed on FODs (TR_NO='3030', STAT_CD in '8','9')

The file closes with three OUTSRC table-copy workflows (Outsrc Act Pend, Outsrc Elig Pend, Part Elig Src) that are used to carry pending kits across into the new plan contract.

## When to Run

Run before cut-over on an internal merger to pull the source side of the data reconciliation. The OUTSRC table-copy steps are run during cut-over itself and require coordination with the plan installer.

Update the parameters at the top of the file before executing. Note that the source comment block references multiple different `CASE_NO` values because the file accumulated across several mergers — update each subsection's `CASE_NO` individually rather than assuming one global replacement.

## Parameters

| Parameter | Example | Notes |
|-----------|---------|-------|
| REGION | TDA | Source region (TDA for TA-sourced, P3 for P3-sourced) |
| CASE_NO | QK62169, TT069090, QK62132, QK61938, TA080150, QK61870, L7950364, QP62170, TA069279 | Varies per subsection — update each |
| EFF_DT | 20060710, 20090722 | Merger effective date |
| CONT_YR | 2006 | Contribution year for YTD |
| SYS_WD_DT | 2006-07-10 | Systematic withdrawal cutoff |
| HIGH_LN_DT1 | 20050711 | Loan lookback start |
| HIGH_LN_DT2 | 20060710 | Loan lookback end |
| CONT_NO | QK62169 | Contract number (first 8 of CASE_NO) |
| EE_DIV_NO | COGS | Division filter (usually commented out) |

## Tables

- **TDA.VTRANSACT_DETAIL** — all transactions in the TDA region
- **TDA.VCONTRACT_FUNDDATA / TDA.VCASE_DATA / TDA.VFUNDDESC** — fund descriptor joins
- **TDA.VEMPLOYEE / TDA.EMPLOYEE** — participant indicative (view and base table)
- **TDA.VSYS_WITHDRAW_DATA / TDA.VPAYEE_ADDRESS** — systematic withdrawals and payee
- **TDA.VLOAN_DETAIL / TDA.VLOAN_REPAYMENT** — loans and amortization
- **TDA.VEE_BASIS / TDA.VEE_BALANCE** — basis and end-of-day balance
- **TDA.EE_BEN_ADDRESS / TDA.HELPER2** — address and lookup helper
- **TDA.WITHDRAWAL_DETAIL** — FOD withdrawals
- **PENSION.PART_DEF_DATA / PLAN_PROV_GRP / PLAN_SRC_DETAIL / PART_ENRL / PERSON_SEARCH** — deferral and enrollment
- **PENSION.OUTSRC_ACT_PEND / OUTSRC_ELIG_PEND / PART_ELIG_SRC** — outsourced pending activity (source for COPY workflow)
- **PENSION.PART_PPA_DEFAULT** — PPA default indicator
- **UYC082.COPYOAP6 / COPYOEP / COPYPES** — user-owned scratch tables for migration

## SQL

### 1. Balance by Source (TERMCC) — Pivot by Source

```sql
--***************UPDATE*****************
--REGION = TDA.
--CASE_NO LIKE 'QK62169%'
--EFF_DT = '20060710'
--CONT YR = '2006'
--SYS WD DT = '2006-07-10'
--HIGH LN DT1 = '20050711'
--HIGH LN DT2 = '20060710'
--CONT NO = 'QK62169'
--EE_DIV_NO = 'COGS'
--YPRDSUGR.TERMCC   ***PROVIDES BALANCE BY SOURCE ONCE RUN
--PIVOT BY SOURCE
SELECT SOC_SEC_NO, TR_REF_NO, CTRB_TYP_CD,SUM(TR_AMT*-1)
FROM TDA.VTRANSACT_DETAIL                                                
WHERE CASE_NO LIKE 'TT069090%'                                                   AND TR_NO = '3005'                                       
  AND TR_REVSL_DISP_CD = '0'                                                
  AND EFF_DT >= '20090722' 
  AND SOC_SEC_NO IN (SELECT SOC_SEC_NO FROM ST_ANTHONY_B2) 
GROUP BY SOC_SEC_NO, TR_REF_NO,CTRB_TYP_CD                                                                          
ORDER BY SOC_SEC_NO                                                                                                                                   
  WITH UR       
;
```

### 2. Balance by Fund (FUND_BAL)

```sql
--YPRDSUGR.FUND_BAL   ***PROVIDES BALANCE BY FUND
SELECT SUM(TR_AMT*-1), EFF_DT, A.FD_DESC_CD, D.FD_FUND_NAME, tr_no                  
FROM TDA.VTRANSACT_DETAIL A, TDA.VCONTRACT_FUNDDATA B,          
     TDA.VCASE_DATA C, TDA.VFUNDDESC D                                                                                                  
WHERE A.CASE_NO LIKE 'TT069090%'                                             
  AND A.CASE_NO = C.CASE_NO                                             
  AND B.CONT_NO = C.CONT_NO                                             
  AND D.FD_DESCR_CODE = B.FD_DESC_CD                                    
  AND ((A.FD_NO IN ('01','02','03','04','05','06','07','08','09')       
  AND B.FD_NO=SUBSTR(A.FD_NO,2,1))                                      
  OR A.FD_NO=B.FD_NO)                                                   
AND TR_NO = '3005'                                
  AND TR_REVSL_DISP_CD = '0'                                            
  AND EFF_DT >= '20090722'   
 AND SOC_SEC_NO IN (SELECT SOC_SEC_NO FROM ST_ANTHONY_B2)                                               
GROUP BY EFF_DT, A.FD_DESC_CD, D.FD_FUND_NAME, tr_no                                                                                                
ORDER BY FD_DESC_CD, EFF_DT, tr_no                                                  
WITH UR
;
```

### 3. Participant by Fund and Source (QPAYOUT) — Pivot by Fund

```sql
--YPRDSUGR.QPAYOUT   ***PROVIDES PARTICIPANT BY FUND AND
--SOURCE  ONCE RUN PIVOT BY FUND
SELECT  B.CASE_NO, B.SOC_SEC_NO, B.EE_LAST_NM, B.EE_FST_MID_NM, A.CTRB_TYP_CD, A.FD_DESC_CD, SUM(A.TR_AMT)*-1 AS AMOUNT 
FROM  TDA.TRANSACT_DETAIL A,
   TDA.EMPLOYEE B
WHERE  A.SOC_SEC_NO = B.SOC_SEC_NO
AND   B.CASE_NO = 'TT069090  00001'
AND   A.CASE_NO LIKE 'TT069090%'
--AND   B.EE_DIV_NO = 'COGS'
AND   A.TR_REVSL_DISP_CD = '0'
AND   A.TR_REVSL_DT = ''
AND   A.EFF_DT = '20090722'
AND   A.TR_NO = '3005'
 AND A.SOC_SEC_NO IN (SELECT SOC_SEC_NO FROM ST_ANTHONY_B2)
GROUP BY B.CASE_NO, B.SOC_SEC_NO, B.EE_LAST_NM, B.EE_FST_MID_NM, A.CTRB_TYP_CD, A.FD_DESC_CD
FOR FETCH ONLY WITH UR
 ;
```

### 4. YTD Contribution (YTDCONT) — Pivot by Source

```sql
--YPRDSUGR.YTDCONT    ***PROVIDE YTD CONTRIBUTION ONCE RUN
--PIVOT BY SOURCE
  SELECT A.CASE_NO, A.SOC_SEC_NO,EE_FST_MID_NM,EE_LAST_NM,SUM(TR_AMT),         
         CTRB_TYP_CD                                                                                                                              
  FROM TDA.VTRANSACT_DETAIL A, TDA.VEMPLOYEE B                                                                                                      
  WHERE A.CASE_NO LIKE 'QK62169%'                                                   
  AND A.CASE_NO = B.CASE_NO                                                    
  AND A.SOC_SEC_NO = B.SOC_SEC_NO                                              
  AND A.SOC_SEC_NO LIKE '%-%-%' 
  --AND B.EE_DIV_NO = 'COGS'                                               
  AND TR_REVSL_DISP_CD = '0'                                                   
  AND TR_TYP_CD = '1'                                                          
  AND PLAN_YR_DT = '2006'                                            
  AND TR_NO = '1001'                                                                                                                                        
  GROUP BY A.CASE_NO, A.SOC_SEC_NO,EE_FST_MID_NM,EE_LAST_NM,CTRB_TYP_CD
;
```

### 5. Systematic Withdrawals (QSYSWD)

```sql
--YPRDSUGR.QSYSWD   ***PROVIDE ANY SYSTEMATIC WITHDRAWALS
--CURRENTLY SET UP
SELECT A.CASE_NO, A.SOC_SEC_NO, PAYMENT_AMT,FREQ_CD, START_DT,              
       STOP_DT, PREV_PAYMENT_DT,NEXT_PAYMENT_DT, FED_TAX_AMT,               
       STATE_TAX_AMT, LOCAL_TAX_AMT, PAYEE_LAST_NM,PAYEE_FST_MID_NM,        
       PAYEE_CO_NM, PAYEE_STREET_NM, PAYEE_CITY_NM,PAYEE_ST_CD,             
       PAYEE_ZIP_CD                                                                                                                                  
FROM TDA.VSYS_WITHDRAW_DATA A, TDA.VPAYEE_ADDRESS B, TDA.EMPLOYEE C                                                                                           
WHERE A.CASE_NO like 'QK62169_  00001%'        AND A.CASE_NO = C.CASE_NO AND A.SOC_sEC_NO = C.SOC_SEC_NO                                          
--AND C.EE_DIV_NO = 'COGS'                                          
AND A.SOC_SEC_NO = B.SOC_SEC_NO                                             
AND TR_REF_NO = CURR_TR_REF_NO                                              
AND NEXT_PAYMENT_DT >= '2006-07-10'                                           
AND ROW_TYP_CD = 'A'                                                                                                                                  
ORDER BY A.SOC_SEC_NO                                                                                                                                 
WITH UR                                                                     
;
```

### 6. Consolidated Loan Balances (QLOANBAL_CONSOL)

```sql
--YPRDUSGR.QLOANBAL_CONSOL   ***PROVIDE ALL LOAN INFORMATION
--ACTIVE OR DEEMED FOR ANY PARTICIPANT IN AN ACTIVE STATUS
SELECT DISTINCT A.CASE_NO,SUBSTR(A.CASE_NO,11,5),                              
       A.SOC_SEC_NO,EE_LAST_NM,EE_FST_MID_NM,B.LOAN_NO,B.INIT_LN_AMT           
       ,BAS_BLENDED_LN_PCT,LN_REPAY_AMT,TYP_1_ORIG_LN_AMT,TYP_2_ORIG_LN_AMT,   
TYP_3_ORIG_LN_AMT,                                                             
       TYP_4_ORIG_LN_AMT,TYP_5_ORIG_LN_AMT,TYP_6_ORIG_LN_AMT,TYP_7_ORIG_LN_AMT,
       TYP_8_ORIG_LN_AMT,orig_ln_iss_dt, FST_LN_REPAY_DT,FINAL_LN_REPAY_DT,   
       LN_REPAY_FREQ_CD,LN_REPAY_CT,                                           
   B.INIT_LN_AMT-  SUM(TYP1_LN_PRNC_AMT+TYP2_LN_PRNC_AMT+TYP4_LN_PRNC_AMT+     
                       TYP3_LN_PRNC_AMT+                                       
                       TYP5_LN_PRNC_AMT+TYP6_LN_PRNC_AMT+TYP7_LN_PRNC_AMT+     
                       TYP8_LN_PRNC_AMT)                                       
  ,B.TYP_1_ORIG_LN_AMT - SUM(TYP1_LN_PRNC_AMT)                                 
  ,B.TYP_2_ORIG_LN_AMT - SUM(TYP2_LN_PRNC_AMT)                                 
  ,B.TYP_3_ORIG_LN_AMT - SUM(TYP3_LN_PRNC_AMT)                                 
  ,B.TYP_4_ORIG_LN_AMT - SUM(TYP4_LN_PRNC_AMT)                                 
  ,B.TYP_5_ORIG_LN_AMT - SUM(TYP5_LN_PRNC_AMT)                                 
  ,B.TYP_6_ORIG_LN_AMT - SUM(TYP6_LN_PRNC_AMT)                                 
  ,B.TYP_7_ORIG_LN_AMT - SUM(TYP7_LN_PRNC_AMT)                                 
  ,B.TYP_8_ORIG_LN_AMT - SUM(TYP8_LN_PRNC_AMT),                                
  LN_DEEMED_DEF_DT, MAX(LN_AMORTIZATION_DT)                                    
FROM TDA.VEMPLOYEE A,TDA.VLOAN_DETAIL B,TDA.VLOAN_REPAYMENT C                                                                                   
WHERE A.CASE_NO = B.CASE_NO AND A.SOC_SEC_NO=B.SOC_SEC_NO                      
 AND  A.CASE_NO = C.CASE_NO AND A.SOC_SEC_NO=C.SOC_SEC_NO  
 --AND A.EE_DIV_NO = 'COGS'                    
 AND   A.CASE_NO = 'QK62169   00001'               AND B.LOAN_NO=C.LOAN_NO              
 AND B.LN_TR_STAT_CD = 'E'                                                     
  AND B.LN_DEFAULT_DT = '20060710'                                                
  AND C.LN_AMORTIZATION_DT ^= '20060710'                                                                                                                       
GROUP  BY A.SOC_SEC_NO,EE_LAST_NM,EE_FST_MID_NM,B.LOAN_NO,B.INIT_LN_AMT        
,BAS_BLENDED_LN_PCT,LN_REPAY_AMT,TYP_1_ORIG_LN_AMT,TYP_2_ORIG_LN_AMT,          
       TYP_4_ORIG_LN_AMT,TYP_5_ORIG_LN_AMT,TYP_6_ORIG_LN_AMT,TYP_7_ORIG_LN_AMT,
       TYP_8_ORIG_LN_AMT,ORIG_LN_ISS_DT,FST_LN_REPAY_DT,FINAL_LN_REPAY_DT,     
       LN_REPAY_FREQ_CD,LN_REPAY_CT,A.CASE_NO                                  
,B.TYP_1_ORIG_LN_AMT                                                           
,B.TYP_2_ORIG_LN_AMT                                                           
,B.TYP_3_ORIG_LN_AMT                                                           
,B.TYP_4_ORIG_LN_AMT                                                           
,B.TYP_5_ORIG_LN_AMT                                                           
,B.TYP_6_ORIG_LN_AMT                                                           
,B.TYP_7_ORIG_LN_AMT                                                           
,B.TYP_8_ORIG_LN_AMT                                                           
,LN_DEEMED_DEF_DT                                                              
HAVING  B.INIT_LN_AMT-  SUM(TYP1_LN_PRNC_AMT+TYP2_LN_PRNC_AMT+TYP4_LN_PRNC_AMT+
                       TYP5_LN_PRNC_AMT+TYP6_LN_PRNC_AMT+TYP7_LN_PRNC_AMT+     
                       TYP8_LN_PRNC_AMT)>0                                     
UNION ALL                                                                      
SELECT DISTINCT A.CASE_NO,SUBSTR(A.CASE_NO,11,5),                              
       A.SOC_SEC_NO,EE_LAST_NM,EE_FST_MID_NM,B.LOAN_NO,B.INIT_LN_AMT           
       ,BAS_BLENDED_LN_PCT,LN_REPAY_AMT,TYP_1_ORIG_LN_AMT,TYP_2_ORIG_LN_AMT,   
TYP_3_ORIG_LN_AMT,                                                             
       TYP_4_ORIG_LN_AMT,TYP_5_ORIG_LN_AMT,TYP_6_ORIG_LN_AMT,TYP_7_ORIG_LN_AMT,
       TYP_8_ORIG_LN_AMT,orig_ln_iss_dt, FST_LN_REPAY_DT,FINAL_LN_REPAY_DT,       
       LN_REPAY_FREQ_CD,LN_REPAY_CT,                                           
   B.INIT_LN_AMT, B.TYP_1_ORIG_LN_AMT, B.TYP_2_ORIG_LN_AMT,                    
   B.TYP_3_ORIG_LN_AMT, B.TYP_4_ORIG_LN_AMT, B.TYP_5_ORIG_LN_AMT,              
   B.TYP_6_ORIG_LN_AMT, B.TYP_7_ORIG_LN_AMT, B.TYP_8_ORIG_LN_AMT,              
   LN_DEEMED_DEF_DT, 'NO PAYMENTS'                                             
FROM TDA.VEMPLOYEE A,TDA.VLOAN_DETAIL B                                
WHERE A.CASE_NO = B.CASE_NO AND A.SOC_SEC_NO=B.SOC_SEC_NO
--AND A.EE_DIV_NO = 'COGS'
 AND   A.CASE_NO = 'QK62169   00001'  
 AND B.LN_TR_STAT_CD = 'E'                                                     
 AND B.LN_DEFAULT_DT = '20060710'                                                
 AND NOT EXISTS (SELECT * FROM TDA.VLOAN_REPAYMENT C                      
                  WHERE A.CASE_NO = C.CASE_NO                                  
                  AND A.SOC_SEC_NO = C.SOC_SEC_NO                              
                  AND B.LOAN_NO = C.LOAN_NO                                    
                  AND LN_AMORTIZATION_DT ^= '20060710')                           
GROUP  BY A.SOC_SEC_NO,EE_LAST_NM,EE_FST_MID_NM,B.LOAN_NO,B.INIT_LN_AMT        
,BAS_BLENDED_LN_PCT,LN_REPAY_AMT,TYP_1_ORIG_LN_AMT,TYP_2_ORIG_LN_AMT,          
       TYP_4_ORIG_LN_AMT,TYP_5_ORIG_LN_AMT,TYP_6_ORIG_LN_AMT,TYP_7_ORIG_LN_AMT,
       TYP_8_ORIG_LN_AMT,ORIG_LN_ISS_DT,FST_LN_REPAY_DT,FINAL_LN_REPAY_DT,     
       LN_REPAY_FREQ_CD,LN_REPAY_CT,A.CASE_NO                                  
,B.TYP_1_ORIG_LN_AMT                                                           
,B.TYP_2_ORIG_LN_AMT                                                           
,B.TYP_3_ORIG_LN_AMT                                                           
,B.TYP_4_ORIG_LN_AMT                                                           
,B.TYP_5_ORIG_LN_AMT                                                           
,B.TYP_6_ORIG_LN_AMT                                                           
,B.TYP_7_ORIG_LN_AMT                                                           
,B.TYP_8_ORIG_LN_AMT                                                           
,LN_DEEMED_DEF_DT                                                              
  ORDER BY 1,3,6                                                                                                                                            
WITH UR                                                                        
  ;
```

Note: the `^=` (not-equal) operator appears as a garbled character in the source file and has been restored to `^=` here.

### 7. High Loan Balance for Date Range (HIGH_LN_BAL)

```sql
--YPRDSUGR.HIGH_LN_BAL   ***PROVIDE HIGHEST OUTSTANDING PRIMCIPAL LOAN BALANCE FOR DATE RANGE
SELECT LOAN_NO,A.SOC_SEC_NO,max(PRNC_BAL_DUE_AMT)
FROM TDA.VLOAN_REPAYMENT A, TDA.EMPLOYEE B                                                  
WHERE A.CASE_NO= 'QK62169   00001'
AND A.CASE_NO = B.CASE_NO
AND A.SOC_sEC_NO = B.SOC_sEC_NO
--AND B.EE_DIV_NO = 'COGS'                                                       
AND EFF_DT BETWEEN '20050711' AND '20060710'                              
AND PRNC_BAL_DUE_AMT>0                                                        
GROUP BY LOAN_NO, A.SOC_SEC_NO                                                                             
ORDER BY A.SOC_SEC_NO, LOAN_NO                                                                                                                               
WITH UR                                                                       
;
```

### 8. Fund Listing with Descriptor and Numbers

```sql
--   ***PROVIDES LISTING OF FUNDS WITH DESCRIPTOR AND NUMBERS
SELECT CONT_NO, FD_NO, A.FD_DESC_CD, SHORT_NM,B.FD_FUND_NAME,      
       A.REPTG_1_FD_NM, A.REPTG_2_FD_NM                                                                                             
FROM TDA.VFUNDDESC B,                                          
TDA.CONTRACT_FUND_DATA A                                                                                                        
WHERE A.CONT_NO LIKE 'QK62169%'                           
AND B.FD_DESCR_CODE = A.FD_DESC_CD                                                                                                                                     
ORDER BY FD_NO                                                                                                                     
WITH UR                                                            
```

### 9. EE Basis (Three-UNION-ALL Pattern)

```sql
--***********CHANGE *******************
-- REGION TDA
-- CASE_NO 'QK62132   00001'
-- LAST EE-BAL-DT '20080930'
-- NEXT DAY after ee balance date '20081001'
-- TODAY'S DATE '20081025'
--
--EE BASIS  ***PROVIDES BASIS INFORMATION BY PARTICIPANT
select CASE_NO, SOC_SEC_NO,  PRE87_TAX_BAS_AMT,  POST86_TAX_BAS_AMT,  PRE89_TYP3_BAS_AMT,  TDA_TYP6_CTRB_AMT,  POST88TYP3_BAS_AMT
from TDA.vee_basis A
where case_no = 'QK62132   00001'
--AND FILE_INPUT_SRC_CD ^= 'LB050201'
AND EE_BEG_BAL_DT IN (SELECT MAX(EE_BEG_BAL_DT) FROM TDA.VEE_BASIS B
                      WHERE A.CASE_NO = B.CASE_NO
                      AND A.SOC_SEC_NO = B.SOC_SEC_NO)
AND EXISTS (SELECT '' FROM TDA.VEE_BALANCE C
            WHERE A.CASE_NO = C.CASE_NO
            AND A.SOC_SEC_NO = C.SOC_SEC_NO
            AND EFF_DT = '20080930')
UNION ALL
select CASE_NO, SOC_SEC_NO,  PRE87_TAX_BAS_AMT,  POST86_TAX_BAS_AMT,  PRE89_TYP3_BAS_AMT,  TDA_TYP6_CTRB_AMT,  POST88TYP3_BAS_AMT
from TDA.vee_basis A
where case_no = 'QK62132   00001'
AND EE_BEG_BAL_DT IN (SELECT MAX(EE_BEG_BAL_DT) FROM TDA.VEE_BASIS B
                      WHERE A.CASE_NO = B.CASE_NO
                      AND A.SOC_SEC_NO = B.SOC_SEC_NO)
AND NOT EXISTS (SELECT '' FROM TDA.VEE_BALANCE C
                WHERE A.CASE_NO = C.CASE_NO
                AND A.SOC_SEC_NO = C.SOC_SEC_NO
                AND EFF_DT = '20080930')
AND EXISTS (SELECT '' FROM TDA.VTRANSACT_DETAIL D
            WHERE A.CASE_NO = D.CASE_NO
            AND A.SOC_SEC_NO = D.SOC_SEC_NO
            AND EFF_DT BETWEEN '20081001' AND '20081025'
            AND TR_REVSL_DISP_CD = '0')
union all
select CASE_NO, SOC_SEC_NO,  PRE87_TAX_BAS_AMT,  POST86_TAX_BAS_AMT,  PRE89_TYP3_BAS_AMT,  TDA_TYP6_CTRB_AMT,  POST88TYP3_BAS_AMT
from TDA.vee_basis A
where case_no = 'QK62132   00001'
AND EE_BEG_BAL_DT IN (SELECT MAX(EE_BEG_BAL_DT) FROM TDA.VEE_BASIS B
                      WHERE A.CASE_NO = B.CASE_NO
                      AND A.SOC_SEC_NO = B.SOC_SEC_NO)
AND NOT EXISTS (SELECT '' FROM TDA.VEE_BALANCE C
                WHERE A.CASE_NO = C.CASE_NO
                AND A.SOC_SEC_NO = C.SOC_SEC_NO
                AND EFF_DT = '20080930')
AND not EXISTS (SELECT '' FROM TDA.VTRANSACT_DETAIL D
            WHERE A.CASE_NO = D.CASE_NO
            AND A.SOC_SEC_NO = D.SOC_SEC_NO
            AND EFF_DT BETWEEN '20081001' AND '20081025'
            AND TR_REVSL_DISP_CD = '0')
and exists (select '' from TDA.vloan_detail e
            where a.case_no = e.case_no
            and a.soc_sec_no = e.soc_sec_no
            and ln_tr_stat_cd = '0')
FOR FETCH ONLY WITH UR
;
```

### 10. Indicative Data with Deferrals

```sql
--indicative data  **PROVIDES INDICATIVE DATA INCLUDING DEFERRALS --FOR PARTICIPANTS, MUST BE MODIFIED TO SPECIFIC PLAN
 SELECT A.ACCOUNT_NO AS CASE_NO, A.SOC_SEC_NO, A.EE_LAST_NM, A.EE_FST_MID_NM, A.EE_BRTH_DT, A.EE_HIRE_DT, A.EE_TERM_DT, A.EE_REENTRY_DT, 
  COALESCE(B.STREET_NM, '') AS STREE_NM, 
  COALESCE(B.ADDR_LINE_2_T, '') AS ADDR_LINE_2_T, 
  COALESCE(B.CITY_NM, '') AS CITY_NM,
  COALESCE(B.ST_CD, '') AS ST_CD,
  COALESCE(B.ZIP_CD, '') AS ZIP_CD,
  A.PART_STAT_CD, C.HLP_TEXT AS HLP_TEXT, 
  A.EFF_D AS EE_DEF_EFF_DT, 
  A.DEF_P AS EE_ELECT_DEF_PCT,
  A.DEF_A AS ELEC_DEFER_AMT,
  d.DEFAULT_STAT_C as defer_default_ind
FROM  
  (
SELECT   B.ACCOUNT_NO, 
  D.EE_DIV_NO,
   B.PROV_GRP_SRCH_NM AS PLAN_NAME, 
   D.SOC_SEC_NO,
   D.EE_LAST_NM, 
   D.EE_FST_MID_NM,
   D.EE_BRTH_DT,
   D.EE_HIRE_DT, 
   D.EE_TERM_DT,
   D.EE_REENTRY_DT,
   D.PART_STAT_CD,
   A.EFF_D, 
   C.DOC_NM, 
   A.DEF_P, 
   A.DEF_A
FROM  PENSION.PART_DEF_DATA A,
   PENSION.PLAN_PROV_GRP B,
   PENSION.PLAN_SRC_DETAIL C,
   TDA.EMPLOYEE D
WHERE  A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
AND   A.SRC_I = C.SRC_I
AND   A.SOC_SEC_NO = D.SOC_SEC_NO
AND   B.ACCOUNT_NO = D.CASE_NO
AND   B.ACCOUNT_NO = 'QK62132   00001'
AND   B.RELATED_GRP_TYP_C = 361
AND   A.STAT_C = 'A'
AND   C.SRC_S = 6
   ) AS A
LEFT JOIN
TDA.EE_BEN_ADDRESS AS B
ON A.ACCOUNT_NO = B.CASE_NO
AND A.SOC_SEC_NO = B.SOC_SEC_NO
AND B.PAYEE_TYP_CD = '1'
LEFT JOIN
TDA.HELPER2 AS C
ON  A.PART_STAT_CD = C.HLP_VALUE
AND C.HLP_CODE = '150211'
left join
pension.part_ppa_default as d
on a.account_no=d.account_no and a.soc_Sec_no=d.soc_Sec_no
and ENRL_SERV_TYP_C=1
FOR FETCH ONLY WITH UR;
;
```

### 11. Fixed-Fund Bucket Balance — by Plan and by Participant

```sql
---PROVIDES FIXED FUND BUCKET BALANCE BY PLAN
SELECT SUM(TR_AMT*-1), EFF_DT, A.FD_NO, A.BKT_NO, D.FD_FUND_NAME, tr_no                                                                                        
FROM TDA.VTRANSACT_DETAIL A, TDA.VCONTRACT_FUNDDATA B,          
     TDA.VCASE_DATA C, TDA.VFUNDDESC D                                                                                                
WHERE A.CASE_NO = 'QK61938   01'                                              
  AND A.CASE_NO = C.CASE_NO                                             
  AND B.CONT_NO = C.CONT_NO                                             
  AND D.FD_DESCR_CODE = B.FD_DESC_CD                                    
  AND ((A.FD_NO IN ('01','02','03','04','05','06','07','08','09')       
  AND B.FD_NO=SUBSTR(A.FD_NO,2,1))                                      
  OR A.FD_NO=B.FD_NO)                                                   
  AND TR_NO BETWEEN '3000' AND '5999'                                   
  AND TR_REVSL_DISP_CD = '0'                                            
  AND EFF_DT >= '20061129' 
  AND A.FD_NO = '01'                                                
GROUP BY EFF_DT, A.FD_NO, A.BKT_NO, D.FD_FUND_NAME, tr_no                         
ORDER BY FD_NO, EFF_DT, tr_no                                                  
WITH UR;

--YPRDSUGR.QPAYOUT  ***PROVIDES FIXED FUND BUCKET BALANCE
--BY PARTICIPANT  PIVOT BY BUCKET ONCE QUERY RUN
SELECT SUBSTR(A.CASE_NO,11,5),A.SOC_SEC_NO, B.EE_LAST_NM, B.EE_FST_MID_NM, CTRB_TYP_CD,FD_NO, A.BKT_NO, SUM(TR_AMT)*-1                                               
FROM TDA.VTRANSACT_DETAIL A, TDA.VEMPLOYEE B     
WHERE A.CASE_NO = 'QK61938   01'                                                     
AND A.EFF_DT='20061129'                                                           
AND A.CASE_NO=B.CASE_NO                                                        
AND A.SOC_SEC_NO=B.SOC_SEC_NO                                                  
  AND TR_NO BETWEEN '3000' AND '5999'                                                      
  AND TR_REVSL_DISP_CD = '0' 
  AND A.FD_NO = '01'                                                  
GROUP BY A.CASE_NO,A.SOC_SEC_NO,B.EE_LAST_NM,B.EE_FST_MID_NM,CTRB_TYP_CD,FD_NO, BKT_NO
ORDER BY A.SOC_SEC_NO,CTRB_TYP_CD                                      
WITH UR        
;
```

### 12. FOD Status (Who Has Been Processed)

```sql
--PROVIDES WHO WE HAVE PROCCESSED FOD'S ON 
select distinct(b.soc_Sec_no), ee_last_nm, ee_fst_mid_nm, vest_pct, a.case_no
from tda.withdrawal_detail a, tda.employee b
where a.case_no = b.case_no
and a.soc_Sec_no = b.soc_sec_no
and tr_no = '3030'
and stat_cd in ('8','9')
and a.case_no = 'TA080150  00001'
and ee_disb_stat_cd = '1'
group by  ee_last_nm, ee_fst_mid_nm, vest_pct, a.case_No, b.soc_sec_no
for fetch only with ur
```

### 13. Download Outsrc Act Pend (COPYOAP6)

```sql
-- Downloand Outsrc Act Pend
drop table uyc082.copyoap6;
CREATE TABLE UYC082.COPYOAP6
(ACCOUNT_NO			  	CHAR(20),
SOC_SEC_NO			  	CHAR(12),
OUTSRC_ACT_I		  	DEC(17,0),
OUTSRC_ACT_TYP_C	  	SMALLINT,
OUTSRC_I			  	DEC(17,0),
SERV_TYP_C			  	SMALLINT,
OUTSRC_ACT_STAT_C		SMALLINT,
OUTSRC_REF_I			DEC (17,0),
EFF_D					DATE,
CYC_D					DATE,
LE_I					DEC(17,0),
LE_TYP_C				SMALLINT,
ENRL_I					DEC(17,0),
ENRL_TYP_C				SMALLINT,
ENRL_PROV_GRP_I			DEC(17,0),
USER_I					CHAR(12),
MOD_TS					TIMESTAMP);
INSERT INTO UYC082.COPYOAP6
SELECT PPG.ACCOUNT_NO, PS.SOC_SEC_NO, OAP.OUTSRC_ACT_I, OAP.OUTSRC_ACT_TYP_C, 
OAP.OUTSRC_I, OAP.SERV_TYP_C, OAP.OUTSRC_ACT_STAT_C, OAP.OUTSRC_REF_I,        
OAP.EFF_D, OAP.CYC_D,OAP.LE_I, OAP.LE_TYP_C,                                  
OAP.ENRL_I, OAP.ENRL_TYP_C, OAP.ENRL_PROV_GRP_I, OAP.USER_I, OAP.MOD_TS       
FROM PENSION.PLAN_PROV_GRP PPG, PENSION.PERSON_SEARCH PS,                     
     PENSION.PART_ENRL PE,                                                    
PENSION.OUTSRC_ACT_PEND OAP,                                                  
TDA.VEMPLOYEE EE                                                             
WHERE                                                                         
 PS.PERSON_I = PE.PART_I                                                      
AND PE.ENRL_PROV_GRP_I = PPG.ENRL_PROV_GRP_I                                  
AND PE.ENRL_PROV_GRP_I= OAP.ENRL_PROV_GRP_I                                   
AND OAP.LE_I = PS.PERSON_I                                                    
AND PS.SOC_SEC_NO = EE.SOC_SEC_NO AND ACCOUNT_NO = EE.CASE_NO                 
AND PPG.ACCOUNT_NO='QK61870   00001'
AND OUTSRC_ACT_TYP_C IN (4001,4002,4003,4004)
--Outsrc Act Pend is used for both Eligibility and Termination Kits
--Eligibility (4102,4202,5102,4999)
--Termiantions (4001,4002,4003,4004)
```

### 14. Update / Insert Outsrc Act Pend

```sql
-- Update-Insert Outsrc Act Pend
update copyoap6
set account_no='QP62170   00001';
update copyoap6
set user_i='Mutual Conv';
update copyoap6
set outsrc_I=87517370032453100;
update copyoap6
set enrl_prov_grp_I=60629200032453100;
update copyoap6
set outsrc_act_I=outsrc_act_I+1;
update copyOAP6 SE                                               
SET LE_I = (SELECT PART_I 
		                FROM   PENSION.PLAN_PROV_GRP A,                      
                        PENSION.PART_ENRL B,                         
                        PENSION.PERSON_SEARCH C  
                  WHERE ACCOUNT_NO = 'QP62170   00001'               
                    AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I        
                    AND B.PART_I = PERSON_I AND ENRL_GRP_TYP_C=361   
                   AND C.SOC_SEC_NO = SE.SOC_SEC_NO                  
                      AND A.ACCOUNT_NO = SE.ACCOUNT_NO); 
update copyOAP6 SE                                               
SET enrl_I = (SELECT PART_enrl_I 
		                FROM   PENSION.PLAN_PROV_GRP A,                      
                        PENSION.PART_ENRL B,                         
                        PENSION.PERSON_SEARCH C  
                  WHERE ACCOUNT_NO = 'QP62170   00001'               
                    AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I        
                    AND B.PART_I = PERSON_I AND ENRL_GRP_TYP_C=361   
                   AND C.SOC_SEC_NO = SE.SOC_SEC_NO                  
                      AND A.ACCOUNT_NO = SE.ACCOUNT_NO);
Insert into pension.outsrc_act_pend
select 
b.OUTSRC_ACT_I, b.OUTSRC_ACT_TYP_C, 
b.OUTSRC_I, b.SERV_TYP_C, b.OUTSRC_ACT_STAT_C, b.OUTSRC_REF_I,        
b.EFF_D, b.CYC_D,b.LE_I, b.LE_TYP_C,                                  
b.ENRL_I, b.ENRL_TYP_C, b.ENRL_PROV_GRP_I, b.USER_I, b.MOD_TS
from copyoap6 b
```

### 15. Download Outsrc Elig Pend (COPYOEP)

```sql
-- Downloand Outsrc Elig Pend
drop table copyoep
CREATE TABLE COPYOEP
(ACCOUNT_NO			  	CHAR(20),
SOC_SEC_NO			  	CHAR(12),
SRC_I				  	DEC(17,0),
OUTSRC_REF_I		  	DEC(17,0),
EFF_D				  	DATE,
STAT_C				  	SMALLINT,
OUTSRC_ACT_TYP_C		SMALLINT,
ELIG_D					DATE,
PLAN_ENTRY_D			DATE,
PAYROLL_END_CALC_D		DATE,
SERV_REQ_CMPLT_C		SMALLINT,
USER_I					CHAR(12),
MOD_TS					TIMESTAMP);
INSERT INTO COPYOEP
SELECT PPG.ACCOUNT_NO, PS.SOC_SEC_NO, OEP.SRC_I, OEP.OUTSRC_REF_I, OEP.EFF_D, 
OEP.STAT_C, OEP.OUTSRC_ACT_TYP_C, OEP.ELIG_D, OEP.PLAN_ENTRY_D,               
OEP.PAYROLL_END_CALC_D, OEP.SERV_REQ_CMPLT_C, OEP.USER_I, OEP.MOD_TS          
FROM PENSION.PLAN_PROV_GRP PPG, PENSION.PERSON_SEARCH PS,                     
PENSION.PART_ENRL PE,                                                         
PENSION.OUTSRC_ELIG_PEND OEP,                                                 
PENSION.OUTSRC_ACT_PEND OAP,                                                  
TDA.VEMPLOYEE EE                                                             
WHERE                                                                         
 PS.PERSON_I = PE.PART_I                                                      
AND PE.ENRL_PROV_GRP_I = PPG.ENRL_PROV_GRP_I                                  
AND OAP.LE_I = PS.PERSON_I                                                    
AND PS.SOC_SEC_NO = EE.SOC_SEC_NO AND ACCOUNT_NO = EE.CASE_NO                 
AND OEP.OUTSRC_REF_I=OAP.OUTSRC_REF_I                                         
AND PPG.ACCOUNT_NO='L7950364  00364'                                          
AND SRC_I=93846910547573100                                                   
--Outsrc Elig Pend is only used by Eligibility and is by source
```

### 16. Update / Insert Outsrc Elig Pend

```sql
-- Update – Insert Outsrc_Elig Pend
update copyoep
set account_no='QK62169   00001';
update copyoep
set user_i='Mutual Conv';
update copyoep
set src_I=15766416995665000;
Insert into pension.outsrc_elig_pend
select
oep.srC_I, OEP.OUTSRC_REF_I, OEP.EFF_D, 
OEP.STAT_C, OEP.OUTSRC_ACT_TYP_C, OEP.ELIG_D, OEP.PLAN_ENTRY_D,               
OEP.PAYROLL_END_CALC_D, OEP.SERV_REQ_CMPLT_C, OEP.USER_I, OEP.MOD_TS          
from copyoep oep
```

### 17. Download Part Elig Src (COPYPES)

```sql
-- Download Part  Elig_Src
drop table copypes;
CREATE TABLE COPYPES
(ACCOUNT_NO			  	CHAR(20),
SOC_SEC_NO			  	CHAR(12),
PART_ENRL_I				DEC(17,0),
SRC_I				  	DEC(17,0),
STAT_C				  	SMALLINT,
ELIG_D					DATE,
PLAN_ENTRY_D			DATE,
KIT_MAIL_D				DATE,
EFF_D					DATE,
PART_HIST_C				SMALLINT,
USER_I					CHAR(12),
MOD_TS					TIMESTAMP);
INSERT INTO COPYPES
SELECT PP.ACCOUNT_NO, PS.SOC_SEC_NO, PA.PART_ENRL_I, PA.SRC_I, PA.STAT_C,      
PA.ELIG_D, PA.PLAN_ENTRY_D, PA.KIT_MAIL_D, PA.EFF_D, PA.PART_HIST_C, PA.USER_I,
PA.MOD_TS                                                                      
 FROM PENSION.PART_ELIG_SRC PA,                                                
    PENSION.PART_ENRL PB,                                                      
     PENSION.PERSON_SEARCH PS,                                                 
PENSION.PLAN_PROV_GRP PP,                                                      
PENSION.PLAN_SRC_DETAIL PD,                                                    
TDA.VEMPLOYEE PE                                                              
WHERE PA.PART_ENRL_I = PB.PART_ENRL_I                                          
AND PERSON_I = PART_I AND PB.ENRL_PROV_GRP_I = PP.ENRL_PROV_GRP_I              
AND PS.SOC_SEC_NO = PE.SOC_SEC_NO AND ACCOUNT_NO = PE.CASE_NO                  
AND CASE_NO='QK61870   00001'                                                  
--AND PA.SRC_I in (47792287971222100,
--32935891533142100,
--55827002533142100)                                                 
AND PA.SRC_I=PD.SRC_I                                                          
--ORDER BY SOC_SEC_NO
```

### 18. Update / Insert Part Elig Src

```sql
-- Update – Insert Part_Elig_Src
  update COPYPES
set account_no='TA069279  00001';
update COPYPES
set user_i='Mutual Conv';
update COPYPES
set src_I=10494600694082200;
update COPYPES SE                                               
SET part_enrl_I = (SELECT PART_enrl_I 
		                FROM   PENSION.PLAN_PROV_GRP A,                      
                        PENSION.PART_ENRL B,                         
                        PENSION.PERSON_SEARCH C  
                  WHERE ACCOUNT_NO = 'TA069279  00001'               
                    AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I        
                    AND B.PART_I = PERSON_I AND ENRL_GRP_TYP_C=361   
                   AND C.SOC_SEC_NO = SE.SOC_SEC_NO
--                   and c.soc_sec_no between '222-22-2222' and '444-44-4444'
--                   and se.soc_sec_no like '%-%-%'                  
                      AND A.ACCOUNT_NO = SE.ACCOUNT_NO);
Insert into pension.part_elig_src
select
PA.PART_ENRL_I, PA.SRC_I, PA.STAT_C,      
PA.ELIG_D, PA.PLAN_ENTRY_D, PA.KIT_MAIL_D, PA.EFF_D, PA.PART_HIST_C, PA.USER_I,
PA.MOD_TS , pa.kit_mail_d                                                                     
from COPYPES pa
```

## Output

The reconciliation queries (sections 1-12) produce the source-side numbers that must match what lands on the destination plan after cut-over. The OUTSRC copy queries (13-18) repoint pending activity so kits in flight on the source plan are not lost.

**Key things to check:**
- Source-balance totals by source equal destination-balance totals by source
- Loan counts match, and no active loan fails to carry over
- Systematic withdrawals continue on the same cadence post-cut-over
- EE basis totals equal (especially `POST86_TAX_BAS_AMT` and `PRE89_TYP3_BAS_AMT`)
- FOD-in-flight participants (STAT_CD 8 or 9) are handed off cleanly to the destination processor
- After the three COPY-and-update-and-reinsert blocks, verify pending-kit rows exist on the new plan's `ENRL_PROV_GRP_I`

## Related Queries

- [[post-conversion-audit-queries]] — audit run on the destination plan after merger
- [[to-balances]], [[to-allocations]], [[to-ytd-contrib]], [[to-basis]] — standard takeover queries; internal mergers are a variant of these same needs
- [[internal-conversion]] — related family of conversion (same region, re-platforming)
- [[riverside-balances]] — TDA-region balance pull; same `TR_NO BETWEEN '3000' AND '5999'` shape

## See Also

- [[internal-merger]]
- [[takeover]]
- [[lm-dc]]
- [[takeover-coordinator]]
- [[plan-installer]]
- [[outsrc-act-pend]]
- [[outsrc-elig-pend]]
- [[part-elig-src]]
- [[fod]]
