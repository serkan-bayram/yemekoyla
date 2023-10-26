"use client";

import Input from "../../components/Input";
import {
  validateEmail,
  validatePassword,
  validateVerifyCode,
} from "../../components/validations";
import { toast } from "react-toastify";
import SubmitButtonWithLoading from "../../components/SubmitButtonWithLoading";
import { useState } from "react";
import { sendResetCode } from "./sendResetCode";
import { resetPassword } from "./resetPassword";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const error = (message) => {
    toast.error(message);
  };

  const success = (message) => {
    toast.success(message);
  };

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [isSend, setIsSend] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email } = Object.fromEntries(formData);

    // We first check on the client side and server side afterwards
    const validation = validateEmail(email);

    if (validation) {
      // validate in server side
      setIsLoading(true);
      const response = await sendResetCode(email);
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
      notify("Geçersiz E-Posta.");
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, code, password } = Object.fromEntries(formData);

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
      <form onSubmit={handleSubmit} className="px-8 pt-12 flex flex-col gap-6">
        <Input placeholder="ornek@ogrenci.bilecik.edu.tr" name="email" />
        <SubmitButtonWithLoading isLoading={isLoading} text="Sıfırla" />
      </form>
    </>
  ) : (
    <>
      <form
        onSubmit={handleResetSubmit}
        className="px-8 pt-12 flex flex-col gap-6"
      >
        <Input placeholder="E-Posta'nız" name="email" />
        <Input placeholder="E-Posta'nıza Gelen Kod" name="code" />
        <Input placeholder="Yeni Şifreniz" name="password" />
        <SubmitButtonWithLoading isLoading={isLoading} text="Sıfırla" />
      </form>
    </>
  );
}
