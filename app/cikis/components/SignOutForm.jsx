"use client";

import { useRouter } from "next/navigation";
import Button from "../../components/AuthButton";
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
      <Button text="Çıkış Yap" />
    </form>
  );
}
