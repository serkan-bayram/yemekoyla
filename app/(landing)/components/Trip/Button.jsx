"use client";

import { useRef } from "react";
import { translateOnScroll } from "../../../components/Functions/translateOnScroll";
import LightButton from "../../../components/LightButton";

export default function Button() {
  const ref = useRef(0);

  const rootMargin = "-50px";
  const timeout = 200;

  translateOnScroll(ref, rootMargin, timeout);

  return (
    <div ref={ref} className="translate w-fit mx-auto lg:mx-0">
      <LightButton
        href={"/oyla"}
        text={"Devam et"}
        imgAlt={"Büyüteç"}
        imgSrc={"/magnifying-glass-search.png"}
      />
    </div>
  );
}
