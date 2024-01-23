"use client";

import { sendVerifyCode } from "../../components/Functions/actions";
import Input from "../../components/Input/Input";
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
  const [inputError, setInputError] = useState({});

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputError({});

    const { email } = getFormData(e);

    // We first check on the client side and server side afterwards
    const emailValidation = validateEmail(email);

    if (emailValidation) {
      // validate in server side
      setIsLoading(true);
      const response = await sendVerifyCode(email);

      if (!response.ok) {
        error(response.message);
        setIsLoading(false);
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
        setIsLoading(false);
      }
    } else {
      setInputError({
        name: "email",
        message: "Geçersiz E-Posta.",
      });
    }
  };

  return (
    <AuthForm handleSubmit={handleSubmit}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label className=" font-heading text-sm">Okul E-Postanız</label>
          <Input
            inputError={inputError}
            placeholder="ornek@ogrenci.bilecik.edu.tr"
            name="email"
            iconName={"fa-solid fa-envelope"}
          />
        </div>
        <AuthButton
          iconName={"fa-solid fa-right-to-bracket"}
          text="Kaydol"
          isLoading={isLoading}
        />
      </div>
    </AuthForm>
  );
}
