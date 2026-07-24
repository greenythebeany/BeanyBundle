import { useEffect, useRef, useState } from 'react';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(prefersReduced);

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}
