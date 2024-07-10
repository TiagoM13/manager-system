import { Store } from 'pullstate';

import { IUser } from '@/interfaces';

interface IUserState {
  allUsers: {
    list: IUser[];
    loading: boolean;
    loadingError: boolean;
  };
  user: {
    data: IUser | null;
    loadding: boolean;
    loadingError: boolean;
  };
}

const defaultState: IUserState = {
  allUsers: {
    list: [],
    loading: false,
    loadingError: false,
  },
  user: {
    data: null,
    loadding: false,
    loadingError: false,
  },
};

export const store = new Store(defaultState);

const clean = store.replace(defaultState);

export default { store, clean, key: '@user' };
