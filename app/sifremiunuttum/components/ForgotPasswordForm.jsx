"use client";

import Input from "../../components/Input";
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

  const [isSend, setIsSend] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      error("Geçersiz E-Posta.");
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

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
      if (!emailValidation) error("Geçersiz E-Posta.");
      if (!codeValidation) error("Geçersiz Kod.");
      if (!passwordValidation) error("Geçersiz Şifre.");
    }
  };

  return !isSend ? (
    <>
      <AuthForm handleSubmit={handleSubmit}>
        <Input placeholder="ornek@ogrenci.bilecik.edu.tr" name="email" />
        <AuthButton isLoading={isLoading} text="Sıfırla" />
      </AuthForm>
    </>
  ) : (
    <>
      <AuthForm handleSubmit={handleResetSubmit}>
        <Input placeholder="E-Posta'nız" name="email" />
        <Input placeholder="E-Posta'nıza Gelen Kod" name="code" />
        <Input placeholder="Yeni Şifreniz" name="password" isPassword={true} />
        <AuthButton isLoading={isLoading} text="Sıfırla" />
      </AuthForm>
    </>
  );
}
