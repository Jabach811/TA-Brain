const fs = require("fs");
const path = require("path");
const { classifyDuplicateBareSlugs } = require("./wiki-validation-rules");

const root = path.resolve(__dirname, "..");
const wikiRoot = path.join(root, "wiki");
const currentRoot = path.join(root, "current");
const argv = process.argv.slice(2);
const args = new Set(argv);
const htmlArgIndex = argv.indexOf("--html");
const htmlArg = htmlArgIndex !== -1 ? argv[htmlArgIndex + 1] : "";
const renderedPath = htmlArg
  ? path.resolve(process.cwd(), htmlArg)
  : process.env.TA_WIKI_RENDERED
    ? path.resolve(process.env.TA_WIKI_RENDERED)
    : path.join(currentRoot, "TA Wiki.html");
const jsonMode = args.has("--json");
const failOnBroken = args.has("--fail-on-broken");

const NAMESPACE_PRIORITY = ["roles", "processes", "documents", "systems", "departments", "people", "reference", "onboarding", "glossary", "sources", "analyses", "admin"];

const NAMESPACE_PLURAL = {
  role: "roles",
  department: "departments",
  system: "systems",
  document: "documents",
  process: "processes",
  person: "people",
  glossary: "glossary",
  reference: "reference",
  concept: "reference",
  onboarding: "onboarding",
  source: "sources",
  analysis: "analyses",
  admin: "admin"
};

function walk(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, predicate);
    return predicate(full) ? [full] : [];
  });
}

function readText(file) {
  return fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
}

function parseFrontmatter(text) {
  const result = { meta: {}, body: text, hasFrontmatter: false };
  if (!text.startsWith("---")) return result;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return result;
  result.hasFrontmatter = true;
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

function classify(rel, meta) {
  if (rel === "index.md" || rel === "log.md") return "admin";
  return NAMESPACE_PLURAL[meta.type] || "reference";
}

function extractLinks(markdown) {
  return Array.from(markdown.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g))
    .map(match => match[1].trim().replace(/^wiki\//, "").replace(/\.md$/, ""))
    .filter(Boolean);
}

const markdownFiles = walk(wikiRoot, file => file.endsWith(".md"));
const pages = markdownFiles.map(file => {
  const rel = path.relative(wikiRoot, file).replace(/\\/g, "/");
  const id = rel.replace(/\.md$/, "");
  const slug = path.basename(file, ".md").toLowerCase();
  const text = readText(file);
  const parsed = parseFrontmatter(text);
  const titleMatch = parsed.body.match(/^#\s+(.+)$/m);
  return {
    id,
    rel,
    slug,
    namespace: classify(rel, parsed.meta),
    title: parsed.meta.title || (titleMatch ? titleMatch[1].trim() : slug),
    type: parsed.meta.type || "",
    sources: parsed.meta.sources,
    status: parsed.meta.status || "",
    tags: Array.isArray(parsed.meta.tags) ? parsed.meta.tags : [],
    aliases: Array.isArray(parsed.meta.aliases) ? parsed.meta.aliases : [],
    hasFrontmatter: parsed.hasFrontmatter,
    links: extractLinks(text),
    text
  };
});

const pagesById = new Map(pages.map(page => [page.id, page]));
const slugIndex = pages.reduce((acc, page) => {
  (acc[page.slug] ||= []).push(page);
  page.aliases.forEach(alias => {
    const aliasSlug = String(alias).trim().toLowerCase().split("/").pop();
    if (aliasSlug) (acc[aliasSlug] ||= []).push(page);
  });
  return acc;
}, {});

function namespaceRank(namespace) {
  const rank = NAMESPACE_PRIORITY.indexOf(namespace);
  return rank === -1 ? NAMESPACE_PRIORITY.length : rank;
}

function resolveLink(raw) {
  const clean = raw.split("|")[0].trim().replace(/^wiki\//, "").replace(/\.md$/, "");
  if (pagesById.has(clean)) return { target: clean, mode: "direct" };
  const slug = clean.split("/").pop().toLowerCase();
  const matches = slugIndex[slug] || [];
  if (!matches.length) return { target: "", mode: "missing" };
  const preferred = [...matches].sort((a, b) => namespaceRank(a.namespace) - namespaceRank(b.namespace) || a.title.localeCompare(b.title))[0];
  return { target: preferred.id, mode: matches.length > 1 ? "ambiguous" : "slug" };
}

const brokenLinks = [];
const ambiguousLinks = [];
const seenBrokenLinks = new Set();
const seenAmbiguousLinks = new Set();
const outgoing = {};
pages.forEach(page => {
  outgoing[page.id] = [];
  page.links.forEach(link => {
    const resolved = resolveLink(link);
    if (!resolved.target) {
      const key = `${page.id}::${link}`;
      if (!seenBrokenLinks.has(key)) {
        seenBrokenLinks.add(key);
        brokenLinks.push({ source: page.id, target: link });
      }
    }
    else {
      outgoing[page.id].push(resolved.target);
      if (resolved.mode === "ambiguous") {
        const key = `${page.id}::${link}::${resolved.target}`;
        if (!seenAmbiguousLinks.has(key)) {
          seenAmbiguousLinks.add(key);
          ambiguousLinks.push({ source: page.id, link, resolvedTo: resolved.target });
        }
      }
    }
  });
});

const backlinks = pages.reduce((acc, page) => (acc[page.id] = [], acc), {});
Object.entries(outgoing).forEach(([source, targets]) => {
  [...new Set(targets)].forEach(target => {
    if (backlinks[target]) backlinks[target].push(source);
  });
});

const duplicateIds = Object.entries(pages.reduce((acc, page) => {
  acc[page.id] = (acc[page.id] || 0) + 1;
  return acc;
}, {})).filter(([, count]) => count > 1).map(([id]) => id);

const duplicateBareSlugs = Object.entries(slugIndex)
  .filter(([, matches]) => matches.length > 1)
  .map(([slug, matches]) => ({ slug, ids: matches.map(page => page.id) }));
const duplicateSlugAudit = classifyDuplicateBareSlugs(duplicateBareSlugs);

const indexFile = pagesById.get("index");
const indexLinks = new Set(indexFile ? indexFile.links.map(link => link.split("/").pop().toLowerCase()) : []);
const unindexed = pages
  .filter(page => !["index", "log"].includes(page.id))
  .filter(page => !indexLinks.has(page.slug))
  .map(page => page.id);

let rendered = null;
if (fs.existsSync(renderedPath)) {
  const html = fs.readFileSync(renderedPath, "utf8");
  const match = html.match(/<script id="wikiPayload" type="application\/json">([\s\S]*?)<\/script>/);
  if (match) {
    try {
      rendered = JSON.parse(match[1]);
    } catch (error) {
      rendered = { error: error.message };
    }
  }
}

const renderedIds = rendered && Array.isArray(rendered.pages) ? new Set(rendered.pages.map(page => page.id)) : new Set();
const markdownIds = new Set(pages.map(page => page.id));
const markdownMissingFromRendered = [...markdownIds].filter(id => !renderedIds.has(id)).sort();
const renderedMissingFromMarkdown = [...renderedIds].filter(id => !markdownIds.has(id)).sort();

const report = {
  generatedAt: new Date().toISOString(),
  root,
  counts: {
    markdownPages: pages.length,
    renderedPages: rendered && Array.isArray(rendered.pages) ? rendered.pages.length : null,
    sources: pages.filter(page => page.namespace === "sources").length,
    namespaces: pages.reduce((acc, page) => (acc[page.namespace] = (acc[page.namespace] || 0) + 1, acc), {})
  },
  rendered: {
    path: renderedPath,
    exists: fs.existsSync(renderedPath),
    generatedAt: rendered ? rendered.generatedAt || null : null,
    error: rendered && rendered.error ? rendered.error : null,
    markdownMissingFromRendered,
    renderedMissingFromMarkdown
  },
  issues: {
    brokenLinks,
    ambiguousLinks,
    duplicateIds,
    duplicateBareSlugs: duplicateSlugAudit.unexpected,
    allowedDuplicateBareSlugs: duplicateSlugAudit.allowed,
    staleAllowedDuplicateBareSlugs: duplicateSlugAudit.staleAllowed,
    missingFrontmatter: pages.filter(page => !page.hasFrontmatter && !["index", "log"].includes(page.id)).map(page => page.id),
    missingStatus: pages.filter(page => !page.status && !["index", "log"].includes(page.id)).map(page => page.id),
    zeroSourcePages: pages
      .filter(page => !["admin", "sources"].includes(page.namespace))
      .filter(page => Number(page.sources || 0) === 0)
      .map(page => page.id),
    stubLikePages: pages.filter(page => !["index", "log", "overview"].includes(page.id) && /stub|content pending/i.test(page.text)).map(page => page.id),
    unindexed,
    noBacklinks: pages.filter(page => !["index", "log"].includes(page.id) && backlinks[page.id].length === 0).map(page => page.id)
  }
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("TA Wiki validation");
  console.log(`Markdown pages: ${report.counts.markdownPages}`);
  console.log(`Rendered pages: ${report.counts.renderedPages ?? "unknown"}`);
  console.log(`Broken links: ${brokenLinks.length}`);
  console.log(`Duplicate page IDs: ${duplicateIds.length}`);
  console.log(`Unexpected duplicate bare slugs: ${duplicateSlugAudit.unexpected.length}`);
  console.log(`Allowed duplicate bare slugs: ${duplicateSlugAudit.allowed.length}`);
  console.log(`Stale allowed duplicate rules: ${duplicateSlugAudit.staleAllowed.length}`);
  console.log(`Unindexed pages: ${unindexed.length}`);
  console.log(`Markdown missing from rendered output: ${markdownMissingFromRendered.length}`);
  console.log(`Rendered pages missing from markdown: ${renderedMissingFromMarkdown.length}`);
  if (brokenLinks.length) {
    console.log("\nBroken links:");
    brokenLinks.forEach(item => console.log(`- ${item.source} -> [[${item.target}]]`));
  }
}

if ((failOnBroken && brokenLinks.length) || duplicateIds.length) {
  process.exit(1);
}
