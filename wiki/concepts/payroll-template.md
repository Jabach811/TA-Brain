---
title: "Payroll Template"
type: concept
tags: [document, payroll, template, vendor, contributions]
created: 2026-04-14
updated: 2026-04-14
sources: 2
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
7. Clean file sent to [[internal-teams|Payroll Support Team]] for deeper validation
8. Green light from Payroll Support → payroll setup complete

## EDS Layout Dependency

Before testing any payroll file in EDS, the DC must set up the payroll file layout in EDS ("P3 to EDS" module). This should be done early — before test files arrive.

## FTP Dependency

Once the payroll file format is approved, the payroll vendor needs a way to deliver files automatically. This is handled via the [[ftp-connection]]. The payroll vendor uploads to the FTP account; the system picks up the file and processes it.

## Manual Payroll Filing (Interim)

If FTP automation isn't ready by conversion date, the client sends payroll files manually (secure transfer directly to TransAmerica). This interim state can sometimes last weeks or months.

> Keep track of which plans are on manual payroll vs. automated FTP. Manual files require more active monitoring.

## Format and Template

- **Standard TA template** — DC does not build from scratch. Trimmed and tailored per client details.
- **Accepted formats:** All (CSV, Excel, fixed-width). Excel is preferred.
- **Sources per template:** One to many. Practical limit is around 10 sources on one template.

## Post-Conversion Source Changes

Adding new sources to a payroll template after conversion is **not the DC's job**. Account Managers handle that.

## Multiple Payroll Vendors

If a plan has multiple payroll vendors: DC handles it "as best as we can" — no single standard process.

## See Also

- [[base-file]]
- [[ftp-connection]]
- [[eds]]
- [[source-mapping]]
- [[dc-onboarding-workflow]]
- [[internal-teams]]
