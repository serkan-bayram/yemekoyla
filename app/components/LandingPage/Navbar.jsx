"use client";

import Link from "next/link";
import ScrollIntoView from "react-scroll-into-view";

export default function Navbar() {
  return (
    <div className="flex items-center text-white justify-between px-12 w-full h-12 bg-black">
      <Link href="/">
        <h1 className="text-white font-heading text-xl font-extrabold ">YP</h1>
      </Link>
      <ul
        className="flex gap-12 font-body absolute right-0 
        flex-col justify-center items-center
       top-12 h-screen w-full bg-red-500 z-50"
      >
        <ScrollIntoView selector="#home">
          <button>
            <li>Ana Sayfa</li>
          </button>
        </ScrollIntoView>
        <ScrollIntoView selector="#why">
          <button>
            <li>Neden?</li>
          </button>
        </ScrollIntoView>
        <ScrollIntoView selector="#how">
          <button>
            <li>Nasıl?</li>
          </button>
        </ScrollIntoView>
        <Link href="/anasayfa">
          <button>
            <li>Oyla</li>
          </button>
        </Link>
        <ScrollIntoView selector="#contact">
          <button>
            <li>İletişim</li>
          </button>
        </ScrollIntoView>
      </ul>
      <div className="hidden md:flex">Theme</div>
    </div>
  );
}
