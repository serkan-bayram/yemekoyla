"use server";

import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";

export async function verifyCode(formData) {
  const inputValue = Object.fromEntries(formData); // this works

  const { code } = inputValue;

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
    console.log("authenticated!");
  }
}
