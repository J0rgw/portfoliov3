import { ui } from '../config/ui';
import { projectTheme } from '../components/cd/CoverArt/projectTheme';
import type { CSSProperties } from 'react';
import CoverArt from '../components/cd/CoverArt/CoverArt';
import Disc from '../components/cd/Disc/Disc';
import Projects from '../sections/Projects/Projects';
import StackMarks from '../components/editorial/StackMarks/StackMarks';
import { earlierProjects, formatTrack, projectHref } from '../config/projects';
import { site } from '../config/site';
import '../design/pages/ProjectsIndexPage.css';

/**
 * /proyectos/ (ADR-003, 2026-11-12): the gallery that used to be the home's
 * first chapter opens the page with the releases Jorge features (its heading
 * is the page's h1), then the other releases follow as the index's cards
 * (ADR-001: the disc with its credits under it; Jorge's pick, Q59), each
 * opening its case study. The private work closes the gallery, not the list.
 * A card's id is its slug, so a case study's "Volver a proyectos" lands on it.
 * The breadcrumb trail lives in the page's JSON-LD; the header leads home.
 */
export function ProjectsIndexPage() {
  return (
    <>
      <Projects />
      {earlierProjects.length > 0 && (
        <section className="earlier" aria-labelledby="earlier-title">
          <div className="container">
            <h2 id="earlier-title" className="earlier__title" data-reveal="rise">{ui.projects.earlier}</h2>
            <ol className="index-grid" role="list">
              {earlierProjects.map((project, index) => (
                <li
                  key={project.slug}
                  id={project.slug}
                  className="index-card"
                  data-reveal="up"
                  style={{ '--reveal-index': index % 3 } as CSSProperties}
                >
                  <a className="index-card__link" href={projectHref(project.slug)}>
                    <span className="index-card__disc" aria-hidden="true">
                      <Disc variant="pressed" transitionName={`disc-${project.slug}`}>
                        <CoverArt
                          cover={projectTheme(project.id)} assets={project.assets}
                          title={project.title}
                          track={formatTrack(project.track)}
                          catalog={site.catalog}
                          shape="disc"
                          artSize="17rem"
                        />
                      </Disc>
                    </span>
                    <span className="index-card__title">
                      <span className="index-card__number mono">{formatTrack(project.track)}</span>
                      {project.title}
                    </span>
                    <span className="index-card__tagline">{project.tagline}</span>
                  </a>
                  <StackMarks technologies={project.technologies.slice(0, 3)} className="index-card__stack" />
                  <p className="index-card__meta">
                    {project.typeLabel}, {project.year}. {project.status.label}.
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </>
  );
}

export default ProjectsIndexPage;
