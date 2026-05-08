---
title: "EDS Load Beneficiary Requirements"
type: concept
tags: [eds, beneficiary, process, system]
created: 2026-04-16
updated: 2026-04-17
sources: 1
---

# EDS Load Beneficiary Requirements

Requirements and data elements for loading participant beneficiary designations through EDS.

## Definition

Beneficiary loading through EDS brings primary and contingent beneficiary designations (name, relationship, allocation percentage) from the prior vendor into P3. The source file (`EDS LOAD BENEFICIARY REQUIREMENTS 06-17-2011(Autosaved).md.txt`) in the main dump is title-only and dated June 17, 2011.

> [!contradiction]
> **Open question: Is this procedure still current in 2026?**
> The source file is dated 2011 — fifteen years before this ingest. EDS has evolved substantially (the Eligibility load, for instance, has a separate `[[loading-eligibility-eds]]` with 2013 release notes). The beneficiary load procedure may have been replaced or updated. Verify with a current DC before relying on this as guidance.

## Why It Matters

Beneficiary data is legally sensitive — a wrong beneficiary record at distribution time can trigger probate disputes and litigation. Any procedure older than a decade should be re-validated against current practice before a conversion uses it.

## Current Working Framework

Per the `[[eds]]` hub, beneficiary loading follows the standard EDS pattern:
- DC sets up the beneficiary layout in EDS before files arrive
- Each data type (beneficiary included) gets its own layout
- EDS validates the file against the layout and produces errors/warnings output
- Output is reviewed after every run

## Evidence / Examples

- Source: `EDS LOAD BENEFICIARY REQUIREMENTS 06-17-2011(Autosaved).md.txt` — title-only, 2011-dated

When the current procedure is documented, this page will cover: beneficiary-specific layout fields, required elements (primary/contingent, relationship, percentage), validation rules, and handling of prior-vendor beneficiary data.

## Related Concepts

- [[eds]] — hub
- [[loading-eligibility-eds]]
- [[loading-basis-eds]]
- [[loading-ytd-contributions-eds]]
- [[final-files-processing]]

## See Also
- [[eds]]
- [[main-dump-batch-2026-04-17]]
