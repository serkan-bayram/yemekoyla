"use server";

import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";
import { validateVerifyCode } from "../../components/validations";

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

  if (decoded.code === code) {
    return true;
  }

  return "falseCode";
}
