import { cookies } from "next/headers";

export function deleteSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete("next-auth.session-token");
}
