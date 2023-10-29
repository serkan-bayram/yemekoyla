import { cookies } from "next/headers";

export function deleteSessionCookie() {
  const cookieStore = cookies();
  const isLocal = cookieStore.has("next-auth.session-token");
  if (isLocal) cookieStore.delete("next-auth.session-token");
  // production
  const isProd = cookieStore.has("__Secure-next-auth.session-token");
  if (isProd) cookieStore.delete("__Secure-next-auth.session-token");
}
