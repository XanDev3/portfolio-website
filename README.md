# portfolio-website

Personal portfolio site — Next.js **static export**, Tailwind v4, deployed to Vercel.
Direction A ("Quiet Craft").

Stack: Next 16.2.7 · React 19.2.4 · Tailwind v4 · TypeScript 5.

## Getting started

```bash
npm install
npm run dev          # local server on http://localhost:3000
```

Edit the page by changing the section components in `components/`; `app/page.tsx`
composes them in order.

## Scripts

```bash
npm run dev          # next dev
npm run build        # next build — emits the static site to out/
npm run lint         # eslint  (not `next lint` — removed in Next 16)
npm run type-check   # tsc --noEmit
```

## Structure

- `app/` — shell only (`layout.tsx`, `globals.css`, `page.tsx`).
- `components/` — one file per page section; `components/icons/` for custom SVG icons.
- Build output lands in `out/` (`next.config.ts` sets `output: "export"`).

## Deployment

Pushes to `main` run the CI gate (`.github/workflows/ci.yml`); a green gate deploys
the prebuilt output to Vercel production. Vercel's own git auto-deploy is off
(`vercel.json`). See `CLAUDE.md` for the full decision log and gotchas.
