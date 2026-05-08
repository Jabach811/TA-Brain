---
title: "Query: TO_PY GROSS COMPENSATION — Prior-Year Gross Comp"
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

# Query: TO_PY GROSS COMPENSATION — Prior-Year Gross Compensation

Filters compensation rows to `COMP_TYP_C = 41` (personalized-reports annual — prior-year gross). Sibling of [[to-compensation]], which excludes this comp type.

## Purpose

Prior-year gross compensation (annual, not pay-period) feeds personalized participant statements and compensation-based eligibility or allocation formulas. Loaded separately from pay-period comp because the shape differs — one annual row per SSN per prior year — and because its audit lives on a different cadence.

## When to Run

After loading prior-year gross comp (typically annual, early in the plan year or as part of initial takeover).

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| ACCOUNT_NO pattern | `QK63283_  00080%` | Plan case number |

## Tables Used
- `PENSION.COMPENSATION_DATA` — comp rows (filtered to `COMP_TYP_C = 41`)
- `PENSION.COMPENSATION_TYPE` — comp type label

## SQL

```sql
----- PRIOR YEAR GROSS COMP
--UPDATE: ACCOUNT_NO LIKE 'QK63283_  00080%'
SELECT A.ACCOUNT_NO , A.SOC_SEC_NO , A.COMP_A , A.PAY_PERIOD_START_D, A.PAY_PERIOD_END_D, A.PAYCHECK_D,  B.COMP_TYP_T 
FROM PENSION.COMPENSATION_DATA A, PENSION.COMPENSATION_TYPE B
WHERE ACCOUNT_NO LIKE 'QK63283_  00080%'
AND A.COMP_TYP_C = B.COMP_TYP_C
AND A.COMP_TYP_C = 41 -- (personalized reports annual)
--AND SOC_SEC_NO IN ('076-60-3607')
```

## Output / What to Look For

- One row per SSN per prior year.
- `COMP_A` totals tie to the prior-year gross file.

## Related Queries
- [[to-compensation]]

## See Also
- [[final-takeover-audit]]
