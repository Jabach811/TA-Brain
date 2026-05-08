---
title: "JIRA"
type: entity
tags: [system, ticketing, atlassian, batch-jobs]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# JIRA

Atlassian ticketing system used to trigger batch jobs — notably enrollment confirm release.

## Overview

JIRA is the standard Atlassian issue tracker used internally at Transamerica for a narrow but important operational purpose: triggering batch jobs. The documented case is enrollment confirm release (Welcome Kit confirms), where a JIRA ticket kicks off the batch job that generates and releases the confirms.

## Key Facts

- Atlassian JIRA (the standard product)
- Known use: trigger batch jobs for enrollment confirm release (Welcome Confirm Samples)
- Works alongside [[roc-tool]] — ROC handles the stored procedure for confirm generation; JIRA triggers the batch that releases the finished confirms

## Role in Operations

JIRA fills the "kick off the nightly-batch or on-demand job" slot that is distinct from Serena (change management) and AWD (data corrections). When a process needs a platform-level batch to run, JIRA is the ticket system.

## Connections

- [[roc-tool]] — often paired with JIRA for confirm-generation flows
- [[p3]] — batches jobs against P3 data
- Welcome Confirm Samples / enrollment kit flows — the documented JIRA use case

## Open Questions

- Full catalog of batch jobs triggered via JIRA
- Who has permission to open these tickets
- Project / board structure in Transamerica's JIRA instance

## See Also

- [[roc-tool]]
- [[p3]]
- [[serena]]
