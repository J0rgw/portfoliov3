# CLAUDE.md

Read [`AGENTS.md`](AGENTS.md) first: it is the canonical guide (identity, architecture, rules,
quality checks). This file only adds Claude Code specifics.

## Before any visual modification

Always read, in this order: [`references.md`](references.md) →
[`DESIGN.md`](DESIGN.md) → the section's contract in
[`docs/INFORMATION_ARCHITECTURE.md`](docs/INFORMATION_ARCHITECTURE.md) §3 →
[`docs/MOTION_SYSTEM.md`](docs/MOTION_SYSTEM.md). Name the approved references for the section in
your plan before writing code.

## Workflow

**Inspect → Understand → Plan → Implement → Validate → Document.**

1. *Inspect* the files involved and the rendered page (`npm run build && npm run preview`).
2. *Understand* the section contract and the tokens it must use.
3. *Plan* the smallest change that satisfies the contract; state assumptions.
4. *Implement* with tokens, existing primitives and content from `src/config/`.
5. *Validate* with the checklist in AGENTS.md §15 (build must pass; look at the page at mobile
   and desktop widths, with reduced motion and without JavaScript).
6. *Document*: update the doc that owns the topic and the status in `references.md`.

## Claude-specific notes

- Copy is Spanish (Spain). Never add facts that are not in the authenticity register
  (`docs/INFORMATION_ARCHITECTURE.md` §6); ask instead.
- Estrella cannot render accents, digits or punctuation: check every string you set in it.
- The shell has a command-rewriting hook (RTK). If `npx vite …` misbehaves, call
  `./node_modules/.bin/vite` directly.
- `npm run og` needs Playwright's driver, which is not a dependency: `npm i --no-save playwright-core`
  (or point `PLAYWRIGHT_CORE` at an existing install).
- Never import `gsap` statically; use `loadGsap()` from `src/components/ui/motion/gsap.ts`.
- Do not commit, push or deploy unless Jorge asks.
