---
title: "Census Load"
type: process
tags: [process, census, takeover, eds, qa, gap-audit]
created: 2026-04-18
updated: 2026-04-18
sources: 3
---

# Census Load

How an inbound census file becomes rows in `CORP.EMPLOYEE` and `CORP.EE_BEN_ADDRESS`, with QA gap audits run after.

> [!needs-review]
> First pass of this process page. Human flagged this for close review during the next lint pass — step ownership, exact EDS job names, and failure-mode handling need SME verification before this is considered authoritative.

## Overview

Census is the first participant-level data load on a conversion — everything else (basis, allocations, deferrals, loans) depends on it. The process intakes a census file from the prior RK or client, normalizes it to the TA census layout, loads through EDS, then runs a suite of verification and gap-audit queries before unblocking the downstream loads.

## Trigger

One of:

- **Takeover:** prior RK delivers the base-file census per the [[concepts/data-discovery-document]] agreement, or the client uploads the [[concepts/base-file]] template seeded with participant data.
- **Internal conversion:** the surviving case already has census on `EMPLOYEE`; the outgoing case contributes additional enrollees via a migration query.
- **Ongoing plan:** refresh arrives via client payroll feed on the [[concepts/ftp-connection]].

## Steps

| # | Step | Owner |
|---|------|-------|
| 1 | Receive census file; verify header + record count vs. cover sheet | [[roles/lm-dc]] |
| 2 | Map incoming columns to TA census layout; flag any missing required fields | [[roles/lm-dc]] |
| 3 | Run pre-load existence check — `SELECT * FROM CORP.EMPLOYEE WHERE CASE_NO LIKE '...'` | [[roles/lm-dc]] |
| 4 | Set up EDS layout for census if not already present | [[roles/lm-dc]] / [[entities/eds]] |
| 5 | Load census file through EDS | [[entities/eds]] |
| 6 | Run TO Census extract (`queries/to-census`) and compare to inbound file | [[roles/lm-dc]] |
| 7 | Run gap-audit queries (missing class code, division, employee number, gender, payroll freq, term reason) | [[roles/lm-dc]] |
| 8 | Escalate gaps to client or prior RK for fill-in | [[roles/com]] |
| 9 | Re-run extract + gap audits after corrections loaded | [[roles/lm-dc]] |
| 10 | Sign off — unblocks basis, allocations, deferrals loads | [[roles/qa]] |

## Handoff Points

- **Inbound:** prior RK / client → DC (census file, via secure file transfer or [[entities/wx]] upload).
- **Gap escalation:** DC → COM → client/prior RK, with the list of SSNs missing required fields attached.
- **Sign-off:** DC → QA for load verification before downstream processes unblock.

## Timing / Deadlines

- Census must be loaded and QA-signed **before** basis, allocations, deferrals, or loans can load.
- On a takeover, census is typically loaded 2–4 weeks before liquidation day so there is time to cycle gap-fills with the client.
- On an internal conversion, census migration runs within the Day-of-Wire or Day-of-Rebook window per the surviving case's conversion type.

## Failure Modes

- **Required field missing for > handful of participants.** Return to client / prior RK; do not guess. Division, class code, and employee number are plan-specific and cannot be fabricated.
- **Duplicate SSNs on census.** Expected when a participant has been rehired — use `ROW_NUMBER() OVER (PARTITION BY SOC_SEC_NO ORDER BY EE_TERM_DT DESC NULLS LAST, EE_HIRE_DT DESC)` to pick the most-recent row. If duplicates are truly the same employment record, open a [[processes/prod-support-ticket]] to deduplicate.
- **Address row missing (`EE_BEN_ADDRESS` with `PAYEE_TYP_CD = '1'`).** Blocks statement generation and blackout-notice mailing. Must be filled before [[concepts/blackout-notice]] goes out.
- **Term date without term reason.** Blocks [[concepts/fod-status]] carry-forward — fill before loading downstream data.
- **Load errors on EDS.** Consult [[concepts/informatica-troubleshooting-guide]] or open [[processes/prod-support-ticket]] with the error output attached.

## See Also

- [[census]]
- [[concepts/base-file]]
- [[concepts/data-discovery-document]]
- [[concepts/faa-dc-data-requirements]]
- [[entities/eds]]
- [[entities/aqt]]
