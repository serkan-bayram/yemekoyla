"use server";

import { cookies } from "next/headers";

export async function deleteSessionCookie() {
  cookies()
    .getAll()
    .forEach((cookie) => {
      if (cookie.name.includes("next-auth")) {
        cookies().delete(cookie.name);
      }
    });
}
