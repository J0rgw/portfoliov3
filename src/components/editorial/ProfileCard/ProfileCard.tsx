import { ui, messages } from '../../../config/ui';
import React, { useEffect, useMemo, useRef } from 'react';
import { prefersReducedMotion } from '../../ui/motion/useReducedMotion';
import '../../../design/components/ProfileCard/ProfileCard.css';

interface ProfileCardProps {
  avatarUrl: string;
  iconUrl?: string;
  name: string;
  title: string;
  handle: string;
  status?: string;
  badge?: string;
  contactText?: string;
  contactHref?: string;
  className?: string;
}

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));

/**
 * The backstage pass (ART_DIRECTION §5). Restyled from the original
 * ProfileCard; its smoothed tilt engine is kept, with three fixes from the
 * audit: the animation loop now stops once settled (it used to run forever
 * while the window had focus), tilt only runs on fine pointers without reduced
 * motion, and the contact action is a real link. `touch-action: none` was
 * removed so a finger on the card can still scroll the page.
 */
const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl,
  iconUrl,
  name,
  title,
  handle,
  status,
  badge,
  contactText = ui.actions.contact,
  contactHref,
  className = '',
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const tiltEngine = useMemo(() => {
    let rafId: number | null = null;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const TAU = 0.14;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;
      const percentX = clamp((100 / (shell.clientWidth || 1)) * x);
      const percentY = clamp((100 / (shell.clientHeight || 1)) * y);
      wrap.style.setProperty('--pointer-x', `${percentX}%`);
      wrap.style.setProperty('--pointer-y', `${percentY}%`);
      wrap.style.setProperty('--rotate-x', `${round(-((percentX - 50) / 5))}deg`);
      wrap.style.setProperty('--rotate-y', `${round((percentY - 50) / 4)}deg`);
    };

    const step = (ts: number) => {
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      const k = 1 - Math.exp(-dt / TAU);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      setVarsFromXY(currentX, currentY);
      const settled = Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05;
      if (settled) {
        rafId = null;
        lastTs = 0;
        return;
      }
      rafId = requestAnimationFrame(step);
    };

    return {
      setTarget(x: number, y: number) {
        targetX = x;
        targetY = y;
        if (rafId === null) rafId = requestAnimationFrame(step);
      },
      toCenter() {
        const shell = shellRef.current;
        if (shell) this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      reset() {
        const shell = shellRef.current;
        if (!shell) return;
        currentX = targetX = shell.clientWidth / 2;
        currentY = targetY = shell.clientHeight / 2;
        setVarsFromXY(currentX, currentY);
      },
      cancel() {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
        lastTs = 0;
      },
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    if (!shell || !wrap) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer || prefersReducedMotion()) return;

    tiltEngine.reset();
    const offsets = (event: PointerEvent) => {
      const rect = shell.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onEnter = (event: PointerEvent) => {
      wrap.classList.add('is-active');
      const { x, y } = offsets(event);
      tiltEngine.setTarget(x, y);
    };
    const onMove = (event: PointerEvent) => {
      const { x, y } = offsets(event);
      tiltEngine.setTarget(x, y);
    };
    const onLeave = () => {
      wrap.classList.remove('is-active');
      tiltEngine.toCenter();
    };

    shell.addEventListener('pointerenter', onEnter);
    shell.addEventListener('pointermove', onMove);
    shell.addEventListener('pointerleave', onLeave);
    return () => {
      shell.removeEventListener('pointerenter', onEnter);
      shell.removeEventListener('pointermove', onMove);
      shell.removeEventListener('pointerleave', onLeave);
      tiltEngine.cancel();
    };
  }, [tiltEngine]);

  return (
    <div ref={wrapRef} className={`pass ${className}`.trim()}>
      <div className="pass__lanyard" aria-hidden="true" />
      <div ref={shellRef} className="pass__shell">
        <article className="pass__card" aria-label={messages.passLabel(name)}>
          <div className="pass__slot" aria-hidden="true" />
          <div className="pass__head">
            {badge && <span className="pass__badge">{badge}</span>}
            {iconUrl && <img className="pass__icon" src={iconUrl} alt="" width={28} height={28} loading="lazy" />}
          </div>
          <div className="pass__photo">
            <img src={avatarUrl} alt={messages.portrait(name)} width={457} height={546} loading="lazy" decoding="async" />
          </div>
          <div className="pass__body">
            <p className="pass__name">{name}</p>
            <p className="pass__role">{title}</p>
            <div className="pass__meta">
              <span className="pass__handle">@{handle}</span>
              {status && (
                <span className="pass__status">
                  <span className="pass__status-dot" aria-hidden="true" />
                  {status}
                </span>
              )}
            </div>
          </div>
          {contactHref && (
            <a className="pass__contact" href={contactHref}>
              {contactText}
            </a>
          )}
          <div className="pass__foil" aria-hidden="true" />
        </article>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
