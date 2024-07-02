import { Store } from 'pullstate';

import { IUser } from '@/interfaces';

interface IUserState {
  users: IUser[];
  user: IUser | null;
  loadding: boolean;
  loadingError: boolean;
}

const defaultState: IUserState = {
  users: [],
  user: null,
  loadding: false,
  loadingError: false,
};

export const store = new Store(defaultState);

const clean = store.replace(defaultState);

export default { store, clean, key: '@user' };
