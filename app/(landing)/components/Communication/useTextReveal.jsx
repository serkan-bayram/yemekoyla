"use client";
import { useEffect } from "react";

export const useTextReveal = (ref, text) => {
  useEffect(() => {
    if (ref.current) {
      const words = text.split(" ");
      const wordCount = words.length;

      const options = {
        rootMargin: "-50px",
      };

      const wordObserver = new IntersectionObserver((entries, wordObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          } else {
            // Delay classList by index of word
            const index = entry.target.getAttribute("index");
            setTimeout(() => {
              entry.target.classList.add("word-seen");
            }, index * 20);
          }
        });
      }, options);

      ref.current.innerHTML = "";

      words.forEach((word, index) => {
        const span = document.createElement("span");

        // Add space to end of word if not last word
        span.innerHTML = word + (wordCount - 1 === index ? "" : "&nbsp");

        span.classList.add("inline-block");
        span.classList.add("word-to-seen");
        span.setAttribute("index", index);

        ref.current.appendChild(span);

        wordObserver.observe(span);
      });
    }
  }, [ref.current]);
};
