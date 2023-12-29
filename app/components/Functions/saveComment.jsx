"use server";

import { revalidatePath } from "next/cache";
import { authAsAdmin } from "./authAsAdmin";

export async function saveComment(comment, ratingId, selectedGif) {
  const pb = await authAsAdmin();

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
