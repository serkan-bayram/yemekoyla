"use client";

import { useRef } from "react";
import { useTranslateOnScroll } from "../../../components/Functions/useTranslateOnScroll";

export default function Description({ content }) {
  const ref = useRef(0);

  const rootMargin = "-50px";
  const timeout = 100;

  useTranslateOnScroll(ref, rootMargin, timeout);

  return (
    <p
      ref={ref}
      className="translate text-lg max-w-[45ch] sm:text-white md:text-fade-400 font-body xl:text-white  text-center lg:text-start"
    >
      {content}
    </p>
  );
}
