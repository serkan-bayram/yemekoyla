import { useState } from "react";
import { saveAvatar } from "../../components/Functions/actions";
import Button from "./Button";
import { error, success } from "../../components/Functions/notify";
import Image from "next/image";

export default function Avatar({ avatar }) {
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const formData = new FormData();

      formData.append("avatar", image);

      setIsLoading(true);
      const response = await saveAvatar(formData);

      if (response?.error === "somethingWentWrong") {
        error("Bir şeyler ters gitti.");
        setIsLoading(false);
        return;
      }

      success("İşlem başarılı!");

      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative w-fit mx-auto p-2 cursor-pointer  flex flex-col items-center gap-2">
        <input
          onChange={(e) => {
            for (let file of e.target.files) {
              setImage(file);
            }
          }}
          name="avatar"
          type="file"
          accept="image/*"
          className="opacity-0 cursor-pointer  absolute w-full h-full top-0 left-0"
        />
        <div
          className={`${
            !!avatar === false && "bg-fade-400"
          } w-20  h-20 relative  rounded-full`}
        >
          {!!avatar && (
            <Image
              className="rounded-full object-fit border border-fade-400 "
              src={avatar}
              fill
              alt="Kullanıcı Avatarı"
            />
          )}
        </div>

        <div className="text-fade-300 py-1 text-center">
          {image ? image.name : !!avatar ? "Avatarını Düzenle" : "Avatar Ekle"}
        </div>
      </div>
      {image && (
        <div className="py-2">
          <Button
            isLoading={isLoading}
            textCenter={true}
            type={"submit"}
            text={"Kaydet"}
          />
        </div>
      )}
    </form>
  );
}
