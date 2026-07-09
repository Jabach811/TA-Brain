---
title: "Payroll File Automation"
type: payroll
tags: [concept, payroll, automation, eds, psd, ftp, p3]
created: 2026-05-13
updated: 2026-07-08
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

- `IM Payroll Automation?` on the **Remittance Home page** in P3 must be set to Yes for automated PSD and automated FTP clients.
- The field displays only for IM clients.
- The field can be updated by these P3 user types: Account Consultant/Account Admin, Call Center Associate, Cash PC Specialist, Contract Plan Services, and Product Support.
- When enabled, `IM PSD Error Correction?` becomes enabled and must be selected. Default value: `Client Handles Errors on PSD`.
- `TA Handles Errors` means the account manager works with the client to resolve file data errors; the AWD error report goes to the account manager.
- `Client Handles Errors on PSD` means the client resolves errors in PSD themselves; the AWD error report goes to the end queue with status `EDSCOMPL`.
- Field interplay quirk: with `IM PSD Error Correction?` set to `Client Handles Errors on PSD`, the `IM Payroll Automation?` field is disabled; switching to `TA Handles Errors` re-enables it.

### EDS Layout Requirement

- Automated PSD and FTP clients must have at least one EDS layout where `PSD Availability?` is Yes.
- Only layouts with PSD Availability set to Yes appear for automated client use.
- To set it: in EDS, click the layout name to open the layout, then set `PSD Availability?` to Yes.

### PSD Automated Plans

- One plan sponsor user needs all Automated Payroll File Access permissions so they can delegate permissions to other users.
- To grant them: P3 User Maintenance tab → User Roles and Options for the user → select all options under the Automated Payroll File Access heading.
- Once permissions are granted, setup for automated PSD clients is complete — the FTP mapping steps below apply only to automated FTP clients.

### FTP Automated Plans

- Each type of file the client submits must be mapped to a layout name.
- Already-mapped files display in the **FTP Automation Summary** section of the Remittance Home page. Viewing or updating this section is restricted to the Cash PC Specialist P3 user.
- To add a mapping: select the **Add FT Automation** button above the FTP Automation Summary, then complete the Add/Edit FTP Automation screen: file name (exclude any dates appended when the file is dropped to the client folder), the FTP folder the client drops the file into, and the layout name used to load the file to EDS. All fields are required.
- File layout options come from EDS layouts with PSD Availability set to Yes. If the dropdown shows only `Select:`, no layouts have PSD Availability turned on yet.
- File names must be unique — a duplicate produces the error "Unable to apply requested changes, File name must be unique" and the row is not added.
- **Apply** on the popup stages the row; the data is only written to the `FTP_LAYOUT_MAP` table when **Save** is selected on the Remittance Home page. The same Save step is required when deleting rows (check the Delete box, then Save).
- Editing an existing row (via the File Name link) allows changing the FTP folder and layout name; the file name itself is locked.

### INFRA Ticket

- An INFRA ticket is needed to automatically move client files from the client's folder to the target processing folder.
- The ticket must specify the from-folder location, the to-folder location, and who should receive notifications if the process fails.
- Source timing estimate: the INFRA ticket can take 3-4 business days to be processed.

## Outbound Files (OBF)

Files from Transamerica back to the payroll vendor — deferral changes, new loans, payoffs. Whether this is standard or custom work depends almost entirely on what the vendor can accept. (from the payroll/OBF knowledge-transfer guide)

### Standard vs. custom

- The large-market **standard** outbound setup posts both Excel and text files — **separate** deferral and loan files — to [[wx]] at the frequency confirmed during installation.
- Don't just ask whether the vendor accepts the "standard" file. Ask whether they can accept the large-market Excel/text **separate** deferral and loan files. If the vendor expects a **combined** deferral-and-loan CSV, that is usually custom outbound file work (the "1116" custom layout).
- For standard outbound turn-on, give the payroll team **3–4 business days of lead time** before the first live file date.
- Outbound setup may also require credentials from the vendor if Transamerica pushes the files; the FTP team may submit inbound first while waiting on those.

### Working rules

- **Effective dates** — deferrals can use election effective date or current run date; new loans can use first repayment date or issue date; loan payoffs can use current date or loan issue date. Confirm expectations with the vendor before layout work starts.
- **Stop rows** — custom files (including 1116) send stop rows when loans pay off, deferrals go to zero, or deferrals change between percent and dollar. Whether the stop row carries a zero or leaves the field blank depends on client/vendor preference — confirm.
- **Loan numbers** — two models. Some vendors (e.g., UKG, Paycom, Paylocity) can use Transamerica's unique loan number: send an outstanding loan report before go-live so they can seed their system. Others (e.g., ADP, Dayforce, sometimes Workday) require vendor deduction codes and recycled loan numbers: seed loans on Transamerica's side and enable loan deduct_c logic. This decision drives whether loan seeding is needed.
- **Holiday roll** — the P3 outbound-file holiday roll uses previous, next, or holiday against the initial/next date. If setting up an initial OBF right before a holiday, involve production support and monitor after the roll.
- **Late OBF jobs** — if an OBF job runs late into the evening, FTP processing can stop around 7pm. Files may generate to folders but not send by SFTP until the next morning. Usually a year-end issue.

### 15-character division — custom layout

Some plans need a 15-character division field on outbound files. This requires a customized layout, not a standard config:

- CIT revises the standard layout — expand division to 15 positions and push all following fields down 11 spaces.
- Before the first OBF, submit a ticket to set the plan up with the 15-char customized layout.
- Update the OBF file format to "6 — new format separate files for deferral and loan (15 char div)".

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
