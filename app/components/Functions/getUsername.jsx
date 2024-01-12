import { getSession } from "./getSession";

// Returns current user's username
export async function getUsername() {
  const { session } = await getSession();
  const username = session.user.record.username;

  return username;
}
