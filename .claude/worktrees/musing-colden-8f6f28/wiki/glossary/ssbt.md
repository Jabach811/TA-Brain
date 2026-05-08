---
title: "SSBT"
type: glossary
tags: [glossary, wire, banking, external]
created: 2026-04-15
updated: 2026-04-15
sources: 1
---

# SSBT

**Full Name:** State Street Bank & Trust

## Definition

SSBT is the external custodial bank through which incoming wires from prior record keepers are received during plan conversions. The [[fund-management-calendar]] SSBT cut-off is **4:00 PM EST** — trades submitted after this time are not processed same-day. [[cashiering]] pulls wires from SSBT at 7 AM, 9 AM, 1 PM, and 3 PM CST; wires received after the 3 PM pull are deposited the next business day.

## Used By

- [[cashiering]] — receives and books wires from SSBT
- [[lm-dc]] — monitors for wire confirmation; must update [[fund-management-calendar]] before the 4 PM EST cut-off on liquidation day

## See Also

- [[cashiering]]
- [[liquidation-day]]
- [[fund-management-calendar]]
- [[wire-instructions]]
