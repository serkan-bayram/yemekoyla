import CredentialsProvider from "next-auth/providers/credentials";
import PocketBase from "pocketbase";

export const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        console.log(credentials);
        const pb = new PocketBase("http://127.0.0.1:8090");

        const authData = await pb
          .collection("users")
          .authWithPassword("serkan", "CEfqjkKDjQ7HD1F");

        // If no error and we have user data, return it
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
