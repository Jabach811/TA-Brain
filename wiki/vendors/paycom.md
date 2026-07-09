---
title: "Paycom"
type: vendor
tags: [vendor, payroll]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# Paycom

Paycom is a high-specificity vendor: no test-file rhythm, PGP outbound, and careful loan-number handling.

## File format & naming

- Paycom decides whether they will accept the OBF for a specific client.
- Outbound uses a custom Paycom layout that follows the 1116 layout.
- Filename is specific: `payrollvendorfeed_plan_affiliate_mmddyyyy.csv`.
- Paycom generally does not do test files; they need to know when the live file will start.

## Deduction & loan codes

- Typical codes: 401K, 4ROTH, 401KC, 4ROTC, and 401L. Bonus codes may also exist.
- Prior to January 2026, Paycom did not accept loans on the file. Beginning January 2026, Paycom can accept loans.
- Before go-live, the client needs a report of outstanding loans so they can load Transamerica loan numbers to Paycom.
- The client updates the loan number in Paycom Form 2. Paycom drops the date portion at the beginning of the loan number when loading it.

## Stop rows & quirks

- For stop rows, Paycom typically leaves the field blank.
- Deferral effective date is current date.

## FTP & PGP

- All inbound files come through the global connection named PAYCOM; Paycom always pushes files to Transamerica.
- All outbound files to Paycom are PGP encrypted once live.

## See Also

- [[payroll-vendor-onboarding]]
- [[ftp-connection]]
- [[payroll-template]]
