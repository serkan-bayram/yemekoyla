"use client";

import { signIn } from "next-auth/react";
import Input from "../../components/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "../../components/Auth/AuthForm";
import { error } from "../../components/Functions/notify";
import AuthButton from "../../components/Auth/AuthButton";
import { getFormData } from "../../components/Functions/getFormData";

export default function SignInForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // get input data from form
    const { username, password } = getFormData(e);

    // call signin function with data
    const { ok } = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });

    if (ok) {
      router.refresh();
      return;
    }

    error("Bilgileriniz doğrulanamadı, lütfen tekrar deneyiniz.");
    setIsLoading(false);
  };

  return (
    <AuthForm handleSubmit={handleSubmit}>
      <Input placeholder="Kullanıcı Adı" name="username" />
      <Input placeholder="Şifre" name="password" />
      <AuthButton text="Giriş Yap" isLoading={isLoading} />
    </AuthForm>
  );
}
