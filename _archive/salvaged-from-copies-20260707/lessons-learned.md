# Lessons Learned & One-offs

*Generated 2026-05-09 17:33 UTC. 36 entries · running list, newest first. Each captured as Plan / Issue / Resolution / Key Takeaway. Edit lessons in their source file and regenerate by running build_brain.py.*

---

## Years Of Service Vesting Validation  (lesson/25 · 2026-05-08)

**Plan:** Stamets

**Issue:**

Years of service is not just a census field; it can change what participants see online.

**Resolution:**

Compare vendor years-of-service data against TA/load data and resolve vesting presentation before go-live pressure.

**Key Takeaway:** Late base-file timing made years-of-service and vesting validation harder than it needed to be.


## Wire Readiness Before Money Arrives  (lesson/16 · 2026-05-08)

**Plan:** Educators Credit Union

**Issue:**

The wire should never be the first time the DC realizes money is involved.

**Resolution:**

Use meetings and plan coding to identify expected wires before receipt; if money is coming, know whether it is mapping, Advanced Employer, transfer-in-kind, or another path.

**Key Takeaway:** A wire arrived before it was clear exactly what money was expected or what process would be needed.


## Vesting Override Decision  (lesson/15 · 2026-05-08)

**Plan:** _(none linked)_

**Resolution:**

**Decision Rule**

If all non-100% vested sources share the same rule, consider the 55 YOS catch-all.

If sources differ or only some sources should be overridden, use EDS by source ID.

**Key Takeaway:** A decision rule for choosing between a broad years-of-service override and a surgical EDS source-by-source override.


## Transfer-In-Kind Setup Timing  (lesson/23 · 2026-05-08)

**Plan:** Sibley Memorial Hospital

**Issue:**

TIK timing is front-end work. Waiting until wire/liquidation day is already late.

**Resolution:**

Get transfer-in-kind setup to Matt O'Connell early and verify registration/account setup before liquidation or share movement dates.

**Key Takeaway:** Transfer-in-kind setup/re-registration work was handled too late, adding risk when assets did not arrive as expected.


## Startup-Treated Merger Deferrals  (lesson/14 · 2026-05-08)

**Plan:** International School of Denver

**Issue:**

International School of Denver raised a tricky pattern: the plan behaves like a startup, but participants may already have existing payroll/election context. Loading elections on live date could create a QC delay or visible bad data.

**Resolution:**

**Current Working Theory**

One approach is:

- do not load deferrals before live date
- let participants enter changes after access opens
- later load the client-provided deferral file with the live effective date
- participant-entered changes should override the blanket load if already present

**Open Question**

Should the client provide the deferral file before live date instead of after? If they already have the data, waiting may not be necessary.

**Key Takeaway:** When an existing plan is treated like a startup, deferral loading may need special handling so participants can be live without un-QC'd elections showing.


## Secondary Fund-Code Mapping  (lesson/32 · 2026-05-08)

**Plan:** Health Concepts

**Issue:**

Some vendors require two mapping dimensions before the money makes sense.

**Resolution:**

Map both the visible fund and secondary code layer so TOA/final records reconcile.

**Key Takeaway:** Health Concepts had 80+ funds and Nationwide secondary fund codes that made mapping harder.


## Residual Shares  (lesson/30 · 2026-05-08)

**Plan:** COCC

**Issue:**

TIK residuals need their own tracking lane; reports may include values that have not arrived yet.

**Resolution:**

Separate actual received shares/cash from front-loaded report values, process in chunks when needed, and prorate residuals when they arrive.

**Key Takeaway:** COCC had residual dividends, staged share movement, and reports with front-loaded monthly dividend values.


## Reference Number Cleanup  (lesson/13 · 2026-05-08)

**Plan:** COCC

**Issue:**

COCC had a bad reference number/source cleanup issue tied to a short amount. The details matter because deleting or correcting the wrong reference can create more cleanup.

**Resolution:**

**Checklist**

- Identify the bad reference number.
- Identify the correct reference number.
- Confirm the short/incorrect amount.
- Confirm whether the original reference number should be deleted.
- Ask for help if the cleanup path is not clear.
- Document who confirmed the fix.

**Key Takeaway:** When a bad reference number/source issue appears, capture the exact bad ref, the short/incorrect amount, and whether the original ref number also needs deletion.


## Recovery Ownership After A Plan Goes Sideways  (lesson/37 · 2026-05-08)

**Plan:** Sibley Memorial Hospital

**Issue:**

A bad plan can become the turning point if it changes the operating discipline going forward.

**Resolution:**

Lean on senior help, clarify whether the issue is recoverable, and then own the cleanup without freezing.

**Key Takeaway:** Sibley/Cardinal created a personal and operational low point, but recovery came from asking for help and staying with the work.


## Pella ADP Deferral Handling  (lesson/12 · 2026-05-08)

**Plan:** Pella

**Issue:**

ADP records may not allow full confidence about whether participants are truly in default and still within the auto-escalation window. Waiting too long for the report created pain in the prior Pella work.

**Resolution:**

**Checklist**

- Identify the real client/vendor contact early.
- Request the deferral report early.
- Confirm liquidation/wire timing.
- Identify ambiguous default-window participants.
- Prepare client communication list if needed.

**Working Approach**

- Load participants out of default with their current percentage.
- Identify the ambiguous default-window group.
- Give that group to the client.
- Client communicates that participants may need to make their own changes because auto-escalation may not continue.

**Key Takeaway:** For Pella ADP data, chase the deferral report early and assume the default-election status may be ambiguous.


## Payroll Vendor Deadline Enforcement  (lesson/18 · 2026-05-08)

**Plan:** Church Farm School

**Issue:**

Payroll vendors do not automatically protect your deadlines; the DC has to keep the project moving.

**Resolution:**

Maintain deadline integrity, state what is needed, and escalate from friendly asks to direct operating requirements when the project is at risk.

**Key Takeaway:** Payroll setup dragged because external contacts were slow and follow-up was not firm enough early.


## Payroll File Delivery Troubleshooting  (lesson/11 · 2026-05-08)

**Plan:** Coverage Planning, NBI Update After Load, Havern School, COCC

**Issue:**

Use this when payroll contacts say a test or payroll file was sent, but it cannot be found in the expected FTP/intake location.

**Resolution:**

**Trigger**

- A payroll file is reportedly sent.
- The file is not visible in the expected FTP folder.
- Multiple intermediaries may be involved: advisor, payroll company, internal setup team, or client contact.

**Checklist**

1. Confirm the exact sender, send date/time, filename, and destination folder.
2. Check whether the sender used the actual payroll company path or an advisor/intermediary path.
3. Confirm the specs were sent to the party who is actually building the file.
4. Search the expected FTP/intake folder before escalating.
5. If still missing, ask the sender for proof of delivery or resend instructions.
6. Keep facilitation separate from ownership: if the right team has the fix, keep information moving without taking over the whole issue.

**Current Examples**

- [[cocc]]: payroll files are reportedly being sent but not landing in the FTP folder.
- [[havern-school]]: an advisor said a test file was sent, but it could not be found; the actual payroll company also has the specs.

**Key Takeaway:** Use this when payroll contacts say a test or payroll file was sent, but it cannot be found in the expected FTP/intake location.


## P2 Ref Number Fund Link  (lesson/10 · 2026-05-08)

**Plan:** COCC, Reference Number Cleanup

**Issue:**

If the P2 reference is not pointed to the fund in P3, the work can get stuck in limbo and require Product Support to fix. This is a preventable trap during finish-line posting (ex: COCC).

**Resolution:**

**Trigger or Checklist**

Use when creating or fixing a reference number in P2.

- In P2: create the reference number.
- In P3: sign in (Edge) and point the reference to the correct fund.
- Confirm it is not stuck in limbo before moving on.
- If it is stuck, escalate to Product Support and capture what ref/fund was involved.

Notes captured from the memo:

- Process code: `3`
- Elections code: `2`

**Key Takeaway:** When you create a reference number in P2, you must point it to the fund in P3.


## NQDC Excess Asset Handling  (lesson/33 · 2026-05-08)

**Plan:** Thunder Valley Casino

**Issue:**

NQDC money may not reconcile one-to-one to participant balances.

**Resolution:**

Confirm whether the difference is participant money, asset-liability variance, dividend, or forfeiture/excess asset before allocating.

**Key Takeaway:** A large extra amount appeared that was not participant money.


## NBI Update After Load  (lesson/09 · 2026-05-08)

**Plan:** _(none linked)_

**Issue:**

When NBI was down in late April, updates stacked up. The catch-up work created risk that loaded work would not be visible to the broader team.

**Resolution:**

**Checklist**

- Confirm the load is complete.
- Do a quick quality check.
- Confirm expected participants/elections/balances show correctly.
- Send NBI/status update.
- Note who responded or confirmed.

**Key Takeaway:** After census, elections, balances, or other deliverables are loaded and checked, send the NBI/status update promptly.


## MVA Funding And Wire Handling  (lesson/26 · 2026-05-08)

**Plan:** Pella Carolina

**Issue:**

Every dollar needs an owner and a destination before conversion day.

**Resolution:**

Identify whether MVA is participant-funded, covered by a separate wire, or handled another way; track every wire component when it arrives.

**Key Takeaway:** MVA funding and later-arriving money were not nailed down early enough.


## Multi-Plan ID Separation  (lesson/27 · 2026-05-08)

**Plan:** Vera Institute of Justice

**Issue:**

Treat related plans as related, not interchangeable.

**Resolution:**

Keep a clear crosswalk of vendor plan IDs, TA plan IDs, file names, and processing steps for each plan.

**Key Takeaway:** Multi-plan implementations can blur vendor plan numbers and TA plan numbers.


## Mapping Day-One Readiness  (lesson/21 · 2026-05-08)

**Plan:** Cardinal Heating

**Issue:**

Mapping plans are not wait-and-see plans once wire/final-file data is available.

**Resolution:**

Read final files correctly, know the expected mapped funds, and be prepared to apply money the same day when mapping instructions exist.

**Key Takeaway:** Money that should have been mapped day one was placed in Advanced Employer because the mapping path was not ready.


## Loan Review Discipline  (lesson/08 · 2026-05-08)

**Plan:** Calliditas

**Issue:**

The trap is thinking that a small file is safe because it loaded. Loaded does not mean correct. The better rule is almost the opposite: if the file is small, there is no excuse not to inspect every record.

**Resolution:**

**Standard**

When reviewing loans:

- go slow
- check the output
- inspect each loan
- confirm fields that matter
- do not assume success from a clean load
- treat "only five loans" as a reason to be more thorough, not faster

**Mental Note**

If there are only five loans, that means there is time to review all five carefully.

**Key Takeaway:** Small loan files still require slow, careful validation.


## Loan Report Mismatch Handling  (lesson/31 · 2026-05-08)

**Plan:** Denali Water Solutions / Wallace Farm

**Issue:**

A small loan count can still hide a messy reporting issue.

**Resolution:**

Aggregate/massage the loan data only after confirming totals and understanding which fund reporting artifact is causing the mismatch.

**Key Takeaway:** Loan reports showed payments tied to a fund that did not line up cleanly with the loan.


## Limited Access Census Freshness  (lesson/17 · 2026-05-08)

**Plan:** Medical College of Wisconsin

**Issue:**

Limited access needs a final-enough census early enough for TC checks and participant access.

**Resolution:**

Ask whether the population will change, whether there are upcoming hire blocks, and which file is load-ready for limited access.

**Key Takeaway:** An early census was treated like the final limited-access population, but a later block of hires was missing.


## Informatica Loan Troubleshooting  (lesson/07 · 2026-05-08)

**Plan:** Calliditas, Informatica File Separation

**Issue:**

Calliditas showed a silent-style failure where the workflow appeared fine, but the P3 step did not show the expected load because the parameter file referenced the wrong input file.

**Resolution:**

**Checklist**

- Confirm the parameter file points to the right input file.
- Confirm the input file header/source matches expectations.
- Check case number / plan references.
- Check totals after the workflow.
- Confirm P3 shows the expected load before calling it done.
- Separate live and working files before rerun.

**Key Takeaway:** If Informatica says a loan load succeeded but P3 does not show the expected result, do not stop at the success message.


## Informatica File Separation  (lesson/06 · 2026-05-08)

**Plan:** Calliditas, Informatica Loan Troubleshooting

**Issue:**

Calliditas showed that a parameter file can reference the wrong input file when multiple similar files sit in the same folder. The workflow may appear successful while nothing expected lands in P3.

**Resolution:**

**Trigger**

Use this process when:

- editing input files
- rerunning a corrected Informatica load
- keeping old and new versions of a file
- troubleshooting a successful workflow with missing P3 output

**Checklist**

- Put live input files in a clean folder.
- Move drafts/working files somewhere else.
- Confirm the parameter file points to the intended input file.
- Run the workflow.
- Check totals.
- Confirm the expected item appears in P3.

**Key Takeaway:** Keep live files and working files in separate folders when running Informatica loads.


## Informatica Election Load Troubleshooting  (lesson/05 · 2026-05-08)

**Plan:** _(none linked)_

**Issue:**

On 2026-04-28 an elections load blocker was hit. If Informatica cannot be made to work, EDS may be the fallback, but the root issue should be understood first.

**Resolution:**

**Checklist**

- Identify participants in the plan but missing from the import file.
- Confirm whether those participants should be excluded or added.
- Ask Dave Shloat or another Informatica SME if override behavior exists.
- Decide whether Informatica can still be used.
- If not, switch to EDS and document the reason.

**Key Takeaway:** When an Informatica elections load kicks out because participants exist in the plan but not on the import file, pause and diagnose before switching tools.


## Fund Management Calendar Discipline  (lesson/35 · 2026-05-08)

**Plan:** TMG

**Issue:**

It is okay for an FMC estimate not to trade; it is not okay for a trade to happen with no FMC record.

**Resolution:**

Put estimated trades on the FMC as soon as possible, update them with test/final values, and email the required groups if the sheet is locked.

**Key Takeaway:** A large Advanced Employer trade was not placed on the Fund Management Calendar.


## Default Election Effective-Date Timing  (lesson/34 · 2026-05-08)

**Plan:** TMG

**Issue:**

Default-election timing can break early access even when the election values are correct.

**Resolution:**

If elections are defaulted before early access, use an effective date before the early-access window so participant changes are not blocked.

**Key Takeaway:** Default elections were loaded with a future effective date, blocking participants from changing elections during early access.


## DC P3 Checklist  (lesson/04 · 2026-05-08)

**Plan:** Leiby's Dairy, Base File First

**Issue:**

Early P3 checks can catch missing setup details before they turn into downstream cleanup. Leiby is the current seed plan for this checklist.

**Resolution:**

**Trigger or Checklist**

Use when P3 is up or newly available for a plan.

- Confirm sources are present.
- Confirm classes are present.
- Confirm auto-enroll details.
- Confirm start date.
- Confirm escalation settings.
- Check any other plan-specific setup areas.
- Record gaps on the plan page.

**Key Takeaway:** When P3 is available for a plan, run a quick standardized DC check before the work drifts.


## Day-Two Managed Advice Conversion  (lesson/28 · 2026-05-08)

**Plan:** Vera Institute of Justice

**Issue:**

Managed advice can be a second conversion step, not just a default investment detail.

**Resolution:**

Provide the TC with the list of participants defaulted at the vendor so day-two managed advice can be initiated cleanly.

**Key Takeaway:** Defaulted vendor participants needed a second managed-advice rebalance after the initial investment.


## Coverage Planning  (lesson/03 · 2026-05-08)

**Plan:** Pella

**Issue:**

Late-April Pella and Havern work showed that coverage is not just "someone knows." The covering person needs contacts, expected amounts if possible, plan context, and what to do with the money/data.

**Resolution:**

**Checklist**

- Confirm the exact out-of-office date.
- Identify the event that needs coverage.
- Assign the covering person.
- Give them client contact.
- Give them vendor/prior RK contact.
- Give them expected wire amount if available.
- Tell them where the item should go, such as Advanced Employer.

**Key Takeaway:** When out-of-office overlaps with a wire, asset movement, payroll event, or go-live window, coverage needs to be assigned early and with contacts attached.


## Census Cleanup Across All Tables  (lesson/29 · 2026-05-08)

**Plan:** COCC

**Issue:**

Deleting from one table is not a clean participant removal.

**Resolution:**

When clearing a bad census load, tell Broad Support to clear every related table, not only the employee table.

**Key Takeaway:** Participants were loaded into the wrong plan and had to be removed.


## Blackout Report Cutoff Discipline  (lesson/20 · 2026-05-08)

**Plan:** Health Advocates

**Issue:**

If a report is available on demand before blackout, get it while the door is still open.

**Resolution:**

Capture loan/election/deferral reports before blackout if access will be limited or cut off.

**Key Takeaway:** Vendor blackout/access cutoff prevented early loan report capture, delaying payroll restart work.


## Base File First  (lesson/02 · 2026-05-08)

**Plan:** Banayn, International School of Denver

**Issue:**

Base file meetings go better when the file is already prepared. Waiting creates avoidable pressure and makes it easier to get caught underprepared. Shorthand from the May 5 dump: make the base file the first real move after plan intake so meetings do not catch you flat-footed.

**Resolution:**

**Trigger**

Use this rule when:

- a new plan is assigned
- a base file meeting is scheduled
- client census setup is coming
- plan setup details are stable enough to begin

**Checklist**

- Confirm plan treatment and setup assumptions.
- Build the base file early.
- Review for obvious missing fields.
- Bring the base file to the meeting ready to discuss.
- Send completed base file promptly after meeting.
- Capture any missing plan dates, contacts, and assumptions immediately after the meeting.

**Key Takeaway:** After a plan is assigned or intake begins, the base file should become one of the first concrete work products.


## Ask For Help Before The Hole Gets Deep  (lesson/24 · 2026-05-08)

**Plan:** Sibley Memorial Hospital

**Issue:**

The earlier the question, the smaller the hole.

**Resolution:**

Ask Earl/Rob/manager/SMEs early when a plan has unfamiliar money movement, mapping, TIK, or P&L exposure.

**Key Takeaway:** Questions were delayed too long on a complicated hybrid conversion, leading to a large recovery effort.


## Advisor Group Patterns: WTW And ExcelWise  (lesson/36 · 2026-05-08)

**Plan:** TMG

**Issue:**

Advisor-group plans have personalities. Knowing the pattern helps set expectations early.

**Resolution:**

Recognize QK63233 as WTW-style and QK63283 as ExcelWise-style work; expect thorough questions and advisor-driven urgency.

**Key Takeaway:** WTW and ExcelWise plans show recurring advisor-group patterns, expectations, and client intensity.


## Advanced Employer Is Not A Parking Lot  (lesson/22 · 2026-05-08)

**Plan:** Sibley Memorial Hospital

**Issue:**

Advanced Employer is a tool, not a default answer for uncertainty.

**Resolution:**

Break down the money by processing type before receipt: mapped, hold/Advanced Employer, transfer-in-kind, residual, or special handling.

**Key Takeaway:** Money was parked in Advanced Employer even though only part of it belonged there.


## ADP Segmented Ownership Model  (lesson/19 · 2026-05-08)

**Plan:** AVL USA

**Issue:**

With ADP, one contact rarely owns the whole path. Map the ownership before waiting weeks on the wrong person.

**Resolution:**

Identify the owner for each ADP step and make sure the client and ADP understand the TA process and file expectations.

**Key Takeaway:** ADP work stalled because different ADP groups owned specs, system setup, file initiation, and file transmission.
