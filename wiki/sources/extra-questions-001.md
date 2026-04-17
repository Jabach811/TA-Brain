---
title: "Extra Questions — Round 4 Answers"
type: source
tags: [q-and-a, clarifications, open-questions]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Extra Questions — Round 4 Answers

Answers to all outstanding open questions across the wiki. Provided by DC (Marcus) via written Q&A. Covers 20+ pages.

## Summary

This source resolves nearly every open question flagged during the initial brain dump and follow-up rounds. Key areas covered: file formats and template locations, P3 navigation paths, system access details, team ownership clarifications, process nuances, and a handful of "how do you actually handle X" answers that weren't in the original brain dump.

## Key Claims

- Audit pack: Excel, stored at `root/Conversion/Contract`, same template for all conversion types, QA reviews same day
- Base file: Excel, standard TA template trimmed per client; census loaded when population confirmed; rest at conversion time
- Dummy participant: DC adds it, one per plan, only for mapping funds (not TIK), nightmare if forgotten
- Eligibility P3 path: Plan → top left dropdown → Outsourcing Summary → Eligibility → Enable screen; go-ahead within the hour
- CIT balance file structure: Case Number, Region, SSN, Source, Fund, Total
- One EDS layout per data type (not combined)
- Client decides whether to use vendor or own data for eligibility/deferrals
- FTP setup via email to FTP team; each plan has its own destination folder
- FMC owned by cashiering/trading; email backup process exists for missed cutoffs; TIK funds don't require FMC entries
- Fund mapping TA-internal fields: Filter, Vendor Fund Code, Ref #, Split Ratio, Split Code, Total
- Neither fund mapping nor source mapping is loaded to the system — both are reference docs used in workflows
- P2 navigation for trans ref numbers: CORP07/tdatest → 2001 → contract/affiliate # → option 4 → trans code 1006 → proc code 3
- Trans ref number format: YYYYMMDD + 7-8 random alphanumeric characters
- PRD created by COM using standard TA template; signed early in the process
- Prior RK contact known from day of assignment; questionnaire sent in hello email; relationship shared across team
- Re-reg form: Excel, in front folder of DC folder
- TIK tracker spreadsheet: DC fills in expected shares from final files; Matt's team updates it when shares arrive
- Wire instructions: standard template; Assurance Code on P3 (Plan → General Plan → Assurance Codes) determines account
- NBI full name: New Business Intelligence; web-based; all plans visible including history; standard checklist
- Informatica: standalone app; CONV file fields fully specified
- Stacey Fortune: Large Market dept; general knowledge resource; title unknown (humorous response)
- Prod Support: 1-2 day standard turnaround; same-day for urgent liquidation-day corrections

## Key Quotes

> "The data won't load correctly and will need to be cleared by Prod Support. It's a nightmare. Don't do it." — on forgetting the dummy participant

> "You gotta deal with it. Keep on banging on them. Happens a lot." — on unresponsive prior record keepers

> "It can delay trades that day... if we can't get into the actual file in our first try, we send an email with the details so they have it on file." — on missing the FMC cutoff

> "Not our job. Account Managers do that." — on adding new sources to payroll templates post-conversion

> "Awesome ass bad ass. I don't know for sure ;)" — on Stacey Fortune's title

## Entities Mentioned

[[ellen-miller]], [[matt-oconnell]], [[stacey-fortune]], [[nick-lister]], [[prod-support]], [[eds]], [[informatica]], [[nbi]], [[p2]], [[p3]]

## Concepts Mentioned

[[audit-pack]], [[base-file]], [[dummy-participant]], [[eligibility-and-deferrals]], [[final-files-processing]], [[ftp-connection]], [[fund-management-calendar]], [[fund-mapping]], [[liquidation-day]], [[onboarding-package]], [[payroll-template]], [[plan-classes]], [[prd]], [[prior-record-keeper]], [[source-mapping]], [[subpack]], [[toa]], [[transfer-in-kind]], [[wire-instructions]]

## Contradictions / Open Questions

**Still open after this source:**
1. FMC shared drive path (exact location)
2. Common prior RK workflows (Fidelity, Vanguard, Empower) — built by DC, not yet documented
3. DC query library — many verification queries referenced, to be documented separately
4. Informatica Day of Wire test mode — DC to confirm whether full execution test is possible
5. DC folder workflows (WFs) — still being tuned, documentation pending

## See Also

- [[sources/dc-brain-dump-001]]
- [[overview]]
- [[dc-onboarding-workflow]]
