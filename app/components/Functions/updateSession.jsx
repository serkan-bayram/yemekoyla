import { encode } from "next-auth/jwt";

export const updateSession = async (record) => {
  const newToken = { record };
  const newSessionToken = await encode({
    secret: process.env.NEXTAUTH_SECRET,
    token: {
      user: newToken,
    },
    maxAge: 30 * 24 * 60 * 60, // 30 days, or get the previous token's exp
  });

  return newSessionToken;
};
