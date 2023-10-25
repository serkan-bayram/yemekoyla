"use client";

import Input from "../../components/Input";
import {
  validatePassword,
  validateUsername,
} from "../../components/validations";
import { toast } from "react-toastify";
import { createProfile } from "./createProfile";
import { signIn, signOut } from "next-auth/react";
import SubmitButtonWithLoading from "../../components/SubmitButtonWithLoading";
import { useState } from "react";

export default function CreateProfileForm() {
  const notify = (message) => {
    toast.error(message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData);

    // We first check on the client side and server side afterwards
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);

    if (usernameValidation && passwordValidation) {
      setIsLoading(true);
      const response = await createProfile(username, password);
      setIsLoading(false);
      if (!response?.ok) notify(response?.error);

      if (response?.ok) {
        await signIn("credentials", {
          username: username,
          password: password,
          redirect: true,
          callbackUrl: "/oyla",
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
      <SubmitButtonWithLoading isLoading={isLoading} text="Onayla" />
    </form>
  );
}
