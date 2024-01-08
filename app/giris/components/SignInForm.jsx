"use client";

import { signIn } from "next-auth/react";
import Input from "../../components/Input/Input";
import { useState } from "react";
import AuthForm from "../../components/Auth/AuthForm";
import { error } from "../../components/Functions/notify";
import AuthButton from "../../components/Auth/AuthButton";
import { getFormData } from "../../components/Functions/getFormData";
import BottomTextWithLink from "../../components/BottomTextWithLink";
import TextWithLink from "../../components/TextWithLink";

export default function SignInForm() {
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
      window.location.replace("/oyla");
      return;
    }

    error("Bilgileriniz doğrulanamadı, lütfen tekrar deneyiniz.");
    setIsLoading(false);
  };

  return (
    <AuthForm handleSubmit={handleSubmit}>
      <div className="flex flex-col gap-8 w-full">
        <Input
          placeholder="Kullanıcı Adı"
          name="username"
          iconName={"fa-solid fa-user"}
        />
        <div>
          <Input
            isPassword={true}
            placeholder="Şifre"
            name="password"
            iconName={"fa-solid fa-lock"}
          />
          <div className="text-right mt-3">
            <TextWithLink
              linkText={"Şifremi Unuttum"}
              href={"/sifremiunuttum"}
            />
          </div>
        </div>
        <AuthButton
          text="Devam Et"
          isLoading={isLoading}
          iconName={"fa-solid fa-right-to-bracket"}
        />
      </div>
    </AuthForm>
  );
}
