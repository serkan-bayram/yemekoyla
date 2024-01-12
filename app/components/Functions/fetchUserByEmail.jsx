import { authAsAdmin } from "./authAsAdmin";

export async function fetchUserByEmail(email) {
  const pb = await authAsAdmin();

  if (!pb || !email) {
    throw new Error("Pass pb and email to fetchUserByEmail");
  }

  const response = await pb
    .collection("users")
    .getFirstListItem(`email="${email}"`, { cache: "no-store" });

  return response;
}
