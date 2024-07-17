import { Store } from 'pullstate';

import { IUser } from '@/interfaces';

interface IUserState {
  allUsers: {
    list: IUser[];
    loading: boolean;
    loadingError: boolean;
  };
  user: {
    data?: IUser;
    loading: boolean;
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
    data: undefined,
    loading: false,
    loadingError: false,
  },
};

export const store = new Store(defaultState);

const clean = store.replace(defaultState);

export default { store, clean, key: '@user' };
