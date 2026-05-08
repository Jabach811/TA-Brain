---
marp: true
theme: default
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  :root {
    --accent: #0071e3;
    --accent-2: #34c759;
    --accent-3: #ff9f0a;
    --accent-4: #ff3b30;
    --accent-5: #af52de;
    --bg: #f5f5f7;
    --card: #ffffff;
    --ink: #1d1d1f;
    --ink-2: rgba(0,0,0,0.8);
    --ink-3: rgba(0,0,0,0.48);
    --ink-4: rgba(0,0,0,0.24);
    --line: rgba(0,0,0,0.08);
    --soft: #f0f0f2;
  }

  section {
    background: var(--bg);
    color: var(--ink);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    padding: 48px 64px;
    line-height: 1.5;
  }

  h1 {
    font-family: 'Inter';
    font-weight: 700;
    font-size: 2.6em;
    color: var(--ink);
    letter-spacing: -0.03em;
    line-height: 1.07;
    margin: 0 0 4px;
  }

  h2 {
    font-weight: 300;
    font-size: 1.05em;
    color: var(--ink-3);
    margin: 0 0 22px;
    letter-spacing: -0.01em;
  }

  h3 {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 0.55em;
    color: var(--ink-3);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin: 0 0 8px;
  }

  strong { color: var(--accent); font-weight: 600; }
  em { font-style: normal; color: var(--ink); font-weight: 500; }

  section::after { font-size: 0.5em; color: var(--ink-4); }

  section.lead {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%);
  }
  section.lead h1 { font-size: 3.2em; }

  .divider { width: 44px; height: 3px; background: var(--accent); border-radius: 2px; margin: 14px auto 18px; }

  .pill {
    display: inline-block;
    font-weight: 600;
    font-size: 0.52em;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 980px;
    background: rgba(0,113,227,0.08);
    color: var(--accent);
  }

  .card {
    background: var(--card);
    border-radius: 14px;
    box-shadow: rgba(0,0,0,0.06) 0 2px 14px 0;
    padding: 18px 22px;
    margin-bottom: 10px;
  }

  .card-title { font-weight: 700; font-size: 1em; color: var(--ink); margin-bottom: 4px; }
  .card-sub { font-size: 0.72em; color: var(--ink-3); line-height: 1.5; }

  .row { display: flex; gap: 14px; }
  .col { flex: 1; }

  .grid-2 { display:grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .grid-3 { display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }

  /* Demo area — the "effect in action" box on each slide */
  .demo {
    background: var(--card);
    border-radius: 16px;
    box-shadow: rgba(0,0,0,0.08) 0 4px 20px 0;
    padding: 24px;
    min-height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .ghost-browser {
    background: #fff;
    border-radius: 10px;
    border: 1px solid var(--line);
    padding: 0;
    overflow: hidden;
    width: 100%;
  }
  .ghost-bar {
    background: #f7f7f8;
    padding: 8px 12px;
    border-bottom: 1px solid var(--line);
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .dot { width: 9px; height: 9px; border-radius: 50%; }
  .d-r { background: #ff5f57; }
  .d-y { background: #febc2e; }
  .d-g { background: #28c840; }
  .ghost-body { padding: 16px; }

  /* Effect demos */
  @keyframes fadeup {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slidein {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes zoomin {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes floatup {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-8px); }
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(0,113,227,0.4); }
    50%     { box-shadow: 0 0 0 14px rgba(0,113,227,0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes typewriter {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes blink {
    50% { border-color: transparent; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes gradientshift {
    0%,100% { background-position: 0% 50%; }
    50%     { background-position: 100% 50%; }
  }

  .fade-up { animation: fadeup 1.4s ease-out infinite alternate; }
  .slide-in { animation: slidein 1.4s ease-out infinite alternate; }
  .zoom-in { animation: zoomin 1.4s ease-out infinite alternate; }
  .float { animation: floatup 3s ease-in-out infinite; }
  .pulse-btn { animation: pulse 2s infinite; }

  .hover-card {
    background: #fff;
    border-radius: 14px;
    padding: 20px;
    box-shadow: rgba(0,0,0,0.08) 0 2px 14px 0;
    transition: all 0.3s ease;
    animation: floatup 3s ease-in-out infinite;
  }
  .hover-card:hover {
    transform: translateY(-6px);
    box-shadow: rgba(0,0,0,0.14) 0 12px 32px 0;
  }

  .gradient-box {
    background: linear-gradient(135deg, #0071e3, #af52de, #ff3b30, #ff9f0a);
    background-size: 300% 300%;
    animation: gradientshift 6s ease infinite;
    border-radius: 16px;
    color: #fff;
    padding: 40px;
    text-align: center;
    font-weight: 700;
    font-size: 1.4em;
    letter-spacing: -0.02em;
  }

  .glass-bg {
    background: linear-gradient(135deg, #ff6a00, #ee0979, #9333ea);
    border-radius: 14px;
    padding: 30px;
    position: relative;
    overflow: hidden;
  }
  .glass-card {
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 12px;
    padding: 16px 20px;
    color: #fff;
    font-weight: 600;
  }

  .shimmer {
    background: linear-gradient(90deg, #e8e8eb 25%, #f5f5f7 50%, #e8e8eb 75%);
    background-size: 200% 100%;
    animation: shimmer 1.8s infinite;
    height: 14px;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  .shimmer.w-70 { width: 70%; }
  .shimmer.w-90 { width: 90%; }

  .spinner {
    width: 36px; height: 36px;
    border: 3px solid rgba(0,113,227,0.15);
    border-top: 3px solid var(--accent);
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }

  .typewriter {
    font-family: 'Inter', monospace;
    font-weight: 600;
    font-size: 1.3em;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid var(--accent);
    animation: typewriter 3s steps(30) infinite alternate, blink 0.7s step-end infinite;
    max-width: fit-content;
  }

  .gradient-text {
    background: linear-gradient(135deg, #0071e3, #af52de, #ff3b30);
    background-size: 200% 200%;
    animation: gradientshift 4s ease infinite;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 800;
    font-size: 2em;
    letter-spacing: -0.03em;
  }

  .btn-cta {
    display: inline-block;
    background: var(--accent);
    color: #fff;
    padding: 12px 28px;
    border-radius: 980px;
    font-weight: 600;
    font-size: 0.9em;
    text-decoration: none;
    transition: all 0.2s;
    cursor: pointer;
  }
  .btn-cta:hover { background: #005bb8; transform: translateY(-1px); }

  .marquee-wrap {
    width: 100%;
    overflow: hidden;
    padding: 14px 0;
    background: #f7f7f8;
    border-radius: 10px;
  }
  .marquee-track {
    display: flex;
    gap: 40px;
    animation: marquee 18s linear infinite;
    white-space: nowrap;
    font-weight: 600;
    color: var(--ink-2);
  }
  .marquee-track span { padding: 0 20px; }

  .accordion-item {
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(0,0,0,0.04) 0 1px 4px 0;
    margin-bottom: 8px;
    padding: 14px 18px;
  }
  .accordion-item summary {
    font-weight: 600;
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--ink);
  }
  .accordion-item summary::after {
    content: "+";
    color: var(--accent);
    font-size: 1.3em;
    font-weight: 300;
    transition: transform 0.2s;
  }
  .accordion-item[open] summary::after { content: "−"; }
  .accordion-item p { margin: 10px 0 0; color: var(--ink-3); font-size: 0.85em; }

  .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--line); margin-bottom: 16px; }
  .tab { padding: 8px 18px; font-size: 0.85em; color: var(--ink-3); border-bottom: 2px solid transparent; cursor: pointer; font-weight: 500; }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 600; }

  .carousel-dots { display:flex; gap:6px; justify-content:center; margin-top:12px; }
  .carousel-dots span { width:7px; height:7px; border-radius:50%; background: var(--ink-4); }
  .carousel-dots span.on { background: var(--accent); width: 22px; border-radius: 4px; }

  .modal-bg {
    background: rgba(0,0,0,0.4);
    border-radius: 14px;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }
  .modal-box {
    background: #fff;
    border-radius: 14px;
    padding: 20px 24px;
    box-shadow: rgba(0,0,0,0.3) 0 20px 60px 0;
    max-width: 260px;
    animation: zoomin 1.4s ease-out infinite alternate;
  }

  .progress-track { height: 4px; background: var(--line); border-radius: 2px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--accent); width: 62%; border-radius: 2px; }

  .sticky-demo { border-radius: 12px; overflow: hidden; box-shadow: rgba(0,0,0,0.08) 0 2px 14px 0; }
  .sticky-nav { background: rgba(255,255,255,0.85); backdrop-filter: blur(10px); padding: 10px 16px; display:flex; justify-content:space-between; align-items:center; font-weight:600; font-size: 0.78em; border-bottom: 1px solid var(--line); }

  .toggle {
    width: 44px; height: 26px;
    background: var(--accent);
    border-radius: 100px;
    position: relative;
    display: inline-block;
  }
  .toggle::after {
    content: "";
    position: absolute;
    width: 20px; height: 20px;
    background: #fff;
    border-radius: 50%;
    top: 3px; right: 3px;
    box-shadow: rgba(0,0,0,0.2) 0 1px 3px 0;
  }

  .checklist { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 18px; font-size: 0.78em; color: var(--ink-2); }
  .checklist label { display: flex; align-items: center; gap: 8px; padding: 5px 0; cursor: pointer; }
  .checklist input { accent-color: var(--accent); width: 16px; height: 16px; }

  .swatch { width: 100%; height: 60px; border-radius: 10px; margin-bottom: 6px; }

  .shadow-demo { background: #fff; border-radius: 12px; padding: 20px; text-align:center; font-weight:600; color: var(--ink); font-size: 0.85em; }
  .s-xs { box-shadow: rgba(0,0,0,0.04) 0 1px 3px 0; }
  .s-sm { box-shadow: rgba(0,0,0,0.08) 0 2px 8px 0; }
  .s-md { box-shadow: rgba(0,0,0,0.1)  0 6px 20px 0; }
  .s-lg { box-shadow: rgba(0,0,0,0.14) 0 14px 40px 0; }

  footer { color: var(--ink-4); font-size: 0.7em; }
footer: ''
---

<!-- _class: lead -->
<!-- _paginate: false -->

<span class="pill">Effects Menu · 2026</span>

# The <span class="gradient-text" style="font-size:1em;">Effects</span> Menu

<div class="divider"></div>

<h2 style="max-width:640px;">Visual tricks, animations, and interactive pieces your website can include — pick the ones that fit.</h2>

<div style="margin-top:28px; font-size: 0.78em; color: var(--ink-3);">Tap or hover any demo to see it in action.</div>

---

# How to use this

## A menu, not a recipe

<div style="margin-top:20px;" class="row">
<div class="col card">
<h3>Browse</h3>
<div class="card-title">See what's possible</div>
<div class="card-sub">Each slide shows one effect with a live example. You'll know quickly whether it feels right for your site.</div>
</div>
<div class="col card">
<h3>Mark</h3>
<div class="card-title">Tick what you want</div>
<div class="card-sub">The last slide has a checklist. Mark the effects you like — or just tell us "yes to slide 7."</div>
</div>
<div class="col card">
<h3>Send</h3>
<div class="card-title">Share with your brief</div>
<div class="card-sub">Attach this to your website request. It saves us guessing and you explaining.</div>
</div>
</div>

<div style="margin-top:20px; font-size:0.74em; color:var(--ink-3); line-height:1.6;">
<em>A friendly note:</em> more effects ≠ better website. Pick a few that serve your message. A calm, well-built site beats a flashy, busy one every time.
</div>

---

# Scroll animations

## Elements fade, slide, or zoom in as you scroll down the page

<div class="row" style="gap:16px; margin-top: 8px;">
<div class="demo col" style="flex-direction:column; gap:10px; min-height:260px;">
<div class="fade-up card" style="width:70%; text-align:center;"><div class="card-title">Fade up</div><div class="card-sub">Content rises into view</div></div>
<div class="slide-in card" style="width:70%; text-align:center;"><div class="card-title">Slide in</div><div class="card-sub">Arrives from the side</div></div>
<div class="zoom-in card" style="width:70%; text-align:center;"><div class="card-title">Zoom in</div><div class="card-sub">Grows into place</div></div>
</div>
<div class="col" style="padding-left:8px;">
<h3>Good for</h3>
<ul style="font-size:0.82em; color:var(--ink-2); padding-left:1.2em; line-height:1.7;">
<li>Telling a story as people scroll</li>
<li>Breaking up long pages</li>
<li>Highlighting important moments</li>
</ul>
<h3 style="margin-top:18px;">Keep in mind</h3>
<div style="font-size:0.78em; color:var(--ink-3); line-height:1.6;">Use sparingly. If everything animates, nothing stands out.</div>
</div>
</div>

---

# Hover lift

## Cards rise and cast a bigger shadow when you point at them

<div style="margin-top:6px;">
<div class="demo" style="gap:16px;">
<div class="hover-card" style="width:180px;">
<div class="card-title">Service One</div>
<div class="card-sub">Hover me</div>
</div>
<div class="hover-card" style="width:180px; animation-delay: 1s;">
<div class="card-title">Service Two</div>
<div class="card-sub">Hover me</div>
</div>
<div class="hover-card" style="width:180px; animation-delay: 2s;">
<div class="card-title">Service Three</div>
<div class="card-sub">Hover me</div>
</div>
</div>
</div>

<div style="margin-top:16px;" class="row">
<div class="col" style="font-size:0.8em; color:var(--ink-2);"><strong>Good for:</strong> service grids, product cards, team bios.</div>
<div class="col" style="font-size:0.8em; color:var(--ink-3);"><em>Subtle version:</em> tiny lift, soft shadow. <em>Playful version:</em> rotate, scale, or color shift.</div>
</div>

---

# Gradient backgrounds

## Colors that flow and shift slowly in the background

<div style="margin-top:6px;">
<div class="gradient-box">A moving gradient sets a mood</div>
</div>

<div style="margin-top:16px;" class="row">
<div class="col">
<h3>Good for</h3>
<ul style="font-size:0.82em; color:var(--ink-2); padding-left:1.2em; line-height:1.7;">
<li>Hero banners</li>
<li>Section dividers</li>
<li>Call-to-action areas</li>
</ul>
</div>
<div class="col">
<h3>Two flavors</h3>
<div style="font-size:0.8em; color:var(--ink-3); line-height:1.6;">
<em>Static:</em> a set gradient that doesn't move.<br>
<em>Animated:</em> colors slowly shift, like this one.
</div>
</div>
</div>

---

# Glassmorphism

## Frosted-glass panels layered over colorful backgrounds

<div style="margin-top:8px;">
<div class="glass-bg" style="min-height: 240px; display:flex; gap:14px; align-items:center; justify-content:center;">
<div class="glass-card">
<div style="font-size:0.7em; opacity:0.8; letter-spacing:0.1em; text-transform:uppercase;">Plan</div>
<div style="font-size:1.4em; font-weight:800;">Premium</div>
<div style="font-size:0.8em; opacity:0.85; font-weight:400; margin-top:4px;">$29/month</div>
</div>
<div class="glass-card" style="background: rgba(255,255,255,0.28);">
<div style="font-size:0.7em; opacity:0.8; letter-spacing:0.1em; text-transform:uppercase;">Plan</div>
<div style="font-size:1.4em; font-weight:800;">Pro</div>
<div style="font-size:0.8em; opacity:0.85; font-weight:400; margin-top:4px;">$49/month</div>
</div>
</div>
</div>

<div style="margin-top:16px; font-size:0.8em; color:var(--ink-2);">
<strong>Good for:</strong> pricing cards, floating overlays, modern tech-feel sites. <span style="color:var(--ink-3);">Needs a colorful or photographic background to look like glass.</span>
</div>

---

# Parallax scrolling

## Background moves slower than the foreground — feels like depth

<div class="demo" style="padding:0; min-height:260px; overflow:hidden; position:relative;">
<div style="position:absolute; inset:0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
<div style="position:absolute; top:20px; left:20px; font-size:3em; color:rgba(255,255,255,0.15); font-weight:800; letter-spacing:-0.03em;">BACKGROUND</div>
<div style="position:absolute; bottom:30px; right:30px; font-size:3em; color:rgba(255,255,255,0.35); font-weight:800; letter-spacing:-0.03em;">MIDDLE</div>
<div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:#fff; padding:20px 30px; border-radius:14px; box-shadow: rgba(0,0,0,0.3) 0 20px 50px 0;">
<div style="font-weight:700; font-size:1.1em;">FOREGROUND</div>
<div style="font-size:0.8em; color:var(--ink-3);">This sits on top</div>
</div>
</div>

<div style="margin-top:14px; font-size:0.8em; color:var(--ink-2);">
<strong>Good for:</strong> storytelling pages, product showcases, long editorial-style layouts.
<span style="color:var(--ink-3);">Use lightly — too much can make people dizzy on phones.</span>
</div>

---

# Sticky navigation

## The menu stays at the top of the screen as you scroll

<div style="margin-top:8px;">
<div class="sticky-demo">
<div class="sticky-nav">
<div>✦ Your Brand</div>
<div style="display:flex; gap:18px; color:var(--ink-3); font-weight:500;"><span>About</span><span>Work</span><span>Pricing</span><span style="color:var(--accent);">Contact →</span></div>
</div>
<div style="padding: 30px 20px; background: #fafafa; min-height:140px;">
<div style="height:10px; background:#e8e8eb; border-radius:4px; width:60%; margin-bottom:8px;"></div>
<div style="height:10px; background:#e8e8eb; border-radius:4px; width:80%; margin-bottom:8px;"></div>
<div style="height:10px; background:#e8e8eb; border-radius:4px; width:50%; margin-bottom:14px;"></div>
<div style="font-size:0.75em; color:var(--ink-3); text-align:center;">↓ scrolling content ↓</div>
</div>
</div>
</div>

<div style="margin-top:14px; font-size:0.8em; color:var(--ink-2);"><strong>Two styles:</strong> <em>plain</em> (stays solid) or <em>frosted</em> (see-through with blur — like the demo above). <span style="color:var(--ink-3);">Almost every modern site has sticky nav.</span></div>

---

# Scroll progress bar

## A thin line across the top that fills as you read

<div class="demo" style="flex-direction:column; gap:16px;">
<div style="width:100%;">
<div style="font-size:0.7em; color:var(--ink-3); margin-bottom:6px;">25% read</div>
<div class="progress-track"><div class="progress-fill" style="width:25%;"></div></div>
</div>
<div style="width:100%;">
<div style="font-size:0.7em; color:var(--ink-3); margin-bottom:6px;">62% read</div>
<div class="progress-track"><div class="progress-fill" style="width:62%;"></div></div>
</div>
<div style="width:100%;">
<div style="font-size:0.7em; color:var(--ink-3); margin-bottom:6px;">94% read</div>
<div class="progress-track"><div class="progress-fill" style="width:94%;"></div></div>
</div>
</div>

<div style="margin-top:14px; font-size:0.8em; color:var(--ink-2);"><strong>Good for:</strong> blog posts, long articles, tutorials — anywhere visitors wonder "how much more?"</div>

---

# Accordion / FAQ

## Click a question, it expands to reveal the answer

<div style="margin-top:6px;">

<details class="accordion-item" open>
<summary>What's included?</summary>
<p>A full website, hosting setup, and two rounds of edits. Launch takes about 4–6 weeks from the day we have everything we need.</p>
</details>

<details class="accordion-item">
<summary>How much does it cost?</summary>
<p>Click to reveal</p>
</details>

<details class="accordion-item">
<summary>Can I update it myself later?</summary>
<p>Click to reveal</p>
</details>

<details class="accordion-item">
<summary>What about support after launch?</summary>
<p>Click to reveal</p>
</details>

</div>

<div style="margin-top:12px; font-size:0.78em; color:var(--ink-2);"><strong>Good for:</strong> FAQs, product specs, long content you want collapsed by default.</div>

---

# Tabs

## Multiple views in the same space — click to swap

<div class="demo" style="flex-direction:column; align-items:stretch;">
<div class="tabs">
<div class="tab active">Overview</div>
<div class="tab">Features</div>
<div class="tab">Pricing</div>
<div class="tab">Reviews</div>
</div>
<div style="padding: 10px 4px;">
<div style="font-weight:700; font-size:1.05em; margin-bottom:6px;">Everything in one place</div>
<div style="font-size:0.82em; color:var(--ink-3); line-height:1.6;">Tabs keep long pages short. Visitors pick the section they care about instead of scrolling through everything.</div>
</div>
</div>

<div style="margin-top:14px; font-size:0.8em; color:var(--ink-2);"><strong>Good for:</strong> product pages, service menus, comparison tables. <span style="color:var(--ink-3);">Don't use for critical info — some visitors won't click the other tabs.</span></div>

---

# Carousel / slider

## Multiple images or quotes rotate in the same spot

<div class="demo" style="flex-direction:column;">
<div style="display:flex; gap:12px; width:100%; justify-content:center;">
<div style="background: linear-gradient(135deg, #4facfe, #00f2fe); height:140px; width:200px; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700;">Slide 1</div>
<div style="background: linear-gradient(135deg, #fa709a, #fee140); height:140px; width:200px; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; transform: scale(1.05); box-shadow: rgba(0,0,0,0.15) 0 10px 30px 0;">Slide 2</div>
<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); height:140px; width:200px; border-radius:12px; display:flex; align-items:center; justify-content:center; color:var(--ink); font-weight:700;">Slide 3</div>
</div>
<div class="carousel-dots"><span></span><span class="on"></span><span></span><span></span></div>
</div>

<div style="margin-top:12px; font-size:0.78em; color:var(--ink-2);"><strong>Good for:</strong> testimonials, featured products, photo galleries. <span style="color:var(--ink-3);">Research shows people rarely click past slide one — put the most important thing first.</span></div>

---

# Modal / popup

## A focused window that appears over the page

<div class="modal-bg">
<div class="modal-box">
<div style="font-weight:700; font-size:1.05em; margin-bottom:6px;">Join our newsletter</div>
<div style="font-size:0.78em; color:var(--ink-3); margin-bottom:14px;">Monthly tips, no spam.</div>
<div style="background:#f0f0f2; height:32px; border-radius:6px; margin-bottom:10px;"></div>
<div style="background: var(--accent); color:#fff; padding:8px; border-radius:6px; text-align:center; font-size:0.8em; font-weight:600;">Sign me up</div>
</div>
</div>

<div style="margin-top:14px; font-size:0.8em; color:var(--ink-2);"><strong>Good for:</strong> newsletter signups, quick forms, important announcements. <span style="color:var(--ink-3);">Use with care — unexpected popups annoy visitors. Timed or exit-intent ones work better than instant.</span></div>

---

# Image lightbox

## Click a small image, it opens big in a dark overlay

<div class="demo" style="background: #1a1a1a; min-height:260px;">
<div style="background:#fff; padding:8px; border-radius:10px; box-shadow: rgba(0,0,0,0.4) 0 20px 50px 0; max-width:320px;">
<div style="background: linear-gradient(135deg, #ffa751, #ffe259); height:160px; border-radius:6px;"></div>
<div style="display:flex; gap:6px; margin-top:8px;">
<div style="background: linear-gradient(135deg, #a8edea, #fed6e3); height:32px; flex:1; border-radius:4px; opacity:0.6;"></div>
<div style="background: linear-gradient(135deg, #fa709a, #fee140); height:32px; flex:1; border-radius:4px; opacity:0.6;"></div>
<div style="background: linear-gradient(135deg, #ffa751, #ffe259); height:32px; flex:1; border-radius:4px; border:2px solid var(--accent);"></div>
<div style="background: linear-gradient(135deg, #4facfe, #00f2fe); height:32px; flex:1; border-radius:4px; opacity:0.6;"></div>
</div>
</div>
</div>

<div style="margin-top:12px; font-size:0.8em; color:var(--ink-2);"><strong>Good for:</strong> portfolios, photo galleries, product detail shots.</div>

---

# Typewriter text

## Words type themselves out, one letter at a time

<div class="demo" style="flex-direction:column; gap:14px;">
<div style="font-size:0.7em; color:var(--ink-3); letter-spacing:0.15em; text-transform:uppercase;">We help you</div>
<div class="typewriter">build something amazing.</div>
</div>

<div style="margin-top:14px; font-size:0.8em; color:var(--ink-2);"><strong>Good for:</strong> hero headlines, rotating taglines ("We help you <em>design</em>… / <em>build</em>… / <em>ship</em>…"). <span style="color:var(--ink-3);">One use per page, max. Gets annoying fast.</span></div>

---

# Gradient text

## Letters filled with a flowing rainbow gradient

<div class="demo" style="flex-direction:column; gap:18px;">
<div class="gradient-text" style="font-size:3em;">Be Different</div>
<div style="font-size:0.85em; color:var(--ink-3); max-width:440px; text-align:center;">Great for a hero headline or a section title you want to pop.</div>
</div>

<div style="margin-top:12px; font-size:0.78em; color:var(--ink-2);"><strong>Keep it to:</strong> one headline per page. Whole paragraphs in gradient hurt to read.</div>

---

# Skeleton loaders

## Grey placeholders that shimmer while content loads

<div class="demo" style="flex-direction:column; align-items:stretch; gap:24px;">
<div style="display:flex; gap:14px; align-items:center;">
<div class="shimmer" style="width:44px; height:44px; border-radius:50%; margin:0;"></div>
<div style="flex:1;">
<div class="shimmer w-70" style="height:12px;"></div>
<div class="shimmer w-90" style="height:10px;"></div>
</div>
</div>
<div>
<div class="shimmer w-90"></div>
<div class="shimmer w-70"></div>
<div class="shimmer" style="width:40%;"></div>
</div>
</div>

<div style="margin-top:14px; font-size:0.8em; color:var(--ink-2);"><strong>Good for:</strong> sites that load data — feeds, search results, dashboards. <span style="color:var(--ink-3);">Feels faster than a blank screen or spinning circle.</span></div>

---

# Loading spinners

## Little animated indicators for short waits

<div class="demo" style="gap:40px;">
<div style="text-align:center;">
<div class="spinner"></div>
<div style="font-size:0.7em; color:var(--ink-3); margin-top:8px;">Classic</div>
</div>
<div style="text-align:center;">
<div style="display:flex; gap:4px; align-items:center; height:36px;">
<div style="width:8px; height:8px; border-radius:50%; background:var(--accent); animation: floatup 0.8s ease-in-out infinite;"></div>
<div style="width:8px; height:8px; border-radius:50%; background:var(--accent); animation: floatup 0.8s ease-in-out 0.15s infinite;"></div>
<div style="width:8px; height:8px; border-radius:50%; background:var(--accent); animation: floatup 0.8s ease-in-out 0.3s infinite;"></div>
</div>
<div style="font-size:0.7em; color:var(--ink-3); margin-top:8px;">Bouncing dots</div>
</div>
<div style="text-align:center;">
<div style="width:44px; height:4px; background: rgba(0,113,227,0.15); border-radius:2px; overflow:hidden; position:relative;">
<div style="position:absolute; top:0; left:0; width:40%; height:100%; background:var(--accent); animation: marquee 1.4s linear infinite;"></div>
</div>
<div style="font-size:0.7em; color:var(--ink-3); margin-top:12px;">Progress bar</div>
</div>
</div>

<div style="margin-top:14px; font-size:0.8em; color:var(--ink-2);"><strong>Good for:</strong> form submissions, button clicks, any action that takes a second or two.</div>

---

# Button effects

## What happens when someone points at or clicks a button

<div class="demo" style="flex-wrap:wrap; gap:18px;">
<a class="btn-cta">Classic</a>
<a class="btn-cta pulse-btn">Pulsing</a>
<a class="btn-cta" style="background: linear-gradient(135deg, #667eea, #764ba2);">Gradient</a>
<a class="btn-cta" style="background:transparent; color:var(--accent); border: 2px solid var(--accent); padding: 10px 26px;">Outline</a>
<a class="btn-cta" style="background:#1d1d1f;">Dark</a>
</div>

<div style="margin-top:14px; font-size:0.8em; color:var(--ink-2);"><strong>Good buttons feel alive:</strong> color change on hover, a tiny lift on click, a ripple or pulse on the primary CTA. <span style="color:var(--ink-3);">Small details — but they're what people interact with most.</span></div>

---

# Marquee / ticker

## A row of logos or words that scrolls sideways forever

<div style="margin-top:10px;">
<div class="marquee-wrap">
<div class="marquee-track">
<span>★ Featured in Forbes</span>
<span>★ 4.9 Google Rating</span>
<span>★ 500+ Happy Clients</span>
<span>★ Since 2014</span>
<span>★ Featured in Forbes</span>
<span>★ 4.9 Google Rating</span>
<span>★ 500+ Happy Clients</span>
<span>★ Since 2014</span>
</div>
</div>
</div>

<div style="margin-top:16px; font-size:0.8em; color:var(--ink-2);"><strong>Good for:</strong> client logos, press mentions, social proof, live stats. <span style="color:var(--ink-3);">Keep the speed slow — fast marquees are hard to read.</span></div>

---

# Dark mode toggle

## A switch that flips the site from light to dark

<div class="demo" style="flex-direction:column; gap:20px;">
<div style="display:flex; gap:14px; align-items:center;">
<span style="font-size:0.85em; color:var(--ink-3);">Light</span>
<div class="toggle"></div>
<span style="font-size:0.85em; color:var(--ink); font-weight:600;">Dark</span>
</div>
<div style="display:flex; gap:12px;">
<div style="background:#fff; padding:14px 18px; border-radius:10px; box-shadow: rgba(0,0,0,0.08) 0 2px 10px 0; width:140px;">
<div style="font-weight:700; font-size:0.85em;">Light mode</div>
<div style="font-size:0.7em; color:var(--ink-3); margin-top:2px;">Clean and bright</div>
</div>
<div style="background:#1d1d1f; padding:14px 18px; border-radius:10px; color:#fff; width:140px;">
<div style="font-weight:700; font-size:0.85em;">Dark mode</div>
<div style="font-size:0.7em; color:rgba(255,255,255,0.6); margin-top:2px;">Easy on the eyes</div>
</div>
</div>
</div>

<div style="margin-top:14px; font-size:0.8em; color:var(--ink-2);"><strong>Good for:</strong> tech-leaning audiences, reading-heavy sites, apps. <span style="color:var(--ink-3);">Doubles the design work — every color and photo needs a dark version.</span></div>

---

# Depth & shadows

## How "lifted" cards and buttons feel off the page

<div class="grid-3" style="margin-top:8px;">
<div class="shadow-demo s-xs"><div style="font-size:0.7em; color:var(--ink-3); letter-spacing:0.15em; text-transform:uppercase; margin-bottom:6px;">Flat</div>Subtle<br>edge</div>
<div class="shadow-demo s-sm"><div style="font-size:0.7em; color:var(--ink-3); letter-spacing:0.15em; text-transform:uppercase; margin-bottom:6px;">Soft</div>Gentle<br>shadow</div>
<div class="shadow-demo s-md"><div style="font-size:0.7em; color:var(--ink-3); letter-spacing:0.15em; text-transform:uppercase; margin-bottom:6px;">Lifted</div>Clearly<br>raised</div>
</div>

<div style="margin-top:14px;" class="grid-3">
<div class="shadow-demo s-lg"><div style="font-size:0.7em; color:var(--ink-3); letter-spacing:0.15em; text-transform:uppercase; margin-bottom:6px;">Floating</div>Really<br>popping</div>
<div class="shadow-demo" style="background:#fff; border:1px solid var(--line); box-shadow:none;"><div style="font-size:0.7em; color:var(--ink-3); letter-spacing:0.15em; text-transform:uppercase; margin-bottom:6px;">Outline</div>Clean<br>border</div>
<div class="shadow-demo" style="background: linear-gradient(180deg, #fff, #f7f7f8); box-shadow: rgba(0,0,0,0.04) 0 1px 3px 0, inset rgba(255,255,255,0.5) 0 1px 0 0;"><div style="font-size:0.7em; color:var(--ink-3); letter-spacing:0.15em; text-transform:uppercase; margin-bottom:6px;">Inset</div>Pressed<br>look</div>
</div>

<div style="margin-top:14px; font-size:0.78em; color:var(--ink-2); text-align:center;">Shadows signal importance — stronger shadow = feels closer = feels more clickable.</div>

---

# Color mood board

## A quick feel-test — which vibe matches your brand?

<div class="grid-3" style="margin-top:8px;">
<div><div class="swatch" style="background: linear-gradient(135deg, #0071e3, #5ac8fa);"></div><div style="font-size:0.78em; font-weight:600;">Trust & tech</div><div style="font-size:0.7em; color:var(--ink-3);">Cool, clean, confident</div></div>
<div><div class="swatch" style="background: linear-gradient(135deg, #ff9f0a, #ff3b30);"></div><div style="font-size:0.78em; font-weight:600;">Warmth & energy</div><div style="font-size:0.7em; color:var(--ink-3);">Approachable, bold</div></div>
<div><div class="swatch" style="background: linear-gradient(135deg, #34c759, #30d158);"></div><div style="font-size:0.78em; font-weight:600;">Fresh & natural</div><div style="font-size:0.7em; color:var(--ink-3);">Organic, healthy, calm</div></div>
</div>

<div class="grid-3" style="margin-top:14px;">
<div><div class="swatch" style="background: linear-gradient(135deg, #af52de, #ff2d92);"></div><div style="font-size:0.78em; font-weight:600;">Playful & creative</div><div style="font-size:0.7em; color:var(--ink-3);">Fun, modern, bold</div></div>
<div><div class="swatch" style="background: linear-gradient(135deg, #1d1d1f, #3a3a3c);"></div><div style="font-size:0.78em; font-weight:600;">Luxury & focus</div><div style="font-size:0.7em; color:var(--ink-3);">Premium, serious</div></div>
<div><div class="swatch" style="background: linear-gradient(135deg, #d4a373, #f5ebe0);"></div><div style="font-size:0.78em; font-weight:600;">Warm & crafted</div><div style="font-size:0.7em; color:var(--ink-3);">Artisanal, personal</div></div>
</div>

<div style="margin-top:14px; font-size:0.78em; color:var(--ink-3); text-align:center;">Point to the one that fits you — we'll build the palette around it.</div>

---

<!-- _backgroundColor: #ffffff -->

# The pick list

## Tick everything you want on your site

<div style="margin-top:20px;" class="checklist">
<label><input type="checkbox"><span>Scroll animations (fade, slide, zoom)</span></label>
<label><input type="checkbox"><span>Hover lift on cards</span></label>
<label><input type="checkbox"><span>Gradient backgrounds</span></label>
<label><input type="checkbox"><span>Glassmorphism / frosted panels</span></label>
<label><input type="checkbox"><span>Parallax scrolling</span></label>
<label><input type="checkbox"><span>Sticky / frosted navigation</span></label>
<label><input type="checkbox"><span>Scroll progress bar</span></label>
<label><input type="checkbox"><span>Accordion / FAQ sections</span></label>
<label><input type="checkbox"><span>Tabs for grouped content</span></label>
<label><input type="checkbox"><span>Image or testimonial carousel</span></label>
<label><input type="checkbox"><span>Modal / popup windows</span></label>
<label><input type="checkbox"><span>Image lightbox gallery</span></label>
<label><input type="checkbox"><span>Typewriter headline effect</span></label>
<label><input type="checkbox"><span>Gradient text on headings</span></label>
<label><input type="checkbox"><span>Skeleton loaders</span></label>
<label><input type="checkbox"><span>Custom button hover effects</span></label>
<label><input type="checkbox"><span>Marquee / logo ticker</span></label>
<label><input type="checkbox"><span>Dark mode toggle</span></label>
<label><input type="checkbox"><span>Strong shadows & depth</span></label>
<label><input type="checkbox"><span>Color mood: ___________</span></label>
</div>

<div style="margin-top:14px; font-size:0.7em; color:var(--ink-3); text-align:center;">Can't decide? Tick <em>"not sure — suggest what fits"</em> and we'll propose a set for your brief.</div>

---

<!-- _class: lead -->

<span class="pill" style="background: rgba(52,199,89,0.1); color:#248a3d;">You're done</span>

# <span class="gradient-text" style="font-size:1em;">Less is more</span>

<div class="divider"></div>

<h2 style="max-width:620px;">The best websites pick three or four effects and use them well. The worst try everything and feel like a carnival.</h2>

<div style="margin-top:30px; font-size:0.8em; color: var(--ink-3);">Send your picks along with your brief — we'll take it from there.</div>
