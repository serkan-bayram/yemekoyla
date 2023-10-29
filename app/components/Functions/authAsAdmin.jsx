import PocketBase from "pocketbase";

export async function authAsAdmin() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_pockethost_url);

  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  return pb;
}
