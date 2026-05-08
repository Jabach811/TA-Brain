# Wiki Log
*Append-only. Most recent entries last.*
*Grep tip: `grep "^## \[" wiki/log.md | tail -10` → last 10 entries*

---

## [2026-04-14] ingest | Follow-up Q&A — Round 3 final clarifications
- Pages created: none
- Pages updated:
  - `concepts/dummy-participant` — TDA/CORP rule: case# starts with "T" = TDA, else CORP
  - `entities/p3` — same TDA/CORP rule added; open question closed
  - `entities/prod-support` — AWD confirmed = All Working Data; full name added
  - `concepts/transfer-in-kind` — re-reg owned by DC; DC creates form, coordinates with Matt + vendor, provides account info to vendor so they know where to send shares
  - `concepts/audit-pack` — storage confirmed: client folder; template is standard
  - `overview` — open questions reduced to 5 (CORP/TDA resolved, AWD resolved, re-reg ownership resolved)
- Notes: Workflows (WFs) exist in main DC folder but are still being tuned — needs documentation once finalized. This closes out all major round-1 open questions.

## [2026-04-14] ingest | Follow-up Q&A — Round 2 clarifications
- Pages created:
  - `entities/stacey-fortune` — cross-dept manager; AE liquidation contact
  - `entities/nick-lister` — DC's direct manager; into AI; recently took over
- Pages updated:
  - `entities/prod-support` — AWD ticket flow documented (Create Work → case# → ticket type → comments → send)
  - `concepts/fund-management-calendar` — confirmed shared drive; locking problem documented; "put it on early" rule solidified
  - `entities/eds` — full name confirmed: Electronic Data System; accessed from P3 menu bar
  - `concepts/audit-pack` — confirmed standard template (always the same)
  - `concepts/transfer-in-kind` — DC fills out re-reg form and sends to Matt O'Connell (DC owns this step)
  - `concepts/liquidation-day` — wire mismatch process added (contact vendor, don't process until in good order)
  - `concepts/subpack` — missing subpack resolved: get info from COM/PRD/OB, not a blocker
  - `concepts/dummy-participant` — CORP and TDA confirmed as region names (not "Cork")
  - `entities/p3` — ROC query regions updated: TDA and CORP (not Cork)
  - `concepts/final-files-processing` — AE liquidation: email Stacey Fortune or Nick Lister
  - `index`, `overview` — updated
- Notes: Remaining significant unknowns: exact shared drive path for FMC; TDA vs CORP determination method; audit pack template location; AWD acronym (low priority).

## [2026-04-14] ingest | Follow-up Q&A — Answers to 10 open questions
- Pages created:
  - `entities/p2` — P2 is a separate back-end region for ref numbers; changes reflect in P3
  - `entities/prod-support` — team making direct DB corrections via AWD tickets
  - `concepts/audit-pack` — post-conversion summary doc; ref numbers, amounts, prior vendor data
  - `concepts/fund-management-calendar` — daily trade log; cutoff 1 PM Pacific / 4 PM Eastern
- Pages updated:
  - `entities/p3` — added ROC tool navigation detail ("ROC No Reversal" query; TDA vs Cork)
  - `entities/nbi` — NBI is a continuous universal checklist per plan, with role-based sections
  - `entities/internal-teams` — TC = Transition Consultant; added Prod Support section
  - `concepts/dummy-participant` — SSN corrected to 999-00-0000; ROC reversal steps documented
  - `concepts/transfer-in-kind` — re-registration form fields documented
  - `concepts/liquidation-day` — 1 PM Pacific cutoff added; Fund Management Calendar added
  - `overview` — resolved questions marked; new open questions identified
  - `index` — new pages added
- Notes: AQT confirmed as SQL query program (read-only). Fund Management Calendar is a major previously-undocumented step — needs location/access documented. AWD ticket system full name unknown.

## [2026-04-14] ingest | DC Brain Dump 001 — Full Job Workflow
- Source: voice transcript (pasted inline, no raw file)
- Pages created:
  - `sources/dc-brain-dump-001`
  - `entities/ellen-miller`
  - `entities/matt-oconnell`
  - `entities/internal-teams`
  - `entities/p3`
  - `entities/eds`
  - `entities/informatica`
  - `entities/nbi`
  - `concepts/dc-onboarding-workflow`
  - `concepts/conversion-types`
  - `concepts/toa`
  - `concepts/base-file`
  - `concepts/payroll-template`
  - `concepts/fund-mapping`
  - `concepts/source-mapping`
  - `concepts/transfer-in-kind`
  - `concepts/dummy-participant`
  - `concepts/liquidation-day`
  - `concepts/final-files-processing`
  - `concepts/eligibility-and-deferrals`
  - `concepts/prd`
  - `concepts/onboarding-package`
  - `concepts/subpack`
  - `concepts/plan-classes`
  - `concepts/wire-instructions`
  - `concepts/ftp-connection`
  - `concepts/prior-record-keeper`
- Pages updated: `overview`, `index`
- Total pages created: 27 (+ overview + index = 29 files)
- Notes: Comprehensive first ingest. ~10 open-question clusters identified across all pages. Subpack completion gap flagged as known process issue. P2 vs. P3 distinction needs clarification. AQT query process needs documentation. Audit pack contents unknown.

## [2026-04-14] edit | Eligibility vs Deferrals — split into separate pages + new SME entity
- Pages created:
  - `concepts/eligibility` — full eligibility page: data source priority, P3 rule engine (class/service/date logic), "ALL" class, workflow with P3 nav, auto-enrollment interaction, Scott Verba as SME
  - `concepts/deferrals` — full deferrals page: data source priority, auto-enrollment participant identification, escalation logic, ADP limitation (does not reliably provide auto-enroll dates), mitigation workflow, error recovery table
  - `entities/scott-verba` — eligibility SME; primary contact for complex eligibility questions
- Pages updated:
  - `concepts/eligibility-and-deferrals` — converted from a combined concept page to a hub/overview page; preserves all existing links; explains the relationship, the sequence, and key differences between the two processes
- Key new content not previously in wiki:
  - Deferrals are more complex than eligibility (data-driven, exception-heavy)
  - Auto-enrollment start date (trigger date) must be captured separately from deferral rate
  - Escalation logic (+1% annually up to cap) depends on start date
  - ADP does not reliably provide auto-enroll dates → must go to client → if unavailable, assume NOT in default + notify client
  - Eligibility = rules-driven/structured; Deferrals = data-driven/exception-heavy
  - Core framing: deferrals fill system state; eligibility triggers system actions
  - Scott Verba = primary eligibility SME (new entity)
- Notes: All existing links to `[[eligibility-and-deferrals]]` continue to work. New deep content is in `[[eligibility]]` and `[[deferrals]]`. ADP limitation is a significant operational insight.

## [2026-04-14] ingest | Extra Questions 001 — Round 4 Q&A (all open questions resolved)
- Source: `raw/extra-questions-001.md` (converted from `extra questions.txt`)
- Pages created: `sources/extra-questions-001`
- Pages updated (27 total):
  - `concepts/audit-pack` — location, format, QA turnaround, discrepancy process, no format variants
  - `concepts/base-file` — Excel/standard template, "sources" clarification, client owns data quality, loading timing
  - `concepts/dummy-participant` — DC adds it, one per plan, mapping only, nightmare if forgotten
  - `concepts/eligibility-and-deferrals` — full P3 nav path, email template confirmed, same-day go-ahead, reversal possible but painful, eligibility date sources, impossibility of pre-active elig
  - `concepts/final-files-processing` — CIT balance file structure, one layout per data type, client decides vendor vs own data
  - `concepts/ftp-connection` — email setup, vendor sees simple upload page, plan-specific folders, AM/payroll support monitor, client notified on delay
  - `concepts/fund-management-calendar` — cashiering/trading dept owns it, email backup process, TIK funds excluded
  - `concepts/fund-mapping` — 6 TA fields named, plan-wide scope, not loaded to system, amendment process
  - `concepts/liquidation-day` — full P2 nav for ref numbers, ref number format, Cashiering notification is casual
  - `concepts/onboarding-package` — PEP only, TA document, COM authors it, no extra DC considerations for PEP
  - `concepts/payroll-template` — standard template trimmed, all formats/Excel preferred, max ~10 sources, AMs handle post-conversion additions
  - `concepts/plan-classes` — traditional vs special examples, DC update-only, Doc Ops via email, P3 nav, eligibility interaction
  - `concepts/prd` — COM authors it, standard template, signed early, COM+Doc Ops fix inconsistencies, amendments rare
  - `concepts/prior-record-keeper` — known from assignment, questionnaire in hello email, persistence for unresponsive, shared relationship, workflows exist
  - `concepts/source-mapping` — AQT is standalone app, ~10 sources typical, map best you can, not loaded to system, both balance and contribution
  - `concepts/subpack` — standard template, complete at start, client knows but primarily internal
  - `concepts/toa` — re-reg form is Excel/simple, COM authors it, signed early, TA-internal fields named
  - `concepts/transfer-in-kind` — re-reg form in front folder, shared spreadsheet communication, DC investigates mismatches, TIK+mapping can coexist, tracker spreadsheet documented
  - `concepts/wire-instructions` — standard template, Assurance Code P3 nav, check by trying, transfer process for wrong account
  - `entities/eds` — all formats, many layouts per plan confirmed
  - `entities/ellen-miller` — dept unknown, likely has team, all plans
  - `entities/informatica` — standalone app, CONV file fields exact, CIT vs CONV structure, test mode TBD
  - `entities/matt-oconnell` — shared spreadsheet, DC investigates mismatches, TIK tracker spreadsheet documented
  - `entities/nbi` — full name: New Business Intelligence, web-based, all plans visible, standard checklist
  - `entities/p2` — separate URL, all DCs, ref number format documented
  - `entities/p3` — eligibility nav path added, no open questions remaining
  - `entities/prod-support` — 1-2 day standard, same-day urgent; duplicate open questions removed
  - `entities/stacey-fortune` — Large Market dept, general knowledge resource, title unknown
  - `overview` — open questions updated; resolved items listed
- Notes: Only 5 items remain open: FMC shared drive path, prior RK-specific workflows (exist, not yet documented), DC query library (to be documented), Informatica test mode (DC to confirm), and DC folder WFs (still being tuned). This source closes all Round 1–3 open questions.

## [2026-04-14] edit | Schema expansion — mission, new folders, new page types, new operations
- CLAUDE.md updated: added Mission section; expanded directory structure (roles/, departments/, processes/, onboarding/, glossary/); added Role/Department/Process/Onboarding/Glossary page templates; added ONBOARD and MAP operations; updated index format, log format, naming conventions, style rules, and session start protocol
- New folders created: `wiki/roles/`, `wiki/departments/`, `wiki/processes/`, `wiki/onboarding/`, `wiki/glossary/`
- Pages created:
  - `roles/lm-dc` — full role reference page built from existing wiki content
  - `roles/com` — stub; pending COM brain dump
  - `roles/qa` — stub; pending QA brain dump
  - `roles/tc` — stub; pending TC brain dump
  - `roles/doc-ops` — stub; pending Doc Ops brain dump
  - `processes/plan-conversion-handoffs` — cross-team handoff map for plan conversions
  - `onboarding/lm-dc` — ordered 22-page reading list for new DCs
- Pages updated: `index` — restructured to include new sections
- Notes: TA Brain mission now explicit — onboarding accelerator and institutional knowledge base, lateral not hierarchical. Wiki is ready to receive brain dumps from COM, QA, TC, and other roles. Each new brain dump will populate the corresponding stub and expand the processes/ and departments/ sections.

## [2026-04-14] lint | Wiki health check — all issues resolved
- Pages created (7):
  - `entities/cashiering` — wire receipt team; day-of liquidation confirmation loop
  - `entities/ftp-team` — FTP account setup; key contact Eric Leyten; ~1–2 week setup time
  - `entities/payroll-support` — OnePayroll Team; production-level payroll test validation
  - `entities/eric-leyten` — FTP Team key contact; final setup confirmation
  - `entities/aqt` — standalone SQL query app; read-only; source IDs + isolating queries
  - `concepts/advanced-employer` — temporary cash holding account in P3; cash conversions only
  - `concepts/conv-file` — Informatica Day of Wire input file; one row per fund; cannot be tested
- Pages updated (12):
  - `roles/lm-dc` — fixed broken [[cashiering]], [[ftp-team]], [[payroll-support]] links (pages now exist); closed 2 stale open questions (audit pack location, re-reg form location); added [[plan-conversion-handoffs]] and [[aqt]] to See Also and systems table
  - `concepts/onboarding-package` — fixed contradiction: clarified PRD and onboarding package are mutually exclusive (PEP = OB, all others = PRD)
  - `concepts/prd` — matching fix; removed ambiguous "some plans may have both" language
  - `concepts/dc-onboarding-workflow` — corrected dummy participant SSN from 999-00-00 to 999-00-0000
  - `entities/informatica` — corrected dummy participant SSN from 999-00-00 to 999-00-0000
  - `entities/scott-vrba` — fixed frontmatter title from "Scott Verba" to "Scott Vrba"
  - `concepts/source-mapping` — added [[aqt]] as a proper wiki link
  - `onboarding/lm-dc` — expanded from 22 to 27 items; added [[plan-conversion-handoffs]], [[p2]], [[subpack]], [[fund-management-calendar]], [[conv-file]]; added Scott Vrba and Eric Leyten to Key People
  - `index` — fixed [[scott-vrba]] → [[entities/scott-vrba]]; added all 7 new pages; corrected page count to 51; updated eligibility summary to "Scott Vrba"
- Issues resolved: broken links (3), contradiction (1), stale open questions (2), SSN inconsistency (1), name inconsistency (1), index error (1), orphan page (1), missing pages (7), onboarding guide gaps (5+)

## [2026-04-14] edit | Name fix + three new entity pages (Jen Curtin, Earl Sanford, Dave Shloat)
- Pages created:
  - `entities/jen-curtin` — Head of the FTP Team; internal payroll integration authority
  - `entities/earl-sanford` — Lead Data Consultant; primary training resource for new DCs; 25+ year veteran
  - `entities/dave-shloat` — Large Market data guru; Alteryx and Informatica authority
- Pages updated:
  - `entities/eric-leyten` — corrected spelling: Leyten → Leytem; added [[jen-curtin]] to See Also; closed "Eric's full title" open question (no longer needed given Jen Curtin context)
  - `entities/ftp-team` — corrected Leyten → Leytem throughout; added Jen Curtin as head in Key Contacts section; added [[jen-curtin]] and [[eric-leytem]] to See Also
  - `index` — corrected spelling; updated FTP team summary; added three new entity rows; updated page count to 54
- Notes: Eric Leytem spelling corrected everywhere. Jen Curtin established as FTP Team head and internal payroll integration SME. Earl Sanford and Dave Shloat added as key Large Market team resources.

## [2026-04-14] ingest | COM Main Checklist — Full COM Workflow (18 phases)
- Source: `COM Main Checklist.html` (web-based checklist app in TA Brain root)
- Pages created (17):
  - `sources/com-main-checklist`
  - `concepts/nsa` — New Sale Announcement; COM workflow trigger
  - `concepts/project-plan-com` — COM's master conversion tracker; PEP vs non-PEP formats
  - `concepts/prior-carrier-letter` — formal prior RK notification letter
  - `concepts/blackout-notice` — legally required participant notice; time-sensitive
  - `concepts/vef` — Vendor Expense Form; advisor → client → L&C routing
  - `concepts/contribution-monitoring-form` — TFS payroll form; TC AWD flip dependency
  - `concepts/rdd-form` — TC-originated payroll form; COM routes to client and back to TC
  - `concepts/early-access` — pre-go-live participant window; COM owns coordination chain
  - `concepts/csr` — Conversion Summary Report from Quality Consultant; forwarded to client at go-live
  - `entities/docusign` — e-signature platform; used for OBP, plan documents, agreements
  - `entities/wx` — Plan Sponsor Site; WX V2 includes payroll functionality
  - `glossary/nsa` — NSA acronym page
  - `glossary/csr` — CSR acronym page
  - `glossary/vef` — VEF acronym page
  - `onboarding/com` — ordered 25-item reading list for new COMs
- Pages updated (7):
  - `roles/com` — major rewrite from stub to full 18-phase role reference; systems table, who they work with, key handoffs
  - `processes/plan-conversion-handoffs` — added dual trigger (NSA + NBI), 11 new COM-perspective handoffs, 6 new failure modes
  - `concepts/subpack` — ownership now documented: COM creates, distributes; TC reviews and maintains; failure mode reframed
  - `overview` — expanded domain to include COM; updated thesis, key people, key systems, open questions (6 new)
  - `index` — full rebuild; +22 new pages; page count updated to 76
- Key new insights:
  - NSA is the COM's trigger (equivalent to NBI assignment for DC) — not previously documented
  - COM creates the subpack; TC takes it over after internal call review — resolves "hit or miss" ambiguity from DC brain dump
  - Participant notices (blackout, QDIA, etc.) are legally time-sensitive and route through Ellen Miller for mailing
  - Contribution monitoring requires a TC AWD flip — cross-team dependency with no fallback
  - Early access: COM owns routing; TC activates the day before; client file must be loaded first
  - Go-live is COM-orchestrated (6+ tasks including NBI audit checklist and Ellen Miller notification)
- Open questions flagged: PEA acronym, AAA acronym, Samantha C. identity, communication consultant (internal vs. external), SF = Salesforce?, QC vs. QA distinction
- Notes: COM role is now fully documented from checklist perspective. Brain dump from a COM would add qualitative texture (pain points, judgment calls, relationship dynamics) that the checklist cannot provide.

## [2026-04-15] ingest | LMDC Training Notebook — DC Procedures through April 2026
- Source: `LMDC.mht` (DC Team Training OneNote notebook; MIME/HTML quoted-printable; decoded via Python quopri; ~11.3M chars; date range Feb 2015–Apr 6, 2026)
- Pages created (11):
  - `sources/lmdc-training-notebook` — source summary page
  - `concepts/reversal-process` — new reversal process as of Mar 6, 2026; Reversal Form to slasrever@transamerica.com → AWD ticket; Plan Correction Checklist retired
  - `concepts/ltpt-eligibility` — LTPT (Long-Term Part-Time); Secure Act 2.0; 500 hrs × 2 consecutive years; EDS codes 5 and 6; effective Jan 1, 2025
  - `concepts/common-remitter-plans` — plans coded as common remitter in P3; "Verify Batch After Funding" replaces Pre-Process
  - `concepts/payroll-handoff-at-go-live` — FILESPECRQ AWD ticket to Fiduciary Services when payroll not complete at go-live; effective Feb 26, 2026
  - `concepts/booking-assets` — two booking types: 4=Remit (wire from State Street) vs. 3=Rebook (AEDA disbursement + AWD ticket)
  - `glossary/awd` — AWD = Automatic Work Distribution; internal work-ticketing system
  - `glossary/ltpt` — LTPT = Long-Term Part-Time; Secure Act 2.0 eligibility category
  - `glossary/ssbt` — SSBT = State Street Bank & Trust; external wire custodian; 4 PM EST cut-off
  - `glossary/filespecrq` — FILESPECRQ = AWD ticket type for payroll handoff at go-live
  - `glossary/tm` — TM = Transition Manager; legacy name for COM; all references updated to COM
- Pages updated (10):
  - `concepts/fund-management-calendar` — complete rewrite per Feb 27, 2026 procedure; email to 4 distribution addresses; SSBT 4 PM EST cut-off; Vanguard 2 PM deadline; FMC Date Change Notification email documented
  - `concepts/liquidation-day` — cashiering email added; wire pull schedule (7am/9am/1pm/3pm CST); 3 PM CST cutoff; 3:45 PM notification deadline; FMC SSBT language updated; common-remitter-plans link added
  - `entities/cashiering` — contact email added; wire pull schedule; 3:45 PM notification timing; 3 PM CST cutoff; booking type (4=Remit); booking-assets reference
  - `concepts/eligibility` — LTPT section added (500 hrs × 2 years, EDS codes 5/6, employer contribution limitation, hours tracking for excluded classes)
  - `entities/informatica` — major technical expansion: Day of Wire parameter file settings, 11-step SQL audit, tables affected (CASE_REMIT/FIN_ACT_PEND/FIN_ACT_ELEC/BILL_REMIT_DETAIL), TEST_FILE=N for live, Loan Module prerequisites + NPER rounding + error causes, Allocation Module checks, source mapping SQL, connection error fix, Balance module parameters
  - `roles/lm-dc` — "Updated Procedures (2025–2026)" section added; reversal note in What Other Teams Should Know; all TM references resolved (already using COM)
  - `processes/plan-conversion-handoffs` — Step 21 added: Payroll Handoff at Go-Live (FILESPECRQ); failure mode row added; See Also updated
  - `overview` — sources incremented to 4; resolved questions documented (FMC, test mode, reversal, booking assets, LTPT, common remitter, payroll handoff, TM→COM); open questions updated; Rich Lippoth added as new open question
  - `index` — all new pages added; processes updated to 21 handoffs; page count updated to 87; sources updated to 4
- Contradictions resolved before writing (10):
  1. TM vs COM → COM is current name; TM retired; all wiki pages already used COM correctly
  2. Reversal process → old Plan Correction Checklist retired; new Reversal Form process documented
  3. Informatica detail → .mht file's technical detail added to entities/informatica
  4. Booking assets → new procedure documented; 4=Remit vs. 3=Rebook distinction added
  5. Wire receipt → cashiering detail updated (email, schedule, cutoffs)
  6. TM references → confirmed all COM; TM glossary entry added as legacy reference only
  7. LTPT eligibility → new concept page created
  8. SharePoint folders → disregarded (org has moved away from this system)
  9. MM reviewer role → disregarded (MM department removed from company)
  10. Common Remitter Plans → P3 process update documented
- Notes: Source dates ranged 2015–2026; only most recent entry per topic used. "DO NOT USE" sections (old FMC page, outdated Quick Links) disregarded. State Street reinsurance codes documented in source page only (no wiki page needed — operational reference). Rich Lippoth (Vanguard approval contact) identified as a new open question.

## [2026-04-16] edit | Open questions resolution — acronyms, people, stub upgrades
- Pages created (4):
  - `entities/rich-lippoth` — go-to for incoming shares and regular trades; Vanguard FMC deadline approvals
  - `glossary/faa` — FAA = Fund Asset Allocation ✓ confirmed
  - `glossary/pea` — PEA = Plan Enrollment Agreement ✓ confirmed
  - `glossary/aaa` — AAA = Adoption Agreement Addendum ✓ confirmed
- Pages updated (17):
  - `roles/qa` — added Paul and Danny as QA team members; updated focus to data audit and mapping validation; added audit-pack to See Also
  - `roles/com` — Communication Consultant updated to [[doc-ops]]; QC updated to Paul/Danny; PEA and AAA open questions closed; SF confirmed as Salesforce
  - `sources/com-main-checklist` — PEA, AAA, SF, Communication Consultant all marked resolved
  - `concepts/informatica-training-manual` — restructured to point to [[informatica]] hub with summary of what's documented there
  - `concepts/informatica-allocation-module` — restructured with hub link + key points from [[informatica]]
  - `concepts/informatica-balance-module` — restructured with hub link + key points including rich-lippoth FMC trigger
  - `concepts/informatica-loan-module` — restructured with hub link + full error causes from [[informatica]]
  - `concepts/informatica-troubleshooting-guide` — restructured with all known errors from [[informatica]]
  - `concepts/informatica-basis-module` — restructured with hub link; noted source doc is empty
  - `concepts/loading-basis-eds` — restructured with EDS hub link + context
  - `concepts/loading-ytd-contributions-eds` — restructured with EDS hub link + final files context
  - `concepts/eds-load-beneficiary-requirements` — restructured with EDS hub link; flagged 2011 date as potential legacy issue
  - `concepts/data-discovery-document` — fleshed out with definition, scope table, and process description
  - `concepts/faa-dc-data-requirements` — fleshed out with FAA definition and expected data requirements table
  - `concepts/hours-procedure` — fleshed out with LTPT context, EDS loading framework, and eligibility connection
  - `overview` — Round 6 resolved questions documented; open question list reduced to 6 items
  - `index` — added rich-lippoth entity, faa/pea/aaa glossary entries; page count updated to 107
- Resolved open questions: CCCS, FAA, PEA, AAA, SF, Communication Consultant, QC identity (Paul & Danny), Rich Lippoth role
- Remaining open: Samantha C. last name, Paul/Danny last names, prior RK workflows, WF templates, query library

## [2026-04-16] ingest | New MDs batch — 14 source files from raw/new mds/
- Source files: `raw/new mds/` (14 .txt files — 2 with content, 12 stubs)
- Pages created (15):
  - `concepts/loading-eligibility-eds` — full content; EDS eligibility loading procedure: layout, data elements, processing types, Run Eligibility job, edits
  - `sources/subpack-cccs` — full source summary; New Plan Submission Package CCCS template
  - `concepts/cccs-submission-package` — full concept page; CCCS configuration intake form; plan types, trustee, payroll, conversion strategy
  - `concepts/informatica-training-manual` — stub; source exists, content pending
  - `concepts/informatica-allocation-module` — stub; source exists, content pending
  - `concepts/informatica-balance-module` — stub; source exists, content pending
  - `concepts/informatica-loan-module` — stub; source exists, content pending
  - `concepts/informatica-troubleshooting-guide` — stub; source exists, content pending
  - `concepts/informatica-basis-module` — stub; source exists, content pending
  - `concepts/loading-basis-eds` — stub; source dated 03-26-2026, content pending
  - `concepts/loading-ytd-contributions-eds` — stub; source exists, content pending
  - `concepts/eds-load-beneficiary-requirements` — stub; source dated 06-17-2011, content pending
  - `concepts/data-discovery-document` — stub; source exists, content pending
  - `concepts/faa-dc-data-requirements` — stub; source exists, content pending (FAA acronym unconfirmed)
  - `concepts/hours-procedure` — stub; source exists, content pending
- Pages updated: `index` — sources count 4→5; page count 87→102; four new concept subsections added
- Notes: 12 of 14 source files are empty stubs (title only). Stub wiki pages created as placeholders so the index is complete and cross-links resolve. Fill in content as source documents are populated. CCCS acronym unconfirmed — likely "Client Conversion Configuration Sheet." FAA acronym also unconfirmed.

## [2026-04-14] edit | Wiki initialized
- Schema written to `CLAUDE.md`
- Folder structure created: `raw/`, `raw/assets/`, `wiki/entities/`, `wiki/concepts/`, `wiki/sources/`, `wiki/analyses/`
- `wiki/index.md` created (empty)
- `wiki/log.md` created (this file)
- `wiki/overview.md` pending — will be written after first ingest
- Notes: Ready for first source ingest.
