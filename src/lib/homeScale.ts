import { RefObject, useLayoutEffect, useSyncExternalStore } from "react";

// Shared scale of the home tile block. HomeTiles computes it (useHomeScaleFit);
// BottomNav reads it (useHomeScale) so the dock is always as wide as the visible tile grid.
// The last value is kept while HomeTiles is unmounted, so other screens show the same dock width.
let current = 1;
const listeners = new Set<() => void>();

function publish(next: number) {
  if (next === current) return;
  current = next;
  listeners.forEach((l) => l());
}

export function useHomeScale(): number {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
  );
}

/** Fits `inner` into `outer`'s content box (uniform scale, max 1) and publishes the result. */
export function useHomeScaleFit(
  outerRef: RefObject<HTMLElement | null>,
  innerRef: RefObject<HTMLElement | null>,
  deps: unknown[],
): number {
  useLayoutEffect(() => {
    const fit = () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const cs = getComputedStyle(outer);
      const avail = outer.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      publish(Math.min(1, avail / inner.offsetHeight));
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (outerRef.current) ro.observe(outerRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return useHomeScale();
}
