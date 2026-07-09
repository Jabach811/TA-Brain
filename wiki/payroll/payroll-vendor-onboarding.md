---
title: "Payroll Vendor Onboarding"
type: payroll
tags: [payroll, vendor, onboarding, ftp, eds, onepayroll, demo, conversion]
created: 2026-05-03
updated: 2026-07-08
sources: 1
status: current
---

# Payroll Vendor Onboarding

The full vendor-side payroll work that happens before FTP automation is live and before the go-live handoff. Covers the moment the prior payroll vendor enters the picture all the way through the client's first successful manual upload.

This page is the narrative spine. The supporting pages — [[payroll-template]] (the file spec), [[ftp-connection]] (the upload channel), [[payroll-support]] (OnePayroll validation), [[payroll-handoff-at-go-live]] (the live-date handoff) — each cover one piece in depth.

## Overview

Once the conversion kicks off and the payroll vendor is identified, the DC has a parallel workstream to run alongside everything else: get the vendor producing files in TA's format, get those files validated, get the upload channel set up, and demo the upload flow to whoever on the client side will be running it. The goal is to be in good enough shape by go-live that the project can be passed off to Fiduciary Services regardless of how far testing got.

## Phase 0 — Is payroll even yours?

Before assuming DC ownership, check NBI for the **payroll integration consultant (PIC)** field (from the payroll/OBF knowledge-transfer guide). The PIC team is being built to take payroll work off the DC plate. If a PIC is assigned, they may own inbound FTP, outbound FTP, the payroll questionnaire, WX setup, and One Payroll setup. Project plans are often copied from older plans and may not use the correct with-PIC or without-PIC version — confirm ownership directly when it matters.

Also confirm the **upload path** with the client before submitting anything:

- **Path A — Manual upload.** Client uploads directly. Nothing to set up for transmission; the template is the deliverable.
- **Path B — Automated FTP.** An SFTP connection or existing/global vendor route must be used. Confirm the source, contact ownership, and special handling before submitting — see [[ftp-connection]].

## Phase 1 — Identify and contact

As soon as the conversion starts, find out two things:

1. **Who at the payroll vendor will be the contact** for this plan
2. **Who on the client side** will be uploading files — that person needs FTP credentials

Both pieces are upstream of everything else. Don't wait on either.

Confirm three things about the contact before any setup request goes out (from the payroll/OBF knowledge-transfer guide):

- **Who owns inbound** — the exact person and company responsible for sending payroll files to Transamerica (client, payroll vendor, or third-party integrator).
- **Who owns outbound** — ask whether the same contact also owns files from Transamerica back to the vendor. If not, the client may need a separate vendor ticket.
- **Special handling** — flag PGP encryption or true Excel files early; both need extra setup. Also check whether the named vendor routes through an existing/global connection or third-party integrator (see [[ftp-connection]]).

### Vendor intro email

Send the vendor contact an introductory email immediately. Standard wording (adjust to taste):

```
<DC-INTRO-EMAIL-TEMPLATE>

Hi [Name],

My name is [DC Name] and I'm the Data Consultant for [Plan Name / Case #].
I'll be your main point of contact for the payroll work during the
conversion. I'd like to set up a meeting to walk through our payroll
file format and discuss how you'll be sending us files going forward.

Are you available [proposed times]?

Thanks,
[DC Name]
```

### FTP setup request — fire it off early

Once the upload contact is identified on the client side, fill out the FTP form and send it to Jen Curtin's [[ftp-team]]. **Don't sit on this.** That team has a backlog and setup takes real time. The earlier the request lands, the more breathing room you have.

See [[ftp-connection]] for the full setup process.

## Phase 2 — Kickoff meeting with the vendor

Once the vendor responds, set up the kickoff meeting. Standard agenda:

1. **Vendor shows what they're currently producing** — what their existing payroll file looks like, how they generate it, what their internal naming and delivery is
2. **DC presents the TA payroll template** — share the [[payroll-template]] file
3. **Field-by-field walkthrough** — explain each column, what it means, what's required, what's optional
4. **Vendor takes it back** — they go re-tool their output workflow to match the template
5. **Vendor returns with a test file** — sooner is better

This first meeting is the most important touchpoint. Make sure they understand the template, not just have a copy of it.

## Phase 3 — Test the FTP connection (independent of test files)

Once the FTP team confirms the account is set up, **do not wait for the vendor's first real test file to validate the connection**. Ask the vendor (or whoever has the credentials) to send a random file — anything — just to confirm the upload works end-to-end.

The thing the system catches on is the **naming convention**:

```
<case#>_<contract>_<affiliate>.xls
```

A timestamp gets appended automatically on receipt to prevent duplicates, but the prefix has to be correct or the file isn't picked up. A throwaway file with the right name proves the channel is working before you stake a real test file on it.

## Phase 4 — Validation chain

Once real test files start coming in:

```
Vendor test file
   ↓
DC validates through EDS  ← internal-flavored warnings/errors
   ↓
Send to OnePayroll (Payroll Support)
   ↓
OnePayroll runs production-level import  ← end-user-flavored warnings/errors
   ↓
Issues? → back to vendor, get a new test file, restart
Clean? → green light
```

The reason OnePayroll is its own gate (and not just "EDS again"): the warnings and errors their import surfaces are the ones the client will see when they upload from the production environment. The internal DC import strips a lot of that. So even if EDS comes back clean, OnePayroll can still find things.

See [[payroll-support]] for what OnePayroll catches and how the back-and-forth works.

### The LM DC ↔ MM review handoff

Internal layout validation is a two-role handoff, current as of the 7/29/2025 LM DC process update (from the payroll/OBF knowledge-transfer guide). Neither role loads data during this step.

**LM DC sends to MM:** case number and plan name, conversion date, One Payroll yes/no, the test payroll file plus Architect layouts file saved to the test folder, all contacts to include on feedback to the client, and any reviewer notes (who to address, who's just cc).

**MM reviews and returns:**
- Creates a `Review Payroll File_JT` folder and copies the test file + specs into it
- Manual file review — if any field is marked TBD, it goes back to the LM DC
- Notes pass/fail and comments on the Architect layouts
- Creates EDS layouts in P3 — naming convention **Remit Layout** for every plan tested
- Runs the file through the EDS validator (no data loaded); saves warning and error reports to the test folder
- Returns feedback with layout + control totals (file sums vs. EDS sums), and saves review emails to the folder

MM also forwards to One Payroll if applicable, and once One Payroll signs off, emails the client confirming all set — provided their totals match. Update NBI screens after review. Field-by-field validation rules live on [[payroll-template]].

### Control totals

Request **control totals** up front — summary figures (hours, deferrals, match, loans) validated against every file. No totals = can't confirm the file is right. During the first live files, control totals are still required until Payroll Support confirms successful loads and turns on the automatic sweep into One Payroll. If a client says they sent a file and heard nothing, check whether the COM/account manager confirmed control totals.

> [!warning] Request One Payroll testing before the first live file
> Once the test file is signed off, send Payroll Support the file and layout name right away. If One Payroll testing isn't complete before the first live file arrives, Payroll Support may push back on loading it because they still need a test file. (from the payroll/OBF knowledge-transfer guide)

### Manual email validation as the interim

If the FTP isn't live yet but the vendor wants validation, they can send the file as an email attachment directly to the DC. Validate it the same way (EDS → OnePayroll) and feed results back. Once FTP comes online, validate the next FTP-delivered file too — confirm both channels work.

## Phase 5 — Client demo

Once a clean test file is through OnePayroll, demo the upload flow to whoever on the client side will be running uploads. Eventually the FTP will move to auto-sweep and the client doesn't have to log in at all, but **that's not the day-one state**. Day one, someone on the client team is uploading files manually through the upload page.

`<CLIENT-DEMO-WALKTHROUGH-LINK>`

Talking points for the walkthrough meeting (from the payroll/OBF knowledge-transfer guide):

1. Confirm upload method — manual portal or FTP — and that they know how to do it
2. Walk through the file format briefly; don't deep-dive unless they have questions
3. Explain control totals — what they are, which fields, how and when to send them (often new to clients)
4. Set processing expectations — what happens after a file + totals are submitted, and turnaround
5. Confirm their contact — who sends files and totals, and what happens if that person changes
6. Leave room for Q&A

Common client misunderstandings to preempt: they think files process automatically without control totals; they send totals in the wrong format or forget them; they don't realize changing their payroll file format breaks the layout; they assume FTP users can be swapped without telling us.

## Phase 6 — Auto-sweep / batch eligibility

Auto-sweep (where the FTP folder is polled and files are processed automatically without anyone clicking upload) doesn't get enabled right away. The client/vendor needs to put together **2 or 3 good runs** before the channel is moved to batch processing. This typically happens well after go-live, often months out — and the DC isn't on the hook for it.

## Phase 7 — Hand off at go-live (no matter where you are)

The current operating model is: at the live date, the project gets passed to Fiduciary Services regardless of how far testing got. See [[payroll-handoff-at-go-live]] for the formal procedure (FILESPECRQ AWD ticket + COM notifies AM).

The shift from prior practice: DC now does ALL the bridge validation work themselves (mid-market is no longer carrying the testing). DC still hands off cleanly at go-live. We don't stay handcuffed to the plan for months after live just to finish payroll.

## Auto-enrollment carryover — two traps

Plans converting with auto-enrollment in place carry two issues the DC needs to surface during onboarding, not after go-live.

### Auto-escalation does not continue at TA

Participants whose deferral rate was auto-escalating at the prior record keeper will **not** keep escalating after conversion. The escalation ceases at TA — a participant expecting to climb to, say, 10% will stall at whatever rate they converted with unless they **opt back in**. This is a client-communication item: the client needs to know so participants can be told.

### Finding the auto-enroll defaulters — the "min or max-minus-one" heuristic

Prior-RK data often doesn't say cleanly who is sitting in the auto-enrollment default. The working heuristic: a participant flagged as default who is **at the plan's minimum rate, or at the maximum minus one**, probably got there via auto-enrollment rather than an active election. The DC pulls a list of participants (SSNs) who look like defaulters by this test and **sends it to the client** so the client can warn them about the escalation stopping.

Related: the **kit mail date** drives the auto-escalation clock, so it must be requested as part of the historical data. (ADP in particular can't reliably report auto-enrollment dates.)

## Multiple payroll vendors

If a plan has more than one payroll vendor, run the above flow for each — there's no single standardized procedure for the multi-vendor case. Best-effort coordination per vendor.

## See Also

- [[payroll-template]]
- [[ftp-connection]]
- [[payroll-support]]
- [[payroll-handoff-at-go-live]]
- Jen Curtin
- [[ftp-team]]
- [[eds]]
- [[dc-onboarding-workflow]]
