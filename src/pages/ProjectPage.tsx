import { ui, messages } from '../config/ui';
import { projectTheme } from '../components/cd/CoverArt/projectTheme';
import { useEffect, type CSSProperties, type ReactNode } from 'react';
import CoverArt from '../components/cd/CoverArt/CoverArt';
import CreditsTable, { type CreditRow } from '../components/editorial/CreditsTable/CreditsTable';
import Disc from '../components/cd/Disc/Disc';
import Evidence from '../components/editorial/Evidence/Evidence';
import StackMarks from '../components/editorial/StackMarks/StackMarks';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '../components/ui/Icon/Icon';
import { chapterHref } from '../config/navigation';
import { formatTrack, nextProject, projectBySlug, projectHref } from '../config/projects';
import { mailto, site } from '../config/site';
import type { Project } from '../config/types';
import { useScrollSpy } from '../components/ui/motion/useScrollSpy';
import { rememberProject } from '../components/cd/DiscGallery/selection';
import '../design/pages/ProjectPage.css';

interface CaseSection {
  id: string;
  title: string;
  content: ReactNode;
}

/** "A, B y C", the way Spanish writes a list (DESIGN.md "Typography"). */
const listFormat = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}` : items.join('');

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
  content: <p className="case-pending">{ui.detail.pending}</p>,
});

/**
 * Optional sections render only with content, in the order of the IA
 * contract. The template's core (context or problem, role, solution) always
 * appears, as a placeholder when the content does not exist yet.
 */
const buildSections = (project: Project): CaseSection[] => {
  const sections: (CaseSection | null)[] = [
    { id: 'resumen', title: ui.detail.overview, content: paragraphs(project.overview) },
    project.context ? { id: 'contexto', title: ui.detail.context, content: paragraphs(project.context) } : null,
    project.challenge ? { id: 'problema', title: ui.detail.challenge, content: paragraphs(project.challenge) } : null,
    !project.context && !project.challenge ? pending('contexto', ui.detail.contextProblem) : null,
    project.goals ? { id: 'objetivos', title: ui.detail.goals, content: bullets(project.goals) } : null,
    project.responsibilities
      ? {
          id: 'mi-papel',
          title: ui.detail.responsibilities,
          content: project.responsibilities.length > 1 ? bullets(project.responsibilities) : paragraphs(project.responsibilities),
        }
      : pending('mi-papel', ui.detail.responsibilities),
    !project.architecture && !project.decisions ? pending('solucion', ui.detail.solution) : null,
    project.architecture
      ? {
          id: 'arquitectura',
          title: ui.detail.architecture,
          content: (
            <>
              {paragraphs(project.architecture.summary)}
              <CreditsTable
                className="case-stack"
                rows={project.architecture.stack.map((group) => ({ label: group.label, value: listFormat(group.items) }))}
              />
            </>
          ),
        }
      : null,
    project.decisions
      ? {
          id: 'decisiones',
          title: ui.detail.decisions,
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
    project.outcome ? { id: 'resultado', title: ui.detail.outcome, content: paragraphs(project.outcome) } : null,
    project.evidence
      ? {
          id: 'evidencias',
          title: ui.detail.evidence,
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
    { label: ui.labels.role, value: project.role },
    ...(project.team ? [{ label: ui.labels.team, value: listFormat(project.team) }] : []),
    { label: ui.labels.type, value: project.typeLabel },
    { label: ui.labels.year, value: project.year },
    { label: ui.labels.status, value: project.status.label },
  ];

  return (
    <article className="case" aria-labelledby="case-title">
      <header className="case-cover" data-ground="paper">
        <div className="container case-cover__grid">
          <div className="case-cover__text">
            {/* One way back (the breadcrumb trail lives in the page's JSON-LD). */}
            <a className="case-back" href={chapterHref('proyectos')}>
              <ArrowLeft size={16} aria-hidden="true" />
              {ui.actions.backProjects}
            </a>
            <h1 id="case-title" className="case-cover__title enter enter--still">
              {project.title}
            </h1>
            <p className="case-cover__summary enter" style={{ '--enter-index': 0 } as CSSProperties}>
              {project.summary}
            </p>
            <div className="case-cover__credits enter" style={{ '--enter-index': 1 } as CSSProperties}>
              <CreditsTable rows={credits} density="compact" />
              <StackMarks technologies={project.technologies} className="case-cover__stack" />
            </div>
            {(project.links.repo || project.links.live) && (
              <p className="case-cover__links enter" style={{ '--enter-index': 2 } as CSSProperties}>
                {project.links.repo && (
                  <a className="case-link" href={project.links.repo} target="_blank" rel="noopener noreferrer">
                    {ui.actions.code}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                )}
                {project.links.live && (
                  <a className="case-link" href={project.links.live} target="_blank" rel="noopener noreferrer">
                    {ui.actions.live}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                )}
              </p>
            )}
          </div>

          <div className="case-cover__object" aria-hidden="true">
            <div className="case-cover__sleeve">
              <CoverArt cover={projectTheme(project.id)} assets={project.assets} title={project.title} track={track} catalog={site.catalog} artSize="29rem" loading="eager" />
            </div>
            <div className="case-cover__disc">
              <Disc variant="pressed" transitionName={`disc-${project.slug}`}>
                <CoverArt cover={projectTheme(project.id)} assets={project.assets} title={project.title} track={track} catalog={site.catalog} shape="disc" loading="eager" />
              </Disc>
            </div>
          </div>
        </div>
      </header>

      <div className="container case-body">
        <nav className="case-toc" aria-label={ui.navigation.pageContents}>
          <ol role="list">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} aria-current={activeId === section.id ? 'location' : undefined}>
                  <span className="case-toc__dash" aria-hidden="true" />
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

      {next && next.id !== project.id && <nav className="case-next" aria-label={ui.projects.next}>
        <a className="container case-next__link" href={projectHref(next.slug)}>
          <span className="case-next__disc" aria-hidden="true">
            <Disc variant="pressed" transitionName={`disc-${next.slug}`}>
              <CoverArt cover={projectTheme(next.id)} assets={next.assets} title={next.title} track={formatTrack(next.track)} catalog={site.catalog} shape="disc" artSize="8rem" />
            </Disc>
          </span>
          <span className="case-next__text">
            <span className="case-next__label">
              {ui.detail.nextTrack} <span className="mono">{formatTrack(next.track)}</span>
            </span>
            <span className="case-next__title">{next.title}</span>
            <span className="case-next__tagline">{next.tagline}</span>
          </span>
          <ArrowRight className="case-next__arrow" size={28} aria-hidden="true" />
        </a>
      </nav>}

      <section className="case-contact on-night" aria-labelledby="case-contact-title">
        <div className="container case-contact__inner">
          <div>
            <h2 id="case-contact-title" className="case-contact__title">{ui.detail.contactHeading} </h2>
            <p className="lede">{ui.detail.contactBody}</p>
          </div>
          <div className="case-contact__actions">
            <a className="case-contact__write" href={mailto(messages.projectSubject(project.title), site.contact.body)}>
              {ui.actions.write}
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="case-link" href="/proyectos/">
              {ui.actions.allProjects}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

export default ProjectPage;
