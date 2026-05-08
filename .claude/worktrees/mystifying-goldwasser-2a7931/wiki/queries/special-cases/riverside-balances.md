---
title: "Riverside — Internal Conversion Balances"
type: query
tags: [query, special-case, riverside, tda, internal-conversion, balances, ytd-contrib, fixed-fund]
used-by-role: [lm-dc, takeover-coordinator]
used-in-process: [internal-conversion, historical-balance-audit]
aqt-parameters: [CASE_NO, EFF_DT, CONT_YR, SYS_WD_DT, HIGH_LN_DT1, HIGH_LN_DT2, CONT_NO, EE_DIV_NO]
tables:
  - TDA.VTRANSACT_DETAIL
  - TDA.VCONTRACT_FUNDDATA
  - TDA.VCASE_DATA
  - TDA.VFUNDDESC
  - TDA.TRANSACT_DETAIL
  - TDA.EMPLOYEE
  - TDA.VEMPLOYEE
systems: [db2, aqt, tda]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Riverside — Internal Conversion Balances

Six-query set capturing historical balance data for the Riverside internal conversion (CASE_NO LIKE `TT069214%`, EFF_DT `20090123`). Covers source-level, fund-level, participant-level, YTD, and fixed-fund bucket pulls — all in the TDA region against `TR_NO BETWEEN '3000' AND '5999'` transfer transactions.

## Purpose

When Riverside was internally converted (TT069214 contract, January 23, 2009 effective date), data had to be reconciled across the transfer. This set is the template for that audit:

1. **Balance by source** (TERMCC) — sums transfer transactions grouped by SSN, `TR_REF_NO`, `CTRB_TYP_CD`
2. **Balance by fund** (FUND_BAL) — joins fund descriptor tables, handles the `01..09` vs `0..9` fund-number convention
3. **Participant by fund and source** (QPAYOUT) — pivot by fund after running
4. **YTD contribution** (YTDCONT) — pivots by source; uses `TR_NO='1001'` and `PLAN_YR_DT='2009'`
5. **Fixed-fund bucket balance by plan** — `FD_NO='01'` filter to get the bucket-level fixed-fund balance
6. **Fixed-fund bucket balance by participant** (QPAYOUT bucket) — pivot by bucket

## When to Run

Historical reference. Template for any similar TDA-region internal conversion.

## Parameters

| Parameter | Example | Notes |
|-----------|---------|-------|
| REGION | TDA | Source region |
| CASE_NO | `TT069214%` | Plan case-number pattern |
| EFF_DT | `20090123` | Merger / conversion effective date |
| CONT_YR | `2009` | Contribution year for YTD |
| SYS_WD_DT | `2009-01-23` | Systematic-withdrawal cutoff |
| HIGH_LN_DT1 | `20080123` | Loan lookback start |
| HIGH_LN_DT2 | `20090123` | Loan lookback end |
| CONT_NO | `TT069214` | Contract number |
| EE_DIV_NO | `COGS` | Division filter (commented out) |

## Tables

- **TDA.VTRANSACT_DETAIL** — transactions
- **TDA.VCONTRACT_FUNDDATA / TDA.VCASE_DATA / TDA.VFUNDDESC** — fund descriptors
- **TDA.TRANSACT_DETAIL / TDA.EMPLOYEE / TDA.VEMPLOYEE** — base and view tables

## SQL

### 1. Balance by Source (TERMCC)

```sql
--***************UPDATE*****************
--REGION = TDA.
--CASE_NO LIKE 'TT069214%'
--EFF_DT = '20090123'
--CONT YR = '2009'
--SYS WD DT = '2009-01-23'
--HIGH LN DT1 = '20080123'
--HIGH LN DT2 = '20090123'
--CONT NO = 'TT069214'
--EE_DIV_NO = 'COGS'

--YPRDSUGR.TERMCC   ***PROVIDES BALANCE BY SOURCE ONCE RUN
--PIVOT BY SOURCE
SELECT SOC_SEC_NO, TR_REF_NO, CTRB_TYP_CD,SUM(TR_AMT*-1)
                    
FROM TDA.VTRANSACT_DETAIL                                                
WHERE CASE_NO LIKE 'TT069214%'                                                   
  AND TR_NO BETWEEN '3000' AND '5999'                                       
  AND TR_REVSL_DISP_CD = '0'                                                
  AND EFF_DT >= '20090123'                                                     
GROUP BY  SOC_SEC_NO, TR_REF_NO,CTRB_TYP_CD                                                                          
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
WHERE A.CASE_NO LIKE 'TT069214%'                                             
  AND A.CASE_NO = C.CASE_NO                                             
  AND B.CONT_NO = C.CONT_NO                                             
  AND D.FD_DESCR_CODE = B.FD_DESC_CD                                    
  AND ((A.FD_NO IN ('01','02','03','04','05','06','07','08','09')       
  AND B.FD_NO=SUBSTR(A.FD_NO,2,1))                                      
  OR A.FD_NO=B.FD_NO)                                                   
  AND TR_NO BETWEEN '3000' AND '5999'                                   
  AND TR_REVSL_DISP_CD = '0'                                            
  AND EFF_DT >= '20090123'                                                 
GROUP BY EFF_DT, A.FD_DESC_CD, D.FD_FUND_NAME, tr_no                                                                                                
ORDER BY FD_DESC_CD, EFF_DT, tr_no                                                  
WITH UR
;
```

### 3. Participant by Fund and Source (QPAYOUT)

```sql
--YPRDSUGR.QPAYOUT   ***PROVIDES PARTICIPANT BY FUND AND
--SOURCE  ONCE RUN PIVOT BY FUND
SELECT  B.CASE_NO, B.SOC_SEC_NO, B.EE_LAST_NM, B.EE_FST_MID_NM, A.CTRB_TYP_CD, A.FD_DESC_CD, SUM(A.TR_AMT)*-1 AS AMOUNT 
FROM  TDA.TRANSACT_DETAIL A,
   TDA.EMPLOYEE B
WHERE  A.SOC_SEC_NO = B.SOC_SEC_NO
AND   B.CASE_NO = 'TT069214  00001'
AND   A.CASE_NO LIKE 'TT069214_  00001%'
--AND   B.EE_DIV_NO = 'COGS'
AND   A.TR_REVSL_DISP_CD = '0'
AND   A.TR_REVSL_DT = ''
AND   A.EFF_DT = '20090123'
AND   A.TR_NO BETWEEN '3000' AND '5999'
GROUP BY B.CASE_NO, B.SOC_SEC_NO, B.EE_LAST_NM, B.EE_FST_MID_NM, A.CTRB_TYP_CD, A.FD_DESC_CD
FOR FETCH ONLY WITH UR
 ;
```

### 4. YTD Contribution (YTDCONT)

```sql
--YPRDSUGR.YTDCONT    ***PROVIDE YTD CONTRIBUTION ONCE RUN
--PIVOT BY SOURCE
  SELECT A.CASE_NO, A.SOC_SEC_NO,EE_FST_MID_NM,EE_LAST_NM,SUM(TR_AMT),         
         CTRB_TYP_CD                                                                                                                              
  FROM TDA.VTRANSACT_DETAIL A, TDA.VEMPLOYEE B                                                                                                      
  WHERE A.CASE_NO LIKE 'TT069214%'                                                   
  AND A.CASE_NO = B.CASE_NO                                                    
  AND A.SOC_SEC_NO = B.SOC_SEC_NO                                              
  AND A.SOC_SEC_NO LIKE '%-%-%' 
  --AND B.EE_DIV_NO = 'COGS'                                               
  AND TR_REVSL_DISP_CD = '0'                                                   
  AND TR_TYP_CD = '1'                                                          
  AND PLAN_YR_DT = '2009'                                            
  AND TR_NO = '1001'                                                                                                                                        
  GROUP BY A.CASE_NO, A.SOC_SEC_NO,EE_FST_MID_NM,EE_LAST_NM,CTRB_TYP_CD
;
```

### 5. Fixed-Fund Bucket Balance by Plan

```sql
---PROVIDES FIXED FUND BUCKET BALANCE BY PLAN

SELECT SUM(TR_AMT*-1), EFF_DT, A.FD_NO, A.BKT_NO, D.FD_FUND_NAME, tr_no                                                                                        
FROM TDA.VTRANSACT_DETAIL A, TDA.VCONTRACT_FUNDDATA B,          
     TDA.VCASE_DATA C, TDA.VFUNDDESC D                                                                                                
WHERE A.CASE_NO = 'TT069214  00001'                                              
  AND A.CASE_NO = C.CASE_NO                                             
  AND B.CONT_NO = C.CONT_NO                                             
  AND D.FD_DESCR_CODE = B.FD_DESC_CD                                    
  AND ((A.FD_NO IN ('01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16')       
  AND B.FD_NO=SUBSTR(A.FD_NO,2,1))                                      
  OR A.FD_NO=B.FD_NO)                                                   
  AND TR_NO BETWEEN '3000' AND '5999'                                   
  AND TR_REVSL_DISP_CD = '0'                                            
  AND EFF_DT >= '20090123' 
  AND A.FD_NO = '01'                                                
GROUP BY EFF_DT, A.FD_NO, A.BKT_NO, D.FD_FUND_NAME, tr_no                         
                                                                        
ORDER BY FD_NO, EFF_DT, tr_no                                                  
WITH UR;
```

### 6. Fixed-Fund Bucket Balance by Participant

```sql
--YPRDSUGR.QPAYOUT  ***PROVIDES FIXED FUND BUCKET BALANCE
--BY PARTICIPANT  PIVOT BY BUCKET ONCE QUERY RUN
SELECT SUBSTR(A.CASE_NO,11,5),A.SOC_SEC_NO, B.EE_LAST_NM, B.EE_FST_MID_NM, CTRB_TYP_CD,FD_NO, A.BKT_NO, SUM(TR_AMT)*-1                                               
FROM TDA.VTRANSACT_DETAIL A, TDA.VEMPLOYEE B     
WHERE A.CASE_NO = 'TT069214  00001'                                                     
AND A.EFF_DT='20090123'                                                           
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

## Output

Each of the six queries produces its own result set, all centered on the January 23, 2009 conversion effective date and the TT069214 contract. Results are used to reconcile the Riverside internal-conversion side of the books.

## Related Queries

- [[takeover-data-internal-mergers]] — same query family, different plan
- [[internal-conversion]] — the process this query supports
- [[post-conversion-audit-queries]] — audit run on the destination plan

## See Also

- [[riverside]]
- [[internal-conversion]]
- [[tda-region]]
- [[vtransact-detail]]
- [[fixed-fund]]
- [[qpayout]]
- [[ytdcont]]
- [[lm-dc]]
- [[takeover-coordinator]]
