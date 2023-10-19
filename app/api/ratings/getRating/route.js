import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import PocketBase from "pocketbase";

export async function GET() {
  const session = await getServerSession(options);

  const pb = new PocketBase("http://127.0.0.1:8090");

  // Auth as admin to create user
  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  try {
    const record = await pb
      .collection("ratings")
      .getFirstListItem(`user.id="${session.user.record.id}"`);

    return Response.json({ ok: true, savedRating: record.rating });
  } catch (error) {
    console.log("Error", error);
    return Response.json({ ok: false });
  }
}
