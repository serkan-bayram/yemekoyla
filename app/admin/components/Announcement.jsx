import AuthButton from "../../components/Auth/AuthButton";
import { getFormData } from "../../components/Functions/getFormData";
import { error, success } from "../../components/Functions/notify";
import { saveAnnouncement } from "./saveAnnouncement";

export default function Announcement() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = getFormData(e);

    const { message } = await saveAnnouncement(formData);

    if (message) {
      success("Duyuru gönderildi!");
    } else {
      error("Duyuru gönderilemedi.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 md:mx-96 mx-8 mt-12 justify-center"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Duyuru Başlığı</label>
        <input
          required
          className="bg-primary-400 border border-primary-100 rounded-md py-1 px-2"
          name="title"
          id="title"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="announcement">Açıklama</label>
        <textarea
          required
          className="bg-primary-400 border border-primary-100 rounded-md py-1 px-2"
          name="announcement"
          id="announcement"
          rows={12}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expires_at">Duyuru Kaç Dakika Sonra Silinsin?</label>
        <input
          min="1"
          max="10080"
          required
          type="number"
          className="bg-primary-400 border border-primary-100 rounded-md py-1 px-2"
          name="expires_at"
          id="expires_at"
          rows={12}
        />
      </div>
      <AuthButton text="Gönder" />
    </form>
  );
}
