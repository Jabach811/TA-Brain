---
title: "CONV File"
type: concept
tags: [conv-file, informatica, liquidation, day-of-wire, mapping, tik]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# CONV File

The input file for the Informatica Day of Wire workflow. Built in advance as a skeleton; fund totals and transfer reference numbers are filled in on liquidation day.

## Overview

The CONV file is the structured data file that drives the [[informatica]] Day of Wire workflow on liquidation day. It contains one row per fund being transferred, with all information Informatica needs to create the correct transaction records in [[p3]]. The skeleton (fund list, codes, re-reg indicators) is prepared well in advance; only the amounts and ref numbers are added on the day.

## Structure

| Field | Description |
|-------|-------------|
| Case Number | Plan case number |
| Prior Fund Code | Prior vendor's fund identifier |
| TA Fund Code | TransAmerica fund identifier |
| Ref Number | Transfer reference number — created in [[p2]] on liquidation day |
| Amount | Total dollar amount for this fund — filled in from vendor breakdown on liquidation day |
| ReReg | Y = Transfer In Kind; N = Mapping |

## ReReg Field Logic

| Value | Meaning | Informatica Behavior |
|-------|---------|---------------------|
| N | Fund is being liquidated and mapped | Books to [[dummy-participant]] account; trades go out |
| Y | Fund is being transferred in kind | Creates placeholder in Bill Remit; no trades |

A single CONV file can contain both Y and N rows — mixed plans (some funds TIK, some mapping) are handled per-fund within the same file.

## Relationship to CIT Balance File

| | CONV File | CIT Balance File |
|--|-----------|-----------------|
| Used in | Day of Wire workflow | Participant Balance workflow |
| Granularity | One row per **fund** | One row per **participant per source per fund** |
| Built | In advance (skeleton); totals added day-of | From final files after liquidation |
| Testable | **No** — runs live only | Yes — test run available |

## Preparation Timeline

1. **After fund and source mapping are approved:** Build the CONV file skeleton — fund list, prior and TA codes, re-reg indicators. Leave Amount and Ref Number blank.
2. **On liquidation day:** Create ref numbers in [[p2]] → fill them in. Receive vendor fund breakdown → fill in Amounts per fund.
3. **Before running:** Verify all fields are complete and the sum of Amounts matches the wire total confirmed by [[cashiering]].

## Critical Warning

> The Day of Wire workflow **cannot be tested**. Once you import the CONV file and run the workflow, it is live and real. Triple-check every field before importing.

The only mode available before production is a debug/preview — it is not a full test run.

## Cash Conversion Exception

Cash conversions do not use a CONV file. Money goes to the [[advanced-employer]] account directly. The CONV file is only used for mapping and TIK conversions.

## See Also

- [[informatica]]
- [[liquidation-day]]
- [[p2]]
- [[fund-mapping]]
- [[source-mapping]]
- [[dummy-participant]]
- [[transfer-in-kind]]
- [[conversion-types]]
- [[advanced-employer]]
