# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Note: `CLAUDE.md` is a symlink to this file (`AGENTS.md`) — open-slide's convention so Claude Code and other agents share one guide. Edit `AGENTS.md`.

This is an **open-slide workspace** (`TDNA-slide`): presentation decks authored as React components. You are authoring **slides** here — every slide is arbitrary React code that you write. The `@open-slide/core` runtime handles layout, scaling, navigation, thumbnails, and fullscreen play mode; you only write the page components.

## Commands

```bash
pnpm install            # install deps (use pnpm, never npm)
pnpm dev                # dev server with hot reload (default port 5173; falls back to 5174+ if taken)
pnpm build              # static bundle into dist/
pnpm preview            # preview the built bundle locally
pnpm sync:skills        # re-sync .claude/skills from @open-slide/core
pnpm exec open-slide sync:skills --dry-run   # preview skill drift without writing
```

There is **no test or lint setup** — this is a slides project, not an application. "Verification" means running `pnpm dev` and visually checking the slide renders within the 1920×1080 canvas without overflow or console errors. The chrome-devtools MCP is the tool of choice: open `http://localhost:<port>/s/<slide-id>`, screenshot, and check the console.

## Hard rules

- Put each slide under `slides/<kebab-case-id>/`; the entry is `slides/<id>/index.tsx`.
- A slide is **one `index.tsx` plus an `assets/` folder** — never sibling `.tsx`/`.ts` files. Helper components and constants go *inside* `index.tsx`.
- Slide-specific images/videos/fonts go under `slides/<id>/assets/` (imported with relative paths). Assets reused across decks/themes (logos, avatars) go in the root `assets/` folder, imported via the **`@assets/...`** alias.
- Do **not** add dependencies — only `react` and standard web APIs are available. (Notably: no icon library; `lucide-react` exists in `node_modules` as a `@open-slide/core` internal dep but must not be imported. Inline lucide SVG paths instead.)
- Do **not** edit `package.json`, `open-slide.config.ts`, `tsconfig.json`, or other people's slides as part of slide authoring. (Repo-maintenance changes the owner explicitly asks for are a separate matter.)
- The skills under `.claude/skills/` are managed by `@open-slide/core` — never edit them in place; re-sync with `pnpm sync:skills`.

## Architecture

**The page-array contract.** `slides/<id>/index.tsx` default-exports a non-empty array of zero-prop React components — one per page, in order: `export default [Cover, Body, …] satisfies Page[]`. The framework discovers every folder under `slides/` automatically (no registration). A slide module may also export:
- `meta: SlideMeta` — `{ title?, theme?, createdAt? }`. `theme` back-links to a `themes/<id>.md`; `createdAt` is an ISO string literal read by a build-time regex (not evaluated), used for default sort.
- `design: DesignSystem` — typed palette/fonts/typeScale/radius. The framework injects these as CSS vars (`var(--osd-bg)`, `--osd-accent`, `--osd-size-hero`, …) at the canvas root, and the dev-UI **Design panel** edits them live. Reference vars from inline styles for instant tweakability.
- `notes: (string | undefined)[]` — **module-level** presenter notes, index-aligned to the page array (0-based). Shown only in Present mode's speaker view / Notes drawer, never on the projected slide. This is where speaker scripts live.

**The fixed canvas.** Every page renders into a hard **1920×1080** canvas that does *not* scroll — design with absolute pixels (no `rem`/`vw`/`%` for type), and content below 1080px is silently cropped. The single biggest authoring failure is vertical overflow; budget height before writing JSX. The full type scale, spacing, and self-review checklist live in the `slide-authoring` skill.

**Themes are documentation, not code.** A theme is a paired bundle under `themes/`: `<id>.md` (palette, typography, paste-ready Title/Footer/Eyebrow components, motion) plus `<id>.demo.tsx` (a preview-only `Page[]` module the dev-UI Themes panel renders — it is *not* a real slide and never goes under `slides/`). `create-slide` reads the markdown and copies its tokens/components into the real slide.

**Repeated visual elements → explicit components, never `array.map`.** The inspector edits source JSX in place, so a `map` body is one shared source location that mutates every instance at once. Define a small component and instantiate it per item (`<Card />`, `<Card />`, `<Card />`). Plain `<li>` bullet lists are fine. Page numbers in footers must come from `useSlidePageNumber()` — never hardcode `n`/`total`.

**Deployment** is a static SPA: `pnpm build` → `dist/`, served with a catch-all rewrite to `/index.html` (configured in `vercel.json` and `netlify.toml`).

## Which skill to use

These five skills are installed under `.claude/skills/`. Invoke them via the Skill tool before the corresponding work — they own the *how*.

- **`create-slide`** — drafting a new deck (scoping questions → structure → hand-off). Reads themes first.
- **`slide-authoring`** — the technical reference for everything inside `slides/<id>/`: file contract, canvas rules, type scale, layout, palette, assets, anti-patterns. Consult before *any* ad-hoc slide write/edit; `create-slide` and `apply-comments` defer to it.
- **`create-theme`** — authoring/extracting a theme bundle (`themes/<id>.md` + `.demo.tsx`).
- **`apply-comments`** — applying pending `@slide-comment` markers left by the inspector inside `slides/<id>/index.tsx`.
- **`current-slide`** — resolving deictic references ("this page", "this element") to a concrete slide/page/element. Reads the dev server's `node_modules/.open-slide/current.json` fresh each time (the user navigates between turns).

## Decks in this repo

- `slides/getting-started/` — the framework's intro deck (shipped with the scaffold).
- `slides/taitung-2026/` — "From Vibe to Spec" workshop deck (59 pages, three blocks B1/B2/B3), using the `taitung` theme. Audience is **non-engineers / beginners**: keep on-slide examples free of file paths and hex codes, explain each English term on first use, and put the full speaker script in the `notes` export.
