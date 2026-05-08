---
title: "Query: TO_COMPENSATION — Takeover Compensation Extract"
type: query
tags: [query, sql, takeover, compensation]
used-by-role: [lm-dc, qa]
used-in-process: [[final-takeover-audit]]
aqt-parameters: [ACCOUNT_NO]
tables: [PENSION.COMPENSATION_DATA, PENSION.COMPENSATION_TYPE]
systems: [aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Query: TO_COMPENSATION — Takeover Compensation Extract

Pulls all compensation rows (except `COMP_TYP_C = 41`, which is prior-year gross and has its own query) for a plan. Designed to be pivoted in AQT by `COMP_TYP_T` to produce a per-participant, per-comp-type view.

## Purpose

Validates that compensation data loaded correctly for things like pay-period gross (comp type 4, codes 6041/6051), pay-period comp used for pre-tax deferrals (comp type 7), and any other custom comp types the plan uses. Prior-year gross (`COMP_TYP_C = 41`) is handled by the sibling query [[to-py-gross-compensation]].

## When to Run

After a compensation load. For mergers where participants already exist on the plan, uncomment the `DATE(A.MOD_TS)` filter to isolate only rows loaded in the current batch.

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| ACCOUNT_NO pattern | `QK63283_  00080%` | Plan case number |

## Tables Used
- `PENSION.COMPENSATION_DATA` — the comp rows (one per pay period per comp type)
- `PENSION.COMPENSATION_TYPE` — comp type code → text mapping

## AQT Pivot Instructions (from source)

> RUN QUERY; SELECT PIVOT BUTTON ON RIBBON; "Group Column(s)" Account_no and Soc-sec-no, "Pivot Column" Comp_typ_t, "Analysis Column" Comp_a; select ok; export

## SQL

```sql
--UPDATE: ACCOUNT_NO LIKE 'QK63283_  00080%'

--RUN QUERY; SELECT PIVOT BUTTON ON RIBBON; "Group Column(s)" Account_no and Soc-sec-no, "Pivot Column" Comp_typ_t, "Analysis Column" Comp_a; select ok; export

--EXPORT TO FILE THAT WAS LOADED
SELECT A.ACCOUNT_NO , A.SOC_SEC_NO , A.COMP_A , A.PAY_PERIOD_START_D, A.PAY_PERIOD_END_D, A.PAYCHECK_D,  B.COMP_TYP_T , A.USER_I , A.MOD_TS 
FROM PENSION.COMPENSATION_DATA A, PENSION.COMPENSATION_TYPE B
WHERE ACCOUNT_NO LIKE 'QK63283_  00080%'
AND A.COMP_TYP_C = B.COMP_TYP_C
AND A.COMP_TYP_C <> 41
--AND DATE(A.MOD_TS) = '2026-02-11' -- use in mergers where ppts already exist on plan
--AND A.COMP_TYP_C = 4 --(6041/6051- PAY PERIOD) -- GROSS
--AND COMP_TYP_C = 7 --(Comp used for pre-tax deferrals - pay period)
--AND SOC_SEC_NO = '195-44-3649'

;

-- FULL DATA OUTPUT
--SELECT *
--FROM PENSION.COMPENSATION_DATA
--WHERE ACCOUNT_NO LIKE 'QK63283_  00080%'
--AND COMP_TYP_C <> 41
```

## Output / What to Look For

- After pivoting: one row per SSN, one column per comp type, values = `COMP_A` per pay period.
- Totals should match the compensation file per SSN, per comp type.
- Comp type 4 (codes 6041/6051) = pay-period gross; comp type 7 = comp used for pre-tax deferrals. Plans vary in which comp types they report.

## Related Queries
- [[to-py-gross-compensation]]
- [[to-census]]

## See Also
- [[final-takeover-audit]]
