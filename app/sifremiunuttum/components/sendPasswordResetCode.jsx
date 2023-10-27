"use server";

import randomize from "randomatic";
import jsonwebtoken from "jsonwebtoken";
import { validateEmail } from "../../components/validations";
import { sendEmail } from "../../kaydol/components/sendVerifyCode";
import { authAsAdmin } from "../../components/authAsAdmin";
import { fetchUserByEmail } from "../../components/fetchUserByEmail";

export async function sendPasswordResetCode(email) {
  const emailValidation = validateEmail(email);

  if (!emailValidation) return { ok: false, message: "Geçersiz E-posta." };

  const sixDigitCode = randomize("0", 6);

  const secret = process.env.tokenSecret;

  const token = jsonwebtoken.sign({ code: sixDigitCode }, secret, {
    expiresIn: "48h",
  });

  // After sending the code, we will create a db user to save code

  const pb = await authAsAdmin();

  // First, we check is this user already signed up
  try {
    const { id, permission } = await fetchUserByEmail(pb, email);

    if (permission === "almostUser") {
      return { ok: false, message: "Böyle bir kullanıcı bulunamadı." };
    }

    const data = {
      resetPasswordCode: token,
    };

    await pb.collection("users").update(`${id}`, data);

    const send = await sendEmail(email, sixDigitCode);

    if (!send.messageId) {
      return { ok: false, message: "Sıfırlama kodunuz gönderilemedi." };
    }

    return { ok: true, message: "Sıfırlama kodunuz gönderildi." };
  } catch (error) {
    console.log("Error on fetchUser:", error);
  }

  return { ok: false, message: "Böyle bir kullanıcı bulunamadı." };
}
