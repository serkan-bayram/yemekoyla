"use server";

import { revalidatePath } from "next/cache";
import { authAsAdmin } from "./authAsAdmin";

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
    return { ok: false, message: "Gif Bulunamadı." };
  }
}
