"use client";

import { sendVerifyCode } from "./sendVerifyCode";
import Input from "../../components/Input";
import { validateEmail } from "../../components/validations";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { error, success } from "../../components/notify";
import { getFormData } from "../../components/getFormData";
import AuthButton from "../../components/AuthButton";
import AuthForm from "../../components/AuthForm";

export default function SignUpForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = getFormData(e);

    // We first check on the client side and server side afterwards
    const emailValidation = validateEmail(email);

    if (emailValidation) {
      // validate in server side
      setIsLoading(true);
      const response = await sendVerifyCode(email);
      setIsLoading(false);

      if (!response.ok) {
        error(response.message);
        return;
      }

      if (response?.ok) {
        const { ok } = await signIn("credentials", {
          username: response.email,
          password: response.password,
          redirect: false,
        });

        if (ok) {
          success("E-Posta'nıza doğrulama kodu gönderildi.");
          router.refresh();
          return;
        }

        error("Profil oluşturulamadı, lütfen tekrar deneyin.");
      }
    } else {
      error("Geçersiz E-Posta.");
    }
  };

  return (
    <AuthForm handleSubmit={handleSubmit}>
      <Input placeholder="ornek@ogrenci.bilecik.edu.tr" name="email" />
      <AuthButton text="Kaydol" isLoading={isLoading} />
    </AuthForm>
  );
}
