---
name: wiki-merge-roles
description: >
  Merges two wiki role pages in the TA Brain wiki into one canonical page, then
  rebuilds and copies the HTML output. Use this skill whenever the user asks to
  merge, combine, consolidate, or unify two role sections — even stated casually
  ("those two are the same thing", "combine QA and QC", "get rid of the duplicate").
  Handles all bookkeeping: content merge, wikilink redirects, index update, rebuild,
  copy to output HTML. Always use this skill for TA Brain wiki role merges — do not
  attempt them ad-hoc.
---

# Wiki Merge Roles

Merge two TA Brain wiki role pages into one. The **target** page survives; the **source** page is absorbed and deleted.

## Inputs — confirm before starting

| Input | Example |
|-------|---------|
| Source slug | `qc` |
| Target slug | `qa` |
| Target display name | `Quality Assurance (QA / Quality Consultant)` |
| Output HTML path | `C:/Users/mabac/OneDrive/Desktop/TA Brain/Transamerica Brain.html` |

The output HTML default is `Transamerica Brain.html` in the TA Brain root. Ask if any input is missing.

---

## Step 1 — Find the right worktree

The wiki lives in multiple git worktrees. Find the one that has **both** files:

```bash
find "C:/Users/mabac/OneDrive/Desktop/TA Brain/.Codex/worktrees" \
  -path "*/wiki/roles/<source-slug>.md" 2>/dev/null
```

Cross-reference with the target slug the same way. Use the worktree that contains **both**. If multiple qualify, pick the one with the most `.md` files under `wiki/` — that's the most up-to-date build. Set this as `WORKTREE` for all remaining steps.

---

## Step 2 — Read both pages in full

Read `WORKTREE/wiki/roles/<source-slug>.md` and `WORKTREE/wiki/roles/<target-slug>.md` completely before making any changes. You need to understand:
- Which page is more detailed (usually the target, but not always)
- What unique content exists in the source that the target lacks
- Whether the source is a stub pointing at the target, or a genuine peer with independent content
- Whether there's a structured table (Key People, Audit Catalog) that needs collapsing rather than appending

---

## Step 3 — Merge content into the target page

The target is primary. Fold in what's unique and useful from the source; discard what's redundant.

### Frontmatter

- **aliases** — add the source page's title and common abbreviations (e.g. `["Quality Consultant", "QC", "Quality Control Consultant"]`)
- **tags** — union of both tag lists, deduplicated
- **sources** — do not blindly add counts; use judgment. If the source was a stub derived from the same raw documents, leave the target count unchanged. If it drew from genuinely distinct sources, increment accordingly.
- **updated** — today's date

### Content to carry over (if absent from target)

- Responsibilities, systems, or relationships in source but not target
- Named people listed in source (e.g. a "Key People" table) — collapse into the target's "Who They Work With" table rather than adding a new section
- "What Other Teams Should Know" bullets unique to source
- Open Questions from source that aren't answered by the merge itself

### Content to clean up in target

- Remove any `See Also` link pointing to `[[<source-slug>]]`
- Remove any Open Question asking whether the two roles differ
- Remove any comparison table contrasting source vs. target
- If "Who They Work With" has a row where source references target as its parent (`[[qa]] | QC operates inside the [[qa]] function`), drop that row — it's circular after the merge

### One-sentence intro

Revise the opening line to make both names visible, e.g.:
> "Also known as **Quality Consultant (QC)**. The team that..."

If the target's title already includes both names (e.g. "Quality Assurance (QA / Quality Consultant)"), this may already be satisfied — check before editing.

---

## Step 4 — Replace all wikilinks across the entire wiki

Run this Python script from within the WORKTREE. It replaces every `[[<source-slug>]]` across all `.md` files — roles, concepts, entities, processes, glossary, onboarding, sources, queries, analyses, everything. This will also update the target page itself if it contained a self-reference to the source; that's correct and expected.

```python
import os, re

WIKI = "WORKTREE/wiki"
SOURCE = "<source-slug>"
TARGET = "<target-slug>"

pattern = re.compile(r'\[\[' + re.escape(SOURCE) + r'\]\]')

for root, dirs, files in os.walk(WIKI):
    for fname in files:
        if not fname.endswith('.md'):
            continue
        path = os.path.join(root, fname)
        text = open(path, encoding='utf-8').read()
        updated = pattern.sub(f'[[{TARGET}]]', text)
        if updated != text:
            open(path, 'w', encoding='utf-8').write(updated)
            print(f'Updated: {os.path.relpath(path, WIKI)}')
```

List every file it touched — this is important for the user to verify.

---

## Step 5 — Delete the source page

```bash
rm "WORKTREE/wiki/roles/<source-slug>.md"
```

---

## Step 6 — Update index.md

In `WORKTREE/wiki/index.md`:
- **Remove** the row for `[[roles/<source-slug>]]`
- **Update** the row for `[[roles/<target-slug>]]`:
  - Summary should include both names/abbreviations
  - Sources count: apply the same judgment from Step 3 frontmatter

---

## Step 7 — Rebuild and copy

```bash
cd WORKTREE && python build-wiki.py
cp "WORKTREE/wiki.html" "<output-html-path>"
```

The build output prints a page count. It should be exactly one fewer than before (the source page removed). Note the count for your report.

---

## Step 8 — Report to the user

- Files where `[[source-slug]]` was replaced (from Step 4)
- What unique content was carried over from source into target
- What was discarded from source and why
- New page count vs. old (confirm the one-page drop)
