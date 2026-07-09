---
title: "ExponentHR"
type: vendor
tags: [vendor, payroll]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# ExponentHR

ExponentHR currently does not support a full 360 inbound/outbound setup with Transamerica — treat it as inbound SFTP only.

## Handling

- ExponentHR sends the payroll file to Transamerica by SFTP; gather their SFTP details for inbound setup.
- Outbound files are the standard files posted to WX; the client downloads them and makes the updates manually.
- In some cases, ExponentHR contacts can help the client use an import file to load deferrals and loans instead of entering each item by hand.

## See Also

- [[payroll-vendor-onboarding]]
- [[ftp-connection]]
- [[payroll-template]]
