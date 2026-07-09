# Wiki Index
*Last updated: 2026-07-08 — 124 pages, 11 sources*

The operational catalog of the DC Operations Wiki. Also see [[overview]] and [[log]].

---

## Case Lifecycle
| Page | Summary | Updated |
|------|---------|---------|
| [[lifecycle/cccs-submission-package|CCCS Submission Package]] | The CCCS (Client Conversion Configuration Sheet) is Part 1 of the New Plan Submission Package — a standardized form completed once per plan  | 2026-07-08 |
| [[lifecycle/dc-onboarding-workflow|DC Onboarding Workflow]] | The complete end-to-end process a Data Consultant follows to onboard a new retirement plan, from assignment through final posting. This is t | 2026-04-14 |
| [[lifecycle/lm-dc|Large Market Data Consultant (LM DC)]] | The person responsible for all data-related work when onboarding a new retirement plan onto Transamerica's platform. | 2026-04-15 |
| [[lifecycle/nbi|NBI]] | Internal system where new plan assignments are loaded and tracked. The starting point for every DC's involvement in a new plan. | 2026-07-08 |
| [[lifecycle/onboarding-package|Onboarding Package]] | An all-in-one Excel document used for certain plan types (especially PEP plans) in place of or alongside the PRD. Contains plan provisions,  | 2026-04-14 |
| [[lifecycle/prd|PRD — Plan Review Document]] | A detailed document comparing the prior provider's plan design to the TransAmerica plan design. Reviewed internally first, then with the cli | 2026-04-14 |
| [[lifecycle/subpack|Subpack — Submission Package]] | TransAmerica's internal document specifying exactly what will be done during the conversion — the "how we're doing it" complement to the PRD | 2026-04-14 |

## Data Loading
| Page | Summary | Updated |
|------|---------|---------|
| [[data-loading/balance-import-cash|Balance Import — Cash Conversion]] | The simplest balance import method. Used when the prior record keeper sends a single cash wire rather than a fund-mapped wire or in-kind sha | 2026-07-08 |
| [[data-loading/balance-import-mapping|Balance Import — Mapping]] | Balance import method where prior-record-keeper funds map directly to corresponding TA funds. The wire is received and balances are applied  | 2026-07-08 |
| [[data-loading/balance-import-tik|Balance Import — Transfer In-Kind]] | Balance import method used when the prior record keeper transfers shares directly rather than liquidating and sending cash. Requires re-regi | 2026-07-08 |
| [[data-loading/balance-import|Balance Import]] | The process of loading prior-record-keeper balances into P3 after a conversion wire or share transfer. Three distinct methods exist dependin | 2026-07-08 |
| [[data-loading/base-file|Base File]] | The census template provided to the client that seeds the TransAmerica system with participant data. This is the foundation of all participa | 2026-04-14 |
| [[data-loading/census-data|Census Data]] | Information gathering and loading of all active and terminated participants (within the last two years) into the system at the start of a pl | 2026-05-03 |
| [[data-loading/defaulting-elections-eds|Defaulting Elections via EDS]] | The technique for setting a participant's investment elections to the plan default, loaded through EDS as part of (or just after) the census | 2026-05-03 |
| [[data-loading/deferrals|Deferral Processing]] | The process of loading participant contribution elections into P3 during the final files phase. More complex and exception-heavy than eligib | 2026-05-03 |
| [[data-loading/eds-load-beneficiary-requirements|EDS Load Beneficiary Requirements]] | Requirements and data elements for loading participant beneficiary designation data through EDS. | 2026-06-25 |
| [[data-loading/eligibility-and-deferrals|Eligibility and Deferrals]] | Overview of the relationship between deferral processing and eligibility processing during the final files phase. These are separate process | 2026-04-14 |
| [[data-loading/eligibility-loading|Eligibility Loading Through EDS]] | How eligibility data for plan participants is loaded into p3 using eds — replacing the legacy AQT path into `Part_Elig_src`. | 2026-06-25 |
| [[data-loading/eligibility|Eligibility Processing]] | The process of enabling plan eligibility rules in P3 so the system begins applying them to participants. Always runs after deferrals — eligi | 2026-07-08 |
| [[data-loading/final-files-processing|Final Files Processing]] | How the DC processes authoritative as-of-liquidation files from the prior record keeper to populate p3 with real participant data. | 2026-05-03 |
| [[data-loading/forfeiture-loading|Forfeiture Loading]] | When a balance file from the prior record keeper includes forfeiture entries, the DC loads them as participant-shaped records using a stand- | 2026-05-03 |
| [[data-loading/hours-procedure|Hours Procedure]] | The procedure for loading or tracking participant hours data — used in eligibility processing to determine whether participants meet service | 2026-06-25 |
| [[data-loading/informatica-allocation-module|Informatica Allocation Module]] | Maps prior fund allocations to TA funds for participant investment elections during conversion. | 2026-07-08 |
| [[data-loading/informatica-balance-module|Informatica Balance Module]] | Posts individual participant balances from final files into the plan in P3. | 2026-07-08 |
| [[data-loading/informatica-loan-module|Informatica Loan Module]] | The Informatica module that loads participant loan header records and source-balance allocations from a prior record keeper into P3. | 2026-07-08 |
| [[data-loading/limited-access-file|Limited Access File]] | A census variant the client provides during an open period right before the plan goes into blackout. Lets participants update their allocati | 2026-05-03 |
| [[data-loading/loading-basis-eds|Loading Basis through EDS]] | Procedure for loading cost basis data for plan participants through EDS during a plan conversion. | 2026-04-20 |
| [[data-loading/loading-ytd-contributions-eds|Loading YTD Contributions through EDS]] | Procedure for loading year-to-date contribution data through EDS during plan conversion. | 2026-06-25 |
| [[data-loading/loan-setup|Loan Setup & Processing]] | How a plan's outstanding participant loans move from a prior record keeper into P3 — a 14-step workflow across two systems (P3 + Informatica | 2026-07-08 |
| [[data-loading/ltpt-eligibility|LTPT Eligibility (Long-Term Part-Time)]] | A Secure Act 2.0 eligibility requirement that entitles long-term part-time employees to make elective deferrals, even if they have not met t | 2026-04-15 |

## Payroll
| Page | Summary | Updated |
|------|---------|---------|
| [[payroll/bonus-election-setup|Bonus Election Setup]] | Plan setup pattern for allowing participants to make separate regular and bonus deferral elections. | 2026-05-13 |
| [[payroll/ftp-connection|FTP Connection]] | The automated file transfer channel used by payroll vendors to upload payroll files to TransAmerica's systems. | 2026-07-08 |
| [[payroll/payroll-file-automation|Payroll File Automation]] | Setup rules for automated payroll file submission through PSD or FTP. | 2026-07-08 |
| [[payroll/payroll-handoff-at-go-live|Payroll Handoff at Go-Live]] | The formal procedure for transferring an incomplete payroll testing project to the Fiduciary Services team at go-live. Effective February 26 | 2026-07-08 |
| [[payroll/payroll-template|Payroll Template]] | The file format specification provided to clients and payroll vendors for ongoing payroll contribution uploads after conversion. | 2026-07-08 |
| [[payroll/payroll-vendor-onboarding|Payroll Vendor Onboarding]] | The full vendor-side payroll work that happens before FTP automation is live and before the go-live handoff. Covers the moment the prior pay | 2026-07-08 |
| [[payroll/wx|WX — Plan Sponsor Site]] | Transamerica's web-based portal for plan sponsors. WX (also called "WX V2" when referencing payroll integration) is set up by tc and verifie | 2026-07-08 |

## Conversion Operations
| Page | Summary | Updated |
|------|---------|---------|
| [[conversion-ops/advanced-employer|Advanced Employer Account]] | A temporary holding account in P3 used during cash conversions to park the incoming wire until participant-level balance posting can occur. | 2026-07-08 |
| [[conversion-ops/audit-pack|Audit Pack]] | A structured summary document the DC builds after every plan conversion. Reviewed by QA and stored in client folders for the audit team. | 2026-04-14 |
| [[conversion-ops/booking-assets|Booking Assets]] | The process of posting wire receipts and balance disbursements to plan accounts in P3. As of August 13, 2025, two distinct booking types app | 2026-04-15 |
| [[conversion-ops/conv-file|CONV File]] | The input file for the Informatica Day of Wire workflow. Built in advance as a skeleton; fund totals and transfer reference numbers are fill | 2026-04-14 |
| [[conversion-ops/conversion-types|Conversion Types]] | The three ways a plan's assets can be moved from a prior record keeper to TransAmerica. Conversion type is determined early in discovery and | 2026-04-14 |
| [[conversion-ops/dummy-participant|Dummy Participant]] | A placeholder participant (SSN 999-00-0000) required in the census before running the Day of Wire Informatica workflow for mapping conversio | 2026-07-08 |
| [[conversion-ops/fund-management-calendar|Fund Management Calendar]] | A daily trade log that must be updated — and a distribution email sent — before the 4:00 PM EST SSBT (State Street Bank & Trust) cut-off on  | 2026-07-08 |
| [[conversion-ops/fund-mapping|Fund Mapping]] | The process of establishing which prior record keeper fund maps to which TransAmerica fund. Required for mapping and TIK conversions. | 2026-05-03 |
| [[conversion-ops/liquidation-day|Liquidation Day]] | The day the prior record keeper liquidates (or transfers) plan assets and sends them to TransAmerica. The highest-stakes day in the conversi | 2026-05-03 |
| [[conversion-ops/source-mapping|Source Mapping]] | The process of mapping prior record keeper contribution source codes to TransAmerica source IDs. Required for all conversions that carry ove | 2026-05-03 |
| [[conversion-ops/subsequent-cash-imports|Subsequent Cash Imports]] | The family of small DC-triggered cash applications that land in participant accounts after the main conversion balances post. All of these f | 2026-05-03 |
| [[conversion-ops/tik-transfer|Transfer In Kind (TIK) Process]] | How specific investment funds move as shares — not cash — from the prior record keeper to Transamerica's Fidelity pooled accounts during a p | 2026-07-08 |
| [[conversion-ops/toa|TOA — Transfer of Assets]] | Client-signed legal document that authorizes the asset transfer and serves as the fund mapping source. No action on the transfer begins unti | 2026-04-14 |
| [[conversion-ops/wire-instructions|Wire Instructions]] | Banking instructions sent to the prior record keeper telling them where to send the liquidated assets on liquidation day. | 2026-04-14 |

## Department Coordination
| Page | Summary | Updated |
|------|---------|---------|
| [[coordination/cashiering|Cashiering]] | Receives, books, and confirms incoming wires from prior record keepers on liquidation day — their confirmation is your green light for Day o | 2026-07-08 |
| [[coordination/com|Communications Coordinator (COM)]] | The project manager for every plan conversion and the DC's route to the client — anything that needs to reach the client, or come from the c | 2026-07-08 |
| [[coordination/doc-ops|Document Operations (Doc Ops)]] | Sets up plan details in p3 and adds new special plan classes — the one setup change a DC cannot make directly. | 2026-07-08 |
| [[coordination/ftp-team|FTP Team]] | Sets up and manages the FTP connections that let payroll vendors upload files to Transamerica's systems. Setup takes 1–2 weeks — engage as e | 2026-07-08 |
| [[coordination/payroll-support|Payroll Support (OnePayroll Team)]] | Runs production-level payroll file simulations — the final validation gate before a payroll setup goes live. | 2026-07-08 |
| [[coordination/plan-conversion-handoffs|Plan Conversion Handoffs]] | The handoffs where the DC is on one end during a plan conversion — what moves, between whom, and when. | 2026-07-08 |
| [[coordination/prod-support|Prod Support]] | Makes direct database table corrections that DCs cannot perform themselves. Engaged via AWD ticket. | 2026-07-08 |
| [[coordination/qa|Quality Assurance (QA)]] | Audits conversion data, setup, defaults, and participant records so the plan can go live without silent setup errors. | 2026-07-08 |
| [[coordination/tc|Transition Consultant (TC)]] | Owns the administrative setup of the plan during conversion — the person who makes sure the plan can actually operate before participants an | 2026-07-08 |

## Troubleshooting
| Page | Summary | Updated |
|------|---------|---------|
| [[troubleshooting/common-remitter-plans|Common Remitter Plans]] | Plans coded as "common remitter" in P3 use a different Day of Wire processing flow than standard plans — the standard Pre-Process option is  | 2026-04-15 |
| [[troubleshooting/informatica-troubleshooting-guide|Informatica Troubleshooting Guide]] | Common Informatica errors, their causes, and how to resolve them. | 2026-07-08 |
| [[troubleshooting/loan-failures|Loan Load Failures]] | Three loan-load failures that come up in practice where the loan file looks structurally fine but the numbers don't reconcile. These are bus | 2026-07-08 |
| [[troubleshooting/reversal-submission|Reversal Process]] | How to reverse an erroneous transaction in p3. Both a Reversal Form submission and a Reversal AWD ticket are required — in that order. | 2026-06-25 |

## Checklists
| Page | Summary | Updated |
|------|---------|---------|
| [[checklists/day-of-wire-audit|Day of Wire Audit]] | Validation pass for the high-risk checks the DC performs around day-of-wire processing. | 2026-06-25 |
| [[checklists/go-live-checklist|Go Live Checklist]] | TC/QC control checklist for turning on limited access or full access during conversion. | 2026-05-13 |

## Reference
| Page | Summary | Updated |
|------|---------|---------|
| [[reference/alteryx|Alteryx]] | Data blending and workflow tool associated with the Large Market data toolchain. | 2026-06-25 |
| [[reference/aqt|AQT]] | Standalone SQL query application used by DCs throughout the conversion lifecycle. Read-only — cannot modify data. | 2026-05-03 |
| [[reference/case-notes-template|Case Notes Template]] | Structured plan-level notes used to preserve conversion and administration rules for downstream teams. | 2026-05-13 |
| [[reference/creative-planning-managed-accounts|Creative Planning Managed Accounts]] | Plan setup and participant-service pattern for Financial Guide / Creative Planning Managed Accounts. | 2026-05-13 |
| [[reference/divisions-and-affiliates|Divisions and Affiliates]] | Plan setup pattern for division tracking, divisional reporting, and multi-affiliate plan administration. | 2026-05-13 |
| [[reference/eds|EDS]] | File validation and processing system used to test and run data file uploads (payroll, balance, census, etc.) before and during conversions. | 2026-04-14 |
| [[reference/file-naming|File Naming Conventions]] | The naming and identifier conventions used across DC file exchanges — payroll files, Financial Guide uploads, and the stand-out conventions  | 2026-07-08 |
| [[reference/informatica|Informatica]] | ETL/workflow processing tool used to run the four main conversion workflows: Day of Wire, Participant Balance (CIT Balance), Loan Module, an | 2026-07-08 |
| [[reference/navigation-paths|System Navigation Paths]] | Verbatim click-paths for the P2 and P3 tasks DCs do most often, plus known shared-drive locations. | 2026-07-08 |
| [[reference/p2|P2]] | A back-end system region used primarily for creating and modifying transfer reference numbers. Separate from p3 but connected — changes in P | 2026-05-03 |
| [[reference/p3|P3]] | The main plan administration system. Central hub for plan configuration, participant data, processing, and queries. | 2026-04-14 |
| [[reference/plan-classes|Plan Classes]] | Groupings within a plan (e.g., employee categories) that determine contribution rules, eligibility, and other plan parameters. Defined in P3 | 2026-04-14 |
| [[reference/query-library|SQL Query Library]] | Every SQL query and named .sql file the DC sources mention, with verbatim SQL where a source actually contains it. | 2026-07-08 |
| [[reference/wire-routing|Wire Routing & Cutoff Times]] | Where incoming conversion wires land at State Street, when Cashiering pulls them, and the daily cutoffs that decide whether money books toda | 2026-07-08 |

## Vendors
| Page | Summary | Updated |
|------|---------|---------|
| [[vendors/adp|ADP]] | Large payroll vendor where terminology and platform routing matter — keep ADP pointed at large-market/MR Report work, not Mid-Market, Paysta | 2026-07-08 |
| [[vendors/creative-planning|Creative Planning]] | Creative Planning is a TPA relationship — first determine whether payroll actually runs through Creative Planning or through the underlying  | 2026-07-08 |
| [[vendors/datamoov|Datamoov]] | Datamoov large-market work is different from Paystart mid-market — be specific about market, template, naming, and SFTP route. | 2026-07-08 |
| [[vendors/dayforce|Dayforce / Ceridian]] | Dayforce/Ceridian has enough helper-table and mapping nuance that it should be treated as a custom-path vendor until proven otherwise. | 2026-07-08 |
| [[vendors/docusign|DocuSign]] | An electronic signature platform used by the com to send plan documents and onboarding agreements to clients for signature. | 2026-04-14 |
| [[vendors/exponenthr|ExponentHR]] | ExponentHR currently does not support a full 360 inbound/outbound setup with Transamerica — treat it as inbound SFTP only. | 2026-07-08 |
| [[vendors/kelly-benefits|Kelly Benefits]] | Kelly Benefits has multiple platforms — identify the platform first before assuming this is large-market payroll work. | 2026-07-08 |
| [[vendors/paycom|Paycom]] | Paycom is a high-specificity vendor: no test-file rhythm, PGP outbound, and careful loan-number handling. | 2026-07-08 |
| [[vendors/paycor|Paycor]] | Paycor is often really a PayKonnect route under the covers — name both pieces clearly. | 2026-07-08 |
| [[vendors/paykonnect|PayKonnect]] | PayKonnect is the third-party payroll route behind some named payroll vendors. | 2026-07-08 |
| [[vendors/paylocity|Paylocity]] | Paylocity has a relatively clear large-market path, but loan seeding and inbound readiness still matter. | 2026-07-08 |
| [[vendors/payroll-integrations|Payroll Integrations]] | Payroll Integrations (PI) is a third-party payroll provider with a special relationship with Transamerica — do not work it the same way as A | 2026-07-08 |
| [[vendors/prior-record-keeper|Prior Record Keeper]] | The outgoing retirement plan administrator from whom TransAmerica is taking over the plan. A critical external relationship that must be est | 2026-04-14 |
| [[vendors/ukg|UKG]] | UKG splits sharply between inbound ULTIMATE routing and outbound Turnkey/non-Turnkey handling. | 2026-07-08 |
| [[vendors/vendor-quick-reference|Vendor Quick Reference]] | Cross-vendor "Quick Hits" comparison for payroll outbound decisions: who takes the standard file, who needs custom 1116, loan-number handlin | 2026-07-08 |
| [[vendors/workday|Workday]] | Workday may be the system of record while another implementation partner (such as KPMG) owns the actual integration work — confirm ownership | 2026-07-08 |

## Glossary
| Page | Summary | Updated |
|------|---------|---------|
| [[glossary/aaa|AAA]] | The AAA is a plan document addendum used in the PEP (Pooled Employer Plan) structure. It appears in the COM's TRS Plan Documents section for | 2026-04-16 |
| [[glossary/awd|AWD]] | AWD is Transamerica's internal work-ticketing and routing system. Teams submit AWD tickets to request actions from other departments — data  | 2026-05-03 |
| [[glossary/csr|CSR]] |  | 2026-04-14 |
| [[glossary/faa|FAA]] | FAA refers to the fund asset allocation data requirements that the DC must satisfy during a conversion — the specific data fields and format | 2026-04-16 |
| [[glossary/filespecrq|FILESPECRQ]] | FILESPECRQ is an awd ticket type used by the lm-dc to hand off incomplete payroll testing to Fiduciary Services at go-live. When payroll tes | 2026-04-15 |
| [[glossary/holb|HOLB]] | HOLB is the highest outstanding balance a participant's loan has reached over its life. It's used to drive the hierarchy of loans when a par | 2026-05-03 |
| [[glossary/kit-mail-date|Kit Mail Date]] | The date the auto-enrollment welcome kit was mailed to a participant. On plans that auto-escalate deferral rates over time, this date is wha | 2026-05-03 |
| [[glossary/ltpt|LTPT]] | LTPT refers to the Long-Term Part-Time eligibility category established by the SECURE Act 2.0. Effective January 1, 2025, employees who work | 2026-04-15 |
| [[glossary/nsa|NSA]] |  | 2026-04-14 |
| [[glossary/pea|PEA]] | The PEA is the enrollment agreement document used in the PEP (Pooled Employer Plan) onboarding workflow. It appears in the COM's OBP (Onboar | 2026-04-16 |
| [[glossary/ssbt|SSBT]] | SSBT is the external custodial bank through which incoming wires from prior record keepers are received during plan conversions. The fund-ma | 2026-04-15 |
| [[glossary/tm|TM (Transition Manager)]] | TM (Transition Manager) was the former name for the role now called com (Communications Coordinator / Conversion Operations Manager). Older  | 2026-04-15 |
| [[glossary/vef|VEF]] |  | 2026-04-14 |

## Onboarding
| Page | Summary | Updated |
|------|---------|---------|
| [[onboarding/lm-dc|Onboarding Guide: Large Market Data Consultant]] | A reading list for anyone new to the LM DC role at Transamerica. Read these pages in order. Each one builds on the last. | 2026-07-08 |

## Sources
| Page | Summary | Updated |
|------|---------|---------|
| [[sources/balances-census-loans-brain-dump|Source: Balances, Census, Loans Brain Dump]] | LM-DC voice-memo brain dump captured as a single text file in `new TA Brain/Balances, Census, Loans.txt`. Intended by the author as the "all | 2026-05-03 |
| [[sources/census-data-doc|Source: Census Data Documentation]] | Structured documentation file covering census data loading procedures, audit checks, and error handling for plan conversions. | 2026-04-20 |
| [[sources/com-main-checklist|Source: COM Main Checklist]] | A structured web-based checklist application used by Communications Coordinators (COMs) to track every task across a plan conversion lifecyc | 2026-04-14 |
| [[sources/dc-brain-dump-001|DC Brain Dump 001 — Full Job Workflow]] | Voice transcript brain dump covering the complete end-to-end workflow of a Data Consultant (DC) at TransAmerica, from new plan assignment th | 2026-04-14 |
| [[sources/dc-brain-dump-002|DC Brain Dump #002 — Payroll, Order of Processing, Loan Quirks, Auto-Enroll]] | Voice transcript follow-up to dc-brain-dump-001. Filling gaps and adding context. Original audio recorded by Joel; transcript saved at `new  | 2026-05-03 |
| [[sources/extra-questions-001|Extra Questions — Round 4 Answers]] | Answers to all outstanding open questions across the wiki. Provided by DC (Marcus) via written Q&A. Covers 20+ pages. | 2026-04-14 |
| [[sources/lmdc-training-notebook|LMDC Training Notebook]] | The official DC Team training OneNote notebook, exported as a web archive (.mht). A living document spanning 2015–2026 with the full DC work | 2026-04-15 |
| [[sources/loading-basis-doc|Source: Loading Basis through EDS Documentation]] | Structured documentation file covering basis data loading procedures, field definitions, tables, and special rules for plan conversions. | 2026-04-20 |
| [[sources/subpack-cccs|Source: New Plan Submission Package — CCCS Document]] | Raw template for the CCCS (Client Conversion Configuration Sheet) submission package — the internal TA document completed once per plan at t | 2026-04-16 |
| [[sources/tc-details-from-dan|TC Details from Dan]] | Role summary for the Transition Consultant, focused on administrative support, operational continuity, recordkeeping setup audits, notice co | 2026-07-01 |
| [[sources/tc-stuff|TC Stuff]] | Mixed legacy source bundle containing team charters, TC/QC role definitions, go-live controls, case note template language, plan setup proce | 2026-05-13 |

## Admin
| Page | Summary | Updated |
|------|---------|---------|
| [[overview]] | High-level synthesis of the DC operations wiki. | 2026-07-08 |
| [[log]] | Append-only activity log. | 2026-07-08 |
