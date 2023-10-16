"use client";

import { signIn } from "next-auth/react";
import SignInInputs from "./SignInInputs";

export default function SignInForm() {
  const onSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      username: "serkan",
      password: "CEfqjkKDjQ7HD1F",
      redirect: true,
      callbackUrl: "/anasayfa",
    });
  };

  return (
    <form onSubmit={onSubmit} className="px-8 pt-12 flex flex-col gap-6">
      <SignInInputs />
    </form>
  );
}
