"use server";

import nodemailer from "nodemailer";
import randomize from "randomatic";
import jsonwebtoken from "jsonwebtoken";
import { validateEmail } from "../../components/validations";
import PocketBase from "pocketbase";

export async function sendEmail(email, sixDigitCode) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Yemekhane Puanla" <yp@noreply.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Yemekhane Puanla | Onay Kodu", // Subject line
    text: `Kodunuz: ${sixDigitCode}`, // plain text body
    html: `Kodunuz: ${sixDigitCode}`, // html body
  });

  return info;
}

export async function sendVerifyCode(email) {
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
  const temporaryPassword = randomize("aA0!", 32);

  // First, we check is this user already signed up
  try {
    const fetchUser = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);

    if (fetchUser) {
      if (fetchUser.permission === "almostUser") {
        const data = {
          verifyCode: token,
          password: temporaryPassword,
          passwordConfirm: temporaryPassword,
        };

        const record = await pb
          .collection("users")
          .update(`${fetchUser.id}`, data);

        const send = await sendEmail(email, sixDigitCode);

        // I don't know is this going to work.
        if (!send.messageId) {
          return { ok: false, message: "Doğrulama kodu gönderilemedi." };
        }

        return { ok: true, email: email, password: temporaryPassword };
      }

      return { ok: false, message: "Bu kullanıcı zaten kayıtlı." };
    }
  } catch (error) {
    console.log("Error on fetchUser:", error);
  }

  try {
    // Create user
    const temporaryUsername = randomize("aA0", 32);
    const data = {
      username: temporaryUsername,
      email: email,
      emailVisibility: true,
      password: temporaryPassword,
      passwordConfirm: temporaryPassword,
      name: temporaryUsername,
      permission: "almostUser",
      verifyCode: token,
    };

    const record = await pb.collection("users").create(data);

    const send = await sendEmail(email, sixDigitCode);

    // I don't know is this going to work.
    if (!send.messageId) {
      return { ok: false, message: "Doğrulama kodu gönderilemedi." };
    }
  } catch (error) {
    console.log("Error:", error);
    return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyin." };
  }

  return { ok: true, email: email, password: temporaryPassword };
}
