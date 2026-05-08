---
title: "Pre-Conversion Loan Analysis"
type: concept
tags: [concept, audit, qa, loans, conversion, due-diligence]
created: 2026-04-17
updated: 2026-04-17
sources: 5
---

# Pre-Conversion Loan Analysis

The QA due-diligence process that reviews outstanding participant loans before a plan converts, identifies loans past maturity or otherwise problematic, and delivers a structured summary to the plan sponsor.

## Definition

Pre-Conversion Loan Analysis is a [[qa]]-owned procedure that takes prior-vendor loan data, enters it into the Pre-Conversion Loan Analysis Worksheet, populates formulas, reviews next-payment-due dates, and reports loans past due by more than 30 days (source: `Pre-Conversion Loan Analysis Procedures.md.txt`). The deliverable is a client-facing summary plus a formal review email asking the plan sponsor to resolve problem loans before conversion.

## Why It Matters

Loans that cross a conversion in a bad state create ongoing compliance and operational headaches: IRS default-timing rules apply, VCP remediation may be needed, and once the loan is on TA's books a correction requires coordinated action between TA, the client, and (sometimes) the IRS. Catching and resolving bad loans *before* the conversion is far cheaper than doing so after.

## Evidence / Examples

**Two data-intake options** (source: `Pre-Conversion Loan Analysis Procedures.md.txt`):

**Option 1 — requires a known maturity date:**
- Outstanding principal
- Repayment amount and frequency
- Interest rate
- Actual maturity date
- Loan default date (if available)

**Option 2 — requires issue date and term:**
- Outstanding principal
- Repayment amount and frequency
- Interest rate
- Issue date
- Loan term (months or years)
- Loan default date (if available)

**Client deliverables:**

- **Summary to client v1** (`Pre-Conversion_Loan_Analysis_Summary_to_Client.md.txt`) — provides plan sponsor with analysis; covers Next Repayment Due Date and IRS loan default timing rules; asks sponsor to review loans past maturity or behind and resolve with the prior carrier before conversion.
- **Summary to client v2** (`Pre-Conversion_Loan_Analysis_Summary_to_Client - 2.md.txt`) — refined version grouping loans by maturity status into two tabs: Loans Past Maturity and Loans Not Past Maturity.
- **Client review email** (`Pre-Conversion loan review email to client.md.txt`) — communicates findings and required actions; covers default rules and VCP considerations.

**Legacy method:** The `Steps in creating the Takeover Loan Analysis-old way.md.txt` procedure documents the pre-automation workflow — adding an effective date to the loan worksheet, calculating payments until maturity and catch-up amounts, retrieving termination dates via [[aqt]], and validating loan status. Retained for reference; replaced by the current worksheet and by the [[informatica-loan-module]] on the post-conversion side.

## Counterarguments

The analysis relies on prior-vendor loan data quality. Missing issue dates, unclear amortization, or bad default-date records can all force manual reconstruction — even Option 1 vs. Option 2 choice is a response to incomplete vendor data, not a design preference.

## Related Concepts

- [[post-conversion-loan-analysis]]
- [[loan-coupon-process]]
- [[informatica-loan-module]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[com]]
- [[cit-takeover-audit]]
