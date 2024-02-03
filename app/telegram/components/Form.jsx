"use client";

import { useState } from "react";
import Input from "../../components/Input/Input";
import { getFormData } from "../../components/Functions/getFormData";
import { verifyTelegram } from "../../components/Functions/actions";
import { error, success } from "../../components/Functions/notify";

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { telegramCode } = getFormData(e);

    const response = await verifyTelegram(telegramCode);

    if (response?.error) {
      if (response.error === "somethingWentWrong") {
        error("Bir şeyler ters gitti.");
      }
      if (response.error === "wrongCode") {
        error("Geçersiz kod.");
      }
      setIsLoading(false);
      return;
    }

    success(
      "Hesabınız bağlandı! İlk oyunuzu Telegram üzerinden verebilirsiniz."
    );

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex mx-32 mt-4 gap-4">
      <Input
        name={"telegramCode"}
        iconName={"fa-solid fa-wand-magic"}
        placeholder="Doğrulama Kodu"
      />
      <button
        type={isLoading ? "button" : "submit"}
        className={`bg-white py-2 px-4 rounded-lg
     transition-all hover:text-accent-400 
     text-sm text-black font-semibold font-body
     ${isLoading && "opacity-50 cursor-default hover:text-black"}`}
      >
        Onayla
      </button>
    </form>
  );
}
