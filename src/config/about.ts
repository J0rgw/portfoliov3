import type { Milestone } from './types';

/**
 * About chapter. Facts come from Jorge's previous portfolio (live in 2026-10),
 * his public repositories and the V3 brief. The bio is drafted from that public
 * record and must be reviewed by Jorge (docs/IMPLEMENTATION_PLAN.md, open
 * question 6).
 *
 * Distilled on 2026-11-10 (ADR-001): one paragraph instead of three (the second
 * restated the timeline, the third described the site), no principles, and the
 * milestones without their detail lines, so the chapter fits one frame.
 */
export const aboutIntro = {
  heading: 'Sobre mí',
  /** The word the marker underlines while the chapter holds (graphics/PenMark). */
  mark: 'mí',
};

export const aboutBio =
  'Soy Jorge Arcas, desarrollador full-stack en España. Construyo webs, aplicaciones y herramientas a medida, donde la ingeniería se encuentra con la experiencia: interfaces que se sienten bien y sistemas que aguantan el uso real.';

/** Newest first (2026-11-10): clients and recruiters read the latest first. */
export const milestones: Milestone[] = [
  {
    period: '2026',
    title: 'Proyectos propios',
    org: 'MoneyMan, Client Leads, Disco Download y gitchange',
    kind: 'projects',
  },
  {
    period: '2025',
    title: 'Ponente',
    org: 'DevFest Santiago de Compostela',
    kind: 'talk',
  },
  {
    period: '2025',
    title: 'Desarrollador full-stack',
    org: 'Grupo Fuertes',
    kind: 'work',
  },
  { period: '2023 – 2025', title: 'Desarrollo Web', org: 'UCAM', kind: 'education' },
  {
    period: '2023 – 2024',
    title: 'Lead',
    org: 'Google Developer Student Clubs',
    kind: 'community',
  },
  {
    period: '2022 – hoy',
    title: 'Organizador',
    org: 'Google Developer Group',
    kind: 'community',
  },
  { period: '2021 – 2023', title: 'Ingeniería Informática', org: 'UCAM', kind: 'education' },
];

/** "Instruments": the stack as album credits. */
export const instruments: { label: string; items: string[] }[] = [
  { label: 'Interfaz', items: ['TypeScript', 'JavaScript', 'React', 'Vite', 'GSAP', 'CSS'] },
  { label: 'Servidor y datos', items: ['Node.js', 'Python', 'Flask', 'FastAPI', 'Java', 'Spring Boot', 'Firebase', 'Supabase', 'SQLite'] },
  { label: 'Herramientas', items: ['Git', 'GitHub', 'Figma', 'Swift'] },
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
