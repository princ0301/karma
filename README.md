# Karma — NGO Website

A Next.js website for Karma, covering Home, About, Programs, a Journal
(blog), Donate, and Contact — with a working contact form.

## Running it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

Almost everything is plain text/JSX, so you can edit it directly:

- **Cause areas** (used on Home and Programs): `src/lib/causes.ts`
- **Home page copy**: `src/app/page.tsx`
- **About page copy**: `src/app/about/page.tsx`
- **Donate page copy**: `src/app/donate/page.tsx`
- **Contact info**: `src/app/contact/page.tsx`
- **Footer** (email, phone, registration numbers): `src/components/Footer.tsx`

Anything wrapped in `[square brackets]` is a placeholder — search the
project for `[Add` to find everything that still needs real content.

## Setting up the database (required)

The blog now runs on a real database with a password-protected admin
area, instead of files — so a few people can write posts from the
browser, from anywhere.

1. **Create a free Postgres database.** The easiest option is
   [neon.com](https://neon.com) (or Supabase, or Vercel Postgres —
   any Postgres works). Create a project and copy the connection
   string it gives you (looks like
   `postgresql://user:password@host/dbname?sslmode=require`).

2. **Set up your environment file:**
   ```bash
   cp .env.example .env.local
   ```
   Then open `.env.local` and fill in:
   - `DATABASE_URL` — the connection string from step 1
   - `NEXTAUTH_SECRET` — any random string. Generate one with
     `openssl rand -base64 32`, or use
     https://generate-secret.vercel.app/32
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — the login you'll use
     to sign in the first time

3. **Create the database tables:**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Create your first admin account and sample posts:**
   ```bash
   npm run db:seed
   ```

5. **Run the app:**
   ```bash
   npm run dev
   ```

## Writing blog posts (from the browser)

1. Go to `http://localhost:3000/admin/login` and sign in with the
   email/password you set in `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`.
2. Click **New post** — fill in title, excerpt, content (Markdown is
   supported: `##` for headings, `**bold**`, lists, links, etc.),
   an optional cover image URL, and comma-separated tags.
3. Leave **Published** checked to make it live immediately, or
   uncheck it to save as a draft.
4. Click **Publish** — it appears on `/blog` right away.

You can edit or delete any post from the `/admin` dashboard at any time.

### Adding more people who can write posts

Sign in as an admin and go to `/admin/team`. Fill in their name, email,
and a temporary password, and choose their role:
- **Author** — can write, edit, and delete their own posts
- **Admin** — can also add/remove other team members

Share the email and temporary password with them directly (there's no
automatic invite email yet) — they can sign in right away at
`/admin/login`. You can remove someone's account from the same page
at any time (except your own, and except accounts with published
posts still attached — reassign or delete those first).

## Adding images

Drop image files into `public/images/` and reference them as
`/images/your-file.jpg` — either in a blog post's cover image field,
or by adding `<Image>` tags elsewhere in the site.


## Contact form (real email sending)

The contact form sends real emails via [Resend](https://resend.com).

1. Create a free Resend account and get an API key.
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in:
   - `RESEND_API_KEY` — your Resend API key
   - `CONTACT_TO_EMAIL` — the email address that should receive messages
   - `CONTACT_FROM_EMAIL` — leave as `onboarding@resend.dev` for testing,
     or use an address on a domain you've verified with Resend for
     production (Resend's test address only delivers to the email you
     signed up with)
4. Restart the dev server after adding environment variables.

## Deploying

The easiest option is [Vercel](https://vercel.com) (made by the same
team as Next.js):

1. Push this project to a GitHub repository.
2. Import it at vercel.com/new.
3. Add all the environment variables from `.env.local` in the Vercel
   project settings (Settings → Environment Variables) — including
   `DATABASE_URL` and `NEXTAUTH_SECRET`.
4. Also set `NEXTAUTH_URL` to your live site URL (e.g. `https://karma.org`).
5. Deploy. Vercel runs `npm install`, which automatically generates
   the Prisma client via the `postinstall` script.
6. Run the database migration once against your production database
   (from your own machine, pointed at the production `DATABASE_URL`):
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

## Still to do before launch

- Replace placeholder text (anything in `[brackets]`) with real content
- Add real photos to `public/images/` and reference them where needed
- Fill in your NGO registration / 12A / 80G numbers in the footer and
  Donate page
- Set up real payment details or a payment gateway on the Donate page
- Set up the Resend account and environment variables for the contact form
- Update the impact numbers on the homepage (currently placeholders)
- Set up the database and admin account (see above) before anyone
  tries to write a blog post
