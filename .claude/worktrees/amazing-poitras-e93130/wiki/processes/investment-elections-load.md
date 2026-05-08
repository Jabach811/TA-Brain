---
title: "Investment Elections Load"
type: process
tags: [process, elections, investments, internal-conversion, qdia, save-express, e-statement]
created: 2026-04-18
updated: 2026-04-18
sources: 3
---

# Investment Elections Load

How current fund elections (and their siblings — Save Express, E-Statement, secure-data) move from an outgoing case to a new case at conversion.

> [!needs-review]
> First pass of this process page. Human flagged this for close review during the next lint pass — step ownership, the QDIA-vs-elected split, and sequencing vs. enrolment record creation need SME verification before this is considered authoritative.

## Overview

On an internal conversion, each participant's fund elections, auto-enrollment / auto-escalation (Save Express) preferences, e-statement opt-in, and secure-data (password, email) must follow them to the new case. These travel as **four separate loads**, not one. Missing any of them is a common post-conversion defect.

On an external takeover, elections usually do not migrate — participants re-enroll fresh. But the QDIA default and default-code plumbing still has to be in place so that participants who do not re-enroll land in the plan's default fund.

## Trigger

- Surviving case is established and participant enrolment records exist (`PART_ENRL`, `PLAN_PROV_GRP` rows on the new case).
- Liquidation has been scheduled and the pre-liquidation data pull window is open.

## Steps

| # | Step | Owner |
|---|------|-------|
| 1 | Pull current elections on old case(s) — `queries/current-elections` (single case) or `queries/current-elections-multi-case` (multi-case merger) | [[roles/lm-dc]] |
| 2 | Review `default_ind` split: how many participants are actively elected vs. in QDIA default | [[roles/lm-dc]] |
| 3 | For multi-case mergers, confirm the target-case anti-join is in place so already-enrolled participants are excluded | [[roles/lm-dc]] |
| 4 | Load elections onto new case via migration script — writes to `PENSION.PART_ELECT_DETAIL` with latest `EFF_D` per (enrolment, source) | [[roles/lm-dc]] |
| 5 | Copy Save Express records — `queries/saveexpress-copy` | [[roles/lm-dc]] |
| 6 | Copy E-Statement elections — `queries/estatement-copy` (populates scratch `estatement` table → INSERT into `PENSION.PART_SERVICE_DATA` with `SERV_TYP_C = 7001`) | [[roles/lm-dc]] |
| 7 | Copy secure-data records — `queries/email-copy` (INSERT into `PENSION.EE_SECURE_DATA` excluding SSNs that already have a target-case row) | [[roles/lm-dc]] |
| 8 | For Excelwise Financial / advice-platform plans: run `queries/excelwise-default-election-check` | [[roles/lm-dc]] |
| 9 | Verify on new case — elections appear with correct `default_ind`, Save Express populated, E-Statement opt-ins present, secure-data rows migrated | [[roles/qa]] |
| 10 | Sign off — unblocks go-live communication | [[roles/qa]] |

## Handoff Points

- **Pre-pull → load:** DC confirms old-case election set is stable (no ongoing participant edits) before extracting.
- **Load → verify:** DC writes, QA verifies. The `default_ind` distribution on the new case should match the old case within noise.
- **Verify → communications:** once QA signs off, [[roles/com]] can send conversion notifications containing web-login instructions (secure-data must already be migrated so participants can log in).

## Timing / Deadlines

- Run elections pull **pre-liquidation** — after liquidation the old case's election data may be altered by conversion processes.
- Run Save Express / E-Statement / secure-data copies **post-load, after new-case enrolment records exist** so `PART_ENRL_I` lookups resolve.
- All four loads must be complete **before** the communications team sends conversion notifications that reference participant web login.

## Failure Modes

- **Participant already enrolled in target case.** Happens in multi-wave mergers. The `NOT IN` anti-join in `current-elections-multi-case` is mandatory — without it you duplicate elections and the participant ends up with stale + fresh rows, with the stale ones having later `EFF_D` and winning.
- **Save Express / E-Statement forgotten.** The fund-election load succeeds and looks complete, but auto-escalation schedules reset and participants revert to paper statements. Both must be copied in separate runs.
- **Secure-data load runs before new-case enrolment.** `PART_ENRL_I` lookups return null and the INSERT fails or produces orphan rows.
- **Pulled old-case elections after participants had been migrated.** Old-case elections may have been zeroed; run the pull before any migration transaction.
- **QDIA default fund changed during conversion.** Defaulted participants now hold a different fund than before. Intentional — but confirm the blackout notice and SPD language reflect the new default.

## See Also

- [[investment-elections]]
- [[concepts/fund-mapping]]
- [[concepts/blackout-notice]]
- [[concepts/csr]]
- [[concepts/early-access]]
- [[entities/aqt]]
