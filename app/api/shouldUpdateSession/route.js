import pb from "../../components/Functions/authAsAdmin";
import { getSession } from "../../components/Functions/getSession";
import { updateSession } from "../../components/Functions/updateSession";

export const dynamic = "force-dynamic";

// Update session if it's not up to date with db
// Problably user permission is changed or user username is changed
export async function GET() {
  const { session } = await getSession();

  if (!!session === false) {
    return Response.json({ shouldUpdate: false, notAuthenticated: true });
  }

  const user = await pb.collection("users").getOne(session.user.record.id);

  const dbUpdated = user.updated;
  const sessionUpdated = session.user.record.updated;

  if (dbUpdated > sessionUpdated) {
    const newCookie = await updateSession(user);

    return Response.json({ shouldUpdate: true, newCookie: newCookie });
  } else {
    return Response.json({ shouldUpdate: false, noNewData: true });
  }
}
