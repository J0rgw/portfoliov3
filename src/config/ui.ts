/** Shared semantic labels, section copy and functional messages. Spanish locale. */
export const ui = {
  "navigation": {
    "home": "Inicio",
    "cover": "Portada",
    "projects": "Proyectos",
    "services": "Servicios",
    "bonus": "Bonus",
    "contact": "Contacto",
    "talk": "Hablemos",
    "index": "Índice",
    "tracklist": "Tracklist",
    "fullIndex": "Índice completo",
    "backTop": "Volver arriba",
    "skip": "Saltar al contenido",
    "menu": "Menú",
    "close": "Cerrar",
    "openMenu": "Abrir menú",
    "closeMenu": "Cerrar menú",
    "chapters": "Capítulos",
    "pages": "Páginas",
    "pageContents": "En esta página"
  },
  "labels": {
    "stack": "Stack",
    "role": "Rol",
    "team": "Equipo",
    "type": "Tipo",
    "year": "Año",
    "status": "Estado",
    "languages": "Idiomas",
    "meaning": "Qué significa"
  },
  "actions": {
    "write": "Escríbeme",
    "contact": "Contactar",
    "allProjects": "Todos los proyectos",
    "backProjects": "Volver a proyectos",
    "source": "Código fuente",
    "code": "Ver el código",
    "live": "Ver en vivo",
    "viewProjects": "Ver proyectos"
  },
  "projects": {
    "heading": "Proyectos seleccionados",
    "earlier": "Otros lanzamientos",
    "allTracks": "Todas las pistas",
    "discs": "Discos de los proyectos",
    "hint": "Haz clic para saber más",
    "hintTouch": "Toca para saber más",
    "previous": "Proyecto anterior",
    "next": "Siguiente proyecto",
    "indexIntro": "Cada lanzamiento con sus créditos. Cada disco abre su caso de estudio.",
    "empty": "No hay proyectos publicados por el momento."
  },
  "detail": {
    "pending": "Pendiente de documentar.",
    "overview": "Resumen",
    "context": "Contexto",
    "challenge": "El problema",
    "contextProblem": "Contexto y problema",
    "goals": "Objetivos y restricciones",
    "responsibilities": "Mi papel",
    "solution": "Solución",
    "architecture": "Arquitectura y tecnología",
    "decisions": "Decisiones técnicas",
    "outcome": "Resultado",
    "evidence": "Evidencias",
    "nextTrack": "Siguiente pista",
    "contactHeading": "¿Necesitas algo parecido?",
    "contactBody": "Cuéntame tu caso: qué tienes hoy, qué te falta y para cuándo lo necesitas."
  },
  "contact": {
    "heading": "¿Tienes un proyecto en mente?",
    "body": "Cuéntame qué necesitas, en qué punto está y qué plazo tienes. Te respondo personalmente.",
    "copied": "Email copiado",
    "copy": "Copiar email",
    "copySuccess": "Email copiado al portapapeles",
    "copyFailed": "No se ha podido copiar. Puedes seleccionar la dirección o abrir tu correo.",
    "closed": "Agenda completa",
    "talkHidden": "por email"
  },
  "hero": {
    "resume": "Reanudar giro del disco",
    "pause": "Pausar giro del disco"
  },
  "theme": {
    "dark": "Tema oscuro"
  },
  "about": {
    "timeline": "Trayectoria",
    "instruments": "Instrumentos"
  },
  "process": {
    "playlist": "Proceso",
    "steps": "Fases del proceso"
  },
  "services": {
    "evidence": "Lo he hecho en:"
  },
  "notFound": {
    "annotation": "Nada",
    "heading": "Pista no encontrada",
    "body": "Puede que el enlace haya cambiado o que nunca existiera.",
    "back": "Volver a la portada"
  },
  "footer": {
    "credit": "Diseño y desarrollo:",
    "tools": ". Hecho con React, TypeScript y Vite, en Poppins (OFL) y Estrella (Uncarving)."
  },
  "media": {
    "logos": "Logos de tecnologías",
    "cdr": "CD-R",
    "capacity": "80 min · 700 MB"
  }
} as const;

/** "A, B y C", the way Spanish writes a list (DESIGN.md "Typography"). */
const spanishList = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}` : items.join('');

export const messages = {
  passLabel: (name: string) => `Pase: ${name}`,
  portrait: (name: string) => `Retrato de ${name}`,
  projectAnnouncement: (position: number, total: number, title: string) => `Proyecto ${position} de ${total}: ${title}`,
  projectLink: (position: number, total: number, title: string) => `${title}, proyecto ${position} de ${total}. Ver el caso de estudio`,
  privateLink: (position: number, total: number, title: string) => `${title}, proyecto ${position} de ${total}. Escríbeme para hablarlo`,
  homeLabel: (name: string) => `${name}, inicio`,
  projectSubject: (title: string) => `Proyecto parecido a ${title}`,
  /** The home's next track (ADR-003): "Lo que he construido, empezando por MoneyMan, Client Leads y Mathgeon." */
  featuredProjects: (titles: string[]) => `Lo que he construido, empezando por ${spanishList(titles)}.`,
};
