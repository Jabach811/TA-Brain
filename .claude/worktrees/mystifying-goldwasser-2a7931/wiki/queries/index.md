---
title: "SQL Query Library"
type: analysis
tags: [query, sql, index, library, hub]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion, liquidation, takeover-holding-account, loan-takeover]
aqt-parameters: []
tables: []
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 22
---

# SQL Query Library

Catalog of reusable DB2 / AQT queries used by LM-DC and CTS during plan conversions, liquidations, takeover-asset holding, and post-conversion audits. Each page preserves the query verbatim, annotates parameters, and links to the operational process that runs it.

## How to Use

1. Find the folder that matches the phase of work (e.g., pre-liquidation base extracts go in `liquidation/`; ongoing internal-conversion one-offs go in `internal-conversion/`).
2. Open the page and scan **Purpose**, **When to Run**, and **Parameters** to confirm fit.
3. Copy the SQL block (preserved verbatim inside ```sql fences). Most queries use AQT `SETPARM` for case / business-line parameterization — check the frontmatter `aqt-parameters` list.
4. Many scripts have hardcoded case numbers / dates that must be swapped before running. The page lists all such hardcoded values under **Parameters**.

> [!warning]
> Any query in `holding-account/` or marked with a warning callout performs production INSERT / UPDATE / DELETE. Review with CTS and run steps in order.

---

## Liquidation

Queries run during the pre-liquidation extract, liquidation day, and post-liquidation rebook of an internal conversion.

| Page | Summary |
|---|---|
| [[internal-conversion-base]] | Pre-liquidation base extract — 26 numbered sub-queries covering participants, balances, indicatives, loans, hours, vesting, bene, deferrals, compensation, event history |
| [[day-of-liquidation-v1]] | Day-of-liquidation extract (CORP) using `CASE_DATA` + `EE_PART_BAL_HEADER`; sample case 932003, liq 20210920 |
| [[day-of-liquidation-v2]] | Revised day-of-liquidation extract; sample case 513397, liq 20211116 |
| [[day-of-rebook]] | Post-settlement rebook using `TRANSACT_DETAIL` with TR_NO 3030/4000; temp table includes `tr_ref_no` for wire-level match |
| [[day-of-rebook-split-mapping]] | Rebook variant for split-mapping scenarios (one source fund → multiple target funds); includes `plan_map_i` placeholder |

---

## Internal Conversion

One-off queries / scripts for specific conversion workstreams: hours, vesting, bene, deferrals, elections, basis, FOD, loans, service-data copies.

| Page | Summary |
|---|---|
| [[internal-conversion-hours]] | Standalone hours extract with 4 load-date variants (EMPLOYEE, EE_HRS_WORKED, CASE_DATA) |
| [[internal-conversion-vesting-and-bene]] | Vested-percent per source at month-end business-day + active beneficiary designations |
| [[internal-conversion-deferrals]] | Composite deferral extract: indicatives + address + balance + deferrals + PPA default status |
| [[current-elections]] | Current investment elections per source with default-code tag (single-case) |
| [[current-elections-multi-case]] | Current elections across multiple old cases, excluding SSNs already on target case |
| [[basis-internal-conversion]] | Three-step basis migration: update existing rows, insert new-participant rows, optional takeover-basis placeholder |
| [[fod-status]] | Force-out-distribution (disability) flag carry-forward via UPDATE on `EE_DISB_STAT_CD` |
| [[vesting-overrides]] | Hand-entered vesting overrides on old case (for re-entry on new case) |
| [[highest-loan-balance]] | 12-month HOLB scan of `VLOAN_REPAYMENT` for IRS loan-limit calculations |
| [[new-deferral-report]] | Post-load verification of active deferrals on surviving case |
| [[estatement-copy]] | Copy e-statement elections (SERV_TYP_C 7001) via local scratch table |
| [[saveexpress-copy]] | Excel-driven migration of Save Express (auto-increase) elections |
| [[email-copy]] | Copy `EE_SECURE_DATA` rows (password hash, email, privacy) across cases |
| [[takeover-loan-query-build]] | New-case takeover loan header rows — init amount, original date, freq, repay amount, principal due, deemed status, duration |
| [[takeover-loan-sources]] | Per-source principal breakdown for takeover loans |

---

## Holding Account

Base-36 holding-account setup — stages incoming takeover assets on a dummy SSN until participant data is loaded.

| Page | Summary |
|---|---|
| [[takeover-holding-account-base-36]] | CORP / pension-assets version — 15-step procedural script: CASE_REMIT, FIN_ACT_PEND/ELEC, BILL_REMIT_DETAIL to dummy SSN 999-00-0000 |
| [[takeover-holding-account-base-36-v2]] | TDA / under-construction variant — uses `current date` for EFF/CYC/BOOK, `STAT_CD='5'`, explicit PKG_ID caps-lock warning |

---

## Other Folders

The following folders are owned by a separate agent and will be populated later:

- `post-conversion-audit/` — post-load reconciliation queries
- `takeover-data/` — takeover-specific data validation
- `plan-config/` — plan-setup / provision-group queries
- `reporting/` — ongoing reporting queries
- `special-cases/` — one-off / edge-case queries

## See Also

- [[internal-conversion]]
- [[takeover-holding-account]]
- [[conversion-booking]]
- [[loan-takeover]]
- [[aqt]]
- [[p3]]
