import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import ChapterHeading from '../../components/editorial/ChapterHeading/ChapterHeading';
import Cutout from '../../components/graphics/Cutout/Cutout';
import PenMark from '../../components/graphics/PenMark/PenMark';
import { ArrowRight } from '../../components/ui/Icon/Icon';
import { chapterById } from '../../config/navigation';
import { processIntro, processSteps } from '../../config/process';
import { ui } from '../../config/ui';
import '../../design/sections/LinerNotes/LinerNotes.css';

const chapter = chapterById('proceso');
const total = String(processSteps.length).padStart(2, '0');
const panelId = (number: string) => `paso-${number}`;
const tabId = (number: string) => `paso-${number}-pista`;

/**
 * Chapter 02, Proceso (ADR-001). Five steps as a playlist on Jorge's iPod (a
 * photographed cut-out; the screen is real HTML laid over its dark glass), and
 * the selected step's credits in the frame's bottom-left corner, like the
 * selected disc's in Projects: title, one line on the step, one real decision
 * from a public project. The playlist is a tablist: click, tap or arrow keys.
 * Without JavaScript every step's credits are listed in the page.
 * Contract: docs/INFORMATION_ARCHITECTURE.md §3.
 */
export function LinerNotes() {
  const [selected, setSelected] = useState(0);
  const [animate, setAnimate] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = processSteps[selected];

  const select = (index: number, focus = false) => {
    const next = (index + processSteps.length) % processSteps.length;
    setAnimate(true);
    setSelected(next);
    if (focus) tabs.current[next]?.focus();
  };

  // The playlist is one Tab stop; the arrows walk it, like an iPod's wheel.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: selected + 1,
      ArrowRight: selected + 1,
      ArrowUp: selected - 1,
      ArrowLeft: selected - 1,
      Home: 0,
      End: processSteps.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key], true);
  };

  return (
    <section id={chapter.id} className="chapter chapter--frame process" aria-labelledby="process-title">
      <div className="container frame process__frame">
        <ChapterHeading
          id="process-title"
          title={processIntro.heading}
          lede={<PenMark text={processIntro.lede} mark={processIntro.mark} />}
        />

        <div className="process__player" data-reveal="fade">
          {/* Wide landscape: the frame's height under the header, as a width (LinerNotes.css).
              Phones show 19rem of it, cropped; 15rem keeps a 3x screen on the 760 file. */}
          <Cutout
            id="ipod"
            className="process__ipod"
            sizes="(min-width: 1024px) and (orientation: landscape) calc((min(100vh, 64rem) - 7.5rem) * 0.61), 15rem"
          />
          <div className="process__screen">
            <p className="process__screen-bar" aria-hidden="true">
              <span>{ui.process.playlist}</span>
              <span className="mono">{step.number} / {total}</span>
            </p>
            <div className="process__tracks" role="tablist" aria-label={ui.process.steps} aria-orientation="vertical" onKeyDown={onKeyDown}>
              {processSteps.map((item, index) => (
                <button
                  key={item.number}
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  id={tabId(item.number)}
                  className="process__track"
                  type="button"
                  role="tab"
                  aria-selected={index === selected}
                  aria-controls={panelId(item.number)}
                  tabIndex={index === selected ? 0 : -1}
                  onClick={() => select(index)}
                >
                  <span className="process__track-number mono">{item.number}</span>
                  <span className="process__track-title">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Every step is in the HTML; with JavaScript only the selected one shows. */}
        <div className="process__credits" data-animate={animate || undefined}>
          {processSteps.map((item, index) => (
            <div
              key={item.number}
              id={panelId(item.number)}
              className="process__step"
              role="tabpanel"
              aria-labelledby={tabId(item.number)}
              data-active={index === selected || undefined}
            >
              <h3 className="process__title">
                <span className="process__line"><span>{item.title}</span></span>
              </h3>
              <p className="process__text" style={{ '--row': 0 } as CSSProperties}>{item.body}</p>
              <p className="process__note" style={{ '--row': 1 } as CSSProperties}>
                {item.note.text}{' '}
                <a
                  className="process__source"
                  href={item.note.source.href}
                  {...(item.note.source.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.note.source.label}
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LinerNotes;
