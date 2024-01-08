"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <h1
        className="text-accent-400 hover:text-accent-300 transition-all
  select-none        font-heading text-3xl font-extrabold"
      >
        Yemekoyla
      </h1>
    </Link>
  );
}
