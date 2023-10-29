"use server";

import { redirect } from "next/navigation";
import { deleteSessionCookie } from "./deleteSessionCookie";

export default async function serverSideSignOut() {
  deleteSessionCookie();

  redirect("/kaydol");
}
