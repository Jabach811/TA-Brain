/**
 * TA Brain — Gmail → GitHub bridge.
 *
 * Watches a Gmail label. For every unread message with that label,
 * any .md (or other allowed) attachment is committed to the `raw/`
 * folder of a private GitHub repo via the REST API. That commit
 * triggers the GitHub Actions workflow that rebuilds wiki.html.
 *
 * SETUP
 * 1. Go to https://script.google.com → New project → paste this file.
 * 2. Project Settings → Script Properties → add:
 *      GITHUB_OWNER     = your GitHub username or org
 *      GITHUB_REPO      = your repo name (e.g. ta-brain)
 *      GITHUB_BRANCH    = main
 *      GITHUB_TOKEN     = a fine-grained PAT with "Contents: Read/Write" on the repo
 *      GMAIL_LABEL      = TA Brain Ingest
 *      ALLOWED_EXT      = md,txt,markdown       (comma-separated, lowercase)
 *      SUBDIR           = raw                   (where to drop attachments)
 *      DONE_LABEL       = TA Brain Ingested     (optional — adds after success)
 * 3. Run `ingestOnce` once manually to grant permissions (Gmail + URL Fetch).
 * 4. Triggers (clock icon) → add time-driven trigger: `ingestOnce` every 5 minutes.
 *
 * USAGE
 *   Email yourself a markdown file as an attachment.
 *   Apply the GMAIL_LABEL (manually, or via a Gmail filter:
 *     has:attachment filename:md → Apply label "TA Brain Ingest")
 *   Within 5 minutes it lands in raw/ and the wiki rebuilds.
 */

function ingestOnce() {
  const P = PropertiesService.getScriptProperties().getProperties();
  const required = ['GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_TOKEN', 'GMAIL_LABEL'];
  for (const k of required) {
    if (!P[k]) throw new Error('Missing script property: ' + k);
  }
  const label = GmailApp.getUserLabelByName(P.GMAIL_LABEL);
  if (!label) throw new Error('Gmail label not found: ' + P.GMAIL_LABEL);

  const branch     = P.GITHUB_BRANCH || 'main';
  const allowedExt = (P.ALLOWED_EXT || 'md,txt,markdown')
                       .split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const subdir     = (P.SUBDIR || 'raw').replace(/\/+$/, '');
  const doneLabel  = P.DONE_LABEL ? GmailApp.getUserLabelByName(P.DONE_LABEL) || GmailApp.createLabel(P.DONE_LABEL) : null;

  const threads = label.getThreads(0, 25);
  let commits = 0, skipped = 0;

  for (const thread of threads) {
    const messages = thread.getMessages();
    let threadHandled = false;
    for (const msg of messages) {
      if (!msg.isUnread()) continue;
      const attachments = msg.getAttachments({ includeInlineImages: false });
      if (!attachments.length) { msg.markRead(); continue; }

      let anyCommitted = false;
      for (const att of attachments) {
        const name = att.getName();
        const ext  = (name.split('.').pop() || '').toLowerCase();
        if (!allowedExt.includes(ext)) { skipped++; continue; }

        const safeName = sanitizeName_(name);
        const path     = subdir + '/' + safeName;
        const body     = att.getBytes();

        const ok = putFile_({
          owner:   P.GITHUB_OWNER,
          repo:    P.GITHUB_REPO,
          token:   P.GITHUB_TOKEN,
          branch:  branch,
          path:    path,
          bytes:   body,
          message: 'ingest: ' + safeName + ' (via Gmail bridge)',
        });
        if (ok) { commits++; anyCommitted = true; }
      }
      if (anyCommitted) {
        msg.markRead();
        if (doneLabel) thread.addLabel(doneLabel);
        threadHandled = true;
      }
    }
    if (threadHandled) thread.removeLabel(label);
  }
  Logger.log('ingestOnce done: %s committed, %s skipped', commits, skipped);
}

function sanitizeName_(name) {
  // lowercase, spaces→hyphens, strip anything scary
  const dot = name.lastIndexOf('.');
  const base = (dot > 0 ? name.slice(0, dot) : name).toLowerCase()
                .replace(/[^a-z0-9._-]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .slice(0, 100);
  const ext  = dot > 0 ? name.slice(dot).toLowerCase().replace(/[^a-z0-9.]+/g, '') : '';
  const stamp = Utilities.formatDate(new Date(), 'UTC', 'yyyyMMdd-HHmmss');
  return (base || 'note') + '-' + stamp + ext;
}

function putFile_(opts) {
  const url = 'https://api.github.com/repos/' + opts.owner + '/' + opts.repo + '/contents/' + encodeURI(opts.path);
  const contentB64 = Utilities.base64Encode(opts.bytes);
  const payload = {
    message: opts.message,
    content: contentB64,
    branch:  opts.branch,
  };
  const res = UrlFetchApp.fetch(url, {
    method:  'put',
    muteHttpExceptions: true,
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + opts.token,
      'Accept':        'application/vnd.github+json',
      'User-Agent':    'ta-brain-gmail-bridge',
    },
    payload: JSON.stringify(payload),
  });
  const code = res.getResponseCode();
  if (code >= 200 && code < 300) return true;
  Logger.log('GitHub PUT failed [%s]: %s', code, res.getContentText().slice(0, 300));
  return false;
}
