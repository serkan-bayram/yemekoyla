"use client";

import { signIn } from "next-auth/react";
import Button from "./Button";
import Input from "./Input";

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
      <Input placeholder="Kullanıcı Adı" />
      <Input placeholder="Şifre" />
      <Button text="Giriş Yap" />
    </form>
  );
}
