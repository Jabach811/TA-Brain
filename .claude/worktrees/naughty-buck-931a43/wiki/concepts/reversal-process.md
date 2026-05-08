---
title: "Reversal Process"
type: concept
tags: [reversal, awd, process, correction, transactions]
created: 2026-04-15
updated: 2026-04-15
sources: 1
---

# Reversal Process

The procedure for reversing an erroneous transaction in P3. As of March 6, 2026, the old Plan Correction Checklist is replaced by a new Reversal Form submitted to a dedicated email address before the AWD ticket is created.

## Definition

A reversal corrects a transaction that was processed in error. It requires both a Reversal Form submission (new as of 03/06/26) and a Reversal AWD ticket. The form generates an automated email whose content is pasted into the AWD ticket comments. The two steps are mandatory and sequential.

## Why It Matters

Reversals affect participant accounts and plan assets. They require approval at the appropriate level based on dollar amount, and the responsible party must be identified. Getting the process wrong — including skipping the new form — causes delays because the reversal team lacks the structured information they need.

## New Process (Effective March 6, 2026)

> "When submitting a reversal we no longer need to fill out the Plan Correction Checklist. As of 03.06.26 you'll need to use the form below."

### Step 1 — Submit the Reversal Form
- Navigate to the **Reversal Form** (link maintained in the DC team resources)
- Complete all fields:
  - CSD screen information (loan case number/affiliate, plan name, participant name or "Multiple")
  - Total reversal amount
  - Final approval level (based on amount — see Approval Levels below)
  - Transaction type (loan, remit, etc.)
  - Trans ref number(s) of the transaction to be reversed
  - SSN(s) of the transaction(s)
  - Responsible party (Transamerica or other)
  - Confirmation checkboxes (funds returned/stopped/voided, AWD ticket to be submitted)
- Click **Submit**

### Step 2 — Copy the Automated Email Response
- An automated email from `slasrever@transamerica.com` will arrive
- Near the bottom of the email, find the block labeled **"Information for reversal team"**
- **Copy this entire block** — it must be pasted into the AWD ticket comments

### Step 3 — Submit the Reversal AWD Ticket
- The AWD ticket is still required — the form alone does not initiate the reversal
- Open the AWD reversal ticket using the appropriate transaction type (e.g., "Loan" for loan reversals)
- Attach any required supporting documents
- **Paste the text block from the automated email into the AWD comments**
- Submit the ticket

## Approval Levels

| Total Reversal Amount | Approval Level |
|----------------------|----------------|
| Up to $50,000 | Standard |
| $50,000 – $150,000 | Manager |
| Over $150,000 | (higher approval — confirm with manager) |

## Reversal Form Fields Reference

The form captures:
- **What is being reversed:** transaction type, trans ref number(s), loan number(s) if applicable
- **Who is responsible:** Transamerica or external party
- **Nature of the error:** description of what happened and what needs correction
- **Whether reprocessing is for recordkeeping only** (no payment being issued)
- **Whether payments have been applied**, whether loan has been re-amortized, deemed, or offset
- **Whether voice/DDOL is affected**
- **Whether closed funds are impacted**
- **The correction year** (current year vs. prior year)
- **Reverse IC:** yes/no

## What Has Not Changed

- The **Reversal AWD ticket** is still required
- Closed funds must be addressed before proceeding
- Funds that need to be returned/stopped/voided must be handled before the reversal is submitted
- The reversal team's downstream process is unchanged — they receive the AWD item and work it

## Old Process — Retired

The **Plan Correction Checklist** was the former document used to initiate reversals. It is no longer required or used as of 03/06/26.

## Evidence / Examples

From the notebook (March 9, 2026 entry), a sample reversal form response for a loan reload error:
- Responsible Party: Transamerica
- Issue: A ticket was submitted to re-amortize loans. The DC instead reloaded the loans.
- Resolution needed: Reverse loans and payments; loans were not re-amortized and had no payments applied.
- Approval: Manager level (total ~$49,822)

## Related Concepts

- [[prod-support]] — Production Support team; executes AWD-ticketed database corrections
- [[liquidation-day]] — Day of Wire processing errors that may require reversal
- [[booking-assets]] — Booking errors are a common reason for reversal

## See Also

- [[prod-support]]
- [[liquidation-day]]
- [[booking-assets]]
- [[lm-dc]]
- [[dc-onboarding-workflow]]
