"use client";

import { useEffect, useState } from "react";
import Input from "../../components/Input";
import AuthButton from "../../components/Auth/AuthButton";
import {
  validatePassword,
  validateUsername,
} from "../../components/Functions/validations";
import { getFormData } from "../../components/Functions/getFormData";
import { changeUsername } from "../../components/Functions/changeUsername";
import { changePassword } from "../../components/Functions/changePassword";
import { error, success } from "../../components/Functions/notify";

function DefaultField({ label, placeholder, title }) {
  return (
    <div>
      <div className="mb-2 text-sm">{label}</div>
      <div title={title}>
        <Input isDisabled={true} placeholder={placeholder} />
      </div>
    </div>
  );
}

const handleUsernameChange = async (username, setIsLoading, setInputError) => {
  const usernameValidation = validateUsername(username);

  if (usernameValidation) {
    setInputError({});
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
      return;
    }

    error("Başarısız işlem, lütfen tekrar deneyiniz.");
    setIsLoading(false);
  }

  if (!usernameValidation) {
    console.log("not validated");

    let message = "Kullanıcı adınız Türkçe karakter ve özel karakter içeremez.";

    // if the input is made of numbers only
    const isAllNumber = /^\d+$/.test(username);
    if (isAllNumber) message = "Kullanıcı adınız sadece sayılardan oluşamaz.";

    if (username.length < 3 || username.length > 16)
      message =
        "Kullanıcı adınız 3 karakterden kısa, 16 karakterden uzun olamaz.";

    setInputError({
      name: "inputValue",
      message: message,
    });
    return;
  }
};

const handlePasswordChange = async (password, setIsLoading, setInputError) => {
  const passwordValidation = validatePassword(password);

  if (passwordValidation) {
    setInputError({});
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
      return;
    }

    error("Başarısız işlem, lütfen tekrar deneyiniz.");
    setIsLoading(false);
  }

  if (!passwordValidation) {
    setInputError({
      name: "inputValue",
      message:
        password.length < 8
          ? "Şifreniz en az 8 karakter uzunluğunda olmalı."
          : "Şifreniz birer büyük harf, küçük harf, özel karakter ve sayı içermelidir.",
    });
    return;
  }
};

function EditField({ field, placeholder, inputError, setInputError }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { inputValue } = getFormData(e);

    if (field === "username") {
      await handleUsernameChange(inputValue, setIsLoading, setInputError);
    }

    if (field === "password") {
      await handlePasswordChange(inputValue, setIsLoading, setInputError);
    }
  };

  return (
    <div>
      <div className="w-full h-1 bg-primary rounded-sm shadow my-6"></div>
      <form onSubmit={handleSubmit}>
        <Input
          isPassword={field === "password"}
          inputError={inputError}
          name="inputValue"
          placeholder={placeholder}
        />
        <AuthButton isLoading={isLoading} text="Kaydet" />
      </form>
    </div>
  );
}

export default function MyProfileForm({ userEmail, username }) {
  const [inputError, setInputError] = useState({});

  const [edit, setEdit] = useState({
    field: null,
    placeholder: null,
  });

  useEffect(() => {
    setInputError({});
  }, [edit]);

  return (
    <div className="px-8 pt-12 mb-12 flex flex-col ">
      <DefaultField
        label="E-Posta"
        placeholder={userEmail}
        title="E-Posta'nızı değiştiremezsiniz."
      />
      <DefaultField label="Kullanıcı Adı" placeholder={username} />
      <div className="flex gap-5 md:flex-row flex-col">
        <AuthButton
          handleClick={() => {
            setEdit((prevValue) => {
              if (prevValue.field === "username") {
                return {
                  field: null,
                  placeholder: null,
                };
              }
              return {
                field: "username",
                placeholder: "Yeni Kullanıcı Adın",
              };
            });
          }}
          text="Kullanıcı Adını Güncelle"
        />
        <AuthButton
          handleClick={() => {
            setEdit((prevValue) => {
              if (prevValue.field === "password") {
                return {
                  field: null,
                  placeholder: null,
                };
              }
              return {
                field: "password",
                placeholder: "Yeni Şifren",
              };
            });
          }}
          text="Şifreni Güncelle"
        />
      </div>
      {edit.field && (
        <EditField
          inputError={inputError}
          setInputError={setInputError}
          field={edit.field}
          placeholder={edit.placeholder}
        />
      )}
    </div>
  );
}
