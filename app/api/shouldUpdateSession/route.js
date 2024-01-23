import { cookies } from "next/headers";
import pb from "../../components/Functions/authAsAdmin";
import { getSession } from "../../components/Functions/getSession";
import { updateSession } from "../../components/Functions/updateSession";

export const dynamic = "force-dynamic";

export async function GET() {
  const { session } = await getSession();

  const user = await pb.collection("users").getOne(session.user.record.id);

  const dbUpdated = user.updated;
  const sessionUpdated = session.user.record.updated;

  if (dbUpdated > sessionUpdated) {
    const newCookie = await updateSession(user);

    cookies()
      .getAll()
      .forEach((cookie) => {
        if (cookie.name.includes("next-auth.session-token")) {
          cookies().set(cookie.name, newCookie, {
            secure: true,
            httpOnly: true,
            sameSite: "Lax",
            maxAge: 30 * 24 * 60 * 60,
          });
        }
      });

    console.log("session updated");
    return Response.json({ shouldUpdate: true });
  } else {
    console.log("session is not updated");
    return Response.json({ shouldUpdate: false });
  }
}
