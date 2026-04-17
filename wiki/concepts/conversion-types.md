---
title: "Conversion Types"
type: concept
tags: [conversion, cash, mapping, transfer-in-kind, core]
created: 2026-04-14
updated: 2026-04-14
sources: 1
---

# Conversion Types

The three ways a plan's assets can be moved from a prior record keeper to TransAmerica. Conversion type is determined early in discovery and drives nearly every subsequent decision.

## The Three Types

### 1. Cash Conversion

**What it is:** All assets at the prior record keeper are liquidated (sold) and the resulting cash is wired to TransAmerica. Money is pooled and then distributed to participants based on their current investment elections.

**Key characteristics:**
- No fund mapping — assets arrive as cash, not as specific funds
- Participants' money is re-invested based on their current elections
- TOA will show no "from → to" fund mapping
- Simplest conversion type from a mapping standpoint

**Processing flow:**
1. Wire arrives → Cashiering confirms + provides ref number
2. DC verifies wire total matches breakdown
3. DC moves money to **Advanced Employer account** (temp holding)
4. Final files arrive → DC liquidates advanced employer → runs CIT balance workflow → posts participant balances
5. Process mode: **Immediate + Batch** (trades go out to invest the cash)
6. Reverse dummy participant via ROC tool

---

### 2. Mapping Conversion

**What it is:** Each fund at the prior record keeper is mapped to a specific fund at TransAmerica. Assets are liquidated and re-invested into the mapped destination funds.

**Key characteristics:**
- Fund mapping is required — defined in [[toa]]
- All funds liquidated and invested into mapped equivalents
- More complex than cash; simpler than TIK
- [[dummy-participant]] (SSN 999-00-00) required in census

**Processing flow:**
1. Wire arrives → totals match → create trans ref numbers
2. Fill CONV file (re-reg = N) → run Day of Wire workflow in [[informatica]]
3. Dummy account receives initial booking; trades go out
4. Final files arrive → post participant balances
5. Reverse dummy → process P3: **Online + No Hold** (no new trades — trades already went out)

**Important:** Trades go out during the Day of Wire step. When posting participant balances later, do NOT send trades again. Use Online + No Hold.

---

### 3. Transfer In Kind (TIK / Re-registration)

**What it is:** Specific funds are transferred directly as shares — no liquidation, no re-purchase. Shares are moved from one custodian (prior RK's custodian) to TransAmerica's custodian (Fidelity pooled accounts).

**Key characteristics:**
- Only applies to specific funds (identified in [[toa]], column T = "Y")
- A plan may have SOME funds TIK and SOME funds mapping/cash
- No trades occur — shares are physically moved
- [[matt-oconnell]]'s team must set up Fidelity accounts in advance (~10 business days)
- Shares are identified by expected amounts (not account numbers)

**Processing flow:**
1. TOA identifies TIK funds (column T = Y) → DC fills re-registration form → sends to Matt O'Connell
2. Matt's team sets up Fidelity pooled accounts
3. Day of Wire: CONV file (re-reg = Y) → creates placeholder in P3 (no details, no trades)
4. Shares arrive at Fidelity → Matt's team identifies them by expected amounts → pulls into plan
5. Final files arrive → DC updates share estimates → posts participant balances
6. Process mode: **Online + No Hold** (no trades — shares already transferred)

---

## Side-by-Side Comparison

| Attribute                 | Cash                  | Mapping         | Transfer In Kind    |
| ------------------------- | --------------------- | --------------- | ------------------- |
| Assets liquidated         | Yes                   | Yes             | No                  |
| Fund mapping required     | No                    | Yes             | Yes (for TIK funds) |
| TOA fund map              | No                    | Yes             | Yes (column T = Y)  |
| Trades on Day of Wire     | No (to adv. employer) | Yes (via dummy) | No                  |
| Trades on balance posting | Yes                   | No              | No                  |
| Dummy participant needed  | Yes                   | Yes             | No                  |
| Matt O'Connell involved   | No                    | No              | Yes                 |
| CONV file re-reg field    | N/A                   | N               | Y                   |
| Advanced Employer used    | Yes                   | No              | No                  |
| Fidelity pooled accounts  | No                    | No              | Yes                 |

> A single plan can have a combination: some funds TIK, others mapping, others cash. The CONV file handles this per-fund.

## Determining Conversion Type

- Identified during discovery (PRD/onboarding package review)
- Confirmed in the [[toa]] (TOA structure reveals the conversion strategy)
- [[subpack]] should also specify it

## See Also

- [[toa]]
- [[fund-mapping]]
- [[liquidation-day]]
- [[final-files-processing]]
- [[dummy-participant]]
- [[transfer-in-kind]]
- [[matt-oconnell]]
- [[informatica]]
