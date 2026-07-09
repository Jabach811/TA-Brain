---
title: "DC Brain Dump #002 — Payroll, Order of Processing, Loan Quirks, Auto-Enroll"
type: source
tags: [source, brain-dump, payroll, auto-enrollment, loans, sequencing]
created: 2026-05-03
updated: 2026-05-03
status: current
sources: 1
---

# DC Brain Dump #002

Voice transcript follow-up to [[dc-brain-dump-001]]. Filling gaps and adding context. Original audio recorded by Joel; transcript saved at `new TA Brain/brain dump 2.txt`.

## What's Covered

- The full payroll vendor onboarding flow (intro email through OnePayroll handoff and client demo)
- The new operating model for the go-live payroll handoff (DC owns the bridge work; still passes off at live date regardless)
- Order-of-processing rationale post-balance (balances → elections + loans → everything else, because payrolls can resume once those are settled)
- Loan failure scenarios that come up in practice (frozen plans, refinances close to conversion, detail-vs-source off-by-one-payment)
- Auto-enrollment depth (kit mail date, escalation stops at TA, default SSN list to client, the "min or max-minus-one" default-detection heuristic)
- Wiki feature request — Tips & Tricks / community Resources section *(held out of ingest; tracked separately)*

## Key Claims

- Payroll vendor file naming convention: `<case#>_<contract>_<affiliate>.xls` — timestamp gets appended on receipt for de-dup.
- After FTP setup, immediately ask the vendor to send a random test file just to verify the connection works before real test files start flowing.
- OnePayroll's import surfaces end-user-flavored warnings/errors that the internal DC import doesn't show — that's why their second pass is meaningful.
- Auto-sweep / batch FTP processing isn't enabled until 2–3 good runs are observed.
- The new model: DC does ALL the validation/bridge work themselves now (mid-market team isn't carrying it). DC still passes off at live date regardless of status.
- Once balances + elections + loans are settled, payrolls can begin processing even before the plan is technically live. That's why those three are post-balance priorities.
- Loan failure scenarios from the field: frozen plan with no re-amortization, recent incomplete refinance, detail report missing the last payment (off by ~one principal payment).
- Auto-escalation does NOT continue at TA. Participants whose deferral was escalating at the prior RK will not auto-escalate post-conversion — they have to opt back in.
- DC pulls a list of participants who *look* like they're in auto-enroll default (marked default + at min rate or max-minus-one) and sends to client so client can warn them.
- ADP can't reliably report auto-enrollment dates *(reaffirmed; already documented)*.
- Kit mail date drives the auto-escalation clock — must be requested as part of historical data.

## Notable Quotes

> "Payroll really needs a big blowout here."

> "All the files have the case number underscore contract underscore affiliate. And then dot XLS or whatever. Time stamp comes in once the files actually do arrive, so there's never a duplicate."

> "We don't have to hold on to this until the very end, because some of these can go months after the live day. And we don't need to be handcuffed to these plans for that long."

> "The warnings and errors you get are different. The ones that are kind of built for the end user as opposed to an internal one."

> "Once those are done, even when the plan isn't live yet, the payrolls can begin to be getting processed."

> "The detail report was different than the source breakdown, and that's because one of those reports was inaccurate and did not include the last payment. So we're off by what really looked like one."

> "They may think that they're gonna be having their deferral rates escalate up to, say, 10%. But once they start with Transamerica, they will not. The escalation will cease."

## Entities Mentioned

- Jen Curtin — head of FTP team; vendor connection setup goes through her team
- [[ftp-team]]
- [[payroll-support]] — OnePayroll team; production-level deeper validation
- ADP — re-mention of auto-enrollment date reporting limitation

## Concepts Mentioned

- [[payroll-template]]
- [[ftp-connection]]
- [[payroll-handoff-at-go-live]]
- [[deferrals]]
- [[eligibility]]
- [[final-files-processing]]
- [[loan-setup]]
- [[advanced-employer]]
- [[limited-access-file]]

## See Also

- [[dc-brain-dump-001]]
- [[payroll-vendor-onboarding]]
- [[kit-mail-date]]
