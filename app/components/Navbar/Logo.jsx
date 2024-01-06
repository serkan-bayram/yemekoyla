"use client";

import Link from "next/link";

export function Logo() {
  return (
    <div className="flex-1 flex">
      <Link href="/">
        <h1 className="text-accent font-heading text-2xl font-extrabold">YO</h1>
      </Link>
    </div>
  );
}
