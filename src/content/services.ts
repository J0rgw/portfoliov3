import type { Service } from './types';
import { projectHref } from './projects';

/**
 * Offers organised around client problems (docs/INFORMATION_ARCHITECTURE.md §3).
 * Only services with public evidence are listed. WordPress / WooCommerce and
 * booking systems are deliberately absent until there is evidence (open question 4).
 */
export const servicesIntro = {
  heading: 'Qué puedo construir para ti',
  lede: 'Cuatro formas de trabajar juntos. Empiezo siempre por el problema que tienes, no por la tecnología que me apetece usar.',
};

export const services: Service[] = [
  {
    id: 'web',
    number: '01',
    title: 'Webs y landing pages a medida',
    problem: '«Necesito una web que explique bien lo que hago y que convierta visitas en contactos.»',
    outcome: 'Una web rápida, clara y fácil de encontrar, construida a partir de tu negocio y no de una plantilla.',
    scope: [
      'Estructura y textos orientados a la acción',
      'Diseño de interfaz y desarrollo a medida',
      'SEO técnico: HTML semántico, metadatos, datos estructurados y sitemap',
      'Rendimiento y accesibilidad desde el primer día',
    ],
    evidence: [
      { label: 'Este portfolio', href: '/' },
      { label: 'Portfolio v2', href: projectHref('portfolio-v2') },
    ],
    cta: { label: 'Hablemos de tu web', subject: 'Proyecto web' },
  },
  {
    id: 'apps',
    number: '02',
    title: 'Aplicaciones web y herramientas internas',
    problem: '«Trabajamos con hojas de cálculo y procesos manuales que ya no dan más de sí.»',
    outcome: 'Una aplicación hecha para tu forma de trabajar: paneles, formularios, importación de datos y cuentas de usuario, documentada y lista para crecer.',
    scope: [
      'Análisis del proceso actual y alcance por fases',
      'Frontend en React y TypeScript',
      'Backend y datos con Node.js, Python, Firebase o SQL según el caso',
      'Aplicación instalable (PWA) cuando aporta valor',
    ],
    evidence: [
      { label: 'MoneyMan', href: projectHref('moneyman') },
      { label: 'Mathgeon', href: projectHref('mathgeon') },
    ],
    cta: { label: 'Cuéntame tu proceso', subject: 'Aplicación a medida' },
  },
  {
    id: 'automation',
    number: '03',
    title: 'Automatización e integración con CRM',
    problem: '«Los datos están repartidos entre herramientas y alguien los copia a mano.»',
    outcome: 'Procesos que se ejecutan solos y datos que llegan limpios y trazables a donde se usan: el CRM, una hoja o un panel.',
    scope: [
      'Integración con APIs y CRM, por ejemplo Twenty',
      'Extracción y enriquecimiento de datos con su procedencia',
      'Scripts y utilidades de línea de comandos',
      'Modo de prueba antes de escribir nada en tus sistemas',
    ],
    evidence: [
      { label: 'Client Leads', href: projectHref('client-leads') },
      { label: 'Disco Download', href: projectHref('disco-download') },
      { label: 'gitchange', href: projectHref('gitchange') },
    ],
    cta: { label: 'Automaticemos algo', subject: 'Automatización / CRM' },
  },
  {
    id: 'frontend',
    number: '04',
    title: 'Frontend y sistemas de componentes',
    problem: '«El producto funciona, pero la interfaz es inconsistente y cada pantalla se hace desde cero.»',
    outcome: 'Una interfaz coherente sobre componentes reutilizables, tokens de diseño y accesibilidad, que tu equipo puede mantener.',
    scope: [
      'Arquitectura de componentes en React y TypeScript',
      'Tokens de diseño y documentación de uso',
      'Accesibilidad (WCAG 2.2) y rendimiento',
      'Animación con propósito que respeta «reducir movimiento»',
    ],
    evidence: [
      { label: 'Charla en DevFest 2025', href: 'https://github.com/J0rgw/PonenciaCDD' },
      { label: 'Mathgeon', href: projectHref('mathgeon') },
    ],
    cta: { label: 'Revisemos tu frontend', subject: 'Frontend / componentes' },
  },
];
