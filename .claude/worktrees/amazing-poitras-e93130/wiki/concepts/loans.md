---
title: "Loans"
type: concept
tags: [concept, loans, loan, takeover, holb, liquidation, defaulted-loans, deemed]
created: 2026-04-18
updated: 2026-04-18
sources: 3
---

# Loans

Outstanding participant loans against their own account balance — tracked as a loan header (initial amount, issue date, maturity, rate, status) plus per-source splits and a repayment history.

> [!needs-review]
> First pass of this concept page. Human flagged this for close review during the next lint pass — loan migration is a recurring failure point and the HOLB, blended-rate, and takeover-sourced distinctions need SME verification before this is considered authoritative.

## Definition

A loan is a participant-initiated borrowing against their vested balance, collateralized by money sources in proportion to the originating balances. At Transamerica each loan has:

1. A **header row** in `CORP.LOAN_DETAIL` (or `TDA.LOAN_DETAIL`) — one row per loan with initial amount, original date, maturity, blended rate, status, repayment frequency, default date, loan type, and up to eight `TYP_n_ORIG_LN_AMT` columns for the per-type original amounts.
2. **Source-level collateral rows** in `PENSION.LOAN_DETAIL_SRC` and `PENSION.LOAN_DETAIL_SRC_HISTORY` — the per-money-source split of the principal.
3. **Repayment rows** in `CORP.LOAN_REPAYMENT` / `CORP.VLOAN_REPAYMENT` — one per paydown, with principal-due balances over time.
4. **History** (`LOAN_HISTORY`) — prior states of the header, including original amounts at `SEQ_N = 0`.
5. **Defaulted-source rows** (`LOAN_DEF_SRC`) — amounts defaulted by source.

Status codes in `LN_TR_STAT_CD`: `'3'`, `'4'`, `'E'` are closed statuses (paid off, offset, etc.); everything else is an active-loan status.

## Why It Matters

Loans are the most failure-prone domain of any takeover because the data shape varies wildly across prior RKs and IRS rules constrain what can be re-loaned post-conversion. Three IRS rules drive most of the complexity:

- **50%-of-vested-balance or $50,000 cap** on any new loan, whichever is smaller.
- **HOLB (Highest Outstanding Loan Balance) 12-month lookback** — the $50,000 cap is reduced by the highest loan balance the participant carried at any point in the prior 12 months. This is why the HOLB query (`queries/highest-loan-balance`) is pulled pre-liquidation.
- **Deemed-distribution loans** stay on the participant's record as deemed distributions for life — they are not paid-off, they are 1099'd as taxable income, and they still count against loan-count limits.

At go-live, every active loan on the old plan must become an active loan on the new plan with **identical** header fields and source splits, or the participant ends up with loan terms that differ from what they signed up for.

## Data Elements

Header (`CORP.LOAN_DETAIL`):

| Field | Column | Notes |
|-------|--------|-------|
| Initial amount | `INIT_LN_AMT`, `INIT_TKOVR_LN_AMT`, or original from `LOAN_HISTORY SEQ_N=0` | Max of the three — see below |
| Original date | `ORIGINAL_LN_DT` or `INIT_TKOVR_EFF_DT` | Use `INIT_TKOVR_EFF_DT` if `SRC_CD='T'` (nested takeover) |
| Maturity date | `MATUR_DT` | |
| Blended rate | `BLENDED_RT` | Rate across the loan life |
| Repayment frequency | `REPAY_FREQ_CD` | W/B/S/M |
| Repayment amount | `REPAY_AMT` | Per-period amount |
| Principal due | Computed from initial minus `TYPn_LN_PRNC_AMT` sums | |
| Default date | `DEF_DT` | Null if not defaulted |
| Status | `LN_TR_STAT_CD` | Closed = `'3'`, `'4'`, `'E'` |
| Loan type | `LN_TYP_CD` | General-purpose vs. residential |
| Duration | Computed from `ORIGINAL_LN_DT` to `MATUR_DT` | |

Source split (`PENSION.LOAN_DETAIL_SRC` + `..._HISTORY` at `SEQ_NO=0`):

- `SRC_I`, `source_bal` = original source amount − total paid-to-date from `LOAN_REPAY_SRC`.

## Evidence / Examples

- `takeover-loan-query-build` assembles the canonical header per loan using the three-way CASE logic on initial amount (LOAN_HISTORY vs. INIT_TKOVR_LN_AMT vs. INIT_LN_AMT — pick the max) and the conditional date logic on `SRC_CD`.
- `takeover-loan-sources` is the companion per-source split — joins `LOAN_DETAIL_SRC` with `LOAN_DETAIL_SRC_HISTORY` at `SEQ_NO=0` and subtracts paid-to-date.
- `loan-balances-prior-to-liquidation` is the pre-liquidation snapshot for the liquidation agent — UNION of (participants with repayments) and (participants with no repayments yet), excluding closed loans.
- `highest-loan-balance` is the IRS HOLB calculation — 12-month rolling scan of `VLOAN_REPAYMENT` returning the minimum positive `PRNC_BAL_DUE_AMT` per (SSN, year-month).

## Counterarguments / Edge Cases

- **Deemed loans still collateralize.** A deemed-distributed loan has been 1099'd but the source balance is still pledged until offset — it counts against future loan-limits and participant can still pay it back (the repayment creates basis).
- **Nested takeovers.** A loan that came in as a takeover on the prior plan (now being taken over again) has `SRC_CD = 'T'` and `INIT_TKOVR_EFF_DT` rather than `ORIGINAL_LN_DT`. Using the wrong date for maturity calc under-counts the loan's duration.
- **Sub-ID / affiliate exclusion.** Some prior plans carry placeholder sub-IDs for loan records that do not correspond to real participants — the takeover-loan queries support a `NOT_THESE_AFFILIATES` exclusion list.
- **Participants with no repayments yet** will have no rows in `LOAN_REPAYMENT`; the UNION-ALL in `loan-balances-prior-to-liquidation` is there specifically so they don't disappear from the snapshot.

## Related Concepts

- [[concepts/informatica-loan-module]] — load mechanics
- [[census]] — loan records require a census row
- [[basis]] — deemed-loan basis is a basis bucket
- [[concepts/reversal-process]] — loan reversals route through the same Reversal Form

## Open Questions

- Authoritative cross-reference between `LN_TYP_CD` values and the IRS general-purpose vs. residential distinction.
- When a loan's source split disagrees with current source balances (e.g. source was zeroed out since loan issue), what is the correction workflow?
- Is HOLB required for every takeover, or only for plans where the new RK will support additional loans?

## See Also

- [[processes/loan-takeover]]
- [[concepts/informatica-loan-module]]
- [[basis]]
- [[roth]]
- [[entities/aqt]]
