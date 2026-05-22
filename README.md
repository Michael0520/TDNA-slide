# TDNA-slide

Presentation decks authored as React components, built on [open-slide](https://www.npmjs.com/package/@open-slide/core). Each slide lives under `slides/<id>/index.tsx` and default-exports an array of page components; the `@open-slide/core` runtime handles layout, scaling, navigation, thumbnails, and fullscreen play mode — you just write the pages.

## Getting started

```bash
pnpm install
pnpm dev
```

Then open the dev server (default `http://localhost:5173`) and pick a deck.

## Decks

- **`taitung-2026`** — "From Vibe to Spec — Ship Your First Personal Site with AI", the Code for Taiwan × TDF Taitung workshop deck (59 pages, three blocks: B1 懂 / B2 做 / B3 驗). Uses the `taitung` theme. Full speaker script lives in the deck's `notes` export (shown only in Present mode).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server with hot reload. |
| `pnpm build` | Build a static bundle into `dist/`. |
| `pnpm preview` | Preview the built bundle locally. |
| `pnpm sync:skills` | Re-sync the open-slide authoring skills. |

## Authoring a slide

```tsx
// slides/my-slide/index.tsx
import type { Page, SlideMeta } from '@open-slide/core';

const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%' }}>Hello</div>
);

export const meta: SlideMeta = { title: 'My slide' };
export default [Cover] satisfies Page[];
```

Every page renders into a fixed **1920 × 1080** canvas — design with absolute pixel values. Slide-specific images/videos/fonts go under `slides/<id>/assets/`; assets reused across decks (logos) live in the root `assets/` folder and import via `@assets/...`.

See [`CLAUDE.md`](./CLAUDE.md) for the full authoring guide and architecture notes.

## Navigation

- Arrow keys / PageUp / PageDown move between pages.
- `F` enters fullscreen play mode; Esc exits. In play mode: Space / → next, ← prev.
- Present mode has a speaker view / Notes drawer showing the per-page presenter notes.

## Deployment

`pnpm build` produces a static SPA in `dist/`, served with a catch-all rewrite to `/index.html` (configured in `vercel.json` and `netlify.toml`).
