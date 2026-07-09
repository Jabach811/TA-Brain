const fs = require("fs");
const path = require("path");
const { classifyDuplicateBareSlugs } = require("../scripts/wiki-validation-rules");

const root = path.resolve(__dirname, "..");
const wikiRoot = path.join(root, "wiki");
const rawRoot = path.join(root, "raw");
const outPath = process.env.TA_WIKI_OUTPUT
  ? path.resolve(process.env.TA_WIKI_OUTPUT)
  : path.join(root, "current", "TA Wiki.working.html");

// Singular `type:` values in frontmatter map to namespace keys used by the UI.
const NAMESPACE_PLURAL = {
  lifecycle: "lifecycle",
  "data-loading": "data-loading",
  payroll: "payroll",
  "conversion-ops": "conversion-ops",
  coordination: "coordination",
  troubleshooting: "troubleshooting",
  checklist: "checklists",
  reference: "reference",
  vendor: "vendors",
  glossary: "glossary",
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
  const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
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
    status: String(parsed.meta.status || ""),
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

// Build a slug index for resolving wikilinks server-side.
const slugIndex = pages.reduce((acc, page) => {
  (acc[page.slug] ||= []).push(page);
  const aliases = Array.isArray(page.meta.aliases) ? page.meta.aliases : [];
  aliases.forEach(alias => {
    const aliasSlug = String(alias).trim().toLowerCase().split("/").pop();
    if (aliasSlug) (acc[aliasSlug] ||= []).push(page);
  });
  return acc;
}, {});

const NAMESPACE_PRIORITY = ["lifecycle", "data-loading", "payroll", "conversion-ops", "coordination", "troubleshooting", "checklists", "reference", "vendors", "glossary", "onboarding", "sources", "analyses", "admin"];
function namespaceRank(namespace) {
  const rank = NAMESPACE_PRIORITY.indexOf(namespace);
  return rank === -1 ? NAMESPACE_PRIORITY.length : rank;
}
function preferredPage(matches) {
  return [...matches].sort((a, b) => namespaceRank(a.namespace) - namespaceRank(b.namespace) || a.title.localeCompare(b.title))[0];
}
function resolveWikilink(rawLink) {
  const clean = rawLink.split("|")[0].split("#")[0].trim().replace(/^wiki\//, "").replace(/\.md$/, "");
  const directHit = pages.find(p => p.id === clean);
  if (directHit) return { targetId: directHit.id, mode: "direct", candidates: [directHit.id] };
  const slug = clean.split("/").pop();
  const matches = slugIndex[slug] || [];
  if (!matches.length) return { targetId: "", mode: "missing", candidates: [] };
  const preferred = preferredPage(matches);
  return { targetId: preferred.id, mode: matches.length > 1 ? "ambiguous" : "slug", candidates: matches.map(page => page.id) };
}
function resolveWikilinkTarget(rawLink) {
  return resolveWikilink(rawLink).targetId;
}

// Pre-compute the backlink graph once.
const backlinksMap = {};
const brokenLinks = [];
const ambiguousLinks = [];
const seenBrokenLinks = new Set();
const seenAmbiguousLinks = new Set();
pages.forEach(page => {
  const matches = Array.from(page.markdown.matchAll(/\[\[([^\]]+)\]\]/g));
  matches.forEach(match => {
    const resolved = resolveWikilink(match[1]);
    const rawTarget = match[1].split("|")[0].trim();
    if (!resolved.targetId) {
      const key = `${page.id}::${rawTarget}`;
      if (!seenBrokenLinks.has(key)) {
        seenBrokenLinks.add(key);
        brokenLinks.push({ source: page.id, target: rawTarget });
      }
      return;
    }
    if (resolved.mode === "ambiguous") {
      const key = `${page.id}::${rawTarget}::${resolved.targetId}`;
      if (!seenAmbiguousLinks.has(key)) {
        seenAmbiguousLinks.add(key);
        ambiguousLinks.push({ source: page.id, target: rawTarget, resolvedTo: resolved.targetId, candidates: resolved.candidates });
      }
    }
    if (resolved.targetId === page.id) return;
    (backlinksMap[resolved.targetId] ||= []).push({ id: page.id, title: page.title, namespace: page.namespace });
  });
});
Object.keys(backlinksMap).forEach(targetId => {
  const seen = new Set();
  backlinksMap[targetId] = backlinksMap[targetId]
    .filter(link => seen.has(link.id) ? false : (seen.add(link.id), true))
    .sort((a, b) => a.title.localeCompare(b.title));
});

const duplicateBareSlugs = Object.entries(slugIndex)
  .filter(([, matches]) => matches.length > 1)
  .map(([slug, matches]) => ({ slug, ids: matches.map(page => page.id) }));
const duplicateSlugAudit = classifyDuplicateBareSlugs(duplicateBareSlugs);
const duplicateSlugs = duplicateSlugAudit.unexpected.map(item => `${item.slug}: ${item.ids.join(", ")}`);
const indexPage = pages.find(page => page.id === "index");
const indexLinkSlugs = new Set(indexPage ? Array.from(indexPage.markdown.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g)).map(match => match[1].trim().split("/").pop()) : []);
const unindexedPages = pages
  .filter(page => !["index", "log"].includes(page.id))
  .filter(page => !indexLinkSlugs.has(page.slug))
  .map(page => page.id);
const health = {
  brokenLinks,
  ambiguousLinks,
  duplicateBareSlugs: duplicateSlugAudit.unexpected,
  allowedDuplicateBareSlugs: duplicateSlugAudit.allowed,
  staleAllowedDuplicateBareSlugs: duplicateSlugAudit.staleAllowed,
  unindexedPages,
  missingStatus: pages.filter(page => !page.meta.status && !["index", "log"].includes(page.id)).map(page => page.id),
  zeroSourcePages: pages
    .filter(page => !["admin", "sources"].includes(page.namespace))
    .filter(page => Number(page.sources) === 0)
    .map(page => page.id),
  stubLikePages: pages.filter(page => !["index", "log", "overview"].includes(page.id) && /stub|content pending/i.test(page.markdown)).map(page => page.id)
};

const payload = {
  generatedAt: new Date().toISOString(),
  pages,
  rawFiles,
  duplicateSlugs,
  health,
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
  <title>DC Operations Wiki</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400;1,8..60,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f2f1ed;
      --surface: #f7f7f4;
      --surface-2: #ebeae5;
      --surface-3: #e6e5e0;
      --ink: #26251e;
      --muted: rgba(38, 37, 30, 0.68);
      --faint: rgba(38, 37, 30, 0.45);
      --line: rgba(38, 37, 30, 0.2);
      --line-soft: rgba(38, 37, 30, 0.1);
      --link: #d94600;
      --link-hover: #cf2d56;
      --accent: #f54e00;
      --warning: #8a5a00;
      --danger: #cf2d56;
      --question: #6b4ba1;
      --good: #1f8a65;
      --sans: "Archivo", system-ui, "Segoe UI", Arial, sans-serif;
      --serif: "Source Serif 4", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
      --mono: "JetBrains Mono", "Cascadia Mono", Consolas, monospace;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; overflow-y: scroll; }
    body { margin: 0; min-height: 100vh; background: var(--bg); color: var(--ink); font-family: var(--serif); font-size: 15.5px; line-height: 1.58; -webkit-font-smoothing: antialiased; }
    button, input { font: inherit; }
    a, .wiki-link { color: var(--link); text-decoration: none; cursor: pointer; }
    a:hover, .wiki-link:hover { color: var(--link-hover); text-decoration: underline; text-decoration-color: rgba(207, 45, 86, 0.4); }
    .app { display: grid; grid-template-columns: 292px minmax(0, 1fr); min-height: 100vh; }
    .sidebar { position: sticky; top: 0; height: 100vh; overflow: auto; border-right: 1px solid var(--line-soft); background: var(--bg); padding: 0; }
    .sidebar-head { position: sticky; top: 0; z-index: 2; background: var(--bg); padding: 20px 16px 14px; border-bottom: 1px solid var(--line-soft); }
    .sidebar nav { display: block; padding: 12px 16px 32px; }
    .brand { display: flex; align-items: center; gap: 12px; padding-bottom: 16px; border-bottom: 1px solid var(--line-soft); margin-bottom: 16px; }
    .brand-icon { position: relative; width: 64px; height: 64px; border-radius: 14px; background: var(--surface-3); display: grid; place-items: center; flex: 0 0 auto; overflow: hidden; border: 1px solid var(--line-soft); }
    .brand-icon img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
    .brand-title { font-family: var(--sans); font-size: 20px; font-weight: 600; letter-spacing: -0.4px; line-height: 1; }
    .brand-subtitle { color: var(--faint); font-family: var(--mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; align-self: center; }
    .search-box { position: relative; margin-bottom: 0; }
    .search-box input { width: 100%; border: 1px solid var(--line-soft); background: var(--surface); color: var(--ink); font-family: var(--sans); font-size: 13.5px; padding: 8px 10px 8px 32px; border-radius: 8px; outline: none; transition: border-color 0.15s ease, background 0.15s ease; }
    .search-box input::placeholder { color: var(--faint); }
    .search-box input:hover { border-color: var(--line); }
    .search-box input:focus { background: #fff; border-color: var(--line); box-shadow: rgba(0,0,0,0.05) 0 4px 12px; }
    .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--faint); pointer-events: none; }
    .search-results { display: none; position: absolute; z-index: 30; left: 0; right: 0; top: calc(100% + 6px); border: 1px solid var(--line-soft); background: var(--surface); max-height: 430px; overflow: auto; box-shadow: rgba(0,0,0,0.1) 0 14px 32px; border-radius: 8px; }
    .search-results.open { display: block; }
    .search-result { border: 0; border-bottom: 1px solid var(--line-soft); background: transparent; width: 100%; text-align: left; padding: 10px 12px; cursor: pointer; }
    .search-result:last-child { border-bottom: 0; }
    .search-result:hover { background: var(--surface-2); }
    .search-result strong { display: block; color: var(--ink); font-family: var(--sans); font-weight: 500; font-size: 13.5px; }
    .search-result span { display: block; color: var(--faint); font-family: var(--mono); font-size: 10.5px; margin-top: 3px; }
    .namespace { margin-bottom: 2px; }
    .namespace summary { cursor: pointer; list-style: none; display: grid; grid-template-columns: 12px minmax(0, 1fr) auto; align-items: center; gap: 8px; min-height: 32px; font-family: var(--sans); font-size: 11.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted); padding: 6px 6px; border-radius: 8px; transition: color 0.15s ease, background 0.15s ease; }
    .namespace summary::-webkit-details-marker { display: none; }
    .namespace summary::before { content: ""; width: 0; height: 0; border-left: 4px solid var(--faint); border-top: 4px solid transparent; border-bottom: 4px solid transparent; transition: transform 0.15s ease; transform-origin: 25% 50%; }
    .namespace[open] summary::before { transform: rotate(90deg); border-left-color: var(--accent); }
    .namespace summary:hover { color: var(--ink); background: var(--surface-2); }
    .namespace-title { min-width: 0; }
    .namespace-label { display: block; }
    .namespace-hint { display: none; }
    .count { color: var(--faint); font-family: var(--mono); font-weight: 400; font-size: 10.5px; font-variant-numeric: tabular-nums; background: var(--surface-2); padding: 1px 8px; border-radius: 999px; }
    .nav-list { list-style: none; margin: 2px 0 8px 14px; padding: 0 0 0 12px; position: relative; }
    .nav-list::before { content: ""; position: absolute; left: 0; top: 4px; bottom: 4px; width: 1px; background: var(--line-soft); }
    .nav-list li + li { margin-top: 0; }
    .nav-item { position: relative; border: 0; background: transparent; color: var(--muted); width: 100%; text-align: left; padding: 5px 10px; cursor: pointer; font-family: var(--sans); font-size: 13.5px; line-height: 1.45; border-radius: 6px; transition: color 0.15s ease, background 0.15s ease; }
    .nav-item::before { content: ""; position: absolute; left: -12px; top: 5px; bottom: 5px; width: 2px; background: var(--accent); border-radius: 2px; opacity: 0; transform: translateX(-4px); transition: opacity 0.18s ease, transform 0.18s ease; }
    .nav-item:hover { background: var(--surface-2); color: var(--ink); }
    .nav-item.active { background: var(--surface-2); color: var(--ink); font-weight: 500; }
    .nav-item:hover::before, .nav-item.active::before { opacity: 1; transform: translateX(0); }
    .main { min-width: 0; display: grid; grid-template-rows: auto minmax(0, 1fr); }
    .topbar { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; gap: 16px; min-height: 52px; border-bottom: 1px solid var(--line-soft); background: rgba(242, 241, 237, 0.92); backdrop-filter: blur(8px); padding: 8px 24px; }
    .crumbs { color: var(--faint); font-family: var(--sans); font-size: 13px; flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .crumbs strong { color: var(--ink); font-weight: 500; }
    .page-tools { display: flex; gap: 4px; align-items: center; }
    .page-tools button { border: none; background: transparent; padding: 6px 12px; border-radius: 8px; cursor: pointer; color: var(--muted); font-family: var(--sans); font-size: 13px; font-weight: 500; transition: color 0.15s ease, background 0.15s ease; }
    .page-tools button:hover { background: var(--surface-2); color: var(--link-hover); }
    .page-tools .meta-short { color: var(--faint); font-family: var(--mono); font-size: 10.5px; padding-left: 12px; border-left: 1px solid var(--line-soft); margin-left: 6px; width: 210px; flex: 0 0 auto; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .article-shell { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 32px; width: min(1360px, calc(100% - 56px)); margin: 0 auto; padding: 32px 0 96px; }
    .article { min-width: 0; }
    .article h1 { margin: 0 0 6px; padding: 18px 0 12px; border-bottom: 1px solid var(--line); font-family: var(--sans); font-size: clamp(30px, 3.2vw, 38px); line-height: 1.1; font-weight: 600; letter-spacing: -0.025em; position: sticky; top: 52px; z-index: 5; background: var(--bg); display: flex; align-items: baseline; gap: 14px; }
    .article h1 .h1-title { flex: 1; min-width: 0; }
    .article h1 .h1-media-link { flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border: 1px solid var(--line-soft); background: var(--surface); border-radius: 999px; color: var(--muted); font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0; line-height: 1; text-decoration: none; cursor: pointer; transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease; align-self: center; }
    .article h1 .h1-media-link:hover { color: var(--link-hover); border-color: var(--line); text-decoration: none; }
    .article h1 .h1-media-link svg { display: block; }
    .article h1 .h1-media-link .h1-media-count { font-family: var(--mono); font-size: 10.5px; opacity: 0.8; }
    .extras-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 20px; }
    .extras-row--compact { margin: 0; gap: 4px; flex-wrap: nowrap; }
    .extras-row--compact .extra-link { padding: 4px 6px; }
    .extra-link { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border: 1px solid var(--line-soft); background: var(--surface); color: var(--muted); font-family: var(--sans); font-size: 12.5px; font-weight: 500; border-radius: 999px; text-decoration: none; transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease; }
    .extra-link:hover { color: var(--link-hover); border-color: var(--line); text-decoration: none; }
    .extra-icon { display: inline-flex; align-items: center; color: var(--accent); }
    .extra-icon svg { display: block; }
    .topbar-extras { display: flex; align-items: center; gap: 6px; padding-right: 8px; border-right: 1px solid var(--line-soft); margin-right: 4px; }
    .topbar-extras:empty { display: none; }
    .article h2 { margin: 40px 0 12px; padding-bottom: 0; border-bottom: none; font-family: var(--sans); font-weight: 600; font-size: 22px; line-height: 1.25; letter-spacing: -0.015em; }
    .article h3 { margin: 26px 0 8px; font-family: var(--sans); font-size: 16.5px; font-weight: 600; letter-spacing: -0.01em; }
    .article h4 { margin: 20px 0 6px; font-family: var(--sans); font-size: 14.5px; font-weight: 600; }
    .article p { margin: 0 0 15px; }
    .lede { color: var(--muted); font-size: 18.5px; font-style: italic; line-height: 1.5; margin: 0 0 20px; }
    .metadata-line { color: var(--faint); font-family: var(--mono); font-size: 11px; letter-spacing: 0.01em; margin-bottom: 20px; }
    .article ul, .article ol { margin: 0 0 16px 24px; padding: 0; }
    .article li + li { margin-top: 5px; }
    .article table { display: block; width: 100%; max-width: 100%; overflow-x: auto; border-collapse: collapse; margin: 12px 0 24px; font-size: 14px; background: var(--surface); border: 1px solid var(--line-soft); border-radius: 8px; }
    .article th, .article td { border: none; border-bottom: 1px solid var(--line-soft); padding: 10px 14px; vertical-align: top; }
    .article tr:last-child td { border-bottom: none; }
    .article th { background: var(--surface-3); font-family: var(--sans); font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); text-align: left; }
    .home-grid, .namespace-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 22px; }
    .wiki-panel, .namespace-card { border: 1px solid var(--line-soft); background: var(--surface); border-radius: 8px; padding: 18px 20px; }
    .wiki-panel h2, .namespace-card h2 { margin-top: 0; }
    .wiki-panel h2 { margin: 0 0 14px; font-family: var(--sans); font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); padding-bottom: 10px; border-bottom: 1px solid var(--line); }
    .namespace-card h2 { font-family: var(--sans); font-size: 17px; font-weight: 600; letter-spacing: -0.01em; margin-bottom: 8px; }
    .home-actions { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; margin: 22px 0 24px; }
    .home-action { border: 1px solid var(--line-soft); background: var(--surface-3); border-radius: 8px; padding: 13px 14px; min-height: 60px; display: flex; flex-direction: column; justify-content: center; color: var(--muted); cursor: pointer; text-decoration: none; transition: border-color 0.15s ease, box-shadow 0.2s ease; }
    .home-action:hover { border-color: var(--line); box-shadow: rgba(0,0,0,0.05) 0 8px 24px; color: var(--muted); text-decoration: none; }
    .home-action strong { color: var(--ink); font-family: var(--sans); font-size: 13.5px; font-weight: 500; line-height: 1.25; }
    .home-action span { color: var(--faint); font-family: var(--mono); font-size: 10.5px; margin-top: 4px; }
    .health-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; margin: 18px 0 22px; }
    .health-grid--compact { margin-top: 0; grid-template-columns: repeat(6, minmax(0, 1fr)); }
    .health-item { border: 1px solid var(--line-soft); background: var(--surface); border-radius: 8px; padding: 12px 14px; min-width: 0; }
    .health-item.is-ok { border-left: 3px solid var(--good); }
    .health-item.is-watch { border-left: 3px solid var(--warning); }
    .health-item.is-info { border-left: 3px solid var(--accent); }
    .health-value { display: block; color: var(--ink); font-family: var(--sans); font-size: 22px; font-weight: 600; line-height: 1.1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
    .health-label { display: block; color: var(--faint); font-family: var(--sans); font-size: 11.5px; line-height: 1.3; margin-top: 4px; }
    .entry-list { list-style: none; margin: 0; padding: 0; }
    .entry-list li { padding: 9px 0; border-bottom: 1px solid var(--line-soft); }
    .entry-list li:last-child { border-bottom: 0; }
    .entry-list li + li { margin-top: 0; }
    .entry-link { display: inline-block; font-weight: 600; font-size: 15.5px; line-height: 1.3; color: var(--ink); }
    .entry-link:hover { color: var(--link-hover); text-decoration: none; }
    .entry-meta { display: block; color: var(--faint); font-family: var(--mono); font-size: 10.5px; margin-top: 3px; overflow-wrap: anywhere; }
    .namespace-card.issue-card { padding: 0; overflow: hidden; }
    .issue-card h2 { margin: 0; padding: 12px 16px; font-size: 15px; background: var(--surface-2); border-bottom: 1px solid var(--line-soft); }
    .issue-card ul { margin: 0; padding: 13px 16px 15px 32px; }
    .issue-card.is-clear h2 { color: var(--good); }
    .issue-card.is-watch h2 { color: var(--warning); }
    .issue-card.is-info h2 { color: var(--ink); }
    .issue-empty { color: var(--faint); list-style: none; margin-left: -16px; }
    .link-list { columns: 2; column-gap: 24px; list-style: none; padding: 0; margin: 0; }
    .link-list li { break-inside: avoid; margin: 0; padding: 7px 0; border-bottom: 1px solid var(--line-soft); font-family: var(--sans); font-size: 14px; font-weight: 500; }
    .link-list .wiki-link { color: var(--ink); }
    .link-list .wiki-link:hover { color: var(--link-hover); text-decoration: none; }
    .link-list .metadata-line { display: inline; float: right; margin: 0; }
    .right-rail { display: grid; gap: 14px; align-content: start; }
    .infobox { position: static; align-self: start; border: 1px solid var(--line-soft); background: var(--surface); border-radius: 8px; font-size: 13px; overflow: hidden; }
    .infobox-title { background: var(--surface-3); border-bottom: 1px solid var(--line-soft); padding: 12px 14px; font-family: var(--sans); font-weight: 600; text-align: left; font-size: 15px; letter-spacing: -0.01em; line-height: 1.3; box-sizing: border-box; }
    .infobox-row { display: grid; grid-template-columns: 96px minmax(0, 1fr); border-bottom: 1px solid var(--line-soft); }
    .infobox-row:last-child { border-bottom: 0; }
    .infobox-key { padding: 8px 0 8px 14px; color: var(--faint); font-family: var(--sans); font-size: 11.5px; font-weight: 500; }
    .infobox-value { padding: 8px 14px 8px 0; color: var(--ink); font-family: var(--sans); font-size: 12.5px; overflow-wrap: anywhere; }
    .rail-box { border: 1px solid var(--line-soft); background: var(--surface); border-radius: 8px; font-size: 13px; overflow: hidden; }
    .rail-box h3 { margin: 0; padding: 10px 14px 9px; background: transparent; border-bottom: 1px solid var(--line); font-family: var(--sans); font-size: 11px; font-weight: 600; text-align: left; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
    .toc-list, .backlink-list, .tag-list { list-style: none; margin: 0; padding: 10px 14px 12px; }
    .toc-list li + li, .backlink-list li + li { margin-top: 6px; }
    .tag-list { display: flex; flex-wrap: wrap; gap: 6px; }
    .toc-list li, .backlink-list li { position: relative; font-family: var(--sans); font-size: 13px; }
    .toc-list li::before, .backlink-list li::before { content: ""; position: absolute; left: 0; top: 5px; bottom: 5px; width: 2px; background: var(--accent); border-radius: 2px; opacity: 0; transform: translateX(-2px); transition: opacity 0.18s ease, transform 0.18s ease; pointer-events: none; }
    .toc-list li:hover::before, .backlink-list li:hover::before { opacity: 1; transform: translateX(0); }
    .toc-list a, .backlink-list .wiki-link { display: inline-block; color: var(--muted); font-weight: 500; transition: transform 0.18s ease, color 0.15s ease; }
    .toc-list li:hover a, .backlink-list li:hover .wiki-link { transform: translateX(8px); color: var(--link); text-decoration: none; }
    .toc-list a:hover, .backlink-list .wiki-link:hover { text-decoration: none; }
    .figure { margin: 20px 0; border: 1px solid var(--line-soft); background: var(--surface); border-radius: 8px; scroll-margin-top: 130px; overflow: hidden; }
    .figure-body { background: var(--surface-2); min-height: 220px; display: flex; align-items: center; justify-content: center; padding: 14px; }
    .figure img { display: block; max-width: 100%; max-height: 620px; width: auto; height: auto; cursor: zoom-in; box-shadow: rgba(0,0,0,0.08) 0 1px 3px; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; }
    @supports (image-rendering: high-quality) { .figure img { image-rendering: high-quality; } }
    .figure figcaption { padding: 9px 14px; font-family: var(--sans); font-size: 12.5px; color: var(--muted); border-top: 1px solid var(--line-soft); background: var(--surface); line-height: 1.45; }
    .figure .zoom-hint { position: absolute; opacity: 0; }
    .lightbox { position: fixed; inset: 0; z-index: 100; background: rgba(28, 27, 24, 0.9); display: none; align-items: center; justify-content: center; padding: 32px; cursor: zoom-out; }
    .lightbox.open { display: flex; }
    .lightbox-inner { max-width: 100%; max-height: 100%; display: flex; flex-direction: column; align-items: center; gap: 14px; cursor: default; }
    .lightbox img { max-width: 100%; max-height: calc(100vh - 120px); width: auto; height: auto; object-fit: contain; background: #fff; box-shadow: rgba(0, 0, 0, 0.45) 0 20px 60px; border-radius: 4px; }
    .lightbox-caption { color: #f2f1ed; font-family: var(--sans); font-size: 13.5px; max-width: min(900px, 90vw); text-align: center; line-height: 1.5; }
    .lightbox-close { position: absolute; top: 18px; right: 18px; width: 36px; height: 36px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.08); color: #fff; cursor: pointer; font-size: 20px; line-height: 1; display: flex; align-items: center; justify-content: center; }
    .lightbox-close:hover { background: rgba(255,255,255,0.18); }
    .media-list { list-style: none; margin: 0; padding: 0; }
    .media-list li { display: flex; }
    .media-list a { display: flex; align-items: center; gap: 8px; padding: 8px 14px; border-bottom: 1px solid var(--line-soft); flex: 1; min-width: 0; color: var(--ink); transition: background 0.12s ease; text-decoration: none; }
    .media-list li:last-child a { border-bottom: 0; }
    .media-list a:hover { background: var(--surface-2); text-decoration: none; }
    .media-icon { width: 14px; height: 14px; flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; }
    .media-icon svg { display: block; }
    .media-icon.t-screenshot { color: var(--muted); }
    .media-icon.t-diagram { color: var(--accent); }
    .media-icon.t-animation { color: var(--warning); }
    .media-icon.t-external { color: var(--question); }
    .media-label { font-family: var(--sans); font-size: 12.5px; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .media-tag { font-family: var(--mono); font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--faint); flex: 0 0 auto; }
    .tag { display: inline-flex; align-items: center; border: none; background: var(--surface-3); color: var(--muted); font-family: var(--sans); font-size: 11.5px; font-weight: 500; padding: 4px 12px; border-radius: 999px; transition: color 0.15s ease; cursor: default; }
    .tag:hover { color: var(--link-hover); }
    .callout { border: 1px solid var(--line-soft); border-left: 3px solid var(--accent); background: var(--surface); border-radius: 0 8px 8px 0; margin: 18px 0; padding: 13px 16px; }
    .callout.warning { border-left-color: var(--warning); }
    .callout.question { border-left-color: var(--question); }
    .callout.contradiction { border-left-color: var(--danger); }
    .callout.key { border-left-color: var(--good); }
    .callout-title { font-family: var(--sans); font-size: 12px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
    .mobile-menu { display: none; border: 1px solid var(--line-soft); background: var(--surface); border-radius: 8px; padding: 5px 12px; font-family: var(--sans); font-size: 13px; cursor: pointer; }
    code { font-family: var(--mono); font-size: 0.82em; background: var(--surface-2); border: 1px solid var(--line-soft); padding: 1px 5px; border-radius: 4px; }
    pre { font-family: var(--mono); font-size: 12.5px; background: var(--surface); border: 1px solid var(--line-soft); border-radius: 8px; padding: 14px; overflow: auto; }
    pre code { background: none; border: none; padding: 0; }
    blockquote { margin: 16px 0; padding: 0 0 0 16px; border-left: 3px solid var(--line); color: var(--muted); font-style: italic; }
    @media (max-width: 1100px) {
      .app { grid-template-columns: 1fr; }
      .sidebar { display: none; position: fixed; z-index: 40; inset: 0 auto 0 0; width: min(340px, calc(100vw - 36px)); box-shadow: rgba(38, 37, 30, 0.2) 14px 0 30px; }
      .sidebar.open { display: block; }
      .mobile-menu { display: inline-flex; }
      .article-shell { grid-template-columns: 1fr; width: min(100% - 32px, 980px); gap: 22px; }
      .infobox { position: static; }
    }
    @media (max-width: 720px) {
      .topbar { grid-template-columns: 1fr; min-height: auto; padding: 10px 12px; gap: 8px; }
      .page-tools { display: none; }
      .article { padding: 0 4px 32px; overflow-x: hidden; }
      .article h1 { position: static; }
      .home-actions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .health-grid, .health-grid--compact { grid-template-columns: repeat(2, minmax(0, 1fr)); }
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
          <span class="brand-title">DC Ops</span>
          <span class="brand-subtitle">TA Brain</span>
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
        <div class="crumbs" id="breadcrumbs">DC Ops / Home</div>
        <div class="topbar-extras" id="topbarExtras"></div>
        <div class="page-tools">
          <button type="button" data-open="__home">Main page</button>
          <button type="button" data-open="__all-pages">All pages</button>
          <button type="button" data-open="__needs-work">Needs work</button>
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
      lifecycle: { label: "Case Lifecycle", description: "Kickoff through closeout — the conversion project spine." },
      "data-loading": { label: "Data Loading", description: "One page per load: census, eligibility, deferrals, balances, loans, basis, YTD." },
      payroll: { label: "Payroll", description: "Vendor onboarding, FTP, file specs, testing, and the go-live handoff." },
      "conversion-ops": { label: "Conversion Ops", description: "Mapping, wires, liquidation day, TIK, and asset movement." },
      coordination: { label: "Departments", description: "How each team interfaces with DC work: handoffs, deliverables, escalation." },
      troubleshooting: { label: "Troubleshooting", description: "Symptom-indexed fixes, reversals, and recovery procedures." },
      checklists: { label: "Checklists", description: "Step-by-step control checklists for high-stakes moments." },
      reference: { label: "Reference", description: "Systems, SQL queries, navigation paths, wire routing, naming rules." },
      vendors: { label: "Vendors", description: "Prior recordkeepers and external platforms — quirks, timing, strategy." },
      glossary: { label: "Glossary", description: "Short acronym and term definitions." },
      onboarding: { label: "Onboarding", description: "Ordered reading guides for new DCs." },
      sources: { label: "Sources", description: "Locked source summaries and archive material." },
      analyses: { label: "Analyses", description: "Filed synthesis pages." },
      admin: { label: "Wiki Admin", description: "Index, log, and build artifacts." }
    };
    const namespaceOrder = ["lifecycle", "data-loading", "payroll", "conversion-ops", "coordination", "troubleshooting", "checklists", "reference", "vendors", "glossary", "onboarding", "sources", "analyses", "admin"];
    const namespacePriority = namespaceOrder;
    function namespaceRank(namespace) {
      const rank = namespacePriority.indexOf(namespace);
      return rank === -1 ? namespacePriority.length : rank;
    }
    const pageMap = new Map(pages.map(page => [page.id, page]));
    const slugMap = pages.reduce((acc, page) => {
      (acc[page.slug] ||= []).push(page);
      return acc;
    }, {});
    const qs = selector => document.querySelector(selector);
    const qsa = selector => Array.from(document.querySelectorAll(selector));
    const escapeHtml = text => String(text ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
    function resolveLink(raw) {
      const clean = raw.split("|")[0].split("#")[0].trim().replace(/^wiki\\//, "").replace(/\\.md$/, "");
      if (pageMap.has(clean)) return clean;
      const slug = clean.split("/").pop();
      const matches = slugMap[slug] || [];
      if (!matches.length) return "";
      const preferred = [...matches].sort((a,b) => namespaceRank(a.namespace) - namespaceRank(b.namespace) || a.title.localeCompare(b.title))[0];
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
    function listCount(value) {
      return Array.isArray(value) ? value.length : 0;
    }
    function openIssueCount() {
      const h = payload.health || {};
      return listCount(h.brokenLinks) + listCount(h.unindexedPages) + listCount(h.missingStatus) + listCount(h.zeroSourcePages) + listCount(h.duplicateBareSlugs) + listCount(h.staleAllowedDuplicateBareSlugs);
    }
    function healthItem(label, value, mode) {
      return '<div class="health-item ' + escapeHtml(mode || (value ? "is-watch" : "is-ok")) + '"><span class="health-value">' + escapeHtml(value) + '</span><span class="health-label">' + escapeHtml(label) + '</span></div>';
    }
    function renderHealthGrid(compact) {
      const h = payload.health || {};
      const cls = compact ? "health-grid health-grid--compact" : "health-grid";
      return '<div class="' + cls + '">' +
        healthItem("Broken links", listCount(h.brokenLinks)) +
        healthItem("Unindexed", listCount(h.unindexedPages)) +
        healthItem("Missing status", listCount(h.missingStatus)) +
        healthItem("Zero-source pages", listCount(h.zeroSourcePages)) +
        healthItem("Unexpected duplicates", listCount(h.duplicateBareSlugs)) +
        (compact ? healthItem("Allowed pairs", listCount(h.allowedDuplicateBareSlugs), "is-info") : "") +
        '</div>';
    }
    function renderEntryList(group, opts) {
      return '<ul class="entry-list">' + group.map(page => {
        const meta = opts && opts.date ? page.updated : page.rel;
        return '<li><span class="wiki-link entry-link" data-open="' + escapeHtml(page.id) + '">' + escapeHtml(page.title) + '</span><span class="entry-meta">' + escapeHtml((namespaceInfo[page.namespace] || {}).label || page.namespace) + ' / ' + escapeHtml(meta || page.rel) + '</span></li>';
      }).join("") + '</ul>';
    }
    function renderHome() {
      const recent = [...pages].filter(page => page.updated).sort((a,b) => String(b.updated).localeCompare(String(a.updated))).slice(0, 10);
      const cornerstoneIds = ["lifecycle/dc-onboarding-workflow", "conversion-ops/liquidation-day", "data-loading/final-files-processing", "conversion-ops/conversion-types", "data-loading/balance-import", "conversion-ops/tik-transfer", "payroll/payroll-vendor-onboarding", "troubleshooting/reversal-submission", "coordination/plan-conversion-handoffs", "reference/wire-routing", "reference/query-library", "checklists/day-of-wire-audit"];
      const cornerstone = cornerstoneIds.map(id => pageMap.get(id)).filter(Boolean);
      const topNamespaces = ["lifecycle", "data-loading", "payroll", "conversion-ops", "troubleshooting", "checklists"];
      const issueTotal = openIssueCount();
      return '<h1>DC Operations Wiki</h1><p class="lede">The operational reference for Data Consultants — conversions, data loads, payroll, wires, and recovery, organized the way the work actually runs.</p>' +
        '<div class="metadata-line">Generated ' + escapeHtml(payload.generatedAt.slice(0, 19).replace("T", " ")) + ' / ' + payload.counts.wikiPages + ' wiki pages / ' + payload.counts.sources + ' source summaries / ' + payload.counts.rawFiles + ' raw files inventoried</div>' +
        '<div class="home-actions">' + topNamespaces.map(ns => {
          const count = pages.filter(page => page.namespace === ns).length;
          return '<span class="home-action wiki-link" data-open="__namespace:' + escapeHtml(ns) + '"><strong>' + escapeHtml(namespaceInfo[ns].label) + '</strong><span>' + count + ' pages</span></span>';
        }).join("") + '</div>' +
        renderHealthGrid(false) +
        (issueTotal ? '<div class="callout warning"><div class="callout-title">Needs Work has ' + issueTotal + ' open item' + (issueTotal === 1 ? "" : "s") + '</div><div><span class="wiki-link" data-open="__needs-work">Open the generated maintenance view</span> to clean them down.</div></div>' : '<div class="callout key"><div class="callout-title">Generated checks are clean</div><div>No broken links, unindexed pages, missing statuses, zero-source pages, or unexpected duplicate slugs are currently showing.</div></div>') +
        (payload.duplicateSlugs.length ? '<div class="callout warning"><div class="callout-title">Unexpected duplicate slugs detected</div><div>' + payload.duplicateSlugs.map(escapeHtml).join(", ") + '. Path-based IDs keep pages visible, but these should be reviewed.</div></div>' : "") +
        '<div class="home-grid"><section class="wiki-panel"><h2>Browse Namespaces</h2><ul class="link-list">' + namespaceOrder.map(ns => {
          const count = pages.filter(page => page.namespace === ns).length;
          return count ? '<li><span class="wiki-link" data-open="__namespace:' + escapeHtml(ns) + '">' + namespaceInfo[ns].label + '</span> <span class="metadata-line">' + count + '</span></li>' : "";
        }).join("") + '</ul></section>' +
        '<section class="wiki-panel"><h2>Cornerstone Articles</h2>' + renderEntryList(cornerstone) + '</section>' +
        '<section class="wiki-panel"><h2>Recently Updated</h2>' + renderEntryList(recent, { date: true }) + '</section>' +
        '<section class="wiki-panel"><h2>Raw Source Inventory</h2><p>' + payload.counts.rawFiles + ' files found under <code>raw/</code>. These are inventoried, while source summary articles remain under Sources.</p><p><span class="wiki-link" data-open="__raw-files">View raw inventory</span></p></section></div>';
    }
    function renderNamespacePage(ns) {
      const info = namespaceInfo[ns] || { label: ns, description: "Wiki namespace." };
      const group = pages.filter(page => page.namespace === ns).sort((a,b) => a.title.localeCompare(b.title));
      return '<h1>' + escapeHtml(info.label) + '</h1><p class="lede">' + escapeHtml(info.description) + '</p><div class="metadata-line">' + group.length + ' page' + (group.length === 1 ? "" : "s") + ' in this namespace</div><div class="namespace-cards">' +
        group.map(page => '<section class="namespace-card"><h2><span class="wiki-link" data-open="' + escapeHtml(page.id) + '">' + escapeHtml(page.title) + '</span></h2><p>' + linkifyInline(page.summary || "No summary available.") + '</p><span class="entry-meta"><code>' + escapeHtml(page.rel) + '</code> / ' + escapeHtml(page.status || "no status") + ' / ' + page.sources + ' source' + (page.sources === 1 ? "" : "s") + '</span></section>').join("") +
        '</div>';
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
    function renderNeedsWork() {
      const h = payload.health || {};
      const section = (title, items, formatter, infoMode) => {
        const count = listCount(items);
        const state = infoMode ? "is-info" : (count ? "is-watch" : "is-clear");
        return '<section class="namespace-card issue-card ' + state + '"><h2>' + escapeHtml(title) + ' <span class="metadata-line">' + count + '</span></h2><ul>' + (count ? items.map(formatter).join("") : '<li class="issue-empty">No issues found.</li>') + '</ul></section>';
      };
      return '<h1>Needs Work</h1><p class="lede">Generated maintenance view for broken links, stale bookkeeping, stubs, and classification gaps.</p>' +
        renderHealthGrid(true) +
        '<div class="namespace-cards">' +
        section('Broken links', h.brokenLinks || [], item => '<li><code>' + escapeHtml(item.source) + '</code> -> <code>[[ ' + escapeHtml(item.target) + ' ]]</code></li>') +
        section('Unindexed pages', h.unindexedPages || [], id => '<li><span class="wiki-link" data-open="' + escapeHtml(id) + '">' + escapeHtml((pageMap.get(id) || {}).title || id) + '</span> <span class="metadata-line">' + escapeHtml(id) + '</span></li>') +
        section('Missing status', h.missingStatus || [], id => '<li><span class="wiki-link" data-open="' + escapeHtml(id) + '">' + escapeHtml((pageMap.get(id) || {}).title || id) + '</span></li>') +
        section('Source count zero', h.zeroSourcePages || [], id => '<li><span class="wiki-link" data-open="' + escapeHtml(id) + '">' + escapeHtml((pageMap.get(id) || {}).title || id) + '</span></li>') +
        section('Unexpected duplicate bare slugs', h.duplicateBareSlugs || [], item => '<li><code>' + escapeHtml(item.slug) + '</code>: ' + item.ids.map(id => '<span class="wiki-link" data-open="' + escapeHtml(id) + '">' + escapeHtml(id) + '</span>').join(', ') + '</li>') +
        section('Allowed namespace pairs', h.allowedDuplicateBareSlugs || [], item => '<li><code>' + escapeHtml(item.slug) + '</code>: ' + item.ids.map(id => '<span class="wiki-link" data-open="' + escapeHtml(id) + '">' + escapeHtml(id) + '</span>').join(', ') + '<div class="metadata-line">' + escapeHtml(item.reason || 'Intentional namespace pair.') + '</div></li>', true) +
        '</div>';
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
        const h = payload.health || {};
        qs("#rightRail").innerHTML = '<div class="infobox"><div class="infobox-title">DC Operations Wiki</div><div class="infobox-row"><div class="infobox-key">Pages</div><div class="infobox-value">' + payload.counts.wikiPages + '</div></div><div class="infobox-row"><div class="infobox-key">Sources</div><div class="infobox-value">' + payload.counts.sources + '</div></div><div class="infobox-row"><div class="infobox-key">Raw files</div><div class="infobox-value">' + payload.counts.rawFiles + '</div></div><div class="infobox-row"><div class="infobox-key">Open issues</div><div class="infobox-value">' + openIssueCount() + '</div></div><div class="infobox-row"><div class="infobox-key">Allowed pairs</div><div class="infobox-value">' + listCount(h.allowedDuplicateBareSlugs) + '</div></div></div>' +
          '<section class="rail-box"><h3>Maintenance</h3><ul class="backlink-list"><li><span class="wiki-link" data-open="__needs-work">Needs Work</span></li><li><span class="wiki-link" data-open="__all-pages">All Pages</span></li><li><span class="wiki-link" data-open="__raw-files">Raw Inventory</span></li></ul></section>';
        return;
      }
      const toc = tocFor(articleBodyMarkdown(page));
      const backlinks = getBacklinks(page.id);
      const rows = [
        ["Type", namespaceInfo[page.namespace].label],
        page.status ? ["Status", page.status] : null,
        ["Updated", page.updated || "unknown"],
        page.sources !== undefined && page.sources !== null ? ["Sources", page.sources + " ingested"] : null,
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
        qs("#breadcrumbs").textContent = "DC Ops / Home";
        qs("#pageMetaShort").textContent = payload.counts.wikiPages + " pages / " + payload.counts.sources + " sources";
        if (updateHash) history.replaceState(null, "", "#__home");
        return;
      }
      if (id === "__all-pages") {
        qs("#article").innerHTML = renderAllPages();
        renderRightRail(null);
        renderSidebar("");
        setTopbarExtras(null);
        qs("#breadcrumbs").textContent = "DC Ops / All Pages";
        qs("#pageMetaShort").textContent = payload.counts.wikiPages + " pages";
        document.title = "All Pages - DC Ops Wiki";
        if (updateHash) history.replaceState(null, "", "#__all-pages");
        return;
      }
      if (id.startsWith("__namespace:")) {
        const ns = id.slice("__namespace:".length);
        const info = namespaceInfo[ns] || { label: ns };
        const count = pages.filter(page => page.namespace === ns).length;
        qs("#article").innerHTML = renderNamespacePage(ns);
        renderRightRail(null);
        renderSidebar("");
        setTopbarExtras(null);
        qs("#breadcrumbs").textContent = "DC Ops / " + info.label;
        qs("#pageMetaShort").textContent = count + " page" + (count === 1 ? "" : "s") + " / " + info.label;
        document.title = info.label + " - DC Ops Wiki";
        if (updateHash) history.replaceState(null, "", "#" + encodeURIComponent(id));
        return;
      }
      if (id === "__raw-files") {
        qs("#article").innerHTML = renderRawFiles();
        renderRightRail(null);
        renderSidebar("");
        setTopbarExtras(null);
        qs("#breadcrumbs").textContent = "DC Ops / Raw Source Inventory";
        qs("#pageMetaShort").textContent = payload.counts.rawFiles + " raw files";
        document.title = "Raw Source Inventory - DC Ops Wiki";
        if (updateHash) history.replaceState(null, "", "#__raw-files");
        return;
      }
      if (id === "__needs-work") {
        qs("#article").innerHTML = renderNeedsWork();
        renderRightRail(null);
        renderSidebar("");
        setTopbarExtras(null);
        qs("#breadcrumbs").textContent = "DC Ops / Needs Work";
        qs("#pageMetaShort").textContent = openIssueCount() + " open issues";
        document.title = "Needs Work - DC Ops Wiki";
        if (updateHash) history.replaceState(null, "", "#__needs-work");
        return;
      }
      if (!page) page = pages[0];
      qs("#article").innerHTML = renderArticle(page);
      renderRightRail(page);
      renderSidebar(page.id);
      setTopbarExtras(page);
      qs("#breadcrumbs").textContent = "DC Ops / " + namespaceInfo[page.namespace].label + " / " + page.title;
      qs("#pageMetaShort").textContent = page.sources + " source" + (page.sources === 1 ? "" : "s") + " / " + page.rel;
      document.title = page.title + " - DC Ops Wiki";
      if (updateHash) history.replaceState(null, "", "#" + encodeURIComponent(page.id));
      qs("#sidebar").classList.remove("open");
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    function search(query) {
      const normalizeSearch = value => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      const term = normalizeSearch(query);
      if (!term) return [];
      const tokens = term.split(" ").filter(Boolean);
      return pages.map(page => {
        const text = normalizeSearch([page.title, page.slug, page.rel, page.summary, page.namespace, page.type, (page.tags || []).join(" "), page.markdown].join(" "));
        if (!text.includes(term) && !tokens.every(token => text.includes(token))) return null;
        const titleText = normalizeSearch(page.title + " " + page.slug);
        const score = titleText.includes(term) || tokens.every(token => titleText.includes(token)) ? 2 : 1;
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
    window.addEventListener("hashchange", () => {
      openPage(location.hash ? decodeURIComponent(location.hash.slice(1)) : "__home", false);
    });
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
