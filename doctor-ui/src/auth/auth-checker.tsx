import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { User } from "../api/auth";
import { Navigate } from "react-router-dom";

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthCtx = createContext<AuthContext>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  isError: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useCurrentUser();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setUser(data ?? null);
      setLoading(false);
    }
  }, [isLoading, data]);

  // demo login fn
  async function login(email: string, password: string) {
    setLoading(true);
    // simulate network delay
    await new Promise((r) => setTimeout(r, 500));

    // 👉 replace this block with your real API call
    if (email === "test@gmail.com" && password === "admin") {
      const fakeUser: User = {
        id: "demo-1",
        name: "Demo User",
        email: "demo@example.com",
      };
      setUser(fakeUser);
      // if you have a real /me endpoint, you can:
      // await refetch()
    } else {
      throw new Error("Invalid credentials");
    }

    setLoading(false);
  }

  function logout() {
    setUser(null);
    // clear tokens, cookies, etc.
  }

  return (
    <AuthCtx.Provider
      value={{ user, isLoading: loading, login, logout, isError }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  //const { user, isLoading } = useAuth();
  //if (isLoading) return <div>Checking login…</div>;
  //if (!user) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
}
