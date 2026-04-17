---
title: "Contribution Monitoring Form"
type: concept
tags: [concept, document, com, tc, payroll, tfs]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Contribution Monitoring Form

A payroll setup document used for TFS (Total File Solution?) plans that establishes contribution monitoring. The [[com]] manages the full routing workflow; completion requires [[tc]] to flip a specific AWD system setting.

## Definition

For plans that require contribution monitoring (tagged "TFS" in the COM checklist), the Contribution Monitoring Form is the document that establishes the monitoring configuration. Once completed and returned by the client, the form is stored in FILESERVE and TC is notified to activate the monitoring in the AWD system.

## Workflow

1. COM sends Contribution Monitoring Form to client for completion
2. Client completes and returns the form
3. COM emails TC with a specific template ("Contribution Monitoring - Flip AWD") to flip the AWD setting to "Yes"
4. TC confirms AWD flip is complete
5. COM saves the completed form to its folder
6. COM loads the contribution form to FILESERVE

## Why It Matters

The AWD flip step is a cross-team dependency that can delay payroll setup if not coordinated promptly. The COM owns the routing but the actual system action lives with TC. If this step is missed, contribution monitoring will not function at go-live.

## Open Questions

- What "TFS" stands for — possibly "Total File Solution" or similar
- What AWD tracks (AWD full name: All Working Data — confirmed in DC brain dump)
- What contribution monitoring actually monitors vs. standard payroll processing

## Related Concepts

- [[rdd-form]] — related TC-managed payroll setup form
- [[tc]] — executes the AWD flip
- [[payroll-support]] — OnePayroll Team; handles payroll test validation

## See Also

- [[com]]
- [[tc]]
- [[rdd-form]]
