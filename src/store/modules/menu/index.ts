import { create } from 'zustand';

import { toggleMenu, toggleSideBar } from './actions';

interface IMenuState {
  showMenu: boolean;
  showingActionBar: boolean;
  toggleMenu: (show?: boolean) => void;
  toggleSideBar: (show?: boolean) => void;
  clean: () => void;
}

export const useMenu = create<IMenuState>((set) => ({
  showMenu: false,
  showingActionBar: false,
  toggleMenu: (show) => toggleMenu(show),
  toggleSideBar: (show) => toggleSideBar(show),
  clean: () =>
    set({
      showMenu: false,
      showingActionBar: false,
    }),
}));

export default { useMenu };
