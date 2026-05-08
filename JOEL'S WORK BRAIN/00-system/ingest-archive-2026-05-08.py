from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-05-08"


def slugify(value: str) -> str:
    value = value.lower().replace("'", "")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-+", "-", value).strip("-")


def status_tag(status: str) -> str:
    return f'<span class="status-tag status-{status.lower()}">{status}</span>'


def metadata_card(kind: str, status: str, updated: str, sources: int, linked_from: str, effective: str = "Unknown") -> str:
    return "\n".join(
        [
            '<aside class="metadata-card">',
            f'<div class="metadata-row"><span class="metadata-key">Type</span><span class="metadata-value">{kind}</span></div>',
            f'<div class="metadata-row"><span class="metadata-key">Status</span><span class="metadata-value">{status_tag(status)}</span></div>',
            f'<div class="metadata-row"><span class="metadata-key">Updated</span><span class="metadata-value">{updated}</span></div>',
            f'<div class="metadata-row"><span class="metadata-key">Sources</span><span class="metadata-value">{sources}</span></div>',
            f'<div class="metadata-row"><span class="metadata-key">Linked from</span><span class="metadata-value">{linked_from}</span></div>',
            '<div class="metadata-row"><span class="metadata-key">Wire Date</span><span class="metadata-value">Unknown</span></div>',
            f'<div class="metadata-row"><span class="metadata-key">Effective date</span><span class="metadata-value">{effective}</span></div>',
            '<div class="metadata-row"><span class="metadata-key">Prior record keeper</span><span class="metadata-value">Unknown</span></div>',
            '<div class="metadata-row"><span class="metadata-key">Payroll</span><span class="metadata-value">Unknown</span></div>',
            '<div class="metadata-row"><span class="metadata-key">Client contact</span><span class="metadata-value">Unknown</span></div>',
            "</aside>",
        ]
    )


def plan_page(
    title: str,
    case_id: str,
    status: str,
    summary: str,
    updates: str,
    lessons: str,
    effective: str = "Unknown",
    open_items: list[str] | None = None,
) -> str:
    open_items = open_items or []
    item_lines = "\n".join(f"- [ ] {item}" for item in open_items)
    return f"""---
type: plan
title: "{title}"
case_id: {case_id}
status: {status}
updated: {TODAY}
sources: 1
---

# {title} `{case_id}`

{metadata_card("Plan", status, TODAY, 1, "2026-05-08 archival plan ingest", effective)}

## Description

{summary}

## Current Updates

{updates}

## Daily Updates

| Date | Note |
|---|---|
| 2026-05-08 | Added from Joel's archival plan/lesson dump. |

## Open Items
{item_lines}

## Lessons Learned / One-offs

{lessons}
"""


def lesson_page(title: str, case_id: str, related: str, issue: str, resolution: str, takeaway: str) -> str:
    return f"""---
type: non-plan
title: "{title}"
case_id: {case_id}
status: Complete
updated: {TODAY}
sources: 1
---

# {title} `{case_id}`

{metadata_card("Lesson / one-off", "Complete", TODAY, 1, "2026-05-08 archival plan ingest")}

## Description

{issue}

## Current Updates

### Plan In Question

{related}

### Issue

{issue}

### Resolution

{resolution}

### Why It Matters

{takeaway}

## Daily Updates

| Date | Note |
|---|---|
| 2026-05-08 | Added from Joel's archival lesson dump. |

## Open Items

## Lessons Learned / One-offs

### Related

- [[{related}]]
"""


PLAN_FILES: dict[str, str] = {
    "black-buffalo": plan_page(
        "Black Buffalo",
        "QK63283-00028",
        "Complete",
        "Joel's first real plan. It was a straightforward startup with census/default-election work and little complexity.",
        "Startup-style work: census, default elections, and basic setup. No major eligibility or asset movement lesson was retained.",
        "The value was confidence-building: a clean first plan helped Joel get his feet wet without a large operational burden.",
    ),
    "educators-credit-union": plan_page(
        "Educators Credit Union",
        "TE098327-00001",
        "Complete",
        "Early plan where a wire arrived and Joel was not ready because the asset movement was not fully understood in advance.",
        "The wire triggered Joel's first real Informatica use. Stacy walked him through the process and the money was handled, but the root miss was preparation.",
        "Know what money is expected before it arrives. Meeting notes and conversion coding matter because surprise wires create avoidable fire drills.",
    ),
    "capstone": plan_page(
        "Capstone",
        "QK63314-00001",
        "Complete",
        "Joel's first internal merger exposure, with Suzanne Vecchionne carrying the merger side while Joel helped heavily on payroll.",
        "ADP payroll files came late at night and Joel, being on the West Coast, stayed involved to keep the setup moving.",
        "Internal mergers often have a specialist owner. The DC value is clear payroll communication and explaining TA file/system needs to external payroll contacts.",
    ),
    "center-for-discovery": plan_page(
        "Center for Discovery",
        "TO098328-00001",
        "Complete",
        "Startup-style plan with limited retained detail.",
        "Joel remembered it as mostly in-and-out setup work. No durable issue was recalled during the dump.",
        "Low-complexity startups still belong in the archive so the plan history is complete, even when no special lesson survives.",
    ),
    "medical-college-of-wisconsin": plan_page(
        "Medical College of Wisconsin",
        "TA069968-0001",
        "Complete",
        "Limited-access census miss where an early test census was mistaken for the final load population.",
        "A later block of hires was not loaded before limited access. Participants expected accounts and did not have them until the correct census was obtained and loaded.",
        "Early census files are not automatically final. Ask whether the population will change before limited access and get the load-ready census in early enough for checks.",
    ),
    "church-farm-school": plan_page(
        "Church Farm School",
        "TA069932-00043",
        "Complete",
        "Startup-like plan where the majority of the work sat in payroll integration.",
        "Payroll setup dragged because external contacts were slow and Joel did not push deadlines hard enough early.",
        "Payroll vendors need active deadline management. Friendly requests become firm operating needs when the project is at risk.",
    ),
    "health-advocates": plan_page(
        "Health Advocates",
        "QK63283-00042",
        "Complete",
        "Joel's first large full-package conversion with YTD, deferrals, eligibility, loans, EDS practice, Informatica loads, and heavy payroll involvement.",
        "The plan had many payroll divisions and a vendor blackout/access cutoff issue that delayed loan report availability.",
        "Get blackout-sensitive reports early. If vendor access will be cut off, loan/election reports need to be captured before the window closes.",
    ),
    "avl-usa": plan_page(
        "AVL USA",
        "QK63233-00017",
        "Complete",
        "WTW plan that became an extended ADP payroll setup lesson.",
        "ADP ownership was segmented: one contact handled specs/system setup, another initiated files, and the client needed handholding to process payroll correctly.",
        "With ADP, identify who owns each leg of the process. Specs, system setup, file initiation, and file receipt can live with different people.",
    ),
    "cardinal-heating": plan_page(
        "Cardinal Heating",
        "QK63256-00001",
        "Complete",
        "First mapping plan where Joel was unprepared when the wire hit and placed money in Advanced Employer that should have been mapped day one.",
        "Final files had the information needed, but Joel looked at the wrong totals and delayed mapping. A fund expected to transfer in kind did not, requiring fixes/reversal work.",
        "Mapping plans need day-one readiness. Advanced Employer is not a default holding place when mapping instructions exist.",
    ),
    "sibley-memorial-hospital": plan_page(
        "Sibley Memorial Hospital",
        "TA080661-00001 / TA069969-00001",
        "Complete",
        "Complex Johns Hopkins/Sibley conversion group incorrectly treated like startups early on.",
        "The plans had a hybrid of mapped money, Advanced Employer hold money, and expected transfer-in-kind assets. Everything was initially parked incorrectly, causing delays and P&L exposure.",
        "If a plan has mixed processing types, slow down and ask for help before money arrives. Base files, mapping, TIK setup, and investment expectations must be known before wire day.",
    ),
    "stamets": plan_page(
        "Stamets",
        "QK63283-00048",
        "Complete",
        "Plan where late base-file timing and years-of-service data affected vesting review.",
        "Vendor data and regular data had to be compared so online vesting reflected correctly.",
        "Years of service can drive vesting presentation. Get base files early enough to solve vesting questions before they become go-live pressure.",
    ),
    "association-of-waldorf-schools-of-north-america": plan_page(
        "Association of Waldorf Schools of North America",
        "TA069932-00048",
        "Complete",
        "Straightforward startup with no major retained issues.",
        "Joel remembered it as a clean middle-of-the-road startup.",
        "Archive as a clean benchmark: not every completed plan needs a special exception lesson.",
    ),
    "pella-carolina": plan_page(
        "Pella Carolina",
        "QK628300052",
        "Complete",
        "First Pella pass. Joel built a strong client relationship, prepared well, and learned ADP/payroll and MVA handling lessons.",
        "Deferral reports and ADP payroll took longer than desired. MVA funding and a later wire component needed tighter tracking.",
        "Know every dollar in the wire, including MVA and later-arriving amounts. If a report can unlock the conversion early, chase it before blackout.",
    ),
    "crisp-regional": plan_page(
        "Crisp Regional",
        "TA069977-00001 / TG098341-00001",
        "Complete",
        "Large multi-plan conversion where payroll started too late and MVA funding/wire breakdowns arrived under deadline pressure.",
        "Once the data arrived, mapping, records, loans, and elections moved quickly. Payroll and UKG setup dragged for months because the early start was missed.",
        "Start payroll meetings and MVA funding decisions early. Multi-plan wires need a breakdown before processing; late breakdowns create deadline-risk even when the DC work is ready.",
    ),
    "loyola-university-of-chicago": plan_page(
        "Loyola University of Chicago",
        "TA069555-0001",
        "Complete",
        "Simple external merger: one participant added and one-to-one mapping for a single incoming fund.",
        "Money was mapped directly to participant balances and completed quickly.",
        "A clean conversion still confirms the value of knowing the exact population and mapping path before money comes in.",
    ),
    "archbold": plan_page(
        "Archbold",
        "TA097893-00001",
        "Complete",
        "Rescue plan where money had arrived and sat without clear action before Joel picked it up.",
        "Joel moved the money into Advanced Employer while records/processing direction were clarified, then helped get it invested with appropriate dating/P&L review.",
        "When inheriting a stalled money issue, stabilize the asset, identify the right dating, and move quickly once records are available.",
    ),
    "denali-water-solutions-wallace-farm": plan_page(
        "Denali Water Solutions / Wallace Farm",
        "QK63220-00001",
        "Complete",
        "Small external merger involving balances and loans, with elections already present.",
        "Loan reports had payments tied to a fund that did not line up cleanly with the loan. The data had to be massaged/aggregated to work.",
        "Small loan populations still need disciplined review. Do not let a single messy loan sit when it is the only thing holding up completion.",
    ),
    "health-concepts": plan_page(
        "Health Concepts",
        "QK62222-00001",
        "Complete",
        "Large Nationwide plan with 80+ funds, secondary fund codes, and difficult vendor/client records.",
        "Joel helped find missing funds in TOA and handled dual mapping logic while broader audit/record-quality issues stayed outside his lane.",
        "Complex fund mapping needs careful code alignment. Secondary fund codes may require two layers of mapping before totals make sense.",
    ),
    "thunder-valley-casino": plan_page(
        "Thunder Valley Casino",
        "NQ98504-00001",
        "Complete",
        "NQDC startup with census, eligibility, deferrals/auto-enrollment, balances, dividends, and excess asset handling.",
        "A large extra amount came in that was not participant money, so it was placed in forfeiture. Joel also learned dividend proration.",
        "In NQDC/asset-liability situations, balances may not be one-to-one. Identify participant money versus excess/forfeiture money before allocating.",
    ),
    "ivexius": plan_page(
        "Ivexius",
        "QK63283-00078",
        "Complete",
        "ExcelWise plan that went well on the conversion side, with payroll staying active longer than ideal.",
        "Joel stayed heavily involved and kept the plan moving, even though payroll should probably have been offloaded sooner.",
        "Above-and-beyond ownership helps, but long payroll tails should be intentionally transferred when the DC conversion work is done.",
    ),
    "mainline-aviation": plan_page(
        "Mainline Aviation",
        "QK63283-00083",
        "Complete",
        "ExcelWise merger paired with Goldberg's where Joel handled census/default elections and payroll while Suzanne handled merger work.",
        "Payroll was manual-heavy but ultimately got to the other side.",
        "For merger pairs, keep plan boundaries clear and know which work belongs to the merger specialist versus payroll/DC support.",
    ),
    "goldbergs-concession-group": plan_page(
        "Goldberg's Concession Group",
        "QK63283-00087",
        "Complete",
        "ExcelWise merger paired with Mainline Aviation where Joel handled census/default elections and payroll support.",
        "Most merger-side activity was handled by Suzanne; Joel stayed useful on payroll setup and handoff.",
        "Paired plans need the same boundary discipline as multi-plan conversions: separate files, separate IDs, shared awareness.",
    ),
    "vera-institute-of-justice": plan_page(
        "Vera Institute of Justice",
        "TA069975-00001 / TA080669-00001",
        "Complete",
        "Two-plan implementation with mapping and a day-two managed advice process.",
        "Participants defaulted at the vendor were identified and given to the TC so managed advice/rebalancing could be initiated after initial default investment.",
        "For day-two managed advice, preserve the vendor-defaulted participant list and hand it to the TC cleanly. Multi-plan IDs must stay distinct.",
    ),
}


LESSON_FILES: dict[str, str] = {
    "wire-readiness-before-money-arrives": lesson_page(
        "Wire Readiness Before Money Arrives",
        "lesson/16",
        "educators-credit-union",
        "A wire arrived before Joel understood exactly what money was expected or what process would be needed.",
        "Use meetings and plan coding to identify expected wires before receipt; if money is coming, know whether it is mapping, Advanced Employer, transfer-in-kind, or another path.",
        "The wire should never be the first time the DC realizes money is involved.",
    ),
    "limited-access-census-freshness": lesson_page(
        "Limited Access Census Freshness",
        "lesson/17",
        "medical-college-of-wisconsin",
        "An early census was treated like the final limited-access population, but a later block of hires was missing.",
        "Ask whether the population will change, whether there are upcoming hire blocks, and which file is load-ready for limited access.",
        "Limited access needs a final-enough census early enough for TC checks and participant access.",
    ),
    "payroll-vendor-deadline-enforcement": lesson_page(
        "Payroll Vendor Deadline Enforcement",
        "lesson/18",
        "church-farm-school",
        "Payroll setup dragged because external contacts were slow and follow-up was not firm enough early.",
        "Maintain deadline integrity, state what is needed, and escalate from friendly asks to direct operating requirements when the project is at risk.",
        "Payroll vendors do not automatically protect your deadlines; the DC has to keep the project moving.",
    ),
    "adp-segmented-ownership-model": lesson_page(
        "ADP Segmented Ownership Model",
        "lesson/19",
        "avl-usa",
        "ADP work stalled because different ADP groups owned specs, system setup, file initiation, and file transmission.",
        "Identify the owner for each ADP step and make sure the client and ADP understand the TA process and file expectations.",
        "With ADP, one contact rarely owns the whole path. Map the ownership before waiting weeks on the wrong person.",
    ),
    "blackout-report-cutoff-discipline": lesson_page(
        "Blackout Report Cutoff Discipline",
        "lesson/20",
        "health-advocates",
        "Vendor blackout/access cutoff prevented early loan report capture, delaying payroll restart work.",
        "Capture loan/election/deferral reports before blackout if access will be limited or cut off.",
        "If a report is available on demand before blackout, get it while the door is still open.",
    ),
    "mapping-day-one-readiness": lesson_page(
        "Mapping Day-One Readiness",
        "lesson/21",
        "cardinal-heating",
        "Money that should have been mapped day one was placed in Advanced Employer because the mapping path was not ready.",
        "Read final files correctly, know the expected mapped funds, and be prepared to apply money the same day when mapping instructions exist.",
        "Mapping plans are not wait-and-see plans once wire/final-file data is available.",
    ),
    "advanced-employer-not-parking-lot": lesson_page(
        "Advanced Employer Is Not A Parking Lot",
        "lesson/22",
        "sibley-memorial-hospital",
        "Money was parked in Advanced Employer even though only part of it belonged there.",
        "Break down the money by processing type before receipt: mapped, hold/Advanced Employer, transfer-in-kind, residual, or special handling.",
        "Advanced Employer is a tool, not a default answer for uncertainty.",
    ),
    "transfer-in-kind-setup-timing": lesson_page(
        "Transfer-In-Kind Setup Timing",
        "lesson/23",
        "sibley-memorial-hospital",
        "Transfer-in-kind setup/re-registration work was handled too late, adding risk when assets did not arrive as expected.",
        "Get transfer-in-kind setup to Matt O'Connell early and verify registration/account setup before liquidation or share movement dates.",
        "TIK timing is front-end work. Waiting until wire/liquidation day is already late.",
    ),
    "ask-for-help-before-the-hole": lesson_page(
        "Ask For Help Before The Hole Gets Deep",
        "lesson/24",
        "sibley-memorial-hospital",
        "Joel waited too long to ask questions on a complicated hybrid conversion and got stuck in a large recovery effort.",
        "Ask Earl/Rob/manager/SMEs early when a plan has unfamiliar money movement, mapping, TIK, or P&L exposure.",
        "The earlier the question, the smaller the hole.",
    ),
    "years-of-service-vesting-validation": lesson_page(
        "Years Of Service Vesting Validation",
        "lesson/25",
        "stamets",
        "Late base-file timing made years-of-service and vesting validation harder than it needed to be.",
        "Compare vendor years-of-service data against TA/load data and resolve vesting presentation before go-live pressure.",
        "Years of service is not just a census field; it can change what participants see online.",
    ),
    "mva-funding-and-wire-handling": lesson_page(
        "MVA Funding And Wire Handling",
        "lesson/26",
        "pella-carolina",
        "MVA funding and later-arriving money were not nailed down early enough.",
        "Identify whether MVA is participant-funded, covered by a separate wire, or handled another way; track every wire component when it arrives.",
        "Every dollar needs an owner and a destination before conversion day.",
    ),
    "multi-plan-id-separation": lesson_page(
        "Multi-Plan ID Separation",
        "lesson/27",
        "vera-institute-of-justice",
        "Multi-plan implementations can blur vendor plan numbers and TA plan numbers.",
        "Keep a clear crosswalk of vendor plan IDs, TA plan IDs, file names, and processing steps for each plan.",
        "Treat related plans as related, not interchangeable.",
    ),
    "day-two-managed-advice-conversion": lesson_page(
        "Day-Two Managed Advice Conversion",
        "lesson/28",
        "vera-institute-of-justice",
        "Defaulted vendor participants needed a second managed-advice rebalance after the initial investment.",
        "Provide the TC with the list of participants defaulted at the vendor so day-two managed advice can be initiated cleanly.",
        "Managed advice can be a second conversion step, not just a default investment detail.",
    ),
    "census-cleanup-all-tables": lesson_page(
        "Census Cleanup Across All Tables",
        "lesson/29",
        "cocc",
        "Participants were loaded into the wrong plan and had to be removed.",
        "When clearing a bad census load, tell Broad Support to clear every related table, not only the employee table.",
        "Deleting from one table is not a clean participant removal.",
    ),
    "transfer-in-kind-residual-dividends": lesson_page(
        "Transfer-In-Kind Residual Dividends",
        "lesson/30",
        "cocc",
        "COCC had residual dividends, staged share movement, and reports with front-loaded monthly dividend values.",
        "Separate actual received shares/cash from front-loaded report values, process in chunks when needed, and prorate residuals when they arrive.",
        "TIK residuals need their own tracking lane; reports may include values that have not arrived yet.",
    ),
    "loan-report-mismatch-handling": lesson_page(
        "Loan Report Mismatch Handling",
        "lesson/31",
        "denali-water-solutions-wallace-farm",
        "Loan reports showed payments tied to a fund that did not line up cleanly with the loan.",
        "Aggregate/massage the loan data only after confirming totals and understanding which fund reporting artifact is causing the mismatch.",
        "A small loan count can still hide a messy reporting issue.",
    ),
    "secondary-fund-code-mapping": lesson_page(
        "Secondary Fund-Code Mapping",
        "lesson/32",
        "health-concepts",
        "Health Concepts had 80+ funds and Nationwide secondary fund codes that made mapping harder.",
        "Map both the visible fund and secondary code layer so TOA/final records reconcile.",
        "Some vendors require two mapping dimensions before the money makes sense.",
    ),
    "nqdc-excess-asset-handling": lesson_page(
        "NQDC Excess Asset Handling",
        "lesson/33",
        "thunder-valley-casino",
        "A large extra amount appeared that was not participant money.",
        "Confirm whether the difference is participant money, asset-liability variance, dividend, or forfeiture/excess asset before allocating.",
        "NQDC money may not reconcile one-to-one to participant balances.",
    ),
    "default-election-effective-date-timing": lesson_page(
        "Default Election Effective-Date Timing",
        "lesson/34",
        "tmg",
        "Default elections were loaded with a future effective date, blocking participants from changing elections during early access.",
        "If elections are defaulted before early access, use an effective date before the early-access window so participant changes are not blocked.",
        "Default-election timing can break early access even when the election values are correct.",
    ),
    "fund-management-calendar-discipline": lesson_page(
        "Fund Management Calendar Discipline",
        "lesson/35",
        "tmg",
        "A large Advanced Employer trade was not placed on the Fund Management Calendar.",
        "Put estimated trades on the FMC as soon as possible, update them with test/final values, and email the required groups if the sheet is locked.",
        "It is okay for an FMC estimate not to trade; it is not okay for a trade to happen with no FMC record.",
    ),
    "advisor-group-patterns-wtw-excelwise": lesson_page(
        "Advisor Group Patterns: WTW And ExcelWise",
        "lesson/36",
        "tmg",
        "WTW and ExcelWise plans show recurring advisor-group patterns, expectations, and client intensity.",
        "Recognize QK63233 as WTW-style and QK63283 as ExcelWise-style work; expect thorough questions and advisor-driven urgency.",
        "Advisor-group plans have personalities. Knowing the pattern helps set expectations early.",
    ),
    "recovery-ownership-after-plan-goes-sideways": lesson_page(
        "Recovery Ownership After A Plan Goes Sideways",
        "lesson/37",
        "sibley-memorial-hospital",
        "Sibley/Cardinal created a personal and operational low point, but Joel recovered by asking for help and staying with the work.",
        "Lean on senior help, clarify whether the issue is recoverable, and then own the cleanup without freezing.",
        "A bad plan can become the turning point if it changes the operating discipline going forward.",
    ),
}


CURRENT_UPDATES = {
    "banayn": {
        "source": "banion-twin.md",
        "title": "Banayn",
        "case_id": "QK63283-00099",
        "status": "Active",
        "effective": "2026-06-01",
        "summary": "Active ExcelWise plan waiting on the client base file, expected by the end of the week ending 2026-05-15.",
    },
    "bonnier-corporation": {
        "source": "bonior-corporation.md",
        "title": "Bonnier Corporation",
        "case_id": "QK6283-00105",
        "status": "Transitioning",
        "effective": "2026-07-01",
        "summary": "Future ExcelWise 7/1 plan. Details are still light; capture specifics when activity starts.",
    },
    "calliditas": {
        "source": "calliditas.md",
        "title": "Calliditas",
        "case_id": "JK62945-00001",
        "status": "Complete",
        "effective": "2026-04-01",
        "summary": "Go-live/post-go-live work is complete. The retained lessons are loan review discipline and Informatica parameter-file checking.",
    },
    "can-am-bridges": {
        "source": "can-am-bridges.md",
        "title": "Can Am Bridges",
        "case_id": "QK63283-00095",
        "status": "Transitioning",
        "effective": "2026-10-01",
    },
    "can-am-buildings": {
        "source": "can-am-buildings.md",
        "title": "Can Am Buildings",
        "case_id": "QK63283-00113",
        "status": "Transitioning",
        "effective": "2026-10-01",
    },
    "central-maine-healthcare-prime-healthcare": {
        "source": "central-maine-healthcare-prime-healthcare.md",
        "title": "Central Maine Healthcare / Prime Healthcare Services",
        "case_id": "QK62489-00001",
        "status": "Transitioning",
        "effective": "2026-06-15 pending",
    },
    "havern-school": {
        "source": "havern-school.md",
        "title": "Havern School",
        "case_id": "TA069932-00051",
        "status": "Active",
        "effective": "2026-05-01",
    },
    "international-school-of-denver": {
        "source": "international-school-of-denver.md",
        "title": "International School of Denver",
        "case_id": "TA069932-00056",
        "status": "Active",
        "effective": "2026-07-01",
    },
    "leibys-dairy": {
        "source": "leibys-dairy.md",
        "title": "Leiby's Dairy",
        "case_id": "QK6283-00112",
        "status": "Transitioning",
        "effective": "2026-08-01",
    },
    "pella": {
        "source": "pella.md",
        "title": "Pella",
        "case_id": "QK6283-000052-M1",
        "status": "Active",
        "effective": "2026-05-01",
    },
    "stout-co": {
        "source": "stout-co.md",
        "title": "Stout Co",
        "case_id": "QK63283-00102",
        "status": "Transitioning",
        "effective": "2026-07-01",
    },
    "tmg": {
        "source": "tmg.md",
        "title": "TMG",
        "case_id": "QK63233-00026",
        "status": "Complete",
        "effective": "Unknown",
    },
    "episcopal": {
        "source": "episcopal.md",
        "title": "Episcopal Communities and Services",
        "case_id": "TE098337-00001",
        "status": "Complete",
        "effective": "Unknown",
    },
    "cocc": {
        "source": "cocc.md",
        "title": "COCC",
        "case_id": "NQ98506-00001 / NQ98507-00001 / NQ98508-00001",
        "status": "Complete",
        "effective": "Unknown",
    },
}


def rewrite_current_plan(target_slug: str, update: dict[str, str]) -> None:
    plans = ROOT / "02-plans"
    source = plans / update["source"]
    target = plans / f"{target_slug}.md"
    if source.exists() and source != target:
        source.rename(target)
    text = target.read_text(encoding="utf-8", errors="replace")
    text = re.sub(r'title: ".*?"', f'title: "{update["title"]}"', text, count=1)
    text = re.sub(r"case_id: .+", f'case_id: {update["case_id"]}', text, count=1)
    text = re.sub(r"status: .+", f'status: {update["status"]}', text, count=1)
    text = re.sub(r"sources: \d+", "sources: 2", text, count=1)
    text = re.sub(r"# ?.+ `[^`]+`", f'# {update["title"]} `{update["case_id"]}`', text, count=1)
    text = text.replace("Banion Twin", "Banayn").replace("Banion", "Banayn").replace("Bonior", "Bonnier")
    text = text.replace("Kalitas", "Calliditas").replace("kalitas", "calliditas")
    text = re.sub(
        r'<div class="metadata-row"><span class="metadata-key">Status</span><span class="metadata-value">.*?</span></span></div>',
        f'<div class="metadata-row"><span class="metadata-key">Status</span><span class="metadata-value">{status_tag(update["status"])}</span></div>',
        text,
        count=1,
    )
    text = re.sub(
        r'<div class="metadata-row"><span class="metadata-key">Effective date</span><span class="metadata-value">.*?</span></div>',
        f'<div class="metadata-row"><span class="metadata-key">Effective date</span><span class="metadata-value">{update["effective"]}</span></div>',
        text,
        count=1,
    )
    if update.get("summary"):
        text = re.sub(r"## Description\n\n.*?(?=\n## Current Updates)", f'## Description\n\n{update["summary"]}\n', text, flags=re.S)
    if target_slug == "calliditas":
        text = re.sub(r"## Open Items\n.*?(?=\n## Lessons Learned / One-offs)", "## Open Items\n", text, flags=re.S)
        text = text.replace("Kalitas", "Calliditas").replace("kalitas", "calliditas")
    target.write_text(text.rstrip() + "\n", encoding="utf-8")


def write_index() -> None:
    plan_paths = sorted(path for path in (ROOT / "02-plans").glob("*.md") if not path.name.startswith("_"))
    lines = [
        "# Joel's Work Brain",
        "",
        f"*Last updated: {TODAY} - archive ingest and canonical naming update*",
        "",
        "## Plan Information",
        "",
    ]
    for path in plan_paths:
        lines.append(f"- [[02-plans/{path.stem}]]")
    lines.extend(
        [
            "",
            "## Outstanding / Open Items",
            "",
            "- [[open-items-dashboard]] - generated read-only dashboard. Edit open items in source files, then regenerate.",
            "",
            "## One-off / Lessons Learned",
            "",
            "- [[one-offs-running-sheet]] - generated Lessons Register for plan issues, resolutions, and key takeaways.",
            "",
            "Source records remain in `05-processes/`; the active browseable view is the Lessons Register.",
        ]
    )
    (ROOT / "index.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    idx = ["# Plan Index", "", "| Plan | Status | Case ID |", "|---|---|---|"]
    for path in plan_paths:
        text = path.read_text(encoding="utf-8", errors="replace")
        title = re.search(r'title: "([^"]+)"', text)
        status = re.search(r"status: (.+)", text)
        case = re.search(r"case_id: (.+)", text)
        idx.append(f"| [[{path.stem}]] | {status.group(1) if status else ''} | {case.group(1) if case else ''} |")
    (ROOT / "02-plans" / "_plan-index.md").write_text("\n".join(idx) + "\n", encoding="utf-8")


def main() -> None:
    plans_dir = ROOT / "02-plans"
    alias = plans_dir / "kalitas.md"
    if alias.exists():
        alias.rename(plans_dir / "_kalitas-alias.md")

    for slug, update in CURRENT_UPDATES.items():
        rewrite_current_plan(slug, update)

    for slug, content in PLAN_FILES.items():
        (plans_dir / f"{slug}.md").write_text(content.rstrip() + "\n", encoding="utf-8")

    lessons_dir = ROOT / "05-processes"
    for slug, content in LESSON_FILES.items():
        (lessons_dir / f"{slug}.md").write_text(content.rstrip() + "\n", encoding="utf-8")

    write_index()
    log_path = ROOT / "log.md"
    with log_path.open("a", encoding="utf-8") as log:
        log.write(
            f"\n## [{TODAY}] ingest | Archive plan profiles and lessons\n"
            f"- Plans added: {len(PLAN_FILES)} archival plan profiles.\n"
            f"- Lessons added: {len(LESSON_FILES)} lesson records.\n"
            "- Canonical names: Calliditas, Bonnier Corporation, Can Am Bridges, Can Am Buildings, Banayn.\n"
            "- Notes: Kalitas was moved to `_kalitas-alias.md` so the active app uses Calliditas only.\n"
        )


if __name__ == "__main__":
    main()
