---
title: "Overview"
type: reference
tags: [overview, synthesis]
created: 2026-04-14
updated: 2026-05-13
sources: 10
---

# Overview

*High-level synthesis of the entire knowledge base. Updated after every ingest that materially changes the big picture.*

---

## Domain

**Retirement plan recordkeeping** at TransAmerica. This wiki documents the Data Consultant (DC), Communications Coordinator (COM), Transition Consultant (TC), and Quality Assurance / QC perspectives at different depths. DC and COM are still the most complete role pages; TC and QA/QC now have stronger administrative and audit-control coverage from legacy TC source material. Doc Ops remains a stub pending fuller source material.

---

## Current Thesis

A plan conversion is fundamentally a parallel project with multiple control lanes: DC owns data movement, COM owns project communication and document routing, TC owns administrative readiness and participant/sponsor access controls, and QA/QC owns validation and audit evidence. These lanes start separately and converge at mapping approval, eligibility, limited/full access, go-live, and closeout.

**The DC role** is data orchestration â€” sitting at the intersection of client data, vendor data, internal systems, and multiple internal teams. Two modes: preparation (weeks to months before liquidation) and execution (liquidation day through final files).

**The COM role** is project management and document routing â€” owning the client relationship, all participant-facing communications, document execution (DocuSign, prior RK letters, blackout notices), payroll coordination, and go-live close-out.

The biggest risks across both roles: process gaps (subpack not distributed, FTP requested too late, mapping not approved in time), timing errors (blackout notice too late, early access file late, Matt O'Connell timing), and system gotchas (dummy participant missing, wrong P3 processing mode, AWD flip not confirmed).

---

## Key Themes

### 1. Do Things Early
Nearly every process has "as early as possible" as the guidance: FTP setup, wire instructions, prior RK contact, fund mapping, EDS layouts. The conversion timeline compresses at the end â€” front-load the work.

### 2. Conversion Type Drives Everything
Whether a plan is **cash**, **mapping**, or **transfer in kind** (TIK) determines how every major step is executed. Know the conversion type early and plan accordingly.

### 3. Order Matters
Several steps have hard sequence dependencies:
- **Deferrals before eligibility** (always)
- **Fund mapping before source mapping** (conceptually â€” but fund mapping doesn't need test files, source mapping does)
- **CONV file â†’ Day of Wire â†’ Final Files â†’ Balance Posting** (cannot skip steps)
- **Matt O'Connell timing** â€” too early is bad, too late is worse

### 4. Process Mode Determines Whether Trades Go Out
The [[p3]] processing mode (Immediate+Batch vs. Online+No Hold) determines whether trades are sent. Trades should only go out once per fund. Get this wrong and you generate duplicate trades or fail to invest money.

### 5. EDS Output Must Always Be Read
Every file run through EDS produces output. Ignoring it risks undetected errors persisting into production.

---

## Key People

| Name | Role |
|------|------|
| [[ellen-miller]] | Central routing contact â€” DC assignment, notice mailing, plan setup in SF, go-live notification |
| [[matt-oconnell]] | TIK re-registration â€” sets up Fidelity accounts for share transfers |
| [[jen-curtin]] | Head of FTP Team â€” notified by COM for 360Â° payroll plans; internal payroll integration authority |

---

## Key Systems

| System | Purpose |
|--------|---------|
| [[nbi]] | Plan assignment tracking; project plan repository; audit checklist at go-live |
| [[p3]] | Main plan administration platform |
| [[eds]] | File layout, validation, and processing |
| [[informatica]] | Day of Wire and Participant Balance workflows |
| [[aqt]] | Database query tool for source IDs |
| [[docusign]] | E-signature platform for plan documents and onboarding agreements (COM) |
| [[wx]] | Plan Sponsor Site; payroll functionality (WX V2) |

---

## Key Documents

| Document | Purpose |
|----------|---------|
| [[prd]] | Plan provisions â€” prior provider to TA |
| [[onboarding-package]] | All-in-one alternative to PRD (PEP plans) |
| [[subpack]] | TA's internal execution plan |
| [[toa]] | Client-signed fund map + TIK identifier |
| [[base-file]] | Census template to seed the system |
| [[payroll-template]] | Payroll file format for vendor/client |

---


### 6. Administrative Readiness Is Its Own Lane
TC work is not just background support. Case notes, PSD setup, DDOL/VRU access, remittance guides, admin manuals, special services, and go-live controls are their own operating lane. If this lane is late, the plan can be technically loaded but still not ready to operate.

### 7. QA/QC Catches Setup Risk, Not Just Data Risk
QA/QC validates conversion records and assets, but also reviews default allocations, default deferrals, participant website behavior, statement-related work, loans, divisions, duplicate SSNs, and system audit items. This makes QA/QC a setup-control partner for TC and DC.
## Open Questions (Knowledge Gaps)

**Resolved:**
- ~~P2 vs P3~~ â€” Different systems: P2 = back-end ref number region; P3 = main plan admin region. Changes in P2 reflect in P3.
- ~~AQT~~ â€” A SQL query program (SQL Server front-end). Read-only â€” view only, no table changes.
- ~~Audit pack~~ â€” High-level conversion summary (ref numbers, amounts, prior vendor data). Built by DC, reviewed by QA, stored in client folders.
- ~~Re-registration form fields~~ â€” Prior vendor info, contact, effective dates, fund details (QSIP, tickers, estimated amount).
- ~~NBI update points~~ â€” Updated continuously (every milestone, document receipt, action). Universal plan checklist with role-based sections.
- ~~TC team~~ â€” Transition Consultant. Higher-level systematic back-end work. More back-end than the COM.
- ~~ROC tool navigation~~ â€” P3 menu bar â†’ ROC. Query "ROC No Reversal" (TDA) or Cork equivalent. Enter case number + SSN.
- ~~Market timing~~ â€” 1:00 PM Pacific / 4:00 PM Eastern. Fund Management Calendar must be updated before cutoff on trade days.

**Resolved this session (Round 5 â€” LMDC Training Notebook ingest):**
- FMC shared drive path question superseded: new Feb 2026 FMC procedure uses email distribution + file update; full procedure documented in [[fund-management-calendar]]
- Informatica Day of Wire test mode confirmed: **cannot be tested end-to-end** â€” debug/preview only; triple-check before running live
- FMC: SSBT cut-off confirmed at 4:00 PM EST; wire confirmation from Cashiering expected by 4:45 PM EST
- Reversal process: Plan Correction Checklist retired as of 03/06/2026; new Reversal Form process documented
- Booking assets: two booking types (4=Remit for wire, 3=Rebook for AEDA disbursement) documented
- LTPT eligibility: documented â€” effective Jan 1, 2025; EDS codes 5 and 6; hours tracking for excluded classes required
- Common Remitter Plans: "Verify Batch After Funding" replaces Pre-Process in P3
- Payroll handoff at go-live: FILESPECRQ ticket to Fiduciary Services effective Feb 26, 2026
- TM (Transition Manager): confirmed as legacy name for COM; all wiki references updated to COM

**Resolved this session (Round 6 â€” acronyms and people):**
- **CCCS** = Client Conversion Configuration Sheet âœ“
- **FAA** = Fund Asset Allocation âœ“
- **PEA** = Plan Enrollment Agreement âœ“ â€” see [[glossary/pea]]
- **AAA** = Adoption Agreement Addendum âœ“ â€” see [[glossary/aaa]]
- **SF** = Salesforce âœ“ â€” used for plan setup confirmation and VEF L&C tickets
- **Communication Consultant** = internal Doc Ops role âœ“ â€” [[doc-ops]] handles conversion newsletter
- **QC / Quality Consultant** = Paul and Danny âœ“ â€” QA team; focus is auditing imported data and mapping; entity pages pending last names
- **Rich Lippoth** = go-to for incoming shares and regular trades âœ“ â€” see [[entities/rich-lippoth]]; most visible on Vanguard FMC deadline

**Still Open:**
1. **Common prior RK workflows** â€” Fidelity, Vanguard, Empower â€” DC has built them; needs documentation once finalized
2. **Workflows (WFs)** â€” in the main DC folder; still being tuned; needs documentation as they're finalized
3. **Query library** â€” many P3 verification queries mentioned but not yet documented; will be in a dedicated md file
4. **Samantha C.** â€” receives Transition Communications Checklist (non-PEP); last name and team still unknown
5. **Paul (QA)** â€” last name unknown
6. **Danny (QA)** â€” last name unknown

**Resolved this session (Round 4):**
- Audit pack template: `root/Conversion/Contract`, Excel format, same-day QA review, same template for all conversion types
- Re-registration form: front folder of DC folder, Excel, simple form
- NBI full name: New Business Intelligence (web-based; all plans visible)
- P2 navigation confirmed; trans ref number format documented (YYYYMMDD + 7-8 alphanumeric)
- Eligibility P3 nav path confirmed; email template exists; same-day go-ahead turnaround
- Informatica is a standalone app; CONV file fields fully documented
- Fund mapping TA fields confirmed: Filter, Vendor Fund Code, Ref #, Split Ratio, Split Code, Total
- Source mapping not loaded to system â€” added to workflows as reference doc
- Wire instructions: standard template; Assurance Code in P3 determines account number
- FTP setup via email; each plan has its own destination folder
- FMC: cashiering/trading dept monitors; email backup process for missed cutoffs; TIK funds don't need FMC entries
- Dummy participant: DC adds it; one per plan; nightmare if forgotten; not needed for TIK
- Prior RK known from day of assignment; questionnaire sent in hello email; relationship shared across team
- TIK: tracker spreadsheet confirmed; Matt communicates via spreadsheet; DCs investigate mismatches
- Stacey Fortune: Large Market dept; general knowledge resource

---

## See Also

- [[dc-onboarding-workflow]] â€” the master process reference
- [[conversion-types]] â€” cash vs. mapping vs. TIK
- [[liquidation-day]] â€” the critical execution day
- [[final-files-processing]] â€” post-liquidation data posting

