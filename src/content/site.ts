import type { SocialLink } from './types';

/**
 * Identity, contact and defaults. Every fact here is listed in the
 * authenticity register (docs/INFORMATION_ARCHITECTURE.md §6).
 */

const email = 'jorgearcasverdejo@gmail.com';

/** Builds a mailto: link with a prefilled subject (and optional body). */
export const mailto = (subject: string, body?: string): string => {
  const params = new URLSearchParams({ subject });
  if (body) params.set('body', body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${email}?${params.toString().replace(/\+/g, '%20')}`;
};

export const site = {
  name: 'Jorge Arcas',
  handle: 'J0rgw',
  role: 'Desarrollador full-stack freelance',
  roleShort: 'Desarrollador full-stack',
  /** Third portfolio: v1 and v2 live on GitHub. */
  catalog: 'JRG-003',
  releaseYear: '2026',
  baseUrl: 'https://portfolio.jarcas.dev',
  lang: 'es',
  locale: 'es_ES',
  location: 'España',
  languages: 'Español (nativo) · Inglés (profesional)',
  email,
  /** Flip `open` to false when not taking new work: copy updates everywhere. */
  availability: {
    open: true,
    label: 'Disponible para nuevos proyectos',
    short: 'Disponible',
  },
  /** What he builds, in one line: the Person description in the JSON-LD. */
  summary:
    'Desarrollo webs, aplicaciones y automatizaciones a medida. Convierto necesidades reales en productos digitales claros, rápidos y fáciles de mantener.',
  /** The credit in the cover's bottom-left corner (Jorge, 2026-10-29). */
  hero: {
    /** Full name as on LinkedIn. */
    name: 'Jorge Arcas Verdejo',
    role: 'Freelance Software Developer',
    /** Also the statement on the home social card. */
    statement: 'Software con carácter.',
  },
  contact: {
    subject: 'Proyecto nuevo',
    body: 'Hola Jorge,\n\nEstoy pensando en un proyecto y me gustaría contártelo.\n\nQué necesito:\nEn qué punto está:\nPlazo aproximado:\n',
  },
  seo: {
    title: 'Jorge Arcas · Desarrollador full-stack freelance',
    description:
      'Desarrollo webs, aplicaciones y automatizaciones a medida con React, TypeScript, Node.js y Python. Casos reales, proceso claro y contacto directo.',
    image: '/images/og/home.jpg',
  },
};

export const socials: SocialLink[] = [
  { label: 'Email', href: mailto(site.contact.subject, site.contact.body), icon: 'mail', detail: email },
  { label: 'GitHub', href: 'https://github.com/J0rgw', icon: 'github', detail: '@J0rgw' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jorge-arcas-verdejo-18ba29255/',
    icon: 'linkedin',
    detail: 'Jorge Arcas Verdejo',
  },
];
