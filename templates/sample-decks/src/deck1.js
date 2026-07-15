// Deck 1 — "Midnight Executive": Executive Handoff Summary.
// Navy 1E2761 dominant, ice blue CADCFC support, white accent. Georgia + Calibri.
"use strict";

const pptxgen = require("pptxgenjs");
const { FaChartLine, FaUsers, FaShieldAlt, FaCalendarCheck, FaExchangeAlt,
        FaClipboardCheck, FaFileContract, FaBullseye, FaHandshake,
        FaExclamationTriangle } = require("react-icons/fa");
const L = require("./lib");

const C = {
  navy: "1E2761", navy2: "27337A", ice: "CADCFC", iceDeep: "9FBEE8",
  white: "FFFFFF", inkOnLight: "1E2761", muted: "5E6B94", paper: "F6F8FD",
  green: "2E9E6B", amber: "D98E04", red: "C0392B",
};
const F = { head: "Georgia", body: "Calibri" };

const heroSvg = `
<svg width="2000" height="1125" viewBox="0 0 1000 563" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="563" fill="#1E2761"/>
  <g fill="none" stroke="#CADCFC">
    <circle cx="1010" cy="80" r="420" stroke-opacity="0.16" stroke-width="1.6"/>
    <circle cx="1010" cy="80" r="330" stroke-opacity="0.30" stroke-width="1.6"/>
    <circle cx="1010" cy="80" r="245" stroke-opacity="0.45" stroke-width="2"/>
    <circle cx="1010" cy="80" r="165" stroke-opacity="0.65" stroke-width="2.4"/>
    <circle cx="1010" cy="80" r="95"  stroke-opacity="0.9"  stroke-width="3"/>
  </g>
  <circle cx="1010" cy="80" r="34" fill="#CADCFC"/>
  <g fill="#CADCFC" fill-opacity="0.5">
    <circle cx="745" cy="80" r="4"/><circle cx="1010" cy="325" r="4"/>
    <circle cx="822" cy="252" r="4"/>
  </g>
  <rect x="0" y="543" width="1000" height="20" fill="#CADCFC"/>
  <rect x="0" y="0" width="7" height="563" fill="#CADCFC" fill-opacity="0.9"/>
</svg>`;

const closeSvg = heroSvg.replace('cx="1010" cy="80"', 'cx="-10" cy="480"')
  .replaceAll('cx="1010" cy="80"', 'cx="-10" cy="480"')
  .replace('cx="745" cy="80"', 'cx="255" cy="480"')
  .replace('cx="1010" cy="325"', 'cx="-10" cy="235"')
  .replace('cx="822" cy="252"', 'cx="178" cy="308"');

function head(slide, kicker, title) {
  L.header(slide, { kicker, title, kickerColor: C.iceDeep, titleColor: C.navy, fonts: F });
}
function foot(slide, pres, page) {
  L.footer(slide, pres, {
    left: "Executive Handoff Summary  ·  Meridian Manufacturing 401(k)",
    page, color: C.muted, fonts: F, barColor: C.navy,
  });
}

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Executive Handoff Summary — Meridian Manufacturing 401(k)";

  // ---- 1 · Title --------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { data: await L.svgPng(heroSvg) };
    s.addText("MERIDIAN MANUFACTURING  ·  401(K) PLAN", {
      x: 0.65, y: 1.28, w: 6.3, h: 0.3, fontSize: 12, bold: true,
      color: C.iceDeep, charSpacing: 3.5, fontFace: F.body, margin: 0,
    });
    s.addText("Executive Handoff\nSummary", {
      x: 0.62, y: 1.62, w: 7.4, h: 1.72, fontSize: 40, bold: true,
      color: C.white, fontFace: F.head, margin: 0, lineSpacing: 46,
    });
    s.addText("Overview of the corporate retirement plan process — transition from implementation to ongoing service", {
      x: 0.65, y: 3.66, w: 5.9, h: 0.75, fontSize: 13, color: C.ice,
      fontFace: F.body, margin: 0, lineSpacing: 18,
    });
    s.addText("Prepared by the Transition Team   ·   July 2026   ·   Confidential", {
      x: 0.65, y: 4.78, w: 6.0, h: 0.3, fontSize: 10.5, color: C.iceDeep,
      fontFace: F.body, margin: 0,
    });
  }

  // ---- 2 · Agenda --------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, "Agenda", "What this briefing covers");
    const items = [
      ["Plan at a glance", "Assets, participants, and headline metrics"],
      ["Project status", "Where the transition stands today"],
      ["Milestones", "What is complete and what remains"],
      ["Work stream detail", "Status across all five work streams"],
      ["Risks & decisions", "Open items requiring executive attention"],
      ["Priorities & lessons", "The 90-day runway and what we learned"],
    ];
    for (let i = 0; i < items.length; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.55 + col * 4.62, y = 1.62 + row * 1.18;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 4.3, h: 1.0, fill: { color: C.paper }, line: { type: "none" },
      });
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.22, y: y + 0.26, w: 0.48, h: 0.48,
        fill: { color: C.navy }, line: { type: "none" },
      });
      s.addText(String(i + 1), {
        x: x + 0.22, y: y + 0.24, w: 0.48, h: 0.48, fontSize: 15, bold: true,
        color: C.ice, align: "center", valign: "middle", fontFace: F.head, margin: 0,
      });
      s.addText(items[i][0], {
        x: x + 0.9, y: y + 0.16, w: 3.3, h: 0.34, fontSize: 14.5, bold: true,
        color: C.navy, fontFace: F.body, margin: 0,
      });
      s.addText(items[i][1], {
        x: x + 0.9, y: y + 0.5, w: 3.3, h: 0.42, fontSize: 10.5,
        color: C.muted, fontFace: F.body, margin: 0,
      });
    }
    foot(s, pres, 2);
  }

  // ---- 3 · Plan at a glance ----------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, "Plan at a Glance", "A healthy plan, ready for day-to-day service");
    const cards = [
      ["$84.2M", "Plan assets", "Up from $78.6M at conversion", true],
      ["1,247", "Participants", "Across 4 manufacturing sites"],
      ["93%", "Enrollment", "Auto-enroll at 6% default"],
      ["7.4%", "Avg. deferral", "Target: 8.0% by year-end"],
    ];
    cards.forEach((c, i) => {
      L.statCard(s, pres, {
        x: 0.55 + i * 2.33, y: 1.7, w: 2.13, h: 1.62,
        value: c[0], label: c[1], sub: c[2],
        cardColor: i === 0 ? C.navy : C.paper,
        valueColor: i === 0 ? C.white : C.navy,
        labelColor: i === 0 ? C.iceDeep : C.muted,
        subColor: i === 0 ? C.ice : C.muted,
        accentColor: i === 0 ? C.ice : C.navy, fonts: F, valueSize: 30,
      });
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55, y: 3.62, w: 8.9, h: 1.32, fill: { color: C.paper }, line: { type: "none" },
    });
    (async () => {})();
    await L.iconCircle(s, pres, FaBullseye, {
      x: 0.85, y: 3.94, d: 0.68, circleColor: C.navy, iconColor: C.ice,
    });
    s.addText([
      { text: "Why it matters:  ", options: { bold: true, color: C.navy } },
      { text: "Meridian converted from a bundled recordkeeper in March with zero missed payrolls. Participation and deferrals are already ahead of plan-design assumptions, which puts the plan on track for its first favorable committee review in Q4.", options: { color: C.muted } },
    ], {
      x: 1.75, y: 3.78, w: 7.5, h: 1.05, fontSize: 12, fontFace: F.body,
      margin: 0, valign: "middle", lineSpacing: 16,
    });
    foot(s, pres, 3);
  }

  // ---- 4 · Executive overview -------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, "Executive Overview", "Why this handoff, and why now");
    s.addText(
      "The 14-month implementation of the Meridian Manufacturing 401(k) plan is complete. Conversion, payroll integration, and the first full quarter of live operation have all closed without material issues.\n\nThis briefing transfers ownership from the implementation team to the ongoing service team. It captures the state of the plan, the open items that need watching, and the commitments made to the client along the way.",
      { x: 0.55, y: 1.62, w: 4.55, h: 3.3, fontSize: 12.5, color: C.muted,
        fontFace: F.body, margin: 0, lineSpacing: 18, valign: "top" });
    const rows = [
      [FaExchangeAlt, "Clean conversion", "3,900 records migrated; reconciliation variance of $0.00 at close."],
      [FaHandshake, "Client relationship", "Committee meets quarterly; CFO is the decision maker of record."],
      [FaCalendarCheck, "First-year calendar", "Compliance testing, audit support, and 5500 filing all scheduled."],
    ];
    for (let i = 0; i < rows.length; i++) {
      const y = 1.62 + i * 1.12;
      await L.iconCircle(s, pres, rows[i][0], {
        x: 5.45, y, d: 0.62, circleColor: C.ice, iconColor: C.navy,
      });
      s.addText(rows[i][1], {
        x: 6.25, y: y - 0.02, w: 3.2, h: 0.32, fontSize: 13.5, bold: true,
        color: C.navy, fontFace: F.body, margin: 0,
      });
      s.addText(rows[i][2], {
        x: 6.25, y: y + 0.3, w: 3.2, h: 0.62, fontSize: 10.5, color: C.muted,
        fontFace: F.body, margin: 0, lineSpacing: 13,
      });
    }
    foot(s, pres, 4);
  }

  // ---- 5 · Project status -------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, "Project Status", "88% complete, on track");
    L.pill(s, pres, { x: 8.15, y: 0.78, w: 1.3, h: 0.34, text: "On track",
                      fillColor: C.green, textColor: C.white });
    s.addChart(pres.charts.BAR, [{
      name: "Complete",
      labels: ["Recordkeeping", "Payroll & data", "Compliance", "Communications", "Advisory"],
      values: [100, 95, 90, 80, 72],
    }], {
      x: 0.45, y: 1.7, w: 5.35, h: 3.35, barDir: "bar",
      chartColors: [C.navy], showLegend: false,
      catAxisLabelColor: C.navy, catAxisLabelFontSize: 10.5, catAxisLabelFontFace: F.body,
      valAxisLabelColor: C.muted, valAxisLabelFontSize: 9, valAxisMaxVal: 100,
      valGridLine: { color: "E4E9F5", size: 0.5 }, catGridLine: { style: "none" },
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.navy,
      dataLabelFontSize: 10, dataLabelFontFace: F.body, dataLabelFormatCode: '0"%"',
      barGapWidthPct: 60,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.1, y: 1.7, w: 3.35, h: 3.35, fill: { color: C.paper }, line: { type: "none" },
    });
    s.addText("THIS PERIOD", {
      x: 6.35, y: 1.92, w: 2.9, h: 0.25, fontSize: 10, bold: true,
      color: C.iceDeep, charSpacing: 2.5, fontFace: F.body, margin: 0,
    });
    s.addText([
      { text: "Closed final payroll-file exceptions with ADP", options: { bullet: true, breakLine: true } },
      { text: "Delivered enrollment kits to the two Ohio plants", options: { bullet: true, breakLine: true } },
      { text: "Scheduled Q3 investment committee review", options: { bullet: true } },
    ], {
      x: 6.35, y: 2.2, w: 2.9, h: 1.3, fontSize: 10.5, color: C.navy,
      fontFace: F.body, margin: 0, paraSpaceAfter: 6,
    });
    s.addText("NEXT PERIOD", {
      x: 6.35, y: 3.52, w: 2.9, h: 0.25, fontSize: 10, bold: true,
      color: C.iceDeep, charSpacing: 2.5, fontFace: F.body, margin: 0,
    });
    s.addText([
      { text: "Launch managed-account advisory pilot", options: { bullet: true, breakLine: true } },
      { text: "Complete Spanish-language education sessions", options: { bullet: true } },
    ], {
      x: 6.35, y: 3.8, w: 2.9, h: 1.0, fontSize: 10.5, color: C.navy,
      fontFace: F.body, margin: 0, paraSpaceAfter: 6,
    });
    foot(s, pres, 5);
  }

  // ---- 6 · Milestones ------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, "Milestones", "Five gates from signature to steady state");
    L.timeline(s, pres, {
      x: 1.15, y: 3.2, w: 7.7,
      items: [
        { label: "Contract signed", date: "May 2025", done: true },
        { label: "Data conversion", date: "Feb 2026", done: true },
        { label: "Go-live", date: "Mar 2026", done: true },
        { label: "First quarter close", date: "Jun 2026", done: true },
        { label: "Steady-state handoff", date: "Sep 2026", done: false },
      ],
      lineColor: C.ice, doneColor: C.navy, todoColor: C.iceDeep,
      textColor: C.navy, mutedColor: C.muted, fonts: F,
    });
    s.addText("4 of 5 gates complete — the September handoff closes the implementation and moves Meridian to the ongoing service calendar.", {
      x: 1.5, y: 4.72, w: 7.0, h: 0.5, fontSize: 11.5, italic: true,
      color: C.muted, fontFace: F.body, align: "center", margin: 0,
    });
    foot(s, pres, 6);
  }

  // ---- 7 · Work stream status ---------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, "Work Stream Status", "Five streams, one watch item");
    const rows = [
      ["Recordkeeping & conversion", "D. Alvarez", "Complete", C.green, "Zero reconciliation variance at close"],
      ["Payroll & data integration", "S. Kim", "Complete", C.green, "360° feed live with ADP since April"],
      ["Compliance & testing", "R. Osei", "On track", C.navy, "ADP/ACP testing passes on preliminary data"],
      ["Participant communications", "J. Whitfield", "On track", C.navy, "Two of three education waves delivered"],
      ["Advisory & managed accounts", "M. Torres", "At risk", C.amber, "Pilot start slipped 3 weeks — vendor contract"],
    ];
    const y0 = 1.62, rh = 0.66;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55, y: y0, w: 8.9, h: 0.4, fill: { color: C.navy }, line: { type: "none" },
    });
    ["WORK STREAM", "OWNER", "STATUS", "NOTE"].forEach((h, i) => {
      s.addText(h, {
        x: [0.75, 3.45, 4.75, 6.15][i], y: y0, w: [2.6, 1.2, 1.3, 3.1][i], h: 0.4,
        fontSize: 9.5, bold: true, color: C.ice, charSpacing: 2,
        fontFace: F.body, margin: 0, valign: "middle",
      });
    });
    rows.forEach((r, i) => {
      const y = y0 + 0.4 + i * rh;
      if (i % 2 === 0) s.addShape(pres.shapes.RECTANGLE, {
        x: 0.55, y, w: 8.9, h: rh, fill: { color: C.paper }, line: { type: "none" },
      });
      s.addText(r[0], { x: 0.75, y, w: 2.6, h: rh, fontSize: 11.5, bold: true,
        color: C.navy, fontFace: F.body, margin: 0, valign: "middle" });
      s.addText(r[1], { x: 3.45, y, w: 1.2, h: rh, fontSize: 11,
        color: C.muted, fontFace: F.body, margin: 0, valign: "middle" });
      L.pill(s, pres, { x: 4.75, y: y + (rh - 0.3) / 2, w: 1.16, h: 0.3,
        text: r[2], fillColor: r[3], textColor: C.white });
      s.addText(r[4], { x: 6.15, y, w: 3.2, h: rh, fontSize: 10,
        color: C.muted, fontFace: F.body, margin: 0, valign: "middle" });
    });
    foot(s, pres, 7);
  }

  // ---- 8 · Risk overview ----------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, "Risk Overview", "Three risks worth executive attention");
    const risks = [
      [FaExclamationTriangle, "Advisory pilot delay", "High", C.red,
       "Vendor contract for managed accounts is 3 weeks behind. If unsigned by Aug 15, the pilot moves to Q4 and a client commitment is missed.",
       "Mitigation: escalated to vendor VP; fallback SOW drafted."],
      [FaUsers, "HR contact turnover", "Medium", C.amber,
       "Meridian's benefits manager — our primary contact — departs in August. Institutional knowledge of payroll quirks leaves with her.",
       "Mitigation: transition binder delivered; successor shadowing calls."],
      [FaFileContract, "Audit readiness", "Low", C.green,
       "First plan audit lands in Q1 2027. Auditor selection is late on the client side, compressing the PBC document window.",
       "Mitigation: pre-built audit package; reminder cadence with CFO."],
    ];
    for (let i = 0; i < risks.length; i++) {
      const x = 0.55 + i * 3.08;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.62, w: 2.86, h: 3.32, fill: { color: C.paper }, line: { type: "none" },
        shadow: { type: "outer", color: "000000", blur: 7, offset: 2, angle: 90, opacity: 0.12 },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.62, w: 2.86, h: 0.07, fill: { color: risks[i][3] }, line: { type: "none" },
      });
      await L.iconCircle(s, pres, risks[i][0], {
        x: x + 0.24, y: 1.88, d: 0.56, circleColor: C.navy, iconColor: C.ice,
      });
      L.pill(s, pres, { x: x + 1.85, y: 2.0, w: 0.82, h: 0.3,
        text: risks[i][2], fillColor: risks[i][3], textColor: C.white });
      s.addText(risks[i][1], {
        x: x + 0.24, y: 2.6, w: 2.4, h: 0.35, fontSize: 13.5, bold: true,
        color: C.navy, fontFace: F.body, margin: 0,
      });
      s.addText(risks[i][4], {
        x: x + 0.24, y: 2.98, w: 2.4, h: 1.28, fontSize: 9.8, color: C.muted,
        fontFace: F.body, margin: 0, lineSpacing: 13,
      });
      s.addText(risks[i][5], {
        x: x + 0.24, y: 4.3, w: 2.4, h: 0.55, fontSize: 9.3, italic: true,
        color: C.navy, fontFace: F.body, margin: 0, lineSpacing: 12,
      });
    }
    foot(s, pres, 8);
  }

  // ---- 9 · Stakeholders & decisions ---------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, "Stakeholders & Decisions", "Who to know, what was decided");
    s.addText("KEY STAKEHOLDERS", {
      x: 0.55, y: 1.66, w: 4, h: 0.26, fontSize: 10.5, bold: true,
      color: C.iceDeep, charSpacing: 2.5, fontFace: F.body, margin: 0,
    });
    const people = [
      ["LC", "Laura Chen", "CFO — plan sponsor decision maker"],
      ["RB", "Rob Bauer", "Plan committee chair, quarterly reviews"],
      ["AN", "Anita Novak", "Incoming benefits manager (from Aug)"],
      ["GP", "Gary Price", "Advisor of record, Price Retirement Group"],
    ];
    people.forEach((p, i) => {
      const y = 1.94 + i * 0.78;
      s.addShape(pres.shapes.OVAL, {
        x: 0.55, y, w: 0.58, h: 0.58, fill: { color: C.navy }, line: { type: "none" },
      });
      s.addText(p[0], {
        x: 0.55, y: y - 0.02, w: 0.58, h: 0.58, fontSize: 13, bold: true,
        color: C.ice, align: "center", valign: "middle", fontFace: F.head, margin: 0,
      });
      s.addText(p[1], {
        x: 1.3, y: y + 0.01, w: 3.2, h: 0.3, fontSize: 12.5, bold: true,
        color: C.navy, fontFace: F.body, margin: 0,
      });
      s.addText(p[2], {
        x: 1.3, y: y + 0.3, w: 3.3, h: 0.28, fontSize: 10, color: C.muted,
        fontFace: F.body, margin: 0,
      });
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.05, y: 1.58, w: 4.4, h: 3.5, fill: { color: C.navy }, line: { type: "none" },
    });
    s.addText("DECISIONS ALREADY MADE", {
      x: 5.35, y: 1.82, w: 3.8, h: 0.26, fontSize: 10.5, bold: true,
      color: C.iceDeep, charSpacing: 2.5, fontFace: F.body, margin: 0,
    });
    s.addText([
      { text: "Auto-enrollment at 6% with 1% annual escalation to 10% — approved Nov 2025", options: { bullet: true, breakLine: true } },
      { text: "QDIA mapped to target-date suite, R6 shares — approved Jan 2026", options: { bullet: true, breakLine: true } },
      { text: "Per-head fee structure locked for 3 years — signed May 2025", options: { bullet: true, breakLine: true } },
      { text: "Managed-account pilot for 55+ cohort — approved Jun 2026, pending vendor", options: { bullet: true } },
    ], {
      x: 5.35, y: 2.2, w: 3.8, h: 2.7, fontSize: 11, color: C.ice,
      fontFace: F.body, margin: 0, paraSpaceAfter: 10, lineSpacing: 14,
    });
    foot(s, pres, 9);
  }

  // ---- 10 · Priorities & lessons (closing) ---------------------------------
  {
    const s = pres.addSlide();
    s.background = { data: await L.svgPng(closeSvg) };
    s.addText("THE 90-DAY RUNWAY", {
      x: 0.65, y: 0.55, w: 6, h: 0.3, fontSize: 12, bold: true,
      color: C.iceDeep, charSpacing: 3.5, fontFace: F.body, margin: 0,
    });
    s.addText("Immediate priorities", {
      x: 0.62, y: 0.88, w: 7.5, h: 0.75, fontSize: 34, bold: true,
      color: C.white, fontFace: F.head, margin: 0,
    });
    const cols = [
      ["30 DAYS", "Sign managed-account vendor SOW and confirm pilot cohort of 120 participants."],
      ["60 DAYS", "Complete benefits-manager transition; run payroll fire-drill with the new contact."],
      ["90 DAYS", "Deliver steady-state handoff gate and first ongoing-service committee review."],
    ];
    cols.forEach((c, i) => {
      const x = 0.65 + i * 3.02;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.95, w: 2.78, h: 1.78, fill: { color: C.navy2 }, line: { type: "none" },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.95, w: 2.78, h: 0.07, fill: { color: C.ice }, line: { type: "none" },
      });
      s.addText(c[0], {
        x: x + 0.22, y: 2.14, w: 2.3, h: 0.3, fontSize: 12.5, bold: true,
        color: C.ice, charSpacing: 2.5, fontFace: F.body, margin: 0,
      });
      s.addText(c[1], {
        x: x + 0.22, y: 2.5, w: 2.38, h: 1.1, fontSize: 11, color: C.white,
        fontFace: F.body, margin: 0, lineSpacing: 15,
      });
    });
    s.addText([
      { text: "Lessons learned:  ", options: { bold: true, color: C.ice } },
      { text: "start payroll-file testing six weeks earlier than the plan calls for; assign a named backup for every client contact; and put vendor contracts on the critical path from day one.",
        options: { color: "D8E4FA" } },
    ], {
      x: 0.65, y: 4.05, w: 8.7, h: 0.75, fontSize: 12, fontFace: F.body,
      margin: 0, lineSpacing: 17,
    });
    s.addText("Questions →  transition-team@example.com", {
      x: 0.65, y: 5.02, w: 6, h: 0.3, fontSize: 10.5, color: C.iceDeep,
      fontFace: F.body, margin: 0,
    });
  }

  await pres.writeFile({ fileName: "decks2/deck-1-midnight-executive.pptx" });
  console.log("deck 1 written");
}

module.exports = build;
if (require.main === module) build().catch((e) => { console.error(e); process.exit(1); });
