---
title: "Test Participants Procedure"
type: concept
tags: [concept, testing, dummy-participant, eds, p3]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Test Participants Procedure

The procedure for loading dummy/test participants into P3 before go-live so that plan logic, reporting, and call-center views can be validated without real participant data.

## Definition

Per `PROCEDURES%20FOR%20LOADING%20TEST%20PARTICIPANTS.md.txt`, the DC builds an [[eds]] layout, maps spreadsheet columns to the layout, loads the file, reviews status, and validates the resulting participants in the Call Center view.

## Process

1. Build EDS layout
2. Map spreadsheet columns to layout fields
3. Load the file via EDS
4. Review load status for errors
5. Validate participants in the Call Center view

## Why It Matters

Production-like testing requires representative participant records. Test participants let the DC exercise plan setup — eligibility calculation, deferral posting, TDF assignment, loan eligibility — against known inputs with known expected outputs. This is essential before real data arrives.

See [[dummy-participant]] for the adjacent concept of pre-go-live test/dummy records and the broader pattern they support.

## Related Concepts

- [[dummy-participant]] — the pre-go-live stand-in concept
- [[eds]] — load mechanism

## See Also

- [[p3]]
- [[lm-dc]]
