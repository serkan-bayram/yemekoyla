import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { authAsAdmin } from "../../../components/Functions/authAsAdmin";

export async function GET() {
  const session = await getServerSession(options);

  const pb = await authAsAdmin();

  try {
    const record = await pb
      .collection("ratings")
      .getFirstListItem(`user.id="${session.user.record.id}"`);

    return Response.json({ ok: true, savedRating: record.rating });
  } catch (error) {
    console.log("There is a problem in getRating route.");
    return Response.json({ ok: false });
  }
}
