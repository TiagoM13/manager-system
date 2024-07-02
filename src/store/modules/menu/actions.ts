import { store } from '.';

const toggleMenu = (show?: boolean) =>
  store.update((state) => {
    state.showMenu = typeof show !== 'undefined' ? show : !state.showMenu;
  });

const toggleSideBar = (show?: boolean) =>
  store.update((state) => {
    state.showingActionBar =
      typeof show !== 'undefined' ? show : !state.showingActionBar;
  });

export { toggleMenu, toggleSideBar };
