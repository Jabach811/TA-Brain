// Deck 3 — "Coral Energy": product launch plan. Navy 2F3C7E base with coral
// F96167 and gold F9E795 geometry. Trebuchet MS + Calibri. Rounded, energetic.
"use strict";

const pptxgen = require("pptxgenjs");
const { FaRocket, FaWallet, FaRoute, FaLock, FaBullhorn, FaChartPie,
        FaUserTie, FaBuilding, FaStore, FaExclamationCircle } = require("react-icons/fa");
const L = require("./lib");

const C = {
  navy: "2F3C7E", coral: "F96167", gold: "F9E795", cream: "FFF9EF",
  white: "FFFFFF", ink: "2A3357", muted: "707899", coralSoft: "FDD5D6",
};
const F = { head: "Trebuchet MS", body: "Calibri" };

const titleSvg = `
<svg width="2000" height="1125" viewBox="0 0 1000 563" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="563" fill="#2F3C7E"/>
  <circle cx="905" cy="470" r="260" fill="#F96167"/>
  <circle cx="905" cy="470" r="260" fill="none" stroke="#FFF9EF" stroke-opacity="0.35" stroke-width="2"/>
  <circle cx="760" cy="105" r="90" fill="#F9E795"/>
  <circle cx="988" cy="150" r="46" fill="#F96167" fill-opacity="0.85"/>
  <circle cx="700" cy="330" r="12" fill="#F9E795"/>
  <circle cx="836" cy="252" r="7" fill="#FFF9EF" fill-opacity="0.8"/>
  <g stroke="#F9E795" stroke-width="2.4" stroke-opacity="0.55">
    <line x1="640" y1="480" x2="700" y2="420"/>
    <line x1="660" y1="500" x2="720" y2="440"/>
    <line x1="680" y1="520" x2="740" y2="460"/>
  </g>
  <rect x="0" y="0" width="1000" height="10" fill="#F96167"/>
</svg>`;

const closeSvg = `
<svg width="2000" height="1125" viewBox="0 0 1000 563" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="563" fill="#F96167"/>
  <circle cx="95" cy="480" r="230" fill="#2F3C7E"/>
  <circle cx="880" cy="90" r="150" fill="#F9E795"/>
  <circle cx="230" cy="120" r="14" fill="#F9E795"/>
  <circle cx="700" cy="480" r="10" fill="#FFF9EF" fill-opacity="0.85"/>
  <rect x="0" y="553" width="1000" height="10" fill="#2F3C7E"/>
</svg>`;

function head(slide, pres, kicker, title) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.55, y: 0.35, w: kicker.length * 0.125 + 0.55, h: 0.32, rectRadius: 0.16,
    fill: { color: C.coralSoft }, line: { type: "none" },
  });
  slide.addText(kicker.toUpperCase(), {
    x: 0.55, y: 0.35, w: kicker.length * 0.125 + 0.55, h: 0.32, fontSize: 10,
    bold: true, color: C.coral, charSpacing: 2, align: "center",
    valign: "middle", fontFace: F.body, margin: 0,
  });
  slide.addText(title, {
    x: 0.55, y: 0.74, w: 8.9, h: 0.6, fontSize: 27, bold: true,
    color: C.navy, fontFace: F.head, margin: 0,
  });
}
function foot(slide, pres, page) {
  slide.addShape(pres.shapes.OVAL, {
    x: 9.28, y: 5.14, w: 0.34, h: 0.34, fill: { color: C.coral }, line: { type: "none" },
  });
  slide.addText(String(page), {
    x: 9.28, y: 5.12, w: 0.34, h: 0.34, fontSize: 10, bold: true, color: C.white,
    align: "center", valign: "middle", fontFace: F.body, margin: 0,
  });
  slide.addText("SECUREPATH INCOME  ·  LAUNCH PLAN", {
    x: 0.55, y: 5.18, w: 5, h: 0.26, fontSize: 8.5, bold: true, color: C.muted,
    charSpacing: 2, fontFace: F.body, margin: 0,
  });
}

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "SecurePath Income — Launch Plan";

  // ---- 1 · Title ----------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { data: await L.svgPng(titleSvg) };
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.6, y: 1.18, w: 2.15, h: 0.4, rectRadius: 0.2,
      fill: { color: C.coral }, line: { type: "none" },
    });
    s.addText("NEW PRODUCT LAUNCH", {
      x: 0.6, y: 1.18, w: 2.15, h: 0.4, fontSize: 10.5, bold: true, color: C.white,
      charSpacing: 2, align: "center", valign: "middle", fontFace: F.body, margin: 0,
    });
    s.addText("SecurePath\nIncome", {
      x: 0.55, y: 1.7, w: 6, h: 1.75, fontSize: 46, bold: true, color: C.white,
      fontFace: F.head, margin: 0, lineSpacing: 52,
    });
    s.addText("Guaranteed retirement income inside the 401(k) — go-to-market plan for the January 2027 window", {
      x: 0.6, y: 3.62, w: 5.2, h: 0.8, fontSize: 13.5, color: C.gold,
      fontFace: F.body, margin: 0, lineSpacing: 18,
    });
    s.addText("Product & Distribution  ·  July 2026", {
      x: 0.6, y: 4.78, w: 4.5, h: 0.3, fontSize: 10.5, color: "B9C3EF",
      fontFace: F.body, margin: 0,
    });
  }

  // ---- 2 · The opportunity -------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    head(s, pres, "The opportunity", "Retirees want a paycheck, not a pot");
    const stats = [
      ["$1.6T", "rolls out of DC plans every year", C.navy, C.white],
      ["78%", "of participants want guaranteed income options", C.coral, C.white],
      ["6 in 10", "sponsors evaluating in-plan income for 2027", C.gold, C.ink],
    ];
    stats.forEach((t, i) => {
      const x = 0.55 + i * 3.08;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.6, w: 2.86, h: 2.0, rectRadius: 0.12,
        fill: { color: t[2] }, line: { type: "none" },
        shadow: { type: "outer", color: "000000", blur: 8, offset: 3, angle: 90, opacity: 0.14 },
      });
      s.addText(t[0], {
        x: x + 0.25, y: 1.85, w: 2.35, h: 0.85, fontSize: 44, bold: true,
        color: t[3], fontFace: F.head, margin: 0,
      });
      s.addText(t[1], {
        x: x + 0.25, y: 2.78, w: 2.36, h: 0.68, fontSize: 12, color: t[3],
        fontFace: F.body, margin: 0, lineSpacing: 15,
      });
    });
    s.addText([
      { text: "The gap:  ", options: { bold: true, color: C.coral } },
      { text: "our platform holds $2.4B for participants over 55 — and today every dollar of it must leave to buy an income product. SecurePath keeps those assets, and those participants, in plan.",
        options: { color: C.ink } },
    ], {
      x: 0.85, y: 3.95, w: 8.3, h: 0.95, fontSize: 13, fontFace: F.body,
      margin: 0, lineSpacing: 18, valign: "middle",
    });
    foot(s, pres, 2);
  }

  // ---- 3 · What it is ------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    head(s, pres, "The product", "Four things SecurePath does");
    const cells = [
      [FaWallet, "Guaranteed paycheck", "Converts balances into lifetime income at retirement — 5.1% initial payout at 65, insured by two carriers."],
      [FaRoute, "Glide-path native", "Sits inside the target-date fund; participants build income units automatically from age 50."],
      [FaLock, "Portable & liquid", "Full balance stays daily-liquid until income starts; participants keep it if they change jobs."],
      [FaRocket, "Zero-friction enrollment", "Default-eligible design — sponsors can adopt it as the QDIA with one amendment."],
    ];
    for (let i = 0; i < cells.length; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.55 + col * 4.62, y = 1.6 + row * 1.72;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 4.3, h: 1.52, rectRadius: 0.12, fill: { color: C.white },
        line: { type: "none" },
        shadow: { type: "outer", color: "000000", blur: 7, offset: 2, angle: 90, opacity: 0.12 },
      });
      await L.iconCircle(s, pres, cells[i][0], {
        x: x + 0.24, y: y + 0.28, d: 0.66, circleColor: i % 2 ? C.navy : C.coral,
        iconColor: C.white,
      });
      s.addText(cells[i][1], {
        x: x + 1.08, y: y + 0.18, w: 3.05, h: 0.34, fontSize: 14, bold: true,
        color: C.navy, fontFace: F.head, margin: 0,
      });
      s.addText(cells[i][2], {
        x: x + 1.08, y: y + 0.54, w: 3.08, h: 0.88, fontSize: 10.5, color: C.muted,
        fontFace: F.body, margin: 0, lineSpacing: 14,
      });
    }
    foot(s, pres, 3);
  }

  // ---- 4 · Who it's for ----------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    head(s, pres, "Target segments", "Three buyers, one product");
    const segs = [
      [FaBuilding, "Large plan sponsors", C.navy,
       "Committees under fiduciary pressure to offer income. Lead with the insured-carrier structure and QDIA-ready design.",
       "40 plans > $50M"],
      [FaUserTie, "Retirement advisors", C.coral,
       "Advisors keep AUM that today rolls away. Lead with participant retention data and the advisor dashboard.",
       "Top 60 advisor teams"],
      [FaStore, "Pooled-plan employers", C.gold,
       "Small employers get institutional pricing through the PEP. Income becomes the differentiator against payroll-provider plans.",
       "500 PEP adopters"],
    ];
    for (let i = 0; i < segs.length; i++) {
      const x = 0.55 + i * 3.08;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.6, w: 2.86, h: 3.35, rectRadius: 0.12, fill: { color: C.white },
        line: { type: "none" },
        shadow: { type: "outer", color: "000000", blur: 7, offset: 2, angle: 90, opacity: 0.12 },
      });
      await L.iconCircle(s, pres, segs[i][0], {
        x: x + 0.24, y: 1.84, d: 0.7, circleColor: segs[i][2],
        iconColor: i === 2 ? C.ink : C.white,
      });
      s.addText(segs[i][1], {
        x: x + 0.24, y: 2.72, w: 2.4, h: 0.36, fontSize: 14.5, bold: true,
        color: C.navy, fontFace: F.head, margin: 0,
      });
      s.addText(segs[i][3], {
        x: x + 0.24, y: 3.12, w: 2.42, h: 1.28, fontSize: 10.5, color: C.muted,
        fontFace: F.body, margin: 0, lineSpacing: 14,
      });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.24, y: 4.42, w: 2.38, h: 0.34, rectRadius: 0.17,
        fill: { color: C.coralSoft }, line: { type: "none" },
      });
      s.addText(segs[i][4].toUpperCase(), {
        x: x + 0.24, y: 4.42, w: 2.38, h: 0.34, fontSize: 8.5, bold: true,
        color: C.coral, align: "center", valign: "middle", charSpacing: 1,
        fontFace: F.body, margin: 0,
      });
    }
    foot(s, pres, 4);
  }

  // ---- 5 · GTM timeline ----------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    head(s, pres, "Go-to-market", "Six months from filing to first dollar");
    L.timeline(s, pres, {
      x: 1.15, y: 3.1, w: 7.7,
      items: [
        { label: "Carrier contracts", date: "Aug 2026", done: true },
        { label: "Regulatory filing", date: "Sep 2026", done: false },
        { label: "Advisor preview", date: "Oct 2026", done: false },
        { label: "Sponsor roadshow", date: "Nov 2026", done: false },
        { label: "First enrollments", date: "Jan 2027", done: false },
      ],
      lineColor: "E5D9C4", doneColor: C.coral, todoColor: C.navy,
      textColor: C.navy, mutedColor: C.muted, fonts: F,
    });
    s.addText("Hard gate: filing approval by October 15 keeps the January QDIA window. Miss it and launch moves to the July 2027 cycle.", {
      x: 1.3, y: 4.55, w: 7.4, h: 0.55, fontSize: 11.5, italic: true, color: C.coral,
      fontFace: F.body, align: "center", margin: 0, lineSpacing: 15,
    });
    foot(s, pres, 5);
  }

  // ---- 6 · Packaging -------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    head(s, pres, "Packaging", "Two ways to buy");
    const cols = [
      ["EMBEDDED", "Inside the target-date QDIA", C.navy, C.white,
       ["Income units accrue automatically from age 50", "No participant action required — default design",
        "35 bps all-in on income-allocated assets", "Best for: auto-enroll plans, low engagement"]],
      ["ELECTIVE", "Standalone menu option", C.coral, C.white,
       ["Participants opt in from age 45", "Advisor-assisted allocation with modeling tools",
        "45 bps with advisor service layer", "Best for: advisor-driven and high-touch plans"]],
    ];
    cols.forEach((c, i) => {
      const x = 0.55 + i * 4.62;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.6, w: 4.3, h: 3.35, rectRadius: 0.12, fill: { color: C.white },
        line: { type: "none" },
        shadow: { type: "outer", color: "000000", blur: 7, offset: 2, angle: 90, opacity: 0.12 },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.0, y: 1.6, w: 4.3, h: 0.66, fill: { color: c[2] }, line: { type: "none" },
      });
      s.addText(c[0], {
        x: x + 0.26, y: 1.6, w: 2.0, h: 0.66, fontSize: 15, bold: true, color: c[3],
        fontFace: F.head, margin: 0, valign: "middle", charSpacing: 1,
      });
      s.addText(c[1], {
        x: x + 1.62, y: 1.6, w: 2.6, h: 0.66, fontSize: 10.5, color: c[3],
        fontFace: F.body, margin: 0, valign: "middle", align: "right",
      });
      s.addText(c[4].map((t, j) => ({
        text: t, options: { bullet: { code: "2022" }, breakLine: j < c[4].length - 1 },
      })), {
        x: x + 0.3, y: 2.48, w: 3.75, h: 2.3, fontSize: 11, color: C.ink,
        fontFace: F.body, margin: 0, paraSpaceAfter: 10, lineSpacing: 14,
      });
    });
    foot(s, pres, 6);
  }

  // ---- 7 · Adoption forecast ------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    head(s, pres, "The forecast", "Path to $500M in income assets");
    s.addChart(pres.charts.LINE, [
      { name: "Base case ($M)", labels: ["Q1 '27", "Q2 '27", "Q3 '27", "Q4 '27", "Q1 '28", "Q2 '28", "Q3 '28", "Q4 '28"],
        values: [18, 45, 88, 150, 215, 300, 395, 505] },
      { name: "Conservative ($M)", labels: ["Q1 '27", "Q2 '27", "Q3 '27", "Q4 '27", "Q1 '28", "Q2 '28", "Q3 '28", "Q4 '28"],
        values: [10, 24, 48, 82, 125, 175, 235, 300] },
    ], {
      x: 0.45, y: 1.55, w: 6.1, h: 3.45,
      chartColors: [C.coral, C.navy], lineSize: 3, lineSmooth: true,
      showLegend: true, legendPos: "b", legendColor: C.muted, legendFontSize: 10,
      catAxisLabelColor: C.muted, catAxisLabelFontSize: 9.5,
      valAxisLabelColor: C.muted, valAxisLabelFontSize: 9,
      valGridLine: { color: "EFE6D4", size: 0.5 }, catGridLine: { style: "none" },
      lineDataSymbol: "circle", lineDataSymbolSize: 5,
    });
    const marks = [
      ["$505M", "base-case income assets by end of 2028"],
      ["120", "plans adopted across both packages"],
      ["$2.1M", "run-rate revenue at 40 bps blended"],
    ];
    marks.forEach((m, i) => {
      const y = 1.62 + i * 1.12;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 6.85, y, w: 2.6, h: 0.96, rectRadius: 0.1,
        fill: { color: i === 0 ? C.navy : C.white }, line: { type: "none" },
        shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.10 },
      });
      s.addText(m[0], {
        x: 7.08, y: y + 0.1, w: 2.2, h: 0.4, fontSize: 20, bold: true,
        color: i === 0 ? C.gold : C.coral, fontFace: F.head, margin: 0,
      });
      s.addText(m[1], {
        x: 7.08, y: y + 0.5, w: 2.2, h: 0.4, fontSize: 9.5,
        color: i === 0 ? C.white : C.muted, fontFace: F.body, margin: 0, lineSpacing: 12,
      });
    });
    foot(s, pres, 7);
  }

  // ---- 8 · Launch engine -----------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    head(s, pres, "Launch engine", "Where the launch budget goes");
    s.addChart(pres.charts.DOUGHNUT, [{
      name: "Budget",
      labels: ["Advisor enablement", "Sponsor campaigns", "Participant education", "PR & analyst", "Tooling"],
      values: [34, 26, 22, 10, 8],
    }], {
      x: 0.35, y: 1.5, w: 4.0, h: 3.5, holeSize: 60,
      chartColors: ["F96167", "2F3C7E", "F9E795", "9AA5D1", "FDD5D6"],
      showLegend: false, showValue: false, showPercent: false,
    });
    const items = [
      [FaUserTie, "Advisor enablement — 34%", "Preview events, modeling tools, and a certification sprint for the top 60 teams."],
      [FaBullhorn, "Sponsor campaigns — 26%", "Fiduciary-focused content series plus the November roadshow in six cities."],
      [FaChartPie, "Participant education — 22%", "In-plan messaging, retirement-paycheck calculator, and enrollment meetings."],
    ];
    for (let i = 0; i < items.length; i++) {
      const y = 1.72 + i * 1.06;
      await L.iconCircle(s, pres, items[i][0], {
        x: 4.55, y, d: 0.58, circleColor: [C.coral, C.navy, C.gold][i],
        iconColor: i === 2 ? C.ink : C.white,
      });
      s.addText(items[i][1], {
        x: 5.3, y: y - 0.02, w: 4.15, h: 0.32, fontSize: 13, bold: true,
        color: C.navy, fontFace: F.head, margin: 0,
      });
      s.addText(items[i][2], {
        x: 5.3, y: y + 0.3, w: 4.15, h: 0.62, fontSize: 10.5, color: C.muted,
        fontFace: F.body, margin: 0, lineSpacing: 13,
      });
    }
    foot(s, pres, 8);
  }

  // ---- 9 · Risks --------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    head(s, pres, "Eyes open", "What could stall the launch");
    const risks = [
      ["Filing slips past Oct 15", "Launch slides two full quarters to the next QDIA window.",
       "Weekly counsel check-ins; pre-cleared responses for the two likely comment areas.", C.coral],
      ["Carrier capacity pulls back", "Rate guarantee drops below 5% and the headline weakens.",
       "Second carrier signed for 40% of capacity; rate floor locked through March.", C.navy],
      ["Advisors position it as competition", "Top teams see in-plan income as a rollover threat.",
       "Advisor dashboard shows retained AUM; revenue share on income assets.", C.ink],
    ];
    risks.forEach((r, i) => {
      const y = 1.55 + i * 1.18;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.55, y, w: 8.9, h: 1.02, rectRadius: 0.1, fill: { color: C.white },
        line: { type: "none" },
        shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.10 },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.55, y, w: 0.1, h: 1.02, fill: { color: r[3] }, line: { type: "none" },
      });
      s.addText(r[0], {
        x: 0.85, y: y + 0.12, w: 2.9, h: 0.8, fontSize: 12.5, bold: true,
        color: C.navy, fontFace: F.head, margin: 0, valign: "middle", lineSpacing: 15,
      });
      s.addText([{ text: "Impact: ", options: { bold: true, color: r[3] } },
                 { text: r[1], options: { color: C.muted } }], {
        x: 3.95, y: y + 0.1, w: 2.6, h: 0.84, fontSize: 9.8, fontFace: F.body,
        margin: 0, valign: "middle", lineSpacing: 12,
      });
      s.addText([{ text: "Mitigation: ", options: { bold: true, color: r[3] } },
                 { text: r[2], options: { color: C.muted } }], {
        x: 6.75, y: y + 0.1, w: 2.55, h: 0.84, fontSize: 9.8, fontFace: F.body,
        margin: 0, valign: "middle", lineSpacing: 12,
      });
    });
    foot(s, pres, 9);
  }

  // ---- 10 · The ask -----------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { data: await L.svgPng(closeSvg) };
    s.addText("THE ASK", {
      x: 0.62, y: 0.75, w: 4, h: 0.32, fontSize: 12, bold: true, color: C.gold,
      charSpacing: 4, fontFace: F.body, margin: 0,
    });
    s.addText("Green-light the January window.", {
      x: 0.58, y: 1.1, w: 7.8, h: 1.5, fontSize: 38, bold: true, color: C.white,
      fontFace: F.head, margin: 0, lineSpacing: 44,
    });
    const asks = [
      ["Approve", "the $2.8M launch budget at the August investment committee"],
      ["Commit", "the top-60 advisor teams to October certification"],
      ["Name", "an executive sponsor for the carrier relationship by August 1"],
    ];
    asks.forEach((a, i) => {
      const y = 2.85 + i * 0.68;
      s.addShape(pres.shapes.OVAL, {
        x: 0.62, y: y + 0.05, w: 0.34, h: 0.34, fill: { color: C.gold }, line: { type: "none" },
      });
      s.addText(String(i + 1), {
        x: 0.62, y: y + 0.03, w: 0.34, h: 0.34, fontSize: 12, bold: true, color: C.ink,
        align: "center", valign: "middle", fontFace: F.head, margin: 0,
      });
      s.addText([{ text: a[0] + " ", options: { bold: true, color: C.gold } },
                 { text: a[1], options: { color: C.white } }], {
        x: 1.15, y, w: 7.2, h: 0.45, fontSize: 14.5, fontFace: F.body,
        margin: 0, valign: "middle",
      });
    });
    s.addText("SecurePath Income  ·  Product & Distribution  ·  July 2026", {
      x: 0.62, y: 5.05, w: 5.5, h: 0.3, fontSize: 10, color: "FDE3E3",
      fontFace: F.body, margin: 0,
    });
  }

  await pres.writeFile({ fileName: "decks2/deck-3-coral-energy.pptx" });
  console.log("deck 3 written");
}

module.exports = build;
if (require.main === module) build().catch((e) => { console.error(e); process.exit(1); });
