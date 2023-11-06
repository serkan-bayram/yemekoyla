"use server";

import { authAsAdmin } from "./authAsAdmin";
import { getSession } from "./getSession";
import { validateUsername } from "./validations";
import { deleteSessionCookie } from "./deleteSessionCookie";

export async function changeUsername(username) {
  const usernameValidation = validateUsername(username);

  if (!usernameValidation)
    return { ok: false, message: "Geçersiz kullanıcı adı." };

  const { session } = await getSession();
  const id = session.user.record.id;

  const pb = await authAsAdmin();

  // Check is username taken
  try {
    // If this line of code does not throw an error, it means username is taken
    await pb.collection("users").getFirstListItem(`username="${username}"`);

    return { ok: false, message: "Bu kullanıcı adı kullanılıyor." };
  } catch (error) {
    console.log("Error: ", error);
  }

  // example update data
  const data = {
    username: username,
  };

  // update with id
  try {
    await pb.collection("users").update(id, data);
  } catch (error) {
    console.log("Error on updating: ", error);
    return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyin." };
  }

  // await deleteSessionCookie();

  return { ok: true, message: "Kullanıcı adınız başarıyla değiştirildi." };
}
