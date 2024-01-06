"use client";

import { signIn } from "next-auth/react";
import Input from "../../components/Input";
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
      <div className="flex flex-col gap-8 pb-6 w-full">
        <Input
          placeholder="Kullanıcı Adı"
          name="username"
          imgSrc={"/user.png"}
          imgAlt={"Kullanıcı"}
        />
        <div>
          <Input
            placeholder="Şifre"
            name="password"
            imgSrc={"/lock.png"}
            imgAlt={"Şifre"}
            isPassword={true}
          />
          <div className="text-right mt-3">
            <TextWithLink
              linkText={"Şifremi Unuttum"}
              href={"/sifremiunuttum"}
            />
          </div>
        </div>
      </div>
      <AuthButton text="Giriş Yap" isLoading={isLoading} />
    </AuthForm>
  );
}
