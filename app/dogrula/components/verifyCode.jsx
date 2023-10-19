"use server";

import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";
import { validateVerifyCode } from "../../components/validations";
import randomize from "randomatic";
import PocketBase from "pocketbase";

export async function verifyCode(code) {
  const validation = validateVerifyCode(code);

  // Validate the user input before continuing
  if (!validation) return { ok: false, error: "Geçersiz kod." };

  // Get token
  const cookieStore = cookies();
  const token = cookieStore.get("codeToken").value;

  const secret = process.env.tokenSecret;

  // Decode token
  const decoded = jsonwebtoken.verify(token, secret, function (err, decoded) {
    if (err) {
      return new Error(err);
    }
    return decoded;
  });

  // Check is input code correct
  if (decoded.code !== code) return { ok: false, error: "Yanlış kod." };

  // Create pocketbase instance
  const pb = new PocketBase("http://127.0.0.1:8090");

  // Auth as admin to create user
  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  // First, we check is this user already signed up
  try {
    const fetchUser = await pb
      .collection("users")
      .getFirstListItem(`email="${decoded.email}"`);
    if (fetchUser) {
      return { ok: false, error: "Bu kullanıcı zaten kayıtlı." };
    }
  } catch (error) {
    console.log("Error:", error);
  }

  // User's data
  // Maybe we should use jwt token to sign password
  const temporaryPassword = randomize("aA0!", 32);
  const temporaryUsername = randomize("aA0", 32);
  const data = {
    username: temporaryUsername,
    email: decoded.email,
    emailVisibility: true,
    password: temporaryPassword,
    passwordConfirm: temporaryPassword,
    name: temporaryUsername,
    permission: "almostUser",
  };

  try {
    // Create user
    const record = await pb.collection("users").create(data);
  } catch (error) {
    console.log("Error:", error);
    return { ok: false, error: "Başarısız işlem, lütfen tekrar deneyin." };
  }

  cookieStore.delete("codeToken");
  return { email: decoded.email, password: temporaryPassword };
}
