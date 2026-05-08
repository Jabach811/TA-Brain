---
title: "LMDC Training Notebook"
type: source
tags: [source, dc, large-market, training, procedures, conversion]
created: 2026-04-15
updated: 2026-04-15
sources: 1
---

# LMDC Training Notebook

The official DC Team training OneNote notebook, exported as a web archive (.mht). A living document spanning 2015–2026 with the full DC workflow, data loading procedures, system guides, and updated procedures through April 2026.

## Summary

This is the authoritative DC training reference maintained by the CIT Data Consultant team. It is a cumulative notebook — older sections remain for reference, newer sections supersede them where explicitly marked. The notebook covers every phase of a plan conversion from the DC perspective: onboarding, data loading, Informatica workflows, wire processing, payroll testing, and post-conversion data management.

**Date range:** February 2015 (oldest entries) through April 6, 2026 (most recent entry)

**Key principle for use:** When a section has a newer version, use the newest. Several sections are explicitly marked "DO NOT USE" (e.g., the old Fund Management Calendar section). When a topic has entries from multiple years, the most recent entry governs.

## Key Claims

### Roles and Naming
- The DC role is called **LM DC** (Large Market Data Consultant) throughout. The coordinating project management role was called **TM (Transition Manager)** in older sections; the current name is **COM (Communications Coordinator / Communications Manager)**. All references to TM should be read as COM.
- A role called **MM (reviewer)** appeared in a July 2025 payroll test review section. Per business context, the MM department has since been removed; those review responsibilities are not tracked here.

### Fund Management Calendar — New Procedure (February 27, 2026)
- The old FMC page in the notebook is explicitly marked **"DO NOT USE."**
- New procedure requires emailing four distribution lists when updating the FMC with fund balances (not just updating the file).
- **SSBT cut-off:** 4:00 PM EST. Wire confirmation received by 4:45 PM EST. If wire is not received by cut-off, update FMC to next business day and send a follow-up email.
- Estimates must be entered no later than **TOA minus five business days**.
- Different procedures for AC1 Mapping Conversions vs. AC1 Cash Conversions vs. Participant Balance Processing.

### Reversals — New Process (March 6/9, 2026)
- **Plan Correction Checklist is no longer used.**
- New process: submit a Reversal Form to `slasrever@transamerica.com` first. The automated response email contains a text block that must be pasted into AWD ticket comments.
- Reversal AWD ticket must still be submitted — the form does not replace it.
- Approval levels: $50K–$150K = Manager level; amounts govern which approval level to select.

### Payroll Handoff at Go-Live (February 26, 2026)
- New formal procedure when payroll testing is not complete at go-live.
- DC submits a **FILESPECRQ** AWD ticket (payroll contact info, layouts, testing status summary).
- DC updates NBI to note testing incomplete and ticket submitted.
- COM notifies AM. Client and payroll vendor are notified of the team change.
- Fiduciary Services Team takes over the payroll project using the Inforce Payroll Projects process.

### Booking Assets — Updated Process (August 13, 2025)
- **Wire hits State Street:** book as **4=Remit**; still email NY Recon.
- **Withdrawing from AEDA (Advanced Employer Deposit Account):** book as **3=Rebook** AND submit a rebook AWD ticket.
- This distinction replaces the older single-method booking process.

### Wire Receipt / Cut-Off Process (December 29, 2025)
- Cashiering email: `shtaopscashieringinc@transamerica.com`
- Wire pulls at 7am, 9am, 1pm, 3pm CST.
- Cashiering notifies DC by **3:45 PM** if wire received that day. If delayed, they reply to acknowledge and confirm when complete.
- Wires received after **3:00 PM CST** are deposited the next business day.

### Common Remitter Plans (November 19, 2025)
- Plans coded as "common remitter" do not have the standard Pre-Process option in P3's Remit Action dropdown on Day of Wire.
- Use **"Verify Batch After Funding"** instead. Wait for results, then set NO HOLD + Process Immediate for each trans ref.

### LTPT / Secure Act 2.0 (June 10, 2024)
- As of **January 1, 2025**, LTPT eligibility = **two consecutive 12-month periods with 500+ hours** for both 401(k) and 403(b). (Previously three years for 401(k).)
- New EDS status codes: **5** = Not eligible, kit mailed due to LTPT; **6** = Eligible, LTPT.
- Hours must be tracked for excluded-class employees (e.g., collectively bargained) in case they move to a covered class.
- LTPT employees can make elective deferrals but are not eligible for employer contributions unless they meet regular eligibility.

### Extended Model / MM Enhanced Plans (September 19, 2024)
- Plans coded as "MM Enhanced" cannot use the standard ROC process for dummy account reversal.
- Requires specific SQL updates to `CORP.transact_detail` and a separate INSERT statement — submitted via Production Support ticket.

### Financial Guide (FG) Integration (February 12, 2025; August 13, 2025)
- Financial Guide (FG) is a managed accounts service currently offered on Large Market plans only.
- Two places to check if FG is enabled: (1) Plans Tab → Allocation/Plan Default if FG is plan-level default; (2) DDOL/VRU → Services Enabled section otherwise.
- Mass subscription uses a `mass_sub_` prefixed file uploaded to Platform File Service.
- The Consistency/Sweep Batch job runs hourly on business days to pick up participants with successful subscriptions but pending TPA allocations.

### Payroll Test Review (July 29, 2025)
- Updated procedure document references a detailed **Data Element Guide** at `S:\CIT\Data Consultants\PAYROLL FILE REVIEW LINE FOR REVIEW OF DATA`.
- Detailed field-by-field review guide covering all payroll file elements (SSN, dates, addresses, contributions, compensation, etc.).
- After good-order test file: send to One Payroll for additional validation before final client sign-off.

### New Folder Structure (April 6, 2026)
- Not applicable to current workflows per direction.

### Informatica Workflows (Technical Detail)
- **Balance Module:** Uses `mp_part_balance` map. Fund and source maps saved as text tab-delimited. Parameter `$$Test_File = P` (preliminary), `Y` (test SSNs loaded), `N` (live).
- **Loan Module:** Requires loans set up on P3 first (Conversions tab). NPER calculations have specific rounding logic for quarterly loans.
- **Allocation Module:** Check fund map withdrawal sequence is a number; check for spaces on prior fund names.
- **Day of Wire (updated April 8, 2020):** Full 11-step SQL verification process documented. Inserts into CASE_REMIT, FIN_ACT_PEND, FIN_ACT_ELEC, BILL_REMIT_DETAIL.
- **Source Mapping query:** `select a.SRC_I, a.SRC_S, a.REPORT_1_NM, a.REPORT_2_NM, a.SP_REPORT_1_NM, a.SP_REPORT_2_NM, doc_nm from corp.plan_src_detail a, pension.plan_provision b, pension.plan_prov_grp c where A.SRC_I = B.RELATED_I AND B.PROV_TYP_C = 1019 and b.enrl_prov_grp_i=c.enrl_prov_grp_i and account_no='[ACCOUNT_NO]'`

### Wire Instructions — Reinsurance Codes and State Street Accounts
- Four State Street Bank & Trust accounts by Reinsurance Code:
  - Codes 2, 3, A, B → Account 00457358
  - Codes 5, 6, 9 → Account 00457366
  - Codes 4, 7, 8, C → Account 00457374
  - Code I → Account 00457424
  - Code J → Account 00457440
- ABA: 011000028 (State Street Bank & Trust Company, 200 Clarendon Street, Boston, MA 02116)

### Acronym Dictionary
Full CTS-relevant acronym definitions per notebook's March 13, 2017 entry. Key CTS-specific terms documented in individual [[glossary/]] pages.

## Key Quotes

> "The FMC calendar is a critical step for the DC Team to ensure that our internal partners can effectively communicate nightly trade expectations with the fund companies that Transamerica is partnering with."

> "When submitting a reversal we no longer need to fill out the Plan Correction Checklist. As of 03.06.26 You'll need to use the form below."

> "Going forward, the COMs will communicate during the conversion process that if payroll is not completed prior to go live, payroll testing will continue with a different internal Transamerica Team."

> "Booking assets when they hit State Street and not using the tr-ref-no that cashiering used to book, you will follow the same process. Book as a 4=Remit... When booking assets to process to ppt accounts off a w/d from AEDA you will now book as a 3=Rebook."

## Entities Mentioned

- [[lm-dc]] — primary subject
- [[cashiering]] — wire receipt, booking
- [[informatica]] — Day of Wire, Balance, Loan, Allocation modules
- [[p2]], [[p3]], [[eds]], [[aqt]], [[nbi]] — all primary DC systems
- [[ellen-miller]] — assignment routing
- [[matt-oconnell]] — TIK re-registration
- [[stacey-fortune]], [[earl-sanford]], [[dave-shloat]], [[scott-vrba]] — named SMEs throughout
- [[prod-support]] — AWD tickets, database corrections
- [[ftp-team]] — payroll vendor FTP setup
- [[payroll-support]] — One Payroll team

## Concepts Mentioned

- [[fund-management-calendar]] — major update (new procedure Feb 2026)
- [[liquidation-day]] — wire receipt, booking assets updates
- [[reversal-process]] — new page (Mar 2026)
- [[ltpt-eligibility]] — new page (Jun 2024 / Jan 2025 effective)
- [[common-remitter-plans]] — new page (Nov 2025)
- [[payroll-handoff-at-go-live]] — new page (Feb 2026)
- [[booking-assets]] — new page (Aug 2025)
- [[wire-instructions]] — reinsurance codes and SSBT accounts
- [[conversion-types]], [[dummy-participant]], [[transfer-in-kind]], [[source-mapping]], [[fund-mapping]]
- [[deferrals]], [[eligibility]], [[base-file]], [[payroll-template]]

## Contradictions / Open Questions

- **FMC cutoff vs. SSBT cutoff:** The old wiki stated "1 PM Pacific / 4 PM Eastern" as the FMC deadline. The new FMC procedure (Feb 2026) references "4PM EST SSBT Cut-off" — these are the same Eastern time (4 PM ET), but the new procedure is more precise about the State Street banking cut-off as the driver, and adds email notification requirements not in the old page. **Resolution:** Update FMC page with new procedure; preserve the 4 PM ET time.
- **Old shared drive paths** (e.g., `S:\CIT\Data Consultants\`, `\\yydafs-data1\`) appear throughout older sections. These paths may no longer be current. Until confirmed, treat as potentially stale.

## See Also

- [[lm-dc]]
- [[dc-onboarding-workflow]]
- [[fund-management-calendar]]
- [[reversal-process]]
- [[ltpt-eligibility]]
- [[liquidation-day]]
- [[plan-conversion-handoffs]]
