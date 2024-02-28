"use client";

import { saveSchoolId } from "../../components/Functions/actions";
import { getFormData } from "../../components/Functions/getFormData";
import { error, success } from "../../components/Functions/notify";

export default function Form() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { schoolId } = getFormData(e);
    const response = await saveSchoolId(schoolId);

    if (response?.error) {
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
        className="p-3 bg-primary-400 border border-primary-200 rounded-md"
        required
        type="text"
        name="schoolId"
        placeholder="Okul Numaranız"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-primary-400 border 
      border-primary-200 w-fit mx-auto rounded-md"
      >
        Kaydet
      </button>
    </form>
  );
}
