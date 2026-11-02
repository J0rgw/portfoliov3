import type { CSSProperties } from 'react';
import CoverArt from '../components/CoverArt/CoverArt';
import Disc from '../components/Disc/Disc';
import { formatTrack, projectBySlug, projects, trackTotal } from '../content/projects';
import { site } from '../content/site';

/**
 * 1200×630 social preview card, rendered to static HTML by entry-server and
 * captured by scripts/generate-og.mjs. Styles: src/seo/og.css. Not part of the
 * site bundle.
 */
export const ogKeys = ['home', ...projects.map((project) => project.slug)];

export function OgCard({ cardKey }: { cardKey: string }) {
  const project = cardKey === 'home' ? undefined : projectBySlug(cardKey);

  if (!project) {
    return (
      <div className="og og--home">
        <div className="og__text">
          <p className="og__kicker">
            {site.catalog} · Portfolio {site.releaseYear}
          </p>
          <p className="og__name">Jorge Arcas</p>
          <p className="og__role">{site.role}</p>
          <p className="og__statement">{site.hero.statement}</p>
          <p className="og__url">portfolio.jarcas.dev</p>
        </div>
        <div className="og__object">
          <Disc
            variant="cdr"
            handwriting="Jarcas"
            print={{ brand: 'CD-R', spec: '80 min · 700 MB', catalog: `${site.catalog} · ${site.releaseYear}` }}
            rimText={`Jorge Arcas · ${site.catalog} · Desarrollo web y software a medida`}
            style={{ '--disc-rotate': '-16deg' } as CSSProperties}
          />
        </div>
      </div>
    );
  }

  const track = formatTrack(project.track);
  return (
    <div className="og og--project">
      <div className="og__text">
        <p className="og__kicker">
          Pista {track} / {formatTrack(trackTotal)} · {project.typeLabel} · {project.year}
        </p>
        <p className="og__title">{project.title}</p>
        <p className="og__tagline">{project.tagline}</p>
        <p className="og__url">Caso de estudio · Jorge Arcas</p>
      </div>
      <div className="og__object">
        <div className="og__sleeve">
          <CoverArt cover={project.cover} title={project.title} track={track} catalog={site.catalog} />
        </div>
        <div className="og__disc">
          <Disc variant="pressed" ink={project.cover.ink} rimText={`${project.title} · ${site.name} · ${project.year} · ${site.catalog}`}>
            <CoverArt cover={project.cover} title={project.title} track={track} catalog={site.catalog} shape="disc" />
          </Disc>
        </div>
      </div>
    </div>
  );
}

export default OgCard;
