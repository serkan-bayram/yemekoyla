"use server";

import { getSession } from "../../components/getSession";
import {
  validatePassword,
  validateUsername,
  validateVerifyCode,
} from "../../components/validations";
import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";
import { authAsAdmin } from "../../components/authAsAdmin";
import { fetchUserByEmail } from "../../components/fetchUserByEmail";

export async function createProfile(username, password, code) {
  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password);
  const codeValidation = validateVerifyCode(code);

  if (!usernameValidation)
    return { ok: false, message: "Geçersiz kullanıcı adı." };

  if (!passwordValidation) return { ok: false, message: "Geçersiz şifre." };

  if (!codeValidation) return { ok: false, message: "Geçersiz kod." };

  const { session } = await getSession();
  const id = session.user.record.id;
  const email = session.user.record.email;

  const pb = await authAsAdmin();

  // Check is username taken
  try {
    // If this line of code does not throw an error, it means username is taken
    await pb.collection("users").getFirstListItem(`username="${username}"`);

    return { ok: false, message: "Bu kullanıcı adı kullanılıyor." };
  } catch (error) {
    console.log("Error: ", error);
  }

  // validate code
  const secret = process.env.tokenSecret;

  try {
    const { verifyCode } = await fetchUserByEmail(pb, email);

    // Decode token
    const decoded = jsonwebtoken.verify(
      verifyCode,
      secret,
      function (err, decoded) {
        if (err) {
          return new Error(err);
        }
        return decoded;
      }
    );

    console.log(decoded.code, code);

    if (decoded.code !== code) return { ok: false, message: "Yanlış kod." };
  } catch (error) {
    console.log("Error:", error);
  }

  // example update data
  const data = {
    username: username,
    password: password,
    passwordConfirm: password,
    name: username,
    verifyCode: "verified",
    permission: "user",
  };

  // update with id
  try {
    await pb.collection("users").update(id, data);
  } catch (error) {
    console.log("Error on updating: ", error);
    return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyin." };
  }

  const cookieStore = cookies();
  cookieStore.delete("next-auth.session-token");

  return { ok: true, message: "Profiliniz başarıyla oluşturuldu." };
}
