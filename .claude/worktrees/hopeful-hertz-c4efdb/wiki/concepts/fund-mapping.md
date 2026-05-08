---
title: "Fund Mapping"
type: concept
tags: [mapping, funds, toa, conversion]
created: 2026-04-14
updated: 2026-04-14
sources: 2
---

# Fund Mapping

The process of establishing which prior record keeper fund maps to which TransAmerica fund. Required for mapping and TIK conversions.

## Overview

Fund mapping tells the system where participant assets should go when they arrive at TransAmerica. It is extracted from the [[toa]] and loaded into a fund mapping template, which is then reviewed and approved by COM, TC, and QA.

## When to Do It

**As soon as the TOA is signed.** No test files needed. The TOA already contains all the fund information required.

> Do not wait for test files to start fund mapping. TOA is sufficient. Get this done immediately after TOA is signed.

## Process

1. TOA is signed by client
2. DC extracts fund information from TOA into the fund mapping template
3. Nearly one-to-one extraction — TOA columns map directly into template columns
4. DC adds ~6 additional TransAmerica-internal fields (part of the template)
5. DC sends completed fund mapping to: COM, TC, QA
6. Approvals received → fund mapping complete
7. File away — no further action needed unless fund lineup changes

## Template Structure

Based on TOA data plus internal TA fields:

| Field | Source |
|-------|--------|
| Prior vendor fund code | TOA |
| Prior vendor fund description | TOA |
| TransAmerica fund code | TOA |
| TransAmerica fund description | TOA |
| Re-registering (Y/N) | TOA column T |
| **Filter** | DC fills in (TA internal) |
| **Vendor Fund Code** | DC fills in (TA internal) |
| **Ref #** | DC fills in (TA internal) |
| **Split Ratio** | DC fills in (TA internal) |
| **Split Code** | DC fills in (TA internal) |
| **Total** | DC fills in (TA internal) |

## Scope

Fund mapping is **plan-wide** — not per source. One mapping covers all sources in the plan.

## Cash Conversion Exception

Cash conversions do not require fund mapping. Assets arrive as cash and are invested based on participant elections. Skip this step entirely for pure cash conversions.

## Relationship to Source Mapping

Fund mapping and [[source-mapping]] are different things:
- **Fund mapping** = which investment funds map to which (asset movement)
- **Source mapping** = which contribution source types map to which (money categorization)

Both are needed for mapping/TIK plans. Source mapping requires test files; fund mapping does not.

## Important Clarifications

**Deadline:** Earlier the better — no official deadline.

**Does the approved mapping get loaded to the system?** No. It is not a system import. The DC sends it out for QC, gets it approved, and uses it in the Informatica workflows. It is a reference document, not a system input.

**Can fund mapping change after approval?** Unlikely — it would be a massive change. Rare. If it does happen, the amendment process would need to be coordinated through COM/QA/TC.

## See Also

- [[toa]]
- [[source-mapping]]
- [[conversion-types]]
- [[dc-onboarding-workflow]]
- [[internal-teams]]
