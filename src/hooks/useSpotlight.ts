import { useEffect } from 'react';

export function useSpotlight(selector = '.card-base') {
  useEffect(() => {
    let active: HTMLElement | null = null;

    const reset = (el: HTMLElement) => {
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
    };

    const handleMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(selector) ?? null;
      if (active && active !== target) reset(active);
      active = target;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      target.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [selector]);
}
