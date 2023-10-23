"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../../components/getSession";
import PocketBase from "pocketbase";

export async function saveRating(prevState, formData) {
  const rating = formData.get("rating") || 0;
  const { session } = await getSession();
  const userId = session.user.record.id;

  // Create pocketbase instance
  const pb = new PocketBase("http://127.0.0.1:8090");

  // Auth as admin
  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  let isAlreadySaved = false;
  // Will update according to this id
  let recordId;
  try {
    // This throws an error if nothing is found
    const record = await pb
      .collection("ratings")
      .getFirstListItem(`user.id="${userId}"`);
    recordId = record.id;
    isAlreadySaved = true;
  } catch (error) {
    isAlreadySaved = false;
    console.log("Error:", error.response.message);
  }

  // example create data
  const data = {
    rating: rating,
    user: session.user.record.id,
  };

  revalidatePath("/oyla");

  // update record if it is already saved
  if (isAlreadySaved) {
    try {
      const record = await pb.collection("ratings").update(`${recordId}`, data);
      return { message: true };
    } catch (error) {
      console.log("Error: ", error);
    }
  } else {
    try {
      const record = await pb.collection("ratings").create(data);
      return { message: true };
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return { message: false };
}
