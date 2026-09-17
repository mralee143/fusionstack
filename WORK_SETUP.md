# Portfolio — how to add your own images and data

The Work section on the home page reads from **one file**:
[`lib/projects.ts`](lib/projects.ts).

Clicking **View** on a card opens `/work/<slug>`
([`app/work/[slug]/page.tsx`](app/work/%5Bslug%5D/page.tsx)). That page exists
and routes correctly, but it is **deliberately empty** — the content goes in
there whenever you're ready.

## 1. Images

Each project has its own folder under `public/work/<slug>/`:

```
public/work/atlas-commerce/
  cover.jpg   ← the card image      (landscape, 1600×1200 or bigger)
  01.jpg      ← spare / gallery     (landscape, 1600×1000 or bigger)
  02.jpg
  03.jpg
```

Just **overwrite these files with your own, keeping the same names** — no code
change needed. JPG or PNG both work (if you use PNG, change the extension in
`lib/projects.ts` too).

The files there now are auto-generated placeholders:

```bash
npm run work-images            # only writes files that don't exist yet — never overwrites yours
npm run work-images -- --force # regenerate all placeholders from scratch
```

## 2. Text

Open `lib/projects.ts` and edit each entry. What is actually on screen today:

| Field | Where it shows |
| --- | --- |
| `category` | The service name printed under each card — the only text on the card |
| `year` | Top-right corner of the card image |
| `cover` | The card image |
| `title` | Card's accessible label, browser tab title of `/work/<slug>` |

The rest of the fields (`summary`, `client`, `duration`, `services`, `stack`,
`overview`, `challenge`, `solution`, `results`, `gallery`, `live`) are already
filled in and ready — they are simply not rendered anywhere yet, so they are
waiting for the detail page to be built.

## 3. Adding a new project

1. Copy any entry in `projects` and change the `slug` (this becomes the URL:
   `/work/<slug>`).
2. Create `public/work/<slug>/` and drop your images in, or run
   `npm run work-images` for placeholders.
3. That's it — it appears in the home grid, in the ⌘K search, and gets its own
   (empty) route automatically.

To remove a project, delete its entry and its image folder.
