"use client";

import { useRef } from "react";
import { useTranslateOnScroll } from "../../../components/Functions/useTranslateOnScroll";

export default function Description({ content }) {
  const ref = useRef(0);

  const rootMargin = "-150px";
  const timeout = 200;

  useTranslateOnScroll(ref, rootMargin, timeout);

  return (
    <p
      ref={ref}
      className="translate text-lg max-w-[40ch]  text-center lg:text-start font-body"
    >
      {content}
    </p>
  );
}
