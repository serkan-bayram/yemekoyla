"use client";

import { useRef } from "react";
import { translateOnScroll } from "../../../components/Functions/translateOnScroll";

export default function Heading({ title, accent }) {
  const ref = useRef(0);

  const rootMargin = "-50px";
  const timeout = 0;

  translateOnScroll(ref, rootMargin, timeout);

  return (
    <h3
      ref={ref}
      className="translate lg:text-5xl text-4xl font-semibold flex flex-col text-center 
        items-center lg:text-start lg:items-start whitespace-nowrap font-heading"
    >
      {title}
      <span>{accent}</span>
    </h3>
  );
}
