# AGENTS

This file helps coding agents work productively in this repository.

## Scope

- Applies to the `digitalx-solutions` Next.js application.
- Prefer small, focused changes; avoid broad refactors unless explicitly requested.

## Fast Start

- Install deps: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Start prod: `npm run start`
- Lint: `npm run lint`
- Type-check: `npm run type-check`

## Project Shape

- App Router pages/routes: `src/app`
- API handlers: `src/app/api/**/route.ts` and `src/app/api/og/route.tsx`
- UI/components: `src/components`
- Static/domain content: `src/data`
- Shared utilities and schemas: `src/lib`
- URL normalization redirects: `src/middleware.ts`

## Conventions

- Use TypeScript strictly; preserve existing types and narrow unions.
- Use `@/` path aliases for internal imports (see `tsconfig.json`).
- Keep server components as default in `src/app`; add `"use client"` only for interactive UI.
- Follow existing Tailwind utility-class style rather than introducing a different styling pattern.
- Reuse existing schema/validation patterns in `src/lib/schemas` when touching form APIs.

## Important Runtime Notes

- Contact/pricing mail APIs require environment variables: `EMAIL_USER`, `EMAIL_PASS`.
- `VERCEL_ENV` affects robots/indexing behavior; avoid changing indexing logic casually.
- `src/middleware.ts` enforces canonical URL behavior (e.g., host/trailing slash). Check redirects when editing routes.
- `src/app/api/og/route.tsx` runs on Edge runtime; mail APIs run on Node runtime.

## Docs To Reference (Link, Do Not Duplicate)

- Project overview: [README.md](README.md)
- AI crawler/site metadata file: [public/llms.txt](public/llms.txt)
- Web app metadata: [public/manifest.json](public/manifest.json)

## Agent Workflow Guidance

- Before editing, inspect nearby route/component/data files to match local patterns.
- After edits, run `npm run lint` and `npm run type-check` for changed areas.
- If behavior changes in routing/SEO, sanity-check `robots.ts`, `sitemap.ts`, and middleware interactions.
- Do not commit generated artifacts unless they are already tracked and intentionally updated.
