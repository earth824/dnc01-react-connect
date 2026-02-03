import type { User } from '../pages/LoginPage';
import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;

  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
  uploadImage: (imageUrl: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: (accessToken, user) =>
    set({ accessToken, user, isAuthenticated: true }),
  clearAuth: () =>
    set({ user: null, accessToken: null, isAuthenticated: false }),
  uploadImage: (imageUrl) =>
    set((state) => ({ user: state.user ? { ...state.user, imageUrl } : null }))
}));
