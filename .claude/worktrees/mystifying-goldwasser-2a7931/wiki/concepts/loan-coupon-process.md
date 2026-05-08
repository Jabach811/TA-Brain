---
title: "Loan Coupon Process"
type: concept
tags: [concept, loans, coupons, roc-tool, fulfillment, p3-maintenance]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# Loan Coupon Process

The P3 maintenance process for generating and distributing paper loan repayment coupons to participants who repay outside of payroll.

## Definition

Loan coupons are produced for participants whose loans are flagged with `ln_coupon_cd = 'C'` and whose loans are neither past maturity nor in default. The DC runs the coupon generation in P3, toggles coupon codes via [[roc-tool]] as needed, saves PDFs to a shared drive, and the central mailing team handles physical fulfillment.

## Core Rules

Per `Loan_Coupon_Process.md.txt`:

- **Only `ln_coupon_cd = 'C'` loans** get coupons
- **Exclude past-maturity loans** — no more payments due
- **Exclude defaulted loans** — already resolved or written off

Per `Loan%20Coupon%20Process.md.txt`, ROC procedures can **toggle coupon codes temporarily** when ad-hoc coupons are needed outside the normal batch; temporary flags must be reverted after generation.

## Process Overview

1. Identify loans coded with `'C'`
2. Use [[roc-tool]] procedures to toggle coupon codes if a one-off coupon is required
3. Generate coupons and cover sheets
4. Save PDFs to the shared drive for the central mailing team
5. Revert any temporary ROC changes

## Why It Matters

Participants with terminated or off-payroll loans rely on coupons to make scheduled repayments. Miss a coupon cycle and payments get missed, which can drift a loan toward default. Generating coupons for ineligible loans (past-maturity or defaulted) creates participant confusion and audit noise.

## Evidence / Examples

- Both source files agree on the `ln_coupon_cd = 'C'` rule and the exclusions
- `Loan_Coupon_Process.md.txt` specifies shared-drive PDFs fulfilled by a central mailing team
- `Loan%20Coupon%20Process.md.txt` adds the ROC toggle/revert detail (minor variance between the two sources — treat as complementary, not contradictory)

## Related Concepts

- [[loan-reamortization]] — adjacent loan maintenance
- [[pog-provision-group]] — loan provision group configuration
- [[roc-tool]] — ROC procedures used to toggle coupon codes

## See Also

- [[paris-iii]]
- [[p3]]
- [[lm-dc]]
