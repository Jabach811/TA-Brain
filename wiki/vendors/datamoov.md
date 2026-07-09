---
title: "Datamoov"
type: vendor
tags: [vendor, payroll]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# Datamoov

Datamoov large-market work is different from Paystart mid-market — be specific about market, template, naming, and SFTP route.

## File format & naming

- Large-market incoming uses the standard large-market specifications, not the Paystart mid-market format. Incoming files require testing.
- Test filename: `Plan number_affiliate_TEST.csv` or `.txt` (e.g. `QK63283_00061_TEST.csv`).
- Production filename: `Plan number_affiliate.csv` or `.txt` (e.g. `QK63283_00061.csv`).
- Outbound uses the 1116 format; no test files needed for outbound.
- Outbound filename begins with `payrollvendorfeed` (e.g. `payrollvendorfeed_QK63283_061_MMDDYYYY.csv`).

## Deduction & loan codes

- Typical codes: 401K for pretax, 4ROTH for Roth, 401L for loans.
- Catch-up or bonus deferrals may require additional codes.
- Uses Transamerica loan numbers.

## FTP & quirks

- Incoming SFTP comes through the large-market global connection DETAMOOV-LM; submit the forwarding-rule request.
- Outbound: the client opens a ticket with Datamoov to create SFTP on their platform and provide credentials; Transamerica pushes the outbound file to Datamoov.
- The DETAMOOV-LM outbound folder should only be used for Munson plan TA080504/paygroup MUN — it was built before the move to 1116.
- No PGP.

## See Also

- [[payroll-vendor-onboarding]]
- [[ftp-connection]]
- [[payroll-template]]
