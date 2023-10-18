"use server";

import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";
import { validateVerifyCode } from "../../components/validations";
import PocketBase from "pocketbase";

export async function verifyCode(code) {
  const validation = validateVerifyCode(code);

  if (!validation) return "notValidated";

  const cookieStore = cookies();
  const token = cookieStore.get("codeToken").value;

  const secret = process.env.tokenSecret;

  const decoded = jsonwebtoken.verify(token, secret, function (err, decoded) {
    if (err) {
      return new Error(err);
    }
    return decoded;
  });

  const pb = new PocketBase("http://127.0.0.1:8090");

  const data = {
    username: "test_username",
    email: decoded.email,
    emailVisibility: true,
    password: "12345678",
    passwordConfirm: "12345678",
    name: "test",
    permission: "almostUser",
  };

  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  // const record = await pb.collection("users").create(data);

  // if (true) {
  //   await pb.collection("users").authWithPassword(decoded.email, "12345678");
  // }

  return { email: decoded.email, password: "12345678" };

  // if (decoded.code === code) {
  //   console.log(decoded);
  //   return true;
  // }

  return "falseCode";
}
