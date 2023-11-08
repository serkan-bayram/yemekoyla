"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { authAsAdmin } from "./authAsAdmin";
import { getSession } from "./getSession";
import { updateSession } from "./updateSession";
import { cookies } from "next/headers";

export async function saveComment(comment) {
  const { session } = await getSession();

  const userId = session.user.record.id;

  const pb = await authAsAdmin();

  let recordId;
  try {
    // This throws an error if nothing is found
    const record = await pb
      .collection("ratings")
      .getFirstListItem(`user.id="${userId}"`);
    recordId = record.id;
  } catch (error) {
    console.log("Error:", error);
  }

  const data = {
    comment: comment,
  };

  try {
    await pb.collection("ratings").update(recordId, data);

    revalidateTag("comment");

    return { ok: true, message: "Yorumunuz başarıyla kaydedildi." };
  } catch (error) {
    console.log("Error: ", error);
  }

  return { ok: false, message: "Başarısız işlem, lütfen tekrar deneyiniz." };
}
