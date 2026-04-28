import { useState, useEffect, useRef } from "react";

/**
 * Animates a numeric counter from 0 to `target` once the element
 * enters the viewport. Returns [currentCount, ref].
 */
export function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        obs.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          // Ease-in-out quad
          const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          setCount(Math.round(ease * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return [count, ref];
}
