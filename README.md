# dominat8.com

Marketing site for Dominat8. Builder + billing live on [dominat8.io](https://dominat8.io).

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 6
- Tailwind CSS 4 (`@theme` directive)
- ESLint 9 (flat config)

## Scripts

```bash
npm run dev        # local dev (Turbopack)
npm run build      # production build
npm run start      # run built output
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Conventions

See `CLAUDE.md` for project rules — strict stack, banned patterns, pricing source of truth.

All product/builder/billing CTAs point to `https://dominat8.io/builder`.
