import PocketBase from "pocketbase";

export async function authAsAdmin() {
  const pb = new PocketBase(process.env.dbURL);

  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  return pb;
}
