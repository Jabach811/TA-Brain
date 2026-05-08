---
title: "PoG — Provision Group"
type: concept
tags: [concept, loans, p3, pog, provisions]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# PoG — Provision Group

A restricted loan provision group in [[p3]] that limits which participants are eligible for a given set of loan rules.

## Definition

PoG (Provision Group) is a P3 construct that scopes loan provisions — eligibility, caps, interest rules — to a defined participant population rather than the whole plan. Membership is managed via the `ENRL_PROV_GRP_I` value on participant enrollment rows.

## Why It Matters

Some plans restrict loans to certain [[plan-classes]] — for example, excluding union employees, or allowing loans only for a specific division. Without a PoG, loan provisions apply plan-wide; with a PoG, they apply only to participants whose enrollment row carries the matching `ENRL_PROV_GRP_I`.

Adding or removing participants from a PoG is a routine P3 maintenance task when plan populations shift or when a loan eligibility error is found.

## Process

Per `Adding%20Participants%20to%20a%20Loan%20Pog.md.txt`:

1. Identify the target `ENRL_PROV_GRP_I` (the PoG being modified)
2. Insert or delete participant enrollment rows to add/remove members
3. Verify the affected population with a select query

## Evidence / Examples

- Source file describes the identifier (`ENRL_PROV_GRP_I`) as the anchor for membership
- Membership is managed at the enrollment-row level, not via a separate membership table

## Related Concepts

- [[loan-coupon-process]] — coupons respect PoG-driven loan eligibility
- [[plan-classes]] — often the upstream driver of PoG membership

## See Also

- [[p3]]
- [[lm-dc]]
