"use server";

import { revalidatePath } from "next/cache";
import { authAsAdmin } from "../../components/Functions/authAsAdmin";
import { getSession } from "../../components/Functions/getSession";

export async function deleteEmoji(ratingId) {
  const pb = await authAsAdmin();

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
