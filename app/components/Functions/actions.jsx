"use server";

import pb from "./authAsAdmin";
import { getSession } from "./getSession";
import { updateSession } from "./updateSession";
import { cookies } from "next/headers";
import {
  validatePassword,
  validateUsername,
  validateVerifyCode,
  validateEmail,
} from "./validations";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import randomize from "randomatic";
import jsonwebtoken from "jsonwebtoken";
import { getTemporaryUsername, getTemporaryPassword } from "./getTemporary";
import { fetchUserByEmail } from "./fetchUserByEmail";
import { getRatings } from "./getRatings";
import { getMenu } from "./getMenu";
import AES from "crypto-js/aes";

// bu fonksiyonların hepsini diğer fonksiyonlardan kaldır
// export değiştir isim değiştir bir de öyle dene

export async function initActions() {}

export async function getAdminClient() {
  return pb;
}

export async function saveAnnouncement({ title, announcement, expires_at }) {
  // Current date and time
  const currentDate = new Date();

  // Add expires_at minutes to the current date
  const futureDate = new Date(currentDate.getTime() + expires_at * 60000); // 30 minutes in milliseconds

  // Format the date to the desired string format
  const formattedDate = futureDate.toISOString().slice(0, 23) + "Z";

  const data = {
    title: title,
    announcement: announcement,
    expires_at: formattedDate,
  };

  try {
    const record = await pb.collection("announcements").create(data);
  } catch (error) {
    return { message: false };
  }

  return { message: true };
}

export async function changePassword(password) {
  const passwordValidation = validatePassword(password);

  if (!passwordValidation) return { ok: false, message: "Geçersiz şifre." };

  const { session } = await getSession();
  const id = session.user.record.id;

  // example update data
  const data = {
    password: password,
    passwordConfirm: password,
  };

  // update with id
  try {
    await pb.collection("users").update(id, data);
  } catch (error) {
    console.log("Error on updating: ", error);
    return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyin." };
  }

  return { ok: true, message: "Şifreniz başarıyla değiştirildi." };
}

export async function changeUsername(username) {
  const usernameValidation = validateUsername(username);

  if (!usernameValidation)
    return { ok: false, message: "Geçersiz kullanıcı adı." };

  const { session } = await getSession();
  const id = session.user.record.id;

  // Check is username taken
  try {
    // If this line of code does not throw an error, it means username is taken
    const record = await pb
      .collection("users")
      .getFirstListItem(`username="${username}"`);

    return { ok: false, message: "Bu kullanıcı adı kullanılıyor." };
  } catch (error) {
    console.log("Error: ", error);
  }

  // example update data
  const data = {
    username: username,
  };

  // update with id
  try {
    const record = await pb.collection("users").update(id, data);

    const newCookie = await updateSession(record);

    cookies()
      .getAll()
      .forEach((cookie) => {
        if (cookie.name.includes("next-auth.session-token")) {
          cookies().set(cookie.name, newCookie, {
            secure: true,
            httpOnly: true,
            sameSite: "Lax",
            maxAge: 30 * 24 * 60 * 60,
          });
        }
      });
  } catch (error) {
    console.log("Error on updating: ", error);
    return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyin." };
  }

  return {
    ok: true,
    message: "Kullanıcı adınız başarıyla değiştirildi!",
  };
}

export async function deleteSessionCookie() {
  cookies()
    .getAll()
    .forEach((cookie) => {
      if (cookie.name.includes("next-auth")) {
        cookies().delete(cookie.name);
      }
    });
}

export async function saveComment(comment, ratingId, selectedGif) {
  const data = {
    comment: comment,
    gif: selectedGif.length > 0 ? selectedGif : null,
  };

  try {
    await pb.collection("ratings").update(ratingId, data);

    revalidatePath("/oyla");

    return { ok: true, message: "Yorumunuz başarıyla kaydedildi." };
  } catch (error) {
    console.log("Error: ", error);
  }

  return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyiniz." };
}

export async function searchGif(query) {
  const api_key = process.env.gif_api_key;

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=20`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json(); // for JSON response

  if (data.data.length > 0) {
    return { ok: true, data: data };
  } else {
    return { ok: false, message: "gifNotFound" };
  }
}

export async function serverSideSignOut() {
  deleteSessionCookie();

  redirect("/kaydol");
}

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

// We need to check did user saved a rating before
export async function saveRating(isAnonim, selectedGif, comment, starRating) {
  // User can not save a rating if he has not have an starRating
  if (starRating <= 0 || !!starRating === false) {
    return { message: false, notRated: true };
  }

  const { session } = await getSession();

  const userId = session.user.record.id;

  const menu = await getMenu();

  const data = {
    rating: starRating || null,
    gif: selectedGif || null,
    comment: comment || null,
    user: userId,
    menu: menu.id,
    isAnonim: isAnonim,
  };

  try {
    // if this does not throw an error, user has rated before
    const ratings = await getRatings(menu);

    const record = await pb.collection("ratings").update(ratings.id, data);

    revalidatePath("/oyla");
    return { message: true, isAlreadySaved: true };
  } catch (error) {
    console.log("Error:", error);
  }

  try {
    const record = await pb.collection("ratings").create(data);
    revalidatePath("/oyla");
    return { message: true };
  } catch (error) {
    console.log("Error:", error);
  }

  return { message: false };
}

export async function deleteEmoji(ratingId) {
  const { session } = await getSession();

  const userId = session.user.record.id;

  try {
    const record = await pb
      .collection("emojis")
      .getFullList(`userId="${userId}"`, {
        filter: `userId="${userId}" && ratingId="${ratingId}"`,
      });

    await pb.collection("emojis").delete(record[0].id);
    revalidatePath("/oyla");
    return { message: true };
  } catch (error) {
    console.log("Error on deleteEmoji: ", error);
  }

  return { message: false };
}

export async function voteEmoji(ratingId, emoji) {
  const { session } = await getSession();

  const userId = session.user.record.id;

  const data = {
    ratingId: ratingId,
    userId: userId,
    emoji: emoji,
  };

  // is it voted already
  try {
    const record = await pb
      .collection("emojis")
      .getFullList(`userId="${userId}"`, {
        filter: `userId="${userId}" && ratingId="${ratingId}"`,
      });

    await pb.collection("emojis").update(record[0].id, data);

    revalidatePath("/oyla");
    return { message: true, isAlreadySaved: true };
  } catch (error) {
    console.log("Error on voteEmoji, update: ", error);
  }

  try {
    const record = await pb.collection("emojis").create(data);
    revalidatePath("/oyla");
    return { message: true };
  } catch (error) {
    console.log("Error:", error);
  }

  return { message: false };
}

export async function createProfile(username, password, code) {
  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password);
  const codeValidation = validateVerifyCode(code);

  if (!usernameValidation)
    return { ok: false, message: "Geçersiz kullanıcı adı." };

  if (!passwordValidation) return { ok: false, message: "Geçersiz şifre." };

  if (!codeValidation) return { ok: false, message: "Geçersiz kod." };

  const { session } = await getSession();
  const id = session.user.record.id;
  const email = session.user.record.email;

  // Check is username taken
  try {
    // If this line of code does not throw an error, it means username is taken
    await pb.collection("users").getFirstListItem(`username="${username}"`);

    return { ok: false, message: "Bu kullanıcı adı kullanılıyor." };
  } catch (error) {
    console.log("Error: ", error);
  }

  // validate code
  const secret = process.env.tokenSecret;

  try {
    const { verifyCode } = await fetchUserByEmail(pb, email);

    // Decode token
    const decoded = jsonwebtoken.verify(
      verifyCode,
      secret,
      function (err, decoded) {
        if (err) {
          return new Error(err);
        }
        return decoded;
      }
    );

    console.log(decoded.code, code);

    if (decoded.code !== code) return { ok: false, message: "Yanlış kod." };
  } catch (error) {
    console.log("Error:", error);
  }

  // example update data
  const data = {
    username: username,
    password: password,
    passwordConfirm: password,
    name: username,
    verifyCode: "verified",
    permission: "user",
  };

  // update with id
  try {
    const record = await pb.collection("users").update(id, data);

    const newCookie = await updateSession(record);

    cookies()
      .getAll()
      .forEach((cookie) => {
        if (cookie.name.includes("next-auth.session-token")) {
          cookies().set(cookie.name, newCookie, {
            secure: true,
            httpOnly: true,
            sameSite: "Lax",
            maxAge: 30 * 24 * 60 * 60,
          });
        }
      });
  } catch (error) {
    console.log("Error on updating: ", error);
    return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyin." };
  }

  return {
    ok: true,
    message: "Profiliniz başarıyla oluşturuldu! Yönlendiriliyorsunuz.",
  };
}

export async function resetPassword(email, code, password) {
  const emailValidation = validateEmail(email);
  if (!emailValidation) return { ok: false, message: "Geçersiz E-Posta." };

  const codeValidation = validateVerifyCode(code);
  if (!codeValidation) return { ok: false, message: "Geçersiz E-Posta." };

  const passwordValidation = validatePassword(password);
  if (!passwordValidation) return { ok: false, message: "Geçersiz Şifre." };

  const secret = process.env.tokenSecret;

  try {
    const { id, resetPasswordCode } = await fetchUserByEmail(email);

    const decoded = jsonwebtoken.verify(
      resetPasswordCode,
      secret,
      function (err, decoded) {
        if (err) {
          return new Error(err);
        }
        return decoded;
      }
    );

    if (decoded.code !== code) return { ok: false, message: "Yanlış kod." };

    const data = {
      password: password,
      passwordConfirm: password,
      resetPasswordCode: "",
    };

    await pb.collection("users").update(`${id}`, data);

    return { ok: true, message: "Şifreniz Sıfırlandı." };
  } catch (error) {
    console.log("Error on resetPassword:", error);
  }

  return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyiniz." };
}

export async function sendPasswordResetCode(email) {
  const emailValidation = validateEmail(email);

  if (!emailValidation) return { ok: false, message: "Geçersiz E-posta." };

  const sixDigitCode = randomize("0", 6);

  const secret = process.env.tokenSecret;

  const token = jsonwebtoken.sign({ code: sixDigitCode }, secret, {
    expiresIn: "48h",
  });

  // After sending the code, we will create a db user to save code

  // First, we check is this user already signed up
  try {
    const { id, permission } = await fetchUserByEmail(email);

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

export async function changePermission(formData) {
  const id = formData.get("userId");

  const record = await pb.collection("users").getOne(id);

  try {
    if (record.permission !== "banned") {
      const data = {
        permission: "banned",
      };

      await pb.collection("users").update(id, data);
    } else {
      const data = {
        permission: "user",
      };

      await pb.collection("users").update(id, data);
    }
  } catch (error) {
    console.log("Can't change permission: ", error);
    return;
  }

  revalidatePath("/admin");
}

export async function verifyTelegram(telegramCode) {
  const { session } = await getSession();

  let telegramBindingCode;
  try {
    const record = await pb
      .collection("users")
      .getFirstListItem(`id="${session.user.record.id}"`);

    telegramBindingCode = record.telegramBindingCode;
  } catch (error) {
    console.log(error);
    return { error: "somethingWentWrong" };
  }

  if (telegramBindingCode === telegramCode) {
    const data = {
      isTelegramVerified: true,
    };
    try {
      await pb.collection("users").update(session.user.record.id, data);
      revalidatePath("/telegram");
      return { isSucess: true };
    } catch (error) {
      return { error: "somethingWentWrong" };
    }
  } else {
    return { error: "wrongCode" };
  }
}

export async function deleteRating(rating) {
  const ratingId = rating.id;

  try {
    const response = await pb.collection("ratings").delete(ratingId);
    revalidatePath("/profilim");
    return { success: "ratingDeleted" };
  } catch (error) {
    console.log("error on deleteRating: ", error);
    return { error: "cantDeleteRating" };
  }
}

export async function saveAvatar(data) {
  try {
    const { session } = await getSession();
    const userId = session.user.record.id;

    const response = await pb.collection("users").update(userId, data);

    revalidatePath("/profilim");
    return { success: "avatarSaved" };
  } catch (error) {
    console.log("error on saveAvatar: ", error);
    return { error: "somethingWentWrong" };
  }
}

export async function saveSchoolId(schoolId) {
  const { session } = await getSession();

  const isTelegramVerified = !!session.user.record.isTelegramVerified;

  if (!isTelegramVerified) {
    return { error: "noTelegram" };
  }

  const data = {
    telegram_id: session.user.record.telegramId,
    school_id: schoolId,
    user: session.user.record.id,
  };

  try {
    const record = await pb
      .collection("balance")
      .getFirstListItem(`user="${session.user.record.id}"`);

    await pb.collection("balance").update(record.id, data);
    return { success: "updated" };
  } catch (error) {}

  try {
    const record = await pb.collection("balance").create(data);
    return { success: "connected" };
  } catch (error) {
    console.log("Error on saveSofraInfo: ", error);
  }
}
