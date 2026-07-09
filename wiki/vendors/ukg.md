---
title: "UKG"
type: vendor
tags: [vendor, payroll]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# UKG

UKG splits sharply between inbound ULTIMATE routing and outbound Turnkey/non-Turnkey handling.

## FTP

- All incoming UKG files come through the global connection named ULTIMATE. ULTIMATE is inbound only and does not contain an Inbox folder.
- For Turnkey, Transamerica always pushes to UKG, so UKG must provide credentials.
- If not Turnkey, UKG can pull from Transamerica's Inbox folder; push can also be supported.
- No PGP.

## File format & naming

- UKG Turnkey can use standard or custom formats, but cannot handle bonus deferrals or after-tax deferrals.
- If Turnkey, the filename needs `payrollvendorfeed` at the beginning.
- If not Turnkey and custom: `plan number_affiliate_UKG_MMDDYYYY.csv`. If not Turnkey and standard, no rename is needed unless UKG requires it.

## Loans

- UKG uses the Transamerica loan number.
- Before the live date, send UKG a file of created loans so they can seed their system.
- UKG stores the seeded loan number in the Memo field.

## See Also

- [[payroll-vendor-onboarding]]
- [[ftp-connection]]
- [[payroll-template]]
