---
title: "Defaulting Elections via EDS"
type: process
tags: [eds, elections, defaults, census, conversion, auto-enrollment]
created: 2026-05-03
updated: 2026-05-03
sources: 1
status: current
---

# Defaulting Elections via EDS

The technique for setting a participant's investment elections to the plan default, loaded through EDS as part of (or just after) the census load. Useful for limited-access plans, startup plans, and any plan where every participant comes in defaulted.

## When to Use It

- **Limited-access plans** where most or all participants haven't actively made elections
- **Startup plans** where every participant comes in fresh with default elections
- Plans where a known subset of participants needs to be defaulted at conversion (alongside others who have real elections)
- Cleanup pass when the main map-elections load left a population without elections that need defaults

> **Best practice:** do census load + defaulted elections in a **single pass**, not two. Splitting them into two parts is not recommended.

## Row Layout

Same EDS layout as map-elections, with three differences:

| Field | Map-Elections Value | Default Value |
|-------|---------------------|---------------|
| Fund Descriptor | populated | **blank** |
| Percentage | populated | **blank** |
| Default flag | **N** | **D** |

One row per participant being defaulted. That's enough — the system applies the plan's default election rules from there.

## Verifying the Result

Output is queryable via [[aqt]]. After the load, run a query against the elections table to confirm the defaulted population matches the expected count.

## Reconciliation Discipline

When mixing real elections and defaulted elections in the same plan, account for the full population explicitly:

> "150 participants in the plan. 140 have elections. 10 were defaulted. That's 150. Be explicit. Don't infer."

Don't let the defaulted population be implied — call it out in the load summary so QA, COM, and TC can sign off without guessing.

## Relationship to Auto-Enrollment

Defaulting elections via EDS is a **manual, DC-driven** action — distinct from P3's automatic [[eligibility|auto-enrollment]] logic, which fires when [[eligibility]] is enabled and a participant has no election on file. Both can result in defaulted elections, but the EDS path is explicit and happens at conversion time; the auto-enrollment path is rule-driven and fires later.

If you default participants via EDS, the auto-enrollment logic sees their elections and skips them — which is usually what you want.

## See Also

- [[eds]]
- [[census-data]]
- [[deferrals]]
- [[eligibility]]
- [[eligibility-and-deferrals]]
- [[limited-access-file]]
- [[aqt]]
