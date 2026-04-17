---
title: "Wire Instructions"
type: concept
tags: [wire, liquidation, prior-record-keeper, cashiering]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Wire Instructions

Banking instructions sent to the prior record keeper telling them where to send the liquidated assets on liquidation day.

## Overview

Wire instructions tell the prior record keeper exactly where to wire the plan's money when they liquidate. The DC sends these as early as possible, then resends an updated version approximately one week before liquidation.

## Two Sets of Instructions

### Initial Wire Instructions (Early Send)
- Sent as soon as the prior record keeper contact is established
- May use the **default account** if P3 is not yet fully set up
- Default account: money still arrives at TransAmerica, just in a general account rather than the plan-specific account
  - Someone internally routes it to the correct place (extra manual step, but manageable)
  - Not the end of the world — money is accessible internally
- Better to send early with a default account than to delay

### Updated Wire Instructions (~1 Week Before Liquidation)
- Resent approximately 1 week before liquidation date
- By this point, P3 should be fully set up → plan-specific account number available
- Updated instructions route directly to the plan-specific account (eliminates the extra routing step)
- Also resent because instructions may have changed since the initial send

## P3 Account Numbers — Assurance Code

The **Assurance Code** in P3 determines which account number to use for the plan.

**Navigation:**
> Plan → dropdown → General Plan → Assurance Codes

The wire instructions template has a field for this — DC pulls the assurance code from P3 and fills it into the template to get the correct account number.

**How to know if P3 is ready:** Just try to log in and see. If the plan is set up, the assurance code will be accessible.

## Process

1. Identify prior record keeper contact (from [[prior-record-keeper]] coordination)
2. Use the **standard wire instructions template** (DC does not generate these from scratch)
3. Pull the assurance code from P3 → template fills in the correct account number
4. If P3 is not set up yet: use the **default account** (money arrives at TA, internally routed)
5. Send to prior RK as early as possible
6. Resend updated (plan-specific) instructions ~1 week before liquidation

## Wrong Account — What Happens

If the prior RK sends money to the default account instead of the plan-specific account:
> Ask internally for a **transfer** to route the funds to the correct account.

Same applies if the prior RK sends to the wrong account entirely. Process is the same — request the transfer. It's not catastrophic, just an extra step.

## See Also

- [[prior-record-keeper]]
- [[liquidation-day]]
- [[p3]]
- [[internal-teams]]
- [[dc-onboarding-workflow]]
