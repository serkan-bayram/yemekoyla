"use server";

import jsonwebtoken from "jsonwebtoken";
import {
  validateEmail,
  validatePassword,
  validateVerifyCode,
} from "../../components/Functions/validations";
import { authAsAdmin } from "../../components/Functions/authAsAdmin";
import { fetchUserByEmail } from "../../components/Functions/fetchUserByEmail";

export async function resetPassword(email, code, password) {
  const emailValidation = validateEmail(email);
  if (!emailValidation) return { ok: false, message: "Geçersiz E-Posta." };

  const codeValidation = validateVerifyCode(code);
  if (!codeValidation) return { ok: false, message: "Geçersiz E-Posta." };

  const passwordValidation = validatePassword(password);
  if (!passwordValidation) return { ok: false, message: "Geçersiz Şifre." };

  const secret = process.env.tokenSecret;

  const pb = await authAsAdmin();

  try {
    const { id, resetPasswordCode } = await fetchUserByEmail(pb, email);

    const decoded = jsonwebtoken.verify(
      resetPasswordCode,
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

    await pb.collection("users").update(`${id}`, data);

    return { ok: true, message: "Şifreniz Sıfırlandı." };
  } catch (error) {
    console.log("Error on resetPassword:", error);
  }

  return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyiniz." };
}
