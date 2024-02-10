"use client";

import { saveSofraInfo } from "../../components/Functions/actions";
import { getFormData } from "../../components/Functions/getFormData";
import { error, success } from "../../components/Functions/notify";

export default function Form() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = getFormData(e);
    const response = await saveSofraInfo(username, password);

    if (response?.error) {
      if (response.error === "notAuthenticated") {
        error("Yanlış kullanıcı adı veya şifre.");
      }
      if (response.error === "noTelegram") {
        error("Önce hesabınızı Telegram ile bağlamalısınız.");
      }
    }

    if (response?.success) {
      success("İşlem Başarılı.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-8">
      <input
        required
        type="text"
        name="username"
        placeholder="SOFRA Kullanıcı Adınız"
      />
      <input
        required
        type="password"
        name="password"
        placeholder="SOFRA Şifreniz"
      />
      <button type="submit">kaydet</button>
    </form>
  );
}
