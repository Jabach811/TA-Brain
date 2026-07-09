---
title: "Day of Wire Audit"
type: checklist
tags: [process, day-of-wire, audit, validation, balances]
created: 2026-06-25
updated: 2026-06-25
status: needs-review
sources: 2
---

# Day of Wire Audit

Validation pass for the high-risk checks the DC performs around day-of-wire processing.

## Overview

The day-of-wire audit is the control layer around [[liquidation-day]] and balance-import processing. It verifies that the money or shares are ready, the correct reference numbers exist, the right [[informatica]] workflow was run, and the resulting P3 detail is backed up before the process moves forward.

This page is a working reference built from existing wiki material. It should be tightened against the live DC checklist and query library when those sources are ingested.

## Trigger

Use this audit when a conversion reaches day-of-wire activity for:

- [[balance-import-mapping]]
- [[balance-import-tik]]
- [[balance-import-cash]]
- Any workflow that creates or applies transfer reference numbers on liquidation day

## Audit Checks

### 1. Confirm the Trigger

- Cash or Mapping: confirm [[cashiering]] has booked the wire and provided the transfer reference number.
- TIK: confirm shares have arrived or are ready to process through the TIK tracker.
- Do not run the day-of-wire workflow from assumption alone.

### 2. Confirm File Readiness

- Verify the [[conv-file]] has the correct fund rows, amounts, and re-registration indicators.
- Mapping rows should have `Re-Reg = N`.
- TIK rows should have `Re-Reg = Y`.
- Confirm the required [[dummy-participant]] exists for mapping conversions.

### 3. Capture Informatica Evidence

- Run the correct [[informatica]] workflow.
- Remember that the Day of Wire workflow is production-only and cannot be test-run.
- Save run output, counts, totals, errors, and any screenshots or logs required for backup.

### 4. Validate P3 Posting Controls

- Confirm the correct P3 processing mode for the conversion type.
- Mapping: trades already fire on day-of-wire through the dummy participant.
- TIK: use Online + No Hold later; do not use Process Immediate.
- Cash: participant balance processing differs from Mapping/TIK and should follow the cash balance-import path.

### 5. Run Balance Backup

- Run the standard balance queries and compare counts, totals, sources, and fund detail.
- Confirm the transfer reference numbers appear where expected.
- Save query output with the conversion backup material.

### 6. Hand Off Evidence

- Add the audit evidence to the conversion backup package.
- Use the output to support the [[audit-pack]] and downstream QA review.
- Call out any mismatch before final-files processing continues.

## Failure Modes

| Risk | Why It Matters |
|---|---|
| Workflow run before wire/share confirmation | Creates live production activity before the trigger is real |
| Wrong Re-Reg value | Mapping and TIK can process under the wrong transaction behavior |
| Missing dummy participant | Mapping workflow cannot route the initial trade correctly |
| Missing ref number evidence | Downstream backup cannot prove what was booked |
| Incorrect P3 mode | Can create duplicate trades or wrong posting behavior |

## See Also

- [[liquidation-day]]
- [[balance-import]]
- [[balance-import-mapping]]
- [[balance-import-tik]]
- [[balance-import-cash]]
- [[conv-file]]
- [[informatica]]
- [[p3]]
- [[cashiering]]
- [[audit-pack]]
- [[final-files-processing]]
