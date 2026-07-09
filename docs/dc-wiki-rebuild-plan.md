# DC-Only Wiki Rebuild — Audit + Plan

Handoff file. Written 2026-07-08 from an audit session run outside this repo.
Companion to `TA_Wiki_Rebuild_Prompt.md` (repo root) — that file is the design brief;
this file is the audit of existing content and the execution plan.

## Objective

Rebuild the wiki from a four-role encyclopedia (DC/COM/TC/QA, organized by note type)
into a **Data Consultant operations wiki** organized by workflow. Operational, not
educational. Every page answers "what does a DC need to do this task correctly."

Approved by Joel 2026-07-08: keep/cut split below and the target architecture.
Cuts are **archived, never deleted**.

---

## Target architecture

```
Dashboard (home)
├── Case Lifecycle          dc-onboarding-workflow as spine; kickoff → discovery
│                           → mapping → wire day → final files → go-live → closeout
├── Data Loading            one page per load, standardized template: census,
│                           eligibility, deferrals, balances (cash/mapping/TIK),
│                           loans, basis, YTD, elections, forfeitures, hours
├── Payroll                 vendor onboarding, FTP setup, file specs, OnePayroll,
│                           testing, go-live handoff (FILESPECRQ), automation
├── Conversion Operations   conversion types, fund/source mapping, TOA, wires,
│                           liquidation day, TIK/re-reg, booking, AE account,
│                           subsequent cash, dummy participant, FMC
├── Department Coordination interface pages ONLY (handoffs, inputs/outputs,
│                           escalation): TC, COM, QA, Cashiering, FTP Team,
│                           Prod Support, Doc Ops, Payroll Support
├── Troubleshooting         symptom-indexed: reversals, loan failures, Informatica
│                           errors, common remitter, control mismatches, AWD tickets
├── Checklists              day-of-wire audit, final files sequence, go-live,
│                           kickoff, payroll testing
├── Reference               NEW section: SQL query library, P2/P3 navigation paths,
│                           bank/wire routing table, file naming conventions,
│                           EDS layouts, glossary (~15 terms)
└── Vendor Library          prior-RK page generalized; per-vendor pages grow over time
```

Data Loading page template (from the rebuild prompt): Purpose, Required files,
Input requirements, Validation checklist, Common errors, Dependencies, Timing,
QC, Recovery procedures, Related procedures.

---

## Build order

1. **Archive the cuts** (git mv into `_archive/` or a `wiki/_cut/` holding area —
   salvage embedded procedures from people pages FIRST, see salvage list below).
2. **Restructure folders** around the new sections; rewrite `wiki/index.md` and
   `wiki/overview.md` around the DC lens. Obsidian `[[links]]` resolve by filename,
   so moves don't break links if filenames stay the same.
3. **Trim department/role pages** to DC-facing interfaces (Dept Coordination).
4. **Mine the source dumps** (see "Unmined material" below) into Data Loading,
   Payroll, Troubleshooting, and the new Reference section.
5. **Fold in the FTP Stuf guides** (see "External source material").
6. Renderer/UI work in `studio/` per repo router; content in `garage/` workflow.
   Follow the Write Protocol in root CLAUDE.md for `current/TA Wiki.html`.

---

## Audit — full disposition (133 pages)

Tally: ~70 KEEP, ~25 ADAPT, ~25 CUT, 11 sources to mine.

### concepts/ (67)

| File | Verdict | New section | Note |
|---|---|---|---|
| advanced-employer.md | KEEP | Conversion Ops | AE holding account lifecycle |
| audit-pack.md | KEEP | Conversion Ops | |
| balance-import.md | KEEP | Data Loading | overview of 3 methods |
| balance-import-cash.md | KEEP | Data Loading | |
| balance-import-mapping.md | KEEP | Data Loading | |
| balance-import-tik.md | KEEP | Data Loading | |
| base-file.md | KEEP | Data Loading | |
| blackout-notice.md | CUT | - | COM-owned |
| bonus-election-setup.md | KEEP | Payroll | |
| booking-assets.md | KEEP | Conversion Ops | 4=Remit vs 3=Rebook |
| case-notes-template.md | ADAPT | Knowledge Base | TC-oriented |
| cccs-submission-package.md | ADAPT | Case Lifecycle | intake reference |
| census-data.md | KEEP | Data Loading | |
| common-remitter-plans.md | KEEP | Troubleshooting | Verify Batch flow |
| contribution-monitoring-form.md | CUT | - | thin, COM-owned |
| conv-file.md | KEEP | Conversion Ops | |
| conversion-types.md | KEEP | Conversion Ops | foundational |
| creative-planning-managed-accounts.md | ADAPT | Knowledge Base | legacy, needs review |
| csr.md | CUT | - | COM-role stub |
| dc-onboarding-workflow.md | KEEP | Case Lifecycle | **cornerstone / spine** |
| defaulting-elections-eds.md | KEEP | Data Loading | |
| deferrals.md | KEEP | Data Loading | |
| divisions-and-affiliates.md | ADAPT | Knowledge Base | legacy screenshots |
| dummy-participant.md | KEEP | Conversion Ops | |
| early-access.md | CUT | - | COM-owned; DC load step folds into census page |
| eds-load-beneficiary-requirements.md | ADAPT | Data Loading | thin stub, needs source |
| eligibility.md | KEEP | Data Loading | |
| eligibility-and-deferrals.md | KEEP | Data Loading | sequencing rule |
| forfeiture-loading.md | KEEP | Data Loading | stand-out dates |
| ftp-connection.md | KEEP | Payroll | |
| fund-management-calendar.md | KEEP | Conversion Ops | high-value, SSBT cutoff |
| fund-mapping.md | KEEP | Conversion Ops | |
| go-live-checklist.md | ADAPT | Checklists | TC-owned gate model |
| hours-procedure.md | ADAPT | Data Loading | thin stub |
| informatica-allocation-module.md | ADAPT | Data Loading | thin stub |
| informatica-balance-module.md | KEEP | Data Loading | |
| informatica-loan-module.md | KEEP | Data Loading | NPER rounding etc. |
| informatica-training-manual.md | CUT | - | duplicate of hub |
| informatica-troubleshooting-guide.md | KEEP | Troubleshooting | |
| limited-access-file.md | KEEP | Data Loading | |
| liquidation-day.md | KEEP | Conversion Ops | **cornerstone** |
| loading-basis-eds.md | KEEP | Data Loading | |
| loading-eligibility-eds.md | CUT | - | superseded redirect |
| loading-ytd-contributions-eds.md | ADAPT | Data Loading | thin, needs source |
| loan-setup.md | KEEP | Data Loading | 14-step, high-value |
| ltpt-eligibility.md | KEEP | Data Loading | trim regulatory framing |
| nsa.md | CUT | - | COM trigger stub |
| onboarding-package.md | KEEP | Case Lifecycle | |
| payroll-file-automation.md | ADAPT | Payroll | legacy field names |
| payroll-handoff-at-go-live.md | KEEP | Payroll | FILESPECRQ |
| payroll-template.md | KEEP | Payroll | |
| payroll-vendor-onboarding.md | KEEP | Payroll | |
| plan-classes.md | KEEP | Knowledge Base | |
| prd.md | KEEP | Case Lifecycle | |
| prior-carrier-letter.md | CUT | - | COM-owned |
| prior-record-keeper.md | KEEP | Vendor Library | seed page |
| project-plan-com.md | CUT | - | COM tracker |
| rdd-form.md | CUT | - | thin, unconfirmed |
| reversal-process.md | CUT | - | superseded redirect |
| source-mapping.md | KEEP | Conversion Ops | |
| subpack.md | ADAPT | Case Lifecycle | |
| subsequent-cash-imports.md | KEEP | Conversion Ops | |
| team-charters.md | CUT | - | org info |
| toa.md | KEEP | Conversion Ops | |
| transfer-in-kind.md | CUT | - | superseded redirect |
| vef.md | CUT | - | COM-owned |
| wire-instructions.md | KEEP | Conversion Ops | |

### entities/ (23)

| File | Verdict | New section | Note |
|---|---|---|---|
| alteryx.md | ADAPT | Data Loading | strip person-dependency |
| aqt.md | KEEP | Data Loading / Reference | |
| cashiering.md | ADAPT | Dept Coordination | trim to DC handoff |
| dave-shloat.md | CUT | - | people page |
| docusign.md | ADAPT | Vendor Library | peripheral |
| earl-sanford.md | CUT | - | people page |
| eds.md | KEEP | Data Loading | |
| ellen-miller.md | ADAPT→CUT | Case Lifecycle | **salvage NBI assignment-pipeline procedure first** |
| eric-leytem.md | CUT | - | fold "who confirms FTP setup" into FTP page |
| ftp-team.md | ADAPT | Dept Coordination | drop named contacts |
| informatica.md | KEEP | Conversion Ops / Data Loading | richest execution page |
| jen-curtin.md | CUT | - | fold escalation note into FTP dept page |
| matt-oconnell.md | ADAPT→CUT | Conversion Ops | **salvage entire TIK timing/re-reg/tracker procedure first** |
| nbi.md | KEEP | Case Lifecycle | |
| nick-lister.md | CUT | - | fold AE-liquidation escalation into Conversion Ops |
| p2.md | KEEP | Conversion Ops / Reference | |
| p3.md | KEEP | Data Loading | |
| payroll-support.md | ADAPT | Dept Coordination (Payroll) | trim to DC interface |
| prod-support.md | KEEP | Troubleshooting / Dept Coordination | AWD submission procedure |
| rich-lippoth.md | CUT | - | **salvage FMC/Vanguard 2PM approval rule into Conversion Ops first** |
| scott-vrba.md | CUT | - | fold "escalate complex eligibility" into eligibility page |
| stacey-fortune.md | CUT | - | fold AE-liquidation approval note into Conversion Ops |
| wx.md | ADAPT | Payroll | thin |

### glossary/ (13) — all KEEP → Reference/Glossary

aaa (thin), awd (also Troubleshooting), csr, faa, filespecrq, holb, kit-mail-date,
ltpt, nsa, pea, ssbt (cross-ref Cashiering), tm (legacy decoder), vef.

### roles/ (5) — all ADAPT → Dept Coordination interfaces

| File | Treatment |
|---|---|
| lm-dc.md | becomes the wiki's spine/overview; strip named-people table |
| com.md | trim 18-phase charter to DC-facing handoffs (payroll loop, early access, asset confirm, mappings) |
| tc.md | trim charter to DC handoffs (source mapping, eligibility, data audit) |
| qa.md | keep mapping approval, eligibility clearance, audit pack interface |
| doc-ops.md | keep class-add + P3-setup-ready handoffs only |

### processes/ (9) + onboarding/ (2)

| File | Verdict | New section | Note |
|---|---|---|---|
| day-of-wire-audit.md | KEEP | Checklists | tighten against real query library |
| eligibility-loading.md | KEEP | Data Loading | excellent |
| final-files-processing.md | KEEP | Data Loading | **best page in the set — anchor** |
| plan-conversion-handoffs.md | ADAPT | Dept Coordination | **spine of the section**; trim COM-only handoffs |
| plan-sponsor-website-user-setup.md | CUT | - | TC-owned, reduce to pointer |
| reversal-submission.md | KEEP | Troubleshooting | current post-03/06/26 flow |
| source-mapping-tc.md | CUT | - | fold DC step into source-mapping.md |
| tc-conversion-timeline.md | CUT | - | entirely TC-role |
| tik-transfer.md | KEEP | Conversion Ops | excellent |
| onboarding/com.md | CUT | - | non-DC role |
| onboarding/lm-dc.md | ADAPT | Knowledge Base | rebuild link list against new structure |

---

## Unmined material in wiki/sources/ (mine during step 4)

**lmdc-training-notebook.md — richest vein.** State Street account routing table by
Reinsurance Code (accounts 00457358/366/374/424/440, ABA 011000028); Cashiering
wire-pull times (7am/9am/1pm/3pm CST, cutoff 3pm CST → next day, notify by 3:45pm);
exact Source Mapping SQL; Informatica params (`mp_part_balance`, `$$Test_File=P/Y/N`,
NPER rounding, Day-of-Wire 11-step SQL inserts into CASE_REMIT / FIN_ACT_PEND /
FIN_ACT_ELEC / BILL_REMIT_DETAIL); MM-Enhanced plans need SQL to `CORP.transact_detail`
(ROC won't work); Financial Guide enablement checks + `mass_sub_` file; Payroll Data
Element Guide path. → feeds Reference, Troubleshooting, Payroll, Data Loading.
Some shared-drive paths possibly stale — verify.

**dc-brain-dump-002.md.** Payroll file naming `<case#>_<contract>_<affiliate>.xls`
(timestamp appended on receipt); send a random test file first to verify FTP;
auto-sweep only after 2–3 good runs; OnePayroll shows end-user-flavored errors;
three loan-failure scenarios (frozen/no re-amort, incomplete refinance,
detail-vs-source off-by-one-payment); auto-escalation does NOT continue at TA;
"min or max-minus-one" auto-enroll default-detection heuristic. → Payroll + Troubleshooting.

**extra-questions-001.md.** Verbatim navigation strings: P2 trans-ref path
(`CORP07/tdatest → 2001 → contract/affiliate # → option 4 → trans code 1006 →
proc code 3`); trans-ref format YYYYMMDD + 7–8 alphanumeric; eligibility P3 path
(Plan → dropdown → Outsourcing Summary → Eligibility → Enable); Assurance Code path
(Plan → General Plan → Assurance Codes); audit-pack location `root/Conversion/Contract`;
Prod Support turnaround 1–2 days, same-day urgent. → Reference.

**balances-census-loans-brain-dump.md.** Loan-setup click-path (Conversions dropdown →
Add Record Keeper → New Conversion; Conversion/Assign Date = effective − 3 months);
Loan Header must equal Loan Source totals exactly; test=Y→N toggle; HOLB "Upload and
Create" branch; cash-conv param cash-conv=Y + AE liquidation ref vs mapping cash-conv=N
(ref in fund-mapping file); one-share TIK escalation threshold; fund-split 1-in-25;
forfeiture stand-out dates (DOB 12/25/1955, DOH 12/25/1985). → Loan Setup + Balance Import pages.

**loading-basis-doc.md.** Basis as of 12/31 prior year; mid-year → load current+prior;
NO basis for 457 plans; cost basis only stock funds/NQ re-reg; Roth basis for all with
Roth balances (Roth started 2006); one takeover (T) row per plan; hardship suspension
via SQL; `TO_BASIS.sql` path unknown — query-library candidate. → Basis page.

**census-data-doc.md.** EDS data types used (Address Standard, Enrollments);
Validate-Only-first rule; DOH/DOR/DOT edge rules; `TO Census.sql` path unknown. → Census page.

**subpack-cccs.md.** "How to read the CCCS as a DC" checklist: plan types, 457(f)=IDP,
system effective date = plan effective − 1 month, no auto-increase NQDC/457,
PSD vs FTP + ACH vs Wire, asset strategies (Plan Level / Participant Directed / Hybrid),
takeover-loan method. → Case Lifecycle intake page.

**tc-stuff.md.** Mine only: payroll file automation setup (P3 remittance, EDS PSD
Availability, FTP mapping, INFRA routing), bonus-election pattern, common-remitter
handling. Leave charters/TC governance.

Low/no value to mine: dc-brain-dump-001 (fully reflected), com-main-checklist
(COM-scoped), tc-details-from-dan (TC-scoped).

---

## External source material (outside this repo)

- `C:\Dev\Joel's Workspaces\Work - Transamerica\FTP Stuf\Payroll\payroll-guide-v2.html`
  (+ redesign variants, + `FTP and OBF Knowledge Transfer - DC Payroll Guide.docx`) → Payroll section
- `C:\Dev\Joel's Workspaces\Work - Transamerica\FTP Stuf\balance import guide.html`
  (+ redesign) → Data Loading balance pages
- `C:\Dev\Joel's Workspaces\Work - Transamerica\FTP Stuf\informatica-quick-guide.html` → Informatica pages
- `C:\Dev\Joel's Workspaces\Work - Transamerica\FTP Stuf\Forms and Templates\` —
  PRK Questionnaire (DC Edition), TRS Payroll Questionnaire v2, FTP Setup Redesign v3 → Checklists/Forms
- `C:\Users\mabac\Downloads\joel_abach_knowledge_export.md` — review for source material

## Repo notes for the executing session

- Root `CLAUDE.md` is a router: content work = `garage/` workflow, design/render = `studio/`.
- Never edit `current/TA Wiki.html` in place — snapshot → working copy → verify → promote.
- Renderer: `fresh-rebuild/build-full-wiki-prototype.js`. Design system: `studio/DESIGN.md`.
- Use `git mv` for all moves; archive cuts, delete nothing.
- Update `wiki/index.md`, `wiki/overview.md`, and append to `wiki/log.md` after restructuring.
