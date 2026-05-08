---
title: "Internal Merger"
type: concept
tags: [concept, internal-merger, consolidation, conversion, internal-conversion]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Internal Merger

The consolidation of one Transamerica-recordkept plan into another — distinct from an external [[takeover]], and executed through the internal-conversion toolchain.

## Definition

An internal merger moves participants, balances, loans, and history from one TA plan (the source) into another TA plan (the target) already on the TA platform. Because both plans live in P3, the mechanics differ from an external plan takeover: there is no prior-vendor file exchange, liquidation is run internally, and data extraction uses an internal-conversion query family rather than vendor-file parsing.

## Distinction From External Takeover

| Dimension | External Takeover | Internal Merger |
|-----------|-------------------|-----------------|
| Source system | Prior vendor | Transamerica (P3) |
| Data source | Vendor files | Internal queries |
| Liquidation | Cash/TIK from vendor | Internal liquidation (v1 or v2) |
| Tooling | [[eds]], vendor-specific | `queries/internal-conversion/` family |

## Process Components

- **Data extraction** — uses the full `queries/internal-conversion/` query family
- **Liquidation** — via `[[day-of-liquidation-v1]]` or `[[day-of-liquidation-v2]]`
- **Rebook** — via `[[day-of-rebook]]` (or the split-mapping variant)

The parent process page is [[internal-conversion]].

## Why It Matters

Internal mergers are common when a plan sponsor acquires another company that already uses Transamerica, or when multiple legacy plans under the same sponsor are consolidated. They reuse infrastructure and skip many vendor-side steps, but they require careful source/fund alignment because both plans carry real history that must survive the merger.

## Evidence / Examples

Pattern established across the `Internal conversion*.md.txt` file family in the main dump, including:
- `Internal conversion.md.txt`
- `Internal conversion DAY OF LIQUIDATION.md.txt` / `...DAY OF LIQUIDATION2.md.txt`
- `Internal conversion DAY OF REBOOK.md.txt` / `...DAY OF REBOOK FOR SPLIT MAPPING.md.txt`
- `Internal conversion hours.md.txt`
- `Internal conversion new takeover loan query build.md.txt` / `...Sources query build.md.txt`
- `Internal conversion vesting and bene.md.txt`
- `Basis for internal Conversions.md.txt`
- `Deferrals for internal conversion.md.txt`
- `FOD status for internal conversion.md.txt`

## Related Concepts

- [[internal-conversion]] — the process page
- [[takeover-data-internal-mergers]] — the query used to pull takeover data for internal mergers
- [[day-of-liquidation-v1]], [[day-of-liquidation-v2]] — liquidation steps
- [[day-of-rebook]] — rebook step
- [[conversion-types]] — broader typology

## See Also

- [[lm-dc]]
- [[p3]]
- [[liquidation-day]]
