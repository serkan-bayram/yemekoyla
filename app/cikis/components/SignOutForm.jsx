"use client";

import { useRouter } from "next/navigation";
import AuthButton from "../../components/Auth/AuthButton";
import { signOut } from "next-auth/react";

export default function SignOutForm() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    signOut({ redirect: false }).then(() => {
      router.refresh(); // Redirect to the dashboard page after signing out
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthButton text="Çıkış Yap." />
    </form>
  );
}
