// Deck 5 — "Berry Editorial": 2027 strategy outlook. Berry 6D2E46 dominant,
// dusty rose A26769, cream ECE2D0. Georgia serif, magazine-editorial layouts.
"use strict";

const pptxgen = require("pptxgenjs");
const { FaCompass, FaLayerGroup, FaRobot, FaBalanceScale } = require("react-icons/fa");
const L = require("./lib");

const C = {
  berry: "6D2E46", rose: "A26769", cream: "ECE2D0", paper: "F7F2E9",
  white: "FFFFFF", ink: "3A2230", muted: "8A7365", roseLight: "E3D0CB",
};
const F = { head: "Georgia", body: "Calibri" };

const titleSvg = `
<svg width="2000" height="1125" viewBox="0 0 1000 563" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="563" fill="#F7F2E9"/>
  <rect x="640" y="0" width="360" height="563" fill="#6D2E46"/>
  <text x="668" y="452" font-family="Georgia, serif" font-weight="bold" font-size="300"
        fill="#A26769" fill-opacity="0.5">27</text>
  <circle cx="640" cy="140" r="64" fill="#A26769"/>
  <circle cx="640" cy="140" r="64" fill="none" stroke="#F7F2E9" stroke-width="3"/>
  <rect x="0" y="540" width="640" height="23" fill="#6D2E46"/>
  <rect x="56" y="128" width="110" height="7" fill="#6D2E46"/>
</svg>`;

const closeSvg = `
<svg width="2000" height="1125" viewBox="0 0 1000 563" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="563" fill="#6D2E46"/>
  <rect x="0" y="0" width="330" height="563" fill="#5C2539"/>
  <text x="-30" y="500" font-family="Georgia, serif" font-weight="bold" font-size="330"
        fill="#A26769" fill-opacity="0.35">27</text>
  <circle cx="330" cy="430" r="56" fill="#ECE2D0"/>
  <rect x="380" y="120" width="110" height="7" fill="#ECE2D0"/>
</svg>`;

function head(slide, pres, num, kicker, title) {
  slide.addText(num, {
    x: 0.55, y: 0.34, w: 0.9, h: 0.85, fontSize: 40, bold: true, color: C.roseLight,
    fontFace: F.head, margin: 0,
  });
  slide.addText(kicker.toUpperCase(), {
    x: 1.5, y: 0.4, w: 6, h: 0.26, fontSize: 10.5, bold: true, color: C.rose,
    charSpacing: 3.5, fontFace: F.body, margin: 0,
  });
  slide.addText(title, {
    x: 1.5, y: 0.66, w: 8.0, h: 0.6, fontSize: 26, bold: true, color: C.berry,
    fontFace: F.head, margin: 0, italic: false,
  });
}
function foot(slide, pres, page) {
  slide.addShape(pres.shapes.LINE, {
    x: 0.55, y: 5.3, w: 8.9, h: 0, line: { color: C.roseLight, width: 1 },
  });
  slide.addText("2027 STRATEGY OUTLOOK  ·  WORKPLACE RETIREMENT", {
    x: 0.55, y: 5.34, w: 6, h: 0.22, fontSize: 7.5, bold: true, color: C.muted,
    charSpacing: 2.5, fontFace: F.body, margin: 0,
  });
  slide.addText("— " + String(page) + " —", {
    x: 8.45, y: 5.34, w: 1.0, h: 0.22, fontSize: 8, color: C.rose,
    fontFace: F.head, align: "right", margin: 0, italic: true,
  });
}

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "2027 Strategy Outlook — Workplace Retirement";

  // ---- 1 · Title ------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { data: await L.svgPng(titleSvg) };
    s.addText("WORKPLACE RETIREMENT STRATEGY", {
      x: 0.55, y: 1.45, w: 5.5, h: 0.3, fontSize: 10.5, bold: true, color: C.rose,
      charSpacing: 3, fontFace: F.body, margin: 0,
    });
    s.addText("The 2027\nOutlook", {
      x: 0.5, y: 1.82, w: 5.6, h: 1.85, fontSize: 49, bold: true, color: C.berry,
      fontFace: F.head, margin: 0, lineSpacing: 55,
    });
    s.addText("Three bets for the next planning cycle — and the honest math behind each one.", {
      x: 0.55, y: 3.9, w: 4.7, h: 0.7, fontSize: 13.5, italic: true, color: C.muted,
      fontFace: F.head, margin: 0, lineSpacing: 19,
    });
    s.addText("STRATEGY OFFICE  ·  JULY 2026", {
      x: 0.55, y: 4.95, w: 4, h: 0.28, fontSize: 9.5, bold: true, color: C.ink,
      charSpacing: 2.5, fontFace: F.body, margin: 0,
    });
  }

  // ---- 2 · Where we stand -----------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    head(s, pres, "01", "Where we stand", "Strong book, narrowing moat");
    s.addText(
      "The business enters 2027 from strength: eight quarters of revenue growth, retention above 96%, and a pooled-plan chassis that is finally scaling.\n\nBut the moat is narrowing. Payroll providers are moving up-market, fee compression is structural, and the fastest-growing segment of the market — sub-$5M plans — is one we barely serve.",
      { x: 0.55, y: 1.62, w: 4.6, h: 3.2, fontSize: 13, color: C.ink,
        fontFace: F.body, margin: 0, lineSpacing: 19, valign: "top" });
    const stats = [
      ["$2.4B", "assets under administration today"],
      ["+31%", "payroll-provider share growth in plans under $5M"],
      ["9%", "average fee decline on renewal, year over year"],
    ];
    stats.forEach((t, i) => {
      const y = 1.62 + i * 1.14;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.5, y, w: 3.95, h: 0.98, fill: { color: i === 0 ? C.berry : C.white },
        line: i === 0 ? { type: "none" } : { color: C.roseLight, width: 1 },
      });
      s.addText(t[0], {
        x: 5.72, y, w: 1.5, h: 0.98, fontSize: 26, bold: true,
        color: i === 0 ? C.cream : C.berry, fontFace: F.head, margin: 0, valign: "middle",
      });
      s.addText(t[1], {
        x: 7.3, y, w: 2.05, h: 0.98, fontSize: 10.5,
        color: i === 0 ? C.roseLight : C.muted, fontFace: F.body, margin: 0,
        valign: "middle", lineSpacing: 13,
      });
    });
    foot(s, pres, 2);
  }

  // ---- 3 · Three pillars --------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    head(s, pres, "02", "The strategy", "Three bets, plainly stated");
    const pillars = [
      ["I", "Own the small end", "Make the pooled plan the default chassis under $10M — sold through payroll and CPA channels, not against them.", "$120M revenue by 2029"],
      ["II", "Income as moat", "In-plan guaranteed income keeps near-retiree assets on platform and gives advisors a reason to consolidate with us.", "$500M income assets by '28"],
      ["III", "Service as product", "Publish response-time and accuracy SLAs and price them. Nobody else in the mid-market will put service in the contract.", "Top-2 NPS in segment"],
    ];
    pillars.forEach((p, i) => {
      const x = 0.55 + i * 3.08;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.6, w: 2.86, h: 3.4, fill: { color: i === 1 ? C.berry : C.white },
        line: i === 1 ? { type: "none" } : { color: C.roseLight, width: 1 },
      });
      s.addText(p[0], {
        x: x + 0.24, y: 1.74, w: 1.0, h: 0.6, fontSize: 30, bold: true, italic: true,
        color: i === 1 ? C.rose : C.roseLight, fontFace: F.head, margin: 0,
      });
      s.addText(p[1], {
        x: x + 0.24, y: 2.42, w: 2.4, h: 0.62, fontSize: 16.5, bold: true,
        color: i === 1 ? C.cream : C.berry, fontFace: F.head, margin: 0, lineSpacing: 19,
      });
      s.addText(p[2], {
        x: x + 0.24, y: 3.1, w: 2.42, h: 1.3, fontSize: 10.5,
        color: i === 1 ? C.roseLight : C.muted, fontFace: F.body, margin: 0,
        lineSpacing: 14.5,
      });
      s.addShape(pres.shapes.LINE, {
        x: x + 0.24, y: 4.44, w: 2.38, h: 0,
        line: { color: i === 1 ? C.rose : C.roseLight, width: 1 },
      });
      s.addText(p[3], {
        x: x + 0.24, y: 4.52, w: 2.4, h: 0.34, fontSize: 10, bold: true, italic: true,
        color: i === 1 ? C.cream : C.rose, fontFace: F.head, margin: 0,
      });
    });
    foot(s, pres, 3);
  }

  // ---- 4 · Market trends ----------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    head(s, pres, "03", "The tailwind", "State mandates keep filling the funnel");
    s.addChart(pres.charts.LINE, [
      { name: "New DC plans formed annually (thousands)",
        labels: ["2021", "2022", "2023", "2024", "2025", "2026E", "2027E"],
        values: [48, 56, 71, 89, 104, 118, 131] },
    ], {
      x: 0.45, y: 1.6, w: 5.6, h: 3.3,
      chartColors: [C.berry], lineSize: 3.5, lineSmooth: true,
      showLegend: false,
      catAxisLabelColor: C.muted, catAxisLabelFontSize: 10,
      valAxisLabelColor: C.muted, valAxisLabelFontSize: 9,
      valGridLine: { color: "E2D7C3", size: 0.5 }, catGridLine: { style: "none" },
      lineDataSymbol: "circle", lineDataSymbolSize: 6,
      showValue: true, dataLabelPosition: "t", dataLabelColor: C.berry,
      dataLabelFontSize: 9,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.35, y: 1.6, w: 3.1, h: 3.3, fill: { color: C.white },
      line: { color: C.roseLight, width: 1 },
    });
    s.addText("“", {
      x: 6.5, y: 1.5, w: 0.8, h: 0.8, fontSize: 60, color: C.rose,
      fontFace: F.head, margin: 0,
    });
    s.addText("Seventeen state mandates are now live. Plan formation has nearly tripled since 2021 — and almost all of it lands in the under-$5M segment that Pillar I is built for.", {
      x: 6.62, y: 2.25, w: 2.6, h: 1.9, fontSize: 11.5, italic: true, color: C.ink,
      fontFace: F.head, margin: 0, lineSpacing: 17,
    });
    s.addText("— SOURCE: DOL FORM 5500 FILINGS; INTERNAL ANALYSIS", {
      x: 6.62, y: 4.35, w: 2.6, h: 0.4, fontSize: 7.5, bold: true, color: C.muted,
      charSpacing: 1.5, fontFace: F.body, margin: 0,
    });
    foot(s, pres, 4);
  }

  // ---- 5 · Initiative portfolio ------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    head(s, pres, "04", "The portfolio", "Six initiatives carry the strategy");
    const inits = [
      ["PEP 2.0 chassis", "I", "Re-platform pooled plans for 10x volume", "Q2 2027"],
      ["Channel partnerships", "I", "Two national CPA networks signed", "Q1 2027"],
      ["SecurePath Income", "II", "In-plan income at January QDIA window", "Jan 2027"],
      ["Advisor dashboard", "II", "Retained-AUM analytics for top 60 teams", "Q4 2026"],
      ["Published SLAs", "III", "Contractual service guarantees, priced", "Q3 2027"],
      ["Service telemetry", "III", "Real-time accuracy scoreboard, client-visible", "Q2 2027"],
    ];
    inits.forEach((n, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.55 + col * 4.62, y = 1.55 + row * 1.18;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 4.3, h: 1.02, fill: { color: C.white },
        line: { color: C.roseLight, width: 1 },
      });
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.18, y: y + 0.26, w: 0.5, h: 0.5, fill: { color: C.berry }, line: { type: "none" },
      });
      s.addText(n[1], {
        x: x + 0.18, y: y + 0.24, w: 0.5, h: 0.5, fontSize: 13, bold: true, italic: true,
        color: C.cream, align: "center", valign: "middle", fontFace: F.head, margin: 0,
      });
      s.addText(n[0], {
        x: x + 0.84, y: y + 0.13, w: 2.7, h: 0.32, fontSize: 12.5, bold: true,
        color: C.berry, fontFace: F.body, margin: 0,
      });
      s.addText(n[2], {
        x: x + 0.84, y: y + 0.47, w: 2.75, h: 0.44, fontSize: 9.5, color: C.muted,
        fontFace: F.body, margin: 0, lineSpacing: 12,
      });
      s.addText(n[3], {
        x: x + 3.35, y: y + 0.13, w: 0.85, h: 0.3, fontSize: 9, bold: true,
        color: C.rose, align: "right", fontFace: F.body, margin: 0,
      });
    });
    foot(s, pres, 5);
  }

  // ---- 6 · Investment allocation ------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    head(s, pres, "05", "The money", "Where the $18M change budget goes");
    s.addChart(pres.charts.DOUGHNUT, [{
      name: "Allocation",
      labels: ["Pillar I — small end", "Pillar II — income", "Pillar III — service", "Run & maintain"],
      values: [38, 27, 20, 15],
    }], {
      x: 0.4, y: 1.55, w: 4.05, h: 3.4, holeSize: 62,
      chartColors: ["6D2E46", "A26769", "C9A9A0", "E3D0CB"],
      showLegend: false, showValue: false, showPercent: false,
    });
    const rows = [
      ["Pillar I — own the small end", "38% · $6.8M", "PEP re-platform is the single largest line item"],
      ["Pillar II — income as moat", "27% · $4.9M", "Carrier integration, filing, advisor tooling"],
      ["Pillar III — service as product", "20% · $3.6M", "Telemetry build plus SLA reserve fund"],
      ["Run & maintain", "15% · $2.7M", "Keep-the-lights-on floor, ring-fenced"],
    ];
    rows.forEach((r, i) => {
      const y = 1.62 + i * 0.86;
      s.addShape(pres.shapes.OVAL, {
        x: 4.75, y: y + 0.06, w: 0.24, h: 0.24,
        fill: { color: ["6D2E46", "A26769", "C9A9A0", "E3D0CB"][i] }, line: { type: "none" },
      });
      s.addText([
        { text: r[0] + "   ", options: { bold: true, color: C.berry } },
        { text: r[1], options: { bold: true, color: C.rose, italic: true } },
      ], { x: 5.15, y, w: 4.3, h: 0.32, fontSize: 12, fontFace: F.body, margin: 0 });
      s.addText(r[2], {
        x: 5.15, y: y + 0.32, w: 4.3, h: 0.36, fontSize: 10, color: C.muted,
        fontFace: F.body, margin: 0,
      });
    });
    foot(s, pres, 6);
  }

  // ---- 7 · Roadmap ----------------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    head(s, pres, "06", "The road", "Eighteen months, five moments");
    L.timeline(s, pres, {
      x: 1.15, y: 3.15, w: 7.7,
      items: [
        { label: "Income launch", date: "Jan 2027", done: false },
        { label: "CPA channel live", date: "Mar 2027", done: false },
        { label: "PEP 2.0 ships", date: "Jun 2027", done: false },
        { label: "SLAs published", date: "Sep 2027", done: false },
        { label: "Strategy review", date: "Dec 2027", done: false },
      ],
      lineColor: C.roseLight, doneColor: C.berry, todoColor: C.rose,
      textColor: C.berry, mutedColor: C.muted, fonts: F,
    });
    s.addText("Every date above is already on an executive calendar. The December review is where we decide whether Pillar III becomes a pricing model or stays a differentiator.", {
      x: 1.3, y: 4.6, w: 7.4, h: 0.55, fontSize: 11, italic: true, color: C.muted,
      fontFace: F.head, align: "center", margin: 0, lineSpacing: 15,
    });
    foot(s, pres, 7);
  }

  // ---- 8 · Operating model -----------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    head(s, pres, "07", "The change", "What runs differently in 2027");
    const pairs = [
      ["Sales teams organized by plan size", "Teams organized by channel — advisor, CPA, payroll, direct"],
      ["Service staffed to average volume", "Staffed to enrollment-season peaks, with a float pool"],
      ["Pricing approved deal-by-deal", "Pricing desk with published floors and a 24-hour SLA"],
      ["Product roadmap set annually", "Quarterly re-plan tied to the initiative portfolio"],
    ];
    s.addText("TODAY", {
      x: 0.55, y: 1.58, w: 4.3, h: 0.3, fontSize: 11, bold: true, color: C.muted,
      charSpacing: 3, fontFace: F.body, margin: 0,
    });
    s.addText("IN 2027", {
      x: 5.15, y: 1.58, w: 4.3, h: 0.3, fontSize: 11, bold: true, color: C.berry,
      charSpacing: 3, fontFace: F.body, margin: 0,
    });
    pairs.forEach((p, i) => {
      const y = 1.95 + i * 0.78;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.55, y, w: 4.3, h: 0.64, fill: { color: C.white },
        line: { color: C.roseLight, width: 1 },
      });
      s.addText(p[0], {
        x: 0.75, y, w: 3.95, h: 0.64, fontSize: 10.5, color: C.muted,
        fontFace: F.body, margin: 0, valign: "middle", lineSpacing: 13,
      });
      s.addText("→", {
        x: 4.85, y, w: 0.3, h: 0.64, fontSize: 14, bold: true, color: C.rose,
        align: "center", valign: "middle", fontFace: F.body, margin: 0,
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.15, y, w: 4.3, h: 0.64, fill: { color: C.berry }, line: { type: "none" },
      });
      s.addText(p[1], {
        x: 5.35, y, w: 3.95, h: 0.64, fontSize: 10.5, color: C.cream,
        fontFace: F.body, margin: 0, valign: "middle", lineSpacing: 13,
      });
    });
    foot(s, pres, 8);
  }

  // ---- 9 · What could derail us ---------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.paper };
    head(s, pres, "08", "The honest page", "What could derail this");
    const risks = [
      [FaBalanceScale, "Fiduciary litigation chill", "A high-profile income lawsuit freezes sponsor adoption for a cycle.", "Carrier-insured structure; opinion letters ready for committees."],
      [FaRobot, "Payroll providers move faster", "They bundle plans at a price we can't meet under $5M.", "That's why Pillar I sells through them, not against them."],
      [FaLayerGroup, "Execution overload", "Six initiatives across three pillars strain the same platform team.", "Portfolio board can kill or defer any initiative quarterly."],
      [FaCompass, "Strategy drift", "New leadership re-litigates the bets mid-cycle.", "Board-approved thesis; December review is the only re-open point."],
    ];
    for (let i = 0; i < risks.length; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.55 + col * 4.62, y = 1.55 + row * 1.72;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 4.3, h: 1.55, fill: { color: C.white },
        line: { color: C.roseLight, width: 1 },
      });
      await L.iconCircle(s, pres, risks[i][0], {
        x: x + 0.2, y: y + 0.2, d: 0.55, circleColor: C.berry, iconColor: C.cream,
      });
      s.addText(risks[i][1], {
        x: x + 0.92, y: y + 0.14, w: 3.25, h: 0.32, fontSize: 12.5, bold: true,
        color: C.berry, fontFace: F.head, margin: 0,
      });
      s.addText(risks[i][2], {
        x: x + 0.92, y: y + 0.48, w: 3.25, h: 0.5, fontSize: 9.8, color: C.muted,
        fontFace: F.body, margin: 0, lineSpacing: 12.5,
      });
      s.addText([{ text: "Counter: ", options: { bold: true, color: C.rose, italic: true } },
                 { text: risks[i][3], options: { color: C.ink, italic: true } }], {
        x: x + 0.92, y: y + 1.0, w: 3.25, h: 0.5, fontSize: 9.3, fontFace: F.head,
        margin: 0, lineSpacing: 12,
      });
    }
    foot(s, pres, 9);
  }

  // ---- 10 · Commitments (closing) ----------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { data: await L.svgPng(closeSvg) };
    s.addText("WHAT WE'RE SIGNING UP FOR", {
      x: 4.1, y: 0.85, w: 5.3, h: 0.3, fontSize: 11, bold: true, color: C.rose,
      charSpacing: 3.5, fontFace: F.body, margin: 0,
    });
    s.addText("Hold us to these numbers.", {
      x: 4.05, y: 1.2, w: 5.4, h: 1.3, fontSize: 34, bold: true, color: C.cream,
      fontFace: F.head, margin: 0, lineSpacing: 40,
    });
    const commits = [
      ["$120M", "revenue from the small-end chassis by 2029"],
      ["$500M", "in-plan income assets by end of 2028"],
      ["96%+", "retention held while repricing the legacy book"],
    ];
    commits.forEach((c, i) => {
      const y = 2.75 + i * 0.78;
      s.addText(c[0], {
        x: 4.1, y, w: 1.55, h: 0.6, fontSize: 26, bold: true, color: C.cream,
        fontFace: F.head, margin: 0, valign: "middle",
      });
      s.addText(c[1], {
        x: 5.8, y, w: 3.6, h: 0.6, fontSize: 12, color: C.roseLight,
        fontFace: F.body, margin: 0, valign: "middle", lineSpacing: 15,
      });
      if (i < commits.length - 1) s.addShape(pres.shapes.LINE, {
        x: 4.1, y: y + 0.68, w: 5.2, h: 0, line: { color: "8A4A62", width: 1 },
      });
    });
    s.addText("STRATEGY OFFICE  ·  JULY 2026", {
      x: 4.1, y: 5.1, w: 4, h: 0.26, fontSize: 9, bold: true, color: C.rose,
      charSpacing: 2.5, fontFace: F.body, margin: 0,
    });
  }

  await pres.writeFile({ fileName: "decks2/deck-5-berry-editorial.pptx" });
  console.log("deck 5 written");
}

module.exports = build;
if (require.main === module) build().catch((e) => { console.error(e); process.exit(1); });
