import { useRef, useState, type CSSProperties } from 'react';
import { Pause, Play } from '../../components/Icon/Icon';
import { site } from '../../content/site';
import { useScrollScene, type ScenePhases } from '../../motion/useScrollScene';
import { useSpin } from '../../motion/useSpin';
import './Hero.css';

const enter = (index: number) => ({ '--enter-index': index }) as CSSProperties;

/**
 * Taking the package apart (MOTION_SYSTEM §2.1): the hand pulls the sleeve off
 * the disc (split), the disc takes the centre (solo), then it leaves (exit).
 * Fractions of the scene's scroll narrative; split and solo overlap so the
 * movement never stops halfway.
 */
const SCENE_PHASES: ScenePhases = { split: [0.06, 0.46], solo: [0.36, 0.8], exit: [0.8, 1] };
const SCENE = { phases: SCENE_PHASES };

/**
 * Chapter 00, the cover. Contract: docs/INFORMATION_ARCHITECTURE.md §3.
 * Composition from Jorge's sketch (2026-10-29, ART_DIRECTION §5.1): the disc
 * large behind the cover in its clear sleeve, a hand holding the sleeve by
 * its edge, and a compact credit (name, role, statement) in the bottom-left
 * corner. References: Kyoosang Choi (a hand holding the object), A24 (the
 * disc as the cover object).
 *
 * Everything readable is real HTML, visible on first paint without
 * JavaScript. The objects are decorative: the name and role printed on them
 * are the h1 in plain text. With JavaScript and motion allowed the disc turns
 * slowly (eased stop on hover, tap or the focus-revealed control) and scroll
 * plays the scene (`--scene-*`, useScrollScene).
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLPictureElement>(null);
  const [spinPaused, setSpinPaused] = useState(false);
  useScrollScene(heroRef, SCENE);
  useSpin(spinRef, { hoverRef: discRef, paused: spinPaused });
  const toggleSpin = () => setSpinPaused((value) => !value);

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero__track">
        <div className="hero__frame" data-scene-pin>
          <div className="hero__credit">
            <h1 id="hero-title" className="hero__identity">
              <span className="hero__name enter" style={enter(0)}>
                {site.hero.name}
              </span>
              <span className="hero__role enter" style={enter(1)}>
                <span className="visually-hidden">, </span>
                {site.hero.role}
              </span>
            </h1>
            <p className="hero__statement enter" style={enter(2)}>
              {site.hero.statement}
            </p>
          </div>

          <div className="hero__set enter enter--still" style={enter(1)} aria-hidden="true">
            <div className="hero__disc" data-scene-anchor="disc">
              {/* Tapping the disc holds it still (touch has no hover); the control below does the same for keyboards. */}
              <div className="hero__disc-body" ref={discRef} onClick={toggleSpin}>
                <picture className="hero__disc-spin" ref={spinRef}>
                  <source type="image/avif" srcSet="/images/hero/disc.avif" />
                  <img
                    className="hero__disc-art"
                    src="/images/hero/disc.webp"
                    alt=""
                    width={512}
                    height={512}
                    decoding="async"
                    fetchPriority="high"
                  />
                </picture>
              </div>
            </div>

            <div className="hero__sleeve">
              <div className="hero__sleeve-body">
                <div className="hero__case">
                  <img
                    className="hero__cover"
                    src="/images/hero/cover-720.webp"
                    srcSet="/images/hero/cover-480.webp 480w, /images/hero/cover-720.webp 720w, /images/hero/cover-880.webp 880w, /images/hero/cover-1024.webp 1024w"
                    sizes="(orientation: portrait) 61vw, min(calc(52vh - 2.4rem), 31vw)"
                    alt=""
                    width={1024}
                    height={1024}
                    decoding="async"
                  />
                  <img
                    className="hero__film"
                    src="/images/hero/film-1024.webp"
                    srcSet="/images/hero/film-640.webp 640w, /images/hero/film-1024.webp 1024w"
                    sizes="(orientation: portrait) 61vw, min(calc(52vh - 2.4rem), 31vw)"
                    alt=""
                    width={1024}
                    height={1024}
                    decoding="async"
                  />
                </div>
                <img className="hero__hand" src="/images/hero/hand.webp" alt="" width={289} height={296} decoding="async" />
              </div>
            </div>
          </div>

          <button type="button" className="hero__spin-toggle" onClick={toggleSpin}>
            {spinPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {spinPaused ? 'Reanudar giro del disco' : 'Pausar giro del disco'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
