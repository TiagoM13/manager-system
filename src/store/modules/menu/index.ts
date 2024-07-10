import { Store } from 'pullstate';

interface IMenuState {
  showMenu: boolean;
  showingActionBar: boolean;
}

const defaultState: IMenuState = {
  showMenu: false,
  showingActionBar: false,
};

export const store = new Store(defaultState);

export const clean = () => store.replace(defaultState);

export default { store, clean, key: '@menu' };
