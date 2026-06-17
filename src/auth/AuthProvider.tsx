import { useEffect, useState, type ReactNode } from "react";
import { getAccessToken, isAuthenticated } from "./auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: isAuthenticated(),
    isLoading: true,
  });

  useEffect(() => {
    const syncAuthState = () => {
      setAuthState({
        isAuthenticated: isAuthenticated(),
        isLoading: false,
      });
    };

    syncAuthState();
    window.addEventListener("auth:change", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("auth:change", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}
