"use client";

import AuthButton from "../../components/Auth/AuthButton";
import { signOut } from "next-auth/react";

export default function SignOutForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    signOut({ callbackUrl: "/giris" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthButton text="Çıkış Yap." />
    </form>
  );
}
