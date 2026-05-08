---
title: "Internal Teams"
type: entity
tags: [teams, organization, roles]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Internal Teams

Overview of all internal teams and roles involved in the plan onboarding process from a DC's perspective.

## DC — Data Consultant

The primary role this wiki documents. Responsible for all data-related work in a plan conversion or onboarding.

**Responsibilities:**
- Receiving and managing plan assignments
- Building and sharing base file and payroll templates with clients
- Setting up EDS layouts, source mappings, fund mappings
- Coordinating with prior record keepers and payroll vendors
- Processing files through Informatica workflows
- Posting balances, deferrals, YTD data, and eligibility to P3
- Building audit packs and running queries

**Does NOT do:**
- Add new special plan classes (Doc Ops does this)
- Handle distribution elections (other departments)
- Attend external calls unless data topics are on the agenda

---

## COM — Communications Coordinator

Acts as the project manager for each plan conversion. Also called "Calm."

**Responsibilities:**
- Setting up internal and external periodic meetings
- Managing the PRD/onboarding package process
- Completing the sub-pack (submission package) — *inconsistently done in practice*
- Receiving and forwarding client questions to the appropriate internal team
- Receiving fund mapping and source mapping approvals
- Keeping everyone on schedule

**DC's relationship with COM:**
- COM sets meetings; DC attends internal ones and optional external ones
- DC sends fund maps and source maps to COM for approval/distribution
- COM notifies DC when clients sign documents (TOA, PRD, etc.)

---

## Doc Ops — Document Operations

**Responsibilities:**
- Updating P3 with new plan details (sets up P3)
- Adding new special plan classes to P3
- Maintaining plan documents

**DC's relationship with Doc Ops:**
- DC cannot add new special plan classes — must request Doc Ops
- DC can update existing class names and codes

---

## QA — Quality Assurance

**Responsibilities:**
- Deeper validation of plan setup and data
- Reviewing and approving source mappings and fund mappings
- Receives eligibility notification before DC enables it in P3
- Post-processing checks

**DC's relationship with QA:**
- DC sends source mapping to QA for approval
- DC notifies QA before processing eligibility
- QA sends go-ahead email before DC enables eligibility

---

## TC — Transition Consultant

**Responsibilities:**
- Higher-level, systematic back-end work on the plan conversion
- Reviews and approves source mappings and fund mappings
- Receives eligibility notification before DC enables it
- More back-end/systematic than the COM (who is more front-end/client-facing)

**DC's relationship with TC:**
- TC is CC'd alongside QA and COM on key communications
- TC has their own checklist section in [[nbi]]

---

## Cashiering

**Responsibilities:**
- Receiving and booking incoming wires from prior record keepers
- Providing transfer reference numbers to DCs
- Verifying wire amounts

**DC's relationship with Cashiering:**
- DC emails cashiering ~1 day before liquidation as a heads-up
- DC notifies cashiering when vendor confirms wire sent (with expected total)
- Cashiering emails DC with ref number once wire is booked
- Cashiering may already receive a daily wire list with DC assignments

---

## FTP Team

**Responsibilities:**
- Setting up FTP accounts for payroll vendors to upload files
- Managing FTP credentials and access

**DC's relationship with FTP Team:**
- DC identifies payroll upload contact, then requests FTP account setup
- **Must engage early** — FTP team has large caseload
- DC provides login/password info to payroll vendor once set up

---

## Payroll Support Team

**Responsibilities:**
- Deeper validation of payroll test files (live environment, not internal EDS)
- Catches different warnings/errors than EDS does
- Provides feedback on file issues

**DC's relationship with Payroll Support:**
- DC sends validated payroll test files to Payroll Support for final check
- DC may need to obtain a new test file and resubmit if issues found
- Payroll Support green-lights the payroll setup

---

## Prod Support

**Responsibilities:**
- Making direct database table modifications (corrections, deletions, value changes)
- Handling data that can't be fixed through standard DC tools (P3, ROC tool)
- Resolving post-import issues

**DC's relationship with Prod Support:**
- DC submits an **AWD ticket** with an isolating query and thorough description
- DC verifies the change after Prod Support completes it
- DC closes the ticket once verified

See [[prod-support]] for full AWD ticket best practices.

---

## Prior Record Keeper (External)

The outgoing retirement plan administrator. See [[prior-record-keeper]].

---

## Payroll Vendor (External)

Third-party payroll processor who sends payroll contribution files. See [[ftp-connection]] and [[payroll-template]].

## See Also

- [[dc-onboarding-workflow]]
- [[ellen-miller]]
- [[matt-oconnell]]
- [[p3]]
- [[eds]]
