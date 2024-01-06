"use client";

import { useRef } from "react";
import { useAppearOnScroll } from "../../../components/Functions/useAppearOnScroll";
import Image from "next/image";

function fullStar() {
  return <Image alt="" src={"/full-star.svg"} width={16} height={16} />;
}

function emptyStar() {
  return <Image alt="" src={"/empty-star.png"} width={16} height={16} />;
}

export function Comment({ author, comment, fullStars, emptyStars }) {
  const ref = useRef(0);

  const rootMargin = "-200px";

  useAppearOnScroll(ref, rootMargin);

  const fullStarsArray = Array.from({ length: fullStars }, (v, index) => index);
  const emptyStarsArray = Array.from(
    { length: emptyStars },
    (v, index) => index
  );

  return (
    <div
      ref={ref}
      className="fade-in flex flex-col p-4 gap-3 min-w-[20rem] bg-primary-400 border  border-primary-100 rounded-md"
    >
      <div className="flex justify-between items-center">
        <div className="font-semibold font-heading">{author}</div>
        <div className="flex gap-1">
          {fullStarsArray.map((item) => fullStar())}
          {emptyStarsArray.map((item) => emptyStar())}
        </div>
      </div>
      <p className="max-w-[18rem] font-body">{comment}</p>
    </div>
  );
}
