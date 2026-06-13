# TED Academy — landing site

Public marketing site for TED Academy. Built with **Next.js 15 App Router**,
Tailwind v4, framer-motion, next-intl. All editable content (hero, courses,
testimonials, contacts…) comes from the LMS API at `GET /public/site`; the
admin manages it from `/owner/site/*` in the LMS cabinet.

## Local development

```bash
cd frontend-landing
cp .env.example .env.local      # set BACKEND_API_URL (defaults to localhost:8000)
pnpm install
pnpm dev
```

The site reads from the LMS backend at `BACKEND_API_URL`. Make sure that
backend is running (`uv run uvicorn app.main:app --reload`) and migration `0022`
is applied so the seeded landing content exists.

## URL routing

* `/` — Russian (default, no locale prefix).
* `/en` — English.
* `/az` — Azerbaijani.

Powered by `next-intl` middleware with `localePrefix: 'as-needed'`.

## Revalidation

Owner saves landing content in the LMS → backend POSTs to `/api/revalidate`
with HMAC-signed timestamp → `revalidateTag('site')` fires → the very next
visitor sees the updated bundle.

In dev, leave `REVALIDATE_SECRET=` empty on **both** sides (backend
`LANDING_REVALIDATE_SECRET` and landing `REVALIDATE_SECRET`); the webhook
will be accepted unsigned. **In production both values MUST be set to the
same non-empty string.**

## Form intake

The lead form POSTs to `/api/lead` (Next.js route handler). The handler
forwards the JSON body server-side to the backend's
`POST /public/leads`, so the backend URL is never exposed to the browser.

A hidden honeypot field (`website`) protects against the simplest bots —
filled-in submissions are silently dropped on the backend (`201 OK`,
no row created).

## Scripts

| Command          | Purpose                          |
| ---------------- | -------------------------------- |
| `pnpm dev`       | dev server                       |
| `pnpm build`     | production build                 |
| `pnpm start`     | run the built app                |
| `pnpm typecheck` | strict `tsc --noEmit`            |
| `pnpm lint`      | ESLint (next/core-web-vitals)    |
