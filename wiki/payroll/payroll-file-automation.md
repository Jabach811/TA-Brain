---
title: "Payroll File Automation"
type: payroll
tags: [concept, payroll, automation, eds, psd, ftp, p3]
created: 2026-05-13
updated: 2026-05-13
sources: 1
status: needs-review
---

# Payroll File Automation

Setup rules for automated payroll file submission through PSD or FTP.

## Definition

Payroll file automation allows automated PSD or automated FTP clients to submit payroll files that map to EDS layouts. It depends on P3 remittance settings, EDS layout availability, user permissions, and FTP file-to-layout mapping.

> [!warning] Source status
> Built from legacy setup notes. Validate field names, permission groups, and ticket process before live use.

## Why It Matters

Automation only works if the remittance settings, EDS layouts, PSD permissions, FTP mappings, and file movement are aligned. A missing PSD Availability flag or duplicate file name can prevent the file from being routed to the right layout.

## Evidence / Examples

### P3 Remittance Settings

- `IM Payroll Automation?` must be set to Yes for automated PSD and automated FTP clients.
- The field displays only for IM clients.
- When enabled, `IM PSD Error Correction?` must be selected.
- `TA Handles Errors` routes the AWD error report to the account manager.
- `Client Handles Errors on PSD` routes the AWD error report to the end queue with status `EDSCOMPL`.

### EDS Layout Requirement

- Automated PSD and FTP clients must have at least one EDS layout where `PSD Availability?` is Yes.
- Only layouts with PSD Availability set to Yes appear for automated client use.

### PSD Automated Plans

- One plan sponsor user needs all Automated Payroll File Access permissions so they can delegate permissions to other users.

### FTP Automated Plans

- Each submitted file type must be mapped to a layout name.
- File name should exclude appended dates.
- FTP folder name and file layout name are required.
- File layout options come from EDS layouts with PSD Availability set to Yes.
- File names must be unique.
- Saved mappings write to `FTP_LAYOUT_MAP`.

### INFRA Ticket

- An INFRA ticket is needed to automatically move client files from the client folder to the target processing folder.
- The ticket should include the from-folder, to-folder, and failure-notification recipients.
- Source timing estimate: 3-4 business days.

## Related Concepts

- [[payroll-template]]
- [[ftp-connection]]
- [[eds]]
- [[p3]]
- [[wx]]

## See Also

- [[tc-stuff]]
- [[roles/lm-dc]]
- [[tc]]
