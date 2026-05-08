---
title: "Balance Import — Transfer In Kind (TIK)"
type: process
tags: [process, balance, final-files, tik, transfer-in-kind, informatica, p3, conversion]
created: 2026-04-18
updated: 2026-04-18
sources: 4
---

# Balance Import — Transfer In Kind (TIK)

How participant balances are posted after a TIK conversion, where specific fund shares are physically transferred to Fidelity rather than liquidated.

> [!needs-review]
> First pass synthesized from training notebook, brain dump, and extra-questions source. Step details and Matt O'Connell spreadsheet specifics need SME verification.

## Overview

In a transfer in kind conversion, designated funds are transferred share-for-share from the prior RK's custodian to Fidelity (TA's custodian) — no liquidation, no trades. On Day of Wire, a Bill Remit detail placeholder is created for the expected share amounts. When participant balances are posted during final files processing, Informatica fills in the participant-level detail on that placeholder. **No trades are sent** — shares are already physically in transit or arrived. Using Process Immediate here would trigger unnecessary trading on assets that don't need it.

A plan may have some funds as TIK and other funds as mapping or cash in the same conversion. The CIT file handles all in one run; the P3 mode still applies as Online + No Hold for the TIK portion.

**Dummy participant is not required for pure TIK conversions.** Only mapping (funds with re-reg = N) requires the dummy participant.

## Trigger

- Prior RK final files received and validated
- [[entities/matt-oconnell|Matt O'Connell's]] team has confirmed share arrival or estimates are updated in the tracker spreadsheet
- Day of Wire complete — Bill Remit detail placeholder created for TIK shares
- Participant census, elections, and sources already loaded in P3

## Steps

| # | Step | Owner |
|---|------|-------|
| 1 | As soon as final files arrive, update Matt O'Connell's share tracker spreadsheet with final file share totals by fund — he needs these for the Fidelity transfer | [[roles/lm-dc]] |
| 2 | Build the **CIT balance file** from prior RK final files: `Case Number | Region | SSN | Source | Fund | Total` — one row per participant per source per fund | [[roles/lm-dc]] |
| 3 | Set up EDS layout for the balance file if not already done | [[roles/lm-dc]] |
| 4 | Run Informatica participant balance workflow in test mode (`$$Test_File = P`) — verify row counts and totals | [[roles/lm-dc]] |
| 5 | Run Informatica participant balance workflow in production (`$$Test_File = N`) — this fills in the Bill Remit detail created on Day of Wire | [[roles/lm-dc]] |
| 6 | In P3: set processing mode to **Online + No Hold** — books participant-level detail; no new trades | [[roles/lm-dc]] |
| 7 | Run verification queries to confirm participant balances match final files totals and share tracker | [[roles/lm-dc]] |
| 8 | Proceed to deferral elections load; then eligibility; then YTD | [[roles/lm-dc]] |

## Handoff Points

- **DC → Matt O'Connell:** share amount estimates via tracker spreadsheet, updated immediately when final files arrive; Matt's team stages the Fidelity transfer
- **Matt O'Connell → DC:** spreadsheet updated when shares arrive at Fidelity; DC checks the tracker before posting
- **DC → QA:** verification of posted balances (QA reviews audit pack post-conversion)

## Timing / Deadlines

- Update Matt's spreadsheet immediately when final files arrive — his team cannot complete the transfer without accurate share counts
- Matt's team needs ~10 business days of advance notice to set up Fidelity pooled accounts; confirm this happened during plan onboarding
- Balance posting should wait until all expected shares have arrived or Matt has confirmed partial processing is appropriate
- Process in chunks if shares arrive in batches — confirm with Matt which funds are ready before running

## Failure Modes

- **Share tracker not updated before Matt proceeds.** Transfer is made using estimate amounts, not final figures. Creates mismatch between shares transferred and balances posted. Update tracker immediately.
- **Process Immediate used instead of Online + No Hold.** Triggers trades on assets that are already in transit as shares — creates a double-buying situation. Critical error requiring Prod Support intervention.
- **Shares not yet arrived when balance posting runs.** Bill Remit detail fills before physical shares are at Fidelity. Reconciliation will fail. Confirm with Matt before running production.
- **Mixed TIK/mapping plan — wrong mode for mapping portion.** If some funds are TIK and some are mapping, the mapping portion still follows mapping rules (Online + No Hold, trades already out on Day of Wire). Do not use Process Immediate for any portion.
- **CIT file includes closed/zero-balance TIK funds.** Empty rows cause load issues. Exclude zero-balance participant-fund rows before running.
- **Fidelity accounts not set up in advance.** Matt's team needs time; if this was missed during onboarding, shares cannot transfer on schedule. Escalate immediately.

## See Also

- [[concepts/balance-import]]
- [[concepts/conversion-types]]
- [[concepts/transfer-in-kind]]
- [[concepts/final-files-processing]]
- [[entities/matt-oconnell]]
- [[concepts/informatica-balance-module]]
- [[processes/balance-import-cash]]
- [[processes/balance-import-mapping]]
- [[processes/prod-support-ticket]]
