---
title: "Basis"
type: concept
tags: [concept, basis, cost-basis, roth, after-tax, takeover, eds]
created: 2026-04-18
updated: 2026-04-18
sources: 3
---

# Basis

The cost-basis portion of a participant's account — money that has already been taxed and is therefore not taxed again on distribution.

> [!needs-review]
> First pass of this concept page. Human flagged this for close review during the next lint pass — basis is tax-sensitive and the bucket definitions (pre-87 / post-86 / Roth / Type 3 / Type 6 / deemed-loan) need SME verification before this is considered authoritative.

## Definition

Basis is the sum of a participant's **after-tax** contributions plus any already-taxed amounts that have been rolled into the plan (Roth rollovers, in-plan Roth conversions, deemed loan amounts). It lives in `CORP.EE_BASIS` (or `TDA.EE_BASIS` / `TDAV.VEE_BASIS` depending on business line) with one row per (CASE_NO, SOC_SEC_NO) and multiple columns for the different basis **buckets**.

The buckets are tracked separately because they have different tax treatment at distribution:

| Bucket | Taxation |
|--------|----------|
| **Pre-87 after-tax** | Recovered tax-free before any earnings |
| **Post-86 after-tax** | Pro-rata recovery with earnings (cream-in-coffee) |
| **Pre-89 employer contributions** (Type 6) | Legacy rules — some plans pre-date EGTRRA |
| **Roth tax-free basis** | Principal tax-free at qualified distribution; see [[roth]] |
| **Roth hardship basis** | Eligible to be withdrawn as hardship; still principal |
| **Roth rollover basis** | Roth principal brought in from another qualifying plan |
| **Type 3 / Type 6 amounts** | Plan-specific legacy buckets |
| **Deemed loan amounts** | A defaulted loan that was 1099'd as income becomes basis when repaid |
| **Year-end '86 balance** | Baseline used for pre-87 basis recovery calculations |
| **Total withdrawals** | Running lifetime total, used to reduce remaining basis |

## Why It Matters

Wrong basis = wrong 1099-R = wrong tax outcome for the participant. Of all the takeover data domains, basis is the one where silent failures do the most damage — an under-reported basis means the participant pays tax on money that was already taxed, and they rarely catch it.

On takeover, basis arrives from the prior RK in whatever layout they use; at TA it must be normalized into the `EE_BASIS` column structure. On internal conversion, basis must be migrated from the surviving case's `EE_BASIS` table to the new enrolment with UPDATE / INSERT logic (see `basis-internal-conversion` query).

Basis load **depends on census** — a row in `EE_BASIS` with no matching row in `CORP.EMPLOYEE` is an orphan. Always run the pre-load SSN existence check first.

## Data Elements

In addition to the bucket columns, every basis row has:

- `CASE_NO`, `SOC_SEC_NO` — keys
- `EE_BEG_BAL_DT` — beginning-balance date (must match the basis-load as-of date)
- `RTH_CTRB_FST_YR` — Roth first-contribution year (required for any Roth bucket; see [[roth]])
- Timestamps (`MOD_TS`, `USER_I`)

## Evidence / Examples

- `to-basis` (wiki-v2) is the post-load verification query; it explicitly catches the "Roth basis loaded but `RTH_CTRB_FST_YR` null" failure mode.
- `basis-internal-conversion` is the three-step migration script for internal conversions: UPDATE existing surviving-case rows with added basis, INSERT remaining new participants, optionally INSERT takeover-basis placeholders, then verification SELECT.
- The [[concepts/loading-basis-eds]] stub describes the EDS route; the [[concepts/informatica-basis-module]] stub describes the Informatica route. These are the two load paths — EDS for ongoing / structured files, Informatica for conversion-day batch loads.

## Counterarguments / Edge Cases

- **Deemed-loan basis is not contribution basis.** It shows up the same way in the column structure but it arose from a defaulted loan that was already 1099'd. Do not add it to after-tax contribution totals.
- **Pre-87 basis is stock-and-flow.** The `Pre-87 after-tax basis` bucket starts at the year-end 1986 snapshot and decreases as distributions recover it — a load that reports the **historical** pre-87 basis rather than the **remaining** pre-87 basis will over-report.
- **Some prior RKs do not report basis at all.** For those, the plan may be loaded with zero basis and a data-discovery note; participants supply their own basis via form at distribution time. This is suboptimal but legal.

## Related Concepts

- [[roth]] — Roth is a specific family of basis buckets
- [[census]] — basis load depends on a census row existing
- [[concepts/loading-basis-eds]]
- [[concepts/informatica-basis-module]]
- [[concepts/data-discovery-document]] — where basis-availability questions are asked

## Open Questions

- Full list of TA basis column names across `CORP.EE_BASIS`, `TDA.EE_BASIS`, `TDAV.VEE_BASIS` — are they identical or do names drift?
- Authoritative definition of Type 3 / Type 6 amounts and which plans use them today vs. legacy only.
- When basis load fails for a subset of participants, what is the correction workflow — re-run EDS, or [[processes/prod-support-ticket]]?

## See Also

- [[processes/census-load]]
- [[concepts/loading-basis-eds]]
- [[concepts/informatica-basis-module]]
- [[roth]]
- [[entities/eds]]
