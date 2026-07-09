---
title: "ADP"
type: vendor
tags: [vendor, payroll]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# ADP

Large payroll vendor where terminology and platform routing matter — keep ADP pointed at large-market/MR Report work, not Mid-Market, Paystart, or Blackbox.

## File format & naming

- Outbound is CSV only. Most plans use custom ADP Generic, especially with percent and dollar elections or separate catch-up elections.
- If ADP is using Next Gen, confirm filenames before SFTP setup.
- Typical outbound filename: `Plan number_affiliate_ADP_MMDDYYYY.csv` (e.g. `QK63293_00001_ADP_MMDDYYYY.csv`).
- Standard ADP reports usually lack email addresses and multiple phone numbers, so the client may need a monthly supplemental report.

## Deduction & loan codes

- Get deduction codes for deferral sources, catch-up if applicable, loans, and any company/parent/paygroup code ADP wants on the file.
- ADP recycles loan numbers, so loans usually need custom handling even when ADP accepts the standard format.
- If more than one loan is allowed, get an ADP report close to go-live with SSN, loan code, and repayment amount so loans can be seeded and loan deduct_c logic enabled.

## Stop rows & quirks

- ADP Generic stop rows use a tilde before or after the deduction, leave the amount/percentage blank, and do not send zeroes.
- Next Gen differs: no company code, no tilde on stop rows, and zeroes may be needed for deferral stops or loan payoffs.
- ADP RUN integrations are no longer being completed.
- Transamerica no longer has ADP fileshare access due to firewall — the client may need to retrieve and forward specifications.

## FTP & PGP

- Inbound uses the global SFTP connection named ADP; ADP pushes files to Transamerica.
- Outbound: Transamerica pushes to ADP through a separate SFTP connection; ADP must provide credentials.
- Submit separate requests for incoming, outgoing, and SFTP — ADP generally needs three tickets on their side.
- No PGP.

## See Also

- [[payroll-vendor-onboarding]]
- [[ftp-connection]]
- [[payroll-template]]
