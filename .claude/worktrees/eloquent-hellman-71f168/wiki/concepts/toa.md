---
title: "TOA — Transfer of Assets"
type: concept
tags: [document, toa, fund-mapping, transfer-in-kind, client-signed]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# TOA — Transfer of Assets

Client-signed legal document that authorizes the asset transfer and serves as the fund mapping source. No action on the transfer begins until the TOA is signed.

## Overview

The TOA is both a legal authorization and a data document. The DC uses it to:
1. Determine if any funds will be transferred in kind (re-registration)
2. Build the fund mapping template

## Structure

The TOA is a spreadsheet/form containing one row per fund being transferred. Key columns:

| Column | Content |
|--------|---------|
| Prior vendor fund code | Source fund identifier |
| Prior vendor fund description | Human-readable fund name |
| TransAmerica fund code | Destination fund identifier |
| TransAmerica fund description | TA fund name |
| **Column T** | **Re-registering: Y or N** |
| Current value (estimate) | Dollar value of fund (may be stale) |

> Column T is the critical field. If any row = Y, [[transfer-in-kind]] process applies.

## What the DC Does with the TOA

### Step 1: Check Column T (Re-registering)

- **All N:** Everything will be liquidated and mapped. No TIK action needed.
- **Any Y:** Fill out the re-registration form and send to [[matt-oconnell]]'s team. Do this with proper timing (~12 business days before liquidation).

### Step 2: Build Fund Mapping

As soon as TOA is signed and available:
- Extract fund data into the [[fund-mapping]] template
- No test files needed for this step — all fund codes are already on the TOA
- The mapping template is nearly one-to-one with the TOA, plus 6 additional TA internal fields: **Filter, Vendor Fund Code, Ref #, Split Ratio, Split Code, Total**

### Step 3: Use Current Values as Share Estimates

- TOA current values = initial estimate for Matt O'Connell's expected share amounts
- These may be months old — update with test files and again with final files

## Important Notes

- **No action until signed.** TOA signature is a hard prerequisite for the TIK and fund mapping work.
- TOA values can be stale — treat dollar figures as estimates only.
- The TOA is filed away once fund mapping is complete; DC doesn't need to reference it again.
- The TOA may be part of the [[onboarding-package]] (especially PEP plans) or a standalone document.

## Cash Conversion Exception

For a pure cash conversion: the TOA will show no fund-level mapping — all assets go to a pool. There is no "from → to" mapping and no column T entries to worry about.

## Authorship and Timing

- **The TOA is a TA document** — the COM fills it out using a standard template
- **Client signing timeline:** One of the first things done when the plan begins — not something that happens near conversion time
- **Re-registration form format:** Simple Excel document. DC fills it out based on the TOA column T data.

## See Also

- [[fund-mapping]]
- [[transfer-in-kind]]
- [[matt-oconnell]]
- [[conversion-types]]
- [[onboarding-package]]
- [[dc-onboarding-workflow]]
