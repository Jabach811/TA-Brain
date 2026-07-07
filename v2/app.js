'use strict';

// ============================================================
// DATA
// ============================================================
const DATA = JSON.parse(document.getElementById('atlas-data').textContent);
const PAGES = { ...(DATA.pages || {}) };
const ENCRYPTED = DATA.encryptedSources;
let LOCKED_OPEN = false;

const FOLDER_LABELS = DATA.folderLabels || {};
const FOLDER_ORDER = DATA.folderOrder || [];
const FOLDER_COLORS = {
  roles:       '#9c3a2c',
  concepts:    '#6c5b3e',
  processes:   '#3f5a4a',
  entities:    '#4a4769',
  onboarding:  '#7a4a2a',
  glossary:    '#5a5550',
  sources:     '#a04f7f',
  departments: '#3a5c75',
  analyses:    '#2b6b5a',
  _root:       '#1a1a17',
};

// ============================================================
// STATE
// ============================================================
const state = {
  slug: null,
  query: '',
  pageNum: new Map(),
};

// Number pages for the chapter-opener "ITEM 042 / 128" feel.
(() => {
  let n = 1;
  for (const folder of FOLDER_ORDER) {
    const group = (DATA.tree || []).find(g => g.folder === folder);
    if (!group || group.locked) continue;
    for (const p of group.pages) state.pageNum.set(p.slug, n++);
  }
})();

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function toast(msg, ms = 1800) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), ms);
}

// ============================================================
// MARKDOWN → HTML
// Lightweight renderer. Handles:
//   - frontmatter is already stripped by Python
//   - headings #..####
//   - paragraphs
//   - bold **x**, italic *x*, inline code `x`
//   - links [t](u), images ![alt](src), wikilinks [[slug|text]]
//   - fenced code ```lang ... ```
//   - blockquotes >
//   - hr (--- on its own line)
//   - bullet lists (-, *)
//   - ordered lists (1.)
//   - GFM tables
// ============================================================
function escInline(s) {
  return s
    .replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderInline(s) {
  // 1) code spans (protect their content)
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => `\x00C${codes.push(c) - 1}\x00`);

  // 2) escape HTML
  s = escInline(s);

  // 3) wikilinks  [[target|text]]
  s = s.replace(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (_, tgt, txt) => {
    const slug = tgt.split('/').pop().toLowerCase().trim();
    const label = (txt || tgt.split('/').pop()).trim();
    const broken = !PAGES[slug];
    return `<a data-wiki="${slug}"${broken ? ' data-broken="1" title="No page yet"' : ''}>${esc(label)}</a>`;
  });

  // 4) images  ![alt](src)
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_, alt, src, ttl) => `<img alt="${esc(alt)}" src="${esc(src)}"${ttl ? ` title="${esc(ttl)}"` : ''} />`);

  // 5) plain links  [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_, txt, url) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(txt)}</a>`);

  // 6) bold / italic
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>');

  // 7) restore code spans
  s = s.replace(/\x00C(\d+)\x00/g, (_, i) => `<code>${escInline(codes[Number(i)])}</code>`);

  return s;
}

function renderTable(rows) {
  const sep = rows[1] || '';
  const hasHead = /^\s*\|?[\s:-]+\|/.test(sep);
  let head = '', body = '';
  const dataRows = hasHead ? rows.slice(2) : rows;
  if (hasHead) {
    const cells = rows[0].replace(/^\||\|$/g, '').split('|').map(c => c.trim());
    head = '<thead><tr>' + cells.map(c => `<th>${renderInline(c)}</th>`).join('') + '</tr></thead>';
  }
  body = '<tbody>' + dataRows.map(r => {
    const cells = r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
    return '<tr>' + cells.map(c => `<td>${renderInline(c)}</td>`).join('') + '</tr>';
  }).join('') + '</tbody>';
  return `<table>${head}${body}</table>`;
}

function renderMarkdown(src) {
  if (!src) return '';
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const lang = fence[1] || '';
      const buf = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++;
      out.push(`<pre><code class="lang-${esc(lang)}">${escInline(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // HR
    if (/^---+\s*$/.test(line) || /^\*\*\*+\s*$/.test(line) || /^___+\s*$/.test(line)) {
      out.push('<hr />'); i++; continue;
    }

    // Heading
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length;
      out.push(`<h${lvl}>${renderInline(h[2].trim())}</h${lvl}>`);
      i++; continue;
    }

    // Blank
    if (/^\s*$/.test(line)) { i++; continue; }

    // Table
    if (line.includes('|') && i + 1 < lines.length && /^\s*\|?[\s:-]+\|/.test(lines[i+1])) {
      const buf = [line, lines[i+1]];
      i += 2;
      while (i < lines.length && lines[i].includes('|') && !/^\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
      out.push(renderTable(buf));
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(`<blockquote>${renderMarkdown(buf.join('\n'))}</blockquote>`);
      continue;
    }

    // UL
    if (/^[-*]\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      out.push('<ul>' + buf.map(b => `<li>${renderInline(b)}</li>`).join('') + '</ul>');
      continue;
    }

    // OL
    if (/^\d+\.\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      out.push('<ol>' + buf.map(b => `<li>${renderInline(b)}</li>`).join('') + '</ol>');
      continue;
    }

    // Paragraph
    const buf = [line];
    i++;
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^#{1,6}\s/.test(lines[i]) && !/^[-*]\s+/.test(lines[i]) && !/^\d+\.\s+/.test(lines[i]) && !/^>/.test(lines[i]) && !/^---+\s*$/.test(lines[i]) && !/^```/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    out.push(`<p>${renderInline(buf.join(' '))}</p>`);
  }

  return out.join('\n');
}

// ============================================================
// LEFT RAIL
// ============================================================
function renderRail() {
  const rail = $('#rail');
  const tree = DATA.tree || [];
  const collapsed = JSON.parse(localStorage.getItem('atlas.collapsed') || '{}');
  const html = tree.map(group => {
    const isCol = collapsed[group.folder] === true;
    if (group.locked) {
      return `<div class="rail-group${isCol ? ' collapsed' : ''}" data-folder="${group.folder}">
        <div class="label"><span>${esc(group.label)}</span><span class="count">${group.lockedCount}</span></div>
        <div class="items">
          <div class="rail-locked" data-action="unlock">unlock to view…</div>
        </div>
      </div>`;
    }
    const items = (group.pages || []).map(p =>
      `<a class="rail-item" data-slug="${p.slug}" href="#${encodeURIComponent(p.slug)}">${esc(p.title)}</a>`
    ).join('');
    return `<div class="rail-group${isCol ? ' collapsed' : ''}" data-folder="${group.folder}">
      <div class="label"><span>${esc(group.label)}</span><span class="count">${group.pages.length}</span></div>
      <div class="items">${items}</div>
    </div>`;
  }).join('');
  rail.innerHTML = html;

  rail.addEventListener('click', e => {
    const lbl = e.target.closest('.label');
    if (lbl) {
      const grp = lbl.parentElement;
      grp.classList.toggle('collapsed');
      const c = JSON.parse(localStorage.getItem('atlas.collapsed') || '{}');
      c[grp.dataset.folder] = grp.classList.contains('collapsed');
      localStorage.setItem('atlas.collapsed', JSON.stringify(c));
      return;
    }
    const lk = e.target.closest('[data-action="unlock"]');
    if (lk) { openUnlock(); return; }
    const a = e.target.closest('.rail-item');
    if (a) { e.preventDefault(); navigate(a.dataset.slug); }
  }, { once: false });
}

function highlightRail() {
  $$('.rail-item').forEach(el => el.classList.toggle('active', el.dataset.slug === state.slug));
  const active = $('.rail-item.active');
  if (active) active.scrollIntoView({ block: 'nearest' });
}

// ============================================================
// HOME / INDEX
// ============================================================
function renderHome() {
  const tree = DATA.tree || [];
  const totalPages = DATA.publicPageCount + DATA.lockedPageCount;
  const date = new Date(DATA.generated || Date.now());
  const stamp = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const sections = tree.map(group => {
    if (group.locked && !LOCKED_OPEN) {
      return `<section class="home-section" data-folder="${group.folder}">
        <div class="section-head">
          <div class="sh-label">${esc(group.label)}</div>
          <div class="sh-title">Encrypted archive</div>
          <div class="sh-count">${group.lockedCount} entries</div>
          <div class="sh-blurb">${esc(group.blurb || 'Raw sources held under encryption.')}</div>
        </div>
        <div class="locked-card" data-action="unlock">
          <div class="lc-glyph">◧</div>
          <div class="lc-text">
            <div class="lc-title">Unlock source material</div>
            <div class="lc-sub">${group.lockedCount} encrypted entries — brain dumps, training notes, internal references.</div>
          </div>
        </div>
      </section>`;
    }
    const pages = group.pages || [];
    if (!pages.length) return '';
    const cards = pages.map(p => {
      const num = state.pageNum.get(p.slug) || '';
      const numTxt = num ? String(num).padStart(3, '0') : '';
      return `<div class="card" data-slug="${p.slug}">
        <h4 class="card-title">${esc(p.title)}</h4>
        <p class="card-summary">${esc(p.summary || '')}</p>
        <div class="card-foot">${esc(group.label)}${numTxt ? ' · № ' + numTxt : ''}</div>
      </div>`;
    }).join('');
    return `<section class="home-section" data-folder="${group.folder}">
      <div class="section-head">
        <div class="sh-label">${esc(group.label)}</div>
        <div class="sh-title">${groupTitle(group)}</div>
        <div class="sh-count">${pages.length} ${pages.length === 1 ? 'entry' : 'entries'}</div>
        <div class="sh-blurb">${esc(group.blurb || '')}</div>
      </div>
      <div class="card-grid">${cards}</div>
    </section>`;
  }).join('');

  const html = `<div class="home">
    <div class="home-masthead">
      <h1 class="masthead-title">TA Brain</h1>
      <div class="masthead-issue">
        Atlas Edition · ${esc(stamp)}<br>
        <b>${totalPages}</b> pages · <b>${(DATA.tree || []).length}</b> sections · <b>${DATA.tagCount || 0}</b> tags
      </div>
    </div>
    <p class="lede"><span class="drop">A</span> working atlas of how Transamerica retirement operations actually run — written by the people doing the work, shaped page by page from voice notes, training notebooks, and the questions new hires keep asking.</p>
    ${sections}
  </div>`;
  $('#reader').innerHTML = html;

  $('#reader').onclick = e => {
    const c = e.target.closest('.card');
    if (c) { navigate(c.dataset.slug); return; }
    const lk = e.target.closest('[data-action="unlock"]');
    if (lk) { openUnlock(); return; }
  };

  renderNotesHome();
}

function groupTitle(group) {
  const map = {
    roles: 'Who does what',
    concepts: 'The vocabulary',
    processes: 'How work moves',
    entities: 'People, systems, teams',
    onboarding: 'First weeks',
    glossary: 'Acronyms, defined',
    sources: 'Raw material',
    departments: 'Cross-functional groups',
    analyses: 'Cross-cutting essays',
    _root: 'Entry points',
  };
  return map[group.folder] || group.label;
}

function renderNotesHome() {
  const tagList = (DATA.tags || []).slice(0, 20);
  const recent = Object.values(PAGES)
    .filter(p => p.updated)
    .sort((a, b) => (b.updated || '').localeCompare(a.updated || ''))
    .slice(0, 8);
  const orphans = Object.values(PAGES)
    .filter(p => (p.outgoing || []).length === 0 && (p.backlinks || []).length === 0 && p.folder !== '_root')
    .slice(0, 6);
  const html = `
    <div class="notes-block">
      <div class="head"><span>Recently updated</span><span class="num">${recent.length}</span></div>
      ${recent.length ? recent.map(p => `<a class="note-link" data-slug="${p.slug}"><span class="folder">${esc((FOLDER_LABELS[p.folder] || {}).label || p.folder)} · ${esc(p.updated)}</span>${esc(p.title)}</a>`).join('') : '<div class="empty">No timestamped pages yet.</div>'}
    </div>
    <div class="notes-block">
      <div class="head"><span>Tags</span><span class="num">${tagList.length}</span></div>
      ${tagList.length ? tagList.map(([t, c]) => `<span class="note-tag">${esc(t)} <span style="color:var(--ink-faint)">${c}</span></span>`).join('') : '<div class="empty">No tags yet.</div>'}
    </div>
    ${orphans.length ? `<div class="notes-block">
      <div class="head"><span>Unlinked pages</span><span class="num">${orphans.length}</span></div>
      ${orphans.map(p => `<a class="note-link" data-slug="${p.slug}"><span class="folder">${esc((FOLDER_LABELS[p.folder] || {}).label || p.folder)}</span>${esc(p.title)}</a>`).join('')}
    </div>` : ''}
  `;
  const notes = $('#notes');
  notes.innerHTML = html;
  notes.onclick = e => {
    const l = e.target.closest('.note-link');
    if (l) { navigate(l.dataset.slug); }
  };
}

// ============================================================
// PAGE RENDER
// ============================================================
function renderPage(slug) {
  const p = PAGES[slug];
  if (!p) {
    $('#reader').innerHTML = `<div class="reader-inner">
      <div class="page-kicker"><span class="pk-folder">No such page</span><span class="pk-rule"></span></div>
      <h1 class="page-title">${esc(slug)}</h1>
      <p class="prose">This page doesn't exist yet, or it's part of an encrypted archive. <a data-home>Return home</a>.</p>
    </div>`;
    $('#reader [data-home]').onclick = () => navigate(null);
    $('#notes').innerHTML = '';
    return;
  }

  const folderInfo = FOLDER_LABELS[p.folder] || { label: p.folder, blurb: '' };
  const pageNum = state.pageNum.get(p.slug);
  const pageOf = state.pageNum.size;

  const meta = [];
  if (p.created) meta.push(`<span>Created <b>${esc(p.created)}</b></span>`);
  if (p.updated) meta.push(`<span>Updated <b>${esc(p.updated)}</b></span>`);
  if (p.sources) meta.push(`<span>${(Array.isArray(p.sources) ? p.sources.length : 1)} source${(Array.isArray(p.sources) && p.sources.length !== 1) ? 's' : ''}</span>`);
  if (p.tags && p.tags.length) meta.push(`<span>${p.tags.length} tag${p.tags.length !== 1 ? 's' : ''}</span>`);

  // Split deck (first paragraph) from rest if it's clearly a single intro paragraph
  const lines = (p.body || '').replace(/\r\n/g, '\n').split('\n');
  let deck = '';
  let bodyStart = 0;
  // Skip leading blank lines
  while (bodyStart < lines.length && /^\s*$/.test(lines[bodyStart])) bodyStart++;
  if (bodyStart < lines.length && !/^[#>\-*\d`|]/.test(lines[bodyStart])) {
    const deckLines = [];
    while (bodyStart < lines.length && !/^\s*$/.test(lines[bodyStart]) && !/^[#>\-*\d`|]/.test(lines[bodyStart])) {
      deckLines.push(lines[bodyStart]);
      bodyStart++;
    }
    if (deckLines.length && deckLines.join(' ').length < 280) {
      deck = deckLines.join(' ').trim();
    } else {
      bodyStart = 0; // not really a deck — render normally
    }
  }
  const restMarkdown = bodyStart > 0 ? lines.slice(bodyStart).join('\n') : (p.body || '');

  const html = `<article class="reader-inner">
    <header>
      <div class="page-kicker">
        <span class="pk-folder">${esc(folderInfo.label || p.folder)}</span>
        <span class="pk-rule"></span>
        ${pageNum ? `<span class="pk-num">№ ${String(pageNum).padStart(3,'0')} / ${String(pageOf).padStart(3,'0')}</span>` : ''}
      </div>
      <h1 class="page-title">${esc(p.title)}</h1>
      ${deck ? `<p class="page-deck">${renderInline(deck)}</p>` : ''}
      <div class="page-meta">${meta.join('<span class="dot">·</span>') || '<span style="color:var(--ink-faint)">No metadata recorded.</span>'}</div>
    </header>
    <div class="prose" id="prose">${renderMarkdown(restMarkdown)}</div>
  </article>`;

  $('#reader').innerHTML = html;
  $('#reader').scrollTop = 0;

  // Wire wiki links + plain anchors
  $$('#prose a[data-wiki]').forEach(a => {
    a.style.cursor = 'pointer';
    a.addEventListener('click', e => {
      e.preventDefault();
      if (a.dataset.broken) { toast(`No page yet for "${a.dataset.wiki}"`); return; }
      navigate(a.dataset.wiki);
    });
  });

  renderNotesForPage(p);
}

function renderNotesForPage(p) {
  const bl = (p.backlinks || []).map(s => PAGES[s]).filter(Boolean);
  const og = (p.outgoing || []).map(s => PAGES[s]).filter(Boolean);
  const tags = (p.tags || []);
  const html = `
    ${bl.length ? `<div class="notes-block">
      <div class="head"><span>Backlinks</span><span class="num">${bl.length}</span></div>
      ${bl.map(q => `<a class="note-link" data-slug="${q.slug}"><span class="folder">${esc((FOLDER_LABELS[q.folder] || {}).label || q.folder)}</span>${esc(q.title)}</a>`).join('')}
    </div>` : ''}
    ${og.length ? `<div class="notes-block">
      <div class="head"><span>Links out</span><span class="num">${og.length}</span></div>
      ${og.map(q => `<a class="note-link" data-slug="${q.slug}"><span class="folder">${esc((FOLDER_LABELS[q.folder] || {}).label || q.folder)}</span>${esc(q.title)}</a>`).join('')}
    </div>` : ''}
    ${tags.length ? `<div class="notes-block">
      <div class="head"><span>Tags</span><span class="num">${tags.length}</span></div>
      ${tags.map(t => `<span class="note-tag">${esc(t)}</span>`).join('')}
    </div>` : ''}
    ${(!bl.length && !og.length && !tags.length) ? `<div class="notes-block"><div class="head"><span>Marginalia</span></div><div class="empty">Nothing linked to or from this page yet.</div></div>` : ''}
  `;
  const notes = $('#notes');
  notes.innerHTML = html;
  notes.onclick = e => {
    const l = e.target.closest('.note-link');
    if (l) navigate(l.dataset.slug);
  };
}

// ============================================================
// NAV / ROUTING
// ============================================================
function navigate(slug) {
  state.slug = slug || null;
  if (slug) {
    if (location.hash !== '#' + encodeURIComponent(slug)) location.hash = '#' + encodeURIComponent(slug);
    renderPage(slug);
  } else {
    history.replaceState(null, '', location.pathname + location.search);
    renderHome();
  }
  highlightRail();
}

window.addEventListener('hashchange', () => {
  const h = decodeURIComponent(location.hash.replace(/^#/, '')).toLowerCase();
  if (h && h !== state.slug) {
    if (PAGES[h]) { state.slug = h; renderPage(h); highlightRail(); }
    else { state.slug = null; renderHome(); highlightRail(); }
  } else if (!h && state.slug) {
    state.slug = null; renderHome(); highlightRail();
  }
});

// ============================================================
// TOPBAR STATS
// ============================================================
function renderStats() {
  const t = `<span><b>${DATA.publicPageCount}</b> pages</span><span><b>${DATA.lockedPageCount}</b> ${LOCKED_OPEN ? 'sources' : 'locked'}</span><span><b>${(DATA.graph || {nodes:[]}).nodes.length}</b> nodes</span>`;
  $('#tb-stat').innerHTML = t;
}

// ============================================================
// COMMAND PALETTE
// ============================================================
let paletteResults = [];
let paletteActive = 0;

function fuzzyMatch(query, text) {
  if (!query) return { score: 0, marks: [] };
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  // Exact substring
  const idx = t.indexOf(q);
  if (idx !== -1) return { score: 1000 - idx, marks: [[idx, idx + q.length]] };
  // Token-prefix
  const qWords = q.split(/\s+/).filter(Boolean);
  let allHit = true;
  const marks = [];
  for (const w of qWords) {
    const k = t.indexOf(w);
    if (k === -1) { allHit = false; break; }
    marks.push([k, k + w.length]);
  }
  if (allHit) return { score: 500 - marks[0][0], marks };
  // Subseq
  let ti = 0, hits = 0;
  for (let i = 0; i < q.length; i++) {
    const ch = q[i];
    while (ti < t.length && t[ti] !== ch) ti++;
    if (ti >= t.length) return null;
    ti++; hits++;
  }
  return { score: hits, marks: [] };
}

function buildPaletteIndex() {
  const out = [];
  for (const [slug, p] of Object.entries(PAGES)) {
    out.push({
      slug, title: p.title,
      folder: (FOLDER_LABELS[p.folder] || {}).label || p.folder,
      type: p.type,
      hay: `${p.title} ${slug} ${(p.tags || []).join(' ')}`,
    });
  }
  return out;
}
let paletteIndex = [];

function openPalette() {
  paletteIndex = buildPaletteIndex();
  $('#palette-back').classList.add('show');
  $('#palette-input').value = '';
  paletteActive = 0;
  setTimeout(() => $('#palette-input').focus(), 30);
  paletteRender('');
}
function closePalette() {
  $('#palette-back').classList.remove('show');
}

function paletteRender(query) {
  let results;
  if (!query) {
    results = paletteIndex
      .filter(r => state.pageNum.has(r.slug))
      .slice(0, 60)
      .map(r => ({ ...r, score: 0, marks: [] }));
  } else {
    results = [];
    for (const r of paletteIndex) {
      const m = fuzzyMatch(query, r.hay);
      if (m) results.push({ ...r, score: m.score, marks: m.marks });
    }
    results.sort((a, b) => b.score - a.score);
    results = results.slice(0, 40);
  }
  paletteResults = results;
  paletteActive = 0;

  const byFolder = {};
  for (const r of results) (byFolder[r.folder] = byFolder[r.folder] || []).push(r);

  if (!results.length) {
    $('#palette-results').innerHTML = `<div class="palette-empty">No matches for “${esc(query)}”.</div>`;
    return;
  }

  const html = Object.entries(byFolder).map(([folder, items]) =>
    `<div class="palette-group-label">${esc(folder)}</div>` +
    items.map((r, i) => {
      const idx = results.indexOf(r);
      let title = esc(r.title);
      if (r.marks && r.marks.length) {
        // Apply marks (simple highlight on title only if it matches there)
        const tlower = r.title.toLowerCase();
        const qlower = query.toLowerCase();
        const k = tlower.indexOf(qlower);
        if (k !== -1) {
          title = esc(r.title.slice(0, k)) + '<mark>' + esc(r.title.slice(k, k + qlower.length)) + '</mark>' + esc(r.title.slice(k + qlower.length));
        }
      }
      return `<div class="palette-item${idx === paletteActive ? ' active' : ''}" data-idx="${idx}" data-slug="${r.slug}">
        <span class="pi-folder">${esc(folder)}</span>
        <span class="pi-title">${title}</span>
        <span class="pi-hint">${esc(r.type || '')}</span>
      </div>`;
    }).join('')
  ).join('');

  $('#palette-results').innerHTML = html;
  $('#palette-results').onclick = e => {
    const item = e.target.closest('.palette-item');
    if (item) { closePalette(); navigate(item.dataset.slug); }
  };
}

function paletteMove(delta) {
  if (!paletteResults.length) return;
  paletteActive = (paletteActive + delta + paletteResults.length) % paletteResults.length;
  $$('.palette-item').forEach(el => el.classList.toggle('active', Number(el.dataset.idx) === paletteActive));
  const active = $('.palette-item.active');
  if (active) active.scrollIntoView({ block: 'nearest' });
}

// ============================================================
// SOURCE DECRYPT
// ============================================================
function b64toBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function decryptSources(password) {
  if (!ENCRYPTED) return null;
  const salt = b64toBytes(ENCRYPTED.salt);
  const ciphertext = b64toBytes(ENCRYPTED.ciphertext);
  const iterations = ENCRYPTED.iterations;

  const baseKey = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password),
    'PBKDF2', false, ['deriveBits']
  );
  const masterBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    baseKey, 512
  );
  const master = new Uint8Array(masterBits);

  const keystream = new Uint8Array(ciphertext.length);
  let offset = 0, counter = 0;
  const block = new Uint8Array(master.length + 4);
  block.set(master, 0);
  const view = new DataView(block.buffer);
  while (offset < ciphertext.length) {
    view.setUint32(master.length, counter, false);
    const h = new Uint8Array(await crypto.subtle.digest('SHA-256', block));
    const n = Math.min(h.length, ciphertext.length - offset);
    keystream.set(h.subarray(0, n), offset);
    offset += n;
    counter++;
  }

  const plaintext = new Uint8Array(ciphertext.length);
  for (let i = 0; i < ciphertext.length; i++) plaintext[i] = ciphertext[i] ^ keystream[i];
  const text = new TextDecoder().decode(plaintext);
  try {
    const obj = JSON.parse(text);
    if (obj.magic !== 'ATLAS-V1') return null;
    return obj.pages;
  } catch { return null; }
}

function mergeUnlocked(unlocked) {
  Object.entries(unlocked).forEach(([slug, p]) => { PAGES[slug] = p; });
  // Rebuild backlinks completely (touched pages might be sources)
  Object.values(PAGES).forEach(p => { p.backlinks = []; });
  Object.entries(PAGES).forEach(([slug, p]) => {
    (p.outgoing || []).forEach(t => {
      if (PAGES[t] && slug !== t && !PAGES[t].backlinks.includes(slug)) PAGES[t].backlinks.push(slug);
    });
  });
  // Inject locked pages back into tree
  const byFolder = {};
  Object.values(unlocked).forEach(p => {
    (byFolder[p.folder] = byFolder[p.folder] || []).push({ slug: p.slug, title: p.title, type: p.type, summary: p.summary || '' });
  });
  DATA.tree.forEach(g => {
    if (g.locked) {
      g.pages = (byFolder[g.folder] || []).sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
      g.locked = false;
    }
  });
  // Page numbering re-flow
  state.pageNum = new Map();
  let n = 1;
  for (const folder of FOLDER_ORDER) {
    const group = DATA.tree.find(g => g.folder === folder);
    if (!group) continue;
    for (const p of group.pages) state.pageNum.set(p.slug, n++);
  }
  LOCKED_OPEN = true;
}

function openUnlock() {
  if (!ENCRYPTED) { toast('No encrypted material in this build.'); return; }
  $('#unlock-back').classList.add('show');
  setTimeout(() => $('#unlock-input').focus(), 30);
}
function closeUnlock() { $('#unlock-back').classList.remove('show'); }

async function trySubmitUnlock() {
  const inp = $('#unlock-input');
  const err = $('#unlock-err');
  const btn = $('#unlock-submit');
  err.style.display = 'none';
  btn.disabled = true; btn.textContent = 'Unlocking…';
  try {
    const pages = await decryptSources(inp.value);
    if (!pages) {
      err.style.display = 'block';
      btn.disabled = false; btn.textContent = 'Unlock';
      inp.select();
      return;
    }
    mergeUnlocked(pages);
    renderRail();
    if (state.slug) renderPage(state.slug); else renderHome();
    renderStats();
    btn.disabled = false; btn.textContent = 'Unlock';
    closeUnlock();
    toast('Sources unlocked for this session.');
  } catch (e) {
    err.textContent = 'Unlock failed: ' + (e.message || e);
    err.style.display = 'block';
    btn.disabled = false; btn.textContent = 'Unlock';
  }
}

// ============================================================
// GRAPH
// ============================================================
const graph = {
  nodes: [], edges: [],
  width: 0, height: 0,
  scale: 1, tx: 0, ty: 0,
  dragging: null, panning: null,
  raf: null,
};

function initGraph() {
  const src = DATA.graph || { nodes: [], edges: [] };
  graph.nodes = src.nodes.map(n => ({
    ...n,
    x: Math.random() * 800 - 400,
    y: Math.random() * 600 - 300,
    vx: 0, vy: 0,
    r: 3 + Math.min(8, Math.sqrt(n.degree || 0) * 1.6),
  }));
  graph.edges = src.edges.map(e => ({
    s: graph.nodes.find(n => n.id === e.source),
    t: graph.nodes.find(n => n.id === e.target),
  })).filter(e => e.s && e.t);

  const cv = $('#graph-canvas');
  graph.ctx = cv.getContext('2d');
  resizeGraphCanvas();
  window.addEventListener('resize', resizeGraphCanvas);

  // Pan/zoom
  cv.addEventListener('wheel', e => {
    e.preventDefault();
    const z = Math.exp(-e.deltaY * 0.001);
    const rect = cv.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const wx = (mx - graph.tx) / graph.scale;
    const wy = (my - graph.ty) / graph.scale;
    graph.scale = Math.max(0.2, Math.min(4, graph.scale * z));
    graph.tx = mx - wx * graph.scale;
    graph.ty = my - wy * graph.scale;
    drawGraph();
  }, { passive: false });

  cv.addEventListener('mousedown', e => {
    const { wx, wy } = screenToWorld(e);
    let hit = null;
    for (const n of graph.nodes) {
      const dx = n.x - wx, dy = n.y - wy;
      if (dx * dx + dy * dy < (n.r + 6) ** 2) { hit = n; break; }
    }
    if (hit) graph.dragging = { node: hit, startX: e.clientX, startY: e.clientY };
    else graph.panning = { x: e.clientX - graph.tx, y: e.clientY - graph.ty };
  });
  cv.addEventListener('mousemove', e => {
    const { wx, wy } = screenToWorld(e);
    let hov = null;
    for (const n of graph.nodes) {
      const dx = n.x - wx, dy = n.y - wy;
      if (dx * dx + dy * dy < (n.r + 6) ** 2) { hov = n; break; }
    }
    cv.style.cursor = hov ? 'pointer' : (graph.panning || graph.dragging ? 'grabbing' : 'grab');
    if (graph.dragging) {
      graph.dragging.node.x = wx;
      graph.dragging.node.y = wy;
      graph.dragging.node.vx = 0;
      graph.dragging.node.vy = 0;
      drawGraph();
    } else if (graph.panning) {
      graph.tx = e.clientX - graph.panning.x;
      graph.ty = e.clientY - graph.panning.y;
      drawGraph();
    }
  });
  cv.addEventListener('mouseup', e => {
    if (graph.dragging) {
      const moved = Math.hypot(e.clientX - graph.dragging.startX, e.clientY - graph.dragging.startY);
      if (moved < 4) {
        const slug = graph.dragging.node.id;
        closeGraph();
        navigate(slug);
      }
    }
    graph.dragging = null;
    graph.panning = null;
  });
  cv.addEventListener('mouseleave', () => { graph.dragging = null; graph.panning = null; });
}

function screenToWorld(e) {
  const rect = $('#graph-canvas').getBoundingClientRect();
  const mx = e.clientX - rect.left, my = e.clientY - rect.top;
  return { wx: (mx - graph.tx) / graph.scale, wy: (my - graph.ty) / graph.scale };
}

function resizeGraphCanvas() {
  const cv = $('#graph-canvas');
  const dpr = window.devicePixelRatio || 1;
  const rect = cv.getBoundingClientRect();
  cv.width = rect.width * dpr;
  cv.height = rect.height * dpr;
  graph.width = rect.width;
  graph.height = rect.height;
  graph.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawGraph();
}

function tickGraph() {
  // Lightweight force sim
  const NODES = graph.nodes;
  const k = 0.04;
  const repel = 4400;
  for (let i = 0; i < NODES.length; i++) {
    const a = NODES[i];
    a.vx *= 0.78; a.vy *= 0.78;
    for (let j = i + 1; j < NODES.length; j++) {
      const b = NODES[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      let d2 = dx * dx + dy * dy;
      if (d2 < 1) d2 = 1;
      const f = repel / d2;
      const dist = Math.sqrt(d2);
      const fx = (dx / dist) * f, fy = (dy / dist) * f;
      a.vx += fx; a.vy += fy;
      b.vx -= fx; b.vy -= fy;
    }
    // Centering force
    a.vx -= a.x * 0.002;
    a.vy -= a.y * 0.002;
  }
  for (const e of graph.edges) {
    const dx = e.t.x - e.s.x, dy = e.t.y - e.s.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1;
    const want = 95;
    const fx = (dx / d) * (d - want) * k;
    const fy = (dy / d) * (d - want) * k;
    e.s.vx += fx; e.s.vy += fy;
    e.t.vx -= fx; e.t.vy -= fy;
  }
  for (const n of NODES) {
    if (graph.dragging && graph.dragging.node === n) continue;
    n.x += n.vx; n.y += n.vy;
  }
}

function drawGraph() {
  const ctx = graph.ctx; if (!ctx) return;
  ctx.clearRect(0, 0, graph.width, graph.height);
  ctx.save();
  ctx.translate(graph.tx, graph.ty);
  ctx.scale(graph.scale, graph.scale);

  const styles = getComputedStyle(document.documentElement);
  const ruleC = styles.getPropertyValue('--rule-strong').trim() || 'rgba(0,0,0,0.2)';
  const inkC = styles.getPropertyValue('--ink').trim() || '#1a1a17';
  const oxideC = styles.getPropertyValue('--oxide').trim() || '#9c3a2c';

  ctx.lineWidth = 1 / graph.scale;
  ctx.strokeStyle = ruleC;
  for (const e of graph.edges) {
    ctx.beginPath();
    ctx.moveTo(e.s.x, e.s.y); ctx.lineTo(e.t.x, e.t.y);
    ctx.stroke();
  }

  for (const n of graph.nodes) {
    const color = (n.id === state.slug) ? oxideC : (FOLDER_COLORS[n.folder] || inkC);
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    if (n.id === state.slug) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + 4 / graph.scale, 0, Math.PI * 2);
      ctx.strokeStyle = oxideC;
      ctx.lineWidth = 1.5 / graph.scale;
      ctx.stroke();
    }
  }

  if (graph.scale > 0.7) {
    ctx.fillStyle = inkC;
    ctx.font = `${12 / graph.scale}px ${styles.getPropertyValue('--sans')}`;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    for (const n of graph.nodes) {
      const isActive = (n.id === state.slug);
      if (graph.scale < 1.2 && !isActive && n.degree < 3) continue;
      ctx.globalAlpha = isActive ? 1 : Math.min(1, graph.scale * 0.6);
      ctx.fillText(n.title || n.id, n.x + n.r + 4 / graph.scale, n.y);
    }
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

function openGraph() {
  if (!graph.ctx) initGraph();
  $('#graph-back').classList.add('show');
  resizeGraphCanvas();
  // Center
  graph.scale = 0.8;
  graph.tx = graph.width / 2;
  graph.ty = graph.height / 2;
  renderGraphLegend();
  // Kick the sim
  let iter = 0;
  const step = () => {
    if (!$('#graph-back').classList.contains('show')) return;
    tickGraph();
    drawGraph();
    iter++;
    if (iter < 600) graph.raf = requestAnimationFrame(step);
  };
  step();
  $('#graph-hud').innerHTML = `<b>${graph.nodes.length}</b> nodes · <b>${graph.edges.length}</b> edges${state.slug && PAGES[state.slug] ? ' · viewing <b>' + esc(PAGES[state.slug].title) + '</b>' : ''}`;
}
function closeGraph() {
  $('#graph-back').classList.remove('show');
  if (graph.raf) cancelAnimationFrame(graph.raf);
}

function renderGraphLegend() {
  const folders = [...new Set(graph.nodes.map(n => n.folder))];
  const html = folders.map(f => {
    const c = FOLDER_COLORS[f] || '#444';
    const label = (FOLDER_LABELS[f] || {}).label || f;
    return `<div class="row"><span class="swatch" style="background:${c}"></span>${esc(label)}</div>`;
  }).join('');
  $('#graph-legend').innerHTML = html;
}

// ============================================================
// THEME
// ============================================================
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem('atlas.theme', t);
  if (graph.ctx) drawGraph();
}
function toggleTheme() {
  const cur = document.documentElement.dataset.theme || 'day';
  setTheme(cur === 'day' ? 'night' : 'day');
}

// ============================================================
// WIRES + BOOT
// ============================================================
function wireGlobal() {
  $('#brand').addEventListener('click', () => navigate(null));
  $('#btn-palette').addEventListener('click', openPalette);
  $('#btn-graph').addEventListener('click', openGraph);
  $('#btn-theme').addEventListener('click', toggleTheme);
  $('#btn-rail').addEventListener('click', () => {
    $('#app').classList.toggle('rail-collapsed');
  });

  $('#graph-close').addEventListener('click', closeGraph);
  $('#graph-reset').addEventListener('click', () => {
    graph.scale = 0.8; graph.tx = graph.width / 2; graph.ty = graph.height / 2;
    for (const n of graph.nodes) { n.x = Math.random() * 800 - 400; n.y = Math.random() * 600 - 300; n.vx = 0; n.vy = 0; }
    drawGraph();
    let iter = 0; const step = () => { if (!$('#graph-back').classList.contains('show')) return; tickGraph(); drawGraph(); if (iter++ < 400) requestAnimationFrame(step); };
    step();
  });

  $('#palette-input').addEventListener('input', e => paletteRender(e.target.value.trim()));

  $('#unlock-cancel').addEventListener('click', closeUnlock);
  $('#unlock-submit').addEventListener('click', trySubmitUnlock);
  $('#unlock-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); trySubmitUnlock(); }
    if (e.key === 'Escape') closeUnlock();
  });
  $('#unlock-back').addEventListener('click', e => { if (e.target === $('#unlock-back')) closeUnlock(); });
  $('#palette-back').addEventListener('click', e => { if (e.target === $('#palette-back')) closePalette(); });

  window.addEventListener('keydown', e => {
    const meta = e.metaKey || e.ctrlKey;
    if (meta && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if ($('#palette-back').classList.contains('show')) closePalette(); else openPalette();
      return;
    }
    if (meta && e.key === '\\') {
      e.preventDefault();
      $('#app').classList.toggle('rail-collapsed');
      return;
    }
    if (meta && e.key.toLowerCase() === 'g') {
      e.preventDefault();
      if ($('#graph-back').classList.contains('show')) closeGraph(); else openGraph();
      return;
    }
    if (e.key === '/' && !isTyping(e.target)) {
      e.preventDefault();
      openPalette();
      return;
    }
    if (e.key === 'Escape') {
      if ($('#palette-back').classList.contains('show')) { closePalette(); return; }
      if ($('#graph-back').classList.contains('show')) { closeGraph(); return; }
      if ($('#unlock-back').classList.contains('show')) { closeUnlock(); return; }
    }
    if ($('#palette-back').classList.contains('show')) {
      if (e.key === 'ArrowDown') { e.preventDefault(); paletteMove(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); paletteMove(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        const r = paletteResults[paletteActive];
        if (r) { closePalette(); navigate(r.slug); }
      }
    }
  });
}

function isTyping(el) {
  return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
}

function boot() {
  setTheme(localStorage.getItem('atlas.theme') || 'day');
  renderRail();
  renderStats();
  wireGlobal();
  const h = decodeURIComponent(location.hash.replace(/^#/, '')).toLowerCase();
  if (h && PAGES[h]) { state.slug = h; renderPage(h); highlightRail(); }
  else renderHome();
}

document.addEventListener('DOMContentLoaded', boot);
