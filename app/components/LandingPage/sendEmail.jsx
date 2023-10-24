"use server";

import nodemailer from "nodemailer";
import {
  validateMessage,
  validateUserEmail,
} from "../../components/validations";

export async function sendEmail({ userEmail, userMessage }) {
  const userEmailValidation = validateUserEmail(userEmail);
  const userMessageValidation = validateMessage(userMessage);

  if (!userEmailValidation.ok)
    return { ok: false, message: userEmailValidation.message };
  if (!userMessageValidation.ok)
    return { ok: false, message: userMessageValidation.ok };

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
    to: `serkanbayramdesign@gmail.com`, // list of receivers
    subject: "Yemekhane Puanla | Mesaj", // Subject line
    text: `Gönderen: ${userEmail}
    Mesaj: ${userMessage}`, // plain text body
    html: `Gönderen: ${userEmail}
    Mesaj: ${userMessage}`, // html body
  });

  // I don't know is this going to work.
  if (!info.messageId) {
    return { ok: false, message: "Mesajınız gönderilemedi." };
  }

  return { ok: true, message: "Mesajınız gönderildi!" };
}
