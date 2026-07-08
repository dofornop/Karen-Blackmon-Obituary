# In Loving Memory of Karen Sue Blackmon

A Next.js site with the obituary, a photo gallery, and a live guestbook.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The guestbook works locally out of the box —
it stores messages in a local SQLite file (`.local-data/guestbook.db`,
already git-ignored) so no external database is needed for development.

## Adding photos

Drop image files into `public/images/gallery/` — that's it. The gallery
page automatically picks up every image in that folder, sorted by
filename, with a caption generated from the filename (so
`karen-1969-graduation.jpg` becomes "karen 1969 graduation"; name your
files accordingly, e.g. `findlay-college-graduation-1969.jpg`).

You can add photos either by editing locally and pushing to GitHub, or by
uploading them directly through GitHub's website (open the
`public/images/gallery` folder in the repo, click **Add file → Upload
files**, drag photos in, commit) — Vercel redeploys automatically either
way, no code changes needed.

For the hero photo on the home page, add an image at
`public/images/karen-hero.jpg` (any square-ish photo works well).

## The admin page

Visit `/admin` to delete inappropriate guestbook messages. The password is
set via the `ADMIN_PASSWORD` environment variable (see `.env.local` for
local dev, and set it in Vercel's project settings for production — pick
something only your family knows).

## Deploying

1. Push this repo to GitHub.
2. Import the repo into [Vercel](https://vercel.com/new).
3. In the Vercel project's **Storage** tab, add a Postgres (Neon)
   database — this connects automatically via the `DATABASE_URL`
   environment variable, and the guestbook will use it instead of the
   local SQLite fallback.
4. In **Settings → Environment Variables**, set `ADMIN_PASSWORD`.
5. Deploy. Your site will be live at `<project-name>.vercel.app`.
