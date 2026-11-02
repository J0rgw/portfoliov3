import type { ProcessStep } from './types';
import { projectHref } from './projects';

/**
 * Liner notes: how a conversation becomes a published product. Each step
 * carries a technical note grounded in a real, public project decision.
 */
export const processIntro = {
  heading: 'Cómo trabajo',
  lede: 'Las notas del libreto: cómo paso de una conversación a un producto publicado, y qué decisiones reales hay detrás de cada fase.',
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Entender el problema',
    body: 'Antes de proponer nada, entiendo cómo trabajas hoy, qué duele y qué significa «funciona» para ti. De ahí sale un alcance por escrito.',
    note: {
      text: 'En Client Leads el problema no era descargar datos, sino no confundir una empresa con sus plantas. Ese matiz definió todo el modelo de datos.',
      source: { label: 'Client Leads', href: projectHref('client-leads') },
    },
  },
  {
    number: '02',
    title: 'Definir la solución',
    body: 'Prioridades, arquitectura y lo que queda fuera. Prefiero una primera versión pequeña que funcione a un plan enorme que no llega.',
    note: {
      text: 'MoneyMan arrancó sin backend a propósito: los datos se quedan en el navegador, y eso eliminó cuentas, servidores y riesgos desde el primer día.',
      source: { label: 'MoneyMan', href: projectHref('moneyman') },
    },
  },
  {
    number: '03',
    title: 'Construir por iteraciones',
    body: 'Entregas frecuentes que puedes ver y probar. Código tipado, componentes reutilizables y decisiones documentadas.',
    note: {
      text: 'En Mathgeon los botones, campos y avisos son componentes compartidos: todas las pantallas se comportan igual y un cambio se hace una sola vez.',
      source: { label: 'Mathgeon', href: projectHref('mathgeon') },
    },
  },
  {
    number: '04',
    title: 'Probar y publicar',
    body: 'Comprobaciones automáticas antes de publicar, revisión en móvil y escritorio, y accesibilidad y rendimiento medidos, no supuestos.',
    note: {
      text: 'Este portfolio no se publica si falta una imagen referenciada o si una página no tiene título, descripción y un único h1: el build falla.',
      source: { label: 'Código de este sitio', href: 'https://github.com/J0rgw/portfoliov3' },
    },
  },
  {
    number: '05',
    title: 'Mantener y mejorar',
    body: 'Documentación clara, límites explícitos y un plan para la siguiente fase, para que lo que entrego se pueda seguir usando sin depender de mí.',
    note: {
      text: 'Mis README separan lo verificado de lo pendiente: el de MoneyMan lista sus límites y lo que añade la siguiente fase.',
      source: { label: 'MoneyMan', href: projectHref('moneyman') },
    },
  },
];
