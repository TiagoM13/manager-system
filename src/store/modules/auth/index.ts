import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { IUser } from '@/interfaces';

import { logout } from './actions';

interface IAuthState {
  token: string;
  user: {
    data?: IUser;
    loading: boolean;
    loadingError: boolean;
  };
}

interface IActionsState {
  setAuthTokens: (token: string) => void;
  setCurrentUser: (user: IUser) => void;
  getAuthTokens: () => string;
  getCurrentUser: () => IUser | undefined;
  logout: () => Promise<boolean>;
}

export const initialState: IAuthState = {
  token: '',
  user: {
    data: undefined,
    loading: false,
    loadingError: false,
  },
};

export const useAuthStore = create(
  persist<IAuthState & IActionsState>(
    (set, get) => ({
      ...initialState,
      setAuthTokens: (token) => set({ token }),
      setCurrentUser: (user) =>
        set((state) => ({
          user: {
            ...state.user,
            data: user,
          },
        })),
      getAuthTokens: () => get().token,
      getCurrentUser: () => get().user.data,
      logout: () => logout(),
    }),
    {
      name: 'authToken',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default { useAuthStore };
