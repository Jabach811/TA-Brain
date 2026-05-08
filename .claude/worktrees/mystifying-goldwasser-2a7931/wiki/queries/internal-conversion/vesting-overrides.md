---
title: "Vesting Overrides for Internal Conversion"
type: analysis
tags: [query, sql, internal-conversion, vesting, override]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [PENSION.PART_VEST_OVRD, PENSION.PART_ENRL, PENSION.PERSON_SEARCH, PENSION.PLAN_PROV_GRP, CORP.EE_BALANCE]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Vesting Overrides for Internal Conversion

Pulls manually-entered vesting overrides (not the computed vested-percent rows) from the old case for anyone who currently has a balance on file.

## Purpose

Vesting overrides (`PENSION.PART_VEST_OVRD`) are hand-entered exceptions to the plan-level vesting schedule — used when service counts are disputed, years-of-service adjustments were granted, or a plan-merger / grandfather rule applies. These are **not** carried by the normal `EE_PART_VESTED_BAL` extract and must be re-entered manually on the surviving case.

## When to Run

Pre-liquidation, bundled with [[internal-conversion-vesting-and-bene]]. Output goes to CTS so overrides get re-entered on the new case at load.

## Parameters

Hardcoded old case `QK61927   00001` appears twice:
- `PLAN_PROV_GRP.ACCOUNT_NO = 'QK61927   00001'` — scope the override pull
- `EE_BALANCE.CASE_NO = 'QK61927   00001'` — scope the balance filter (so we only see overrides for active balance-holders)

Balance snapshot date: `EFF_DT = '20081130'` — update to the current month-end.

## Notes

- `VEST_S = 0` filters to the primary vesting schedule (not secondary / accumulated-contribution schedules).
- Joins to `PART_ENRL` and `PERSON_SEARCH` to return name and SSN for readability.
- The `EE_BALANCE` restriction ensures we don't surface overrides for participants who have zero balance (no need to carry them).

## Tables Used

- `PENSION.PART_VEST_OVRD` — override rows (per part_enrl, schedule, source).
- `PENSION.PART_ENRL` — participant enrolment.
- `PENSION.PERSON_SEARCH` — names.
- `PENSION.PLAN_PROV_GRP` — scope by case.
- `CORP.EE_BALANCE` — balance filter.

## SQL

```sql
SELECT C.SOC_SEC_NO, C.LAST_NM, C.FST_MID_NM, A.EFF_D, A.SRC_S, A.VEST_P

FROM PENSION.PART_VEST_OVRD A ,

     PENSION.PART_ENRL B,

     PENSION.PERSON_SEARCH C

WHERE A.ENRL_PROV_GRP_I IN (SELECT ENRL_PROV_GRP_I 

                           FROM PENSION.PLAN_PROV_GRP 

                           WHERE ACCOUNT_NO ='QK61927   00001')

AND A.PART_ENRL_I = B.PART_ENRL_I

AND PERSON_I = PART_I

AND A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I

AND VEST_S = 0

AND C.SOC_SEC_NO IN (SELECT SOC_SEC_NO

                     FROM CORP.EE_BALANCE

                     WHERE CASE_NO = 'QK61927   00001'

                     AND EFF_DT = '20081130')
```

## Output / What to Look For

One row per (SSN, source) with the manually-entered vest percent. Send to CTS with a cover note indicating these must be applied on the new case after load.

## Related Queries

- [[internal-conversion-vesting-and-bene]]
- [[fod-status]]

## See Also

- [[internal-conversion]]
- [[vesting-override]]
