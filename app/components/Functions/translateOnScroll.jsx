import { useEffect } from "react";

export function translateOnScroll(ref, rootMargin = "0px", timeout = 0) {
  useEffect(() => {
    if (ref.current) {
      const appearOptions = {
        rootMargin: rootMargin,
      };

      const translateOnScroll = new IntersectionObserver(
        (entries, translateOnScroll) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            } else {
              setTimeout(
                () => entry.target.classList.add("translate-appear"),
                timeout
              );
              translateOnScroll.unobserve(entry.target);
            }
          });
        },
        appearOptions
      );

      translateOnScroll.observe(ref.current);
    }
  }, [ref.current]);
}
