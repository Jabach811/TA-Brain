---
marp: true
theme: uncover
html: true
paginate: true
backgroundColor: #f5f5f7
style: |
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
  section {
    background: #f5f5f7;
    color: #1d1d1f;
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 22px;
    padding: 28px 48px;
    line-height: 1.4;
    box-sizing: border-box;
  }
  h1, h2, h3 { margin-top: 0 !important; }
  h1 {
    font-weight: 700;
    font-size: 1.9em;
    color: #1d1d1f;
    letter-spacing: -0.03em;
    line-height: 1.07;
    margin: 0 0 3px;
  }
  h2 {
    font-weight: 300;
    font-size: 0.78em;
    color: rgba(0,0,0,0.45);
    margin: 0 0 10px;
  }
  h3 {
    font-weight: 600;
    font-size: 0.46em;
    color: rgba(0,0,0,0.32);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin: 0 0 3px;
  }
  strong { color: #1d1d1f; font-weight: 600; }
  section.lead {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  section::after { font-size: 0.42em; color: rgba(0,0,0,0.22); }
  .icon-circle {
    width: 48px; height: 48px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 10px;
    flex-shrink: 0;
  }
  .card {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    box-shadow: rgba(0,0,0,0.06) 0px 2px 12px 0px;
  }
---

<!-- _class: lead -->
<!-- _paginate: false -->

<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; text-align:center; padding:0 80px;">
<div style="background:#e8f4fd; border-radius:980px; padding:4px 16px; display:inline-block; margin-bottom:16px;">
<span style="font-size:0.5em; font-weight:600; color:#0071e3; text-transform:uppercase; letter-spacing:0.15em;">Internal Tools Review</span>
</div>
<div style="font-weight:700; font-size:2.6em; color:#1d1d1f; letter-spacing:-0.03em; line-height:1.07; margin-bottom:12px;">Safe by Design</div>
<div style="font-weight:300; font-size:0.82em; color:rgba(0,0,0,0.45); max-width:500px; margin:0 auto 22px; line-height:1.6;">A clear look at how our standalone HTML apps work — and why they are safe for everyday use in our work environment.</div>
<div style="width:36px; height:3px; background:#0071e3; border-radius:980px; margin:0 auto 18px;"></div>
<div style="font-size:0.55em; color:rgba(0,0,0,0.3);">Prepared for Management Review · 2025</div>
</div>

---

### What Are These Apps?

# Standalone HTML Files

## Self-contained tools that live entirely on your computer.

<div style="display:flex; gap:12px;">
<div class="card" style="flex:1; display:flex; flex-direction:column;">
<div class="icon-circle" style="background:rgba(0,113,227,0.1);">
<i class="fa-solid fa-file-code" style="font-size:1.3em; color:#0071e3;"></i>
</div>
<div style="font-weight:600; font-size:0.7em; color:#1d1d1f; margin-bottom:5px;">A Single File</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.58); line-height:1.55;">Each app is one <code style="background:#f0f0f2; padding:1px 4px; border-radius:3px;">.html</code> file. No installer, no setup, no moving parts. Open it in any browser and it works immediately.</div>
</div>
<div class="card" style="flex:1; display:flex; flex-direction:column;">
<div class="icon-circle" style="background:rgba(0,113,227,0.1);">
<i class="fa-solid fa-desktop" style="font-size:1.3em; color:#0071e3;"></i>
</div>
<div style="font-weight:600; font-size:0.7em; color:#1d1d1f; margin-bottom:5px;">Runs Locally</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.58); line-height:1.55;">Everything runs inside your browser on your own machine. No server involved. No cloud. No external dependency of any kind.</div>
</div>
<div class="card" style="flex:1; display:flex; flex-direction:column;">
<div class="icon-circle" style="background:rgba(0,113,227,0.1);">
<i class="fa-solid fa-people-group" style="font-size:1.3em; color:#0071e3;"></i>
</div>
<div style="font-weight:600; font-size:0.7em; color:#1d1d1f; margin-bottom:5px;">Built for Us</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.58); line-height:1.55;">Designed specifically for our internal workflows. Replaces manual steps with a clean, guided interface — no extra software needed.</div>
</div>
</div>

---

### Network & Data Security

# No Connection. Ever.

## These apps cannot send, receive, or transmit any data.

<div style="display:flex; gap:12px; margin-bottom:10px;">
<div class="card" style="flex:1; display:flex; flex-direction:column; align-items:flex-start;">
<div class="icon-circle" style="background:rgba(52,199,89,0.12);">
<i class="fa-solid fa-ban" style="font-size:1.3em; color:#248a3d;"></i>
</div>
<div style="font-weight:600; font-size:0.7em; color:#1d1d1f; margin-bottom:5px;">No Internet Calls</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.58); line-height:1.55;">The app makes zero network requests. No URL, no API, no external server — anywhere in the picture.</div>
</div>
<div class="card" style="flex:1; display:flex; flex-direction:column; align-items:flex-start;">
<div class="icon-circle" style="background:rgba(52,199,89,0.12);">
<i class="fa-solid fa-lock" style="font-size:1.3em; color:#248a3d;"></i>
</div>
<div style="font-weight:600; font-size:0.7em; color:#1d1d1f; margin-bottom:5px;">Data Stays on Your Machine</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.58); line-height:1.55;">Whatever you type stays on your computer. Nothing is transmitted, logged remotely, or stored anywhere outside of your local session.</div>
</div>
<div class="card" style="flex:1; display:flex; flex-direction:column; align-items:flex-start;">
<div class="icon-circle" style="background:rgba(52,199,89,0.12);">
<i class="fa-solid fa-circle-stop" style="font-size:1.3em; color:#248a3d;"></i>
</div>
<div style="font-weight:600; font-size:0.7em; color:#1d1d1f; margin-bottom:5px;">No Background Processes</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.58); line-height:1.55;">Close the browser tab and the app is completely gone. No background tasks, no persistent processes, no residual activity.</div>
</div>
</div>
<div class="card" style="display:flex; align-items:center; gap:14px; padding:12px 18px;">
<i class="fa-solid fa-shield-halved" style="font-size:1.6em; color:#0071e3; flex-shrink:0;"></i>
<div>
<div style="font-weight:600; font-size:0.68em; color:#1d1d1f; margin-bottom:2px;">Air-Gapped by Design</div>
<div style="font-size:0.6em; color:rgba(0,0,0,0.55); line-height:1.5;">Functionally isolated from all external systems. These apps have no mechanism — and no ability — to reach outside your browser.</div>
</div>
<div style="background:#e8f4fd; border-radius:980px; padding:5px 14px; white-space:nowrap; flex-shrink:0;">
<span style="font-size:0.52em; font-weight:600; color:#0071e3;">Zero External Exposure</span>
</div>
</div>

---

### Development Practice

# Built with Care

## Reviewed, purposeful, and easy to inspect.

<div style="display:flex; gap:12px; margin-bottom:10px;">
<div class="card" style="flex:1; border-top:3px solid #0071e3;">
<div class="icon-circle" style="background:rgba(0,113,227,0.1);">
<i class="fa-solid fa-code" style="font-size:1.2em; color:#0071e3;"></i>
</div>
<div style="font-size:0.46em; font-weight:600; color:#0071e3; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:6px;">Transparent Code</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.58); line-height:1.55;">HTML files are plain text. Any IT staff member can open the file in a text editor and read every line. No hidden executables, no compiled binaries.</div>
</div>
<div class="card" style="flex:1; border-top:3px solid #34c759;">
<div class="icon-circle" style="background:rgba(52,199,89,0.12);">
<i class="fa-solid fa-cube" style="font-size:1.2em; color:#248a3d;"></i>
</div>
<div style="font-size:0.46em; font-weight:600; color:#248a3d; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:6px;">No Dependencies</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.58); line-height:1.55;">No packages pulled from the internet at runtime. The file you receive is the complete, final product — nothing is fetched later.</div>
</div>
<div class="card" style="flex:1; border-top:3px solid #ff9f0a;">
<div class="icon-circle" style="background:rgba(255,159,10,0.12);">
<i class="fa-solid fa-bullseye" style="font-size:1.2em; color:#c93400;"></i>
</div>
<div style="font-size:0.46em; font-weight:600; color:#c93400; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:6px;">Purpose-Built</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.58); line-height:1.55;">Each app is built for one specific task. No broad permissions, no access to system files, no reach beyond the browser tab.</div>
</div>
</div>
<div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 16px;">
<i class="fa-solid fa-magnifying-glass" style="font-size:1.1em; color:#0071e3; flex-shrink:0;"></i>
<div style="font-size:0.62em; color:rgba(0,0,0,0.58); line-height:1.4;"><strong>IT-friendly by nature:</strong> Any reviewer can audit the full code in minutes using nothing more than Notepad or the browser's built-in developer tools.</div>
</div>

---

### Safe in Practice

# Using the Apps Safely

## Simple habits that keep our work protected.

<div style="display:flex; gap:12px;">
<div style="flex:1; display:flex; flex-direction:column; gap:8px;">
<div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 14px;">
<div style="width:30px; height:30px; background:#0071e3; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
<i class="fa-solid fa-folder-open" style="font-size:0.7em; color:#fff;"></i>
</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.7); line-height:1.4;"><strong>Open from a trusted location.</strong> Save to your desktop or shared drive and open with any standard browser.</div>
</div>
<div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 14px;">
<div style="width:30px; height:30px; background:#0071e3; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
<i class="fa-solid fa-user-slash" style="font-size:0.7em; color:#fff;"></i>
</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.7); line-height:1.4;"><strong>No login required.</strong> These apps don't ask for credentials or personal information. Tools, not accounts.</div>
</div>
<div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 14px;">
<div style="width:30px; height:30px; background:#0071e3; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
<i class="fa-solid fa-wifi" style="font-size:0.7em; color:#fff;"></i>
</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.7); line-height:1.4;"><strong>Works offline.</strong> No internet connection needed or used. Functions identically with Wi-Fi off.</div>
</div>
</div>
<div style="flex:1; display:flex; flex-direction:column; gap:8px;">
<div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 14px;">
<div style="width:30px; height:30px; background:#0071e3; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
<i class="fa-solid fa-share-nodes" style="font-size:0.7em; color:#fff;"></i>
</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.7); line-height:1.4;"><strong>Share like a document.</strong> Pass via email, Teams, or shared drive — same as a Word doc or PDF.</div>
</div>
<div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 14px;">
<div style="width:30px; height:30px; background:#0071e3; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
<i class="fa-solid fa-trash" style="font-size:0.7em; color:#fff;"></i>
</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.7); line-height:1.4;"><strong>Easy to retire.</strong> Delete the file when no longer needed. Nothing to uninstall, no lingering data.</div>
</div>
<div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 14px;">
<div style="width:30px; height:30px; background:#0071e3; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
<i class="fa-solid fa-eye" style="font-size:0.7em; color:#fff;"></i>
</div>
<div style="font-size:0.62em; color:rgba(0,0,0,0.7); line-height:1.4;"><strong>Open to review anytime.</strong> IT can audit any file in minutes — the code is fully readable by anyone.</div>
</div>
</div>
</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->

<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; text-align:center; padding:0 80px;">
<div style="font-size:0.5em; font-weight:600; color:rgba(0,0,0,0.28); text-transform:uppercase; letter-spacing:0.2em; margin-bottom:14px;">Summary</div>
<div style="font-weight:700; font-size:2.5em; color:#1d1d1f; letter-spacing:-0.03em; margin-bottom:10px;">We're All Good.</div>
<div style="font-weight:300; font-size:0.8em; color:rgba(0,0,0,0.45); max-width:480px; margin:0 auto 20px; line-height:1.6;">These tools are simple, transparent, and isolated. There is nothing for our environment to worry about.</div>
<div style="display:flex; flex-direction:column; gap:8px; max-width:440px; width:100%; margin-bottom:20px;">
<div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 16px; text-align:left;">
<i class="fa-solid fa-circle-check" style="color:#34c759; font-size:1.0em; flex-shrink:0;"></i>
<span style="font-size:0.65em; color:#1d1d1f; font-weight:500;">No network connections — ever</span>
</div>
<div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 16px; text-align:left;">
<i class="fa-solid fa-circle-check" style="color:#34c759; font-size:1.0em; flex-shrink:0;"></i>
<span style="font-size:0.65em; color:#1d1d1f; font-weight:500;">No data transmitted or stored externally</span>
</div>
<div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 16px; text-align:left;">
<i class="fa-solid fa-circle-check" style="color:#34c759; font-size:1.0em; flex-shrink:0;"></i>
<span style="font-size:0.65em; color:#1d1d1f; font-weight:500;">Fully transparent — open code, readable by anyone</span>
</div>
<div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 16px; text-align:left;">
<i class="fa-solid fa-circle-check" style="color:#34c759; font-size:1.0em; flex-shrink:0;"></i>
<span style="font-size:0.65em; color:#1d1d1f; font-weight:500;">No install, no uninstall — as simple as a document</span>
</div>
</div>
<div style="width:36px; height:3px; background:#0071e3; border-radius:980px; margin:0 auto 14px;"></div>
<div style="font-size:0.55em; color:rgba(0,0,0,0.28);">Questions or requests for a code review are always welcome.</div>
</div>
