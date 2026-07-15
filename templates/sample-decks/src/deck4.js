// Deck 4 — "Forest & Moss": client onboarding playbook. Forest 2C5F2D dominant,
// moss 97BC62, cream F5F5F5. Cambria + Calibri. Organic arcs, left-border cards.
"use strict";

const pptxgen = require("pptxgenjs");
const { FaSeedling, FaFileUpload, FaComments, FaClipboardList, FaCheck,
        FaLeaf, FaChartBar } = require("react-icons/fa");
const L = require("./lib");

const C = {
  forest: "2C5F2D", moss: "97BC62", mossDeep: "6E9440", cream: "F5F5F5",
  white: "FFFFFF", ink: "23401F", muted: "63705F", mossPale: "E8F0DC",
  amber: "C8871B",
};
const F = { head: "Cambria", body: "Calibri" };

const titleSvg = `
<svg width="2000" height="1125" viewBox="0 0 1000 563" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="563" fill="#F5F5F5"/>
  <path d="M 1000 563 L 1000 80 Q 700 120 620 340 Q 560 500 380 563 Z" fill="#2C5F2D"/>
  <path d="M 1000 563 L 1000 230 Q 790 260 730 400 Q 690 500 560 563 Z" fill="#97BC62" fill-opacity="0.9"/>
  <path d="M 1000 563 L 1000 360 Q 870 380 830 460 Q 800 520 720 563 Z" fill="#E8F0DC"/>
  <circle cx="700" cy="140" r="10" fill="#97BC62"/>
  <circle cx="800" cy="90" r="6" fill="#2C5F2D"/>
  <rect x="0" y="0" width="1000" height="12" fill="#2C5F2D"/>
</svg>`;

const closeSvg = `
<svg width="2000" height="1125" viewBox="0 0 1000 563" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="563" fill="#2C5F2D"/>
  <path d="M 0 563 L 0 120 Q 260 160 330 360 Q 380 500 560 563 Z" fill="#377538" />
  <path d="M 0 563 L 0 300 Q 160 330 210 440 Q 245 520 340 563 Z" fill="#97BC62" fill-opacity="0.55"/>
  <circle cx="820" cy="110" r="9" fill="#97BC62"/>
  <circle cx="900" cy="180" r="5" fill="#E8F0DC"/>
  <rect x="0" y="551" width="1000" height="12" fill="#97BC62"/>
</svg>`;

function head(slide, pres, kicker, title) {
  slide.addShape(pres.shapes.OVAL, {
    x: 0.55, y: 0.38, w: 0.2, h: 0.2, fill: { color: C.moss }, line: { type: "none" },
  });
  slide.addText(kicker.toUpperCase(), {
    x: 0.88, y: 0.34, w: 6, h: 0.28, fontSize: 11, bold: true, color: C.mossDeep,
    charSpacing: 3, fontFace: F.body, margin: 0,
  });
  slide.addText(title, {
    x: 0.55, y: 0.66, w: 8.9, h: 0.62, fontSize: 28, bold: true, color: C.forest,
    fontFace: F.head, margin: 0,
  });
}
function foot(slide, pres, page) {
  slide.addText("EVERGREEN HEALTH 403(B)  ·  ONBOARDING PLAYBOOK", {
    x: 0.55, y: 5.22, w: 6, h: 0.24, fontSize: 8, bold: true, color: C.muted,
    charSpacing: 2, fontFace: F.body, margin: 0,
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 9.22, y: 5.16, w: 0.32, h: 0.32, fill: { color: C.mossPale }, line: { type: "none" },
  });
  slide.addText(String(page), {
    x: 9.22, y: 5.14, w: 0.32, h: 0.32, fontSize: 10, bold: true, color: C.forest,
    align: "center", valign: "middle", fontFace: F.body, margin: 0,
  });
}

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Client Onboarding Playbook — Evergreen Health 403(b)";

  // ---- 1 · Title -----------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { data: await L.svgPng(titleSvg) };
    s.addText("CLIENT ONBOARDING PLAYBOOK", {
      x: 0.6, y: 1.25, w: 5, h: 0.3, fontSize: 11.5, bold: true, color: C.mossDeep,
      charSpacing: 3.5, fontFace: F.body, margin: 0,
    });
    s.addText("Evergreen Health\n403(b) Plan", {
      x: 0.55, y: 1.62, w: 6.2, h: 1.7, fontSize: 40, bold: true, color: C.forest,
      fontFace: F.head, margin: 0, lineSpacing: 46,
    });
    s.addText("Ninety days from signature to steady state — the phase-by-phase playbook for the onboarding team", {
      x: 0.6, y: 3.55, w: 4.9, h: 0.8, fontSize: 13, color: C.muted,
      fontFace: F.body, margin: 0, lineSpacing: 18,
    });
    s.addText("Onboarding Practice  ·  July 2026  ·  v2.1", {
      x: 0.6, y: 4.75, w: 4.5, h: 0.3, fontSize: 10.5, color: C.mossDeep,
      fontFace: F.body, margin: 0,
    });
  }

  // ---- 2 · At a glance -------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, pres, "At a glance", "The client, the clock, the commitment");
    const cards = [
      ["6,800", "Eligible employees", "Across 11 hospital and clinic sites"],
      ["$212M", "Plan assets", "Converting from two legacy vendors"],
      ["90 days", "To steady state", "Signature July 1 → go-live Sept 29"],
      ["4 phases", "One playbook", "Discover, build, convert, embed"],
    ];
    cards.forEach((c, i) => {
      L.statCard(s, pres, {
        x: 0.55 + i * 2.33, y: 1.62, w: 2.13, h: 1.66,
        value: c[0], label: c[1], sub: c[2],
        cardColor: i === 3 ? C.forest : C.mossPale,
        valueColor: i === 3 ? C.white : C.forest,
        labelColor: i === 3 ? "C9DCA8" : C.mossDeep,
        subColor: i === 3 ? "E1ECCF" : C.muted,
        accentColor: i === 3 ? C.moss : undefined, fonts: F, valueSize: 27,
        shadow: false,
      });
    });
    await L.iconCircle(s, pres, FaSeedling, {
      x: 0.85, y: 3.9, d: 0.7, circleColor: C.moss, iconColor: C.forest,
    });
    s.addText([
      { text: "The stakes:  ", options: { bold: true, color: C.forest } },
      { text: "Evergreen left its last provider over a botched conversion. Every promise in this playbook was made in the finals presentation — the first 90 days are where we prove they chose right.",
        options: { color: C.muted } },
    ], {
      x: 1.78, y: 3.72, w: 7.5, h: 1.1, fontSize: 12.5, fontFace: F.body,
      margin: 0, valign: "middle", lineSpacing: 17,
    });
    foot(s, pres, 2);
  }

  // ---- 3 · Four phases -------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, pres, "The arc", "Four phases in ninety days");
    const phases = [
      ["1", "DISCOVER", "Days 1–15", "Payroll census, plan document review, vendor data audit, stakeholder map."],
      ["2", "BUILD", "Days 16–45", "Recordkeeping setup, payroll bridges, investment lineup, comms plan."],
      ["3", "CONVERT", "Days 46–75", "Blackout window, asset transfer, reconciliation, go-live checks."],
      ["4", "EMBED", "Days 76–90", "Enrollment push, manager training, first payroll cycles, handoff."],
    ];
    phases.forEach((p, i) => {
      const x = 0.55 + i * 2.33;
      const active = i < 2;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.62, w: 2.13, h: 3.3, fill: { color: active ? C.forest : C.mossPale },
        line: { type: "none" },
      });
      s.addText(p[0], {
        x: x + 0.18, y: 1.78, w: 1.2, h: 0.75, fontSize: 44, bold: true,
        color: active ? C.moss : C.mossDeep, fontFace: F.head, margin: 0,
      });
      s.addText(p[1], {
        x: x + 0.18, y: 2.62, w: 1.8, h: 0.3, fontSize: 14, bold: true,
        color: active ? C.white : C.forest, charSpacing: 2, fontFace: F.body, margin: 0,
      });
      s.addText(p[2], {
        x: x + 0.18, y: 2.94, w: 1.8, h: 0.26, fontSize: 10, italic: true,
        color: active ? "C9DCA8" : C.mossDeep, fontFace: F.body, margin: 0,
      });
      s.addText(p[3], {
        x: x + 0.18, y: 3.3, w: 1.8, h: 1.45, fontSize: 10, lineSpacing: 13.5,
        color: active ? "E1ECCF" : C.muted, fontFace: F.body, margin: 0,
      });
    });
    foot(s, pres, 3);
  }

  // ---- 4 · Milestone timeline -------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, pres, "Key dates", "The dates the client is watching");
    L.timeline(s, pres, {
      x: 1.15, y: 3.1, w: 7.7,
      items: [
        { label: "Kickoff", date: "Jul 8", done: true },
        { label: "Census locked", date: "Jul 31", done: true },
        { label: "Blackout begins", date: "Sep 2", done: false },
        { label: "Assets land", date: "Sep 19", done: false },
        { label: "Go-live", date: "Sep 29", done: false },
      ],
      lineColor: "D7E4C0", doneColor: C.forest, todoColor: C.mossDeep,
      textColor: C.forest, mutedColor: C.muted, fonts: F,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.5, y: 4.45, w: 7.0, h: 0.6, fill: { color: C.mossPale }, line: { type: "none" },
    });
    s.addText([
      { text: "Blackout is 27 days — ", options: { bold: true, color: C.forest } },
      { text: "shorter than the 45 the client suffered last time. That number is in the contract; protect it.",
        options: { color: C.muted } },
    ], {
      x: 1.75, y: 4.45, w: 6.6, h: 0.6, fontSize: 11.5, fontFace: F.body,
      margin: 0, valign: "middle",
    });
    foot(s, pres, 4);
  }

  // ---- 5 · Roles ---------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, pres, "The team", "Who owns what");
    const rows = [
      ["Onboarding lead", "K. Ramirez", "Single point of accountability; runs the weekly client call"],
      ["Conversion analyst", "T. Okafor", "Census, data mapping, and the reconciliation ledger"],
      ["Payroll integration", "B. Lindqvist", "Bridges for Workday + two legacy payroll feeds"],
      ["Communications", "A. Delgado", "Blackout notices, enrollment campaign, site posters"],
      ["Client sponsor", "M. Vance (Evergreen)", "Approvals, site access, and escalation on the client side"],
    ];
    const y0 = 1.6, rh = 0.64;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55, y: y0, w: 8.9, h: 0.42, fill: { color: C.forest }, line: { type: "none" },
    });
    ["ROLE", "OWNER", "ACCOUNTABLE FOR"].forEach((h, i) => {
      s.addText(h, {
        x: [0.8, 3.15, 5.35][i], y: y0, w: [2.2, 2.0, 4.0][i], h: 0.42,
        fontSize: 9.5, bold: true, color: "D7E4C0", charSpacing: 2,
        fontFace: F.body, margin: 0, valign: "middle",
      });
    });
    rows.forEach((r, i) => {
      const y = y0 + 0.42 + i * rh;
      if (i % 2 === 0) s.addShape(pres.shapes.RECTANGLE, {
        x: 0.55, y, w: 8.9, h: rh, fill: { color: "F3F7EB" }, line: { type: "none" },
      });
      s.addText(r[0], { x: 0.8, y, w: 2.2, h: rh, fontSize: 11.5, bold: true,
        color: C.forest, fontFace: F.body, margin: 0, valign: "middle" });
      s.addText(r[1], { x: 3.15, y, w: 2.0, h: rh, fontSize: 11,
        color: C.mossDeep, fontFace: F.body, margin: 0, valign: "middle" });
      s.addText(r[2], { x: 5.35, y, w: 4.0, h: rh, fontSize: 10.5,
        color: C.muted, fontFace: F.body, margin: 0, valign: "middle" });
    });
    foot(s, pres, 5);
  }

  // ---- 6 · Data & payroll -------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, pres, "The hard part", "Data and payroll, step by step");
    const steps = [
      ["Census extract", "Pull from Workday plus both legacy vendors; 6,800 records, 14 fields each."],
      ["Gap scrub", "Match SSNs across systems; last conversion this size surfaced ~400 mismatches."],
      ["Bridge build", "Automated 360° feed with Workday; manual bridge for the clinic payroll until Q1."],
      ["Parallel run", "Two full payroll cycles run side-by-side before anyone cuts over."],
      ["Sign-off", "Client payroll director signs the reconciliation ledger — no verbal approvals."],
    ];
    steps.forEach((st, i) => {
      const y = 1.55 + i * 0.72;
      s.addShape(pres.shapes.OVAL, {
        x: 0.55, y: y + 0.04, w: 0.5, h: 0.5,
        fill: { color: i < 2 ? C.forest : C.mossPale }, line: { type: "none" },
      });
      s.addText(String(i + 1), {
        x: 0.55, y: y + 0.02, w: 0.5, h: 0.5, fontSize: 14, bold: true,
        color: i < 2 ? C.moss : C.forest, align: "center", valign: "middle",
        fontFace: F.head, margin: 0,
      });
      s.addText(st[0], {
        x: 1.25, y, w: 2.15, h: 0.58, fontSize: 13, bold: true, color: C.forest,
        fontFace: F.body, margin: 0, valign: "middle",
      });
      s.addText(st[1], {
        x: 3.5, y, w: 5.95, h: 0.58, fontSize: 11, color: C.muted,
        fontFace: F.body, margin: 0, valign: "middle", lineSpacing: 13,
      });
      if (i < steps.length - 1) s.addShape(pres.shapes.LINE, {
        x: 0.8, y: y + 0.56, w: 0, h: 0.18, line: { color: C.moss, width: 1.5 },
      });
    });
    foot(s, pres, 6);
  }

  // ---- 7 · Communications calendar ----------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, pres, "Communications", "What employees hear, and when");
    const waves = [
      ["JULY", "“Change is coming”", "Announcement letter, intranet banner, manager FAQ — signed by Evergreen's CHRO, not by us."],
      ["AUGUST", "“What you need to do”", "Blackout notice (legal), enrollment guide, three lunch-and-learns per site, Spanish and Tagalog versions."],
      ["SEPTEMBER", "“You're live”", "Go-live email, first-login campaign, on-site help desks the week of Sept 29, textline for floor staff."],
    ];
    for (let i = 0; i < waves.length; i++) {
      const x = 0.55 + i * 3.08;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.6, w: 2.86, h: 3.3, fill: { color: "F3F7EB" }, line: { type: "none" },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.6, w: 2.86, h: 0.5, fill: { color: C.forest }, line: { type: "none" },
      });
      s.addText(waves[i][0], {
        x: x + 0.2, y: 1.6, w: 2.5, h: 0.5, fontSize: 12, bold: true, color: C.moss,
        charSpacing: 3, fontFace: F.body, margin: 0, valign: "middle",
      });
      s.addText(waves[i][1], {
        x: x + 0.2, y: 2.28, w: 2.45, h: 0.42, fontSize: 14.5, bold: true, italic: true,
        color: C.forest, fontFace: F.head, margin: 0,
      });
      s.addText(waves[i][2], {
        x: x + 0.2, y: 2.78, w: 2.46, h: 1.95, fontSize: 10.5, color: C.muted,
        fontFace: F.body, margin: 0, lineSpacing: 14.5,
      });
    }
    foot(s, pres, 7);
  }

  // ---- 8 · Compliance checklist ---------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, pres, "Compliance", "Nothing optional on this page");
    const items = [
      ["404(a)(5) fee disclosure", "Delivered with enrollment guide", true],
      ["Blackout notice (30-day rule)", "Mails Aug 1 — legal approved", true],
      ["QDIA notice", "With enrollment guide + annual repeat", true],
      ["ERISA fidelity bond check", "Client bond covers new asset level", false],
      ["Plan document restatement", "Counsel drafting; due before go-live", false],
      ["5500 filing responsibility", "Transfers to us for plan year 2026", false],
    ];
    for (let i = 0; i < items.length; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.55 + col * 4.62, y = 1.6 + row * 1.12;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 4.3, h: 0.94, fill: { color: "F3F7EB" }, line: { type: "none" },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 0.09, h: 0.94, fill: { color: items[i][2] ? C.forest : C.amber },
        line: { type: "none" },
      });
      await L.iconCircle(s, pres, items[i][2] ? FaCheck : FaClipboardList, {
        x: x + 0.24, y: y + 0.22, d: 0.5,
        circleColor: items[i][2] ? C.forest : C.amber, iconColor: C.white,
      });
      s.addText(items[i][0], {
        x: x + 0.92, y: y + 0.12, w: 3.3, h: 0.34, fontSize: 12, bold: true,
        color: C.forest, fontFace: F.body, margin: 0,
      });
      s.addText(items[i][1], {
        x: x + 0.92, y: y + 0.46, w: 3.3, h: 0.4, fontSize: 10, color: C.muted,
        fontFace: F.body, margin: 0,
      });
    }
    foot(s, pres, 8);
  }

  // ---- 9 · Success metrics ---------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    head(s, pres, "Scorecard", "How Evergreen will grade us");
    s.addChart(pres.charts.BAR, [
      { name: "Target", labels: ["Enrollment rate", "First-login rate", "Deferral ≥ 5%", "Beneficiary on file"],
        values: [85, 70, 60, 75] },
      { name: "Day-90 actual (tracking)", labels: ["Enrollment rate", "First-login rate", "Deferral ≥ 5%", "Beneficiary on file"],
        values: [88, 64, 58, 71] },
    ], {
      x: 0.45, y: 1.6, w: 5.9, h: 3.35, barDir: "col",
      chartColors: [C.moss, C.forest], showLegend: true, legendPos: "b",
      legendColor: C.muted, legendFontSize: 10,
      catAxisLabelColor: C.ink, catAxisLabelFontSize: 9.5,
      valAxisLabelColor: C.muted, valAxisLabelFontSize: 9, valAxisMaxVal: 100,
      valGridLine: { color: "E4EDD6", size: 0.5 }, catGridLine: { style: "none" },
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.ink,
      dataLabelFontSize: 8.5, dataLabelFormatCode: '0"%"', barGapWidthPct: 40,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.65, y: 1.6, w: 2.8, h: 3.35, fill: { color: C.forest }, line: { type: "none" },
    });
    s.addText("THE ONE THAT MATTERS", {
      x: 6.9, y: 1.85, w: 2.3, h: 0.5, fontSize: 10, bold: true, color: C.moss,
      charSpacing: 2, fontFace: F.body, margin: 0,
    });
    s.addText("Zero", {
      x: 6.9, y: 2.35, w: 2.3, h: 0.75, fontSize: 40, bold: true, color: C.white,
      fontFace: F.head, margin: 0,
    });
    s.addText("missed or wrong payroll contributions in the first 90 days.\n\nThis is the number the CFO quoted back to us from the finals meeting.", {
      x: 6.9, y: 3.15, w: 2.32, h: 1.6, fontSize: 10.5, color: "E1ECCF",
      fontFace: F.body, margin: 0, lineSpacing: 14,
    });
    foot(s, pres, 9);
  }

  // ---- 10 · Handoff (closing) --------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { data: await L.svgPng(closeSvg) };
    s.addText("DAY 90 AND BEYOND", {
      x: 0.62, y: 0.72, w: 5, h: 0.3, fontSize: 11.5, bold: true, color: C.moss,
      charSpacing: 3.5, fontFace: F.body, margin: 0,
    });
    s.addText("Plant it well,\nthen hand it over.", {
      x: 0.58, y: 1.08, w: 7.5, h: 1.55, fontSize: 36, bold: true, color: C.white,
      fontFace: F.head, margin: 0, lineSpacing: 42,
    });
    const cols = [
      [FaLeaf, "Steady-state review", "Day-90 scorecard presented to the Evergreen committee with the full reconciliation ledger."],
      [FaComments, "Named service team", "Client meets their ongoing team in week 10 — no cold handoffs, two overlap calls minimum."],
      [FaChartBar, "Year-one calendar", "Compliance testing, audit package, and education waves booked before onboarding closes."],
    ];
    for (let i = 0; i < cols.length; i++) {
      const x = 0.62 + i * 3.02;
      await L.iconCircle(s, pres, cols[i][0], {
        x, y: 3.0, d: 0.62, circleColor: C.moss, iconColor: C.forest,
      });
      s.addText(cols[i][1], {
        x, y: 3.78, w: 2.75, h: 0.32, fontSize: 13.5, bold: true, color: C.white,
        fontFace: F.head, margin: 0,
      });
      s.addText(cols[i][2], {
        x, y: 4.12, w: 2.75, h: 0.95, fontSize: 10.5, color: "DCE8C8",
        fontFace: F.body, margin: 0, lineSpacing: 14,
      });
    }
    s.addText("Onboarding Practice  ·  playbook v2.1  ·  July 2026", {
      x: 0.62, y: 5.15, w: 5, h: 0.28, fontSize: 9.5, color: "A9C489",
      fontFace: F.body, margin: 0,
    });
  }

  await pres.writeFile({ fileName: "decks2/deck-4-forest-moss.pptx" });
  console.log("deck 4 written");
}

module.exports = build;
if (require.main === module) build().catch((e) => { console.error(e); process.exit(1); });
