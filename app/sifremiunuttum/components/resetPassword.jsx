"use server";

import jsonwebtoken from "jsonwebtoken";
import {
  validateEmail,
  validatePassword,
  validateVerifyCode,
} from "../../components/validations";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";

export async function resetPassword(email, code, password) {
  const _cookies = cookies();

  const emailValidation = validateEmail(email);
  if (!emailValidation) return { ok: false, message: "Geçersiz E-Posta." };

  const codeValidation = validateVerifyCode(code);
  if (!codeValidation) return { ok: false, message: "Geçersiz E-Posta." };

  const passwordValidation = validatePassword(password);
  if (!passwordValidation) return { ok: false, message: "Geçersiz Şifre." };

  const secret = process.env.tokenSecret;

  const pb = new PocketBase("http://127.0.0.1:8090");

  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  try {
    const fetchUser = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);

    if (fetchUser) {
      // Decode token
      let dbCode = fetchUser.resetPasswordCode;

      const decoded = jsonwebtoken.verify(
        dbCode,
        secret,
        function (err, decoded) {
          if (err) {
            return new Error(err);
          }
          return decoded;
        }
      );

      if (decoded.code !== code) return { ok: false, message: "Yanlış kod." };

      const data = {
        password: password,
        passwordConfirm: password,
        resetPasswordCode: "",
      };

      const record = await pb
        .collection("users")
        .update(`${fetchUser.id}`, data);

      return { ok: true, message: "Şifreniz Sıfırlandı." };
    }
  } catch (error) {
    console.log("Error on fetchUser:", error);
  }

  return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyiniz." };
}
