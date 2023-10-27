export async function fetchUserByEmail(pb, email) {
  if (!pb || !email) {
    throw new Error("Pass pb and email to fetchUserByEmail");
  }

  const response = await pb
    .collection("users")
    .getFirstListItem(`email="${email}"`, { cache: "no-store" });

  return response;
}
