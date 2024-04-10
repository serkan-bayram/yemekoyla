"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Source: https://www.youtube.com/watch?v=fcnDBP3k3BE&t=28s

function FancyButtonSVG({ isHover }) {
  const containerOffset = 150;

  return (
    <svg
      style={{
        width: `calc(100% + ${containerOffset}px)`,
        height: `calc(100% + ${containerOffset}px)`,
        inset: `-${containerOffset / 2}px`,
      }}
      className={`absolute
 pointer-events-none ${isHover ? "animate-fancy-button" : "opacity-0"}
`}
    >
      <rect
        rx={"6px"}
        strokeLinecap="round"
        pathLength={"100"}
        style={{
          strokeDasharray: "20px 30px",
          strokeDashoffset: isHover ? "-120px" : "0",
          width: `calc(100% - ${containerOffset}px)`,
          height: `calc(100% - ${containerOffset}px)`,
          x: `${containerOffset / 2}px`,
          y: `${containerOffset / 2}px`,
        }}
        className={`${isHover && "transition-all duration-[1200ms] ease-in"} 
   blur-[5px]  
    fill-transparent
    stroke-white stroke-[4px]`}
      ></rect>
      <rect
        rx={"6px"}
        strokeLinecap="round"
        pathLength={"100"}
        style={{
          strokeDasharray: "20px 30px",
          strokeDashoffset: isHover ? "-120px" : "0",
          width: `calc(100% - ${containerOffset}px)`,
          height: `calc(100% - ${containerOffset}px)`,
          x: `${containerOffset / 2}px`,
          y: `${containerOffset / 2}px`,
        }}
        className={`${isHover && "transition-all duration-[1200ms] ease-in"} 
    fill-transparent stroke-white stroke-[4px]`}
      ></rect>
    </svg>
  );
}

export default function LightButton({
  isFancy,
  text,
  imgSrc,
  imgAlt,
  href,
  handleClick,
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      onClick={handleClick ? handleClick : () => {}}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`p-2 px-4 rounded-md bg-white relative font-body  ${
        !isFancy && "hover:bg-fade-400 transition-all"
      }`}
    >
      <Link prefetch={false} href={href}>
        <div className="flex  gap-3 items-center justify-center ">
          <Image src={imgSrc} alt={imgAlt} width={24} height={24} />
          <span className=" text-primary-400 font-semibold">{text}</span>
        </div>
      </Link>
      {isFancy && <FancyButtonSVG isHover={isHover} />}
    </button>
  );
}
