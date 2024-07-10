import { store } from '@/store/modules/menu';
import { toggleMenu, toggleSideBar } from '@/store/modules/menu/actions';

const useMenu = () => {
  const { showMenu, showingActionBar } = store.useState((s) => s);

  return { showMenu, showingActionBar, toggleMenu, toggleSideBar };
};

export { useMenu };
