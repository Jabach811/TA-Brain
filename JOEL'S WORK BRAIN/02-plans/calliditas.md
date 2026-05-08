---
type: plan
title: "Calliditas"
case_id: JK62945-00001
status: Complete
updated: 2026-05-08
sources: 2
---

# Calliditas `JK62945-00001`

<aside class="metadata-card">
<div class="metadata-row"><span class="metadata-key">Type</span><span class="metadata-value">Plan</span></div>
<div class="metadata-row"><span class="metadata-key">Status</span><span class="metadata-value"><span class="status-tag status-complete">Complete</span></span></div>
<div class="metadata-row"><span class="metadata-key">Updated</span><span class="metadata-value">2026-05-08</span></div>
<div class="metadata-row"><span class="metadata-key">Sources</span><span class="metadata-value">1</span></div>
<div class="metadata-row"><span class="metadata-key">Linked from</span><span class="metadata-value">Work Brain plan index</span></div>
<div class="metadata-row"><span class="metadata-key">Active date / wire date</span><span class="metadata-value">Unknown</span></div>
<div class="metadata-row"><span class="metadata-key">Effective date</span><span class="metadata-value">2026-04-01</span></div>
<div class="metadata-row"><span class="metadata-key">Vendor</span><span class="metadata-value">Unknown</span></div>
<div class="metadata-row"><span class="metadata-key">Prior record keeper</span><span class="metadata-value">Unknown</span></div>
<div class="metadata-row"><span class="metadata-key">Payroll vendor</span><span class="metadata-value">Unknown</span></div>
<div class="metadata-row"><span class="metadata-key">Client contact</span><span class="metadata-value">Unknown</span></div>
<div class="metadata-row"><span class="metadata-key">Prior record keeper contact</span><span class="metadata-value">Unknown</span></div>
<div class="metadata-row"><span class="metadata-key">Payroll contact</span><span class="metadata-value">Unknown</span></div>
</aside>

## Description

Go-live/post-go-live work is complete. The retained lessons are loan review discipline and Informatica parameter-file checking.

## Current Updates

### Dates and File Milestones

| Milestone | Date | Status | Notes |
|---|---|---|---|
| Broad caseload status | 2026-04-22 | Waiting | Missing participant details and one loan issue |
| NBI/status email and balance tie-out | 2026-04-27 | Done | Paul responded; everything tied out |
| Loan root cause found | 2026-04-27 | Done | Parameter file referenced wrong input file |
| Loans passed QC | 2026-04-28 | Done | Checked by Paul |
| Elections loaded | 2026-04-29 | Done | Deliverables ready |
| Loan issues wrapped | 2026-05-05 | Done | Final lesson captured |
| Host / go-live call | 2026-05-08 | Scheduled | Expected to be a clean positive wrap |

### Plan-Specific Notes

- If Informatica says succeeded but P3 does not show the expected load, check the parameter file and input file path.
- Keep live files and working files separate.
- Do not rely only on load success messages.
- Small loan files are not automatically safe. Small means there is enough time to inspect everything.

## Daily Updates

| Date | Note |
|---|---|
| 2026-04-22 | Waiting on missing participant DOB/DOH and one loan discrepancy |
| 2026-04-26 | Loan upload appeared successful but did not appear in P3 final step |
| 2026-04-27 | NBI updated; Paul confirmed balances tie; loan root cause found |
| 2026-04-28 | Loans passed Paul QC |
| 2026-04-29 | Elections loaded; deliverables ready; Paul audit next |
| 2026-05-05 | Loan issues wrapped; slow-review lesson captured from Gmail automation transcript |
| 2026-05-06 | Joel reaffirmed the loan/vesting fixes as resolved and kept Calliditas spelling as canonical |
| 2026-05-07 | Host/go-live call scheduled for tomorrow; should be a positive wrap/check-in |

## Open Items

## Lessons Learned / One-offs

### Resolved Items

| Item | Resolved Date | Notes |
|---|---|---|
| Missing participant load blocker | 2026-04-28 | Additional participants were loaded/defaulted |
| Loan QC | 2026-04-28 | Loans checked by Paul and passed QC |
| Elections load | 2026-04-29 | Elections loaded |
| Loan issues | 2026-05-05 | Wrapped |
| Vesting override issue | 2026-05-06 | Joel confirmed the blanket 55 years-of-service override worked and the vesting report came back clean |

### Related

- [[informatica-file-separation]]
- [[loan-review-discipline]]
- [[informatica-loan-troubleshooting]]
