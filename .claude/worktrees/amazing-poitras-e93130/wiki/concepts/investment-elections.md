---
title: "Investment Elections"
type: concept
tags: [concept, elections, investments, allocation, qdia, default, fund-mapping]
created: 2026-04-18
updated: 2026-04-18
sources: 4
---

# Investment Elections

The percentage-based instructions each participant has on file for how new contributions are split across funds, per money source.

> [!needs-review]
> First pass of this concept page. Human flagged this for close review during the next lint pass — this is a core concept and the definitions, QDIA-default interaction, and multi-case merge behavior need a careful eye before this is considered authoritative.

## Definition

An investment election is one row per (participant, money source, fund) with an allocation percentage, an effective date, and an election-type code. At Transamerica they live in `PENSION.PART_ELECT_DETAIL` keyed by `ENRL_PROV_GRP_I` + `PART_ENRL_I`, with the "current" election defined as the row with the latest `EFF_D` for that enrolment and `ELEC_TYP_C = '0'`.

Elections apply to **future contributions**, not to existing balances. Moving existing balances between funds is a **transfer**, not an election change. Elections and [[fund-mapping]] (which moves balances during conversion) are independent processes.

## Why It Matters

At go-live, every participant in a converting plan must have a current set of elections on the new case — otherwise incoming contributions have nowhere to go and land in the plan's QDIA default. Elections can either be:

1. **Copied from the prior plan** (internal conversions: pulled via the `current-elections` query and migrated to the new case).
2. **Re-solicited from participants** (external takeovers: participant enrolls fresh via the Plan Sponsor Site or paper form).
3. **Defaulted to QDIA** for participants who never elect (tagged with `default_ind = 'Y'` in the elections query via a join to `PENSION.PART_PPA_DEFAULT`).

The `default_ind` flag is the one QA cares about most at go-live — it separates participants who **actively chose** their allocation from those who are still in PPA default. The count of defaulted participants is a key number on the [[concepts/csr]] / [[audit-pack]].

## Data Elements

Minimum acceptable election row:

| Field | Column (PENSION.PART_ELECT_DETAIL) | Notes |
|-------|-----------------------------------|-------|
| Case | `ACCOUNT_NO` | Case number + sub-ID |
| Enrolment | `ENRL_PROV_GRP_I`, `PART_ENRL_I` | Resolved via `PART_ENRL` / `PLAN_PROV_GRP` |
| Source | `SRC_I` | 0 = "all sources" (single election across every source); nonzero = specific source |
| Fund | `FUND_I` | Fund internal ID |
| Allocation % | `ELEC_PCT` | Sums to 100% per (participant, source) |
| Effective date | `EFF_D` | Latest `EFF_D` = current |
| Election type | `ELEC_TYP_C` | `'0'` = standard contribution election |

Related "election-like" data that ride alongside the fund elections:

- **Save Express** — auto-enrollment / auto-escalation preferences (stored separately; see `queries/saveexpress-copy`)
- **E-Statement preferences** — paperless-statement opt-in (`PENSION.PART_SERVICE_DATA`, `SERV_TYP_C = 7001`; see `queries/estatement-copy`)
- **Email / secure-data records** — password hash, security answers, email address (`PENSION.EE_SECURE_DATA`; see `queries/email-copy`)

All three must be copied separately during an internal conversion — they do not travel with fund elections.

## Evidence / Examples

- The `current-elections` and `current-elections-multi-case` queries in wiki-v2 are the canonical pre-liquidation pull. They return one row per (source, fund) with the `default_ind` join.
- When `SRC_I = 0`, the page shows `src_txt = 'ALL SOURCES'` — these are participants who chose a single election across every money source rather than setting separate elections per source.
- Multi-case mergers use the `NOT IN` anti-join pattern: old cases on the `IN` clause, new case on the anti-join, so a participant already enrolled in the destination from a prior conversion wave is not double-migrated.

## Counterarguments / Edge Cases

- **QDIA default is not an election.** A participant with `default_ind = 'Y'` has no user-chosen election. After conversion, if the QDIA fund changes, these participants' implicit allocations change too. This is intentional; the blackout notice and SPD call it out.
- **Post-go-live elections don't exist yet.** Do not run the elections pull on the new case before participants have had a chance to log in — you'll get only the QDIA defaults.
- **Save Express and E-Statement do NOT travel with fund elections.** Forgetting to run the separate copy scripts is a recurring post-conversion defect.
- **Excelwise Financial and other advice-platform plans** have an extra default-election check (see `queries/excelwise-default-election-check` in wiki-v2) because advice-platform plans use a different default-election mechanism.

## Related Concepts

- [[fund-mapping]] — moves existing balances, not elections
- [[concepts/qdia]] / default fund — what defaulted participants land in
- [[concepts/blackout-notice]] — blackout covers the period when elections cannot change
- [[concepts/csr]] — reports defaulted-participant counts
- [[concepts/early-access]] — early-access period allows elections before go-live

## Open Questions

- Exhaustive list of `ELEC_TYP_C` values and their meanings.
- Authoritative definition of when the `SRC_I = 0` "all sources" shortcut is used vs. explicit per-source elections.
- How Save Express auto-escalation schedules interact with the elections table during internal conversions.

## See Also

- [[processes/investment-elections-load]]
- [[basis]]
- [[roth]]
- [[loans]]
- [[entities/aqt]]
