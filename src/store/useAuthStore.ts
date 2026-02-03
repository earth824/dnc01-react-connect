import type { User } from '../types/user.type';
import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  uploadProfileImage: (imageUrl: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  setAuth: (user, accessToken) =>
    set({ isAuthenticated: true, user, accessToken }),
  clearAuth: () =>
    set({ isAuthenticated: false, user: null, accessToken: null }),
  uploadProfileImage: (imageUrl) =>
    set((state) => ({ user: state.user ? { ...state.user, imageUrl } : null }))
}));
