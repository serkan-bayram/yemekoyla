"use client";

import { useEffect, useRef, useState } from "react";

export default function StatusClient({ emoji, text }) {
  const ref = useRef(null);

  const [divWidth, setDivWidth] = useState(0);
  const [onHover, setOnHover] = useState(false);

  useEffect(() => {
    // Calculate divWidth after the component has mounted
    if (ref.current) {
      setDivWidth(ref.current.offsetWidth);
    }
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  return (
    <div
      style={
        onHover
          ? { transform: `translateX(0px)`, opacity: "100%" }
          : { transform: `translateX(${divWidth}px)`, opacity: "25%" }
      }
      className="font-body z-50
      cursor-pointer fixed top-20
      right-0 
       bg-black
       transition-all shadow border border-primary 
        rounded-tl-md rounded-bl-md flex pl-2 py-2"
      onMouseOver={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        setOnHover(false);
      }}
    >
      <div className="text-xl px-2  flex ">{emoji}</div>
      <div
        ref={ref}
        className="px-4  whitespace-nowrap text-md flex  items-center"
      >
        {text}
      </div>
    </div>
  );
}
