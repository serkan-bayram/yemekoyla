"use client";

import Input from "../../components/Input";
import {
  validatePassword,
  validateUsername,
  validateVerifyCode,
} from "../../components/Functions/validations";
import { createProfile } from "./createProfile";
import { useState } from "react";
import AuthForm from "../../components/Auth/AuthForm";
import { error, success } from "../../components/Functions/notify";
import { getFormData } from "../../components/Functions/getFormData";
import AuthButton from "../../components/Auth/AuthButton";
import { useRouter } from "next/navigation";

export default function CreateProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState({});

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, code } = getFormData(e);

    // We first check on the client side and server side afterwards
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);
    const codeValidation = validateVerifyCode(code);

    if (usernameValidation && passwordValidation && codeValidation) {
      setInputError({});
      setIsLoading(true);
      const response = await createProfile(username, password, code);

      if (!response.ok) {
        error(response.message);
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        success("Profiliniz başarıyla oluşturuldu! Yönlendiriliyorsunuz.");
        router.replace("/oyla");
        return;
      }

      error("Başarısız işlem, lütfen tekrar deneyiniz.");
      setIsLoading(false);
    }

    if (!usernameValidation) {
      let message =
        "Kullanıcı adınız Türkçe karakter ve özel karakter içeremez.";

      // if the input is made of numbers only
      const isAllNumber = /^\d+$/.test(username);
      if (isAllNumber) message = "Kullanıcı adınız sadece sayılardan oluşamaz.";

      if (username.length < 3 || username.length > 16)
        message =
          "Kullanıcı adınız 3 karakterden kısa, 16 karakterden uzun olamaz.";

      setInputError({
        name: "username",
        message: message,
      });
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

    if (!codeValidation) {
      setInputError({
        name: "code",
        message: "Geçersiz kod.",
      });
      return;
    }
  };

  return (
    <AuthForm handleSubmit={handleSubmit}>
      <Input
        inputError={inputError}
        placeholder="Kullanıcı Adı"
        name="username"
      />
      <Input
        inputError={inputError}
        placeholder="Şifre"
        name="password"
        isPassword={true}
      />
      <Input
        inputError={inputError}
        placeholder="E-posta'nıza Gelen Kod"
        name="code"
      />
      <AuthButton isLoading={isLoading} text="Onayla" />
    </AuthForm>
  );
}
