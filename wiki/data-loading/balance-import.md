---
title: "Balance Import"
type: data-loading
tags: ["concept", "balance", "conversion", "informatica", "p3"]
created: 2026-04-19
updated: 2026-07-08
sources: 1
status: current
---

# Balance Import

The process of loading prior-record-keeper balances into P3 after a conversion wire or share transfer. Three distinct methods exist depending on whether the prior RK sends cash, a fund-mapped wire, or transfers shares in-kind.

## Methods

| Method | Trigger | CONV Re-Reg | Informatica Workflow | P3 Process Setting |
|---|---|---|---|---|
| **Cash Conversion** | Wire received | No CONV file | CITS Balances | Batch · Process Immediate |
| **Mapping** | Wire received | Re-Reg = N | Day of Wire | Batch · Process Immediate |
| **Transfer In-Kind (TIK)** | Shares arrive | Re-Reg = Y | Day of Wire | Online · Do NOT Process Immediate |

## Six Phases

1. **Day of Wire — Pre-Receipt** (Cash & Mapping only) — Email vendor, follow up, confirm wire booked; fork by method
2. **Setup & File Prep** — Source mapping confirmed; Cash needs blank .txt fund mapping file; Mapping/TIK need fully populated fund mapping file; parameter file created in P2
3. **CONV File Setup** (Mapping & TIK only) — Cash skips this; create CONV ref # per fund, enter totals; set Re-Reg = N (Mapping) or Re-Reg = Y (TIK); confirm dummy participant exists before import
4. **Informatica Load** — Run CITS Balances (Cash) or Day of Wire (Mapping/TIK); run validation queries
5. **Process on P3** — Settings differ by method (see table above); TIK uses backdated ref numbers and never uses Process Immediate
6. **Apply & Final Validation** — Apply balances to participant accounts; run all associated queries for backup

## Critical Differences

- **Re-Reg field** in the CONV file: N = Mapping, Y = TIK — never confuse them; they change the transaction type
- **Process Immediate**: Cash and Mapping use it; TIK never does (shares are backdated)
- **Dummy participant**: Must exist before any import in Mapping or TIK path
- **Cash Conversion**: Requires ALL participants to have investment elections; uses blank (not populated) fund mapping .txt file
- **Day of Wire workflow**: Production only — no test mode; CITS Balances has test mode

## Timing

- Cash: Same day as wire confirmation
- Mapping: Same day as wire confirmation
- TIK: After shares arrive AND in-kind spreadsheet confirmed by Matt O'Connell's team

## Shared Prep Discipline

Timing rules that apply to every import type (from the balance import guide):

- **Wire instructions to the prior RK go out first-thing**, then are re-sent ~1 week before liquidation as a confirmation reset.
- **Request test files ASAP** — source mapping is built from whatever sources have balances on the test files.
- **Send mappings to QA / TC / TM immediately on completion. Never batch.** If a new source appears on final files, add it and resend the moment it appears.
- **−3 business days before the wire:** advance heads-up to the vendor and Cashiering.
- **Order of processing after balances post:** balances → elections + loans (both required before payroll restart) → everything else. Loans gate the resumption of payroll processing, so they sit at the front of the post-balance queue.

## Wire Receipt & Cut-Offs

From the balance import guide:

- Email Cashiering on day-of-wire ASAP with plan number + wire amount: `shtaopscashieringinc@transamerica.com`
- Wire pulls: 7am, 9am, 1pm, 3pm CST
- Cashiering replies when booked; they notify by 3:45pm if received that day
- Wires received after 3pm CST are deposited the next business day
- Cross-check by looking at P2 / P3 to see if money's been booked to the plan

## Booking Assets

> [!warning] Process changed August 2025
> AEDA-withdrawal booking is no longer 4=Remit. It is now **3=Rebook + an AWD ticket**. The old Pension Acct Form / cancel-tr-ref-no / accounting-email workflow is retired.

- **Wire hits State Street** and you're not using the tr-ref-no cashiering booked: book as **4=Remit** (whether mapping or booking to a holding account) and email NY Recon so they can spot variances and piece components together.
- **Withdrawing from AEDA** to process to participant accounts: book as **3=Rebook**, submit a rebook AWD ticket, and before clicking UPDATE change the ticket status to COMPLETED — the ticket is audit trail only, no routing needed.

## Post-Conversion Audit

The closing DC step once the conversion is complete (from the balance import guide):

1. Open the parameter file for the workflow and set `CONTRACT_NO` = the case number with no affiliate.
2. Run `WF_POST_CONVERSION_AUDITS`.
3. Output lands at `POST_CONVERSION_AUDIT_REPORT.TXT` — a single pipe-delimited file with a header record per check. Review the full file before closing out.
4. **Merger plans:** to audit only the population you're responsible for, drop that population into Excel and save as `MERG_POP.TXT` in your conversion folder. The workflow detects it automatically — no parameter file changes needed.

## LTPT — Historical Hours to Request

Secure Act 2.0 Long Term Part Time eligibility (from the balance import guide): if the plan tracks hours-based vesting and Transamerica outsources vesting, request **historical hours by pay period** for participants who haven't yet met regular eligibility.

| Plan Type | Years Required | Rule (current) |
|---|---|---|
| 401(k) | 2021, 2022, 2023 | 500+ hours in 2 consecutive years (was 3 — reduced 1/1/2025), age 21+ |
| 403(b) | 2022, 2023 | 500+ hours in 2 consecutive years, age 21+ |

Status codes for loading: **5** = not eligible, kit mailed due to LTPT eligibility; **6** = eligible, LTPT. Excluded classes (collective bargaining, non-resident aliens) are exempt — but track hours anyway in case they move to a covered class. LTPT participants can make elective deferrals once qualified but are not entitled to employer contributions unless they hit the plan's regular eligibility.

## See Also
- [[balance-import-cash]]
- [[balance-import-mapping]]
- [[balance-import-tik]]
- [[informatica-balance-module]]
- [[conv-file]]
- [[dummy-participant]]
- Matt O'Connell
- [[processes/tik-transfer|transfer-in-kind]]

