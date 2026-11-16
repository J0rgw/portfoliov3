# ADR-003: The album in pages

| | |
|---|---|
| Status | **Accepted and implemented 2026-11-12, uncommitted.** Jorge chose from every option rendered on the real build: R, R, C0, R, R and the `featured` flag (Q57–Q62); the build-time switch that rendered them is gone |
| Asked by | Jorge, 2026-11-12: "i want the index to be smaller, to be just the hero, the about me and the footer, everything else i want it accesible from the index but in a different page… to reduce the amount of scroll anyone needs to do so they actually read the page"; three categories: me (the index), Projects ("first the section that is in index, where only the newest, then the projects page with the rest… you can click in them because they'll have a detailed page"), and the bonus "somewhere if needed". Research the references with Haiku agents, treat the project as the adversary of the idea, render the options |
| Scope | Routes, the home, `/proyectos/`, the new `/servicios/` and `/libreria/`, the header, the menu, the footer, contact on every page, the order of the catalogue |
| Untouched | Every chapter's own composition (hero, Sobre mí, the gallery, Servicios, Proceso and its hold, the bonus, the back cover), the case studies' content, motion, colour, copy rules |
| Owners of the topic | AGENTS.md (its "Keep the current seven chapters and routes" now names the pages); INFORMATION_ARCHITECTURE §2–§7; DESIGN.md "Composition" and "Graphics and assets"; MOTION_SYSTEM §2.3, §2.5 and §2.8; references.md status; plan Q57–Q62 and "The album in pages" |

## Context

The home was the whole album: hero, Proyectos, Proceso, Servicios, Sobre mí, Bonus, Contacto and
the footer, 7,631 px at 1512 × 734 (10.4 screens), 9,404 px on a 390 × 844 phone (11.1 screens).
The pinned hero takes 2 of those screens and Proceso's hold 3. `/proyectos/` was a separate index
of every release (3.2 screens) and each release has its case study (about 8.6 screens).

## Research: how the references split a site (2026-11-12)

Four Haiku agents opened the references from references.md, plus atlaxia.es and Portfolio v2, in
Chrome at 1440 × 900 and 390 × 844 with a probe script (document height, whether the wheel moves
the document, headings, header, navigation and footer links, every same-origin path). Raw notes
and screenshots are in the session's scratchpad; their claims were checked against the probe's
JSON before use here.

| Reference | Home | Work | Contact | Extras |
|---|---|---|---|---|
| A24 (Ravi Klaassens) | One screen; the wheel drives the disc carousel | Every film listed in the navigation with its year, newest first; a page per film, `/production/<slug>`, 3.6 screens, native scroll; Films and Television as two category pages | None found | None |
| Huy Phan | One screen; all 19 projects on a wheel-driven carousel, newest first ("10/19") | A page per project, `/project/<slug>`, naming the next project | "For inquiries" with the email always in the header; "Come say hi" on the home | Playground in the menu |
| The Romans | One screen, custom scroll: a teaser of each page in turn (specialisms, about, work, get in touch) | `/work` ("Explore", with a filter), `/work/<slug>` | Every page ends on a footer of offices and emails; the home and the work index on "Get in touch / Work with us" before it | Six service pages, careers, news, all in the header |
| Gianluca Boccia | The story itself, 58 screens; "Read the story without animation" | "Work 09" in the header; `/work`, then `/projects/<slug>` (11.5 screens); the index ends on "Choose your next stop." | "Contact" (mailto) in the header of the inner pages; the work index ends on "Let's make something clear." | CV, Tribute and Privacy pages |
| Matt Jinn | One screen: the release, where to listen, a promo card ("merch drops soon") | Music, Videos, Shows and About as pages | Email in the footer of every page | The promo card on the home |
| transitions.dev | 4 screens: a teaser of the library and "Browse all" | `/library.html` with filters (paid items badged), a page per item with a sidebar listing every item | A mailto in the footer | Pro, Community, Docs in the header |
| Cool Interaction, Kerimov, Kyoosang Choi, Emma Portner | One page (Portner: a collage home, then Index, Info and Contact behind a menu) | On the home | Header or menu | None |
| atlaxia.es, Portfolio v2 | One long page (35 and 9 screens) | On the home (v2 links out to GitHub) | Last section | None |

What they share, and what this ADR takes: a short home with the work on its own page, listed
newest first (A24, Huy Phan, Boccia, transitions.dev); a page per item that names the next one
(Huy Phan, Boccia; here "Siguiente pista" already does); contact closing every page (The Romans,
Matt Jinn, transitions.dev; Boccia keeps it in the header); the categories as words in the header wherever the site has
pages (The Romans, Boccia, Matt Jinn, A24), a menu alone where the home is the whole site; extras
off the main path (Huy Phan's Playground in the menu, Boccia's pages in the footer, Matt Jinn's
promo card). Not taken: wheel-driven carousels, one-screen pages with custom scroll, modal
project pages, filters (six releases do not need them).

## The structure, built

| Page | Holds | 1512 × 734 | 390 × 844 |
|---|---|---|---|
| `/` Inicio | Hero, Sobre mí, the next track to Proyectos, the back cover, the footer | 3,506 px, 4.8 screens (was 10.4) | 4,192 px, 5.0 screens (was 11.1) |
| `/proyectos/` | The gallery of the featured releases and the private disc (h1 "Proyectos seleccionados"), then "Otros lanzamientos" as the index's cards, the back cover | 2,613 px, 3.6 screens | 3,812 px, 4.5 screens |
| `/proyectos/<slug>/` | Unchanged; "Volver a proyectos" leads to `/proyectos/` (or the release's row), its contact band is the page's `#contacto` | 8.6 screens (MoneyMan) | 9.1 screens |
| `/servicios/` | Servicios (h1 "Qué puedo construir para ti"), Proceso and its hold, the back cover | 3,958 px, 5.4 screens | 5,179 px, 6.1 screens |
| `/libreria/` | The bonus, the back cover | 1,754 px, 2.4 screens | 1,844 px, 2.2 screens |

- **Contact closes every page.** The back cover (`sections/Contact`) is rendered by `PageShell`
  at the end of every page's `main`, so the header's "Hablemos" (`#contacto`) scrolls to it on the
  page being read instead of loading the home. A case study keeps its own contact band ("¿Necesitas
  algo parecido?"), which takes the same anchor; its footer keeps the contact row.
- **Jorge's three first, then newest first.** Each release has a `featured` flag (Q62: Jorge
  chooses what the gallery holds; set to the first three of his earlier `order`, MoneyMan, Client
  Leads and Mathgeon, until he names his own) and a `date`: its repository's first commit (GitHub
  API, checked 2026-11-12), or its stated year where the work predates its repository (Portfolio
  v2's repository is a 2025 upload of 2023–2024 work). `selectProjects` puts the featured
  releases first, newest first within each group, `order` breaking ties: MoneyMan, Client Leads,
  Mathgeon, then gitchange (2026-08-03), Disco Download (2026-05-07) and Portfolio v2 (2024). With
  nothing featured, the gallery holds the newest three. Track numbers follow this order.
- **Pages, not chapters, in the navigation.** The menu's rows are the pages and Contacto; the
  page being read is marked (`aria-current="page"`, the accent and ▸ as before). The footer's
  tracklist lists every chapter where it now lives, in album order: Portada, Sobre mí, Proyectos,
  Servicios, Proceso, Bonus, Contacto. `chapterHref` knows each chapter's page.
- **Headings.** A chapter that opens its page carries the page's h1 (`ChapterHeading` level,
  the gallery's own heading). JSON-LD: the offers moved with their content from the home's Person
  to `/servicios/` (a WebPage with an ItemList of Service); `/libreria/` is a WebPage.
- **Shared next track.** The case study's "Siguiente pista" became `editorial/NextTrack`
  (unchanged markup and motion, its CSS moved to `design/components/NextTrack`), which the
  home now ends on (Q57).

## The options (Q57–Q61), each rendered over the recommended set

| Q | Decision | Options (recommended first; Jorge's pick in the last column) | Picked |
|---|---|---|---|
| 57 | What the home adds after Sobre mí | **R** "Siguiente pista: Proyectos", the newest disc, which morphs into the gallery's (view transition); **H0** nothing, the header and footer carry the way | R |
| 58 | The header | **R** Proyectos and Servicios as words beside Hablemos from 768 px, the page being read underlined; **N0** today's (Hablemos and Menú) | R |
| 59 | The earlier releases | **R** tracklist rows (number, title as link cue, tagline, type and status, marks); **C0** the index's cards with their discs | C0 |
| 60 | The bonus | **R** its own page `/libreria/`, in the menu and the footer; **BS** the last chapter of `/servicios/`; **BF** a row of the footer on every page, no page | R |
| 61 | The gallery | **R** the three newest and the private disc; **G4** the four newest | R |

Q62: "the newest" by first commit put gitchange (a one-commit command) in the gallery and
Mathgeon (a 60-commit team game) in the list. Jorge chose to curate: the `featured` flag. With it
the gallery's heading went back to "Proyectos seleccionados" (a choice is not "recientes"), the
list's became "Otros lanzamientos" (they are not all older) and the home's next track names the
featured releases ("Lo que he construido, empezando por MoneyMan, Client Leads y Mathgeon.")
instead of calling them the most recent.

## The project as the adversary

The idea against what the project already decided, and how each conflict was resolved:

| The project says | The conflict | Resolution |
|---|---|---|
| AGENTS.md: "Keep the current seven chapters and routes" | Both change | No chapter is deleted, only moved; two routes are added. This ADR replaces the rule once picked |
| IA §3: one narrative, identity → proof → method → offer → person → extra → action, "order is intentional" | The proof is a click away and Sobre mí follows the hero | The order survives across pages: menu and footer list them in album order; the home's next track hands the gallery's first disc on to Proyectos (Q57) |
| IA §1: "every chapter ends with a path towards contact"; contact is the site's primary action | The home loses its contact chapter | The back cover closes every page; "Hablemos" stays on the page |
| Case studies end on their own contact band | Two contact blocks would stack | They keep theirs, under the same anchor |
| Jorge's brief (2026-11-09): the private work is the gallery's last disc | "Only the newest" in the gallery | The private disc stays last; the featured releases come before it |
| The catalogue has years and a curated `order` (Mathgeon third) | "Newest" needs a date | Repository dates, verifiable, order the catalogue; Jorge chose curation for the gallery (Q62, the `featured` flag) |
| Hero contract: its pinned run ends on the disc alone, a snap point before Projects | The hero now hands over to Sobre mí | Kept: the cover, then the liner notes; the disc returns in the next track |
| IA §7: dedicated service pages rejected as thin | `/servicios/` | One page for the four offers and the process, not a page per service |
| Home JSON-LD: Person `makesOffer` | The offers left the home | They moved with their content to `/servicios/` |
| Header: the menu marks the chapter under the header | Chapters are spread over pages | The menu marks the page |
| MOTION §2.3 (snap on home), §2.5 (Proceso holds) | Proceso moves | Unchanged: three snap points on the home; the hold moved with Proceso |
| "Volver a proyectos" reopened the home gallery | The gallery moved | It reopens `/proyectos/` on that disc, or opens the page at the release's row |
| One h1 per page (`check:seo`) | Sections now open pages | `ChapterHeading` takes a level |

And against the ideas added here: the back cover adds about a screen to every page (it is the one
action, and the page ends there anyway); the header's words could crowd the hero at 768–1023 px
(they are hidden below 768); the next track adds 0.4 screens to the home (Q57 renders the home
without it); a gallery of three leaves the right side empty on its last disc (Q61); the bonus page
is one frame (Q60 renders two places without a page).

## After the picks

The switch (`config/variants.ts`) and the options not chosen are gone: the tracklist rows, the
footer's bonus row and the bonus at the end of `/servicios/`. Docs updated: AGENTS.md,
INFORMATION_ARCHITECTURE §2–§7, DESIGN.md, MOTION_SYSTEM §2.3, §2.5 and §2.8, references.md, the
plan. `/servicios/` and `/libreria/` share the home's social card, as `/proyectos/` already did.
Validation (plan, "The album in pages"): every check passes; no overflow from 320 to 1512 px in
both themes, no console errors, complete without JavaScript, reduced motion as specified.
Open: Q62's three releases. Ideas recorded, not built: a CV link in the header once the CV task lands (Boccia
keeps "CV" there; plan, "CV + ATLAXIA"); shortening the hero's pinned run (2 screens) to shorten
the home further.
