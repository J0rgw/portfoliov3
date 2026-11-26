import type { AboutRun, AboutTake, Milestone } from './types';

/**
 * Sobre mí, on the home (ADR-004, 2026-11-19; Jorge's brief: "telling more without
 * writing more", and everything about him on the index, at first glance). One sentence,
 * his own words; each of his things follows the word it stands for, so the photos say
 * what the words leave out (the cheque prints the award, the badge his name). Then the
 * credits. Every fact is in the authenticity register (INFORMATION_ARCHITECTURE §6): his
 * CV (updated 2026-11-19), his photos and their dates and places, his brief.
 *
 * Until ADR-004 the chapter was the pass's portrait and one paragraph ("Soy Jorge Arcas,
 * desarrollador full-stack en España. Construyo webs, aplicaciones y herramientas a
 * medida…"), quoted whole in the ADR.
 */

/** The sentence's opening, kept apart from the rest so that on phones it can sit beside his
 *  photo as a headline while the long part runs at full width underneath (ADR-004, 2026-11-26).
 *  Everywhere else it is the sentence's first words, set inline: the two parts read as one. */
const greeting = '¡Hola! Soy Jorge,';

/** The rest of the sentence, from the space after the greeting. */
const statement: AboutRun[] = [
  ' programo desde Murcia, estoy en el equipo fundador de ',
  { words: 'ATLAXIA', thing: { cutout: 'cheque', caption: 'Premio Santander X al Proyecto Emprendedor, 2026' } },
  ' y el resto del tiempo lo reparto entre ',
  { words: 'eventos', thing: { cutout: 'badge', hidden: 'vds', caption: 'DIATIC26 en Murcia y VDS 2026 en Valencia' } },
  ', ',
  { words: 'viajes', thing: { cutout: 'godzilla', hidden: 'jorge-looking', caption: 'Shinjuku, Tokio, noviembre de 2025' } },
  ', ',
  { words: 'Gundam', thing: { cutout: 'gundam', hidden: 'gundam-valencia', caption: 'Valencia, septiembre de 2026' } },
  ' y ',
  { words: 'el campo', thing: { cutout: 'peppers', caption: 'Pimientos y pepinos de agosto' } },
  '.',
];

/** The album's cover photo, in colour, and two more takes from that afternoon: each
 *  tap on him brings the next. */
const takes: AboutTake[] = [
  { cutout: 'jorge-sitting', caption: 'La foto de la portada, en Gordale Scar (Yorkshire)' },
  { cutout: 'jorge-laughing', caption: 'Otra toma de aquella tarde' },
  { cutout: 'jorge-smiling', caption: 'Y otra más' },
];

export const aboutChapter = {
  heading: 'Sobre mí',
  greeting,
  statement,
  takes,
  /** Completes the accessible name of Jorge's photo, which is a button. */
  nextTake: 'Ver otra toma',
  credits: 'Créditos',
};

/**
 * The chapter's hidden track (ADR-004): printed in the console after the site's own. His
 * Letterboxd favourites (his screenshot, 2026-07-27), in their Spanish titles, and a hint
 * for the Konami code.
 */
export const aboutHiddenTrack = [
  'Cara B de Sobre mí',
  'Mis cuatro películas favoritas: Retrato de una mujer en llamas, La vida de Brian, Todo a la vez en todas partes y Nicky, la aprendiz de bruja.',
  'Si te sabes el código Konami, aquí funciona.',
];

/** The Konami code (↑ ↑ ↓ ↓ ← → ← → B A), as KeyboardEvent.key values, lower case. */
export const konamiCode = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

/**
 * Newest first (2026-11-10): clients and recruiters read the latest first. From Jorge's
 * CV as updated on 2026-11-19 (ADR-004), plus his talk. His own releases ("Proyectos
 * propios") left on 2026-11-19 at his request: they are Proyectos' page.
 */
export const milestones: Milestone[] = [
  { period: '2026 – hoy', title: 'Ingeniero de software freelance', org: 'ATLAXIA, equipo fundador', kind: 'work' },
  { period: '2026 – hoy', title: 'Grado en Ingeniería Informática', org: 'UCAM, en curso', kind: 'education' },
  {
    period: '2026',
    title: 'Secure Coding: Building Cyber Resilience',
    org: 'INFO y CAETRA, 50 horas',
    kind: 'education',
  },
  {
    period: '2025 – 2026',
    title: 'Analista y desarrollador de software',
    org: 'Digital4tech',
    kind: 'work',
  },
  {
    period: '2025',
    title: 'Ponente',
    org: 'DevFest Santiago de Compostela',
    kind: 'talk',
  },
  {
    period: '2022 – 2025',
    title: 'Coorganizador',
    org: 'Google Developer Group Murcia y Cartagena',
    kind: 'community',
  },
  { period: '2025', title: 'Desarrollador full-stack en prácticas', org: 'Altaico Seguridad', kind: 'work' },
  { period: '2025', title: 'Desarrollador full-stack en prácticas', org: 'Grupo Fuertes, Lab19', kind: 'work' },
  {
    period: '2023 – 2025',
    title: 'Técnico Superior en Desarrollo de Aplicaciones Web',
    org: 'UCAM',
    kind: 'education',
  },
  {
    period: '2023 – 2024',
    title: 'Lead',
    org: 'Google Developer Student Clubs',
    kind: 'community',
  },
];

/** "Instruments": the stack as album credits; the CV's core skills (2026-11-19) included. */
export const instruments: { label: string; items: string[] }[] = [
  { label: 'Interfaz', items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Angular', 'Vite', 'Styled Components', 'GSAP', 'CSS'] },
  { label: 'Servidor y datos', items: ['Node.js', 'Python', 'Flask', 'FastAPI', 'Java', 'Spring Boot', 'PostgreSQL', 'SQLite', 'Firebase', 'Firestore', 'Supabase'] },
  { label: 'Herramientas', items: ['Git', 'GitHub', 'Docker', 'Figma', 'Swift'] },
];

/** Technology marks; config/technologies.ts builds the Projects credits' stack from them. */
export const instrumentLogos = [
  { src: '/images/logo/typescript.svg', alt: 'TypeScript' },
  { src: '/images/logo/react_dark.svg', alt: 'React' },
  { src: '/images/logo/javascript.svg', alt: 'JavaScript' },
  { src: '/images/logo/nodejs.svg', alt: 'Node.js' },
  { src: '/images/logo/vitejs.svg', alt: 'Vite' },
  { src: '/images/logo/python.svg', alt: 'Python' },
  { src: '/images/logo/fastapi.svg', alt: 'FastAPI' },
  { src: '/images/logo/java.svg', alt: 'Java' },
  { src: '/images/logo/spring.svg', alt: 'Spring Boot' },
  { src: '/images/logo/firebase.svg', alt: 'Firebase' },
  { src: '/images/logo/supabase.svg', alt: 'Supabase' },
  { src: '/images/logo/swift.svg', alt: 'Swift' },
  { src: '/images/logo/github.svg', darkSrc: '/images/logo/github-dark.svg', alt: 'GitHub' },
  { src: '/images/logo/dotenv.svg', alt: '.env' },
];
