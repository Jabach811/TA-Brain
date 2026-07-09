---
title: "Vendor Quick Reference"
type: vendor
tags: [vendor, payroll]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# Vendor Quick Reference

Cross-vendor "Quick Hits" comparison for payroll outbound decisions: who takes the standard file, who needs custom 1116, loan-number handling, and PGP per vendor.

| Vendor | Takes Standard | Requires Custom | Loans | PGP | Key Note |
|---|---|---|---|---|---|
[[]] | Not often | Yes, usually | Vendor loan codes | No | MR Report and ADP Generic/Next Gen language matters |
[[]] | Yes | Yes when UKG path applies | TA loan numbers | No | May use CREATIVEPLANNING-LM global route |
[[]] | No | Yes, 1116 | TA loan numbers | No | payrollvendorfeed naming; DETAMOOV-LM has Munson caveat |
[[]] | Not often | Yes, usually | Vendor loan codes | Sometimes | CSV only; EmployeeXrefCode is key |
[[]] | N/A | N/A | N/A | N/A | Inbound SFTP only; outbound pulled from WX by client |
[[]] | Yes | Yes, 1116 | TA loan numbers | Yes | Confirm platform; Payroll platform is Paystart |
[[]] | No | Yes, 1116 | TA loan numbers | Yes | Loans accepted beginning January 2026 with seeding |
[[]] | Yes | No | TA loan numbers | No | Routes through PAYKONNECT |
[[]] | Yes | No | TA loan numbers | No | Third-party route for Paycor and Rippling |
[[]] | No | Yes, 1116 | TA loan numbers | No | Special PI relationship; lmpayroll filename |
[[]] | No | Yes, 1116 | TA loan numbers | No | PAYLCTY global; inbound must be ready first |
[[]] | Not often | Yes, usually | TA loan numbers | No | ULTIMATE inbound; Turnkey has constraints |
[[]] | Yes | Sometimes for loans | TA or vendor loan numbers | Sometimes | Often client software with implementation partner |

## Before any vendor call

- Ask whether the vendor can accept Transamerica's large-market standard outbound files: Excel/text, separate deferral and loan files, and large-market timing.
- Confirm effective-date expectations for deferrals, new loans, and loan payoffs before layout work starts.
- Confirm loan-number model: Transamerica unique loan number vs vendor loan deduction codes — this decides whether loan seeding and loan deduct_c logic are needed.
- Confirm whether stop rows need a zero in the deferral field or should leave the field blank.
- Confirm SFTP direction: vendor pushes to Transamerica, vendor pulls from Transamerica Inbox, or Transamerica pushes to vendor using their credentials.
- Flag PGP early — it requires vendor public key handling, filename/extension details, an archive folder, and a special review path before automation.

## See Also

[[]]
[[]]
[[]]
