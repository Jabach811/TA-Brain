---
title: "Common Remitter Plans"
type: concept
tags: [remitter, day-of-wire, p3, processing, conversion]
created: 2026-04-15
updated: 2026-04-15
sources: 1
---

# Common Remitter Plans

Plans coded as "common remitter" in P3 use a different Day of Wire processing flow than standard plans — the standard Pre-Process option is not available in the Remit Action dropdown, and a Verify Batch process must be used instead.

## Definition

A "common remitter" plan is a plan configuration in P3 that affects how remittances are processed. The standard **Pre-Process** option in the Remit Action column of the Remittance screen is absent for these plans. If a DC does not know a plan is a common remitter, they will encounter this missing option on Day of Wire and may not know what to do.

## Why It Matters

On liquidation day, every trans ref number must be taken off hold and processed before trading can proceed. For common remitter plans, the standard workflow does not apply. Using the wrong flow will cause processing to stall or fail.

## Day of Wire Process for Common Remitter Plans

### Step 1 — Identify that standard Pre-Process is absent
When opening the Remittance screen in P3 and reviewing the **Remit Action** column dropdown, if the **Pre-Process** option does not appear, the plan is likely coded as common remitter.

### Step 2 — Use "Verify Batch After Funding"
For each Day of Wire trans ref:
1. Select **"Verify Batch After Funding"** from the Remit Action dropdown
2. Click **Submit** at the bottom of the screen

### Step 3 — Wait for results
After submitting:
1. Wait a short period
2. Click the **"Verify Batch Results"** link at the bottom of the page (next to Submit)
3. If the full list of trans refs does not appear yet, wait a few more minutes and click again

### Step 4 — Set NO HOLD + Process Immediate
Once the full list of Day of Wire trans refs appears:
1. For each trans ref: select **NO HOLD** under the "Processing Status" column
2. Check the box under the **"Process Immediate"** column
3. Do this for all Day of Wire trans refs, then click **Submit**

### Step 5 — Proceed normally
After submission, continue with the normal det_rem SQL verification process as with any standard Day of Wire.

## Evidence / Examples

From the DC Training Notebook (November 19, 2025):

> "When processing Day of Wire assets on plans coded as 'common remitter' the Remittance screen in P3 will not have the standard Pre-Process option from the 'Remit Action' column drop down."

## Related Concepts

- [[liquidation-day]] — full Day of Wire workflow
- [[p3]] — the system where this processing occurs
- [[conversion-types]] — cash, mapping, and TIK distinctions

## See Also

- [[liquidation-day]]
- [[p3]]
- [[conversion-types]]
- [[lm-dc]]
- [[dc-onboarding-workflow]]
