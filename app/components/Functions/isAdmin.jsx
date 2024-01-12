import { getSession } from "./getSession";

export async function isAdmin() {
  const { session } = await getSession();
  const isAdmin = session.user.record.permission === "admin";

  return isAdmin;
}
