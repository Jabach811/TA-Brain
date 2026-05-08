---
title: "Loan Takeover"
type: process
tags: [process, loans, takeover, holb, liquidation, migration]
created: 2026-04-18
updated: 2026-04-18
sources: 3
---

# Loan Takeover

How active loans on an outgoing plan become active loans on the new plan, with HOLB history preserved and IRS loan limits still enforceable post-conversion.

> [!needs-review]
> First pass of this process page. Human flagged this for close review during the next lint pass — step ownership, the exact Informatica Loan Module invocation, and the verification steps need SME verification before this is considered authoritative.

## Overview

Loans are the most failure-prone takeover domain. A successful loan takeover produces, for each active loan on the outgoing plan:

- A **header row** on the new case with identical initial amount, original date, maturity, blended rate, repayment frequency, and status.
- A **per-source split** matching the outgoing plan's source-level collateral.
- A **HOLB history snapshot** for the prior 12 months so post-conversion new loans are capped correctly.
- Any **defaulted loans** carried over with the correct deemed status and default date.

## Trigger

- Plan conversion includes active loans (confirmed via [[concepts/data-discovery-document]] and the outgoing plan's loan portfolio).
- Pre-liquidation data-pull window is open.
- Outgoing plan's loan portfolio is stable — no new loans or payoffs since the last reconciliation.

## Steps

| # | Step | Owner |
|---|------|-------|
| 1 | Run pre-liquidation snapshot — `queries/loan-balances-prior-to-liquidation` — UNION of (with-repayment) and (no-repayment) participants, exclude closed statuses (`'3'`, `'4'`, `'E'`) | [[roles/lm-dc]] |
| 2 | Hand snapshot to liquidation analyst for reconciliation vs. liquidation-agent records | [[roles/lm-dc]] → liquidation analyst |
| 3 | Run HOLB query — `queries/highest-loan-balance` — 12-month rolling scan ending on liquidation date | [[roles/lm-dc]] |
| 4 | Build takeover loan header rows — `queries/takeover-loan-query-build` with SETPARM (`CASE`, `Business_line`, `NOT_THESE_AFFILIATES`) | [[roles/lm-dc]] |
| 5 | Build per-source splits — `queries/takeover-loan-sources` | [[roles/lm-dc]] |
| 6 | Run extracts through the [[concepts/informatica-loan-module]] on Day of Wire / Day of Rebook per conversion type | [[roles/lm-dc]] / [[entities/informatica]] |
| 7 | Verify header fields match pre-load extracts exactly (initial amount, original date, maturity, rate, status) | [[roles/qa]] |
| 8 | Verify per-source splits reconcile to per-loan totals | [[roles/qa]] |
| 9 | Verify defaulted loans carried the correct `DEF_DT` and `LN_TR_STAT_CD` | [[roles/qa]] |
| 10 | Close any Prod Support tickets opened for edge cases ([[processes/prod-support-ticket]]) | [[roles/lm-dc]] |

## Handoff Points

- **DC → liquidation analyst:** loan balance snapshot pre-liquidation, for reconciliation against the liquidation agent's numbers.
- **DC → Informatica:** loan header + source extracts become the input to the Loan Module run on conversion day.
- **DC → QA:** post-load verification — DC writes, QA signs off. Any discrepancy goes to [[processes/prod-support-ticket]] for correction.
- **DC → participant communications:** if a loan's terms had to change (very rare — e.g. rate-blend at merger), [[roles/com]] notifies the affected participants.

## Timing / Deadlines

- **Pre-liquidation pull** must be run with a frozen outgoing-plan portfolio. If a loan is issued or paid off between the pull and liquidation, the extract is stale — re-run.
- **HOLB 12-month window** ends on liquidation date. Running earlier under-counts by the difference in days.
- **Loan Module load** runs within the Day-of-Wire / Day-of-Rebook batch window per [[concepts/final-files-processing]].
- **Post-load verification** must finish before go-live — loan participants calling in on day one with mismatched terms is a high-visibility defect.

## Failure Modes

- **Initial-amount ambiguity.** Loan header can have three candidate initials (`INIT_LN_AMT`, `INIT_TKOVR_LN_AMT`, `LOAN_HISTORY SEQ_N=0`). The query takes the max; if the underlying data is inconsistent between them, flag and resolve before load.
- **Nested takeover date wrong.** Loans with `SRC_CD = 'T'` need `INIT_TKOVR_EFF_DT` not `ORIGINAL_LN_DT`. Getting this wrong distorts the duration calc and the amortization.
- **Placeholder affiliate sub-IDs included.** Use the `NOT_THESE_AFFILIATES` SETPARM to exclude non-real sub-IDs or loan rows load for phantom participants.
- **Defaulted loan loaded as active.** Status code not carried → deemed loan becomes active, re-opening taxable-distribution exposure.
- **Source split does not sum to header principal.** Indicates stale `LOAN_DETAIL_SRC_HISTORY` or a paid-to-date mismatch; reconcile against `LOAN_REPAY_SRC` before re-running.
- **Participant with no repayments omitted from snapshot.** Use the UNION-ALL pattern in `loan-balances-prior-to-liquidation` — participants with no `LOAN_REPAYMENT` rows must appear as "NO PAYMENTS".
- **Closed loans pulled in by mistake.** Confirm the `LN_TR_STAT_CD NOT IN ('3','4','E')` exclusion is in every extract.

## See Also

- [[loans]]
- [[concepts/informatica-loan-module]]
- [[concepts/liquidation-day]]
- [[concepts/final-files-processing]]
- [[processes/prod-support-ticket]]
- [[entities/aqt]]
