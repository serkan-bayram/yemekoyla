"use client";

import Input from "../../components/Input/Input";
import {
  validateEmail,
  validatePassword,
  validateVerifyCode,
} from "../../components/Functions/validations";
import { useState } from "react";
import { sendPasswordResetCode } from "./sendPasswordResetCode";
import { resetPassword } from "./resetPassword";
import AuthButton from "../../components/Auth/AuthButton";
import AuthForm from "../../components/Auth/AuthForm";
import { getFormData } from "../../components/Functions/getFormData";
import { success, error } from "../../components/Functions/notify";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState({});

  const [isSend, setIsSend] = useState(false);

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
      const response = await sendPasswordResetCode(email);
      setIsLoading(false);

      if (!response?.ok) {
        if (response?.message) {
          error(response?.message);
        }
      } else {
        setIsSend(true);
        if (response?.message) {
          success(response?.message);
        }
      }
    } else {
      setInputError({ name: "email", message: "Geçersiz E-Posta." });
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setInputError({});

    const { email, code, password } = getFormData(e);

    // We first check on the client side and server side afterwards
    const emailValidation = validateEmail(email);
    const codeValidation = validateVerifyCode(code);
    const passwordValidation = validatePassword(password);

    if (emailValidation && codeValidation && passwordValidation) {
      // validate in server side
      setIsLoading(true);
      const response = await resetPassword(email, code, password);
      setIsLoading(false);

      if (!response?.ok) {
        if (response?.message) {
          error(response?.message);
        }
      } else {
        if (response?.message) {
          success(response?.message);
          router.replace("/giris");
        }
      }
    } else {
      if (!emailValidation) {
        setInputError({ name: "email", message: "Geçersiz E-Posta." });
        return;
      }
      if (!codeValidation) {
        setInputError({ name: "code", message: "Geçersiz kod." });
        return;
      }
      if (!passwordValidation) {
        setInputError({
          name: "password",
          message:
            password.length < 8
              ? "Şifreniz en az 8 karakter uzunluğunda olmalı."
              : "Şifreniz birer büyük harf, küçük harf, özel karakter ve sayı içermelidir.",
        });
        return;
      }
    }
  };

  return !isSend ? (
    <>
      <AuthForm handleSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <Input
            inputError={inputError}
            placeholder="ornek@ogrenci.bilecik.edu.tr"
            name="email"
            iconName={"fa-solid fa-envelope"}
          />
          <AuthButton isLoading={isLoading} text="Sıfırla" />
        </div>
      </AuthForm>
    </>
  ) : (
    <>
      <AuthForm handleSubmit={handleResetSubmit}>
        <div className="flex flex-col gap-6">
          <Input
            inputError={inputError}
            placeholder="E-Posta'nız"
            name="email"
            iconName={"fa-solid fa-envelope"}
          />
          <Input
            inputError={inputError}
            placeholder="E-Posta'nıza Gelen Kod"
            name="code"
            iconName={"fa-solid fa-message"}
          />
          <Input
            inputError={inputError}
            placeholder="Yeni Şifreniz"
            name="password"
            iconName={"fa-solid fa-lock"}
            isPassword={true}
          />
          <AuthButton isLoading={isLoading} text="Sıfırla" />
        </div>
      </AuthForm>
    </>
  );
}
