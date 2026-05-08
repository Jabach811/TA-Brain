---
title: "Roth"
type: concept
tags: [concept, roth, basis, sources, tax, five-year-clock]
created: 2026-04-18
updated: 2026-04-18
sources: 2
---

# Roth

Post-tax contributions whose earnings are tax-free at qualified distribution — tracked by a separate money source, a separate basis bucket, and a first-contribution-year clock.

> [!needs-review]
> First pass of this concept page. Human flagged this for close review during the next lint pass — Roth rules are tax-sensitive and the 5-year clock / first-contribution-year handling needs to be verified by an SME before this is considered authoritative.

## Definition

Roth refers to any money source on a plan that is funded with post-tax dollars and governed by the IRC §402A / §408A qualified-distribution rules. At Transamerica, Roth lives in several places simultaneously:

1. As a **money source** on the plan configuration (e.g. Roth EE deferral, Roth in-plan conversion, Roth rollover).
2. As a **basis bucket** in `CORP.EE_BASIS` — separate columns for Roth tax-free basis, Roth hardship basis, Roth rollover basis.
3. As a **first-contribution year** on the participant (`RTH_CTRB_FST_YR` in `CORP.EE_BASIS`) — the year the participant first put Roth money in **any** qualifying plan, which starts the 5-year clock.

The 5-year clock is what makes Roth earnings tax-free. If a participant takes a distribution before 5 tax years have passed from their first Roth contribution year, earnings on Roth money are taxable.

## Why It Matters

On a takeover, Roth data is the single highest-risk basis migration item because:

- If `RTH_CTRB_FST_YR` is not carried over, the 5-year clock resets to zero. Participants who were already clock-qualified lose that status and a later distribution triggers taxable earnings. This is a direct participant-harm defect.
- Roth basis and pre-tax basis have different tax treatment — conflating them on load corrupts 1099-R reporting.
- In-plan Roth conversions create basis rows that must follow the participant — these are often missed on partial-takeover intakes.

The `to-basis` verification query explicitly calls this out: it flags any Roth-bearing participant whose `RTH_CTRB_FST_YR` is null.

## Data Elements

Roth-relevant columns in `CORP.EE_BASIS`:

| Column | Meaning |
|--------|---------|
| `RTH_CTRB_FST_YR` | First year participant made a Roth contribution to any qualifying plan |
| Roth taxfree basis | Tax-free basis bucket |
| Roth hardship basis | Hardship-distribution-eligible Roth basis |
| Roth rollover basis | Roth rolled in from another qualifying plan |

Related tables:

- `TDA.EE_BASIS` / `TDAV.VEE_BASIS` — business-line variants
- `PENSION.PART_ELECT_DETAIL` — current elections by source (Roth source appears as a distinct `SRC_I`)

## Evidence / Examples

- The `to-basis` query (wiki-v2) specifically pulls `RTH_CTRB_FST_YR` and is used post-load to verify every Roth participant has it populated.
- The `basis-internal-conversion` query UPDATEs and INSERTs Roth basis rows alongside pre-87 / post-86 after-tax basis in a single migration script.
- Elections pulled via `current-elections` include Roth source codes — if the plan has a Roth source, it appears as a row per participant in the election output.

## Counterarguments / Edge Cases

- **Roth rollover from a Roth IRA keeps the IRA's clock**, not the 401(k) clock — this nuance matters for Roth-to-Roth-IRA rollovers post-distribution but is generally out of scope for plan-to-plan conversions.
- **In-plan Roth conversions** (traditional → Roth inside the plan) create Roth basis without a new participant contribution — `RTH_CTRB_FST_YR` is still set to the year of the conversion.
- **Roth 457 and Roth 403(b) follow different §402A rules** than Roth 401(k); on plans with multiple contract types, confirm the source-code distinction before consolidating.

## Related Concepts

- [[basis]] — Roth basis is one bucket inside the broader basis concept
- [[concepts/deferrals]] — Roth deferrals are a specific deferral source
- [[investment-elections]] — Roth source appears as a separate election source

## Open Questions

- Authoritative list of TA Roth-related source codes by contract type (401(k), 403(b), 457, PEP).
- Workflow when prior RK does not deliver `RTH_CTRB_FST_YR` — what is the intake / client-survey fallback?
- How in-plan Roth conversions are represented in the takeover base file from prior RKs that don't natively track in-plan conversions.

## See Also

- [[basis]]
- [[concepts/loading-basis-eds]]
- [[concepts/informatica-basis-module]]
- [[investment-elections]]
