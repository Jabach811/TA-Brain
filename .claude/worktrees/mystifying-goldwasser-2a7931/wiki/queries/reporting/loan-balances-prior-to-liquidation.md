---
title: "Loan Balances Prior to Plan Liquidation"
type: query
tags: [query, reporting, loan, liquidation, balances, tr-stat-cd]
used-by-role: [lm-dc, liquidation-analyst, reporting]
used-in-process: [plan-liquidation, pre-liquidation-audit]
aqt-parameters: [CASE_NO]
tables:
  - CORP.EMPLOYEE
  - CORP.LOAN_DETAIL
  - CORP.LOAN_REPAYMENT
systems: [db2, aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Loan Balances Prior to Plan Liquidation

Pulls the outstanding loan-principal-by-type snapshot for every non-closed loan on a plan, right before the plan is liquidated. The UNION ALL ensures both participants with loan repayments and participants with no repayments yet are represented.

## Purpose

When a plan is being liquidated, the LM DC needs a complete snapshot of every open loan so the liquidation agent can assess what must be deemed, offset, or otherwise handled. Closed loans (`LN_TR_STAT_CD` in `'3'`, `'4'`, `'E'`) are excluded.

Two UNION-ALL blocks:

1. **First SELECT** — participants who have made at least one repayment. Computes current outstanding balance per loan and per type as `INIT_LN_AMT - SUM(TYPn_LN_PRNC_AMT)` across the eight loan-type columns. HAVING clause filters out loans with zero outstanding.
2. **Second SELECT** — participants with no matching rows in `LOAN_REPAYMENT` at all. Returns the initial amounts as "NO PAYMENTS" so they are still visible in the final report.

## When to Run

Before plan liquidation cutover. Output goes to the liquidation analyst to reconcile against the liquidation-agent's internal records.

## Parameters

| Parameter | Example | Notes |
|-----------|---------|-------|
| CASE_NO | `QK62235   00001` | Plan case number; case-sensitive, preserve spaces |

## Tables

- **CORP.EMPLOYEE** — participant census
- **CORP.LOAN_DETAIL** — one row per loan, with the eight original `TYP_n_ORIG_LN_AMT` amounts and status / default dates
- **CORP.LOAN_REPAYMENT** — one row per amortization event with `TYP1..TYP8_LN_PRNC_AMT` principal-paid breakouts

## SQL

```sql
SELECT DISTINCT A.CASE_NO,SUBSTR(A.CASE_NO,11,5),   ln_tr_stat_cd,  ln_default_dt,                         
       A.SOC_SEC_NO,EE_LAST_NM,EE_FST_MID_NM,B.LOAN_NO,B.INIT_LN_AMT           
       ,BAS_BLENDED_LN_PCT,LN_REPAY_AMT,TYP_1_ORIG_LN_AMT,TYP_2_ORIG_LN_AMT,   
TYP_3_ORIG_LN_AMT,                                                             
       TYP_4_ORIG_LN_AMT,TYP_5_ORIG_LN_AMT,TYP_6_ORIG_LN_AMT,TYP_7_ORIG_LN_AMT,
       TYP_8_ORIG_LN_AMT,orig_ln_iss_dt, FST_LN_REPAY_DT,FINAL_LN_REPAY_DT,   
       LN_REPAY_FREQ_CD,LN_REPAY_CT,                                           
   B.INIT_LN_AMT-  SUM(TYP1_LN_PRNC_AMT+TYP2_LN_PRNC_AMT+TYP4_LN_PRNC_AMT+     
                       TYP3_LN_PRNC_AMT+                                       
                       TYP5_LN_PRNC_AMT+TYP6_LN_PRNC_AMT+TYP7_LN_PRNC_AMT+     
                       TYP8_LN_PRNC_AMT) as curr_bal                                   
  ,B.TYP_1_ORIG_LN_AMT - SUM(TYP1_LN_PRNC_AMT) AS TYPE_1
  ,B.TYP_2_ORIG_LN_AMT - SUM(TYP2_LN_PRNC_AMT) AS TYPE_2
  ,B.TYP_3_ORIG_LN_AMT - SUM(TYP3_LN_PRNC_AMT) AS TYPE_3                       
  ,B.TYP_4_ORIG_LN_AMT - SUM(TYP4_LN_PRNC_AMT) AS TYPE_4                       
  ,B.TYP_5_ORIG_LN_AMT - SUM(TYP5_LN_PRNC_AMT) AS TYPE_5                       
  ,B.TYP_6_ORIG_LN_AMT - SUM(TYP6_LN_PRNC_AMT) AS TYPE_6                       
  ,B.TYP_7_ORIG_LN_AMT - SUM(TYP7_LN_PRNC_AMT) AS TYPE_7                       
  ,B.TYP_8_ORIG_LN_AMT - SUM(TYP8_LN_PRNC_AMT) AS TYPE_8,                                
  LN_DEEMED_DEF_DT, MAX(LN_AMORTIZATION_DT) AS LAST_PAYMENT_MADE                             
                                                                               
FROM CORP.EMPLOYEE A,CORP.LOAN_DETAIL B,CORP.LOAN_REPAYMENT C                                                                                   
WHERE A.CASE_NO = B.CASE_NO AND A.SOC_SEC_NO=B.SOC_SEC_NO                      
 AND  A.CASE_NO = C.CASE_NO AND A.SOC_SEC_NO=C.SOC_SEC_NO  

 --AND A.EE_DIV_NO = 'COGS'                    
 AND   A.CASE_NO = 'QK62235   00001'               AND B.LOAN_NO=C.LOAN_NO              
AND B.LN_TR_STAT_CD not in ('3','4','E')                                                     
--  AND B.LN_DEFAULT_DT = '20060710'                                                
--  AND C.LN_AMORTIZATION_DT ^= '20060710'

GROUP  BY A.SOC_SEC_NO,EE_LAST_NM,EE_FST_MID_NM,B.LOAN_NO,B.INIT_LN_AMT        ,ln_default_Dt
,BAS_BLENDED_LN_PCT,LN_REPAY_AMT,TYP_1_ORIG_LN_AMT,TYP_2_ORIG_LN_AMT,          
       TYP_4_ORIG_LN_AMT,TYP_5_ORIG_LN_AMT,TYP_6_ORIG_LN_AMT,TYP_7_ORIG_LN_AMT,
       TYP_8_ORIG_LN_AMT,ORIG_LN_ISS_DT,FST_LN_REPAY_DT,FINAL_LN_REPAY_DT,     
       LN_REPAY_FREQ_CD,LN_REPAY_CT,A.CASE_NO   ,ln_tr_stat_cd                                
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
                                                                               
SELECT DISTINCT A.CASE_NO,SUBSTR(A.CASE_NO,11,5),      ln_tr_stat_cd,     ln_default_dt ,                    
       A.SOC_SEC_NO,EE_LAST_NM,EE_FST_MID_NM,B.LOAN_NO,B.INIT_LN_AMT           
       ,BAS_BLENDED_LN_PCT,LN_REPAY_AMT,TYP_1_ORIG_LN_AMT,TYP_2_ORIG_LN_AMT,   
TYP_3_ORIG_LN_AMT,                                                             
       TYP_4_ORIG_LN_AMT,TYP_5_ORIG_LN_AMT,TYP_6_ORIG_LN_AMT,TYP_7_ORIG_LN_AMT,
       TYP_8_ORIG_LN_AMT,orig_ln_iss_dt, FST_LN_REPAY_DT,FINAL_LN_REPAY_DT,       
       LN_REPAY_FREQ_CD,LN_REPAY_CT,                                           
   B.INIT_LN_AMT as curr_bal, B.TYP_1_ORIG_LN_AMT, B.TYP_2_ORIG_LN_AMT,                    
   B.TYP_3_ORIG_LN_AMT, B.TYP_4_ORIG_LN_AMT, B.TYP_5_ORIG_LN_AMT,              
   B.TYP_6_ORIG_LN_AMT, B.TYP_7_ORIG_LN_AMT, B.TYP_8_ORIG_LN_AMT,              
   LN_DEEMED_DEF_DT, 'NO PAYMENTS'                                             
                                                                               
FROM CORP.EMPLOYEE A,CORP.LOAN_DETAIL B                                
                                                                               
WHERE A.CASE_NO = B.CASE_NO AND A.SOC_SEC_NO=B.SOC_SEC_NO

--AND A.EE_DIV_NO = 'COGS'
 AND   A.CASE_NO = 'QK62235   00001'  
AND B.LN_TR_STAT_CD not in ('3','4','E')                                                   
-- AND B.LN_DEFAULT_DT = '20060710'                                                
 AND NOT EXISTS (SELECT * FROM CORP.LOAN_REPAYMENT C                      
                  WHERE A.CASE_NO = C.CASE_NO                                  
                  AND A.SOC_SEC_NO = C.SOC_SEC_NO                              
                  AND B.LOAN_NO = C.LOAN_NO )
                  

                                   
--                  AND LN_AMORTIZATION_DT ^= '20060710')                           
                                                                               
GROUP  BY A.SOC_SEC_NO,EE_LAST_NM,EE_FST_MID_NM,B.LOAN_NO,B.INIT_LN_AMT   ,ln_tr_stat_cd     ,ln_default_dt
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
```

## Output

One row per (participant, loan) combination. Columns include:

- Case number, division suffix (`SUBSTR(CASE_NO,11,5)`), status code, default date
- SSN, name, loan number, initial amount, blended rate, repay amount
- `TYP_1..TYP_8_ORIG_LN_AMT` (initial amounts by type)
- Issue date, first repay date, final repay date, frequency code, repay count
- `curr_bal` — current outstanding principal
- `TYPE_1..TYPE_8` — current outstanding by type
- Deemed default date
- Last payment made (or `'NO PAYMENTS'` for the second UNION block)

## Related Queries

- [[loan-balance-audit-and-accrued-interest]] (sibling pages handled by other agent)
- [[post-conversion-audit-queries]] — Section 11 checks — similar loan-outstanding pattern
- [[counts-and-totals-gamble]] — loan-bal CTE uses similar logic against `LOAN_HISTORY`

## See Also

- [[liquidation]]
- [[loan-detail]]
- [[loan-repayment]]
- [[ln-tr-stat-cd]]
- [[deemed-default]]
- [[lm-dc]]
