---
title: "Basis for Internal Conversions"
type: analysis
tags: [query, sql, internal-conversion, basis, tax-basis, update, insert]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [TDAV.VEE_BASIS, TDA.EE_BASIS, TDA.VEE_BASIS, ST_ANTHONY_B]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Basis for Internal Conversions

Three-step basis migration: update existing surviving-case rows with added basis, insert remaining new participants, optionally insert takeover-basis placeholder rows. Ends with a verification SELECT.

> [!warning]
> This script issues real `UPDATE` and `INSERT` statements against `TDA.EE_BASIS` / `TDAV.VEE_BASIS`. These are production basis tables — run only under CTS authorization and confirm the SSN population table (`ST_ANTHONY_B` here) is scoped correctly before executing any write step.

## Purpose

Cost basis (post-86, pre-87, pre-89 employer / type-6 contributions, total withdrawals, year-end '86 balance) must follow the participant into the surviving plan so future withdrawals and RMDs compute correctly. This procedure:

1. **UPDATE step** — For SSNs that already have a basis row on the surviving case at the current plan-year end, add the old-case basis into the surviving row (specifically `CORP_TYP6_CTRB_AMT`).
2. **INSERT remaining rows** — For SSNs that don't already exist on the surviving case, copy their latest basis row over, appending `T` to the SSN to flag takeover-basis lineage.
3. **Optional takeover placeholder INSERT** — Same shape as step 2 but without the `T` suffix modification (used when you want a clean-SSN takeover row rather than a pseudo-SSN).
4. **Verification SELECT** — Sanity-check the surviving case after both writes.

## When to Run

After the participant-load has placed the surviving-case skeleton but before the first withdrawal / distribution on the new case. Typically day-of-rebook or day-after.

## Parameters

Hardcoded — update all occurrences before running:

| Placeholder | Meaning |
|---|---|
| `L7550278  00278` | **Surviving case** (destination) |
| `TT069364  00001` / `TT069090  00001` | **Old cases** (source) |
| `20091231` | Plan-year-end date for the basis snapshot |
| `ST_ANTHONY_B` | Temp table holding the SSN population being converted |

## Notes

- The UPDATE aggregates old + new `CORP_TYP6_CTRB_AMT` by summing; other basis columns are not currently merged.
- The INSERT appends `||'T'` to `SOC_SEC_NO` as a convention-driven marker for takeover basis — verify your plan's convention before trusting this.
- `EE_BEG_BAL_DT IN (SELECT MAX(EE_BEG_BAL_DT)...)` ensures only the most recent basis year is copied, not historical basis.
- The `ST_ANTHONY_B` scratch table is a plan-specific SSN list uploaded via AQT — rename per conversion.

## Tables Used

- `TDAV.VEE_BASIS` — view used for UPDATE target.
- `TDA.VEE_BASIS` / `TDA.EE_BASIS` — base basis tables.
- `ST_ANTHONY_B` — SSN filter (temporary / plan-specific).

## SQL

```sql
            

----UPDATE FIRST THOSE ROWS THAT EXIST FOR THE CURRENT CAL YR END ON THE SURVIVING CASE AND THE OLD CASE
--SELECT *
UPDATE TDAV.VEE_BASIS A

SET  A.CORP_TYP6_CTRB_AMT =

(SELECT  A.CORP_TYP6_CTRB_AMT+B.CORP_TYP6_CTRB_AMT
FROM TDA.VEE_BASIS B WHERE B.CASE_NO='L7550278  00278' AND A.SOC_SEC_NO=B.SOC_SEC_NO AND EE_BEG_BAL_DT IN (SELECT MAX(EE_BEG_BAL_DT) FROM TDA.VEE_BASIS C WHERE C.CASE_NO=B.CASE_NO AND C.SOC_SEC_NO=B.SOC_SEC_NO))

WHERE A.CASE_NO='TT069364  00001'

AND A.EE_BEG_BAL_DT='20091231'
AND A.SOC_SEC_NO IN (SELECT SOC_SEC_NO FROM TDA.VEE_BASIS D WHERE CASE_NO='L7550278  00278' AND A.SOC_SEC_NO=D.SOC_SEC_NO AND EE_BEG_BAL_DT IN (SELECT MAX(EE_BEG_BAL_DT) FROM TDA.VEE_BASIS E WHERE E.CASE_NO=D.CASE_NO AND E.SOC_SEC_NO=D.SOC_SEC_NO))


--INSERT REMAINING ROWS - THOSE WHO DO NOT EXIST ON THE SURVING CASE FOR THE CURRENT PLAN YEAR.

INSERT INTO TDA.EE_BASIS
(PKG_ID, CASE_NO, SOC_SEC_NO, PRE87_TAX_BAS_AMT, POST86_TAX_BAS_AMT, TYP6_TOT_WD_AMT, TYP234_TOT_WD_AMT, YREND_86_BAL_AMT, TOT_ALL_TYP_WD_AMT, CORP_TYP6_CTRB_AMT, PRE89_TYP3_BAS_AMT, POST88TYP3_BAS_AMT, EE_BEG_BAL_DT, SRC_CD, FILE_INPUT_SRC_CD, ADJ_YREND_86_AMT, EMPLOYER_BAS_AMT)

SELECT PKG_ID, 'L7550278  00278', SUBSTR(SOC_SEC_NO,1,11)||'T', PRE87_TAX_BAS_AMT, POST86_TAX_BAS_AMT, TYP6_TOT_WD_AMT, TYP234_TOT_WD_AMT, YREND_86_BAL_AMT, TOT_ALL_TYP_WD_AMT, CORP_TYP6_CTRB_AMT, PRE89_TYP3_BAS_AMT, POST88TYP3_BAS_AMT,'20091231', SRC_CD, FILE_INPUT_SRC_CD, ADJ_YREND_86_AMT, EMPLOYER_BAS_AMT

FROM TDA.EE_BASIS A
WHERE CASE_NO='TT069090  00001'

AND EE_BEG_BAL_DT IN (SELECT MAX(EE_BEG_BAL_DT) FROM TDA.EE_BASIS E WHERE E.CASE_NO=A.CASE_NO AND E.SOC_SEC_NO=A.SOC_SEC_NO)
--AND SOC_SEC_NO NOT IN (SELECT SOC_SEC_NO FROM TDA.EE_BASIS WHERE CASE_NO='L7550278  00278' AND EE_BEG_BAL_DT='20091231')
AND SOC_SEC_NO IN (SELECT SOC_SEC_NO FROM ST_ANTHONY_B)

--------------------------------------------
--IF YOU WANT TO INSERT A "TAKEOVER" BASIS ROW, RUN THIS STEP
INSERT INTO TDA.EE_BASIS
(PKG_ID, CASE_NO, SOC_SEC_NO, PRE87_TAX_BAS_AMT, POST86_TAX_BAS_AMT, TYP6_TOT_WD_AMT, TYP234_TOT_WD_AMT, YREND_86_BAL_AMT, TOT_ALL_TYP_WD_AMT, CORP_TYP6_CTRB_AMT, PRE89_TYP3_BAS_AMT, POST88TYP3_BAS_AMT, EE_BEG_BAL_DT, SRC_CD, FILE_INPUT_SRC_CD, ADJ_YREND_86_AMT, EMPLOYER_BAS_AMT)

SELECT PKG_ID, 'L7550278  00278', SOC_SEC_NO, PRE87_TAX_BAS_AMT, POST86_TAX_BAS_AMT, TYP6_TOT_WD_AMT, TYP234_TOT_WD_AMT, YREND_86_BAL_AMT, TOT_ALL_TYP_WD_AMT, CORP_TYP6_CTRB_AMT, PRE89_TYP3_BAS_AMT, POST88TYP3_BAS_AMT,'20091231', SRC_CD, FILE_INPUT_SRC_CD, ADJ_YREND_86_AMT, EMPLOYER_BAS_AMT

FROM TDA.EE_BASIS A
WHERE CASE_NO='TT069090  00001'

AND EE_BEG_BAL_DT IN (SELECT MAX(EE_BEG_BAL_DT) FROM TDA.EE_BASIS E WHERE E.CASE_NO=A.CASE_NO AND E.SOC_SEC_NO=A.SOC_SEC_NO)
--AND SOC_SEC_NO NOT IN (SELECT SOC_SEC_NO FROM TDA.EE_BASIS WHERE CASE_NO='L7550278  00278' AND EE_BEG_BAL_DT='20091231')
AND SOC_SEC_NO IN (SELECT SOC_SEC_NO FROM ST_ANTHONY_B)

-----------------------------------------
SELECT *
FROM TDA.EE_BASIS
WHERE CASE_NO = 'L7550278  00278'
```

## Output / What to Look For

- UPDATE row count should equal the intersection of SSNs on old case and surviving case for the target year-end date.
- INSERT row count should equal the set difference (old case minus surviving case) for SSNs in `ST_ANTHONY_B`.
- Final SELECT on the surviving case should show the union.

## Related Queries

- [[internal-conversion-base]] — contains a basis sub-extract (section 12)
- [[internal-conversion]] — parent process

## See Also

- [[internal-conversion]]
- [[tax-basis]]
- [[post-conversion-basis-check]]
