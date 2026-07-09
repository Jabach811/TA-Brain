---
title: "Reversal Process"
type: troubleshooting
tags: [process, reversal, awd, correction, prod-support]
created: 2026-04-16
updated: 2026-06-25
sources: 1
status: current
---

# Reversal Process

How to reverse an erroneous transaction in [[p3]]. Both a Reversal Form submission and a Reversal AWD ticket are required — in that order.

## Overview

A reversal corrects a transaction that was processed in error. The current process (effective **March 6, 2026**) replaces the legacy Plan Correction Checklist with a **Reversal Form**. The form generates an automated email whose contents must be pasted into the AWD ticket. Both steps are mandatory and sequential.

## Trigger

Any of the following, once confirmed as an error:
- Booking error (see [[booking-assets]]).
- Day of Wire processing error (see [[liquidation-day]]).
- Loan processing error (e.g., loans re-amortized when they should have been reloaded, or vice versa).
- Any transaction posted in error that cannot be backed out by ordinary correction tools.

**Before submitting:**
- Closed funds must be addressed.
- Funds needing to be returned, stopped, or voided must be handled.

## Steps

### 1. Submit the Reversal Form — DC
Navigate to the Reversal Form (link maintained in DC team resources). Complete all fields:

| Field | Notes |
|-------|-------|
| CSD screen info | Loan case number / affiliate, plan name, participant name or "Multiple" |
| Total reversal amount | Drives approval level |
| Final approval level | See Approval Levels below |
| Transaction type | Loan, remit, etc. |
| Trans ref number(s) | Of the transactions being reversed |
| SSN(s) | Of the affected transactions |
| Responsible party | Transamerica or external |
| Confirmation checkboxes | Funds returned/stopped/voided, AWD ticket to follow |

Click **Submit**.

The form captures the core transaction and control data the reversal team needs:
- what is being reversed, including transaction type, transaction reference number, and loan number if applicable
- who is responsible: Transamerica or an external party
- what happened and what correction is needed
- whether reprocessing is recordkeeping-only with no payment issued
- whether payments were applied and whether a loan was re-amortized, deemed, or offset
- whether voice / DDOL, closed funds, current-year correction, prior-year correction, or Reverse IC applies

### 2. Copy the Automated Email — DC
An email arrives from `slasrever@transamerica.com`. Near the bottom, locate the block labeled **"Information for reversal team"**.

**Copy the entire block.** It must be pasted verbatim into the AWD ticket comments.

### 3. Open the Reversal AWD Ticket — DC
The AWD ticket is still required — the form alone does not initiate the reversal. Open the ticket using the transaction type (e.g., "Loan" for loan reversals).

### 4. Paste the Email Block into AWD Comments — DC
Paste the copied "Information for reversal team" block into the ticket comments. This is what the reversal team works from.

### 5. Attach Supporting Documents — DC
Any documentation needed to evidence the error (screenshots, earlier tickets, email threads). Submit the ticket.

### 6. Reversal Team Works the Ticket — Prod Support
[[prod-support]] executes the database corrections via AWD. The DC's part is done after submission; downstream processing is unchanged from the old workflow.

## Approval Levels

| Total Reversal Amount | Approval Required |
|----------------------|-------------------|
| Up to $50,000 | Standard |
| $50,000 – $150,000 | Manager |
| Over $150,000 | Higher — confirm with manager |

## Handoff Points

| # | From → To | What Moves | Risk |
|---|-----------|------------|------|
| 1 | DC → Reversal Form system | Structured form data | Missing fields → form cannot generate email block |
| 2 | Reversal Form → DC inbox | Automated email with paste block | Email missed → AWD ticket lacks the block, reversal team rejects |
| 3 | DC → AWD | Reversal ticket with pasted block + attachments | Form submitted but no AWD ticket → reversal never executed |
| 4 | AWD → [[prod-support]] | Ticket + context | Standard AWD flow from here |

## Timing / Deadlines

- **Form before ticket.** The automated email is required input for the ticket.
- **Same-day submission recommended** once the error is confirmed — every day the error sits in the books complicates downstream processing.
- **Prior closed-fund and returned-fund steps must be complete** before submission.

## Failure Modes

- **Filling out the old Plan Correction Checklist.** Retired as of 03/06/26. Reversal team will not accept it.
- **Submitting AWD ticket without the form.** No structured paste block → ticket rejected.
- **Submitting the form without the AWD ticket.** Form alone does not execute the reversal.
- **Copying only part of the email block.** Reversal team needs the full block — partial text breaks their downstream parsing.
- **Missing approval tier.** Amount crossing a tier boundary without higher-tier sign-off stalls the ticket.
- **Voice / DDOL, closed funds, or re-amortized loans not flagged.** The form has explicit checkboxes for these — skipping them creates hidden correction debt.

## What Has Not Changed

- AWD ticket is still required.
- Closed funds must be addressed before proceeding.
- Returned / stopped / voided fund handling still precedes submission.
- The reversal team's downstream process is unchanged.

## Evidence / Examples

March 9, 2026 example — loan reload error:
- Responsible party: Transamerica.
- Issue: ticket requested loans be re-amortized; DC reloaded them instead.
- Resolution: reverse loans and payments. Loans were not re-amortized and had no payments applied.
- Approval: Manager level (total ≈ $49,822).

## See Also

- [[prod-support]]
- [[liquidation-day]]
- [[booking-assets]]
- [[final-files-processing]]
- [[dc-onboarding-workflow]]
- [[roles/lm-dc]]
- [[plan-conversion-handoffs]]
