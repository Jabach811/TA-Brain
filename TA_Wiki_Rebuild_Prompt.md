# TA Wiki Program Rebuild Prompt

You are rebuilding the TA Wiki Program from the ground up as a new standalone application.

Your first task is to inspect the specified project folder and identify all source material used to create the current TA Wiki system. Do not only look at the final output files. Trace the full input pipeline and extract the underlying data, folder structure, engine logic, intake process, parsed files, generated artifacts, and any digested source content that feeds the program.

The goal is to create a clean, scalable rebuild that preserves the knowledge, structure, and usefulness of the current program while making the new version easier to maintain, expand, and improve.

---

## Model Allocation Strategy

This rebuild involves both heavy mechanical work (scanning, cataloguing, reformatting) and judgment-heavy work (architecture decisions, ambiguous-purpose calls, final UI/UX polish). Delegate freely between model tiers rather than doing everything at the same level — decide the split as you go, based on what the folder actually contains.

**Routing heuristic:**
- If a task is about *deciding the rule* — synthesizing what powers the current system, designing the data model/schema, judging an ambiguous file's fate, making architecture calls, reviewing the final build for coherence, writing migration notes — treat it as judgment work and handle it at the higher tier.
- If a task is about *applying a rule repeatedly* — running an established classification across many files, populating `wikiData` entries from a defined schema, generating boilerplate HTML/CSS/JS from a spec already fixed, reformatting inventories into tables — offload it as bulk/mechanical work.
- When a task doesn't clearly fall into either bucket, don't silently guess: note the ambiguity and make the call explicitly rather than defaulting.

Re-evaluate the split as you go — if something assumed to be mechanical turns out to need judgment calls (or vice versa), reroute it rather than forcing it into the original bucket.

---

## Primary Objective

Build a new standalone TA Wiki application using everything available from the existing folder.

The rebuilt program should:
- Preserve all existing useful knowledge and source data
- Reconstruct the engine/data model in a cleaner way
- Extract and organize all digested input data
- Make the folder and data structure easier to scale
- Separate raw input, processed data, generated content, and app logic
- Make it easy to add new wiki entries, programs, workflows, documents, and categories
- Avoid hardcoded one-off logic wherever possible
- Be designed as a maintainable long-term internal knowledge system

---

## Folder Review Requirements

Go through the specified folder deeply and identify:

1. **Raw input files**
   - Markdown files
   - Text files
   - CSV files
   - JSON files
   - Excel files
   - HTML files
   - Any notes, exports, scraped content, or source documents

2. **Processed or digested data**
   - Any files that appear to be generated from source input
   - Parsed records
   - Categorized wiki entries
   - Search index files
   - Metadata files
   - Relationship maps
   - Topic/category mappings
   - Engine-ready datasets

3. **Program structure**
   - Existing app folders
   - Data folders
   - Source folders
   - Output/build folders
   - Asset folders
   - Config folders
   - Any hidden or supporting structure

4. **Engine logic**
   - Search logic
   - Filtering logic
   - Category navigation
   - Markdown rendering
   - Relationship linking
   - Tagging
   - File ingestion
   - Any parsing/transformation process
   - Any hardcoded assumptions that should be replaced with config/data-driven logic

5. **Intake process**
   - How new information appears to be added
   - Where source files are placed
   - How they are transformed
   - How the wiki consumes them
   - What manual steps currently seem required
   - What should be automated in the rebuild

6. **Existing output**
   - Current wiki pages
   - Generated HTML
   - Generated indexes
   - Navigation structures
   - Program pages
   - Documentation pages
   - Search-related files

---

## Extraction Requirements

Create a structured inventory of everything discovered.

For each relevant file, capture:
- File name
- Relative path
- File type
- Likely purpose
- Whether it is raw input, processed data, app logic, asset, config, or output
- Whether it should be preserved, rebuilt, replaced, archived, or ignored
- Any dependencies it appears to have
- Any data it contributes to the TA Wiki system

Then extract all usable source data into a clean rebuild-ready structure.

*(Deciding what "preserve/rebuild/replace/archive/ignore" means for ambiguous files is judgment work; running that classification across every file once the rules are set is bulk work — route each accordingly.)*

---

## New Standalone File Requirement

Create a brand-new standalone application file that uses the extracted data.

The standalone file should:
- Contain the rebuilt TA Wiki interface
- Use a clean internal data structure
- Include all currently available digested wiki data
- Include searchable entries
- Include categories/tags where available
- Include expandable detail views
- Include a clean navigation system
- Be easy to add to later
- Avoid requiring external build tools
- Prefer simple HTML, CSS, and JavaScript unless the existing project clearly requires another approach

The final standalone file should be production-quality enough to use immediately, while also being structured clearly enough for future expansion.

---

## Recommended Rebuild Architecture

Use this kind of structure conceptually, even if the final deliverable is a single file:

```
/ta-wiki-rebuild
  /raw-input
  /processed-data
  /wiki-content
  /assets
  /engine
  /exports
  /archive
  index.html
  README.md
  data-manifest.json
```

For the standalone version, embed the necessary data directly inside the file in a clean JavaScript data object, using a format like:

```javascript
const wikiData = [
  {
    id: "",
    title: "",
    category: "",
    subcategory: "",
    tags: [],
    summary: "",
    body: "",
    sourceFiles: [],
    relatedItems: [],
    lastUpdated: ""
  }
];
```

The data model should be scalable. Do not create a brittle layout that only works for the current content.

---

## Application Features

The rebuilt standalone TA Wiki should include:
- Search across titles, summaries, tags, and body content
- Category filtering
- Tag filtering if tags exist or can be inferred
- Clean card/list layout
- Detail panel or expandable article view
- Source reference display where source files are known
- Counts by category
- Clear empty states
- Simple maintainable CSS
- Plain JavaScript with no unnecessary dependencies
- Responsive layout for desktop and laptop use
- Internal comments explaining the data model and engine sections

---

## Important Rules

- Do not throw away existing data unless it is clearly duplicated, broken, temporary, or irrelevant.
- Do not assume the final HTML output is the only source of truth. Prefer raw and processed source data whenever available.
- Do not overfit the rebuild to the current exact folder layout. The new version should be cleaner and easier to extend.
- Do not rely on hardcoded categories if categories can be inferred from data.
- Do not create a visually generic template. The UI should feel like a polished internal knowledge tool: clean, professional, fast, and practical.
- Do not hide uncertainty. If a file's purpose is unclear, mark it as unclear and explain the best guess.

---

## Deliverables

Produce the following:

1. **Folder analysis summary**
   - What was found
   - What appears to power the current TA Wiki
   - What the current intake/data flow looks like

2. **Data inventory**
   - Organized list/table of source files, processed files, app files, generated files, and assets

3. **Recommended rebuild structure**
   - Clean folder structure for future scaling
   - Explanation of what belongs where

4. **Extracted data model**
   - A normalized structure for wiki entries
   - Categories, tags, relationships, and source references

5. **New standalone application file**
   - A complete rebuilt standalone HTML file
   - Embedded data
   - Search/filter/navigation engine
   - Clean responsive UI
   - Ready to open and use locally

6. **Migration notes**
   - What was preserved
   - What was changed
   - What should be reviewed manually
   - What future additions should follow

---

## Final Output Standard

The final answer should include the completed standalone file and a concise rebuild report.

The code should be clean, organized, and commented only where useful.

The rebuild should be treated as the foundation for a larger, expandable TA Wiki system, not a one-time static page.
