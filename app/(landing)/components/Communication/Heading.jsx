"use client";
import { useRef } from "react";
import { useTextReveal } from "./useTextReveal";

export function Heading() {
  const ref = useRef(null);

  const text = "İletişim";

  useTextReveal(ref, text);

  return (
    <h2
      ref={ref}
      className="lg:text-6xl text-4xl font-semibold  font-heading text-center"
    >
      {text}
    </h2>
  );
}
