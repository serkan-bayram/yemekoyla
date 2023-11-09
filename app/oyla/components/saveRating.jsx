"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../../components/Functions/getSession";
import { authAsAdmin } from "../../components/Functions/authAsAdmin";

export async function saveRating(prevState, formData) {
  const rating = formData.get("rating");
  const ratingId = formData.get("ratingId");
  const menuId = formData.get("menuId");

  const pb = await authAsAdmin();

  const { session } = await getSession();

  const userId = session.user.record.id;

  const data = {
    rating: rating,
    user: userId,
    menu: menuId,
  };

  // update record if it is already saved
  try {
    const record = await pb.collection("ratings").update(ratingId, data);
    revalidatePath("/oyla");
    return { message: true, isAlreadySaved: true };
  } catch (error) {
    console.log("Error on saveRating, update: ", error);
  }

  // create if not updated
  try {
    const record = await pb.collection("ratings").create(data);
    revalidatePath("/oyla");
    return { message: true };
  } catch (error) {
    console.log("Error:", error);
  }

  return { message: false };
}
