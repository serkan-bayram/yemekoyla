"use server";

import jsonwebtoken from "jsonwebtoken";
import { validateVerifyCode } from "../../components/validations";
import randomize from "randomatic";
import PocketBase from "pocketbase";
import { getSession } from "../../components/getSession";
import { cookies } from "next/headers";

export async function verifyCode(code) {
  const validation = validateVerifyCode(code);

  // Validate the user input before continuing
  if (!validation) return { ok: false, message: "Geçersiz kod." };

  const secret = process.env.tokenSecret;

  const { session } = await getSession();

  const email = session.user.record.email;

  // Create pocketbase instance
  const pb = new PocketBase("http://127.0.0.1:8090");

  // Auth as admin to create user
  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  // First, we check is this user already signed up
  let dbCode;
  let recordId;
  try {
    const fetchUser = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);

    if (fetchUser) {
      dbCode = fetchUser.verifyCode;
      recordId = fetchUser.id;

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

      if (decoded.code !== code) return { ok: false, message: "Yanlış kod." };
    }
  } catch (error) {
    console.log("Error:", error);
  }

  const temporaryPassword = randomize("aA0!", 32);

  const data = {
    permission: "almostUser",
    password: temporaryPassword,
    passwordConfirm: temporaryPassword,
    verifyCode: "verified",
  };

  try {
    const record = await pb.collection("users").update(`${recordId}`, data);
  } catch (error) {
    console.log("Error: ", error);
    return { ok: false, message: "Başarısız işlem." };
  }

  const cookieStore = cookies();
  cookieStore.delete("next-auth.session-token");

  return { email: email, password: temporaryPassword };
}
