import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider  from 'next-auth/providers/facebook'

import { prisma } from "../../../server/db";
import { env } from "../../../env/server.mjs";


export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
      // tslint:disable-next-line (for vercel build)
  //@ts-ignore
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
       
      }
      if(session.user && user.role) {
        session.user.role = user.role
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth"
      },
  providers: [
    GoogleProvider({
   
      clientId: env.CLIENT_ID,
      clientSecret: env.CLIENT_SECRET
    }),
    
    FacebookProvider({
  
      clientId: env.APP_ID,
      clientSecret: env.APP_SECRET
    }),

 
  ],


};

export default NextAuth(authOptions);
