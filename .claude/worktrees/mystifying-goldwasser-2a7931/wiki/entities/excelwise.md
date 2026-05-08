---
title: "Excelwise"
type: entity
tags: [vendor, financial-guidelines, advice-platform]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Excelwise

Financial Guidelines advice platform offered as a plan-level subscription.

## Overview

Excelwise is the advice / Financial Guidelines platform Transamerica offers plan sponsors. When a plan subscribes, the subscription is tracked in participant service data so eligible participants can use the service.

## Key Facts

- Financial Guidelines subscription → tracked as `SERV_TYP_C = 6007`
- Plan-level subscription stored in **PART_SERVICE_DATA**
- Used by [[com]] as the Project Plan tool for PEP plans (per [[project-plan-com]])

## Role in Operations

Two contexts:

1. **As a plan-sponsor-facing service** — plans subscribe; eligible participants access Excelwise Financial Guidelines. Presence of SERV_TYP_C 6007 in PART_SERVICE_DATA signals the subscription is active.
2. **As the PEP project-plan platform** — [[com]] uses Excelwise as the project-plan format for PEP plans (Active Project Plan is used for non-PEP plans).

## Connections

- [[com]] — uses Excelwise for PEP project plans
- [[project-plan-com]] — documents the PEP-vs-non-PEP split
- [[excelwise-default-election-check]] — query that validates default-election setup on Excelwise-subscribed plans

## Open Questions

- Whether "Excelwise" the subscription service and "Excelwise" the project-plan platform are the same vendor or share only a name
- Full list of subscription service types beyond 6007
- Relationship to TA's other advice offerings

## See Also

- [[com]]
- [[project-plan-com]]
- [[excelwise-default-election-check]]
