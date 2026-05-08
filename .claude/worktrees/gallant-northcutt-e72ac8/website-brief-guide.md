---
marp: true
theme: default
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Raleway:wght@100;200;300;400&display=swap');

  :root {
    --accent: #ff6b1a;
    --accent-hover: #ff8c4a;
    --dark: #000;
    --card: #080808;
    --card-2: #0e0e0e;
    --border: #1a1a1a;
    --body: #999;
    --label: #666;
    --muted: #555;
    --light: #fff;
    --green: #22c55e;
    --red: #ef4444;
    --yellow: #f5a623;
    --blue: #3b82f6;
  }

  section {
    background: var(--dark);
    color: var(--light);
    font-family: 'Raleway', sans-serif;
    font-weight: 200;
    padding: 52px 68px;
    line-height: 1.5;
  }

  h1 {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 2.8em;
    color: var(--light);
    letter-spacing: -0.02em;
    line-height: 1.05;
    margin: 0 0 4px;
  }

  h2 {
    font-family: 'Raleway', sans-serif;
    font-weight: 100;
    font-size: 1.2em;
    color: #888;
    margin: 0 0 20px;
  }

  h3 {
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 0.6em;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.22em;
    margin: 0 0 10px;
  }

  strong { color: var(--accent); font-weight: 400; }
  em { color: var(--light); font-style: normal; font-weight: 400; }

  section.lead {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: radial-gradient(ellipse at 50% 70%, #0a0a0a 0%, #000 70%);
  }
  section.lead h1 { font-size: 3.8em; }
  section.lead h2 { font-size: 1.1em; color: var(--body); }

  .divider { width: 56px; height: 2px; background: var(--accent); border-radius: 2px; margin: 14px auto 18px; }

  .pill { display:inline-block; font-family:'Outfit'; font-weight:600; font-size:0.55em; letter-spacing:0.14em; text-transform:uppercase; padding: 4px 12px; border-radius: 980px; border:1px solid var(--border); color:var(--body); background: var(--card); }

  .num { font-family:'Outfit'; font-weight:800; font-size:2.4em; color:var(--accent); line-height:1; }

  .grid-9 { display:grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .card { background: var(--card); border:1px solid var(--border); border-radius: 12px; padding: 16px 18px; position:relative; overflow:hidden; }
  .card .bar { position:absolute; top:0; left:0; right:0; height:2px; background: linear-gradient(90deg, var(--accent), transparent); }
  .card .idx { font-family:'Outfit'; font-weight:600; font-size:0.55em; color:var(--muted); letter-spacing:0.2em; }
  .card .ttl { font-family:'Outfit'; font-weight:700; font-size:0.95em; color: var(--light); margin-top: 4px; }
  .card .sub { font-size: 0.68em; color: var(--body); margin-top: 4px; line-height:1.4; }

  .row { display:flex; gap:14px; }
  .col { flex:1; }

  .q-block { background: var(--card); border:1px solid var(--border); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; font-size: 0.72em; color: var(--body); }
  .q-block strong { color: var(--light); font-weight:600; }

  .good { color: var(--green); font-weight:600; }
  .bad  { color: var(--red); font-weight:600; }

  .cmp { display:flex; gap:14px; }
  .cmp > div { flex:1; padding:14px 16px; border-radius:10px; font-size:0.7em; line-height:1.5; }
  .cmp .vague { background: #1a0a0a; border:1px solid #3a1010; color:#cc9; }
  .cmp .clear { background: #0a1a0a; border:1px solid #103a10; color:#cec; }

  .tag { font-family:'Outfit'; font-weight:600; font-size:0.55em; letter-spacing:0.12em; text-transform:uppercase; padding:3px 10px; border-radius:4px; }

  details { background: var(--card); border:1px solid var(--border); border-radius: 10px; padding: 12px 16px; margin-top: 8px; }
  details summary { color: var(--accent); font-family:'Outfit'; font-weight:600; font-size:0.72em; cursor:pointer; letter-spacing:0.1em; text-transform:uppercase; }
  details p, details ul { color: var(--body); font-size:0.72em; margin-top: 8px; line-height:1.6; }

  ul { margin: 0; padding-left: 1.1em; }
  li { margin-bottom: 4px; font-size: 0.78em; color: var(--body); }

  .checklist { display:grid; grid-template-columns: repeat(2, 1fr); gap: 6px 20px; font-size: 0.72em; color: var(--body); }
  .checklist div { display:flex; align-items:center; gap:8px; }

  .stat-row { display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding: 10px 0; font-size: 0.78em; }
  .stat-row:last-child { border-bottom:none; }
  .stat-row .k { color: var(--label); font-family:'Outfit'; font-weight:600; font-size:0.75em; text-transform:uppercase; letter-spacing:0.14em; }
  .stat-row .v { color: var(--light); font-weight:400; }
footer: ''
---

<!-- _class: lead -->
<!-- _paginate: false -->

<svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#ff6b1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="3" width="20" height="14" rx="2"/>
  <line x1="8" y1="21" x2="16" y2="21"/>
  <line x1="12" y1="17" x2="12" y2="21"/>
  <line x1="2" y1="8" x2="22" y2="8"/>
  <circle cx="5" cy="5.5" r="0.6" fill="#ff6b1a"/>
  <circle cx="7" cy="5.5" r="0.6" fill="#ff6b1a"/>
</svg>

# Planning Your Website

<div class="divider"></div>

A plain-English guide to telling the person building your site what you actually want

<div style="margin-top:28px;">
<span class="pill">Start here</span>
</div>

---

# Think of it like building a house

## You wouldn't tell a builder "just build me a house" and walk away

<div style="margin-top:30px;" class="row">
<div class="col card">
<div class="bar"></div>
<div class="idx">If you don't tell them</div>
<div class="ttl" style="margin-top:14px; color:var(--red);">They'll guess</div>
<div class="sub">And their guess probably isn't what was in your head. You end up redoing rooms you never wanted.</div>
</div>
<div class="col card">
<div class="bar"></div>
<div class="idx">If you do tell them</div>
<div class="ttl" style="margin-top:14px; color:var(--green);">They'll build it</div>
<div class="sub">You get what you pictured because you said what you pictured.</div>
</div>
<div class="col card">
<div class="bar"></div>
<div class="idx">The simple rule</div>
<div class="ttl" style="margin-top:14px;">Say more up front</div>
<div class="sub">Every answer you give before building saves you from ten "wait, what about…" moments later.</div>
</div>
</div>

---

<!-- _class: compact -->

<style scoped>
section { padding: 40px 60px; }
h1 { font-size: 2.4em; margin-bottom: 2px; }
h2 { font-size: 1.05em; margin-bottom: 14px; }
.grid-9 { gap: 10px; margin-top: 14px; }
.grid-9 .card { padding: 12px 14px; }
.grid-9 .card .ttl { font-size: 0.88em; margin-top: 3px; }
.grid-9 .card .sub { font-size: 0.62em; margin-top: 3px; line-height: 1.35; }
.grid-9 .card .idx { font-size: 0.5em; }
</style>

# The 9 things to tell them

## Answer all nine and you'll get a great website

<div class="grid-9">

<div class="card"><div class="bar"></div><div class="idx">01</div><div class="ttl">What it's for</div><div class="sub">Why do you need this website at all?</div></div>

<div class="card"><div class="bar"></div><div class="idx">02</div><div class="ttl">Who it's for</div><div class="sub">Who's going to visit, and what do they want?</div></div>

<div class="card"><div class="bar"></div><div class="idx">03</div><div class="ttl">How it looks</div><div class="sub">Your logo, colors, photos, and overall vibe.</div></div>

<div class="card"><div class="bar"></div><div class="idx">04</div><div class="ttl">What it says</div><div class="sub">The actual words and pictures that go on the site.</div></div>

<div class="card"><div class="bar"></div><div class="idx">05</div><div class="ttl">The pages</div><div class="sub">A list of every page you want on the site.</div></div>

<div class="card"><div class="bar"></div><div class="idx">06</div><div class="ttl">What it does</div><div class="sub">Buttons, forms, booking, payments — anything clickable.</div></div>

<div class="card"><div class="bar"></div><div class="idx">07</div><div class="ttl">Examples</div><div class="sub">Websites you love. Websites you hate.</div></div>

<div class="card"><div class="bar"></div><div class="idx">08</div><div class="ttl">The basics</div><div class="sub">Your web address, other tools you use.</div></div>

<div class="card"><div class="bar"></div><div class="idx">09</div><div class="ttl">What "done" means</div><div class="sub">How will you know it's working?</div></div>

</div>

---

# 01 · What it's for

## Finish this sentence: "I want people to ___ on my website."

<div style="margin-top:28px;" class="row">
<div class="col">
<h3>Pick the one main thing</h3>
<div class="q-block"><strong>Buy something</strong> (a product, a service)</div>
<div class="q-block"><strong>Book something</strong> (an appointment, a table, a call)</div>
<div class="q-block"><strong>Contact you</strong> (fill out a form, email, call)</div>
<div class="q-block"><strong>Learn something</strong> (about you, what you do)</div>
<div class="q-block"><strong>Sign up</strong> (for a newsletter, an account)</div>
</div>
<div class="col">
<h3>Fuzzy vs. clear</h3>
<div class="cmp" style="flex-direction:column;">
<div class="vague"><strong style="color:#f66;">Fuzzy:</strong> "I want a website for my coffee shop."</div>
<div class="clear" style="margin-top:8px;"><strong style="color:#6f6;">Clear:</strong> "I want people nearby to see our menu and book a table."</div>
</div>
<div style="margin-top:20px; font-size:0.7em; color:var(--label); line-height:1.6;">If you can't say what one thing visitors should do, figure that out first. Everything else depends on it.</div>
</div>
</div>

---

# 02 · Who it's for

## Picture one real person — the main visitor

<div style="margin-top:22px;" class="row">
<div class="col card">
<div class="bar"></div>
<div class="idx">Tell them</div>
<div class="ttl" style="margin-top:6px;">About this person</div>
<ul style="margin-top:10px;">
<li>Roughly how old they are</li>
<li>Where they live (local? anywhere?)</li>
<li>What they already know about you</li>
<li>Phone user or computer user?</li>
<li>In a hurry, or browsing casually?</li>
</ul>
</div>
<div class="col card">
<div class="bar"></div>
<div class="idx">Tell them</div>
<div class="ttl" style="margin-top:6px;">Why they're visiting</div>
<ul style="margin-top:10px;">
<li>What brought them to the site</li>
<li>What they're hoping to find</li>
<li>What would make them trust you</li>
<li>What would make them leave</li>
<li>Who else they might be comparing you to</li>
</ul>
</div>
</div>

<div style="margin-top:16px; font-size:0.72em; color:var(--body);">A little story helps a lot. <em>"Sarah, 34, planning her sister's wedding, looking at venues on her phone during her lunch break"</em> tells someone more than any list of numbers could.</div>

---

# 03 · How it looks

## The look and feel — the first thing visitors notice

<div style="margin-top:22px;" class="row">
<div class="col">
<h3>The visual stuff</h3>
<div class="q-block"><strong>Your logo.</strong> Send the original file your designer made — not a screenshot or photo of it.</div>
<div class="q-block"><strong>Your colors.</strong> Which colors are "you"? Send examples, or say "pick some that fit."</div>
<div class="q-block"><strong>Photos.</strong> Bright and cheerful? Calm and moody? Professional? Homey?</div>
<div class="q-block"><strong>Feel.</strong> Modern? Classic? Playful? Serious?</div>
</div>
<div class="col">
<h3>The tone</h3>
<div class="q-block"><strong>How do you sound?</strong> Friendly, formal, expert, warm? Pick a few words.</div>
<div class="q-block"><strong>Your tagline.</strong> The short line that sums up what you do.</div>
<div class="q-block"><strong>Avoid this.</strong> Anything you really don't want — styles, colors, cheesy stock photos.</div>
<div class="q-block"><strong>Not like them.</strong> Competitors you want to look different from.</div>
</div>
</div>

---

# 04 · What it says

## The actual words and pictures on the site

<div style="margin-top:18px;" class="row">
<div class="col card">
<div class="bar"></div>
<div class="idx">Send</div>
<div class="ttl" style="margin-top:6px;">Real writing</div>
<div class="sub" style="margin-top:10px;">Every headline, paragraph, product description, team bio, and FAQ answer — written out the way you actually want it to read.</div>
</div>
<div class="col card">
<div class="bar"></div>
<div class="idx">Send</div>
<div class="ttl" style="margin-top:6px;">Good photos</div>
<div class="sub" style="margin-top:10px;">The biggest, clearest versions you have. Phone photos are fine if they're good. Fuzzy or tiny pictures look bad on a website.</div>
</div>
<div class="col card">
<div class="bar"></div>
<div class="idx">Send</div>
<div class="ttl" style="margin-top:6px;">Permission to use them</div>
<div class="sub" style="margin-top:10px;">Who took the photo? Who wrote the quote? If it's not yours, you need permission before it goes online.</div>
</div>
</div>

<details style="margin-top:18px;">
<summary>The big one</summary>
<p>This is the step most people skip — and it's the one that causes the most headaches later. A designer can't know how much room to leave for your "About Us" if you haven't written it yet. When the real words show up later, the whole page often has to be rearranged.</p>
</details>

---

# 05 · The pages

## Make a list of every page on the site

<div style="margin-top:20px;" class="row">
<div class="col">
<h3>Just write them out</h3>
<div class="card" style="padding:18px 22px; font-family:'Outfit'; font-size:0.78em; line-height:1.9;">
<span style="color:var(--accent);">Home</span><br>
<span style="color:var(--body); margin-left:14px;">About Us</span><br>
<span style="color:var(--label); margin-left:28px;">↳ Our Team</span><br>
<span style="color:var(--label); margin-left:28px;">↳ Our Story</span><br>
<span style="color:var(--body); margin-left:14px;">What We Do</span><br>
<span style="color:var(--label); margin-left:28px;">↳ Service A</span><br>
<span style="color:var(--label); margin-left:28px;">↳ Service B</span><br>
<span style="color:var(--body); margin-left:14px;">Our Work</span><br>
<span style="color:var(--body); margin-left:14px;">Blog</span><br>
<span style="color:var(--body); margin-left:14px;">Contact</span>
</div>
</div>
<div class="col">
<h3>For every page, answer</h3>
<ul style="font-size:0.82em;">
<li><strong>Why is this page here?</strong></li>
<li><strong>Who lands on it?</strong></li>
<li><strong>What should they click next?</strong></li>
<li><strong>Is it needed now, or can it wait?</strong></li>
</ul>
<div style="margin-top:16px; font-size:0.72em; color:var(--body); line-height:1.6;">
A list of 8 actual pages beats "a normal website" every single time.
</div>
</div>
</div>

---

# 06 · What it does

## The clickable stuff — anything more than just reading

<div style="margin-top:16px;" class="row">
<div class="col">
<h3>Common things people ask for</h3>
<div class="q-block"><strong>Contact forms.</strong> What should people fill in? Where should the message go?</div>
<div class="q-block"><strong>Online store.</strong> How many products? How do people pay?</div>
<div class="q-block"><strong>Booking.</strong> Appointments, reservations, classes — how does it work?</div>
<div class="q-block"><strong>Accounts.</strong> Do visitors log in? What can they do once they're in?</div>
</div>
<div class="col">
<h3>For each thing, describe</h3>
<div class="q-block"><strong>What the visitor puts in.</strong> (Their name, email, date, etc.)</div>
<div class="q-block"><strong>What happens next.</strong> (They see a thank-you page, get an email, etc.)</div>
<div class="q-block"><strong>What if something goes wrong.</strong> (What do they see if they mess up?)</div>
<div class="q-block"><strong>What you see on your end.</strong> (An email? A list in a dashboard?)</div>
</div>
</div>

<div style="margin-top:12px; font-size:0.7em; color:var(--label);">Try saying it like a little story: <em>"A customer fills in their name, email, and message, then they get a confirmation email, and I get a notification."</em></div>

---

# 07 · Examples

## Websites you love, websites you don't — and why

<div style="margin-top:22px;" class="row">

<div class="col card" style="border-top: 2px solid var(--green);">
<div class="idx" style="color:var(--green);">Love</div>
<div class="ttl" style="margin-top:6px;">Three sites you like</div>
<ul style="margin-top:10px;">
<li>Send the actual web addresses</li>
<li>Say exactly what you like — the colors? The layout? The photos?</li>
<li>Be specific. "The homepage" is better than "the whole thing"</li>
</ul>
</div>

<div class="col card" style="border-top: 2px solid var(--red);">
<div class="idx" style="color:var(--red);">Dislike</div>
<div class="ttl" style="margin-top:6px;">Three sites you don't</div>
<ul style="margin-top:10px;">
<li>What made you close the tab?</li>
<li>Too busy? Too plain? Hard to read? Confusing?</li>
<li>What you don't want is just as useful to know</li>
</ul>
</div>

<div class="col card" style="border-top: 2px solid var(--yellow);">
<div class="idx" style="color:var(--yellow);">Surprising</div>
<div class="ttl" style="margin-top:6px;">A site from a totally different field</div>
<ul style="margin-top:10px;">
<li>Run a bakery but love a law firm's site? Say so</li>
<li>It helps your site stand out</li>
<li>Often the most useful example you'll give</li>
</ul>
</div>

</div>

---

# 08 · The basics

## Behind-the-scenes stuff — the person building will ask about these

<div style="margin-top:18px;" class="row">
<div class="col card">
<div class="bar"></div>
<div class="idx">The setup</div>
<div class="ttl" style="margin-top:6px;">Where it lives online</div>
<div class="stat-row"><span class="k">Web address</span><span class="v">Do you own one already?</span></div>
<div class="stat-row"><span class="k">Current site</span><span class="v">Is there one to replace?</span></div>
<div class="stat-row"><span class="k">Who hosts it</span><span class="v">Or do you need that set up?</span></div>
<div class="stat-row"><span class="k">Your email</span><span class="v">Same as the website address?</span></div>
</div>
<div class="col card">
<div class="bar"></div>
<div class="idx">Other tools</div>
<div class="ttl" style="margin-top:6px;">Things to connect</div>
<div class="stat-row"><span class="k">Email list</span><span class="v">Already using Mailchimp, etc.?</span></div>
<div class="stat-row"><span class="k">Payments</span><span class="v">How do people pay you now?</span></div>
<div class="stat-row"><span class="k">Calendar</span><span class="v">For bookings and appointments</span></div>
<div class="stat-row"><span class="k">Social</span><span class="v">Facebook, Instagram, etc.</span></div>
</div>
</div>

<div style="margin-top:14px; font-size:0.7em; color:var(--label);">Also mention: <em>when you need it done</em>, <em>how much you can spend</em>, and anyone else who has to approve things.</div>

---

# 09 · What "done" means

## What has to happen for the website to count as a win?

<div style="margin-top:22px;" class="row">
<div class="col">
<h3>Pick something you can check</h3>
<div class="q-block"><strong>Number of calls or emails</strong> coming in each week</div>
<div class="q-block"><strong>Bookings or sales</strong> made through the site</div>
<div class="q-block"><strong>New sign-ups</strong> to your mailing list</div>
<div class="q-block"><strong>Where you are today</strong> so you can see the change</div>
</div>
<div class="col">
<h3>Or just be honest</h3>
<div style="font-size:0.78em; color:var(--body); line-height:1.6; margin-top:8px;">
Sometimes the goal isn't a number. Sometimes it's:

<em>"I need a site I'm not embarrassed to share."</em>

<em>"I want to look legit when I hand out business cards."</em>

That totally counts. Just say it out loud. A clear reason beats a made-up number.
</div>
</div>
</div>

---

# Things that go wrong

## The stuff that slows projects down over and over

<div style="margin-top:20px;">

<details>
<summary>01 · "Make it look like [famous company]"</summary>
<p>Big companies have huge teams working on their sites for years. Instead of pointing to the whole thing, pick the one specific part you like — the colors, the photos, the way the menu works. That's something someone can actually build.</p>
</details>

<details>
<summary>02 · "We'll figure out the words later"</summary>
<p>The words shape how everything looks. If they show up after the site is designed, whole sections usually have to be rebuilt. Write them first. It feels slower but actually saves time.</p>
</details>

<details>
<summary>03 · Adding new things halfway through</summary>
<p>"Oh, can we also add a blog? And a newsletter? And a chat thing?" Every addition after the plan is set costs more than if it had been there from the start. Put everything on the list up front. Then cut what you don't need.</p>
</details>

<details>
<summary>04 · Too many people giving opinions</summary>
<p>When five people give feedback, they usually disagree with each other. Pick one person to make final decisions. Others can weigh in, but only one voice says "yes, ship it."</p>
</details>

</div>

---

# The checklist

## Tick all of these and you're ready to go

<div style="margin-top:22px;" class="checklist">
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I can say what the site is for in one sentence</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I've described my main visitor</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I have my logo file ready</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I picked my colors</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I know the tone I want</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I wrote the words for every page</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I have good photos ready</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I listed every page</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I described each clickable feature</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I shared 3 sites I like, 3 I don't</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I know my web address situation</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I listed my other tools</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I know what success looks like</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> One person has the final say</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I shared my timeline and budget</div>
<div><input type="checkbox" checked style="accent-color:var(--accent);"/> I'm ready to answer questions</div>
</div>

---

<!-- _class: lead -->

<h3 style="color:var(--accent); letter-spacing:0.3em;">THE BIG IDEA</h3>

# The more you say, the better it'll be

<div class="divider"></div>

<h2 style="max-width:780px;">A website is only as good as the instructions behind it. The clearer you are up front, the closer the finished site will be to what you imagined.</h2>

<div style="margin-top:30px;">
<span class="pill">You've got this</span>
</div>
