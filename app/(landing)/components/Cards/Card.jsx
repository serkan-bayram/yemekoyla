"use client";

import Image from "next/image";
import { useRef } from "react";
import { translateOnScroll } from "../../../components/Functions/translateOnScroll";

export function Card({ title, content, imageSrc, imageAlt, timeout }) {
  const ref = useRef(0);

  const rootMargin = "-100px";

  translateOnScroll(ref, rootMargin, timeout);

  return (
    <div ref={ref} className="translate flex flex-col items-center gap-3 ">
      <div className="rounded-full relative w-fit p-12 bg-primary-400 border border-primary-100 ">
        <Image
          className="absolute top-[52%] left-1/2 -translate-y-1/2 -translate-x-1/2 "
          src={imageSrc}
          alt={imageAlt}
          width={50}
          height={30}
        />
      </div>
      <div className="text-center font-semibold font-heading">{title}</div>
      <p className="text-center max-w-[30ch] font-body">{content}</p>
    </div>
  );
}
