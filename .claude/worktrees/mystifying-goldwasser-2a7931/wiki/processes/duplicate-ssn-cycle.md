---
title: "Duplicate SSN Cycle"
type: process
tags: [process, dup-ssn, legal-hold, roc, ddol-vru]
created: 2026-04-17
updated: 2026-04-17
sources: 3
---

# Duplicate SSN Cycle

End-to-end cycle for identifying, disabling, investigating, and re-enabling participant records when duplicate SSNs are found during a conversion: **Identify → Disable → Investigate → Enable**.

## Overview

Duplicate SSNs occur when a participant exists under the same SSN in both the converting plan and an existing TA plan. Until resolved, dup-SSN participants must be locked out of DDOL (Daily Download) and VRU (Voice Response Unit) access on the **converting plan only** to prevent incorrect activity. Legal holds are applied during the disable step and removed during the enable step.

## Trigger

Run during a plan conversion when the Dup SSN report returns rows.

## Steps

1. **Identify duplicates** — [[lm-dc]] / [[lm-dc]]
   - Run Duplicate SSN report in [[aqt]] against [[odsp]]
2. **Apply legal holds and disable access** — operations (via [[roc-tool]])
   - Run `ROC_DUPLICATE_SSN_DISABLE` in **both CORP and TDA regions**
   - Validate, analyze, and execute through the ROC Process Request Screen
   - Applies legal holds to the converting plan only
   - Run the Dup SSN Email report and notify [[tc]]
3. **Investigate / resolve** — [[lm-dc]] coordinating with [[tc]] and [[prod-support]]
   - Determine whether the duplicate is a true dup or a data error
   - Resolve the underlying data issue
4. **Re-enable access** — operations (via [[roc-tool]])
   - Run `ROC_DUPLICATE_SSN_ENABLE` to restore DDOL/VRU access
   - Run `ROC_REMOVING_LEGAL_HOLD` to remove the holds applied at disable
   - Validate affected records and any errors
5. **Validate** — DC
   - Run Dup SSN Email report again to confirm clean state

## Handoff Points

- DC identifies → routes list to whoever runs ROC (often [[prod-support]] or DC via ROC access)
- DC notifies [[tc]] after the disable step completes (per Dup SSN – DISABLE procedure)
- On enable, final confirmation shared with [[tc]]

## Timing / Deadlines

- The disable step should happen **before** any DDOL/VRU transaction window that could be exploited
- Enable must follow resolution, not precede it — re-enabling access before the dup is resolved risks incorrect activity

## Failure Modes

| Failure | Impact |
|---------|--------|
| Running `ROC_DUPLICATE_SSN_DISABLE` only in CORP (or only in TDA) | Leaves DDOL/VRU open in the un-run region |
| Applying legal holds to both plans instead of converting plan only | Blocks legitimate activity on the existing plan |
| Forgetting `ROC_REMOVING_LEGAL_HOLD` on enable | Participant access restored but legal hold still in place; continued restrictions |
| Skipping the final Dup SSN Email report | No confirmation that the cycle actually closed |

## See Also

- [[roc-tool]]
- [[odsp]]
- [[aqt]]
- [[lm-dc]]
- [[tc]]
- [[prod-support]]
- [[ddol-vru]]
- [[legal-holds]]
