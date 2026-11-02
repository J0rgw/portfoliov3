import type { CSSProperties } from 'react';
import CoverArt from '../components/CoverArt/CoverArt';
import CreditsTable from '../components/CreditsTable/CreditsTable';
import Disc from '../components/Disc/Disc';
import { chapterHref } from '../content/chapters';
import { formatTrack, privateWork, projectHref, projects, trackTotal } from '../content/projects';
import { site } from '../content/site';
import './ProjectsIndexPage.css';

/**
 * /proyectos/: the full index (A24's "Index" view). Every release with its
 * disc and credits, linking to its case study.
 */
export function ProjectsIndexPage() {
  return (
    <div className="index-page">
      <header className="container index-page__head">
        <nav className="case-crumbs" aria-label="Migas de pan">
          <ol role="list">
            <li>
              <a href="/">Inicio</a>
            </li>
            <li aria-current="page">Proyectos</li>
          </ol>
        </nav>
        <p className="label enter" style={{ '--enter-index': 0 } as CSSProperties}>
          Índice · {formatTrack(trackTotal)} pistas · {site.catalog}
        </p>
        <h1 className="index-page__title enter enter--still">Proyectos</h1>
        <p className="lede enter" style={{ '--enter-index': 1 } as CSSProperties}>
          Cada lanzamiento con sus créditos: qué es, qué parte hice yo, con qué está construido y en qué estado está.
        </p>
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
                <Disc
                  variant="pressed"
                  transitionName={`disc-${project.slug}`}
                  ink={project.cover.ink}
                  rimText={`${project.title} · ${site.catalog}`}
                >
                  <CoverArt
                    cover={project.cover}
                    title={project.title}
                    track={formatTrack(project.track)}
                    catalog={site.catalog}
                    shape="disc"
                    rim
                  />
                </Disc>
              </span>
              <span className="index-card__number mono">{formatTrack(project.track)}</span>
              <span className="index-card__title">{project.title}</span>
              <span className="index-card__tagline">{project.tagline}</span>
            </a>
            <CreditsTable
              density="compact"
              rows={[
                { label: 'Tipo', value: project.typeLabel },
                { label: 'Año', value: project.year },
                { label: 'Estado', value: project.status.label },
                { label: 'Stack', value: project.technologies.slice(0, 3).join(' · ') },
              ]}
            />
          </li>
        ))}
        <li className="index-card index-card--private" data-reveal="up">
          <a className="index-card__link" href={chapterHref('contacto')}>
            <span className="index-card__disc" aria-hidden="true">
              <Disc variant="pressed">
                <CoverArt
                  cover={privateWork.cover}
                  title={privateWork.title}
                  track={formatTrack(trackTotal)}
                  catalog={site.catalog}
                  shape="disc"
                />
              </Disc>
            </span>
            <span className="index-card__number mono">{formatTrack(trackTotal)}</span>
            <span className="index-card__title">{privateWork.title}</span>
            <span className="index-card__tagline">{privateWork.tagline}</span>
          </a>
        </li>
      </ol>
    </div>
  );
}

export default ProjectsIndexPage;
