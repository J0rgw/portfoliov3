import type { Service } from './types';
import { projectHref } from './projects';

/**
 * Offers organised around client problems (docs/INFORMATION_ARCHITECTURE.md §3).
 * Only services with public evidence are listed. WordPress / WooCommerce and
 * booking systems are deliberately absent until there is evidence (open question 4).
 *
 * Distilled on 2026-11-10 (ADR-001): one line per offer, built from its earlier
 * outcome and scope (the client's quoted problem and the four-line scope went:
 * an unattributed quote read like a testimonial, and the tracklist has to fit
 * one frame). The outcome is also the offer's description in the JSON-LD.
 */
export const servicesIntro = {
  heading: 'Qué puedo construir para ti',
  lede: 'Empiezo siempre por el problema que tienes, no por la tecnología que me apetece usar.',
};

export const services: Service[] = [
  {
    id: 'web',
    title: 'Webs y landing pages a medida',
    outcome: 'Rápidas, accesibles y fáciles de encontrar, hechas a partir de tu negocio y no de una plantilla.',
    evidence: [
      { label: 'Este portfolio', href: '/' },
      { label: 'Portfolio v2', href: projectHref('portfolio-v2') },
    ],
    cta: { label: 'Hablemos de tu web', subject: 'Proyecto web' },
  },
  {
    id: 'apps',
    title: 'Aplicaciones web y herramientas internas',
    outcome: 'Paneles, formularios e importación de datos en React y TypeScript, a tu forma de trabajar.',
    evidence: [
      { label: 'MoneyMan', href: projectHref('moneyman') },
      { label: 'Mathgeon', href: projectHref('mathgeon') },
    ],
    cta: { label: 'Cuéntame tu proceso', subject: 'Aplicación a medida' },
  },
  {
    id: 'automation',
    title: 'Automatización e integración con CRM',
    outcome: 'Datos que llegan solos, limpios y trazables a tu CRM, con un modo de prueba antes de escribir nada.',
    evidence: [
      { label: 'Client Leads', href: projectHref('client-leads') },
      { label: 'Disco Download', href: projectHref('disco-download') },
      { label: 'gitchange', href: projectHref('gitchange') },
    ],
    cta: { label: 'Automaticemos algo', subject: 'Automatización / CRM' },
  },
  {
    id: 'frontend',
    title: 'Frontend y sistemas de componentes',
    outcome: 'Componentes reutilizables, tokens de diseño y accesibilidad que tu equipo puede mantener.',
    evidence: [
      { label: 'Charla en DevFest 2025', href: 'https://github.com/J0rgw/PonenciaCDD' },
      { label: 'Mathgeon', href: projectHref('mathgeon') },
    ],
    cta: { label: 'Revisemos tu frontend', subject: 'Frontend / componentes' },
  },
];
