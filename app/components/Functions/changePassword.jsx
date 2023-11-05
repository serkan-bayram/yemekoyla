"use server";

import { authAsAdmin } from "./authAsAdmin";
import { getSession } from "./getSession";
import { validatePassword } from "./validations";
import { deleteSessionCookie } from "./deleteSessionCookie";

export async function changePassword(password) {
  const passwordValidation = validatePassword(password);

  if (!passwordValidation) return { ok: false, message: "Geçersiz şifre." };

  const { session } = await getSession();
  const id = session.user.record.id;

  const pb = await authAsAdmin();

  // example update data
  const data = {
    password: password,
    passwordConfirm: password,
  };

  // update with id
  try {
    await pb.collection("users").update(id, data);
  } catch (error) {
    console.log("Error on updating: ", error);
    return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyin." };
  }

  return { ok: true, message: "Şifreniz başarıyla değiştirildi." };
}
