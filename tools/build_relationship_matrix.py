#!/usr/bin/env python3
"""Build the TA Brain relationship matrix visual.

Scans every page in wiki/, extracts all [[wikilinks]], groups pages into the
same category rows used by wiki/index.md, and injects the resulting graph into
relationship-matrix.template.html to produce relationship-matrix.html — a
self-contained interactive switchboard view of the wiki.

Run from anywhere:  python3 tools/build_relationship_matrix.py
Re-run after any ingest to refresh the visual.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
WIKI = os.path.join(HERE, "..", "wiki")
TEMPLATE = os.path.join(HERE, "relationship-matrix.template.html")
OUTPUT = os.path.join(HERE, "relationship-matrix.html")

SKIP = {"index.md", "log.md"}
# When a bare [[link]] matches pages in more than one folder, resolve in this
# order (mirrors how the wiki actually links: concepts/roles over glossary).
FOLDER_PRIORITY = ["roles", "entities", "concepts", "processes", "glossary",
                   "onboarding", "sources", "analyses", "departments", "root"]
# Known link-target typos → actual file slug
ALIASES = {"eric-leytem": "eric-leyten"}

LINK_RE = re.compile(r"\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]")
TITLE_RE = re.compile(r'^title:\s*"?([^"\n]+?)"?\s*$', re.M)


def load_pages():
    pages = {}
    for root, _dirs, files in os.walk(WIKI):
        for f in sorted(files):
            if not f.endswith(".md"):
                continue
            rel = os.path.relpath(os.path.join(root, f), WIKI)
            if rel in SKIP:
                continue
            folder = os.path.dirname(rel) or "root"
            slug = os.path.splitext(f)[0]
            pid = f"{folder}/{slug}"
            with open(os.path.join(root, f), encoding="utf-8") as fh:
                text = fh.read()
            m = TITLE_RE.search(text[:500])
            title = m.group(1).strip() if m else slug
            links = {t.strip() for t in
                     (lm.group(1) for lm in LINK_RE.finditer(text)) if t.strip()}
            pages[pid] = {"id": pid, "slug": slug, "title": title,
                          "folder": folder, "links": links}
    return pages


def build_edges(pages):
    by_slug, by_title = {}, {}
    for pid, p in pages.items():
        by_slug.setdefault(p["slug"].lower(), []).append(pid)
        by_title.setdefault(p["title"].lower(), []).append(pid)

    def pick(cands):
        return sorted(cands,
                      key=lambda c: FOLDER_PRIORITY.index(pages[c]["folder"]))[0]

    def resolve(target):
        t = target.lower().strip()
        if "/" in t:
            if t in pages:
                return t
            t = t.split("/")[-1]
        t = ALIASES.get(t, t)
        if t in by_slug:
            return pick(by_slug[t])
        if t in by_title:
            return pick(by_title[t])
        slugged = ALIASES.get(re.sub(r"[^a-z0-9]+", "-", t).strip("-"), None) \
            or re.sub(r"[^a-z0-9]+", "-", t).strip("-")
        if slugged in by_slug:
            return pick(by_slug[slugged])
        return None

    edges = set()
    for pid, p in pages.items():
        for target in p["links"]:
            r = resolve(target)
            if r and r != pid:
                edges.add(tuple(sorted((pid, r))))
    return sorted(edges)


def index_groups(pages):
    """Map page id -> the '## Heading' it appears under in wiki/index.md."""
    groups = {}
    heading = None
    with open(os.path.join(WIKI, "index.md"), encoding="utf-8") as fh:
        for line in fh:
            if line.startswith("## "):
                heading = line[3:].strip()
                continue
            for m in LINK_RE.finditer(line):
                target = m.group(1).strip()
                if "/" not in target or not heading:
                    continue
                folder, slug = target.rsplit("/", 1)
                target = f"{folder}/{ALIASES.get(slug, slug)}"
                if target in pages:
                    groups[target] = heading
    return groups


def main():
    pages = load_pages()
    edges = build_edges(pages)
    groups = index_groups(pages)

    deg = {}
    for a, b in edges:
        deg[a] = deg.get(a, 0) + 1
        deg[b] = deg.get(b, 0) + 1

    # Row order: overview and roles first (role-first wiki), sources last.
    folder_order = ["root", "roles", "processes", "onboarding", "entities",
                    "concepts", "glossary", "departments", "analyses", "sources"]
    row_labels = []   # ordered unique group labels
    row_of = {}       # page id -> row label
    for folder in folder_order:
        for pid in groups:  # index.md appearance order within the folder
            if pages[pid]["folder"] == folder:
                label = groups[pid]
                if label not in row_labels:
                    row_labels.append(label)
                row_of[pid] = label
        for pid, p in pages.items():  # pages missing from index.md
            if p["folder"] == folder and pid not in row_of:
                label = "Overview" if folder == "root" else folder.title()
                if label not in row_labels:
                    row_labels.append(label)
                row_of[pid] = label

    rows = []
    for label in row_labels:
        ids = [pid for pid, l in row_of.items() if l == label]
        ids.sort(key=lambda i: (-deg.get(i, 0), pages[i]["title"].lower()))
        rows.append({"label": label,
                     "folder": pages[ids[0]]["folder"],
                     "ids": ids})

    data = {
        "nodes": {pid: {"title": p["title"], "folder": p["folder"],
                        "deg": deg.get(pid, 0)}
                  for pid, p in pages.items()},
        "edges": [list(e) for e in edges],
        "rows": rows,
        "stats": {"pages": len(pages), "connections": len(edges),
                  "categories": len(rows)},
    }

    with open(TEMPLATE, encoding="utf-8") as fh:
        html = fh.read()
    marker = "/*__DATA__*/null"
    if marker not in html:
        sys.exit("template is missing the /*__DATA__*/null data marker")
    html = html.replace(marker, json.dumps(data, separators=(",", ":")))
    with open(OUTPUT, "w", encoding="utf-8") as fh:
        fh.write(html)
    print(f"wrote {os.path.relpath(OUTPUT)} — "
          f"{data['stats']['pages']} pages, "
          f"{data['stats']['connections']} connections, "
          f"{len(rows)} rows")


if __name__ == "__main__":
    main()
