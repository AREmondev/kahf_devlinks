import { authService } from "@/services/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { useCallback } from "react";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        console.log("credentials", credentials);
        try {
          console.log("credentials", credentials);
          const user = await authService.login(
            credentials.email,
            credentials.password
          );
          return user.data;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log(`${baseUrl}${url}`);
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as any;
      session.refreshToken = token.refreshToken as any;
      return session;
    },
  },

  //
  // P@ssword1

  pages: {
    signIn: "/signup",
  },
});

export { handler as GET, handler as POST };
