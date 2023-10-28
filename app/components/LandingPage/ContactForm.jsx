"use client";

import Input, { Textarea } from "../Input";
import { sendEmail } from "../Functions/sendEmail";
import { validateUserEmail, validateMessage } from "../Functions/validations";
import { useState } from "react";
import AuthButton from "../Auth/AuthButton";
import { error, success } from "../Functions/notify";
import { getFormData } from "../Functions/getFormData";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userEmail, userMessage } = getFormData(e);

    const userEmailValidation = validateUserEmail(userEmail);
    const userMessageValidation = validateMessage(userMessage);

    if (userEmailValidation.ok && userMessageValidation.ok) {
      setIsLoading(true);
      const response = await sendEmail({ userEmail, userMessage });
      setIsLoading(false);

      if (response.ok) {
        success("Mesajınız gönderildi!");
        return;
      }

      error(response.message);
    } else {
      if (!userEmailValidation.ok) error(userEmailValidation.message);
      if (!userMessageValidation.ok) error(userMessageValidation.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mt-16 px-12 pb-12 flex justify-center items-center"
    >
      <div className="w-96 flex flex-col gap-4">
        <Input name="userEmail" placeholder="E-posta Adresiniz" />
        <Textarea name="userMessage" placeholder="Mesajınız" />
        <AuthButton isLoading={isLoading} text="Gönder" />
      </div>
    </form>
  );
}
