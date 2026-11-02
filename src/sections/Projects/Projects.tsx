import { useCallback, useState } from 'react';
import { ArrowRight } from '../../components/Icon/Icon';
import { chapterById, chapterHref } from '../../content/chapters';
import { privateWork, projectSummaries } from '../../content/projects';
import { site } from '../../content/site';
import DiscGallery from './DiscGallery';
import QuickResume from './QuickResume';
import './Projects.css';

const chapter = chapterById('proyectos');
const total = projectSummaries.length;

/**
 * Chapter 01: the releases as a collection of discs.
 * Contract: docs/INFORMATION_ARCHITECTURE.md §3. Primary reference: A24 by
 * Ravi Klaassens (composition, credits, discs on an arc, the pen loop on
 * hover); the blue marker arrow is Jorge's own image (public/images/gallery/).
 *
 * The credits (QuickResume) always show the selected disc; the gallery owns
 * the selection and reports it here. The list at the end is the no-JavaScript
 * path to every case study.
 */
export function Projects() {
  const [selected, setSelected] = useState(0);
  const [animate, setAnimate] = useState(false);
  const project = projectSummaries[selected];

  const handleSelect = useCallback((index: number, restored: boolean) => {
    setSelected(index);
    setAnimate(!restored);
  }, []);

  return (
    <section id={chapter.id} className="chapter projects" aria-labelledby="projects-title">
      <div className="projects__frame">
        <header className="projects__info">
          <p className="projects__kicker label">{chapter.kicker}</p>
          <h2 id="projects-title" className="projects__heading">
            Proyectos seleccionados
          </h2>
          <QuickResume key={project.slug} project={project} total={total} animate={animate} />
        </header>

        <DiscGallery items={projectSummaries} credit={site.name} catalog={site.catalog} onSelect={handleSelect} />
      </div>

      <nav className="projects__all container" aria-label="Todos los proyectos">
        <p className="label">Todas las pistas</p>
        <ol role="list">
          {projectSummaries.map((item) => (
            <li key={item.slug}>
              <a href={item.href}>
                <span className="mono">{item.track}</span>
                <span className="projects__all-title">{item.title}</span>
                <span className="projects__all-tagline">{item.shortDescription}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="projects__foot container">
        <p>
          {privateWork.tagline}{' '}
          <a className="text-link" href={chapterHref('contacto')}>
            Escríbeme
          </a>
        </p>
        <a className="projects__index-link" href="/proyectos/">
          Índice de proyectos
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export default Projects;
