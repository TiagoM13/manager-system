import { create } from 'zustand';

interface IProfileState {
  show: boolean;
  avatarUrl: string | null;
}

interface IActions {
  toggle: (isShow?: boolean) => void;
  setAvatarUrl: (url?: string | null) => void;
}

export const initialState: IProfileState = {
  show: false,
  avatarUrl: null,
};

export const useMenuProfile = create<IProfileState & IActions>((set) => ({
  ...initialState,
  toggle: (isShow?: boolean) =>
    set((state) => ({
      show: typeof isShow !== 'undefined' ? isShow : !state.show,
    })),
  setAvatarUrl(avatarUrl) {
    set({ avatarUrl });
  },
}));

export default { useMenuProfile };
