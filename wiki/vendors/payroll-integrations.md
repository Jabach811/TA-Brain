---
title: "Payroll Integrations"
type: vendor
tags: [vendor, payroll]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# Payroll Integrations

Payroll Integrations (PI) is a third-party payroll provider with a special relationship with Transamerica — do not work it the same way as ADP, UKG, Paylocity, or Paycor.

## Special path

- For new requests, inbound specs go to the inbound/outbound file team to reach out to PI. A call is not needed; specs route through Jen.
- PI works with the client on data that needs to be updated in the payroll vendor.
- Dedicated process documentation is still pending after Jen aligns with Earl and Stacy.

## File format & naming

- PI takes the 1116 layout and is always custom for OBF.
- PI maps the codes Transamerica sends to the appropriate vendor codes for each client.
- Filename must differentiate large market from mid-market: `Plan number_affiliate_lmpayroll_mmddyyyy.csv`.
- No test files needed; PI needs the date the files go live.

## Loans & data quirks

- Send PI a report with loan numbers before go-live. Uses Transamerica loan numbers.
- PI sends employee ID on the file; for ADP clients this pulls from Associate ID.
- When someone is rehired, the PI API sends the rehire date but drops the term date — during base data review, confirm prior term dates for rehires are already available.

## FTP & PGP

- The global connection is PAYROLLINTEGRATIONS. No PGP.

## See Also

- [[payroll-vendor-onboarding]]
- [[ftp-connection]]
- [[payroll-template]]
