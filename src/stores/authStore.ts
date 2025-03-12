import { create } from 'zustand';
import { supabase } from '@/supabaseClient';

interface AuthState {
  user: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  },
}));

// Setup auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    useAuthStore.getState().setUser(session.user);
  } else {
    useAuthStore.getState().setUser(null);
  }
});
