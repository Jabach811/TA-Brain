---
marp: true
theme: default
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Raleway:wght@100;200;300&display=swap');

  :root {
    --a: #ff6b1a;
    --a2: #ff8c4a;
    --bg: #000;
    --s: #080808;
    --b: #111;
    --m: #777;
    --t: #fff;
    --g: #22c55e;
    --r: #ef4444;
    --y: #f5a623;
    --body: #bbb;
    --label: #888;
  }

  section {
    background: var(--bg);
    color: var(--t);
    font-family: 'Raleway', sans-serif;
    font-weight: 200;
    padding: 56px 72px;
    line-height: 1.5;
  }

  h1 { font-family: 'Outfit'; font-weight: 800; font-size: 3em; color: var(--t); letter-spacing: -0.03em; line-height: 1; margin: 0 0 4px; }
  h2 { font-family: 'Raleway'; font-weight: 100; font-size: 1.3em; color: #aaa; margin: 0 0 20px; }
  h3 { font-family: 'Outfit'; font-weight: 600; font-size: 0.6em; color: var(--m); text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 4px; }
  strong { color: var(--a); font-weight: 300; }

  section.lead { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
  section.lead h1 { font-size: 3.6em; line-height: 1.05; }
  section.lead h2 { font-size: 1.1em; }

  section::after { font-family: 'Outfit'; font-size: 0.6em; color: #151515; }

  header { text-align: right; }
  .tag { font-family: 'Outfit'; font-weight: 600; font-size: 0.55em; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 10px; border-radius: 4px; display: inline-block; }
  .row:hover { background: #0c0c0c; }
  .row { transition: background 0.2s; border-radius: 6px; }

header: ''
footer: ''
---

<!-- _class: lead -->
<!-- _paginate: false -->

![bg brightness:0.1](https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400)

### Investment Proposal · 2026

# AI Leverage

## Turning $300/month into Scalable Output

<div style="display: flex; gap: 8px; margin-top: 24px; justify-content: center; flex-wrap: wrap;">
  <span style="background: #ff6b1a15; border: 1px solid #ff6b1a33; border-radius: 20px; padding: 4px 14px; font-family: 'Outfit'; font-size: 0.55em; color: #ff6b1aaa; font-weight: 400;">$300/mo Investment</span>
  <span style="background: #22c55e15; border: 1px solid #22c55e33; border-radius: 20px; padding: 4px 14px; font-family: 'Outfit'; font-size: 0.55em; color: #22c55eaa; font-weight: 400;">$50K–$200K+ Return</span>
  <span style="background: #ff6b1a15; border: 1px solid #ff6b1a33; border-radius: 20px; padding: 4px 14px; font-family: 'Outfit'; font-size: 0.55em; color: #ff6b1aaa; font-weight: 400;">Already Proven</span>
</div>

---

### The Problem

## Where we are today

<div style="display: flex; gap: 12px; margin-top: 20px;">
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 20px; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--r), transparent);"></div>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef444455" stroke-width="1.5" style="margin-bottom: 10px; display: block;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.8em; color: var(--t); margin-bottom: 6px;">Manual Processes</div>
    <div style="font-size: 0.68em; color: var(--body); line-height: 1.6;">Repetitive tasks done by hand. Every step is a potential error. Every hour is a cost.</div>
  </div>
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 20px; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--r), transparent);"></div>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef444455" stroke-width="1.5" style="margin-bottom: 10px; display: block;"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.8em; color: var(--t); margin-bottom: 6px;">Limited Dev Capacity</div>
    <div style="font-size: 0.68em; color: var(--body); line-height: 1.6;">Building internal tools requires developers. Developer time is scarce, expensive, and slow to access.</div>
  </div>
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 20px; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--r), transparent);"></div>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef444455" stroke-width="1.5" style="margin-bottom: 10px; display: block;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.8em; color: var(--t); margin-bottom: 6px;">Slow Iteration</div>
    <div style="font-size: 0.68em; color: var(--body); line-height: 1.6;">Weeks of vendor back-and-forth. Requirements lost in translation. Bugs fixed slowly.</div>
  </div>
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 20px; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--r), transparent);"></div>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef444455" stroke-width="1.5" style="margin-bottom: 10px; display: block;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.8em; color: var(--t); margin-bottom: 6px;">The Bottleneck</div>
    <div style="font-size: 0.68em; color: var(--body); line-height: 1.6;">Time and resources are the ceiling. Growth capped by capacity, not by ideas.</div>
  </div>
</div>

---

### The Opportunity

## What AI-powered internal development unlocks

<div style="display: flex; gap: 16px; margin-top: 22px;">
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 26px; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--a), transparent);"></div>
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--a)" stroke-width="1.2" style="margin-bottom: 14px; display: block;"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.85em; color: var(--t); margin-bottom: 8px;">Instant Development</div>
    <div style="font-size: 0.7em; color: var(--body); line-height: 1.7;">Build tools, automations, and scripts in hours. Describe the need — get working code immediately.</div>
  </div>
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 26px; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--a), transparent);"></div>
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--a)" stroke-width="1.2" style="margin-bottom: 14px; display: block;"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.85em; color: var(--t); margin-bottom: 8px;">Internal Dashboards</div>
    <div style="font-size: 0.7em; color: var(--body); line-height: 1.7;">Custom reporting and data views built to exact specs. No vendor, no compromise, no waiting.</div>
  </div>
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 26px; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--a), transparent);"></div>
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--a)" stroke-width="1.2" style="margin-bottom: 14px; display: block;"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.85em; color: var(--t); margin-bottom: 8px;">Workflow Automation</div>
    <div style="font-size: 0.7em; color: var(--body); line-height: 1.7;">Eliminate repetitive work. Scripts handle file processing, validation, and data transformation.</div>
  </div>
</div>

---

### The Cost

## What $300/month actually costs

<div style="display: flex; gap: 16px; margin-top: 22px;">
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 30px; text-align: center; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--a), transparent);"></div>
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.5em; color: var(--label); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px;">Per Year</div>
    <div style="font-family: 'Outfit'; font-size: 3.2em; font-weight: 800; color: var(--t); line-height: 1; white-space: nowrap;">$3,600</div>
    <div style="font-size: 0.68em; color: var(--body); margin-top: 10px;">Total annual investment</div>
  </div>
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 30px; text-align: center; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--a), transparent);"></div>
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.5em; color: var(--label); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px;">Per Day</div>
    <div style="font-family: 'Outfit'; font-size: 3.2em; font-weight: 800; color: var(--a); line-height: 1;">$10</div>
    <div style="font-size: 0.68em; color: var(--body); margin-top: 10px;">Less than a lunch</div>
  </div>
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 30px; text-align: center; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--g), transparent);"></div>
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.5em; color: var(--label); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px;">Per Hour of Active Use</div>
    <div style="font-family: 'Outfit'; font-size: 3.2em; font-weight: 800; color: var(--g); line-height: 1;">$1–$2</div>
    <div style="font-size: 0.68em; color: var(--body); margin-top: 10px;">Assuming 4–6 hours/day</div>
  </div>
</div>

<div style="margin-top: 20px; background: var(--s); border: 1px solid #1a1a1a; border-radius: 8px; padding: 14px 22px; font-size: 0.72em; color: var(--body); text-align: center;">
  At <strong>$1–$2/hour</strong>, you're paying less than a vending machine coffee for enterprise-grade development capability.
</div>

---

### Market Reality

## External developer vs. AI-powered internal dev

<div style="margin-top: 18px;">
  <div style="display: flex; padding: 10px 12px; border-bottom: 1px solid #0e0e0e; font-size: 0.62em; color: var(--label);">
    <div style="flex: 2.2;">Metric</div>
    <div style="flex: 1; text-align: center; color: var(--r);">External Dev</div>
    <div style="flex: 1; text-align: center; color: var(--g);">AI-Powered Internal</div>
  </div>
  <div class="row" style="display: flex; align-items: center; padding: 13px 12px; border-bottom: 1px solid #0a0a0a; font-size: 0.74em;">
    <div style="flex: 2.2; color: var(--body);">Hourly Rate</div>
    <div style="flex: 1; text-align: center; font-family: 'Outfit'; font-weight: 700; color: var(--r);">$75–$200/hr</div>
    <div style="flex: 1; text-align: center; font-family: 'Outfit'; font-weight: 700; color: var(--g);">$1–$2/hr</div>
  </div>
  <div class="row" style="display: flex; align-items: center; padding: 13px 12px; border-bottom: 1px solid #0a0a0a; font-size: 0.74em;">
    <div style="flex: 2.2; color: var(--body);">Cost per Internal Tool</div>
    <div style="flex: 1; text-align: center; font-family: 'Outfit'; font-weight: 700; color: var(--r);">$5,000–$15,000</div>
    <div style="flex: 1; text-align: center; font-family: 'Outfit'; font-weight: 700; color: var(--g);">~$0 marginal</div>
  </div>
  <div class="row" style="display: flex; align-items: center; padding: 13px 12px; border-bottom: 1px solid #0a0a0a; font-size: 0.74em;">
    <div style="flex: 2.2; color: var(--body);">Turnaround Time</div>
    <div style="flex: 1; text-align: center; font-family: 'Outfit'; font-weight: 700; color: var(--r);">Weeks–Months</div>
    <div style="flex: 1; text-align: center; font-family: 'Outfit'; font-weight: 700; color: var(--g);">Hours–Days</div>
  </div>
  <div class="row" style="display: flex; align-items: center; padding: 13px 12px; border-bottom: 1px solid #0a0a0a; font-size: 0.74em;">
    <div style="flex: 2.2; color: var(--body);">Revision / Change Cost</div>
    <div style="flex: 1; text-align: center; font-family: 'Outfit'; font-weight: 700; color: var(--r);">$75–$200/hr more</div>
    <div style="flex: 1; text-align: center; font-family: 'Outfit'; font-weight: 700; color: var(--g);">Included</div>
  </div>
  <div class="row" style="display: flex; align-items: center; padding: 13px 12px; font-size: 0.74em;">
    <div style="flex: 2.2; color: var(--body);">Domain Knowledge Ramp</div>
    <div style="flex: 1; text-align: center; font-family: 'Outfit'; font-weight: 700; color: var(--r);">Weeks of onboarding</div>
    <div style="flex: 1; text-align: center; font-family: 'Outfit'; font-weight: 700; color: var(--g);">Instant context</div>
  </div>
</div>

---

### Output Value

## Even 1–2 tools covers the full year

<div style="display: flex; gap: 24px; margin-top: 22px; align-items: stretch;">
  <div style="flex: 1.4;">
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: var(--label); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 14px;">1 tool/month @ market rate</div>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <div style="background: var(--s); border: 1px solid var(--b); border-radius: 8px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.7em; color: var(--body);">Conservative · 12 tools × $5K avg</span>
        <span style="font-family: 'Outfit'; font-weight: 700; font-size: 0.9em; color: var(--t);">$60K/yr</span>
      </div>
      <div style="background: var(--s); border: 1px solid var(--b); border-radius: 8px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.7em; color: var(--body);">Mid-range · 12 tools × $10K avg</span>
        <span style="font-family: 'Outfit'; font-weight: 700; font-size: 0.9em; color: var(--a);">$120K/yr</span>
      </div>
      <div style="background: var(--s); border: 1px solid var(--b); border-radius: 8px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.7em; color: var(--body);">Aggressive · 12 tools × $15K avg</span>
        <span style="font-family: 'Outfit'; font-weight: 700; font-size: 0.9em; color: var(--g);">$180K/yr</span>
      </div>
    </div>
  </div>
  <div style="width: 1px; background: var(--b);"></div>
  <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 0 16px;">
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: var(--label); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;">Break-even point</div>
    <div style="font-family: 'Outfit'; font-size: 5em; font-weight: 800; color: var(--g); line-height: 1;">1.2</div>
    <div style="font-size: 0.72em; color: var(--body); margin-top: 6px;">tools to cover the full year's cost</div>
    <div style="margin-top: 14px; font-size: 0.65em; color: var(--m);">Everything after that is pure leverage.</div>
  </div>
</div>

---

### Speed Advantage

## Build in hours. Ship in days.

<div style="display: flex; gap: 16px; margin-top: 20px;">
  <div style="flex: 1; background: #0a0404; border: 1px solid #2a0f0f; border-radius: 10px; padding: 22px;">
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: #cc7777; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">External Vendor · Typical Timeline</div>
    <div style="font-size: 0.7em; color: #bbb; line-height: 2.5;">
      <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 5px; height: 5px; border-radius: 50%; background: #884444; flex-shrink: 0;"></div>Week 1–2: Requirements meetings</div>
      <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 5px; height: 5px; border-radius: 50%; background: #884444; flex-shrink: 0;"></div>Week 3–4: Scope definition + contract</div>
      <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 5px; height: 5px; border-radius: 50%; background: #884444; flex-shrink: 0;"></div>Week 5–8: Initial build</div>
      <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 5px; height: 5px; border-radius: 50%; background: #884444; flex-shrink: 0;"></div>Week 9–10: Revisions + back-and-forth</div>
      <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 5px; height: 5px; border-radius: 50%; background: #884444; flex-shrink: 0;"></div>Week 11+: QA + handoff</div>
    </div>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 1.3em; color: var(--r); margin-top: 16px;">10–12 weeks</div>
  </div>
  <div style="flex: 1; background: #030a04; border: 1px solid #0d2a12; border-radius: 10px; padding: 22px;">
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: #44bb77; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">AI-Powered Internal · Actual Timeline</div>
    <div style="font-size: 0.7em; color: #bbb; line-height: 2.5;">
      <div style="display: flex; align-items: center; gap: 8px;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" style="flex-shrink:0;"><polyline points="18 15 12 9 6 15"/></svg>Hour 1: Scope defined, build started</div>
      <div style="display: flex; align-items: center; gap: 8px;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" style="flex-shrink:0;"><polyline points="18 15 12 9 6 15"/></svg>Hour 2–4: Working prototype</div>
      <div style="display: flex; align-items: center; gap: 8px;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" style="flex-shrink:0;"><polyline points="18 15 12 9 6 15"/></svg>Hour 5–6: Testing + edge cases handled</div>
      <div style="display: flex; align-items: center; gap: 8px;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" style="flex-shrink:0;"><polyline points="18 15 12 9 6 15"/></svg>Day 2: Refinements from feedback</div>
      <div style="display: flex; align-items: center; gap: 8px;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" style="flex-shrink:0;"><polyline points="18 15 12 9 6 15"/></svg>Day 3: Shipped and in use</div>
    </div>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 1.3em; color: var(--g); margin-top: 16px;">2–3 days</div>
  </div>
</div>

---

### Quality & Risk

## Consistent, repeatable, validated output

<div style="display: flex; flex-wrap: wrap; gap: 14px; margin-top: 22px;">
  <div style="flex: 1; min-width: 46%; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 20px; display: flex; gap: 14px; align-items: flex-start;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.5" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <div>
      <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.8em; color: var(--t); margin-bottom: 5px;">Consistent Logic</div>
      <div style="font-size: 0.69em; color: var(--body); line-height: 1.6;">Same rules applied every run. No human variance, no Monday morning mistakes.</div>
    </div>
  </div>
  <div style="flex: 1; min-width: 46%; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 20px; display: flex; gap: 14px; align-items: flex-start;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.5" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <div>
      <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.8em; color: var(--t); margin-bottom: 5px;">Repeatable Workflows</div>
      <div style="font-size: 0.69em; color: var(--body); line-height: 1.6;">Build once, run indefinitely. No re-teaching, no tribal knowledge loss.</div>
    </div>
  </div>
  <div style="flex: 1; min-width: 46%; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 20px; display: flex; gap: 14px; align-items: flex-start;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.5" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <div>
      <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.8em; color: var(--t); margin-bottom: 5px;">Reduced Manual Errors</div>
      <div style="font-size: 0.69em; color: var(--body); line-height: 1.6;">Automated validation catches issues before they cost time to diagnose and fix.</div>
    </div>
  </div>
  <div style="flex: 1; min-width: 46%; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 20px; display: flex; gap: 14px; align-items: flex-start;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.5" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <div>
      <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.8em; color: var(--t); margin-bottom: 5px;">Built-in Testing</div>
      <div style="font-size: 0.69em; color: var(--body); line-height: 1.6;">Edge cases tested during build. Problems found before deployment, not after.</div>
    </div>
  </div>
</div>

---

### The Principle

## Leverage: small input, massive output

<div style="display: flex; gap: 36px; align-items: center; margin-top: 22px;">
  <div style="flex: 1.2;">
    <div style="margin-bottom: 20px;">
      <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: var(--label); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px;">Without AI — Linear</div>
      <div style="display: flex; align-items: center; gap: 10px; font-size: 0.72em; color: var(--body);">
        <div style="width: 70px; height: 7px; background: #222; border-radius: 4px; flex-shrink: 0;"></div>
        <span>1 person → 1 unit of output</span>
      </div>
      <div style="font-size: 0.62em; color: var(--m); margin-top: 6px; padding-left: 80px;">Effort always equals output. Every bottleneck is permanent.</div>
    </div>
    <div>
      <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: var(--label); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px;">With AI — Exponential</div>
      <div style="display: flex; align-items: center; gap: 10px; font-size: 0.72em; color: var(--body); margin-bottom: 8px;">
        <div style="width: 70px; height: 7px; background: var(--a); border-radius: 4px; flex-shrink: 0;"></div>
        <span>1 person + $300/mo</span>
      </div>
      <div style="display: flex; align-items: center; gap: 10px; font-size: 0.72em; color: var(--g);">
        <div style="width: 310px; height: 7px; background: linear-gradient(90deg, var(--a), var(--g)); border-radius: 4px; flex-shrink: 0;"></div>
        <span>10–20× output</span>
      </div>
      <div style="font-size: 0.62em; color: var(--a); margin-top: 8px; padding-left: 0;">Effort is decoupled from output. Same person, exponentially more.</div>
    </div>
  </div>
  <div style="text-align: center; flex-shrink: 0;">
    <div style="font-family: 'Outfit'; font-size: 0.52em; font-weight: 600; color: var(--label); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;">Output Multiplier</div>
    <svg width="190" height="190" viewBox="0 0 190 190">
      <circle cx="95" cy="95" r="80" fill="none" stroke="#111" stroke-width="10"/>
      <circle cx="95" cy="95" r="80" fill="none" stroke="url(#leverGrad)" stroke-width="10" stroke-dasharray="503" stroke-dashoffset="50" stroke-linecap="round" transform="rotate(-90 95 95)"/>
      <defs>
        <linearGradient id="leverGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#ff6b1a"/>
          <stop offset="100%" stop-color="#22c55e"/>
        </linearGradient>
      </defs>
      <text x="95" y="87" text-anchor="middle" fill="#fff" font-family="Outfit" font-size="38" font-weight="800">90%</text>
      <text x="95" y="110" text-anchor="middle" fill="#444" font-family="Outfit" font-size="10" font-weight="600" letter-spacing="1.5">EFFORT SAVED</text>
    </svg>
  </div>
</div>

---

### Real Use Cases

## Already working. Already proven.

<div style="display: flex; gap: 12px; margin-top: 20px;">
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 22px; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--a), transparent);"></div>
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: var(--a); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Tool 01</div>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.82em; color: var(--t); margin-bottom: 8px;">Data Validation</div>
    <div style="font-size: 0.66em; color: var(--body); line-height: 1.7;">Flag errors, check formats, verify required fields across large files. Seconds instead of hours of manual review.</div>
  </div>
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 22px; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--a), transparent);"></div>
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: var(--a); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Tool 02</div>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.82em; color: var(--t); margin-bottom: 8px;">File Transformation</div>
    <div style="font-size: 0.66em; color: var(--body); line-height: 1.7;">Convert, reformat, and restructure data between systems. What took a full day now takes a minute.</div>
  </div>
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 22px; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--a), transparent);"></div>
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: var(--a); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Tool 03</div>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.82em; color: var(--t); margin-bottom: 8px;">Workflow Automation</div>
    <div style="font-size: 0.66em; color: var(--body); line-height: 1.7;">Multi-step repetitive tasks eliminated. Scripts run on demand or scheduled — no human in the loop.</div>
  </div>
  <div style="flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 10px; padding: 22px; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--a), transparent);"></div>
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: var(--a); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Tool 04</div>
    <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.82em; color: var(--t); margin-bottom: 8px;">Internal Apps</div>
    <div style="font-size: 0.66em; color: var(--body); line-height: 1.7;">Custom dashboards and utilities built to exact spec. No vendor trade-offs. No waiting on a sprint cycle.</div>
  </div>
</div>

---

### The Stack

## Why Claude + OpenAI — not just one

<div style="display: flex; gap: 2px; margin-top: 20px;">
  <div style="flex: 1; background: #080510; border: 1px solid #1a1030; border-radius: 12px 0 0 12px; padding: 28px; border-top: 3px solid var(--a);">
    <div style="font-family: 'Outfit'; font-weight: 800; font-size: 1.1em; color: var(--a); margin-bottom: 18px;">Claude</div>
    <div style="font-size: 0.7em; color: var(--body); line-height: 2.3;">
      <div>· Deep reasoning + complex logic</div>
      <div>· Long-form analysis and documentation</div>
      <div>· Nuanced, context-heavy problem solving</div>
      <div>· Structured output and knowledge work</div>
    </div>
    <div style="margin-top: 14px; font-size: 0.65em; color: var(--a); font-weight: 300;">Strength: thinking through hard problems</div>
  </div>
  <div style="flex: 1; background: #050810; border: 1px solid #10203a; border-radius: 0 12px 12px 0; padding: 28px; border-top: 3px solid #4a9eff;">
    <div style="font-family: 'Outfit'; font-weight: 800; font-size: 1.1em; color: #4a9eff; margin-bottom: 18px;">OpenAI / GPT</div>
    <div style="font-size: 0.7em; color: var(--body); line-height: 2.3;">
      <div>· Fast code generation + debugging</div>
      <div>· Broad training — wide coverage</div>
      <div>· API integration + tool chaining</div>
      <div>· Rapid iteration on execution tasks</div>
    </div>
    <div style="margin-top: 14px; font-size: 0.65em; color: #4a9eff; font-weight: 300;">Strength: moving fast and executing</div>
  </div>
</div>

<div style="margin-top: 16px; font-size: 0.7em; color: var(--m); text-align: center; padding: 12px 20px; background: var(--s); border-radius: 8px; border: 1px solid var(--b);">
  Cross-validating outputs between both tools reduces errors and consistently produces higher quality final results.
</div>

---

### Removing the Ceiling

## The current constraint: usage caps

<div style="display: flex; gap: 16px; margin-top: 22px;">
  <div style="flex: 1; background: #0a0404; border: 1px solid #2a0f0f; border-radius: 10px; padding: 26px;">
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: #cc7777; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">With Current Limits</div>
    <div style="font-size: 0.7em; color: #bbb; line-height: 2.4;">
      <div>· Forced pauses mid-development</div>
      <div>· Incomplete testing cycles</div>
      <div>· Context and momentum lost between sessions</div>
      <div>· Complex builds stretch across multiple days</div>
      <div>· Quality drops every time the flow breaks</div>
    </div>
    <div style="margin-top: 16px; font-family: 'Outfit'; font-weight: 600; font-size: 0.65em; color: var(--r);">Capability artificially constrained</div>
  </div>
  <div style="flex: 1; background: #030a04; border: 1px solid #0d2a12; border-radius: 10px; padding: 26px;">
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: #44bb77; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">With Full Access ($300/mo)</div>
    <div style="font-size: 0.7em; color: #bbb; line-height: 2.4;">
      <div>· Continuous, uninterrupted development</div>
      <div>· Complete testing every single time</div>
      <div>· Full context maintained across sessions</div>
      <div>· Complex builds completed same-day</div>
      <div>· No forced slowdowns. Full throughput.</div>
    </div>
    <div style="margin-top: 16px; font-family: 'Outfit'; font-weight: 600; font-size: 0.65em; color: var(--g);">$300/month removes the ceiling</div>
  </div>
</div>

---

### ROI Summary

## The numbers

<div style="margin-top: 14px;">
  <div style="display: flex; gap: 14px; align-items: flex-end; height: 200px; padding-bottom: 20px; border-bottom: 1px solid #0e0e0e; padding-left: 10px;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
      <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.6em; color: var(--body);">$3.6K</div>
      <div style="width: 70px; background: linear-gradient(180deg, #333, #1a1a1a); border-radius: 4px 4px 0 0; height: 6px;"></div>
      <div style="font-family: 'Outfit'; font-size: 0.48em; color: var(--label); text-align:center;">Cost</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
      <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.6em; color: var(--y);">$50K+</div>
      <div style="width: 70px; background: linear-gradient(180deg, var(--y), #9a6800); border-radius: 4px 4px 0 0; height: 70px;"></div>
      <div style="font-family: 'Outfit'; font-size: 0.48em; color: var(--label); text-align:center;">Conservative</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
      <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.6em; color: var(--a);">$100K+</div>
      <div style="width: 70px; background: linear-gradient(180deg, var(--a), #993d00); border-radius: 4px 4px 0 0; height: 130px;"></div>
      <div style="font-family: 'Outfit'; font-size: 0.48em; color: var(--label); text-align:center;">Mid-Range</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
      <div style="font-family: 'Outfit'; font-weight: 700; font-size: 0.6em; color: var(--g);">$200K+</div>
      <div style="width: 70px; background: linear-gradient(180deg, var(--g), #166534); border-radius: 4px 4px 0 0; height: 174px;"></div>
      <div style="font-family: 'Outfit'; font-size: 0.48em; color: var(--label); text-align:center;">Aggressive</div>
    </div>
    <div style="flex: 1; padding-left: 20px; padding-bottom: 20px; display: flex; flex-direction: column; justify-content: flex-end;">
      <div style="font-size: 0.67em; color: var(--body); line-height: 2.1;">
        <div><span style="color: var(--y);">●</span> Conservative: 10 tools × $5K market rate</div>
        <div><span style="color: var(--a);">●</span> Mid: 10 tools × $10K market rate</div>
        <div><span style="color: var(--g);">●</span> Aggressive: tools + automation time savings</div>
        <div style="margin-top: 8px; font-size: 0.9em; color: var(--m);">Each tool built compounds. Assets accumulate.</div>
      </div>
    </div>
  </div>
  <div style="display: flex; gap: 0; margin-top: 16px;">
    <div style="flex: 1; text-align: center; border-right: 1px solid var(--b);">
      <div style="font-family: 'Outfit'; font-weight: 800; font-size: 2em; color: var(--g);">14–55x</div>
      <div style="font-size: 0.57em; color: var(--label); margin-top: 2px;">Conservative ROI multiple</div>
    </div>
    <div style="flex: 1; text-align: center; border-right: 1px solid var(--b);">
      <div style="font-family: 'Outfit'; font-weight: 800; font-size: 2em; color: var(--a);">Year 2+</div>
      <div style="font-size: 0.57em; color: var(--label); margin-top: 2px;">Compounds as toolset grows</div>
    </div>
    <div style="flex: 1; text-align: center;">
      <div style="font-family: 'Outfit'; font-weight: 800; font-size: 2em; color: var(--t);">$10/day</div>
      <div style="font-size: 0.57em; color: var(--label); margin-top: 2px;">Total cost to generate all of this</div>
    </div>
  </div>
</div>

---

### The Decision

## Risk vs. Reward

<div style="display: flex; gap: 16px; margin-top: 22px;">
  <div style="flex: 1; background: #0a0404; border: 1px solid #2a0f0f; border-radius: 12px; padding: 30px; text-align: center;">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ef444444" stroke-width="1.2" style="margin-bottom: 14px; display: block; margin-left: auto; margin-right: auto;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: #cc7777; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 14px;">Maximum Downside</div>
    <div style="font-family: 'Outfit'; font-weight: 800; font-size: 2.8em; color: var(--r); line-height: 1; margin-bottom: 12px;">$3,600</div>
    <div style="font-size: 0.7em; color: #bbb; line-height: 1.8;">The full year's cost.<br>That's the floor. That's the total loss.<br>Cancel anytime.</div>
  </div>
  <div style="flex: 1; background: #030a04; border: 1px solid #0d2a12; border-radius: 12px; padding: 30px; text-align: center;">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e88" stroke-width="1.2" style="margin-bottom: 14px; display: block; margin-left: auto; margin-right: auto;"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    <div style="font-family: 'Outfit'; font-weight: 600; font-size: 0.52em; color: #44bb77; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 14px;">Realistic Upside</div>
    <div style="font-family: 'Outfit'; font-weight: 800; font-size: 2.8em; color: var(--g); line-height: 1; margin-bottom: 12px;">$50K–$200K+</div>
    <div style="font-size: 0.7em; color: #bbb; line-height: 1.8;">Permanent internal tools.<br>Eliminated external dev costs.<br>Compounding efficiency gains.</div>
  </div>
</div>

<div style="margin-top: 18px; text-align: center; font-size: 0.72em; color: var(--m); padding: 13px 20px; background: var(--s); border-radius: 8px; border: 1px solid var(--b);">
  This is not a speculative bet. The capability is already demonstrated. This is a <strong>scaling decision</strong>.
</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->

![bg brightness:0.07](https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400)

# Small investment.

# Massive leverage.

<div style="font-family: 'Raleway'; font-weight: 100; font-size: 1em; color: #ffffff44; margin-top: 14px; letter-spacing: 0.05em;">Already proven — now ready to scale.</div>

<div style="display: flex; gap: 10px; margin-top: 30px; justify-content: center; flex-wrap: wrap;">
  <span style="background: #ff6b1a15; border: 1px solid #ff6b1a33; border-radius: 20px; padding: 6px 18px; font-family: 'Outfit'; font-size: 0.55em; color: #ff6b1aaa; font-weight: 400;">$300 / month</span>
  <span style="background: #22c55e15; border: 1px solid #22c55e33; border-radius: 20px; padding: 6px 18px; font-family: 'Outfit'; font-size: 0.55em; color: #22c55eaa; font-weight: 400;">Zero procurement risk</span>
  <span style="background: #ff6b1a15; border: 1px solid #ff6b1a33; border-radius: 20px; padding: 6px 18px; font-family: 'Outfit'; font-size: 0.55em; color: #ff6b1aaa; font-weight: 400;">Cancel anytime</span>
  <span style="background: #22c55e15; border: 1px solid #22c55e33; border-radius: 20px; padding: 6px 18px; font-family: 'Outfit'; font-size: 0.55em; color: #22c55eaa; font-weight: 400;">ROI proven on day one</span>
</div>
