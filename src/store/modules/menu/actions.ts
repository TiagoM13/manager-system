import { useMenu } from '.';

export const toggleMenu = (show?: boolean) => {
  useMenu.setState((state) => ({
    showMenu: typeof show !== 'undefined' ? show : !state.showMenu,
  }));
};

export const toggleSideBar = (show?: boolean) => {
  useMenu.setState((state) => ({
    showingActionBar:
      typeof show !== 'undefined' ? show : !state.showingActionBar,
  }));
};
