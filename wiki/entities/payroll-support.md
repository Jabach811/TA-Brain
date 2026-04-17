---
title: "Payroll Support (OnePayroll Team)"
type: entity
tags: [team, payroll-support, testing, validation, onepayroll]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Payroll Support (OnePayroll Team)

Also known as the OnePayroll Team. Performs production-level payroll testing — the final validation gate before a payroll setup goes live.

## Overview

Payroll Support runs live-environment simulations of payroll files after the DC has already validated them through EDS. Because they run in a production-equivalent environment, they catch system-level errors and warnings that EDS cannot detect. Their approval is the final gate before payroll is considered production-ready.

## Role in the Validation Chain

```
DC → EDS Validation → Payroll Support (OnePayroll) → Production Ready
```

The DC validates files internally via EDS. Once clean, the DC sends them to Payroll Support. Payroll Support runs the same files through a live simulation. Feedback is returned if issues are found. If clean, they approve — payroll setup is complete.

## What They Catch

- System-level errors not visible in EDS
- Warnings that only appear in the production environment
- Format or mapping issues that EDS does not flag

## DC Interaction

1. DC runs payroll test file through [[eds]] — reviews all output, iterates with vendor until clean
2. DC sends clean file to Payroll Support
3. Payroll Support runs production-level simulation
4. **If issues found:** Payroll Support returns feedback → DC obtains new test file from vendor → repeat from step 1
5. **If approved:** Payroll setup is complete — FTP can go live

## Also Monitors

- Payroll Support (along with Account Managers) monitors FTP uploads for failed deliveries after go-live
- Escalation contact for significant FTP delays affecting clients

## See Also

- [[payroll-template]]
- [[ftp-connection]]
- [[ftp-team]]
- [[eds]]
- [[internal-teams]]
- [[dc-onboarding-workflow]]
