# ADR-004: Sobre mí, told in his own things

| | |
|---|---|
| Status | **Implemented 2026-11-19, uncommitted; revised the same day with Jorge's answers.** First built as a page, `/sobre-mi/`, with a teaser on the home; Jorge then asked for all of it on the home and answered Q63–Q65 and Q68 (below). Q66, Q69 and Q70 stay open |
| Asked by | Jorge, 2026-11-19: "make a more interesting about me site, the focus will be clearance and telling more without writing more"; a folder of photos of him, "what i did recently and some of my interests, agriculture, gundam, godzilla, visiting japan or asisting the vds"; "DON'T USE EVERY PHOTO, AUDIT THE NECESITY OF EACH PHOTO AND IMPLEMENT BASED ON OUR REFERENCES an about page that will make it stick into the memory of the ones who look at it"; easter eggs "for the ones playing with it". Then: "i'd prefer keeping up the about me page you just built on the index… no teaser, i'd rather keep everything about me in the index so the info is accesible at first glance"; the sentence "¡Hola! Soy Jorge, programo desde Murcia", Godzilla changed to travelling, his own Gundam photos, Grupo Fuertes as an internship, and his CV as updated that day |
| Scope | The home's Sobre mí (replaced) and a credits section after it; cut-outs made from his photos; the credits from his updated CV; his photos, moved out of `public/` |
| Untouched | The hero, the gallery, Servicios, Proceso and its hold, the bonus, the back cover, the case studies; the header, the menu and the footer (the page that existed for an afternoon has gone with its entries); colours, type and the motion levels |
| Owners of the topic | INFORMATION_ARCHITECTURE §3–§6; DESIGN.md "Composition" and "Graphics and assets"; MOTION_SYSTEM §2.9; references.md status; readme; plan Q63–Q70 and "Sobre mí, told in his own things" |

## Context

The home's Sobre mí was the pass's photo, one paragraph and the credits: "Soy Jorge Arcas,
desarrollador full-stack en España. Construyo webs, aplicaciones y herramientas a medida, donde la
ingeniería se encuentra con la experiencia: interfaces que se sienten bien y sistemas que aguantan
el uso real.", then seven milestones, every instrument and the languages. Text to read, nothing to
remember: the paragraph could be anyone's, and nothing on the site said what he did this year.

His folder, `public/images/me/`, held 39 files: 18 photos, one screenshot, and 18 cut-outs he
had made on his phone on 2026-11-18 (iOS "lift subject"). It sat in `public/`, so every build
copied it whole into `dist/`: 144 MB, twelve files carrying the GPS position where they were
taken (a private house among them). Before anything else it moved to `private/originals/me/`
(git-ignored, never served, AGENTS.md); nothing had been committed or deployed. The two Gundam
photos he added later (`public/images/IMG_6418.HEIC`, `IMG_6420.HEIC`, GPS in Valencia) followed
them.

## The photo audit

Places and dates are each file's own metadata (GPS and capture time), checked against what the
photo shows; nothing here is guessed from a name. "Used" means on the home: thirteen of the 41
are, seven of them only when someone plays (one more file, his Letterboxd screenshot, as words).

| File | What it is | Used | Why |
|---|---|---|---|
| `00F0619E….JPG` | 2026-06-25, UCAM HiTech: Jorge and two others with the Santander X Award cheque, "Proyecto Emprendedor 2026", ATLAXIA, 2.000 € | **The cheque alone**, cut out | The year's award, in its own printed words: the thing after "ATLAXIA". The two other people never leave the preparation script |
| `1000066536.JPG` | 2025-11-10, Japan: a wall of daruma dolls | No | Not him, and it says "Japan" less than Godzilla does |
| `1000066902.JPG` | 2025-11-10, Umeda Sky Building, Osaka: Jorge small on the escalator tube | No | He is tiny in it; the journey is told by Godzilla and Odaiba |
| `1000067139.JPG` and its cut-out `IMG_7497` | 2025-11-13, Japan: a stone mouse at a shrine | No | Charming, but nothing the sentence needs |
| `1000067296.JPG` and `IMG_7498` | 2025-11-14, Japan: drawings in a Slam Dunk book | No | Manga is not in the brief; a third Japanese thing would thin out the ones he named |
| `1000067722.JPG` | 2025-11-17, Shinjuku: Godzilla's head over the Toho cinema | **Godzilla**, lifted from the photo, for "viajes" | His cut-out `IMG_7499` is 651 px; this lift keeps every pixel there is and leaves out the cinema's sign (a film poster) |
| `1000067994.JPG` and `IMG_7500` | 2025-11-17, Odaiba, Tokyo: Jorge shading his eyes | **His cut-out**, hidden | When Godzilla is picked up he steps out to look up at it |
| `76323a0a….JPG` and `IMG_7510` | 2026-05-14, evening: Jorge in a suit with two men; the cut-out is 319 px wide | No | Other people's faces; the badge already tells that day; too small |
| `IMG_3286.HEIC` and `IMG_7501` | 2026-02-14, Soho, London: Jorge by a pub | No | One journey is told; a second would blur it |
| `IMG_4770.HEIC` and `IMG_7502` | 2026-05-14, Murcia: his DIATIC26 badge, his name on it, in his hand | **His cut-out** | Events, in one object that prints his name; a hand holding the thing, as in the hero |
| `IMG_5270.heic` and `IMG_7509` | 2026-06-07, Tarragona: Jorge on a wall among broom flowers (Venezia shirt); the cut-out is a JPEG cut at the right | No | No story the sentence needs |
| `IMG_5684.jpg` | 2026-07-27: his Letterboxd favourites, four posters | **As words** | The posters are the films' artwork, so not shown; the four titles are the chapter's note in the console |
| `IMG_6037.HEIC` | 2026-08-11, a private place: his old Suzuki by a tree | No | A number plate and a private place; the bucket says "el campo" better |
| `IMG_6057.HEIC` | 2026-08-11, the same place: a bucket of peppers and cucumbers on a plastic chair | **The bucket**, lifted, the chair taken out | "El campo" in one object |
| `IMG_6337.jpg` and `IMG_7503` | No camera data, 1206 px: the RX-0 Unicorn Gundam in Destroy mode | No (until Jorge's answer, the Gundam) | Its author and place were unknown (Q64); his own photos replaced it |
| `IMG_6420.HEIC` | 2026-09-05, Ciudad de las Artes y las Ciencias, Valencia: a Gundam statue against the sky | **The Gundam**, lifted | His photo (Q64): the head and chest, cut by the photo's frame |
| `IMG_6418.HEIC` | The same Gundam fourteen seconds before, the building behind it | **Printed whole**, hidden | It slides out from behind the Gundam: where it stands |
| `IMG_6984.HEIC` and `IMG_7504` | 2026-10-03, Gordale Scar, Yorkshire Dales: Jorge sitting on a rock. **The album's cover is this photo** | **Both**: his cut-out, and the whole photo behind it | The cover's pose in colour, right after the cover itself; pointed at, the photo it was cut from comes out behind him |
| `IMG_7507`, `IMG_7508` | The same afternoon: smiling; laughing with a hand on his head | **Hidden** | The other takes of the cover's afternoon: each tap on him brings the next |
| `IMG_7505`, `IMG_7506`, `IMG_7909_Original.jpg`, `IMG_7916_Original.jpg` | 2026-10-03, Ribblehead Viaduct: from behind; looking aside | No | Good portraits, but the cover's afternoon already gives the chapter its portrait |
| `IMG_7453.HEIC` | 2026-10-21, Ciudad de las Artes y las Ciencias, Valencia: VDS 2026's hall | **Printed whole**, hidden | The VDS he named, without anyone's face: it slides out from behind the badge |
| `IMG_7471.HEIC` | 2026-10-22, Valencia: Jorge and a friend at the VDS backdrop | No | Someone else's face; the hall says VDS without one |
| `VDS 2026 Welcome Drinks-082.JPEG` | 2026-10-20: the event photographer's picture (Canon EOS R6) of Jorge and a friend | No | The photographer's photo, and another face |
| `IMG_7511` | Eyes closed, sunglasses up | No | One face is enough for the Konami code; kept for later |
| `IMG_7599` | Tongue out | **Hidden** | The Konami code |
| `IMG_7597` | At a Google event beside the Android robot, a Gemini balloon | No | Which event is unknown, so it could not be captioned honestly: Q66 |
| `IMG_7598` | Prints of a graduation photo | No | Which graduation is not said: Q66 |

## The chapter, built

On the home, after the cover: **Sobre mí** (`sections/About`, h2), then **Créditos**
(`sections/AboutCredits`, h2), then the next track and the back cover.

**Sobre mí.** No title over it (Jorge, 2026-11-19: "remove the about me title"; the h2 stays,
visually hidden, for assistive technology and the outline). One sentence in Jorge's words, signed
"Jorge", set big on the ground: "¡Hola! Soy
Jorge, programo desde Murcia, estoy en el equipo fundador de ATLAXIA y el resto del tiempo lo
reparto entre eventos, viajes, Gundam y el campo." ("Viajes" where he wrote "traveling/viajando":
the noun the list needs. "Estoy en el equipo fundador de ATLAXIA" is mine, from the updated CV's
"Software Engineer (Freelance) | Founding Team", since he did not know what to say about it.) Each
of his things stands right after the word it is for, a line high: the cheque, the badge, Godzilla,
the Gundam, the bucket. The words are general, the things are specific (the cheque prints the
award, the badge his name), so the photos say what the words leave out. Jorge sits beside the
sentence as on the album's cover, in colour, right after the cover itself, and on wide landscape
screens the words wrap round his outline (`shape-outside`, his photo's own alpha); on phones and
portrait screens he sits over the sentence. A thing pointed at, focused or tapped is picked up:
it grows three times where it lies, its caption comes up under it in the page's inverted ink (the
technology marks' tag), and what it hides comes out. Captions: "Premio Santander X al Proyecto
Emprendedor, 2026", "DIATIC26 en Murcia y VDS 2026 en Valencia", "Shinjuku, Tokio, noviembre de
2025", "Valencia, septiembre de 2026", "Pimientos y pepinos de agosto".

References: The Romans (oversized type with an object inside the statement, as the back cover's
"Hablemos" already does), Kyoosang Choi (a frame round his own artefacts, a hand holding one),
Gianluca Boccia (one plain sentence carries the story, whole without animation), Jorge's cut-out
collage (#18) and the hero's cover photo, transitions.dev's tag. Not taken: a gallery or a grid of
photos, a timeline with pictures, any card or paper behind the copy (ADR-001).

**Easter eggs**, for whoever plays; nothing essential depends on them:
- Jorge is a button ("La foto de la portada, en Gordale Scar (Yorkshire). Ver otra toma"): each
  tap slaps down another take of that afternoon (laughing, then smiling, then the cover again),
  its caption swapping like the site's other text; pointed at, the photo he was cut from slides
  out behind him.
- Godzilla picked up by hand roars (the site's shake), and Jorge, shading his eyes on Odaiba,
  steps in front of its jaws to look up at it.
- The badge hides the VDS hall; the Gundam hides its photo with the building behind it.
- The Konami code (↑ ↑ ↓ ↓ ← → ← → B A) brings his face in from the bottom of the window, tongue
  out, for about three seconds.
- The console, after the site's hidden track: "Cara B de Sobre mí", his four favourite films in
  their Spanish titles, and a hint for the Konami code.

**Créditos.** The timeline newest first, the instruments, the languages, on shared columns, from
his CV as updated on 2026-11-19 (`~/Desktop/docs importantes/Jorge_Arcas_CV.docx.pdf`): ATLAXIA as
freelance software engineer in its founding team (2026 – hoy; the first CV said co-founder),
the Computer Engineering degree in progress (2026 – hoy), the Secure Coding certification (INFO
and CAETRA, 50 hours, 2026), Digital4tech (2025 – 2026), the Google Developer Group (2022 – 2025),
the internships at Altaico Seguridad and Grupo Fuertes' Lab19 (2025), the DAW (2023 – 2025), the
GDSC lead (2023 – 2024); plus his DevFest talk. "Proyectos propios" (MoneyMan, Client Leads,
Disco Download and gitchange, 2026) left the credits the same day at Jorge's request: the releases
are Proyectos' page. The CV's core skills joined
the instruments (Next.js, Angular, Styled Components, PostgreSQL, Firestore, Docker). The v2
site's "Ingeniería Informática, 2021 – 2023" is not in the CV and left the credits.

**The page that came first.** For an afternoon this was `/sobre-mi/`, with the home's Sobre mí
reduced to the old paragraph and "Más sobre mí". Jorge preferred all of it on the home, at first
glance and without a teaser: the route, its metadata and `ProfilePage` JSON-LD, its menu and
footer entries and the teaser are gone; the pass's portrait (`cutouts.jorge`) left the site with
the old chapter (its recipe and files too; `brand/avatar.webp` stays for the JSON-LD's image).

## Privacy and rights

- The originals live in `private/originals/me/` and never reach `public/`. Every published file is
  re-encoded from pixels (`scripts/extract-cutouts.py`), so no place, time or camera goes with it
  (checked: no Exif in the WebP files).
- No one but Jorge appears: the cheque is cut out of its group photo, the VDS hall shows only
  backs at a distance, the backdrop and drinks photos are not used.
- No third-party artwork is shown as an image: the film posters are words, the cinema sign under
  Godzilla is left out. Godzilla's head and the Gundam are statues in public places, in his own
  photos (Q70).
- The caption for the bucket says what it holds and when; the place (a private house) is not
  named.

## Tooling

- `scripts/lift-subject.swift`: Apple's Vision subject lifting (the model behind the cut-outs he
  made on his phone) at full resolution, macOS 14+.
- `scripts/prepare-about-art.py`: crops the cheque out of the group photo, lifts the cheque,
  Godzilla (alone), the Gundam and the bucket, takes the chair out of the bucket's lift, trims,
  and writes the three plain photos; everything to `private/originals/me/lifted/`.
- `scripts/extract-cutouts.py`: thirteen recipes (`key='alpha'`, the scissor margin), at the
  widths each is shown at.

## Measured (production build, `vite preview`, Chromium, 2026-11-19)

| Home | 1512 × 734 | 390 × 844 |
|---|---|---|
| Height | 3,448 → 4,259 px (4.7 → 5.8 screens) | 3,831 → 4,853 px (4.5 → 5.8 screens) |
| Images, landing on Sobre mí | 224 → 256 kB (1×), 360 → 516 kB (2×) | 360 → 435 kB (3×) |

Before: the last commit (27a1556), built and measured the same way. Everything about Jorge on
the home costs about one more screen; its photos about 30 kB on a 1× screen and 75–155 kB on
denser ones, loaded lazily under the hero. Each thing loads a line-sized file; the larger files,
the other takes and the hidden photos are fetched once someone plays (a pointer over the
sentence, focus in it, a touch). Jorge and the things wait out of sight until the chapter arrives
and are slapped down then (checked: opacity 0 at load, 1 once revealed).

- The home at 320 × 640 (4,860 px), 768 × 1024 (4,832), 1280 × 720 (4,206) and 1920 × 1080
  (5,528): no horizontal overflow at any size.
- Interactions checked with a mouse (each thing picked up, its caption, what it hides; Jorge's
  three takes and the photo behind him; the Konami code), by touch on an iPhone 13 profile (a tap
  picks a thing up, a second thing or a tap elsewhere puts it back, a tap on Jorge changes the
  take), in the dark theme, with reduced motion (no slap, no shake, the face fades in and out) and
  without JavaScript (the sentence, the things and the wrap round Jorge are all there; things grow
  under a pointer or focus from CSS alone).
- Bundle (gzip): the main script 109.1 → 112.0 kB (budget 120), the stylesheet 16.4 → 17.4 kB
  (budget 20), against the last commit.
- `npm run typecheck`, `check:architecture`, `test:config` and `build` (11 pages, SEO checks)
  pass.

## Questions (plan §4)

Answered by Jorge on 2026-11-19: Q63 (his sentence, with "viajes" for Godzilla), Q64 (his own
Gundam photos), Q65 (his updated CV; Grupo Fuertes as an internship), Q67 and Q68 (everything on
the home, no page, no teaser). Open: Q66 the Google-event and graduation photos; Q69 the wording
for ATLAXIA ("estoy en el equipo fundador de ATLAXIA"); Q70 the statues in his photos. Later the
same day: "Proyectos propios" left the credits, and the chapter's title was hidden.
