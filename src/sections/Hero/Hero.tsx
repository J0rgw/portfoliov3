import { ui } from '../../config/ui';
import { motion } from '../../design/motion';
import { assets } from '../../config/assets';
import { useRef, useState, type CSSProperties } from 'react';
import { Pause, Play } from '../../components/ui/Icon/Icon';
import { site } from '../../config/site';
import { Cutout } from '../../components/graphics/Cutout/Cutout';
import { ThemeImage } from '../../components/graphics/ThemeImage/ThemeImage';
import { usePointerDepth } from '../../components/ui/motion/usePointerDepth';
import { useScrollScene } from '../../components/ui/motion/useScrollScene';
import { useSpin } from '../../components/ui/motion/useSpin';
import '../../design/sections/Hero/Hero.css';

const enter = (index: number) => ({ '--enter-index': index }) as CSSProperties;
const rise = (index: number) => ({ '--rise-index': index }) as CSSProperties;

/**
 * Chapter 00, the cover. Contract: docs/INFORMATION_ARCHITECTURE.md §3.
 * Composition (2026-11-10, the diagonal study Jorge chose): the name set large in
 * the top-left corner, the disc behind his cover in its clear film in the middle,
 * his arm holding the sleeve by its right edge from the bottom-right corner, role
 * and statement in the bottom-left corner. Round it, three of his cut-outs: the
 * headphones hung from the top edge, the promo sticker on the film and the VOLUME
 * knob on the bottom edge, which turns as you scroll. References: Kyoosang Choi (a
 * hand holding the object), A24 (the disc as the cover object).
 *
 * Everything readable is real HTML, visible on first paint without JavaScript.
 * The objects are decorative: the name and role printed on them are the h1 in
 * plain text. With JavaScript and motion allowed the disc turns slowly (eased stop
 * on hover, tap or the focus-revealed control), scroll takes the package apart
 * (`--scene-*`, useScrollScene; MOTION_SYSTEM §2.1) and every layer leans by its
 * depth under a fine pointer (usePointerDepth).
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLPictureElement>(null);
  const [spinPaused, setSpinPaused] = useState(false);
  useScrollScene(heroRef, motion.hero);
  usePointerDepth(frameRef);
  useSpin(spinRef, { hoverRef: discRef, paused: spinPaused });
  const toggleSpin = () => setSpinPaused((value) => !value);

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero__track">
        {/* Snap point (MOTION_SYSTEM §2.3): the end of the pinned run, where the disc stands alone. */}
        <div className="hero__solo-mark" data-snap aria-hidden="true" />
        {/* The header stays clear while the frame is pinned (SiteHeader's strip, INFORMATION_ARCHITECTURE §4). */}
        <div className="hero__clear" data-header-clear aria-hidden="true" />
        <div className="hero__frame" data-scene-pin ref={frameRef}>
          <div className="hero__credit">
            <h1 id="hero-title" className="hero__identity">
              {/* One line per box, each rising out of its own mask on first paint (A24's title rise). */}
              <span className="hero__name">
                {site.hero.nameLines.map((line, index) => (
                  <span key={line} className="hero__name-line">
                    <span className="hero__name-rise" style={rise(index)}>
                      {line}
                    </span>
                    {index < site.hero.nameLines.length - 1 && ' '}
                  </span>
                ))}
              </span>
              <span className="hero__role enter" style={enter(3)}>
                <span className="visually-hidden">, </span>
                {site.hero.role}
              </span>
            </h1>
            <p className="hero__statement enter" style={enter(4)}>
              {site.hero.statement}
            </p>
          </div>

          {/* Further back than the set: hung over the right edge, behind the sleeve. */}
          <div className="hero__collage" aria-hidden="true">
            <Cutout
              id="headphones"
              className="hero__cut hero__headphones"
              handled
              gesture="slap"
              index={3}
              sizes="(orientation: portrait) 29vw, min(22.4vh, 12.3vw)"
              fetchPriority="low"
            />
          </div>

          {/* First paint: the disc lands spinning while the hand brings the sleeve up from below. */}
          <div className="hero__set" aria-hidden="true">
            <div className="hero__disc" data-scene-anchor="disc">
              {/* Tapping the disc holds it still (touch has no hover); the control below does the same for keyboards. */}
              <div className="hero__disc-body" ref={discRef} onClick={toggleSpin}>
                <ThemeImage
                  pictureClassName="hero__disc-spin"
                  pictureRef={spinRef}
                  dark={{ src: assets.hero.discDark, srcSet: assets.hero.discDarkSet }}
                  avif={assets.hero.discAvifSet}
                  className="hero__disc-art"
                  src={assets.hero.disc}
                  srcSet={assets.hero.discSet}
                  sizes={motion.heroDiscSizes}
                  alt=""
                  width={assets.hero.discSize}
                  height={assets.hero.discSize}
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </div>

            <div className="hero__sleeve">
              <div className="hero__sleeve-body">
                <div className="hero__case">
                  <ThemeImage
                    dark={{ src: assets.hero.coverDark, srcSet: assets.hero.coverDarkSet }}
                    className="hero__cover"
                    src={assets.hero.cover}
                    srcSet={assets.hero.coverSet}
                    sizes={motion.heroImageSizes}
                    alt=""
                    width={1200}
                    height={1200}
                    decoding="async"
                  />
                  <img
                    className="hero__film"
                    src={assets.hero.film}
                    srcSet={assets.hero.filmSet}
                    sizes={motion.heroImageSizes}
                    alt=""
                    width={1024}
                    height={1024}
                    decoding="async"
                  />
                </div>
                {/* The lamp's reflection on the film: it slides as a fine pointer moves. */}
                <span className="hero__sheen" />
                {/* On the film: the promo sticker, slapped on once the sleeve is in the hand. */}
                <Cutout
                  id="not-ai"
                  className="hero__sticker"
                  lay="sticker"
                  gesture="slap"
                  handled
                  index={6}
                  sizes="(orientation: portrait) 18.5vw, min(14.4vh, 8.4vw)"
                  fetchPriority="low"
                />
                {/* Jorge's hand, in front: the thumb on the film, the palm against the sleeve's edge. */}
                <img
                  className="hero__arm"
                  src={assets.hero.arm}
                  srcSet={assets.hero.armSet}
                  sizes={motion.heroArmSizes}
                  alt=""
                  width={assets.hero.armWidth}
                  height={assets.hero.armHeight}
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* In front of the set: lying on the bottom edge. */}
          <div className="hero__collage hero__collage--front" aria-hidden="true">
            <Cutout
              id="knob"
              className="hero__cut hero__knob"
              handled
              gesture="slap"
              index={4}
              sizes="(orientation: portrait) 21vw, min(13.6vh, 7.9vw)"
              fetchPriority="low"
            />
          </div>

          <button type="button" className="hero__spin-toggle" onClick={toggleSpin}>
            {spinPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {spinPaused ? ui.hero.resume : ui.hero.pause}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
