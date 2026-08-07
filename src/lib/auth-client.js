import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "", // Let Next.js API rewrites handle proxying to the backend
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
