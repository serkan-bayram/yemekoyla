import { useEffect } from "react";

export function appearOnScroll(ref, rootMargin) {
  useEffect(() => {
    if (ref.current) {
      const appearOptions = {
        rootMargin: rootMargin,
      };

      const appearOnScroll = new IntersectionObserver(
        (entries, appearOnScroll) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            } else {
              entry.target.classList.add("appear");
              appearOnScroll.unobserve(entry.target);
            }
          });
        },
        appearOptions
      );

      appearOnScroll.observe(ref.current);
    }
  }, [ref.current]);
}
