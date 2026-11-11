# ADR-001: One frame per chapter

| | |
|---|---|
| Status | Accepted, implemented 2026-11-10, **uncommitted**; open questions below |
| Asked by | Jorge: update every section below Projects and `/proyectos/`, only the hero and Projects stay intact; less text and fewer lines so the info stays in place in the smooth-scroll system; a modern language from the references; an ADR to follow the change |
| Scope | Home chapters 02–06 and the footer; `/proyectos/`; `/proyectos/<slug>/` |
| Untouched | Hero (00) and Projects (01): their files are unchanged. Since 2026-11-11 Projects' hold follows the same fit rule (Jorge's call, Q49). Header, menu panel, 404 |
| Owners of the topic | DESIGN.md "Composition", INFORMATION_ARCHITECTURE §3, MOTION_SYSTEM §2.5, plan Phase F6 |

This file tracks the change: why, what each section was and is now, what was removed and
where it lives, what is still open, and what was measured. Update the status table when a
section changes again.

## Context

The hero and Projects were rebuilt in November 2026 in one language:

- a chapter is **one viewport-high frame**;
- the heading sits in the top-left corner, small and heavy (Poppins 800);
- **one dominant element** fills the frame (the name and the album; the disc gallery);
- the copy is **short and printed straight on the ground**: no card, panel, label or rule;
- objects are **Jorge's photographs and cut-outs**;
- a selection changes the credits with a line-by-line rise.

The chapters after Projects were older. On the production build at 1512 × 734 (Jorge's
MacBook) they measured:

| Chapter | Content height | Windows tall |
|---|---|---|
| 02 Proceso | 2,219 px | 3.02 |
| 03 Servicios | 1,824 px | 2.49 |
| 04 Sobre mí | 2,025 px | 2.76 |
| 05 Bonus | 641 px | 0.87 |
| 06 Contacto | 700 px | 0.95 |

The home page was 12,975 px tall (17,604 px at 390 px wide). The chapter hold
(MOTION_SYSTEM §2.5) sticks a chapter to the top for 60svh of scroll, so a chapter three
windows tall was frozen with its first window showing and the rest waiting below: the info
did not stay in place, it stayed half-read.

They also spoke the language three critiques and the deslop pass kept trimming: CSS paper
(an insert, torn slips, a stapled booklet), a React Bits profile card with a lanyard and foil,
square uppercase buttons, spec tables of small mono capitals between rules, 60 px headings
over long ledes, and five to seven blocks of text per item.

## Decision

1. **A chapter is one frame.** On wide landscape screens every chapter after Projects is
   `clamp(40rem, 100svh, 64rem)` high (Projects' own bounds, `.chapter--frame` and `.frame` in
   layout.css): the heading in the top-left corner where Projects' heading sits, the dominant
   element beside or under it, the copy at the foot.
2. **The hold only holds what fits.** `useChapterHold` measures the chapter (mount, resize, a
   `ResizeObserver`); taller than the window, the wrapper gets `data-unheld` and the chapter
   flows. This applies to Projects too (2026-11-11, Q49): it was exempt for a day.
3. **One opening.** `ChapterHeading` now looks like Projects' heading (Poppins 800,
   `--text-xl`) with at most a one-line lede at body size. The marked phrases (Q39) stay.
4. **Distil, do not invent.** Each item keeps one or two lines cut from its own verified copy.
   No new facts; everything removed is quoted in the appendix.
5. **No paper, cards, passes, stickers or spec tables** on these pages. Type on the ground;
   rules only between real rows; small mono capitals only where an object prints them.
6. **Objects are photographs**, one per chapter at most: Jorge's iPod (Proceso) and his
   portrait (Sobre mí) from his own set, cut by `scripts/extract-cutouts.py`; the CD-R stays
   on the back cover.
7. **Actions are words.** The primary links are the oversized words themselves ("Avísame*",
   "Hablemos"); elsewhere, links with an arrow. The square uppercase button leaves these pages.
8. **The Projects pages speak like the gallery**: sentence-case titles, credits without small
   capitals or rules, stack marks, one back link, numerals without circles, single rules.

References used per section are named in INFORMATION_ARCHITECTURE §3 (A24, The Romans,
Kyoosang Choi, CollectUI Subscribe and navigation 21793fa2, Huy Phan).

## Status

| Section | Before | After | Status |
|---|---|---|---|
| Foundation | `ChapterHeading` 60 px + 3-line lede; every chapter held | Projects' heading style; `.frame` primitive; hold only when it fits (`data-unheld`), Projects included | Done 2026-11-10; Projects included 2026-11-11 |
| 02 Proceso | Booklet with staples and page turn, 5 × (title, body, torn slip), closing question and button; 3.02 windows | Jorge's iPod (cut-out) with the steps as its playlist (a tablist); the selected step's credits bottom left (title, one line, one real decision linked); change-over like the gallery's | Done |
| 03 Servicios | Paper insert, 4 × (title, quoted problem, outcome, 4 bullets, evidence, link); 2.49 windows | Tracklist rows: number, title large, one line, "Lo he hecho en:", enquiry; two by two from 768 to 1279 px | Done |
| 04 Sobre mí | Pass card, 3 paragraphs, 3 principles, 7 milestones with details, 3 tool groups with rules; 2.76 windows | Portrait cut-out on the frame's lower edge, one signed paragraph, credits on shared columns (timeline one line each, instruments, languages) | Done |
| 05 Bonus | Tinted card, sticker, 2 square buttons, footnote, long privacy note | Oversized "Avísame*" as the mailto link, one line of status, footnote, one-line privacy note, the talk as the one link out | Done |
| 06 Contacto | Decorative "Hablemos", h2 + lede, 2 square buttons, email, 5-row spec table | Heading in the corner; "Hablemos" + CD-R + arrow is the email link; one line: address + copy, LinkedIn, GitHub, availability | Done |
| Footer | 3–4 columns with headings over rules | Rows of links with their name in the margin; one line of print | Done |
| /proyectos/ | Breadcrumb, uppercase 10rem h1, mono-label credit tables with middots, a generic disc for the private work | Sentence-case h1, each disc with title, tagline, stack marks and one muted line; the broken disc for the private work | Done |
| /proyectos/&lt;slug&gt;/ | Back link + breadcrumb, uppercase title, mono-label table with middots, uppercase buttons, double rules, circled numbers, "Siguiente pista ·" | One back link, sentence-case title, credits as label and value, stack marks, links with arrows, single rules, numerals, "Escríbeme" as a large link; pixel sprites at most at 2× | Done |
| Docs | | DESIGN, IA §2–5, MOTION §2 and §2.5, references, AGENTS, readme, plan Phase F6 and Q44–48 | Done |
| Jorge's review | | | **Pending** |

## Files

- Sections: `sections/LinerNotes`, `Services`, `About`, `BonusTrack`, `Contact` (TSX and their CSS
  in `design/sections/`).
- Shared: `editorial/ChapterHeading` (CSS), `editorial/CreditsTable` (CSS), new
  `editorial/StackMarks`, `editorial/Evidence` (pixel sprites), `ui/SiteFooter`,
  `ui/motion/ChapterHold` and `useChapterHold`, `design/layout.css`, `pages/HomePage`,
  `pages/ProjectsIndexPage`, `pages/ProjectPage` (and their CSS).
- Config: `process.ts`, `services.ts`, `about.ts`, `library.ts`, `ui.ts`, `assets.ts`, `types.ts`;
  two status labels in `projects.ts` lost their middots.
- Assets: `public/images/cutouts/ipod-{460,760,920}.webp` and `jorge-{320,480}.webp` from
  `scripts/extract-cutouts.py` (new recipes `ipod`, `jorge`, a new `alpha` key and a per-recipe
  quality).
- Checks: `scripts/check-architecture.mjs` no longer exempts the Projects pages from the middot
  rule, and "Siguiente pista ·" left its print list.
- No longer used (left in place, they carry uncommitted edits; Q48): `editorial/ProfileCard`,
  `graphics/Paper`, `graphics/Sticker` and their CSS.

## Consequences

- Every chapter reads whole while it is held on laptops and desktops; the home page is about a
  third shorter (numbers below), so the album keeps its length budget without a shorter hold.
- Five fewer patterns the critiques flagged: paper cards, the pass, square uppercase buttons,
  small-capital spec tables, circled numbers. The site has one voice from the cover to the back
  cover, and the Projects pages match the gallery.
- Proceso hides four of its five step descriptions until selected, as the gallery hides five
  of six projects' credits; every step is still in the HTML, listed without JavaScript, and the
  titles are always visible on the iPod.
- On phones Servicios and Sobre mí are taller than the window, so they flow instead of being
  held; so does Projects on phones and portrait tablets (1.04 to 1.35 windows tall), whose
  foot (the gallery's keys and count) used to wait under the fold through the whole hold. On
  laptops and desktops Projects fits and is held as before. While it flows, its parallax (§2.4)
  runs as the reader scrolls, instead of resting at 0 through the hold: 0.13 when its foot
  comes into view on a 390 px phone, where the credits and the discs still clear each other.
- Cut copy is quoted below; most of it is also in the last commit (4423766, 2026-11-02).
- Two new photos in the home page's lower half, lazy-loaded: 26 to 113 kB for the iPod (113 kB on
  a 2× MacBook) and 28 kB for the portrait. Main bundle 110.5 → 107.9 kB gzip.

## Open questions

Kept in `docs/IMPLEMENTATION_PLAN.md` §4; summarised here.

- **Q44 Portrait resolution.** About's cut-out is the pass's 457 px photo shown up to 368 px wide
  (about 1.6× on a 2× screen). A 900 px or larger portrait would be sharp.
- **Q45 The iPod.** From the downloaded cut-out set, so Q32 (rights) applies; no logo shows.
- **Q46 Cut copy.** Review the appendix; anything can return if its chapter still fits.
- **Q47 The toy brick** is not used: its studs carry a toy maker's trademark and it is about
  240 px wide in the file.
- **Q48 Unused files** (ProfileCard, Paper, Sticker, plus LogoLoop and ThemeToggle): delete when
  committing.
- ~~**Q49 Projects on phones**~~: answered 2026-11-11, apply the same fit rule. Done: the
  exemption (`ChapterHold fit={false}`) and the `fit` option itself are gone.

## Validation log

Production build (`npm run build`: architecture, config, assets, types, client and SSR builds,
prerender, SEO) passes. Measured with Playwright on `vite preview` in installed Chrome,
2026-11-10/11.

**Home page height**

| Viewport | Before | After |
|---|---|---|
| 1512 × 734 | 12,975 px | 8,365 px |
| 1440 × 900 | 14,014 px | 10,191 px |
| 390 × 844 | 17,604 px | 9,059 px |
| 1512 × 734, reduced motion | | 5,429 px |

**Chapters after Projects** (section height; held means sticky with the whole chapter in view)

| Viewport | Proceso | Servicios | Sobre mí | Bonus | Contacto (never held) |
|---|---|---|---|---|---|
| 1512 × 734, light and dark | 735 held | 735 held | 735 held | 735 held | 735 |
| 1280 × 720 | 721 held | 721 held | 721 held | 721 held | 721 |
| 1024 × 768 | 769 held | 769 held | 769 held | 769 held | 769 |
| 1440 × 900 | 901 held | 901 held | 901 held | 901 held | 901 |
| 1920 × 1080 | held | held | held | held | 1025 |
| 768 × 1024 | held | held | held | held | 547 |
| 390 × 844, light and dark | 844 held | 1,432 flows | 1,150 flows | 844 held | 623 |
| 320 × 640 | flows | flows | flows | flows | 640 |

Sobre mí's content runs 30 px past its frame by design: the portrait's foot is under the clip.

**Behaviour**

- No horizontal overflow at any of the ten sizes; no console errors on home, the index and
  the case studies.
- Proceso's playlist: one Tab stop; ↓ ↑ → ← move and select (wrapping), Home and End; Tab goes
  on to the selected step's link; a click selects; the count reads "04 / 05" after selecting
  the fourth; only the selected panel is visible and in the accessibility tree.
- Accessible names: "Hablemos por email", "Avísame por email". Heading outline: one h1, an h2
  per chapter, an h3 per step, offer and the timeline.
- Without JavaScript: every step's credits are listed under Proceso's heading; every link and
  text is present; marks are drawn.
- Reduced motion: no holds (plain flow), no change-over, marks drawn.
- Images chosen by the browser: iPod 760 (113 kB) at 1512 × 734 @2×, 460 (26 kB) @1×, 760 on a
  390 px @3× phone; portrait 480 (28 kB).
- Projects (2026-11-11, fit rule applied): held at 1024 × 768, 1280 × 720, 1440 × 900,
  1512 × 734 and 1920 × 1080 in both themes; flows at 768 × 1024 (1,062 px), 390 × 844 (947 px)
  and 320 × 640 (863 px). On a 390 × 844 phone emulation with touch, the gallery's keys are in
  view after 110 px of scroll and nothing overlaps; no console errors. Its files are untouched.

Not done: a screen-reader pass with VoiceOver, a real-device check on a phone, and a Lighthouse
run.

## Appendix: copy removed by ADR-001

Quoted as it was in the working tree before the change (2026-11-10).

**Proceso.** Lede: "Cómo paso de una conversación a un producto publicado, y qué decisiones
reales hay detrás de cada fase." Steps (body; note):
1. "Antes de proponer nada, entiendo cómo trabajas hoy, qué duele y qué significa «funciona» para
   ti. De ahí sale un alcance por escrito."; "En Client Leads el problema no era descargar datos,
   sino no confundir una empresa con sus plantas. Ese matiz definió todo el modelo de datos."
2. "Prioridades, arquitectura y lo que queda fuera. Prefiero una primera versión pequeña que
   funcione a un plan enorme que no llega."; "MoneyMan arrancó sin backend a propósito: los datos
   se quedan en el navegador, y eso eliminó cuentas, servidores y riesgos desde el primer día."
3. "Entregas frecuentes que puedes ver y probar. Código tipado, componentes reutilizables y
   decisiones documentadas."; "En Mathgeon los botones, campos y avisos son componentes
   compartidos: todas las pantallas se comportan igual y un cambio se hace una sola vez."
4. "Comprobaciones automáticas antes de publicar, revisión en móvil y escritorio, y
   accesibilidad y rendimiento medidos, no supuestos."; "Este portfolio no se publica si falta
   una imagen referenciada o si una página no tiene título, descripción y un único h1: el build
   falla."
5. "Documentación clara, límites explícitos y un plan para la siguiente fase, para que lo que
   entrego se pueda seguir usando sin depender de mí."; "Mis README separan lo verificado de lo
   pendiente: el de MoneyMan lista sus límites y lo que añade la siguiente fase."

Labels: "Notas del libreto", "Nota técnica"; closing: "¿Te encaja esta forma de trabajar?" with
the button "Cuéntame tu proyecto".

**Servicios.** Lede opened with "Cuatro formas de trabajar juntos." Per offer (problem;
outcome; scope):
- Web: "«Necesito una web que explique bien lo que hago y que convierta visitas en contactos.»";
  "Una web rápida, clara y fácil de encontrar, construida a partir de tu negocio y no de una
  plantilla."; "Estructura y textos orientados a la acción", "Diseño de interfaz y desarrollo a
  medida", "SEO técnico: HTML semántico, metadatos, datos estructurados y sitemap",
  "Rendimiento y accesibilidad desde el primer día".
- Apps: "«Trabajamos con hojas de cálculo y procesos manuales que ya no dan más de sí.»"; "Una
  aplicación hecha para tu forma de trabajar: paneles, formularios, importación de datos y
  cuentas de usuario, documentada y lista para crecer."; "Análisis del proceso actual y alcance
  por fases", "Frontend en React y TypeScript", "Backend y datos con Node.js, Python, Firebase o
  SQL según el caso", "Aplicación instalable (PWA) cuando aporta valor".
- Automation: "«Los datos están repartidos entre herramientas y alguien los copia a mano.»";
  "Procesos que se ejecutan solos y datos que llegan limpios y trazables a donde se usan: el CRM,
  una hoja o un panel."; "Integración con APIs y CRM, por ejemplo Twenty", "Extracción y
  enriquecimiento de datos con su procedencia", "Scripts y utilidades de línea de comandos",
  "Modo de prueba antes de escribir nada en tus sistemas".
- Frontend: "«El producto funciona, pero la interfaz es inconsistente y cada pantalla se hace
  desde cero.»"; "Una interfaz coherente sobre componentes reutilizables, tokens de diseño y
  accesibilidad, que tu equipo puede mantener."; "Arquitectura de componentes en React y
  TypeScript", "Tokens de diseño y documentación de uso", "Accesibilidad (WCAG 2.2) y
  rendimiento", "Animación con propósito que respeta «reducir movimiento»".

**Sobre mí.** Paragraphs:
1. "Soy Jorge Arcas, desarrollador full-stack en España. Construyo webs, aplicaciones y
   herramientas a medida, y me interesa especialmente el punto en el que la ingeniería se
   encuentra con la experiencia: interfaces que se sienten bien y sistemas que aguantan el uso
   real." (kept, shortened)
2. "Estudié Ingeniería Informática y después Desarrollo Web en la UCAM. En 2025 trabajé como
   desarrollador full-stack en Grupo Fuertes y, desde 2022, organizo eventos y talleres con
   Google Developer Group. En el DevFest 2025 de Santiago de Compostela di una charla sobre
   desarrollo dirigido por componentes con React y TypeScript."
3. "Este portfolio está diseñado como un disco: cada proyecto es una pista con sus créditos y sus
   notas. Es mi forma de presentar el trabajo con el cuidado de un objeto físico y con los
   créditos claros: quién hizo qué, con qué y por qué."

Principles: "Documentar lo que funciona y lo que falta: Mis README separan lo verificado de lo
pendiente. Prefiero un límite explícito a una promesa vaga."; "Las escrituras, explícitas: Si
algo modifica datos, toca un CRM o cuesta dinero, lo dice y pide confirmación. Así está
construido Client Leads."; "La interfaz también es ingeniería: Componentes reutilizables,
tokens y accesibilidad desde el principio. De eso trataba mi charla en el DevFest 2025."

Milestone details: Ponente, "«Deja de copiar y pegar componentes»: CDD con React y TypeScript.";
Grupo Fuertes, "De marzo a junio: desarrollo y mantenimiento de aplicaciones web."; GDSC Lead,
"Al frente de un equipo de estudiantes que aprende creando soluciones para negocios locales.";
GDG, "Eventos y talleres para la comunidad de desarrolladores." The pass: "Jorge Arcas",
"Desarrollador full-stack", "@J0rgw", "Disponible", "JRG-003", "Contactar".

**Bonus.** Body: "Estoy preparando una librería de componentes para React. Todavía no tiene
nombre público ni fecha: si quieres enterarte cuando haya algo que probar, avísame. Sobre cómo
entiendo los componentes, hablé en el DevFest 2025 en «Deja de copiar y pegar componentes»."
Audience: "Para equipos y desarrolladores que construyen interfaces con React y quieren una base
consistente." Privacy: "Sin newsletter ni listas automáticas: me escribes tú y te respondo yo.
Usaré tu email solo para avisarte del lanzamiento, y puedes pedirme que lo borre cuando
quieras." Buttons: "Avísame por email", "Repositorio de la charla". Sticker: "Bonus track".

**Contacto.** Spec rows: Estado, Base, Idiomas, LinkedIn, GitHub (their values remain in
`site.ts` and are shown in About, the footer and the details line); buttons "Escríbeme" and
"Copiar email" (the copy action remains).

**Projects pages.** Index lede: "Cada lanzamiento con sus créditos: qué es, qué parte hice yo,
con qué está construido y en qué estado está." Status labels: "En desarrollo · sin desplegar",
"Versión funcional · 2025". Case study: breadcrumb trail (in the JSON-LD now), "Contenido",
"Siguiente pista ·". Footer credit: "Tipografía principal: Poppins (OFL); anotaciones: Estrella
(Uncarving)."
