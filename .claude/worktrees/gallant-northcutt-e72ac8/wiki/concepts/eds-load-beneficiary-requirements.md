---
title: "EDS Load Beneficiary Requirements"
type: concept
tags: [eds, beneficiary, process, system]
created: 2026-04-16
updated: 2026-04-16
sources: 0
---

# EDS Load Beneficiary Requirements

Requirements and data elements for loading participant beneficiary designation data through EDS.

## Current Documentation

The EDS hub page covers the general framework applicable to beneficiary loading:

> **[[eds]] — see Key Functions, Layout Setup, and Output sections**

Beneficiary loading fits within the standard EDS pattern:
- DC sets up the beneficiary layout in EDS before files arrive
- Each data type gets its own layout — beneficiary is set up independently
- EDS validates the file against the layout and produces errors/warnings output
- Output must be reviewed after every run

The source document (`raw/new mds/EDS LOAD BENEFICIARY REQUIREMENTS 06-17-2011.md.txt`, dated June 2011) exists but is currently empty. Note: the 2011 date means this document may describe legacy behavior — verify whether current procedures differ before relying on it.

## Full Documentation

When the source is populated and ingested, this page will cover: beneficiary-specific layout fields, required data elements (primary/contingent beneficiary, relationship, percentage), validation rules, and any special handling for plans with beneficiary data from a prior vendor.

## See Also
- [[eds]]
- [[loading-eligibility-eds]]
- [[loading-ytd-contributions-eds]]
- [[final-files-processing]]
