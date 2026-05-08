---
title: "Query: TO_Allocations — Takeover Allocation Verification"
type: query
tags: [query, sql, takeover, allocations, elections]
used-by-role: [lm-dc, qa]
used-in-process: [[final-takeover-audit]]
aqt-parameters: [ACCOUNT_NO]
tables: [PENSION.PART_ELECT_DETAIL, PENSION.PART_ENRL_XREF, PENSION.PART_PPA_DEFAULT, PENSION.PART_ENRL, PENSION.GET_PART_ENRL, PENSION.PLAN_PROV_GRP, CORP.EMPLOYEE, CORP.TRANSACT_DETAIL]
systems: [aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Query: TO_Allocations — Takeover Allocation Verification

Validates participant investment elections loaded into `PART_ELECT_DETAIL`, including current (max EFF_D) rows, historical rows, default-fund rows in `PART_PPA_DEFAULT`, and cross-checks against the employee and transaction tables.

## Purpose

Confirms that every participant has an election that matches the takeover allocations file, that the most recent `EFF_D` row is correct, that `PART_PPA_DEFAULT` (`ENRL_SERV_TYP_C=2`) has a row for every employee on QDIA plans, and that counts tie across `EMPLOYEE`, `PART_ELECT_DETAIL`, and `PART_PPA_DEFAULT`. Also flags participants with balances but no election — the canonical "missing election" audit check.

## When to Run

After loading the takeover allocations file. Part of the [[final-takeover-audit]].

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| ACCOUNT_NO pattern | `QK63283_  00092%` | Plan case number (underscore matches single character) |

## Tables Used
- `PENSION.PART_ELECT_DETAIL` — participant fund election rows
- `PENSION.PART_ENRL_XREF` / `PENSION.GET_PART_ENRL` — participant enrollment lookup
- `PENSION.PART_PPA_DEFAULT` — QDIA / default allocation rows
- `PENSION.PART_ENRL` — participant enrollment
- `CORP.EMPLOYEE` — plan employee list
- `CORP.TRANSACT_DETAIL` — balance transactions (used for orphan-balance audit)

## SQL

```sql

--UPDATE:  like 'QK63283_  00092%'
--		 REGION = CORP

-- Pulls in the max effective date for allocations.
select b.soc_sec_no, a.*
from PENSION.part_elect_detail a, PENSION.GET_PART_ENRL b
where a.PART_ENRL_I in (select PART_ENRL_I
                from PENSION.PART_ENRL_XREF
                where account_no like 'QK63283_  00092%')
--                and soc_sec_no in ())

and a.ENRL_PROV_GRP_I = b. ENRL_PROV_GRP_I
and a.PART_ENRL_I = b.PART_ENRL_I
 AND A.EFF_D = (SELECT MAX(EFF_D) AS EFF_D 
                FROM PENSION.PART_ELECT_DETAIL E
                WHERE E.PART_ENRL_I = A.PART_ENRL_I
				AND ACCOUNT_NO LIKE 'QK63283_  00092%')


;

--Pulls historical allocation rows
SELECT B.ACCOUNT_NO, B.SOC_SEC_NO, A.*
FROM PENSION.PART_ELECT_DETAIL A, PENSION.PART_ENRL_XREF B
WHERE A.ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I
						  FROM PENSION.PLAN_PROV_GRP
						  WHERE ACCOUNT_NO LIKE 'QK63283_  00092%')
AND A.PART_ENRL_I IN (SELECT PART_ENRL_I
					FROM PENSION.PART_ENRL_XREF
					WHERE ACCOUNT_NO LIKE 'QK63283_  00092%')
--				    AND SOC_SEC_NO IN ())
AND A.PART_ENRL_I = B.PART_ENRL_I
AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I

;

-- VERIFY THERE IS A RECORD IN PART_PPA_DEFAULT FOR ALL EMPLOYEES
SELECT *
FROM PENSION.PART_PPA_DEFAULT
WHERE ACCOUNT_NO LIKE 'QK63283_  00092%'
AND ENRL_SERV_TYP_C = '2'
--AND STAT_C = 'A'
;


-- CHECKS TO SEE IF THERE ARE ANY PPTS THAT DO NOT HAVE AN ALLOCATION BUT ARE IN THE EMPLOYEE TABLE
SELECT B.SOC_SEC_NO, C.EE_TERM_DT, A.*
FROM PENSION.PART_ENRL A, PENSION.GET_PART_ENRL B, CORP.EMPLOYEE C
WHERE A.PART_ENRL_I NOT IN (SELECT PART_ENRL_I
						  FROM PENSION.PART_ELECT_DETAIL
						  WHERE ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I
												    FROM PENSION.PLAN_PROV_GRP
													WHERE ACCOUNT_NO LIKE 'QK63283_  00092%'))
AND A.ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I
					    FROM PENSION.PLAN_PROV_GRP
						WHERE ACCOUNT_NO LIKE 'QK63283_  00092%')
AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
AND A.PART_ENRL_I = B.PART_ENRL_I
AND B.SOC_SEC_NO = C.SOC_SEC_NO
AND B.ACCOUNT_NO = C.CASE_NO


--  VERIFY PPT COUNT IN EMPLOYEE TABLE MATCHES PPT COUNT IN PART_ELECT_DETAIL & PART_PPA_DEFAULT (FOR ALLOCATIONS ONLY)


--Employee
SELECT CASE_NO, COUNT (SOC_SEC_NO) AS SOC_SEC_NO
FROM
(SELECT DISTINCT SUBSTR(CASE_NO,1,8)||'  '||SUBSTR(CASE_NO,11,5) AS CASE_NO, SOC_SEC_NO
FROM CORP.EMPLOYEE
WHERE CASE_NO LIKE 'QK63283_  00092%') AS A
GROUP BY CASE_NO


;
-- Part_elect_detail
SELECT ACCOUNT_NO, COUNT(DISTINCT (PART_ENRL_I) AS SSN_COUNT)
FROM PENSION.PART_ELECT_DETAIL A, PENSION.PLAN_PROV_GRP B
WHERE A.ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I
						  FROM PENSION.PLAN_PROV_GRP
						  WHERE ACCOUNT_NO LIKE 'QK63283_  00092%')
AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
AND B.ACCOUNT_NO LIKE 'QK63283_  00092%'
AND PART_ENRL_I IN (SELECT PART_ENRL_I
					FROM PENSION.PART_ENRL_XREF
					WHERE ACCOUNT_NO LIKE 'QK63283_  00092%')
--				    AND SOC_SEC_NO IN ())
GROUP BY ACCOUNT_NO

;



-- SUM ALLOCATIONS BY FUND AND SOURCE, VERIFY IT EQUALS TABLE
SELECT COUNT (PART_ENRL_I) AS SSN_COUNT , FD_DESC_C, SRC_I, SUM(ELEC_P) AS ELEC_TOTAL
FROM PENSION.PART_ELECT_DETAIL 
WHERE  PART_ENRL_I IN (SELECT PART_ENRL_I
				    FROM PENSION.PART_ENRL_XREF
					WHERE ACCOUNT_NO LIKE 'QK63283_  00092%')
--					AND SOC_SEC_NO IN ())

GROUP BY FD_DESC_C , SRC_I 


;
-- PART_PPA_DEFAULT
SELECT ACCOUNT_NO, COUNT(SOC_SEC_NO) AS SSN_COUNT 
FROM PENSION.PART_PPA_DEFAULT
WHERE ACCOUNT_NO LIKE 'QK63283_  00092%'
--AND SOC_SEC_NO IN ()
AND ENRL_SERV_TYP_C = '2'
GROUP BY ACCOUNT_NO


;

;
-- NEXT TWO QUERIES WILL AID IN RESEARCH
SELECT DISTINCT B.SOC_SEC_NO
FROM PENSION.PART_ELECT_DETAIL A, PENSION.GET_PART_ENRL B
WHERE  A.PART_ENRL_I IN (SELECT PART_ENRL_I
				    FROM PENSION.PART_ENRL_XREF
					WHERE ACCOUNT_NO LIKE 'QK63283_  00092%')
AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
AND A.PART_ENRL_I = B.PART_ENRL_I
--AND SOC_SEC_NO in ()

;

SELECT DISTINCT SOC_SEC_NO, CASE_NO 
FROM CORP.EMPLOYEE
WHERE CASE_NO LIKE 'QK63283_  00092%'
--AND SOC_SEC_NO  = '153-44-2830'

;
--  EMPLOYEES IN TRANSACT-DETAIL THAT DO NOT HAVE A ROW IN PART_ELECT_DETAIL
SELECT *
FROM CORP.TRANSACT_DETAIL
WHERE CASE_NO LIKE 'QK63283_  00092%'
AND SOC_SEC_NO IN (SELECT B.SOC_SEC_NO
FROM PENSION.PART_ENRL A, PENSION.GET_PART_ENRL B, CORP.EMPLOYEE C
WHERE A.PART_ENRL_I NOT IN (SELECT PART_ENRL_I
						  FROM PENSION.PART_ELECT_DETAIL
						  WHERE ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I
												    FROM PENSION.PLAN_PROV_GRP
													WHERE ACCOUNT_NO LIKE 'QK63283_  00092%'))
AND A.ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I
					    FROM PENSION.PLAN_PROV_GRP
						WHERE ACCOUNT_NO LIKE 'QK63283_  00092%')
AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
AND A.PART_ENRL_I = B.PART_ENRL_I
AND B.SOC_SEC_NO = C.SOC_SEC_NO
AND B.ACCOUNT_NO = C.CASE_NO)
AND CASE_NO LIKE 'QK63283_  00092%'

;

-- Pulls in the max effective date for allocations.
select b.soc_sec_no, a.*
from PENSION.part_elect_detail a, PENSION.GET_PART_ENRL b
where a.PART_ENRL_I in (select PART_ENRL_I
                from PENSION.PART_ENRL_XREF
                where account_no like 'QK63283_  00092%')
--                and soc_sec_no in ())

and a.ENRL_PROV_GRP_I = b. ENRL_PROV_GRP_I
and a.PART_ENRL_I = b.PART_ENRL_I
 AND A.EFF_D = (SELECT MAX(EFF_D) AS EFF_D 
                FROM PENSION.PART_ELECT_DETAIL E
                WHERE E.PART_ENRL_I = A.PART_ENRL_I
				AND ACCOUNT_NO LIKE 'QK63283_  00092%')


;

SELECT B.ACCOUNT_NO, B.SOC_SEC_NO, A.*
FROM PENSION.PART_ELECT_DETAIL A, PENSION.PART_ENRL_XREF B
WHERE A.ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I
						  FROM PENSION.PLAN_PROV_GRP
						  WHERE ACCOUNT_NO LIKE 'QK63283_  00092%')
AND A.PART_ENRL_I IN (SELECT PART_ENRL_I
					FROM PENSION.PART_ENRL_XREF
					WHERE ACCOUNT_NO LIKE 'QK63283_  00092%')
--				    AND SOC_SEC_NO IN ())
AND A.PART_ENRL_I = B.PART_ENRL_I
AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
```

## Output / What to Look For

- Max-`EFF_D` extract row count should equal the takeover allocations file row count.
- Every EMPLOYEE SSN should appear in both `PART_ELECT_DETAIL` (or have `PART_PPA_DEFAULT` default). Participants in `TRANSACT_DETAIL` with no `PART_ELECT_DETAIL` row are orphan-balance cases requiring QA resolution.
- Sum of `ELEC_P` grouped by `FD_DESC_C`, `SRC_I` should match the file's fund-level election totals (100% per participant per source when elections sum).
- `PART_PPA_DEFAULT` `ENRL_SERV_TYP_C=2` row count should equal the EMPLOYEE count for the plan.

## Related Queries
- [[to-balances]]
- [[to-deferrals]]
- [[excelwise-default-election-check]]

## See Also
- [[default-allocation-analysis]]
- [[final-takeover-audit]]
- [[faa-allocations]]
