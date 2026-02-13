import { createAuthClient } from "better-auth/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const authClient = createAuthClient({
  baseURL: `${BACKEND_URL}/api/auth`,
  credentials: 'include', // Important for cross-origin cookies
  fetchOptions: {
    credentials: 'include', // Ensure cookies are sent
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
