import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  id: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true });
        // Persist token in cookie for route guards
        if (typeof document !== "undefined") {
          document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        // Clear the cookie on logout
        if (typeof document !== "undefined") {
          document.cookie = "token=; path=/; max-age=0";
        }
      },
      initializeAuth: () => {
        // Check for token in cookie on initialization
        if (typeof document !== "undefined") {
          const cookies = document.cookie.split(";");
          const tokenCookie = cookies.find((c) =>
            c.trim().startsWith("token="),
          );
          if (tokenCookie) {
            const token = tokenCookie.split("=")[1];
            if (token && !get().isAuthenticated) {
              // Token exists but state is not authenticated - could restore from localStorage
              const stored = localStorage.getItem("auth-storage");
              if (stored) {
                try {
                  const parsed = JSON.parse(stored);
                  if (parsed.state?.token === token) {
                    set({
                      user: parsed.state.user,
                      token: token,
                      isAuthenticated: true,
                    });
                  }
                } catch {
                  // Invalid stored data
                }
              }
            }
          }
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
