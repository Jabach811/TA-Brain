// Shared helpers for building the five decks (pptxgenjs + sharp + react-icons).
"use strict";

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// ---------------------------------------------------------------- icons ----

const iconCache = new Map();

async function iconPng(IconComponent, colorHex, size = 512) {
  const key = IconComponent.name + colorHex + size;
  if (iconCache.has(key)) return iconCache.get(key);
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color: "#" + colorHex, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  const data = "image/png;base64," + buf.toString("base64");
  iconCache.set(key, data);
  return data;
}

// SVG string (with # colors) -> base64 PNG data URI, rendered at high density.
async function svgPng(svgString, density = 220) {
  const buf = await sharp(Buffer.from(svgString), { density }).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ------------------------------------------------------------ slide bits ----

// Icon inside a colored circle.
async function iconCircle(slide, pres, Icon, opts) {
  const { x, y, d, circleColor, iconColor, iconScale = 0.5 } = opts;
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: d, h: d, fill: { color: circleColor }, line: { type: "none" },
  });
  const id = d * iconScale;
  slide.addImage({
    data: await iconPng(Icon, iconColor),
    x: x + (d - id) / 2, y: y + (d - id) / 2, w: id, h: id,
  });
}

// Big-number stat card.
function statCard(slide, pres, opts) {
  const {
    x, y, w, h, value, label, sub, cardColor, valueColor, labelColor,
    subColor, accentColor, fonts, shadow = true,
  } = opts;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: cardColor }, line: { type: "none" },
    shadow: shadow
      ? { type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.14 }
      : undefined,
  });
  if (accentColor) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h: 0.07, fill: { color: accentColor }, line: { type: "none" },
    });
  }
  slide.addText(value, {
    x: x + 0.15, y: y + 0.18, w: w - 0.3, h: h * 0.42,
    fontSize: opts.valueSize || 34, bold: true, color: valueColor,
    fontFace: fonts.head, align: "left", margin: 0, valign: "middle",
  });
  slide.addText(label.toUpperCase(), {
    x: x + 0.15, y: y + h * 0.52, w: w - 0.3, h: 0.3,
    fontSize: 10.5, bold: true, color: labelColor, charSpacing: 2,
    fontFace: fonts.body, align: "left", margin: 0,
  });
  if (sub) {
    slide.addText(sub, {
      x: x + 0.15, y: y + h * 0.52 + 0.3, w: w - 0.3, h: h - h * 0.52 - 0.38,
      fontSize: 10, color: subColor, fontFace: fonts.body,
      align: "left", margin: 0, valign: "top",
    });
  }
}

// Rounded status pill.
function pill(slide, pres, opts) {
  const { x, y, w = 1.05, h = 0.28, text, fillColor, textColor } = opts;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, fill: { color: fillColor }, line: { type: "none" }, rectRadius: h / 2,
  });
  slide.addText(text.toUpperCase(), {
    x, y: y - 0.02, w, h, fontSize: 9, bold: true, color: textColor,
    align: "center", valign: "middle", margin: 0, charSpacing: 1.5,
  });
}

// Kicker + title header block (no accent line under title).
function header(slide, opts) {
  const { kicker, title, kickerColor, titleColor, fonts, x = 0.55, y = 0.32,
          w = 9, titleSize = 30 } = opts;
  slide.addText(kicker.toUpperCase(), {
    x, y, w, h: 0.28, fontSize: 11, bold: true, color: kickerColor,
    charSpacing: 3, fontFace: fonts.body, margin: 0,
  });
  slide.addText(title, {
    x, y: y + 0.28, w, h: 0.62, fontSize: titleSize, bold: true,
    color: titleColor, fontFace: fonts.head, margin: 0, valign: "top",
  });
}

function footer(slide, pres, opts) {
  const { left, page, color, fonts, barColor } = opts;
  if (barColor) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: barColor }, line: { type: "none" },
    });
  }
  slide.addText(left, {
    x: 0.55, y: 5.26, w: 6, h: 0.25, fontSize: 8.5, color, fontFace: fonts.body,
    margin: 0, valign: "middle",
  });
  slide.addText(String(page).padStart(2, "0"), {
    x: 9.1, y: 5.26, w: 0.35, h: 0.25, fontSize: 8.5, bold: true, color,
    fontFace: fonts.body, align: "right", margin: 0, valign: "middle",
  });
}

// Horizontal timeline with round nodes.
function timeline(slide, pres, opts) {
  const { x, y, w, items, lineColor, doneColor, todoColor, textColor,
          mutedColor, fonts } = opts;
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h: 0, line: { color: lineColor, width: 2.5 },
  });
  const step = w / (items.length - 1);
  items.forEach((it, i) => {
    const cx = x + i * step;
    const d = it.done ? 0.34 : 0.26;
    slide.addShape(pres.shapes.OVAL, {
      x: cx - d / 2, y: y - d / 2, w: d, h: d,
      fill: { color: it.done ? doneColor : "FFFFFF" },
      line: { color: it.done ? doneColor : todoColor, width: 2.25 },
    });
    const above = i % 2 === 0;
    slide.addText(it.label, {
      x: cx - 0.95, y: above ? y - 1.06 : y + 0.24, w: 1.9, h: 0.58,
      fontSize: 11.5, bold: true, color: textColor, align: "center",
      fontFace: fonts.body, margin: 0, valign: above ? "bottom" : "top",
    });
    slide.addText(it.date, {
      x: cx - 0.95, y: above ? y - 1.36 : y + 0.84, w: 1.9, h: 0.28,
      fontSize: 9.5, color: mutedColor, align: "center",
      fontFace: fonts.body, margin: 0, italic: true,
    });
  });
}

module.exports = { iconPng, svgPng, iconCircle, statCard, pill, header, footer, timeline };
