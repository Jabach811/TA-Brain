---
title: "FTP Connection"
type: payroll
tags: [ftp, payroll, automation, vendor, file-transfer]
created: 2026-04-14
updated: 2026-07-08
sources: 3
status: current
---

# FTP Connection

The automated file transfer channel used by payroll vendors to upload payroll files to TransAmerica's systems.

## Overview

Rather than manually delivering payroll files each pay period, payroll vendors are set up with an FTP account to upload files directly to TransAmerica. The DC initiates the account setup process by identifying the payroll upload contact and submitting the request to the FTP team.

## Why FTP Matters

Once set up, the FTP connection enables automated payroll processing — the vendor uploads a file, the system picks it up and processes it without manual intervention. Without FTP, the client must manually send payroll files each period (interim state).

## Transmission Rules

Working rules from training (from the payroll/OBF knowledge-transfer guide):

- **SFTP is the supported transmission method.** If a client asks about API or another method, do not assume it is available.
- **PGP encryption is optional extra setup.** Some clients or vendors require it; most do not want the added complexity. Flag it early — PGP needs vendor public-key handling, filename/extension details for the setup team, an archive folder, and a special review path before automation.
- **File extension is usually not the routing driver.** Routing generally keys on plan number, affiliate, and wildcard logic.
- **Test labels go after the plan number** in the file name. If "test" text comes before the plan number, the file may not route correctly.
- **True Excel files are the exception** — they need special setup on the routing side. Without it, the received file can come through as unreadable numbers and symbols.

## Ownership — Inbound vs. Outbound

The contact you get may own inbound only, outbound only, or both — or may just be the person building the file. Confirm explicitly before assuming setup is covered. If the contact only owns inbound, the client may need to open a separate ticket with the vendor for outbound files. This is the most common early failure point. (from the payroll/OBF knowledge-transfer guide)

## Existing and Global Vendor Connections

Some vendors use existing or global SFTP connections, and some client-named vendors actually route through third-party integrators (e.g., Paycor and Rippling route through PayKonnect). The named payroll vendor is not always the connection name that gets set up. Known route names include `ADP`, `PAYKONNECT`, `PAYLCTY` (Paylocity), `ULTIMATE` (UKG inbound), `PAYCOM`, `PAYROLLINTEGRATIONS`, `CREATIVEPLANNING-LM`, and `DETAMOOV-LM` (Datamoov).

Two practical consequences:

- Identify the vendor/source clearly in the request so setup is aimed at the right connection. Jen Curtin coordinates with Eric Lade on setup and routing.
- Vendors with global connections can send files **before** the request is complete. If a vendor says they already sent a test file and nothing arrived, ask the FTP team to look upstream and build the forwarding rule — the file may be sitting upstream rather than truly missing.

## Request Forms — Standard vs. Mercer

Two FTP setup request forms exist. Use the standard form for all non-Mercer plans; Mercer plans have a separate form and workflow with structural differences (e.g., a 6-character case-number prefix vs. 7 in standard). The wrong form means rework. (from the payroll/OBF knowledge-transfer guide)

## HSA / WEX — Separate SFTP Path

HSA file connectivity for WEX clients on the CDEX file format goes through a **different setup process** than payroll FTP:

- **CDEX** (complex normalized file, multiple records per participant) — client or payroll provider transmits via secure FTP to Transamerica, but file format and testing are handled entirely by WEX.
- **Client Portal** — client builds the file and uploads via the WEX website directly; no DC role.
- Ticket submission goes through **GTS (formerly AGT)**, not the regular payroll FTP team. The DC gathers contacts from WEX, Transition Services, and CE before submitting.

## Setup Process

1. DC identifies who at the payroll vendor (or client) will be uploading payroll files
2. DC **emails the FTP team** to request account setup
3. FTP team sets up the account and generates login + password credentials
4. DC provides credentials to the payroll upload contact
5. **Connection test — send a random file first.** Before waiting on a real test payroll file, ask the uploader to send any file just to confirm the channel works end-to-end. The thing the system catches on is the [[payroll-template#file-naming-convention|naming convention]] — `<case#>_<contract>_<affiliate>.xls`. A throwaway file with the right name proves the channel works before you stake real test data on it.
6. Payroll vendor tests the connection — they see a simple upload page on their end
7. FTP is live — **each plan gets its own destination folder**; vendor uploads files there; system processes them

![Vendor-side FTP upload page — what the payroll contact sees when sending a file.](SS/FTP.jpg)

## Auto-Sweep / Batch Mode

Auto-sweep — where the FTP folder is polled and files are processed automatically without anyone clicking upload — isn't enabled day one. The vendor needs **2 or 3 good runs** through the manual upload page before the channel is moved to batch processing. This typically happens months after go-live, well outside the DC's window.

## Timing

**Request FTP setup as early as possible.** The FTP team has a large caseload and setup takes time. Delays in FTP setup mean longer periods of manual payroll file handling.

> Identify the payroll contact → immediately request FTP setup. Don't wait.

## Interim: Manual Payroll Filing

When FTP isn't ready, the client sends payroll files directly (via secure email or other secure transfer). This is:
- A valid interim state
- Can last weeks or months depending on FTP team backlog and vendor readiness
- Requires active monitoring by the DC each pay period
- Plans stuck on manual payroll for a long time are a known pain point

## Monitoring and Escalation

- **Who monitors failed uploads:** The Account Manager and Payroll Support team
- **Escalation for significant FTP delays:** Client is notified

## See Also

- [[payroll-vendor-onboarding]]
- [[payroll-template]]
- [[eds]]
- [[dc-onboarding-workflow]]
