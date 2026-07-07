---
title: "Go Live Checklist"
type: concept
tags: [concept, go-live, limited-access, full-access, tc, audit]
created: 2026-05-13
updated: 2026-05-13
sources: 1
---

# Go Live Checklist

TC/QC control checklist for turning on limited access or full access during conversion.

## Definition

The go-live checklist is a structured control gate before enabling participant access in DDOL/VRU and related plan services. It separates limited access, limited access close, full access, and post-go-live cleanup.

> [!warning] Source status
> Built from legacy TC material. Use as a checklist model and risk map until confirmed against current procedure.

## Why It Matters

Access activation changes what participants and plan sponsors can do. If DDOL/VRU, outbound files, enrollment confirms, managed advice, PX/CMP/MA settings, or case notes are wrong at activation, the plan can go live with participant-facing errors.

## Evidence / Examples

### Limited Access

- Verify PX glidepath, CMP, MA, or AMA setup in P3.
- Confirm first system audit signoff.
- Confirm WX/DDOL form audit.
- Update case notes to show limited access.
- Notify COM that limited access is activated.
- Complete DDOL/VRU test participant and live participant audits.
- Activate outbound file if limited access includes deferrals.
- Enable or disable VRU, phone transfer, DDOL services, deferrals, allocations, beneficiaries, fund prospectus, personal info, catch-up calculator, SaveXpress, enrollments, PX, CMP, MA, unit values, OnTrack, and fund performance as strategy requires.
- Notify TRSC IM Asset Allocation Services Team when managed advice is enabled during limited access.

### Limited Access Close

- Disable DDOL/VRU access.
- Update case notes that limited access ended and plan is in blackout.
- Deactivate enrollment confirms.

### Full Access

- Reconfirm PX/CMP/MA setup and system audit signoff.
- Update case notes to show the plan is live.
- Notify TM/COM and the conversion team once the plan is live.
- Complete DDOL/VRU audits.
- Activate outbound file if deferrals are outsourced.
- Notify [[jen-curtin]] when custom or automated OBF is activated.
- Confirm VRU, phone transfer, DDOL, eligibility/enrollment kit, Loan PoG, Info Share tab, and Managed Advice notifications.

### Post-Go-Live Cleanup

- Activate welcome kits after samples are reviewed.
- Complete term kit cleanup only when appropriate.
- Take term kits off hold and update auto-cash-out provisions after welcome kits are released.
- Complete final system audit.
- Enable loan default logic after loan analysis.

## Related Concepts

- [[tc-conversion-timeline]]
- [[case-notes-template]]
- [[creative-planning-managed-accounts]]
- [[wx]]
- [[p3]]

## See Also

- [[tc]]
- [[qa]]
- [[plan-conversion-handoffs]]
- [[tc-stuff]]
