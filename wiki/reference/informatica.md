---
title: "Informatica"
type: reference
tags: [system, etl, workflows, processing]
created: 2026-04-14
updated: 2026-07-08
sources: 3
status: current
---

# Informatica

ETL/workflow processing tool used to run the four main conversion workflows: Day of Wire, Participant Balance (CIT Balance), Loan Module, and Allocation Module. A standalone desktop application that runs against the DIVRDIVP database connection.

## Overview

Informatica handles the heavy-lifting data processing workflows during a conversion. DCs import a CONV file or census-derived file into Informatica and trigger the appropriate workflow. It is distinct from [[eds]] (which handles layout validation) — Informatica runs the actual conversion processing logic.

## Finding and Running Your Workflow

From the Informatica quick-start guide:

1. **Log in early.** The login/connection can be flaky for no reason. Make logging in part of the morning routine so any connection fight happens with no pressure — any day you might need Informatica, it should already be open.
2. **Navigate:** Production area → **DC Implementation** folder → **Workflows** folder → find the workflow with **your name** → drag it into the workflow designer.
3. **Run:** right-click inside the body of the workflow designer → **Start Workflow**. Then jump to the Monitor window (launch it *before* starting) — scroll all the way down, the DC folder is at the very bottom of the list — and find your name and activity. If it fails, double-click into the error.

**Why everyone has their own workflow:** the workflows are identical except one parameter pointing at a personal parameter file in the parameter files folder. Selecting your name selects your parameter file. This keeps people from crossing wires — a shared central parameter file would mean one person forgetting to update it breaks everyone.

## Parameter File Discipline

Parameter file mistakes fail silently — the workflow runs, looks fine, and produces wrong results with no error output. Five safeguards, every run (from the balance import guide):

1. **Build parameter files in advance** — one prepared file per workflow type (Mapping · Balances · TIK · Loans). Activate the right one when the run starts; no scrambling on the day.
2. **Prepare folders and paths in advance.** Use case/affiliate-specific input file names — if the wrong folder is selected, a unique file name makes the workflow fail to find the file instead of finding the wrong plan's file.
3. **Keep the active parameter file open during the run.** Visually confirm the file name, source folder, input file names, test flag, and workflow type before starting. Don't rely on memory.
4. **Check the test flag every single time.** Running live with test = Y, or test with test = N, produces results that look correct but aren't.
5. **Archive after the run** — move the used file into the plan folder; keep the working folder clean.

Practical tips (from the Informatica quick-start guide):

- Case number and affiliate need **proper spacing** — wrong spacing can produce no error at all, just nothing happening.
- The **order of lines in the parameter file doesn't matter** — put the parts you check most (file and folder names) at the very top so you see them the moment you open it.
- Before any run, eyeball the input file itself: know what it's supposed to look like and confirm it matches.

## Key Workflows

### 1. Day of Wire Workflow (`WF_DAY_OF_WIRE_IM`)

**Purpose:** Processes the initial wire/fund receipt on liquidation day. Creates trans ref number records and either books funds to a dummy account (mapping) or creates a placeholder (TIK).

**Input:** CONV file — one row per fund, saved as text tab-delimited, containing:
- Trans ref numbers (created in P2/P3)
- Fund totals (from prior vendor breakdown)
- Prior vendor fund descriptor
- TransAmerica fund descriptor
- Re-registering field (Y/N)
- Other required fields

**Parameter file — key Day of Wire settings:**
```
$$PLAN_YR_DT = [year]          -- Only needs changing for first January plan
$$DATE_STRING = [YYYYMMDD]     -- Eff/Cyc date for 1006's (Takeovers)
$$DATE_STRING_REREG = [YYYYMMDD] -- Eff/Cyc date for 1119's (Re-regs) — must be liquidation date, NOT effective date
$$WIRE_D = [YYYY-MM-DD]        -- Eff/Cyc date for 1006's in Fin_Act_Pend
$$REREG_D = [YYYY-MM-DD]       -- Eff/Cyc date for 1119's in Fin_Act_Pend
$InputFileDayofWire = CONV_FILE_[CASENO].txt
```

**Run as:** `$$TEST_FILE=N` for live. Do NOT run as Y — it still writes to case_remit and bill_remit_detail, just not the FIN_ACT tables.

**Inserts into:** CASE_REMIT, FIN_ACT_PEND, FIN_ACT_ELEC, BILL_REMIT_DETAIL

**11-step verification SQL audit** must be run after completion. Steps include:
1. CONV file structure check
2. Rollover source query (Step 2 SQL)
3. Dummy SSN verification in EMPLOYEE and PART_ENRL_XREF tables
4. Parameter file update
5. Run workflow
6. CASE_REMIT audit
7. FIN_ACT_PEND audit
8. FIN_ACT_ELEC audit
9. BILL_REMIT_DETAIL audit
10. Verify SS# and CTRB type exist on plan
11. Verify CASE_REMIT and BILL_REMIT_DETAIL match
12. Verify wire fund totals match wire amount
13. (After batch processing) Check TRANSACT_DET_REM fund amounts

**Triggered when:** Wire total matches breakdown total on liquidation day.

**Critical limitation: CANNOT be tested end-to-end.** Debug/preview mode exists but a full test run is not available.

**Behavior by conversion type:**

| Conversion Type | Re-reg field | Outcome |
|-----------------|-------------|---------|
| Mapping | N | Books to dummy participant account; trades go out |
| Transfer In Kind | Y | Creates placeholder in Bill Remit (no details, no trades) |
| Cash | N/A | Advanced employer process used instead |

**Pre-requisites before running:**
- [[dummy-participant]] (SSN 999-00-0000) must exist in census (for mapping)
- Plan must be fully set up in P3
- Trans ref numbers must already be created

### 2. Participant Balance Workflow (CIT Balance / `mp_part_balance`)

**Purpose:** Posts individual participant balances from the final files to the plan in P3.

**Input:** CIT balance file — built by DC from final files.

**Can be tested** — run a test pass before production.

**Parameter file — key settings:**
```
$$Test_File = P   (preliminary — no SSNs loaded to system yet)
$$Test_File = Y   (test — SSNs on system; run as test)
$$Test_File = N   (no — SSNs on system; ready to load live)
```

**Fund and source maps:** Saved as text tab-delimited. Keep leading zeros in fund map. Case sensitive when saving.

**Behavior:**
- Posts balance details to Bill Remit detail table in P3
- For mapping/TIK: fills in the "holes" left by the Day of Wire workflow
- After running: DC must review P3, then reverse dummy participant if applicable (mapping)

**Loan fund filtering:** If the prior vendor balances include a loan fund (representing loan money), filter it out. The loan fund is a parameter in the parameter file. Track loans by loading the loan data via the Loan Module instead.

### 3. Loan Module

**Purpose:** Loads participant loan data (header and source balances) from prior vendor.

**Targets:** `PENSION.CONV_LOAN` (header data) and `PENSION.CONV_LOAN_PRIN` (source balance data)

**Prerequisites:**
1. Set up loans on P3 first: Plan tab → Conversions → add recordkeeper → enter vendor name → Save
2. Go to Conversions tab → New Conversion → enter plan number → enter conversion date, effective date, assigned date → Save
3. Ensure parameter file has: Prior vendor name (must match censuslookupfile.xls exactly), Plan name, User ID, Effective date

**NPER on Quarterly Loans — rounding logic (effective April 2015):**
- Decimal ≤ 0.10 → round down
- Decimal 0.11–0.89 → if result × repayment amt > $10, round up; if ≤ $10, round down
- Decimal > 0.89 → round up

**After loan module runs:**
- Check **Loan Compare file** — all differences must = 0
- Check **Loan BEE detail** for errors
- Then run the **Loan Load Job** in P3: Conversions tab → Existing Conversion → select plan → Takeover Loans → choose session → Upload (or "Upload and create 12 month balances" if HOLB not provided)

**Common error causes:**
- "Conversion number not found" = loans not set up on P3
- "Nper is null or zero" = loan frequency not in censuslookupfile, or vendor name spelled differently than lookup file
- "SSN not found on system for plan" = census not yet loaded (acceptable if preliminary run)
- "Source I does not exist on plan" = source mapping incomplete or bad data

### 4. Allocation Module (`wf_mp_CIT_Elections_Module`)

**Purpose:** Maps prior fund allocations to TA funds for participant investment elections.

**Key checks before running:**
- Withdrawal sequence in the fund map must be a number (not blank or text) — rows with non-number sequences are thrown out
- Check for spaces on prior fund names (causes errors with fund splits)

## CONV File Structure

The CONV file is the input for the Day of Wire workflow. One row per fund. Save as text tab-delimited.

| Field | Description |
|-------|-------------|
| Case Number | Plan case number |
| Prior Fund Code | Prior vendor's fund identifier |
| TA Fund Code | TransAmerica fund identifier |
| Ref Number | Transfer reference number (created in P2) |
| Amount | Total dollar amount for this fund |
| ReReg | Y or N (Y = transfer in kind; N = mapping/cash) |

> [!contradiction] CONV field count
> This page lists 6 CONV fields (Case Number, Prior Fund Code, TA Fund Code, Ref Number, Amount, ReReg). The balance import guide lists **7**, adding **"Source I — unique internal source ID used by the workflow to route the line correctly"** between Ref Number and ReReg. Verify against a current CONV template before building.

The guide also adds two CONV rules: one ref number per fund — do not reuse one ref across multiple funds unless the approved setup explicitly says to; and keep the file **tab-delimited text** — do not save as CSV and expect the workflow to read it the same way. By type: Mapping (Re-Reg = N) creates 1006 activity + trades, loading mapped assets to the dummy participant; TIK (Re-Reg = Y) creates 1119 activity with no trades, setting up the book record/placeholder for the securities. (from the balance import guide)

**CONV vs. CIT Balance File:**
- CONV file = **fund-specific** (one row per fund) — used for Day of Wire
- CIT balance file = **participant-specific** (one row per participant per source per fund) — used for Balance Module

## Source Mapping Query (Standard)

Run in AQT to get TA source IDs for source mapping:
```sql
SELECT a.SRC_I, a.SRC_S, a.REPORT_1_NM, a.REPORT_2_NM,
       a.SP_REPORT_1_NM, a.SP_REPORT_2_NM, doc_nm
FROM corp.plan_src_detail a, pension.plan_provision b, pension.plan_prov_grp c
WHERE A.SRC_I = B.RELATED_I
  AND B.PROV_TYP_C = 1019
  AND b.enrl_prov_grp_i = c.enrl_prov_grp_i
  AND account_no = '[ACCOUNT_NO]'
```

## Connection Setup

If encountering "failed to get the connections" error: the DIVRDIVP connection is not set up. Go to Edit Session → Mapping → Connections → change from ODSP to DIVRDIVP; set all SQLs to relational and DIVRDIVP.

Alternatively, copy a working TRS module session from an existing workflow (which carries its connections and parameters), then link your vendor-specific session to it.

## Access

**Standalone desktop application** — not a URL, not within P3. Accessed separately from P3.

## See Also

- [[p3]]
- [[eds]]
- [[liquidation-day]]
- [[final-files-processing]]
- [[dummy-participant]]
- [[conversion-types]]
- [[processes/tik-transfer|transfer-in-kind]]
- [[conv-file]]
- [[aqt]]

