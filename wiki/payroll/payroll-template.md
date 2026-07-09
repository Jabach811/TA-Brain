---
title: "Payroll Template"
type: payroll
tags: [document, payroll, template, vendor, contributions]
created: 2026-04-14
updated: 2026-07-08
sources: 3
status: current
---

# Payroll Template

The file format specification provided to clients and payroll vendors for ongoing payroll contribution uploads after conversion.

## Overview

The payroll template defines exactly how payroll files must be structured to be accepted by TransAmerica's systems. It is shared with both the client (plan sponsor) and the payroll vendor simultaneously. Payroll vendors adjust their workflows to output files in this format.

## Structure

**First ~75%:** Identical to the [[base-file]] census section
- Participant demographics
- Status and eligibility info
- Employee identifiers

**Remaining ~25%:** Contribution and payroll-specific data
- Contribution amounts by source (one column per source)
- Loan payment amounts (if applicable)
- Hours worked (if the plan tracks hours)
- Compensation for the period
- Payroll period start date
- Payroll period end date
- Check date

## Setup Process

1. DC builds payroll template in parallel with the base file (same meeting/timing)
2. Shared with client and payroll vendor simultaneously
3. Meeting with payroll vendor: vendor reviews template, asks questions, adjusts their output workflow
4. DC requests a **test payroll file** from the vendor as soon as they're ready
5. DC tests file through [[eds]] — reviews warnings and errors
6. If issues: send feedback to vendor → new test file → repeat
7. Clean file sent to [[payroll-support|Payroll Support Team]] for deeper validation
8. Green light from Payroll Support → payroll setup complete

> Full vendor-side narrative — intro email, kickoff meeting flow, OnePayroll handoff, client demo, auto-sweep timing — lives in [[payroll-vendor-onboarding]].

## File Naming Convention

Every payroll file uploaded through FTP (or sent manually) must follow:

```
<case#>_<contract>_<affiliate>.xls
```

The system catches on the prefix — wrong name and the file isn't picked up. A timestamp gets appended automatically on receipt to prevent duplicates, so the sender only controls the prefix.

## EDS Layout Dependency

Before testing any payroll file in EDS, the DC must set up the payroll file layout in EDS ("P3 to EDS" module). This should be done early — before test files arrive.

## FTP Dependency

Once the payroll file format is approved, the payroll vendor needs a way to deliver files automatically. This is handled via the [[ftp-connection]]. The payroll vendor uploads to the FTP account; the system picks up the file and processes it.

## Manual Payroll Filing (Interim)

If FTP automation isn't ready by conversion date, the client sends payroll files manually (secure transfer directly to TransAmerica). This interim state can sometimes last weeks or months.

> Keep track of which plans are on manual payroll vs. automated FTP. Manual files require more active monitoring.

## Field Validation Rules

Field-by-field checks used during test file review, current as of the 7/29/2025 LM DC process update (from the payroll/OBF knowledge-transfer guide). Walk each field on the incoming test file against these.

### Identifiers and demographics

- **SSN** — no missing SSNs, no duplicates; watch for dummy patterns like 111-11-1111.
- **Division / Location Code** — must be 4-digit (numbers or alpha). Ask the client what group each division represents. Codes must be set up on the system before any data load — pass to TC for setup.
- **Class Code** — no missing codes; question any that don't match plan provisions.
- **First / Last Name** — 30-character limit each, present for everyone. Over-limit names get cut off on mailings — flag to client.
- **Middle Initial** — only the first letter loads; tell the client if they send full middle names.
- **Birth Date** — no missing dates; question anyone under 18.
- **Gender** — M or F only; blanks fine if unknown.
- **Marital Status** — S, M, D, or W only. Confirm it's true marital status, not tax filing status.

### Dates

- **Hire Date** — present for everyone; use original hire date in most cases (legacy mergers sometimes loaded adjusted service date here).
- **Termination Date** — must be a true termination, not a transfer date. Once reported on a file, the client must keep reporting it on every subsequent file or the system loses it.
- **Payroll Period Start/End and Paycheck Date** — required, in an accepted date format.

### Address and contact

- **Address** — home address, not work. Missing is loadable but flag it in review. State is 2-letter; zip required except international.
- **Phone numbers** — uniform format across all rows. No 1+ prefix, no extensions, no separated area code. Acceptable: `(319)123-0000` or `3191230000`.
- **Email** — personal preferred, company works; EDS flags unacceptable extensions.

### Codes and indicators

- **Payroll Frequency** — TA format only: `12` = monthly, `24` = semi-monthly, `26` = semi-weekly, `52` = weekly.
- **HCE code** — Y or N only. **Insider Investor Code** — 1, 2, or 3 only. **Language Code** — 00 or 01 only. **Termination Reason Code** — 0–3 only (whether required is set by the Outsourcing Checklist).
- **Single Sign On ID** — required if the plan isn't using SSN or employee number.

### Compensation and contributions

> The most common error: **YTD instead of per-period reporting.** For every contribution and compensation field, confirm the value is per-period. If the client reports YTD by accident, every number is wrong.

- **Current Plan Compensation** must be ≤ Gross Compensation. If the client reports the same value in both, confirm.
- If compensation is required and hours are missing while comp is reported, EDS kicks out an error.
- Date-field questions go to the **client**, not the payroll vendor — only the client can say "date 6 is hire date."

## Format and Template

- **Standard TA template** — DC does not build from scratch. Trimmed and tailored per client details.
- **Accepted formats:** All (CSV, Excel, fixed-width). Excel is preferred.
- **Sources per template:** One to many. Practical limit is around 10 sources on one template.

## Post-Conversion Source Changes

Adding new sources to a payroll template after conversion is **not the DC's job**. Account Managers handle that.

## Multiple Payroll Vendors

If a plan has multiple payroll vendors: DC handles it "as best as we can" — no single standard process.

## See Also

- [[payroll-vendor-onboarding]]
- [[base-file]]
- [[ftp-connection]]
- [[eds]]
- [[source-mapping]]
- [[dc-onboarding-workflow]]
