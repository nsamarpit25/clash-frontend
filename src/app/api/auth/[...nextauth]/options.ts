import { LOGIN_URL } from "@/lib/apiEndPoints";
import axios from "axios";
import type { AuthOptions, ISODateString, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export type customSession = {
   user?: CustomUser;
   expires: ISODateString;
};

export type CustomUser = {
   id?: string | null;
   name?: string | null;
   email?: string | null;
   token?: string | null;
};

export const authOptions: AuthOptions = {
   pages: {
      signIn: "/login",
   },
   callbacks: {
      async jwt({ token, user }: { token: JWT; user: CustomUser | null }) {
         if (user) {
            token.user = user;
         }
         return token;
      },
      async session({
         session,
         token,
      }: {
         session: customSession;
         token: JWT;
         user: User;
      }) {
         session.user = token.user as CustomUser;
         return session;
      },
   },
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: {},
            password: {},
         },
         async authorize(credentials) {
            const { data } = await axios.post(LOGIN_URL, credentials);
            const user = data?.data;
            if (user) {
               return user;
            } else {
               return null;
            }
         },
      }),
   ],
};
