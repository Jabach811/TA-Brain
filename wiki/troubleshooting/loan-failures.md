---
title: "Loan Load Failures"
type: troubleshooting
tags: [troubleshooting, loans]
created: 2026-07-08
updated: 2026-07-08
sources: 1
status: active
---

# Loan Load Failures

Three loan-load failures that come up in practice where the loan file looks structurally fine but the numbers don't reconcile. These are business-state problems, not file-format problems — the fix usually runs through the prior record keeper, not through the file. Process-level traps (Header ≠ Source, deemed-field rules, vendor name mismatches) are covered in [[loan-setup]] and [[informatica-loan-module]].

## 1. Frozen plan — loans never re-amortized

**What you see:** NPER (remaining periods) and outstanding balance on the loan file don't match what the participant has actually been paying down. The file loads or validates fine at first glance.

**Why:** When a plan is frozen at the prior record keeper, the vendor often stops re-amortizing the loans. Repayment schedules drift while the plan sits frozen, so the file's schedule no longer reflects reality.

**What to do:** Treat the file as suspect for every loan on a frozen plan. Reconcile against actual repayment history and go back to the prior record keeper for corrected loan data — don't hand-adjust the file to force it through.

## 2. Recent refinance that didn't fully complete

**What you see:** Partial or contradictory state on a single participant's loan — the old loan isn't fully settled and/or the new one isn't fully active.

**Why:** The participant refinanced shortly before the conversion cutoff, and the prior record keeper's records never fully settled the old loan or activated the new one before the file was cut.

**What to do:** Goes back to the vendor for a re-pull. There is no clean way to load a half-completed refinance from a stale file.

## 3. Detail report vs. source breakdown — off by one payment

**What you see:** The loan detail report disagrees with the source breakdown, and the variance suspiciously matches one principal payment.

**Why:** One of the two reports is inaccurate — it was cut before the last payment posted, so it's missing exactly one payment. The variance is too clean a number to be anything else.

**What to do:** Identify which report is stale and re-request that one from the prior record keeper. Once you know to look for the one-payment signature, this is easy to spot.

## General Rule

When loan numbers don't add up for business-state reasons like these, don't reach for the file — reach for the prior record keeper. Manual fixes paper over a record-keeping problem that will resurface in repayment processing.

## See Also

- [[loan-setup]]
- [[informatica-loan-module]]
