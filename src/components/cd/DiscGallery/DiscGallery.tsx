import { ui, messages } from '../../../config/ui';
import { projectTheme } from '../CoverArt/projectTheme';
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
import CoverArt from '../CoverArt/CoverArt';
import Disc from '../Disc/Disc';
import HandCircle from '../../graphics/HandCircle/HandCircle';
import { SquareArrowsLeft, SquareArrowsRight } from '../../ui/Icon/Icon';
import MarkerArrow from '../../graphics/MarkerArrow/MarkerArrow';
import type { ProjectSummary } from '../../../config/types';
import { useDiscCarousel } from '../../ui/motion/useDiscCarousel';
import { SHOWN, discPose, discStyle, discTransform, type Shown } from '../../../design/discPose';
import { rememberedProject } from './selection';

interface DiscGalleryProps {
  items: ProjectSummary[];
  /** Printed on every disc's rim with the title and year. */
  credit: string;
  catalog: string;
  /**
   * The selection changed; the carousel is the single source of truth.
   * `restored` is true when it comes from the visitor's last visit.
   */
  onSelect: (index: number, restored: boolean) => void;
}

/**
 * Chapter 01's disc gallery (A24 reference, ART_DIRECTION §5.2).
 *
 * Every disc is a real link to its case study. The selected disc opens it;
 * a pointer click on another disc first brings that one forward. Drag (with
 * inertia and snapping), the previous/next buttons, the arrow keys and those
 * clicks all drive one carousel (useDiscCarousel), which renders the poses
 * imperatively; React re-renders only when the selection changes.
 *
 * Without JavaScript the first disc is selected, the others stay where the
 * server put them, and the section's text list links every case study.
 */
export function DiscGallery({ items, credit, catalog, onSelect }: DiscGalleryProps) {
  const listId = useId();
  const stageRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  const [moving, setMoving] = useState(false);
  // Lays the annotation again each time the row comes to rest.
  const [rested, setRested] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const restoring = useRef(false);
  // The selection as the carousel knows it, readable mid-frame.
  const selectedRef = useRef(0);
  // How many neighbours the layout has room for (CSS, read on resize).
  const shownRef = useRef<Shown>(SHOWN);
  const count = items.length;

  // The server renders the first disc selected; these styles never change
  // afterwards, so React leaves the imperative transforms alone.
  const restingStyles = useMemo(() => items.map((_, i) => discStyle(discPose(i))), [items]);

  const carousel = useDiscCarousel(stageRef, {
    count,
    // One step is the distance between neighbouring discs on screen.
    stepPx: () => {
      const stage = stageRef.current;
      const disc = stage?.querySelector<HTMLElement>('[data-disc-active]');
      if (!stage || !disc) return 320;
      const spread = parseFloat(getComputedStyle(stage).getPropertyValue('--spread-x')) || 1;
      return disc.offsetWidth * discPose(1).x * spread;
    },
    render: (position) => {
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const pose = discPose(i - position, shownRef.current);
        item.style.transform = discTransform(pose);
        item.style.opacity = String(pose.opacity);
        // Restacking is not free: only when the order actually changes.
        if (item.style.zIndex !== String(pose.z)) item.style.zIndex = String(pose.z);
        // The selected disc is never hidden, even while it is still far
        // away: keyboard focus moves to it as soon as it is chosen.
        item.style.visibility = pose.opacity < 0.01 && i !== selectedRef.current ? 'hidden' : '';
        const face = item.querySelector<HTMLElement>('.disc__spin');
        if (face) face.style.transform = `rotate(${pose.turn.toFixed(2)}deg)`;
      });
    },
    onIndex: (index) => {
      selectedRef.current = index;
      // Focusable before the next frame renders it (see the focus effect).
      const item = itemRefs.current[index];
      if (item) item.style.visibility = '';
      setSelected(index);
      onSelect(index, restoring.current);
      if (!restoring.current) setAnnouncement(messages.projectAnnouncement(index + 1, count, items[index].title));
    },
    onMotion: (value) => {
      setMoving(value);
      if (!value) setRested((n) => n + 1);
    },
  });

  // The layout decides how many neighbours fit beside the credits; read it
  // before the first imperative render and again whenever the stage resizes.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const read = () => {
      const style = getComputedStyle(stage);
      const value = (name: string, fallback: number) => {
        const parsed = parseFloat(style.getPropertyValue(name));
        return Number.isFinite(parsed) ? parsed : fallback;
      };
      const shown = { prev: value('--shown-prev', SHOWN.prev), next: value('--shown-next', SHOWN.next) };
      if (shown.prev === shownRef.current.prev && shown.next === shownRef.current.next) return;
      shownRef.current = shown;
      carousel.redraw();
    };
    read();
    const observer = new ResizeObserver(read);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [carousel]);

  // Back from a case study: land on the disc that was opened, without motion.
  useEffect(() => {
    const slug = rememberedProject();
    const index = items.findIndex((item) => item.slug === slug);
    restoring.current = true;
    if (index > 0) carousel.goTo(index, { instant: true });
    restoring.current = false;
    // Only on mount: later selections come from the visitor.
  }, []);

  // Keep keyboard focus on the selected disc when the selection moves.
  useEffect(() => {
    const stage = stageRef.current;
    const focused = document.activeElement;
    if (!stage || !(focused instanceof HTMLElement) || !stage.contains(focused)) return;
    const link = itemRefs.current[selected]?.querySelector<HTMLAnchorElement>('a');
    if (link && link !== focused) link.focus({ preventScroll: true });
  }, [selected]);

  const handleDiscClick = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    // The selected disc is a plain link to its case study.
    if (index === carousel.index()) return;
    // New tab, or activated without a pointer (keyboard, screen reader): a
    // link is a link. A plain pointer click brings the disc forward first.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.detail === 0) return;
    event.preventDefault();
    carousel.goTo(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, () => void> = {
      ArrowLeft: () => carousel.step(-1),
      ArrowRight: () => carousel.step(1),
      Home: () => carousel.goTo(0),
      End: () => carousel.goTo(count - 1),
    };
    const move = moves[event.key];
    if (!move || event.altKey || event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    move();
  };

  const current = items[selected];
  const atStart = selected === 0;
  const atEnd = selected === count - 1;

  return (
    <div className="disc-gallery" data-moving={moving || undefined} onKeyDown={handleKeyDown}>
      <ol className="disc-gallery__stage" id={listId} ref={stageRef} aria-label={ui.projects.discs}>
        {items.map((item, i) => {
          const active = i === selected;
          return (
            <li
              key={item.slug}
              className="disc-gallery__item"
              ref={(node) => {
                itemRefs.current[i] = node;
              }}
              style={restingStyles[i]}
              data-disc-active={active || undefined}
            >
              <a
                className="disc-gallery__disc"
                href={item.href}
                aria-label={messages.projectLink(i + 1, count, item.title)}
                tabIndex={active ? 0 : -1}
                draggable={false}
                onClick={(event) => handleDiscClick(event, i)}
              >
                <Disc
                  variant="pressed"
                  ink={projectTheme(item.id).ink}
                  rimText={`${item.title} · ${credit} · ${item.year} · ${catalog}`}
                  transitionName={`disc-${item.slug}`}
                  style={{ '--disc-rotate': `${discPose(i).turn}deg` } as CSSProperties}
                >
                  <CoverArt cover={projectTheme(item.id)} assets={item.assets} title={item.title} track={item.track} catalog={catalog} shape="disc" rim />
                </Disc>
              </a>
              {/* After the link: CSS draws it when the link is hovered. */}
              <HandCircle className="disc-gallery__ring" />
            </li>
          );
        })}
      </ol>

      {/* The annotation repeats the selected disc's link for pointers only:
          the disc itself is the accessible link. */}
      <a
        key={rested}
        className="disc-gallery__hint"
        href={current.href}
        tabIndex={-1}
        aria-hidden="true"
        draggable={false}
      >
        <MarkerArrow className="disc-gallery__arrow" direction="up-left" />
        <span className="disc-gallery__hint-text">{ui.projects.hint}</span>
      </a>

      {/* The icon is the key: its rounded square is the button's only outline.
          At either end the key stays focusable (aria-disabled), so focus is
          never dropped. The count between them is visual: the live region
          announces the change. */}
      <div className="disc-gallery__controls">
        <button
          type="button"
          className="disc-gallery__button"
          aria-label={ui.projects.previous}
          aria-controls={listId}
          aria-disabled={atStart || undefined}
          onClick={() => !atStart && carousel.step(-1)}
        >
          <SquareArrowsLeft className="disc-gallery__key" aria-hidden="true" />
        </button>
        <span className="disc-gallery__count mono" aria-hidden="true">
          {String(selected + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
        <button
          type="button"
          className="disc-gallery__button"
          aria-label={ui.projects.next}
          aria-controls={listId}
          aria-disabled={atEnd || undefined}
          onClick={() => !atEnd && carousel.step(1)}
        >
          <SquareArrowsRight className="disc-gallery__key" aria-hidden="true" />
        </button>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}

export default DiscGallery;
