import { IUsersFilters } from '@/interfaces';
import { getAllUsersAPI, getUserAPI } from '@/services';

import { store } from '.';

const getAllUsers = async (params: IUsersFilters) => {
  try {
    store.update((s) => {
      s.allUsers.list = [];
      s.allUsers.loading = true;
      s.allUsers.loadingError = false;
    });

    const data = await getAllUsersAPI(params).then((users) => users);

    setTimeout(() => {
      store.update((s) => {
        s.allUsers.list = data;
        s.allUsers.loading = false;
      });
    }, 3000);

    return data;
  } catch (error) {
    console.log(error);
    store.update((s) => {
      s.allUsers.loadingError = true;
      s.allUsers.loading = false;
    });
  }
};

const getUser = async (id: number) => {
  try {
    store.update((s) => {
      s.user.data = undefined;
      s.user.loading = true;
      s.user.loadingError = false;
    });

    const { data } = await getUserAPI(id);

    setTimeout(() => {
      store.update((s) => {
        s.user.data = data;
        s.user.loading = false;
      });
    }, 3000);

    return data;
  } catch (error) {
    console.log(error);
    store.update((s) => {
      s.user.loadingError = true;
      s.user.loading = false;
    });
  }
};

export { getAllUsers, getUser };
