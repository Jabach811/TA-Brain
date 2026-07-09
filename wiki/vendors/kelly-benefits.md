---
title: "Kelly Benefits"
type: vendor
tags: [vendor, payroll]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# Kelly Benefits

Kelly Benefits has multiple platforms — identify the platform first before assuming this is large-market payroll work.

## Platform & layout

- Kelly Benefits has three platforms. The Payroll platform is Paystart, not large market.
- Advisory and the Remaining platform are large-market paths.
- Large-market outbound requires a 1116 custom layout.
- Uses Transamerica loan numbers.

## File naming

- Filename begins with `Payrollvendorfeed` and may include division if needed (e.g. `Payrollvendorfeed_QK63296_014_TWC_11262025.csv`).

## FTP & PGP

- Files are PGP encrypted and sent to the Kelly Benefits PGP folder.
- Make sure the archive folder exists before go-live.
- The PGP process pulls from the vendor folder, encrypts, sends, and archives the encrypted file.

## See Also

- [[payroll-vendor-onboarding]]
- [[ftp-connection]]
- [[payroll-template]]
