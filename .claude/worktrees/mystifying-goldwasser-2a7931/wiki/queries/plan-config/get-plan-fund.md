---
title: "Query: Get Plan Fund"
type: query
tags: [query, sql, plan-config, fund-lineup]
used-by-role: [lm-dc, qc]
used-in-process: [[plan-conversion-handoffs]]
aqt-parameters: [ACCOUNT_NO]
tables: [PENSION.PLAN_PROV_GRP, PENSION.PLAN_PROVISION, PENSION.PLAN_FUND, CORP.CONTRACT_FUND_DATA, CORP.CASE_DATA]
systems: [aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Query: Get Plan Fund

Returns the full fund lineup for a plan, decoded with human-readable action codes and statuses.

## Purpose

Fastest way to see every fund attached to a plan — including which are active, which are inactive, and which are restricted from contributions. Confirms that the fund lineup in `[[p3]]` matches the `[[toa]]` and the client's expectations.

The query decodes two key columns:

- **FD_ACTION_CD** — remittance-level action on the fund
  - `0` = CONTRIBUTIONS ALLOWED
  - `1` = ER LEVEL ONLY
  - `3` = RESTRICTED
- **STAT_C** — lifecycle status
  - `0` = ACTIVE
  - `1` = INACTIVE

## When to Run

- During plan setup to confirm the fund lineup matches the `[[toa]]`
- As the first step of the `[[fund-mapping-audit]]`
- Before running fund-level reports (see `[[gamble-fund-level]]`)
- Whenever a participant or sponsor reports a missing or unexpected fund

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| ACCOUNT_NO | `'932661_   00001%'` | Plan account number with trailing `%` wildcard — the `_` preserves 20-char width |

## Tables Used

- `PENSION.PLAN_PROV_GRP` (A) — provision-group header; joined by `ENRL_PROV_GRP_I`; filter on `RELATED_GRP_TYP_C = 361` (primary) or `362` (related)
- `PENSION.PLAN_PROVISION` (B) — links provisions to funds via `PROV_TYP_C = 15`
- `PENSION.PLAN_FUND` (C) — the fund record itself; carries `FD_DESC_CD`, `FD_ACTION_CD`, `STAT_C`, `FD_CLOSED_D`
- `CORP.CONTRACT_FUND_DATA` (D) — report names (`REPTG_1_FD_NM`, `REPTG_2_FD_NM`) joined by `FD_DESC_CD`
- `CORP.CASE_DATA` (F) — links case to contract via `CONT_NO`

## SQL

```sql
--UPDATE
--LIKE '932661_   00001%'

select  distinct case
	when a.RELATED_GRP_TYP_C=361 then account_no
	else (select account_no from pension.plan_prov_grp z where z.enrl_prov_grp_i=a.related_grp_i) end as account_no, c.FD_DESC_CD, trim(d.REPTG_1_FD_NM)||' '||trim(d.REPTG_2_FD_NM) as fd_fund_name, 
case WHEN FD_ACTION_CD = '3' then 'RESTRICTED' 
     WHEN FD_ACTION_CD = '0' THEN 'CONTRIBUTIONS ALLOWED'
     WHEN FD_ACTION_CD = '1' THEN 'ER LEVEL ONLY' END AS  REMIT_ACTION_CODE,
CASE WHEN C.STAT_C = '1' THEN 'INACTIVE'
     WHEN C.STAT_C = '0' THEN 'ACTIVE' END AS FUND_STATUS, 
c.FD_CLOSED_D 
	from pension.plan_prov_grp a, pension.plan_provision b, pension.plan_fund c, corp.contract_fund_data d, corp.CASE_DATA F
	where (ACCOUNT_NO LIKE '932661_   00001%'
                 AND A.RELATED_GRP_TYP_C = 361 
                  OR (RELATED_GRP_I in (SELECT ENRL_PROV_GRP_I 
                                         FROM PENSION.PLAN_PROV_GRP  
                                        WHERE ACCOUNT_NO LIKE '932661_   00001%'
                                          AND RELATED_GRP_TYP_C = 361) 
                      AND A.RELATED_GRP_TYP_C = 362))
	and a.enrl_prov_grp_i=b.enrl_prov_grp_i and provision_i=fd_prov_i
--	and fd_closed_d is null 
--	and fd_action_cd^='1' 
	and prov_typ_c=15
	and account_no=case_no
	and d.cont_no=F.cont_no
	AND C.FD_DESC_CD=D.FD_dESC_CD



--SELECT *
--FROM PENSION.GET_PLAN_FUND
--WHERE ACCOUNT_NO LIKE '932661_   00001%'
```

## Output / What to Look For

One row per fund in the lineup with: `ACCOUNT_NO`, `FD_DESC_CD`, concatenated fund name (report names 1 + 2), decoded `REMIT_ACTION_CODE`, decoded `FUND_STATUS`, and `FD_CLOSED_D`.

**Validation checks:**
- Any fund with `STAT_C = 1 (INACTIVE)` that the client still expects → mapping or termination gap
- Funds with `FD_CLOSED_D` populated but `STAT_C = 0 (ACTIVE)` → inconsistent state, escalate to `[[prod-support]]`
- Count of funds must match the `[[toa]]` fund list
- Restricted funds (`FD_ACTION_CD = 3`) flagged for the `[[fund-mapping-audit]]`
- The commented-out `fd_action_cd^='1'` filter (exclude ER-level-only) can be re-enabled when auditing contribution sources

## Related Queries

- [[get-plan-source]] — same pattern for sources
- [[fund-mapping]] — the concept page
- [[fund-mapping-audit]] — QA audit that uses this query as input

## See Also

- [[lm-dc]]
- [[qa]]
- [[fund-mapping]]
- [[plan-conversion-handoffs]]
