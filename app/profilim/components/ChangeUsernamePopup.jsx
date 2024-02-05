"use client";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "./Button";
import { getFormData } from "../../components/Functions/getFormData";
import { validateUsername } from "../../components/Functions/validations";
import { changeUsername } from "../../components/Functions/actions";
import { error, success } from "../../components/Functions/notify";

export function ChangeUsernamePopup({ setPopup }) {
  const [inputError, setInputError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const updateUsername = async (e) => {
    e.preventDefault();

    const { username } = getFormData(e);

    if (validateUsername(username)) {
      setIsLoading(true);

      const response = await changeUsername(username);

      if (!response.ok) {
        error(response.message);
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        success(response.message);
        setIsLoading(false);
        setPopup(false);
        return;
      }

      error("Başarısız işlem, lütfen tekrar deneyiniz.");
      setIsLoading(false);
    } else {
      let message =
        "Kullanıcı adınız Türkçe karakter ve özel karakter içeremez.";

      // if the input is made of numbers only
      const isAllNumber = /^\d+$/.test(username);
      if (isAllNumber) message = "Kullanıcı adınız sadece sayılardan oluşamaz.";

      if (username.length < 3 || username.length > 16)
        message =
          "Kullanıcı adınız 3 karakterden kısa, 16 karakterden uzun olamaz.";

      setInputError({
        name: "username",
        message: message,
      });
    }
  };

  return (
    <div className="bg-black px-16 py-12 border border-primary-400 rounded-md z-50 ">
      <form onSubmit={updateUsername}>
        <div className="flex flex-col gap-2">
          <div className="font-body">Yeni Kullanıcı Adın</div>
          <Input
            name={"username"}
            inputError={inputError}
            placeholder={"Kullanıcı Adı"}
            iconName={"fa-solid fa-user"}
          />
          <div className="w-fit flex gap-4 self-end pt-2">
            <Button
              onClick={() => setPopup(false)}
              variant="danger"
              text={"Vazgeç"}
            />
            <Button
              isLoading={isLoading}
              type="submit"
              onClick={() => setInputError({})}
              text={"Kaydet"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
