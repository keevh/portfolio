function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function smoothScrollTo(targetY: number, duration = 900): void {
  const startY = window.scrollY;
  const delta  = targetY - startY;
  const start  = performance.now();

  function step(now: number) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + delta * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
