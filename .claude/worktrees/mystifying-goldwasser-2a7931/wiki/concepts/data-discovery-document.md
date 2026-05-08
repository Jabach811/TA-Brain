---
title: "Data Discovery Document"
type: concept
tags: [data, discovery, document, prior-rk, process]
created: 2026-04-16
updated: 2026-04-17
sources: 1
---

# Data Discovery Document

A structured intake form used early in the conversion process to identify and catalog what participant data the prior record keeper (or client) can actually provide — before EDS layouts are built or test files are requested.

## Definition

The Data Discovery Document is a pre-conversion data inventory. The DC uses it to establish exactly which data fields are available from the prior vendor, in what format, and with what level of completeness. This drives decisions about how to set up EDS layouts, which sources can be mapped, and what data gaps the client may need to fill directly.

The source file in the main-dump batch (`Data Discovery Document (New).md.txt`) is title-only — the "New" suffix suggests there is a revised version of the template in circulation, though the content was not included in this ingest.

## Why It Matters

Setting up EDS layouts and requesting test files is wasted effort if the DC doesn't first know what the prior RK can actually provide. The Data Discovery Document surfaces data gaps early — giving the team time to go back to the client for missing data before liquidation day pressure begins.

## Typical Scope

| Data Category | Questions Answered |
|---------------|-------------------|
| Participant demographics | SSN format, name fields, address availability |
| Contribution sources | How many sources, source code format, YTD availability |
| Fund balances | Fund code format, breakdown level (fund vs. source), loan fund separation |
| Eligibility data | Whether prior RK tracks eligibility dates, plan entry dates |
| Loan data | Loan header fields available, repayment schedule format |
| Beneficiary data | Whether beneficiary designations will be transferred |
| Hours data | Whether hours are tracked and in what format |
| Basis data | Whether Roth / after-tax basis is tracked |

## Process

Sent to the prior record keeper early — ideally in the initial "hello" email alongside the questionnaire — so the DC knows what to expect before setting up layouts. The responses inform which EDS layouts need to be built and what test files to request.

## Evidence / Examples

- Source: `Data Discovery Document (New).md.txt` — title-only; revised template referenced but content not included

## Related Concepts

- [[prior-record-keeper]] — the entity this document is sent to
- [[base-file]] — the census template; populated using data the discovery process reveals
- [[eds]] — layouts are configured based on what data discovery confirms is available
- [[source-mapping]] — source codes identified during data discovery
- [[loading-eligibility-eds]] — eligibility loading depends on what fields the prior RK can provide
- [[faa-dc-data-requirements]] — the parallel FAA-specific data spec

## See Also
- [[prior-record-keeper]]
- [[base-file]]
- [[eds]]
- [[source-mapping]]
- [[faa-dc-data-requirements]]
- [[main-dump-batch-2026-04-17]]
