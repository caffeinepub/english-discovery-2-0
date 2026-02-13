import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminSessionState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAdminSession = create<AdminSessionState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'admin-session',
    }
  )
);
