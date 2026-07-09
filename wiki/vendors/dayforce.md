---
title: "Dayforce / Ceridian"
type: vendor
tags: [vendor, payroll]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# Dayforce / Ceridian

Dayforce/Ceridian has enough helper-table and mapping nuance that it should be treated as a custom-path vendor until proven otherwise.

## File format & naming

- Outbound usually uses a custom Dayforce/Ceridian layout, though some cases can use the Transamerica standard format — confirm on the call.
- The file is CSV, not XML.

## Deduction & loan codes

- Dayforce must provide deduction codes and loan codes (vendor loan codes).
- If more than one loan is allowed, seed loan deduct_c with Dayforce codes.
- Default effective dates: election effective date for deferrals, first loan repayment date for loans. Current date can also be sent if needed.

## IDs & quirks

- The Dayforce layout sends EE ID rather than SSN — make sure the inbound file to Transamerica includes that ID. Dayforce calls it EmployeeXrefCode.
- Ask whether they use ExpressionCodeName and ExpressionValue; if yes, get the required Expression Code Name and mapping details up front.
- When submitting the tech ticket in Jira, include "Dayforce/Ceridian" or "Ceridian" in the description because helper tables are labeled Ceridian.

## FTP & PGP

- Transamerica pushes files to Dayforce, so Dayforce must provide SFTP credentials.
- Dayforce usually provides SFTP Test or Configure credentials during testing, then production credentials for go-live — ask for production credentials early.
- PGP applies sometimes.

## See Also

- [[payroll-vendor-onboarding]]
- [[ftp-connection]]
- [[payroll-template]]
