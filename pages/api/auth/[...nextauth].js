import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/middleware/database";
import { compare } from "bcrypt";
import { findUserByEmail } from "../../../lib/db/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await findUserByEmail(credentials.email);

        if (!user) {
          throw new Error("Email not found");
        }

        const verifyPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!verifyPassword) {
          throw new Error("Wrong password");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.SECRET,

  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },

  debug: true,
  secret: process.env.SECRET,
});
