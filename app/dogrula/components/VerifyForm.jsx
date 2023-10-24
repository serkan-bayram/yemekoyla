"use client";

import { verifyCode } from "./verifyCode";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import { validateVerifyCode } from "../../components/validations";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SubmitButtonWithLoading from "../../components/SubmitButtonWithLoading";
import { useState } from "react";

export default function VerifyForm() {
  const id = "falseCode";
  const notify = (message) => {
    toast.error(message, {
      toastId: id,
    });
  };

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { code } = Object.fromEntries(formData);

    // We first check on the client side and server side afterwards
    const validation = validateVerifyCode(code);

    if (validation) {
      setIsLoading(true);
      const response = await verifyCode(code);
      setIsLoading(false);

      if (!response?.ok) {
        notify(response?.error);
      }

      if (response?.email) {
        const { ok } = await signIn("credentials", {
          username: response.email,
          password: response.password,
          redirect: false,
        });

        if (!ok) notify("Profil oluşturulamadı.");

        if (ok) router.replace("/profiolustur");
      }
    } else {
      notify("Geçersiz kod.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 pt-12 flex flex-col gap-6">
      <Input placeholder="Kod" name="code" />
      <SubmitButtonWithLoading isLoading={isLoading} text="Doğrula" />
    </form>
  );
}
