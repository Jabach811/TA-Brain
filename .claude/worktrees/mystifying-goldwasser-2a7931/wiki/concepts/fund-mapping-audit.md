---
title: "Fund Mapping Audit"
type: concept
tags: [concept, audit, qa, fund-mapping, conversion]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Fund Mapping Audit

The QA audit that validates the prior-vendor-to-TA fund-to-fund mapping against the signed [[toa]] before the mapping is used to post assets.

## Definition

The Fund Mapping Audit is a [[qa]]-owned mapping-validation audit that confirms every fund mapping on the DC's fund map ties back correctly to the client-signed [[toa]]. It is run before the mapping is used downstream by [[day-of-wire-audit]], [[faa-balances]], or [[fund-split-worksheet]] (source: `Fund Mapping Audit.md.txt`).

## Why It Matters

Mapping errors at this stage propagate everywhere: wire-day postings land in the wrong funds, participant balances reconcile to the wrong tickers, and TIK re-registrations can be routed to the wrong vehicle. The Fund Mapping Audit is the earliest gate where these errors are cheap to fix — once assets are posted, a mapping error becomes a reversal.

## Evidence / Examples

Review items enumerated by QA (source: `Fund Mapping Audit.md.txt`):

- **Fund codes and names** — prior vendor codes matched to TA codes
- **Tickers and CUSIPs** — confirm correct security is being mapped
- **Descriptor codes** — plan-level fund setup
- **Re-registrations** — for TIK conversions, confirm the receiving TA vehicle matches the re-reg form

The audit is tightly coupled to the [[fund-mapping]] concept and the [[toa]] document — it exists specifically to catch drift between what the client signed and what the DC built.

## Counterarguments

Fund splits can produce expected errors in the downstream [[faa-balances]] audit. QA does not treat those as Fund Mapping Audit failures; the [[fund-split-worksheet]] exists to resolve them separately.

## Related Concepts

- [[fund-mapping]]
- [[toa]]
- [[source-mapping-audit]]
- [[day-of-wire-audit]]
- [[faa-balances]]
- [[fund-split-worksheet]]
- [[audit-pack]]

## See Also

- [[qa]]
- [[lm-dc]]
- [[cit-takeover-audit]]
