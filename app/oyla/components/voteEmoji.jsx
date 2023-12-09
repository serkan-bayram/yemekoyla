"use server";

import { revalidatePath } from "next/cache";
import { authAsAdmin } from "../../components/Functions/authAsAdmin";
import { getSession } from "../../components/Functions/getSession";

export async function voteEmoji(ratingId, emoji) {
  const pb = await authAsAdmin();

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
