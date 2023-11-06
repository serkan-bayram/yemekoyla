"use server";

import { getSession } from "../../components/Functions/getSession";
import {
  validatePassword,
  validateUsername,
  validateVerifyCode,
} from "../../components/Functions/validations";
import jsonwebtoken from "jsonwebtoken";
import { authAsAdmin } from "../../components/Functions/authAsAdmin";
import { fetchUserByEmail } from "../../components/Functions/fetchUserByEmail";
import { updateSession } from "../../components/Functions/updateSession";
import { cookies } from "next/headers";

export async function createProfile(username, password, code) {
  const _cookies = cookies();

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
    const record = await pb.collection("users").update(id, data);

    const newCookie = await updateSession(record);

    cookies()
      .getAll()
      .forEach((cookie) => {
        if (cookie.name.includes("__Secure-next-auth.session-token")) {
          console.log(cookie.name);
          cookies().set(cookie.name, "saassaaas");
        }
      });
  } catch (error) {
    console.log("Error on updating: ", error);
    return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyin." };
  }

  return {
    ok: true,
    message: "Profiliniz başarıyla oluşturuldu! Yönlendiriliyorsunuz.",
  };
}
