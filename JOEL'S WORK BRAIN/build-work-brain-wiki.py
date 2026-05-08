from __future__ import annotations

import html
import json
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).parent
OUTPUT = ROOT / "current" / "work-brain-wiki.html"
RUNNING_SHEET_OUTPUT = ROOT / "one-offs-running-sheet.md"

PAGE_SOURCES = [
    ("plans", "Plan Information", "One file per plan, with metadata, updates, open items, and lessons.", ROOT / "02-plans", "*.md", ""),
    ("open-items", "Outstanding / Open Items", "Generated read-only dashboard aggregated from source files.", ROOT, "open-items-dashboard.md", ""),
]

RUNNING_SHEET_SOURCES = [
    ("Lessons", ROOT / "05-processes", "lesson"),
]

NAMESPACE_ORDER = ["plans", "open-items", "one-offs"]
NAMESPACE_INFO = {
    "plans": {"label": "Plan Information", "description": "One file per plan, with metadata, updates, open items, and lessons."},
    "open-items": {"label": "Outstanding / Open Items", "description": "Generated read-only dashboard aggregated from source files."},
    "one-offs": {"label": "One-off / Lessons Learned", "description": "Internal projects and durable one-off lessons."},
}

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n?", re.S)
WIKILINK_RE = re.compile(r"\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]")
STATUS_SPAN_RE = re.compile(r'<span class="status-tag status-(active|transitioning|complete)">(Active|Transitioning|Complete)</span>')


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def slugify(value: str) -> str:
    value = value.lower().replace("\\", "/")
    value = re.sub(r"\.md$", "", value)
    value = re.sub(r"[^a-z0-9/_-]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return value


def title_from_slug(slug: str) -> str:
    parts = Path(slug).name.replace("_", "").split("-")
    acronyms = {"ai", "ukg", "cocc", "tmg", "nbi", "p2", "p3", "vba", "dc"}
    return " ".join(part.upper() if part in acronyms else part.capitalize() for part in parts if part)


def parse_frontmatter(text: str) -> tuple[dict[str, object], str]:
    match = FRONTMATTER_RE.match(text)
    if not match:
        return {}, text
    meta: dict[str, object] = {}
    for raw in match.group(1).splitlines():
        if ":" not in raw:
            continue
        key, value = raw.split(":", 1)
        value = value.strip().strip('"')
        if value.startswith("[") and value.endswith("]"):
            value = [item.strip().strip('"') for item in value[1:-1].split(",") if item.strip()]
        meta[key.strip()] = value
    return meta, text[match.end() :]


def extract_title(body: str, fallback: str) -> str:
    for line in body.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return fallback


def remove_metadata_card(body: str) -> str:
    return re.sub(r'<aside class="metadata-card">.*?</aside>\s*', "", body, flags=re.S)


def clean_inline_markdown(text: str) -> str:
    text = WIKILINK_RE.sub(lambda m: m.group(2) or Path(m.group(1)).name, text)
    text = re.sub(r"[*_`]+", "", text)
    return text.strip()


def extract_summary(body: str, fallback: str) -> str:
    body = remove_metadata_card(body)
    for line in body.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith(("#", "|", "-", "---", "```")):
            continue
        cleaned = clean_inline_markdown(stripped)
        if len(cleaned) > 12:
            return cleaned[:260]
    return fallback


def extract_headings(body: str) -> list[str]:
    return [line[3:].strip() for line in body.splitlines() if line.startswith("## ")]


def extract_metadata_rows(body: str) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    match = re.search(r'<aside class="metadata-card">(.*?)</aside>', body, re.S)
    if not match:
        return rows
    for row_html in re.findall(r'<div class="metadata-row">(.*?)</div>', match.group(1), re.S):
        key_match = re.search(r'<span class="metadata-key">(.*?)</span>', row_html, re.S)
        value_match = re.search(r'<span class="metadata-value">(.*)</span>', row_html, re.S)
        if not key_match or not value_match:
            continue
        rows.append(
            {
                "key": re.sub(r"<.*?>", "", key_match.group(1)).strip(),
                "value": value_match.group(1).strip(),
            }
        )
    return normalize_metadata_rows(rows)


def is_unknown(value: str) -> bool:
    cleaned = re.sub(r"<.*?>", "", value).strip().lower()
    return cleaned in {"", "unknown", "n/a", "none", "-"}


def combined_party_value(primary: str, contact: str) -> str:
    if is_unknown(primary) and is_unknown(contact):
        return "Unknown"
    if is_unknown(contact):
        return primary
    if is_unknown(primary):
        return f'<span class="contact-line">Contact: {contact}</span>'
    return f'{primary}<span class="contact-line">Contact: {contact}</span>'


def normalize_metadata_rows(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    values = {row["key"].strip().lower(): row["value"] for row in rows}
    normalized: list[dict[str, str]] = []
    consumed = {"vendor", "prior record keeper contact", "payroll contact"}

    for row in rows:
        key = row["key"].strip()
        lower = key.lower()
        if lower in consumed:
            continue
        if lower == "active date / wire date":
            normalized.append({"key": "Wire Date", "value": row["value"]})
        elif lower == "prior record keeper":
            normalized.append(
                {
                    "key": "Prior record keeper",
                    "value": combined_party_value(row["value"], values.get("prior record keeper contact", "")),
                }
            )
        elif lower == "payroll vendor":
            normalized.append(
                {
                    "key": "Payroll",
                    "value": combined_party_value(row["value"], values.get("payroll contact", "")),
                }
            )
        else:
            normalized.append(row)

    return normalized


def extract_links(body: str) -> list[str]:
    links: list[str] = []
    for match in WIKILINK_RE.finditer(body):
        target = slugify(match.group(1))
        if target and target not in links:
            links.append(target)
    return links


def md_inline(text: str) -> str:
    safe_spans: list[str] = []

    def hold_status(match: re.Match[str]) -> str:
        safe_spans.append(match.group(0))
        return f"@@STATUS_SPAN_{len(safe_spans) - 1}@@"

    text = STATUS_SPAN_RE.sub(hold_status, text)
    escaped = html.escape(text)
    escaped = WIKILINK_RE.sub(
        lambda m: f'<span class="wiki-link" data-open="{html.escape(resolve_link_id(m.group(1)))}">{html.escape(m.group(2) or Path(m.group(1)).name)}</span>',
        escaped,
    )
    escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", escaped)
    for index, span in enumerate(safe_spans):
        escaped = escaped.replace(f"@@STATUS_SPAN_{index}@@", span)
    return escaped


LINK_INDEX: dict[str, str] = {}


def resolve_link_id(target: str) -> str:
    target_slug = slugify(target)
    return LINK_INDEX.get(target_slug) or LINK_INDEX.get(Path(target_slug).name) or target_slug


def markdown_to_html(markdown: str) -> str:
    out: list[str] = []
    lines = markdown.splitlines()
    i = 0
    in_code = False
    code: list[str] = []
    while i < len(lines):
        raw = lines[i]
        line = raw.rstrip()
        if line.startswith("```"):
            if in_code:
                out.append("<pre><code>" + html.escape("\n".join(code)) + "</code></pre>")
                code = []
                in_code = False
            else:
                in_code = True
            i += 1
            continue
        if in_code:
            code.append(raw)
            i += 1
            continue
        if line.startswith('<aside class="metadata-card">'):
            while i < len(lines) and "</aside>" not in lines[i]:
                i += 1
            i += 1
            continue
        if not line.strip():
            i += 1
            continue
        if line.startswith("# "):
            i += 1
            continue
        elif line.startswith("## "):
            hid = slugify(line[3:])
            out.append(f'<h2 id="{hid}">{md_inline(line[3:])}</h2>')
        elif line.startswith("### "):
            hid = slugify(line[4:])
            out.append(f'<h3 id="{hid}">{md_inline(line[4:])}</h3>')
        elif line.startswith("|"):
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                table_lines.append(lines[i].strip())
                i += 1
            out.append(render_table(table_lines))
            continue
        elif line.startswith(("- [ ]", "- [x]", "- [X]")):
            items = []
            while i < len(lines) and lines[i].strip().startswith(("- [ ]", "- [x]", "- [X]")):
                checked = "is-checked" if lines[i].strip()[3].lower() == "x" else ""
                label = lines[i].strip()[6:].strip()
                items.append(f'<li class="{checked}"><span class="box"></span>{md_inline(label)}</li>')
                i += 1
            out.append('<ul class="check-list">' + "".join(items) + "</ul>")
            continue
        elif line.startswith("- "):
            items = []
            while i < len(lines) and lines[i].strip().startswith("- "):
                items.append(f"<li>{md_inline(lines[i].strip()[2:])}</li>")
                i += 1
            out.append("<ul>" + "".join(items) + "</ul>")
            continue
        elif re.match(r"^\d+\.\s+", line):
            items = []
            while i < len(lines) and re.match(r"^\d+\.\s+", lines[i].strip()):
                item_text = re.sub(r"^\d+\.\s+", "", lines[i].strip())
                items.append(f"<li>{md_inline(item_text)}</li>")
                i += 1
            out.append("<ol>" + "".join(items) + "</ol>")
            continue
        elif line.startswith(">"):
            out.append(f'<blockquote>{md_inline(line.lstrip("> ").strip())}</blockquote>')
        else:
            out.append(f"<p>{md_inline(line)}</p>")
        i += 1
    return "\n".join(out)


def render_table(lines: list[str]) -> str:
    rows = []
    for line in lines:
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if all(re.match(r"^-+$", cell.replace(" ", "")) for cell in cells):
            continue
        rows.append(cells)
    if not rows:
        return ""
    head = "".join(f"<th>{md_inline(cell)}</th>" for cell in rows[0])
    body = []
    for row in rows[1:]:
        body.append("<tr>" + "".join(f"<td>{md_inline(cell)}</td>" for cell in row) + "</tr>")
    return "<table><thead><tr>" + head + "</tr></thead><tbody>" + "".join(body) + "</tbody></table>"


def collect_pages() -> list[dict[str, object]]:
    pages: list[dict[str, object]] = []
    for namespace, label, description, folder, pattern, id_prefix in PAGE_SOURCES:
        for path in sorted(folder.glob(pattern)):
            if not path.is_file() or path.suffix.lower() != ".md":
                continue
            if path.name.startswith("_"):
                continue
            rel_source = path.relative_to(ROOT).as_posix()
            rel_namespace = path.relative_to(folder).with_suffix("").as_posix()
            page_id = f"{namespace}/{id_prefix}{slugify(rel_namespace)}"
            raw = read_text(path)
            meta, body = parse_frontmatter(raw)
            title = str(meta.get("title") or extract_title(body, title_from_slug(rel_namespace)))
            summary = extract_summary(body, description)
            tags = meta.get("tags") or [namespace.rstrip("s"), "work-brain"]
            if isinstance(tags, str):
                tags = [tags]
            headings = extract_headings(body)
            metadata_rows = extract_metadata_rows(body)
            pages.append(
                {
                    "id": page_id,
                    "slug": f"{id_prefix}{slugify(rel_namespace)}",
                    "namespace": namespace,
                    "namespaceLabel": label,
                    "namespaceDescription": description,
                    "rel": rel_source,
                    "title": title,
                    "summary": summary,
                    "updated": str(meta.get("updated") or datetime.fromtimestamp(path.stat().st_mtime).strftime("%Y-%m-%d")),
                    "created": str(meta.get("created") or ""),
                    "sources": int(str(meta.get("sources") or 1)) if str(meta.get("sources") or "1").isdigit() else 1,
                    "tags": tags,
                    "headings": headings,
                    "metadataRows": metadata_rows,
                    "status": str(meta.get("status") or ""),
                    "caseId": str(meta.get("case_id") or ""),
                    "links": extract_links(body),
                    "markdown": body,
                    "html": markdown_to_html(body),
                }
            )
    pages.append(collect_running_sheet_page())
    return pages


def extract_section(body: str, heading: str) -> str:
    match = re.search(rf"^## {re.escape(heading)}\s*\n(.*?)(?=^## |\Z)", body, re.M | re.S)
    return match.group(1).strip() if match else ""


def first_paragraph(text: str) -> str:
    for block in re.split(r"\n\s*\n", text.strip()):
        cleaned = block.strip()
        if cleaned and not cleaned.startswith(("#", "|", "-")):
            return cleaned
    return ""


def open_item_lines(body: str) -> list[str]:
    section = extract_section(body, "Open Items")
    return [line.strip() for line in section.splitlines() if line.strip().startswith("- [ ]")]


def plain_text(markdown: str) -> str:
    text = remove_metadata_card(markdown)
    text = WIKILINK_RE.sub(lambda m: m.group(2) or title_from_slug(m.group(1)), text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"^#+\s*", "", text, flags=re.M)
    text = re.sub(r"^- \[[ xX]\]\s*", "", text, flags=re.M)
    text = re.sub(r"^-\s*", "", text, flags=re.M)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def compact_text(markdown: str, limit: int = 280) -> str:
    text = plain_text(markdown)
    return text[: limit - 1].rstrip() + "…" if len(text) > limit else text


def extract_subsection(section: str, heading: str) -> str:
    match = re.search(rf"^### {re.escape(heading)}\s*\n(.*?)(?=^### |\Z)", section, re.M | re.S)
    return match.group(1).strip() if match else ""


def extract_bullets(markdown: str) -> list[str]:
    bullets: list[str] = []
    for line in markdown.splitlines():
        stripped = line.strip()
        if stripped.startswith("- [ ]"):
            bullets.append(stripped[6:].strip())
        elif stripped.startswith("- "):
            bullets.append(stripped[2:].strip())
    return [plain_text(item) for item in bullets if plain_text(item)]


def summarize_resolution(current_updates: str) -> str:
    def join_steps(steps: list[str]) -> str:
        cleaned = [step.rstrip(".; ") for step in steps if step.strip()]
        return "; ".join(cleaned[:3]) + "." if cleaned else ""

    if not current_updates:
        return "Document the decision path, then apply the saved lesson before repeating the same work pattern."
    priority_sections = [
        "Current Working Theory",
        "Trigger or Checklist",
        "Checklist",
        "How to Apply",
        "Process",
        "Decision",
    ]
    for heading in priority_sections:
        section = extract_subsection(current_updates, heading)
        bullets = extract_bullets(section)
        if bullets:
            return join_steps(bullets)
        paragraph = first_paragraph(section)
        if paragraph:
            return compact_text(paragraph, 260)
    bullets = extract_bullets(current_updates)
    if bullets:
        return join_steps(bullets)
    return compact_text(current_updates, 260)


def summarize_takeaway(current_updates: str, description: str) -> str:
    why = extract_subsection(current_updates, "Why It Matters")
    if why:
        return compact_text(why, 240)
    open_question = extract_subsection(current_updates, "Open Question")
    if open_question:
        return compact_text(open_question, 240)
    return compact_text(description, 220)


def plan_lookup() -> dict[str, dict[str, str]]:
    lookup: dict[str, dict[str, str]] = {}
    for path in sorted((ROOT / "02-plans").glob("*.md")):
        if path.name.startswith("_"):
            continue
        meta, body = parse_frontmatter(read_text(path))
        slug = slugify(path.stem)
        title = str(meta.get("title") or extract_title(body, title_from_slug(slug)))
        page_id = f"plans/{slug}"
        lookup[slug] = {"title": title, "id": page_id}
        lookup[slugify(title)] = {"title": title, "id": page_id}
    return lookup


def infer_plan_reference(body: str, lookup: dict[str, dict[str, str]]) -> dict[str, str]:
    matches: list[dict[str, str]] = []
    for link in extract_links(body):
        slug = slugify(Path(link).name)
        if slug in lookup:
            matches.append(lookup[slug])
    if matches:
        unique = []
        seen = set()
        for match in matches:
            if match["id"] not in seen:
                unique.append(match)
                seen.add(match["id"])
        if len(unique) == 1:
            return unique[0]
        return {"title": "Multiple plans", "id": unique[0]["id"], "detail": ", ".join(item["title"] for item in unique[:4])}
    return {"title": "General / cross-plan", "id": "", "detail": "Reusable lesson"}


def categorize_lesson(title: str, body: str) -> str:
    haystack = f"{title} {body}".lower()
    rules = [
        ("Loans", ["loan"]),
        ("Payroll", ["payroll", "deferral", "adp"]),
        ("Informatica", ["informatica", "parameter file", "input file"]),
        ("NBI", ["nbi"]),
        ("Plan setup", ["p2", "p3", "reference number", "fund link", "vesting"]),
        ("Files", ["file", "separation", "base file", "wire"]),
        ("Coverage", ["coverage", "employer wire"]),
    ]
    for label, needles in rules:
        if any(needle in haystack for needle in needles):
            return label
    return "Workflow"


def collect_running_sheet_entries() -> list[dict[str, object]]:
    entries: list[dict[str, object]] = []
    plans = plan_lookup()
    for group, folder, item_type in RUNNING_SHEET_SOURCES:
        for path in sorted(folder.glob("*.md")):
            if not path.is_file() or path.name.startswith("_"):
                continue
            meta, body = parse_frontmatter(read_text(path))
            rel = path.relative_to(ROOT).as_posix()
            slug = path.relative_to(folder).with_suffix("").as_posix()
            title = str(meta.get("title") or extract_title(body, title_from_slug(slug)))
            description = first_paragraph(extract_section(body, "Description")) or extract_summary(body, "")
            current_updates = extract_section(body, "Current Updates")
            lessons = extract_section(body, "Lessons Learned / One-offs")
            plan = infer_plan_reference(body, plans)
            entries.append(
                {
                    "group": group,
                    "type": item_type,
                    "title": title,
                    "category": categorize_lesson(title, body),
                    "caseId": str(meta.get("case_id") or ""),
                    "status": str(meta.get("status") or ""),
                    "updated": str(meta.get("updated") or datetime.fromtimestamp(path.stat().st_mtime).strftime("%Y-%m-%d")),
                    "rel": rel,
                    "planTitle": plan.get("title", "General / cross-plan"),
                    "planId": plan.get("id", ""),
                    "planDetail": plan.get("detail", ""),
                    "issue": compact_text(description, 300),
                    "resolution": summarize_resolution(current_updates),
                    "takeaway": summarize_takeaway(current_updates, description),
                    "lessons": compact_text(lessons, 180) if lessons else "",
                }
            )
    return entries


def status_span(status: str) -> str:
    slug = slugify(status)
    if slug not in {"active", "transitioning", "complete"}:
        return html.escape(status or "Unknown")
    return f'<span class="status-tag status-{slug}">{html.escape(status)}</span>'


def build_running_sheet_markdown(entries: list[dict[str, object]]) -> str:
    today = max((str(entry["updated"]) for entry in entries), default=datetime.now().strftime("%Y-%m-%d"))
    lines = [
        "---",
        "type: running-sheet",
        'title: "Lessons Register"',
        "status: Active",
        f"updated: {today}",
        f"sources: {len(entries)}",
        "---",
        "",
        "# Lessons Register",
        "",
        '<aside class="metadata-card">',
        '<div class="metadata-row"><span class="metadata-key">Type</span><span class="metadata-value">Lessons register</span></div>',
        f'<div class="metadata-row"><span class="metadata-key">Status</span><span class="metadata-value">{status_span("Active")}</span></div>',
        f'<div class="metadata-row"><span class="metadata-key">Updated</span><span class="metadata-value">{today}</span></div>',
        f'<div class="metadata-row"><span class="metadata-key">Sources</span><span class="metadata-value">{len(entries)}</span></div>',
        '<div class="metadata-row"><span class="metadata-key">Linked from</span><span class="metadata-value">Lessons source folder</span></div>',
        "</aside>",
        "",
        "A custom register for reusable lessons. Each entry names the plan/context, the issue, the resolution, and the key takeaway.",
    ]
    lines.extend(["", "## Register"])
    for entry in entries:
        label = f' `{entry["caseId"]}`' if entry["caseId"] else ""
        plan_label = str(entry["planDetail"] or entry["planTitle"])
        lines.extend(
            [
                "",
                f'### {entry["title"]}{label}',
                "",
                f'- Category: {entry["category"]}',
                f'- Plan in question: {plan_label}',
                f'- Source: `{entry["rel"]}`',
                f'- Issue: {entry["issue"]}',
                f'- Resolution: {entry["resolution"]}',
                f'- Key takeaway: {entry["takeaway"]}',
            ]
        )
    return "\n".join(lines).rstrip() + "\n"


def collect_running_sheet_page() -> dict[str, object]:
    entries = collect_running_sheet_entries()
    raw = build_running_sheet_markdown(entries)
    RUNNING_SHEET_OUTPUT.write_text(raw, encoding="utf-8")
    meta, body = parse_frontmatter(raw)
    title = str(meta.get("title") or "One-off / Lessons Learned Running Sheet")
    return {
        "id": "one-offs/running-sheet",
        "slug": "running-sheet",
        "namespace": "one-offs",
        "namespaceLabel": NAMESPACE_INFO["one-offs"]["label"],
        "namespaceDescription": NAMESPACE_INFO["one-offs"]["description"],
        "rel": RUNNING_SHEET_OUTPUT.relative_to(ROOT).as_posix(),
        "title": title,
        "summary": extract_summary(body, "Single running sheet for projects and durable lessons."),
        "updated": str(meta.get("updated") or datetime.now().strftime("%Y-%m-%d")),
        "created": "",
        "sources": len(entries),
        "tags": ["one-off", "lesson", "running-sheet", "work-brain"],
        "headings": extract_headings(body),
        "metadataRows": extract_metadata_rows(body),
        "status": "Active",
        "caseId": "",
        "links": extract_links(body),
        "lessonEntries": entries,
        "markdown": body,
        "html": markdown_to_html(body),
    }


def rebuild_link_index(pages: list[dict[str, object]]) -> None:
    LINK_INDEX.clear()
    for page in pages:
        page_id = str(page["id"])
        slug = str(page["slug"])
        LINK_INDEX[page_id] = page_id
        LINK_INDEX[slug] = page_id
        LINK_INDEX[Path(slug).name] = page_id


def with_rendered_html(pages: list[dict[str, object]]) -> None:
    rebuild_link_index(pages)
    for page in pages:
        page["html"] = markdown_to_html(str(page["markdown"]))
        page["resolvedLinks"] = [resolve_link_id(link) for link in page["links"]]


def main() -> None:
    pages = collect_pages()
    with_rendered_html(pages)
    backlinks: dict[str, list[dict[str, str]]] = {str(page["id"]): [] for page in pages}
    by_id = {str(page["id"]): page for page in pages}
    for page in pages:
        for target in page.get("resolvedLinks", []):
            if target in backlinks and str(page["id"]) != target:
                backlinks[target].append({"id": str(page["id"]), "title": str(page["title"])})
    for page in pages:
        page["backlinks"] = backlinks[str(page["id"])]

    payload = {
        "generatedAt": datetime.now().isoformat(timespec="seconds"),
        "namespaceInfo": NAMESPACE_INFO,
        "namespaceOrder": NAMESPACE_ORDER,
        "pages": pages,
        "counts": {
            "wikiPages": len(pages),
            "sources": len([p for p in pages if p["namespace"] == "plans"]),
            "rawFiles": len(pages),
        },
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(render_app(payload), encoding="utf-8")
    print(f"Built {OUTPUT}")
    print(f"  {len(pages)} pages")
    print(f"  {sum(len(p.get('resolvedLinks', [])) for p in pages)} resolved/wiki links")


def render_app(payload: dict[str, object]) -> str:
    data = json.dumps(payload, ensure_ascii=False)
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Joel's Work Brain - Personal Wiki</title>
  <style>
    :root {{
      --bg: #f8f9fa; --surface: #fff; --surface-2: #f1f4f7; --ink: #202122;
      --muted: #54595d; --faint: #72777d; --line: #a2a9b1; --line-soft: #d8dde3;
      --link: #0645ad; --link-hover: #0b57d0; --accent: #2a6f73; --warning: #8a5a00;
      --danger: #9f2d2d; --good: #276749; --sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
      --serif: Georgia, "Times New Roman", serif;
    }}
    * {{ box-sizing: border-box; }}
    html {{ scroll-behavior: smooth; }}
    body {{ margin: 0; min-height: 100vh; background: var(--bg); color: var(--ink); font-family: var(--sans); font-size: 15px; line-height: 1.55; }}
    button, input {{ font: inherit; }}
    a, .wiki-link {{ color: var(--link); text-decoration: none; cursor: pointer; }}
    a:hover, .wiki-link:hover {{ color: var(--link-hover); text-decoration: underline; }}
    .app {{ display: grid; grid-template-columns: 304px minmax(0, 1fr); min-height: 100vh; }}
    .sidebar {{ position: sticky; top: 0; height: 100vh; overflow: auto; border-right: 1px solid var(--line-soft); background: #fff; }}
    .sidebar-head {{ position: sticky; top: 0; z-index: 2; background: #fff; padding: 22px 16px 14px; border-bottom: 1px solid var(--line-soft); }}
    .sidebar nav {{ padding: 10px 16px 32px; }}
    .brand {{ display: flex; align-items: center; gap: 12px; padding-bottom: 16px; border-bottom: 1px solid var(--line-soft); margin-bottom: 18px; }}
    .brand-icon {{ width: 70px; height: 70px; border-radius: 16px; border: 1px solid rgba(42,111,115,.25); background: radial-gradient(circle at 35% 30%, #fff 0 12%, #d9eceb 13% 34%, #2a6f73 35% 68%, #12383a 69%); box-shadow: 0 12px 24px rgba(32,33,34,.13); }}
    .brand-title {{ font-family: var(--serif); font-size: 24px; font-weight: 400; line-height: 1; }}
    .brand-subtitle {{ color: var(--faint); font-size: 11px; text-transform: uppercase; letter-spacing: .12em; }}
    .search-box {{ position: relative; }}
    .search-box input {{ width: 100%; border: 1px solid var(--line-soft); background: #fcfcfd; color: var(--ink); padding: 9px 10px 9px 32px; border-radius: 4px; outline: none; }}
    .search-icon {{ position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--faint); pointer-events: none; }}
    .search-results {{ display: none; position: absolute; z-index: 30; left: 0; right: 0; top: calc(100% + 6px); border: 1px solid var(--line); background: #fff; max-height: 430px; overflow: auto; box-shadow: 0 12px 30px rgba(32,33,34,.16); border-radius: 4px; }}
    .search-results.open {{ display: block; }}
    .search-result {{ border: 0; border-bottom: 1px solid var(--line-soft); background: transparent; width: 100%; text-align: left; padding: 10px; cursor: pointer; }}
    .search-result:hover {{ background: var(--surface-2); }}
    .search-result strong, .search-result span {{ display:block; }}
    .search-result span {{ color: var(--muted); font-size: 12px; margin-top: 2px; }}
    .namespace {{ margin-bottom: 4px; }}
    .namespace summary {{ cursor: pointer; list-style: none; display: grid; grid-template-columns: 12px minmax(0,1fr) auto; align-items: center; gap: 10px; min-height: 32px; font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--accent); padding: 6px; border-radius: 4px; }}
    .namespace summary::-webkit-details-marker {{ display: none; }}
    .namespace summary::before {{ content:""; width:0; height:0; border-left:4px solid var(--accent); border-top:4px solid transparent; border-bottom:4px solid transparent; transition: transform .15s ease; }}
    .namespace[open] summary::before {{ transform: rotate(90deg); }}
    .count {{ color: var(--muted); font-weight: 600; font-size: 11px; background: #eef2f6; padding: 1px 7px; border-radius: 999px; }}
    .nav-list {{ list-style: none; margin: 2px 0 6px 14px; padding: 0 0 0 12px; position: relative; }}
    .nav-list::before {{ content:""; position:absolute; left:0; top:4px; bottom:4px; width:1px; background: var(--line-soft); }}
    .nav-item {{ position: relative; border: 0; background: transparent; color: var(--muted); width: 100%; text-align: left; padding: 5px 10px; cursor: pointer; font-size: 15px; line-height: 1.4; border-radius: 4px; }}
    .nav-item::before {{ content:""; position:absolute; left:-12px; top:4px; bottom:4px; width:3px; background:var(--accent); border-radius:2px; opacity:0; transform:translateX(-4px); }}
    .nav-item:hover {{ background:#f6f8fa; color:var(--ink); }}
    .nav-item.active {{ background:#eaf2f3; color:var(--ink); font-weight:600; }}
    .nav-item:hover::before, .nav-item.active::before {{ opacity:1; transform:translateX(0); }}
    .main {{ min-width:0; display:grid; grid-template-rows:auto minmax(0,1fr); }}
    .topbar {{ position:sticky; top:0; z-index:20; display:flex; align-items:center; gap:16px; min-height:50px; border-bottom:1px solid var(--line-soft); background:#fff; padding:8px 24px; }}
    .crumbs {{ color:var(--muted); font-size:13px; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }}
    .page-tools {{ display:flex; gap:8px; align-items:center; }}
    .page-tools button {{ border:1px solid var(--line); background:#fff; padding:5px 10px; border-radius:2px; cursor:pointer; color:var(--muted); font-size:13px; }}
    .meta-short {{ color:var(--faint); font-size:12px; padding-left:6px; border-left:1px solid var(--line-soft); }}
    .article-shell {{ display:grid; grid-template-columns:minmax(0,1fr) 280px; gap:28px; width:min(1440px, calc(100% - 48px)); margin:0 auto; padding:28px 0 80px; }}
    .article h1 {{ margin:0 0 4px; padding:14px 0 8px; border-bottom:1px solid var(--line); font-family:var(--serif); font-size:clamp(30px,3.4vw,42px); line-height:1.15; font-weight:400; position:sticky; top:50px; z-index:5; background:var(--bg); }}
    .lede {{ color:#2a2e33; font-size:17px; line-height:1.65; margin:0 0 22px; }}
    .metadata-line {{ color: var(--muted); font-size: 12.5px; margin-bottom: 18px; }}
    .article h2 {{ margin:32px 0 10px; padding-bottom:5px; border-bottom:1px solid var(--line-soft); font-family:var(--serif); font-weight:400; font-size:24px; }}
    .article h3 {{ margin:22px 0 8px; font-size:17px; font-weight:600; }}
    .article p {{ margin:0 0 14px; }}
    .article ul, .article ol {{ margin:0 0 16px 24px; padding:0; }}
    .article li + li {{ margin-top:5px; }}
    .article table {{ width:100%; border-collapse:collapse; margin:12px 0 20px; font-size:14px; border:2px solid #7f8a94; }}
    .article th, .article td {{ border:1px solid #9aa4ad; padding:8px 10px; vertical-align:top; }}
    .article th {{ background:#dfe8ef; color:#202122; text-align:left; }}
    .check-list {{ list-style:none; margin-left:0 !important; }}
    .check-list li {{ display:flex; gap:9px; align-items:flex-start; }}
    .box {{ width:14px; height:14px; border:1px solid var(--line); margin-top:4px; background:#fff; flex:0 0 auto; }}
    .check-list li.is-checked .box {{ background: var(--good); border-color: var(--good); }}
    .home-grid, .namespace-cards {{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; margin-top:20px; }}
    .wiki-panel, .namespace-card {{ border:1px solid var(--line-soft); background:#fff; padding:16px; }}
    .wiki-panel h2, .namespace-card h2 {{ margin-top:0; font-size:23px; }}
    .right-rail {{ display:grid; gap:16px; align-content:start; }}
    .infobox, .rail-box {{ border:1px solid var(--line); background:#fff; font-size:13px; overflow:hidden; }}
    .infobox-title, .rail-box h3 {{ margin:0; background:#e8f0f2; border-bottom:1px solid var(--line); padding:10px 12px; font-family:var(--serif); font-size:17px; font-weight:700; text-align:center; }}
    .infobox-row {{ display:grid; grid-template-columns:104px minmax(0,1fr); border-bottom:1px solid var(--line-soft); }}
    .infobox-key {{ background:#f5f6f7; padding:8px 9px; color:var(--ink); font-weight:700; }}
    .infobox-value {{ padding:8px 9px; color:var(--muted); overflow-wrap:anywhere; }}
    .contact-line {{ display:block; margin-top:3px; color:var(--faint); font-size:12px; }}
    .article-shell.lesson-mode {{ grid-template-columns:minmax(0,1fr); width:min(1560px, calc(100% - 48px)); }}
    .article-shell.lesson-mode .right-rail {{ display:none; }}
    .lesson-register {{ display:grid; gap:18px; }}
    .lesson-hero {{ border:1px solid #81909a; background:linear-gradient(135deg,#ffffff 0%,#eef5f3 58%,#e6ecef 100%); padding:22px 24px; }}
    .lesson-hero h1 {{ position:static; top:auto; margin:0 0 8px; padding:0; border:0; background:transparent; }}
    .lesson-hero p {{ max-width:920px; margin:0; color:#32383d; font-size:16px; }}
    .lesson-metrics {{ display:flex; flex-wrap:wrap; gap:10px; margin-top:16px; }}
    .lesson-metric {{ border:1px solid #a7b1b9; background:#fff; padding:8px 11px; min-width:116px; }}
    .lesson-metric strong {{ display:block; font-family:var(--serif); font-size:22px; line-height:1; }}
    .lesson-metric span {{ display:block; color:var(--muted); font-size:11px; text-transform:uppercase; letter-spacing:.08em; margin-top:3px; }}
    .lesson-toolbar {{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; border:1px solid var(--line-soft); background:#fff; padding:10px; }}
    .lesson-filter {{ border:1px solid #9aa7af; background:#f7f9fa; color:#253036; padding:5px 10px; border-radius:999px; cursor:pointer; font-size:12px; font-weight:700; }}
    .lesson-filter.active {{ background:#1f5e62; color:#fff; border-color:#1f5e62; }}
    .lesson-grid {{ display:grid; gap:12px; }}
    .lesson-card {{ border:1px solid #9aa7af; background:#fff; display:grid; grid-template-columns:220px minmax(0,1fr); min-height:174px; }}
    .lesson-card.is-hidden {{ display:none; }}
    .lesson-side {{ border-right:1px solid #c6ced5; background:#f1f5f6; padding:14px; }}
    .lesson-id {{ color:var(--faint); font-size:11px; text-transform:uppercase; letter-spacing:.08em; }}
    .lesson-title {{ margin:6px 0 10px; font-family:var(--serif); font-size:23px; line-height:1.1; }}
    .lesson-plan {{ display:block; color:#144f55; font-weight:700; margin-top:10px; }}
    .lesson-body {{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:0; }}
    .lesson-cell {{ padding:14px 16px; border-left:1px solid #d7dde2; }}
    .lesson-cell:first-child {{ border-left:0; }}
    .lesson-label {{ display:block; color:#66727b; font-size:11px; text-transform:uppercase; letter-spacing:.09em; font-weight:800; margin-bottom:6px; }}
    .lesson-cell p {{ margin:0; color:#252b30; }}
    .lesson-takeaway {{ background:#fbf7e9; }}
    .lesson-source {{ color:var(--faint); font-size:12px; margin-top:10px; overflow-wrap:anywhere; }}
    .toc-list, .backlink-list, .tag-list {{ list-style:none; margin:0; padding:10px 12px; }}
    .tag-list {{ display:flex; flex-wrap:wrap; gap:6px; }}
    .tag {{ display:inline-flex; border:1px solid var(--line-soft); background:#fff; color:var(--muted); padding:4px 10px; border-radius:999px; font-size:12px; }}
    .status-tag {{ display:inline-flex; align-items:center; border-radius:999px; padding:2px 9px; font-size:12px; font-weight:700; border:1px solid transparent; }}
    .status-active {{ background:#e6f4ec; color:#1d6b42; border-color:#a9d8bd; }}
    .status-transitioning {{ background:#fff4d8; color:#805600; border-color:#e0c16f; }}
    .status-complete {{ background:#eef1f4; color:#48535d; border-color:#c6cdd4; }}
    code {{ background:#f1f4f7; border:1px solid #e1e5ea; padding:1px 4px; border-radius:2px; }}
    pre {{ background:#f6f8fa; border:1px solid var(--line-soft); padding:12px; overflow:auto; }}
    blockquote {{ margin:14px 0; padding:0 0 0 14px; border-left:3px solid var(--line); color:#3b4045; }}
    .mobile-menu {{ display:none; }}
    @media (max-width:1100px) {{
      .app {{ grid-template-columns:1fr; }}
      .sidebar {{ display:none; position:fixed; z-index:40; inset:0 auto 0 0; width:min(340px, calc(100vw - 36px)); box-shadow:14px 0 30px rgba(32,33,34,.2); }}
      .sidebar.open {{ display:block; }}
      .mobile-menu {{ display:inline-flex; }}
      .article-shell {{ grid-template-columns:1fr; width:min(100% - 24px, 980px); gap:22px; }}
      .article-shell.lesson-mode {{ width:min(100% - 24px, 980px); }}
      .lesson-card {{ grid-template-columns:1fr; }}
      .lesson-side {{ border-right:0; border-bottom:1px solid #c6ced5; }}
      .lesson-body {{ grid-template-columns:1fr; }}
      .lesson-cell {{ border-left:0; border-top:1px solid #d7dde2; }}
      .lesson-cell:first-child {{ border-top:0; }}
    }}
    @media (max-width:720px) {{ .page-tools {{ display:none; }} .home-grid, .namespace-cards {{ grid-template-columns:1fr; }} }}
  </style>
</head>
<body>
  <div class="app">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-head">
        <div class="brand"><span class="brand-icon" aria-hidden="true"></span><div><div class="brand-title">Joel's Work Brain</div><div class="brand-subtitle">personal wiki</div></div></div>
        <div class="search-box">
          <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input id="searchInput" type="search" placeholder="Search {payload['counts']['wikiPages']} pages">
          <div id="searchResults" class="search-results"></div>
        </div>
      </div>
      <nav id="sidebarNav" aria-label="Wiki namespaces"></nav>
    </aside>
    <section class="main">
      <header class="topbar">
        <button class="mobile-menu" id="menuButton" type="button">Menu</button>
        <div class="crumbs" id="breadcrumbs">Joel's Work Brain / Home</div>
        <div class="page-tools">
          <button type="button" data-open="__home">Main page</button>
          <button type="button" data-open="__all-pages">All pages</button>
          <span class="meta-short" id="pageMetaShort">{payload['counts']['wikiPages']} pages / {payload['counts']['sources']} plans</span>
        </div>
      </header>
      <div class="article-shell">
        <article class="article" id="article"></article>
        <aside class="right-rail" id="rightRail"></aside>
      </div>
    </section>
  </div>
  <script id="wikiPayload" type="application/json">{data}</script>
  <script>
    const payload = JSON.parse(document.getElementById("wikiPayload").textContent);
    const pages = payload.pages;
    const namespaceInfo = payload.namespaceInfo;
    const namespaceOrder = payload.namespaceOrder;
    const pageMap = new Map(pages.map(page => [page.id, page]));
    const qs = sel => document.querySelector(sel);
    function escapeHtml(value) {{ return String(value ?? "").replace(/[&<>"']/g, c => ({{"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;","'":"&#39;"}}[c])); }}
    function openPage(id, updateHash = true) {{
      if (id === "__home") {{ renderHome(); if (updateHash) history.replaceState(null, "", "#__home"); return; }}
      if (id === "__all-pages") {{ renderAllPages(); if (updateHash) history.replaceState(null, "", "#__all-pages"); return; }}
      const page = pageMap.get(id) || pages[0];
      qs(".article-shell").classList.toggle("lesson-mode", page.id === "one-offs/running-sheet");
      qs("#article").innerHTML = renderArticle(page);
      renderRightRail(page);
      renderSidebar(page.id);
      qs("#breadcrumbs").innerHTML = "Joel's Work Brain / " + escapeHtml(namespaceInfo[page.namespace].label) + " / <strong>" + escapeHtml(page.title) + "</strong>";
      qs("#pageMetaShort").textContent = namespaceInfo[page.namespace].label + " / " + (page.updated || "unknown");
      if (updateHash) history.replaceState(null, "", "#" + page.id);
      qs("#sidebar").classList.remove("open");
    }}
    function renderSidebar(currentId = "") {{
      qs("#sidebarNav").innerHTML = namespaceOrder.map(ns => {{
        const group = pages.filter(page => page.namespace === ns).sort((a,b) => a.title.localeCompare(b.title));
        if (!group.length) return "";
        const open = currentId ? group.some(page => page.id === currentId) : ["plans","open-items","one-offs"].includes(ns);
        return `<details class="namespace" ${{open ? "open" : ""}}><summary><span>${{escapeHtml(namespaceInfo[ns].label)}}</span><span class="count">${{group.length}}</span></summary><ul class="nav-list">${{group.map(page => `<li><button class="nav-item ${{page.id === currentId ? "active" : ""}}" data-open="${{escapeHtml(page.id)}}" type="button">${{escapeHtml(page.title)}}</button></li>`).join("")}}</ul></details>`;
      }}).join("");
    }}
    function renderArticle(page) {{
      if (page.id === "one-offs/running-sheet") return renderLessonRegister(page);
      return `<h1><span class="h1-title">${{escapeHtml(page.title)}}</span></h1><p class="lede">${{escapeHtml(page.summary)}}</p><div class="metadata-line">${{escapeHtml(namespaceInfo[page.namespace].label)}} / <code>${{escapeHtml(page.rel)}}</code> / Updated ${{escapeHtml(page.updated || "unknown")}} / ${{page.sources}} source${{page.sources === 1 ? "" : "s"}}</div>${{page.html}}`;
    }}
    function renderLessonRegister(page) {{
      const entries = page.lessonEntries || [];
      const categories = ["All", ...Array.from(new Set(entries.map(entry => entry.category))).sort()];
      const planCount = new Set(entries.map(entry => entry.planTitle || "General / cross-plan")).size;
      return `<section class="lesson-register"><div class="lesson-hero"><h1>Lessons Register</h1><p>A field log for things worth remembering: what plan/context exposed the issue, what actually went wrong, how it was resolved, and the rule to carry into the next plan.</p><div class="lesson-metrics"><div class="lesson-metric"><strong>${{entries.length}}</strong><span>lessons</span></div><div class="lesson-metric"><strong>${{categories.length - 1}}</strong><span>buckets</span></div><div class="lesson-metric"><strong>${{planCount}}</strong><span>plan contexts</span></div></div></div><div class="lesson-toolbar">${{categories.map((category, index) => `<button type="button" class="lesson-filter ${{index === 0 ? "active" : ""}}" data-lesson-filter="${{escapeHtml(category)}}">${{escapeHtml(category)}}</button>`).join("")}}</div><div class="lesson-grid">${{entries.map(entry => renderLessonCard(entry)).join("")}}</div></section>`;
    }}
    function renderLessonCard(entry) {{
      const plan = entry.planId ? `<span class="wiki-link lesson-plan" data-open="${{escapeHtml(entry.planId)}}">${{escapeHtml(entry.planDetail || entry.planTitle)}}</span>` : `<span class="lesson-plan">${{escapeHtml(entry.planDetail || entry.planTitle)}}</span>`;
      return `<article class="lesson-card" data-category="${{escapeHtml(entry.category)}}"><aside class="lesson-side"><span class="lesson-id">${{escapeHtml(entry.caseId || entry.category)}}</span><h2 class="lesson-title">${{escapeHtml(entry.title)}}</h2><span class="tag">${{escapeHtml(entry.category)}}</span>${{plan}}<div class="lesson-source">${{escapeHtml(entry.rel)}} / ${{escapeHtml(entry.updated)}}</div></aside><div class="lesson-body"><section class="lesson-cell"><span class="lesson-label">Issue</span><p>${{escapeHtml(entry.issue)}}</p></section><section class="lesson-cell"><span class="lesson-label">Resolution</span><p>${{escapeHtml(entry.resolution)}}</p></section><section class="lesson-cell lesson-takeaway"><span class="lesson-label">Key Takeaway</span><p>${{escapeHtml(entry.takeaway)}}</p></section></div></article>`;
    }}
    function renderRightRail(page) {{
      if (!page) {{
        qs("#rightRail").innerHTML = `<div class="infobox"><div class="infobox-title">Work Brain</div><div class="infobox-row"><div class="infobox-key">Pages</div><div class="infobox-value">${{payload.counts.wikiPages}}</div></div><div class="infobox-row"><div class="infobox-key">Plans</div><div class="infobox-value">${{payload.counts.sources}}</div></div></div>`;
        return;
      }}
      if (page.id === "one-offs/running-sheet") {{
        qs("#rightRail").innerHTML = "";
        return;
      }}
      const toc = page.headings || [];
      const backlinks = page.backlinks || [];
      const metaRows = page.metadataRows && page.metadataRows.length
        ? page.metadataRows.map(row => `<div class="infobox-row"><div class="infobox-key">${{escapeHtml(row.key)}}</div><div class="infobox-value">${{row.value}}</div></div>`).join("")
        : `<div class="infobox-row"><div class="infobox-key">Type</div><div class="infobox-value">${{escapeHtml(namespaceInfo[page.namespace].label)}}</div></div><div class="infobox-row"><div class="infobox-key">Source</div><div class="infobox-value">${{escapeHtml(page.rel)}}</div></div><div class="infobox-row"><div class="infobox-key">Updated</div><div class="infobox-value">${{escapeHtml(page.updated || "unknown")}}</div></div>`;
      qs("#rightRail").innerHTML =
        `<div class="infobox"><div class="infobox-title">${{escapeHtml(page.title)}}</div>${{metaRows}}</div>` +
        (toc.length ? `<section class="rail-box"><h3>Contents</h3><ol class="toc-list">${{toc.map(h => `<li><a href="#${{escapeHtml(h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))}}">${{escapeHtml(h)}}</a></li>`).join("")}}</ol></section>` : "") +
        (page.tags.length ? `<section class="rail-box"><h3>Categories</h3><div class="tag-list">${{page.tags.map(tag => `<span class="tag">${{escapeHtml(tag)}}</span>`).join("")}}</div></section>` : "") +
        `<section class="rail-box"><h3>Referenced By</h3><ul class="backlink-list">${{backlinks.length ? backlinks.map(link => `<li><span class="wiki-link" data-open="${{escapeHtml(link.id)}}">${{escapeHtml(link.title)}}</span></li>`).join("") : "<li>No backlinks found.</li>"}}</ul></section>`;
    }}
    function renderHome() {{
      qs(".article-shell").classList.remove("lesson-mode");
      const recent = [...pages].sort((a,b) => String(b.updated).localeCompare(String(a.updated))).slice(0, 12);
      const cornerstone = ["open-items/open-items-dashboard","plans/pella","plans/banayn","plans/international-school-of-denver","one-offs/running-sheet"].map(id => pageMap.get(id)).filter(Boolean);
      qs("#article").innerHTML = `<h1><span class="h1-title">Joel's Work Brain</span></h1><p class="lede">A plan-centric tracking system built around plan information, open items, and one-off lessons. Source files are the truth; the dashboard is a generated read-only view.</p><div class="metadata-line">Generated ${{escapeHtml(payload.generatedAt)}} / ${{payload.counts.wikiPages}} pages / ${{payload.counts.sources}} plans</div><div class="home-grid"><section class="wiki-panel"><h2>Core Sections</h2><ul>${{namespaceOrder.map(ns => `<li><span class="wiki-link" data-open="__all-pages">${{escapeHtml(namespaceInfo[ns].label)}}</span> <span class="metadata-line">${{pages.filter(p => p.namespace === ns).length}}</span></li>`).join("")}}</ul></section><section class="wiki-panel"><h2>Cornerstone Articles</h2><ul>${{cornerstone.map(page => `<li><span class="wiki-link" data-open="${{escapeHtml(page.id)}}">${{escapeHtml(page.title)}}</span></li>`).join("")}}</ul></section><section class="wiki-panel"><h2>Recently Updated</h2><ul>${{recent.map(page => `<li><span class="wiki-link" data-open="${{escapeHtml(page.id)}}">${{escapeHtml(page.title)}}</span> <span class="metadata-line">${{escapeHtml(page.updated)}}</span></li>`).join("")}}</ul></section><section class="wiki-panel"><h2>Operating Model</h2><p>Deprecated source views are hidden from this app. Edit open items in their source files, then regenerate the dashboard.</p></section></div>`;
      renderRightRail(null); renderSidebar(""); qs("#breadcrumbs").textContent = "Joel's Work Brain / Home";
    }}
    function renderAllPages() {{
      qs(".article-shell").classList.remove("lesson-mode");
      qs("#article").innerHTML = `<h1>All Pages</h1><p class="lede">Every Work Brain markdown object, classified into the personal wiki namespaces.</p><div class="namespace-cards">${{namespaceOrder.map(ns => {{ const group = pages.filter(page => page.namespace === ns).sort((a,b) => a.title.localeCompare(b.title)); return `<section class="namespace-card"><h2>${{escapeHtml(namespaceInfo[ns].label)}} <span class="metadata-line">${{group.length}}</span></h2><p>${{escapeHtml(namespaceInfo[ns].description)}}</p><ul>${{group.map(page => `<li><span class="wiki-link" data-open="${{escapeHtml(page.id)}}">${{escapeHtml(page.title)}}</span> <span class="metadata-line">${{escapeHtml(page.rel)}}</span></li>`).join("")}}</ul></section>`; }}).join("")}}</div>`;
      renderRightRail(null); renderSidebar(""); qs("#breadcrumbs").textContent = "Joel's Work Brain / All Pages";
    }}
    function runSearch(query) {{
      const q = query.trim().toLowerCase();
      if (!q) return [];
      return pages.filter(page => [page.title, page.summary, page.rel, page.namespace].join(" ").toLowerCase().includes(q)).slice(0, 24);
    }}
    document.addEventListener("click", event => {{
      const opener = event.target.closest("[data-open]");
      if (opener) openPage(opener.dataset.open);
      const filter = event.target.closest("[data-lesson-filter]");
      if (filter) {{
        const category = filter.dataset.lessonFilter;
        document.querySelectorAll(".lesson-filter").forEach(button => button.classList.toggle("active", button === filter));
        document.querySelectorAll(".lesson-card").forEach(card => card.classList.toggle("is-hidden", category !== "All" && card.dataset.category !== category));
      }}
    }});
    qs("#menuButton").addEventListener("click", () => qs("#sidebar").classList.toggle("open"));
    qs("#searchInput").addEventListener("input", event => {{
      const results = runSearch(event.target.value);
      const panel = qs("#searchResults");
      panel.classList.toggle("open", !!event.target.value);
      panel.innerHTML = results.length ? results.map(page => `<button class="search-result" data-open="${{escapeHtml(page.id)}}" type="button"><strong>${{escapeHtml(page.title)}}</strong><span>${{escapeHtml(namespaceInfo[page.namespace].label)}} / ${{escapeHtml(page.rel)}}</span></button>`).join("") : `<button class="search-result" type="button"><strong>No results</strong><span>Try a plan, open item, project, or lesson.</span></button>`;
    }});
    window.addEventListener("hashchange", () => openPage(location.hash.slice(1) || "__home", false));
    renderSidebar("");
    openPage(location.hash.slice(1) || "__home", false);
  </script>
</body>
</html>"""


if __name__ == "__main__":
    main()
