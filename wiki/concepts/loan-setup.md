---
title: "Loan Setup & Processing"
type: process
tags: [loans, p3, informatica, conversion, takeover-loans, holb]
created: 2026-04-18
updated: 2026-05-05
sources: 4
status: current
---

# Loan Setup & Processing

How a plan's outstanding participant loans move from a prior record keeper into P3 — a 14-step workflow across two systems (P3 + Informatica) and three phases (setup, validation, takeover).

## Overview

When a plan converts to Transamerica with active loans, the loans must be re-created on P3 with their full repayment state intact: outstanding balance, source allocations, NPER (remaining periods), and any deemed status. The process is **strictly ordered**. P3 setup must complete before validation; validation must pass before Informatica runs; Informatica must succeed before Takeover Loans is submitted; Takeover Loans must finish before confirmation queries run.

The most common failure point is **Step 8 — Header = Source validation**. If the loan file's outstanding balance does not match the source totals exactly, every downstream system will compound the variance and the load will have to be reversed.

![Loan loading diagram — P3 setup, loan header/source validation, Informatica test and production runs, Takeover Loans, HOLB handling, confirmation email, AQT verification, and audit evidence.](diagrams/loan-loading-detail.png)

## Why It Matters

A converting plan often arrives with hundreds of active loans, each with its own outstanding balance, source allocations, and remaining repayment schedule. Because every later step assumes loan setup is correct, a small mistake at setup compounds:

- **Source balances** include outstanding loan principal — if loan principal is wrong, source balances are wrong.
- **Loan repayment processing** depends on correct NPER (remaining periods) — incorrect setup causes participants to over- or under-pay.
- **Deemed loan tax reporting** depends on the Deemed Date / Deemed Amount fields being correctly populated at setup.
- **Takeover Loans is a one-shot system action** — reversing it requires manual intervention from the Loan team.

This is why discipline at Steps 3, 8, and 9 matters more than the rest combined.

## Trigger

A plan in conversion has loans on its [[toa]] (or signed loan section), the loan import file has been received from the prior record keeper, and the [[roles/lm-dc]] is ready to set up the conversion in P3.

## Steps

### Phase I · Setup in P3 (blue)

#### 1. Open P3 and navigate to the plan — DC
Pull up the plan record by name or case number. Confirm with the client that the **effective date** is locked. The loan import file should be saved and accessible. Note up front whether the file contains **deemed loans** — that decides which Step 9 path applies.

#### 2. Top-right dropdown → Conversions — DC
From the plan record, open the top-right dropdown and choose **Conversions**. This opens the conversions management area for this plan.

#### 3. Add Record Keeper — Name only — DC
Click **Add Record Keeper**. Enter the **Name field only** — leave address, contact, and other fields blank. Click **Apply**, then **Save**. Filling extra fields here causes downstream lookup mismatches in the Informatica Loan Module (the prior vendor name must match `censuslookupfile.xls` exactly — see [[informatica-loan-module]]).

![Adding the prior record keeper — Name field only, all other fields left blank.](SS/Loans_Prior Vendor Entry.jpg)

![Conversions list after the prior record keeper is saved — confirms the entry before moving to the Conversion tab.](SS/Loans_After Prior Vendor.jpg)

#### 4. Conversion tab → New Conversion — DC
From the Conversions area, open the **Conversion** tab and click **New Conversion**. This creates the conversion record that every later step writes to.

#### 5. Enter case number — No Affiliate — Press Enter — DC
Type the case number, choose **No Affiliate** from the affiliate dropdown, and press **Enter**. A new record screen loads with the date fields ready to complete.

#### 6. Enter conversion / assign / effective dates — DC
Three date fields. Two are derived from the effective date:
- **Conversion Date** = effective date − 3 months
- **Assign Date** = effective date − 3 months (same as Conversion Date)
- **Effective Date** = the actual plan effective date

#### 7. Conversion number generated — note it — DC
Save the record. P3 generates a **Conversion Number** (CV-yyyy-####). Record it — every subsequent step (Informatica parameter file, Takeover Loans submit, confirmation queries) needs it.

![Generated Conversion Number on the saved record — copy this; it's referenced in every later step.](SS/Loans_Conversion Number.png)

### Phase II · File Validation & Informatica Load (yellow)

#### 8. Confirm Loan Header balance = Loan Source totals — DC ⚠ critical
**This is the most important step in the process.** The outstanding balance in the **Loan Header** record must match the total on the **Loan Source** record **exactly** — to the cent. Any variance, however small, must be reconciled before proceeding.

Validation checklist:
- Outstanding balance in Loan Header = total on Loan Source exactly
- All loan records reviewed for completeness
- Participant IDs in the loan file match participant records in P3

If totals do not match, contact the prior record keeper for a corrected file before going further.

#### 9. Check Deemed Date & Deemed Amount fields — DC
Two fields with non-obvious blank-vs-zero rules:
- **Deemed Date** — leave **blank** if there is no deemed date.
- **Deemed Amount** — enter `0` if there is none. **Never leave blank.** A blank Deemed Amount throws an Informatica import error.

If the file contains deemed loans, every deemed record must have both fields populated with the actual deemed date and a non-zero deemed amount.

#### 10. Run Informatica Load — DC
Process the loan file through the [[informatica-loan-module]] using the recorded Conversion Number and the prior record keeper Name from Step 3. Pre-flight checklist:
- Header balance = Source total confirmed
- Deemed Date / Amount fields verified
- Conversion number from P3 recorded
- Import file saved and path accessible

**Test → Production toggle.** The Informatica loan workflow has a test mode controlled by a `test = Y/N` flag on the parameter file:

1. **First run:** set `test = Y`. If it completes with no errors and the load looks clean, proceed.
2. **Second run:** flip to `test = N` and re-run for production.
3. If the test run errors, fix the underlying issue before flipping — don't run production over a known problem.

The module loads `PENSION.CONV_LOAN` (header) and `PENSION.CONV_LOAN_PRIN` (source balance). After it runs, check the **Loan Compare file** (all differences must equal `0`) and the **Loan BEE detail** for errors before continuing.

### Phase III · Takeover Loans & Confirmation (green)

#### 11. P3 → Conversions → Existing Plan → Takeover Loans → Submit — DC
Navigate back to P3:
- **P3** → **Conversions dropdown** → **Existing Plan** → **Takeover Loans** → **Submit**
- Enter the plan in the search field
- Select **Takeover Loans** from the dropdown
- Press **Submit** to proceed to the upload screen

![P3 → Conversions → Existing Plan — the entry point for Takeover Loans.](SS/Loans_Existing Conversion.jpg)

#### 12. Click Upload — bottom-left corner — DC
The Upload button is in the **bottom-left corner** of the upload screen. Click it. Wait for processing — **do not navigate away or refresh** while the upload runs. The system queues a confirmation email when it finishes.

**HOLB branch.** Before clicking Upload, check whether a [[holb|HOLB]] (Highest Outstanding Loan Balance) file exists for this plan:

- **HOLB file exists** → upload it directly using the upload button
- **No HOLB file** → click **Upload and Create** instead — P3 derives HOLB values from the loan data being loaded

HOLB drives the loan hierarchy when a participant has multiple loans active and determines how repayments split across those loans. Both branches result in valid loan records; the difference is whether HOLB comes from a separate file or gets computed during this upload.

#### 13. Wait for system confirmation email — DC
The system emails confirmation: number of loans loaded and any errors encountered. Do **not** run confirmation queries until this email arrives. If the email reports errors, review the Informatica log before proceeding — do not paper over errors with manual fixes.

#### 14. Run confirmation queries — DC
After a clean confirmation email, run the standard verification queries against the conversion to confirm loan count, total balance, and active status. Log the case number, conversion number, and effective date. Loan setup and processing is complete.

The confirmation query output (essentially the loaded loan header file) feeds into the [[audit-pack]] for QA review.

## Handoff Points

| # | From → To | What Moves | Risk |
|---|-----------|------------|------|
| 1 | Prior RK → DC | Loan import file (header + source) | Stale or partial file → Step 8 fails |
| 2 | DC → P3 (Step 3) | Record Keeper name only | Extra fields filled → vendor lookup mismatch in Informatica |
| 3 | DC → P3 (Step 7) | Conversion record saved | Effective date wrong → all derived dates wrong |
| 4 | DC → Informatica (Step 10) | Conversion # + RK name + file | Vendor name ≠ `censuslookupfile.xls` → "Nper is null" |
| 5 | Informatica → P3 | Loaded `CONV_LOAN` + `CONV_LOAN_PRIN` rows | Loan Compare ≠ 0 → reconcile before Takeover |
| 6 | DC → P3 Takeover Loans (Step 11) | Submit + Upload | Navigate away during upload → must restart |
| 7 | P3 → DC mailbox | Confirmation email | DC runs queries before email arrives → false positive |

## Timing / Deadlines

- **Phase I (P3 setup):** ~30 minutes once dates and case number are confirmed.
- **Phase II (Validation + Informatica):** highly variable. If Header = Source on first check, ~20 minutes. If reconciliation is needed, can stretch into days while waiting on the prior RK.
- **Phase III (Takeover + email):** upload itself is a few minutes; the confirmation email typically arrives within 15–30 minutes but can take longer under load.
- **Sequencing:** loan setup must complete **before** participant balances post in [[final-files-processing]] — loan principal flows into source balances and the math will not reconcile if loans land later.

## Failure Modes

- **Header ≠ Source.** Any variance (Step 8) means the wrong totals will load. Reverse and re-pull the file from the prior RK before continuing.
- **Deemed Amount left blank.** Step 9 trap — the field rejects null even when there's no deemed loan. Always enter `0`.
- **Record Keeper name mismatch.** Extra fields entered in Step 3, or a name that does not exactly match `censuslookupfile.xls`, surfaces as "Nper is null or zero" in Informatica.
- **Loans loaded after balances.** Sequence reversed — loan principal lands in source balances out of order; reconciliation breaks. Run loan setup first.
- **Confirmation queries before email.** Returns partial state mid-load and looks like missing data. Wait for the email.
- **Reload during Step 12.** Aborts the upload silently in some cases. Leave the tab alone.

## Real-World Loan Trouble (Beyond Process Traps)

The traps above are mostly procedural. Loans also break for **business-state reasons** that the file looks fine for at first glance:

- **Plan was frozen at the prior RK.** When a plan is frozen, the prior vendor often stops re-amortizing the loans. Repayment schedules drift. The loan file lands looking valid but the NPER and outstanding balance no longer match what the participant has actually been paying down.
- **Recent refinance that didn't fully complete.** A participant refinanced shortly before the conversion cutoff and the prior RK's records didn't fully settle the old loan / activate the new one. The file shows partial state. Goes back to the vendor for a re-pull.
- **Detail report ≠ source breakdown by ~one principal payment.** When the loan detail report disagrees with the source breakdown by an amount that suspiciously matches one principal payment, it usually means **one of the two reports dropped the last payment**. Easy to spot once you know to look — the variance is too clean a number to be anything else. Identify which report is stale and re-request it.

These are the ones that take judgment, not just a checklist. When something doesn't add up, don't reach for the file — reach for the prior RK.

## See Also

- [[informatica-loan-module]]
- [[loan-setup]]
- [[informatica]]
- [[final-files-processing]]
- [[plan-conversion-handoffs]]
- [[roles/lm-dc]]
- [[toa]]
- [[holb]]
- [[audit-pack]]
