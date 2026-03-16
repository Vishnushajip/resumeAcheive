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

      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });

      },
      initializeAuth: () => {


      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
