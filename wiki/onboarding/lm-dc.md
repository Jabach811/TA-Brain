---
title: "Onboarding Guide: Large Market Data Consultant"
type: onboarding
tags: [onboarding, lm-dc, data-consultant, large-market]
created: 2026-04-14
updated: 2026-07-08
sources: 1
status: current
---

# Onboarding Guide: Large Market Data Consultant

A reading list for anyone new to the LM DC role at Transamerica. Read these pages in order. Each one builds on the last.

## Who This Is For

New hires or transfers into the Large Market Data Consultant role. Also useful for anyone on a partner team (COM, QA, TC) who wants to understand what a DC actually does.

## Reading Order

1. **[[lifecycle/lm-dc|lm-dc]]** — Start here. Understand the full scope of the role, every system you'll use, and every team you'll touch.

2. **[[dc-onboarding-workflow]]** — The master 7-phase checklist. This is the job, start to finish. Bookmark it. You'll come back constantly.

3. **[[conversion-types]]** — Everything downstream depends on whether a plan is cash, mapping, or transfer in kind. Learn these cold.

4. **[[plan-conversion-handoffs]]** — How work moves between teams. Read this alongside the workflow so you understand not just your steps, but where things come from and where they go.

5. **[[nbi]]** — The universal plan checklist. You will live in this system. Understand what it tracks and when to update it.

6. **[[p3]]** — Your main platform. Where plans live, where you process files, where you fix things.

7. **[[p2]]** — The back-end region you'll use on liquidation day to create transfer reference numbers. Separate from P3 — know the difference before you're in the moment.

8. **[[eds]]** — How files get validated and processed. Always read the output after every run.

9. **[[navigation-paths]]** — Exact click-paths for the P2/P3 tasks above. Keep it open while you learn the systems.

10. **[[census-data]]** — Participant data loading: what's required, how to validate it in EDS, audit checks, and when to use vendor data instead of client data. This is one of the first things you'll work on.

11. **[[prd]]** — The Plan Review Document. Understand what sections DC focuses on: eligibility, vesting, sources, classes.

12. **[[subpack]]** — The internal TA execution plan. Supposed to be complete by COM at the start. Know how to work without it when it's missing.

13. **[[cccs-submission-package]]** — How to read the CCCS as a DC: plan types, funding method, asset-transfer strategy, takeover loans.

14. **[[toa]]** — Transfer of Assets. Triggers the mapping phase. Know what column T means.

15. **[[fund-mapping]]** — First mapping you build after TOA is signed. No test files needed.

16. **[[source-mapping]]** — Second mapping. Requires test files. Needs AQT and EDS.

17. **[[prior-record-keeper]]** — How to work with the outgoing administrator: questionnaire, test files, wire coordination.

18. **[[wire-instructions]]** — Send early. Resend before liquidation. Know the default account.

19. **[[wire-routing]]** — The State Street account table, Cashiering pull times, and the 3 PM CST cutoff.

20. **[[ftp-connection]]** — Payroll vendor file upload channel. Request this early — FTP team has a big queue.

21. **[[fund-management-calendar]]** — Must be updated before the trade cutoff on any day trades go out. Missing this is a serious process failure. Know it before your first liquidation day.

22. **[[liquidation-day]]** — The main event. Read this multiple times. Understand the sequence for each conversion type.

23. **[[dummy-participant]]** — Required for mapping conversions. Must exist before Day of Wire. SSN 999-00-0000.

24. **[[informatica]]** — Day of Wire and Participant Balance workflows. Day of Wire cannot be tested — understand why.

25. **[[conv-file]]** — The input file for the Day of Wire workflow. Know its structure and how to build it before you're under liquidation-day pressure.

26. **[[final-files-processing]]** — After liquidation: balances, YTD data, deferrals, eligibility. Order matters.

27. **[[loading-basis-eds]]** — Basis loading procedure: EE basis fields, transaction rules, Roth considerations, and 457 plan restrictions. Loaded as part of final files.

28. **[[eligibility-and-deferrals]]** — Deferrals before eligibility. Always. No exceptions.

29. **[[tik-transfer]]** — If you have a TIK plan, read this before you contact the re-registration team.

30. **[[audit-pack]]** — What you build at the end. Understand what goes in it and where it lives.

31. **[[prod-support]]** — When standard tools can't fix the data, Prod Support can. Know how AWD tickets work.

32. **[[query-library]]** — The SQL you'll eventually need: source mapping, basis, census audits. Skim now, return when you need it.

## Key People to Meet

- **Your direct manager** — Intro meeting in first week.
- **The NBI assignment coordinator** — Manages plan assignments. In your workflow from day one.
- **Your COM counterpart** — The COM assigned to your first plan. Get their contact info early.
- **The Fidelity TIK / re-registration lead** — You don't need them until you have a TIK plan, but know who they are.
- **The eligibility SME** — Go to them when eligibility questions go beyond standard patterns (see [[eligibility]]).
- **The FTP Team setup contact** — Confirms when FTP setup is complete (see [[ftp-team]]).

Current names for each role live on the linked pages, so this guide stays accurate when people move.

## First Week Priorities

- [ ] Get NBI access — you can't track your plans without it
- [ ] Get P3 access — request through your manager
- [ ] Get EDS access — linked from P3 menu bar
- [ ] Find out what plans are currently in your queue
- [ ] Read your first PRD or onboarding package
- [ ] Shadow a DC who is currently in a live conversion

## See Also

- [[lifecycle/lm-dc|lm-dc]] — full role reference page
- [[dc-onboarding-workflow]] — the master process checklist
- [[conversion-types]] — the single most important concept to internalize early
