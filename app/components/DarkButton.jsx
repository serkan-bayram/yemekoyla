"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ScrollIntoView from "react-scroll-into-view";

export default function DarkButton({ isFancy, selector }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`p-2 px-4  rounded-md bg-primary-400 border border-primary-100 relative hover:bg-primary-300 font-body `}
    >
      <ScrollIntoView selector={selector}>
        <div className="flex gap-3 items-center justify-center ">
          <Image src="/faq.png" width={24} height={24} />
          <span className=" text-white font-semibold">Nasıl?</span>
        </div>
      </ScrollIntoView>
    </button>
  );
}
