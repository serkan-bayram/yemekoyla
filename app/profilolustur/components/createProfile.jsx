"use server";

import { getSession } from "../../components/getSession";
import {
  validatePassword,
  validateUsername,
  validateVerifyCode,
} from "../../components/validations";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";

export async function createProfile(username, password, code) {
  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password);
  const codeValidation = validateVerifyCode(code);

  if (!usernameValidation)
    return { ok: false, error: "Geçersiz kullanıcı adı." };

  if (!passwordValidation) return { ok: false, error: "Geçersiz şifre." };

  if (!codeValidation) return { ok: false, error: "Geçersiz kod." };

  const { session } = await getSession();

  // Create pocketbase instance
  const pb = new PocketBase("http://127.0.0.1:8090");

  // Auth as admin to create user
  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  try {
    const isUsernameTaken = await pb
      .collection("users")
      .getFirstListItem(`username="${username}"`);

    if (isUsernameTaken) {
      return { ok: false, error: "Bu kullanıcı adı kullanılıyor." };
    }
  } catch (error) {
    console.log("Error: ", error);
  }

  // validate code

  const secret = process.env.tokenSecret;
  const email = session.user.record.email;

  let dbCode;
  try {
    const fetchUser = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);

    if (fetchUser) {
      dbCode = fetchUser.verifyCode;

      // Decode token
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

      if (decoded.code !== code) return { ok: false, error: "Yanlış kod." };
    }
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
    const record = await pb
      .collection("users")
      .update(session.user.record.id, data);
  } catch (error) {
    console.log("Error on updating: ", error);
    return { ok: false, error: "Başarısız işlem, lütfen tekrar deneyin." };
  }

  const cookieStore = cookies();
  cookieStore.delete("next-auth.session-token");

  return { ok: true };
}
