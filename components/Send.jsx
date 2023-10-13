"use client";

import { create } from "../functions/create.jsx";

export default function Send() {
  const handleClick = () => {
    create("heyyy");
  };

  return (
    <div className="flex items-center gap-1 pt-6 mx-20">
      <button
        onClick={handleClick}
        className="bg-primary w-full py-2 rounded-sm text-white border border-gray-700 appearance-none focus:ring ring-secondary shadow-md"
      >
        Gönder
      </button>
    </div>
  );
}
