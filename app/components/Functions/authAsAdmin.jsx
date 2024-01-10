import PocketBase from "pocketbase";

export async function authAsAdmin() {
  const pb = new PocketBase(process.env.dbURL);

  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  return pb;
}

// const pb = new PocketBase(process.env.dbURL);

// await pb.admins.authWithPassword(
//   process.env.dbUsername,
//   process.env.dbPassword,
//   {
//     // This will trigger auto refresh or auto reauthentication in case
//     // the token has expired or is going to expire in the next 30 minutes.
//     autoRefreshThreshold: 30 * 60,
//   }
// );

// export default pb;
