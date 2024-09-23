import type { NextAuthConfig } from "next-auth";
import GoogleCredentials from "next-auth/providers/google";

export const authConfig = {
  trustHost: true,
  providers: [
    GoogleCredentials({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
