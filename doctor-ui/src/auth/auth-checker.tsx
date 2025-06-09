import { type ReactNode, createContext, useContext } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { User } from "../api/auth";
import { Navigate } from "react-router-dom";

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
};

const AuthCtx = createContext<AuthContext>({
  user: null,
  isLoading: true,
  isError: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useCurrentUser();

  return (
    <AuthCtx.Provider value={{ user: data ?? null, isLoading, isError }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Checking login…</div>;
  if (!user) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
}
