# AGENTS.md — Technical reference

This is the technical reference for every agent. [DESIGN.md](DESIGN.md) is the artistic
reference. Read both, the section contracts in docs/INFORMATION_ARCHITECTURE.md and the
local reference research before changing a section. TASK 02 supersedes earlier aesthetic
restrictions; historical references are evidence, not a requirement to copy their layouts.

## Project and architecture

Jorge Arcas's Spanish portfolio, catalog JRG-003. Vite 7, React 19, TypeScript strict,
plain CSS, static prerendering, lazy GSAP. Keep the current seven chapters and routes.

Dependency direction: **CONFIG + DESIGN → COMPONENTS → SECTIONS → PAGES**.

- `src/config/`: typed editorial content, identity, navigation order/visibility, projects,
  asset references, labels, functional messages, SEO. No CSS values, motion, layout, React
  or imports from design/components. Derived selectors may filter/sort this data.
- `src/design/`: tokens, typography, materials, section styles, graphic themes and motion
  parameters. No editorial copy, project facts, business logic or imports from config/components.
  Neutral theme keys allow independent reuse. Local geometry belongs here when it is styling.
- `src/components/ui/`: controls, header/menu/footer and interaction hooks under `motion/`.
- `src/components/editorial/`: headings, evidence, credits and project summaries.
- `src/components/graphics/`: original asset wrappers and clearly identified generated graphics.
- `src/components/cd/`: discs, covers and gallery. Consume both data and visual themes.
- `src/sections/`: the existing home compositions, combining config and components.
- `src/pages/`: complete pages and route integration. Routes remain ordinary links and SSG.
- `public/images/`: original reusable and project assets; do not move originals merely to
  resemble a directory diagram. `config/assets.ts` registers reusable asset references.
  Vite publishes all of `public/`, so only files the built site requests live there; the
  originals `scripts/` regenerators read live in `private/originals/` (git-ignored, never served).

## Content editing

Edit text in config, never JSX. **Do not hardcode project copy in components.**
`projects.ts` is the single source for gallery, index, detail, menu, sitemap and SEO.
Add a typed entry to `projectCatalog` with unique immutable `id`, unique URL-safe `slug`,
`order`, `visible`, title/tagline/summary/overview, technology, credits, links and SEO.
Optional evidence/case sections/artwork go on that same entry. Case-study sections are prose,
one paragraph per string, in Castilian Spanish that does not read as translated: no bullet
lists, numbered items or label-and-colon fragments, and nothing numbered on the page
(INFORMATION_ARCHITECTURE §5, 2026-11-11). Track numbers are derived
from visible order; hiding a project also removes its public route and sitemap entry.
Asset references belong to config; neutral graphic themes live in design. An unregistered
project receives the default theme; no theme edit is required to publish a project.
Home sections follow `navigation.ts`; `ready: false` removes both the section and navigation.
Do not invent claims, clients or results: update the authenticity register for new facts.

## Components and graphics

Compose existing units before extracting new ones; do not build a universal decorated card.
**No eyebrow labels**: never set a small tag (kicker, eyebrow, overline, label chip, with or
without a marker stroke) above a heading. Sections, pages and OG cards open with the heading.
`npm run check:architecture` fails on `kicker` or `eyebrow` anywhere in `src/`.
**No middots between data** (DESIGN.md "Typography"): lists take commas, hierarchy takes type and
space. The same check fails on a middot in any string or JSX text, document titles and the
site's name included (2026-11-11); its allowlist (object print, social cards, the console's
hidden track, the project data's quoted README output) lives in the script and grows only with
a stated reason. No category tags, status chips or rules that restate what is
next to them (DESIGN.md "Decisions").
Functional components/hooks, explicit TypeScript types, no new `any`, deterministic SSR.
Do not read browser globals or time/random values during render. Use effects and clean up.
Config/design never import a component. Shared components never import sections or pages.
Keep interactions separate from decorative motion. Use tokens for global typography,
colours, spacing and timing; local geometry may be explicit in the design layer.
Colour comes only from the semantic roles in `design/tokens.css` (DESIGN.md "Palette and
material"): no hex values or `--palette-*` primitives outside tokens.css, no per-component
theme logic or `prefers-color-scheme` queries (the theme follows the system; the `data-theme`
force is dormant since the header's switch was removed, see components/ui/theme). Every
component must read correctly in light, dark and inside `.on-night`.
Raster art carrying the accent needs a generated dark variant served through `ThemeImage`.
Original illustrations remain files, never silently replaced with CSS/SVG approximations.
Generated graphics must be documented as such. Add meaningful alt text for informative assets;
decorative assets use empty alt/aria-hidden and never convey unique essential information.

## Accessibility, responsive and performance

Preserve WCAG 2.2 AA contrast (4.5:1 text, 3:1 large text/UI), visible focus, semantic headings,
one h1, skip link, keyboard/touch alternatives, modal focus containment/Escape/return, inert
closed menu. Aim for 44px controls. No mandatory animation intro; the only wheel handling is the eased scroll and proximity
chapter snap (MOTION_SYSTEM §2.3): no paging, no blocked scrolling.
Respect prefers-reduced-motion in CSS AND interaction hooks. Stop loops off-screen; provide
pause for ongoing motion. No-JS must retain content and links. Transform/opacity for motion
(one exception: the short blurs of the transitions taken from transitions.dev, MOTION_SYSTEM
§2.6–2.7); SVG stroke drawing is allowed on bounded decorative resources. Never animate layout on scroll.
Recompose small screens; contain decorative overflow without clipping text or focus.
Local WOFF2 with licences, explicit image dimensions, responsive sources, lazy below fold.
Keep GSAP lazy and current rendering stack; justify any new runtime dependency with a need
and measurements. Preserve security, external link rel attributes and verified JSON-LD.

## Validation

Run `npm run typecheck`, `npm run check:architecture`, `npm run test:config` and `npm run build`
(assets, client/SSR, prerender, SEO). Inspect changed pages at 390, 768, 1024, 1440px, plus narrow
and zoom/reflow cases, in both colour schemes. Check no-JS, reduced motion, menu keyboard,
carousel and clipboard, console errors and horizontal overflow. Regenerate OG cards if their
artwork/typesetting changes, and the theme variants (`scripts/generate-theme-variants.mjs`)
when blue raster art is replaced.
Record actual measurements and unresolved limitations, not assumed passes.
Update readme, DESIGN and relevant contracts when changing them. English code/docs, Spanish UI.
A change that alters several sections at once gets a decision record in `docs/adr/` (context,
decision, per-section status, what was removed and where it lives, open questions, measured
validation); ADR-001 is the chapter frames.
Do not commit, push or deploy unless explicitly requested.
