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

1. Drop image files into `public/images/gallery/`.
2. List them in `lib/photos.js`:
   ```js
   export const photos = [
     { src: "/images/gallery/karen-1969-graduation.jpg", caption: "Findlay College graduation, 1969" },
   ];
   ```
3. For the hero photo on the home page, add an image at
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
