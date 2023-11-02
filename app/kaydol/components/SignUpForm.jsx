"use client";

import { sendVerifyCode } from "./sendVerifyCode";
import Input from "../../components/Input";
import { validateEmail } from "../../components/Functions/validations";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { error, success } from "../../components/Functions/notify";
import { getFormData } from "../../components/Functions/getFormData";
import AuthButton from "../../components/Auth/AuthButton";
import AuthForm from "../../components/Auth/AuthForm";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
          router.replace("/profilolustur");
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
