---
title: "Query: TO_Balances — Takeover Balance Extract"
type: query
tags: [query, sql, takeover, balances, audit]
used-by-role: [lm-dc, qa]
used-in-process: [[final-takeover-audit]]
aqt-parameters: [CASE_NO, EFF_DT]
tables: [CORP.TRANSACT_DETAIL, PENSION.PLAN_SRC_DETAIL, PENSION.PLAN_PROVISION, PENSION.PLAN_PROV_GRP, CORP.EMPLOYEE, PENSION.PLAN_FUND, CORP.CONTRACT_FUND_DATA, CORP.CASE_DATA]
systems: [aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Query: TO_Balances — Takeover Balance Extract

Pulls takeover balance transactions (TR_NO 1006, 1119) for a plan with source names and fund names joined in, excluding dummy/holding account SSNs.

## Purpose

Produces a row-level extract of all takeover balance transactions for a plan. Used to verify the conversion balance load matches the takeover file received from the prior recordkeeper. Each row shows SSN, transaction reference, fund, source, amount, effective date, and loader identity — the standard shape for a balance audit pack deliverable.

## When to Run

After the takeover balance file has been loaded into P3. Feeds the [[final-takeover-audit]] and the day-of / day-after wire audits ([[day-of-wire-audit]], [[day-after-wire-audit]]).

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| CASE_NO  pattern | `QK63283_  00080%` | Plan case number (underscore matches any character; preserves the exact spacing) |
| EFF_DT | `20250807` | Takeover effective date (commented out by default; uncomment to filter) |

## Tables Used
- `CORP.TRANSACT_DETAIL` — transaction rows (balance movements)
- `PENSION.PLAN_SRC_DETAIL` / `PENSION.PLAN_PROVISION` / `PENSION.PLAN_PROV_GRP` — source name and provision lookup
- `CORP.EMPLOYEE` — participant names
- `PENSION.PLAN_FUND` / `CORP.CONTRACT_FUND_DATA` / `CORP.CASE_DATA` — fund descriptor and fund-name join

## SQL

```sql
--****UPDATE****

--CASE_NO = QK63283_  00080
--CASE_NO = QK63283   00080
--CONT_NO LIKE 'QK63283_  00080%'
--EFF_DT = '20250807'

--BALANCE REPORT

SELECT TRANSLATE(A.CASE_NO,'','ABCDEFG') CASE_NO, A.SOC_SEC_NO, A.TR_REF_NO, a.FD_DESC_CD, fd_fund_name,A.SRC_I,(DOC_NM)AS SOURCE_NM,  A.TR_AMT, A.EFF_DT, a.MOD_TS ,a.USER_I
FROM
(SELECT CASE_NO , SOC_SEC_NO , TR_AMT , TR_NO, TR_REF_NO, EFF_DT , CYC_DT , TR_REVSL_DT , FD_NO , SRC_I, FD_DESC_CD, MOD_TS, USER_I
FROM CORP.TRANSACT_DETAIL  
                            
                                                           
WHERE CASE_NO LIKE 'QK63283_  00080%'
--AND EFF_DT = '20250807' 
AND TR_REVSL_DT =''
AND TR_NO IN ('1006','1119')                      
AND SOC_SEC_NO NOT LIKE ('%S%')
AND SOC_SEC_NO NOT LIKE ('%A%')

)AS A                
                                                          

LEFT JOIN

(SELECT DISTINCT C.ACCOUNT_NO ,A.SRC_I,  A.SRC_S, A.REPORT_1_NM, A.REPORT_2_NM, DOC_NM, ACTIVE_SRC_C, translation_c
FROM PENSION.PLAN_SRC_DETAIL A, PENSION.PLAN_PROVISION B, PENSION.PLAN_PROV_GRP C
WHERE A.SRC_I  = B.RELATED_I 
AND B.PROV_TYP_C = 1019 
AND B.ENRL_PROV_GRP_I=C.ENRL_PROV_GRP_I
AND ACCOUNT_NO LIKE 'QK63283_  00080%')AS B

ON A.SRC_I = B.SRC_I                              
                                                         
LEFT JOIN

(SELECT SOC_SEC_NO, EE_FST_MID_NM, EE_LAST_NM
FROM CORP.EMPLOYEE
WHERE CASE_NO IN ('QK63283   00080'))AS C

ON A.SOC_SEC_NO = C.SOC_SEC_NO                            

LEFT JOIN

(select  distinct case
	when a.RELATED_GRP_TYP_C=361 then account_no
	else (select account_no from pension.plan_prov_grp z where z.enrl_prov_grp_i=a.related_grp_i) end as account_no, c.FD_DESC_CD, trim(d.REPTG_1_FD_NM)||' '||trim(d.REPTG_2_FD_NM) as fd_fund_name,
c.FD_CLOSED_D 
	from pension.plan_prov_grp a, pension.plan_provision b, pension.plan_fund c, corp.contract_fund_data d, corp.CASE_DATA F
	where (ACCOUNT_NO LIKE 'QK63283_  00080%'
                 AND A.RELATED_GRP_TYP_C = 361 
                  OR (RELATED_GRP_I in (SELECT ENRL_PROV_GRP_I 
                                         FROM PENSION.PLAN_PROV_GRP  
                                        WHERE ACCOUNT_NO LIKE 'QK63283_  00080%'
                                          AND RELATED_GRP_TYP_C = 361) 
                      AND A.RELATED_GRP_TYP_C = 362))
	and a.enrl_prov_grp_i=b.enrl_prov_grp_i and provision_i=fd_prov_i
--	and fd_closed_d is null 
--	and fd_action_cd^='1' 
	and prov_typ_c=15
	and account_no=case_no
	and d.cont_no=F.cont_no
	AND C.FD_DESC_CD=D.FD_dESC_CD
)AS E

ON A.FD_DESC_CD = E.FD_DESC_CD

ORDER BY SOC_SEC_NO

FOR FETCH ONLY WITH UR
;
```

## Output / What to Look For

- Total dollars by source/fund must tie to the takeover file totals.
- Participant SSNs should all be real (xxx-xx-xxxx format); rows with %S% or %A% patterns are intentionally excluded as those are [[dummy-participant]] and advanced-employer-style holding-account SSNs.
- TR_NO `1006` is the standard takeover contribution transaction; TR_NO `1119` is the fund-reregistration variant — see [[takeover-typ-c-chart]] for the takeover type code semantics.
- Zero-balance rows or missing fund names indicate [[fund-mapping]] issues.

## Related Queries
- [[to-deferrals]]
- [[to-allocations]]
- [[to-basis]]
- [[to-ytd-contrib]]
- [[takeover-data-internal-mergers]]

## See Also
- [[final-takeover-audit]]
- [[booking-assets]]
- [[conv-file]]
- [[fund-mapping]]
- [[source-mapping]]
