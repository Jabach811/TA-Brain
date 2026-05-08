---
title: "Source: Main Dump Batch — 2026-04-17"
type: source
tags: [source, ingest, main-dump, sql, qa, internal-conversion, informatica, eds]
created: 2026-04-17
updated: 2026-04-17
sources: 146
---

# Source: Main Dump Batch — 2026-04-17

A 146-file dump containing TA's operational SQL query library, QA/QC audit catalog, internal-conversion workflow, P3 maintenance procedures, and New Business process references — ingested in one batch on 2026-04-17.

## Summary

On 2026-04-17, 146 files were dropped into `raw/main dump/`. They are `.md.txt` files — the `.md.txt` suffix indicates markdown content exported to plain text, most likely from a OneNote notebook, SharePoint library, or internal wiki that was migrated page-by-page. File mtimes cluster in three bands (2026-04-16 through 2026-04-17, plus a handful dated "Apr 17 2026" from the timezone-collapsed UTC export), consistent with a bulk export.

The batch has four major themes:

1. **SQL query library** — roughly 30 files containing full AQT/SQL queries for internal conversions, takeover data extraction, post-conversion audits, and plan reporting. The richest files: `Internal conversion.md.txt` (54KB), `Takeover data for Internal Mergers.md.txt` (65KB), `POST CONVERSION AUDIT QUERIES.md.txt` (36KB), `POST CONVERSION AUDIT QUERIES NEW.md.txt` (42KB), and three 50+KB liquidation-day queries.
2. **QA / QC audit catalog** — ~25 short files (most 200–400 bytes, title-only) naming specific audit procedures: day-of-wire, day-after-wire, fund-mapping, source-mapping, CIT takeover audits, DIA audits, default allocation/deferral analyses, and the List of All CIT Audits.
3. **Internal conversion workflow** — ~15 files describing plan-to-plan mergers inside TA as a distinct workflow from external takeovers: hours queries, deferrals, vesting overrides, bene handling, basis, FOD status, e-statement copy, and day-of-liquidation/rebook sequences.
4. **New Business & plan setup** — a cluster of files referencing roles and processes we hadn't captured: PLC, PSC, Pricing Consultant, Sales Consultant, CIT Transition Acct Consultants, NB CIT Mgmt PC Process Flow, and Excelwise (Financial Guidelines advice platform).

Most short files are title-only placeholders — their OneNote content did not round-trip into the export. The large SQL files and a handful of procedure files are the substantive content. Filings went to `queries/` (SQL files), `concepts/` (audit and procedure stubs), and `[[main-dump-batch-2026-04-17]]` itself (this page, for files too thin to warrant their own page).

## Key Claims

- Transamerica runs a distinct **internal conversion** workflow for plan-to-plan mergers within TA, with its own SQL library, hours query, and multi-day liquidation/rebook sequence — separate from external takeovers.
- QA/QC owns a formal audit catalog of roughly 20 named audit types (day-of-wire, day-after-wire, fund mapping, source mapping, default allocation, default deferral, CIT takeover, DIA, final takeover, etc.), each with its own procedure file.
- `[[paris-iii]]` ("PARIS III") appears alongside `[[p3]]` and likely denotes the legacy or formal name of the plan admin system — to be confirmed.
- `[[roc-tool]]` is a stored-procedure runner; DDOL and VRU are referenced as participant self-service channels it can gate.
- Post-conversion audit queries exist in both **legacy** (`POST CONVERSION AUDIT QUERIES.md.txt`, 36KB) and **NEW** (`POST CONVERSION AUDIT QUERIES NEW.md.txt`, 42KB) variants — which is canonical is an open question.
- `TAKEOVER HOLDING ACCOUNT - BASE 36` (11KB) coexists with `UNDER CONSTRUCTION TAKEOVER HOLDING ACCOUNT - BASE 36 (1006)` (12KB) — the second is clearly a newer draft; which is live is an open question.
- `[[trs]]` is the internal mailing vendor for enrollment kits (referenced in Informatica's TRS module and welcome-kit processes).
- `[[excelwise]]` is the Financial Guidelines advice platform — its default-election check query was ingested (with a typo in the filename: "Finanail" for "Financial").
- New Business involves roles we hadn't captured: PLC, PSC, Pricing Consultant, Sales Consultant, CIT Transition Account Consultants.
- Target Date Chart updates (insertion and TDF Retirement Age Update) are a distinct P3 maintenance operation owned by QC — referenced in `Inserting Target Date Chart.md.txt` and `TDF Retirement Age Update.md.txt`.
- Informatica audits (allocation, balance, loan) replaced a legacy Access-based loan audit process and now produce standardized audit outputs.
- The Loan Module's **NPER rounding logic** was changed effective April 2015 (decimal ≤ 0.10 round down; 0.11–0.89 conditional on $10 threshold; > 0.89 round up).
- EDS Eligibility loading replaced a prior AQT-based `Part_Elig_src` insert process.

## Key Quotes

From `Informatica Loan Module.md.txt`:
> "Replace legacy Access-based loan audit process. Key Audits: Loans past maturity; Loans behind (subject / not subject to default); Loans to terminated participants."

From `Initial Design Specs for Informatica Balances.md.txt`:
> "Define design for balance audit and FAA comparison process. Coverage: Mapping and cash conversion strategies; Error and warning conditions; Control totals and reconciliation outputs."

From `Informatica - Allocations Audit.md.txt`:
> "Audit participant investment elections by fund and source. Common Checks: Fund and source mapping errors; Allocation mismatches; Default status validation; Control totals."

From `Loading_Eligibility_through_EDS.md.txt`:
> "The EDS data type for eligibility replaces the AQT process to insert data into `Part_Elig_src` for eligible participants and to process non-eligible participants through the nightly batch."

From `Internal conversion hours.md.txt` (AQT pragma header):
> "`--AQT SETPARM,PARM=CASE,VALUE="932339"` `--AQT SETPARM,PARM=Business_line,VALUE="CORP"` `--AQT SETPARM,PARM=NOT_THESE_AFFILIATES,VALUE="'ABCDE'"`"

## Entities Mentioned

### People

No new people named in substantive content. The previously-flagged open questions on last names remain:
- Paul (QC team) — last name open
- Danny (QC team) — last name open
- Samantha C. — last name open
- Rich Lippoth — confirmed (referenced in Balance Module context)

### Systems

Existing systems referenced: `[[p3]]`, `[[aqt]]`, `[[informatica]]`, `[[eds]]`, `[[nbi]]`.

New systems referenced in this batch:
- `[[paris-iii]]` — likely legacy name for or sibling to P3
- `[[roc-tool]]` — stored-procedure runner; gates DDOL and VRU
- `[[trs]]` — internal mailing vendor for enrollment kits
- `[[odsp]]` — Informatica default connection (overridden to DIVRDIVP)
- `[[serena]]` — referenced in wiki cross-link list
- `[[jira]]` — referenced in wiki cross-link list
- `[[excelwise]]` — Financial Guidelines advice platform

### Teams / Roles

Existing: `[[lm-dc]]`, `[[com]]`, `[[qa]]`, `[[tc]]`, `[[doc-ops]]`.

New in this batch:
- `[[qa]]` — Quality Control team (audits, QC tasks, TDF Retirement Age updates)
- `[[plc]]` — Plan Consultant (or similar; from New Business cluster)
- `[[psc]]` — Plan Services Consultant (or similar; from New Business cluster)
- `[[lm-dc]]` — Data Consultant (general); relationship to `[[lm-dc]]` is an open question
- `[[pricing-consultant]]` — Pricing Consultant (New Business)
- `[[sales-consultant]]` — Sales Consultant (New Business)

## Concepts Mentioned

Existing and newly-evidenced concepts, with inline links where pages exist or will be created:

- `[[internal-conversion]]`, `[[internal-conversion-hours]]`, `[[day-of-liquidation-v1]]`, `[[day-of-liquidation-v2]]`, `[[day-of-rebook]]`, `[[day-of-rebook-split-mapping]]`
- `[[fund-mapping-audit]]`, `[[source-mapping-audit]]`, `[[day-of-wire-audit]]`, `[[day-after-wire-audit]]`, `[[fund-mapping]]`, `[[source-mapping]]`
- `[[default-allocation-analysis]]`, `[[default-deferral-analysis]]`, `[[missing-code-analysis]]`, `[[fund-split-worksheet]]`
- `[[takeover-holding-account]]`, `[[toa]]`, `[[final-takeover-audit]]`
- `[[cit-audit-control]]`, `[[diversified-client-integration-audit]]`, `[[list-of-all-cit-audits]]`
- `[[pre-conversion-loan-analysis]]`, `[[post-conversion-loan-analysis]]`, `[[loan-coupon-process]]`, `[[loan-re-amortization]]`
- `[[duplicate-ssn-cycle]]`, `[[dup-ssn-disable]]`, `[[dup-ssn-enable]]`
- `[[auto-enrollment-setup]]`, `[[eligibility-and-deferrals]]`, `[[enrollment-kit-outsourcing]]`, `[[welcome-confirm-samples]]`, `[[welcome-kit-sample]]`
- `[[day-2-transfer-process]]`, `[[psd-rebalance]]`, `[[vesting-override]]`, `[[division-code-update]]`, `[[tdf-retirement-age-update]]`, `[[insert-target-date-chart]]`
- `[[csr-cash-report]]`, `[[csr-mapping-report]]`, `[[etf-confirms-db-plans]]`, `[[monthly-reports-procedures]]`, `[[outbound-review]]`, `[[conversion-summary-report]]`
- `[[client-guide-application]]`, `[[statement-gui-procedures]]`, `[[ta-ui-user-guide]]`
- `[[new-business-setup]]`, `[[new-business-process-summary]]`, `[[nb-cit-transition-acct-consultants]]`, `[[incentive-compensation-direct-sales]]`
- `[[retiree-payment-audit]]`, `[[pataluma-update]]`, `[[gamble-report]]`
- `[[faa-allocations]]`, `[[faa-balances]]`, `[[faa-dc-data-requirements]]`
- `[[pog-loan]]`, `[[insert-delete-ppt-note]]`, `[[procedures-for-loading-test-participants]]`

## Contradictions / Open Questions

- **Post-conversion audit queries: legacy vs NEW.** Both `POST CONVERSION AUDIT QUERIES.md.txt` (36KB) and `POST CONVERSION AUDIT QUERIES NEW.md.txt` (42KB) are in the dump. Which is canonical today?
- **Takeover Holding Account: live vs under construction.** `TAKEOVER HOLDING ACCOUNT - BASE 36.md.txt` (11KB) and `UNDER CONSTRUCTION TAKEOVER HOLDING ACCOUNT - BASE 36 (1006).md.txt` (12KB) coexist. Which is live?
- **PARIS III vs P3.** Same system with different names, or distinct systems? If distinct, what's the split of responsibility?
- **CIT Takeover Audit Process — two variants.** `CIT Takeover Audit Process - External.md.txt` and `Takeover Audit Process - Internal.md.txt` — documented split, or stale file drift?
- **EDS LOAD BENEFICIARY REQUIREMENTS dated 2011.** Still current in 2026? The Eligibility procedure has 2013 release notes and the Basis-through-EDS file is dated 2026 — a 15-year-old procedure is a strong candidate for replacement.
- **"Data Consultant" (general) vs "Large Market Data Consultant".** Distinct role at different market segments (Small/Mid/Large), or the same role under different labels?
- **Loan Coupon Process** appears in two files (`Loan Coupon Process.md.txt` and `Loan_Coupon_Process.md.txt`) — duplicate or two different procedures?
- **Default Allocation / Default Deferral analyses.** Each appears in multiple variants (base, Description, _by_Division_Code, _pre-tax_only) — are these all current live queries or is there consolidation needed?
- **Paul & Danny (QC team)** — last names still open.
- **Samantha C.** — last name still open (carry-forward).

## File Inventory

146 files, bucketed by wiki destination. Sizes in bytes; file names exactly as they appear (URL-encoded spaces preserved).

### Filed → `queries/liquidation/` (5 files)

| Source file | Size | Wiki page |
|-------------|------|-----------|
| Internal conversion.md.txt | 54951 | [[internal-conversion-base]] |
| Internal conversion DAY OF LIQUIDATION.md.txt | 53812 | [[day-of-liquidation-v1]] |
| Internal conversion DAY OF LIQUIDATION2.md.txt | 56172 | [[day-of-liquidation-v2]] |
| Internal conversion DAY OF REBOOK.md.txt | 4232 | [[day-of-rebook]] |
| Internal conversion DAY OF REBOOK FOR SPLIT MAPPING.md.txt | 4103 | [[day-of-rebook-split-mapping]] |

### Filed → `queries/internal-conversion/` (~15 files)

| Source file | Size | Wiki page |
|-------------|------|-----------|
| Internal conversion hours.md.txt | 11264 | [[internal-conversion-hours]] |
| Internal conversion new takeover loan query build.md.txt | 4236 | [[internal-conv-takeover-loan-query]] |
| Internal conversion new takeover loan Sources query build.md.txt | 1319 | [[internal-conv-takeover-loan-sources]] |
| Internal conversion vesting and bene.md.txt | 3628 | [[internal-conv-vesting-bene]] |
| Internal Conversion - Balances (Riverside).md.txt | 7343 | [[internal-conv-balances-riverside]] |
| Basis for internal Conversions.md.txt | 3205 | [[basis-internal-conversion]] |
| Deferrals for internal conversion.md.txt | 2619 | [[deferrals-internal-conversion]] |
| Current elections for internal conv with dflt cd.md.txt | 2093 | [[current-elections-internal-conv]] |
| Current elections for internal conv with dflt cd (Multi Case).md.txt | 1214 | [[current-elections-internal-conv-multi]] |
| FOD status for internal conversion.md.txt | 482 | [[fod-status-internal-conv]] |
| Vesting Overrides for internal conversion.md.txt | 702 | [[vesting-overrides-internal-conv]] |
| Save Express election copy for internal conversion.md.txt | 3092 | [[save-express-election-internal-conv]] |
| copy e-statement election for internal conversion.md.txt | 1588 | [[estatement-election-internal-conv]] |
| e-mail data copy for internal conversions.md.txt | 741 | [[email-data-copy-internal-conv]] |
| new internal conversion deferral report.md.txt | 749 | [[new-internal-conv-deferral-report]] |
| highest outstanding loan balance for internal conv.md.txt | 906 | [[highest-outstanding-loan-balance]] |

### Filed → `queries/post-conversion-audit/` (consolidated to 1 page with variants noted)

| Source file | Size | Wiki page |
|-------------|------|-----------|
| POST CONVERSION AUDIT QUERIES.md.txt | 36225 | [[post-conversion-audit-queries]] |
| POST CONVERSION AUDIT QUERIES NEW.md.txt | 42780 | [[post-conversion-audit-queries]] (NEW variant — canonical question open) |

### Filed → `queries/takeover-data/` (9 files)

| Source file | Size | Wiki page |
|-------------|------|-----------|
| Takeover data for Internal Mergers.md.txt | 65146 | [[takeover-data-internal-mergers]] |
| TO CENSUS.md.txt | 6370 | [[to-census]] |
| TO_Allocations.md.txt | 6069 | [[to-allocations]] |
| TO_Balances.md.txt | 2857 | [[to-balances]] |
| TO_BASIS.md.txt | 1470 | [[to-basis]] |
| TO_COMPENSATION.md.txt | 1228 | [[to-compensation]] |
| TO_Deferrals.md.txt | 2947 | [[to-deferrals]] |
| TO_PY GROSS COMPENSATION.md.txt | 565 | [[to-py-gross-compensation]] |
| TO_YTD_CONTRIB.md.txt | 2986 | [[to-ytd-contrib]] |

### Filed → `queries/plan-config/` (2 files)

| Source file | Size | Wiki page |
|-------------|------|-----------|
| GET PLAN FUND.md.txt | 1561 | [[get-plan-fund]] |
| GET PLAN SOURCE.md.txt | 817 | [[get-plan-source]] |

### Filed → `queries/reporting/` (6 files)

| Source file | Size | Wiki page |
|-------------|------|-----------|
| Counts and totals for Gamble.md.txt | 9000 | [[gamble-counts-totals]] |
| Interest Rates for Gamble.md.txt | 1050 | [[gamble-interest-rates]] |
| fund level info for Gamble report.md.txt | 1787 | [[gamble-fund-level]] |
| source level info for Gamble report.md.txt | 2219 | [[gamble-source-level]] |
| loan balances prior to plan liquidation.md.txt | 7317 | [[loan-balances-pre-liquidation]] |
| Pataluma update.md.txt | 1701 | [[pataluma-update]] |

### Filed → `queries/special-cases/` (2 files)

| Source file | Size | Wiki page |
|-------------|------|-----------|
| Excelwise Finanail Guidlines Query - Default Election Check.md.txt | 1819 | [[excelwise-default-election-check]] |
| Sub_Pack_Raw_CCCS.txt | 4522 | [[subpack-cccs]] (existing) |

### Filed → `queries/holding-account/` (2 files)

| Source file | Size | Wiki page |
|-------------|------|-----------|
| TAKEOVER HOLDING ACCOUNT - BASE 36.md.txt | 11422 | [[takeover-holding-account]] |
| UNDER CONSTRUCTION TAKEOVER HOLDING ACCOUNT - BASE 36 (1006).md.txt | 12700 | [[takeover-holding-account-under-construction]] |

### Filed → Concept pages (audits)

| Source file | Informed concept page |
|-------------|----------------------|
| CIT Audit Control Root Causes and Controls.md.txt | [[cit-audit-control]] |
| CIT Management Walkthrough Questions.md.txt | [[cit-management-walkthrough]] |
| CIT Takeover Audit Process - External.md.txt | [[cit-takeover-audit-external]] |
| CTS Takeover Audit Process.md.txt | [[cts-takeover-audit]] |
| DIA Customer Integration Audit - Draft Report.md.txt | [[dia-customer-integration-audit]] |
| DIA Licensing and Commission Process Flow and Controls.md.txt | [[dia-licensing-commission]] |
| Diversified Client Integration Audit.md.txt | [[diversified-client-integration-audit]] |
| Day of Wire Audit.md.txt | [[day-of-wire-audit]] |
| Day After Wire Audit.md.txt | [[day-after-wire-audit]] |
| Completing the Day of AND Day After Wire Audit.md.txt | [[day-of-wire-audit]] / [[day-after-wire-audit]] |
| Fund Mapping Audit.md.txt | [[fund-mapping-audit]] |
| Source Mapping Audit.md.txt | [[source-mapping-audit]] |
| Default Allocation Analysis.md.txt | [[default-allocation-analysis]] |
| Default Allocation Analysis Description.md.txt | [[default-allocation-analysis]] |
| Default_Allocation_Analysis.md.txt | [[default-allocation-analysis]] |
| Default_Allocation_Analysis_by_Division_Code.md.txt | [[default-allocation-analysis]] |
| Default Deferral Analysis.md.txt | [[default-deferral-analysis]] |
| Default Deferral Analysis Description.md.txt | [[default-deferral-analysis]] |
| Default_Deferral_Analysis_by_Division_Code.md.txt | [[default-deferral-analysis]] |
| Default_Deferral_Analysis_pre-tax_only.md.txt | [[default-deferral-analysis]] |
| List_of_All_CIT_Audits.md.txt | [[list-of-all-cit-audits]] |
| Missing Code Analysis.md.txt | [[missing-code-analysis]] |
| Procedures_for_Completing_the_Final_Takeover_Audit.md.txt | [[final-takeover-audit]] |
| Takeover Audit - Process Review.md.txt | [[final-takeover-audit]] |
| Takeover Audit Process - Internal.md.txt | [[takeover-audit-internal]] |
| Quality Audits.md.txt | [[qa]] (role page; consolidated) |
| Quality Control page for Team Project Charter.md.txt | [[qa]] (role page) |
| Quality Assessment of Internal Team Members.md.txt | [[qa]] / [[qa]] |
| QC Tasks.md.txt | [[qa]] |
| Retiree_Payment_Load-Audit_Process_Plus_v2.md.txt | [[retiree-payment-audit]] |
| Pre-Conversion Loan Analysis Procedures.md.txt | [[pre-conversion-loan-analysis]] |
| Pre-Conversion loan review email to client.md.txt | [[pre-conversion-loan-analysis]] |
| Pre-Conversion_Loan_Analysis_Summary_to_Client.md.txt | [[pre-conversion-loan-analysis]] |
| Pre-Conversion_Loan_Analysis_Summary_to_Client - 2.md.txt | [[pre-conversion-loan-analysis]] |
| Post_Conversion_Loan_Analysis_Tool.md.txt | [[post-conversion-loan-analysis]] |
| Steps in creating the Takeover Loan Analysis-old way.md.txt | [[pre-conversion-loan-analysis]] (legacy reference; flag as stale) |
| Informatica - Allocations Audit.md.txt | [[informatica-allocation-module]] |
| Informatica Audits for Matt.md.txt | Informational (title-only; consolidated here) |

### Filed → Concept pages (operations)

| Source file | Informed concept page |
|-------------|----------------------|
| AUTO ENROLLMENT.md.txt | [[auto-enrollment-setup]] |
| Auto_Enroll_and_Enroll_Kit_Analysis.md.txt | [[auto-enrollment-setup]] |
| Eligibility_Auto Enroll_Enrollment kit services setup.md.txt | [[auto-enrollment-setup]] / [[enrollment-kit-outsourcing]] |
| System_Set_up_for_Eligibility_Auto_Enroll_Enrollment_kit_services.md.txt | [[auto-enrollment-setup]] |
| Pending Enrollment Kit Analysis.md.txt | [[enrollment-kit-outsourcing]] |
| Welcome Confirm Samples.md.txt | [[welcome-confirm-samples]] |
| Welcome Kit Sample Process.md.txt | [[welcome-confirm-samples]] |
| Email to TM's.md.txt | [[welcome-confirm-samples]] |
| Adding Participants to a Loan Pog.md.txt | [[pog-loan]] |
| Loan Coupon Process.md.txt | [[loan-coupon-process]] |
| Loan_Coupon_Process.md.txt | [[loan-coupon-process]] (duplicate — flag) |
| Loan Re-Amortization Procedures.md.txt | [[loan-re-amortization]] |
| Day 2 Transfer Process.md.txt | [[day-2-transfer-process]] |
| Duplicate SSN Process.md.txt | [[duplicate-ssn-cycle]] |
| Dup SSN Process - DISABLE.md.txt | [[duplicate-ssn-cycle]] |
| Dup SSN Process - ENABLE.md.txt | [[duplicate-ssn-cycle]] |
| PSD ReBalance.md.txt | [[psd-rebalance]] |
| Vesting Override Procedure.md.txt | [[vesting-override]] |
| Division Code Update.md.txt | [[division-code-update]] |
| TDF Retirement Age Update.md.txt | [[tdf-retirement-age-update]] |
| Inserting Target Date Chart.md.txt | [[insert-target-date-chart]] |
| Inserting a Target Date Chart.md.txt | [[insert-target-date-chart]] |
| Insert-Delete Ppt Note.md.txt | [[insert-delete-ppt-note]] |
| Fund Split Worksheet Instructions.md.txt | [[fund-split-worksheet]] |
| Final Funds and Pricing Reminder email template.md.txt | [[fund-management-calendar]] |
| Updating Deferrals for Term to Zero.md.txt | [[deferrals]] |
| PROCEDURES FOR LOADING TEST PARTICIPANTS.md.txt | [[procedures-for-loading-test-participants]] |
| Setting up Informatica.md.txt | [[informatica]] |
| Outbound Review Procedure 3-25-2024.md.txt | [[outbound-review]] |
| Statement GUI Procedures.md.txt | [[statement-gui-procedures]] |
| TA UI User Guide.md.txt | [[ta-ui-user-guide]] |
| Client Guide Application.md.txt | [[client-guide-application]] |
| Client Guide Application Update Instructions.md.txt | [[client-guide-application]] |
| CSR Cash Report - 2025.md.txt | [[csr-cash-report]] |
| CSR Mapping Report - 2025.md.txt | [[csr-mapping-report]] |
| Conversion Summary Report Procedures.md.txt | [[conversion-summary-report]] |
| Monthly Reports Procedures 9-22-23.md.txt | [[monthly-reports-procedures]] |
| ETF Confirms for DB Plans.md.txt | [[etf-confirms-db-plans]] |
| Procedures for DB Deduction Codes_Map Keys_EFT Confirms_DB Report setup.md.txt | [[etf-confirms-db-plans]] |
| FAA Allocation Procedures.md.txt | [[faa-allocations]] |
| FAA for Allocations.md.txt | [[faa-allocations]] |
| FAA for Balances.md.txt | [[faa-balances]] |
| TOA_Procedures.md.txt | [[toa]] |

### Filed → Role / entity / process pages

| Source file | Informed page |
|-------------|--------------|
| Data Consultant.md.txt | [[lm-dc]] (general); open question vs [[lm-dc]] |
| NB CIT Transition Acct Consultants.md.txt | [[nb-cit-transition-acct-consultants]] |
| New Business CIT Mgmt_PC Process Flow.md.txt | [[new-business-setup]] |
| New Business Process Summary.md.txt | [[new-business-setup]] |
| New Business Set-Up Process Flow.md.txt | [[new-business-setup]] |
| Incentive Compensation Direct Sales Process Flow.md.txt | [[incentive-compensation-direct-sales]] |

### Filed → Existing stub upgrades (this ingest)

| Source file | Upgraded page |
|-------------|---------------|
| Informatica Training Manual.md.txt | [[informatica-training-manual]] |
| Informatica Allocation Module Functional Documentation.md.txt | [[informatica-allocation-module]] |
| Informatica Balance Module Functional Documentation v2.md.txt | [[informatica-balance-module]] |
| Initial Design Specs for Informatica Balances.md.txt | [[informatica-balance-module]] |
| Informatica Loan Module Functional Documentation.md.txt | [[informatica-loan-module]] |
| Informatica Loan Module.md.txt | [[informatica-loan-module]] |
| Informatica Troubleshooting Guide.md.txt | [[informatica-troubleshooting-guide]] |
| Using Informatica Basis Module.md.txt | [[informatica-basis-module]] |
| Loading Basis through EDS 03-26-2026.md.txt | [[loading-basis-eds]] |
| Loading YTD Contributions through EDS.md.txt | [[loading-ytd-contributions-eds]] |
| Loading_Eligibility_through_EDS.md.txt | [[loading-eligibility-eds]] |
| EDS LOAD BENEFICIARY REQUIREMENTS 06-17-2011(Autosaved).md.txt | [[eds-load-beneficiary-requirements]] |
| Data Discovery Document (New).md.txt | [[data-discovery-document]] |
| FAA - DC Data Requirements(Final).md.txt | [[faa-dc-data-requirements]] |
| Hours procedure.md.txt | [[hours-procedure]] |

### Informational only (consolidated here; no dedicated wiki page)

A handful of files in the batch are title-only placeholders whose content does not add anything beyond what other pages already document. They are cataloged here for completeness:

- `Informatica Audits for Matt.md.txt` (133 bytes) — title-only; a personalized reference, not a distinct audit type
- `Informatica Allocation Module Functional Documentation.md.txt` (58 bytes) — title-only, superseded by the Allocations Audit content
- `Informatica Balance Module Functional Documentation v2.md.txt` (55 bytes) — title-only, superseded by Initial Design Specs content
- `Informatica Loan Module Functional Documentation.md.txt` (52 bytes) — title-only, superseded by `Informatica Loan Module.md.txt`
- `Informatica Training Manual.md.txt` (31 bytes) — title-only
- `Informatica Troubleshooting Guide.md.txt` (37 bytes) — title-only
- `Using Informatica Basis Module.md.txt` (34 bytes) — title-only
- `Loading Basis through EDS 03-26-2026.md.txt` (29 bytes) — title-only, date noted
- `Loading YTD Contributions through EDS.md.txt` (41 bytes) — title-only
- `EDS LOAD BENEFICIARY REQUIREMENTS 06-17-2011(Autosaved).md.txt` (37 bytes) — title-only, 2011-dated
- `Hours procedure.md.txt` (19 bytes) — title-only
- `Data Discovery Document (New).md.txt` (27 bytes) — title-only
- `FAA - DC Data Requirements(Final).md.txt` (30 bytes) — title-only

These are all flagged in their respective concept pages with a note that the canonical content lives elsewhere (likely OneNote) and needs a fuller ingest.

## See Also
- [[lmdc-training-notebook]] — prior ingest from the OneNote training notebook
- [[com-main-checklist]] — prior COM checklist ingest
- [[dc-brain-dump-001]] — prior DC brain dump
- [[subpack-cccs]] — prior subpack / CCCS ingest
- [[extra-questions-001]] — prior extra-questions ingest
- [[internal-conversion]]
- [[informatica]]
- [[eds]]
- [[qa]]
- [[qa]]
