import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function SignInInputs() {
  return (
    <>
      <Input placeholder="Kullanıcı Adı" />
      <Input placeholder="Şifre" />
      <Button text="Giriş Yap" />
    </>
  );
}
