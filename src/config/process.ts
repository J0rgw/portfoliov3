import type { ProcessStep } from './types';
import { projectHref } from './projects';

/**
 * Proceso: how a conversation becomes a published product, as a playlist of
 * five steps on the chapter's iPod. Each step carries one real decision with a
 * link to its evidence. Written by Jorge on 2026-11-11 (only spelling and
 * punctuation touched); the claims are in the authenticity register
 * (docs/INFORMATION_ARCHITECTURE.md §6). The earlier copy is in git (777afea).
 */
export const processIntro = {
  heading: 'Cómo trabajo',
  lede: 'Así es como materializo una conversación en un producto real.',
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Entendiendo el problema',
    body: 'Cómo trabajas hoy, cuál es el problema, qué duele y qué significa «funcional» para ti.',
    note: {
      text: 'En mi proyecto de CRM el problema era que una startup necesitaba un CRM desde cero, pero rellenar a mano es muy costoso. Por eso diseñé Client Leads.',
      source: { label: 'Client Leads', href: projectHref('client-leads') },
    },
  },
  {
    number: '02',
    title: 'Definiendo la solución',
    body: 'Mejor una versión pequeña que funcione que un plan enorme que no llega. Siempre hay algo que necesita más prioridad que lo demás.',
    note: {
      text: 'MoneyMan arrancó sin backend a propósito; los datos se quedan en el navegador, sin cuentas ni servidores, ya que era un proyecto personal para investigar el fintech. Ahora es una app que todo mi entorno usa.',
      source: { label: 'MoneyMan', href: projectHref('moneyman') },
    },
  },
  {
    number: '03',
    title: 'Construyendo por iteraciones',
    body: 'Entregas frecuentes que puedes ver y probar, con código tipado y componentes reutilizables. Lo primordial para mí es llegar a las entregas.',
    note: {
      text: 'En Mathgeon botones, campos y avisos son componentes compartidos; un cambio se hace una sola vez, pero con ese cambio se cambia toda la mazmorra.',
      source: { label: 'Mathgeon', href: projectHref('mathgeon') },
    },
  },
  {
    number: '04',
    title: 'Probando y publicando',
    body: 'Comprobaciones automáticas, revisión en móvil y escritorio, SEO inteligente, y accesibilidad y rendimiento medidos.',
    note: {
      text: 'Ninguna web mía se publica si falta una imagen o si una página no tiene título, descripción y un único h1.',
      source: { label: 'Código de este sitio', href: 'https://github.com/J0rgw/portfoliov3' },
    },
  },
  {
    number: '05',
    title: 'Manteniendo y mejorando',
    body: 'Documentación clara y límites explícitos, con formación y documentación del proyecto que quieres, para que lo que entrego no dependa de mí.',
    note: {
      text: 'Todas mis documentaciones están en español e inglés, para que el cliente siempre tenga sus necesidades cubiertas, con índices y documentación para facilitar la búsqueda de información tanto al LLM como a ti.',
      source: { label: 'MoneyMan', href: projectHref('moneyman') },
    },
  },
];
