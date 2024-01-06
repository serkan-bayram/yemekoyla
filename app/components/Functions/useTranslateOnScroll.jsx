import { useEffect } from "react";

export function useTranslateOnScroll(ref, rootMargin = "0px", timeout = 0) {
  useEffect(() => {
    if (ref.current) {
      const appearOptions = {
        rootMargin: rootMargin,
      };

      const useTranslateOnScroll = new IntersectionObserver(
        (entries, useTranslateOnScroll) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            } else {
              setTimeout(
                () => entry.target.classList.add("translate-appear"),
                timeout
              );
              useTranslateOnScroll.unobserve(entry.target);
            }
          });
        },
        appearOptions
      );

      useTranslateOnScroll.observe(ref.current);
    }
  }, [ref.current]);
}
