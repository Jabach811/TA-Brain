// Deck 2 — "Charcoal Swiss": Q2 Business Review. Monochrome charcoal/off-white
// with giant ghost numerals and thick rules. Arial Black + Arial, one red accent.
"use strict";

const pptxgen = require("pptxgenjs");
const { FaArrowUp, FaArrowDown, FaCogs, FaHeadset, FaServer, FaUserCheck }
  = require("react-icons/fa");
const L = require("./lib");

const C = {
  char: "36454F", black: "212121", off: "F2F2F2", white: "FFFFFF",
  mid: "6E7B84", light: "D8DDE0", red: "C0392B",
};
const F = { head: "Arial Black", body: "Arial" };

const titleSvg = `
<svg width="2000" height="1125" viewBox="0 0 1000 563" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="563" fill="#F2F2F2"/>
  <text x="618" y="470" font-family="Arial, Helvetica, sans-serif" font-weight="900"
        font-size="470" fill="none" stroke="#36454F" stroke-opacity="0.16"
        stroke-width="2.5">Q2</text>
  <rect x="0" y="0" width="1000" height="86" fill="#212121"/>
  <rect x="0" y="521" width="1000" height="42" fill="#36454F"/>
  <rect x="56" y="218" width="130" height="16" fill="#C0392B"/>
</svg>`;

const closeSvg = `
<svg width="2000" height="1125" viewBox="0 0 1000 563" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="563" fill="#212121"/>
  <text x="560" y="500" font-family="Arial, Helvetica, sans-serif" font-weight="900"
        font-size="470" fill="none" stroke="#F2F2F2" stroke-opacity="0.12"
        stroke-width="2.5">Q3</text>
</svg>`;

function head(slide, pres, num, title) {
  slide.addText(num, {
    x: 8.0, y: 0.22, w: 1.45, h: 0.9, fontSize: 54, bold: true,
    color: C.light, fontFace: F.head, align: "right", margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 0.42, w: 0.5, h: 0.14, fill: { color: C.red }, line: { type: "none" },
  });
  slide.addText(title, {
    x: 0.55, y: 0.62, w: 7.3, h: 0.62, fontSize: 26, bold: true,
    color: C.black, fontFace: F.head, margin: 0,
  });
}
function foot(slide, pres, page) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.45, w: 10, h: 0.18, fill: { color: C.char }, line: { type: "none" },
  });
  slide.addText("Q2 2026 BUSINESS REVIEW  ·  RETIREMENT PLAN SERVICES", {
    x: 0.55, y: 5.13, w: 6, h: 0.24, fontSize: 8, bold: true, color: C.mid,
    charSpacing: 2, fontFace: F.body, margin: 0,
  });
  slide.addText(String(page).padStart(2, "0"), {
    x: 9.05, y: 5.13, w: 0.4, h: 0.24, fontSize: 8, bold: true, color: C.black,
    fontFace: F.body, align: "right", margin: 0,
  });
}

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Q2 2026 Business Review — Retirement Plan Services";

  // ---- 1 · Title ---------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { data: await L.svgPng(titleSvg) };
    s.addText("RETIREMENT PLAN SERVICES  ·  INTERNAL", {
      x: 0.55, y: 0.22, w: 8, h: 0.4, fontSize: 10, bold: true, color: C.off,
      charSpacing: 3, fontFace: F.body, margin: 0, valign: "middle",
    });
    s.addText("Q2 2026", {
      x: 0.52, y: 1.45, w: 6, h: 0.62, fontSize: 40, bold: true,
      color: C.char, fontFace: F.head, margin: 0,
    });
    s.addText("Business Review", {
      x: 0.52, y: 2.42, w: 8.6, h: 0.95, fontSize: 54, bold: true,
      color: C.black, fontFace: F.head, margin: 0,
    });
    s.addText("Revenue, retention, and operations across the workplace retirement book — what moved, what stalled, and where Q3 attention goes.", {
      x: 0.55, y: 3.5, w: 5.7, h: 0.85, fontSize: 12.5, color: C.char,
      fontFace: F.body, margin: 0, lineSpacing: 18,
    });
    s.addText("JULY 15, 2026", {
      x: 0.55, y: 5.22, w: 4, h: 0.4, fontSize: 10, bold: true, color: C.off,
      charSpacing: 3, fontFace: F.body, margin: 0, valign: "middle",
    });
  }

  // ---- 2 · Executive summary ---------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.off };
    head(s, pres, "02", "The quarter in one number");
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55, y: 1.55, w: 3.7, h: 3.35, fill: { color: C.black }, line: { type: "none" },
    });
    s.addText("+18%", {
      x: 0.75, y: 1.95, w: 3.3, h: 1.3, fontSize: 72, bold: true,
      color: C.off, fontFace: F.head, margin: 0,
    });
    s.addText("NET REVENUE GROWTH, YEAR OVER YEAR", {
      x: 0.78, y: 3.35, w: 3.2, h: 0.3, fontSize: 10, bold: true,
      color: "9FB0BA", charSpacing: 2, fontFace: F.body, margin: 0,
    });
    s.addText("Fastest quarter since 2023, driven by large-market wins and repricing of the legacy book.", {
      x: 0.78, y: 3.72, w: 3.15, h: 0.9, fontSize: 11, color: C.off,
      fontFace: F.body, margin: 0, lineSpacing: 15,
    });
    const rows = [
      ["Sales", "Nine plans closed, $412M in new assets — 128% of the Q2 target."],
      ["Retention", "One competitive loss (14 bps fee gap). At-risk list down from 11 plans to 6."],
      ["Operations", "Payroll-file error rate cut nearly in half after the intake redesign."],
    ];
    rows.forEach((r, i) => {
      const y = 1.55 + i * 1.15;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 4.55, y, w: 4.9, h: 1.0, fill: { color: C.white }, line: { type: "none" },
        shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.10 },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 4.55, y, w: 0.09, h: 1.0, fill: { color: C.red }, line: { type: "none" },
      });
      s.addText(r[0].toUpperCase(), {
        x: 4.85, y: y + 0.14, w: 4.4, h: 0.26, fontSize: 10.5, bold: true,
        color: C.char, charSpacing: 2, fontFace: F.body, margin: 0,
      });
      s.addText(r[1], {
        x: 4.85, y: y + 0.42, w: 4.4, h: 0.52, fontSize: 11, color: C.black,
        fontFace: F.body, margin: 0, lineSpacing: 14,
      });
    });
    foot(s, pres, 2);
  }

  // ---- 3 · KPI grid --------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.off };
    head(s, pres, "03", "Scorecard");
    // dir: "up-good" ▲ charcoal · "down-bad" ▼ red · "down-good" ▼ charcoal
    const kpis = [
      ["$2.41B", "Assets under admin.", "+6.2% QoQ", "up-good"],
      ["318", "Plans on platform", "+9 net adds", "up-good"],
      ["96.3%", "Client retention (TTM)", "-0.4 pts", "down-bad"],
      ["41 days", "Avg. implementation", "-6 days", "down-good"],
      ["+62", "Client NPS", "+7 pts", "up-good"],
      ["0.9%", "Payroll error rate", "from 1.7% in Q1", "down-good"],
    ];
    kpis.forEach((k, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = 0.55 + col * 3.08, y = 1.55 + row * 1.75;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 2.86, h: 1.55, fill: { color: C.white }, line: { type: "none" },
        shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.10 },
      });
      s.addText(k[0], {
        x: x + 0.2, y: y + 0.14, w: 2.45, h: 0.62, fontSize: 30, bold: true,
        color: C.black, fontFace: F.head, margin: 0,
      });
      s.addText(k[1].toUpperCase(), {
        x: x + 0.2, y: y + 0.8, w: 2.45, h: 0.26, fontSize: 9, bold: true,
        color: C.mid, charSpacing: 1.5, fontFace: F.body, margin: 0,
      });
      const arrow = k[3] === "up-good" ? "▲  " : "▼  ";
      const dcol = k[3] === "down-bad" ? C.red : C.char;
      s.addText([
        { text: arrow, options: { color: dcol, bold: true } },
        { text: k[2], options: { color: dcol } },
      ], {
        x: x + 0.2, y: y + 1.1, w: 2.45, h: 0.3, fontSize: 10.5,
        fontFace: F.body, margin: 0,
      });
    });
    foot(s, pres, 3);
  }

  // ---- 4 · Revenue trend ---------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.off };
    head(s, pres, "04", "Revenue is compounding");
    s.addChart(pres.charts.BAR, [{
      name: "Net revenue ($M)",
      labels: ["Q3 '24", "Q4 '24", "Q1 '25", "Q2 '25", "Q3 '25", "Q4 '25", "Q1 '26", "Q2 '26"],
      values: [18.2, 18.9, 19.4, 20.1, 21.0, 21.9, 22.8, 23.7],
    }], {
      x: 0.45, y: 1.6, w: 6.15, h: 3.4, barDir: "col",
      chartColors: [C.char], showLegend: false,
      catAxisLabelColor: C.mid, catAxisLabelFontSize: 9.5, catAxisLabelFontFace: F.body,
      valAxisLabelColor: C.mid, valAxisLabelFontSize: 9, valAxisHidden: false,
      valGridLine: { color: "DDE2E5", size: 0.5 }, catGridLine: { style: "none" },
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.char,
      dataLabelFontSize: 8.5, dataLabelFontFace: F.body,
      barGapWidthPct: 45, valAxisMinVal: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.9, y: 1.6, w: 2.55, h: 3.4, fill: { color: C.black }, line: { type: "none" },
    });
    s.addText("READ", {
      x: 7.12, y: 1.85, w: 2.1, h: 0.26, fontSize: 10, bold: true,
      color: "9FB0BA", charSpacing: 3, fontFace: F.body, margin: 0,
    });
    s.addText("Eight straight quarters of growth.\n\nPricing actions added $1.1M this quarter; the rest is volume from new plans coming onto the platform.", {
      x: 7.12, y: 2.18, w: 2.12, h: 2.6, fontSize: 11, color: C.off,
      fontFace: F.body, margin: 0, lineSpacing: 15,
    });
    foot(s, pres, 4);
  }

  // ---- 5 · Segment mix -----------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.off };
    head(s, pres, "05", "Where the book sits");
    s.addChart(pres.charts.DOUGHNUT, [{
      name: "Assets by segment",
      labels: ["Large market", "Mid market", "Small market", "Pooled plans"],
      values: [46, 31, 15, 8],
    }], {
      x: 0.4, y: 1.55, w: 4.1, h: 3.45, holeSize: 62,
      chartColors: ["212121", "36454F", "6E7B84", "C0392B"],
      showLegend: false, showValue: false, showPercent: false,
      dataLabelColor: C.white,
    });
    const segs = [
      ["Large market", "46%", C.black, "$1.11B — 9 plans over $50M; two added this quarter"],
      ["Mid market", "31%", C.char, "$747M — the workhorse segment, 96 plans"],
      ["Small market", "15%", C.mid, "$362M — margin thin; repricing wave lands in Q3"],
      ["Pooled plans", "8%", C.red, "$193M — PEP chassis growing 40% YoY off a small base"],
    ];
    segs.forEach((g, i) => {
      const y = 1.55 + i * 0.88;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 4.75, y: y + 0.08, w: 0.26, h: 0.26, fill: { color: g[2] }, line: { type: "none" },
      });
      s.addText([
        { text: g[0] + "   ", options: { bold: true, color: C.black } },
        { text: g[1], options: { bold: true, color: C.red } },
      ], {
        x: 5.15, y, w: 4.2, h: 0.32, fontSize: 13, fontFace: F.body, margin: 0,
      });
      s.addText(g[3], {
        x: 5.15, y: y + 0.32, w: 4.25, h: 0.42, fontSize: 10, color: C.mid,
        fontFace: F.body, margin: 0, lineSpacing: 13,
      });
    });
    foot(s, pres, 5);
  }

  // ---- 6 · Pipeline --------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.off };
    head(s, pres, "06", "Pipeline into 2027");
    L.timeline(s, pres, {
      x: 1.15, y: 3.05, w: 7.7,
      items: [
        { label: "$118M verbal", date: "Jul", done: true },
        { label: "$210M in finals", date: "Aug–Sep", done: true },
        { label: "$95M semifinals", date: "Oct", done: false },
        { label: "$260M RFPs live", date: "Nov–Dec", done: false },
        { label: "Jan 1 conversions", date: "Q1 '27", done: false },
      ],
      lineColor: C.light, doneColor: C.black, todoColor: C.mid,
      textColor: C.black, mutedColor: C.mid, fonts: F,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.5, y: 4.42, w: 7.0, h: 0.62, fill: { color: C.white }, line: { type: "none" },
    });
    s.addText([
      { text: "$683M  ", options: { bold: true, color: C.red, fontFace: F.head, fontSize: 14 } },
      { text: "total weighted pipeline — 1.7× the same point last year.",
        options: { color: C.char, fontSize: 11.5 } },
    ], {
      x: 1.75, y: 4.42, w: 6.6, h: 0.62, fontFace: F.body, margin: 0, valign: "middle",
    });
    foot(s, pres, 6);
  }

  // ---- 7 · Wins & losses ---------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.off };
    head(s, pres, "07", "Wins and losses");
    const col = async (x, Icon, title, tint, items) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.55, w: 4.4, h: 3.5, fill: { color: C.white }, line: { type: "none" },
        shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.10 },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.55, w: 4.4, h: 0.56, fill: { color: tint }, line: { type: "none" },
      });
      await L.iconCircle(s, pres, Icon, {
        x: x + 0.18, y: 1.65, d: 0.36, circleColor: C.off, iconColor: tint,
      });
      s.addText(title, {
        x: x + 0.68, y: 1.55, w: 3.5, h: 0.56, fontSize: 14, bold: true,
        color: C.white, fontFace: F.head, margin: 0, valign: "middle",
      });
      s.addText(items.map((t, i) => ({
        text: t, options: { bullet: true, breakLine: i < items.length - 1 },
      })), {
        x: x + 0.3, y: 2.32, w: 3.85, h: 2.55, fontSize: 11, color: C.char,
        fontFace: F.body, margin: 0, paraSpaceAfter: 9, lineSpacing: 14,
      });
    };
    await col(0.55, FaArrowUp, "WHAT WE WON", C.char, [
      "Hartwell Logistics — $96M 401(k), displaced incumbent on service model",
      "Two hospital systems consolidated onto the pooled-plan chassis",
      "First $50M+ win sourced entirely by an aggregator partnership",
    ]);
    await col(5.05, FaArrowDown, "WHAT WE LOST — AND WHY", C.red, [
      "Corveta Foods ($44M) — lost on a 14 bps fee gap; pricing desk reviewing floor",
      "Finals loss at Beacon Health — demo environment failed during live Q&A",
      "Down to one advisor referral in the Southwest; territory gap after departure",
    ]);
    foot(s, pres, 7);
  }

  // ---- 8 · Operations ------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.off };
    head(s, pres, "08", "Operations pulse");
    const rows = [
      [FaCogs, "Intake redesign shipped", "New payroll-file validation cut the error rate from 1.7% to 0.9% in eight weeks."],
      [FaHeadset, "Call center strain", "Average speed to answer rose to 74s in peak weeks — staffing plan lands with Q3 budget."],
      [FaServer, "Recordkeeping platform", "99.97% uptime; June release added Roth catch-up automation for SECURE 2.0."],
      [FaUserCheck, "Talent", "Two senior implementation managers hired; onboarding cohort full through October."],
    ];
    for (let i = 0; i < rows.length; i++) {
      const y = 1.5 + i * 0.92;
      await L.iconCircle(s, pres, rows[i][0], {
        x: 0.55, y, d: 0.6, circleColor: C.black, iconColor: C.off,
      });
      s.addText(rows[i][1], {
        x: 1.4, y: y - 0.01, w: 3.1, h: 0.6, fontSize: 13, bold: true,
        color: C.black, fontFace: F.body, margin: 0, valign: "middle",
      });
      s.addText(rows[i][2], {
        x: 4.65, y, w: 4.8, h: 0.62, fontSize: 11, color: C.char,
        fontFace: F.body, margin: 0, valign: "middle", lineSpacing: 14,
      });
      if (i < rows.length - 1) s.addShape(pres.shapes.LINE, {
        x: 0.55, y: y + 0.78, w: 8.9, h: 0, line: { color: C.light, width: 1 },
      });
    }
    foot(s, pres, 8);
  }

  // ---- 9 · Watch items -----------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: C.off };
    head(s, pres, "09", "Three things to watch");
    const cards = [
      ["01", "Fee compression", "Average bps on renewals down 9% YoY. The Q3 repricing wave protects margin but raises retention risk on 14 small-market plans."],
      ["02", "Service capacity", "Plan count is up 12% with flat ops headcount. Error rates are improving, but peak-season call volumes are the canary."],
      ["03", "Regulatory calendar", "SECURE 2.0 mandatory provisions hit Jan 1. Client amendment packages must be out the door by mid-November."],
    ];
    cards.forEach((c, i) => {
      const x = 0.55 + i * 3.08;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.55, w: 2.86, h: 3.5, fill: { color: i === 1 ? C.black : C.white },
        line: { type: "none" },
        shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.10 },
      });
      s.addText(c[0], {
        x: x + 0.22, y: 1.75, w: 2.4, h: 0.7, fontSize: 40, bold: true,
        color: i === 1 ? C.red : C.light, fontFace: F.head, margin: 0,
      });
      s.addText(c[1], {
        x: x + 0.22, y: 2.6, w: 2.4, h: 0.55, fontSize: 15, bold: true,
        color: i === 1 ? C.off : C.black, fontFace: F.body, margin: 0,
      });
      s.addText(c[2], {
        x: x + 0.22, y: 3.2, w: 2.42, h: 1.7, fontSize: 10.5,
        color: i === 1 ? "C9D2D8" : C.mid, fontFace: F.body, margin: 0, lineSpacing: 14,
      });
    });
    foot(s, pres, 9);
  }

  // ---- 10 · Q3 priorities --------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { data: await L.svgPng(closeSvg) };
    s.addText("NEXT QUARTER", {
      x: 0.55, y: 0.62, w: 5, h: 0.3, fontSize: 11, bold: true, color: "9FB0BA",
      charSpacing: 3, fontFace: F.body, margin: 0,
    });
    s.addText("Q3 priorities", {
      x: 0.52, y: 0.95, w: 7, h: 0.85, fontSize: 40, bold: true,
      color: C.off, fontFace: F.head, margin: 0,
    });
    const items = [
      "Close the $210M in finals — win two of three and the year is made",
      "Ship the small-market repricing wave with a retention playbook attached",
      "Staff the call center ahead of Q4 enrollment season, not during it",
      "SECURE 2.0 amendment packages to every sponsor by November 15",
    ];
    items.forEach((t, i) => {
      const y = 2.1 + i * 0.72;
      s.addText(String(i + 1), {
        x: 0.55, y, w: 0.55, h: 0.55, fontSize: 22, bold: true, color: C.red,
        fontFace: F.head, margin: 0, valign: "middle",
      });
      s.addText(t, {
        x: 1.25, y, w: 7.6, h: 0.55, fontSize: 14, color: C.off,
        fontFace: F.body, margin: 0, valign: "middle",
      });
      if (i < items.length - 1) s.addShape(pres.shapes.LINE, {
        x: 1.25, y: y + 0.62, w: 7.6, h: 0, line: { color: "3A3A3A", width: 1 },
      });
    });
    s.addText("Full appendix and plan-level detail available in the operating review workbook.", {
      x: 0.55, y: 5.05, w: 7, h: 0.3, fontSize: 9.5, italic: true, color: "8A9299",
      fontFace: F.body, margin: 0,
    });
  }

  await pres.writeFile({ fileName: "decks2/deck-2-charcoal-swiss.pptx" });
  console.log("deck 2 written");
}

module.exports = build;
if (require.main === module) build().catch((e) => { console.error(e); process.exit(1); });
