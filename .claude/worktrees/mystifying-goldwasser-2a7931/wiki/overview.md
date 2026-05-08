---
title: "Overview"
type: analysis
tags: [overview, synthesis]
created: 2026-04-14
updated: 2026-04-17
sources: 6
---

# Overview

*High-level synthesis of the entire knowledge base. Updated after every ingest that materially changes the big picture.*

---

## Domain

**Retirement plan recordkeeping** at Transamerica. The wiki now documents the full conversion-and-operations stack: the data-owning role ([[lm-dc]] / [[lm-dc]]), the project-managing role ([[com]]), the quality function ([[qa]] / [[qa]]), downstream transition work ([[tc]], [[psc]]), upstream origination ([[sales-consultant]], [[pricing-consultant]], [[plc]]), and the document-operations desk ([[doc-ops]]). As of the 2026-04-17 batch ingest, there are now two parallel macro-workflows documented end-to-end: **external plan conversion** (new business from a prior recordkeeper) and **internal conversion** (plan-to-plan merger within Transamerica).

---

## Current Thesis

A conversion — whether external or internal — is a **parallel project** with two primary owners: the [[lm-dc]] (data) and the [[com]] (communication, project management, documents). They start at the same time, run largely independent workflows, and converge at critical handoff points. [[qa]] / [[qa]] audits the result.

**External conversion** (prior RK → TA) is a multi-month process driven by client onboarding, prior vendor coordination, liquidation day, and final-file posting. See [[dc-onboarding-workflow]].

**Internal conversion** (TA plan → TA plan: affiliate consolidations, MEP/PEP transitions, plan terminations onto a surviving plan) is a distinct workflow. No external vendor is involved; instead, the DC runs a library of AQT queries that extracts hours, vesting, deferrals, basis, elections, loans, and fund/source balances from the terminating plan and inserts them onto the surviving plan. See [[internal-conversion]].

The biggest risks across both: process gaps (subpack not distributed, FTP requested too late, mapping not approved in time), timing errors (blackout notice too late, early access file late, Matt O'Connell timing), system gotchas (dummy participant missing, wrong P3 processing mode, AWD flip not confirmed), and data-integrity risks on internal mergers (mismatched source IDs, unbooked holding-account transactions, incomplete loan re-amortization).

---

## Key Themes

### 1. Do Things Early
Nearly every process has "as early as possible" guidance: FTP setup, wire instructions, prior RK contact, fund mapping, EDS layouts. The timeline compresses at the end — front-load the work.

### 2. Conversion Type Drives Everything
Whether a plan is **cash**, **mapping**, **transfer in kind** (TIK), or an **internal merger** determines how every major step is executed. Know the conversion type early and plan accordingly.

### 3. Order Matters
Hard sequence dependencies:
- **Deferrals before eligibility** (always)
- **Fund mapping before source mapping** (conceptually)
- **CONV file → Day of Wire → Final Files → Balance Posting**
- **Matt O'Connell timing** — too early is bad, too late is worse
- **Internal conversion query order** — hours/vesting → deferrals/elections → basis → balances → loans (see [[internal-conversion]])

### 4. Process Mode Determines Whether Trades Go Out
The [[p3]] processing mode (Immediate+Batch vs. Online+No Hold) determines whether trades are sent. Trades should only go out once per fund. Get this wrong and you generate duplicate trades or fail to invest money.

### 5. EDS Output Must Always Be Read
Every file run through EDS produces output. Ignoring it risks undetected errors persisting into production.

### 6. Query Everything Before Posting
QA and DC both rely on a shared library of AQT queries to verify data integrity at every milestone — pre-liquidation, post-liquidation, post-rebook, and post-conversion. See `wiki/queries/` for the full library.

---

## Key People

| Name | Role |
|------|------|
| [[ellen-miller]] | Central routing contact — DC assignment, notice mailing, plan setup in SF, go-live notification |
| [[matt-oconnell]] | TIK re-registration — sets up Fidelity accounts for share transfers |
| [[jen-curtin]] | Head of FTP Team — notified by COM for 360° payroll plans |
| [[rich-lippoth]] | Incoming shares and regular trades; Vanguard FMC deadline contact |
| [[stacey-fortune]] | Large Market cross-department manager |
| [[nick-lister]] | DC's direct manager |

---

## Key Systems

| System | Purpose |
|--------|---------|
| [[nbi]] | Plan assignment tracking; universal plan checklist |
| [[p3]] | Main plan administration platform |
| [[p2]] | Back-end region for transfer reference numbers |
| [[eds]] | File layout, validation, processing |
| [[informatica]] | Day of Wire and Participant Balance workflows |
| [[aqt]] | Read-only SQL query tool |
| [[docusign]] | E-signature for plan documents |
| [[wx]] | Plan Sponsor Site; payroll functionality |
| [[paris-iii]] | Legacy name relationship to [[p3]] — open question whether same system |
| [[roc-tool]] | Reversal/correction lookup inside P3 |
| [[serena]] | Internal system (per main-dump ingest) |
| [[jira]] | Ticket / issue tracking |
| [[odsp]] | Internal data platform |
| [[trs]] | Internal system |
| [[excelwise]] | Default election check reporting |

---

## Key Documents

| Document | Purpose |
|----------|---------|
| [[prd]] | Plan provisions — prior provider to TA |
| [[onboarding-package]] | All-in-one alternative to PRD (PEP plans) |
| [[subpack]] | TA's internal execution plan |
| [[toa]] | Client-signed fund map + TIK identifier |
| [[base-file]] | Census template to seed the system |
| [[payroll-template]] | Payroll file format for vendor/client |
| [[audit-pack]] | High-level conversion summary built by DC, reviewed by QA |
| [[reversal-form]] | Replaces the retired Plan Correction Checklist (as of 03/06/2026) |

---

## Query Library (added 2026-04-17)

A full SQL library is now on the wiki under `wiki/queries/`:

- `queries/liquidation/` — day-of-liquidation (v1 + v2), day-of-rebook, day-of-rebook for split mapping
- `queries/internal-conversion/` — hours, vesting, deferrals, elections, basis, FOD status, overrides, loan builds, copy operations
- `queries/post-conversion-audit/` — full audit query set (legacy + NEW version)
- `queries/takeover-data/` — TO_* extracts (balances, deferrals, allocations, YTD, basis, census, compensation)
- `queries/plan-config/` — [[get-plan-fund]], [[get-plan-source]]
- `queries/reporting/` — Gamble counts/totals, loan balances prior to liquidation, Excelwise default election check
- `queries/holding-account/` — takeover holding account base 36 (v1 + under-construction v2)
- `queries/special-cases/` — Pataluma, Riverside

---

## Open Questions (Knowledge Gaps)

**Resolved this session (Round 7 — Main Dump Batch, 2026-04-17):**
- Query library now exists on the wiki (see above)
- Internal conversion workflow fully documented — see [[internal-conversion]]
- QA audit taxonomy captured: Fund Mapping, Source Mapping, Day-of-Wire, Day-After-Wire, FAA Balances/Allocations, Default Allocation/Deferral, CIT, PSD Rebalance
- New roles filed: [[plc]], [[psc]], [[qa]], [[pricing-consultant]], [[sales-consultant]], [[lm-dc]]
- New systems filed: [[paris-iii]], [[roc-tool]], [[serena]], [[jira]], [[odsp]], [[trs]], [[excelwise]]
- New processes filed: [[new-business-setup]], [[duplicate-ssn-cycle]], [[loan-reamortization]], [[db-plan-setup]], [[incentive-compensation]]
- FD_ACTION_CD decoding confirmed: 0=CONTRIBUTIONS ALLOWED, 1=ER LEVEL ONLY, 3=RESTRICTED
- STAT_C decoding confirmed: 0=ACTIVE, 1=INACTIVE
- TR_NO codes captured: 1006 (holding account), 1119 (takeover), 3030/4000 (liquidation transactions)

**Still Open:**
1. **Relationship between [[paris-iii]] and [[p3]]** — same system under different name, or genuinely distinct? Multiple sources reference both.
2. **Is [[lm-dc]] distinct from [[lm-dc]]**, or the same role at a different market segment?
3. **Paul (QC)** — last name unknown
4. **Danny (QC)** — last name unknown
5. **Samantha C.** — receives Transition Communications Checklist (non-PEP); last name and team still unknown
6. **Prior RK workflows** — Fidelity, Vanguard, Empower — DC has built them; needs documentation once finalized
7. **Workflows (WFs)** — in the main DC folder; still being tuned; needs documentation as they're finalized
8. **Holding account base 36 v2** — draft is in-progress; current version is under construction (see `queries/holding-account/`)

**Resolved prior rounds** — see git history; kept short to avoid bloat. Key earlier resolutions: P2/P3 distinction, AQT definition, audit-pack template, NBI continuous-update model, TC vs COM relationship, FMC cut-off (4:00 PM EST via SSBT), booking-type split (4=Remit vs 3=Rebook), LTPT eligibility codes, Common Remitter plans ("Verify Batch After Funding"), Reversal Form replacement of Plan Correction Checklist, Rich Lippoth's role.

---

## See Also

- [[dc-onboarding-workflow]] — the master process reference (external conversion)
- [[internal-conversion]] — plan-to-plan merger workflow within TA
- [[conversion-types]] — cash vs. mapping vs. TIK
- [[liquidation-day]] — the critical execution day
- [[final-files-processing]] — post-liquidation data posting
- [[queries/index]] — full AQT query library
