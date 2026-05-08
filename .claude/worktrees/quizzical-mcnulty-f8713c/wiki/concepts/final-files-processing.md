---
title: "Final Files Processing"
type: concept
tags: [final-files, balances, posting, processing, cit]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Final Files Processing

The steps taken after receiving the final data files from the prior record keeper to post all participant data into TransAmerica's system.

## Overview

Final files arrive after liquidation. They contain the authoritative, as-of-liquidation participant data: balances by source and fund, year-to-date contributions, compensation, eligibility, deferral elections, hours. Once received, the DC processes these files through [[eds]] and [[informatica]] to populate [[p3]] with accurate participant data.

## What's in Final Files

- **Participant balances** by source and fund (as of liquidation date)
- **YTD contributions** by source
- **YTD compensation** (and prior year comp if applicable)
- **Hours** (current year and prior year if applicable)
- **Deferral elections** (by source, dollar or percentage)
- **Eligibility data** (status, dates)

> What's used from the final files vs. the base file is determined by the client in advance. The client may say "use vendor data for everything," "use our data for eligibility," or some combination. Know this before files arrive.

## Processing Sequence

**Critical order — do not reverse:**
1. Post participant balances
2. Post deferral elections
3. Enable eligibility (after deferrals, always)
4. Post YTD data (comp, contributions, hours)

See [[eligibility-and-deferrals]] for the eligibility/deferral rules.

---

## Balance Posting by Conversion Type

### Cash Conversion

1. **Request Advanced Employer liquidation** — email [[stacey-fortune]] or [[nick-lister]] to request the AE be liquidated. Simple email, no complex process.
2. Build **CIT balance file** from final files
3. Test CIT balance workflow in [[informatica]] (can be tested — do it)
4. Run participant balance workflow (production)
5. In P3: **Process Immediate + Batch** → trades go out to invest participant cash
6. Reverse [[dummy-participant]] via ROC tool in P3
7. Verify participant balances in P3

### Mapping Conversion

1. Build **CIT balance file** from final files
2. Test CIT balance workflow in [[informatica]]
3. Run participant balance workflow (production)
4. Reverse [[dummy-participant]] via ROC tool in P3
5. In P3: **Online + No Hold** (NOT Process Immediate)
   - Reason: trades already went out on Day of Wire via dummy account. Posting participant details only updates the books — no new trades.
6. Verify participant balances in P3

### Transfer In Kind

1. Update [[matt-oconnell]]'s share amount estimates immediately with final file totals
2. Build **CIT balance file** from final files
3. Test CIT balance workflow in [[informatica]]
4. Run participant balance workflow (production)
   - This fills in Bill Remit detail (the placeholder from Day of Wire)
5. In P3: **Online + No Hold** (NOT Process Immediate)
   - Reason: shares are already at Fidelity, being transferred. No trades.
6. Verify

---

## CIT Balance File

The input file for the Informatica participant balance workflow. Built by the DC from final files. Contains participant-level balance data by source. The Informatica workflow processes this file and posts balances to Bill Remit detail in P3.

**Structure:** `Case Number | Region | SSN | Source | Fund | Total`

Note the key difference from the CONV file: the CIT balance file is **participant-specific** (one row per participant per source per fund). The CONV file is **fund-specific** (one row per fund).

---

## P3 Processing Mode Reference

| Conversion | Step | Mode | Sends Trades? |
|------------|------|------|--------------|
| Cash | Balance posting | Immediate + Batch | Yes |
| Mapping | Balance posting | Online + No Hold | No |
| TIK | Balance posting | Online + No Hold | No |

> **Rule:** Trades should only go out ONCE per fund. Check which step already sent trades before choosing the processing mode.

---

## EDS Layouts for Final Files

All EDS layouts for final file types should be set up well before final files arrive. Don't wait — build them early. When files come in, you want to be able to run immediately.

**One layout per data type** — balance, YTD contributions, YTD comp, hours, deferrals, and eligibility each get their own separate EDS layout. There is no combined layout.

## Client Data vs. Vendor Data

For eligibility and deferral data specifically: **the client decides** whether to use vendor data or their own data. This decision must be known before final files arrive so the DC knows which files to use.

---

## Post-Processing

After all data is posted:
- [ ] Run standard query set — verify counts, totals, source breakdown
- [ ] Check EDS output emails for warnings/errors
- [ ] Build audit pack
- [ ] Update [[nbi]]

## Open Questions

- What queries are run to verify balances after posting? *(Many — will be documented separately)*

## See Also

- [[eligibility-and-deferrals]]
- [[dummy-participant]]
- [[informatica]]
- [[eds]]
- [[p3]]
- [[conversion-types]]
- [[liquidation-day]]
