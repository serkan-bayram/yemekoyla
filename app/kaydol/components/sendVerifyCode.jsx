"use server";

import nodemailer from "nodemailer";
import randomize from "randomatic";
import jsonwebtoken from "jsonwebtoken";
import { validateEmail } from "../../components/Functions/validations";
import { authAsAdmin } from "../../components/Functions/authAsAdmin";
import {
  getTemporaryUsername,
  getTemporaryPassword,
} from "../../components/Functions/getTemporary";
import { fetchUserByEmail } from "../../components/Functions/fetchUserByEmail";

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

// This function sends an verify code user to complete signup
export async function sendVerifyCode(email) {
  const emailValidation = validateEmail(email);

  if (!emailValidation) return { ok: false, message: "Geçersiz E-posta." };

  const sixDigitCode = randomize("0", 6);

  const secret = process.env.tokenSecret;

  const token = jsonwebtoken.sign({ code: sixDigitCode }, secret, {
    expiresIn: "48h",
  });

  // After sending the code, we will create a db user to save code
  const pb = await authAsAdmin();

  const temporaryPassword = getTemporaryPassword();

  // First, we check is this user already signed up
  try {
    const { id, permission } = await fetchUserByEmail(email);

    console.log(id, permission);

    if (permission === "almostUser") {
      // User is signed up before so that means we will
      // send verifyCode only
      const data = {
        verifyCode: token,
        password: temporaryPassword,
        passwordConfirm: temporaryPassword,
      };

      // Update user data by user id
      await pb.collection("users").update(`${id}`, data);

      // TODO: need to catch error here
      const send = await sendEmail(email, sixDigitCode);

      if (!send.messageId) {
        return { ok: false, message: "Doğrulama kodu gönderilemedi." };
      }

      return { ok: true, email: email, password: temporaryPassword };
    }

    return { ok: false, message: "Bu kullanıcı zaten kayıtlı." };
  } catch (error) {
    console.log("Error on sendVerifyCode:", error);
  }

  try {
    // Create user for the first time
    const temporaryUsername = getTemporaryUsername();

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

    await pb.collection("users").create(data);

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
