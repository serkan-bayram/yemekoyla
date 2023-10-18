"use client";

import { verifyCode } from "./verifyCode";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { validateVerifyCode } from "../../components/validations";
import { signIn } from "next-auth/react";

export default function VerifyForm() {
  const id = "falseCode";

  const notify = (message) => {
    toast.error(message, {
      toastId: id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { code } = Object.fromEntries(formData);

    // We first check on the client side and server side afterwards
    const validation = validateVerifyCode(code);

    if (validation) {
      const response = await verifyCode(code);

      if (response === "notValidated") {
        notify("Geçersiz kod.");
      }

      if (response === "falseCode") {
        notify("Yanlış kod.");
      }

      if (response?.email) {
        const { error, ok } = await signIn("credentials", {
          username: response.email,
          password: response.password,
          redirect: true,
          callbackUrl: "/profilolustur",
        });
      }
    }

    if (!validation) notify("Geçersiz kod.");
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 pt-12 flex flex-col gap-6">
      <Input placeholder="Kod" name="code" />
      <Button text="Doğrula" />
    </form>
  );
}
