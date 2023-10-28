"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function serverSideSignOut() {
  const cookieStore = cookies();

  cookieStore.delete("next-auth.session-token");

  redirect("/kaydol");
}
