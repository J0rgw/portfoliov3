/**
 * Decorative barcode for the tray card, derived deterministically from the
 * catalog number so server and client render the same bars.
 */
export function Barcode({ value, className = '' }: { value: string; className?: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  const push = (width: number, draw: boolean) => {
    if (draw) bars.push({ x, w: width });
    x += width;
  };

  // Guard bars, then 4 modules per character from its bits, then guard bars.
  push(1, true);
  push(1, false);
  push(1, true);
  push(2, false);
  for (const char of value) {
    const code = char.charCodeAt(0);
    for (let bit = 0; bit < 4; bit++) {
      const on = (code >> bit) & 1;
      push(on ? 2 : 1, true);
      push(((code >> (bit + 2)) & 1) + 1, false);
    }
  }
  push(1, true);
  push(1, false);
  push(1, true);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${x} 40`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {bars.map((bar) => (
        <rect key={bar.x} x={bar.x} y="0" width={bar.w} height="40" fill="currentColor" />
      ))}
    </svg>
  );
}

export default Barcode;
