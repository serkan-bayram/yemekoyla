import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export async function getSession() {
  const session = await getServerSession(options);

  const permission = session?.user.record.permission || null;

  return { session, permission };
}
