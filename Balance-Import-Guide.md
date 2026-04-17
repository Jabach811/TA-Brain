---
marp: true
theme: default
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Raleway:wght@100;200;300&display=swap');
  section { background: #000; color: #fff; font-family: 'Raleway', sans-serif; font-weight: 200; padding: 52px 68px; line-height: 1.5; }
  h1 { font-family: 'Outfit'; font-weight: 800; font-size: 2.8em; color: #fff; letter-spacing: -0.03em; line-height: 1.05; margin: 0 0 4px; }
  h2 { font-family: 'Raleway'; font-weight: 100; font-size: 1.15em; color: #555; margin: 0 0 22px; }
  h3 { font-family: 'Outfit'; font-weight: 600; font-size: 0.58em; color: #444; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 6px; }
  strong { color: #fff; font-weight: 400; }
  section.lead { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
  section.lead h1 { font-size: 3.6em; }
  section::after { font-family: 'Outfit'; font-size: 0.55em; color: #1a1a1a; }
  ul { padding-left: 0; list-style: none; }
  ul li { font-size: 0.78em; color: #888; margin-bottom: 6px; padding-left: 16px; position: relative; }
  ul li::before { content: '—'; position: absolute; left: 0; color: #333; }
footer: ''
---

<!-- _class: lead -->

<div style="margin-bottom: 24px;">
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="1.2">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6"/>
  </svg>
</div>

# Balance Import Guide

## Cash · Mapping · Transfer in Kind

<div style="margin-top: 28px; display: flex; gap: 20px; justify-content: center;">
  <span style="font-family:'Outfit'; font-weight:600; font-size:0.62em; color:#0ea5e9; background:#0ea5e910; border:1px solid #0ea5e930; border-radius:6px; padding:4px 14px; letter-spacing:0.1em;">CASH</span>
  <span style="font-family:'Outfit'; font-weight:600; font-size:0.62em; color:#059669; background:#05966910; border:1px solid #05966930; border-radius:6px; padding:4px 14px; letter-spacing:0.1em;">MAPPING</span>
  <span style="font-family:'Outfit'; font-weight:600; font-size:0.62em; color:#d97706; background:#d9770610; border:1px solid #d9770630; border-radius:6px; padding:4px 14px; letter-spacing:0.1em;">TRANSFER IN KIND</span>
</div>

---

### The 3 Import Types

<div style="display:flex; gap:12px; margin-top:14px;">

  <div style="flex:1; background:#080808; border:1px solid #111; border-radius:12px; padding:22px; border-top:3px solid #0ea5e9;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6"/></svg>
      <span style="font-family:'Outfit'; font-weight:700; font-size:0.9em; color:#0ea5e9;">Cash</span>
      <span style="font-family:'Outfit'; font-size:0.52em; color:#333; background:#111; border-radius:4px; padding:2px 8px;">SIMPLEST</span>
    </div>
    <div style="font-size:0.72em; color:#666; line-height:1.7;">
      Assets <span style="color:#888;">liquidated</span> at prior RK<br>
      Wired as <span style="color:#888;">cash</span><br>
      Lands in <span style="color:#0ea5e9;">Advance Employer</span> acct<br>
      Then distributed to participants
    </div>
    <div style="margin-top:16px; padding-top:14px; border-top:1px solid #111;">
      <div style="font-family:'Outfit'; font-size:0.52em; color:#333; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px;">Requires</div>
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        <span style="font-family:'Outfit'; font-size:0.5em; color:#0ea5e9; background:#0ea5e910; border:1px solid #0ea5e920; border-radius:4px; padding:3px 8px;">Source Mapping</span>
        <span style="font-family:'Outfit'; font-size:0.5em; color:#333; background:#111; border-radius:4px; padding:3px 8px;">No Fund Mapping</span>
      </div>
    </div>
  </div>

  <div style="flex:1; background:#080808; border:1px solid #111; border-radius:12px; padding:22px; border-top:3px solid #059669;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5"><path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
      <span style="font-family:'Outfit'; font-weight:700; font-size:0.9em; color:#059669;">Mapping</span>
      <span style="font-family:'Outfit'; font-size:0.52em; color:#333; background:#111; border-radius:4px; padding:2px 8px;">MODERATE</span>
    </div>
    <div style="font-size:0.72em; color:#666; line-height:1.7;">
      Assets mapped <span style="color:#888;">fund-to-fund</span><br>
      Per <span style="color:#059669;">TOA instructions</span><br>
      QA-approved mapping doc<br>
      Mapping reversal post-wire
    </div>
    <div style="margin-top:16px; padding-top:14px; border-top:1px solid #111;">
      <div style="font-family:'Outfit'; font-size:0.52em; color:#333; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px;">Requires</div>
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        <span style="font-family:'Outfit'; font-size:0.5em; color:#059669; background:#05966910; border:1px solid #05966920; border-radius:4px; padding:3px 8px;">Source Mapping</span>
        <span style="font-family:'Outfit'; font-size:0.5em; color:#059669; background:#05966910; border:1px solid #05966920; border-radius:4px; padding:3px 8px;">Fund Mapping</span>
      </div>
    </div>
  </div>

  <div style="flex:1; background:#080808; border:1px solid #111; border-radius:12px; padding:22px; border-top:3px solid #d97706;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
      <span style="font-family:'Outfit'; font-weight:700; font-size:0.9em; color:#d97706;">Transfer in Kind</span>
      <span style="font-family:'Outfit'; font-size:0.52em; color:#333; background:#111; border-radius:4px; padding:2px 8px;">COMPLEX</span>
    </div>
    <div style="font-size:0.72em; color:#666; line-height:1.7;">
      Securities transferred <span style="color:#888;">in-kind</span><br>
      <span style="color:#d97706;">Not liquidated</span><br>
      Re-registration required<br>
      Matt O'Connell team setup
    </div>
    <div style="margin-top:16px; padding-top:14px; border-top:1px solid #111;">
      <div style="font-family:'Outfit'; font-size:0.52em; color:#333; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px;">Requires</div>
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        <span style="font-family:'Outfit'; font-size:0.5em; color:#d97706; background:#d9770610; border:1px solid #d9770620; border-radius:4px; padding:3px 8px;">Source Mapping</span>
        <span style="font-family:'Outfit'; font-size:0.5em; color:#d97706; background:#d9770610; border:1px solid #d9770620; border-radius:4px; padding:3px 8px;">Fund Mapping</span>
        <span style="font-family:'Outfit'; font-size:0.5em; color:#d97706; background:#d9770610; border:1px solid #d9770620; border-radius:4px; padding:3px 8px;">Re-Registration</span>
      </div>
    </div>
  </div>

</div>

---

### Shared Foundation — All 3 Types

# Every case starts here.

<div style="display:flex; gap:10px; margin-top:18px;">
  <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
    <div style="display:flex; align-items:flex-start; gap:12px; background:#080808; border:1px solid #111; border-radius:8px; padding:12px 16px;">
      <div style="font-family:'Outfit'; font-weight:700; font-size:0.65em; color:#333; min-width:20px;">01</div>
      <div><div style="font-family:'Outfit'; font-weight:600; font-size:0.72em; color:#fff;">Obtain signed TOA</div><div style="font-size:0.65em; color:#555; margin-top:2px;">Source of truth for everything — fund mapping, transfer planning, timing</div></div>
    </div>
    <div style="display:flex; align-items:flex-start; gap:12px; background:#080808; border:1px solid #111; border-radius:8px; padding:12px 16px;">
      <div style="font-family:'Outfit'; font-weight:700; font-size:0.65em; color:#333; min-width:20px;">02</div>
      <div><div style="font-family:'Outfit'; font-weight:600; font-size:0.72em; color:#fff;">Send wire instructions to Prior RK — early</div><div style="font-size:0.65em; color:#555; margin-top:2px;">Critical for asset transfer coordination — do not wait</div></div>
    </div>
    <div style="display:flex; align-items:flex-start; gap:12px; background:#080808; border:1px solid #111; border-radius:8px; padding:12px 16px;">
      <div style="font-family:'Outfit'; font-weight:700; font-size:0.65em; color:#333; min-width:20px;">03</div>
      <div><div style="font-family:'Outfit'; font-weight:600; font-size:0.72em; color:#fff;">Confirm asset transfer date with Prior RK</div><div style="font-size:0.65em; color:#555; margin-top:2px;">Sets the timeline for all downstream prep work</div></div>
    </div>
  </div>
  <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
    <div style="display:flex; align-items:flex-start; gap:12px; background:#080808; border:1px solid #111; border-radius:8px; padding:12px 16px;">
      <div style="font-family:'Outfit'; font-weight:700; font-size:0.65em; color:#333; min-width:20px;">04</div>
      <div><div style="font-family:'Outfit'; font-weight:600; font-size:0.72em; color:#fff;">Request test files from Prior RK — ASAP</div><div style="font-size:0.65em; color:#555; margin-top:2px;">Needed to build source mapping and validate real source balances</div></div>
    </div>
    <div style="display:flex; align-items:flex-start; gap:12px; background:#080808; border:1px solid #111; border-radius:8px; padding:12px 16px;">
      <div style="font-family:'Outfit'; font-weight:700; font-size:0.65em; color:#333; min-width:20px;">05</div>
      <div><div style="font-family:'Outfit'; font-weight:600; font-size:0.72em; color:#fff;">Complete Source Mapping from test files</div><div style="font-size:0.65em; color:#555; margin-top:2px;">Send to QA / TC / TM immediately upon completion</div></div>
    </div>
    <div style="display:flex; align-items:flex-start; gap:12px; background:#080808; border:1px solid #111; border-radius:8px; padding:12px 16px;">
      <div style="font-family:'Outfit'; font-weight:700; font-size:0.65em; color:#333; min-width:20px;">06</div>
      <div><div style="font-family:'Outfit'; font-weight:600; font-size:0.72em; color:#fff;">Run balance prep &amp; workflow queries on test files</div><div style="font-size:0.65em; color:#555; margin-top:2px;">Build Informatica parameter files for each workflow type in advance</div></div>
    </div>
  </div>
</div>

---

### Cash Import

# 💵 Cash Conversion

<div style="display:flex; gap:12px; margin-top:16px;">

  <div style="flex:1; background:#080808; border:1px solid #0ea5e920; border-radius:10px; padding:18px;">
    <div style="font-family:'Outfit'; font-weight:600; font-size:0.55em; color:#0ea5e9; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:12px;">Phase 3 — Prep</div>
    <div style="display:flex; flex-direction:column; gap:7px;">
      <div style="display:flex; align-items:center; gap:8px; font-size:0.7em; color:#888;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        Source Mapping — required
      </div>
      <div style="display:flex; align-items:center; gap:8px; font-size:0.7em; color:#444;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        Fund Mapping — NOT needed
      </div>
      <div style="display:flex; align-items:center; gap:8px; font-size:0.7em; color:#444;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        Re-registration — not applicable
      </div>
    </div>
  </div>

  <div style="flex:1; background:#080808; border:1px solid #0ea5e920; border-radius:10px; padding:18px;">
    <div style="font-family:'Outfit'; font-weight:600; font-size:0.55em; color:#0ea5e9; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:12px;">Wire Day</div>
    <div style="display:flex; flex-direction:column; gap:7px;">
      <div style="font-size:0.68em; color:#666;"><span style="color:#555;">−3 days</span> — Advance heads-up to vendor &amp; Cashiering</div>
      <div style="font-size:0.68em; color:#666;">Day of — Request wire breakdown ASAP from vendor</div>
      <div style="font-size:0.68em; color:#666;">Book wire in system → notify Cashiering</div>
      <div style="font-size:0.68em; color:#0ea5e9;">Process all incoming assets → <strong style="color:#0ea5e9;">Advance Employer account</strong></div>
    </div>
  </div>

  <div style="flex:1; background:#080808; border:1px solid #0ea5e920; border-radius:10px; padding:18px;">
    <div style="font-family:'Outfit'; font-weight:600; font-size:0.55em; color:#0ea5e9; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:12px;">Post-Wire</div>
    <div style="display:flex; flex-direction:column; gap:7px;">
      <div style="font-size:0.68em; color:#666;">Receive final files — confirm completeness</div>
      <div style="font-size:0.68em; color:#888;"><span style="color:#0ea5e9;">①</span> Liquidate Advance Employer account</div>
      <div style="font-size:0.68em; color:#888;"><span style="color:#0ea5e9;">②</span> Process liquidation proceeds → participant accounts</div>
      <div style="font-size:0.68em; color:#888;"><span style="color:#0ea5e9;">③</span> Verify participant account balances</div>
      <div style="font-size:0.68em; color:#888;"><span style="color:#0ea5e9;">④</span> Complete final reconciliation</div>
    </div>
  </div>

</div>

<div style="margin-top:14px; background:#0ea5e908; border:1px solid #0ea5e920; border-radius:8px; padding:10px 16px; font-size:0.68em; color:#555;">
  <span style="color:#0ea5e9; font-family:'Outfit'; font-weight:600;">Key rule:</span> All assets go to the Advance Employer account first — no direct participant routing on wire day.
</div>

---

### Mapping Import

# 🗺️ Fund Mapping Conversion

<div style="display:flex; gap:12px; margin-top:16px;">

  <div style="flex:1; background:#080808; border:1px solid #05966920; border-radius:10px; padding:18px;">
    <div style="font-family:'Outfit'; font-weight:600; font-size:0.55em; color:#059669; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:12px;">Phase 3 — Prep</div>
    <div style="display:flex; flex-direction:column; gap:7px;">
      <div style="font-size:0.68em; color:#666;">Build Fund Mapping from signed TOA → QA / TC / TM</div>
      <div style="font-size:0.68em; color:#666;">Build Source Mapping from test files → QA / TC / TM</div>
      <div style="font-size:0.68em; color:#666;">Validate mapping in <span style="color:#888;">Informatica developer mode</span></div>
      <div style="font-size:0.68em; color:#666;">Handle re-registration if any funds are re-registering</div>
      <div style="display:flex; align-items:center; gap:8px; font-size:0.68em; color:#333; margin-top:4px;">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f5a623" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Do not use until QA approves the mapping doc
      </div>
    </div>
  </div>

  <div style="flex:1; background:#080808; border:1px solid #05966920; border-radius:10px; padding:18px;">
    <div style="font-family:'Outfit'; font-weight:600; font-size:0.55em; color:#059669; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:12px;">Wire Day</div>
    <div style="display:flex; flex-direction:column; gap:7px;">
      <div style="font-size:0.68em; color:#666;">−3 days — Advance heads-up to vendor &amp; Cashiering</div>
      <div style="font-size:0.68em; color:#666;">Day of — Request wire breakdown ASAP</div>
      <div style="font-size:0.68em; color:#666;">Book wire in system → notify Cashiering</div>
      <div style="font-size:0.68em; color:#059669;">Apply <strong style="color:#059669;">fund mapping</strong> to incoming assets per QA-approved doc</div>
    </div>
  </div>

  <div style="flex:1; background:#080808; border:1px solid #05966920; border-radius:10px; padding:18px;">
    <div style="font-family:'Outfit'; font-weight:600; font-size:0.55em; color:#059669; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:12px;">Post-Wire</div>
    <div style="display:flex; flex-direction:column; gap:7px;">
      <div style="font-size:0.68em; color:#666;">Receive final files — confirm completeness</div>
      <div style="font-size:0.68em; color:#888;"><span style="color:#059669;">①</span> Process mapping reversal</div>
      <div style="font-size:0.68em; color:#888;"><span style="color:#059669;">②</span> Apply fund mapping to participant accounts</div>
      <div style="font-size:0.68em; color:#888;"><span style="color:#059669;">③</span> Verify participant account balances</div>
      <div style="font-size:0.68em; color:#888;"><span style="color:#059669;">④</span> Complete final reconciliation</div>
    </div>
  </div>

</div>

<div style="margin-top:14px; background:#05966908; border:1px solid #05966920; border-radius:8px; padding:10px 16px; font-size:0.68em; color:#555;">
  <span style="color:#059669; font-family:'Outfit'; font-weight:600;">Key rule:</span> The mapping reversal happens post-wire — fund mapping applies twice: once on wire day to incoming assets, once post-wire to participant accounts.
</div>

---

### Transfer in Kind

# 📦 TIK Conversion

<div style="display:flex; gap:12px; margin-top:16px;">

  <div style="flex:1.1; background:#080808; border:1px solid #d9770620; border-radius:10px; padding:18px;">
    <div style="font-family:'Outfit'; font-weight:600; font-size:0.55em; color:#d97706; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:12px;">Phase 3 — Prep (starts ~3 wks before)</div>
    <div style="display:flex; flex-direction:column; gap:7px;">
      <div style="font-size:0.67em; color:#666;">Build Fund Mapping from TOA → QA / TC / TM</div>
      <div style="font-size:0.67em; color:#666;">Build Source Mapping from test files → QA / TC / TM</div>
      <div style="font-size:0.67em; color:#d97706;">Submit re-registration form → Matt O'Connell's team</div>
      <div style="font-size:0.67em; color:#666;">Wait for account setup confirmation <span style="color:#444;">(SLA: D1 +22 days)</span></div>
      <div style="font-size:0.67em; color:#666;">Forward re-registered account details to vendor</div>
      <div style="font-size:0.67em; color:#666;">Update expected share tracker <span style="color:#d97706;">immediately</span> on final file receipt</div>
    </div>
  </div>

  <div style="flex:0.9; display:flex; flex-direction:column; gap:10px;">
  <div style="background:#080808; border:1px solid #d9770620; border-radius:10px; padding:16px;">
    <div style="font-family:'Outfit'; font-weight:600; font-size:0.55em; color:#d97706; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:10px;">Wire Day</div>
    <div style="display:flex; flex-direction:column; gap:6px;">
      <div style="font-size:0.67em; color:#666;">Same advance heads-up sequence (−3 days)</div>
      <div style="display:flex; align-items:center; gap:7px; font-size:0.67em; color:#ef4444;">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
        Do NOT transfer until accounts confirmed
      </div>
    </div>
  </div>
  <div style="background:#080808; border:1px solid #d9770620; border-radius:10px; padding:16px;">
    <div style="font-family:'Outfit'; font-weight:600; font-size:0.55em; color:#d97706; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:10px;">Post-Wire</div>
    <div style="display:flex; flex-direction:column; gap:6px;">
      <div style="font-size:0.67em; color:#666;">Receive final files — confirm completeness</div>
      <div style="font-size:0.67em; color:#d97706;">Process TIK → participant accounts once Matt O'Connell confirms</div>
      <div style="font-size:0.67em; color:#666;">Verify balances + final reconciliation</div>
    </div>
  </div>
  </div>

</div>

---

### Mapping Deep Dive

# Source vs Fund Mapping

<div style="display:flex; gap:16px; margin-top:18px;">

  <div style="flex:1; background:#080808; border:1px solid #111; border-radius:12px; padding:22px; position:relative; overflow:hidden;">
    <div style="position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg, #0ea5e9, transparent);"></div>
    <div style="font-family:'Outfit'; font-weight:700; font-size:0.82em; color:#fff; margin-bottom:4px;">Source Mapping</div>
    <div style="font-family:'Outfit'; font-size:0.55em; color:#0ea5e9; margin-bottom:14px; letter-spacing:0.08em;">REQUIRED FOR ALL 3 TYPES</div>
    <div style="display:flex; flex-direction:column; gap:9px;">
      <div style="font-size:0.72em; color:#666; display:flex; gap:8px;"><span style="color:#333;">→</span> Built from <span style="color:#888;">test files</span></div>
      <div style="font-size:0.72em; color:#666; display:flex; gap:8px;"><span style="color:#333;">→</span> Cross-walk so Informatica can route source data correctly</div>
      <div style="font-size:0.72em; color:#666; display:flex; gap:8px;"><span style="color:#333;">→</span> Send to QA / TC / TM <span style="color:#0ea5e9;">immediately</span> on completion</div>
      <div style="font-size:0.72em; color:#666; display:flex; gap:8px;"><span style="color:#333;">→</span> Vendor keys populated from test files — wait for them if needed</div>
    </div>
  </div>

  <div style="flex:1; background:#080808; border:1px solid #111; border-radius:12px; padding:22px; position:relative; overflow:hidden;">
    <div style="position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg, #059669, transparent);"></div>
    <div style="font-family:'Outfit'; font-weight:700; font-size:0.82em; color:#fff; margin-bottom:4px;">Fund Mapping</div>
    <div style="font-family:'Outfit'; font-size:0.55em; color:#059669; margin-bottom:14px; letter-spacing:0.08em;">MAPPING &amp; TIK ONLY — NOT CASH</div>
    <div style="display:flex; flex-direction:column; gap:9px;">
      <div style="font-size:0.72em; color:#666; display:flex; gap:8px;"><span style="color:#333;">→</span> Built from the <span style="color:#888;">signed TOA</span></div>
      <div style="font-size:0.72em; color:#666; display:flex; gap:8px;"><span style="color:#333;">→</span> Cross-walk: maps prior RK funds → receiving funds</div>
      <div style="font-size:0.72em; color:#666; display:flex; gap:8px;"><span style="color:#333;">→</span> Send to QA / TC / TM for review and approval</div>
      <div style="font-size:0.72em; color:#666; display:flex; gap:8px;"><span style="color:#333;">→</span> Validate structure in <span style="color:#059669;">Informatica developer mode</span> before final use</div>
    </div>
  </div>

</div>

<div style="margin-top:16px; display:flex; gap:10px;">
  <div style="flex:1; background:#ef444408; border:1px solid #ef444420; border-radius:8px; padding:12px 16px;">
    <div style="display:flex; align-items:center; gap:8px; font-size:0.68em; color:#ef4444;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      <span style="font-family:'Outfit'; font-weight:600;">Common mistake:</span> Building fund mapping for a cash conversion. It's wasted work — and a flag that the conversion type wasn't confirmed early.
    </div>
  </div>
  <div style="flex:1; background:#05966908; border:1px solid #05966920; border-radius:8px; padding:12px 16px;">
    <div style="display:flex; align-items:center; gap:8px; font-size:0.68em; color:#059669;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span style="font-family:'Outfit'; font-weight:600;">Developer mode tip:</span> Workflow failures that look like a clean file are often hidden metadata issues. Always validate in dev mode before the final run.
    </div>
  </div>
</div>

---

### TIK Deep Dive

# Re-Registration Timeline

<div style="margin-top:18px; position:relative; padding-left:32px;">
  <div style="position:absolute; left:8px; top:8px; bottom:8px; width:1px; background:#1a1a1a;"></div>

  <div style="display:flex; align-items:flex-start; gap:14px; margin-bottom:18px; position:relative;">
    <div style="position:absolute; left:-28px; top:4px; width:10px; height:10px; border-radius:50%; background:#d97706; border:2px solid #000;"></div>
    <div style="background:#080808; border:1px solid #d9770620; border-radius:8px; padding:14px 18px; flex:1;">
      <div style="font-family:'Outfit'; font-weight:600; font-size:0.65em; color:#d97706; margin-bottom:4px;">~3 WEEKS BEFORE TRANSFER</div>
      <div style="font-size:0.72em; color:#888; line-height:1.6;">Determine which funds are re-registering. Complete re-registration form. Submit to <span style="color:#d97706;">Matt O'Connell's team</span>. Confirm receipt.</div>
    </div>
  </div>

  <div style="display:flex; align-items:flex-start; gap:14px; margin-bottom:18px; position:relative;">
    <div style="position:absolute; left:-28px; top:4px; width:10px; height:10px; border-radius:50%; background:#555; border:2px solid #000;"></div>
    <div style="background:#080808; border:1px solid #111; border-radius:8px; padding:14px 18px; flex:1;">
      <div style="font-family:'Outfit'; font-weight:600; font-size:0.65em; color:#666; margin-bottom:4px;">~1–2 WEEKS BEFORE TRANSFER</div>
      <div style="font-size:0.72em; color:#666; line-height:1.6;">Accounts should be <span style="color:#888;">ready and confirmed</span>. Forward re-registered account details to vendor. Do not open accounts too early — avoid stale open account time.</div>
    </div>
  </div>

  <div style="display:flex; align-items:flex-start; gap:14px; margin-bottom:18px; position:relative;">
    <div style="position:absolute; left:-28px; top:4px; width:10px; height:10px; border-radius:50%; background:#555; border:2px solid #000;"></div>
    <div style="background:#080808; border:1px solid #111; border-radius:8px; padding:14px 18px; flex:1;">
      <div style="font-family:'Outfit'; font-weight:600; font-size:0.65em; color:#666; margin-bottom:4px;">ON FINAL FILE RECEIPT</div>
      <div style="font-size:0.72em; color:#666; line-height:1.6;">Update expected share tracker <span style="color:#d97706;">immediately</span> — this is not a cleanup task. Treat final file receipt as the trigger. Matt may populate initial numbers; keep the tracker as the working record.</div>
    </div>
  </div>

  <div style="display:flex; align-items:flex-start; gap:14px; position:relative;">
    <div style="position:absolute; left:-28px; top:4px; width:10px; height:10px; border-radius:50%; background:#ef4444; border:2px solid #000;"></div>
    <div style="background:#ef444408; border:1px solid #ef444420; border-radius:8px; padding:14px 18px; flex:1;">
      <div style="font-family:'Outfit'; font-weight:600; font-size:0.65em; color:#ef4444; margin-bottom:4px;">HARD GATE — DO NOT SKIP</div>
      <div style="font-size:0.72em; color:#888; line-height:1.6;">Do <span style="color:#ef4444;">NOT</span> process the transfer until account setup confirmation is received from Matt O'Connell's team. Missing this causes receiving accounts to not exist on transfer day.</div>
    </div>
  </div>

</div>

---

### Informatica Parameter Control

# A major operational safeguard.

<div style="margin-top:6px; font-size:0.75em; color:#444;">Mistakes here cause wrong runs, wrong folders, and silent failures with no error output.</div>

<div style="display:flex; gap:12px; margin-top:16px;">

  <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
    <div style="background:#080808; border:1px solid #111; border-radius:8px; padding:14px 16px;">
      <div style="font-family:'Outfit'; font-weight:600; font-size:0.68em; color:#fff; margin-bottom:4px;">Build parameter files in advance</div>
      <div style="font-size:0.65em; color:#555; line-height:1.6;">One prepared file per workflow type: Mapping · Balances · TIK. Activate the right one when the run starts — no scrambling on the day.</div>
    </div>
    <div style="background:#080808; border:1px solid #111; border-radius:8px; padding:14px 16px;">
      <div style="font-family:'Outfit'; font-weight:600; font-size:0.68em; color:#fff; margin-bottom:4px;">Prepare folders and paths in advance</div>
      <div style="font-size:0.65em; color:#555; line-height:1.6;">Know the active path. Keep the working folder clean. Separate archive and runtime folders so wrong-folder errors are structurally impossible.</div>
    </div>
  </div>

  <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
    <div style="background:#f5a62310; border:1px solid #f5a62320; border-radius:8px; padding:14px 16px;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f5a623" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div style="font-family:'Outfit'; font-weight:600; font-size:0.68em; color:#f5a623;">Keep the file OPEN during the run</div>
      </div>
      <div style="font-size:0.65em; color:#666; line-height:1.6;">Leave the active parameter file visible. Visually confirm the path, test flag, and workflow type before the workflow starts. Do not rely on memory.</div>
    </div>
    <div style="background:#ef444408; border:1px solid #ef444420; border-radius:8px; padding:14px 16px;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <div style="font-family:'Outfit'; font-weight:600; font-size:0.68em; color:#ef4444;">Check the test flag EVERY single time</div>
      </div>
      <div style="font-size:0.65em; color:#666; line-height:1.6;">Running live with the test flag on — or running test with it off — produces results that look correct but aren't. No exception to this check.</div>
    </div>
    <div style="background:#080808; border:1px solid #111; border-radius:8px; padding:14px 16px;">
      <div style="font-family:'Outfit'; font-weight:600; font-size:0.68em; color:#fff; margin-bottom:4px;">Archive after the run</div>
      <div style="font-size:0.65em; color:#555;">Move the used file into the plan folder. Keep the working folder clean.</div>
    </div>
  </div>

</div>

---

### Best Practices

# Do these every time.

<div style="display:flex; gap:12px; margin-top:18px;">

  <div style="flex:1; display:flex; flex-direction:column; gap:7px;">
    <div style="display:flex; gap:10px; align-items:flex-start; padding:10px 14px; background:#22c55e08; border:1px solid #22c55e15; border-radius:7px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" style="margin-top:1px; flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <div style="font-size:0.7em; color:#888; line-height:1.5;"><span style="color:#fff; font-weight:400;">Confirm conversion type early.</span> Cash, Mapping, and TIK do not require the same work.</div>
    </div>
    <div style="display:flex; gap:10px; align-items:flex-start; padding:10px 14px; background:#22c55e08; border:1px solid #22c55e15; border-radius:7px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" style="margin-top:1px; flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <div style="font-size:0.7em; color:#888; line-height:1.5;"><span style="color:#fff; font-weight:400;">Get test files from Prior RK as early as possible.</span> Source mapping and balance prep both depend on them.</div>
    </div>
    <div style="display:flex; gap:10px; align-items:flex-start; padding:10px 14px; background:#22c55e08; border:1px solid #22c55e15; border-radius:7px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" style="margin-top:1px; flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <div style="font-size:0.7em; color:#888; line-height:1.5;"><span style="color:#fff; font-weight:400;">Send mappings to QA/TC/TM immediately</span> when complete — do not batch or delay.</div>
    </div>
    <div style="display:flex; gap:10px; align-items:flex-start; padding:10px 14px; background:#22c55e08; border:1px solid #22c55e15; border-radius:7px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" style="margin-top:1px; flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <div style="font-size:0.7em; color:#888; line-height:1.5;"><span style="color:#fff; font-weight:400;">Validate Informatica workflows in developer mode</span> before any final run.</div>
    </div>
  </div>

  <div style="flex:1; display:flex; flex-direction:column; gap:7px;">
    <div style="display:flex; gap:10px; align-items:flex-start; padding:10px 14px; background:#22c55e08; border:1px solid #22c55e15; border-radius:7px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" style="margin-top:1px; flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <div style="font-size:0.7em; color:#888; line-height:1.5;"><span style="color:#fff; font-weight:400;">Never build fund mapping for a cash conversion.</span> Source mapping only.</div>
    </div>
    <div style="display:flex; gap:10px; align-items:flex-start; padding:10px 14px; background:#22c55e08; border:1px solid #22c55e15; border-radius:7px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" style="margin-top:1px; flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <div style="font-size:0.7em; color:#888; line-height:1.5;"><span style="color:#fff; font-weight:400;">Start TIK re-registration ~3 weeks before transfer.</span> Late starts mean accounts aren't ready.</div>
    </div>
    <div style="display:flex; gap:10px; align-items:flex-start; padding:10px 14px; background:#22c55e08; border:1px solid #22c55e15; border-radius:7px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" style="margin-top:1px; flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <div style="font-size:0.7em; color:#888; line-height:1.5;"><span style="color:#fff; font-weight:400;">Update the share tracker the moment final files land</span> — not later, not after the next task.</div>
    </div>
    <div style="display:flex; gap:10px; align-items:flex-start; padding:10px 14px; background:#22c55e08; border:1px solid #22c55e15; border-radius:7px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" style="margin-top:1px; flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <div style="font-size:0.7em; color:#888; line-height:1.5;"><span style="color:#fff; font-weight:400;">Build EDS layouts early.</span> Reuse prior plan layouts when universal fields match.</div>
    </div>
  </div>

</div>

---

### Pitfalls & Troubleshooting

<div style="margin-top:14px;">

  <div style="display:flex; padding:8px 0; border-bottom:1px solid #111; font-size:0.62em;">
    <div style="flex:2; color:#444; font-family:'Outfit'; font-weight:600; letter-spacing:0.08em;">ISSUE</div>
    <div style="flex:1.5; color:#444; font-family:'Outfit'; font-weight:600; letter-spacing:0.08em;">CAUSE</div>
    <div style="flex:2; color:#444; font-family:'Outfit'; font-weight:600; letter-spacing:0.08em;">FIX</div>
  </div>

  <div style="display:flex; align-items:flex-start; padding:10px 0; border-bottom:1px solid #0a0a0a; font-size:0.68em;">
    <div style="flex:2; color:#888; padding-right:12px; line-height:1.4;"><span style="color:#ef4444;">●</span> Fund mapping built for cash case</div>
    <div style="flex:1.5; color:#555; padding-right:12px; line-height:1.4;">Conversion type assumed wrong</div>
    <div style="flex:2; color:#666; line-height:1.4;">Confirm type early — remove extra work</div>
  </div>

  <div style="display:flex; align-items:flex-start; padding:10px 0; border-bottom:1px solid #0a0a0a; font-size:0.68em;">
    <div style="flex:2; color:#888; padding-right:12px; line-height:1.4;"><span style="color:#ef4444;">●</span> Informatica workflow fails despite correct file</div>
    <div style="flex:1.5; color:#555; padding-right:12px; line-height:1.4;">Hidden metadata / structural issue</div>
    <div style="flex:2; color:#666; line-height:1.4;">Test in developer mode — inspect what Informatica actually sees</div>
  </div>

  <div style="display:flex; align-items:flex-start; padding:10px 0; border-bottom:1px solid #0a0a0a; font-size:0.68em;">
    <div style="flex:2; color:#888; padding-right:12px; line-height:1.4;"><span style="color:#f5a623;">●</span> Wrong sources included in mapping</div>
    <div style="flex:1.5; color:#555; padding-right:12px; line-height:1.4;">Built before real balances known</div>
    <div style="flex:2; color:#666; line-height:1.4;">Trim and refine after test files arrive</div>
  </div>

  <div style="display:flex; align-items:flex-start; padding:10px 0; border-bottom:1px solid #0a0a0a; font-size:0.68em;">
    <div style="flex:2; color:#888; padding-right:12px; line-height:1.4;"><span style="color:#f5a623;">●</span> Share tracker out of date</div>
    <div style="flex:1.5; color:#555; padding-right:12px; line-height:1.4;">Final files arrived, tracker not updated</div>
    <div style="flex:2; color:#666; line-height:1.4;">Update tracker as first action on file receipt</div>
  </div>

  <div style="display:flex; align-items:flex-start; padding:10px 0; border-bottom:1px solid #0a0a0a; font-size:0.68em;">
    <div style="flex:2; color:#888; padding-right:12px; line-height:1.4;"><span style="color:#ef4444;">●</span> TIK receiving accounts not ready</div>
    <div style="flex:1.5; color:#555; padding-right:12px; line-height:1.4;">Re-registration started too late</div>
    <div style="flex:2; color:#666; line-height:1.4;">Start ~3 weeks before transfer — not when prep begins</div>
  </div>

  <div style="display:flex; align-items:flex-start; padding:10px 0; border-bottom:1px solid #0a0a0a; font-size:0.68em;">
    <div style="flex:2; color:#888; padding-right:12px; line-height:1.4;"><span style="color:#ef4444;">●</span> Re-registration form never reached Matt's team</div>
    <div style="flex:1.5; color:#555; padding-right:12px; line-height:1.4;">Submission missed</div>
    <div style="flex:2; color:#666; line-height:1.4;">Resend and confirm receipt explicitly</div>
  </div>

  <div style="display:flex; align-items:flex-start; padding:10px 0; border-bottom:1px solid #0a0a0a; font-size:0.68em;">
    <div style="flex:2; color:#888; padding-right:12px; line-height:1.4;"><span style="color:#f5a623;">●</span> Load day slowed by layout creation</div>
    <div style="flex:1.5; color:#555; padding-right:12px; line-height:1.4;">EDS layouts not built in advance</div>
    <div style="flex:2; color:#666; line-height:1.4;">Build early — reuse prior plan models</div>
  </div>

  <div style="display:flex; align-items:flex-start; padding:10px 0; font-size:0.68em;">
    <div style="flex:2; color:#888; padding-right:12px; line-height:1.4;"><span style="color:#ef4444;">●</span> Test flag wrong in Informatica</div>
    <div style="flex:1.5; color:#555; padding-right:12px; line-height:1.4;">Not checked before run</div>
    <div style="flex:2; color:#666; line-height:1.4;">Keep active parameter file open and visible during every run</div>
  </div>

</div>

---

### Key Contacts & Handoffs

# Who owns what.

<div style="display:flex; gap:12px; margin-top:18px;">
<div style="flex:1; display:flex; flex-direction:column; gap:8px;">
<div style="background:#080808; border:1px solid #111; border-radius:10px; padding:16px 18px;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    <span style="font-family:'Outfit'; font-weight:600; font-size:0.72em; color:#fff;">Prior Record Keeper</span>
  </div>
  <div style="font-size:0.68em; color:#555; line-height:1.7;">Wire instructions receipt · Test files · Final files · Wire breakdown day-of</div>
</div>
<div style="background:#080808; border:1px solid #111; border-radius:10px; padding:16px 18px;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span style="font-family:'Outfit'; font-weight:600; font-size:0.72em; color:#fff;">QA / TC / TM</span>
  </div>
  <div style="font-size:0.68em; color:#555; line-height:1.7;">Review and approve Source Mapping · Review and approve Fund Mapping · Sign off before final Informatica run</div>
</div>
</div>
<div style="flex:1; display:flex; flex-direction:column; gap:8px;">
<div style="background:#080808; border:1px solid #111; border-radius:10px; padding:16px 18px;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6"/></svg>
    <span style="font-family:'Outfit'; font-weight:600; font-size:0.72em; color:#fff;">Cashiering</span>
  </div>
  <div style="font-size:0.68em; color:#555; line-height:1.7;">Advance heads-up 3 days before wire · Notification when wire is booked · Monitors incoming asset receipt</div>
</div>
<div style="background:#d9770608; border:1px solid #d9770620; border-radius:10px; padding:16px 18px;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
    <span style="font-family:'Outfit'; font-weight:600; font-size:0.72em; color:#d97706;">Matt O'Connell's Team</span>
    <span style="font-family:'Outfit'; font-size:0.5em; color:#d97706; background:#d9770615; border-radius:4px; padding:2px 7px;">TIK ONLY</span>
  </div>
  <div style="font-size:0.68em; color:#666; line-height:1.7;">Receives re-registration form · Creates receiving accounts · Provides account setup confirmation (required before transfer) · SLA: ~14 days from TOA / D1 +22</div>
</div>
</div>
</div>

---

### Quick Reference

# What each type actually needs.

<div style="margin-top:16px;">

  <div style="display:flex; padding:9px 16px; border-bottom:1px solid #111; font-size:0.62em;">
    <div style="flex:2.2; color:#444; font-family:'Outfit'; font-weight:600; letter-spacing:0.08em;">REQUIREMENT</div>
    <div style="flex:1; text-align:center; color:#0ea5e9; font-family:'Outfit'; font-weight:700; font-size:1.05em;">CASH</div>
    <div style="flex:1; text-align:center; color:#059669; font-family:'Outfit'; font-weight:700; font-size:1.05em;">MAP</div>
    <div style="flex:1; text-align:center; color:#d97706; font-family:'Outfit'; font-weight:700; font-size:1.05em;">TIK</div>
  </div>

  <div style="display:flex; align-items:center; padding:10px 16px; border-bottom:1px solid #0d0d0d; font-size:0.72em;">
    <div style="flex:2.2; color:#666;">Source Mapping</div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
  </div>

  <div style="display:flex; align-items:center; padding:10px 16px; border-bottom:1px solid #0d0d0d; font-size:0.72em;">
    <div style="flex:2.2; color:#666;">Fund Mapping</div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
  </div>

  <div style="display:flex; align-items:center; padding:10px 16px; border-bottom:1px solid #0d0d0d; font-size:0.72em;">
    <div style="flex:2.2; color:#666;">Re-Registration</div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
    <div style="flex:1; text-align:center; font-size:0.8em; color:#555;">Cond.</div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
  </div>

  <div style="display:flex; align-items:center; padding:10px 16px; border-bottom:1px solid #0d0d0d; font-size:0.72em;">
    <div style="flex:2.2; color:#666;">Advance Employer Account</div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
  </div>

  <div style="display:flex; align-items:center; padding:10px 16px; border-bottom:1px solid #0d0d0d; font-size:0.72em;">
    <div style="flex:2.2; color:#666;">Mapping Reversal Post-Wire</div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
  </div>

  <div style="display:flex; align-items:center; padding:10px 16px; border-bottom:1px solid #0d0d0d; font-size:0.72em;">
    <div style="flex:2.2; color:#666;">Matt O'Connell Setup Required</div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
    <div style="flex:1; text-align:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
  </div>

  <div style="display:flex; align-items:center; padding:10px 16px; font-size:0.72em;">
    <div style="flex:2.2; color:#666;">Relative Complexity</div>
    <div style="flex:1; text-align:center; font-family:'Outfit'; font-weight:600; font-size:0.85em; color:#0ea5e9;">Low</div>
    <div style="flex:1; text-align:center; font-family:'Outfit'; font-weight:600; font-size:0.85em; color:#059669;">Medium</div>
    <div style="flex:1; text-align:center; font-family:'Outfit'; font-weight:600; font-size:0.85em; color:#d97706;">High</div>
  </div>

</div>
