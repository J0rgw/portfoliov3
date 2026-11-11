import { ui } from '../config/ui';
import { projectTheme } from '../components/cd/CoverArt/projectTheme';
import type { CSSProperties } from 'react';
import CoverArt from '../components/cd/CoverArt/CoverArt';
import Disc from '../components/cd/Disc/Disc';
import StackMarks from '../components/editorial/StackMarks/StackMarks';
import { chapterHref } from '../config/navigation';
import { formatTrack, privateWork, projectHref, projects, trackTotal } from '../config/projects';
import { site } from '../config/site';
import '../design/pages/ProjectsIndexPage.css';

/**
 * /proyectos/: the full index (A24's "Index" view). Every release as the
 * gallery prints it (ADR-001): the disc, the title, the line under it and the
 * stack as marks, then one muted line with what it is, when and how it
 * stands. The private work is the broken disc, as in the gallery. The
 * breadcrumb trail lives in the page's JSON-LD; the header leads home.
 */
export function ProjectsIndexPage() {
  return (
    <div className="index-page">
      <header className="container index-page__head">
        <h1 className="index-page__title enter enter--still">{ui.navigation.projects}</h1>
        <p className="index-page__lede enter" style={{ '--enter-index': 0 } as CSSProperties}>{ui.projects.indexIntro}</p>
      </header>

      <ol className="container index-grid" role="list">
        {projects.map((project, index) => (
          <li
            key={project.slug}
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
        {privateWork.visible && <li className="index-card index-card--private" data-reveal="up">
          <a className="index-card__link" href={chapterHref('contacto')}>
            <span className="index-card__disc" aria-hidden="true">
              {/* The private work: the photographed broken disc, as in the gallery. */}
              <img
                className="index-card__broken"
                src={privateWork.disc.src}
                width={privateWork.disc.width}
                height={privateWork.disc.height}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="index-card__title">
              <span className="index-card__number mono">{formatTrack(trackTotal)}</span>
              {privateWork.title}
            </span>
            <span className="index-card__tagline">{privateWork.tagline}</span>
          </a>
        </li>}
      </ol>
    </div>
  );
}

export default ProjectsIndexPage;
