---
title: "DDOL and VRU"
type: concept
tags: [concept, participant-access, ddol, vru, roc-tool, self-service]
created: 2026-04-17
updated: 2026-04-17
sources: 3
---

# DDOL and VRU

The two participant self-service channels at Transamerica — **DDOL** (Direct-Dial Online) and **VRU** (Voice Response Unit) — that can be selectively disabled via [[roc-tool]] when participant access must be blocked.

## Definition

DDOL is the online/web self-service channel. VRU is the automated phone self-service channel. Together they are the two primary non-CSR (non-Customer Service Representative) ways participants interact with their accounts. Both can be disabled at the participant level via ROC procedures when an account has a legal, compliance, or data-integrity issue that requires restricted access.

## Why It Matters

Certain situations require immediately cutting off a participant's ability to transact while the issue is investigated:

- **Duplicate SSN** — same SSN found on multiple records; self-service disabled until resolved (see [[duplicate-ssn-cycle]])
- **Legal holds** — compliance restrictions that require no participant-initiated activity (see [[legal-holds]])
- **Default allocation or deferral errors** — sometimes trigger temporary restrictions while the DC investigates (see [[default-allocation-analysis]])

Disabling DDOL/VRU does not lock the account — participants can still call in and speak to a CSR, who sees the restriction and handles the call manually.

## How They're Toggled

Per `Dup%20SSN%20Process%20-%20DISABLE.md.txt` and `Dup%20SSN%20Process%20-%20ENABLE.md.txt`, DDOL/VRU access is managed by running ROC procedures:

- `ROC_DUPLICATE_SSN_DISABLE` — disable access for duplicate-SSN records (run in both CORP and TDA)
- `ROC_DUPLICATE_SSN_ENABLE` — restore access once the issue is resolved

The enable/disable is coupled with [[legal-holds]] in the duplicate-SSN workflow.

## Evidence / Examples

- `Duplicate%20SSN%20Process.md.txt` lists disabling DDOL/VRU as Step 2 of the duplicate-SSN handling flow
- Self-service disablement applies only to the **converting** plan when a duplicate is found (per the same source)

## Related Concepts

- [[roc-tool]] — the mechanism
- [[duplicate-ssn-cycle]] — the most common trigger
- [[legal-holds]] — paired action
- [[default-allocation-analysis]] — secondary trigger

## See Also

- [[p3]]
- [[tc]]
