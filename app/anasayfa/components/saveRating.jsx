"use server";

import { getSession } from "../../components/getSession";
import PocketBase from "pocketbase";

export async function saveRating(FormData) {
  const { rating } = Object.fromEntries(FormData);
  const { session } = await getSession();
  // Create pocketbase instance
  const pb = new PocketBase("http://127.0.0.1:8090");

  // Auth as admin to create user
  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  // update data if it's already saved

  // example create data
  const data = {
    rating: rating,
    user: session.user.record.id,
  };

  try {
    const record = await pb.collection("ratings").create(data);
  } catch (error) {
    console.log("Error:", error);
  }
}
