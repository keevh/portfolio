const HOME_SCROLL_TARGET_KEY = 'portfolio-home-scroll-target';

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function setPendingHomeScrollTarget(sectionId: string) {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(HOME_SCROLL_TARGET_KEY, sectionId);
}

export function consumePendingHomeScrollTarget() {
  if (typeof window === 'undefined') {
    return null;
  }

  const sectionId = window.sessionStorage.getItem(HOME_SCROLL_TARGET_KEY);
  if (!sectionId) {
    return null;
  }

  window.sessionStorage.removeItem(HOME_SCROLL_TARGET_KEY);
  return sectionId;
}

export function smoothScrollTo(targetY: number, duration = 900): () => void {
  const startY = window.scrollY;
  const delta  = targetY - startY;
  const start  = performance.now();
  let cancelled = false;

  function step(now: number) {
    if (cancelled) return;
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + delta * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
  return () => { cancelled = true; };
}
