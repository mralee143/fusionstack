# Contact form → Google Sheet

The contact form POSTs each submission to a **Google Apps Script Web App**, which
appends a row to your Google Sheet. No paid service, no credentials in the app —
just one deployment URL you paste into `.env.local`.

## 1. Create the Sheet + script

1. Create a new Google Sheet (this is where leads land).
2. In the Sheet: **Extensions → Apps Script**.
3. Delete any starter code and paste this:

```js
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Leads') || ss.insertSheet('Leads');

  // Add a header row the first time.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Budget', 'Brief']);
  }

  var p = (e && e.parameter) || {};
  sheet.appendRow([new Date(), p.name || '', p.email || '', p.budget || '', p.brief || '']);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Save**.

## 2. Deploy as a Web App

1. **Deploy → New deployment**.
2. Gear icon → **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. **Deploy** → authorize the permissions when prompted (choose your account →
   Advanced → Go to project → Allow).
5. Copy the **Web app URL** — it ends in `/exec`.

## 3. Connect it to the site

1. Open `.env.local` and paste the URL:
   ```
   NEXT_PUBLIC_SHEET_ENDPOINT=https://script.google.com/macros/s/AKfyc.../exec
   ```
2. Restart the dev server (`npm run dev`) — env vars are only read at startup.
3. Submit the form once; a new row should appear in the **Leads** tab.

### Production (Vercel)

Add the same variable in **Vercel → Project → Settings → Environment Variables**
(`NEXT_PUBLIC_SHEET_ENDPOINT`), then redeploy.

## Notes

- If you change the script later, use **Deploy → Manage deployments → Edit → New
  version** so the same `/exec` URL keeps working.
- The browser sends the request in `no-cors` mode, so the site can't read the
  script's response — it shows "sent" as long as the request left the browser.
  Always verify a test row actually landed in the Sheet after setup.
- Want email notifications too? Add
  `MailApp.sendEmail('you@example.com', 'New lead', JSON.stringify(p));`
  inside `doPost`.
