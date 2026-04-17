---
marp: true
theme: default
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  :root {
    --cream: #f2f1ed;
    --cream2: #ebeae5;
    --cream3: #e6e5e0;
    --warm-black: #26251e;
    --accent: #f54e00;
    --accent-soft: rgba(245,78,0,0.1);
    --accent-border: rgba(245,78,0,0.25);
    --muted: rgba(38,37,30,0.55);
    --muted2: rgba(38,37,30,0.38);
    --muted3: rgba(38,37,30,0.24);
    --card: #ffffff;
    --surface: #ebeae5;
    --border: rgba(38,37,30,0.1);
    --border2: rgba(38,37,30,0.2);
    --success: #1f8a65;
    --success-soft: rgba(31,138,101,0.12);
    --warning: #c08532;
    --warning-soft: rgba(192,133,50,0.12);
    --danger: #cf2d56;
    --danger-soft: rgba(207,45,86,0.1);
    --blue: #9fbbe0;
    --green: #9fc9a2;
    --peach: #dfa88f;
    --lavender: #c0a8dd;
  }

  section {
    background: var(--cream);
    color: var(--warm-black);
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
    padding: 48px 64px;
    line-height: 1.5;
  }

  section::after {
    font-size: 0.48em;
    color: var(--muted3);
    font-family: 'Inter';
  }

  h1 {
    font-weight: 800;
    font-size: 2.5em;
    color: var(--warm-black);
    letter-spacing: -0.03em;
    line-height: 1.08;
    margin: 0 0 4px;
  }

  h2 {
    font-weight: 300;
    font-size: 1.0em;
    color: var(--muted);
    margin: 0 0 20px;
    letter-spacing: -0.01em;
  }

  h3 {
    font-weight: 600;
    font-size: 0.5em;
    color: var(--muted2);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin: 0 0 8px;
  }

  strong { color: var(--accent); font-weight: 600; }

  section.lead {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(155deg, #f5f4ef 0%, #ece9e2 100%);
  }

  section.lead h1 { font-size: 3.0em; }
  section.lead h2 { font-size: 1.1em; }

  section.dark {
    background: var(--warm-black);
    color: #f2f1ed;
  }
  section.dark h1 { color: #f2f1ed; }
  section.dark h2 { color: rgba(242,241,237,0.55); }
  section.dark h3 { color: rgba(242,241,237,0.35); }
  section.dark::after { color: rgba(242,241,237,0.2); }

  a { color: var(--accent); text-decoration: none; font-weight: 500; }
  a:hover { color: var(--danger); text-decoration: underline; }

  details {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 11px 15px;
    margin-top: 7px;
  }
  details summary {
    color: var(--accent);
    font-weight: 600;
    font-size: 0.76em;
    cursor: pointer;
    user-select: none;
    list-style: none;
  }
  details summary::marker { display: none; }
  details p, details li {
    color: var(--muted);
    font-size: 0.7em;
    margin-top: 7px;
    line-height: 1.7;
  }
  details ul { padding-left: 14px; margin-top: 6px; }

footer: ''
---

<!-- _class: lead -->
<!-- _paginate: false -->

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous">

<div style="width:72px;height:72px;background:var(--accent);border-radius:20px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;box-shadow:rgba(245,78,0,0.3) 0px 8px 28px;">
<i class="fa-solid fa-briefcase" style="font-size:28px;color:#fff;"></i>
</div>

# Welcome to Transamerica

## Data Consultant · Onboarding Guide

<div style="display:flex;gap:8px;justify-content:center;margin-top:18px;flex-wrap:wrap;">
<span style="display:inline-flex;align-items:center;gap:5px;background:#9fbbe022;border:1px solid #9fbbe066;border-radius:9999px;padding:5px 13px;font-size:0.56em;font-weight:600;color:#5a87b8;"><i class="fa-solid fa-hourglass-start"></i> Pre-Start</span>
<span style="display:inline-flex;align-items:center;gap:5px;background:#9fc9a222;border:1px solid #9fc9a266;border-radius:9999px;padding:5px 13px;font-size:0.56em;font-weight:600;color:#2d7a42;"><i class="fa-solid fa-sun"></i> Day 1</span>
<span style="display:inline-flex;align-items:center;gap:5px;background:#dfa88f22;border:1px solid #dfa88f66;border-radius:9999px;padding:5px 13px;font-size:0.56em;font-weight:600;color:#a05f3a;"><i class="fa-solid fa-calendar-week"></i> Week 1</span>
<span style="display:inline-flex;align-items:center;gap:5px;background:#c0a8dd22;border:1px solid #c0a8dd66;border-radius:9999px;padding:5px 13px;font-size:0.56em;font-weight:600;color:#7a52aa;"><i class="fa-solid fa-calendar-days"></i> Week 2</span>
<span style="display:inline-flex;align-items:center;gap:5px;background:var(--accent-soft);border:1px solid var(--accent-border);border-radius:9999px;padding:5px 13px;font-size:0.56em;font-weight:600;color:var(--accent);"><i class="fa-solid fa-calendar-check"></i> Month 1</span>
</div>

<div style="margin-top:28px;">
<a href="#3" style="display:inline-flex;align-items:center;gap:8px;background:var(--warm-black);color:#f2f1ed;border-radius:9999px;padding:10px 22px;font-size:0.65em;font-weight:600;text-decoration:none;">Begin Your Journey <i class="fa-solid fa-arrow-right"></i></a>
</div>

---

<!-- _paginate: false -->

### Navigation

# What's Inside

## Everything you need to hit the ground running as a new DC.

<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:4px;">
<a href="#3" style="display:block;background:var(--card);border-radius:12px;border:1px solid var(--border);padding:16px 18px;box-shadow:rgba(0,0,0,0.05) 0px 2px 10px;text-decoration:none;color:inherit;transition:box-shadow 0.2s;">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
<div style="width:36px;height:36px;background:#9fbbe022;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-route" style="font-size:15px;color:#5a87b8;"></i>
</div>
<div style="font-weight:700;font-size:0.78em;color:var(--warm-black);">Your Journey</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">The 5-phase onboarding roadmap from pre-start to full ramp.</div>
</a>
<a href="#4" style="display:block;background:var(--card);border-radius:12px;border:1px solid var(--border);padding:16px 18px;box-shadow:rgba(0,0,0,0.05) 0px 2px 10px;text-decoration:none;color:inherit;">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
<div style="width:36px;height:36px;background:#9fc9a222;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-clock" style="font-size:15px;color:#2d7a42;"></i>
</div>
<div style="font-weight:700;font-size:0.78em;color:var(--warm-black);">Phase Guides</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">What to do before you arrive, Day 1, Week 1, Week 2, and Month 1.</div>
</a>
<a href="#9" style="display:block;background:var(--card);border-radius:12px;border:1px solid var(--border);padding:16px 18px;box-shadow:rgba(0,0,0,0.05) 0px 2px 10px;text-decoration:none;color:inherit;">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
<div style="width:36px;height:36px;background:var(--accent-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-laptop" style="font-size:15px;color:var(--accent);"></i>
</div>
<div style="font-weight:700;font-size:0.78em;color:var(--warm-black);">Setup &amp; Access</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">Every system, credential, and account you'll need.</div>
</a>
<a href="#10" style="display:block;background:var(--card);border-radius:12px;border:1px solid var(--border);padding:16px 18px;box-shadow:rgba(0,0,0,0.05) 0px 2px 10px;text-decoration:none;color:inherit;">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
<div style="width:36px;height:36px;background:#c0a8dd22;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-book-open" style="font-size:15px;color:#7a52aa;"></i>
</div>
<div style="font-weight:700;font-size:0.78em;color:var(--warm-black);">Core Training</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">AQT, Census, EDS, Informatica, PRD &amp; Fund Mapping.</div>
</a>
<a href="#16" style="display:block;background:var(--card);border-radius:12px;border:1px solid var(--border);padding:16px 18px;box-shadow:rgba(0,0,0,0.05) 0px 2px 10px;text-decoration:none;color:inherit;">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
<div style="width:36px;height:36px;background:#dfa88f22;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-graduation-cap" style="font-size:15px;color:#a05f3a;"></i>
</div>
<div style="font-weight:700;font-size:0.78em;color:var(--warm-black);">Advanced Topics</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">Payroll, Elections, Eligibility, Deferrals &amp; Roth/Basis.</div>
</a>
<a href="#17" style="display:block;background:var(--card);border-radius:12px;border:1px solid var(--border);padding:16px 18px;box-shadow:rgba(0,0,0,0.05) 0px 2px 10px;text-decoration:none;color:inherit;">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
<div style="width:36px;height:36px;background:var(--success-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-people-group" style="font-size:15px;color:var(--success);"></i>
</div>
<div style="font-weight:700;font-size:0.78em;color:var(--warm-black);">Your Support Team</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">Manager, IT, HR, and senior DCs — who to go to for what.</div>
</a>
</div>

---

### Your Onboarding Roadmap

# The 5-Phase Journey

## From offer accepted to fully ramped — here's the path ahead.

<div style="display:flex;align-items:stretch;gap:0;margin-top:8px;">
<div style="flex:1;background:var(--card);border-radius:12px 0 0 12px;border:1px solid var(--border);border-right:none;padding:18px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
<div style="width:32px;height:32px;background:#9fbbe0;border-radius:9999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-hourglass-start" style="font-size:13px;color:#fff;"></i>
</div>
<div style="font-weight:700;font-size:0.72em;">Pre-Start</div>
</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.7;">IT setup, accounts, workstation, welcome email from your manager.</div>
<div style="margin-top:10px;height:3px;background:#9fbbe055;border-radius:3px;overflow:hidden;">
<div style="width:100%;height:100%;background:#9fbbe0;border-radius:3px;"></div>
</div>
<div style="font-size:0.52em;color:#5a87b8;margin-top:4px;font-weight:600;">Before Day 1</div>
</div>
<div style="flex:1;background:var(--card);border:1px solid var(--border);border-right:none;padding:18px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
<div style="width:32px;height:32px;background:#9fc9a2;border-radius:9999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-sun" style="font-size:13px;color:#fff;"></i>
</div>
<div style="font-weight:700;font-size:0.72em;">Day 1</div>
</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.7;">MFA, VPN, Teams setup, I-9, team intro, meet your manager.</div>
<div style="margin-top:10px;height:3px;background:#9fc9a255;border-radius:3px;overflow:hidden;">
<div style="width:100%;height:100%;background:#9fc9a2;border-radius:3px;"></div>
</div>
<div style="font-size:0.52em;color:#2d7a42;margin-top:4px;font-weight:600;">Your first day</div>
</div>
<div style="flex:1;background:var(--card);border:1px solid var(--border);border-right:none;padding:18px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
<div style="width:32px;height:32px;background:#dfa88f;border-radius:9999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-calendar-week" style="font-size:13px;color:#fff;"></i>
</div>
<div style="font-weight:700;font-size:0.72em;">Week 1</div>
</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.7;">AQT login, census review, PRD reading, workflow walkthrough, check-in.</div>
<div style="margin-top:10px;height:3px;background:#dfa88f55;border-radius:3px;overflow:hidden;">
<div style="width:100%;height:100%;background:#dfa88f;border-radius:3px;"></div>
</div>
<div style="font-size:0.52em;color:#a05f3a;margin-top:4px;font-weight:600;">Foundation</div>
</div>
<div style="flex:1;background:var(--card);border:1px solid var(--border);border-right:none;padding:18px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
<div style="width:32px;height:32px;background:#c0a8dd;border-radius:9999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-calendar-days" style="font-size:13px;color:#fff;"></i>
</div>
<div style="font-weight:700;font-size:0.72em;">Week 2</div>
</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.7;">EDS, Informatica, source &amp; fund mapping, shadow session with senior DC.</div>
<div style="margin-top:10px;height:3px;background:#c0a8dd55;border-radius:3px;overflow:hidden;">
<div style="width:100%;height:100%;background:#c0a8dd;border-radius:3px;"></div>
</div>
<div style="font-size:0.52em;color:#7a52aa;margin-top:4px;font-weight:600;">Going deeper</div>
</div>
<div style="flex:1;background:var(--card);border-radius:0 12px 12px 0;border:1px solid var(--border);padding:18px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
<div style="width:32px;height:32px;background:var(--accent);border-radius:9999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-calendar-check" style="font-size:13px;color:#fff;"></i>
</div>
<div style="font-weight:700;font-size:0.72em;">Month 1</div>
</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.7;">Payroll, elections, eligibility, deferrals, Roth/basis &amp; 30-day review.</div>
<div style="margin-top:10px;height:3px;background:var(--accent-soft);border-radius:3px;overflow:hidden;">
<div style="width:100%;height:100%;background:var(--accent);border-radius:3px;"></div>
</div>
<div style="font-size:0.52em;color:var(--accent);margin-top:4px;font-weight:600;">Full ramp</div>
</div>
</div>

<div style="margin-top:16px;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:12px 18px;display:flex;align-items:center;gap:12px;">
<i class="fa-solid fa-circle-info" style="color:var(--accent);font-size:14px;flex-shrink:0;"></i>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">Your manager tracks your progress across all five phases. If anything is blocked or unclear, they're your first call. Check-ins happen weekly through Month 1.</div>
</div>

---

### Phase 1

# Before You Arrive

## Pre-start tasks mostly owned by IT — but here's what to know.

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:4px;">
<div style="display:flex;gap:12px;align-items:flex-start;background:var(--card);border-radius:12px;border:1px solid var(--border);padding:14px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="width:36px;height:36px;background:#9fbbe022;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
<i class="fa-solid fa-user" style="font-size:14px;color:#5a87b8;"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.74em;margin-bottom:3px;">Domain Account Created</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">Your Active Directory account will be live and ready for your first login. Owned by IT.</div>
</div>
</div>
<div style="display:flex;gap:12px;align-items:flex-start;background:var(--card);border-radius:12px;border:1px solid var(--border);padding:14px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="width:36px;height:36px;background:#9fbbe022;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
<i class="fa-solid fa-envelope" style="font-size:14px;color:#5a87b8;"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.74em;margin-bottom:3px;">Email Address Assigned</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">Your corporate email account will be created and confirmed before Day 1. Owned by IT.</div>
</div>
</div>
<div style="display:flex;gap:12px;align-items:flex-start;background:var(--card);border-radius:12px;border:1px solid var(--border);padding:14px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="width:36px;height:36px;background:#9fc9a222;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
<i class="fa-solid fa-laptop" style="font-size:14px;color:#2d7a42;"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.74em;margin-bottom:3px;">Workstation Assigned &amp; Configured</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">Your primary machine will be ready for full training day use. Owned by IT.</div>
</div>
</div>
<div style="display:flex;gap:12px;align-items:flex-start;background:var(--card);border-radius:12px;border:1px solid var(--border);padding:14px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="width:36px;height:36px;background:#9fc9a222;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
<i class="fa-solid fa-hard-drive" style="font-size:14px;color:#2d7a42;"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.74em;margin-bottom:3px;">Network Drives Mapped</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">Shared folders and legacy paths will be available as expected. Owned by IT.</div>
</div>
</div>
<div style="display:flex;gap:12px;align-items:flex-start;background:var(--card);border-radius:12px;border:1px solid var(--border);padding:14px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="width:36px;height:36px;background:var(--accent-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
<i class="fa-solid fa-database" style="font-size:14px;color:var(--accent);"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.74em;margin-bottom:3px;">AQT Account Provisioned</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">AQT access with the expected role and environment. Your manager validates permissions on Day 1.</div>
</div>
</div>
<div style="display:flex;gap:12px;align-items:flex-start;background:#fff8f5;border-radius:12px;border:1px solid var(--accent-border);padding:14px 16px;box-shadow:rgba(245,78,0,0.08) 0px 2px 8px;">
<div style="width:36px;height:36px;background:var(--accent-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
<i class="fa-solid fa-paper-plane" style="font-size:14px;color:var(--accent);"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.74em;margin-bottom:3px;">Manager Welcome Note Sent</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.6;">You'll receive a prep email from your manager before Day 1 with what to expect and who to contact.</div>
</div>
</div>
</div>

---

### Phase 2

# Day 1 — Your First Day

## You've got this. Here's what the day looks like.

<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:4px;">
<div>
<div style="font-size:0.58em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:10px;display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-circle" style="color:#9fc9a2;font-size:7px;"></i> ACCESS &amp; SECURITY</div>
<div style="display:flex;flex-direction:column;gap:7px;">
<div style="display:flex;align-items:center;gap:10px;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 14px;">
<i class="fa-solid fa-shield-halved" style="font-size:15px;color:#5a87b8;width:20px;text-align:center;flex-shrink:0;"></i>
<div>
<div style="font-weight:600;font-size:0.72em;">MFA Enrollment</div>
<div style="font-size:0.58em;color:var(--muted);">Primary sign-in and multi-factor setup tested</div>
</div>
</div>
<div style="display:flex;align-items:center;gap:10px;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 14px;">
<i class="fa-solid fa-wifi" style="font-size:15px;color:#5a87b8;width:20px;text-align:center;flex-shrink:0;"></i>
<div>
<div style="font-weight:600;font-size:0.72em;">VPN Credentials Issued</div>
<div style="font-size:0.58em;color:var(--muted);">Remote access confirmed for hybrid work</div>
</div>
</div>
<div style="display:flex;align-items:center;gap:10px;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 14px;">
<i class="fa-solid fa-key" style="font-size:15px;color:#5a87b8;width:20px;text-align:center;flex-shrink:0;"></i>
<div>
<div style="font-weight:600;font-size:0.72em;">Office Suite Signed In</div>
<div style="font-size:0.58em;color:var(--muted);">Licensed and signed in with corporate credentials</div>
</div>
</div>
<div style="display:flex;align-items:center;gap:10px;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 14px;">
<i class="fa-solid fa-folder-open" style="font-size:15px;color:#5a87b8;width:20px;text-align:center;flex-shrink:0;"></i>
<div>
<div style="font-weight:600;font-size:0.72em;">SharePoint Access Confirmed</div>
<div style="font-size:0.58em;color:var(--muted);">Team sites and documentation libraries available</div>
</div>
</div>
</div>
</div>
<div>
<div style="font-size:0.58em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:10px;display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-circle" style="color:var(--accent);font-size:7px;"></i> PEOPLE &amp; ORIENTATION</div>
<div style="display:flex;flex-direction:column;gap:7px;">
<div style="display:flex;align-items:center;gap:10px;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 14px;">
<i class="fa-solid fa-comments" style="font-size:15px;color:var(--accent);width:20px;text-align:center;flex-shrink:0;"></i>
<div>
<div style="font-weight:600;font-size:0.72em;">Teams Channels Joined</div>
<div style="font-size:0.58em;color:var(--muted);">Required chats, channels, and lists ready</div>
</div>
</div>
<div style="display:flex;align-items:center;gap:10px;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 14px;">
<i class="fa-solid fa-handshake" style="font-size:15px;color:var(--accent);width:20px;text-align:center;flex-shrink:0;"></i>
<div>
<div style="font-weight:600;font-size:0.72em;">Team Introduction</div>
<div style="font-size:0.58em;color:var(--muted);">Meet your immediate team and learn who does what</div>
</div>
</div>
<div style="display:flex;align-items:center;gap:10px;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 14px;">
<i class="fa-solid fa-database" style="font-size:15px;color:var(--accent);width:20px;text-align:center;flex-shrink:0;"></i>
<div>
<div style="font-weight:600;font-size:0.72em;">AQT Permissions Validated</div>
<div style="font-size:0.58em;color:var(--muted);">Manager validates correct schema access</div>
</div>
</div>
<div style="display:flex;align-items:center;gap:10px;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 14px;">
<i class="fa-solid fa-id-card" style="font-size:15px;color:var(--accent);width:20px;text-align:center;flex-shrink:0;"></i>
<div>
<div style="font-weight:600;font-size:0.72em;">I-9 Documentation</div>
<div style="font-size:0.58em;color:var(--muted);">Identity documents confirmed by HR — required deadline</div>
</div>
</div>
</div>
</div>
</div>

<div style="margin-top:12px;background:var(--success-soft);border-radius:10px;border:1px solid rgba(31,138,101,0.2);padding:10px 16px;display:flex;align-items:center;gap:10px;">
<i class="fa-solid fa-circle-check" style="color:var(--success);font-size:14px;flex-shrink:0;"></i>
<div style="font-size:0.62em;color:var(--warm-black);">Day 1 isn't about knowing everything — it's about getting connected. Your manager is with you the whole day.</div>
</div>

---

### Phase 3

# Week 1 — Foundation Week

## You'll get your first look at the DC workflow and key systems.

<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:11px;margin-top:6px;">
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);border-top:3px solid #dfa88f;padding:15px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
<i class="fa-solid fa-database" style="font-size:18px;color:#dfa88f;"></i>
<div style="font-weight:700;font-size:0.76em;">AQT</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.7;">Login, navigate environments, run your first queries, and interpret results with your manager.</div>
<div style="margin-top:10px;">
<details>
<summary><i class="fa-solid fa-list-check" style="margin-right:5px;"></i> What you'll do</summary>
<ul>
<li>Log in with your provisioned credentials</li>
<li>Understand the different AQT environments</li>
<li>Run standard queries against a plan</li>
<li>Modify parameters (dates, plans, data sets)</li>
<li>Interpret query output for data validation</li>
</ul>
</details>
</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);border-top:3px solid #dfa88f;padding:15px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
<i class="fa-solid fa-table" style="font-size:18px;color:#dfa88f;"></i>
<div style="font-weight:700;font-size:0.76em;">Loading Census</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.7;">Review a census file for errors, confirm structure, load in EDS, validate via AQT, and send a status email.</div>
<div style="margin-top:10px;">
<details>
<summary><i class="fa-solid fa-list-check" style="margin-right:5px;"></i> 12-step process</summary>
<ul>
<li>Identify immediate errors &amp; type mismatches</li>
<li>Confirm correct file structure and order</li>
<li>Identify missing fields — assess acceptability</li>
<li>Provide feedback, apply corrections</li>
<li>Create EDS layout, load file, validate load</li>
<li>Confirm via AQT, enter in NBI, send status email</li>
</ul>
</details>
</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);border-top:3px solid #dfa88f;padding:15px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
<i class="fa-solid fa-file-lines" style="font-size:18px;color:#dfa88f;"></i>
<div style="font-weight:700;font-size:0.76em;">PRD &amp; Onboarding Docs</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.7;">Read PRD documents, extract business rules, interpret the TOA, and ask questions early.</div>
<div style="margin-top:10px;">
<details>
<summary><i class="fa-solid fa-list-check" style="margin-right:5px;"></i> What you'll do</summary>
<ul>
<li>Read the PRD and onboarding documentation</li>
<li>Extract key business rules</li>
<li>Translate PRD rules into EDS layout config</li>
<li>Read and interpret the TOA document</li>
<li>Raise questions with senior staff to fill gaps</li>
</ul>
</details>
</div>
</div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-top:11px;">
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);padding:13px 16px;display:flex;align-items:flex-start;gap:12px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="width:34px;height:34px;background:#dfa88f22;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-chart-column" style="font-size:14px;color:#a05f3a;"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.72em;margin-bottom:4px;">Base File Analysis</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.6;">Distinguish census vs financial fields, eligibility vs deferrals, validate types and totals, provide feedback.</div>
</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);padding:13px 16px;display:flex;align-items:flex-start;gap:12px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="width:34px;height:34px;background:var(--accent-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-person-chalkboard" style="font-size:14px;color:var(--accent);"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.72em;margin-bottom:4px;">Workflow Walkthrough + Week 1 Check-in</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.6;">Manager reviews DC process, tools &amp; expectations. Then a 1:1 check-in to cover blockers and pacing.</div>
</div>
</div>
</div>

---

### Phase 4

# Week 2 — Going Deeper

## You'll move into the tools that drive plan processing.

<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:6px;">
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);border-top:3px solid #c0a8dd;padding:15px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
<i class="fa-solid fa-sliders" style="font-size:17px;color:#7a52aa;"></i>
<div style="font-weight:700;font-size:0.76em;">EDS</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.7;">Build and clone layouts, assign data types, run validation, read output emails, handle warnings and errors.</div>
<div style="margin-top:10px;">
<details>
<summary><i class="fa-solid fa-triangle-exclamation" style="margin-right:5px;color:var(--warning);"></i> Key skill: troubleshooting</summary>
<p>When EDS processing fails, you'll need to apply systematic troubleshooting. Learn how output emails flag issues and how each error type is resolved.</p>
</details>
</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);border-top:3px solid #c0a8dd;padding:15px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
<i class="fa-solid fa-diagram-project" style="font-size:17px;color:#7a52aa;"></i>
<div style="font-weight:700;font-size:0.76em;">Informatica</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.7;">Create parameter files, configure sources, execute workflows, read output files and logs, and troubleshoot errors.</div>
<div style="margin-top:10px;">
<details>
<summary><i class="fa-solid fa-file-code" style="margin-right:5px;color:#7a52aa;"></i> What a param file does</summary>
<p>The Informatica parameter file controls the sources, paths, and runtime settings for a given workflow. You build one for each plan-level processing job.</p>
</details>
</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);border-top:3px solid #c0a8dd;padding:15px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
<i class="fa-solid fa-arrow-right-arrow-left" style="font-size:17px;color:#7a52aa;"></i>
<div style="font-weight:700;font-size:0.76em;">Source &amp; Fund Mapping</div>
</div>
<div style="font-size:0.62em;color:var(--muted);line-height:1.7;">Identify required fields, populate the mapping doc, build from the TOA, format correctly, test in Informatica.</div>
<div style="margin-top:10px;">
<details>
<summary><i class="fa-solid fa-file-import" style="margin-right:5px;color:#7a52aa;"></i> Building from the TOA</summary>
<p>The Transfer of Assets document is your blueprint. Source and fund mapping must align with what's defined in the TOA before running through Informatica.</p>
</details>
</div>
</div>
</div>

<div style="margin-top:12px;display:flex;gap:11px;">
<div style="flex:1;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:12px 16px;display:flex;align-items:center;gap:12px;">
<i class="fa-solid fa-eye" style="color:#7a52aa;font-size:16px;flex-shrink:0;"></i>
<div>
<div style="font-weight:700;font-size:0.7em;margin-bottom:3px;">Shadow Session with Senior DC</div>
<div style="font-size:0.6em;color:var(--muted);">Your manager schedules hands-on observation with a strong team member. Watch how they handle real work.</div>
</div>
</div>
<div style="flex:1;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:12px 16px;display:flex;align-items:center;gap:12px;">
<i class="fa-solid fa-p" style="color:#7a52aa;font-size:16px;flex-shrink:0;background:#c0a8dd22;width:24px;height:24px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;"></i>
<div>
<div style="font-weight:700;font-size:0.7em;margin-bottom:3px;">P2 &amp; P3 Accounts Created</div>
<div style="font-size:0.6em;color:var(--muted);">Your manager walks you through P2. P3 is provisioned and queued for follow-up training this week and into Month 1.</div>
</div>
</div>
</div>

---

### Phase 5

# Month 1 — Full Ramp

## Advanced topics that bring everything together.

<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:8px;">
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);border-top:3px solid var(--accent);padding:14px 13px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;text-align:center;">
<div style="width:38px;height:38px;background:var(--accent-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;">
<i class="fa-solid fa-money-check-dollar" style="font-size:16px;color:var(--accent);"></i>
</div>
<div style="font-weight:700;font-size:0.7em;margin-bottom:6px;">Payroll</div>
<div style="font-size:0.58em;color:var(--muted);line-height:1.6;">Build template, send to client, conduct meeting, validate test file, load in EDS, confirm submission.</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);border-top:3px solid var(--accent);padding:14px 13px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;text-align:center;">
<div style="width:38px;height:38px;background:var(--accent-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;">
<i class="fa-solid fa-list-check" style="font-size:16px;color:var(--accent);"></i>
</div>
<div style="font-weight:700;font-size:0.7em;margin-bottom:6px;">Elections</div>
<div style="font-size:0.58em;color:var(--muted);line-height:1.6;">Mapped vs non-mapped, run Informatica workflow, load in EDS, validate via AQT.</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);border-top:3px solid var(--accent);padding:14px 13px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;text-align:center;">
<div style="width:38px;height:38px;background:var(--accent-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;">
<i class="fa-solid fa-user-check" style="font-size:16px;color:var(--accent);"></i>
</div>
<div style="font-weight:700;font-size:0.7em;margin-bottom:6px;">Eligibility</div>
<div style="font-size:0.58em;color:var(--muted);line-height:1.6;">Enable in P3, understand the rules from the plan doc, load and validate against plan rules.</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);border-top:3px solid var(--accent);padding:14px 13px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;text-align:center;">
<div style="width:38px;height:38px;background:var(--accent-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;">
<i class="fa-solid fa-piggy-bank" style="font-size:16px;color:var(--accent);"></i>
</div>
<div style="font-weight:700;font-size:0.7em;margin-bottom:6px;">Deferrals</div>
<div style="font-size:0.58em;color:var(--muted);line-height:1.6;">Confirm P3 setup, understand deferral types and how each is processed, load and validate.</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);border-top:3px solid var(--accent);padding:14px 13px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;text-align:center;">
<div style="width:38px;height:38px;background:var(--accent-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;">
<i class="fa-solid fa-scale-balanced" style="font-size:16px;color:var(--accent);"></i>
</div>
<div style="font-weight:700;font-size:0.7em;margin-bottom:6px;">Roth / Basis</div>
<div style="font-size:0.58em;color:var(--muted);line-height:1.6;">Understand distinctions, apply correct treatment to each contribution type, validate handling.</div>
</div>
</div>

<div style="margin-top:14px;display:flex;gap:11px;">
<div style="flex:2;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:13px 16px;display:flex;align-items:flex-start;gap:12px;">
<div style="width:34px;height:34px;background:var(--success-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
<i class="fa-solid fa-comments" style="font-size:14px;color:var(--success);"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.72em;margin-bottom:3px;">30-Day Review</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.6;">A ramp checkpoint is on your calendar before month-end. You and your manager review blockers, confidence, and what comes next.</div>
</div>
</div>
<div style="flex:1;background:var(--card);border-radius:10px;border:1px solid var(--border);padding:13px 16px;display:flex;align-items:flex-start;gap:12px;">
<div style="width:34px;height:34px;background:#c0a8dd22;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
<i class="fa-solid fa-gear" style="font-size:14px;color:#7a52aa;"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.72em;margin-bottom:3px;">P3 Workflow Walkthrough</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.6;">Manager reviews how the P3 submission workflow should be handled end-to-end.</div>
</div>
</div>
</div>

---

### Systems Reference

# Setup &amp; Access

## Every system you'll interact with as a Data Consultant.

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:6px;">
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 12px;box-shadow:rgba(0,0,0,0.04) 0px 2px 6px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<div style="width:26px;height:26px;background:var(--accent-soft);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-database" style="font-size:11px;color:var(--accent);"></i>
</div>
<div style="font-weight:700;font-size:0.7em;">AQT</div>
</div>
<div style="font-size:0.57em;color:var(--muted);line-height:1.55;">Query and validate plan data. Your primary verification tool throughout the DC workflow.</div>
<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">
<span style="background:var(--accent-soft);color:var(--accent);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Week 1</span>
<span style="background:var(--surface);color:var(--muted);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">IT + Mgr</span>
</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 12px;box-shadow:rgba(0,0,0,0.04) 0px 2px 6px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<div style="width:26px;height:26px;background:#9fbbe022;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-sliders" style="font-size:11px;color:#5a87b8;"></i>
</div>
<div style="font-weight:700;font-size:0.7em;">EDS</div>
</div>
<div style="font-size:0.57em;color:var(--muted);line-height:1.55;">Create layouts, load files, validate data. Core to census and payroll processing.</div>
<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">
<span style="background:#9fbbe022;color:#5a87b8;border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Wk 1–2</span>
<span style="background:var(--surface);color:var(--muted);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Manager</span>
</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 12px;box-shadow:rgba(0,0,0,0.04) 0px 2px 6px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<div style="width:26px;height:26px;background:#c0a8dd22;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-diagram-project" style="font-size:11px;color:#7a52aa;"></i>
</div>
<div style="font-weight:700;font-size:0.7em;">Informatica</div>
</div>
<div style="font-size:0.57em;color:var(--muted);line-height:1.55;">ETL workflow engine. Runs mapping files, elections, and data transformation jobs.</div>
<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">
<span style="background:#c0a8dd22;color:#7a52aa;border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Week 2</span>
<span style="background:var(--surface);color:var(--muted);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Manager</span>
</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 12px;box-shadow:rgba(0,0,0,0.04) 0px 2px 6px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<div style="width:26px;height:26px;background:#9fc9a222;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-circle-nodes" style="font-size:11px;color:#2d7a42;"></i>
</div>
<div style="font-weight:700;font-size:0.7em;">P2 &amp; P3</div>
</div>
<div style="font-size:0.57em;color:var(--muted);line-height:1.55;">Plan admin platforms. P2 for data review; P3 for eligibility, deferrals, and submissions.</div>
<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">
<span style="background:#9fc9a222;color:#2d7a42;border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Wk 1–2</span>
<span style="background:var(--surface);color:var(--muted);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Manager</span>
</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 12px;box-shadow:rgba(0,0,0,0.04) 0px 2px 6px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<div style="width:26px;height:26px;background:var(--success-soft);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-brands fa-microsoft" style="font-size:11px;color:var(--success);"></i>
</div>
<div style="font-weight:700;font-size:0.7em;">SharePoint</div>
</div>
<div style="font-size:0.57em;color:var(--muted);line-height:1.55;">Team sites and documentation libraries. Templates, guides, and shared working files.</div>
<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">
<span style="background:var(--success-soft);color:var(--success);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Day 1</span>
<span style="background:var(--surface);color:var(--muted);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">IT</span>
</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 12px;box-shadow:rgba(0,0,0,0.04) 0px 2px 6px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<div style="width:26px;height:26px;background:var(--success-soft);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-comments" style="font-size:11px;color:var(--success);"></i>
</div>
<div style="font-weight:700;font-size:0.7em;">Microsoft Teams</div>
</div>
<div style="font-size:0.57em;color:var(--muted);line-height:1.55;">Primary communication hub. Channels, direct messages, and training calendar.</div>
<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">
<span style="background:var(--success-soft);color:var(--success);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Day 1</span>
<span style="background:var(--surface);color:var(--muted);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Manager</span>
</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 12px;box-shadow:rgba(0,0,0,0.04) 0px 2px 6px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<div style="width:26px;height:26px;background:var(--warning-soft);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-lock" style="font-size:11px;color:var(--warning);"></i>
</div>
<div style="font-weight:700;font-size:0.7em;">VPN + MFA</div>
</div>
<div style="font-size:0.57em;color:var(--muted);line-height:1.55;">Required for remote work. Set up Day 1 — manager or IT walks you through enrollment.</div>
<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">
<span style="background:var(--warning-soft);color:var(--warning);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Day 1</span>
<span style="background:var(--surface);color:var(--muted);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">IT</span>
</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 12px;box-shadow:rgba(0,0,0,0.04) 0px 2px 6px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<div style="width:26px;height:26px;background:var(--warning-soft);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-vault" style="font-size:11px;color:var(--warning);"></i>
</div>
<div style="font-weight:700;font-size:0.7em;">Password Manager</div>
</div>
<div style="font-size:0.57em;color:var(--muted);line-height:1.55;">Vault for credentials. Set up Week 1 — keeps all system logins organized and secure.</div>
<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">
<span style="background:var(--warning-soft);color:var(--warning);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">Week 1</span>
<span style="background:var(--surface);color:var(--muted);border-radius:9999px;padding:1px 7px;font-size:0.52em;font-weight:600;">IT</span>
</div>
</div>
</div>

---

### Training Deep Dive

# AQT

## Advanced Query Tool — your lens into plan data.

<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:4px;">
<div>
<div style="font-size:0.55em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">WHAT YOU'LL LEARN</div>
<div style="display:flex;flex-direction:column;gap:6px;">
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:9px 12px;display:flex;gap:9px;align-items:flex-start;">
<div style="width:24px;height:24px;background:var(--accent-soft);border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
<i class="fa-solid fa-right-to-bracket" style="font-size:10px;color:var(--accent);"></i>
</div>
<div>
<div style="font-weight:600;font-size:0.68em;margin-bottom:1px;">Login &amp; Environments</div>
<div style="font-size:0.58em;color:var(--muted);">Navigate the AQT portal and understand which environment to use — production vs test.</div>
</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:9px 12px;display:flex;gap:9px;align-items:flex-start;">
<div style="width:24px;height:24px;background:var(--accent-soft);border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
<i class="fa-solid fa-terminal" style="font-size:10px;color:var(--accent);"></i>
</div>
<div>
<div style="font-weight:600;font-size:0.68em;margin-bottom:1px;">Run Queries</div>
<div style="font-size:0.58em;color:var(--muted);">Execute standard queries against a plan for census validation and post-processing checks.</div>
</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:9px 12px;display:flex;gap:9px;align-items:flex-start;">
<div style="width:24px;height:24px;background:var(--accent-soft);border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
<i class="fa-solid fa-filter" style="font-size:10px;color:var(--accent);"></i>
</div>
<div>
<div style="font-weight:600;font-size:0.68em;margin-bottom:1px;">Modify Parameters</div>
<div style="font-size:0.58em;color:var(--muted);">Target specific dates, plan IDs, or data sets by adjusting query parameters.</div>
</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:9px 12px;display:flex;gap:9px;align-items:flex-start;">
<div style="width:24px;height:24px;background:var(--accent-soft);border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
<i class="fa-solid fa-magnifying-glass-chart" style="font-size:10px;color:var(--accent);"></i>
</div>
<div>
<div style="font-weight:600;font-size:0.68em;margin-bottom:1px;">Interpret Results</div>
<div style="font-size:0.58em;color:var(--muted);">Read AQT output — validate that what you loaded matches what's expected.</div>
</div>
</div>
</div>
</div>
<div>
<div style="font-size:0.55em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">HOW IT FITS IN</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);padding:14px 16px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="font-size:0.62em;color:var(--muted);line-height:1.7;">AQT isn't just a Week 1 tool — you'll return to it after every major load to confirm data integrity.</div>
<div style="margin-top:10px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:0.6em;">
<i class="fa-solid fa-circle-check" style="color:var(--success);font-size:10px;"></i>
<span>After loading census</span>
</div>
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:0.6em;">
<i class="fa-solid fa-circle-check" style="color:var(--success);font-size:10px;"></i>
<span>After Informatica runs</span>
</div>
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:0.6em;">
<i class="fa-solid fa-circle-check" style="color:var(--success);font-size:10px;"></i>
<span>After elections processing</span>
</div>
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:0.6em;">
<i class="fa-solid fa-circle-check" style="color:var(--success);font-size:10px;"></i>
<span>To validate eligibility and deferrals</span>
</div>
<div style="display:flex;align-items:center;gap:8px;font-size:0.6em;">
<i class="fa-solid fa-circle-check" style="color:var(--success);font-size:10px;"></i>
<span>Any time data accuracy is in question</span>
</div>
</div>
<div style="margin-top:10px;background:var(--accent-soft);border-radius:8px;padding:9px 11px;">
<div style="font-size:0.58em;color:var(--warm-black);font-weight:600;margin-bottom:2px;"><i class="fa-solid fa-lightbulb" style="color:var(--accent);margin-right:5px;"></i>Pro tip</div>
<div style="font-size:0.56em;color:var(--muted);">When in doubt about a load, run AQT first. "Did it actually go in?" is always the right question.</div>
</div>
</div>
</div>
</div>

---

### Training Deep Dive

# EDS

## Electronic Data System — where files become processed records.

<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:4px;">
<div>
<div style="font-size:0.55em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">THE WORKFLOW</div>
<div style="position:relative;padding-left:22px;">
<div style="position:absolute;left:7px;top:0;bottom:0;width:2px;background:rgba(38,37,30,0.1);border-radius:2px;"></div>
<div style="position:relative;margin-bottom:9px;">
<div style="position:absolute;left:-18px;top:3px;width:9px;height:9px;border-radius:50%;background:#c0a8dd;"></div>
<div style="font-weight:600;font-size:0.68em;margin-bottom:1px;">1. Create or Clone a Layout</div>
<div style="font-size:0.58em;color:var(--muted);">Build new from scratch, or clone an existing layout as your starting point.</div>
</div>
<div style="position:relative;margin-bottom:9px;">
<div style="position:absolute;left:-18px;top:3px;width:9px;height:9px;border-radius:50%;background:#c0a8dd;"></div>
<div style="font-weight:600;font-size:0.68em;margin-bottom:1px;">2. Assign Data Types</div>
<div style="font-size:0.58em;color:var(--muted);">Set the correct type for each field. Mismatches are the most common error source.</div>
</div>
<div style="position:relative;margin-bottom:9px;">
<div style="position:absolute;left:-18px;top:3px;width:9px;height:9px;border-radius:50%;background:#c0a8dd;"></div>
<div style="font-weight:600;font-size:0.68em;margin-bottom:1px;">3. Run Validation</div>
<div style="font-size:0.58em;color:var(--muted);">Execute EDS validation and review results. Look for both errors and warnings.</div>
</div>
<div style="position:relative;margin-bottom:9px;">
<div style="position:absolute;left:-18px;top:3px;width:9px;height:9px;border-radius:50%;background:#c0a8dd;"></div>
<div style="font-weight:600;font-size:0.68em;margin-bottom:1px;">4. Read Output Emails</div>
<div style="font-size:0.58em;color:var(--muted);">Automated emails are generated after processing. Learn to read them quickly.</div>
</div>
<div style="position:relative;">
<div style="position:absolute;left:-18px;top:3px;width:9px;height:9px;border-radius:50%;background:var(--success);"></div>
<div style="font-weight:600;font-size:0.68em;margin-bottom:1px;">5. Handle Warnings &amp; Errors</div>
<div style="font-size:0.58em;color:var(--muted);">Identify, categorize, and resolve before moving forward.</div>
</div>
</div>
</div>
<div>
<div style="font-size:0.55em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">THINGS TO KNOW</div>
<div style="display:flex;flex-direction:column;gap:6px;">
<details>
<summary><i class="fa-solid fa-link" style="margin-right:6px;color:#7a52aa;"></i> EDS → P3 Dependencies</summary>
<p>EDS layouts connect directly to P3. Getting the layout right is critical — P3 reads from what EDS outputs. Misconfigurations can cascade silently.</p>
</details>
<details>
<summary><i class="fa-solid fa-triangle-exclamation" style="margin-right:6px;color:var(--warning);"></i> Warnings vs. Errors</summary>
<p>Errors stop the load. Warnings let it proceed but may flag data quality issues. Know which category each output message falls into.</p>
</details>
<details>
<summary><i class="fa-solid fa-clone" style="margin-right:6px;color:#7a52aa;"></i> Clone vs. create new</summary>
<p>Clone when the new file is structurally similar to an existing layout. Create from scratch when the plan spec is materially different.</p>
</details>
<details>
<summary><i class="fa-solid fa-bug" style="margin-right:6px;color:var(--danger);"></i> Troubleshooting approach</summary>
<p>Start with the output email. Check field-level data types first. Verify against the PRD spec. Then validate file structure before re-running.</p>
</details>
</div>
<div style="margin-top:8px;background:#c0a8dd22;border-radius:8px;padding:9px 11px;border:1px solid #c0a8dd55;">
<div style="font-size:0.58em;color:var(--warm-black);font-weight:600;margin-bottom:2px;"><i class="fa-solid fa-lightbulb" style="color:#7a52aa;margin-right:5px;"></i>Week 2 expectation</div>
<div style="font-size:0.56em;color:var(--muted);">You'll build your first real EDS layout with your manager watching. Don't aim for perfection — aim for understanding.</div>
</div>
</div>
</div>

---

### Training Deep Dive

# Informatica &amp; PRD

## Two tools that work together — the engine and the blueprint.

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:4px;">
<div>
<div style="font-size:0.55em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:7px;display:flex;align-items:center;gap:7px;"><div style="width:7px;height:7px;background:#c0a8dd;border-radius:50%;"></div> INFORMATICA</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 14px;box-shadow:rgba(0,0,0,0.04) 0px 2px 6px;">
<div style="font-size:0.6em;color:var(--muted);line-height:1.6;margin-bottom:8px;">ETL engine that moves and transforms data between systems. You'll run workflows for elections, fund mapping, and other plan-level jobs.</div>
<div style="display:flex;flex-direction:column;gap:5px;">
<div style="display:flex;align-items:center;gap:7px;font-size:0.6em;">
<i class="fa-solid fa-file-code" style="color:#7a52aa;font-size:10px;width:12px;"></i>
<span><strong style="color:var(--warm-black);font-weight:600;">Create parameter file</strong> — sources, paths, runtime settings</span>
</div>
<div style="display:flex;align-items:center;gap:7px;font-size:0.6em;">
<i class="fa-solid fa-plug" style="color:#7a52aa;font-size:10px;width:12px;"></i>
<span><strong style="color:var(--warm-black);font-weight:600;">Configure sources</strong> — connections and file paths</span>
</div>
<div style="display:flex;align-items:center;gap:7px;font-size:0.6em;">
<i class="fa-solid fa-play" style="color:#7a52aa;font-size:10px;width:12px;"></i>
<span><strong style="color:var(--warm-black);font-weight:600;">Run &amp; monitor workflows</strong> — execute, watch for completion</span>
</div>
<div style="display:flex;align-items:center;gap:7px;font-size:0.6em;">
<i class="fa-solid fa-file-lines" style="color:#7a52aa;font-size:10px;width:12px;"></i>
<span><strong style="color:var(--warm-black);font-weight:600;">Read outputs</strong> — interpret logs and output files</span>
</div>
<div style="display:flex;align-items:center;gap:7px;font-size:0.6em;">
<i class="fa-solid fa-wrench" style="color:var(--danger);font-size:10px;width:12px;"></i>
<span><strong style="color:var(--warm-black);font-weight:600;">Troubleshoot</strong> — diagnose common workflow errors</span>
</div>
</div>
</div>
</div>
<div>
<div style="font-size:0.55em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:7px;display:flex;align-items:center;gap:7px;"><div style="width:7px;height:7px;background:#dfa88f;border-radius:50%;"></div> PRD &amp; ONBOARDING DOCUMENTS</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 14px;box-shadow:rgba(0,0,0,0.04) 0px 2px 6px;">
<div style="font-size:0.6em;color:var(--muted);line-height:1.6;margin-bottom:8px;">The Plan Requirements Document is your blueprint for every plan. Reading carefully — and asking questions early — prevents rework.</div>
<div style="display:flex;flex-direction:column;gap:5px;">
<div style="display:flex;align-items:center;gap:7px;font-size:0.6em;">
<i class="fa-solid fa-book" style="color:#a05f3a;font-size:10px;width:12px;"></i>
<span><strong style="color:var(--warm-black);font-weight:600;">Read the PRD</strong> — first task on any new plan assignment</span>
</div>
<div style="display:flex;align-items:center;gap:7px;font-size:0.6em;">
<i class="fa-solid fa-scissors" style="color:#a05f3a;font-size:10px;width:12px;"></i>
<span><strong style="color:var(--warm-black);font-weight:600;">Extract rules</strong> — key business rules before touching EDS</span>
</div>
<div style="display:flex;align-items:center;gap:7px;font-size:0.6em;">
<i class="fa-solid fa-code-branch" style="color:#a05f3a;font-size:10px;width:12px;"></i>
<span><strong style="color:var(--warm-black);font-weight:600;">Translate to layouts</strong> — PRD rules → EDS config</span>
</div>
<div style="display:flex;align-items:center;gap:7px;font-size:0.6em;">
<i class="fa-solid fa-file-import" style="color:#a05f3a;font-size:10px;width:12px;"></i>
<span><strong style="color:var(--warm-black);font-weight:600;">Interpret the TOA</strong> — defines fund mapping requirements</span>
</div>
<div style="display:flex;align-items:center;gap:7px;font-size:0.6em;">
<i class="fa-solid fa-circle-question" style="color:var(--success);font-size:10px;width:12px;"></i>
<span><strong style="color:var(--warm-black);font-weight:600;">Ask questions early</strong> — ambiguities cost less now than later</span>
</div>
</div>
</div>
</div>
</div>

<div style="background:var(--accent-soft);border-radius:9px;border:1px solid var(--accent-border);padding:9px 14px;display:flex;align-items:center;gap:10px;margin-top:10px;">
<i class="fa-solid fa-arrows-left-right" style="color:var(--accent);font-size:13px;flex-shrink:0;"></i>
<div style="font-size:0.6em;color:var(--warm-black);">The flow: PRD → extract rules → build EDS layout → Informatica param file → run workflow → validate via AQT. These tools are always used together.</div>
</div>

---

### Training Deep Dive

# Source &amp; Fund Mapping

## Connecting the money — where it came from and where it goes.

<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:2px;">
<div>
<div style="font-size:0.53em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:6px;">THE MAPPING PROCESS</div>
<div style="display:flex;flex-direction:column;gap:4px;">
<div style="background:var(--card);border-radius:9px;border:1px solid var(--border);padding:7px 10px;display:flex;gap:8px;align-items:flex-start;">
<div style="min-width:20px;height:20px;background:#c0a8dd;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:0.50em;font-weight:700;color:#fff;flex-shrink:0;margin-top:1px;">1</div>
<div>
<div style="font-weight:600;font-size:0.64em;margin-bottom:1px;">Identify Required Fields</div>
<div style="font-size:0.55em;color:var(--muted);">Which source and fund fields are required for the mapping.</div>
</div>
</div>
<div style="background:var(--card);border-radius:9px;border:1px solid var(--border);padding:7px 10px;display:flex;gap:8px;align-items:flex-start;">
<div style="min-width:20px;height:20px;background:#c0a8dd;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:0.50em;font-weight:700;color:#fff;flex-shrink:0;margin-top:1px;">2</div>
<div>
<div style="font-weight:600;font-size:0.64em;margin-bottom:1px;">Build from the TOA</div>
<div style="font-size:0.55em;color:var(--muted);">The TOA is your blueprint — every source and fund must trace to it.</div>
</div>
</div>
<div style="background:var(--card);border-radius:9px;border:1px solid var(--border);padding:7px 10px;display:flex;gap:8px;align-items:flex-start;">
<div style="min-width:20px;height:20px;background:#c0a8dd;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:0.50em;font-weight:700;color:#fff;flex-shrink:0;margin-top:1px;">3</div>
<div>
<div style="font-weight:600;font-size:0.64em;margin-bottom:1px;">Populate the Mapping Document</div>
<div style="font-size:0.55em;color:var(--muted);">Complete all required values in the mapping document.</div>
</div>
</div>
<div style="background:var(--card);border-radius:9px;border:1px solid var(--border);padding:7px 10px;display:flex;gap:8px;align-items:flex-start;">
<div style="min-width:20px;height:20px;background:#c0a8dd;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:0.50em;font-weight:700;color:#fff;flex-shrink:0;margin-top:1px;">4</div>
<div>
<div style="font-weight:600;font-size:0.64em;margin-bottom:1px;">Format Correctly</div>
<div style="font-size:0.55em;color:var(--muted);">File format must meet processing requirements before Informatica.</div>
</div>
</div>
<div style="background:var(--card);border-radius:9px;border:1px solid var(--border);padding:7px 10px;display:flex;gap:8px;align-items:flex-start;">
<div style="min-width:20px;height:20px;background:var(--success);border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:0.50em;font-weight:700;color:#fff;flex-shrink:0;margin-top:1px;">5</div>
<div>
<div style="font-weight:600;font-size:0.64em;margin-bottom:1px;">Test in Informatica</div>
<div style="font-size:0.55em;color:var(--muted);">Run through Informatica to confirm it processes without errors.</div>
</div>
</div>
</div>
</div>
<div>
<div style="font-size:0.53em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:6px;">WHAT IT MEANS</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:11px 13px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="font-size:0.58em;color:var(--muted);line-height:1.6;margin-bottom:8px;">Source &amp; Fund Mapping tells the system: <em style="color:var(--warm-black);font-style:italic;">"This contribution came from this source and belongs to this fund."</em> Without a correct mapping, assets can't be tracked accurately.</div>
<div style="background:#c0a8dd22;border-radius:8px;padding:7px 10px;margin-bottom:6px;">
<div style="font-size:0.57em;font-weight:700;color:#7a52aa;margin-bottom:3px;"><i class="fa-solid fa-file-import" style="margin-right:6px;"></i>TOA = Your Source of Truth</div>
<div style="font-size:0.55em;color:var(--muted);line-height:1.5;">The TOA lists every fund transferring to Transamerica. Your mapping must match it exactly before Informatica can run.</div>
</div>
<div style="background:var(--accent-soft);border-radius:8px;padding:7px 10px;">
<div style="font-size:0.57em;font-weight:700;color:var(--accent);margin-bottom:3px;"><i class="fa-solid fa-lightbulb" style="margin-right:6px;"></i>Common mistake</div>
<div style="font-size:0.55em;color:var(--muted);line-height:1.5;">Skipping the format check before running Informatica — a correctly populated but badly formatted file will fail silently.</div>
</div>
</div>
</div>
</div>

---

### Month 1

# Advanced Topics

## The complete DC skill set — you'll be working these with your manager.

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:6px;">
<div>
<div style="font-size:0.58em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:10px;display:flex;align-items:center;gap:7px;"><i class="fa-solid fa-circle" style="color:var(--accent);font-size:7px;"></i> FINANCIAL PROCESSING</div>
<div style="display:flex;flex-direction:column;gap:8px;">
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:12px 14px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<i class="fa-solid fa-money-check-dollar" style="font-size:14px;color:var(--accent);width:18px;"></i>
<div style="font-weight:700;font-size:0.72em;">Payroll</div>
</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.7;">Build and send the payroll template, lead the setup meeting, validate the test file, load in EDS, confirm submission.</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:12px 14px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<i class="fa-solid fa-list-check" style="font-size:14px;color:var(--accent);width:18px;"></i>
<div style="font-weight:700;font-size:0.72em;">Elections</div>
</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.7;">Understand mapped vs non-mapped elections. Run the Informatica workflow, load in EDS, validate via AQT.</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:12px 14px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<i class="fa-solid fa-scale-balanced" style="font-size:14px;color:var(--accent);width:18px;"></i>
<div style="font-weight:700;font-size:0.72em;">Roth &amp; Basis</div>
</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.7;">Understand the distinction between Roth and traditional basis. Apply correct treatment per contribution type and validate handling.</div>
</div>
</div>
</div>
<div>
<div style="font-size:0.58em;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:10px;display:flex;align-items:center;gap:7px;"><i class="fa-solid fa-circle" style="color:#7a52aa;font-size:7px;"></i> PLAN ADMINISTRATION</div>
<div style="display:flex;flex-direction:column;gap:8px;">
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:12px 14px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<i class="fa-solid fa-user-check" style="font-size:14px;color:#7a52aa;width:18px;"></i>
<div style="font-weight:700;font-size:0.72em;">Eligibility</div>
</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.7;">Enable in P3, understand the plan's eligibility rules, load eligibility data and validate results match the plan document.</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:12px 14px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<i class="fa-solid fa-piggy-bank" style="font-size:14px;color:#7a52aa;width:18px;"></i>
<div style="font-weight:700;font-size:0.72em;">Deferrals</div>
</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.7;">Confirm P3 deferral setup matches the plan spec. Understand each deferral type, load data, and validate against expected values.</div>
</div>
<div style="background:var(--card);border-radius:10px;border:1px solid var(--border);padding:12px 14px;box-shadow:rgba(0,0,0,0.04) 0px 2px 8px;">
<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
<i class="fa-solid fa-gear" style="font-size:14px;color:#7a52aa;width:18px;"></i>
<div style="font-weight:700;font-size:0.72em;">P3 Workflow Walkthrough</div>
</div>
<div style="font-size:0.6em;color:var(--muted);line-height:1.7;">Manager reviews the full P3 submission workflow end-to-end. You'll see how eligibility, deferrals, and elections all connect.</div>
</div>
</div>
</div>
</div>

---

### Your Team

# Support Network

## You don't figure this out alone — here's who to go to.

<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px;">
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);padding:14px 16px;box-shadow:rgba(0,0,0,0.05) 0px 2px 10px;border-top:3px solid var(--accent);">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
<div style="width:36px;height:36px;background:var(--accent-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-user-tie" style="font-size:15px;color:var(--accent);"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.74em;">Your Manager</div>
<div style="font-size:0.56em;color:var(--muted);">Primary contact throughout onboarding</div>
</div>
</div>
<div style="font-size:0.59em;color:var(--muted);line-height:1.65;">Owns your checklist. Schedules training, validates access, walks you through every workflow, and runs weekly check-ins. When anything is unclear or blocked — start here.</div>
<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px;">
<span style="background:var(--accent-soft);color:var(--accent);border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">Workflow training</span>
<span style="background:var(--accent-soft);color:var(--accent);border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">Check-ins</span>
<span style="background:var(--accent-soft);color:var(--accent);border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">Access validation</span>
<span style="background:var(--accent-soft);color:var(--accent);border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">Blocked items</span>
</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);padding:14px 16px;box-shadow:rgba(0,0,0,0.05) 0px 2px 10px;border-top:3px solid #7a52aa;">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
<div style="width:36px;height:36px;background:#c0a8dd22;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-graduation-cap" style="font-size:15px;color:#7a52aa;"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.74em;">Senior Data Consultant</div>
<div style="font-size:0.56em;color:var(--muted);">Shadow session host — real-world transfer</div>
</div>
</div>
<div style="font-size:0.59em;color:var(--muted);line-height:1.65;">Your manager schedules a shadow with a strong DC in Week 2. Watch how they handle real work — the shortcuts, edge cases, and judgment calls. Ask everything.</div>
<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px;">
<span style="background:#c0a8dd22;color:#7a52aa;border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">Shadow sessions</span>
<span style="background:#c0a8dd22;color:#7a52aa;border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">Edge cases</span>
<span style="background:#c0a8dd22;color:#7a52aa;border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">Real-world tips</span>
</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);padding:14px 16px;box-shadow:rgba(0,0,0,0.05) 0px 2px 10px;border-top:3px solid #5a87b8;">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
<div style="width:36px;height:36px;background:#9fbbe022;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-laptop" style="font-size:15px;color:#5a87b8;"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.74em;">IT Support</div>
<div style="font-size:0.56em;color:var(--muted);">Accounts, access, and equipment</div>
</div>
</div>
<div style="font-size:0.59em;color:var(--muted);line-height:1.65;">IT provisions your domain account, email, workstation, VPN, and drives before Day 1. Access issues are escalated through your manager to IT.</div>
<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px;">
<span style="background:#9fbbe022;color:#5a87b8;border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">Accounts</span>
<span style="background:#9fbbe022;color:#5a87b8;border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">VPN &amp; MFA</span>
<span style="background:#9fbbe022;color:#5a87b8;border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">Equipment</span>
</div>
</div>
<div style="background:var(--card);border-radius:12px;border:1px solid var(--border);padding:14px 16px;box-shadow:rgba(0,0,0,0.05) 0px 2px 10px;border-top:3px solid var(--success);">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
<div style="width:36px;height:36px;background:var(--success-soft);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
<i class="fa-solid fa-id-badge" style="font-size:15px;color:var(--success);"></i>
</div>
<div>
<div style="font-weight:700;font-size:0.74em;">HR</div>
<div style="font-size:0.56em;color:var(--muted);">Compliance, benefits, and documentation</div>
</div>
</div>
<div style="font-size:0.59em;color:var(--muted);line-height:1.65;">Handles your I-9, benefits enrollment, security training, and data access agreement. Day 1 and Week 1 tasks — your manager flags anything past due.</div>
<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px;">
<span style="background:var(--success-soft);color:var(--success);border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">I-9</span>
<span style="background:var(--success-soft);color:var(--success);border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">Benefits</span>
<span style="background:var(--success-soft);color:var(--success);border-radius:9999px;padding:2px 8px;font-size:0.52em;font-weight:600;">Compliance training</span>
</div>
</div>
</div>

---

<!-- _class: dark -->
<!-- _paginate: false -->

<div style="text-align:center;">
<div style="width:72px;height:72px;background:rgba(245,78,0,0.18);border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;border:1px solid rgba(245,78,0,0.3);">
<i class="fa-solid fa-rocket" style="font-size:28px;color:#f54e00;"></i>
</div>

<h1 style="color:#f2f1ed;font-size:2.8em;letter-spacing:-0.03em;margin-bottom:8px;">You've Got This.</h1>
<h2 style="color:rgba(242,241,237,0.5);font-weight:300;font-size:1.1em;margin-bottom:32px;">Every DC at Transamerica learned these systems from scratch. You will too.</h2>

<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:32px;">
<div style="background:rgba(242,241,237,0.06);border:1px solid rgba(242,241,237,0.12);border-radius:12px;padding:14px 20px;text-align:left;min-width:170px;">
<div style="font-size:0.62em;color:rgba(242,241,237,0.4);text-transform:uppercase;letter-spacing:0.15em;font-weight:600;margin-bottom:5px;">Week 1 focus</div>
<div style="font-size:0.72em;color:rgba(242,241,237,0.85);font-weight:500;line-height:1.6;">AQT · Census · PRD · Base File</div>
</div>
<div style="background:rgba(242,241,237,0.06);border:1px solid rgba(242,241,237,0.12);border-radius:12px;padding:14px 20px;text-align:left;min-width:170px;">
<div style="font-size:0.62em;color:rgba(242,241,237,0.4);text-transform:uppercase;letter-spacing:0.15em;font-weight:600;margin-bottom:5px;">Week 2 focus</div>
<div style="font-size:0.72em;color:rgba(242,241,237,0.85);font-weight:500;line-height:1.6;">EDS · Informatica · Mapping</div>
</div>
<div style="background:rgba(242,241,237,0.06);border:1px solid rgba(242,241,237,0.12);border-radius:12px;padding:14px 20px;text-align:left;min-width:170px;">
<div style="font-size:0.62em;color:rgba(242,241,237,0.4);text-transform:uppercase;letter-spacing:0.15em;font-weight:600;margin-bottom:5px;">Month 1 focus</div>
<div style="font-size:0.72em;color:rgba(242,241,237,0.85);font-weight:500;line-height:1.6;">Payroll · Elections · Eligibility</div>
</div>
</div>

<div style="display:flex;gap:14px;justify-content:center;">
<a href="#1" style="display:inline-flex;align-items:center;gap:7px;background:rgba(245,78,0,0.15);color:#f54e00;border:1px solid rgba(245,78,0,0.3);border-radius:9999px;padding:9px 20px;font-size:0.62em;font-weight:600;text-decoration:none;"><i class="fa-solid fa-house"></i> Back to Cover</a>
<a href="#2" style="display:inline-flex;align-items:center;gap:7px;background:rgba(242,241,237,0.08);color:rgba(242,241,237,0.8);border:1px solid rgba(242,241,237,0.15);border-radius:9999px;padding:9px 20px;font-size:0.62em;font-weight:600;text-decoration:none;"><i class="fa-solid fa-list"></i> Table of Contents</a>
</div>
</div>
