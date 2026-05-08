const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const wikiRoot = path.join(root, "wiki");
const rawRoot = path.join(root, "raw");
const outPath = path.join(__dirname, "ta-brain-lifecycle-app.html");

// Singular `type:` values in frontmatter map to plural namespace keys used by the UI.
const NAMESPACE_PLURAL = {
  role: "roles",
  department: "departments",
  system: "systems",
  document: "documents",
  process: "processes",
  person: "people",
  glossary: "glossary",
  reference: "reference",
  onboarding: "onboarding",
  source: "sources",
  analysis: "analyses",
  admin: "admin"
};

function walk(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, predicate);
    return predicate(full) ? [full] : [];
  });
}

function parseFrontmatter(text) {
  const result = { meta: {}, body: text };
  if (!text.startsWith("---")) return result;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return result;
  const raw = text.slice(3, end).trim();
  result.body = text.slice(text.indexOf("\n", end + 4) + 1);
  raw.split(/\r?\n/).forEach(line => {
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (!match) return;
    const key = match[1].trim();
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    } else if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1).split(",").map(item => item.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    } else if (/^\d+$/.test(value)) {
      value = Number(value);
    }
    result.meta[key] = value;
  });
  return result;
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map(part => {
      const upper = part.toUpperCase();
      if (["dc", "com", "qa", "tc", "eds", "p3", "p2", "nbi", "aqt", "tik", "ytd", "ltpt", "csr", "vef", "awd", "faa", "pea", "aaa", "ssbt"].includes(part)) return upper;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function firstParagraph(body) {
  return body
    .replace(/^# .+$/m, "")
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .find(block => block && !block.startsWith("##") && !block.startsWith("|") && !block.startsWith("- ")) || "";
}

function classify(rel, meta) {
  if (rel === "index.md" || rel === "log.md") return "admin";
  return NAMESPACE_PLURAL[meta.type] || "reference";
}

const EXTRA_TYPE_ALIASES = {
  animation: "animation", anim: "animation", motion: "animation",
  deck: "deck", slides: "deck", slide: "deck", presentation: "deck",
  flow: "flow", flowchart: "flow", workflow: "flow", process: "flow",
  diagram: "diagram", network: "diagram", map: "diagram", chart: "diagram",
  video: "video", recording: "video", screencast: "video", loom: "video",
  doc: "doc", document: "doc", pdf: "doc", paper: "doc",
  sheet: "sheet", spreadsheet: "sheet", excel: "sheet", csv: "sheet", table: "sheet",
  code: "code", sql: "code", query: "code", script: "code", db: "code", database: "code",
  image: "image", img: "image", photo: "image", screenshot: "image", screen: "image",
  link: "link", html: "link", external: "link", url: "link", web: "link"
};

function parseExtras(raw) {
  if (!raw) return [];
  const list = Array.isArray(raw) ? raw : [String(raw)];
  return list
    .map(item => {
      const parts = String(item).split("|").map(p => p.trim()).filter(Boolean);
      if (parts.length < 2) return null;
      const [rawType, href, ...labelParts] = parts;
      const type = EXTRA_TYPE_ALIASES[rawType.toLowerCase()] || "link";
      const label = labelParts.join(" ").trim() || (href.split("/").pop() || href);
      return { type, href, label };
    })
    .filter(Boolean);
}

function classifyMedia(src, caption = "") {
  const normalized = `${src} ${caption}`.toLowerCase();
  const ext = (src.toLowerCase().split("?")[0].split(".").pop() || "");
  if (["gif", "mp4", "webm", "mov"].includes(ext)) return "animation";
  if (ext === "svg" || normalized.includes("diagram") || normalized.includes("flow") || normalized.includes("map")) return "diagram";
  return "screenshot";
}

function parseMedia(body) {
  const normalized = body.replace(/\r\n/g, "\n");
  const re = /^[ \t]*!\[([^\]]*)\]\(([^)]+)\)[ \t]*$/gm;
  const items = [];
  let match;
  let n = 0;
  while ((match = re.exec(normalized)) !== null) {
    n += 1;
    items.push({
      id: "fig-" + n,
      caption: match[1].trim(),
      src: match[2].trim(),
      type: classifyMedia(match[2], match[1])
    });
  }
  return items;
}

const wikiFiles = walk(wikiRoot, file => file.endsWith(".md"));
const pages = wikiFiles.map(file => {
  const rel = path.relative(wikiRoot, file).replace(/\\/g, "/");
  const slug = path.basename(file, ".md");
  const text = fs.readFileSync(file, "utf8");
  const parsed = parseFrontmatter(text);
  const body = parsed.body.trim();
  const heading = body.match(/^#\s+(.+)$/m);
  const title = parsed.meta.title || (heading ? heading[1].trim() : titleFromSlug(slug));
  return {
    id: rel.replace(/\.md$/, ""),
    slug,
    rel,
    namespace: classify(rel, parsed.meta),
    title,
    summary: firstParagraph(body).replace(/\[\[([^\]]+)\]\]/g, "$1").slice(0, 240),
    updated: String(parsed.meta.updated || parsed.meta.created || ""),
    created: String(parsed.meta.created || ""),
    sources: Number(parsed.meta.sources || 0),
    tags: Array.isArray(parsed.meta.tags) ? parsed.meta.tags : [],
    type: parsed.meta.type || "",
    extras: parseExtras(parsed.meta.extras),
    media: parseMedia(body),
    meta: parsed.meta,
    markdown: body
  };
}).sort((a, b) => a.title.localeCompare(b.title));

const rawFiles = walk(rawRoot).map(file => {
  const stat = fs.statSync(file);
  return {
    rel: path.relative(rawRoot, file).replace(/\\/g, "/"),
    size: stat.size,
    updated: stat.mtime.toISOString().slice(0, 10)
  };
}).sort((a, b) => a.rel.localeCompare(b.rel));

// Build a slug → page index for resolving wikilinks server-side.
const slugIndex = pages.reduce((acc, page) => {
  (acc[page.slug] ||= []).push(page);
  return acc;
}, {});

function resolveWikilinkTarget(rawLink) {
  const clean = rawLink.split("|")[0].trim().replace(/^wiki\//, "").replace(/\.md$/, "");
  const directHit = pages.find(p => p.id === clean);
  if (directHit) return directHit.id;
  const slug = clean.split("/").pop();
  const matches = slugIndex[slug] || [];
  if (!matches.length) return "";
  const preferred = matches.find(p => p.namespace !== "glossary") || matches[0];
  return preferred.id;
}

// Pre-compute the backlink graph once (was O(pages × regex) per page open in the browser).
const backlinksMap = {};
pages.forEach(page => {
  const matches = Array.from(page.markdown.matchAll(/\[\[([^\]]+)\]\]/g));
  matches.forEach(match => {
    const targetId = resolveWikilinkTarget(match[1]);
    if (!targetId || targetId === page.id) return;
    (backlinksMap[targetId] ||= []).push({ id: page.id, title: page.title, namespace: page.namespace });
  });
});
Object.keys(backlinksMap).forEach(targetId => {
  const seen = new Set();
  backlinksMap[targetId] = backlinksMap[targetId]
    .filter(link => seen.has(link.id) ? false : (seen.add(link.id), true))
    .sort((a, b) => a.title.localeCompare(b.title));
});

// Real collisions = same slug in the same namespace. Same slug across namespaces
// (e.g., a role page and its onboarding guide) is intentional and ignored.
const slugNamespaceCounts = pages.reduce((acc, page) => {
  const key = `${page.namespace}::${page.slug}`;
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});

const duplicateSlugs = Object.entries(slugNamespaceCounts)
  .filter(([, count]) => count > 1)
  .map(([key]) => key);

const payload = {
  generatedAt: new Date().toISOString(),
  pages,
  rawFiles,
  duplicateSlugs,
  backlinks: backlinksMap,
  counts: {
    wikiPages: pages.length,
    rawFiles: rawFiles.length,
    sources: pages.filter(page => page.namespace === "sources").length
  }
};

function escapeScriptJson(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TA Brain - Wikipedia Prototype</title>
  <style>
    :root {
      --bg: #f8f9fa;
      --surface: #fff;
      --surface-2: #f1f4f7;
      --ink: #202122;
      --muted: #54595d;
      --faint: #72777d;
      --line: #a2a9b1;
      --line-soft: #d8dde3;
      --link: #0645ad;
      --link-hover: #0b57d0;
      --accent: #2a6f73;
      --warning: #8a5a00;
      --danger: #9f2d2d;
      --question: #6b4ba1;
      --good: #276749;
      --sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
      --serif: Georgia, "Times New Roman", serif;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; min-height: 100vh; background: var(--bg); color: var(--ink); font-family: var(--sans); font-size: 15px; line-height: 1.55; }
    button, input { font: inherit; }
    a, .wiki-link { color: var(--link); text-decoration: none; cursor: pointer; }
    a:hover, .wiki-link:hover { color: var(--link-hover); text-decoration: underline; }
    .app { display: grid; grid-template-columns: 304px minmax(0, 1fr); min-height: 100vh; }
    .sidebar { position: sticky; top: 0; height: 100vh; overflow: auto; border-right: 1px solid var(--line-soft); background: #fff; padding: 0; }
    .sidebar-head { position: sticky; top: 0; z-index: 2; background: #fff; padding: 22px 16px 14px; border-bottom: 1px solid var(--line-soft); }
    .sidebar nav { display: block; padding: 10px 16px 32px; }
    .brand { display: flex; align-items: center; gap: 12px; padding-bottom: 16px; border-bottom: 1px solid var(--line-soft); margin-bottom: 18px; }
    .brand-icon { position: relative; width: 100px; height: 100px; border-radius: 22px; background: #fff; color: #fff; display: grid; place-items: center; font-family: var(--serif); font-size: 13px; font-weight: 600; letter-spacing: -0.02em; flex: 0 0 auto; overflow: hidden; border: 1px solid rgba(42, 111, 115, 0.22); box-shadow: 0 12px 24px rgba(32, 33, 34, 0.13); }
    .brand-icon img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
    .brand-title { font-family: var(--serif); font-size: 24px; font-weight: 400; letter-spacing: -0.012em; line-height: 1; }
    .brand-subtitle { color: var(--faint); font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; align-self: center; }
    .search-box { position: relative; margin-bottom: 0; }
    .search-box input { width: 100%; border: 1px solid var(--line-soft); background: #fcfcfd; color: var(--ink); padding: 9px 10px 9px 32px; border-radius: 4px; outline: none; transition: border-color 0.12s ease, box-shadow 0.12s ease, background 0.12s ease; }
    .search-box input::placeholder { color: var(--faint); }
    .search-box input:hover { background: #fff; border-color: #c0c6cc; }
    .search-box input:focus { background: #fff; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(42, 111, 115, 0.14); }
    .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--faint); pointer-events: none; }
    .search-results { display: none; position: absolute; z-index: 30; left: 0; right: 0; top: calc(100% + 6px); border: 1px solid var(--line); background: #fff; max-height: 430px; overflow: auto; box-shadow: 0 12px 30px rgba(32, 33, 34, 0.16); border-radius: 4px; }
    .search-results.open { display: block; }
    .search-result { border: 0; border-bottom: 1px solid var(--line-soft); background: transparent; width: 100%; text-align: left; padding: 10px; cursor: pointer; }
    .search-result:hover { background: var(--surface-2); }
    .search-result strong { display: block; color: var(--ink); font-size: 14px; }
    .search-result span { display: block; color: var(--muted); font-size: 12px; margin-top: 2px; }
    .namespace { margin-bottom: 4px; }
    .namespace summary { cursor: pointer; list-style: none; display: grid; grid-template-columns: 12px minmax(0, 1fr) auto; align-items: center; gap: 10px; min-height: 32px; font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); padding: 6px 6px; border-radius: 4px; transition: color 0.15s ease, background 0.15s ease; }
    .namespace summary::-webkit-details-marker { display: none; }
    .namespace summary::before { content: ""; width: 0; height: 0; border-left: 4px solid var(--accent); border-top: 4px solid transparent; border-bottom: 4px solid transparent; transition: transform 0.15s ease; transform-origin: 25% 50%; }
    .namespace[open] summary::before { transform: rotate(90deg); }
    .namespace summary:hover { color: #1f5559; background: #eef5f5; }
    .namespace-title { min-width: 0; }
    .namespace-label { display: block; }
    .namespace-hint { display: none; }
    .count { color: var(--muted); font-weight: 600; font-size: 11px; font-variant-numeric: tabular-nums; background: #eef2f6; padding: 1px 7px; border-radius: 999px; }
    .nav-list { list-style: none; margin: 2px 0 6px 14px; padding: 0 0 0 12px; position: relative; }
    .nav-list::before { content: ""; position: absolute; left: 0; top: 4px; bottom: 4px; width: 1px; background: var(--line-soft); }
    .nav-list li + li { margin-top: 0; }
    .nav-item { position: relative; border: 0; background: transparent; color: var(--muted); width: 100%; text-align: left; padding: 5px 10px; cursor: pointer; font-size: 15px; line-height: 1.4; border-radius: 4px; transition: color 0.15s ease, background 0.15s ease; }
    .nav-item::before { content: ""; position: absolute; left: -12px; top: 4px; bottom: 4px; width: 3px; background: var(--accent); border-radius: 2px; opacity: 0; transform: translateX(-4px); transition: opacity 0.18s ease, transform 0.18s ease; }
    .nav-item:hover { background: #f6f8fa; color: var(--ink); }
    .nav-item.active { background: #eaf2f3; color: var(--ink); font-weight: 600; }
    .nav-item:hover::before, .nav-item.active::before { opacity: 1; transform: translateX(0); }
    .main { min-width: 0; display: grid; grid-template-rows: auto minmax(0, 1fr); }
    .topbar { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; gap: 16px; min-height: 50px; border-bottom: 1px solid var(--line-soft); background: #fff; padding: 8px 24px; }
    .crumbs { color: var(--muted); font-size: 13px; flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .crumbs strong { color: var(--ink); font-weight: 600; }
    .page-tools { display: flex; gap: 8px; align-items: center; }
    .page-tools button { border: 1px solid var(--line); background: #fff; padding: 5px 10px; border-radius: 2px; cursor: pointer; color: var(--muted); font-size: 13px; }
    .page-tools button:hover { background: var(--surface-2); color: var(--ink); }
    .page-tools .meta-short { color: var(--faint); font-size: 12px; padding-left: 6px; border-left: 1px solid var(--line-soft); margin-left: 2px; }
    .article-shell { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 28px; width: min(1440px, calc(100% - 48px)); margin: 0 auto; padding: 28px 0 80px; }
    .article { min-width: 0; }
    .article h1 { margin: 0 0 4px; padding: 14px 0 8px; border-bottom: 1px solid var(--line); font-family: var(--serif); font-size: clamp(30px, 3.4vw, 42px); line-height: 1.15; font-weight: 400; letter-spacing: -0.005em; position: sticky; top: 50px; z-index: 5; background: var(--bg); display: flex; align-items: baseline; gap: 14px; }
    .article h1 .h1-title { flex: 1; min-width: 0; }
    .article h1 .h1-media-link { flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border: 1px solid var(--line-soft); background: #fff; border-radius: 999px; color: var(--muted); font-family: var(--sans); font-size: 12px; font-weight: 600; line-height: 1; text-decoration: none; cursor: pointer; transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease; align-self: center; }
    .article h1 .h1-media-link:hover { background: #e8f0f2; color: var(--accent); border-color: #9ec6c8; }
    .article h1 .h1-media-link svg { display: block; }
    .article h1 .h1-media-link .h1-media-count { font-size: 11px; opacity: 0.85; }
    .extras-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 18px; }
    .extras-row--compact { margin: 0; gap: 4px; flex-wrap: nowrap; }
    .extras-row--compact .extra-link { padding: 4px 6px; }
    .extra-link { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border: 1px solid var(--line-soft); background: #fff; color: var(--muted); font-size: 13px; border-radius: 2px; text-decoration: none; transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease; }
    .extra-link:hover { background: #e8f0f2; color: var(--accent); border-color: #9ec6c8; text-decoration: none; }
    .extra-icon { display: inline-flex; align-items: center; color: var(--accent); }
    .extra-icon svg { display: block; }
    .topbar-extras { display: flex; align-items: center; gap: 6px; padding-right: 8px; border-right: 1px solid var(--line-soft); margin-right: 4px; }
    .topbar-extras:empty { display: none; }
    .article h2 { margin: 32px 0 10px; padding-bottom: 5px; border-bottom: 1px solid var(--line-soft); font-family: var(--serif); font-weight: 400; font-size: 24px; line-height: 1.25; }
    .article h3 { margin: 22px 0 8px; font-size: 17px; font-weight: 600; }
    .article h4 { margin: 18px 0 6px; font-size: 15px; font-weight: 600; }
    .article p { margin: 0 0 14px; }
    .lede { color: #2a2e33; font-size: 17px; line-height: 1.65; margin: 0 0 22px; }
    .metadata-line { color: var(--muted); font-size: 12.5px; margin-bottom: 18px; }
    .article ul, .article ol { margin: 0 0 16px 24px; padding: 0; }
    .article li + li { margin-top: 5px; }
    .article table { width: 100%; border-collapse: collapse; margin: 12px 0 20px; font-size: 14px; }
    .article th, .article td { border: 1px solid var(--line-soft); padding: 8px 10px; vertical-align: top; }
    .article th { background: var(--surface-2); text-align: left; }
    .home-grid, .namespace-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-top: 20px; }
    .wiki-panel, .namespace-card { border: 1px solid var(--line-soft); background: #fff; padding: 16px; }
    .wiki-panel h2 { margin-top: 0; font-size: 23px; }
    .link-list { columns: 2; column-gap: 24px; list-style: none; padding: 0; margin: 0; }
    .link-list li { break-inside: avoid; margin: 0 0 7px; }
    .right-rail { display: grid; gap: 16px; align-content: start; }
    .infobox { position: static; align-self: start; border: 1px solid var(--line); background: #fff; font-size: 13px; }
    .infobox-title { background: #e8f0f2; border-bottom: 1px solid var(--line); padding: 10px 12px; font-weight: 700; text-align: center; font-family: var(--serif); font-size: 18px; line-height: 1.25; min-height: calc(1.25em * 2 + 20px); display: flex; align-items: center; justify-content: center; box-sizing: border-box; }
    .infobox-row { display: grid; grid-template-columns: 104px minmax(0, 1fr); border-bottom: 1px solid var(--line-soft); }
    .infobox-row:last-child { border-bottom: 0; }
    .infobox-key { background: #f5f6f7; padding: 8px 9px; color: var(--ink); font-weight: 700; }
    .infobox-value { padding: 8px 9px; color: var(--muted); overflow-wrap: anywhere; }
    .rail-box { border: 1px solid var(--line); background: #fff; font-size: 13px; overflow: hidden; }
    .rail-box h3 { margin: 0; padding: 8px 12px; background: #e8f0f2; border-bottom: 1px solid var(--line); font-family: var(--serif); font-size: 15px; font-weight: 700; text-align: center; text-transform: none; letter-spacing: normal; color: var(--ink); }
    .toc-list, .backlink-list, .tag-list { list-style: none; margin: 0; padding: 10px 12px; }
    .toc-list li + li, .backlink-list li + li { margin-top: 6px; }
    .tag-list { display: flex; flex-wrap: wrap; gap: 6px; }
    .toc-list li, .backlink-list li { position: relative; }
    .toc-list li::before, .backlink-list li::before { content: ""; position: absolute; left: 0; top: 6px; bottom: 6px; width: 3px; background: var(--accent); border-radius: 2px; opacity: 0; transform: translateX(-2px); transition: opacity 0.18s ease, transform 0.18s ease; pointer-events: none; }
    .toc-list li:hover::before, .backlink-list li:hover::before { opacity: 1; transform: translateX(0); }
    .toc-list a, .backlink-list .wiki-link { display: inline-block; transition: transform 0.18s ease, color 0.15s ease; }
    .toc-list li:hover a, .backlink-list li:hover .wiki-link { transform: translateX(8px); color: var(--accent); text-decoration: none; }
    .toc-list a:hover, .backlink-list .wiki-link:hover { text-decoration: none; }
    .figure { margin: 18px 0; border: 1px solid var(--line-soft); background: #fff; scroll-margin-top: 130px; overflow: hidden; }
    .figure-body { background: #f6f8fa; min-height: 220px; display: flex; align-items: center; justify-content: center; padding: 14px; }
    .figure img { display: block; max-width: 100%; max-height: 620px; width: auto; height: auto; cursor: zoom-in; box-shadow: 0 1px 3px rgba(0,0,0,0.08); image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; }
    @supports (image-rendering: high-quality) { .figure img { image-rendering: high-quality; } }
    .figure figcaption { padding: 8px 12px; font-size: 13px; color: var(--muted); border-top: 1px solid var(--line-soft); background: #fcfcfd; line-height: 1.45; }
    .figure .zoom-hint { position: absolute; opacity: 0; }
    .lightbox { position: fixed; inset: 0; z-index: 100; background: rgba(20, 22, 26, 0.88); display: none; align-items: center; justify-content: center; padding: 32px; cursor: zoom-out; }
    .lightbox.open { display: flex; }
    .lightbox-inner { max-width: 100%; max-height: 100%; display: flex; flex-direction: column; align-items: center; gap: 14px; cursor: default; }
    .lightbox img { max-width: 100%; max-height: calc(100vh - 120px); width: auto; height: auto; object-fit: contain; background: #fff; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45); }
    .lightbox-caption { color: #f0f2f5; font-size: 13.5px; max-width: min(900px, 90vw); text-align: center; line-height: 1.5; }
    .lightbox-close { position: absolute; top: 18px; right: 18px; width: 36px; height: 36px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.08); color: #fff; cursor: pointer; font-size: 20px; line-height: 1; display: flex; align-items: center; justify-content: center; }
    .lightbox-close:hover { background: rgba(255,255,255,0.18); }
    .media-list { list-style: none; margin: 0; padding: 0; }
    .media-list li { display: flex; }
    .media-list a { display: flex; align-items: center; gap: 8px; padding: 7px 12px; border-bottom: 1px solid #f0f2f5; flex: 1; min-width: 0; color: var(--link); transition: background 0.12s ease; text-decoration: none; }
    .media-list li:last-child a { border-bottom: 0; }
    .media-list a:hover { background: #f8fbfb; }
    .media-list a:hover .media-label { text-decoration: underline; }
    .media-icon { width: 14px; height: 14px; flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; }
    .media-icon svg { display: block; }
    .media-icon.t-screenshot { color: var(--muted); }
    .media-icon.t-diagram { color: var(--accent); }
    .media-icon.t-animation { color: var(--warning); }
    .media-icon.t-external { color: var(--question); }
    .media-label { font-size: 13px; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .media-tag { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--faint); flex: 0 0 auto; }
    .tag { display: inline-flex; align-items: center; border: 1px solid var(--line-soft); background: #fff; color: var(--muted); padding: 4px 10px; border-radius: 999px; font-size: 12px; transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease; cursor: default; }
    .tag:hover { background: #e8f0f2; color: var(--accent); border-color: #9ec6c8; }
    .callout { border: 1px solid var(--line-soft); border-left: 4px solid var(--accent); background: #f8fbfb; margin: 16px 0; padding: 12px 14px; }
    .callout.warning { border-left-color: var(--warning); background: #fff8e8; }
    .callout.question { border-left-color: var(--question); background: #f7f2ff; }
    .callout.contradiction { border-left-color: var(--danger); background: #fff0f0; }
    .callout.key { border-left-color: var(--good); background: #f1fbf5; }
    .callout-title { font-weight: 700; margin-bottom: 4px; }
    .mobile-menu { display: none; }
    code { background: #f1f4f7; border: 1px solid #e1e5ea; padding: 1px 4px; border-radius: 2px; }
    pre { background: #f6f8fa; border: 1px solid var(--line-soft); padding: 12px; overflow: auto; }
    blockquote { margin: 14px 0; padding: 0 0 0 14px; border-left: 3px solid var(--line); color: #3b4045; }
    @media (max-width: 1100px) {
      .app { grid-template-columns: 1fr; }
      .sidebar { display: none; position: fixed; z-index: 40; inset: 0 auto 0 0; width: min(340px, calc(100vw - 36px)); box-shadow: 14px 0 30px rgba(32, 33, 34, 0.2); }
      .sidebar.open { display: block; }
      .mobile-menu { display: inline-flex; }
      .article-shell { grid-template-columns: 1fr; width: min(100% - 24px, 980px); gap: 22px; }
      .infobox { position: static; }
    }
    @media (max-width: 720px) {
      .topbar { grid-template-columns: 1fr; min-height: auto; padding: 10px 12px; gap: 8px; }
      .brief-kicker { display: none; }
      .topbar-geometry { display: none; }
      .page-tools { display: none; }
      .article { padding: 24px 18px 32px; }
      .home-grid, .namespace-cards { grid-template-columns: 1fr; }
      .link-list { columns: 1; }
    }
  </style>
</head>
<body>
  <div class="app">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-head">
        <div class="brand">
          <span class="brand-icon" aria-hidden="true"><img src="assets/ta-brain-rich-network-icon.png" alt=""></span>
          <span class="brand-title">TA Brain</span>
          <span class="brand-subtitle">wiki</span>
        </div>
        <div class="search-box">
          <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input id="searchInput" type="search" placeholder="Search ${payload.counts.wikiPages} pages">
          <div id="searchResults" class="search-results"></div>
        </div>
      </div>
      <nav id="sidebarNav" aria-label="Wiki namespaces"></nav>
    </aside>
    <section class="main">
      <header class="topbar">
        <button class="mobile-menu" id="menuButton" type="button">Menu</button>
        <div class="crumbs" id="breadcrumbs">TA Brain / Home</div>
        <div class="topbar-extras" id="topbarExtras"></div>
        <div class="page-tools">
          <button type="button" data-open="__home">Main page</button>
          <button type="button" data-open="__all-pages">All pages</button>
          <span class="meta-short" id="pageMetaShort">${payload.counts.wikiPages} pages / ${payload.counts.sources} sources</span>
        </div>
      </header>
      <div class="article-shell">
        <article class="article" id="article"></article>
        <aside class="right-rail" id="rightRail"></aside>
      </div>
    </section>
  </div>
  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
    <button type="button" class="lightbox-close" id="lightboxClose" aria-label="Close">&times;</button>
    <div class="lightbox-inner" id="lightboxInner">
      <img id="lightboxImg" alt="">
      <div class="lightbox-caption" id="lightboxCaption"></div>
    </div>
  </div>
  <script id="wikiPayload" type="application/json">${escapeScriptJson(payload)}</script>
  <script>
    const payload = JSON.parse(document.getElementById("wikiPayload").textContent);
    const pages = payload.pages;
    const rawFiles = payload.rawFiles;
    const namespaceInfo = {
      home: { label: "Home", description: "Main wiki entry point." },
      roles: { label: "Roles", description: "Job role articles." },
      departments: { label: "Departments", description: "Team and department articles." },
      systems: { label: "Systems", description: "Tools, platforms, and applications." },
      documents: { label: "Documents", description: "Forms, packages, notices, templates, reports, and files." },
      processes: { label: "Processes", description: "Cross-team workflows and operational procedures." },
      people: { label: "People", description: "Curated operational people and SMEs." },
      glossary: { label: "Glossary", description: "Short acronym and term definitions." },
      reference: { label: "Reference", description: "Operational concepts and reference articles." },
      onboarding: { label: "Onboarding", description: "Ordered reading guides." },
      sources: { label: "Sources", description: "Locked source summaries and archive material." },
      analyses: { label: "Analyses", description: "Filed synthesis pages." },
      admin: { label: "Wiki Admin", description: "Index, log, and build artifacts." }
    };
    const namespaceOrder = ["roles", "departments", "systems", "documents", "processes", "people", "glossary", "reference", "onboarding", "sources", "analyses", "admin"];
    const pageMap = new Map(pages.map(page => [page.id, page]));
    const slugMap = pages.reduce((acc, page) => {
      (acc[page.slug] ||= []).push(page);
      return acc;
    }, {});
    const qs = selector => document.querySelector(selector);
    const qsa = selector => Array.from(document.querySelectorAll(selector));
    const escapeHtml = text => String(text ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
    function resolveLink(raw) {
      const clean = raw.split("|")[0].trim().replace(/^wiki\\//, "").replace(/\\.md$/, "");
      if (pageMap.has(clean)) return clean;
      const slug = clean.split("/").pop();
      const matches = slugMap[slug] || [];
      if (!matches.length) return "";
      const preferred = matches.find(page => page.namespace !== "glossary") || matches[0];
      return preferred.id;
    }
    function linkifyInline(text) {
      return escapeHtml(text)
        .replace(/\\[\\[([^\\]]+)\\]\\]/g, (_, raw) => {
          const parts = raw.split("|");
          const target = resolveLink(parts[0]);
          const label = parts[1] || parts[0].split("/").pop();
          return target ? '<span class="wiki-link" data-open="' + escapeHtml(target) + '">' + escapeHtml(label) + '</span>' : escapeHtml(label);
        })
        .replace(/\\*\\*([^*]+)\\*\\*/g, "<strong>$1</strong>")
        .replace(/\`([^\`]+)\`/g, "<code>$1</code>");
    }
    function renderMarkdown(md) {
      const lines = md.replace(/\\r\\n/g, "\\n").split("\\n");
      const html = [];
      let list = null;
      let table = null;
      let inCode = false;
      let codeLines = [];
      let figureCount = 0;
      function closeList() {
        if (list) {
          html.push("</" + list + ">");
          list = null;
        }
      }
      function closeTable() {
        if (table) {
          html.push("</tbody></table>");
          table = null;
        }
      }
      lines.forEach((line, idx) => {
        if (line.startsWith("\`\`\`")) {
          if (inCode) {
            html.push("<pre><code>" + escapeHtml(codeLines.join("\\n")) + "</code></pre>");
            codeLines = [];
            inCode = false;
          } else {
            closeList(); closeTable(); inCode = true;
          }
          return;
        }
        if (inCode) {
          codeLines.push(line);
          return;
        }
        const trimmed = line.trim();
        if (!trimmed) {
          closeList(); closeTable();
          return;
        }
        const callout = trimmed.match(/^>\\s*\\[!(\\w+)\\]\\s*(.*)$/);
        if (callout) {
          closeList(); closeTable();
          const type = callout[1].toLowerCase();
          html.push('<div class="callout ' + escapeHtml(type) + '"><div class="callout-title">' + escapeHtml(type.charAt(0).toUpperCase() + type.slice(1)) + '</div><div>' + linkifyInline(callout[2]) + '</div></div>');
          return;
        }
        if (trimmed.startsWith(">")) {
          closeList(); closeTable();
          html.push("<blockquote>" + linkifyInline(trimmed.replace(/^>\\s?/, "")) + "</blockquote>");
          return;
        }
        const heading = trimmed.match(/^(#{1,4})\\s+(.+)$/);
        if (heading) {
          closeList(); closeTable();
          const level = heading[1].length;
          const text = heading[2].replace(/#+$/, "").trim();
          const id = "h-" + idx + "-" + text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          html.push("<h" + level + ' id="' + id + '">' + linkifyInline(text) + "</h" + level + ">");
          return;
        }
        if (/^\\|.+\\|$/.test(trimmed)) {
          closeList();
          const cells = trimmed.split("|").slice(1, -1).map(cell => cell.trim());
          if (cells.every(cell => /^:?-{2,}:?$/.test(cell))) return;
          if (!table) {
            table = true;
            html.push("<table><tbody>");
          }
          html.push("<tr>" + cells.map(cell => "<td>" + linkifyInline(cell) + "</td>").join("") + "</tr>");
          return;
        }
        const bullet = trimmed.match(/^[-*]\\s+(.+)$/);
        const ordered = trimmed.match(/^\\d+[.)]\\s+(.+)$/);
        if (bullet || ordered) {
          closeTable();
          const kind = bullet ? "ul" : "ol";
          if (list !== kind) {
            closeList();
            list = kind;
            html.push("<" + kind + ">");
          }
          html.push("<li>" + linkifyInline((bullet || ordered)[1]) + "</li>");
          return;
        }
        const imgMatch = trimmed.match(/^!\\[([^\\]]*)\\]\\(([^)]+)\\)$/);
        if (imgMatch) {
          closeList(); closeTable();
          figureCount += 1;
          const cap = imgMatch[1].trim();
          const src = imgMatch[2].trim();
          html.push('<figure class="figure" id="fig-' + figureCount + '"><div class="figure-body"><img src="' + escapeHtml(src) + '" alt="' + escapeHtml(cap) + '" loading="lazy"></div>' + (cap ? '<figcaption>' + escapeHtml(cap) + '</figcaption>' : '') + '</figure>');
          return;
        }
        closeList(); closeTable();
        html.push("<p>" + linkifyInline(trimmed) + "</p>");
      });
      closeList(); closeTable();
      if (inCode) html.push("<pre><code>" + escapeHtml(codeLines.join("\\n")) + "</code></pre>");
      return html.join("\\n");
    }
    function tocFor(markdown) {
      return markdown.split(/\\r?\\n/).map((line, idx) => {
        const match = line.trim().match(/^(#{2,3})\\s+(.+)$/);
        if (!match) return null;
        const text = match[2].replace(/#+$/, "").trim();
        const id = "h-" + idx + "-" + text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        return { id, text, level: match[1].length };
      }).filter(Boolean);
    }
    function articleBodyMarkdown(page) {
      const newline = String.fromCharCode(10);
      const carriage = String.fromCharCode(13);
      const lines = page.markdown.split(newline).map(line => line.endsWith(carriage) ? line.slice(0, -1) : line);
      if (lines[0] && lines[0].trim().startsWith("# ")) {
        lines.shift();
        while (lines[0] !== undefined && !lines[0].trim()) lines.shift();
      }
      const normalize = value => {
        let text = String(value || "").trim();
        while (text.includes("  ")) text = text.replaceAll("  ", " ");
        return text;
      };
      const summary = normalize(page.summary);
      if (summary) {
        let paragraphLines = [];
        let cursor = 0;
        while (lines[cursor] !== undefined && lines[cursor].trim() && !lines[cursor].trim().startsWith("#")) {
          paragraphLines.push(lines[cursor]);
          cursor += 1;
        }
        const firstParagraph = normalize(paragraphLines.join(" "));
        if (firstParagraph && (firstParagraph === summary || summary.startsWith(firstParagraph) || firstParagraph.startsWith(summary) || firstParagraph.includes(summary.slice(0, 80)))) {
          lines.splice(0, cursor);
          while (lines[0] !== undefined && !lines[0].trim()) lines.shift();
        }
      }
      return lines.join(newline).trim();
    }
    function getBacklinks(pageId) {
      return (payload.backlinks[pageId] || []).map(link => pageMap.get(link.id)).filter(Boolean);
    }
    function renderSidebar(currentId) {
      const currentPage = pageMap.get(currentId);
      const activeNamespace = currentPage ? currentPage.namespace : "";
      qs("#sidebarNav").innerHTML = namespaceOrder.map(ns => {
        const group = pages.filter(page => page.namespace === ns);
        if (!group.length) return "";
        const open = ns === activeNamespace ? "open" : "";
        return '<details class="namespace" ' + open + '><summary><span class="namespace-title"><span class="namespace-label">' + namespaceInfo[ns].label + '</span><span class="namespace-hint">' + namespaceInfo[ns].description + '</span></span><span class="count">' + group.length + '</span></summary><ul class="nav-list">' +
          group.sort((a,b) => a.title.localeCompare(b.title)).map(page => '<li><button class="nav-item ' + (page.id === currentId ? "active" : "") + '" data-open="' + escapeHtml(page.id) + '" type="button">' + escapeHtml(page.title) + '</button></li>').join("") +
          '</ul></details>';
      }).join("");
    }
    function renderHome() {
      const recent = [...pages].filter(page => page.updated).sort((a,b) => String(b.updated).localeCompare(String(a.updated))).slice(0, 12);
      const cornerstoneSlugs = ["lm-dc", "com", "plan-conversion-handoffs", "p3", "eds", "informatica", "toa", "subpack", "liquidation-day", "final-files-posting"];
      const cornerstone = cornerstoneSlugs.map(slug => (slugMap[slug] || [])[0]).filter(Boolean);
      return '<h1>TA Brain</h1><p class="lede">A Wikipedia-style internal knowledge base generated from every markdown page in <code>wiki/</code>.</p>' +
        '<div class="metadata-line">Generated ' + escapeHtml(payload.generatedAt.slice(0, 19).replace("T", " ")) + ' / ' + payload.counts.wikiPages + ' wiki pages / ' + payload.counts.sources + ' source summaries / ' + payload.counts.rawFiles + ' raw files inventoried</div>' +
        (payload.duplicateSlugs.length ? '<div class="callout warning"><div class="callout-title">Duplicate slugs detected</div><div>' + payload.duplicateSlugs.map(escapeHtml).join(", ") + '. This prototype uses path-based IDs so every page is still visible.</div></div>' : "") +
        '<div class="home-grid"><section class="wiki-panel"><h2>Browse Namespaces</h2><ul class="link-list">' + namespaceOrder.map(ns => {
          const count = pages.filter(page => page.namespace === ns).length;
          return count ? '<li><span class="wiki-link" data-open="__all-pages">' + namespaceInfo[ns].label + '</span> <span class="metadata-line">' + count + '</span></li>' : "";
        }).join("") + '</ul></section>' +
        '<section class="wiki-panel"><h2>Cornerstone Articles</h2><ul>' + cornerstone.map(page => '<li><span class="wiki-link" data-open="' + escapeHtml(page.id) + '">' + escapeHtml(page.title) + '</span></li>').join("") + '</ul></section>' +
        '<section class="wiki-panel"><h2>Recently Updated</h2><ul>' + recent.map(page => '<li><span class="wiki-link" data-open="' + escapeHtml(page.id) + '">' + escapeHtml(page.title) + '</span> <span class="metadata-line">' + escapeHtml(page.updated) + '</span></li>').join("") + '</ul></section>' +
        '<section class="wiki-panel"><h2>Raw Source Inventory</h2><p>' + payload.counts.rawFiles + ' files found under <code>raw/</code>. These are inventoried, while source summary articles remain under Sources.</p><p><span class="wiki-link" data-open="__raw-files">View raw inventory</span></p></section></div>';
    }
    function renderAllPages() {
      return '<h1>All Pages</h1><p class="lede">Every markdown page from <code>wiki/</code>, classified into Wikipedia-style namespaces for this prototype.</p><div class="namespace-cards">' +
        namespaceOrder.map(ns => {
          const group = pages.filter(page => page.namespace === ns).sort((a,b) => a.title.localeCompare(b.title));
          if (!group.length) return "";
          return '<section class="namespace-card"><h2>' + namespaceInfo[ns].label + ' <span class="metadata-line">' + group.length + '</span></h2><p>' + namespaceInfo[ns].description + '</p><ul>' + group.map(page => '<li><span class="wiki-link" data-open="' + escapeHtml(page.id) + '">' + escapeHtml(page.title) + '</span> <span class="metadata-line">' + escapeHtml(page.rel) + '</span></li>').join("") + '</ul></section>';
        }).join("") + '</div>';
    }
    function renderRawFiles() {
      return '<h1>Raw Source Inventory</h1><p class="lede">Files currently present under <code>raw/</code>. They are not rewritten here; this is an inventory so the source pile stays visible.</p><table><tbody>' +
        rawFiles.map(file => '<tr><td><code>' + escapeHtml(file.rel) + '</code></td><td>' + file.size.toLocaleString() + ' bytes</td><td>' + escapeHtml(file.updated) + '</td></tr>').join("") + '</tbody></table>';
    }
    const extraIcons = {
      animation: '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M4 3 L13 8 L4 13 Z"/></svg>',
      deck: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="2" y="3" width="9" height="6.5"/><rect x="5" y="6.5" width="9" height="6.5"/></svg>',
      flow: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="3" cy="3.2" r="1.5"/><circle cx="3" cy="12.8" r="1.5"/><circle cx="13" cy="8" r="1.5"/><path d="M4.3 3.7 L11.7 7.3 M4.3 12.3 L11.7 8.7"/></svg>',
      diagram: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" aria-hidden="true"><circle cx="3" cy="4" r="1.2"/><circle cx="13" cy="4" r="1.2"/><circle cx="3" cy="12" r="1.2"/><circle cx="13" cy="12" r="1.2"/><circle cx="8" cy="8" r="1.2"/><path d="M3.7 5 L7.3 7.3 M12.3 5 L8.7 7.3 M3.7 11 L7.3 8.7 M12.3 11 L8.7 8.7"/></svg>',
      video: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><rect x="1.5" y="3" width="9" height="10"/><path d="M10.5 6 L14.5 4 L14.5 12 L10.5 10 Z"/></svg>',
      doc: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 1.5 L10 1.5 L13 4.5 L13 14.5 L3 14.5 Z"/><path d="M10 1.5 L10 4.5 L13 4.5 M5.5 7.5 L10.5 7.5 M5.5 10 L10.5 10 M5.5 12.5 L8.5 12.5"/></svg>',
      sheet: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="2" y="3" width="12" height="10"/><rect x="2" y="3" width="12" height="2.5" fill="currentColor" opacity="0.18" stroke="none"/><path d="M2 5.5 L14 5.5 M2 9 L14 9 M6 5.5 L6 13 M10 5.5 L10 13"/></svg>',
      code: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><ellipse cx="8" cy="3.5" rx="5" ry="1.8"/><path d="M3 3.5 L3 12.5 Q3 14.3 8 14.3 Q13 14.3 13 12.5 L13 3.5"/><path d="M3 7.5 Q3 9.3 8 9.3 Q13 9.3 13 7.5"/></svg>',
      image: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="10"/><circle cx="6" cy="7" r="1.2"/><path d="M2 11 L6 8 L9 10 L11 8.5 L14 11"/></svg>',
      link: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 9.5 L4.5 12 Q3 13.5 1.5 12 Q0 10.5 1.5 9 L4 6.5"/><path d="M9 6.5 L11.5 4 Q13 2.5 14.5 4 Q16 5.5 14.5 7 L12 9.5"/><path d="M6 10 L10 6"/></svg>'
    };
    function renderExtras(extras, opts) {
      if (!extras || !extras.length) return "";
      const cls = (opts && opts.compact) ? "extras-row extras-row--compact" : "extras-row";
      return '<div class="' + cls + '">' + extras.map(extra => {
        const icon = extraIcons[extra.type] || extraIcons.link;
        const labelHtml = (opts && opts.compact)
          ? ''
          : '<span>' + escapeHtml(extra.label) + '</span>';
        const titleAttr = (opts && opts.compact) ? ' title="' + escapeHtml(extra.label) + '"' : '';
        return '<a class="extra-link" href="' + escapeHtml(extra.href) + '" target="_blank" rel="noopener"' + titleAttr + '><span class="extra-icon">' + icon + '</span>' + labelHtml + '</a>';
      }).join("") + '</div>';
    }
    function renderArticle(page) {
      const bodyMarkdown = articleBodyMarkdown(page);
      const mediaCount = (page.media && page.media.length) || 0;
      const firstMediaId = mediaCount ? page.media[0].id : "";
      const firstMediaType = mediaCount ? (page.media[0].type || "screenshot") : "screenshot";
      const h1MediaIcons = {
        screenshot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><circle cx="9" cy="11" r="2"/><path d="m3 17 5-5 4 4 3-3 6 6"/></svg>',
        diagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7.5 7.5 11 16.5"/><path d="M16.5 7.5 13 16.5"/></svg>',
        animation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m10 9 5 3-5 3z" fill="currentColor"/></svg>'
      };
      const mediaIconSvg = h1MediaIcons[firstMediaType] || h1MediaIcons.screenshot;
      const mediaLink = mediaCount
        ? '<a class="h1-media-link" href="#' + escapeHtml(firstMediaId) + '" data-media-jump title="Jump to media on this page"><span class="h1-media-icon">' + mediaIconSvg + '</span><span>Media</span><span class="h1-media-count">' + mediaCount + '</span></a>'
        : "";
      return '<h1><span class="h1-title">' + escapeHtml(page.title) + '</span>' + mediaLink + '</h1><p class="lede">' + linkifyInline(page.summary || "No summary available.") + '</p>' +
        '<div class="metadata-line">' + namespaceInfo[page.namespace].label + ' / <code>' + escapeHtml(page.rel) + '</code> / Updated ' + escapeHtml(page.updated || "unknown") + ' / ' + page.sources + ' source' + (page.sources === 1 ? "" : "s") + '</div>' +
        renderExtras(page.extras) +
        renderMarkdown(bodyMarkdown);
    }
    function renderRightRail(page) {
      if (!page) {
        qs("#rightRail").innerHTML = '<div class="infobox"><div class="infobox-title">TA Brain</div><div class="infobox-row"><div class="infobox-key">Pages</div><div class="infobox-value">' + payload.counts.wikiPages + '</div></div><div class="infobox-row"><div class="infobox-key">Sources</div><div class="infobox-value">' + payload.counts.sources + '</div></div><div class="infobox-row"><div class="infobox-key">Raw files</div><div class="infobox-value">' + payload.counts.rawFiles + '</div></div></div>';
        return;
      }
      const toc = tocFor(articleBodyMarkdown(page));
      const backlinks = getBacklinks(page.id);
      const rows = [
        ["Type", namespaceInfo[page.namespace].label],
        ["Updated", page.updated || "unknown"],
        page.sources ? ["Sources", page.sources + " ingested"] : null,
        backlinks.length ? ["Linked from", backlinks.length + " page" + (backlinks.length === 1 ? "" : "s")] : null
      ].filter(Boolean);
      const mediaIcons = {
        screenshot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><rect x="3" y="5" width="18" height="14" rx="1"/><circle cx="9" cy="11" r="2"/><path d="m3 17 5-5 4 4 3-3 6 6"/></svg>',
        diagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7.5 7.5 11 16.5"/><path d="M16.5 7.5 13 16.5"/></svg>',
        animation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m10 9 5 3-5 3z" fill="currentColor"/></svg>',
        external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M14 4h6v6"/><path d="M10 14 20 4"/><path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>'
      };
      const mediaTagLabel = { screenshot: "Screenshot", diagram: "Diagram", animation: "Animation", external: "External" };
      const mediaHtml = (page.media && page.media.length)
        ? '<section class="rail-box"><h3>Media</h3><ul class="media-list">' + page.media.map(item => {
            const t = item.type || "screenshot";
            return '<li><a href="#' + escapeHtml(item.id) + '"><span class="media-icon t-' + escapeHtml(t) + '">' + (mediaIcons[t] || mediaIcons.screenshot) + '</span><span class="media-label">' + escapeHtml(item.caption || item.src) + '</span><span class="media-tag">' + escapeHtml(mediaTagLabel[t] || t) + '</span></a></li>';
          }).join("") + '</ul></section>'
        : "";
      qs("#rightRail").innerHTML = '<div class="infobox"><div class="infobox-title">' + escapeHtml(page.title) + '</div>' + rows.map(([k,v]) => '<div class="infobox-row"><div class="infobox-key">' + escapeHtml(k) + '</div><div class="infobox-value">' + escapeHtml(v) + '</div></div>').join("") + '</div>' +
        (toc.length ? '<section class="rail-box"><h3>Contents</h3><ol class="toc-list">' + toc.map(item => '<li><a href="#' + escapeHtml(item.id) + '">' + escapeHtml(item.text) + '</a></li>').join("") + '</ol></section>' : "") +
        mediaHtml +
        (page.tags.length ? '<section class="rail-box"><h3>Categories</h3><div class="tag-list">' + page.tags.map(tag => '<span class="tag">' + escapeHtml(tag) + '</span>').join("") + '</div></section>' : "") +
        '<section class="rail-box"><h3>Referenced By</h3><ul class="backlink-list">' + (backlinks.length ? backlinks.map(link => '<li><span class="wiki-link" data-open="' + escapeHtml(link.id) + '">' + escapeHtml(link.title) + '</span></li>').join("") : "<li>No backlinks found.</li>") + '</ul></section>';
    }
    function setTopbarExtras(page) {
      qs("#topbarExtras").innerHTML = page ? renderExtras(page.extras, { compact: true }) : "";
    }
    function openPage(id, updateHash = true) {
      let page = pageMap.get(id);
      if (id === "__home") {
        qs("#article").innerHTML = renderHome();
        renderRightRail(null);
        renderSidebar("");
        setTopbarExtras(null);
        qs("#breadcrumbs").textContent = "TA Brain / Home";
        qs("#pageMetaShort").textContent = payload.counts.wikiPages + " pages / " + payload.counts.sources + " sources";
        if (updateHash) history.replaceState(null, "", "#__home");
        return;
      }
      if (id === "__all-pages") {
        qs("#article").innerHTML = renderAllPages();
        renderRightRail(null);
        renderSidebar("");
        setTopbarExtras(null);
        qs("#breadcrumbs").textContent = "TA Brain / All Pages";
        if (updateHash) history.replaceState(null, "", "#__all-pages");
        return;
      }
      if (id === "__raw-files") {
        qs("#article").innerHTML = renderRawFiles();
        renderRightRail(null);
        renderSidebar("");
        setTopbarExtras(null);
        qs("#breadcrumbs").textContent = "TA Brain / Raw Source Inventory";
        if (updateHash) history.replaceState(null, "", "#__raw-files");
        return;
      }
      if (!page) page = pages[0];
      qs("#article").innerHTML = renderArticle(page);
      renderRightRail(page);
      renderSidebar(page.id);
      setTopbarExtras(page);
      qs("#breadcrumbs").textContent = "TA Brain / " + namespaceInfo[page.namespace].label + " / " + page.title;
      qs("#pageMetaShort").textContent = page.sources + " source" + (page.sources === 1 ? "" : "s") + " / " + page.rel;
      document.title = page.title + " - TA Brain";
      if (updateHash) history.replaceState(null, "", "#" + encodeURIComponent(page.id));
      qs("#sidebar").classList.remove("open");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function search(query) {
      const term = query.trim().toLowerCase();
      if (!term) return [];
      return pages.map(page => {
        const text = [page.title, page.slug, page.rel, page.summary, page.namespace, page.type, (page.tags || []).join(" "), page.markdown].join(" ").toLowerCase();
        if (!text.includes(term)) return null;
        const score = page.title.toLowerCase().includes(term) || page.slug.toLowerCase().includes(term) ? 2 : 1;
        return { page, score };
      }).filter(Boolean).sort((a,b) => b.score - a.score || a.page.title.localeCompare(b.page.title)).slice(0, 18);
    }
    function openLightbox(src, caption) {
      const lb = qs("#lightbox");
      qs("#lightboxImg").src = src;
      qs("#lightboxImg").alt = caption || "";
      qs("#lightboxCaption").textContent = caption || "";
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      qs("#lightbox").classList.remove("open");
      qs("#lightboxImg").src = "";
      document.body.style.overflow = "";
    }
    function bindEvents() {
      document.addEventListener("click", event => {
        const figImg = event.target.closest(".figure img");
        if (figImg) {
          event.preventDefault();
          const fig = figImg.closest(".figure");
          const cap = fig ? (fig.querySelector("figcaption")?.textContent || figImg.alt) : figImg.alt;
          openLightbox(figImg.getAttribute("src"), cap);
          return;
        }
        const opener = event.target.closest("[data-open]");
        if (opener) {
          openPage(opener.dataset.open);
          qs("#searchResults").classList.remove("open");
        }
      });
      qs("#lightbox").addEventListener("click", event => {
        if (event.target.closest(".lightbox-inner") && !event.target.closest(".lightbox-close")) return;
        closeLightbox();
      });
      qs("#lightboxClose").addEventListener("click", closeLightbox);
      qs("#menuButton").addEventListener("click", () => qs("#sidebar").classList.toggle("open"));
      qs("#searchInput").addEventListener("input", event => {
        const results = search(event.target.value);
        const panel = qs("#searchResults");
        panel.innerHTML = results.length ? results.map(({page}) => '<button class="search-result" data-open="' + escapeHtml(page.id) + '" type="button"><strong>' + escapeHtml(page.title) + '</strong><span>' + namespaceInfo[page.namespace].label + ' / ' + escapeHtml(page.rel) + '</span></button>').join("") : '<button class="search-result" type="button"><strong>No results</strong><span>Try a role, acronym, system, document, or process.</span></button>';
        panel.classList.toggle("open", event.target.value.trim().length > 0);
      });
      document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
          if (qs("#lightbox").classList.contains("open")) { closeLightbox(); return; }
          qs("#searchResults").classList.remove("open");
          qs("#sidebar").classList.remove("open");
        }
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
          event.preventDefault();
          qs("#searchInput").focus();
        }
      });
    }
    bindEvents();
    openPage(location.hash ? decodeURIComponent(location.hash.slice(1)) : "__home", false);
  </script>
</body>
</html>`;

fs.writeFileSync(outPath, html, "utf8");
console.log(JSON.stringify({
  outPath,
  wikiPages: payload.counts.wikiPages,
  rawFiles: payload.counts.rawFiles,
  sources: payload.counts.sources,
  duplicateSlugs
}, null, 2));
