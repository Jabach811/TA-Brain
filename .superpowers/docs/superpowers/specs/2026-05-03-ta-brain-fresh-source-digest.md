# TA Brain - Fresh Source Digest

> [!warning] Rejected direction - do not implement
> This digest produced the wrong product direction. The lifecycle-first "conversion operating system" structure is permanently rejected for the rebuild.
>
> The correct direction is now documented in `docs/superpowers/specs/2026-05-02-ta-brain-rebuild-design.md`: TA Brain should be a Wikipedia-style internal knowledge site, not a dashboard, lifecycle map, workflow command center, or conversion spine product.
>
> Keep this file only as historical context for source observations. Do not use Sections 2-17 as implementation guidance.

*Date: 2026-05-03*
*Status: Rejected as implementation guidance*

---

## 1. What I Read

This digest starts from the ingested material, not from the current folder structure.

Primary ingested source summaries:

- `wiki/sources/dc-brain-dump-001.md`
- `wiki/sources/extra-questions-001.md`
- `wiki/sources/com-main-checklist.md`
- `wiki/sources/lmdc-training-notebook.md`
- `wiki/sources/subpack-cccs.md`
- `wiki/sources/census-data-doc.md`
- `wiki/sources/loading-basis-doc.md`

Raw source material checked:

- `raw/extra-questions-001.md`
- `raw/new mds/Loading_Eligibility_through_EDS.md.txt`
- `raw/new mds/Sub_Pack_Raw_CCCS.txt`
- The remaining `raw/new mds/` files, most of which are title-only stubs
- `raw/wiki.html`, which appears to be a built/exported wiki artifact rather than a new source document

Current wiki synthesis checked:

- `wiki/overview.md`
- `wiki/index.md`
- Key role/process pages including DC, COM, plan handoffs, final files, and DC onboarding workflow

---

## 2. Core Finding

TA Brain is not mainly a role directory, department directory, or glossary.

It is a **plan conversion operating system**.

Almost every useful fact in the ingested data answers one of these questions:

- Where are we in the conversion?
- Who owns this step?
- What document, file, or system is involved?
- What has to happen before this?
- What can go wrong?
- Who needs to be told?
- What changed recently?

The current wiki structure hides that because it organizes around storage categories: roles, entities, concepts, sources. The content itself organizes around **sequence, handoff, and risk**.

The fresh app should be built around the conversion lifecycle first. Teams, documents, systems, people, and glossary terms should support that lifecycle rather than compete with it.

---

## 3. The Natural Product Shape

The best version of TA Brain should answer four reader jobs:

1. **Run the conversion**
   - "What do I do next?"
   - "What has to happen before liquidation?"
   - "What changes for cash vs. mapping vs. TIK?"

2. **Understand a team**
   - "What does COM own?"
   - "Where does QA come in?"
   - "When do I need Doc Ops, TC, FTP, Cashiering, or Prod Support?"

3. **Look up an artifact**
   - "What is the TOA?"
   - "Who creates the Subpack?"
   - "Where does the CSR come from?"
   - "What is the CONV file?"

4. **Troubleshoot a risk**
   - "What if payroll testing is not done by go-live?"
   - "What if the dummy participant was missed?"
   - "What if the wire misses the FMC cutoff?"
   - "What if eligibility runs before deferrals?"

This suggests a product with a lifecycle spine, not a folder-tree-first experience.

---

## 4. Fresh App IA

Recommended main navigation:

| Bucket | Purpose |
|---|---|
| **Home** | Orientation, what TA Brain is, latest updates, fastest starting points |
| **Conversion Lifecycle** | The main spine: assignment through final posting |
| **Teams & Handoffs** | Team pages and handoff maps |
| **Systems** | P3, P2, EDS, Informatica, NBI, AQT, DocuSign, WX |
| **Documents & Files** | PRD, OBP, Subpack, CCCS, TOA, base file, payroll template, CONV, CSR, VEF, RDD, notices |
| **Procedures** | Step-by-step how-tos, especially EDS, Informatica, payroll, reversal, booking, FMC |
| **Exceptions & Gotchas** | High-risk cases, recent process changes, failure modes |
| **People / SMEs** | Only people who are operationally important handoff points or knowledge holders |
| **Glossary** | Short definitions and acronym expansion |

This can still compile from markdown. The important change is that the app presents the knowledge by user task instead of repository folder.

---

## 5. The Conversion Lifecycle Spine

The app should have one canonical lifecycle page or section. Every other page should connect back to this.

### Phase 0 - Sale / Assignment Trigger

Primary facts:

- COM workflow starts from the NSA.
- DC workflow starts from NBI assignment.
- Ellen Miller is a central routing contact around assignment, notice routing, SF setup, and go-live notification.
- COM and DC start in parallel, not one after the other.

Key pages:

- NSA
- NBI
- COM
- DC
- Ellen Miller
- Plan Conversion Handoffs

### Phase 1 - Discovery / Plan Setup

Primary facts:

- COM creates project plan and manages kickoff.
- DC reviews PRD or onboarding package.
- Subpack/CCCS captures plan configuration, services, conversion strategy, payroll setup, contacts, loan/withdrawal options, and plan details.
- P3 may be set up early or checked later.
- Plan type and conversion type drive the rest of the work.

Key pages:

- PRD
- Onboarding Package
- Subpack
- CCCS Submission Package
- P3
- Conversion Types
- Plan Classes
- Project Plan

### Phase 2 - Data Setup

Primary facts:

- DC builds client-specific base file and payroll template.
- Census data seeds the system.
- EDS layouts should be built early.
- Client data quality is the client's responsibility to fix; DC gives instructions.
- Census loading uses Address Standard and Enrollments data types.

Key pages:

- Base File
- Census Data
- Payroll Template
- Data Discovery Document
- EDS
- Loading Eligibility through EDS
- Loading Basis through EDS

### Phase 3 - External Partner Setup

Primary facts:

- Prior record keeper contact is established early.
- DC sends prior RK questionnaire and wire instructions.
- Payroll vendor setup runs in parallel.
- FTP setup should be requested early because the FTP team has a large caseload.
- Each plan has its own FTP destination folder.

Key pages:

- Prior Record Keeper
- Wire Instructions
- FTP Connection
- FTP Team
- Payroll Support / OnePayroll
- SSBT

### Phase 4 - Mapping and Transfer Design

Primary facts:

- TOA is the signed asset-transfer authority and fund map source.
- Fund mapping can begin as soon as TOA is signed.
- Source mapping requires test files because it depends on actual sources with money.
- Mapping documents are not "loaded" into the system; they guide workflows.
- TIK/re-registration depends on TOA column T and Matt O'Connell's team.

Key pages:

- TOA
- Fund Mapping
- Source Mapping
- Transfer In Kind
- TIK Transfer
- Matt O'Connell
- CONV File

### Phase 5 - Pre-Liquidation

Primary facts:

- Dummy participant is required for mapping conversions.
- Dummy participant is one per plan and created by the DC.
- Dummy participant is not needed for TIK.
- CONV file skeleton should be ready before liquidation day.
- TIK form timing matters: too early is bad, too late blocks liquidation.
- FMC estimates must be entered at least five business days before TOA/liquidation timing where applicable.

Key pages:

- Dummy Participant
- CONV File
- Fund Management Calendar
- TIK Transfer
- Wire Instructions
- Cashiering

### Phase 6 - Liquidation Day

Primary facts:

- This is the highest-risk day.
- DC waits for wire receipt and transfer reference number from Cashiering.
- Cash conversions, mapping conversions, and TIK conversions diverge.
- Day of Wire in Informatica cannot be tested end-to-end.
- Wrong processing mode creates major downstream cleanup.

Key pages:

- Liquidation Day
- Cashiering
- P2
- P3
- Informatica
- Advanced Employer
- Booking Assets
- Common Remitter Plans

### Phase 7 - Final Files and Posting

Primary facts:

- Final files are authoritative after liquidation.
- Balance posting comes first.
- Deferrals must be posted before eligibility.
- Eligibility requires notification to QA, TC, and COM before enabling.
- YTD contributions, compensation, hours, basis, and other data load through EDS/procedures.
- Audit pack and NBI updates close the data side.

Key pages:

- Final Files Processing
- Balance Import
- Deferrals
- Eligibility
- Loading Eligibility through EDS
- Loading Basis through EDS
- Loading YTD Contributions through EDS
- Hours Procedure
- Audit Pack
- QA
- TC

### Phase 8 - Go-Live and After

Primary facts:

- COM orchestrates go-live communication and close-out.
- COM completes NBI audit checklist, survey spreadsheet, go-live emails, and Ellen notification.
- CSR comes from Quality Consultant and goes to COM, then client.
- If payroll testing is incomplete, DC submits FILESPECRQ and Fiduciary Services takes over.

Key pages:

- COM
- CSR
- Payroll Handoff at Go-Live
- FILESPECRQ
- NBI
- Ellen Miller
- Quality

---

## 6. Teams From the Source Data

The data supports these team pages:

### Core conversion teams

- **Data Consultants / DC**
  - Own data setup, mapping, EDS layouts, Day of Wire, final files, posting, audit pack, and data-side NBI updates.

- **Communications / COM**
  - Own project management, client communication, document routing, notices, payroll coordination loops, early access coordination, go-live messaging, and close-out.

- **Quality / QA**
  - Reviews mappings, clears eligibility, audits imported data, provides CSR through Quality Consultant.

- **Transition Consultants / TC**
  - Own systematic/back-end setup, subpack maintenance after COM handoff, fee/QDIA/enrollment materials, RDD loop, WX setup, early access activation.

- **Doc Ops**
  - Owns plan documents and P3 setup details; adds special plan classes that DC cannot add.

### Operational partner teams

- **Cashiering / Trading**
  - Confirms incoming wires, provides ref numbers, monitors FMC/trade expectations.

- **FTP Team**
  - Sets up plan-specific FTP upload destinations; Jen Curtin and Eric Leytem are key contacts.

- **OnePayroll / Payroll Support**
  - Validates production-level payroll tests before payroll goes live.

- **Prod Support**
  - Makes database corrections through AWD tickets when standard tools cannot fix something.

- **Fiduciary Services**
  - Takes over payroll testing when payroll is incomplete at go-live under the new FILESPECRQ process.

### People who deserve SME/profile pages

Use people pages for operationally meaningful humans, not everyone mentioned:

- Ellen Miller - routing and assignment node
- Matt O'Connell - TIK / share-transfer gate
- Jen Curtin - FTP lead / payroll integration authority
- Eric Leytem - FTP setup confirmation gate
- Dave Shloat - Informatica / Alteryx / data-system expert
- Earl Sanford - DC training resource
- Nick Lister - DC manager and escalation route
- Stacey Fortune - cross-department Large Market resource / AE liquidation approval path
- Rich Lippoth - incoming shares and Vanguard FMC/trade timing
- Scott Vrba - keep only if eligibility SME knowledge cannot be absorbed into eligibility/QA pages

---

## 7. Systems From the Source Data

The data supports a clean Systems section:

| System | Why it matters |
|---|---|
| **NBI** | Assignment tracking, project plan storage, audit checklist, milestone/status updates |
| **P3** | Main plan administration platform for setup, processing, eligibility, classes, balances, and queries |
| **P2** | Back-end region for transfer reference numbers; likely should be a subsection of P3 rather than equal top-level system |
| **EDS** | File validation and loading system for census, eligibility, basis, YTD, payroll, and other data types |
| **Informatica** | Conversion workflow engine: Day of Wire, Balance, Loan, Allocation, Basis modules |
| **AQT** | Read-only SQL query tool for source IDs and verification queries |
| **DocuSign** | COM document signature routing |
| **WX** | Plan Sponsor Site and payroll functionality; set up by TC and verified by COM |
| **AWD** | Ticket/work distribution mechanism for reversals, Prod Support corrections, FILESPECRQ, and some payroll/TC settings |
| **Salesforce / SF** | Mentioned for plan setup confirmation and VEF L&C tickets, but not yet documented enough |
| **FILESERVE / CIT / DCGLIB** | Mentioned as storage locations, but not yet documented enough |

---

## 8. Documents and Files From the Source Data

This should be a first-class app section. The data constantly refers to documents and files as operational objects.

### Plan setup / design

- PRD
- Onboarding Package
- Subpack
- CCCS Submission Package
- Project Plan
- Data Discovery Document

### Asset transfer / mapping

- TOA
- Fund Mapping
- Source Mapping
- CONV File
- Re-registration Form
- TIK Tracker
- Wire Instructions

### Participant / payroll data

- Base File
- Payroll Template
- Census File
- CIT Balance File
- YTD Contributions File
- Basis File
- Hours File
- Deferral Elections File

### COM / client communication

- Prior Carrier Letter
- Blackout Notice
- Mapping Notice
- QDIA Notice
- Fee Disclosure
- Privacy Notice
- Conversion Newsletter
- Transition Communications Checklist

### Payroll / go-live / close-out

- Payroll Questionnaire
- Contribution Monitoring Form
- RDD Form
- VEF
- CSR
- Auto Delivery Form
- Audit Pack
- FILESPECRQ Ticket

The app should let a reader open a document page and immediately see:

- What it is
- Who creates it
- Who uses it
- When it appears
- What it triggers
- Where mistakes happen

---

## 9. Exceptions and Gotchas

This deserves its own reader-facing section because the source data repeatedly emphasizes "do not mess this up" moments.

High-value exception pages:

- Dummy participant missing before Day of Wire
- Deferrals before eligibility
- Day of Wire cannot be tested
- Wrong P3 processing mode
- FMC / SSBT cutoff
- Common remitter plans
- Payroll incomplete at go-live
- Reversal process after March 6, 2026
- Booking assets: 4=Remit vs. 3=Rebook
- LTPT eligibility effective January 1, 2025
- TIK timing: not too early, not too late
- Prod Support urgent liquidation-day correction
- Prior RK unresponsive
- Client returns dirty base file

This section should not be a dumping ground. It should be a curated "things that burn time or money" list.

---

## 10. Fresh Home Page Concept

The home page should not be a static overview only.

It should offer fast entry points:

### Start here

- I am new to DC work
- I am new to COM work
- I need to understand the full conversion lifecycle
- I need to find a system
- I need to find a document
- I am troubleshooting a conversion problem

### Conversion map

A compact visual sequence:

NSA / NBI assignment -> Discovery -> Data setup -> Partner setup -> Mapping -> Pre-liquidation -> Liquidation day -> Final files -> Go-live

Each phase links to the relevant pages.

### Current critical updates

Promote recent procedural changes:

- Reversal form process effective March 6, 2026
- Payroll handoff at go-live effective February 26, 2026
- FMC email procedure / SSBT cutoff
- LTPT eligibility effective January 1, 2025
- Common remitter processing
- Booking assets update

---

## 11. Recommended Page Types

The current role/entity/concept/source model should become:

| Type | Meaning |
|---|---|
| `lifecycle-phase` | A phase in the canonical conversion timeline |
| `team` | A department or operational partner team |
| `role` | A job role, usually attached to a team |
| `system` | A tool/platform/application |
| `document` | A form, file, notice, package, report, or template |
| `procedure` | A step-by-step process or how-to |
| `exception` | A risk, gotcha, or special handling case |
| `person` | A curated SME or handoff point |
| `glossary` | Short term/acronym definition |
| `source` | Ingested source summary |
| `analysis` | Filed synthesis or decision record |

This is more faithful to the source material than `concept`.

---

## 12. Suggested Rebuild Strategy

Start fresh in presentation, not in knowledge.

Do not throw away the current pages. Instead:

1. Build the lifecycle spine.
2. Reclassify existing pages into the new types.
3. Promote documents/files into their own section.
4. Promote gotchas into a curated exception section.
5. Make systems first-class.
6. Make team pages explain ownership and handoffs.
7. Keep people pages only where a human is operationally meaningful.
8. Keep glossary tiny and link outward for depth.

The app should feel like:

> "I can run or understand a conversion from here."

Not:

> "I can browse a lot of markdown pages from here."

---

## 13. What To Stop Doing

- Stop making `concepts/` the default home for anything fuzzy.
- Stop treating teams, people, and systems as one entity category.
- Stop making hub pages whose only job is link lists.
- Stop letting source summaries be the only place where recent process changes are obvious.
- Stop burying high-risk rules at the bottom of long pages.
- Stop assuming departments alone are the best navigation model.

Departments matter, but the conversion lifecycle is stronger.

---

## 14. What To Build First

If implementing this fresh digest, build in this order:

1. **Home page with lifecycle map**
2. **Conversion Lifecycle section**
3. **Documents & Files section**
4. **Systems section**
5. **Exceptions & Gotchas section**
6. **Teams & Handoffs section**
7. **People / SMEs section**
8. **Glossary cleanup**
9. **Source/archive cleanup**

This order follows the actual reader need and the actual source data.

---

## 15. Immediate Content Decisions

### Keep these as cornerstone pages

- DC
- COM
- Plan Conversion Handoffs
- DC Onboarding Workflow, rewritten as lifecycle
- Final Files Processing
- Liquidation Day
- Conversion Types
- EDS
- Informatica
- P3
- TOA
- Subpack / CCCS

### Merge or demote these

- `concepts/eligibility-and-deferrals` should become part of final-files sequence and exception rules.
- `entities/internal-teams` should become Teams & Handoffs navigation.
- `concepts/nsa`, `concepts/csr`, `concepts/vef`, and similar acronym/document duplicates should be split carefully into either glossary-only or document page plus glossary alias.
- `entities/p2` should likely merge into P3 unless P2 needs its own procedural page.

### Promote these

- Reversal process
- Payroll handoff at go-live
- Fund Management Calendar
- Booking assets
- Common remitter plans
- LTPT eligibility
- Loading eligibility through EDS
- Loading basis through EDS

These are high-value because they are recent, procedural, or risk-heavy.

---

## 16. Open Knowledge Gaps

The source data still lacks:

- Prior RK-specific workflows for Fidelity, Vanguard, Empower
- DC query library
- Finalized DC folder workflows
- Full COM non-conversion responsibilities, if any
- Samantha C. identity/team
- Paul and Danny full names / exact QA roles
- FILESERVE, CIT, DCGLIB details
- Salesforce/SF workflow details
- Exact paths for `TO Census.sql`, `TO_BASIS.sql`, and other queries
- Full content for many title-only raw docs in `raw/new mds/`

These should be marked as gaps, not hidden as stubs that look complete.

---

## 17. Bottom Line

The better rebuild is not "same wiki, cleaner folders."

The better rebuild is:

> A lifecycle-driven conversion brain where every team, system, document, person, and exception is attached to the moment in the plan conversion when it matters.

That is the structure the ingested data is already asking for.
