---
title: "Serena"
type: entity
tags: [system, ticketing, change-management]
created: 2026-04-17
updated: 2026-04-17
sources: 2
---

# Serena

Change-management ticketing system for Database Changes and the Plus application.

## Overview

Serena is the tool used to request controlled changes to Transamerica databases and applications — specifically Database Change tickets against the Plus application. It is distinct from AWD (which [[lm-dc]] and [[prod-support]] use for data corrections) and from JIRA (used for batch-job triggers). Serena sits in the change-management lane.

## Key Facts

- Ticket category used: **Project = Database Change, Application = Plus**
- Known use: enabling EFT Confirms for DB plans (effective with first payment)
- Ticket submitter: [[tc]] (Transition Consultant)
- Approval required: client request + manager approval before ticket submission

## Role in Operations

Serena is the official route for enabling platform-level features that are off by default. The canonical example is EFT Confirms for Defined Benefit plans: not mailed by default, enabled only on client request and with manager approval, via a Serena ticket opened by the TC. See ETF Confirms for DB Plans.md.txt.

## Connections

- [[tc]] — primary submitter of Serena tickets for plan-feature enablement
- [[prod-support]] — likely owner or heavy user of the Database Change category
- [[db-plan-setup]] — the process that most commonly invokes Serena

## Open Questions

- Other categories of Serena tickets in use beyond Database Change / Plus
- Approval routing and SLA
- Whether DCs ever submit Serena tickets directly, or always go through TC

## See Also

- [[tc]]
- [[prod-support]]
- [[db-plan-setup]]
- [[jira]]
