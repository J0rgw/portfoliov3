import { useEffect, type CSSProperties, type ReactNode } from 'react';
import Button from '../components/Button/Button';
import CoverArt from '../components/CoverArt/CoverArt';
import CreditsTable, { type CreditRow } from '../components/CreditsTable/CreditsTable';
import Disc from '../components/Disc/Disc';
import Evidence from '../components/Evidence/Evidence';
import { ArrowLeft, ArrowRight } from '../components/Icon/Icon';
import { chapterHref } from '../content/chapters';
import { formatTrack, nextProject, projectBySlug, projectHref, trackTotal } from '../content/projects';
import { mailto, site } from '../content/site';
import type { Project } from '../content/types';
import { useScrollSpy } from '../motion/useScrollSpy';
import { rememberProject } from '../sections/Projects/selection';
import './ProjectPage.css';

interface CaseSection {
  id: string;
  title: string;
  content: ReactNode;
}

const paragraphs = (items: string[]) => items.map((text, index) => <p key={index}>{text}</p>);
const bullets = (items: string[]) => (
  <ul className="case-list" role="list">
    {items.map((text) => (
      <li key={text}>{text}</li>
    ))}
  </ul>
);

/**
 * A core section with nothing verified to say yet: it says so, instead of
 * vanishing or being filled with guesses (IA §5).
 */
const pending = (id: string, title: string): CaseSection => ({
  id,
  title,
  content: <p className="case-pending">Pendiente de documentar.</p>,
});

/**
 * Optional sections render only with content, in the order of the IA
 * contract. The template's core (context or problem, role, solution) always
 * appears, as a placeholder when the content does not exist yet.
 */
const buildSections = (project: Project): CaseSection[] => {
  const sections: (CaseSection | null)[] = [
    { id: 'resumen', title: 'Resumen', content: paragraphs(project.overview) },
    project.context ? { id: 'contexto', title: 'Contexto', content: paragraphs(project.context) } : null,
    project.challenge ? { id: 'problema', title: 'El problema', content: paragraphs(project.challenge) } : null,
    !project.context && !project.challenge ? pending('contexto', 'Contexto y problema') : null,
    project.goals ? { id: 'objetivos', title: 'Objetivos y restricciones', content: bullets(project.goals) } : null,
    project.responsibilities
      ? {
          id: 'mi-papel',
          title: 'Mi papel',
          content: project.responsibilities.length > 1 ? bullets(project.responsibilities) : paragraphs(project.responsibilities),
        }
      : pending('mi-papel', 'Mi papel'),
    !project.architecture && !project.decisions ? pending('solucion', 'Solución') : null,
    project.architecture
      ? {
          id: 'arquitectura',
          title: 'Arquitectura y tecnología',
          content: (
            <>
              {paragraphs(project.architecture.summary)}
              <CreditsTable
                className="case-stack"
                rows={project.architecture.stack.map((group) => ({ label: group.label, value: group.items.join(' · ') }))}
              />
            </>
          ),
        }
      : null,
    project.decisions
      ? {
          id: 'decisiones',
          title: 'Decisiones técnicas',
          content: (
            <ol className="case-decisions" role="list">
              {project.decisions.map((decision, index) => (
                <li key={decision.title} className="case-decision">
                  <span className="case-decision__number mono">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="case-decision__title">{decision.title}</h3>
                    <p>{decision.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          ),
        }
      : null,
    project.outcome ? { id: 'resultado', title: 'Resultado', content: paragraphs(project.outcome) } : null,
    project.evidence
      ? {
          id: 'evidencias',
          title: 'Evidencias',
          content: (
            <div className="case-evidence">
              {project.evidence.map((item, index) => (
                <Evidence key={index} item={item} />
              ))}
            </div>
          ),
        }
      : null,
  ];
  return sections.filter((section): section is CaseSection => section !== null);
};

/**
 * A case study. Primary reference: A24 (disc as cover, credits, detail page);
 * the sticky table of contents follows CollectUI 9f343652 / c00d3685.
 * Structure: docs/INFORMATION_ARCHITECTURE.md §5.
 */
export function ProjectPage({ slug }: { slug: string }) {
  const project = projectBySlug(slug)!;
  const sections = buildSections(project);
  const activeId = useScrollSpy(sections.map((section) => section.id));
  const next = nextProject(slug);
  const track = formatTrack(project.track);

  // "Volver a proyectos" reopens the home gallery on this disc.
  useEffect(() => rememberProject(slug), [slug]);

  const credits: CreditRow[] = [
    { label: 'Rol', value: project.role },
    ...(project.team ? [{ label: 'Equipo', value: project.team.join(', ') }] : []),
    { label: 'Tipo', value: project.typeLabel },
    { label: 'Año', value: project.year },
    { label: 'Estado', value: project.status.label },
    { label: 'Tecnología', value: project.technologies.join(' · ') },
  ];

  return (
    <article className="case" aria-labelledby="case-title">
      <header className="case-cover">
        <div className="container case-cover__grid">
          <div className="case-cover__text">
            <a className="case-back" href={chapterHref('proyectos')}>
              <ArrowLeft size={16} aria-hidden="true" />
              Volver a proyectos
            </a>
            <nav className="case-crumbs" aria-label="Migas de pan">
              <ol role="list">
                <li>
                  <a href="/">Inicio</a>
                </li>
                <li>
                  <a href="/proyectos/">Proyectos</a>
                </li>
                <li aria-current="page">{project.title}</li>
              </ol>
            </nav>
            <p className="case-cover__kicker label enter" style={{ '--enter-index': 0 } as CSSProperties}>
              Pista {track} / {formatTrack(trackTotal)} · {site.catalog}
            </p>
            <h1 id="case-title" className="case-cover__title enter enter--still">
              {project.title}
            </h1>
            <p className="case-cover__summary lede enter" style={{ '--enter-index': 1 } as CSSProperties}>
              {project.summary}
            </p>
            <div className="enter" style={{ '--enter-index': 2 } as CSSProperties}>
              <CreditsTable rows={credits} className="case-cover__credits" />
            </div>
            <div className="case-cover__links enter" style={{ '--enter-index': 3 } as CSSProperties}>
              {project.links.repo && (
                <Button href={project.links.repo} external icon="arrow-up-right">
                  Ver el código
                </Button>
              )}
              {project.links.live && (
                <Button href={project.links.live} external variant="secondary" icon="arrow-up-right">
                  Ver en vivo
                </Button>
              )}
            </div>
          </div>

          <div className="case-cover__object" aria-hidden="true">
            <div className="case-cover__sleeve">
              <CoverArt cover={project.cover} title={project.title} track={track} catalog={site.catalog} />
            </div>
            <div className="case-cover__disc">
              <Disc
                variant="pressed"
                transitionName={`disc-${project.slug}`}
                ink={project.cover.ink}
                rimText={`${project.title} · ${site.name} · ${project.year} · ${site.catalog}`}
              >
                <CoverArt cover={project.cover} title={project.title} track={track} catalog={site.catalog} shape="disc" rim />
              </Disc>
            </div>
          </div>
        </div>
      </header>

      <div className="container case-body">
        <nav className="case-toc" aria-label="En esta página">
          <p className="case-toc__title label">Contenido</p>
          <ol role="list">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`} aria-current={activeId === section.id ? 'location' : undefined}>
                  <span className="case-toc__dash" aria-hidden="true" />
                  <span className="case-toc__number mono">{String(index + 1).padStart(2, '0')}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="case-content">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="case-section"
              aria-labelledby={`${section.id}-title`}
            >
              <h2 id={`${section.id}-title`} className="case-section__title">
                <span className="case-section__number mono">{String(index + 1).padStart(2, '0')}</span>
                {section.title}
              </h2>
              <div className="case-section__body" data-reveal="up">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>

      <nav className="case-next" aria-label="Siguiente proyecto">
        <a className="container case-next__link" href={projectHref(next.slug)}>
          <span className="case-next__disc" aria-hidden="true">
            <Disc variant="pressed" transitionName={`disc-${next.slug}`}>
              <CoverArt cover={next.cover} title={next.title} track={formatTrack(next.track)} catalog={site.catalog} shape="disc" />
            </Disc>
          </span>
          <span className="case-next__text">
            <span className="label">Siguiente pista · {formatTrack(next.track)}</span>
            <span className="case-next__title">{next.title}</span>
            <span className="case-next__tagline">{next.tagline}</span>
          </span>
          <ArrowRight className="case-next__arrow" size={28} aria-hidden="true" />
        </a>
      </nav>

      <section className="case-contact on-night" aria-labelledby="case-contact-title">
        <div className="container case-contact__inner">
          <div>
            <h2 id="case-contact-title" className="case-contact__title">
              ¿Necesitas algo parecido?
            </h2>
            <p className="lede">Cuéntame tu caso: qué tienes hoy, qué te falta y para cuándo lo necesitas.</p>
          </div>
          <div className="case-contact__actions">
            <Button href={mailto(`Proyecto parecido a ${project.title}`, site.contact.body)} icon="mail">
              Escríbeme
            </Button>
            <Button href="/proyectos/" variant="secondary">
              Todos los proyectos
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}

export default ProjectPage;
