import PocketBase from "pocketbase";

export async function authAsAdmin() {
  const pb = new PocketBase("https://yemek-oyla.pockethost.io/");

  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  return pb;
}
