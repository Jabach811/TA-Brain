---
title: "DC Onboarding Workflow"
type: concept
tags: [workflow, process, master, conversion, onboarding]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# DC Onboarding Workflow

The complete end-to-end process a Data Consultant follows to onboard a new retirement plan, from assignment through final posting. This is the master reference page — every step links to a detailed concept page.

## Phase Overview

| Phase | Name | Key Deliverables |
|-------|------|-----------------|
| 1 | Assignment & Discovery | Plan on DC radar, P3 check, PRD/OB review |
| 2 | Data Setup | Base file, payroll template, EDS layouts |
| 3 | Vendor Coordination | Prior RK contact, payroll vendor, FTP setup |
| 4 | Mapping & Documentation | TOA processing, fund mapping, source mapping |
| 5 | Pre-Liquidation | CONV file prep, Matt O'Connell (TIK), final checks |
| 6 | Liquidation Day | Day-of-wire workflow, money receipt |
| 7 | Final Files & Posting | Balance posting, YTD data, deferrals, eligibility |

---

## Phase 1 — Assignment & Discovery

**Trigger:** [[ellen-miller]] notifies manager → manager assigns to DC → plan tagged in [[nbi]]

### Steps
- [ ] Confirm plan is assigned in NBI
- [ ] Check if [[p3]] is already set up (may be done early for mergers/some new plans)
- [ ] Note plan type: **new plan**, **merger**, or **startup** (startup = no prior record keeper)
- [ ] Note [[conversion-types|conversion type]]: cash, mapping, or transfer in kind
- [ ] Attend internal kickoff meetings set up by [[internal-teams|COM]]
- [ ] Review [[prd]] (Plan Review Document) or [[onboarding-package]] — focus on: eligibility, vesting, sources, classes
- [ ] Review [[subpack]] (Submission Package) if available — details what TA will do
- [ ] Note any frozen sources, new sources, special strategies

**External meetings:** Optional for DCs unless data topics (base file, payroll) are explicitly on agenda.

---

## Phase 2 — Data Setup

**Prerequisite:** PRD/OB reviewed; plan size and conversion type understood

### Steps
- [ ] Build the **[[base-file]]** template — tailor to plan's specific fields (YTD comp, hours, eligibility dates, deferrals, sources)
- [ ] Schedule meeting with client to walk through base file template
- [ ] Collect base file from client (iterate until clean)
- [ ] Build the **[[payroll-template]]** — similar to base file + contribution details
- [ ] Share payroll template with client and payroll vendor
- [ ] Set up all **[[eds|EDS]] layouts** early — before files arrive

---

## Phase 3 — Vendor Coordination

**Two parallel tracks:** Prior record keeper + Payroll vendor

### Prior Record Keeper Track
- [ ] Identify prior RK contact
- [ ] Send questionnaire (liquidity, TIK availability, test file timing)
- [ ] Send [[wire-instructions]] as early as possible (use default account if P3 not set up yet)
- [ ] Request test files
- [ ] Resend updated wire instructions ~1 week before liquidation (once P3 is fully set up)

See [[prior-record-keeper]]

### Payroll Vendor Track
- [ ] Identify payroll upload contact
- [ ] Set up **[[ftp-connection]]** — request from FTP team ASAP (large caseload)
- [ ] Provide FTP credentials to payroll contact
- [ ] Request test payroll file
- [ ] Test file through [[eds|EDS]] — review output
- [ ] Send clean file to [[internal-teams|Payroll Support Team]] for deeper validation
- [ ] Iterate until green light

> If automation isn't ready, client sends manual payroll files directly in the interim.

---

## Phase 4 — Mapping & Documentation

**Trigger:** TOA (Transfer of Assets) signed by client

### Steps
- [ ] Review [[toa]] — note column T (re-registering Y/N) for each fund
- [ ] If any fund has re-reg = Y → fill out re-registration form → send to [[matt-oconnell]] (time accordingly — ~10 business days before liquidation)
- [ ] Build **[[fund-mapping]]** template from TOA data — no test files needed
- [ ] Send fund mapping to COM, TC, QA for approval
- [ ] Once test files arrive: run source summaries → identify sources with money
- [ ] Build **[[source-mapping]]** from AQT source ID query + test file source codes
- [ ] Send source mapping to COM, TC, QA for approval
- [ ] Get approvals on both mappings ASAP — do not delay

---

## Phase 5 — Pre-Liquidation Prep

**Timing:** Days to weeks before liquidation date

### Steps
- [ ] Confirm [[dummy-participant]] (SSN 999-00-0000) exists in census (required for mapping conversions)
- [ ] Build **CONV file** skeleton — structure and fund list ready; totals filled in on liquidation day
- [ ] Update Matt O'Connell's share estimates using test files (for TIK)
- [ ] Day before liquidation: email [[internal-teams|Cashiering]] as wire heads-up
- [ ] Day before liquidation: email prior RK to confirm everything on track

See [[liquidation-day]] for Day-of detail

---

## Phase 6 — Liquidation Day

**The main event.** Sequence depends on [[conversion-types|conversion type]].

### All Types
- [ ] Email vendor in the morning for fund breakdown + total
- [ ] Notify Cashiering when vendor confirms wire sent (with expected total)
- [ ] Wait for Cashiering to confirm wire receipt + transfer reference number

### Cash Conversion
- [ ] Verify wire total matches breakdown total
- [ ] Move money to **Advanced Employer account** (P2/P3)
- [ ] Email all parties confirming wire received + posted to advanced employer

### Mapping Conversion
- [ ] Verify wire total matches breakdown total
- [ ] Create trans ref numbers in P2/P3 (one per fund)
- [ ] Fill totals into CONV file
- [ ] Verify dummy participant exists in census
- [ ] Run **Day of Wire** workflow in [[informatica]] (cannot test)
- [ ] Verify in P3 — dummy account should have balances; trades out

### Transfer In Kind
- [ ] Same as mapping but CONV file has re-reg = Y
- [ ] Day of Wire creates placeholders in P3 (no trades, no details yet)
- [ ] Shares will arrive at Fidelity accounts (Matt O'Connell's team processes)

See [[liquidation-day]] for full detail

---

## Phase 7 — Final Files & Posting

**Trigger:** Final files received from prior record keeper

### Steps
- [ ] Update Matt O'Connell's share estimates with final file totals (TIK — time-sensitive, do immediately)
- [ ] Build CIT balance file from final files
- [ ] Test CIT balance workflow in [[informatica]] (can test)
- [ ] Run participant balance workflow

### Cash Conversion
- [ ] Request Advanced Employer liquidation
- [ ] Run CIT balance workflow
- [ ] Post participant balances (Process Immediate + Batch → trades go out)
- [ ] Reverse dummy participant via ROC tool in P3

### Mapping Conversion
- [ ] Post participant balances (Online + No Hold → NO trades, books only)
- [ ] Reverse dummy participant via ROC tool in P3

### Transfer In Kind
- [ ] Post participant balances (Online + No Hold → NO trades)
- [ ] Shares already in place; books fill in Bill Remit detail

### All Types — Final Data
- [ ] Post **YTD contributions** by source
- [ ] Post **YTD comp** and **prior year comp** if needed
- [ ] Post **hours** (current and prior year) if applicable
- [ ] Post **deferral elections** (post BEFORE eligibility)
- [ ] Notify QA, TC, COM → wait for go-ahead
- [ ] Enable **eligibility** in P3 (per contributing source only)
- [ ] Run all queries and review results
- [ ] Build audit pack
- [ ] Update [[nbi]]

See [[final-files-processing]] and [[eligibility-and-deferrals]]

---

## Key Rules to Remember

1. **FTP and prior RK contact → as early as possible.**
2. **Fund mapping → as soon as TOA is signed.**
3. **Source mapping → as soon as test files arrive.**
4. **Matt O'Connell → not too early, not too late. Target: 12 business days before liquidation.**
5. **Deferrals before eligibility — always.**
6. **Day of Wire cannot be tested — triple-check CONV file.**
7. **EDS output must be read after every upload.**
8. **Dummy participant must exist in census before Day of Wire (mapping).**
9. **Process mode: Immediate+Batch for trades; Online+No Hold when no trades.**

## See Also

- [[conversion-types]]
- [[liquidation-day]]
- [[final-files-processing]]
- [[base-file]]
- [[toa]]
- [[fund-mapping]]
- [[source-mapping]]
- [[eligibility-and-deferrals]]
- [[p3]]
- [[informatica]]
