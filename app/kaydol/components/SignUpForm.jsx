"use client";

import { sendVerifyCode } from "./sendVerifyCode";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { validateEmail } from "../../components/validations";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const id = "falseEmail";
  const notify = (message) => {
    toast.error(message, {
      toastId: id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email } = Object.fromEntries(formData);

    // We first check on the client side and server side afterwards
    const validation = validateEmail(email);

    if (validation) {
      // validate in server side
      const response = await sendVerifyCode(email);

      if (!response?.ok) return;
    }

    notify("Geçersiz E-Posta.");
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 pt-12 flex flex-col gap-6">
      <Input placeholder="ornek@ogrenci.bilecik.edu.tr" name="email" />
      <Button text="Kaydol" />
    </form>
  );
}
