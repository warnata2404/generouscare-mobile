import { createContext, ReactNode, useEffect, useState } from "react";

import { authService } from "@/services/auth.service";

import { AuthContextType, UserProfile } from "@/types/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const session = await authService.getSession();

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          full_name: session.user.user_metadata?.full_name ?? "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const login: AuthContextType["login"] = async (payload) => {
    setLoading(true);

    try {
      const result = await authService.login(payload);

      if (result.user) {
        setUser({
          id: result.user.id,
          email: result.user.email ?? "",
          full_name: result.user.user_metadata?.full_name ?? "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const register: AuthContextType["register"] = async (payload) => {
    setLoading(true);

    try {
      await authService.register(payload);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();

    setUser(null);
  };

  const refreshProfile = async () => {
    await initializeAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
