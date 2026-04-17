---
title: "FTP Connection"
type: concept
tags: [ftp, payroll, automation, vendor, file-transfer]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# FTP Connection

The automated file transfer channel used by payroll vendors to upload payroll files to TransAmerica's systems.

## Overview

Rather than manually delivering payroll files each pay period, payroll vendors are set up with an FTP account to upload files directly to TransAmerica. The DC initiates the account setup process by identifying the payroll upload contact and submitting the request to the FTP team.

## Why FTP Matters

Once set up, the FTP connection enables automated payroll processing — the vendor uploads a file, the system picks it up and processes it without manual intervention. Without FTP, the client must manually send payroll files each period (interim state).

## Setup Process

1. DC identifies who at the payroll vendor (or client) will be uploading payroll files
2. DC **emails the FTP team** to request account setup
3. FTP team sets up the account and generates login + password credentials
4. DC provides credentials to the payroll upload contact
5. Payroll vendor tests the connection — they see a simple upload page on their end
6. FTP is live — **each plan gets its own destination folder**; vendor uploads files there; system processes them

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

- [[payroll-template]]
- [[internal-teams]]
- [[eds]]
- [[dc-onboarding-workflow]]
