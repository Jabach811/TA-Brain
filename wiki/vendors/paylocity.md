---
title: "Paylocity"
type: vendor
tags: [vendor, payroll]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# Paylocity

Paylocity has a relatively clear large-market path, but loan seeding and inbound readiness still matter.

## File format & naming

- Outbound uses the Paylocity standard specification/1116 layout.
- Normal naming is `Case_Affiliate_Paylocity_MMDDYYYY.csv`, but divisions or special requests can change it.
- Paylocity typically does not do test files unless the client specifically requests them.
- On the call, confirm they are using the Paylocity layout, the live timing, and whether loans need to be seeded.

## Loans

- Loans need to be seeded at Paylocity with the Transamerica loan number.
- Paylocity needs first repayment date as the effective date on the file.

## Quirks

- Paylocity will not approve the outbound file to begin until the inbound file is all set.
- Verify the plan ID has the dash in Paylocity setup (e.g. `TA069932-00033`).

## FTP & PGP

- Global SFTP connection is PAYLCTY. No PGP.

## See Also

- [[payroll-vendor-onboarding]]
- [[ftp-connection]]
- [[payroll-template]]
