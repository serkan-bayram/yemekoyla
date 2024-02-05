"use client";

import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "./Button";
import { validatePassword } from "../../components/Functions/validations";
import { getFormData } from "../../components/Functions/getFormData";
import { changePassword } from "../../components/Functions/actions";
import { error, success } from "../../components/Functions/notify";

export function ChangePasswordPopup({ setPopup }) {
  const [inputError, setInputError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const updatePassword = async (e) => {
    e.preventDefault();

    const { password } = getFormData(e);

    if (validatePassword(password)) {
      setIsLoading(true);

      const response = await changePassword(password);

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
      setInputError({
        name: "password",
        message: "Şifreniz en az 8 karakter uzunluğunda olmalı",
      });
    }
  };

  return (
    <div className="bg-black px-16 py-12 border border-primary-400 rounded-md z-50 ">
      <form onSubmit={updatePassword}>
        <div className="flex flex-col gap-2">
          <div className="font-body">Yeni Şifreniz</div>
          <Input
            isPassword={true}
            name={"password"}
            inputError={inputError}
            placeholder={"Şifre"}
            iconName={"fa-solid fa-lock"}
          />
          <div className="w-fit flex gap-4 self-end pt-2">
            <Button
              onClick={() => setPopup(false)}
              variant="danger"
              text={"Vazgeç"}
            />
            <Button
              isLoading={isLoading}
              onClick={() => setInputError({})}
              type={"submit"}
              text={"Kaydet"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
