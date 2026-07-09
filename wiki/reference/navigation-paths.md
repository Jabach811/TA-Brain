---
title: "System Navigation Paths"
type: reference
tags: [reference, navigation, p2, p3, shared-drives]
created: 2026-07-08
updated: 2026-07-08
sources: 3
status: active
---

# System Navigation Paths

Verbatim click-paths for the P2 and P3 tasks DCs do most often, plus known shared-drive locations.

## P2

**Find transfer reference numbers:**
CORP07/tdatest → 2001 → contract/affiliate # → option 4 → trans code 1006 → proc code 3 (extra questions)

**Trans ref number format:** YYYYMMDD + 7-8 random alphanumeric characters (extra questions)

DCs can also search ref numbers in P2 to confirm a wire arrived, matching against the expected amount (balances/census/loans dump).

## P3

**Enable eligibility:**
Plan → top left dropdown → Outsourcing Summary → Eligibility → Enable screen. The go-ahead to enable comes within the hour (extra questions).

**Assurance Codes (determines wire account):**
Plan → General Plan → Assurance Codes (extra questions)

**Loan conversion setup:**
Conversions dropdown → Add Record Keeper (Name only) → Conversions tab → New Conversion → enter case number, No Affiliate → set Conversion Date and Assign Date to effective date minus 3 months → save → capture the Conversion Number (balances/census/loans dump)

**Loan upload:**
Conversions dropdown → Existing Plan → search by case number or conversion number → Takeover Loans → Submit. If a HOLB (Highest Outstanding Loan Balance) file exists, upload it; if not, click **Upload and Create** (balances/census/loans dump).

**Reverse the dummy participant (mapping conversions):**
P3 → ROC → "ROC No Reversal", after participant balances post (balances/census/loans dump)

**Common remitter plans, Day of Wire:**
The standard Pre-Process option is missing from P3's Remit Action dropdown. Use **"Verify Batch After Funding"** instead; wait for results, then set NO HOLD + Process Immediate for each trans ref (training notebook).

**Check whether Financial Guide is enabled:**
(1) Plans Tab → Allocation/Plan Default, if FG is the plan-level default; (2) DDOL/VRU → Services Enabled section otherwise (training notebook).

## Shared Drives / File Locations

- **Audit pack:** Excel file stored at `root/Conversion/Contract`; same template for all conversion types; QA reviews same day (extra questions).
- **Payroll file review Data Element Guide:** `S:\CIT\Data Consultants\PAYROLL FILE REVIEW LINE FOR REVIEW OF DATA` (training notebook).
- **Re-reg form:** Excel, kept in the front folder of the DC folder (extra questions).
- Caution: older shared-drive paths (`S:\CIT\Data Consultants\`, `\\yydafs-data1\`) appear throughout older training notebook sections and may be stale — confirm before relying on them (training notebook).

## See Also

- [[p2]]
- [[p3]]
- [[eligibility]]
- [[loan-setup]]
- [[wire-instructions]]
- [[liquidation-day]]
