---
title: "Query: TO_Deferrals — Takeover Deferral Verification"
type: query
tags: [query, sql, takeover, deferrals, auto-enrollment]
used-by-role: [lm-dc, qa]
used-in-process: [[final-takeover-audit]]
aqt-parameters: [ACCOUNT_NO]
tables: [PENSION.PART_DEF_DATA, PENSION.PLAN_DEFERRAL_GRP, PENSION.PLAN_PROV_GRP, PENSION.PART_PPA_DEFAULT, CORP.EMPLOYEE]
systems: [aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Query: TO_Deferrals — Takeover Deferral Verification

Validates deferral elections loaded into `PART_DEF_DATA`, confirms totals tie to the takeover file, and checks that every participant on an auto-enrolled plan has a row in `PART_PPA_DEFAULT`.

## Purpose

After a deferral file is loaded, this query set confirms: (1) every participant's deferral amount / percentage is in the system with correct deferral group; (2) the sums match the takeover file; (3) for auto-enrolled plans, every participant has a corresponding default row (`PART_PPA_DEFAULT` with `ENRL_SERV_TYP_C=1`); and (4) catchup elections are preserved.

## When to Run

Run the first `SELECT` before loading to verify no rows exist; rerun the full suite after the file is loaded to verify counts and totals against the inbound file.

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| ACCOUNT_NO | `QK63283   00092` | Plan case number |

## Tables Used
- `PENSION.PART_DEF_DATA` — participant deferral elections
- `PENSION.PLAN_DEFERRAL_GRP` — deferral group metadata (pre-tax, Roth, after-tax names)
- `PENSION.PLAN_PROV_GRP` — plan provision group
- `PENSION.PART_PPA_DEFAULT` — auto-enrollment / QDIA default rows
- `CORP.EMPLOYEE` — participant list

## SQL

```sql
--TO_DEFERRAL

--UPDATES:
-- ACCOUNT_NO = 'QK63283   00092'

--VERIFY IF ANY ROWS EXIST PRIOR TO LOADING. THEN RERUN AFTER FILE LOADED
SELECT ACCOUNT_NO, a.SOC_SEC_NO , b.DEF_GRP_NM,  a.DEF_P, a.DEF_A , a.STAT_C , a.SRC_C , a.USER_I , a.TRANSMIT_C , a.EFF_D , a.DATA_CH_ORIG_C , a.CATCHUP_A , a.CATCHUP_EFF_D , a.CATCHUP_P , a.START_D , a.DEF_CHNG_REASON_C , a.CATCHUP_ELEC_C , a.OBF_TRIG_EFF_D , a.OBF_TRIG_REASON_C , a.REVERSE_FEED_TRANSMIT_C , a.REVERSE_FEED_PROCESS_TS 
FROM PENSION.PART_DEF_DATA a, PENSION.PLAN_DEFERRAL_GRP B, PENSION.PLAN_PROV_GRP C
WHERE a.ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I
					      FROM PENSION.PLAN_PROV_GRP
						  WHERE ACCOUNT_NO = 'QK63283   00092')
--AND SOC_SEC_NO IN ('502-78-0460',
--'186-50-1976',
--'179-52-1499',
--'188-40-7932',
--'211-68-8625',
--'291-76-3771',
--'206-60-1886',
--'160-64-7673',
--'199-58-0035',
--'504-02-2815',
--'309-60-5448',
--'192-40-7392',
--'210-40-3423')
AND STAT_C = 'A'
AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
AND A.DEF_GRP_I = B.DEF_GRP_I
AND A.ENRL_PROV_GRP_I = C.ENRL_PROV_GRP_I

;
--VERIFY THE TOTAL AMOUNT/PERCENTAGE IS THE SAME AS FILE
SELECT DEF_GRP_NM ,SUM(DEF_A) AS AMT, SUM(DEF_P) AS PERCENT, SUM(CATCHUP_A) AS CATCH_AMT, SUM (CATCHUP_P) AS CATCH_P
FROM PENSION.PART_DEF_DATA A, PENSION.PLAN_DEFERRAL_GRP B
WHERE A.ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I
					      FROM PENSION.PLAN_PROV_GRP
						  WHERE ACCOUNT_NO = 'QK63283   00092')
--AND SOC_SEC_NO IN ('000-00-0880')
AND A.DEF_GRP_I = B.DEF_GRP_I
--AND DATE(A.MOD_TS) = '2014-09-29'  -- use in mergers where ppts already exist on plan
GROUP BY DEF_GRP_NM 

;
--IF PLAN IS AUTO ENROLLED, A ROW SHOULD WRITE TO THIS TABLE.  VERIFY COUNT IS SAME AS FILE. EXPORT
SELECT *
FROM PENSION.PART_PPA_DEFAULT
WHERE ACCOUNT_NO = 'QK63283   00092'
AND ENRL_SERV_TYP_C = '1'
--AND DATE(MOD_TS) = '2014-09-29'  -- use in mergers where ppts already exist on plan

;

--RESEARCH CATCHUP
SELECT SOC_SEC_NO , DEF_GRP_I, DEF_A, DEF_P, EFF_YR, TRANSMIT_C, STAT_C , CATCHUP_A , CATCHUP_EFF_D , CATCHUP_P 
FROM PENSION.PART_DEF_DATA
WHERE ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I
					     FROM PENSION.PLAN_PROV_GRP
						 WHERE ACCOUNT_NO = 'QK63283   00092')
AND STAT_C = 'A'
group by SOC_SEC_NO , DEF_GRP_I, DEF_A, DEF_P, EFF_YR, TRANSMIT_C, STAT_C , CATCHUP_A , CATCHUP_EFF_D , CATCHUP_P 
having CATCHUP_A > 0.00 or CATCHUP_P > 0.00

---check to see if all ppts have a row when auto enrollment is turned on.  BLANK IS GOOD; IF PPTS COME UP THAT MEANS THEY ARE NOT IN THE PART_PPA_DEFAULT TABLE AND FURTHER RESEARCH IS NEEDED.
SELECT *
FROM CORP.EMPLOYEE
WHERE CASE_NO = 'QK63283   00092'
AND SOC_SEC_NO NOT IN (SELECT SOC_SEC_NO
					   FROM PENSION.PART_PPA_DEFAULT
					   WHERE ACCOUNT_NO = 'QK63283   00092')
```

## Output / What to Look For

- `DEF_GRP_NM` totals (pre-tax, Roth, after-tax, catchup) must tie to the takeover file.
- On auto-enrolled plans, the final query should return zero rows — every employee must have a `PART_PPA_DEFAULT` row with `ENRL_SERV_TYP_C=1`. Any SSNs returned are a load failure that prevents auto-enrollment from running.
- `STAT_C='A'` on current elections; catchup columns populated only for participants age 50+.
- For mergers where participants already exist on the plan, the commented `DATE(MOD_TS)` filter isolates only the rows loaded in the current conversion batch.

## Related Queries
- [[to-balances]]
- [[to-allocations]]
- [[excelwise-default-election-check]]

## See Also
- [[deferrals]]
- [[final-takeover-audit]]
- [[default-deferral-analysis]]
