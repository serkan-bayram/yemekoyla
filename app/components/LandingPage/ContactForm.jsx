"use client";

import Input, { Textarea } from "../Input";
import Button from "../Button";
import { sendEmail } from "./sendEmail";
import { validateUserEmail, validateMessage } from "../validations";
import { toast } from "react-toastify";

export default function ContactForm() {
  const id = "contact";
  const notify = (message) => {
    toast.error(message, {
      toastId: id,
    });
  };

  const success = (message) => {
    toast.success(message, { toastId: id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { userEmail, userMessage } = Object.fromEntries(formData);

    const userEmailValidation = validateUserEmail(userEmail);
    const userMessageValidation = validateMessage(userMessage);

    if (userEmailValidation.ok && userMessageValidation.ok) {
      const response = await sendEmail({ userEmail, userMessage });

      if (response.ok) {
        success("Mesajınız gönderildi!");
      } else {
        notify(response.message);
      }
    } else {
      if (!userEmailValidation.ok) notify(userEmailValidation.message);
      if (!userMessageValidation.ok) notify(userMessageValidation.message);
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
        <Button text="Gönder" />
      </div>
    </form>
  );
}