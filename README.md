# modulbit-website

The ModulBit company website — who we are, what we're building (Tara, an AI assistant
for elderly users), our roadmap, and how to get involved. Live in English and Czech.

Built with Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4
and [reactflow](https://reactflow.dev/) for the roadmap visualization.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

Production runs in Docker (`output: "standalone"`, port 3000). CI builds the image and
pushes it to the Forgejo registry on every push to `main`; deployment is handled by the
`modulbit-website` role in the `ansible` repo.

## How the site is put together

```
app/
  [lang]/               # all pages live under a locale segment (en, cs)
    layout.tsx          # root layout: fonts, <html lang>, TopBar
    page.tsx            # homepage with the terminal hero animation
    about-us/           # mission + team
    explore-projects/   # Tara: what it does, UX principles, privacy
    get-involved/       # contact / contributing
    report-bug/         # bug report form
    roadmap/            # reactflow roadmap
    error.tsx           # localized error boundary
  api/
    bug-report/         # POST → creates an issue in modulbit/tickets
    github-webhook/
  global-not-found.tsx  # the 404 page (see below)
  globals.css
components/             # shared components (TopBar, Footer, forms, ...)
dictionaries/           # en.ts + cs.ts — all UI strings
lib/                    # locales.ts, dictionaries.ts, tickets.ts
proxy.ts                # locale detection + redirect (Next 16 middleware)
```

Pages are server components, prerendered statically for both locales
(`generateStaticParams`). Interactive bits (hero animation, bug report form, roadmap,
language switcher) are client components that get their strings passed in as props, so
the dictionaries stay out of the client bundle.

Styling is Tailwind utilities inline, following the brand assets in `modulbit-design`
(palette, Poppins for headings, Inter for body — both loaded with the `latin-ext`
subset so Czech diacritics render correctly).

## Languages / how the switch works

I went with the official Next.js i18n pattern instead of a client-side context, so
every page stays statically generated in both languages:

1. **Locale-prefixed routes.** Everything lives under `app/[lang]/`, so each page
   exists as `/en/...` and `/cs/...`. Locales are defined in `lib/locales.ts`
   (`en` is the default), and pages translate via
   `getDictionary(lang)` from `lib/dictionaries.ts`, which picks the right file from
   `dictionaries/`.

2. **Detection + redirect in `proxy.ts`.** Requests without a locale prefix get
   redirected: first the `NEXT_LOCALE` cookie wins, then the `Accept-Language` header,
   then the `en` fallback. So `/about-us` → `/cs/about-us` for a Czech browser.
   API routes, Next internals and static files are excluded by the matcher.

3. **The switcher** (`components/language-switcher.tsx`, in the TopBar) just swaps the
   locale segment of the current path and stores the choice in the `NEXT_LOCALE`
   cookie (valid one year), so the redirect respects it next time.

4. **The 404 page** was the tricky part. Because the root layout sits inside the
   dynamic `[lang]` segment, Next.js can't compose a server-rendered `not-found.js`
   for it (you get an empty client-rendered shell). The fix is the experimental
   `global-not-found.tsx` (enabled via `experimental.globalNotFound` in
   `next.config.ts`), which renders a full HTML document at the routing level. It
   can't receive a locale param, so it renders both language variants and a tiny
   inline script sets `<html lang>` from the URL before first paint; CSS then shows
   the matching variant. No flash, real 404 status, English as the no-JS fallback.
   Heads-up for upgrades: check that the flag still exists (or has gone stable).

Adding a string: add it to `dictionaries/en.ts`, and TypeScript will force the same
key in `cs.ts` (the `Dictionary` type is derived from the English file). Adding a
locale: extend `locales` in `lib/locales.ts` and add a dictionary file.

## Bug report form setup

The `/report-bug` page submits reports to `modulbit/tickets` by creating GitHub issues
through the API route `POST /api/bug-report`.

To enable issue creation, set this environment variable on the server:

```bash
GITHUB_TICKETS_TOKEN=your_github_token_with_repo_issue_access
```
