# Concept Page Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add inline, auto-playing, looping 16:9 animations to concept pages in `wiki.html`, inserted between the opening description and first `##` heading.

**Architecture:** All changes are confined to a single file (`wiki.html`). The existing `Stage`/`Sprite`/`useTime` React runtime already present in the file is extended (loop prop + full Easing set). Each animation set is embedded as an IIFE-wrapped `<script type="text/babel">` block that exposes one root component to `window.*`. A `CONCEPT_ANIMS` registry maps concept page slugs to root components. The `render()` function mounts/unmounts React roots into a `.cp-anim-wrap` div placed before the first `h2`/`h3` in the content column.

**Tech Stack:** React 18 UMD, Babel Standalone 7.29, inline JSX babel scripts, Python 3 for file injection scripts.

---

## File Structure

Single file modified throughout:

**`C:\Users\mabac\OneDrive\Desktop\TA Brain\wiki.html`**

| Section | Lines (approx) | Changes |
|---------|---------------|---------|
| CSS `<style>` block | ~492 | Add `.cp-anim-wrap` rule |
| Animation `<script type="text/babel">` | 1139–1144 | Replace partial `Easing` with full set |
| Animation `<script type="text/babel">` | 1170 | Add `loop` prop to `Stage` signature |
| Animation `<script type="text/babel">` | 1197–1205 | Add loop branch to RAF time update |
| After loader `</script>` | ~1452 | Add new `<script type="text/babel">` blocks (one per animation set) |
| Before `navigate()` | ~2022 | Add `CONCEPT_ANIMS` registry constant |
| Inside `render()` | ~2057–2065 | Add React root mount/unmount logic |

---

## Task 1: Extend the animation runtime (Easing + Stage loop)

**Files:**
- Modify: `C:\Users\mabac\OneDrive\Desktop\TA Brain\wiki.html` lines 1139–1211

- [ ] **Step 1: Replace the partial Easing object with the full set**

  The current `Easing` at lines 1139–1144 has only 3 functions. Replace with the full set so animation scenes can use any easing variant:

  Find this exact block (lines 1139–1144):
  ```js
  // ── easing ────────────────────────────────────────────────────────────────────
  const Easing = {
    easeOutCubic:   (t) => (--t)*t*t+1,
    easeInCubic:    (t) => t*t*t,
    easeInOutCubic: (t) => t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  };
  const clamp = (v,mn,mx) => Math.max(mn, Math.min(mx, v));
  ```

  Replace with:
  ```js
  // ── easing ────────────────────────────────────────────────────────────────────
  const Easing = {
    linear:          (t) => t,
    easeInQuad:      (t) => t * t,
    easeOutQuad:     (t) => t * (2 - t),
    easeInOutQuad:   (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    easeInCubic:     (t) => t * t * t,
    easeOutCubic:    (t) => (--t) * t * t + 1,
    easeInOutCubic:  (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
    easeInQuart:     (t) => t * t * t * t,
    easeOutQuart:    (t) => 1 - (--t) * t * t * t,
    easeInOutQuart:  (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t),
    easeInExpo:      (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
    easeOutExpo:     (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    easeInOutExpo:   (t) => { if (t === 0) return 0; if (t === 1) return 1; if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10); return 1 - 0.5 * Math.pow(2, -20 * t + 10); },
    easeInSine:      (t) => 1 - Math.cos((t * Math.PI) / 2),
    easeOutSine:     (t) => Math.sin((t * Math.PI) / 2),
    easeInOutSine:   (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    easeOutBack:     (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    easeInBack:      (t) => { const c1 = 1.70158, c3 = c1 + 1; return c3 * t * t * t - c1 * t * t; },
    easeInOutBack:   (t) => { const c1 = 1.70158, c2 = c1 * 1.525; return t < 0.5 ? (Math.pow(2*t,2)*((c2+1)*2*t-c2))/2 : (Math.pow(2*t-2,2)*((c2+1)*(t*2-2)+c2)+2)/2; },
    easeOutElastic:  (t) => { const c4 = (2 * Math.PI) / 3; if (t === 0) return 0; if (t === 1) return 1; return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1; },
  };
  const clamp = (v, mn, mx) => Math.max(mn, Math.min(mx, v));
  ```

- [ ] **Step 2: Add `interpolate` and `animate` helpers after `clamp`**

  Find (line 1145):
  ```js
  const clamp = (v,mn,mx) => Math.max(mn, Math.min(mx, v));
  
  // ── timeline context
  ```

  Wait — the existing file has `clamp` immediately followed by timeline context. Insert BETWEEN them:

  Find this exact string:
  ```
  const clamp = (v,mn,mx) => Math.max(mn, Math.min(mx, v));

  // ── timeline context ──────────────────────────────────────────────────────────
  ```

  Replace with:
  ```
  const clamp = (v, mn, mx) => Math.max(mn, Math.min(mx, v));

  function interpolate(input, output, ease = Easing.linear) {
    return (t) => {
      if (t <= input[0]) return output[0];
      if (t >= input[input.length - 1]) return output[output.length - 1];
      for (let i = 0; i < input.length - 1; i++) {
        if (t >= input[i] && t <= input[i + 1]) {
          const span = input[i + 1] - input[i];
          const local = span === 0 ? 0 : (t - input[i]) / span;
          const easeFn = Array.isArray(ease) ? (ease[i] || Easing.linear) : ease;
          return output[i] + (output[i + 1] - output[i]) * easeFn(local);
        }
      }
      return output[output.length - 1];
    };
  }

  function animate({ from = 0, to = 1, start = 0, end = 1, ease = Easing.easeInOutCubic }) {
    return (t) => {
      if (t <= start) return from;
      if (t >= end) return to;
      const local = (t - start) / (end - start);
      return from + (to - from) * ease(local);
    };
  }

  // ── timeline context ──────────────────────────────────────────────────────────
  ```

- [ ] **Step 3: Add `loop` prop to `Stage` function signature**

  Find (line 1170):
  ```js
  function Stage({ width=1280, height=720, duration=10, background='#08090C', autoplay=true, onComplete, children }) {
  ```

  Replace with:
  ```js
  function Stage({ width=1280, height=720, duration=10, background='#08090C', autoplay=true, loop=false, onComplete, children }) {
  ```

- [ ] **Step 4: Add loop branch in the RAF time-update callback**

  Find (lines 1197–1205):
  ```js
        setTime(t => {
          const next = t + dt;
          if (next >= duration) {
            setPlaying(false);
            if (!doneRef.current) { doneRef.current = true; if (onComplete) setTimeout(onComplete, 80); }
            return duration;
          }
          return next;
        });
  ```

  Replace with:
  ```js
        setTime(t => {
          const next = t + dt;
          if (next >= duration) {
            if (loop) { lastTsRef.current = null; return 0; }
            setPlaying(false);
            if (!doneRef.current) { doneRef.current = true; if (onComplete) setTimeout(onComplete, 80); }
            return duration;
          }
          return next;
        });
  ```

- [ ] **Step 5: Verify the loader animation still works**

  Open `C:\Users\mabac\OneDrive\Desktop\TA Brain\wiki.html` in a browser. The TA Brain loading animation should play automatically on load (five scenes over ~9.5 seconds) and then dismiss. If it's broken, the Stage or Sprite change introduced a regression — re-read lines 1128–1220 and compare against original.

- [ ] **Step 6: Commit**

  ```bash
  cd "C:\Users\mabac\OneDrive\Desktop\TA Brain"
  git add wiki.html
  git commit -m "feat(wiki): extend animation runtime — full Easing, interpolate/animate helpers, Stage loop prop"
  ```

---

## Task 2: Add `.cp-anim-wrap` CSS

**Files:**
- Modify: `C:\Users\mabac\OneDrive\Desktop\TA Brain\wiki.html` CSS block (~line 492)

- [ ] **Step 1: Find the insertion point in the CSS block**

  Find this comment in the CSS (around line 492):
  ```css
  article.page hr { border: 0; border-top: 1px solid var(--border); margin: 22px 0; }
  article.page ul, article.page ol { padding-left: 22px; }
  ```

  Insert the following AFTER those two lines:
  ```css
  .cp-anim-wrap {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(162, 119, 255, 0.2);
    margin: 0 0 24px 0;
    position: relative;
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  cd "C:\Users\mabac\OneDrive\Desktop\TA Brain"
  git add wiki.html
  git commit -m "feat(wiki): add .cp-anim-wrap CSS for concept page animations"
  ```

---

## Task 3: Add `CONCEPT_ANIMS` registry and wire `render()` 

**Files:**
- Modify: `C:\Users\mabac\OneDrive\Desktop\TA Brain\wiki.html` (~lines 2022, 2057–2066)

- [ ] **Step 1: Insert `CONCEPT_ANIMS` before `navigate()`**

  Find (around line 2022):
  ```js
  // ============================================================
  // NAVIGATE + RENDER
  // ============================================================
  function navigate(slug, push = true) {
  ```

  Replace with:
  ```js
  // ============================================================
  // CONCEPT ANIMATION REGISTRY
  // ============================================================
  const CONCEPT_ANIMS = {
    'balance-import-cash':    { component: 'BalanceImportCashScene',    duration: 25 },
    'balance-import-mapping': { component: 'BalanceImportMappingScene', duration: 33 },
    'balance-import-tik':     { component: 'BalanceImportTikScene',     duration: 38 },
    'loan-setup-overview':    { component: 'LoanSetupScene',            duration: 31 },
    // 'data-pipeline': confirm slug before enabling
  };

  // ============================================================
  // NAVIGATE + RENDER
  // ============================================================
  function navigate(slug, push = true) {
  ```

- [ ] **Step 2: Replace the existing animation injection block in `render()`**

  Find this exact block (lines 2057–2065):
  ```js
        const existingAnim = document.getElementById('page-animation-panel');
        if (existingAnim) existingAnim.remove();
        if (p.animationPath) {
          const animPanel = document.createElement('div');
          animPanel.id = 'page-animation-panel';
          animPanel.style.cssText = 'margin:0 0 24px 0;border-radius:10px;overflow:hidden;border:1px solid rgba(158,206,106,0.25);background:rgba(158,206,106,0.04);';
          animPanel.innerHTML = `<div style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(158,206,106,0.15);"><span style="font-family:var(--mono);font-size:11px;letter-spacing:0.1em;color:#9ece6a;text-transform:uppercase;">Process Animation</span><a href="${p.animationPath}" target="_blank" style="font-family:var(--mono);font-size:10px;color:#9ece6a;text-decoration:none;opacity:0.7;letter-spacing:0.08em;">Open fullscreen ↗</a></div><iframe src="${p.animationPath}" style="width:100%;aspect-ratio:16/9;height:auto;min-height:520px;border:none;display:block;background:#08090C;" loading="lazy" allow="autoplay"></iframe>`;
          content.insertBefore(animPanel, content.firstChild);
        }
  ```

  Replace with:
  ```js
        const existingAnim = document.getElementById('page-animation-panel');
        if (existingAnim) existingAnim.remove();
        if (p.animationPath) {
          const animPanel = document.createElement('div');
          animPanel.id = 'page-animation-panel';
          animPanel.style.cssText = 'margin:0 0 24px 0;border-radius:10px;overflow:hidden;border:1px solid rgba(158,206,106,0.25);background:rgba(158,206,106,0.04);';
          animPanel.innerHTML = `<div style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(158,206,106,0.15);"><span style="font-family:var(--mono);font-size:11px;letter-spacing:0.1em;color:#9ece6a;text-transform:uppercase;">Process Animation</span><a href="${p.animationPath}" target="_blank" style="font-family:var(--mono);font-size:10px;color:#9ece6a;text-decoration:none;opacity:0.7;letter-spacing:0.08em;">Open fullscreen ↗</a></div><iframe src="${p.animationPath}" style="width:100%;aspect-ratio:16/9;height:auto;min-height:520px;border:none;display:block;background:#08090C;" loading="lazy" allow="autoplay"></iframe>`;
          content.insertBefore(animPanel, content.firstChild);
        }

        // Unmount any previous concept animation React root
        if (window.__wikiAnimRoot) { window.__wikiAnimRoot.unmount(); window.__wikiAnimRoot = null; }
        const existingInlineAnim = document.getElementById('cp-anim-panel');
        if (existingInlineAnim) existingInlineAnim.remove();

        const animCfg = CONCEPT_ANIMS[p.slug];
        if (animCfg) {
          const AnimComp = window[animCfg.component];
          if (AnimComp) {
            const panel = document.createElement('div');
            panel.id = 'cp-anim-panel';
            panel.className = 'cp-anim-wrap';
            const firstH2 = content.querySelector('h2, h3');
            if (firstH2) content.insertBefore(panel, firstH2);
            else content.appendChild(panel);
            window.__wikiAnimRoot = ReactDOM.createRoot(panel);
            window.__wikiAnimRoot.render(React.createElement(AnimComp));
          }
        }
  ```

- [ ] **Step 3: Verify no regressions**

  Open wiki.html in a browser. Navigate to a concept page that has no entry in CONCEPT_ANIMS (e.g. `audit-pack`). It should render exactly as before — no animation block. Navigate to a process page — no animation block. Navigate to `balance-import-cash` — no animation yet (component not defined), but the page should render without JS errors. Check the browser console for errors.

- [ ] **Step 4: Commit**

  ```bash
  cd "C:\Users\mabac\OneDrive\Desktop\TA Brain"
  git add wiki.html
  git commit -m "feat(wiki): add CONCEPT_ANIMS registry and render() animation mount/unmount"
  ```

---

## Task 4: Wire `balance-import-cash` animation (25s)

**Animation folder:** `C:\Users\mabac\OneDrive\Desktop\TA Brain\animations\balance-import-cash\`
**Scenes files:** `scenes.jsx`, `scenes2.jsx`, `scenes3.jsx`
**Sprite layout:** Scene1 (0–4.5), Scene2 (4.5–9), Scene3 (9–12.5), Scene4 (12.5–19), Scene5 (19–25)
**Slug:** `balance-import-cash`

- [ ] **Step 1: Run the injection Python script**

  Save the following as a temp file `inject_bic.py` in the TA Brain folder and run it:

  ```python
  import re, pathlib

  BASE = pathlib.Path(r"C:\Users\mabac\OneDrive\Desktop\TA Brain")
  wiki = BASE / "wiki.html"
  html = wiki.read_text(encoding="utf-8")

  # Read all three scenes files
  def read_scene(name):
      content = (BASE / "animations" / "balance-import-cash" / name).read_text(encoding="utf-8")
      # Remove the final Object.assign(window, {...}) export line(s) so only the IIFE root export survives
      content = re.sub(r'\nObject\.assign\(window,\s*\{[^}]+\}\s*\);?\s*$', '', content, flags=re.DOTALL)
      return content

  s1 = read_scene("scenes.jsx")
  s2 = read_scene("scenes2.jsx")
  s3 = read_scene("scenes3.jsx")

  new_block = f'''
  <script type="text/babel">
  (function() {{
  // ── balance-import-cash scenes ──────────────────────────────────────────────
  {s1}

  {s2}

  {s3}

  // ── root wrapper ────────────────────────────────────────────────────────────
  function BalanceImportCashScene() {{
    return (
      <Stage width={{1920}} height={{1080}} duration={{25}} loop={{true}} background="#08090C" autoplay={{true}}>
        <Sprite start={{0}} end={{4.5}}><Scene1 /></Sprite>
        <Sprite start={{4.5}} end={{9}}><Scene2 /></Sprite>
        <Sprite start={{9}} end={{12.5}}><Scene3 /></Sprite>
        <Sprite start={{12.5}} end={{19}}><Scene4 /></Sprite>
        <Sprite start={{19}} end={{25}}><Scene5 /></Sprite>
      </Stage>
    );
  }}
  window.BalanceImportCashScene = BalanceImportCashScene;
  }})();
  </script>'''

  marker = 'ReactDOM.createRoot(document.getElementById(\'loader-root\')).render(<LoaderApp />);\n</script>'
  assert marker in html, f"Marker not found — search wiki.html for the ReactDOM.createRoot(loader-root) line"
  html = html.replace(marker, marker + new_block, 1)
  wiki.write_text(html, encoding="utf-8")
  print("Done — BalanceImportCashScene injected")
  ```

  Run: `python inject_bic.py`
  Expected: `Done — BalanceImportCashScene injected`

- [ ] **Step 2: Verify in browser**

  Open wiki.html → navigate to the `balance-import-cash` concept page. A 16:9 animation block should appear between the opening description and the first `##` heading. The animation should auto-play and loop. Check the browser console — no JS errors.

  If the animation is blank/white: open browser DevTools → Console. A "Scene1 is not defined" style error means a scene name conflict with the loader's Scene1–5. Go to Step 3.

- [ ] **Step 3 (if naming conflict): Rename conflicting scene names**

  If Step 2 shows a conflict (the loader's Scene1–5 are global and clash with balance-import-cash's scenes), run the following to prefix the scene names inside the IIFE:

  In `wiki.html`, find the `BalanceImportCashScene` script block just injected. Inside the IIFE only (between `(function() {` and `})()`), do a find-replace:
  - `Scene1` → `BICScene1`
  - `Scene2` → `BICScene2`
  - `Scene3` → `BICScene3`
  - `Scene4` → `BICScene4`
  - `Scene5` → `BICScene5`

  Also update the `<Sprite>` children in the wrapper component to use the new names. Then re-verify in browser.

- [ ] **Step 4: Commit**

  ```bash
  cd "C:\Users\mabac\OneDrive\Desktop\TA Brain"
  git add wiki.html
  git commit -m "feat(wiki): wire balance-import-cash animation (25s, loops)"
  ```

---

## Task 5: Wire `balance-import-mapping` animation (33s)

**Animation folder:** `C:\Users\mabac\OneDrive\Desktop\TA Brain\animations\balance-import-mapping\`
**Scenes files:** `fm_shared.jsx`, `fm_scenes_a.jsx`, `fm_scenes_b.jsx`
**Sprite layout:** FMScene1 (0–5), FMScene2 (5–11), FMScene3 (11–16), FMScene4 (16–20), FMScene5 (20–27.5), FMScene6 (27.5–33)
**Slug:** `balance-import-mapping`

- [ ] **Step 1: Run the injection Python script**

  Save as `inject_bim.py` and run:

  ```python
  import re, pathlib

  BASE = pathlib.Path(r"C:\Users\mabac\OneDrive\Desktop\TA Brain")
  wiki = BASE / "wiki.html"
  html = wiki.read_text(encoding="utf-8")

  def read_scene(folder, name):
      content = (BASE / "animations" / folder / name).read_text(encoding="utf-8")
      content = re.sub(r'\nObject\.assign\(window,\s*\{[^}]+\}\s*\);?\s*$', '', content, flags=re.DOTALL)
      return content

  shared = read_scene("balance-import-mapping", "fm_shared.jsx")
  sa = read_scene("balance-import-mapping", "fm_scenes_a.jsx")
  sb = read_scene("balance-import-mapping", "fm_scenes_b.jsx")

  new_block = f'''
  <script type="text/babel">
  (function() {{
  // ── balance-import-mapping shared + scenes ──────────────────────────────────
  {shared}

  {sa}

  {sb}

  // ── root wrapper ────────────────────────────────────────────────────────────
  function BalanceImportMappingScene() {{
    return (
      <Stage width={{1920}} height={{1080}} duration={{33}} loop={{true}} background="#08090C" autoplay={{true}}>
        <Sprite start={{0}} end={{5}}><FMScene1 /></Sprite>
        <Sprite start={{5}} end={{11}}><FMScene2 /></Sprite>
        <Sprite start={{11}} end={{16}}><FMScene3 /></Sprite>
        <Sprite start={{16}} end={{20}}><FMScene4 /></Sprite>
        <Sprite start={{20}} end={{27.5}}><FMScene5 /></Sprite>
        <Sprite start={{27.5}} end={{33}}><FMScene6 /></Sprite>
      </Stage>
    );
  }}
  window.BalanceImportMappingScene = BalanceImportMappingScene;
  }})();
  </script>'''

  # Insert after the balance-import-cash block (or after the loader block if BIC wasn't added yet)
  # Marker: the last </script> before <div class="app">
  marker = 'window.BalanceImportCashScene = BalanceImportCashScene;\n}})();\n</script>'
  if marker not in html:
      # Fall back to loader marker
      marker = 'ReactDOM.createRoot(document.getElementById(\'loader-root\')).render(<LoaderApp />);\n</script>'
  assert marker in html, "Insertion marker not found"
  html = html.replace(marker, marker + new_block, 1)
  wiki.write_text(html, encoding="utf-8")
  print("Done — BalanceImportMappingScene injected")
  ```

  Run: `python inject_bim.py`

- [ ] **Step 2: Verify in browser**

  Navigate to `balance-import-mapping` concept page. Animation should play and loop. Check console for errors.

- [ ] **Step 3: Commit**

  ```bash
  cd "C:\Users\mabac\OneDrive\Desktop\TA Brain"
  git add wiki.html
  git commit -m "feat(wiki): wire balance-import-mapping animation (33s, loops)"
  ```

---

## Task 6: Wire `balance-import-tik` animation (38s)

**Animation folder:** `C:\Users\mabac\OneDrive\Desktop\TA Brain\animations\balance-import-tik\`
**Scenes files:** `fm_shared.jsx`, `tik_scenes_a.jsx`, `tik_scenes_b.jsx`
**Sprite layout:** TIKScene1 (0–5), TIKScene2 (5–9), TIKScene3 (9–15), TIKScene4 (15–19), TIKScene5 (19–22.5), TIKScene6 (22.5–30.5), TIKScene7 (30.5–38)
**Slug:** `balance-import-tik`

- [ ] **Step 1: Run the injection Python script**

  Save as `inject_bit.py` and run:

  ```python
  import re, pathlib

  BASE = pathlib.Path(r"C:\Users\mabac\OneDrive\Desktop\TA Brain")
  wiki = BASE / "wiki.html"
  html = wiki.read_text(encoding="utf-8")

  def read_scene(folder, name):
      content = (BASE / "animations" / folder / name).read_text(encoding="utf-8")
      content = re.sub(r'\nObject\.assign\(window,\s*\{[^}]+\}\s*\);?\s*$', '', content, flags=re.DOTALL)
      return content

  shared = read_scene("balance-import-tik", "fm_shared.jsx")
  sa = read_scene("balance-import-tik", "tik_scenes_a.jsx")
  sb = read_scene("balance-import-tik", "tik_scenes_b.jsx")

  new_block = f'''
  <script type="text/babel">
  (function() {{
  // ── balance-import-tik shared + scenes ──────────────────────────────────────
  {shared}

  {sa}

  {sb}

  // ── root wrapper ────────────────────────────────────────────────────────────
  function BalanceImportTikScene() {{
    return (
      <Stage width={{1920}} height={{1080}} duration={{38}} loop={{true}} background="#08090C" autoplay={{true}}>
        <Sprite start={{0}} end={{5}}><TIKScene1 /></Sprite>
        <Sprite start={{5}} end={{9}}><TIKScene2 /></Sprite>
        <Sprite start={{9}} end={{15}}><TIKScene3 /></Sprite>
        <Sprite start={{15}} end={{19}}><TIKScene4 /></Sprite>
        <Sprite start={{19}} end={{22.5}}><TIKScene5 /></Sprite>
        <Sprite start={{22.5}} end={{30.5}}><TIKScene6 /></Sprite>
        <Sprite start={{30.5}} end={{38}}><TIKScene7 /></Sprite>
      </Stage>
    );
  }}
  window.BalanceImportTikScene = BalanceImportTikScene;
  }})();
  </script>'''

  marker = 'window.BalanceImportMappingScene = BalanceImportMappingScene;\n}})();\n</script>'
  if marker not in html:
      marker = 'ReactDOM.createRoot(document.getElementById(\'loader-root\')).render(<LoaderApp />);\n</script>'
  assert marker in html, "Insertion marker not found"
  html = html.replace(marker, marker + new_block, 1)
  wiki.write_text(html, encoding="utf-8")
  print("Done — BalanceImportTikScene injected")
  ```

  Run: `python inject_bit.py`

- [ ] **Step 2: Verify in browser**

  Navigate to `balance-import-tik` concept page. Animation plays and loops. Console clean.

- [ ] **Step 3: Commit**

  ```bash
  cd "C:\Users\mabac\OneDrive\Desktop\TA Brain"
  git add wiki.html
  git commit -m "feat(wiki): wire balance-import-tik animation (38s, loops)"
  ```

---

## Task 7: Wire `loan-setup` animation (31s) — with name conflict fix

**Animation folder:** `C:\Users\mabac\OneDrive\Desktop\TA Brain\animations\loan-setup\`
**Scenes files:** `fm_shared.jsx`, `loan_setup_scenes.jsx`
**Sprite layout:** Scene1 (0–4), Scene2 (4–10), Scene3 (10–15), Scene4 (15–20), Scene5 (20–25), Scene6 (25–31)
**Slug:** `loan-setup-overview`

> **Name conflict warning:** `loan_setup_scenes.jsx` exports `Scene1`–`Scene6`. These names collide with wiki.html's loader `Scene1`–`Scene5`. The IIFE wrapper scopes them locally. The Python script below renames them `LoanScene1`–`LoanScene6` inside the embedded block for extra safety.

- [ ] **Step 1: Run the injection Python script**

  Save as `inject_loan.py` and run:

  ```python
  import re, pathlib

  BASE = pathlib.Path(r"C:\Users\mabac\OneDrive\Desktop\TA Brain")
  wiki = BASE / "wiki.html"
  html = wiki.read_text(encoding="utf-8")

  def read_scene(folder, name):
      content = (BASE / "animations" / folder / name).read_text(encoding="utf-8")
      content = re.sub(r'\nObject\.assign\(window,\s*\{[^}]+\}\s*\);?\s*$', '', content, flags=re.DOTALL)
      return content

  shared = read_scene("loan-setup", "fm_shared.jsx")
  scenes = read_scene("loan-setup", "loan_setup_scenes.jsx")

  # Rename Scene1-6 to LoanScene1-6 to avoid conflict with loader's Scene1-5.
  # Use word-boundary replacement so e.g. "Scene10" isn't matched.
  for i in range(6, 0, -1):  # reverse order so Scene6 is renamed before Scene1
      scenes = re.sub(rf'\bScene{i}\b', f'LoanScene{i}', scenes)

  new_block = f'''
  <script type="text/babel">
  (function() {{
  // ── loan-setup shared + scenes (LoanScene1-6) ───────────────────────────────
  {shared}

  {scenes}

  // ── root wrapper ────────────────────────────────────────────────────────────
  function LoanSetupScene() {{
    return (
      <Stage width={{1920}} height={{1080}} duration={{31}} loop={{true}} background="#08090C" autoplay={{true}}>
        <Sprite start={{0}} end={{4}}><LoanScene1 /></Sprite>
        <Sprite start={{4}} end={{10}}><LoanScene2 /></Sprite>
        <Sprite start={{10}} end={{15}}><LoanScene3 /></Sprite>
        <Sprite start={{15}} end={{20}}><LoanScene4 /></Sprite>
        <Sprite start={{20}} end={{25}}><LoanScene5 /></Sprite>
        <Sprite start={{25}} end={{31}}><LoanScene6 /></Sprite>
      </Stage>
    );
  }}
  window.LoanSetupScene = LoanSetupScene;
  }})();
  </script>'''

  marker = 'window.BalanceImportTikScene = BalanceImportTikScene;\n}})();\n</script>'
  if marker not in html:
      marker = 'ReactDOM.createRoot(document.getElementById(\'loader-root\')).render(<LoaderApp />);\n</script>'
  assert marker in html, "Insertion marker not found"
  html = html.replace(marker, marker + new_block, 1)
  wiki.write_text(html, encoding="utf-8")
  print("Done — LoanSetupScene injected")
  ```

  Run: `python inject_loan.py`

- [ ] **Step 2: Verify in browser**

  Navigate to `loan-setup-overview` concept page. Animation plays and loops. Console clean. Also re-open wiki.html from scratch and verify the loader animation still plays (no Scene naming conflict broke it).

- [ ] **Step 3: Commit**

  ```bash
  cd "C:\Users\mabac\OneDrive\Desktop\TA Brain"
  git add wiki.html
  git commit -m "feat(wiki): wire loan-setup animation (31s, loops, LoanScene prefix for conflict safety)"
  ```

---

## Task 8: Wire `data-pipeline` animation (31s)

**Animation folder:** `C:\Users\mabac\OneDrive\Desktop\TA Brain\animations\data-pipeline\`
**Scenes files:** `fm_shared.jsx`, `pipeline_scenes.jsx`
**Sprite layout:** PipeScene1 (0–5), PipeScene2 (5–10), PipeScene3 (10–15), PipeScene4 (15–20), PipeScene5 (20–25.5), PipeScene6 (25.5–31)
**Slug:** TBD — no concept page with slug `data-pipeline` exists in the current wiki. Candidate slugs to check: `source-mapping`, `base-file`, or a future page. See note below.

> **Slug mapping note:** Search `wiki.html` for pages whose title or description matches a "data pipeline" concept. Run: `grep -n "data.pipeline\|Data Pipeline\|source.mapping\|informatica" wiki.html | head -30` to find candidates. Once confirmed, add the slug to `CONCEPT_ANIMS` in Step 3.

- [ ] **Step 1: Find the correct concept slug**

  Open wiki.html in a browser → navigate to likely concept pages:
  - `source-mapping`
  - `base-file`
  - `faa-dc-data-requirements`
  
  Pick the page whose content best matches the data pipeline animation (multiple vendor data sources → ingestion → validation → output). Update `targetSlug` in the script below.

- [ ] **Step 2: Run the injection Python script**

  Save as `inject_dp.py` and run (replace `'source-mapping'` with the confirmed slug):

  ```python
  import re, pathlib

  BASE = pathlib.Path(r"C:\Users\mabac\OneDrive\Desktop\TA Brain")
  wiki = BASE / "wiki.html"
  html = wiki.read_text(encoding="utf-8")

  TARGET_SLUG = 'source-mapping'  # <-- update this after Step 1

  def read_scene(folder, name):
      content = (BASE / "animations" / folder / name).read_text(encoding="utf-8")
      content = re.sub(r'\nObject\.assign\(window,\s*\{[^}]+\}\s*\);?\s*$', '', content, flags=re.DOTALL)
      return content

  shared = read_scene("data-pipeline", "fm_shared.jsx")
  scenes = read_scene("data-pipeline", "pipeline_scenes.jsx")

  new_block = f'''
  <script type="text/babel">
  (function() {{
  // ── data-pipeline shared + scenes ───────────────────────────────────────────
  {shared}

  {scenes}

  // ── root wrapper ────────────────────────────────────────────────────────────
  function DataPipelineScene() {{
    return (
      <Stage width={{1920}} height={{1080}} duration={{31}} loop={{true}} background="#08090C" autoplay={{true}}>
        <Sprite start={{0}} end={{5}}><PipeScene1 /></Sprite>
        <Sprite start={{5}} end={{10}}><PipeScene2 /></Sprite>
        <Sprite start={{10}} end={{15}}><PipeScene3 /></Sprite>
        <Sprite start={{15}} end={{20}}><PipeScene4 /></Sprite>
        <Sprite start={{20}} end={{25.5}}><PipeScene5 /></Sprite>
        <Sprite start={{25.5}} end={{31}}><PipeScene6 /></Sprite>
      </Stage>
    );
  }}
  window.DataPipelineScene = DataPipelineScene;
  }})();
  </script>'''

  # Inject the script block
  marker = 'window.LoanSetupScene = LoanSetupScene;\n}})();\n</script>'
  if marker not in html:
      marker = 'ReactDOM.createRoot(document.getElementById(\'loader-root\')).render(<LoaderApp />);\n</script>'
  assert marker in html, "Insertion marker not found"
  html = html.replace(marker, marker + new_block, 1)

  # Add to CONCEPT_ANIMS registry
  registry_entry = f"  '{TARGET_SLUG}':             {{ component: 'DataPipelineScene',         duration: 31 }},"
  anim_registry_marker = "  // 'data-pipeline': confirm slug before enabling"
  assert anim_registry_marker in html, "CONCEPT_ANIMS placeholder comment not found"
  html = html.replace(anim_registry_marker, registry_entry)

  wiki.write_text(html, encoding="utf-8")
  print(f"Done — DataPipelineScene injected and wired to '{TARGET_SLUG}'")
  ```

  Run: `python inject_dp.py`

- [ ] **Step 3: Verify in browser**

  Navigate to the target concept page. Animation plays and loops. Console clean.

- [ ] **Step 4: Commit**

  ```bash
  cd "C:\Users\mabac\OneDrive\Desktop\TA Brain"
  git add wiki.html
  git commit -m "feat(wiki): wire data-pipeline animation (31s, loops) to [slug]"
  ```

---

## Task 9: Smoke test all wired animations

- [ ] **Step 1: Navigate to each wired concept page and verify**

  For each slug below, navigate in the wiki and confirm:
  - Animation block appears between description and first `##`
  - Animation auto-plays on page load (no click needed)
  - Animation loops smoothly (no flicker or jump at loop point)
  - Right sidebar (TOC, Backlinks, Outgoing Links, Tags) is unchanged
  - Navigating away and back re-mounts the animation cleanly (no stale root error in console)

  | Slug | Expected component |
  |------|--------------------|
  | `balance-import-cash` | BalanceImportCashScene (25s) |
  | `balance-import-mapping` | BalanceImportMappingScene (33s) |
  | `balance-import-tik` | BalanceImportTikScene (38s) |
  | `loan-setup-overview` | LoanSetupScene (31s) |
  | data-pipeline slug | DataPipelineScene (31s) |

- [ ] **Step 2: Verify concept pages WITHOUT animations are unchanged**

  Navigate to `audit-pack`, `eligibility`, and `fund-mapping`. No animation block. Layout matches the existing single-column design.

- [ ] **Step 3: Verify the loader animation still works**

  Hard-refresh wiki.html (Ctrl+Shift+R). The TA Brain loader animation should play on first load and dismiss after ~9.5 seconds. No regression.

- [ ] **Step 4: Final commit**

  ```bash
  cd "C:\Users\mabac\OneDrive\Desktop\TA Brain"
  git add wiki.html
  git commit -m "feat(wiki): concept page animations complete — 5 sets wired, loop enabled"
  ```

---

## Spec coverage self-check

| Spec requirement | Covered by task |
|-----------------|----------------|
| Auto-play on page load | Task 3 — `autoplay={true}` on Stage |
| Continuous loop | Task 1 — Stage `loop` prop; Tasks 4–8 — `loop={true}` |
| 16:9 aspect ratio | Task 2 — `.cp-anim-wrap { aspect-ratio: 16/9 }` |
| Full content-column width | Task 2 — `width: 100%` |
| Positioned before first `##` | Task 3 — `content.querySelector('h2, h3')` insertion |
| Right sidebar unchanged | Insertion only touches `#content`, not `.right` |
| Pages without animation unchanged | Task 3 — `if (animCfg)` guard |
| Unmount on navigation | Task 3 — `window.__wikiAnimRoot.unmount()` |
| All 5 animation sets wired | Tasks 4–8 |
| Naming conflict handled (loan-setup) | Task 7 — LoanScene prefix |

## Troubleshooting guide

**"Assertion error: Marker not found"** in a Python script → The marker string drifted. Read wiki.html around the expected insertion point (grep for `BalanceImportCashScene` or `ReactDOM.createRoot(loader-root)`) and update the `marker` variable to match the actual text.

**Animation renders blank white** → Open DevTools Console. "X is not defined" means a component name used inside the IIFE wasn't found. The scene file export stripped the wrong line, or the IIFE close brace is in the wrong place. Re-read the injected block in wiki.html and verify the function names inside the IIFE match the `<Sprite>` children.

**Loop jumps/flickers** → The `lastTsRef.current = null` reset in the loop branch causes a timestamp reset on next RAF frame. This is intentional — a single frame skip at loop point is expected and barely visible. If it's very jarring, check that the animation's first-scene `in` time is ≤ 0.3s so it fades in smoothly.

**Loader animation broken after injection** → A `Scene1`–`Scene5` name conflict leaked. Verify the IIFE in the balance-import-cash block has `BICScene` prefixes. Also check that no `function Scene1` declaration appears outside any IIFE in the injected blocks.

**"Cannot read properties of undefined (reading 'unmount')"** → `window.__wikiAnimRoot` was set but the component already unmounted itself. The cleanup line `window.__wikiAnimRoot = null` after `.unmount()` prevents this. If it still occurs, add a null-check: `if (window.__wikiAnimRoot) { try { window.__wikiAnimRoot.unmount(); } catch(e) {} window.__wikiAnimRoot = null; }`.
