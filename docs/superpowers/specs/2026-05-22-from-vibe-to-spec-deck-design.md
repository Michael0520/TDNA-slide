# From Vibe to Spec — Workshop Deck Design

**Date:** 2026-05-22
**Author:** Michael Lo (Code for Taiwan)
**Status:** Approved design — ready for implementation plan

## Goal

Build the main speaker deck for the full-day workshop **"From Vibe to Spec — Ship Your First Personal Site with AI"**, part of Taiwan Digital Fest × Code for Taiwan, held at Taitung University Chihpen Campus. The deck guides the presenter through the entire workshop: opening, core concepts, the Claude Code workflow, the hands-on build stages, and the wrap-up.

The deck is itself authored with open-slide + Claude Code — a deliberate **meta point**: the presentation demonstrates the very vibe→spec, AI-assisted workflow it teaches.

## Audience & Context

- ~24 registered participants, mixed experience, interested in shipping a real personal website.
- Full-day, hands-on workshop. This deck is the **presenter's main deck**, not a handout — slides set up each phase, then participants build.
- Prerequisites participants bring: macOS/Linux laptop, active Claude Code subscription, GitHub account, free PostHog account.
- Workshop outcomes participants leave with: a deployed personal website, a reusable AI dev workflow, and verification methods.

## Decisions

| Decision | Choice |
|----------|--------|
| Framework | open-slide (agent-native React slide framework) |
| Project location | `/Users/luoziming/github-project/from-vibe-to-spec` (new, independent of `code4tw`) |
| Scaffold command | `npx @open-slide/cli init from-vibe-to-spec` |
| Canvas | 1920 × 1080 fixed (open-slide default) |
| Primary language | English (with workshop terms kept in English) |
| Visual style | Dark, tech aesthetic |
| Accent color | Claude orange `#D97757` on dark grey/near-black background |
| Authoring flow | open-slide `/create-slide` + `/slide-authoring`, filled collaboratively |
| Package manager | pnpm (matches both open-slide and user CLAUDE.md) |

## Deck Structure

Target: ~25–35 slides across five sections.

### 1. Opening (4 slides)
- Title slide: "From Vibe to Spec — Ship Your First Personal Site with AI" + Taiwan Digital Fest × Code for Taiwan + location.
- Speaker intro: Michael Lo, Senior Software Engineer, Code for Taiwan.
- Promise of the day: "You'll leave with a deployed personal website + a reusable workflow."
- Agenda overview: the five phases of the day.

### 2. Concept — Vibe → Spec (6–8 slides)
- How websites work, at a glance (just enough mental model).
- What "vibe coding" is, and where it breaks down (drift, rework, fragile output).
- What Spec-Driven Development is.
- Why a spec makes AI more reliable (clear contract → better generation).
- **Meta highlight slide:** "This deck was built this way" — show that the presentation itself was generated with Claude Code + open-slide from a spec, mirroring the workshop method.

### 3. Tool — Claude Code Workflow (6–8 slides)
- What Claude Code is.
- The core loop (describe → generate → verify → refine).
- Skills / slash commands as reusable workflow.
- Live-demo lead-in slide(s) — full-bleed framing for switching to the terminal.

### 4. Hands-On Build Stages (8–10 slides)
One "section divider + steps" pairing per phase:
- Scaffold the site.
- Write the spec.
- Develop with Claude Code.
- Deploy on Vercel.
- Add PostHog analytics.
- Verify the deployed work.

### 5. Wrap-Up (3–4 slides)
- Recap of what was built.
- The reusable workflow to take home.
- Resources / links / QR code.
- Q&A / closing slide.

## Design System

- **Background:** dark grey / near-black.
- **Accent:** Claude orange `#D97757` for emphasis, key terms, dividers, progress markers.
- **Type:** large headlines in English; concise body text (presenter deck, not dense handout).
- **Layout patterns to reuse:** title slide, section divider, step list, code/terminal frame, full-bleed demo lead-in, resource/QR slide.
- **Motion:** to be decided during `/create-slide` (one of its four scoping questions); default to subtle/minimal for a presenter deck.

## Non-Goals (YAGNI)

- Not a recruitment/marketing deck.
- Not a participant handout with full step-by-step instructions (those live in the live demo + repo).
- No per-slide speaker-note scripting in this spec — notes can be added in open-slide presenter mode later.
- No custom build tooling beyond what `@open-slide/cli init` scaffolds.

## Open Questions (resolve during authoring)

- Exact final slide count within the 25–35 range.
- Motion vs. static (a `/create-slide` scoping question).
- Whether the meta highlight is one slide or a short two-slide beat.
- Resource slide contents (which links/QRs to include).

## Verification

- `pnpm dev` renders the deck locally without errors.
- All slides fit the 1920 × 1080 canvas with no overflow/clipping.
- Visual style matches the dark + Claude-orange system across slides.
- The five sections are present and ordered; the meta highlight slide exists.
- Deck advances cleanly start to finish in presenter mode.
