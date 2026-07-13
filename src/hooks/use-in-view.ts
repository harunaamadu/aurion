"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export interface UseInViewOptions {
  /** Stop observing after the element enters view the first time. Default true. */
  once?: boolean;
  /** Fraction of the element that must be visible to count as "in view", 0–1. */
  amount?: number;
  /** Passed straight through to IntersectionObserver's rootMargin — e.g. "-10% 0px" to trigger a bit early/late. */
  rootMargin?: string;
  /** Custom scrollable ancestor to measure against; defaults to the browser viewport. */
  root?: Element | null;
}

export interface UseInViewResult<T extends Element> {
  ref: RefObject<T | null>;
  inView: boolean;
}

/**
 * Tracks whether an element is in the viewport via IntersectionObserver
 * directly, rather than relying on a library's built-in viewport
 * detection. Useful when something like Framer Motion's `whileInView`
 * isn't firing reliably — e.g. inside a transformed/animated ancestor,
 * a scroll container that isn't the window, or a layout where the
 * element's size changes after mount.
 *
 * @example
 * const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.3 });
 * <div ref={ref}>{inView ? "visible" : "hidden"}</div>
 */
export function useInView<T extends Element = HTMLDivElement>({
  once = true,
  amount = 0.2,
  rootMargin = "0px",
  root = null,
}: UseInViewOptions = {}): UseInViewResult<T> {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No IntersectionObserver support (very old browsers / some SSR test
    // environments) — fail open instead of leaving content permanently
    // hidden.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    let observer: IntersectionObserver | null = null;

    // Defer creating the observer by one frame so the "hidden" initial
    // state actually paints before we can possibly flip to in-view. Without
    // this, an element that's already inside the viewport at mount (common
    // for anything above the fold, or on a short/tall dev viewport) gets
    // marked in-view on IntersectionObserver's very first callback — which
    // fires before the browser has painted anything — so it just pops in
    // instead of animating. That looks identical to "ignoring the viewport
    // check" even though the check itself is correct.
    const raf = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer?.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        },
        { threshold: amount, rootMargin, root }
      );
      observer.observe(node);
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once, amount, rootMargin, root]);

  return { ref, inView };
}

export default useInView;