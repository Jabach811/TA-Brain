---
title: "Overview"
type: reference
tags: [overview, synthesis]
created: 2026-04-14
updated: 2026-07-08
sources: 11
status: current
---

# Overview

This wiki is the operational reference for Large Market Data Consultants: what to do, in what order, with which systems, and who to hand things to — from case assignment through project closeout.

## What this wiki is

Every page answers one question: **what does a DC need to know to perform this task correctly?** It is not a retirement-plan encyclopedia and not a department handbook. Other teams (COM, TC, QA, Cashiering) appear only as interfaces — what they hand you, what you hand them, and when to escalate. See [[plan-conversion-handoffs]] for the full handoff map.

## How it's organized

- **[[dc-onboarding-workflow|Case Lifecycle]]** — the conversion project spine, kickoff to closeout.
- **Data Loading** — one page per load: [[census-data|census]], [[eligibility]], [[deferrals]], [[balance-import|balances]], [[loan-setup|loans]], [[loading-basis-eds|basis]], [[loading-ytd-contributions-eds|YTD]]. [[final-files-processing]] is the master sequence.
- **Payroll** — [[payroll-vendor-onboarding|vendor onboarding]], [[ftp-connection|FTP]], [[payroll-template|file specs]], and the [[payroll-handoff-at-go-live|go-live handoff]].
- **Conversion Ops** — [[conversion-types]], [[fund-mapping]], [[source-mapping]], [[wire-instructions|wires]], [[liquidation-day]], [[tik-transfer|TIK]].
- **Departments** — DC-facing interfaces for [[tc|TC]], [[com|COM]], [[qa|QA]], [[cashiering|Cashiering]], [[ftp-team|FTP Team]], [[prod-support|Prod Support]].
- **Troubleshooting** — symptom-first: [[reversal-submission|reversals]], [[loan-failures]], [[informatica-troubleshooting-guide|Informatica errors]], [[common-remitter-plans|common remitter]].
- **Checklists** — [[day-of-wire-audit]] and other control gates.
- **Reference** — [[query-library|SQL queries]], [[navigation-paths|system click-paths]], [[wire-routing|wire routing and cutoffs]], [[file-naming|naming conventions]], and system pages ([[p3|P3]], [[eds|EDS]], [[informatica|Informatica]], [[aqt|AQT]], [[p2|P2]]).

## Operating principles

1. **Do things early.** Trades, forms, FTP setup, and access requests all have lead times; the calendar drives the work and compresses at the end.
2. **Conversion type drives everything.** Cash, mapping, or TIK ([[conversion-types]]) determines the balance import path, wire handling, and Day of Wire mechanics.
3. **Order matters.** Deferrals load before eligibility; balances follow liquidation; [[final-files-processing]] encodes the sequence.
4. **P3 process mode controls trades.** The wrong mode on Day of Wire moves real money the wrong way.
5. **Always read EDS output.** A load that "ran" is not a load that worked.
6. **Escalate by role, not by name.** Pages name the current person where useful, but the escalation path is the role.

## See Also
- [[index]]
- [[dc-onboarding-workflow]]
- [[lm-dc]]
