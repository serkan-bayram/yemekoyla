"use client";

import { signIn } from "next-auth/react";

export default function Button({ text }) {
  const handleClick = async () => {
    await signIn("credentials", {
      username: "serkan",
      password: "CEfqjkKDjQ7HD1F",
      redirect: true,
      callbackUrl: "/anasayfa",
    });
  };

  return (
    <div className="w-full rounded-md bg-primary border border-gray-500">
      <button
        onClick={handleClick}
        className="w-full h-full py-2 flex justify-center items-center text-center bg-transparent appearance-none text-white text-sm"
      >
        {text}
      </button>
    </div>
  );
}
