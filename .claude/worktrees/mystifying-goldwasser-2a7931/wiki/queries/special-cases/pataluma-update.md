---
title: "Pataluma — Access Code Update"
type: query
tags: [query, special-case, pataluma, access-cd, update, tdav, soc-sec-no-temp-table]
used-by-role: [lm-dc, plan-installer]
used-in-process: [special-case-remediation, access-code-update]
aqt-parameters: [CASE_NO]
tables:
  - TDAV.VEMPLOYEE
  - TDAV.VTRANSACT_DETAIL
  - SOC_SEC_NO (user-owned temp table)
systems: [db2, aqt, tdav]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Pataluma — Access Code Update

Special-case update to set `ACCESS_CD='1'` on a dynamic list of participants on plan `TA080198  00001`, using a user-owned `SOC_SEC_NO` temp table to drive the IN-clause. Also includes a related transaction-detail lookup against plan `TT069238  00001`.

## Purpose

The Pataluma case required flipping access codes on a specific cohort of participants without touching everyone else on the plan. Rather than hard-coding the SSN list inside the UPDATE (which is brittle and would force the SQL to be rewritten each time the list changes), the approach creates a simple local table named `SOC_SEC_NO` with one column (also named `soc_sec_no`) and uses an `IN (SELECT ...)` to drive the update.

The second query is a transaction-detail lookup on a different plan (`TT069238  00001`), pulling `TR_PRNC_AMT` and `CTRB_TYP_CD` for participants whose `Class_I = 0`.

## When to Run

Only for the specific special case. The update statement is destructive — coordinate with the plan installer and confirm the `SOC_SEC_NO` driver table contents before running.

> **Warning — destructive UPDATE.** The first statement is an UPDATE against `TDAV.VEMPLOYEE`. Always SELECT first (as shown in the top block with the SELECT commented `--Update` above it) to confirm the target rows before switching to the UPDATE form.

## Parameters

| Parameter | Example | Notes |
|-----------|---------|-------|
| CASE_NO (update) | `TA080198  00001` | Pataluma plan |
| CASE_NO (lookup) | `TT069238  00001` | Companion lookup plan |
| ACCESS_CD | `1` | Value being set |

## Tables

- **TDAV.VEMPLOYEE** — employee view — the update target
- **TDAV.VTRANSACT_DETAIL** — transaction-detail view for the companion SELECT
- **SOC_SEC_NO** — user-owned single-column driver table created via `CREATE TABLE soc_sec_no (soc_Sec_no char(11))`

## SQL

```sql
SELECT *--SOC_SEC_NO , EE_LAST_NM, EE_FST_MID_NM,  EE_BRTH_DT, EE_HIRE_DT  , EE_TERM_DT, EE_DIV_NO,  CLASS_I                                       
from
--Update
    tdaV.VEMPLOYEE                             


SET ACCESS_CD = '1'                             
--SET ELIG_PRC_STAT_C                                
--EE_EDP_IND_CD = '1'    
where                            
CASE_NO='TA080198  00001'        
--and Class_I = 0            
 --    and EE_TERM_DT ^='00000000'                                                
--AND SOC_SEC_no in('410-41-9831','585-25-3384','251-49-7833')                    
--AND PART_STAT_CD='14'                              
--AND FILE_INPUT_SRC_CD LIKE 'QK61850   020220NT%'   
--D EE_DEF_EFF_DT='2003-10-23'                       
--ORDER BY FILE_INPUT_SRC_CDELIGELIG                 
--ORDER BY EE_LAST_NM,EE_FST_MID_NMPRC PRC           
--ORDER BY SOC_SEC_NOSTATSTAT                        
--AND SOC_SEC_NO IN(SELECT SOC_SEC_NO C   C          
--FROM TDA.VTAPEIN_FILES                             
--WHERE FILE_NM= 'LENO41022A')    
--and ee_cyc_dt= '20050421'
--group by soc_Sec_no                   



AND SOC_SEC_NO in           
(SELECT SOC_SEC_NO               
FROM SOC_SEC_NO)               

-----------------------
SELECT     SOC_SEC_NO,    TR_PRNC_AMT,  CTRB_TYP_CD  
FROM TDAV.VTRANSACT_DETAIL      
WHERE CASE_NO='TT069238  00001'
AND SOC_SEC_NO in           
(SELECT SOC_SEC_NO   
                                     
FROM     tdaV.VEMPLOYEE                             
 
where                            
CASE_NO='TT069238  00001'        
and Class_I = 0   )




Create table soc_sec_no
(soc_Sec_no char(11))
```

## Output

- The SELECT (top block) returns the full VEMPLOYEE rows for Pataluma participants in the driver table.
- When flipped to UPDATE form, no row set is returned; the update takes effect after COMMIT.
- The second SELECT returns `(SOC_SEC_NO, TR_PRNC_AMT, CTRB_TYP_CD)` for TT069238 participants with `Class_I = 0`.

## Related Queries

- [[riverside-balances]] — another TDA-region special-case pull
- [[post-conversion-audit-queries]] — for general-purpose audits

## See Also

- [[pataluma]]
- [[access-cd]]
- [[class-i]]
- [[tdav]]
- [[special-cases]]
- [[lm-dc]]
- [[plan-installer]]
