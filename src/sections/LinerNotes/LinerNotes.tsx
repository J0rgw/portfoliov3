import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import ChapterHeading from '../../components/editorial/ChapterHeading/ChapterHeading';
import Cutout from '../../components/graphics/Cutout/Cutout';
import PenMark from '../../components/graphics/PenMark/PenMark';
import { ArrowRight } from '../../components/ui/Icon/Icon';
import { scrollToOffset } from '../../components/ui/motion/SmoothScroll';
import { onHold, type HoldState } from '../../components/ui/motion/useChapterHold';
import { chapterById } from '../../config/navigation';
import { processIntro, processSteps } from '../../config/process';
import { ui } from '../../config/ui';
import { motion } from '../../design/motion';
import '../../design/sections/LinerNotes/LinerNotes.css';

const chapter = chapterById('proceso');
const count = processSteps.length;
const total = String(count).padStart(2, '0');
const panelId = (number: string) => `paso-${number}`;
const tabId = (number: string) => `paso-${number}-pista`;

/** Every song gets an equal share of the hold; this is the one playing at `progress`. */
const songAt = (progress: number) => Math.min(count - 1, Math.floor(progress * count));
/** The middle of a song's share, where choosing it on the playlist scrolls the page. */
const songPoint = (index: number) => (index + 0.5) / count;

/**
 * Chapter 02, Proceso (ADR-001). Five steps as a playlist on Jorge's iPod (a
 * photographed cut-out; the screen is real HTML laid over its dark glass), and
 * the selected step's credits at eye level beside it: title, the step, one
 * real decision from a public project.
 *
 * While the chapter holds, the page is the iPod's wheel: each song has a share
 * of the hold, so scrolling changes the song and its credits (MOTION_SYSTEM
 * §2.5). The playlist is still a tablist (click, tap or arrow keys); while held,
 * choosing a song also scrolls the page to its share, so the wheel and the
 * playlist always agree. Not held (it does not fit, reduced motion), choosing
 * is the only way. Without JavaScript every step's credits are listed.
 * Contract: docs/INFORMATION_ARCHITECTURE.md §3.
 */
export function LinerNotes() {
  const [selected, setSelected] = useState(0);
  const [animate, setAnimate] = useState(false);
  const section = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = useRef(0);
  // The hold's last state (null while the chapter is not held), and a song
  // chosen on the playlist that the page is still scrolling to.
  const hold = useRef<HoldState | null>(null);
  const chosen = useRef<{ index: number; timer: number } | null>(null);
  const step = processSteps[selected];

  // Every change of song goes through here; `change` plays the credits' change-over.
  // Focus on the playlist follows the song, so its one Tab stop stays the selected tab.
  const show = useCallback((index: number, change = true) => {
    if (index === current.current) return;
    const focused = tabs.current.some((tab) => tab !== null && tab === document.activeElement);
    current.current = index;
    if (change) setAnimate(true);
    setSelected(index);
    if (focused) tabs.current[index]?.focus({ preventScroll: true });
  }, []);

  const release = useCallback(() => {
    if (chosen.current) window.clearTimeout(chosen.current.timer);
    chosen.current = null;
  }, []);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    // A page loaded inside the hold starts on its song, without a change-over.
    let first = true;
    const stop = onHold(node, (state) => {
      hold.current = state;
      if (!state) return;
      const index = songAt(state.progress);
      // A chosen song keeps the selection until the page reaches its share,
      // so the songs scrolled past on the way do not flash.
      if (chosen.current) {
        if (chosen.current.index !== index) return;
        release();
      }
      show(index, !first);
      first = false;
    });
    return () => {
      stop();
      release();
    };
  }, [show, release]);

  const select = (index: number) => {
    const next = (index + count) % count;
    const state = hold.current;
    if (state) {
      release();
      chosen.current = {
        index: next,
        // If another scroll takes over before the page gets there, follow it again.
        timer: window.setTimeout(() => {
          chosen.current = null;
          if (hold.current) show(songAt(hold.current.progress));
        }, motion.playlist.arriveMs),
      };
      scrollToOffset(state.start + songPoint(next) * state.length);
    }
    show(next);
  };

  // The playlist is one Tab stop; the arrows walk it, like an iPod's wheel.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: selected + 1,
      ArrowRight: selected + 1,
      ArrowUp: selected - 1,
      ArrowLeft: selected - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key]);
  };

  return (
    <section ref={section} id={chapter.id} className="chapter chapter--frame process" aria-labelledby="process-title">
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
            <div
              className="process__tracks"
              role="tablist"
              aria-label={ui.process.steps}
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              style={{ '--song': selected, '--songs': count } as CSSProperties}
            >
              {/* The selection bar, one row high, slides to the selected song. */}
              <span className="process__cursor" aria-hidden="true" />
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
