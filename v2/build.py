"""
TA Brain — Atlas Edition

Rebuild of the wiki renderer with a new editorial design language.
Reads ../wiki/**/*.md, parses frontmatter + [[wikilinks]], optionally
encrypts the sources/ folder, and emits a single self-contained HTML file
at v2/atlas.html.

Run from the v2 folder OR from the project root:
    python v2/build.py
"""

from __future__ import annotations
import json
import re
import sys
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent
WIKI = ROOT / "wiki"
OUTPUT = HERE / "atlas.html"
TEMPLATE_PATH = HERE / "template.html"

SOURCES_PASSWORD = "Megcaldyl@1840"
LOCKED_FOLDERS = {"sources"}

FOLDER_ORDER = [
    "_root", "roles", "concepts", "processes", "entities",
    "onboarding", "glossary", "departments", "sources", "analyses",
]
FOLDER_LABELS = {
    "_root":       ("Top Level",   "Entry pages — index, overview, log."),
    "roles":       ("Roles",       "Job functions and the work they own."),
    "concepts":    ("Concepts",    "The vocabulary of the work — process, document, system, data."),
    "processes":   ("Processes",   "How work moves between teams."),
    "entities":    ("Entities",    "People, systems, and teams referenced across the wiki."),
    "onboarding":  ("Onboarding",  "First-week reading lists by role."),
    "glossary":    ("Glossary",    "Acronym definitions, one line each."),
    "departments": ("Departments", "Cross-functional groups within TA."),
    "sources":     ("Sources",     "Raw material — encrypted at build time."),
    "analyses":    ("Analyses",    "Cross-cutting essays drawing from multiple sources."),
}

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n?", re.DOTALL)
WIKILINK_RE = re.compile(r"\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]")


def strip_leading_h1(body: str, title: str) -> str:
    """If the body opens with `# Title` matching the frontmatter title, drop it
    so the chapter-opener header isn't duplicated in the prose."""
    stripped = body.lstrip("\n")
    lines = stripped.split("\n", 1)
    if not lines:
        return body
    first = lines[0].strip()
    m = re.match(r"^#\s+(.*)$", first)
    if not m:
        return stripped
    if title and m.group(1).strip().lower() == title.strip().lower():
        return lines[1] if len(lines) > 1 else ""
    return stripped


def parse_frontmatter(text: str):
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}, text
    fm_raw = m.group(1)
    body = text[m.end():]
    fm = {}
    for line in fm_raw.splitlines():
        if ":" not in line:
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip()
        if val.startswith("[") and val.endswith("]"):
            inner = val[1:-1].strip()
            fm[key] = [x.strip().strip('"').strip("'") for x in inner.split(",") if x.strip()]
        else:
            fm[key] = val.strip('"').strip("'")
    return fm, body


def extract_links(body: str):
    out = []
    for m in WIKILINK_RE.finditer(body):
        target = m.group(1).strip()
        if "/" in target:
            target = target.split("/")[-1]
        display = m.group(2).strip() if m.group(2) else target
        out.append((target.lower(), display))
    return out


def encrypt_pages(pages_to_lock: dict, password: str):
    import hashlib, base64, secrets
    if not pages_to_lock:
        return None
    plaintext_obj = {"magic": "ATLAS-V1", "pages": pages_to_lock}
    plaintext = json.dumps(plaintext_obj, ensure_ascii=False).encode("utf-8")
    salt = secrets.token_bytes(16)
    iterations = 200_000
    master = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations, dklen=64)
    keystream = bytearray()
    counter = 0
    while len(keystream) < len(plaintext):
        keystream.extend(hashlib.sha256(master + counter.to_bytes(4, "big")).digest())
        counter += 1
    keystream = bytes(keystream[: len(plaintext)])
    ciphertext = bytes(p ^ k for p, k in zip(plaintext, keystream))
    return {
        "salt": base64.b64encode(salt).decode(),
        "iterations": iterations,
        "ciphertext": base64.b64encode(ciphertext).decode(),
        "lockedMeta": [
            {"slug": s, "title": p["title"], "type": p["type"], "folder": p["folder"]}
            for s, p in sorted(pages_to_lock.items())
        ],
    }


def first_paragraph(body: str, limit: int = 220) -> str:
    """Pull the first non-empty paragraph for use as a card preview."""
    lines = []
    for raw in body.splitlines():
        s = raw.strip()
        if not s:
            if lines:
                break
            continue
        if s.startswith("#") or s.startswith("---") or s.startswith("|") or s.startswith("- ") or s.startswith("* "):
            if lines:
                break
            continue
        lines.append(s)
    text = " ".join(lines)
    text = re.sub(r"\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]", lambda m: m.group(2) or m.group(1).split("/")[-1], text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    if len(text) > limit:
        text = text[: limit - 1].rsplit(" ", 1)[0] + "…"
    return text


def main():
    if not WIKI.exists():
        print(f"ERROR: {WIKI} does not exist.")
        sys.exit(1)

    pages = {}
    all_tags = {}

    for md in sorted(WIKI.rglob("*.md")):
        text = md.read_text(encoding="utf-8")
        fm, body = parse_frontmatter(text)
        slug = md.stem.lower()
        rel = md.relative_to(WIKI)
        folder = rel.parts[0] if len(rel.parts) > 1 else "_root"

        title = fm.get("title") or slug.replace("-", " ").title()
        body = strip_leading_h1(body, title)
        ptype = fm.get("type") or ("index" if slug == "index" else ("log" if slug == "log" else folder))
        tags = fm.get("tags") or []
        if isinstance(tags, str):
            tags = [tags]
        for t in tags:
            all_tags[t] = all_tags.get(t, 0) + 1

        outgoing = []
        seen = set()
        for target, _d in extract_links(body):
            if target == slug or target in seen:
                continue
            seen.add(target)
            outgoing.append(target)

        pages[slug] = {
            "slug": slug,
            "title": title,
            "type": ptype,
            "folder": folder,
            "tags": tags,
            "created": fm.get("created", ""),
            "updated": fm.get("updated", ""),
            "sources": fm.get("sources", ""),
            "summary": first_paragraph(body),
            "body": body,
            "outgoing": outgoing,
        }

    for slug in pages:
        pages[slug]["backlinks"] = []
    for slug, p in pages.items():
        for t in p["outgoing"]:
            if t in pages and slug != t and slug not in pages[t]["backlinks"]:
                pages[t]["backlinks"].append(slug)

    locked_pages = {s: p for s, p in pages.items() if p["folder"] in LOCKED_FOLDERS}
    public_pages = {s: p for s, p in pages.items() if p["folder"] not in LOCKED_FOLDERS}
    encrypted = encrypt_pages(locked_pages, SOURCES_PASSWORD) if locked_pages else None

    seen_folders = set(FOLDER_ORDER)
    extra_folders = [p["folder"] for p in pages.values() if p["folder"] not in seen_folders]
    ordered = list(FOLDER_ORDER) + [f for f in dict.fromkeys(extra_folders)]

    tree = []
    for folder in ordered:
        if folder in LOCKED_FOLDERS:
            locked_here = [p for p in pages.values() if p["folder"] == folder]
            if not locked_here:
                continue
            label, blurb = FOLDER_LABELS.get(folder, (folder.title(), ""))
            tree.append({
                "folder": folder, "label": label, "blurb": blurb,
                "locked": True, "lockedCount": len(locked_here), "pages": [],
            })
            continue
        items = [p for p in public_pages.values() if p["folder"] == folder]
        if not items:
            continue
        items.sort(key=lambda p: p["title"].lower())
        label, blurb = FOLDER_LABELS.get(folder, (folder.title(), ""))
        tree.append({
            "folder": folder, "label": label, "blurb": blurb,
            "locked": False,
            "pages": [
                {"slug": p["slug"], "title": p["title"], "type": p["type"], "summary": p["summary"]}
                for p in items
            ],
        })

    # Build the in-page graph data.
    nodes = []
    edges = []
    seen_edges = set()
    for slug, p in public_pages.items():
        nodes.append({
            "id": slug, "title": p["title"], "folder": p["folder"], "type": p["type"],
            "degree": len(p["outgoing"]) + len(p["backlinks"]),
        })
        for t in p["outgoing"]:
            if t in public_pages:
                key = tuple(sorted([slug, t]))
                if key not in seen_edges:
                    seen_edges.add(key)
                    edges.append({"source": slug, "target": t})

    data = {
        "generated": datetime.now().isoformat(timespec="seconds"),
        "pageCount": len(pages),
        "publicPageCount": len(public_pages),
        "lockedPageCount": len(locked_pages),
        "tagCount": len(all_tags),
        "tags": sorted(all_tags.items(), key=lambda x: (-x[1], x[0])),
        "tree": tree,
        "pages": public_pages,
        "encryptedSources": encrypted,
        "lockedFolders": sorted(LOCKED_FOLDERS),
        "folderOrder": ordered,
        "folderLabels": {k: {"label": v[0], "blurb": v[1]} for k, v in FOLDER_LABELS.items()},
        "graph": {"nodes": nodes, "edges": edges},
    }

    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    app_js = (HERE / "app.js").read_text(encoding="utf-8")
    html = (
        template
        .replace("__ATLAS_DATA__", json.dumps(data, ensure_ascii=False))
        .replace("__ATLAS_APP__", app_js)
    )
    OUTPUT.write_text(html, encoding="utf-8")
    print(f"Built {OUTPUT}")
    print(f"  {len(pages)} pages across {len(tree)} folders ({len(locked_pages)} locked)")
    print(f"  {len(all_tags)} unique tags")
    print(f"  {len(edges)} graph edges, {len(nodes)} nodes")
    if encrypted:
        print(f"  sources encrypted with PBKDF2 ({encrypted['iterations']} iters)")


if __name__ == "__main__":
    main()
