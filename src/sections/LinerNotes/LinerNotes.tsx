import type { CSSProperties } from 'react';
import Button from '../../components/Button/Button';
import ChapterHeading from '../../components/ChapterHeading/ChapterHeading';
import { ArrowRight } from '../../components/Icon/Icon';
import { chapterById, chapterHref } from '../../content/chapters';
import { processIntro, processSteps } from '../../content/process';
import { useScrollSpy } from '../../motion/useScrollSpy';
import './LinerNotes.css';

const chapter = chapterById('proceso');
const stepId = (number: string) => `paso-${number}`;
const stepIds = processSteps.map((step) => stepId(step.number));

/**
 * Chapter 02: the liner notes. Five steps, each backed by a real decision in a
 * public project. The booklet's page counter follows the step being read.
 * Contract: docs/INFORMATION_ARCHITECTURE.md §3.
 */
export function LinerNotes() {
  const activeId = useScrollSpy(stepIds);
  const activeIndex = Math.max(0, stepIds.indexOf(activeId ?? stepIds[0]));
  const active = processSteps[activeIndex];

  return (
    <section id={chapter.id} className="chapter liner" aria-labelledby="process-title">
      <div className="container liner__grid">
        <div className="liner__aside">
          <ChapterHeading
            id="process-title"
            kicker={chapter.kicker}
            title={processIntro.heading}
            handwriting="Proceso"
            lede={processIntro.lede}
          />
          <div className="liner__booklet" aria-hidden="true">
            <div className="liner__page liner__page--back" />
            <div className="liner__page liner__page--mid" />
            <div className="liner__page liner__page--front">
              <span className="liner__page-label">Notas del libreto</span>
              <span className="liner__page-count mono">
                <span className="liner__page-current">{active.number}</span> / {String(processSteps.length).padStart(2, '0')}
              </span>
              <span className="liner__page-title">{active.title}</span>
              <span className="liner__page-rule" />
            </div>
          </div>
        </div>

        <ol className="liner__steps" role="list">
          {processSteps.map((step, index) => (
            <li
              id={stepId(step.number)}
              className="liner__step"
              key={step.number}
              data-reveal="up"
              data-active={index === activeIndex || undefined}
              style={{ '--reveal-index': 0 } as CSSProperties}
            >
              <span className="liner__step-number mono">{step.number}</span>
              <div className="liner__step-body">
                <h3 className="liner__step-title">{step.title}</h3>
                <p className="liner__step-text">{step.body}</p>
                <div className="liner__note">
                  <p className="liner__note-label">Nota técnica</p>
                  <p className="liner__note-text">{step.note.text}</p>
                  <a
                    className="liner__note-link"
                    href={step.note.source.href}
                    {...(step.note.source.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {step.note.source.label}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="container liner__close" data-reveal="up">
        <p className="liner__close-text">¿Te encaja esta forma de trabajar?</p>
        <Button href={chapterHref('contacto')}>Cuéntame tu proyecto</Button>
      </div>
    </section>
  );
}

export default LinerNotes;
