import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Cutout from '../../components/graphics/Cutout/Cutout';
import { useKeySequence } from '../../components/ui/motion/useKeySequence';
import { usePeekRoom } from '../../components/ui/motion/usePeekRoom';
import { useTextSwap } from '../../components/ui/motion/useTextSwap';
import { aboutChapter, aboutHiddenTrack, konamiCode } from '../../config/about';
import { cutouts } from '../../config/assets';
import { chapterById } from '../../config/navigation';
import { site } from '../../config/site';
import type { AboutThing, CutoutId } from '../../config/types';
import '../../design/sections/About/About.css';

/** How tall a thing stands in the line and picked up, in px, on wide and on narrow
 *  screens: picks its file. Until the sentence is played with, the line's size. */
const REST_WIDE = 90;
const REST_NARROW = 50;
const PEEK_WIDE = 270;
const PEEK_NARROW = 160;

/** A comma or a full stop right after a thing stays with it. */
const PUNCT = /^[,.;:]/;

const ratio = (id: CutoutId) => cutouts[id].width / cutouts[id].height;
const sizesAt = (wide: number, narrow: number) => (id: CutoutId, share = 1) =>
  `(min-width: 1024px) ${Math.round(wide * ratio(id) * share)}px, ${Math.round(narrow * ratio(id) * share)}px`;
const restSizes = sizesAt(REST_WIDE, REST_NARROW);
const peekSizes = sizesAt(PEEK_WIDE, PEEK_NARROW);

/** Jorge stands as tall as the frame allows (About.css): his width follows. */
const JORGE_SIZES = '(min-width: 1024px) and (orientation: landscape) calc(min(64vh, 34rem) * 0.55), 46vw';

const chapter = chapterById('sobre-mi');

let printed = false;

/** The sentence's things in order: their entrances are staggered by it. */
const things = aboutChapter.statement.flatMap((run) => (typeof run === 'string' ? [] : [run.thing]));

interface ThingProps {
  thing: AboutThing;
  /** Its place in the sentence's set: they are slapped down one after another. */
  index: number;
  /** Someone has started to play with the sentence: the larger files and what the
   *  things hide are fetched now, not with the page. */
  primed: boolean;
  /** Picked up by a click or a tap, until the next one, Escape or a tap elsewhere. */
  open: boolean;
  onToggle: () => void;
}

/**
 * One of Jorge's things, right after the word it stands for. A button: its name is the
 * caption (what, where, when), so nothing it shows is only visible. Pointed at, focused
 * or tapped, it is picked up: it grows where it lies, its tag comes up under it, and
 * whatever it hides comes out (MOTION_SYSTEM §2.9).
 */
function Thing({ thing, index, primed, open, onToggle }: ThingProps) {
  const objectRef = useRef<HTMLSpanElement>(null);
  const style = { '--thing-ratio': `${cutouts[thing.cutout].width} / ${cutouts[thing.cutout].height}` } as CSSProperties;

  return (
    <button
      type="button"
      className="thing"
      data-thing={thing.cutout}
      data-peek
      aria-expanded={open}
      style={style}
      onClick={() => {
        // Godzilla roars when it is picked up by hand: the shake that says no
        // (motion.css), replayed as the copy button replays it.
        const object = objectRef.current;
        if (!open && thing.cutout === 'godzilla' && object) {
          object.classList.remove('is-shaking');
          void object.offsetWidth;
          object.classList.add('is-shaking');
        }
        onToggle();
      }}
    >
      <span
        className="thing__object"
        ref={objectRef}
        onAnimationEnd={(event) => {
          if (event.animationName === 'shake') event.currentTarget.classList.remove('is-shaking');
        }}
      >
        {thing.hidden && primed && (
          <Cutout
            id={thing.hidden}
            className="thing__hidden"
            sizes={peekSizes(thing.hidden, 0.7)}
            mirror={thing.hidden === 'jorge-looking'}
          />
        )}
        <Cutout
          id={thing.cutout}
          className="thing__cutout"
          sizes={primed ? peekSizes(thing.cutout) : restSizes(thing.cutout)}
          gesture="slap"
          index={index}
        />
      </span>
      <span className="thing__tag">{thing.caption}</span>
    </button>
  );
}

/**
 * Sobre mí, on the home (ADR-004, 2026-11-19; Jorge's brief: "telling more without
 * writing more", everything about him at first glance, something to remember). One
 * sentence in his words, signed, set big (The Romans: type with things between the
 * words); every thing in it is his own (Kyoosang Choi), so the photos say what the words
 * leave out. Jorge sits beside it as on the album's cover, in colour, and the words wrap
 * round him. Easter eggs for whoever plays: more takes of the cover's afternoon, Godzilla's
 * roar and who looks up at it, the Konami code, and a note in the console. The credits
 * follow (sections/AboutCredits). Contract: INFORMATION_ARCHITECTURE §3.
 */
export function About() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [take, setTake] = useState(0);
  // Taps so far: the first take arrives with the page's entrance, every later one is
  // slapped down at once.
  const [taps, setTaps] = useState(0);
  // Once someone plays with the frame (a pointer over it, focus in it, a touch), the
  // larger files, the other takes and what the things hide load, so a tap swaps at once.
  const [primed, setPrimed] = useState(false);
  const [tongues, setTongues] = useState(0);
  const [tongueOut, setTongueOut] = useState(false);
  const current = aboutChapter.takes[take];
  const [caption, captionSwap] = useTextSwap(current.caption);
  usePeekRoom(frameRef, take);

  useKeySequence(konamiCode, () => {
    setTongues((count) => count + 1);
    setTongueOut(true);
  });

  // A thing picked up by hand goes back on Escape or a tap anywhere else.
  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null);
    };
    const onDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element && event.target.closest('.thing'))) setOpen(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  // The chapter's hidden track, after the site's own (ui/HiddenTrack).
  useEffect(() => {
    if (printed) return;
    printed = true;
    const timer = window.setTimeout(() => {
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-functional').trim();
      console.log(`%c${aboutHiddenTrack[0]}`, `font-weight: 700; color: ${accent}`);
      console.log(aboutHiddenTrack.slice(1).join('\n'));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const cut = cutouts[current.cutout];
  const jorgeStyle = {
    '--take-ratio': `${cut.width} / ${cut.height}`,
    shapeOutside: `url(${cut.src})`,
  } as CSSProperties;

  return (
    <section id={chapter.id} className="chapter chapter--frame about" aria-labelledby="about-title">
      <div className="container frame about__frame" ref={frameRef}>
        {/* The sentence opens the chapter (Jorge, 2026-11-19: no title over it); its
            heading stays for assistive technology and the page's outline. */}
        <h2 id="about-title" className="visually-hidden">
          {aboutChapter.heading}
        </h2>

        <div
          className="about__body"
          data-reveal="slap"
          onPointerOver={() => setPrimed(true)}
          onFocus={() => setPrimed(true)}
          onTouchStart={() => setPrimed(true)}
        >
          {/* Jorge as on the album's cover. Each tap brings another take from that
              afternoon; pointed at, the photo they were cut from comes out behind him. */}
          <button
            type="button"
            className="about__jorge"
            style={jorgeStyle}
            aria-label={`${current.caption}. ${aboutChapter.nextTake}`}
            onClick={() => {
              setPrimed(true);
              setTaps((count) => count + 1);
              setTake((index) => (index + 1) % aboutChapter.takes.length);
            }}
          >
            {primed && <Cutout id="gordale" className="about__place" sizes="(min-width: 1024px) 13rem, 34vw" />}
            <span className="about__take" key={take} data-again={taps > 0 || undefined}>
              <Cutout
                id={current.cutout}
                sizes={JORGE_SIZES}
                gesture={taps === 0 ? 'slap' : undefined}
              />
            </span>
            <span className="about__tag" aria-hidden="true">
              <span data-swap={captionSwap}>{caption}</span>
            </span>
            {primed && (
              <span hidden>
                {aboutChapter.takes.map((other, index) =>
                  index === take ? null : (
                    <Cutout key={other.cutout} id={other.cutout} sizes={JORGE_SIZES} loading="eager" />
                  ),
                )}
              </span>
            )}
          </button>

          <p className="about__statement" data-reveal="rise">
            {aboutChapter.statement.map((run, index) => {
              if (typeof run === 'string') {
                // Punctuation right after a thing went into its pair.
                return typeof aboutChapter.statement[index - 1] === 'string' ? run : run.replace(PUNCT, '');
              }
              const next = aboutChapter.statement[index + 1];
              const punct = typeof next === 'string' ? next.match(PUNCT)?.[0] : undefined;
              return (
                <span key={run.words} className="about__pair">
                  {run.words}
                  <Thing
                    thing={run.thing}
                    index={things.indexOf(run.thing) + 1}
                    primed={primed}
                    open={open === index}
                    onToggle={() => setOpen((shown) => (shown === index ? null : index))}
                  />
                  {punct && <span className="about__punct">{punct}</span>}
                </span>
              );
            })}
          </p>
          <p className="about__signature handwriting" aria-hidden="true">
            {site.name.split(' ')[0]}
          </p>
        </div>
      </div>

      {/* For whoever types the Konami code: he looks in from the bottom of the window. */}
      {tongueOut && (
        <span
          className="about__tongue"
          key={tongues}
          aria-hidden="true"
          onAnimationEnd={(event) => {
            if (event.animationName === 'tongue-out') setTongueOut(false);
          }}
        >
          <Cutout id="jorge-tongue" sizes="(min-width: 1024px) 14rem, 40vw" loading="eager" />
        </span>
      )}
    </section>
  );
}

export default About;
