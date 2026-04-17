---
title: "Audit Pack"
type: concept
tags: [audit, documentation, qa, post-conversion]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Audit Pack

A structured summary document the DC builds after every plan conversion. Reviewed by QA and stored in client folders for the audit team.

## Overview

The audit pack is the official record of what happened during the conversion — every ref number, every dollar amount, every piece of vendor data that informed what's now in the system. The audit team uses it to compare prior vendor data against what's actually in TransAmerica's system.

## Contents

### Financial / Transaction Summary
- All transfer reference numbers used
- Dollar amounts for each ref number
- Dates money was received
- Balances posted (breakdown):
  - Advanced Employer amounts (cash conversion)
  - Mapping fund amounts
  - TIK share amounts

### Prior Vendor Data
- **Prior vendor balances** — what the vendor reported participants had
- **Prior vendor elections** — deferral/contribution elections from the vendor
- **Loan information** — any outstanding loan balances from the vendor
- **Fund mapping** — the prior-to-TA fund mapping used

## Purpose

The audit pack lets the audit team answer: *"What did the prior vendor say, and does it match what's now in our system?"*

- DC builds it
- QA reviews it
- Stored in **client folders**
- Used by the audit team post-conversion

## Template

**Standard template — always the same.** The DC does not build the audit pack from scratch. There is a fixed template used for every plan.

- **Format:** Excel
- **Location:** `root/Conversion/Contract` in the DC folder
- **Same template for all conversion types** — no variation between cash, mapping, and TIK

## When It's Built

After all final files are processed and posting is complete. It is a retrospective document — built at the end of the conversion, not during.

## Storage

Stored in the **client folder** on the internal file system — specifically `root/Conversion/Contract`.

## QA Review

- QA typically reviews the audit pack the **same day** it's submitted
- If QA finds a discrepancy, they **email the DC directly** to request a fix or explanation
- DC corrects and resubmits

## See Also

- [[final-files-processing]]
- [[internal-teams]]
- [[conversion-types]]
- [[dc-onboarding-workflow]]
