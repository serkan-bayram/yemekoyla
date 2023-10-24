"use client";

import { Ring } from "@uiball/loaders";

export default function Loading() {
  return (
    <div className="w-full h-screen absolute  top-0 left-0 z-[9999999] flex justify-center items-center">
      <Ring size={50} lineWeight={5} speed={2} color="#4b4bb4" />
    </div>
  );
}
