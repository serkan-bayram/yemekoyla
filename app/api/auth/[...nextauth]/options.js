import CredentialsProvider from "next-auth/providers/credentials";
import PocketBase from "pocketbase";

// TODO: does not redirect after verifying code, does not update sessions, or not???
export const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { username, password } = credentials;

        const pb = new PocketBase("http://127.0.0.1:8090");

        const authData = await pb
          .collection("users")
          .authWithPassword(username, password);

        // If no error and we have user data, return it

        // TODO: Returning all of database information is bad idea problably, fix
        // We can create a token out of this and decode it whenever we want
        if (pb.authStore.isValid) {
          return authData;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/giris",
  },
};
