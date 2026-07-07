const fs = require("fs");
const path = require("path");

const root = __dirname;
const dirs = {
  assets: path.join(root, "assets"),
  decks: path.join(root, "decks"),
  flowcharts: path.join(root, "assets", "flowcharts"),
  icons: path.join(root, "assets", "icons"),
  procedures: path.join(root, "procedures")
};

Object.values(dirs).forEach(dir => fs.mkdirSync(dir, { recursive: true }));

const procedures = [
  {
    slug: "census-loading",
    title: "Census Loading",
    short: "Bring the plan population into EDS cleanly.",
    family: "Census / Elections",
    accent: "#2a6f73",
    summary: "Census data usually comes from the plan-specific base file, sometimes from a limited access file, the client, or the vendor. The load is successful only when mandatory fields, data types, default elections, warning reports, and missing participant exceptions are all accounted for.",
    inputs: ["Completed PRD or onboarding package", "Testing results from AWD", "Plan-specific base file", "Limited access file when open period applies", "Client or vendor missing participant details", "Forfeiture entries from balance files when present"],
    systems: ["EDS", "AQT", "AWD", "Base file template", "Payroll template"],
    steps: [
      "Confirm the source of census data: base file, limited access file, client file, or vendor file.",
      "Use AWD testing results to tailor the base and payroll templates for the plan.",
      "Meet with the client contact and walk through exactly how the file should be filled out.",
      "Validate returned data for mandatory fields, data types, term reason code needs, and column placement.",
      "Add forfeiture participants when balance files include them, preserving vendor naming and using standout DOB/DOH conventions.",
      "Load the census through EDS and read every warning and error output.",
      "Use AQT and EDS output files to verify who loaded, who failed, and what needs client follow-up."
    ],
    decisions: ["Is this a limited access or cash conversion plan?", "Are elections being defaulted during the census load?", "Are extra participants present on balance files but absent from census?", "Do warning reports indicate fixable data issues or true rejects?"],
    outputs: ["Loaded participant census", "Warning and error report notes", "Client follow-up list", "Verified population count"],
    watchouts: ["Most census files come from the base file, not the vendor.", "Do not ignore EDS output files; they are the import story.", "Extra participants from balance files should be reviewed with the client when possible.", "Forfeiture participants should stand out; use 12/25/1955 as date of birth and 12/25/1985 as date of hire.", "Favorite EDS output folders while imports are active so email reports surface quickly."],
    closeout: ["Population count reconciled", "Warnings reviewed", "Errors cleared or documented", "Client follow-ups sent"]
  },
  {
    slug: "elections",
    title: "Elections",
    short: "Default or map participant elections explicitly.",
    family: "Census / Elections",
    accent: "#3f7d5a",
    summary: "Election handling is either a defaulting path or a mapping path. The cleanest approach is to default elections during the census load when possible; second-pass EDS defaulting is available but should not be the preferred route.",
    inputs: ["Census population", "Limited access elections when applicable", "Mapped election file", "AQT query for missing-election population"],
    systems: ["EDS", "AQT", "Election mapping layout"],
    steps: [
      "Decide whether participants are being defaulted or mapped from existing elections.",
      "If defaulting during census, include the default instruction in the EDS census load.",
      "If defaulting later, use one row per participant with Fund Descriptor blank, Percentage blank, and default indicator D.",
      "If mapping elections, load the mapped election layout and verify coverage.",
      "Query the plan population for participants who have no elections.",
      "Document explicit counts: mapped, defaulted, missing, and intentionally ignored."
    ],
    decisions: ["Default everyone or map elections?", "Are no-election participants termed or still action-worthy?", "Does the client need to confirm deferral/election details through payroll?", "Can missing election records be explained instead of assumed?"],
    outputs: ["Defaulted election population", "Mapped election population", "No-election exception list", "AQT verification evidence"],
    watchouts: ["Do not rely on inference. If 150 participants are in the plan, account for all 150.", "Second-pass defaulting works, but doing it during census is cleaner.", "For default-only EDS rows, Fund Descriptor and Percentage are blank and the default indicator is D."],
    closeout: ["Mapped/defaulted counts match population", "No-election population reviewed", "AQT evidence retained", "Client or payroll gaps noted"]
  },
  {
    slug: "source-mapping",
    title: "Source Mapping",
    short: "Map vendor source codes to TA source IDs.",
    family: "Mapping",
    accent: "#2b6f89",
    summary: "Source mapping starts from test files and is finalized against final files. The point is to map source codes that actually carry balances, get QA approval, and be ready to add any new final-file source immediately.",
    inputs: ["Test files", "Final files", "Vendor source code summaries", "TA source ID query results", "QA source mapping file"],
    systems: ["AQT", "QA review", "Source mapping workbook"],
    steps: [
      "Summarize vendor balances by source code and vendor source name.",
      "Ignore source codes that never carry money unless QA asks otherwise.",
      "Run the AQT query to retrieve the TA source IDs.",
      "Fill the mapping file with vendor source code, vendor source name, and TA source ID.",
      "Send source mapping to QA for review.",
      "Re-check final files for new source codes and rush any needed additions."
    ],
    decisions: ["Does the source have money?", "Did final files introduce a new source?", "Is QA approval complete before balance processing?", "Are vendor codes and names preserved clearly enough to show work?"],
    outputs: ["Approved source mapping file", "Source IDs for balance workflows", "Final-file source change list"],
    watchouts: ["Do not waste time mapping sources with no balances unless needed.", "Final files can introduce new sources, so re-check before processing.", "Show vendor code and vendor name together so QA can follow the mapping."],
    closeout: ["QA approval received", "Final-file source check complete", "All balance-bearing sources mapped", "Mapping evidence retained"]
  },
  {
    slug: "cash-conversion-balances",
    title: "Cash Conversion Balances",
    short: "Book the wire, hold in Advanced Employer if needed, then invest by current elections.",
    family: "Balances",
    accent: "#8a6f2a",
    summary: "Cash conversions revolve around wire readiness, cashiering confirmation, Advanced Employer handling, current elections, final records, fund management calendar entries, and status emails to QA, COM, and PC.",
    inputs: ["Wire instructions", "Wire date and effective date", "Cashiering estimate and final amount", "P2 booking confirmation or email", "Final records", "Current elections"],
    systems: ["P2", "P3", "Advanced Employer account", "Fund management calendar", "Informatica CIT balance workflow"],
    steps: [
      "Send wire instructions early and re-send them the week before liquidation for confirmation.",
      "Keep vendor and cashiering communication open as the wire date approaches.",
      "Confirm the booked wire by cashiering email or by searching ref numbers in P2.",
      "If final records are not ready, move money to the Advanced Employer account.",
      "Send status email to QA, COM, and PC that the wire was booked and moved to Advanced Employer.",
      "When final records are ready, liquidate Advanced Employer, create the liquidation ref number, run CIT balance, and apply interest pro rata the next day."
    ],
    decisions: ["Are final records ready early enough to bypass Advanced Employer?", "Are all participant elections present or defaulted?", "Is the trade on the fund management calendar?", "Did the booked amount match the expected amount?"],
    outputs: ["Booked wire confirmation", "Advanced Employer purchase and liquidation records", "CIT balance posting", "Participant purchases", "Pro rata interest allocation"],
    watchouts: ["Cash conversions do not need fund mapping, but they do need source mapping.", "Fund management calendar entries are mandatory for big trades.", "Trailing dividends do not need the calendar; main trades and AE liquidation do.", "If the calendar is wrong or locked, notify the trade email groups immediately."],
    closeout: ["Wire booked", "AE status email sent", "Calendar updated", "Final records processed", "Interest handled next day"]
  },
  {
    slug: "fund-mapping",
    title: "Fund Mapping",
    short: "Turn the TOA fund map into a QA-ready purchase/ref-number file.",
    family: "Mapping",
    accent: "#7b5b9f",
    summary: "Fund mapping is used for mapping conversions. The TOA provides old-to-new fund relationships, but the working fund mapping file adds prior fund codes, amounts, ref numbers, and split-fund indicators.",
    inputs: ["Finalized TOA", "Prior record keeper fund codes", "Fund totals", "Split-fund percentages", "Ref numbers once processing begins"],
    systems: ["TOA", "Fund mapping workbook", "P3 ref numbers", "QA review"],
    steps: [
      "Copy the fund mapping section from the finalized TOA.",
      "Add the DC working header: prior fund code, total amount, ref number, and split indicator.",
      "Fill Transamerica fund descriptor details from the TOA.",
      "Document split funds with the correct allocation percentages.",
      "Resolve mismatches where vendor fund codes do not line up cleanly with the TOA.",
      "Send fund mapping to QA and update ref numbers when processing begins."
    ],
    decisions: ["Does the vendor fund code match the TOA fund code?", "Is any fund split across two TA funds?", "Are ref numbers ready yet or pending processing?", "Can QA follow the work from prior fund to TA fund?"],
    outputs: ["QA-ready fund mapping file", "Split-fund instructions", "Ref-number-ready purchase file"],
    watchouts: ["Fund mapping is only for mapping conversions, not cash conversions.", "Some vendor fund codes require two-step explanation; show the work.", "The mapping cannot be fully complete until ref numbers exist."],
    closeout: ["TOA mapping copied", "Prior fund codes and totals filled", "Split funds documented", "QA review sent"]
  },
  {
    slug: "mapping-conversion-balances",
    title: "Mapping Conversion Balances",
    short: "Use CONV and a dummy participant to hold fund-level purchases until final records arrive.",
    family: "Balances",
    accent: "#5b6f94",
    summary: "Mapping conversions use day-of-wire workflows and CONV files to post fund-level balances to the dummy participant. Final participant balances are later loaded through CIT balance, and the dummy participant is reversed through ROC.",
    inputs: ["CONV file", "Fund mapping file", "P3 ref numbers", "Dummy participant", "Final participant balance records", "CIT balance parameter file"],
    systems: ["Informatica day-of-wire workflow", "P3", "ROC", "CIT balance workflow"],
    steps: [
      "Create the dummy participant before running the mapping workflow.",
      "Build the CONV file with case number, prior fund code, TA fund code, ref number, amount, and TIK indicator N.",
      "Run the day-of-wire workflow to load fund-level detail to the dummy participant.",
      "Process in P3 using batch no-hold and process immediate so trades go out.",
      "When final files arrive, run CIT balance with cash conversion wire set to N.",
      "Reverse the dummy participant in P3 ROC so only real participant balances remain."
    ],
    decisions: ["Is the dummy participant loaded before workflow execution?", "Are ref numbers present in fund mapping?", "Is the cash-conversion parameter set to N?", "Do participant balances match the original fund-level purchases?"],
    outputs: ["Dummy participant fund-level balances", "Real participant balance records", "ROC dummy reversal", "Final transaction detail"],
    watchouts: ["The dummy participant SSN is 999-00-0000.", "If the dummy participant is missing, the workflow can be painful to untangle.", "Mapping uses the ref numbers from the fund mapping file, not a single cash wire ref number."],
    closeout: ["Dummy loaded", "Day-of-wire workflow processed", "CIT balance processed", "Dummy reversed", "Transaction detail verified"]
  },
  {
    slug: "transfer-in-kind",
    title: "Transfer In Kind",
    short: "Coordinate re-registered shares through Matt O'Connell and Fidelity accounts.",
    family: "Balances",
    accent: "#2d7a78",
    summary: "TIK workflows reuse parts of the mapping structure but mark re-registered funds differently. Shares are accepted into Fidelity accounts set up by Matt O'Connell's team, then final files complete participant-level detail without trades going out.",
    inputs: ["TOA TIK indicator", "Share detail spreadsheet", "Matt O'Connell confirmation", "Vendor share instructions", "Final share amounts", "CONV file with TIK flag Y"],
    systems: ["TOA", "Matt O'Connell team", "Fidelity pooled accounts", "Informatica day-of-wire workflow", "CIT balance workflow"],
    steps: [
      "Identify re-registering funds from the TOA TIK column.",
      "Send fund/share details to Matt O'Connell and wait for account setup confirmation.",
      "Send Fidelity account instructions to the vendor.",
      "Check in before wire/liquidation day and keep the tracking spreadsheet current.",
      "Update final-file share amounts so Matt's team knows exactly what to locate.",
      "Run day-of-wire and CIT balance workflows with no trades going out, then confirm with Matt's team."
    ],
    decisions: ["Which funds are marked for re-registration?", "Has Matt's team confirmed receiving-account readiness?", "Do final shares match expected shares?", "Is any discrepancy more than a tiny tolerance?"],
    outputs: ["Fidelity receiving accounts", "Updated share tracking spreadsheet", "Participant-level share records", "Matt/team confirmation"],
    watchouts: ["Matt's team may only have the email to identify shares, so accurate share amounts matter.", "A discrepancy above roughly one share needs escalation.", "No trades go out for TIK once participant balances are whole."],
    closeout: ["Accounts confirmed", "Vendor instructed", "Final shares updated", "CIT balance complete", "Matt confirmation received"]
  },
  {
    slug: "loan-loading",
    title: "Loan Loading",
    short: "Set up P3 conversion records, run Informatica, then take over loans.",
    family: "Loans",
    accent: "#9a593f",
    summary: "Loan loading starts in P3 with vendor/conversion setup, moves through Informatica test and production runs using loan header and loan source files, and ends with P3 takeover, HOLB handling, email confirmation, and query verification.",
    inputs: ["Vendor name", "Case number", "Effective date", "Loan header file", "Loan source file", "Loan workflow parameter file", "HOLB file if available"],
    systems: ["P3", "Informatica loans workflow", "HOLB process", "AQT verification queries", "Audit pack"],
    steps: [
      "In P3, open the plan, choose Conversions, add record keeper, enter vendor name, apply, and save.",
      "Create a new conversion with the case number, no affiliate, conversion date and assigned date three months before effective date, and effective date.",
      "Save and capture the generated conversion number.",
      "Validate loan header and loan source: outstanding balance in header must match source breakout.",
      "Run the Informatica loans workflow in test mode, then flip test to N and run production if clean.",
      "In P3, find the existing conversion, take over loans, handle HOLB upload/create, wait for email confirmation, and run verification queries."
    ],
    decisions: ["Did P3 generate the conversion number?", "Do loan header and loan source balances match?", "Did the test run clear without errors?", "Is there an HOLB file or should P3 create one?"],
    outputs: ["P3 conversion number", "Loaded loan records", "HOLB upload/create confirmation", "Email confirmation", "Loan audit evidence"],
    watchouts: ["Conversion and assigned dates are largely irrelevant but required; use three months prior to effective date.", "Header/source balance mismatch must be fixed before loading.", "Do not skip the test run before production.", "The audit pack needs loan evidence, often close to the loan header detail."],
    closeout: ["Conversion number captured", "Test and production clean", "Loans taken over", "HOLB handled", "Queries verified"]
  },
  {
    slug: "final-files-processing",
    title: "Final Files Processing",
    short: "Run the post-liquidation load sequence without breaking the order.",
    family: "Final Files",
    accent: "#6b6f2a",
    summary: "Final files are the authoritative post-liquidation records. The DC confirms the source policy, posts participant balances by conversion type, then loads deferrals, eligibility, and YTD data in a strict order.",
    inputs: ["Final files from the prior record keeper", "Client source-policy decision", "Prepared EDS layouts", "CIT balance file", "Conversion type", "Audit query set"],
    systems: ["EDS", "Informatica", "P3", "ROC", "AQT", "NBI"],
    steps: [
      "Confirm whether final-file data, base-file data, or a hybrid source policy governs each load.",
      "Build the participant-level CIT balance file by case, region, SSN, source, fund, and total.",
      "Run the CIT balance workflow in test mode and correct mapping or layout errors before production.",
      "Post balances using the correct conversion-type path: cash, mapping, or transfer in kind.",
      "Load deferral elections before any eligibility action.",
      "Enable and load eligibility only after deferrals are verified clean.",
      "Load YTD contributions, compensation, and hours through separate EDS layouts.",
      "Run verification queries, review EDS outputs, build the audit pack, and update NBI."
    ],
    decisions: ["Which data source did the client approve for each record type?", "Is this cash, mapping, or transfer in kind?", "Has the balance workflow passed test mode?", "Are deferrals verified before eligibility starts?", "Did verification prove counts, totals, and sources?"],
    outputs: ["Posted participant balances", "Loaded deferrals", "Enabled eligibility", "Loaded YTD data", "Audit pack evidence", "Updated NBI status"],
    watchouts: ["Do not run eligibility before deferrals.", "Wrong P3 processing mode can fire duplicate trades.", "Cash and mapping paths need dummy-participant cleanup.", "TIK needs fresh final-share estimates for Matt O'Connell's team.", "EDS layouts should be ready before final files arrive."],
    closeout: ["Balances posted", "Deferrals verified", "Eligibility enabled", "YTD loads complete", "Audit pack complete", "NBI updated"]
  },
  {
    slug: "deferral-processing",
    title: "Deferral Processing",
    short: "Load elections and auto-enroll state before eligibility can fire.",
    family: "Final Files",
    accent: "#8a4f7d",
    summary: "Deferrals fill the system state. They capture participant elections, auto-enrollment status, and auto-enrollment start dates so eligibility does not trigger the wrong default actions later.",
    inputs: ["Client deferral data", "Vendor election data", "Payroll election data when needed", "Auto-enrollment start dates", "Plan escalation rules", "EDS deferral layout"],
    systems: ["EDS", "P3", "AQT", "Client payroll system"],
    steps: [
      "Confirm which data source the client chose for deferral elections.",
      "Identify participants enrolled under auto-enrollment defaults.",
      "Capture each participant's deferral rate and auto-enrollment start date.",
      "If ADP or another source cannot provide start dates, request them directly from the client.",
      "If start dates still cannot be provided, use the conservative assumption and notify the client of impacted participants.",
      "Load deferrals through EDS and review all warning and error outputs.",
      "Post to P3 and verify elections before eligibility begins.",
      "Proceed to eligibility only after deferrals and auto-enroll data are clean."
    ],
    decisions: ["Did the client choose vendor, client, payroll, or hybrid data?", "Which participants are auto-enrollment defaults?", "Are auto-enrollment start dates present and reliable?", "Is the prior record keeper ADP or another weak source for dates?", "Are all elections verified before eligibility runs?"],
    outputs: ["Loaded deferral elections", "Auto-enroll participant list", "Client notice list for missing date risk", "EDS output review", "P3 verification evidence"],
    watchouts: ["Eligibility before deferrals can cause auto-enrollment to overwrite elections.", "ADP does not reliably provide auto-enrollment dates.", "Missing start dates can break escalation logic.", "Wrong elections may not surface until payroll starts.", "Deferral cleanup is usually harder than eligibility cleanup."],
    closeout: ["Source policy confirmed", "Auto-enroll population identified", "Start-date gaps handled", "EDS warnings reviewed", "P3 elections verified"]
  },
  {
    slug: "eligibility-processing",
    title: "Eligibility Processing",
    short: "Enable rule-driven eligibility only after deferrals are clean.",
    family: "Final Files",
    accent: "#3d6f9f",
    summary: "Eligibility turns on P3 rule logic for who qualifies, when participants enter, and when auto-enrollment can trigger. It should only run after deferrals have filled the participant election state.",
    inputs: ["Eligibility file", "Deferral verification evidence", "Client source-policy decision", "P3 eligibility rules", "Contributing source list", "Internal approval email"],
    systems: ["P3", "EDS", "AQT", "QA", "TC", "COM"],
    steps: [
      "Prepare the eligibility file from the approved data source.",
      "Confirm deferrals are loaded and verified before eligibility work starts.",
      "Send the internal approval email to QA, TC, and COM.",
      "Wait for the go-ahead before enabling eligibility.",
      "In P3, navigate to Outsourcing Summary and the Eligibility enable screen.",
      "Enable only sources that will receive contributions.",
      "Load and process eligibility through EDS and the CIT Eligibility job.",
      "Run queries and confirm eligibility results."
    ],
    decisions: ["Are deferrals verified clean?", "Did QA, TC, and COM give the go-ahead?", "Which sources actually receive contributions?", "Are class, service, and entry-date rules configured correctly?", "Do results match the expected eligible population?"],
    outputs: ["Enabled eligibility rules", "CIT Eligibility job result", "Verified eligible population", "Query evidence", "Exception list if needed"],
    watchouts: ["Eligibility triggers actions; it is not just a passive load.", "Do not enable non-contributing sources.", "Auto-enrollment can fire if no deferral is on file.", "Class-based rules need careful review.", "LTPT status requires hours discipline."],
    closeout: ["Deferrals checked", "Approval received", "Contributing sources enabled", "Job completion email reviewed", "Queries verified"]
  },
  {
    slug: "basis-loading",
    title: "Basis Loading",
    short: "Load Roth and after-tax basis without breaking tax history.",
    family: "EDS Loading",
    accent: "#7a6240",
    summary: "Basis loading captures employee basis values such as Roth or after-tax contributions. It requires the right data elements, correct restrictions by plan type, and careful transaction adjustment checks.",
    inputs: ["Basis source file", "EE basis fields", "Plan type", "Roth start dates", "After-tax values", "TO_BASIS query/reference"],
    systems: ["EDS", "P3", "AQT", "Basis tables"],
    steps: [
      "Confirm whether the plan type and source setup allow the basis data being loaded.",
      "Prepare basis fields and validate required participant identifiers.",
      "Check Roth, after-tax, and other employee-basis values against the source file.",
      "Validate the file through EDS before loading.",
      "Load basis data and review EDS output for warnings or rejects.",
      "Run queries to confirm basis rows landed in the expected tables.",
      "Review transaction adjustments when mid-year conversion data affects basis.",
      "Document any exclusions or plan-type restrictions."
    ],
    decisions: ["Is basis allowed for this plan type?", "Are Roth or after-tax sources present?", "Do participant identifiers match the loaded census?", "Did EDS report warnings that affect tax history?", "Are transaction adjustments needed?"],
    outputs: ["Loaded basis records", "EDS output notes", "Query verification", "Restriction notes", "Adjustment evidence"],
    watchouts: ["Do not load basis blindly on restricted plan types.", "Basis errors create downstream tax-reporting pain.", "Mid-year conversions may need special adjustment review.", "Participant matching depends on clean census data.", "The source document references TO_BASIS but the exact path is not captured here."],
    closeout: ["Plan restrictions checked", "EDS validation complete", "Basis rows verified", "Adjustments reviewed", "Exceptions documented"]
  },
  {
    slug: "payroll-vendor-onboarding",
    title: "Payroll Vendor Onboarding",
    short: "Get vendor files, FTP, validation, and handoff ready for go-live.",
    family: "Payroll",
    accent: "#2d6b50",
    summary: "Payroll vendor onboarding identifies vendor and client contacts, sets up FTP, walks the vendor through the TA template, validates test files, demos the process, and hands off at go-live whether testing is complete or not.",
    inputs: ["Payroll vendor contact", "Client uploader contact", "TA payroll template", "FTP setup request", "Vendor test file", "Validation results"],
    systems: ["FTP", "EDS", "Payroll template", "OnePayroll", "NBI", "AWD"],
    steps: [
      "Identify the payroll vendor contact and the client uploader who needs FTP credentials.",
      "Send the vendor intro email and fire off the FTP setup request early.",
      "Hold the kickoff meeting and walk through the TA payroll template field by field.",
      "Have the vendor re-tool their output and return a test file.",
      "Test the FTP connection independently from the file content.",
      "Run the validation chain and send issues back to the vendor until the file is clean.",
      "Demo the client-facing process and prepare for go-live.",
      "At go-live, hand off to Fiduciary Services through the formal process if testing is not complete."
    ],
    decisions: ["Who owns vendor file generation?", "Who owns client upload access?", "Is FTP ready before test-file validation?", "Did the test file pass EDS and OnePayroll review?", "Is payroll testing complete by go-live?"],
    outputs: ["Vendor contact chain", "FTP access", "Validated payroll test file", "Client demo", "Go-live handoff package"],
    watchouts: ["FTP setup should start early because access delays are common.", "Testing the connection is separate from validating file content.", "Multiple payroll vendors need separate tracks.", "Auto-sweep is later and requires several good runs.", "DC still hands off at live even if payroll testing is incomplete."],
    closeout: ["Contacts confirmed", "FTP tested", "Template walkthrough complete", "Validation chain complete or handed off", "NBI updated"]
  },
  {
    slug: "payroll-handoff-at-go-live",
    title: "Payroll Handoff at Go-Live",
    short: "Move unfinished payroll testing to Fiduciary Services cleanly.",
    family: "Payroll",
    accent: "#476b8d",
    summary: "If payroll testing is not complete at go-live, the DC submits a FILESPECRQ AWD ticket, coordinates internal handoff notes, updates NBI, and COM notifies the Account Manager and client-facing parties.",
    inputs: ["Payroll testing status", "FILESPECRQ AWD ticket", "Vendor/client contact notes", "Open issue list", "NBI project status", "COM go-live communication"],
    systems: ["AWD", "NBI", "COM", "Fiduciary Services", "Account Manager"],
    steps: [
      "Confirm payroll testing status as go-live approaches.",
      "If testing is incomplete, submit the FILESPECRQ AWD ticket.",
      "Include plan details, vendor details, current status, open issues, and files already tested.",
      "Notify any internal DC helpers that the project is moving to Fiduciary Services.",
      "Update NBI to show the payroll project handoff status.",
      "COM notifies the Account Manager that testing was not completed during transition.",
      "If testing is underway, coordinate an introduction to the AM; if not started, AM initiates contact.",
      "Fiduciary Services continues the payroll work after go-live."
    ],
    decisions: ["Is payroll testing complete by go-live?", "Has enough evidence been included for Fiduciary Services?", "Does the AM need a warm introduction?", "Has the client/vendor been told the work is moving?", "Does NBI reflect the current owner?"],
    outputs: ["FILESPECRQ ticket", "Handoff notes", "NBI update", "AM notification", "Fiduciary Services ownership"],
    watchouts: ["The handoff is the operating model, not a failure.", "Do not leave informal helper notes outside the ticket.", "COM and DC messages need to align.", "Client/vendor confusion creates avoidable follow-up.", "NBI must show that transition ownership changed."],
    closeout: ["AWD ticket submitted", "Internal helpers notified", "NBI updated", "COM notified AM", "Client/vendor path clear"]
  },
  {
    slug: "reversal-submission",
    title: "Reversal Submission",
    short: "Use the new form-first reversal path before opening AWD.",
    family: "Corrections",
    accent: "#9a4d42",
    summary: "The reversal process now starts with the Reversal Form. The automated email from that form becomes the structured reversal-team block that gets pasted into the AWD ticket comments.",
    inputs: ["Reversal Form", "Automated form email", "Transaction reference numbers", "Loan numbers when applicable", "Approval level", "Supporting documents"],
    systems: ["Reversal Form", "Email", "AWD", "P3", "Prod Support"],
    steps: [
      "Complete the Reversal Form with plan, participant, transaction, amount, and reason details.",
      "Submit the form and wait for the automated email response.",
      "Copy the block labeled for the reversal team from the email.",
      "Open the appropriate reversal AWD ticket type.",
      "Paste the copied email block into AWD comments.",
      "Attach supporting documents and approval evidence.",
      "Submit the AWD ticket for the reversal team to work.",
      "Track the ticket through completion and confirm the correction landed."
    ],
    decisions: ["Is this the right transaction type for reversal?", "Does the amount require a higher approval level?", "Were loan-specific fields completed when relevant?", "Are funds already returned, stopped, or voided if needed?", "Is the automated email block in AWD comments?"],
    outputs: ["Submitted Reversal Form", "Automated email evidence", "AWD reversal ticket", "Approval evidence", "Completed correction"],
    watchouts: ["The old Plan Correction Checklist is retired.", "The form alone does not initiate the reversal; AWD is still required.", "Skipping the email block slows the reversal team down.", "Approvals depend on amount.", "Funds that need stopping or returning must be handled before submission."],
    closeout: ["Form submitted", "Email block copied", "AWD ticket opened", "Documents attached", "Completion confirmed"]
  },
  {
    slug: "fund-management-calendar",
    title: "Fund Management Calendar",
    short: "Notify and record large trades before cut-off risk hits.",
    family: "Trading",
    accent: "#7d6d2f",
    summary: "The fund management calendar documents trade intent for large conversion-related trades. It varies by conversion type and has strict timing expectations around SSBT cut-off and trade-notification groups.",
    inputs: ["Conversion type", "Trade date", "Expected trade amount", "Fund details", "Calendar access", "Email distribution list"],
    systems: ["Fund management calendar", "Email", "Cashiering", "Trading groups", "SSBT"],
    steps: [
      "Determine whether the trade type requires calendar notification.",
      "Identify the conversion type and which trade event is occurring.",
      "Enter trade details before the cut-off window whenever the file is accessible.",
      "Send the required notification email to the distribution list.",
      "If the calendar file is locked, send the email anyway and keep trying to update the file.",
      "For cash conversions, track the wire, Advanced Employer, and participant balance events separately.",
      "Exclude small-money trailing dividends when the procedure says calendar entry is not needed.",
      "Confirm the intended trade is documented before downstream processing."
    ],
    decisions: ["Does this event require FMC entry?", "Is this mapping, cash, participant balance, or TIK?", "Is the calendar file accessible?", "Is the trade before SSBT cut-off?", "Is this small trailing money that can be excluded?"],
    outputs: ["Calendar entry", "Notification email", "Locked-file evidence if applicable", "Trade timing record"],
    watchouts: ["The 4 PM EST SSBT cut-off matters.", "Vanguard and other timing exceptions can be stricter.", "TIK shares are generally outside the cash-trade calendar logic.", "Locked files do not remove the email-notification requirement.", "Cash conversions can have three separate trading events."],
    closeout: ["Applicability checked", "Calendar updated or lock documented", "Email sent", "Trade timing confirmed", "Exceptions noted"]
  },
  {
    slug: "tc-conversion-timeline",
    title: "TC Conversion Timeline",
    short: "Track TC readiness from kickoff through closeout.",
    family: "TC / QA",
    accent: "#5c6f8f",
    summary: "The TC timeline covers administrative readiness: initiation calls, subpack maintenance, special services, notices, eligibility/enrollment readiness, PSD/DDOL/VRU activation, mapping support, go-live controls, cleanup, and closeout.",
    inputs: ["Project initiation details", "Submission package", "Special-service needs", "Notice setup", "PSD/DDOL/VRU readiness", "Go-live checklist"],
    systems: ["Subpack", "NBI", "PSD", "DDOL", "VRU", "AWD"],
    steps: [
      "Join project initiation and setup calls.",
      "Review, maintain, and circulate the submission package.",
      "Identify special services and request needed tickets.",
      "Complete first system audit and notice setup.",
      "Prepare contact-center and plan sponsor administration materials.",
      "Coordinate eligibility and enrollment readiness with QC and DC.",
      "Activate and audit PSD, DDOL, and VRU access.",
      "Support fund and source mapping readiness.",
      "Run go-live controls and complete the go-live checklist.",
      "Finish post-go-live cleanup, transition call, final subpack filing, and NBI closeout."
    ],
    decisions: ["Are special services needed?", "Are notices and eligibility materials ready?", "Is website and voice access ready?", "Are mapping attributes complete?", "Is the plan ready for go-live controls and closeout?"],
    outputs: ["Updated subpack", "Special-service tickets", "Notice/audit evidence", "PSD/DDOL/VRU readiness", "Go-live checklist", "Closed transition record"],
    watchouts: ["Legacy TC source material needs QC before treated as current SOP.", "Administrative readiness failures often surface at handoff points.", "Website access must be tested before participant-facing changes.", "Mapping support depends on DC source and fund evidence.", "Closeout needs final filing, not just a meeting."],
    closeout: ["Subpack filed", "Readiness audits complete", "Go-live checklist complete", "Transition call held", "NBI transition date updated"]
  }
];

const deckTypes = [
  {
    key: "ops",
    label: "Ops Training Deck",
    description: "Clean operating procedure slides with timing, owners, checks, and closeout evidence."
  },
  {
    key: "flow",
    label: "Excalidraw Flow Deck",
    description: "Hand-drawn style flow charts for explaining sequence, branches, and system handoffs."
  }
];

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function list(items) {
  return items.map(item => `<li>${esc(item)}</li>`).join("");
}

function mdList(items) {
  return items.map(item => `- ${item}`).join("\n");
}

function iconFor(proc) {
  return `../assets/icons/${proc.slug}.svg`;
}

function iconForIndex(proc) {
  return `assets/icons/${proc.slug}.svg`;
}

function detailImageFor(proc) {
  return `../assets/flowcharts/${proc.slug}.svg`;
}

function wrapText(value, maxChars = 34, maxLines = 3) {
  const words = String(value).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  words.forEach(word => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/\.*$/, "")}...`;
    return kept;
  }
  return lines;
}

function initials(title) {
  return String(title)
    .split(/\s+/)
    .filter(word => !/^(and|at|in|of|the|via)$/i.test(word))
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
}

function writeIcons() {
  procedures.forEach(proc => {
    const text = initials(proc.title);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="${esc(proc.title)} icon">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${proc.accent}"/>
      <stop offset="1" stop-color="#f7efe2"/>
    </linearGradient>
  </defs>
  <rect width="240" height="240" rx="34" fill="#fffdf8"/>
  <path d="M38 56h164M38 120h164M38 184h164" stroke="${proc.accent}" stroke-width="10" stroke-linecap="round" opacity=".2"/>
  <circle cx="60" cy="56" r="20" fill="${proc.accent}"/>
  <circle cx="142" cy="120" r="20" fill="url(#g)"/>
  <circle cx="92" cy="184" r="20" fill="${proc.accent}" opacity=".78"/>
  <text x="120" y="137" text-anchor="middle" font-family="Arial, sans-serif" font-size="58" font-weight="800" fill="#202122">${esc(text)}</text>
</svg>`;
    fs.writeFileSync(path.join(dirs.icons, `${proc.slug}.svg`), svg, "utf8");
  });
}

function writeFlowchart(proc) {
  const width = 1600;
  const stepCount = Math.min(proc.steps.length, 10);
  const colCount = 4;
  const rowCount = Math.ceil(stepCount / colCount);
  const colWidth = 380;
  const boxWidth = 330;
  const boxHeight = 136;
  const rowGap = 190;
  const startX = 58;
  const startY = 136;
  const decisionY = startY + rowCount * rowGap + 70;
  const systemsY = decisionY + 222;
  const height = systemsY + 160;
  const stepBoxes = proc.steps.slice(0, stepCount).map((step, index) => {
    const col = index % colCount;
    const row = Math.floor(index / colCount);
    const x = startX + col * colWidth;
    const y = startY + row * rowGap;
    const lines = wrapText(step, 30, 4).map((line, i) => `<text x="${x + 66}" y="${y + 40 + i * 20}" font-size="17" fill="#202122">${esc(line)}</text>`).join("");
    const next = index < stepCount - 1 ? (() => {
      const nextCol = (index + 1) % colCount;
      const nextRow = Math.floor((index + 1) / colCount);
      if (nextRow === row) {
        return `<path d="M${x + boxWidth} ${y + 56} L${x + colWidth - 18} ${y + 56}" stroke="#202122" stroke-width="3" fill="none" marker-end="url(#arrow)"/>`;
      }
      const nextX = startX + nextCol * colWidth;
      const nextY = startY + nextRow * rowGap;
      const routeY = y + boxHeight + 26;
      return `<path d="M${x + boxWidth / 2} ${y + boxHeight} L${x + boxWidth / 2} ${routeY} L${nextX + boxWidth / 2} ${routeY} L${nextX + boxWidth / 2} ${nextY - 10}" stroke="#202122" stroke-width="3" fill="none" marker-end="url(#arrow)"/>`;
    })() : "";
    return `${next}
      <g>
        <rect x="${x}" y="${y}" width="${boxWidth}" height="${boxHeight}" rx="18" fill="#fff" stroke="#202122" stroke-width="3"/>
        <circle cx="${x + 34}" cy="${y + 38}" r="21" fill="${proc.accent}"/>
        <text x="${x + 34}" y="${y + 45}" text-anchor="middle" font-size="20" font-weight="800" fill="#fff">${index + 1}</text>
        ${lines}
      </g>`;
  }).join("\n");
  const decisions = proc.decisions.slice(0, 4).map((decision, index) => {
    const x = 118 + index * 355;
    const y = decisionY;
    const lines = wrapText(decision, 30, 3).map((line, i) => `<text x="${x + 114}" y="${y + 52 + i * 21}" text-anchor="middle" font-size="17" fill="#202122">${esc(line)}</text>`).join("");
    return `<g>
      <path d="M${x + 114} ${y} L${x + 228} ${y + 72} L${x + 114} ${y + 144} L${x} ${y + 72} Z" fill="#fff8df" stroke="#202122" stroke-width="3"/>
      <text x="${x + 114}" y="${y + 28}" text-anchor="middle" font-size="15" font-weight="800" fill="${proc.accent}">DECISION ${index + 1}</text>
      ${lines}
    </g>`;
  }).join("\n");
  const systems = proc.systems.slice(0, 6).map((system, index) => {
    const x = 86 + index * 238;
    const y = systemsY;
    return `<g>
      <rect x="${x}" y="${y}" width="196" height="58" rx="12" fill="#eef5f4" stroke="${proc.accent}" stroke-width="3"/>
      <text x="${x + 98}" y="${y + 36}" text-anchor="middle" font-size="19" font-weight="800" fill="#202122">${esc(system)}</text>
    </g>`;
  }).join("\n");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(proc.title)} flowchart">
  <defs>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
      <path d="M2 2 L10 6 L2 10 Z" fill="#202122"/>
    </marker>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="5" dy="6" stdDeviation="0" flood-color="#202122" flood-opacity=".12"/>
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="#fbfaf5"/>
  <rect x="34" y="34" width="1532" height="${height - 68}" rx="28" fill="none" stroke="#202122" stroke-width="4"/>
  <text x="74" y="78" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="${proc.accent}">${esc(proc.family.toUpperCase())}</text>
  <text x="74" y="116" font-family="Georgia, serif" font-size="44" fill="#202122">${esc(proc.title)}</text>
  <g filter="url(#shadow)">${stepBoxes}</g>
  <text x="74" y="${decisionY - 26}" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#202122">Branch points</text>
  ${decisions}
  <text x="74" y="${systemsY - 20}" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#202122">Systems touched</text>
  ${systems}
</svg>`;
  fs.writeFileSync(path.join(dirs.flowcharts, `${proc.slug}.svg`), svg, "utf8");
}

function writeMarkdown(proc) {
  const text = `# ${proc.title}\n\n${proc.summary}\n\n## Inputs\n${mdList(proc.inputs)}\n\n## Systems\n${mdList(proc.systems)}\n\n## Procedure Steps\n${proc.steps.map((step, i) => `${i + 1}. ${step}`).join("\n")}\n\n## Decisions\n${mdList(proc.decisions)}\n\n## Outputs\n${mdList(proc.outputs)}\n\n## Watchouts\n${mdList(proc.watchouts)}\n\n## Closeout Checks\n${mdList(proc.closeout)}\n`;
  fs.writeFileSync(path.join(dirs.procedures, `${proc.slug}.md`), text, "utf8");
}

function stepCards(proc) {
  return proc.steps.map((step, index) => `
    <article class="step-card">
      <div class="step-num">${String(index + 1).padStart(2, "0")}</div>
      <p>${esc(step)}</p>
    </article>
  `).join("");
}

function pillRow(items) {
  return items.map(item => `<span class="pill">${esc(item)}</span>`).join("");
}

function renderOpsDeck(proc) {
  return deckShell(proc, "ops", [
    `<section class="slide title-slide">
      <div class="title-grid">
        <div>
          <div class="kicker">${esc(proc.family)} / Ops deck</div>
          <h1>${esc(proc.title)}</h1>
          <p class="slide-lede">${esc(proc.summary)}</p>
          <div class="lifecycle-rail">${proc.steps.slice(0, 6).map((_, i) => `<span>${i + 1}</span>`).join("")}</div>
        </div>
        <figure class="title-art"><img src="${iconFor(proc)}" alt=""></figure>
      </div>
    </section>`,
    `<section class="slide split-slide">
      <div>
        <div class="kicker">Inputs</div>
        <h2>What has to be in hand</h2>
        <ul class="check-list">${list(proc.inputs)}</ul>
      </div>
      <aside class="callout-panel">
        <h3>Systems touched</h3>
        <div class="pill-grid">${pillRow(proc.systems)}</div>
      </aside>
    </section>`,
    `<section class="slide">
      <div class="kicker">Run path</div>
      <h2>Procedure sequence</h2>
      <div class="step-grid">${stepCards(proc)}</div>
    </section>`,
    `<section class="slide matrix-slide">
      <div class="kicker">Decision points</div>
      <h2>What decides the path</h2>
      <div class="decision-grid">${proc.decisions.map(decision => `<div class="decision-card">${esc(decision)}</div>`).join("")}</div>
    </section>`,
    `<section class="slide warning-slide">
      <div class="kicker">Watchouts</div>
      <h2>Where this can bite</h2>
      <div class="warning-grid">${proc.watchouts.map(item => `<article><span>!</span><p>${esc(item)}</p></article>`).join("")}</div>
    </section>`,
    `<section class="slide image-slide">
      <div class="kicker">Visual map</div>
      <h2>Use the flow when explaining the work</h2>
      <figure class="image-frame"><img src="${detailImageFor(proc)}" alt=""></figure>
    </section>`,
    `<section class="slide closeout-slide">
      <div class="kicker">Closeout</div>
      <h2>Proof that it is done</h2>
      <div class="closeout-grid">
        <div><h3>Outputs</h3><ul>${list(proc.outputs)}</ul></div>
        <div><h3>Final checks</h3><ul>${list(proc.closeout)}</ul></div>
      </div>
    </section>`
  ]);
}

function renderFlowDeck(proc) {
  const nodes = proc.steps.map((step, index) => `<div class="flow-node"><b>${index + 1}</b><span>${esc(step)}</span></div>`).join("");
  const systems = proc.systems.map(system => `<div class="system-box">${esc(system)}</div>`).join("");
  return deckShell(proc, "flow", [
    `<section class="slide flow-title">
      <div class="title-grid">
        <div>
          <div class="sketch-tag">${esc(proc.family)} / Excalidraw flow</div>
          <h1>${esc(proc.title)}</h1>
          <p>${esc(proc.short)}</p>
        </div>
        <figure class="title-art sketch-art"><img src="${iconFor(proc)}" alt=""></figure>
      </div>
      <div class="sketch-route">${nodes}</div>
    </section>`,
    `<section class="slide image-slide sketch-image-slide">
      <div class="sketch-tag">Generated whiteboard</div>
      <h2>Multi-branch visual route</h2>
      <figure class="image-frame sketch-frame"><img src="${detailImageFor(proc)}" alt=""></figure>
    </section>`,
    `<section class="slide branch-slide">
      <div class="sketch-tag">Branch map</div>
      <h2>Decisions that change the route</h2>
      <div class="branch-board">${proc.decisions.map((decision, i) => `<div class="diamond"><span>${i + 1}</span><p>${esc(decision)}</p></div>`).join("")}</div>
    </section>`,
    `<section class="slide swimlane-slide">
      <div class="sketch-tag">Swimlane</div>
      <h2>Inputs -> action -> output</h2>
      <div class="swimlane">
        <div class="lane-head">Input</div><div class="lane-head">Action</div><div class="lane-head">Output</div>
        <div>${proc.inputs.slice(0, 4).map(item => `<p>${esc(item)}</p>`).join("")}</div>
        <div>${proc.steps.slice(0, 4).map(item => `<p>${esc(item)}</p>`).join("")}</div>
        <div>${proc.outputs.slice(0, 4).map(item => `<p>${esc(item)}</p>`).join("")}</div>
      </div>
    </section>`,
    `<section class="slide systems-slide">
      <div class="sketch-tag">System boxes</div>
      <h2>Where the work happens</h2>
      <div class="systems-map">${systems}</div>
    </section>`,
    `<section class="slide sticky-slide">
      <div class="sketch-tag">Sticky notes</div>
      <h2>Do not miss these</h2>
      <div class="sticky-grid">${proc.watchouts.map(item => `<article class="sticky-note">${esc(item)}</article>`).join("")}</div>
    </section>`,
    `<section class="slide finish-slide">
      <div class="sketch-tag">Done means done</div>
      <h2>Closeout checklist</h2>
      <div class="finish-list">${proc.closeout.map(item => `<label><input type="checkbox"> ${esc(item)}</label>`).join("")}</div>
    </section>`
  ]);
}

function deckShell(proc, type, slides) {
  const title = `${proc.title} - ${type === "ops" ? "Ops Training Deck" : "Excalidraw Flow Deck"}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <link rel="stylesheet" href="../assets/deck-styles.css">
  <style>:root { --procedure-accent: ${proc.accent}; }</style>
</head>
<body class="${type}-page">
  <header class="deck-nav">
    <a href="../index.html">Procedure decks</a>
    <span>${esc(proc.title)}</span>
    <span>${type === "ops" ? "Ops" : "Excalidraw"}</span>
  </header>
  <main class="deck ${type}" data-deck>
    ${slides.join("\n")}
  </main>
  <div class="deck-controls">
    <button type="button" data-prev>Prev</button>
    <span data-progress>1 / ${slides.length}</span>
    <button type="button" data-next>Next</button>
  </div>
  <script src="../assets/deck-player.js"></script>
</body>
</html>`;
}

function writeCss() {
  const css = `
:root {
  --bg: #f8f9fa;
  --paper: #fffdf8;
  --surface: #ffffff;
  --ink: #202122;
  --muted: #54595d;
  --faint: #72777d;
  --line: #d8dde3;
  --teal: #2a6f73;
  --clay: #b86b4b;
  --shadow: 0 24px 80px rgba(32, 33, 34, 0.14);
  --serif: Georgia, "Times New Roman", serif;
  --sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--sans); }
a { color: inherit; }
.deck-index { width: min(1180px, calc(100% - 48px)); margin: 0 auto; padding: 34px 0 80px; }
.deck-index h1 { margin: 0 0 8px; font-family: var(--serif); font-size: clamp(36px, 5vw, 68px); font-weight: 400; line-height: 1; }
.deck-index .lede { max-width: 820px; color: #2a2e33; font-size: 18px; line-height: 1.65; }
.reference-grid, .index-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 24px; }
.reference-card, .procedure-card { border: 1px solid var(--line); background: var(--surface); padding: 18px; box-shadow: 0 10px 28px rgba(32, 33, 34, 0.06); }
.reference-card img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border: 1px solid var(--line); }
.procedure-card h2 { margin: 0 0 6px; font-family: var(--serif); font-size: 24px; font-weight: 400; }
.procedure-card p { color: var(--muted); line-height: 1.5; }
.procedure-card-head { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 16px; align-items: center; }
.procedure-card-icon { width: 96px; height: 96px; border-radius: 22px; object-fit: cover; border: 1px solid rgba(216, 221, 227, 0.9); box-shadow: 0 10px 24px rgba(32, 33, 34, 0.14); }
.link-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.link-row a { border: 1px solid var(--line); background: #fff; padding: 8px 10px; text-decoration: none; font-size: 13px; }
.link-row a:hover { border-color: var(--teal); color: var(--teal); }
.deck-nav { position: fixed; z-index: 10; top: 0; left: 0; right: 0; height: 44px; display: flex; align-items: center; gap: 14px; padding: 0 18px; border-bottom: 1px solid rgba(216, 221, 227, 0.85); background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(14px); color: var(--muted); font-size: 13px; }
.deck-nav span:last-child { margin-left: auto; color: var(--procedure-accent); font-weight: 700; }
.deck { height: 100vh; overflow-y: auto; scroll-snap-type: y mandatory; }
.slide { position: relative; min-height: 100vh; padding: 82px 72px 84px; scroll-snap-align: start; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
.slide::before { content: ""; position: absolute; inset: 60px 48px 56px; border: 1px solid rgba(216, 221, 227, 0.8); pointer-events: none; }
.kicker, .sketch-tag { color: var(--procedure-accent); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; }
h1, h2 { margin: 0; font-family: var(--serif); font-weight: 400; line-height: 1.05; letter-spacing: 0; }
h1 { max-width: 980px; font-size: clamp(52px, 8vw, 104px); }
h2 { max-width: 920px; font-size: clamp(38px, 5.6vw, 72px); }
h3 { margin: 0 0 10px; font-size: 15px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
.slide-lede, .flow-title p { max-width: 840px; margin: 26px 0 0; color: #2b3035; font-size: 22px; line-height: 1.45; }
.title-grid { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 52px; align-items: center; width: 100%; }
.title-art { margin: 0; justify-self: end; width: 300px; height: 300px; border-radius: 58px; overflow: hidden; border: 1px solid rgba(216, 221, 227, 0.9); box-shadow: var(--shadow); background: #fff; }
.title-art img { display: block; width: 100%; height: 100%; object-fit: cover; }
.image-slide { justify-content: center; padding: 62px 34px 58px; }
.image-slide::before { inset: 48px 20px 44px; }
.image-slide h2 { max-width: none; font-size: clamp(30px, 3.2vw, 46px); line-height: 1.08; }
.image-frame { width: min(1500px, calc(100vw - 68px)); margin: 16px 0 0; border: 1px solid var(--line); background: #fff; padding: 8px; box-shadow: 0 24px 90px rgba(32, 33, 34, 0.18); }
.image-frame img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: contain; cursor: zoom-in; image-rendering: auto; background: #fff; }
.lifecycle-rail { display: flex; gap: 16px; align-items: center; margin-top: 42px; }
.lifecycle-rail span { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 999px; background: var(--procedure-accent); color: #fff; font-weight: 800; box-shadow: 0 10px 24px rgba(32, 33, 34, 0.14); }
.split-slide { display: grid; grid-template-columns: minmax(0, 1fr) 390px; gap: 42px; align-items: center; }
.check-list, .closeout-grid ul { margin: 26px 0 0; padding: 0; list-style: none; display: grid; gap: 12px; }
.check-list li, .closeout-grid li { padding: 12px 14px; border-left: 4px solid var(--procedure-accent); background: #fff; box-shadow: 0 6px 20px rgba(32, 33, 34, 0.06); }
.callout-panel { border: 1px solid var(--line); background: #fff; padding: 22px; box-shadow: var(--shadow); }
.pill-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.pill { display: inline-flex; padding: 8px 10px; border-radius: 999px; background: color-mix(in srgb, var(--procedure-accent) 12%, white); color: #243033; font-weight: 700; font-size: 13px; }
.step-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 28px; }
.step-card { display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 14px; align-items: start; border: 1px solid var(--line); background: #fff; padding: 16px; min-height: 108px; }
.step-num { color: var(--procedure-accent); font-weight: 900; font-size: 20px; font-variant-numeric: tabular-nums; }
.step-card p { margin: 0; color: #2d3338; line-height: 1.45; }
.decision-grid, .warning-grid, .closeout-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-top: 30px; }
.decision-card { min-height: 118px; display: flex; align-items: center; border: 1px solid var(--line); background: #fff; padding: 20px; font-size: 19px; line-height: 1.35; box-shadow: 0 8px 24px rgba(32, 33, 34, 0.06); }
.warning-grid article { display: grid; grid-template-columns: 46px minmax(0, 1fr); gap: 14px; align-items: start; background: #fff8ed; border: 1px solid #ead7bd; padding: 18px; }
.warning-grid span { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 999px; background: var(--clay); color: #fff; font-weight: 900; }
.warning-grid p { margin: 0; line-height: 1.45; }
.closeout-grid > div { border: 1px solid var(--line); background: #fff; padding: 24px; }
.flow-page { background: #fbfaf5; }
.flow .slide { background: #fbfaf5; }
.flow .slide::before { border: 2px solid #222; border-radius: 18px 12px 22px 14px; opacity: 0.75; }
.flow h1, .flow h2 { font-family: "Trebuchet MS", var(--sans); font-weight: 800; letter-spacing: 0; }
.sketch-art { border: 2px solid #222; box-shadow: 7px 8px 0 rgba(32, 33, 34, 0.14); transform: rotate(1deg); }
.sketch-tag { display: inline-flex; width: fit-content; padding: 7px 10px; border: 2px solid #222; border-radius: 12px 9px 14px 8px; background: #fff; color: var(--procedure-accent); transform: rotate(-1deg); }
.sketch-frame { border: 2px solid #222; border-radius: 18px 12px 22px 14px; box-shadow: 10px 11px 0 rgba(32, 33, 34, 0.12); }
.sketch-route { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 34px; }
.flow-node, .system-box, .diamond, .sticky-note, .finish-list label, .swimlane > div { border: 2px solid #222; background: #fff; box-shadow: 4px 5px 0 rgba(32, 33, 34, 0.12); }
.flow-node { min-height: 104px; padding: 14px; border-radius: 16px 10px 18px 12px; position: relative; }
.flow-node b { display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 999px; background: var(--procedure-accent); color: #fff; margin-right: 8px; }
.flow-node span { display: block; margin-top: 8px; color: #2f3133; line-height: 1.35; }
.branch-board { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; margin-top: 34px; }
.diamond { min-height: 132px; padding: 18px 22px; border-radius: 22px 14px 24px 16px; transform: rotate(-0.6deg); }
.diamond:nth-child(even) { transform: rotate(0.8deg); }
.diamond span { color: var(--procedure-accent); font-weight: 900; }
.diamond p { margin: 8px 0 0; font-size: 19px; line-height: 1.35; }
.swimlane { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 30px; }
.swimlane > div { padding: 16px; border-radius: 14px 10px 16px 12px; }
.lane-head { background: color-mix(in srgb, var(--procedure-accent) 15%, white) !important; font-weight: 900; text-align: center; }
.swimlane p { margin: 0 0 12px; line-height: 1.35; }
.systems-map { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 34px; }
.system-box { min-width: 180px; min-height: 92px; display: grid; place-items: center; padding: 18px; border-radius: 16px 10px 18px 12px; font-weight: 900; color: var(--procedure-accent); }
.sticky-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 34px; }
.sticky-note { min-height: 122px; padding: 18px; border-radius: 4px; background: #fff6cf; transform: rotate(-1deg); line-height: 1.4; }
.sticky-note:nth-child(even) { background: #e8f4f1; transform: rotate(1deg); }
.finish-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-top: 34px; }
.finish-list label { padding: 18px; border-radius: 14px 10px 18px 12px; font-size: 20px; line-height: 1.35; }
.finish-list input { width: 22px; height: 22px; accent-color: var(--procedure-accent); vertical-align: middle; }
.deck-controls { position: fixed; z-index: 20; left: 50%; bottom: 18px; transform: translateX(-50%); display: flex; align-items: center; gap: 10px; padding: 8px; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.92); box-shadow: 0 10px 28px rgba(32, 33, 34, 0.14); }
.deck-controls button { border: 1px solid var(--line); background: #fff; padding: 7px 11px; cursor: pointer; }
.deck-controls span { min-width: 58px; text-align: center; color: var(--muted); font-size: 12px; }
.image-lightbox { position: fixed; z-index: 100; inset: 0; display: none; align-items: center; justify-content: center; padding: 22px; background: rgba(18, 20, 22, 0.88); cursor: zoom-out; }
.image-lightbox.open { display: flex; }
.image-lightbox img { display: block; max-width: min(96vw, 1800px); max-height: 92vh; width: auto; height: auto; background: #fff; box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45); }
.image-lightbox button { position: absolute; top: 18px; right: 18px; width: 38px; height: 38px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.35); background: rgba(255,255,255,0.08); color: #fff; font-size: 24px; line-height: 1; cursor: pointer; }
@media (max-width: 900px) {
  .slide { padding: 72px 24px 84px; }
  .slide::before { inset: 54px 12px 56px; }
  .split-slide, .step-grid, .decision-grid, .warning-grid, .closeout-grid, .sketch-route, .branch-board, .sticky-grid, .finish-list, .reference-grid, .index-grid, .title-grid { grid-template-columns: 1fr; }
  .title-art { justify-self: start; width: 170px; height: 170px; border-radius: 34px; }
  .image-slide { padding: 62px 12px 76px; }
  .image-frame { width: calc(100vw - 24px); padding: 5px; }
  h1 { font-size: 48px; }
  h2 { font-size: 38px; }
}
`;
  fs.writeFileSync(path.join(dirs.assets, "deck-styles.css"), css.trim() + "\n", "utf8");
}

function writeJs() {
  const js = `
(() => {
  const deck = document.querySelector("[data-deck]");
  if (!deck) return;
  const slides = Array.from(deck.querySelectorAll(".slide"));
  const progress = document.querySelector("[data-progress]");
  const setProgress = () => {
    const idx = Math.max(0, Math.round(deck.scrollTop / window.innerHeight));
    if (progress) progress.textContent = (idx + 1) + " / " + slides.length;
  };
  const go = delta => {
    const idx = Math.max(0, Math.min(slides.length - 1, Math.round(deck.scrollTop / window.innerHeight) + delta));
    slides[idx].scrollIntoView({ behavior: "smooth", block: "start" });
  };
  document.querySelector("[data-prev]")?.addEventListener("click", () => go(-1));
  document.querySelector("[data-next]")?.addEventListener("click", () => go(1));
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.innerHTML = '<button type="button" aria-label="Close image preview">&times;</button><img alt="">';
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector("img");
  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightboxImg.removeAttribute("src");
  };
  deck.querySelectorAll(".image-frame img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.currentSrc || img.src;
      lightbox.classList.add("open");
    });
  });
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox || event.target.tagName === "BUTTON") closeLightbox();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    if (event.key === "ArrowRight" || event.key === "PageDown") go(1);
    if (event.key === "ArrowLeft" || event.key === "PageUp") go(-1);
  });
  deck.addEventListener("scroll", () => requestAnimationFrame(setProgress), { passive: true });
  setProgress();
})();
`;
  fs.writeFileSync(path.join(dirs.assets, "deck-player.js"), js.trim() + "\n", "utf8");
}

function writeIndex() {
  const cards = procedures.map(proc => `
    <article class="procedure-card" style="--procedure-accent: ${proc.accent}">
      <div class="procedure-card-head">
        <img class="procedure-card-icon" src="${iconForIndex(proc)}" alt="">
        <h2>${esc(proc.title)}</h2>
      </div>
      <p>${esc(proc.short)}</p>
      <div class="link-row">
        <a href="procedures/${proc.slug}.md">Markdown source</a>
        <a href="decks/ops-${proc.slug}.html">Ops deck</a>
        <a href="decks/flow-${proc.slug}.html">Excalidraw deck</a>
      </div>
    </article>
  `).join("");
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TA Brain Procedure Decks</title>
  <link rel="stylesheet" href="assets/deck-styles.css">
</head>
<body>
  <main class="deck-index">
    <h1>TA Brain Procedure Decks</h1>
    <p class="lede">Two deck styles for each main procedure: a clean ops training deck and an Excalidraw-style flow deck. Markdown files are included as the source of truth for later visuals and animations.</p>
    <section class="reference-grid">
      <article class="reference-card">
        <img src="assets/ops-deck-reference.png" alt="">
        <h2>Ops Training Style</h2>
        <p>Structured slides for timing, inputs, decisions, warnings, and closeout evidence.</p>
      </article>
      <article class="reference-card">
        <img src="assets/excalidraw-deck-reference.png" alt="">
        <h2>Excalidraw Flow Style</h2>
        <p>Flowchart slides for sequence, system handoffs, decision branches, and gotchas.</p>
      </article>
    </section>
    <section class="index-grid">${cards}</section>
  </main>
</body>
</html>`;
  fs.writeFileSync(path.join(root, "index.html"), html, "utf8");
}

writeCss();
writeJs();
writeIcons();
procedures.forEach(writeFlowchart);
procedures.forEach(proc => {
  writeMarkdown(proc);
  fs.writeFileSync(path.join(dirs.decks, `ops-${proc.slug}.html`), renderOpsDeck(proc), "utf8");
  fs.writeFileSync(path.join(dirs.decks, `flow-${proc.slug}.html`), renderFlowDeck(proc), "utf8");
});
writeIndex();

console.log(`Generated ${procedures.length} markdown procedure files and ${procedures.length * deckTypes.length} HTML decks.`);
