---
title: "Calliditas"
type: plan
tags: [work-brain, plan]
created: 2026-05-08
updated: 2026-05-08
sources: 1
source_file: "02-plans/calliditas.md"
---

# Calliditas

Mostly wrapped / go-live watch. Earlier late-April blockers were missing participant details, one loan discrepancy, and Informatica/P3 load troubleshooting. By 2026-05-05 the loan issues were wrapped, and a host/go-live 

## Source Link
- Operational source: [[02-plans/calliditas]]

## Wiki Summary
This page is the personal-wiki view of `02-plans/calliditas.md`. The operational file remains the source of truth; this wiki page gives the item a stable catalog entry, metadata, and cross-links.

## Source Snapshot
```markdown
# Calliditas

## Current Status

Mostly wrapped / go-live watch. Earlier late-April blockers were missing participant details, one loan discrepancy, and Informatica/P3 load troubleshooting. By 2026-05-05 the loan issues were wrapped, and a host/go-live call is scheduled for 2026-05-08.

## Plan Snapshot

| Field | Value |
|---|---|
| Plan / Client | Calliditas |
| Status | Mostly wrapped / watching |
| Effective Date | Unknown |
| Wire Date | Unknown |
| Test File Date | Unknown |
| Final File Date | Unknown |
| Last Mentioned | 2026-05-07 |

## Current Understanding

Calliditas had new participants included in the asset transfer who were not originally in the system. The needed details were date of birth and date of hire, with address and other census details also needed for a clean load. Loans had a small but important issue: one loan was off, and the larger Informatica issue was eventually traced to a parameter file referencing the wrong input file. The retained lesson from the May 5 transcript is that a small loan population still deserves slow validation: if there are only five loans, check all five instead of trusting the load result. The remaining May 7 item is a host/go-live call tomorrow, expected to be a positive wrap.

## Contacts

| Role | Name | Notes |
|---|---|---|
| QC / Audit | [[paul]] | Confirmed ties/audit work in late April |
| Client Contact | Unknown | Missing participant data came from client-side issue |
| COM | Unknown | Add when provided |
| TC | Unknown | Add when provided |

## Dates and File Milestones

| Milestone | Date | Status | Notes |
|---|---|---|---|
| Broad caseload status | 2026-04-22 | Waiting | Missing participant details and one loan issue |
| NBI/status email and balance tie-out | 2026-04-27 | Done | Paul responded; everything tied out |
| Loan root cause found | 2026-04-27 | Done | Parameter file referenced wrong input file |
| Loans passed QC | 2026-04-28 | Done | Checked by Paul |
| Elections loaded | 2026-04-29 | Done | Deliverables ready |
| Loan issues wrapped | 2026-05-05 | Done | Final lesson captured |
| Host / go-live call | 2026-05-08 | Scheduled | Expected to be a clean positive wrap |

## Open Items

| Item | Owner | Severity | First Mentioned | Last Mentioned | Due | Status | Reminder |
|---|---|---|---|---|---|---|---|
| Attend host / go-live call | Joel | S3 Medium | 2026-05-07 | 2026-05-07 | 2026-05-08 | Scheduled | Meeting prep |
| Confirm Paul audit cleared with no lingering issues | Joel / Paul | S4 Low | 2026-04-29 | 2026-05-06 | Unknown | Watching | Weekly review |

## Resolved Items

| Item | Resolved Date | Notes |
|---|---|---|
| Missing participant load blocker | 2026-04-28 | Additional participants were loaded/defaulted |
| Loan QC | 2026-04-28 | Loans checked by Paul and passed QC |
| Elections load | 2026-04-29 | Elections loaded |
| Loan issues | 2026-05-05 | Wrapped |
| Vesting override issue | 2026-05-06 | Joel confirmed the blanket 55 years-of-service override worked and the vesting report came back clean |

## Plan-Specific Notes

- If Informatica says succeeded but P3 does not show the expected load, check the parameter file and input file path.
- Keep live files and working files separate.
- Do not rely only on load success messages.
- Small loan files are not automatically safe. Small means there is enough time to inspect everything.

## Mention History

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

## Related

- [[informatica-file-separation]]
- [[loan-review-discipline]]
- [[informatica-loan-troubleshooting]]
```

## See Also
- [[people/paul]]
- [[processes/informatica-file-separation]]
- [[processes/loan-review-discipline]]
- [[processes/informatica-loan-troubleshooting]]
- [[02-plans/calliditas]]
