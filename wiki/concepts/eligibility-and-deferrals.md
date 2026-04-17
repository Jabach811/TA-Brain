---
title: "Eligibility and Deferrals"
type: concept
tags: [eligibility, deferrals, p3, processing, auto-enrollment, sequence]
created: 2026-04-14
updated: 2026-04-14
sources: 3
---

# Eligibility and Deferrals

Overview of the relationship between deferral processing and eligibility processing during the final files phase. These are separate processes with a hard sequencing rule between them.

> See [[deferrals]] and [[eligibility]] for full detail on each. This page covers the relationship and sequence.

---

## The Core Rule

> **Deferrals first. Eligibility second. Always.**

These are separate processes. The only connection between them is sequence:
- **[[deferrals]]** fill the system state — elections are in place
- **[[eligibility]]** triggers system actions — auto-enrollment, eligibility logic, entry dates

If eligibility runs before deferrals are loaded, the system has nothing to check against. Auto-enrollment fires and overwrites elections that may not match the participant's actual deferral. Reversals are messy.

---

## The Sequence

```
Final files arrive
    ↓
Post participant balances (see [[final-files-processing]])
    ↓
Load DEFERRALS  ← FIRST
    (including auto-enrollment data — see [[deferrals]])
    ↓
Verify all elections are correct
    ↓
Send internal approval email → QA / TC / COM
    ↓
Wait for go-ahead
    ↓
Enable ELIGIBILITY in P3  ← SECOND
    ↓
Load and process eligibility
    ↓
Run queries, verify
```

---

## Why Order Matters

Many plans have **auto-enrollment**: if a participant is eligible but has no deferral on file, the system enrolls them at a default rate (e.g., 1%). 

- Deferrals loaded first → system sees the election → skips auto-enrollment for that participant ✓
- Eligibility first → no elections in place → auto-enrollment fires for everyone → overrides actual elections ✗

Reversing incorrect auto-enrollment entries is possible but painful. Don't allow the situation to occur.

---

## Key Differences

| | Deferrals | Eligibility |
|--|-----------|-------------|
| What it does | Fills system state (elections) | Triggers system actions |
| Complexity | High — data-driven, exception-heavy | Structured — rules-driven |
| Main challenge | Auto-enrollment dates (esp. ADP) | Class/service rule configuration |
| Error recoverability | Harder to unwind | Easier, but still painful |
| SME | — | [[scott-vrba]] |

---

## See Also

- [[deferrals]] — full detail on deferral processing
- [[eligibility]] — full detail on eligibility processing
- [[final-files-processing]] — the broader final files context
- [[scott-vrba]] — eligibility SME
- [[p3]]
- [[dc-onboarding-workflow]]
