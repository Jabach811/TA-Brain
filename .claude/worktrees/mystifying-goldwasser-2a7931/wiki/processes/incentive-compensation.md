---
title: "Incentive Compensation — Direct Sales"
type: process
tags: [process, incentive-compensation, direct-sales, controls]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Incentive Compensation — Direct Sales

Monthly incentive compensation workflow for the Direct Sales channel, governed by manual calculations, management approvals, and restricted system access.

## Overview

Incentive compensation for Direct Sales is processed on a monthly cycle and runs outside the plan-conversion workflows that dominate the rest of this wiki. It is included here because [[sales-consultant]] activity on Transamerica's Direct Sales channel flows into this process.

Source: Incentive Compensation Direct Sales Process Flow.md.txt (summary only — the source outlines controls, not a full step list).

## Trigger

Monthly close — incentive calculation cycle begins on schedule.

## Steps

1. **Manual calculation and review** — Compensation operations
   - Incentive amounts are calculated manually (with spreadsheet support)
   - Reviews catch calculation errors before approval
2. **Management approval** — Management chain
   - Approvals gate release of any payouts
3. **Restricted access handling** — Compensation operations
   - System access to incentive data is restricted — only designated reviewers and approvers can see / modify

## Handoff Points

- Calculators → reviewers (peer review)
- Reviewers → management (approval)
- Management → payroll disbursement (not in scope of this source)

## Timing / Deadlines

- Monthly cycle (exact dates not specified in source)

## Failure Modes

| Failure | Impact |
|---------|--------|
| Manual calculation error uncaught in review | Incorrect payout to sales consultant |
| Approval bypassed | Audit finding; possible compensation reversal |
| Access over-provisioned | Control breach — data visible beyond intended reviewers |

## See Also

- [[sales-consultant]]
- [[diversified-client-integration-audit]]
