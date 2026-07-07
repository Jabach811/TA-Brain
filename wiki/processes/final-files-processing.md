---
title: "Final Files Processing"
type: process
tags: [process, final-files, balances, posting, cit, eds, conversion]
created: 2026-04-14
updated: 2026-05-03
sources: 3
status: current
---

# Final Files Processing

How the DC processes authoritative as-of-liquidation files from the prior record keeper to populate [[p3]] with real participant data.

## Overview

Final files arrive after liquidation. They carry the definitive participant data: balances by source and fund, YTD contributions, compensation, hours, deferral elections, and eligibility. The DC loads them through [[eds]] and [[informatica]] in a strict sequence — balance first, then deferrals, then eligibility, then YTD.

The specific balance-posting steps differ by [[conversion-types|conversion type]] (cash, mapping, or TIK). Everything else runs the same.

## Trigger

The prior record keeper delivers the final files, typically within 5–10 business days after [[liquidation-day|Liquidation Day]]. The DC has already built all EDS layouts in advance so they can run immediately.

## What's in Final Files

- **Participant balances** by source and fund (as of liquidation date)
- **YTD contributions** by source
- **YTD compensation** (and prior year comp if applicable)
- **Hours** (current year and prior year if applicable)
- **Deferral elections** (by source, dollar or percentage)
- **Eligibility data** (status, dates)

## Processing Sequence

**Critical order — do not reverse:**
1. Post participant balances
2. Post deferral elections
3. Enable eligibility (after deferrals, always)
4. Post YTD data (comp, contributions, hours)

See [[eligibility-and-deferrals]] for the eligibility/deferral rules.

### Why Elections + Loans Get Top Priority Right After Balances

Once balances are posted, the next two things on the priority list are **elections** (deferrals) and **loans** (final reconciliation / Phase III takeover — see [[loan-setup]]). Everything else is secondary.

The reason: once balances + elections + loans are settled, **payrolls can begin processing even before the plan is technically live**. Elections tell the system where the contributions go; loans tell it where loan repayments split. With both in place, payroll can run cleanly on the first available pay period — no missed beats.

If elections or loans are still pending when payrolls start coming in, contributions either default (and have to be unwound later) or the loan repayments fail to allocate correctly. Both are clean-up nightmares. So once balances are down, elections and loans jump the queue.

## Steps

### 1. Confirm Client Source Policy — DC
Before loading, confirm what is being used from final files vs. the [[base-file]]. The client decides in advance — all vendor data, all base data, or a hybrid (e.g., "use our data for eligibility only"). This governs which files load into which layouts.

### 2. Build CIT Balance File — DC
Construct the balance file from the final files.
- Structure: `Case Number | Region | SSN | Source | Fund | Total`
- One row per participant per source per fund.
- Distinct from the [[conv-file]], which is fund-level — this is participant-level.

### 3. Test CIT Balance Workflow — DC via Informatica
Run the balance workflow in test mode. Catch layout and mapping errors before production. Always test; don't skip.

### 4. Post Balances — DC via Informatica → P3
**Processing mode depends on conversion type.** Trades fire only once per fund, so choose carefully.

#### Cash conversion
1. Request [[advanced-employer]] liquidation — email [[stacey-fortune]] or [[nick-lister]].
2. Run participant balance workflow (production).
3. In P3: **Process Immediate + Batch**. Trades go out to invest participant cash.
4. Reverse [[dummy-participant]] via ROC tool.
5. Verify balances in P3.

#### Mapping conversion
1. Run participant balance workflow (production).
2. Reverse [[dummy-participant]] via ROC tool.
3. In P3: **Online + No Hold** (NOT Process Immediate). Trades already fired on Day of Wire via the dummy account — posting only books the detail.
4. Verify balances in P3.

#### Transfer in Kind
1. Update [[matt-oconnell]]'s share estimates with final-file totals immediately.
2. Run participant balance workflow — fills the placeholder from Day of Wire.
3. In P3: **Online + No Hold**. Shares are at Fidelity; no trades needed.
4. Verify. See [[tik-transfer]] for the full TIK track.

### 5. Post Deferral Elections — DC
Load via EDS deferral layout. Must happen before eligibility — see [[eligibility-and-deferrals]].

### 6. Enable Eligibility — DC
Load via EDS eligibility layout. Triggers the CIT Eligibility job. See [[processes/eligibility-loading|loading-eligibility-eds]] for the detailed subprocess.

### 7. Post YTD Data — DC
Three separate EDS loads: YTD contributions, YTD compensation, hours. See [[loading-ytd-contributions-eds]] and [[hours-procedure]].

### 8. Post-Processing Verification — DC
- Run standard query set — counts, totals, source breakdown.
- Review EDS output emails for warnings and errors.
- Build the [[audit-pack]].
- Update [[nbi]].

## CIT Balance File

The input file for the Informatica participant balance workflow. Built by the DC from final files. Contains participant-level balance data by source. The Informatica workflow processes this file and posts balances to Bill Remit detail in P3.

**Structure:** `Case Number | Region | SSN | Source | Fund | Total`

Note the key difference from the [[conv-file]]: the CIT balance file is **participant-specific** (one row per participant per source per fund). The CONV file is **fund-specific** (one row per fund).

## EDS Layouts for Final Files

All EDS layouts for final file types should be set up well before final files arrive. Don't wait — build them early. When files come in, you want to be able to run immediately.

**One layout per data type** — balance, YTD contributions, YTD comp, hours, deferrals, and eligibility each get their own separate EDS layout. There is no combined layout.

## Client Data vs. Vendor Data

For eligibility and deferral data specifically: **the client decides** whether to use vendor data or their own data. This decision must be known before final files arrive so the DC knows which files to use.

## Handoff Points

| # | From → To | What Moves | Risk |
|---|-----------|------------|------|
| 1 | Prior RK → DC | Final files | Late delivery stalls every downstream step |
| 2 | DC → Informatica → P3 | CIT balance file | Wrong processing mode → duplicate or missing trades |
| 3 | DC → ROC tool in P3 | Dummy participant reversal (cash + mapping only) | Skipped reversal leaves phantom balance in plan |
| 4 | DC → [[matt-oconnell]]'s team | Updated share estimates (TIK) | Stale estimates → shares sit unclaimed |
| 5 | DC → QA / TC | Completed posting + audit pack | Missing verification queries → errors discovered after go-live |

## P3 Processing Mode Reference

| Conversion | Step | Mode | Trades Fire? |
|------------|------|------|-------------|
| Cash | Balance posting | Immediate + Batch | Yes |
| Mapping | Balance posting | Online + No Hold | No (fired on Day of Wire) |
| TIK | Balance posting | Online + No Hold | No (shares already at Fidelity) |

> **Rule:** Trades fire only ONCE per fund. Confirm which earlier step already sent them before choosing the mode.

## Timing / Deadlines

- **Before final files arrive:** all EDS layouts built and tested.
- **Final files received:** begin balance processing immediately.
- **Balance → Deferrals → Eligibility → YTD:** strict order, no reordering.
- **Audit pack due:** before go-live sign-off.

## Failure Modes

- **Reversing the sequence.** Posting eligibility before deferrals corrupts the enrollment logic.
- **Wrong P3 mode.** Process Immediate on a mapping or TIK conversion fires duplicate trades — requires reversal via [[reversal-submission]].
- **Forgetting the dummy participant reversal.** Leaves a phantom balance that shows up in every subsequent audit query.
- **Stale TIK share estimates.** Matt's team can't match incoming shares → delayed posting.
- **EDS layout not built in advance.** Final files arrive but there's nowhere to load them → days of avoidable delay.
- **Using wrong data source.** Loading vendor eligibility when client chose base-file eligibility (or vice versa) requires full rework.

## Open Questions

- What queries are run to verify balances after posting? *(Many — will be documented separately)*

## See Also

- [[liquidation-day]]
- [[tik-transfer]]
- [[processes/eligibility-loading|loading-eligibility-eds]]
- [[loading-ytd-contributions-eds]]
- [[dummy-participant]]
- [[conversion-types]]
- [[eligibility-and-deferrals]]
- [[audit-pack]]
- [[plan-conversion-handoffs]]
- [[roles/lm-dc]]
- [[informatica]]
- [[eds]]
- [[p3]]
- [[base-file]]
- [[conv-file]]
- [[loan-setup]]

