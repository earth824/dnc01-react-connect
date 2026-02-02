import type { User } from '../types/user.type';
import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (user: User) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (user) => set({ isAuthenticated: true, user }),
  clearAuth: () => set({ isAuthenticated: false, user: null })
}));
