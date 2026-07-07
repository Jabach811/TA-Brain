---
title: "Divisions and Affiliates"
type: concept
tags: [concept, divisions, affiliates, p3, psd, participant-experience]
created: 2026-05-13
updated: 2026-05-13
sources: 1
status: needs-review
---

# Divisions and Affiliates

Plan setup pattern for division tracking, divisional reporting, and multi-affiliate plan administration.

## Definition

Divisions identify participant groups inside a plan. Affiliates can create separate accounts or related plan structures that affect participant experience, payroll, loans, distributions, reporting, and web access.

## Why It Matters

Divisions and affiliates look like setup details, but they change how participants experience the plan and how payroll, loans, distributions, statements, and reports behave. The source warns that multiple affiliates can create confusion and processing errors when participants move between affiliates or have balances in more than one affiliate.

> [!warning] Source status
> The procedure is legacy and references screenshots that are not included. Validate current P3/PSD screens before using the steps live.

## Evidence / Examples

### Adding Divisions

- On the Divisions tab, indicators are set to Yes for statement divisions, enrollment divisions, non-plan-defined divisions, and EDS division validation.
- Division number, name, and optional divisional contact are added.
- Division numbers over four characters require customization through CTS Quality and may require a JIRA ticket.

### Divisional Reporting in PSD

- Enable division security in Plan Sponsor Website setup.
- Confirm user-level division access through User Maintenance.
- For outbound files, activate division/group reporting on the Outsourcing tab and assign divisions to group names.

### Multiple Affiliate Risks

- Participants may see multiple accounts and make elections under the wrong affiliate.
- Deferral changes under the wrong affiliate can cause outbound file and payroll mismatches.
- Loan availability and repayment can be affected when a participant changes affiliates.
- Date of termination logic does not span affiliates.
- Rollover deposits and contract exchanges can be misrouted if affiliate numbers are missing.
- PSD reports may need client-side aggregation.
- Common remitter setup may be needed to track limits across related plans.

## Related Concepts

- [[common-remitter-plans]]
- [[deferrals]]
- [[loan-setup]]
- [[payroll-template]]
- [[wx]]
- [[p3]]

## See Also

- [[tc-stuff]]
- [[tc]]
- [[roles/lm-dc]]
