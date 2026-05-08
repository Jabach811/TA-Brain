---
title: "Quality Assurance (QA / Quality Consultant)"
type: role
aliases: ["Quality Consultant", "QC", "Quality Control Consultant"]
tags: [role, qa, qc, audit, quality, validation, conversion]
created: 2026-04-14
updated: 2026-04-18
sources: 20
---

# Quality Assurance (QA / Quality Consultant)

Owns the audit catalog that validates every step of a plan conversion — from fund and source mapping through wire posting, default analysis, loan due diligence, and the final post-conversion audit.

## What This Role Does

QA (also referred to as Quality Consultant or QC, and historically Quality Control Consultant) is the verification layer that runs in parallel with the [[lm-dc]] and [[tc]] throughout a conversion. The role is defined by a broad, standardized audit catalog rather than ad-hoc review: each step of a conversion has a named audit with fixed inputs, outputs, and acceptance criteria. The QA Team Project Charter frames the role as performing conversion audits and controls across asset, allocation, deferral, and loan workflows, along with recordkeeping setup checks, DB plan setup, and retiree payment audits (source: `Quality Control page for Team Project Charter.md.txt`).

The audits fall into several families:

- **Mapping audits** — validate fund and source mappings before they are used in production. See [[fund-mapping-audit]] and [[source-mapping-audit]].
- **Asset transfer audits** — wire-day validation. See [[day-of-wire-audit]] and [[day-after-wire-audit]].
- **Record load / participant audits** — compare loaded participant data to prior-vendor files using the Final Audit Analyzer. See [[faa-balances]] and [[faa-allocations]].
- **Default analyses** — ensure auto-enroll and default-allocation populations are correctly set before first remittance and before DDOL/VRU goes live. See [[default-allocation-analysis]] and [[default-deferral-analysis]].
- **Loan analyses** — pre-conversion due diligence and post-conversion reconciliation. See [[pre-conversion-loan-analysis]] and [[post-conversion-loan-analysis]].
- **Go-live and post-conversion audits** — final takeover audit, PSD rebalance, outbound file release, welcome-kit samples, monthly reports. See [[final-takeover-audit]], [[psd-rebalance]], [[outbound-review]], [[welcome-confirm-samples]], [[monthly-reports-procedures]].
- **Governance** — CIT Audit Control Checklist, management walkthroughs, and the broader Diversified Client Integration Audit framework. See [[cit-audit-control]], [[cit-takeover-audit]], [[diversified-client-integration-audit]].

QA also produces the [[csr]] (Conversion Summary Report) at go-live — the Quality Consultant deliverable that [[com]] forwards to the client as part of the go-live close-out (source: `Conversion Summary Report Procedures.md.txt`).

Day-to-day QC work extends beyond conversions: TDF retirement age updates, target date chart inserts, deferral updates for terminated participants, Loan PoG maintenance, division code updates, and participant note management are all QC-owned ongoing tasks (source: `QC Tasks.md.txt`).

## Systems They Use

| System | Purpose |
|--------|---------|
| [[informatica]] | Runs FAA Allocation and Balance modules; also the target platform for migrating the legacy loan Access tool |
| [[aqt]] | SQL query tool for takeover audit queries, loan census queries, termination-date lookups |
| [[p3]] | Holds welcome/confirm samples; general plan administration lookups |
| [[odsp]] | Source for the OBF (Outbound File) Review SQL |
| [[roc-tool]] | Stored procedures used to produce welcome-confirm samples |
| [[jira]] | Triggers batch jobs for confirm-sample release |
| [[nbi]] | Source for PRS, CSR Stats, and CCC Plan monthly reports |
| [[trs]] | TRS balances feed the Fund Split Worksheet and FAA Balances audit |
| Access (legacy) | Post-Conversion Loan Analysis Tool, being retired in favor of [[informatica-loan-module]] |

## Who They Work With

| Team / Person | Nature of Relationship |
|---------------|-----------------------|
| [[lm-dc]] | Receives fund/source mappings for approval; clears eligibility; reviews audit pack; escalates discrepancies back to DC |
| [[com]] | Routed into client conversations as needed; hands [[csr]] to COM at go-live for forwarding to the client |
| [[tc]] | Often CC'd together on key communications; OBF Review findings go to TC; Missing Code Analysis reports are provided to TC |
| [[prod-support]] | Prod Support schedules the [[psd-rebalance]] once QA signs off on the final audit; QA also escalates data defects found during audits via AWD ticket |
| [[cashiering]] | Wire-day coordination — QA validates amounts posted against prior-vendor wire summaries |
| [[psc]] | PSC receives the plan post-conversion; QA audits PSC work after handoff |
| **Paul** | Quality Consultant — last name unknown |
| **Danny** | Quality Consultant — last name unknown |

## Key Handoffs

**Comes in:**
- Fund mapping, source mapping (from DC via COM) — triggers [[fund-mapping-audit]] and [[source-mapping-audit]]
- Eligibility notification from DC — QA gives the go-ahead before eligibility is enabled
- Prior-vendor wire summary — triggers [[day-of-wire-audit]]
- Loaded participant data — triggers [[day-after-wire-audit]], [[faa-balances]], [[faa-allocations]]
- Prior-vendor loan data — triggers [[pre-conversion-loan-analysis]]
- Post-load participant data — triggers [[post-conversion-loan-analysis]], [[default-allocation-analysis]], [[default-deferral-analysis]], [[final-takeover-audit]]
- Audit pack from DC — reviewed same day

**Goes out:**
- Mapping approvals back to DC
- Exception reports, discrepancy emails to DC
- Pre-conversion loan analysis summary to client (via COM)
- [[csr]] to COM at go-live
- PSD rebalance request to [[prod-support]]
- OBF review findings to [[tc]]
- Missing Code Analysis reports to [[tc]]

## What Other Teams Should Know

- QA is a small team (known members: Paul, Danny). Loop them in early — their calendar is the bottleneck on audit approvals.
- QA does not silently bless mappings. The [[fund-mapping-audit]] and [[source-mapping-audit]] have fixed review criteria (codes, names, tickers, CUSIPs, descriptor codes, vesting, withdrawal, SRC_I, contribution types). If data is missing, the audit stalls — this is not QA being slow; it is the audit failing the gate.
- The [[faa-balances]] and [[faa-allocations]] audits depend on clean fund mapping and source mapping. Fund splits can generate expected errors; the [[fund-split-worksheet]] exists specifically to resolve those without forcing manual FAA review (source: `Fund Split Worksheet Instructions.md.txt`).
- [[default-allocation-analysis]] and [[default-deferral-analysis]] must be completed **prior to first remittance and before DDOL/VRU access** — delaying them blocks participant activity (source: `Default Allocation Analysis Description.md.txt`).
- QA runs the [[final-takeover-audit]] at the end of a conversion and reconciles to Plan Sponsor and ER statements. The downstream [[psd-rebalance]] cannot be scheduled until QA's final audit is complete.
- QA's work underpins the [[audit-pack]] and the [[csr]]. Both are retrospective records — QA is not inventing them, but QA's audit outputs feed both.

## Open Questions

- Full last names for Paul and Danny
- Team size beyond Paul and Danny
- Day-to-day cadence when no conversion is in-flight (how much is ongoing QC tasks vs. audit work)
- Exact split between "Quality Consultant" and "Quality Control Consultant" titles — CTS documentation uses QC Consultant; Team Charter uses Quality Consultant
- Whether the same QA individual produces the [[csr]], runs the [[faa-balances]], and handles loan analysis, or whether there is internal specialization
- Whether QAs are assigned per-plan or per-audit-type
- How QA coordinates with [[prod-support]] when an audit finds a data defect requiring direct DB correction

## See Also

- [[lm-dc]]
- [[com]]
- [[tc]]
- [[internal-teams]]
- [[audit-pack]]
- [[csr]]
- [[cit-audit-control]]
- [[cit-takeover-audit]]
- [[final-takeover-audit]]
- [[fund-mapping-audit]]
- [[source-mapping-audit]]
- [[day-of-wire-audit]]
- [[day-after-wire-audit]]
- [[faa-balances]]
- [[faa-allocations]]
- [[default-allocation-analysis]]
- [[default-deferral-analysis]]
- [[pre-conversion-loan-analysis]]
- [[post-conversion-loan-analysis]]
- [[psd-rebalance]]
- [[outbound-review]]
- [[welcome-confirm-samples]]
- [[fund-split-worksheet]]
- [[monthly-reports-procedures]]
- [[retiree-payment-audit]]
- [[missing-code-analysis]]
- [[diversified-client-integration-audit]]
