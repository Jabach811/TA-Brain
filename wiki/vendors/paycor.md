---
title: "Paycor"
type: vendor
tags: [vendor, payroll]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# Paycor

Paycor is often really a PayKonnect route under the covers — name both pieces clearly.

## Inbound

- Paycor uses [[paykonnect|PayKonnect]]. There is a global inbound and outbound connection under PAYKONNECT, but SFTP forwarding-rule work is still needed.
- Paycor has the file specifications built and selects the large-market template for Transamerica, then maps plan-specific information.
- Ask whether they can provide a test file before the live date — sometimes the first live file is the test file.
- Unique plan features may require discussion and configuration.

## Outbound

- Paycor accepts the standard outbound file; custom outbound is usually not needed.
- Uses Transamerica loan numbers. No PGP.
- If the client does not know Paycor runs through PayKonnect, it is okay to explain that Paycor uses PayKonnect as a third-party integrator.

## See Also

- [[payroll-vendor-onboarding]]
- [[ftp-connection]]
- [[payroll-template]]
