import { create } from 'zustand';

interface IAuthState {
  session: boolean;
  setSession: (session: boolean) => void;
}

export const useSession = create<IAuthState>((set) => ({
  session: false,
  setSession: (session) => {
    set({ session });
  },
}));

export default { useSession };
