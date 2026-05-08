---
title: "Dummy Participant"
type: concept
tags: [dummy, mapping, day-of-wire, processing, workaround]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Dummy Participant

A placeholder participant (SSN 999-00-00) required in the census before running the Day of Wire Informatica workflow for mapping conversions.

## Overview

The Informatica Day of Wire workflow, when processing a mapping conversion, routes the initial transaction through a single fake participant account. This is a system requirement — the first booking is applied to the dummy account so that trades can go out. After participant balances are posted, the dummy's details are reversed.

## Key Facts

- **SSN:** 999-00-0000
- **Required for:** Mapping conversions
- **Not required for:** Cash conversions (advanced employer used instead), TIK conversions
- **Must exist in census before** Day of Wire workflow runs — check this before liquidation day

## Lifecycle

1. **Pre-liquidation:** Verify dummy participant exists in census
2. **Day of Wire:** Informatica processes first transaction to dummy account → trades go out
3. **After final files / balance posting:** Reverse dummy's details via ROC tool in P3
4. **Post-reversal:** Only participant balances remain on the books; dummy is cleared

## Why It Exists

The mapping Day of Wire workflow needs to process the full trade on liquidation day — but actual participant allocations can't be posted until final files arrive (which come later). The dummy account acts as a temporary holder so that trades go out immediately on liquidation day, getting money invested at that day's NAV. Participant details fill in later without generating new trades.

## Reversal Process

After posting participant balances:
1. Go to [[p3]] → select **ROC** from the P3 menu bar
2. Run query: **"ROC No Reversal"**
   - **Case number starts with "T"** → use region **TDA**
   - **Case number starts with anything else** → use region **CORP**
3. Enter: **case number** + **SSN 999-00-0000**
4. Execute — the tool reverses the dummy's records
5. Run verification query to confirm dummy records are cleared
6. Only participant-level data should remain on the books

> The ROC tool is the **only place** DCs can make direct table changes. AQT is read-only.

## Key Clarifications

**Who adds the dummy participant?**
The **DC** adds it. Not Doc Ops.

**Is the dummy reused or created fresh?**
Created fresh — **one dummy per plan**. Not reused across plans.

**Is a dummy needed for partial TIK (mixed mapping + TIK funds)?**
No. The dummy is only required for **mapping funds** (re-reg = N). TIK funds create placeholders differently and do not need the dummy.

**What happens if you forget the dummy before Day of Wire?**
> The data won't load correctly and will need to be cleared by Prod Support. It's a nightmare. Don't do it.

This is one of the most painful avoidable mistakes in a conversion. Check for the dummy participant before running Day of Wire — every time.

## See Also

- [[conversion-types]]
- [[informatica]]
- [[liquidation-day]]
- [[final-files-processing]]
- [[p3]]
- [[transfer-in-kind]]
