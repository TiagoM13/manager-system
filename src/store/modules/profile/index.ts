import { create } from 'zustand';

interface IState {
  show: boolean;
  toggle: (isShow?: boolean) => void;
}

export const useMenuProfile = create<IState>((set) => ({
  show: false,
  toggle: (isShow?: boolean) =>
    set((state) => ({
      show: typeof isShow !== 'undefined' ? isShow : !state.show,
    })),
}));

export default { useMenuProfile };
