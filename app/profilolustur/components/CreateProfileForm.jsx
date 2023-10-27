"use client";

import Input from "../../components/Input";
import {
  validatePassword,
  validateUsername,
  validateVerifyCode,
} from "../../components/validations";
import { createProfile } from "./createProfile";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthButton from "../../components/AuthButton";
import { error, success } from "../../components/notify";
import { getFormData } from "../../components/getFormData";
import AuthForm from "../../components/AuthForm";

export default function CreateProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, code } = getFormData(e);

    // We first check on the client side and server side afterwards
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);
    const codeValidation = validateVerifyCode(code);

    if (usernameValidation && passwordValidation && codeValidation) {
      setIsLoading(true);
      const response = await createProfile(username, password, code);
      setIsLoading(false);

      if (!response.ok) {
        error(response.message);
        return;
      }

      const { ok } = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      if (ok) {
        success("Profiliniz başarıyla oluşturuldu.");
        router.refresh();
        return;
      }

      error("Başarısız işlem, lütfen tekrar deneyiniz.");
    }

    if (!usernameValidation) {
      error("Geçersiz kullanıcı adı.");
      return;
    }

    if (!passwordValidation) {
      error("Geçersiz şifre.");
      return;
    }

    if (!codeValidation) {
      error("Geçersiz kod.");
    }
  };

  return (
    <AuthForm handleSubmit={handleSubmit}>
      <Input placeholder="Kullanıcı Adı" name="username" />
      <Input placeholder="Şifre" name="password" />
      <Input placeholder="E-posta'nıza Gelen Kod" name="code" />
      <AuthButton isLoading={isLoading} text="Onayla" />
    </AuthForm>
  );
}
