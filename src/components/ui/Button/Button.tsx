import type { MouseEventHandler, ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Copy, Envelope } from '../Icon/Icon';
import '../../../design/components/Button/Button.css';

const icons = {
  'arrow-right': ArrowRight,
  'arrow-down': ArrowDown,
  'arrow-up-right': ArrowUpRight,
  mail: Envelope,
  copy: Copy,
} as const;

export type ButtonIcon = keyof typeof icons;

interface ButtonProps {
  children: ReactNode;
  /** Renders a link when set, a button otherwise. */
  href?: string;
  variant?: 'primary' | 'secondary';
  icon?: ButtonIcon | null;
  /** Opens in a new tab with safe rel. */
  external?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  ariaLabel?: string;
}

/**
 * Square, bordered, uppercase action with an arrow (ART_DIRECTION §9).
 * Primary is ink on paper; secondary is outlined. Press sinks 1px.
 */
export function Button({
  children,
  href,
  variant = 'primary',
  icon = 'arrow-right',
  external = false,
  className = '',
  onClick,
  ariaLabel,
}: ButtonProps) {
  const Icon = icon ? icons[icon] : null;
  const classes = `btn btn--${variant} ${className}`.trim();
  const content = (
    <>
      <span className="btn__label">{children}</span>
      {Icon && <Icon className="btn__icon" size={18} aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type="button" onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}

export default Button;
