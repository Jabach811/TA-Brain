---
title: "Query: Get Plan Source"
type: query
tags: [query, sql, plan-config, source-lineup]
used-by-role: [lm-dc, qc]
used-in-process: [[plan-conversion-handoffs]]
aqt-parameters: [ACCOUNT_NO]
tables: [PENSION.PLAN_SRC_DETAIL, PENSION.PLAN_PROVISION, PENSION.PLAN_PROV_GRP]
systems: [aqt, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Query: Get Plan Source

Returns the full source lineup for a plan — source IDs, names, document names, active flag, translation code.

## Purpose

Lists every source set up on a plan in `[[p3]]`. Used for source-mapping validation during conversion and for any audit that needs to know which sources exist on the target plan.

> [!warning]
> **When exporting results to Excel**: make sure the `SRC_I` column is formatted as TEXT in the Text-to-Columns tool. The last digits of the `SRC_I` will be lost or corrupted if Excel treats the column as a number. (This is the original author's note in the source file.)

## When to Run

- First step of the `[[source-mapping-audit]]`
- During initial plan setup to confirm sources match the `[[toa]]`
- Before building a source-mapping file (`[[source-mapping]]`) for a takeover
- Whenever diagnosing contribution-routing issues

## Parameters

| Parameter | Example | Meaning |
|-----------|---------|---------|
| ACCOUNT_NO | `'QK63283_  00073%'` | Plan account number with trailing `%` wildcard |

## Tables Used

- `PENSION.PLAN_SRC_DETAIL` (A) — master source record; carries `SRC_I`, `SRC_S`, report names, `DOC_NM`, `ACTIVE_SRC_C`, `TRANSLATION_C`
- `PENSION.PLAN_PROVISION` (B) — links source to provision via `PROV_TYP_C = 1019`
- `PENSION.PLAN_PROV_GRP` (C) — plan account header joined by `ENRL_PROV_GRP_I`

## SQL

```sql
--GIVES LIST OF SOURCES SET UP ON A PLAN.  WHEN EXPORTING MAKE SURE THE SRC_I THE LAST DIGITS DONT CHANGE. THIS IS DONE BY MAKING SURE THE SRC_I COLUMN IS 'TEXT' WHEN USING THE TEXT TO COLUMNS TOOL IN EXCEL.

SELECT DISTINCT C.ACCOUNT_NO ,A.SRC_I,  A.SRC_S, A.REPORT_1_NM, A.REPORT_2_NM, DOC_NM, ACTIVE_SRC_C, translation_c
FROM PENSION.PLAN_SRC_DETAIL A, PENSION.PLAN_PROVISION B, PENSION.PLAN_PROV_GRP C
WHERE A.SRC_I  = B.RELATED_I 
AND B.PROV_TYP_C = 1019 
AND B.ENRL_PROV_GRP_I=C.ENRL_PROV_GRP_I
AND ACCOUNT_NO LIKE 'QK63283_  00073%'
```

## Output / What to Look For

One row per source in the lineup with: `ACCOUNT_NO`, `SRC_I`, `SRC_S`, `REPORT_1_NM`, `REPORT_2_NM`, `DOC_NM`, `ACTIVE_SRC_C`, `TRANSLATION_C`.

**Validation checks:**
- Sources missing a `TRANSLATION_C` → may indicate incomplete source-mapping setup
- `ACTIVE_SRC_C` flag: inactive sources should not receive new contributions
- Count of sources must match the `[[toa]]` / source grid
- Exported `SRC_I` values must retain all digits — see warning above

## Related Queries

- [[get-plan-fund]] — same pattern for funds
- [[source-mapping]] — the concept page
- [[source-mapping-audit]] — QA audit that uses this query as input
- [[internal-conversion-deferrals]] — uses sources identified here

## See Also

- [[lm-dc]]
- [[qa]]
- [[source-mapping]]
- [[plan-conversion-handoffs]]
