"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../../components/Functions/getSession";
import { authAsAdmin } from "../../components/Functions/authAsAdmin";
import { getRatings } from "../../components/Functions/getRatings";
import { getMenu } from "../../components/Functions/getMenu";
import { cookies } from "next/headers";

// We need to check did user saved a rating before
export async function saveRating(
  rating,
  selectedGif,
  comment,
  starRating,
  currentUser,
  menuId
) {
  // User can not save a rating if he has not have an starRating
  if (starRating <= 0) {
    return { message: false, notRated: true };
  }

  const pb = await authAsAdmin();

  const { session } = await getSession();

  const userId = session.user.record.id;

  const menu = await getMenu(pb);

  const data = {
    rating: starRating || null,
    gif: selectedGif || null,
    comment: comment || null,
    user: userId,
    menu: menu.id,
  };

  try {
    // if this does not throw an error, user has rated before
    const ratings = await getRatings(pb, currentUser, menu);

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
