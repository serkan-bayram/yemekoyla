"use client";

import { useState } from "react";

export default function StatusClient({ emoji, text }) {
  const [onHover, setOnHover] = useState(false);

  return (
    <div
      style={
        onHover
          ? { transform: `translateX(0)`, opacity: "100%" }
          : { transform: `translateX(calc(100% - 2.5rem)`, opacity: "25%" }
      }
      className="font-body z-50
      cursor-pointer fixed top-20
      right-0 
       bg-black
       transition-all shadow border border-primary 
        rounded-tl-md rounded-bl-md flex  py-2"
      onMouseOver={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        setOnHover(false);
      }}
    >
      {onHover && (
        <div
          className="p-1 px-2 whitespace-nowrap rounded-sm bg-black
       absolute right-1 top-12 text-xs"
        >
          Günün Yemeği
        </div>
      )}
      <div className="text-xl  flex  w-10 justify-center pl-1 items-center ">
        {emoji}
      </div>
      <div className=" whitespace-nowrap text-md flex px-2 pr-4 items-center">
        {text}
      </div>
    </div>
  );
}
