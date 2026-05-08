---
title: "Kit Mail Date"
type: glossary
tags: [glossary, auto-enrollment, deferrals, escalation, historical-data]
created: 2026-05-03
updated: 2026-05-03
sources: 1
---

# Kit Mail Date

**Also called:** mail kit date

The date the auto-enrollment welcome kit was mailed to a participant. On plans that auto-escalate deferral rates over time, this date is what the system uses to count escalation steps — so it has to be accurate, and it has to come over from the prior record keeper.

## Why It Matters

Most auto-enrollment plans escalate the deferral rate by some increment (commonly 1% per year) up to a cap. To apply escalation correctly, the system needs to know *when* the participant was enrolled. Without the kit mail date, the system either skips escalation entirely or runs it from the wrong start point — both of which leave participants at the wrong rate.

## Required Historical Data

When pulling census/deferral data from the prior record keeper or client, request the kit mail date for every auto-enrolled participant. If the participant has ever been in auto-enroll default — even if they later opted out — the date is still relevant because it determines whether escalation milestones have been hit.

The reliability rules from [[deferrals]] apply: ADP is not a trusted source for these dates. Go to the client first.

## See Also

- [[deferrals]]
- [[eligibility]]
- [[eligibility-and-deferrals]]
- [[prior-record-keeper]]
