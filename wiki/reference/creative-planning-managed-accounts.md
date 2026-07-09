---
title: "Creative Planning Managed Accounts"
type: reference
tags: [concept, cpma, financial-guide, managed-advice, p3, plan-setup]
created: 2026-05-13
updated: 2026-05-13
sources: 1
status: needs-review
---

# Creative Planning Managed Accounts

Plan setup and participant-service pattern for Financial Guide / Creative Planning Managed Accounts.

## Definition

Creative Planning Managed Accounts (CPMA) is a fee-based managed account service connected to Financial Guide. In setup materials, enabling Financial Guide controls the participant SSO link and related participant communications.

> [!warning] Source status
> This page is built from legacy setup and case note material. Confirm current CPMA service rules, fee setup, and participant communication requirements before live use.

## Why It Matters

CPMA touches plan setup, fees, funds, participant communications, default allocations, DDOL/VRU access, case notes, and call center routing. It can also conflict with other services, especially OnTrack.

## Evidence / Examples

### Pre-Setup Requirement

- Before P3 setup, the account and contract must exist in Salesforce.
- The contract should show the CPMA connection.
- The `services assigned` field should include `3PMA`.
- Advisor Firm should be Creative Planning, LLC.
- TRSC IM Asset Allocation Services should confirm the setup.

### Funds Tab

- CPMA uses service-exclusive funds.
- To add a service-exclusive fund, the SEF indicator is checked when searching by fund descriptor.

### Plan Service Expense Tab

- CPMA requires two fee portions:
  - Total fee for CPMA.
  - Portion paid to Creative Planning, LLC.
- Fees are applied to all funds used for the service.
- Source fields include `VAC - Creative Planning Managed Accounts`, third-party BPS, total basis points, start date, and blank end date.

### Default Allocation

- For plans using CPMA as default, default allocation type is Financial Guide.
- Source type uses all employee-directed source groups.
- Effective date uses the service effective date.
- QDIA is set to Yes if CPMA is used as QDIA.

### DDOL/VRU

- Financial Guide is enabled or temporarily enabled on the DDOL/VRU tab.
- Enabling Financial Guide controls the SSO link to the Financial Guide site.
- OnTrack cannot be turned on with Financial Guide/CPMA; OnTrack access codes should be Not Enabled.
- IRA handling codes should be Not Enabled.
- Third Party Referral should be Enabled.

## Related Concepts

- [[case-notes-template]]
- [[go-live-checklist]]
- Managed Advice
- [[p3]]
- [[wx]]

## See Also

- [[tc-stuff]]
- [[tc]]
- [[qa]]

