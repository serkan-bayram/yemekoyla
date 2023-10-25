"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <div className="absolute flex justify-center bottom-8 w-full">
      <button onClick={() => signOut()} className=" text-gray-600 font-body">
        Çıkış Yap.
      </button>
    </div>
  );
}
