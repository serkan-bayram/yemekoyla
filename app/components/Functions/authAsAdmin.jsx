import PocketBase from "pocketbase";

let pb;

export const revalidate = 0;

export async function authAsAdmin() {
  if (
    !!pb?.authStore?.isAdmin === false ||
    !!pb?.authStore?.isValid === false
  ) {
    pb = new PocketBase(process.env.dbURL);

    pb.autoCancellation(false);

    await pb.admins.authWithPassword(
      process.env.dbUsername,
      process.env.dbPassword,
      {
        // This will trigger auto refresh or auto reauthentication in case
        // the token has expired or is going to expire in the next 30 minutes.
        autoRefreshThreshold: 30 * 60,
      }
    );
  }

  return pb;
}
