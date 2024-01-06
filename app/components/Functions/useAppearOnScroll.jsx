import { useEffect } from "react";

export function useAppearOnScroll(ref, rootMargin) {
  useEffect(() => {
    if (ref.current) {
      const appearOptions = {
        rootMargin: rootMargin,
      };

      const useAppearOnScroll = new IntersectionObserver(
        (entries, useAppearOnScroll) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            } else {
              entry.target.classList.add("appear");
              useAppearOnScroll.unobserve(entry.target);
            }
          });
        },
        appearOptions
      );

      useAppearOnScroll.observe(ref.current);
    }
  }, [ref.current]);
}
