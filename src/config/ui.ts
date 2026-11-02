/** Shared semantic labels, section copy and functional messages. Spanish locale. */
export const ui = {
  "navigation": {
    "home": "Inicio",
    "cover": "Portada",
    "projects": "Proyectos",
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
    "breadcrumbs": "Migas de pan",
    "pageContents": "En esta página"
  },
  "labels": {
    "project": "Proyecto",
    "description": "Descripción",
    "stack": "Stack",
    "role": "Rol",
    "team": "Equipo",
    "type": "Tipo",
    "year": "Año",
    "status": "Estado",
    "technology": "Tecnología",
    "languages": "Idiomas",
    "base": "Base",
    "meaning": "Qué significa",
    "github": "GitHub",
    "linkedin": "LinkedIn",
    "content": "Contenido"
  },
  "actions": {
    "write": "Escríbeme",
    "contact": "Contactar",
    "allProjects": "Todos los proyectos",
    "projectIndex": "Índice de proyectos",
    "backProjects": "Volver a proyectos",
    "source": "Código fuente",
    "code": "Ver el código",
    "live": "Ver en vivo",
    "viewProjects": "Ver proyectos"
  },
  "projects": {
    "heading": "Proyectos seleccionados",
    "allTracks": "Todas las pistas",
    "discs": "Discos de los proyectos",
    "hint": "Haz clic para saber más",
    "previous": "Proyecto anterior",
    "next": "Siguiente proyecto",
    "indexIntro": "Cada lanzamiento con sus créditos: qué es, qué parte hice yo, con qué está construido y en qué estado está.",
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
    "nextTrack": "Siguiente pista ·",
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
    "closed": "Agenda completa"
  },
  "hero": {
    "resume": "Reanudar giro del disco",
    "pause": "Pausar giro del disco"
  },
  "about": {
    "education": "Formación",
    "community": "Comunidad",
    "work": "Trabajo",
    "talk": "Charla",
    "timeline": "Trayectoria",
    "instruments": "Instrumentos",
    "technologies": "Tecnologías con las que trabajo",
    "credits": "Créditos"
  },
  "process": {
    "annotation": "Proceso",
    "booklet": "Notas del libreto",
    "technicalNote": "Nota técnica",
    "closing": "¿Te encaja esta forma de trabajar?",
    "cta": "Cuéntame tu proyecto"
  },
  "services": {
    "annotation": "Servicios",
    "evidence": "Lo he hecho en"
  },
  "bonus": {
    "annotation": "Bonus",
    "track": "track"
  },
  "notFound": {
    "annotation": "Nada",
    "heading": "Pista no encontrada",
    "body": "Esta pista no está en el disco. Puede que el enlace haya cambiado o que nunca existiera.",
    "back": "Volver a la portada"
  },
  "footer": {
    "credit": "Diseño y desarrollo:",
    "tools": ". Hecho con React, TypeScript y Vite. Tipografía principal: Poppins (OFL); anotaciones: Estrella (Uncarving)."
  },
  "media": {
    "logos": "Logos de tecnologías",
    "cdr": "CD-R",
    "capacity": "80 min · 700 MB"
  }
} as const;

export const messages = {
  passLabel: (name: string) => `Pase: ${name}`,
  portrait: (name: string) => `Retrato de ${name}`,
  projectAnnouncement: (position: number, total: number, title: string) => `Proyecto ${position} de ${total}: ${title}`,
  projectLink: (position: number, total: number, title: string) => `${title}, proyecto ${position} de ${total}. Ver el caso de estudio`,
  homeLabel: (name: string) => `${name}, inicio`,
  projectSubject: (title: string) => `Proyecto parecido a ${title}`,
};
