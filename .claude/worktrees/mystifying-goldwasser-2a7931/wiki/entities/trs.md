---
title: "TRS"
type: entity
tags: [vendor, mailing, enrollment-kits]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# TRS

Internal mailing house / kit distribution vendor that handles enrollment kit outsourcing.

## Overview

TRS is the vendor that Transamerica uses to print and mail enrollment kits when the plan sponsor elects not to self-mail. When enrollment kit outsourcing is active for a plan, the kits go to TRS for production and distribution to participants.

## Key Facts

- Handles enrollment kit mail outsourcing
- Invoked when the client does not self-mail kits
- Referenced in Eligibility / Auto-Enroll / Enrollment Kit services setup

## Role in Operations

TRS is downstream of [[com]] for plans that outsource enrollment kit mailing. COM confirms the mailing path during setup; if TRS is selected, the kit files and schedule flow to TRS for print and distribution.

## Connections

- [[com]] — owns the setup decision that routes kits to TRS
- [[enrollment-kit-outsourcing]] — the process page invoking TRS

## Open Questions

- What "TRS" stands for (Transamerica Retirement Solutions? Transamerica Retirement Services?)
- File formats and cutoffs required by TRS
- Cost model and SLA
- Relationship to internal Doc Ops

## See Also

- [[com]]
- [[enrollment-kit-outsourcing]]
