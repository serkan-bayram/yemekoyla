"use client";

import { useRef } from "react";
import { useTranslateOnScroll } from "../../../components/Functions/useTranslateOnScroll";
import LightButton from "../../../components/LightButton";

export default function Button({ href }) {
  const ref = useRef(0);

  const rootMargin = "-50px";
  const timeout = 200;

  useTranslateOnScroll(ref, rootMargin, timeout);

  return (
    <div ref={ref} className="translate w-fit mx-auto lg:mx-0">
      <LightButton
        href={href}
        text={"Devam et"}
        imgAlt={"Büyüteç"}
        imgSrc={"/magnifying-glass-search.png"}
      />
    </div>
  );
}
