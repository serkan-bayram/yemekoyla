"use client";

import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  validatePassword,
  validateUsername,
} from "../../components/validations";
import { toast } from "react-toastify";
import { createProfile } from "./createProfile";
import { signIn } from "next-auth/react";

export default function CreateProfileForm() {
  const notify = (message) => {
    toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData);

    // We first check on the client side and server side afterwards
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);

    if (usernameValidation && passwordValidation) {
      const response = await createProfile(username, password);

      if (!response?.ok) notify(response?.error);

      if (response?.ok) {
        await signIn("credentials", {
          username: username,
          password: password,
          redirect: true,
          callbackUrl: "/anasayfa",
        });
      }
    }

    if (!usernameValidation) {
      notify("Geçersiz kullanıcı adı.");
      return;
    }

    if (!passwordValidation) notify("Geçersiz şifre.");
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 pt-12 flex flex-col gap-6">
      <Input placeholder="Kullanıcı Adı" name="username" />
      <Input placeholder="Şifre" name="password" />
      <Button text="Onayla" />
    </form>
  );
}
