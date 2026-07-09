---
title: "Payroll Vendor Onboarding"
type: payroll
tags: [payroll, vendor, onboarding, ftp, eds, onepayroll, demo, conversion]
created: 2026-05-03
updated: 2026-05-03
sources: 1
status: current
---

# Payroll Vendor Onboarding

The full vendor-side payroll work that happens before FTP automation is live and before the go-live handoff. Covers the moment the prior payroll vendor enters the picture all the way through the client's first successful manual upload.

This page is the narrative spine. The supporting pages — [[payroll-template]] (the file spec), [[ftp-connection]] (the upload channel), [[payroll-support]] (OnePayroll validation), [[payroll-handoff-at-go-live]] (the live-date handoff) — each cover one piece in depth.

## Overview

Once the conversion kicks off and the payroll vendor is identified, the DC has a parallel workstream to run alongside everything else: get the vendor producing files in TA's format, get those files validated, get the upload channel set up, and demo the upload flow to whoever on the client side will be running it. The goal is to be in good enough shape by go-live that the project can be passed off to Fiduciary Services regardless of how far testing got.

## Phase 1 — Identify and contact

As soon as the conversion starts, find out two things:

1. **Who at the payroll vendor will be the contact** for this plan
2. **Who on the client side** will be uploading files — that person needs FTP credentials

Both pieces are upstream of everything else. Don't wait on either.

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

Once the upload contact is identified on the client side, fill out the FTP form and send it to [[jen-curtin]]'s [[ftp-team]]. **Don't sit on this.** That team has a backlog and setup takes real time. The earlier the request lands, the more breathing room you have.

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

### Manual email validation as the interim

If the FTP isn't live yet but the vendor wants validation, they can send the file as an email attachment directly to the DC. Validate it the same way (EDS → OnePayroll) and feed results back. Once FTP comes online, validate the next FTP-delivered file too — confirm both channels work.

## Phase 5 — Client demo

Once a clean test file is through OnePayroll, demo the upload flow to whoever on the client side will be running uploads. Eventually the FTP will move to auto-sweep and the client doesn't have to log in at all, but **that's not the day-one state**. Day one, someone on the client team is uploading files manually through the upload page.

`<CLIENT-DEMO-WALKTHROUGH-LINK>`

## Phase 6 — Auto-sweep / batch eligibility

Auto-sweep (where the FTP folder is polled and files are processed automatically without anyone clicking upload) doesn't get enabled right away. The client/vendor needs to put together **2 or 3 good runs** before the channel is moved to batch processing. This typically happens well after go-live, often months out — and the DC isn't on the hook for it.

## Phase 7 — Hand off at go-live (no matter where you are)

The current operating model is: at the live date, the project gets passed to Fiduciary Services regardless of how far testing got. See [[payroll-handoff-at-go-live]] for the formal procedure (FILESPECRQ AWD ticket + COM notifies AM).

The shift from prior practice: DC now does ALL the bridge validation work themselves (mid-market is no longer carrying the testing). DC still hands off cleanly at go-live. We don't stay handcuffed to the plan for months after live just to finish payroll.

## Multiple payroll vendors

If a plan has more than one payroll vendor, run the above flow for each — there's no single standardized procedure for the multi-vendor case. Best-effort coordination per vendor.

## See Also

- [[payroll-template]]
- [[ftp-connection]]
- [[payroll-support]]
- [[payroll-handoff-at-go-live]]
- [[jen-curtin]]
- [[ftp-team]]
- [[eds]]
- [[dc-onboarding-workflow]]
