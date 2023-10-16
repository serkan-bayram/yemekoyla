import nodemailer from "nodemailer";
import randomize from "randomatic";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  const res = await request.json();

  const { email } = res;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  const sixDigitCode = randomize("0", 6);

  const info = await transporter.sendMail({
    from: '"Yemekhane Puanla" <yp@noreply.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Yemekhane Puanla | Onay Kodu", // Subject line
    text: `Kodunuz: ${sixDigitCode}`, // plain text body
    html: `Kodunuz: ${sixDigitCode}`, // html body
  });

  // I don't know is this going to work.
  if (!info.messageId) {
    return new Error("Email has not been send.");
  }

  const secret = process.env.tokenSecret;
  const token = jsonwebtoken.sign({ code: sixDigitCode }, secret, {
    expiresIn: "1h",
  });

  cookies().set("codeToken", `${token}`);

  return Response.json(info);
}
