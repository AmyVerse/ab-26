import { createContext, useContext } from "react";
import { useSession } from "../lib/auth-client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {
    data: session,
    isPending,
    isLoading: sessionLoading,
    error,
  } = useSession();

  const isInitialLoading = typeof session === "undefined";
  const loading = sessionLoading || isPending || isInitialLoading;

  const value = {
    session,
    user: session?.user || null,
    isAuthenticated: !!session?.user,
    isLoading: loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
