import type { ProcessStep } from './types';
import { projectHref } from './projects';

/**
 * Proceso: how a conversation becomes a published product, as a playlist of
 * five steps on the chapter's iPod. Each step carries one real, public project
 * decision. Distilled on 2026-11-10 (ADR-001) from the earlier liner notes:
 * same facts, about half the words, so the chapter fits one frame.
 */
export const processIntro = {
  heading: 'Cómo trabajo',
  lede: 'De una conversación a un producto publicado, con decisiones reales detrás de cada fase.',
  /** The phrase the marker underlines while the chapter holds (graphics/PenMark). */
  mark: 'decisiones reales',
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Entender el problema',
    body: 'Cómo trabajas hoy, qué duele y qué significa «funciona» para ti. De ahí sale un alcance por escrito.',
    note: {
      text: 'En Client Leads el problema era no confundir una empresa con sus plantas, y eso definió el modelo de datos.',
      source: { label: 'Client Leads', href: projectHref('client-leads') },
    },
  },
  {
    number: '02',
    title: 'Definir la solución',
    body: 'Prioridades, arquitectura y lo que queda fuera. Mejor una versión pequeña que funcione que un plan enorme que no llega.',
    note: {
      text: 'MoneyMan arrancó sin backend a propósito: los datos se quedan en el navegador, sin cuentas ni servidores.',
      source: { label: 'MoneyMan', href: projectHref('moneyman') },
    },
  },
  {
    number: '03',
    title: 'Construir por iteraciones',
    body: 'Entregas frecuentes que puedes ver y probar, con código tipado y componentes reutilizables.',
    note: {
      text: 'En Mathgeon botones, campos y avisos son componentes compartidos: un cambio se hace una sola vez.',
      source: { label: 'Mathgeon', href: projectHref('mathgeon') },
    },
  },
  {
    number: '04',
    title: 'Probar y publicar',
    body: 'Comprobaciones automáticas, revisión en móvil y escritorio, y accesibilidad y rendimiento medidos.',
    note: {
      text: 'Este portfolio no se publica si falta una imagen o si una página no tiene título, descripción y un único h1.',
      source: { label: 'Código de este sitio', href: 'https://github.com/J0rgw/portfoliov3' },
    },
  },
  {
    number: '05',
    title: 'Mantener y mejorar',
    body: 'Documentación clara y límites explícitos, para que lo que entrego no dependa de mí.',
    note: {
      text: 'El README de MoneyMan separa lo verificado de lo pendiente y lista la siguiente fase.',
      source: { label: 'MoneyMan', href: projectHref('moneyman') },
    },
  },
];
