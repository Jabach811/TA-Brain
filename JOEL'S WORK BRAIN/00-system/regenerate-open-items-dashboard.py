from __future__ import annotations

import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DASHBOARD = ROOT / "open-items-dashboard.md"
SCAN_FOLDERS = [ROOT / "02-plans", ROOT / "03-projects", ROOT / "05-processes"]
VALID_STATUSES = {"Active", "Transitioning", "Complete"}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def parse_frontmatter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) != 3:
        return {}, text
    meta: dict[str, str] = {}
    for line in parts[1].splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip().strip('"')
    return meta, parts[2].lstrip()


def first_h1(body: str, fallback: str) -> str:
    for line in body.splitlines():
        if line.startswith("# "):
            return re.sub(r"\s+`[^`]+`\s*$", "", line[2:].strip())
    return fallback


def open_items_section(body: str) -> str:
    match = re.search(r"^## Open Items\s*$", body, re.M)
    if not match:
        return ""
    rest = body[match.end() :]
    next_heading = re.search(r"^##\s+", rest, re.M)
    return rest[: next_heading.start()] if next_heading else rest


def unchecked_items(section: str) -> list[str]:
    items: list[str] = []
    for line in section.splitlines():
        if re.match(r"^- \[ \] .+", line):
            items.append(line.rstrip())
    return items


def scan_file(path: Path) -> dict[str, object] | None:
    if path.name.startswith("_") or path == DASHBOARD:
        return None
    text = read_text(path)
    meta, body = parse_frontmatter(text)
    section = open_items_section(body)
    items = unchecked_items(section)
    if not items:
        return None
    status = meta.get("status", "Active")
    if status not in VALID_STATUSES:
        status = "Active"
    page_type = meta.get("type", "non-plan")
    return {
        "path": path,
        "title": meta.get("title") or first_h1(body, path.stem.replace("-", " ").title()),
        "case_id": meta.get("case_id", ""),
        "status": status,
        "type": page_type,
        "items": items,
    }


def sort_key(entry: dict[str, object]) -> tuple[str, str]:
    return (str(entry["title"]).lower(), str(entry["case_id"]).lower())


def status_tag(status: object) -> str:
    value = str(status)
    css = value.lower()
    return f'<span class="status-tag status-{css}">{value}</span>'

def render_plan_group(entry: dict[str, object]) -> str:
    case_id = f" `{entry['case_id']}`" if entry.get("case_id") else ""
    lines = [f"## {entry['title']}{case_id} -- {status_tag(entry['status'])}"]
    lines.extend(str(item) for item in entry["items"])
    return "\n".join(lines)


def render_non_plan_group(entry: dict[str, object]) -> str:
    case_id = f" `{entry['case_id']}`" if entry.get("case_id") else ""
    lines = [f"### {entry['title']}{case_id} -- {status_tag(entry['status'])}"]
    lines.extend(str(item) for item in entry["items"])
    return "\n".join(lines)


def main() -> None:
    entries: list[dict[str, object]] = []
    for folder in SCAN_FOLDERS:
        for path in sorted(folder.glob("*.md")):
            entry = scan_file(path)
            if entry:
                entries.append(entry)

    plans = [e for e in entries if e["type"] == "plan"]
    non_plans = [e for e in entries if e["type"] != "plan"]

    lines = [
        "# Open Items Dashboard",
        "",
        f"*Generated {datetime.now().strftime('%Y-%m-%d %H:%M')}. Read-only -- edit items in their source file and regenerate.*",
        "",
        "---",
        "",
    ]

    for status in ["Active", "Transitioning", "Complete"]:
        group = sorted([e for e in plans if e["status"] == status], key=sort_key)
        if status == "Complete":
            group = [e for e in group if e["items"]]
        for entry in group:
            lines.append(render_plan_group(entry))
            lines.append("")

    if non_plans:
        lines.append("## Non-Plan Items")
        lines.append("")
        for entry in sorted(non_plans, key=sort_key):
            lines.append(render_non_plan_group(entry))
            lines.append("")

    DASHBOARD.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    print(f"Generated {DASHBOARD}")


if __name__ == "__main__":
    main()
