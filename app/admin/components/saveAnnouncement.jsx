"use server";

import { authAsAdmin } from "../../components/Functions/authAsAdmin";

export async function saveAnnouncement({ title, announcement, expires_at }) {
  const pb = await authAsAdmin();

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
