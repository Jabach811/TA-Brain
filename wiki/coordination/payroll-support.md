---
title: "Payroll Support (OnePayroll Team)"
type: coordination
tags: [team, payroll-support, testing, validation, onepayroll]
created: 2026-04-14
updated: 2026-07-08
sources: 2
status: current
---

# Payroll Support (OnePayroll Team)

Runs production-level payroll file simulations — the final validation gate before a payroll setup goes live.

**Contact:** `PAYROLLSUPPORT@transamerica.com`

## What they own

- Production-environment simulation of payroll test files, after your [[eds]] validation
- Final approval that a payroll setup is production-ready (then FTP can go live)
- Post-go-live monitoring of FTP uploads for failed deliveries (with Account Managers)

Their import is the same one the client hits when uploading through the production page; the internal DC import strips out many warnings and errors. That's why a file that comes back clean from EDS can still get flagged here — this pass is its own gate, not "EDS again."

## What you hand them

- **A clean payroll test file** — only after you've run it through EDS, reviewed all output, and iterated with the vendor until clean

## What they hand you

- **Feedback if issues are found** — you obtain a new test file from the vendor and restart from EDS
- **Approval if clean** — payroll setup is complete; FTP goes live

## When to contact them / escalation

- Send files only after EDS is clean — sending dirty files wastes a cycle
- Escalation contact for significant FTP delays affecting clients after go-live

## Common issues

- OnePayroll flags things EDS didn't — expected, not a sign your EDS run was wrong. Fix and rerun the full chain (vendor → EDS → OnePayroll)
- Each failed pass costs a full vendor round-trip for a new test file — front-load your EDS iteration

## See Also

- [[payroll-vendor-onboarding]]
- [[payroll-template]]
- [[ftp-connection]]
- [[ftp-team]]
- [[eds]]
