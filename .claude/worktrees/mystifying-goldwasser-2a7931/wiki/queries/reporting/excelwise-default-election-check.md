---
title: "Excelwise Financial Guidelines — Default Election Check"
type: query
tags: [query, reporting, financial-guide, default-election, ppa, enrollment, excelwise]
used-by-role: [lm-dc, financial-guide-analyst]
used-in-process: [financial-guidelines-file-upload, default-election-audit]
aqt-parameters: [ACCOUNT_NO, MOD_TS]
tables:
  - PENSION.PART_ENRL_XREF
  - PENSION.PART_ELECT_DETAIL
  - PENSION.PART_PPA_DEFAULT
  - CORP.PART_SERVICE_DATA
  - CORP.PLAN_PROV_GRP
systems: [db2, aqt, prk, file-services-dashboard]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Excelwise Financial Guidelines — Default Election Check

Four-query set for validating participant enrollment data before uploading Excelwise Financial Guidelines files through the File Services Dashboard. Pulls `PART_ENRL_I` values, current elections by max `EFF_D`, PPA defaults, and financial-guide subscriptions (service type `6007`).

## Purpose

When Financial Guidelines (a third-party recommendation engine) returns a file of recommended deferral percentages or allocations, the LM DC must upload it via the File Services Dashboard. The dashboard needs `PART_ENRL_I` (not SSN) as the participant key, so the first query dumps the xref.

The remaining three queries confirm:

2. Each participant's current allocation elections at max `EFF_D` — confirms the file isn't overwriting fresher user-driven elections
3. Each participant's current PPA default (`ENRL_SERV_TYP_C = 2`) — confirms no conflict with auto-default behavior
4. Who is subscribed to the Financial Guide service on the plan (`SERV_TYP_C = 6007`) — confirms the upload population matches the subscriber population

## When to Run

Before every Financial Guidelines file upload, typically one business day before the file goes to File Services Dashboard. Run query 1 first to generate the `PART_ENRL_I` column for the upload file.

## Parameters

| Parameter | Example | Notes |
|-----------|---------|-------|
| ACCOUNT_NO | `QK63283_  00001%` | Plan pattern — `_` matches the space |
| MOD_TS | `20250328` | Date of file generation — used for the current-election filter |

## Tables

- **PENSION.PART_ENRL_XREF** — SSN-to-`PART_ENRL_I` cross-reference
- **PENSION.PART_ELECT_DETAIL** — participant allocation elections by source
- **PENSION.PART_PPA_DEFAULT** — PPA-default indicator
- **CORP.PART_SERVICE_DATA** — service subscriptions
- **CORP.PLAN_PROV_GRP** — plan lookup

## SQL

### 1. Get PART_ENRL_I for File Upload

```sql
--UPDATE THE PLAN NUMBER:  QK63283_  00001%
--UPDATE THE MOD_TS = 20250328

--GETS THE PART_ENRL_I TO INPUT ON THE FILE TO UPLOAD VIA FILE SERVICES DASHBOARD
SELECT ACCOUNT_NO , SOC_SEC_NO, PART_ENRL_I 
FROM PENSION.PART_ENRL_XREF
WHERE ACCOUNT_NO LIKE 'QK63283_  00001%'
--AND SOC_SEC_NO IN ('223-51-8517','223-51-8518')
```

### 2. Show All Fund Allocations and Percentages per Participant

```sql
--SHOWS ALL THE FUNDS AND PERCENTAGES THE PPT WRITE TO
select ACCOUNT_NO ,b.soc_sec_no, a.FD_DESC_C, a.ELEC_P, a.EFF_D
from PENSION.part_elect_detail a, PENSION.PART_ENRL_XREF b
where a.PART_ENRL_I in (select PART_ENRL_I
                from PENSION.PART_ENRL_XREF
                where account_no like 'QK63283_  00001%')
and a.ENRL_PROV_GRP_I = b. ENRL_PROV_GRP_I
and a.PART_ENRL_I = b.PART_ENRL_I
 AND A.EFF_D = (SELECT MAX(EFF_D) AS EFF_D 
                FROM PENSION.PART_ELECT_DETAIL E
                WHERE E.PART_ENRL_I = A.PART_ENRL_I
				AND ACCOUNT_NO LIKE 'QK63283_  00001%')
--AND SOC_SEC_NO IN ('223-51-8517','223-51-8518')
--AND DATE(A.MOD_TS) BETWEEN '20240221' AND  '20250328'
--AND DATE(MOD_TS) =  '20250328'

;
```

### 3. PPA Default Check

```sql
-- PART_PPA_DEFAULT
SELECT *
FROM PENSION.PART_PPA_DEFAULT
WHERE ACCOUNT_NO LIKE 'QK63283_  00001%'
--AND SOC_SEC_NO IN ('223-51-8517','223-51-8518')
AND ENRL_SERV_TYP_C = '2'


;
```

### 4. Financial Guide Subscribers

```sql
--SHOWS WHOS ALL SUBSCRIBED
SELECT *
FROM CORP.PART_SERVICE_DATA
WHERE ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I
FROM CORP.PLAN_PROV_GRP
WHERE ACCOUNT_NO LIKE 'QK63283_  00001%')
--AND SOC_SEC_NO IN ('223-51-8517','223-51-8518')
AND SERV_TYP_C = 6007 -- CODE FOR FINANCIAL GUIDE
--AND DATE(MOD_TS) =  '20250328'
```

## Output

- Query 1 returns `(ACCOUNT_NO, SOC_SEC_NO, PART_ENRL_I)` for every enrolled participant on the plan — this feeds directly into the File Services Dashboard upload.
- Query 2 returns `(ACCOUNT_NO, SOC_SEC_NO, FD_DESC_C, ELEC_P, EFF_D)` — current allocation percentages per fund.
- Query 3 returns full `PART_PPA_DEFAULT` row for each participant with `ENRL_SERV_TYP_C='2'`.
- Query 4 returns all `PART_SERVICE_DATA` rows where the participant is subscribed to service type `6007` (Financial Guide).

## Related Queries

- [[post-conversion-audit-queries]] — default-election check on the audit side
- [[get-plan-source]] — to resolve any ambiguous source references in elections

## See Also

- [[financial-guide]]
- [[file-services-dashboard]]
- [[part-enrl-xref]]
- [[part-elect-detail]]
- [[part-ppa-default]]
- [[ppa-default]]
- [[excelwise]]
- [[lm-dc]]
