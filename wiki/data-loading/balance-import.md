---
title: "Balance Import"
type: data-loading
tags: ["concept", "balance", "conversion", "informatica", "p3"]
created: 2026-04-19
updated: 2026-04-19
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

## See Also
- [[balance-import-cash]]
- [[balance-import-mapping]]
- [[balance-import-tik]]
- [[informatica-balance-module]]
- [[conv-file]]
- [[dummy-participant]]
- [[matt-oconnell]]
- [[processes/tik-transfer|transfer-in-kind]]

