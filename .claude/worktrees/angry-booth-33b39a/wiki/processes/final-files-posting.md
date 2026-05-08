---
title: "Final Files Processing"
type: process
tags: [process, final-files, balances, posting, cit, eds, conversion]
created: 2026-04-16
updated: 2026-04-16
sources: 2
---

# Final Files Processing

How the DC processes authoritative as-of-liquidation files from the prior record keeper to populate [[p3]] with real participant data.

## Overview

Final files arrive after liquidation. They carry the definitive participant data: balances by source and fund, YTD contributions, compensation, hours, deferral elections, and eligibility. The DC loads them through [[eds]] and [[informatica]] in a strict sequence — balance first, then deferrals, then eligibility, then YTD.

The specific balance-posting steps differ by [[conversion-types|conversion type]] (cash, mapping, or TIK). Everything else runs the same.

## Trigger

The prior record keeper delivers the final files, typically within 5–10 business days after [[liquidation-day|Liquidation Day]]. The DC has already built all EDS layouts in advance so they can run immediately.

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
Load via EDS eligibility layout. Triggers the CIT Eligibility job. See [[loading-eligibility-eds]] for the detailed subprocess.

### 7. Post YTD Data — DC
Three separate EDS loads: YTD contributions, YTD compensation, hours. See [[loading-ytd-contributions-eds]] and [[hours-procedure]].

### 8. Post-Processing Verification — DC
- Run standard query set — counts, totals, source breakdown.
- Review EDS output emails for warnings and errors.
- Build the [[audit-pack]].
- Update [[nbi]].

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

## See Also

- [[liquidation-day]]
- [[tik-transfer]]
- [[loading-eligibility-eds]]
- [[loading-ytd-contributions-eds]]
- [[dummy-participant]]
- [[conversion-types]]
- [[eligibility-and-deferrals]]
- [[audit-pack]]
- [[plan-conversion-handoffs]]
- [[lm-dc]]
