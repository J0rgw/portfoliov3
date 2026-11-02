import type { Milestone, Principle } from './types';

/**
 * About chapter. Facts come from Jorge's previous portfolio (live in 2026-10),
 * his public repositories and the V3 brief. The narrative and the principles
 * are drafted from that public record and must be reviewed by Jorge
 * (docs/IMPLEMENTATION_PLAN.md, open question 6).
 */
export const aboutIntro = {
  heading: 'Sobre mí',
};

export const aboutNarrative: string[] = [
  'Soy Jorge Arcas, desarrollador full-stack en España. Construyo webs, aplicaciones y herramientas a medida, y me interesa especialmente el punto en el que la ingeniería se encuentra con la experiencia: interfaces que se sienten bien y sistemas que aguantan el uso real.',
  'Estudié Ingeniería Informática y después Desarrollo Web en la UCAM. En 2025 trabajé como desarrollador full-stack en Grupo Fuertes y, desde 2022, organizo eventos y talleres con Google Developer Group. En el DevFest 2025 de Santiago de Compostela di una charla sobre desarrollo dirigido por componentes con React y TypeScript.',
  'Este portfolio está diseñado como un disco: cada proyecto es una pista con sus créditos y sus notas. Es mi forma de presentar el trabajo con el cuidado de un objeto físico y con los créditos claros: quién hizo qué, con qué y por qué.',
];

export const principles: Principle[] = [
  {
    title: 'Documentar lo que funciona y lo que falta',
    body: 'Mis README separan lo verificado de lo pendiente. Prefiero un límite explícito a una promesa vaga.',
  },
  {
    title: 'Las escrituras, explícitas',
    body: 'Si algo modifica datos, toca un CRM o cuesta dinero, lo dice y pide confirmación. Así está construido Client Leads.',
  },
  {
    title: 'La interfaz también es ingeniería',
    body: 'Componentes reutilizables, tokens y accesibilidad desde el principio. De eso trataba mi charla en el DevFest 2025.',
  },
];

/** Chronological, oldest first: read as a tracklist of a career. */
export const milestones: Milestone[] = [
  { period: '2021 – 2023', title: 'Ingeniería Informática', org: 'UCAM', kind: 'education' },
  {
    period: '2022 – hoy',
    title: 'Organizador',
    org: 'Google Developer Group',
    detail: 'Eventos y talleres para la comunidad de desarrolladores.',
    kind: 'community',
  },
  {
    period: '2023 – 2024',
    title: 'Lead',
    org: 'Google Developer Student Clubs',
    detail: 'Al frente de un equipo de estudiantes que aprende creando soluciones para negocios locales.',
    kind: 'community',
  },
  { period: '2023 – 2025', title: 'Desarrollo Web', org: 'UCAM', kind: 'education' },
  {
    period: '2025',
    title: 'Desarrollador full-stack',
    org: 'Grupo Fuertes',
    detail: 'De marzo a junio: desarrollo y mantenimiento de aplicaciones web.',
    kind: 'work',
  },
  {
    period: '2025',
    title: 'Ponente',
    org: 'DevFest Santiago de Compostela',
    detail: '«Deja de copiar y pegar componentes»: CDD con React y TypeScript.',
    kind: 'talk',
  },
  {
    period: '2026',
    title: 'Proyectos propios',
    org: 'MoneyMan · Client Leads · Disco Download · gitchange',
    kind: 'projects',
  },
];

/** "Instruments": the stack as album credits. Mirrors the logo loop. */
export const instruments: { label: string; items: string[] }[] = [
  { label: 'Interfaz', items: ['TypeScript', 'JavaScript', 'React', 'Vite', 'GSAP', 'CSS'] },
  { label: 'Servidor y datos', items: ['Node.js', 'Python', 'Flask', 'FastAPI', 'Java', 'Spring Boot', 'Firebase', 'Supabase', 'SQLite'] },
  { label: 'Herramientas', items: ['Git', 'GitHub', 'Figma', 'Swift'] },
];

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
  { src: '/images/logo/github.svg', alt: 'GitHub' },
  { src: '/images/logo/dotenv.svg', alt: '.env' },
];

export const passCard = {
  name: 'Jorge Arcas',
  title: 'Desarrollador full-stack',
  handle: 'J0rgw',
  avatar: '/images/brand/avatar.webp',
  icon: '/images/brand/frog-mark.webp',
  contactLabel: 'Contactar',
};
