---
title: "Source: New Plan Submission Package — CCCS Document"
type: source
tags: [subpack, cccs, plan-setup, conversion, source]
created: 2026-04-16
updated: 2026-04-16
sources: 1
---

# Source: New Plan Submission Package — CCCS Document

Raw template for the CCCS (Client Conversion Configuration Sheet) submission package — the internal TA document completed once per plan at the start of a new conversion.

## Summary

This is the raw template for the CCCS portion of the New Plan Submission Package. It captures all plan-level configuration decisions made at onboarding: plan type, trustee structure, payroll setup, conversion strategy, services included, loan/withdrawal options, and contact information. One package is completed per plan.

## Key Claims

- A single submission package must be completed per plan.
- Plan types supported span 401(k), 401(a), 403(b), 457(b), 457(f), and Corporate NQDC.
- All 457(f) plans use the IDP document type; Transamerica does not draft these.
- System effective date should generally be one month prior to the plan effective date.
- Auto-increase should not be offered for NQDC or 457 plans.
- Market segmentation is categorized as Large or Mega.
- Trustee options include SSBT (State Street Bank & Trust), Self-Trust, or Other (trust agreement required).
- Payroll submission methods are PSD (Plan Sponsor Direct) or FTP; funding methods are ACH or Wire.
- Asset transfer strategies: Plan Level Conversion, Participant Directed, or Hybrid.

## Key Sections

### Part 1 — Employer / Plan Information
Plan type, MEP/PEP role, account number, market segmentation, public company status, SSO, plan status, document type (Volume Submitter or IDP).

### Plan Set-Up Information
Plan effective date, limited access period (start/end), system effective date, services included (enrollments, deferrals, allocations, beneficiary data), other TRS plans, loan aggregation settings.

### Contacts
Trustee information, executive contact, administrator contact, TPA contact, advisor/consultant details (3(38) investment manager, PSD user ID).

### Automatic Enrollment & Deferrals
Auto-enrollment type (being added vs. existing), auto-increase settings, increase date.

### Portfolio & Advice Services
PortfolioXpress (Lifetime/Retirement, Risk Preference Overlay), Custom PortfolioXpress/Custom Model Portfolios (5 bps fee, quarterly rebalance), Managed Advice, Advisor Managed Advice.

### Loans & Withdrawals
Online withdrawal types, loan PoG options, takeover loan method (Payroll/Coupon/EFT).

### QDIA Strategy
Default fund, PX re-enrollment options, internal QDIA meeting requirement.

### Payroll Setup
Payroll type (in-house vs. vendor), frequency, submission method (PSD/FTP), funding method (ACH/Wire), file format (Excel/CSV).

### Conversion Strategy Overview
Prior vendor information (contacts, assets, blackout dates), asset transfer strategy (Plan Level / Participant Directed / Hybrid), case transition worksheet (loans, auto-enrollment, outsourcing, fund pricing).

### 457(b)/457(f) and Corporate NQDC Services
Eligibility, deferrals, vesting, distributions, tax reporting, enrollment/deferral tracking.

## Entities Mentioned
- [[ssbt]] (State Street Bank & Trust — trustee option)
- [[subpack]] (the submission package this document is part of)
- [[eds]]
- [[wx]] (PSD = Plan Sponsor Direct / WX)

## Concepts Mentioned
- [[conversion-types]] (Plan Level, Participant Directed, Hybrid)
- [[ftp-connection]] (FTP payroll submission)
- [[eligibility]] (eligibility services)
- [[deferrals]] (deferral setup)
- [[cccs-submission-package]] (concept page for this document type)

## Contradictions / Open Questions
- CCCS acronym not spelled out in the source. Likely "Client Conversion Configuration Sheet" or similar — confirm with team.
- Several fields in the raw template show "(Unclear in source)" — these are blank form fields by design, not missing data.
- "Limited Access Period" is referenced in plan setup but not documented elsewhere in the wiki — may need a glossary entry.

## See Also
- [[subpack]]
- [[conversion-types]]
- [[cccs-submission-package]]
- [[ftp-connection]]
- [[eligibility]]
