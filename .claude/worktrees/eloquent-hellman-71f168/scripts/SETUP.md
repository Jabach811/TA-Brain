# Email-to-Wiki Setup — Step by Step

**What you're building:**
You email yourself a markdown file → Gmail notices it → a helper robot drops
it into your secret online folder → that folder rebuilds your wiki for you.

**Time:** about 20 minutes, one time only.
**You'll need:** a Gmail account, a GitHub account, and this folder on your PC.

Do the steps in order. Don't skip ahead. When a step says **copy this**,
really copy it — typos break everything.

---

## Part 1 — Make your secret online folder (GitHub)

**Why:** GitHub is where your wiki lives online. Private = only you see it.

1. Go to **https://github.com/signup** and make an account if you don't
   have one. Use an email you'll remember.
2. Go to **https://github.com/new**.
3. Fill in the form:
   - **Repository name:** `ta-brain`
   - Click **Private** (the other button, NOT Public)
   - Leave everything else alone
   - Scroll down, click the green **Create repository** button
4. You'll land on a page full of instructions. Ignore them. Keep this tab open.

✅ **Check:** the top of the page should say `<your-username>/ta-brain` and
have a little lock icon next to "Private".

---

## Part 2 — Send your files up to GitHub

**Why:** right now the wiki lives on your PC. We need to put a copy on GitHub
so the robot can rebuild it.

1. Open **Command Prompt** (press the Windows key, type `cmd`, press Enter).
2. Copy-paste this and press Enter:
   ```
   cd "C:\Users\mabac\OneDrive\Desktop\TA Brain"
   ```
3. Copy-paste these one at a time, pressing Enter after each:
   ```
   git init
   git add .
   git commit -m "first upload"
   git branch -M main
   ```
4. Now the important one — **change the username** to yours:
   ```
   git remote add origin https://github.com/YOUR-USERNAME-HERE/ta-brain.git
   ```
5. Then:
   ```
   git push -u origin main
   ```
   It will ask for your GitHub username and password. For the password,
   GitHub now wants a **personal access token**, not your real password.
   That's what Part 3 is for. If it fails here, come back after Part 3.

✅ **Check:** refresh your GitHub repo page. You should see a big list of
files (`build-wiki.py`, `wiki.html`, etc.). If you only see a README, the push
didn't work — try Part 3 first and redo step 5.

---

## Part 3 — Make a special password for the robot (PAT)

**Why:** the Gmail robot needs permission to add files to your GitHub folder.
A Personal Access Token (PAT) is a long password just for robots.

1. Go to **https://github.com/settings/personal-access-tokens/new**
2. Fill in the form exactly:
   - **Token name:** `ta-brain-gmail-bridge`
   - **Expiration:** click the dropdown → **Custom** → pick 1 year from today
   - **Description:** leave blank
   - **Resource owner:** your username (should already be picked)
   - **Repository access:** click **Only select repositories**, then in the
     dropdown that appears, pick `ta-brain`
   - **Permissions** → scroll to **Repository permissions** → find
     **Contents** in the list → change it from **No access** to
     **Read and write**
3. Scroll all the way to the bottom, click the green **Generate token** button.
4. The next page shows a long string that starts with `github_pat_...`.
   **Copy this whole string right now** and paste it into Notepad. You can
   never see it again after you leave this page.

✅ **Check:** you have a string starting with `github_pat_` saved in Notepad.
Don't close Notepad yet.

---

## Part 4 — Teach Gmail to spot incoming markdown files

**Why:** we want Gmail to automatically mark emails that have `.md` files
attached, so the robot knows which ones to grab.

1. Open Gmail.
2. Click the gear icon ⚙ (top-right) → **See all settings**.
3. Click the **Labels** tab along the top.
4. Scroll to the bottom and click **Create new label**.
   - Name: `TA Brain Ingest`
   - Click **Create**.
5. Click **Create new label** again.
   - Name: `TA Brain Ingested`
   - Click **Create**. (This one marks emails that are already done.)
6. Click the **Filters and Blocked Addresses** tab.
7. Click **Create a new filter** (near the bottom).
8. In the **Has the words** box, paste:
   ```
   has:attachment filename:md OR filename:markdown OR filename:txt
   ```
9. Click **Create filter** (bottom-right, NOT the blue search button).
10. On the next screen, check the box for **Apply the label:** and pick
    `TA Brain Ingest` from the dropdown.
11. Click **Create filter**.

✅ **Check:** go back to the main Gmail screen. In the left sidebar you should
see both labels: `TA Brain Ingest` and `TA Brain Ingested`.

---

## Part 5 — Build the Gmail robot (Apps Script)

**Why:** this is the robot that watches your Gmail and moves markdown files
into GitHub.

1. Go to **https://script.google.com** (sign in with the same Gmail).
2. Click **New project** (top-left, blue button).
3. You'll see a code editor with some starter code called `Code.gs`.
4. **Select all that code and delete it.** The editor should be empty.
5. Open the file `scripts/gmail-bridge.gs` on your PC. Copy ALL of it.
6. Paste it into the empty Apps Script editor.
7. Press **Ctrl+S** to save. It will ask for a project name — type
   `TA Brain Gmail Bridge` → **Rename**.
8. Click the ⚙ gear icon on the LEFT sidebar (**Project Settings**).
9. Scroll down to **Script Properties** → click **Edit script properties**.
10. Click **Add script property** eight times, and fill in exactly like this
    (one property per row):

    | Property | Value |
    |---|---|
    | `GITHUB_OWNER` | your GitHub username |
    | `GITHUB_REPO` | `ta-brain` |
    | `GITHUB_BRANCH` | `main` |
    | `GITHUB_TOKEN` | paste the `github_pat_...` token from Notepad |
    | `GMAIL_LABEL` | `TA Brain Ingest` |
    | `DONE_LABEL` | `TA Brain Ingested` |
    | `ALLOWED_EXT` | `md,txt,markdown` |
    | `SUBDIR` | `raw` |

11. Click **Save script properties**.

✅ **Check:** you should see all 8 properties listed with their values
(the token shows as dots, that's normal).

---

## Part 6 — Turn the robot on

**Why:** right now the robot exists but is asleep. We need to wake it up
and tell it to check Gmail every 5 minutes.

1. Click the **Editor** icon in the left sidebar (looks like `<>`).
2. Near the top of the editor there's a dropdown that says "Select function."
   Click it → choose **ingestOnce**.
3. Click the **Run** button (▶ next to the dropdown).
4. A popup appears: **Authorization required** → click **Review permissions**.
5. Pick your Google account.
6. You'll see a scary screen: **"Google hasn't verified this app."**
   That's because YOU are the app author. Click **Advanced** (small link,
   bottom-left) → **Go to TA Brain Gmail Bridge (unsafe)** → **Allow**.
7. The robot runs once. In the bottom of the editor you'll see
   "Execution log" with lines like `ingestOnce done: 0 committed, 0 skipped`.
   That means it worked — it just didn't find any emails yet.

Now set it to run every 5 minutes on its own:

8. Click the **⏰ Triggers** icon (clock) on the left sidebar.
9. Click **+ Add Trigger** (blue button, bottom-right).
10. Fill in:
    - Choose which function to run: `ingestOnce`
    - Choose which deployment should run: `Head`
    - Select event source: `Time-driven`
    - Select type of time based trigger: `Minutes timer`
    - Select minute interval: `Every 5 minutes`
    - Failure notification settings: `Notify me immediately`
11. Click **Save**.

✅ **Check:** the Triggers page now shows one trigger running `ingestOnce`
every 5 minutes.

---

## Part 7 — Try it out!

1. Open Gmail. Compose a new email **to yourself**.
2. Subject: `test`. Body: any text.
3. Attach a markdown file. If you don't have one, make one:
   - Open Notepad. Type `# test note`. Save as `test-note.md` (make sure
     "Save as type" is "All Files" and the extension is `.md`, not `.md.txt`).
   - Attach it in Gmail.
4. Send the email.
5. Within a minute, check Gmail — the email should have the `TA Brain Ingest`
   label (little chip on the message).
6. Wait up to 5 minutes.
7. Go to your GitHub repo → click the `raw` folder. You should see a new
   file like `test-note-20260416-184302.md`.
8. Click the **Actions** tab at the top of the repo. You should see a
   workflow running called "Build wiki". Wait until it has a green check ✅.
9. Go back to the main repo page. Click `wiki.html` → click **Download raw
   file** (the arrow icon, top-right of the file view). Open the downloaded
   file. Your wiki — with the new note ingested — opens in your browser.

🎉 If all this happened, you're done. Repeat step 1-4 anytime you want to
add a page to your wiki.

---

## Where to view the latest wiki at work

Pick one:

- **Easy:** bookmark `https://github.com/YOUR-USER/ta-brain/raw/main/wiki.html`
  and click it whenever. It downloads the latest build. No install.
- **Always-online URL (free, private):** connect the repo to **Cloudflare
  Pages** (https://pages.cloudflare.com) → New project → pick GitHub →
  pick `ta-brain` → leave build command blank → publish directory `/` →
  Save. You'll get a URL like `ta-brain.pages.dev/wiki.html` that updates
  itself every time the Action finishes.

---

## If something doesn't work

- **Gmail label never applies** → your filter didn't match. Check the attachment
  really ends in `.md`, not `.md.txt`. Re-check the filter wording in Part 4
  step 8.
- **Apps Script log says `401` or `403`** → the PAT is wrong or expired.
  Redo Part 3, update `GITHUB_TOKEN` in Script Properties.
- **Action runs but fails** → click into the red X in the Actions tab, read
  the error message, and send me a screenshot.
- **I get lost** → tell me which Part / step number you're on.
