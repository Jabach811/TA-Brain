# Extra Questions — Round 4 Answers

*Source: extra questions.txt — answers provided by DC (Marcus)*
*Converted to markdown: 2026-04-14*

---

## audit-pack
- Where is the standard audit pack template stored in the DC folder?
  - `root/Conversion/Contract`
- What tool/format is it (Excel? Word?)?
  - Excel
- How long does QA typically take to review?
  - Same day
- What happens if QA finds a discrepancy in the audit pack?
  - They email you directly to request a fix or explanation
- Are there different audit pack formats for different conversion types (cash vs. mapping vs. TIK)?
  - No. All the same.

---

## base-file
- What file format is the base file (Excel? CSV?)
  - Excel
- Is there a standard TA template or does the DC build it from scratch each time?
  - Standard template. Trimmed down with client specific details.
- What's the process for handling clients pulling from multiple payroll sources?
  - Correction: "sources" = plan-specific contribution sources (EE Deferrals, ER Match, etc.), not payroll sources. Thinking was wrong.
- How does the DC handle data quality issues in returned base files?
  - DC gives the client feedback and instructions to fix the file. DC does not modify it themselves — that's the client's job to give a clean file.
- At what point does base file data get loaded into P3 vs. coming from final files?
  - Census gets loaded as soon as the population is confirmed. The rest usually gets loaded at the time of conversion to make sure it's up to date and accurate.

---

## dummy-participant
- Who adds the dummy participant initially — DC or Doc Ops?
  - DC
- What happens if someone forgets the dummy participant before running Day of Wire?
  - Data won't load correctly and will need to be cleared by Prod Support. It's a nightmare. Don't do it.
- Is the dummy participant reused across plans or created fresh each time?
  - One dummy per plan (created fresh each time)
- Is a dummy participant needed for partial TIK (plan has both mapping and TIK funds)?
  - No. Only mapping (funds with re-reg = N).

---

## eligibility-and-deferrals
- What is the exact P3 navigation path for enabling eligibility by source?
  - Plan > top left dropdown > outsourcing summary > click eligibility > enable screen
- Is there a standard email template for the QA/TC/COM eligibility notification?
  - Yes. Essentially: "I'm about to start working. Go and do your thing first." But there is a formal template.
- How long does it typically take to get the go-ahead from QA/TC/COM?
  - Same day. Within the hour.
- What happens if auto-enrollment fires before deferrals are posted — can it be reversed?
  - Yes but it's a pain in the ass. Don't do it.
- How are eligibility dates handled — does the DC post them or does the system calculate?
  - Either straight from the client, straight from the vendor, or calculated by the eligibility rules in P3.
- Are there plans where eligibility was already active in P3 before conversion? How is that handled?
  - No. That is impossible. Eligibility runs plan by plan.

---

## final-files-processing
- What is the exact structure of the CIT balance file?
  - Case Number, Region, SSN, Source, Fund, Total
- Are there different EDS layouts for each data type (balance, YTD, deferrals, eligibility) or one combined layout?
  - One layout per data type
- What queries are run to verify balances after posting?
  - Lots. Will be in another md file later.
- What goes in the audit pack?
  - Ref Number history, prior vendor balances, prior vendor elections, loan details, fund and source mapping used.
- How is it determined whether client uses vendor data or their own data for eligibility/deferrals?
  - Client decides. Always up to them.

---

## ftp-connection
- Where/how does the DC submit the FTP setup request to the FTP team?
  - Email
- What exactly does the FTP account look like from the vendor's side?
  - A page where they upload a file. Nothing special.
- Is there a single FTP endpoint for all plans or a plan-specific URL/path?
  - Each plan has their own destination folder
- Who monitors for failed FTP uploads?
  - The Account Manager and payroll support
- What's the escalation if FTP is delayed significantly?
  - Client is notified

---

## fund-management-calendar
- Exact shared drive path?
  - Still unknown (not provided)
- Who is the owner of the FMC (what team manages it)?
  - Everyone who generates trades uses it. The cashiering/trading department monitors it and sends it where it needs to go daily.
- What happens if you genuinely miss the cutoff — is there an emergency process?
  - Can delay trades that day. Email workaround: if you can't get into the file right away, send an email with the details to a group (all recipients in a group). Keep trying the file throughout the day. Email is the backup.
- Does the FMC need an entry for partial-TIK plans where only some funds trade?
  - Only for things that actually trade. TIK is full transfer so no trading — no FMC entry needed for TIK funds.

---

## fund-mapping
- What are the ~6 TA-internal fields added to the template?
  - Filter, Vendor Fund Code, Ref #, Split ratio, Split code, Total
- Is there a deadline for fund mapping approval before liquidation?
  - Earlier the better. Nothing official.
- Who sends the final approved mapping to the system for loading?
  - It doesn't go in the system. DC sends out for QC, gets approved, and uses it in workflows.
- Can fund mapping change after approval? What's the amendment process?
  - Unlikely. That would be a massive change.
- Does fund mapping apply per-source or plan-wide?
  - Plan-wide

---

## liquidation-day
- Exact P2 navigation for creating trans ref numbers
  - Login screen → CORP07 for CORP (or tdatest for TDA) → 2001 for job # → enter contract and affiliate # → option 4 to add ref number → 1006 trans code → 3 as proc code
- Is there a specific email template for Cashiering notifications?
  - Not official. Just a casual heads up.
- How does the DC know if wire total doesn't match — what's the escalation path?
  - DC gets the total from the Cashiering email and the breakdown from the vendor. No match = go to vendor and figure out the problem. No processing until confirmed. Wire may be put on hold.
- What queries should be run in P3 after Day of Wire to verify?
  - Many. Will list after.

---

## onboarding-package
- Which plan types use the onboarding package vs. the PRD vs. both?
  - PEP uses onboarding package. All the rest use PRD.
- Is there a standard TA onboarding package template?
  - Yes
- Is the onboarding package always prepared by TA, or sometimes by the prior record keeper?
  - This is our doc. COMs put it together.
- For PEP plans, are there any additional DC-specific considerations?
  - No

---

## payroll-template
- Is there a standard TA payroll template or does the DC build one from scratch?
  - Template that we pair down per client details
- What file formats are accepted (CSV, Excel, fixed-width)?
  - All. Excel preferred.
- How many sources can appear on a single payroll template?
  - One to many. Nothing more than 10.
- What is the process for adding new sources to an existing payroll template post-conversion?
  - Not our job. Account Managers do that.
- How does the DC handle multiple payroll vendors for the same plan?
  - As best as we can

---

## plan-classes
- What are examples of "traditional" vs. "special" classes in the context of retirement plans?
  - Traditional: union, non-alien resident, part-time. Special: teachers, doctors, electricians — company/plan specific. All up to them.
- Can the DC add new traditional classes, or only update existing ones?
  - Only update existing
- What is the process to request Doc Ops to add a new special class?
  - Email
- How do classes interact with eligibility rules and vesting schedules in P3?
  - Some classes are excluded from eligibility. Others have different rules for entry.
- Where specifically in P3 are classes managed?
  - Plan > dropdown > define classes

---

## prd
- Who creates the PRD — the COM, a separate team, or is it provided by the prior record keeper?
  - COM
- Is there a standard TA PRD template?
  - Yes
- How far in advance of liquidation is the PRD typically signed?
  - One of the first things to do when the plan begins
- What is the escalation path if PRD and P3 setup are inconsistent?
  - COM and Doc Ops are alerted and the fix is made
- Can the PRD be amended after signing?
  - Only very special occasions

---

## prior-record-keeper
- How is the prior RK contact typically identified — through the client, the COM, or NBI?
  - We know when we get the plan in the first place
- Is there a standard questionnaire template?
  - Yes. Sent to them in the hello email.
- What happens if the prior RK is unresponsive or slow to cooperate?
  - You gotta deal with it. Keep on banging on them. Happens a lot.
- Are there common prior RKs (Fidelity, Vanguard, Empower) that have known workflows?
  - Yes. DC has created them all.
- Who owns the prior RK relationship — DC only, or shared with COM?
  - Everyone on the team

---

## source-mapping
- What is AQT's full name and where is it accessed?
  - Don't know its name. Who cares. It's an app.
- What query is run in AQT to pull source IDs?
  - Too long to write. All queries will be handled later.
- How many sources does a typical plan have?
  - ~10. Varies widely.
- What's the process if a prior vendor source doesn't have a clear TA equivalent?
  - Map as best as we can
- Who loads the approved source mapping into the system?
  - It's not loaded to the system. Once verified it is added to the workflows.
- Does source mapping apply to both balance and contribution sources?
  - Yes

---

## subpack
- Is there a standard subpack template?
  - Yes
- At what point in the workflow should the subpack ideally be complete?
  - Very beginning
- Is the subpack ever shared with the client or is it strictly internal?
  - Client knows about it but it's primarily internal

---

## toa
- What is the exact format/template of the re-registration form that gets sent to Matt O'Connell?
  - Excel doc. Simple form. Nothing worth mentioning special.
- Who creates the TOA initially — the COM, the prior record keeper, or TransAmerica ops?
  - Template filled out by COM
- Is there a deadline for when the client must return the signed TOA?
  - One of the first things to do
- What are the ~6 additional TA-internal fields added to the fund mapping template?
  - Filter, Vendor Fund Code, Ref #, Split ratio, Split code, Total (same as fund-mapping answer)

---

## transfer-in-kind
- Where is the re-registration form template stored in the DC folder?
  - Front folder
- How does Matt's team communicate to DC when shares are received?
  - He updates the shared spreadsheet. We jump in and get the details and then process.
- What happens if share amounts don't match? Who investigates?
  - DCs investigate, contact vendor
- Can TIK and mapping coexist in the same CONV file (different re-reg values per row)?
  - Yes. The ReReg field is for this — Y and N per row.
- What is the timeline from shares arriving at Fidelity to being applied to the plan?
  - We like to do them all at once, but if we can't, we process in chunks. When Matt asks us to do it, we jump in and do it.
- How does the DC know when all TIK shares have arrived?
  - The spreadsheet will be filled. We know what to expect too.

---

## wire-instructions
- Who generates wire instructions — the DC, Cashiering, or is there a standard template?
  - Template. Account is plan specific. There's an Assurance Code on P3 that tells us which account number to use. It's on the template.
- What is the specific P3 code that determines the account number?
  - Assurance Code. Navigation: Plan > dropdown > general plan > assurance codes
- How does the DC know when P3 is set up enough to get the plan-specific account number?
  - Just try to log in and see
- Is there a formal process for what happens when money lands in the default account?
  - We ask for transfers if they don't hit the right account
- What happens if the prior RK sends the wire to the wrong account entirely?
  - Same as above — ask for transfers

---

## eds
- Can multiple layouts be set up per plan simultaneously?
  - Of course. Many many per plan.
- What file formats does EDS accept (CSV, fixed-width, Excel)?
  - All

---

## ellen-miller
- Which team/department does Ellen Miller belong to?
  - Not sure but she communicates with a lot of departments
- Is she a single point of contact or does she have a team?
  - Thinks she has a team. Not sure.
- Is her role specific to certain plan types or all assignments?
  - All plans

---

## informatica
- Where exactly is Informatica accessed (URL, desktop app, within P3)?
  - Standalone app
- Can the Day of Wire workflow ever be run in test/debug with full execution?
  - Maybe. Will find out soon.
- What does the preview/debug mode actually show?
  - Don't know yet
- What is the exact field list for the CONV file?
  - Case number, prior fund code, TA fund code, ref number, amount, rereg Y or N
- How does the CIT balance file differ from the CONV file structurally?
  - Balance file is participant-specific. CONV is fund-specific.

---

## matt-oconnell
- What is the exact format of the re-registration form?
  - Already explained (Excel, simple)
- How does Matt's team communicate back to the DC when shares are received?
  - Through the spreadsheet
- What happens if share amounts don't match expected values?
  - Contact the vendor
- Is there a spreadsheet DC fills out separately from the re-registration form?
  - Yes. It's a tracker. DC fills in expected shares when they get final files.

---

## nbi
- What is NBI's full name?
  - New Business Intelligence
- Is NBI a web-based tool, desktop app, or integrated into another system?
  - Web-based
- Can DCs see all plans in NBI or only their own assignments?
  - We can see everything. History too.
- Is there a standard set of NBI checklist items for DCs or is it free-form?
  - All standard

---

## p2
- Is P2 accessed through a separate URL/interface or a different section within the same application?
  - URL (separate interface)
- Can all DCs access P2 or is access restricted?
  - All are welcome
- Are there other P2 operations beyond ref numbers that DCs perform?
  - Don't think so. Maybe.
- What does a trans ref number look like (format, length)?
  - Date in YYYYMMDD then ~7-8 random alphanumeric characters

---

## p3
- Exact navigation path for enabling eligibility by source in P3
  - Plan > top left dropdown > outsourcing summary > click eligibility > enable screen

---

## prod-support
- Typical turnaround time for Prod Support tickets?
  - 1-2 days
- Escalation paths for urgent corrections on liquidation day?
  - Same day (expedited)

---

## stacey-fortune
- What department(s) does Stacey primarily sit in?
  - Large Market
- Are there other situations beyond AE liquidation where Stacey is the go-to?
  - General knowledge resource
- What is her exact title?
  - "Awesome ass bad ass." (Unknown officially)
