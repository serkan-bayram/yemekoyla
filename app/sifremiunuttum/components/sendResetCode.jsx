"use server";

import randomize from "randomatic";
import jsonwebtoken from "jsonwebtoken";
import { validateEmail } from "../../components/validations";
import PocketBase from "pocketbase";
import { sendEmail } from "../../kaydol/components/sendVerifyCode";

export async function sendResetCode(email) {
  const validation = validateEmail(email);

  if (!validation) return { ok: false, message: "Geçersiz E-posta." };

  const sixDigitCode = randomize("0", 6);

  const secret = process.env.tokenSecret;

  const token = jsonwebtoken.sign(
    { code: sixDigitCode, email: email },
    secret,
    {
      expiresIn: "48h",
    }
  );

  // After sending the code, we will create a db user to save code

  const pb = new PocketBase("http://127.0.0.1:8090");

  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  // First, we check is this user already signed up
  try {
    const fetchUser = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);

    if (fetchUser) {
      if (fetchUser.permission === "almostUser") {
        return { ok: false, message: "Böyle bir kullanıcı bulunamadı." };
      }

      const data = {
        resetPasswordCode: token,
      };

      const record = await pb
        .collection("users")
        .update(`${fetchUser.id}`, data);

      const send = await sendEmail(email, sixDigitCode);

      // I don't know is this going to work.
      if (!send.messageId) {
        return { ok: false, message: "Sıfırlama kodunuz gönderilemedi." };
      }

      return { ok: true, message: "Sıfırlama kodunuz gönderildi." };
    }
  } catch (error) {
    console.log("Error on fetchUser:", error);
  }

  return { ok: false, message: "Böyle bir kullanıcı bulunamadı." };
}
